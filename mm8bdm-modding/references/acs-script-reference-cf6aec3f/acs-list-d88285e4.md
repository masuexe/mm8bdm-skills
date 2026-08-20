---
title: "ACS List"
notion_id: d88285e45a614ea7af264364e9665aa9
source: https://www.notion.so/d88285e45a614ea7af264364e9665aa9
---

# ACS List

---

> 🚨 **This page does not describe what these scripts do, nor imply that you should call these scripts manually! For info of what scripts are useful to call, refer to the **[ACS Script Reference](./README.md)**!  
>   
> This page is for people who *****really***** know what they’re doing and either wish to see the inner workings of the game, or replace specific functionality with their own (after considering all other options!).**

This page is a comprehensive list of all global scripts in Mega Man 8-Bit Deathmatch and where they are located in the file structure. The same information on this page can be found in the MM8BDM PK3 in `acs/_acslist.txt`.

> 📜 acs\_source/corescripts/api handlers/ASSTDIB.acs

```javascript
Script "core_Assist_Display_Bar_Start" (int cam) CLIENTSIDE
Script "core_Get_And_Increment_AssistDisplayBarCount" (void) CLIENTSIDE
Script "core_Get_AssistDisplayBar_On" (void) CLIENTSIDE
Script "core_Get_AssistDisplayBar_X" (int pos) CLIENTSIDE
Script "core_Get_AssistDisplayBar_Y" (int pos) CLIENTSIDE
Script "core_Get_AssistDisplayBar_HUDMode" (void) CLIENTSIDE
```

> 📜 acs\_source/corescripts/api handlers/ASSTDIS.acs

```javascript
Script "core_Assist_Display" OPEN CLIENTSIDE {
Script "core_Get_And_Increment_AssistDisplayID" (void) CLIENTSIDE {
```

> 📜 acs\_source/corescripts/api handlers/BARCLEAR.acs

```javascript
Script "core_DrawBar_Clear" (int cam) CLIENTSIDE {
```

> 📜 acs\_source/corescripts/api handlers/BARHNDLE.acs

```javascript
Script "core_DrawBar_Run" (int cam) CLIENTSIDE {
```

> 📜  acs\_source/corescripts/api handlers/CORE8BDT.acs

```javascript
// compiled file with no scripts
```

> 📜 acs\_source/corescripts/api handlers/DTADDR.acs

```javascript
Script "core_DefineWeapon_S" (void)
Script "core_RandomWeapon_S" (int slot, int mapValid, int LMSValid, int eddieValid)
Script "core_DefineTranslation_S" (void) CLIENTSIDE
Script "core_DefineAssistDisplay_S" (void) CLIENTSIDE
Script "core_DefineBusterUpgrade_S" (void)
Script "core_RandomBusterUpgrade_S" (int mapValid, int LMSValid, int eddieValid)
Script "core_DefineBusterTake_S" (void)
script "core_DefinePowerAprop_S" (void)
script "core_DefineSpawnFunc_S" (void)
script "core_DefineArtifactPickupFunc_S" (void)
script "core_DefineReservedTID_S" (int tid, int tidMax)
script "core_RegisterTrainingDef_S" (void) {
script "core_DefineTrainingEntry_S" (void) {
Script "core_DefineAssistItem_S" (void)
Script "core_RandomAssistItem_S" (int group, int mapValid)
script "core_RegisterTeamColorDef_S" (void) {
```

> 📜 acs\_source/corescripts/api handlers/PUAPROP.acs

```javascript
script "core_defineaproppowers" ENTER
script "core_defineaproppowers_respawn" RESPAWN
script "core_resetaproppowers" UNLOADING
script "core_aproppoweractivator" (void)
script "core_aproppoweractive" (int which)
script "core_revokeApropPower" (int idx)
script "core_clampalpha_client" (int alpha, int min) CLIENTSIDE
script "core_SetCustomActorProperty" (int pln, int prop, int val) {
script "core_GetCustomActorProperty" (int pln, int prop) {
```

> 📜 acs\_source/corescripts/api handlers/SECTDTS.acs

```javascript
script "core_newwater" (void)
script "core_commonwater" ENTER
script "core_newgel" (void)
script "core_burstgel" ENTER
script "core_gelflight" (int onoff) CLIENTSIDE
script "core_liquidrespawn" RESPAWN
script "core_definepit" (int dmg, int mod, int inr, int tag3d)
script "core_checkPit" (int tid)
script "core_checkPitByType" (int type, int tid)
script "core_changepit" (int tag, int dmg, int mod, int inr)
```

> 📜 acs\_source/corescripts/api handlers/SPWNFUNC.acs

```javascript
script "core_runspawnfuncs" (int type)
script "core_runspawnfuncs_client" (int type) CLIENTSIDE
script "core_itemsvarremove" (void)
script "core_wepsvarremove" (void)
```

> 📜 acs\_source/corescripts/api handlers/TRAINDEF.acs

```javascript
script "core_training_registerall" (void) // this is called by the map or mod that needs to use training descs
```

> 📜 acs\_source/corescripts/campaign/BROBOENZ.acs

```javascript
Script "core_roboenza_start" OPEN
Script "core_roboenza_enable" (int infected)
script "core_roboenza_infect" (int player, int type)
script "core_roboenza_infection" (void)
script "core_roboenza_effect" (int type)
script "core_roboenza_dteleport" (int player, int tran)
```

> 📜 acs\_source/corescripts/campaign/RUSHSRCH.acs

```javascript
script "core_rushsearch_zonecheck" (void)
script "core_rushsearch_obtainartifact" (void)
script "core_rushsearch_treasure" (void)
script "core_rushsearch_playerneedammo" (void)
script "core_rushsearch_artifactprogress" (int progress)
```

> 📜 acs\_source/corescripts/campaign/SINGLEP.acs

```javascript
script "core_unknowncheck" (void) {
Script "core_singleplayer" OPEN
script "core_easymodebosses" (void)
script "core_singleplayer_unlockletter" (int letter, int notify)
script "core_singleplayer_clearbosscvars" (void)
script "core_singleplayer_boostsavedata" (int progress)
script "core_resetsavedata" (void)
```

> 📜 acs\_source/corescripts/campaign/VCMPGN.acs

```javascript
script "core_vsurvival_giverush" (void)
script "core_vsurvival_start" OPEN
script "core_vsurvival_wilybotspecial" (void)
script "core_vsurvival_botspecial" (void)
script "core_vsurvival_setfrags" (int frags)
script "core_vsurvival_enter" ENTER
script "core_vsurvival_allyteleporthelper" (void)
script "core_vsurvival_gameover" (void)
script "core_vsurvival_respawn" RESPAWN
script "core_vsurvival_hidebot" (int reveal)
script "core_vsurvival_death" DEATH
script "core_vsurvival_hideallbots" (int bosses)
script "core_vsurvival_bossspawn" (void)
script "core_vsurvival_bossdeath" (int player)
script "core_vsurvival_addscrews" (int amount, int player)
script "core_vsurvival_removescrews" (int amount, int player)
script "core_vsurvival_resetdata" (void)
script "core_vsurvival_checkfulldata" (void)
script "core_vsurvival_fulldata" (int screws)
script "core_vsurvival_loadweapons" (void)
script "core_vsurvival_addweapon" (int weapon)
script "core_vsurvival_countweapons" (void)
script "core_vsurvival_addprogress" (int progress)
script "core_vsurvival_screwdisplay" (void)
```

> 📜 acs\_source/corescripts/DEBUG.acs

```javascript
script "core_debug" (int tid, int who, int debugger) {
script "core_pitdebug" (int tid, int who, int debugger) {
script "core_bringplayerhere" (int num, int freeze) {
script "core_logtranslations" (void) CLIENTSIDE {
script "core_checktranslation" (int id, int idMax) CLIENTSIDE {
script "core_logtids" (void) {
script "core_checktid" (int id, int idMax) {
script "core_printcurrentpointer" (int pointer) {
```

> 📜 acs\_source/corescripts/helper scripts/ASTHELP.acs

```javascript
script "core_beatattack" (void)
Script "core_WeaponEnergyColor" OPEN CLIENTSIDE
Script "core_ExitUnitDisplay" OPEN CLIENTSIDE
script "core_exitunit" (void)
script "core_exitunit_disconnect" (int who) DISCONNECT
script "core_checkforjump" (void)
script "core_rushjetflight" (void)
script "core_rushmarineflight" (void)
Script "core_hookshot" (int PlayerID, int Vel, int Moving)
script "core_reggaetid" (int tid)
```

> 📜 acs\_source/corescripts/helper scripts/PROPHELP.acs

```javascript
Script "core_thunderclawpeg" (int timeout)
Script "core_hangingtire" (int ThrustForce)
script "core_checkclientcvar" (int which) CLIENTSIDE
script "core_checkservercvar" (int which)
script "core_stickyLifts" (int mode)
script "core_propexplode" (int dmg, int radius, int maxradius)
script "core_damageowner" (int amt, int targetptr, int ownerptr)
script "core_pumpmanwaterfall" (int radius)
```

> 📜 acs\_source/corescripts/helper scripts/WEPHELP.acs

```javascript
Script "core_icewallmanage" (int AngleToo)
script "core_noammo" (void)
script "core_whiteflash" (void) clientside
script "core_wepcharge_rage" (int amount, int otherwise, int checkPtr) {
script "core_aimpointwarper" (void) CLIENTSIDE
script "core_clientsound" (int sound) CLIENTSIDE {
script "core_weaphelp_selfdamage" (int type, int arg1, int arg2) EVENT{
script "core_loadphotonmissile" (void)
script "core_watershield_noclip" (void) CLIENTSIDE
script "core_flashstopperlight" (int maxRange)
Script "core_flashstopper" (void) 
script "core_plugballskycheck" (void)
script "core_pharaohshotwarper_exists" (void)
Script "core_shieldwarper" (int noshieldcheck) CLIENTSIDE
Script "core_shieldwarper_superarm" (void) CLIENTSIDE
Script "core_shieldwarper_skull" (void) CLIENTSIDE
Script "core_shieldwarper_scorch" (void) CLIENTSIDE
Script "core_shieldwarper_jewel" (int jewelno) CLIENTSIDE
Script "core_shieldwarper_deepdigger" (int left) CLIENTSIDE
script "core_shieldeffect" (int evt, int dmg, int dmgtype) EVENT
script "core_jewelsatellitehome" (void)
script "core_jewelsatellitetrail_client" (void) CLIENTSIDE
script "core_copymomentum" (int add)
Script "core_homingsniperwarper" (void) CLIENTSIDE
script "core_remotemineoffset" (void)
script "core_remoteminetrans" (int pln) CLIENTSIDE
script "core_lightningboltsetlength" (int mx, int count) {
script "core_lightningboltgetlength" (int ptr)
script "core_shieldwarper_chillspike" (void) CLIENTSIDE
script "core_chillspikefreeze" (void)
script "core_blackholedome" (int radius)
script "core_blackholedome_clientside" (int radius, int spread, int ttid) CLIENTSIDE
script "core_blackholemanage_clientside" (int del, int ttid) CLIENTSIDE
script "core_blackhole_damagepuff" (int evt, int dmg, int type) EVENT
script "core_blackhole_spawnpuff" (int x, int y, int z, int targetTID) CLIENTSIDE
```

> 📜 acs\_source/corescripts/LEGACY.acs

```javascript
script "core_openlegacymenu" (void) NET CLIENTSIDE {
script "core_legacywarning" (int ret) CLIENTSIDE {
script 190 (int thrustforce) 
script 191 (int prop, int mult, int div) 
Script 194 (void)
Script 195 (void)
script 203 (void)
script 204 (int grav) 
script 205 (void)
script 206 (void)
script 247 (int maxforce, int maxrange, int nofalloff) 
script 248 (int timeout) 
script 249 (void)  
script 252 (void) // ENTER 
script 253 (int radius, int height, int mode)
Script 254 (void)
script 255 (void)
script 256 (void) 
script 257 (int usenumber) 
script 259 (int pitchangle) 
script 261 (int distance) 
script 300 (void) 
script 972 (int mode, int musictovalue) 
script 974 (void) //clientside 
script 975 (int checkmode) 
script 976 (void) clientside 
script 977 (void)
script 978 (void)
script 979 (void) 
script 980 (void) // OPEN
script 981 (void) 
script 982 (int hits, int customprotect) 
script 983 (void) // ENTER 
script 984 (void) 
script 986 (void)
script 989 (int aimtarget, int heightadjust) 
script 990 (int whichrotate)
script 991 (int weap) 
script 992 (int amount, int ammomode) 
Script 993 (void) // OPEN
script 994 (int angletoo) 
script 995 (void) // OPEN 
script 996 (void) // RESPAWN 
script 997 (void) // ENTER 
script 998 (int weap, int nosound) 
Script 999 (void) // OPEN
script "core_beatflight" (void)
script "core_trebleboostflight" (void)
```

> 📜 acs\_source/corescripts/systems/BOTHELP.acs

```javascript
script "core_botmovehelper" ENTER
Script "core_botweaponhelper" ENTER
script "core_bothelprespawn" RESPAWN
script "core_botpause" (void) //clientside
```

> 📜 acs\_source/corescripts/systems/COLOTRNS.acs

```javascript
script "core_synccolors" ENTER
script "core_synccolors_respawn" RESPAWN
script "core_weaponcolor" (int weap, int flags, int teamweap) 
script "core_chargecolor" (int weap, int teamweap)
Script "core_copytranslation" (void)
script "core_copytranslation_client" (void) CLIENTSIDE
```

> 📜 acs\_source/corescripts/systems/HITSOUND.acs

```javascript
script "core_hitnoisecritcheck" (int evt, int dmg, int type) EVENT {
script "core_hitnoise" (int type) CLIENTSIDE {
```

> 📜 acs\_source/corescripts/systems/HUDNUM.acs

```javascript
Script "core_hudnum_define" OPEN CLIENTSIDE
Script "core_HUDNum" (int cam) CLIENTSIDE {
```

> 📜 acs\_source/corescripts/systems/HZRDCRED.acs

```javascript
script "core_HazardTag" (int evt, int dmg, int type) EVENT
script "core_HazardTag_duel_e" ENTER
script "core_HazardTag_duel_r" RESPAWN
script "core_hazardtag_clear" (int who) DISCONNECT
script "core_HazardTag_manager" (int atk_tid, int vic_tid, int time) // if 0 time, use svar
```

> 📜 acs\_source/corescripts/systems/JUMPCANC.acs

```javascript
script "core_jumpcancel" ENTER 
script "core_jumpcancel_respawn" RESPAWN
script "core_trebleboostdash" (void)
script "core_walljump" (int north, int east, int south, int west)
```

> 📜 acs\_source/corescripts/systems/MAIN.acs

```javascript
script "core_mainopen" OPEN
script "core_mainenter" ENTER
script "core_mainrespawn" RESPAWN
script "core_maininit" (void)
script "core_mainunloading" UNLOADING
```

> 📜 acs\_source/corescripts/systems/MAPCARDS.acs

```javascript
script "core_cardunload" UNLOADING
script "core_mapcard" ENTER NET CLIENTSIDE
Script "core_defaultmusiccards" OPEN //CLIENTSIDE
```

> 📜 acs\_source/corescripts/systems/MUSSYS.acs

```javascript
script "core_mussys_unloading" OPEN {
script "core_st_newmax" (int curr) {
script "core_musichandler" DEATH {
script "core_disconnectmusic" (int player) DISCONNECT {
script "core_setstagemusic" (void) {
script "core_setstagemusic_client" (void) CLIENTSIDE {
script "core_setupbossoverride" (void) {
script "core_setupbossoverride_client" (void) CLIENTSIDE {
```

> 📜 acs\_source/corescripts/systems/PICKCD.acs

```javascript
script "core_spawnPickupCooldown" (int cooldownHeight, int heightOffs)
script "core_checkClientPickupCooldown" (void) CLIENTSIDE
```

> 📜 acs\_source/corescripts/systems/PRJLMT.acs

```javascript
script "core_PierceRipper_Event" (int type, int dmg, int dmgtype) EVENT {
script "core_PierceExplode_Event" (int type, int dmg, int dmgtype) EVENT {
```

> 📜 acs\_source/corescripts/systems/RADAR.acs

```javascript
script "core_ctf_CHECK" (void) {
script "core_ctf_FIRSTTICCHECK" (void)
script "core_ctf_FLAGTAKENCHECK" (void)
script "core_ctf_FLAGOBJECTSPAWN" (int index)
script "core_ctf_FLAGEVENT" (int type, int arg1, int arg2) EVENT
script "core_ctf_SKULLRETURN_Check" (void)
script "core_ctf_EVENTSOUND" (int team, int which) CLIENTSIDE {
script "core_ctf_RADAROPEN" OPEN CLIENTSIDE
script "core_ctf_RADARENTER" ENTER CLIENTSIDE {
script "core_ctf_RADARRESPAWN" RESPAWN
```

> 📜 acs\_source/corescripts/systems/RANDOMZR.acs

```javascript
script "core_randomizer_open" OPEN {
script "core_randomize_item" (void) {
script "core_randomize_wep" (void) {
```

> 📜 acs\_source/corescripts/systems/SPAWNEV.acs

```javascript
script "core_Actor_Spawned" (int type, int arg1, int arg2) EVENT
script "core_Actor_Spawned_Client" (int type, int arg1, int arg2) EVENT CLIENTSIDE
```

> 📜 acs\_source/corescripts/systems/SPWNPROT.acs

```javascript
script "core_respawnprotection_e" (void) //ENTER
script "core_campaigncheckrespawn" (void)
```

> 📜 acs\_source/corescripts/systems/teamcolors/PROJTRAN.acs

```javascript
script "core_Set_Projectile_Translation" (int i, int whites, int blacks) CLIENTSIDE {
script "core_Check_TranslateWhiteColors" (void) {
script "core_Check_TranslateBlackColors" (void) {
script "core_Check_NoTranslation" (void) {
script "core_Check_ProjectileColor_Server" (void) {
```

> 📜 acs\_source/corescripts/systems/teamcolors/TEAMCOL.acs

```javascript
script "core_callteamtranslations_open" OPEN CLIENTSIDE {
script "core_callteamtranslations_enter" ENTER CLIENTSIDE {
script "core_callteamtranslations_respawn" RESPAWN CLIENTSIDE {
script "core_callteamtranslations_disconnect" (int gone) DISCONNECT CLIENTSIDE {
script "core_callteamtranslations_net" (void) NET CLIENTSIDE {
script "core_callteamtranslations" (void) CLIENTSIDE {
script "core_loadcolors" (int preset) NET CLIENTSIDE {
script "core_savecolors" (int preset) NET CLIENTSIDE {
script "core_resetcolors" (void) NET CLIENTSIDE {
Script "core_runteambar_define" OPEN CLIENTSIDE
Script "core_runteambar" (int cam) CLIENTSIDE {
script "core_getteampalette" (int team, int col) CLIENTSIDE {
script "core_getteamRGB" (int team, int type) CLIENTSIDE{
script "core_defineprojectileteamcolors" (int team, int refTeam) {
```

> 📜 acs\_source/corescripts/systems/TERMPOSS.acs

```javascript
script "core_poss_resethandler" OPEN {
script "core_poss_resetunload" UNLOADING {
script "core_poss_victorymusic" (void) {
script "core_poss_fightmsg" (void) CLIENTSIDE {
script "core_poss_open" OPEN {
script "core_poss_runfuncs" (int player) {
script "core_poss_spawn" (void) {
script "core_poss_dropped_respawn" (int player) CLIENTSIDE {
script "core_poss_pickup" (int player) CLIENTSIDE {
script "core_term_open" OPEN {
script "core_term_runfuncs" (int player) {
script "core_term_spawn" (void) {
script "core_term_dropped_respawn" (int player) CLIENTSIDE {
script "core_term_pickup" (int player) CLIENTSIDE {
script "core_termposs_playsound" (int player, int sound) CLIENTSIDE {
```

> 📜 acs\_source/corescripts/systems/WEPACS.acs

```javascript
Script "core_ammopickup" (int amount, int AmmoMode)
script "core_ammocheck" (int any)
script "core_lmsgive" (void)
script "core_giveinstagib" (void)
script "core_lmsrandomize" OPEN
script "core_lmsrandomize_unload" UNLOADING {
script "core_drawlmsloadout" OPEN CLIENTSIDE {
script "core_eddieroller" (int ttid)
Script "core_eddiedropper" (void)
script "core_getweaponammo" (void)
script "core_getweaponammocapacity" (void)
script "core_getweaponammo2" (void)
script "core_getweaponammo2capacity" (void)
script "core_TakeOtherBusters" (void)
Script "core_getplayerweapon" (int playerno)
script "core_lmsdrawqueue" (int who, int icontag, int flag, int cvar) CLIENTSIDE
```

> 📜 acs\_source/corescripts/table defs/COREAMO.acs

```javascript
Script "core_ammos" OPEN
```

> 📜 acs\_source/corescripts/table defs/COREAST.acs

```javascript
Script "core_assists_define" OPEN CLIENTSIDE
Script "core_assists" (int cam) CLIENTSIDE
```

> 📜 acs\_source/corescripts/table defs/COREBAR.acs

```javascript
Script "core_HPbarfx_define" OPEN CLIENTSIDE {
Script "core_HPbarfx" (int cam) CLIENTSIDE {
script "DrawBar_ProtoBuster" (void) {
script "DrawBar_ArrowBuster" (void) {
script "DrawBar_LaserBuster" (void) {
script "DrawBar_DuoFist_Campaign" (void) {
script "DrawBar_DuoFist" (void) {
script "DrawBar_SuperAdaptorWep" (void) {
script "DrawBar_MegaArm" (void) {
script "DrawBar_OilSliderWep" (void) {
script "DrawBar_TimeSlowWep" (void) {
script "DrawBar_AtomicFireWep" (void) {
script "DrawBar_LeafShieldWep" (void) {
script "DrawBar_SparkShockWep" (void) {
script "DrawBar_PharaohShotWep" (void) {
script "DrawBar_SkullBarrierWep" (void) {
script "DrawBar_FlashStopperWep" (void) {
script "DrawBar_StarCrashWep" (void) {
script "DrawBar_PlantBarrierWep" (void) {
script "DrawBar_CentaurFlashWep" (void) {
script "DrawBar_NoiseCrushWep" (void) {
script "DrawBar_WildCoilWep" (void) {
script "DrawBar_ScorchWheelWep" (void) {
script "DrawBar_JunkShieldWep" (void) {
script "DrawBar_HomingSniperWep" (void) {
script "DrawBar_TornadoHoldWep" (void) {
script "DrawBar_RemoteMineWep" (void) {
script "DrawBar_IceWallWep" (void) {
script "DrawBar_TenguBladeWep" (void) {
script "DrawBar_BlackHoleBombWep" (void) {
script "DrawBar_JewelSatelliteWep" (void) {
script "DrawBar_MagmaBazookaWep" (void) {
script "DrawBar_HornetChaserWep" (void) {
script "DrawBar_WheelCutterWep" (void) {
script "DrawBar_WaterShieldWep" (void) {
script "DrawBar_PhotonMissileWep" (void) {
script "DrawBar_BlackHoleWep" (void) {
script "DrawBar_DeepDiggerWep" (void) {
script "DrawBar_BreakDashWep" (void) {
script "DrawBar_MirrorBusterWep" (void) {
script "DrawBar_DawnBreakerWep" (void) {
```

> 📜 acs\_source/corescripts/table defs/COREBUS.acs

```javascript
Script "core_busters" OPEN
```

> 📜 acs\_source/corescripts/table defs/CORECHRG.acs

```javascript
script "core_defineteamcolordef" OPEN CLIENTSIDE {
script "core_defineteamcolors" (int team, int refTeam) CLIENTSIDE
```

> 📜 acs\_source/corescripts/table defs/CORECOL.acs

```javascript
Script "core_translations" OPEN CLIENTSIDE
```

> 📜 acs\_source/corescripts/table defs/COREITEM.acs

```javascript
Script "core_items" OPEN
```

> 📜 acs\_source/corescripts/table defs/COREPOW.acs

```javascript
script "core_aproppowers" OPEN
script "core_watergravity" (int grav)
```

> 📜 acs\_source/corescripts/table defs/CORESPFN.acs

```javascript
script "core_spawnfuncs" OPEN
script "core_spawnfuncs_client" OPEN CLIENTSIDE
script "core_projtransgive" (void)
script "core_projtransgiveclient" (void)
```

> 📜 acs\_source/corescripts/table defs/CORETID.acs

```javascript
Script "core_reservetids" OPEN
```

> 📜 acs\_source/corescripts/table defs/CORETPOS.acs

```javascript
script "core_termposs_pickupfuncs" OPEN {
script "core_terminator_gives" (void) {
script "core_possession_gives" (void) {
script "core_poss_holdeffect" (void) {
```

> 📜 acs\_source/corescripts/table defs/CORETRAN.acs

```javascript
script "core_training_register" OPEN
Script "core_definetrainingitems" (void)
```

> 📜 acs\_source/corescripts/utilities/ACTRUTIL.acs

```javascript
script "core_getPlayersInRadius" (int radius, int flags, int pointer, int unused)
Script "core_checkDistance" (int Distance)
script "core_getplayerteam" (int player)
script "core_moveme" (int velx, int vely, int velz)
script "core_targetexists" (int tracer, int noTID)//This is for projectiles to check if their owner spectated, disconnected, or is dead.
script "core_getspeed" (int l)
script "core_getactorx" (int pointer, int tid, int fixed)
script "core_getactory" (int pointer, int tid, int fixed)
script "core_getactorz" (int pointer, int tid, int fixed)
script "core_radiusPull" (int maxforce, int maxRange, int noFalloff)
script "core_knockback" (int force, int forcez, int aimed, int ptr)
script "core_GetActorArg" (int tid, int argNum)
script "core_SetArgHold" (int i) CLIENTSIDE
script "core_getarmorinfo" (int info, int ptr)
script "core_teamexplode" (int type, int dmg, int range, int fullRange)
script "core_damageactor" (int type, int amt, int target, int owner)
script "core_elecbeam" (int mn, int mx)
Script "core_clearbotline" (int line)
script "core_GiveActorReplacedInventory" (int tid, int item, int amount)
script "core_GiveReplacedInventory" (int item, int amount)
script 942 (int mn, int mx) { ACS_NamedExecuteWithResult("core_elecbeam", mn, mx); }
```

> 📜 acs\_source/corescripts/utilities/amochec.acs

```javascript
script "core_CanGainAmmo" (int any) // this arg forces Energy Balancer check
script "core_AmmoScript" (int amount)
script "core_AmmoScript_MTank" (void)
```

> 📜 acs\_source/corescripts/utilities/ANGUTIL.acs

```javascript
Script "core_aimattargetcursor" (int AimTarget, int HeightAdjust)
script "core_getPtrAngle" (int ptr)
script "core_lookatptr" (int ptr) {
Script "core_targetyawpitch" (int PitchAngle)
script "core_setpointerpitch" (int pitch, int ptr)
script "core_predicthome" (int spd, int ptr, int timeOffs)
script "core_SetVelPitch" (int tid1, int tid2)
script "core_SetToPtrPitchYaw" (int ptr)
script "core_GetPtrPitch" (int ptr, int tid, int fixed)
```

> 📜 acs\_source/corescripts/utilities/CUSTSTA.acs

```javascript
script "core_updatecustomstate" (int i)
script "core_setcustomstate" (int i)
script "core_count_customstateflag" (void)
script "core_set_customstateflag" (int amount)
```

> 📜 acs\_source/corescripts/utilities/FOOTCHEC.acs

```javascript
script "core_CheckFooting" (void) {
script "core_CheckFooting_ThruPlayer" (void) {
script "core_checkWall_north" (void) {
script "core_checkWall_east" (void) {
script "core_checkWall_south" (void) {
script "core_checkWall_west" (void) {
```

> 📜 acs\_source/corescripts/utilities/HITSHLD.acs

```javascript
script "core_hitshield" (int hits, int customProtect)
```

> 📜 
>
> acs\_source/corescripts/utilities/hpchec.acs

```javascript
script "core_CanGainHealth" (void)
script "core_getmaxhealth" (int ptr) {
script "core_gethealth" (int ptr) {
script "core_RegenerationRune" (void)
script "core_HealScript" (int amount)
```

> 📜 acs\_source/corescripts/utilities/MAPTOOLS.acs

```javascript
script "map_watersplash" (int direction, int entering, int eyes)
script "map_gelsplash" (int direction, int entering, int eyes)
script "map_teleportfog" (void)
script "map_itemfog" (void)
script "map_stagemusic" (int client) {
script "map_bossoverride" (int client) {
script "map_bouncesound" (int sound, int force)
script "map_bouncepad_vertical" (int force, int superforce, int sound)
script "map_bouncepad_horizontal" (int force, int angle, int sound)
script "map_teleportto" (int dest)
script 973 (int dest) { ACS_NamedExecuteWithResult("map_teleportto", dest); }
script 985 (int force, int superforce, int sound) { ACS_NamedExecuteWithResult("map_bouncepad_vertical", force, superforce, sound); }
script 987 (int force, int angle, int sound) { ACS_NamedExecuteWithResult("map_bouncepad_horizontal", force, angle, sound); }
```

> 📜 acs\_source/corescripts/utilities/PACKUTIL.acs

```javascript
script "core_packShorts" (int x, int y)
script "core_unpackShort1" (int x) { setResultValue(unPackShort1(x)); }
script "core_unpackShort2" (int x) { setResultValue(unPackShort2(x)); }
script "core_packBytes" (int r, int g, int b, int a)
script "core_unpackByte1" (int x) { setResultValue(unPackByte1(x)); }
script "core_unpackByte2" (int x) { setResultValue(unPackByte2(x)); }
script "core_unpackByte3" (int x) { setResultValue(unPackByte3(x)); }
script "core_unpackByte4" (int x) { setResultValue(unPackByte4(x)); }
```

> 📜 acs\_source/corescripts/utilities/PRESPAWN.acs

```javascript
script "core_respawnspot" (int ptr, int type) {
```

> 📜 acs\_source/corescripts/utilities/PRJCHAIN.acs

```javascript
Script "core_drawhookshot" (int playerTid, int density, int horiOffset, int flags) CLIENTSIDE
```

> 📜 acs\_source/corescripts/utilities/PROPUTIL.acs

```javascript
script "core_setactorproperty" (int prop, int mult, int div) {
script "core_getactorproperty" (int tid, int prop, int type)
script "core_changeClientProperty" (int prop, int val, int chkptr) CLIENTSIDE
script "core_alphaprojectile" (int who, int teamMode, int minAlpha, int maxDist) CLIENTSIDE
script "core_freezeplayer" (int player, int toggle) {
script "core_stopplayer" (int player, int toggle) {
script "core_invulnerableplayer" (int player, int toggle) {
script "core_flyplayer" (int player, int toggle, int forced) {
script "core_nogravityplayer" (int player, int toggle, int forced) {
script "core_groundplayer" (int player, int toggle) {
script "core_runeplayer" (int player, int toggle, int mode) {
script "core_checkrune" (int rune, int ptr) {
script "core_buddhaplayer" (int player, int toggle) {
script "core_nonshootableplayer" (int player, int toggle) {
script "core_nopushplayer" (int player, int toggle) {
script "core_cantseekplayer" (int player, int toggle) {
script "core_invisibleplayer" (int player, int toggle) {
script "core_dontidentifytargetplayer" (int player, int toggle) {
script "core_notargetplayer" (int player, int toggle) {
script "core_monsterblockplayer" (int player, int toggle) {
script "core_airjumpplayer" (int player, int toggle, int mode) {
script "core_walljumpplayer" (int player, int toggle, int mode) {
script "core_unsolidplayer" (int player, int toggle, int damage) {
script "core_resolidcheck" (void) {
script "core_resolidcountdamage" (void) {
```

> 📜 acs\_source/corescripts/utilities/PTRUTIL.acs

```javascript
Script "core_gettarget" (int l, int pln)
Script "core_gettracer" (int l)
Script "core_getmaster" (int l)
script "core_getptrtid" (int ptr) {
script "core_getptrteam" (int ptr) {
script "core_gettidteam" (int tid) {
script "core_compareptr" (int ptr1, int ptr2) {
script "core_setpointer" (int assign_slot, int tid, int pointer_selector) {
script "core_setTIDsPointerToThis" (int tid, int pointer) {
```

> 📜 acs\_source/corescripts/utilities/SYSUTIL.acs

```javascript
script "core_checkmode" (int checkmode)
Script "core_bossmusicstate" (int Mode, int MusicToValue)
```

> 📜 acs\_source/corescripts/utilities/UNQUETID.acs

```javascript
script "core_uniquetid" (int start, int limit) {
script "core_createUniqueTID_open" OPEN {
script "core_NewUniqueTID" (void) {
script "core_CurrentUniqueTID" (void) {
script "core_ClearUniqueTID" (int tid) {
```

## See Also

---

[ACS Script Reference](./README.md)
