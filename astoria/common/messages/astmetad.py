"""Types for astmetad."""
import platform
import random
import string
from enum import Enum
from typing import Optional

from pydantic import BaseModel

from astoria import __version__
from astoria.common.config import AstoriaConfig

from .base import ManagerMessage


class RobotMode(Enum):
    """Running Status of the manager daemon."""

    COMP = "COMP"
    DEV = "DEV"


class Metadata(BaseModel):
    """Astoria Metadata."""

    class Config:
        """Pydantic config."""

        validate_assignment = True

    @classmethod
    def init(cls, config: AstoriaConfig) -> 'Metadata':
        """
        Initialise the metadata and populate with data.

        Based on information from software and the astoria configuration.
        """
        uname = platform.uname()
        return cls(
            astoria_version=__version__,
            kernel_version=uname.release,
            arch=uname.machine,
            python_version=platform.python_version(),
            libc_ver="".join(platform.libc_ver()),
        )

    def is_wifi_valid(self) -> bool:
        """
        Check if the WiFi configuration is valid to be turned on.

        Checks that the WiFi is enabled and that the config params are set.Optional
        :return: boolean indicating whether the WiFi can be turned on.
        """
        return all([
            self.wifi_enabled,
            self.wifi_ssid is not None,
            self.wifi_psk is not None,
            self.wifi_region is not None,
        ])

    # From Meta USB
    arena: str = "A"
    zone: int = 0
    mode: RobotMode = RobotMode.DEV
    marker_offset: int = 0
    game_timeout: Optional[int] = None
    wifi_enabled: bool = True

    # From Software
    astoria_version: str
    kernel_version: str
    arch: str
    python_version: str
    libc_ver: str

    # From astoria.toml
    wifi_ssid: Optional[str] = None
    wifi_psk: Optional[str] = None
    wifi_region: Optional[str] = None


class RobotSettings(BaseModel):
    """Schema for robot-settings.toml."""

    wifi_ssid: str
    wifi_psk: str
    wifi_region: str = "GB"  # Assume GB as that is where most competitors are.
    wifi_enabled: bool = True

    @classmethod
    def generate_default_settings(cls) -> 'RobotSettings':
        """Generate default sensible settings for the robot."""
        ssid_random = "".join(random.choice(string.ascii_uppercase) for _ in range(6))

        # Use random characters for the WiFi password as passphrase schemes
        # such as Diceware are very language specific. This can be changed
        # by competitors if they need to.
        passphrase = "".join(random.choice(string.ascii_lowercase) for _ in range(12))

        return cls(
            wifi_ssid=f"robot-{ssid_random}",
            wifi_psk=passphrase,
        )


class MetadataManagerMessage(ManagerMessage):
    """
    Status message for Metadata Manager.

    Published to /astoria/astmetad
    """

    metadata: Metadata
