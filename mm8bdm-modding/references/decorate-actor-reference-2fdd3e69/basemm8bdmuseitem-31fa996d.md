---
title: "BaseMM8BDMUseItem"
notion_id: 31fa996d65aa405d949be4942042ea82
source: https://www.notion.so/31fa996d65aa405d949be4942042ea82
---

# BaseMM8BDMUseItem

---

`BaseMM8BDMUseItem` takes all the aspects of [BaseMM8BDMItem](./basemm8bdmitem-c44bd5a5.md), but is intended for use with all assist items.

To create an assist item, inherit from `BaseMM8BDMUseItem` and override the `SpawnLoop` state. This allows the pickup access to all spawn functions of type `SFT_ITEM`, as well as an easy implementation for a respawn timer visual.

## DECORATE Definition

---

> 🚨 **Wait! Stop! Before you copy this actor's definition into your mod, remember the following things:**
>
> - **You do **<u>**not**</u>** need to copy this actor, since it is already defined.**
>
> - **In fact, it's not just useless, it's actually **<u>**harmful**</u>** as it can cause problems.**
>
> - **If you want to use it as a basis, **[**using inheritance**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** is the way to go.**
>
> - **The actor definitions here are put on the wiki for reference purpose only. Learn from them, don't copy them into your mod.**

```c
actor BaseMM8BDMUseItem : CustomInventory
{
	//$NotAngled
	//$Color 17
	Scale 2.0
	+INVBAR
	+THRUACTORS
	var int user_spawnPosX;
	var int user_spawnPosY;
	var int user_spawnPosZ;
	var int user_RemoveAsAssistItem;
	mass 40 	  // respawn cooldown height (in pixels)
	accuracy 16 // respawn shadow height (in pixels)
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_CheckFlag(DROPPED, "SpawnReady")
			TNT1 A 0 A_SetUserVar(user_spawnPosX, x)
			TNT1 A 0 A_SetUserVar(user_spawnPosY, y)
			TNT1 A 0 A_SetUserVar(user_spawnPosZ, z)
		SpawnReady:
			TNT1 A 1 A_GiveInventory("MM8BDMItemSpawnFunc",1)
			TNT1 A 0 A_ChangeFlag("THRUACTORS", false)
			TNT1 A 1 A_Jump(256, "SpawnLoop")
			wait
		SpawnLoop:
			WEAP X 1
			loop
		HideDoomish:
			TNT1 A 1400 ACS_NamedExecuteWithResult("core_spawnPickupCooldown", mass, accuracy)
			TNT1 A 0 A_RestoreSpecialPosition
			TNT1 A 1 A_RestoreSpecialDoomThing
			stop
	}
}
```

### Respawn Indicators

The following properties should be specified for proper respawn indicators:

- `Mass` - The height of the graphic used for the respawn timer graphic - in pixels. (Default 40)

- `Accuracy` - Height of the graphic used for the item’s respawn shadow graphic within the timer - in pixels. (Default 16)

> 💡 **Note: If either of the last two values are set to 0, the respawn timer script will not attempt to spawn a respawn timer. This can be a handy way to easily opt out of giving a respawn timer to an item.**

The script that spawns the respawn timer attempts to spawn two actors on pickup. It will take the name of the actor and append `“_Respawn”` (for the respawn timer) and `“_RespawnShadow”` (for the respawn shadow) to its name to spawn the actors that handle the respawn timer functionality. These actors can be anything, but typically inherit from a set of stock actors.

Respawn timer actors tend to inherit from the following actors to attain the required animations.

- `8BDMItemRespawn` - A basic blue and cyan item respawn circle with 8 segments. Can easily apply a `translation` to this to make it match your item token’s colors. 40 pixels tall.

- `8BDMColoredItemRespawn` - An 8-segmented respawn circle that copies the user’s colors in the same manner as certain pickups. 40-pixels tall.

- `8BDMItemRespawnSmall` - A small blue and cyan item respawn circle that is unsegmented. Can easily apply a `translation` to this to make it match your item token’s colors. 20 pixels tall.

- `8BDMColoredItemRespawnSmall` - A small, unsegmented respawn circle that copies the user’s colors in the same manner as certain pickups. 20 pixels tall.

All `Colored` item respawns can also be given a `translation` for when the user does not have pickup colors enabled.

These actors also use the `Mass` property to determine how long the respawn timer should exist for, in tics. (Default 1050, which is 30 seconds.)

Respawn shadow actors tend to inherit from `8BDMItemRespawnShadow`. This actor has no default animations, so a `Spawn` state must be specified. Unless the `translation` is overridden, the animation specified in the `Spawn` state will appear grayscale.

Like all actors inheriting from `8BDMItemRespawn`, specify a `Mass` to display the proper respawn time, in tics. (Default 1050, which is 30 seconds.)

## Example

---

Below is the Tango pickup actors from MM8BDM. Please note how the actor names are configured

```c
actor TangoSummon : BaseMM8BDMUseItem 10156
{
	//$Category MM8BDM-Assists/Weapon
	//$Title Tango Roll
	//$Sprite WEA3B0
	Inventory.RespawnTics 350 // 350 tics = 10 seconds.
	inventory.amount 1
	inventory.maxamount 1
	inventory.pickupmessage "$PU_TANGOROLL"
	Tag "$TAG_TANGOSUMMON"
	inventory.icon "TANGOSI"
	Inventory.PickupSound "item/1up"
	scale 2.0
	+COUNTITEM
	+INVBAR
	mass 40 	  // respawn cooldown height (in pixels)
	accuracy 16 // respawn shadow height (in pixels)
	states
	{
		SpawnLoop:
			WEA3 B -1
			loop
		Use:
			WEA3 B 0 A_PlaySoundEx("item/refill","Voice")
			WEA3 B 0 A_SpawnItemEx("TangoTeleport", 40, 0, 256, 0, 0, -24, 0, SXF_NOCHECKPOSITION, 0)
			stop
	}
}

actor TangoSummon_Respawn : 8BDMItemRespawn // this respawn timer is 40 pixels tall. See TangoSummon's mass.
{
	translation "192:192=201:201", "198:198=128:128"
	mass 350 // this number matches TangoSummon's Inventory.RespawnTics
}
actor TangoSummon_RespawnShadow : 8BDMItemRespawnShadow
{
	mass 350 // same here
	States
	{
		Spawn:
			WEA3 B 0 // this icon is 16 pixels tall. See TangoSummon's Accuracy.
			goto Super::Spawn
	}
}
```

## See Also

---

[Creating Assist Items](../interacting-with-systems-c99b6cab/creating-assist-items-d57d327f.md)

[BaseMM8BDMItem](./basemm8bdmitem-c44bd5a5.md) 

[BaseMM8BDMBusterUpgrade](./basemm8bdmbusterupgrade-ce8d4a6a.md)
