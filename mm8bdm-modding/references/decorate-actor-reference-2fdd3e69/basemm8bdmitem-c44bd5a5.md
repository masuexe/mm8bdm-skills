---
title: "BaseMM8BDMItem"
notion_id: c44bd5a5b2e246b88d45a131662336b5
source: https://www.notion.so/c44bd5a5b2e246b88d45a131662336b5
---

# BaseMM8BDMItem

---

All normal pickups in MM8BDM should inherit from `BaseMM8BDMItem` and override the `SpawnLoop` state. This allows the pickup access to all spawn functions of type `SFT_ITEM`, as well as an easy implementation for a respawn timer visual.

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
actor BaseMM8BDMItem : CustomInventory
{
	//$NotAngled
	Scale 2.0
	+THRUACTORS
	var int user_spawnPosX;
	var int user_spawnPosY;
	var int user_spawnPosZ;
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

### Custom Properties

The follow custom flags affect the situations in which this actor spawns:

- `var int user_RemoveAsHealth` - Removes the actor if health is entirely disabled.

- `var int user_RemoveAsSmallHealth` - Removes the actor if small health is disabled.

- `var int user_RemoveAsAmmo` - Removes the actor if ammo is entirely disabled.

- `var int user_RemoveAsSmallAmmo` - Removes the actor if small ammo is disabled.

- `var int user_RemoveAsArmor` - Removes the actor if armor is entirely disabled.

- `var int user_RemoveAsSmallArmor` - Removes the actor if small armor is disabled.

> 💡 **Note: Actors intended to be removed if the small version is disabled should have both variations of the flag.**

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

Below are the small Weapon Energy actors from MM8BDM. Please note how the actor names are configured.

```c
actor WeaponEnergy : BaseMM8BDMItem 10003
{
	//$Category MM8BDM-Energy
	//$Title Weapon Energy
	//$Sprite EBALA0
	//$Color 9
	Inventory.RespawnTics 1050  // 1050 tics = 30 seconds.
	var int user_RemoveAsSmallAmmo;
	var int user_RemoveAsAmmo;
	inventory.pickupmessage "$PU_SMALLENERGY"
	inventory.amount 1
	inventory.pickupsound "item/energyup"
	Scale 2.0
	mass 20 	 // respawn cooldown height (in pixels)
	accuracy 8 // respawn shadow height (in pixels)
	States
	{
		SpawnLoop:
			EBAL A 0
			EBAL A 0 A_JumpIf(tid!=0, 2)
			EBAL A 0 Thing_ChangeTID(0,999)
			EBAL AB 6
			Goto SpawnLoop+3
		Pickup:
			TNT1 A 0 ACS_NamedExecuteWithResult("core_AmmoScript",30)
			stop
	}
}

actor WeaponEnergy_Respawn : 8BDMColoredItemRespawnSmall // this respawn timer is 20 pixels tall. See WeaponEnergy's mass.
{
	mass 1050 // this number matches WeaponEnergy's Inventory.RespawnTics
}
actor WeaponEnergy_RespawnShadow : 8BDMItemRespawnShadow
{
	mass 1050 // This too
	States
	{
		Spawn:
			EBAL A 0 // this icon is 8 pixels tall. See WeaponEnergy's Accuracy.
			goto Super::Spawn
	}
}
```

## See Also

---

[BaseMM8BDMUseItem](./basemm8bdmuseitem-31fa996d.md) 

[BaseMM8BDMBusterUpgrade](./basemm8bdmbusterupgrade-ce8d4a6a.md)
