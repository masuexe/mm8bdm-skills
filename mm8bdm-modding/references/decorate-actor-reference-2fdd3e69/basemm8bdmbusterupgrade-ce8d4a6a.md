---
title: "BaseMM8BDMBusterUpgrade"
notion_id: ce8d4a6a853145708028a62aa8b1c1db
source: https://www.notion.so/ce8d4a6a853145708028a62aa8b1c1db
---

# BaseMM8BDMBusterUpgrade

---

`BaseMM8BDMBusterUpgrade` takes all the aspects of [BaseMM8BDMUseItem](./basemm8bdmuseitem-31fa996d.md), but is intended for use with all buster upgrades.

To create an buster upgrade, inherit from `BaseMM8BDMBusterUpgrade` and override the `SpawnLoop` state. This allows the pickup access to all spawn functions of type `SFT_ITEM`, as well as an easy implementation for a respawn timer visual.

Finally, in the Use state, make sure you give `BusterGiven` before you give the actual buster weapon, as that is what clears your current takeable busters.

This type of item cannot be picked up by classes which inherit from [CustWepClassBase](./custwepclassbase-6e611b72.md) nor by players who have the `"NoBusterUpgrades"` inventory flag.

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
actor BaseMM8BDMBusterUpgrade : BaseMM8BDMUseItem
{
	//$Color 5
	var int user_RemoveAsBusterUpgrade;
	Inventory.ForbiddenTo "CustWepClassBase"
	states
	{
		Pickup:
			TNT1 A 0 A_JumpIfInventory("NoBusterUpgrades",1,"PickupNo")
			TNT1 A 0 A_RailWait
			stop
		PickupNo:
			TNT1 A 0
			fail
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

Below is the Bass Buster Upgrade actors from MM8BDM. Please note how the actor names are configured

```c
actor BassUpgrade : BaseMM8BDMBusterUpgrade 10155
{
	//$Category MM8BDM-Weapons/Buster
	//$Title Bass Upgrade
	//Inventory.RespawnTics 350
	//$Sprite WEA3A0
	inventory.amount 1
	inventory.maxamount 1
	inventory.pickupmessage "$PU_BASSBUSTER"
	Tag "$TAG_BASSUPGRADE"
	inventory.icon "BASSUP"
	Inventory.PickupSound "item/1up"
	Inventory.RespawnTics 350 // 350 tics = 10 seconds.
	scale 2.0
	+COUNTITEM
	+INVBAR
	mass 40 	  // respawn cooldown height (in pixels)
	accuracy 16 // respawn shadow height (in pixels)
	states
	{
		SpawnLoop:
			WEA3 A 1
			loop
		Use:
			WEA2 Q 0 A_PlaySoundEx("item/refill","Voice")
			TRBB I 0 A_GiveInventory("BusterGiven",1)
			WEA3 A 0 A_GiveInventory("BassBuster",1)
			WEA3 A 0 A_SelectWeapon("BassBuster")
			stop
	}
}

actor BassUpgrade_Respawn : 8BDMItemRespawn // this respawn timer is 40 pixels tall. See BassUpgrade's mass.
{
	translation "192:192=217:217", "198:198=95:95"
	mass 350 // this number matches BassUpgrade's Inventory.RespawnTics
}
actor BassUpgrade_RespawnShadow : 8BDMItemRespawnShadow
{
	mass 350 // same here
	States
	{
		Spawn:
			WEA3 A 0 // this icon is 16 pixels tall. See BassUpgrade's Accuracy.
			goto Super::Spawn
	}
}
```

## See Also

---

[Creating Buster Upgrades](../interacting-with-systems-c99b6cab/creating-buster-upgrades-058630f6.md)

[BaseMM8BDMItem](./basemm8bdmitem-c44bd5a5.md) 

[BaseMM8BDMUseItem](./basemm8bdmuseitem-31fa996d.md) 
