"""Process Manager Application."""

import asyncio
import logging
from pathlib import Path
from signal import SIGKILL, SIGTERM
from tempfile import TemporaryDirectory
from typing import Callable, Dict, Optional
from zipfile import BadZipFile, ZipFile

import click

from astoria.common.broadcast_event import UsercodeLogBroadcastEvent
from astoria.common.manager import StateManager
from astoria.common.manager_requests import (
    RequestResponse,
    UsercodeKillManagerRequest,
    UsercodeRestartManagerRequest,
)
from astoria.common.messages.astdiskd import DiskInfo, DiskType, DiskUUID
from astoria.common.messages.astprocd import CodeStatus, ProcessManagerMessage
from astoria.common.mqtt import BroadcastHelper

from .mixins.disk_handler import DiskHandlerMixin

LOGGER = logging.getLogger(__name__)

loop = asyncio.get_event_loop()


@click.command("astprocd")
@click.option("-v", "--verbose", is_flag=True)
@click.option("-c", "--config-file", type=click.Path(exists=True))
def main(*, verbose: bool, config_file: Optional[str]) -> None:
    """Process Manager Application Entrypoint."""
    testd = ProcessManager(verbose, config_file)
    loop.run_until_complete(testd.run())


class ProcessManager(DiskHandlerMixin, StateManager[ProcessManagerMessage]):
    """Astoria Process State Manager."""

    name = "astprocd"
    dependencies = ["astdiskd", "astmetad"]

    def _init(self) -> None:
        self._lifecycle: Optional[UsercodeLifecycle] = None
        self._cur_disks: Dict[DiskUUID, DiskInfo] = {}

        self._mqtt.subscribe("astdiskd", self.handle_astdiskd_disk_info_message)

        self._register_request(
            "restart",
            UsercodeRestartManagerRequest,
            self.handle_restart_request,
        )
        self._register_request(
            "kill",
            UsercodeKillManagerRequest,
            self.handle_kill_request,
        )
        self._log_helper = BroadcastHelper.get_helper(
            self._mqtt,
            UsercodeLogBroadcastEvent,
        )

    @property
    def offline_status(self) -> ProcessManagerMessage:
        """
        Status to publish when the manager goes offline.

        This status should ensure that any other components relying
        on this data go into a safe state.
        """
        return ProcessManagerMessage(
            status=ProcessManagerMessage.Status.STOPPED,
        )

    async def main(self) -> None:
        """Main routine for astprocd."""
        # Wait whilst the program is running.
        self.update_status()
        await self.wait_loop()

        for uuid, info in self._cur_disks.items():
            asyncio.ensure_future(self.handle_disk_removal(uuid, info))

    async def handle_disk_insertion(self, uuid: DiskUUID, disk_info: DiskInfo) -> None:
        """Handle a disk insertion."""
        LOGGER.debug(f"Disk inserted: {uuid} ({disk_info.disk_type})")
        if disk_info.disk_type is DiskType.USERCODE:
            LOGGER.info(f"Usercode disk {uuid} is mounted at {disk_info.mount_path}")
            if self._lifecycle is None:
                LOGGER.debug(f"Starting usercode lifecycle for {uuid}")
                self._lifecycle = UsercodeLifecycle(
                    uuid,
                    disk_info,
                    self.update_status,
                    self._log_helper,
                )
                asyncio.ensure_future(self._lifecycle.run_process())
            else:
                LOGGER.warn("Cannot run usercode, there is already a lifecycle present.")
                with disk_info.mount_path.joinpath("log.txt").open("w") as fh:
                    fh.write("Unable to start code.\n")
                    fh.write("It is not safe to run multiple code disks at once.\n")

    async def handle_disk_removal(self, uuid: DiskUUID, disk_info: DiskInfo) -> None:
        """Handle a disk removal."""
        LOGGER.debug(f"Disk removed: {uuid} ({disk_info.disk_type})")

        if disk_info.disk_type is DiskType.USERCODE:
            LOGGER.info(f"Usercode disk {uuid} removed ({disk_info.mount_path})")

            if self._lifecycle is not None and self._lifecycle._uuid == disk_info.uuid:
                await self._lifecycle.kill_process()
                self._lifecycle = None
                self.update_status()
            else:
                LOGGER.warning("Disk removed, but no code lifecycle available")

    async def handle_kill_request(
        self,
        request: UsercodeKillManagerRequest,
    ) -> RequestResponse:
        """Handle a request to kill running usercode."""
        if self._lifecycle is None:
            return RequestResponse(
                uuid=request.uuid,
                success=False,
                reason="No active usercode lifecycle",
            )
        else:
            LOGGER.info("Kill request received.")
            await self._lifecycle.kill_process()
            return RequestResponse(
                uuid=request.uuid,
                success=True,
            )

    async def handle_restart_request(
        self,
        request: UsercodeRestartManagerRequest,
    ) -> RequestResponse:
        """Handle a request to restart usercode."""
        LOGGER.info("Restart request received.")
        if self._lifecycle is None:
            return RequestResponse(
                uuid=request.uuid,
                success=False,
                reason="No active usercode lifecycle",
            )
        else:
            if self._lifecycle.status is CodeStatus.RUNNING:
                return RequestResponse(
                    uuid=request.uuid,
                    success=False,
                    reason="Code is already running.",
                )
            else:
                asyncio.ensure_future(self._lifecycle.run_process())
                return RequestResponse(
                    uuid=request.uuid,
                    success=True,
                )

    def update_status(self, code_status: Optional[CodeStatus] = None) -> None:
        """
        Calculate and update the status of this manager.

        Called by the usercode lifecycle to inform us of changes.
        """
        if self._lifecycle is None:
            # When the status is updated in the lifecycle constructor, we
            # are left with a situtation where there is no lifecycle object,
            # but the code is starting. Thus we want to inform anyway.
            #
            # This section also updates the status when the lifecycle is cleaned up.
            self.status = ProcessManagerMessage(
                status=ProcessManagerMessage.Status.RUNNING,
                code_status=code_status,
            )
        else:
            self.status = ProcessManagerMessage(
                status=ProcessManagerMessage.Status.RUNNING,
                code_status=self._lifecycle.status,
                disk_info=self._lifecycle.disk_info,
            )


class UsercodeLifecycle:
    """
    Manages the lifecycle of usercode.

    Handles process management and logging.
    """

    def __init__(
        self,
        uuid: DiskUUID,
        disk_info: DiskInfo,
        status_inform_callback: Callable[[CodeStatus], None],
        log_helper: BroadcastHelper[UsercodeLogBroadcastEvent],
    ) -> None:
        self._uuid = uuid
        self._disk_info = disk_info
        self._status_inform_callback = status_inform_callback
        self._log_helper = log_helper

        self._process: Optional[asyncio.subprocess.Process] = None
        self._process_lock = asyncio.Lock()
        self._setup_temp_dir()

        self.status = CodeStatus.STARTING

    @property
    def uuid(self) -> DiskUUID:
        """The UUID of the managed Disk."""
        return self._uuid

    @property
    def disk_info(self) -> DiskInfo:
        """Disk Info for the managed disk."""
        return self._disk_info

    @property
    def status(self) -> CodeStatus:
        """Get the status of the executing code."""
        return self._status

    @status.setter
    def status(self, status: CodeStatus) -> None:
        """Set the status of the executing code."""
        self._status = status
        self._status_inform_callback(status)

    def _setup_temp_dir(self) -> None:
        """Setup a temporary directory."""
        self._dir = TemporaryDirectory(prefix="astprocd-")
        self._dir_path = Path(self._dir.name)

    def _extract_and_validate_zip_file(self) -> bool:
        """
        Extract and validate a robot.zip file.

        This function will extract and validate the contents of the
        robot.zip file. It will overwrite the current temporary dir
        of the usercode lifecycle, and should not be called multiple
        times.
        """

        def _handle_error(error: str) -> None:
            """
            Handle an error with the zip file.

            Logs to the astprocd logger and also writes
            a log file to the usercode disk.
            """
            with self._disk_info.mount_path.joinpath("log.txt").open("w") as fh:
                LOGGER.warning(error)
                fh.write("Unable to start code.\n")
                fh.write(f"{error}.\n")

        zip_path = self._disk_info.mount_path / "robot.zip"

        if not (zip_path.exists() and zip_path.is_file()):
            _handle_error("Unable to find robot.zip file")
            return False

        try:
            with ZipFile(zip_path, "r") as zf:
                zf.extractall(self._dir_path)
        except BadZipFile:
            _handle_error("The provided robot.zip is not a valid ZIP archive")
            return False

        # Check that main.py is present
        exe_path = self._dir_path / "main.py"
        if not exe_path.exists():
            _handle_error("The provided robot.zip did not contain a main.py")
            return False

        # Check for metadata etc here in future

        return True

    async def run_process(self) -> None:
        """
        Start the execution of the usercode.

        This function will not return until the code has exited.
        """
        if self._process is None:

            if self._extract_and_validate_zip_file():

                async with self._process_lock:
                    self._process = await asyncio.create_subprocess_exec(
                        "python3",
                        "-u",
                        "main.py",
                        stdin=asyncio.subprocess.DEVNULL,
                        stdout=asyncio.subprocess.PIPE,
                        stderr=asyncio.subprocess.STDOUT,
                        cwd=self._dir_path,
                        start_new_session=True,
                    )
                    if self._process is not None:
                        if self._process.stdout is not None:
                            asyncio.ensure_future(self.logger(self._process.stdout))
                        else:
                            LOGGER.warning("Unable to start logger task.")
                        self.status = CodeStatus.RUNNING
                        LOGGER.info(
                            f"Usercode pid {self._process.pid} "
                            f"started in {self._dir_path}",
                        )

                        # Wait for the subprocess to exit.
                        # This may include if it is killed.
                        rc = await self._process.wait()

                        if rc == 0:
                            self.status = CodeStatus.FINISHED
                        elif rc < 0:
                            self.status = CodeStatus.KILLED
                        elif rc > 0:
                            self.status = CodeStatus.CRASHED
                        LOGGER.info(
                            f"Usercode process exited with code {rc} "
                            f"({self.status.name})",
                        )

                        self._process = None

                        self._dir.cleanup()  # Reset directory
                        self._setup_temp_dir()
                    else:
                        LOGGER.warning("robot.zip was invalid. Unable to start code.")
                        self.status = CodeStatus.CRASHED  # Close enough to indicate error
            else:
                LOGGER.warning("Tried to start process, but failed.")
                self.status = CodeStatus.CRASHED  # Close enough to indicate error
        else:
            LOGGER.warning("Tried to start process, but one is already running.")

    async def kill_process(self) -> None:
        """Kill the process, if one is running."""
        if self._process is not None and self._process_lock.locked():
            LOGGER.info("Attempting to kill process.")
            LOGGER.info(f"Sent SIGTERM to pid {self._process.pid}")
            self._process.send_signal(SIGTERM)
            try:
                await asyncio.wait_for(self._process.communicate(), timeout=5.0)
            except asyncio.TimeoutError:
                if self._process is not None:
                    LOGGER.info(f"Sent SIGKILL to pid {self._process.pid}")
                    self._process.send_signal(SIGKILL)
            except AttributeError:
                # Under some circumstances, there is a race condition such that
                # _process becomes None whilst the communicate timeout is running.
                # We want to catch and discard this error.
                pass
        else:
            LOGGER.debug("Tried to kill process, but no process is running.")

    async def logger(self, proc_output: asyncio.StreamReader) -> None:
        """
        Logger task.

        Logs the output of the process to log.txt
        """
        log_path = self._disk_info.mount_path / "log.txt"

        if self._process is not None:
            pid = self._process.pid
        else:
            pid = -1  # Use -1 if unknown

        def log(data: str, log_line: int) -> None:
            fh.write(data)
            fh.flush()
            self._log_helper.send(
                pid=pid,
                priority=log_line,
                content=data,
            )

        with log_path.open("w") as fh:
            log_line = 0
            log("=== LOG STARTED ===\n", log_line)
            log_line += 1
            data = await proc_output.readline()
            while data != b"":
                log(data.decode('utf-8'), log_line)
                data = await proc_output.readline()
                log_line += 1
            log("=== LOG FINISHED ===\n", log_line)


if __name__ == "__main__":
    main()
