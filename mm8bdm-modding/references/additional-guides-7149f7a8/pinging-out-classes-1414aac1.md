---
title: "Pinging Out Classes"
notion_id: 1414aac16ea54cd880a6d96c661b088f
source: https://www.notion.so/1414aac16ea54cd880a6d96c661b088f
---

# Pinging Out Classes

---

[Ping Button](https://mm8bdm.net/forum/thread/ping-button-127) is an unofficial quality of life addon which allows players to ping locations in lieu of using voice chat functions.

<!-- image omitted (assets not vendored) -->

Recently introduced to the addon is the ability to mark players using its “alert” type ping, which will show an additional mugshot alongside the ping. This page will detail the few steps needed to make sure that your classes will be able to show that mugshot.

## Giving Notice

---

Ping Button’s class support works first off of a notice system. When it attempts to draw an icon for any class, it’ll first check for the existence of a DECORATE actor using a naming scheme of `PBMug_[ActorClassName]`, where `[ActorClassName]` is the **actor name** of your class. Below are a few examples of this style of actor being defined.

```c
actor PBMug_MegamanC {}
actor PBMug_Protoman {}
actor PBMug_Bass {}
actor PBMug_Duo {}
actor PBMug_Maestro {}
actor PBMug_RockClass {}
actor PBMug_RollClass {}
actor PBMug_AutoClass {}
actor PBMug_LightRyu {}
actor PBMug_DrWily {}
actor PBMug_SniperJoe {}
```

## Getting the Graphic Name

---

Once Ping Button finds that DECORATE actor, it’ll attempt to execute an ACS script with the exact same naming scheme of `PBMug_[ActorClassName]`. This’ll be a script that you implement in your class’s file. All the script needs to do is use [`SetResultValue`](https://zdoom.org/wiki/SetResultValue) to return the graphic your class uses for their `player.scoreicon` property. Below is an example:

```javascript
script "PBMug_Napalmman" (int tid) CLIENTSIDE { SetResultValue("C_05G0X"); }
```

When these scripts are called, they are passed a TID parameter which can be used for more advanced logic to determine which mugshot to return. Below is an example of Auto who returns a different mugshot depending on whether or not he’s equipped his helmet.

```javascript
script "PBMug_AutoClass" (int tid) CLIENTSIDE { 
    if(CheckActorInventory(tid, "AutoEquippedHisHelmet") > 0) {
        SetResultValue("192GRIN");
    } else {
        SetResultValue("C_00G0X");
    }
}
```

Once both the DECORATE actor and respective script is implemented, you’ll be able to see the pings in action!

<!-- image omitted (assets not vendored) -->

## Example File

---

[PB-CBMSupport-v1a.pk3](../assets/9852dbad96a248ab812fb6642f18007c-PB-CBMSupport-v1a.pk3)

## See Also

---

[Creating Classes](../interacting-with-systems-c99b6cab/creating-classes-5863e4dc.md)

[Custom Classes with CBM](./custom-classes-with-cbm-2196ad22.md)
