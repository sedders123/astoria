Search.setIndex({docnames:["design/code_format","design/history","design/index","design/ipc","design/metadata","design/requirements","development/index","implementation/consumers/astctl","implementation/consumers/astwifid","implementation/consumers/index","implementation/data_components","implementation/index","implementation/managers/astdiskd","implementation/managers/astmetad","implementation/managers/astprocd","implementation/managers/index","index","usage"],envversion:{"sphinx.domains.c":2,"sphinx.domains.changeset":1,"sphinx.domains.citation":1,"sphinx.domains.cpp":3,"sphinx.domains.index":1,"sphinx.domains.javascript":2,"sphinx.domains.math":2,"sphinx.domains.python":2,"sphinx.domains.rst":2,"sphinx.domains.std":1,"sphinx.ext.intersphinx":1,"sphinx.ext.viewcode":1,sphinx:56},filenames:["design/code_format.rst","design/history.rst","design/index.rst","design/ipc.rst","design/metadata.rst","design/requirements.rst","development/index.rst","implementation/consumers/astctl.rst","implementation/consumers/astwifid.rst","implementation/consumers/index.rst","implementation/data_components.rst","implementation/index.rst","implementation/managers/astdiskd.rst","implementation/managers/astmetad.rst","implementation/managers/astprocd.rst","implementation/managers/index.rst","index.rst","usage.rst"],objects:{"astoria.common.disk_constraints":{AndConstraint:[12,0,1,""],Constraint:[12,0,1,""],FalseConstraint:[12,0,1,""],FilePresentConstraint:[12,0,1,""],NotConstraint:[12,0,1,""],NumberOfFilesConstraint:[12,0,1,""],OrConstraint:[12,0,1,""],TrueConstraint:[12,0,1,""]},"astoria.common.disk_constraints.AndConstraint":{__init__:[12,1,1,""],matches:[12,1,1,""]},"astoria.common.disk_constraints.Constraint":{matches:[12,1,1,""]},"astoria.common.disk_constraints.FalseConstraint":{matches:[12,1,1,""]},"astoria.common.disk_constraints.FilePresentConstraint":{__init__:[12,1,1,""],matches:[12,1,1,""]},"astoria.common.disk_constraints.NotConstraint":{__init__:[12,1,1,""],matches:[12,1,1,""]},"astoria.common.disk_constraints.NumberOfFilesConstraint":{__init__:[12,1,1,""],matches:[12,1,1,""]},"astoria.common.disk_constraints.OrConstraint":{__init__:[12,1,1,""],matches:[12,1,1,""]},"astoria.common.disk_constraints.TrueConstraint":{matches:[12,1,1,""]},"astoria.common.manager_requests":{ManagerRequest:[3,0,1,""],RequestResponse:[3,0,1,""]},"astoria.common.manager_requests.ManagerRequest":{sender_name:[3,2,1,""],uuid:[3,2,1,""]},"astoria.common.manager_requests.RequestResponse":{reason:[3,2,1,""],success:[3,2,1,""],uuid:[3,2,1,""]},"astoria.common.messages.astdiskd":{DiskInfo:[12,0,1,""],DiskManagerMessage:[12,0,1,""],DiskType:[12,0,1,""],DiskUUID:[12,0,1,""]},"astoria.common.messages.astdiskd.DiskInfo":{disk_type:[12,2,1,""],mount_path:[12,2,1,""],uuid:[12,2,1,""]},"astoria.common.messages.astdiskd.DiskManagerMessage":{disks:[12,2,1,""]},"astoria.common.messages.astdiskd.DiskType":{METADATA:[12,2,1,""],NOACTION:[12,2,1,""],UPDATE:[12,2,1,""],USERCODE:[12,2,1,""],determine_disk_type:[12,1,1,""]},"astoria.common.messages.astmetad":{Metadata:[13,0,1,""],MetadataManagerMessage:[13,0,1,""],RobotMode:[13,0,1,""]},"astoria.common.messages.astmetad.Metadata":{Config:[13,0,1,""],arch:[13,2,1,""],arena:[13,2,1,""],astoria_version:[13,2,1,""],game_timeout:[13,2,1,""],init:[13,1,1,""],is_wifi_valid:[13,1,1,""],kernel_version:[13,2,1,""],kit_name:[13,2,1,""],kit_version:[13,2,1,""],libc_ver:[13,2,1,""],mode:[13,2,1,""],python_version:[13,2,1,""],wifi_enabled:[13,2,1,""],wifi_psk:[13,2,1,""],wifi_region:[13,2,1,""],wifi_ssid:[13,2,1,""],zone:[13,2,1,""]},"astoria.common.messages.astmetad.Metadata.Config":{validate_assignment:[13,2,1,""]},"astoria.common.messages.astmetad.MetadataManagerMessage":{metadata:[13,2,1,""]},"astoria.common.messages.astmetad.RobotMode":{COMP:[13,2,1,""],DEV:[13,2,1,""]},"astoria.common.messages.astprocd":{CodeStatus:[14,0,1,""],ProcessManagerMessage:[14,0,1,""]},"astoria.common.messages.astprocd.CodeStatus":{CRASHED:[14,2,1,""],FINISHED:[14,2,1,""],KILLED:[14,2,1,""],RUNNING:[14,2,1,""],STARTING:[14,2,1,""]},"astoria.common.messages.astprocd.ProcessManagerMessage":{code_status:[14,2,1,""],disk_info:[14,2,1,""]},"astoria.consumers.astwifid":{WiFiHotspotLifeCycle:[8,0,1,""]},"astoria.consumers.astwifid.WiFiHotspotLifeCycle":{HOSTAPD_BINARY:[8,2,1,""],__init__:[8,1,1,""],generate_hostapd_config:[8,1,1,""],has_metadata_changed:[8,1,1,""],run_hotspot:[8,1,1,""],stop_hotspot:[8,1,1,""]},"astoria.managers.astdiskd":{DiskManager:[12,0,1,""]},"astoria.managers.astdiskd.DiskManager":{main:[12,1,1,""],name:[12,2,1,""],offline_status:[12,1,1,""],update_state:[12,1,1,""]},"astoria.managers.astprocd":{ProcessManager:[14,0,1,""]},"astoria.managers.astprocd.ProcessManager":{dependencies:[14,2,1,""],handle_disk_insertion:[14,1,1,""],handle_disk_removal:[14,1,1,""],handle_kill_request:[14,1,1,""],handle_restart_request:[14,1,1,""],main:[14,1,1,""],name:[14,2,1,""],offline_status:[14,1,1,""],update_status:[14,1,1,""]}},objnames:{"0":["py","class","Python class"],"1":["py","method","Python method"],"2":["py","attribute","Python attribute"]},objtypes:{"0":"py:class","1":"py:method","2":"py:attribute"},terms:{"0dev":[0,17],"120":17,"1883":17,"2021":0,"2022":[0,16],"2dev":0,"3166":0,"534912":0,"53491266d26fcb504eb4b1d9108de04899832c83":0,"abstract":12,"boolean":13,"break":0,"case":[0,14],"class":[3,15],"default":[12,17],"function":[9,10],"import":15,"int":[12,13],"long":[0,17],"new":14,"public":[0,3,6],"return":[8,12,13,14,15],"short":0,"true":[0,8,12,13,15,17],"var":17,"while":8,For:[4,7,16,17],IDE:6,Not:[1,12],OSes:17,The:[0,3,4,5,6,10,12,14,16,17],There:[3,13,17],These:[5,8],Use:[5,17],Used:3,Useful:12,Uses:1,__init__:[8,12],__main__:15,__name__:15,_init:15,_post_connect:10,_post_disconnect:10,_pre_connect:10,_pre_disconnect:10,abc:0,abil:5,abl:4,about:[3,12,17],abov:[5,14],access:[6,8],accident:6,accord:0,accur:8,action:3,added:13,addit:[3,13,14],after:[3,8,10,12],against:12,aim:5,alert:3,all:[1,3,4,6,17],allow:[3,5,8,12,15],along:12,alpha:0,alreadi:14,also:[1,3,6,12],altern:6,although:[6,17],alwai:[0,12],andconstraint:12,ani:[3,4,8,9,10,12,13,14,15,17],anoth:[9,12],applic:[10,15],arbitrarili:4,arch:13,arena:[5,13,17],arg:17,assign:6,astctl:7,astdiskd:[6,11,13,14,15,17],astmetad:[4,8,11,14,15,17],astoria:[0,1,2,3,4,5,6,7,8,10,12,13,14,15,17],astoria_vers:[3,13],astprocd:[11,15,17],asttestd:15,astwifid:[9,11],async:[8,12,14,15],asynchron:5,asyncio:[8,14,15],atlassian:6,attr:4,attribut:4,automat:[8,12],automount:17,avail:[3,12,14,15,17],avoid:5,await:15,background:[2,16],bar:4,base:[0,3,5,8,13,15,17],becom:15,bee:4,beeeeee:0,been:[5,12],befor:10,behaviour:10,between:[3,10],block_devic:12,bool:[3,8,12,13,15],both:[3,12],br0:17,branch:[0,6],bridg:[8,17],broadcast:0,broadcast_ev:3,broadcastev:3,broadcasthelp:3,broker:[3,6,10,17],bug:[0,5],build:[0,6],built:0,bundl:[2,8,14,16],buster:17,cach:8,cache_dir:17,calcul:14,call:[10,14,17],callback:[5,11],can:[0,3,4,5,6,9,10,12,13,14,15,16,17],cannot:4,captur:[0,14],certain:12,chang:[0,3,6,8,12,14,15],check:[0,8,12,13],child:[8,14],choic:6,classmethod:[12,13],clean:14,cleanup:12,clear:3,click:15,client:3,clone:6,code:[1,2,4,5,6,8,14,16],code_crash:14,code_finish:14,code_kil:14,code_run:14,code_start:14,code_statu:14,codestatu:14,combin:12,come:8,comm:1,command:[5,6,9,11,15,16],commit:0,common:[3,4,10,12,13,14,15],commun:[1,2,12,16],comp:[13,17],compar:[0,12],compat:17,compen:3,competit:[0,5],complex:5,complianc:0,compon:[3,5,8,11,12,14,15,16,17],concept:4,config:[13,15,17],config_fil:[12,14,15],configur:[8,13,16],conform:[3,4],connect:10,constaint:12,constructor:12,consum:[7,8,10,11,15,16],contain:[0,1,2,3,12,16,17],content:[2,11],contributor:16,control:[0,5],cov:6,cover:6,coverag:6,crash:14,creat:[8,12],credenti:[0,8],current:[3,4,6,8,12],customis:10,daemon:[13,15],data:[3,4,5,9,11,15,16,17],dbu:[1,6,12,17],debian:17,debug:[7,12],def:15,defin:[3,4,14],definit:3,deliv:5,depend:[3,5,6,11,14],deploi:17,deploy:17,describ:17,design:[16,17],detail:7,determin:12,determine_disk_typ:12,dev:[0,6,13],develop:[0,1,4,5,8,16,17],dfeet:12,dhcp:8,diagram:14,dict:[4,12],differ:[0,10],directori:[14,17],disabl:5,disallow:3,disconnect:[3,10],disk:[14,17],disk_constraint:12,disk_info:14,disk_typ:12,diskinfo:[12,14],diskmanag:12,diskmanagermessag:12,disktyp:12,diskuuid:12,dispatch:12,distribut:13,doc:6,document:[7,16,17],doe:[3,6,9,12],doesn:0,drive:[1,5,13,14],duplic:6,dure:4,dynam:[4,8],each:12,effect:4,either:12,enabl:[0,5,13],enable_tl:17,enable_wpa3:[8,17],enough:7,ensur:[3,6,12,14,15],enter:6,entiti:9,entrypoint:[0,10,15],environ:[4,6],epoch:0,equival:1,even:[4,14],event:10,event_nam:3,everi:[3,7,10],exampl:[4,17],exchang:3,execut:[1,6,14,16],exist:[6,12,14,15],explan:17,express:0,extens:6,extract:14,facili:3,fals:[0,8,12,17],falseconstraint:12,file:[0,8,12,15,16,17],filenam:12,filepresentconstraint:12,filesystem:12,find:[6,12],finish:14,first:[1,4,12],fix:0,flag:3,flake8:6,folder:6,follow:[0,5,6,13,14],foo:4,force_protocol_version_3_1:17,fork:6,format:[2,16,17],found:[6,12],freedesktop:12,from:[0,1,4,6,8,9,12,13,14,15],full:12,futur:5,game_timeout:[13,17],gen:16,gener:[4,6,8,16],generate_hostapd_config:8,get_event_loop:15,getlogg:15,git:[0,6],github:6,give:4,given:[12,13],gnu:6,goe:[12,14,15],good:[6,17],graphviz:6,group:0,guid:6,had:[1,13],handl:[5,8,10,14],handle_disk_insert:14,handle_disk_remov:14,handle_kill_request:14,handle_restart_request:14,has:[6,12,13],has_metadata_chang:8,hash:0,hat:5,have:[3,4,5,6,12,16,17],heavi:1,help:[6,8],here:[4,6],herein:5,high:[2,13,17],higher:6,highest:4,hive:4,hold:9,host:[8,17],hostapd:8,hostapd_binari:8,hotspot:8,how:12,html:6,http:1,ideal:17,identif:17,identifi:[0,3,12],ignor:[13,14],imag:0,immedi:3,immut:4,implement:[4,5,7,12,14,16],includ:4,incorpor:5,increment:0,indic:[0,4,13],individu:7,info:0,inform:[0,3,7,8,9,12,13,14,16,17],init:13,initi:[4,8],initialis:[12,13],insert:[1,5,12,13,14],insid:6,inspect:7,inspir:1,instal:[1,6,17],integr:[5,6],intend:7,inter:[2,16],interact:[12,17],interfac:[5,8,9,11,17],introduc:4,ipc:3,is_flag:15,is_wifi_valid:13,iso:0,isol:1,issu:6,its:[3,13,15],job:12,json:[3,17],kei:[0,4],kernel_vers:13,keyboard:17,kill:[8,14],kit:[1,8,16,17],kit_nam:13,kit_vers:13,languag:5,last:[3,4,12],later:17,launch:8,learn:6,least:[3,17],led:5,less:1,level:2,libc_ver:13,librari:[12,17],licenc:16,licens:16,lifecycl:8,line:[5,9,11,16],linter:6,linux:17,list:[9,12,15,16,17],listen:[3,12],live:5,load:13,local:6,locat:[14,17],log:[14,15],logger:[14,15],look:17,loop:[5,10,15],lower:4,machin:6,made:17,mai:17,main:[6,12,14,15],mainli:7,major:0,make:[5,6,9,14],manag:[1,4,6,8,9,10,11,12,13,16,17],manager_nam:3,manager_request:3,managermessag:[3,15],managerrequest:3,manifest:14,manual:6,master:0,match:[0,3,8,12],mean:[3,5],mechan:[0,5],meet:6,member:12,messag:[4,12,13,14,15],metadata:[0,2,5,8,12,16],metadatamanagermessag:13,method:[10,12],middl:3,minim:11,minor:0,mit:16,mode:[4,5,6,8,13,17],modul:[8,14],modular:[1,5],more:[13,16],mosquitto:[6,17],mount:[12,17],mount_path:12,mous:17,mqtt:[3,6,10,15,17],multipl:[3,14],must:[0,3,4,6,9,10,12,15],mutabl:4,mutat:[3,9,14,15],mvp:5,mypi:6,name:[4,12,14,15,17],need:[0,3,6,9,12,17],neg:14,negat:12,network:[0,8],newli:12,next:[3,12],noaction:12,non:0,none:[4,8,12,14,15],notconstraint:12,notic:12,now:6,nspawn:1,number:[4,6,12],numberoffilesconstraint:12,object:12,observ:12,occur:[3,6],off:5,offlin:[12,14,15],offline_statu:[12,14,15],onc:[13,17],one:[6,12,13,14],onli:[1,12,13,14],open:[1,6],oper:[8,17],option:[6,13,14,15,17],orconstraint:12,order:[4,12],org:12,origin:[1,3],other:[5,8,12,14,15,17],our:6,out:[0,5],output:6,outsid:[0,17],over:[3,5,12],overlai:4,overlaid:4,overrid:[4,17],overridden:[0,4],overriden:10,overview:2,packag:[6,17],page:17,param:13,paramet:12,partial:1,pass:15,patch:0,path:[12,14,15,17],pathlib:12,peopl:16,pep:6,perform:6,persist:9,pip:6,place:17,pleas:[6,7,16],plod:5,poetri:6,point:[8,12],poll:5,popul:13,port:[1,17],posix:17,possibl:[5,14,17],power:5,predecessor:1,presenc:8,present:[0,4,12],prioriti:[3,4,13,17],process:[2,8,15,16,17],processmanag:14,processmanagermessag:14,product:17,program:[9,12,15,17],programmat:[5,12],progress:14,project:[6,16],proper:17,properti:[8,12,14,15],protocol:[3,5],prototyp:1,provid:[5,7,8],proxi:3,psk:[0,8],pub:3,publish:[3,9,12,13,14,15],pull:6,pure:12,purpos:3,pydant:[5,13],pytest:6,python3:6,python:[1,5,6,12,17],python_vers:13,read:12,real:14,reason:3,receiv:[3,5,8,12,14],recognis:17,recommend:[12,17],ref:8,refer:[5,17],refus:0,regex:0,region:[0,8],regist:4,regular:0,reject:[0,3],relat:3,releas:[0,16],relev:12,reli:[12,14,15],remot:5,remov:[12,14],repli:3,repositori:6,repres:10,request:[6,9,14],requestrespons:[3,14],requir:[0,2,6,8,9,16],resolv:[4,13],resourc:6,respons:[3,8,12,13,14],restart:[8,14],retain:3,robocon:1,robot:[0,1,3,4,5,16,17],robotd:1,robotmod:13,routin:[12,14,15],rtype:13,run:[0,3,4,5,6,8,10,13,14,15,16],run_hotspot:8,run_until_complet:15,runtim:4,safe:[3,12,14,15],same:[3,17],schema:[3,4,5],scope:17,script:1,second:[4,12,14],section:[0,2],see:[7,8,13,16,17],self:[8,15],send:14,sender_nam:3,sent:[0,3],seri:0,serv:6,set:[0,4,5,8,13,16],setup:17,shelf:5,shell:6,should:[0,3,4,6,7,9,12,14,15,17],sigchld:14,sigkil:14,signal:12,signatur:8,signifi:3,sigterm:14,simpl:[1,6,7],simultan:3,singl:3,softwar:[5,13],solut:5,some:[6,12,15],someth:[0,6],sourc:[1,3,8,12,13,14,17],sourcebot:1,spec:0,specif:[3,4,14],specifi:[0,17],sphinx:6,spuriou:[4,12],srv4:1,ssid:[0,8],stage:10,standalon:10,standard:[0,5,6],start:[1,4,5,8,14],startup:12,state:[3,4,7,10,11,12,13,14,16,17],statemanag:15,statement:6,statu:[3,5,12,13,14,15],stderr:14,stdout:14,still:14,stop:[3,8,14,15],stop_hotspot:8,store:[8,15,17],str:[3,4,8,12,13,15],stream:5,student:[0,5,16],style:5,sub:3,submit:6,subprocess:[8,14],subscrib:[3,9,15],success:3,suit:6,superced:1,superclass:10,support:[0,1,17],system:[1,8,12,16],systemd:[1,17],take:[1,12],target:17,task:[12,14],tcp:3,team:0,technic:4,tell:6,temporari:14,term:4,test:[0,15,16,17],testament:3,testd:15,testmanag:15,than:5,thei:17,them:12,thi:[1,2,3,8,9,12,13,14,15,16,17],though:4,three:3,time:[13,14],tmp:8,tmux:17,toml:[0,17],too:[0,5],topic:3,topic_prefix:17,tradit:17,trigger:14,trueconstraint:12,turn:13,tutori:6,type:[4,8,12,13,14,15],udisk:[12,17],udiski:[6,12,17],udisks2:[6,12],under:16,understand:7,uniqu:3,unknown:0,unpack:14,updat:[0,1,5,8,12,14],update_st:12,update_statu:14,upgrad:9,usag:[5,7,16],usb:[0,1,4,5,8,14,16],use:[6,17],used:[0,3,4,6,8,12],useful:12,user:[0,17],usercod:[8,12,17],uses:[1,3,8,12],using:[0,3,5,6,12,17],util:17,uuid:[3,12,14],valid:[13,14],validate_assign:13,valu:[4,12,13,14],variou:10,verbos:[12,14,15],verifi:14,version:[3,17],via:[8,14],view:6,virtual:6,volum:12,volunt:0,wait:[3,13,14,15],wait_loop:15,wamp:1,warn:[0,4],wasp:4,web:[3,5],websocket:3,were:5,when:[5,12,13,14,15],where:[4,5],whether:13,which:[4,12],whilst:15,who:16,wifi:[8,13,17],wifi_en:[8,13,17],wifi_psk:13,wifi_region:13,wifi_ssid:13,wifihotspotlifecycl:8,wireless:5,wish:6,within:[6,14],without:[3,7,8],wlan0:17,work:[1,6],workaround:5,write:[6,14],written:5,yaml:0,year:0,you:[6,17],your:6,yourself:6,zip:[0,17],zone:[4,13,17]},titles:["Code Bundle Format","Background","Design","Inter-Process Communication","Metadatas","Design Requirements","Development","Command Line Interface","Astwifid","State Consumers","Data Components","Implementation","Astdiskd","Astmetad","Astprocd","State Managers","Astoria","Usage"],titleterms:{"class":[8,12,13,14],"static":6,addit:5,astctl:17,astdiskd:12,astmetad:13,astoria:16,astprocd:14,astwifid:8,background:1,broadcast:3,bundl:0,callback:10,check:6,code:0,command:[7,17],commun:3,compon:10,configur:17,constraint:12,consum:9,contribut:16,data:[8,10,12,13,14],definit:12,depend:15,design:[2,5],detect:12,develop:6,disk:[12,13],document:6,drive:12,event:3,exampl:0,format:0,herdsman:1,identif:12,implement:11,inter:3,interfac:7,kit:0,lifecycl:[13,14],line:[7,17],lint:6,manag:[3,14,15],messag:3,metadata:[4,13,17],minim:15,minimum:5,name:0,pepper2:1,process:[3,14],request:3,requir:[5,17],resolut:4,run:17,runusb:1,set:6,shepherd:1,sourc:4,state:[9,15],structur:[8,12,13,14],system:17,technic:5,test:6,type:[3,6],unit:6,usag:17,usb:17,usercod:14,version:0,wifi:0}})