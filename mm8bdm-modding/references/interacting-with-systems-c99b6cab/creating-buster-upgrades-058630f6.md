---
title: "Creating Buster Upgrades"
notion_id: 058630f664914d46941d35b7a6b5bba2
source: https://www.notion.so/058630f664914d46941d35b7a6b5bba2
---

# Creating Buster Upgrades

---

> ⚠️ **Warning: Before beginning this tutorial, you should have already read through and completed the tutorial for creating a **[**basic weapon**](./creating-weapons-bf312efa.md)**, **[**advanced weapon**](./advanced-weapons-d87e2f5f.md)**, and **[**assist item**](./creating-assist-items-d57d327f.md)**. Buster upgrades build on the concepts of all of these types of items!**

Buster upgrades are a class of assist item which give you a new default weapon in lieu of the Mega Buster whenever activated. As you might be able to imagine, this means that in their implementation, they’re a mix between assist items and weapons. 

Although this may sound daunting, it actually makes them fairly easy to implement so long as you already understand implementing those other two groups. This page will implement a Proto Strike buster upgrade, inspired by Proto Man’s gameplay from Mega Man Powered Up.

## The Item Portion

---

Let’s start by showing the item pickup portion of our Buster Upgrade.

```c
actor ProtoStrikeUpgrade : BaseMM8BDMBusterUpgrade
{
	inventory.pickupmessage "$PU_PROTOSTRIKE"
	Inventory.pickupsound "item/1up"
	inventory.icon "PTROSTRK"
	tag "$TAG_PROTOSTRIKEUPGRADE"

	inventory.amount 1
	inventory.maxamount 1
	Inventory.respawntics 350
	
	States
	{
		SpawnLoop:
			PRST A 1
			loop
		Use:
			TNT1 A 0 A_PlaySoundEx("item/refill", "Voice")
			TNT1 A 0 A_GiveInventory("BusterGiven",1)
			TNT1 A 0 A_GiveInventory("ProtoStrike",1)
			TNT1 A 0 A_SelectWeapon("ProtoStrike")
			stop
	}
}

actor ProtoStrikeUpgrade_Respawn : 8BDMItemRespawn
{
	translation "192:192=87:87", "198:198=42:42"
	mass 350
}

actor ProtoStrikeUpgrade_RespawnShadow : 8BDMItemRespawnShadow
{
	mass 350
	States
	{
		Spawn:
			PRST A 0
			goto Super::Spawn
	}
}
```

Unlike assist items, every buster upgrade inherits from [BaseMM8BDMBusterUpgrade](../decorate-actor-reference-2fdd3e69/basemm8bdmbusterupgrade-ce8d4a6a.md). This parent actor automatically handles some logic on pickup regarding whether a player should be able to pick the buster upgrade up or not.

The `Use` state for the buster upgrade should more or less always look like this one, so let’s walk through what this one is doing.

```c
Use:
	TNT1 A 0 A_PlaySoundEx("item/refill", "Voice")
	TNT1 A 0 A_GiveInventory("BusterGiven",1)
	TNT1 A 0 A_GiveInventory("ProtoStrike",1)
	TNT1 A 0 A_SelectWeapon("ProtoStrike")
	stop
```

First, it plays the activation sound. Next, it gives an internally defined `BusterGiven` flag. This is just a simple inventory item that will come in handy later. Next, we give the actual buster weapon which we’re about to define. Once that’s given, we use [`A_SelectWeapon`](https://zdoom.org/wiki/A_SelectWeapon) to attempt to force swap the player to the newly given weapon.

The `ProtoStrikeUpgrade_Respawn` and `ProtoStrikeUpgrade_RespawnShadow` should look familiar to the similar actors created for assist items. For brevity sake, the details won’t be repeated here, but they function exactly the same for buster upgrades as they do for assist items. See the [assist item tutorial](./creating-assist-items-d57d327f.md) for details if you’ve forgotten or skipped ahead.

## The Weapon Portion

---

Now that we’ve seen what the item portion of our buster upgrade looks like, let’s take a look at the weapon and pinpoint some of the new elements.

```c
actor ProtoStrike_MugshotColor : MugshotColor { args 87, 42 }

actor ProtoStrike : BaseMM8BDMWep
{
	Weapon.AmmoUse 1
	Weapon.AmmoGive 3
	weapon.ammotype "BusterAmmo"
	
	Weapon.SlotNumber 1
	
	Inventory.Pickupmessage "$PU_PROTOSTRIKE"
	Obituary "$OB_PROTOSTRIKE"
	Tag "$TAG_PROTOSTRIKE"
	
	inventory.icon "NULLICON"
	Dropitem ""
	
	States
	{
		SpawnLoop:
			PRST A 1
			stop
			
		Ready:
			PRST B 0 A_JumpIfInventory("BusterGiven",1,"TakeBusters")
			Goto Ready2
		TakeBusters:
			PRST B 0 A_GiveInventory("TakeBuster", 1)
			Goto Ready2
		Ready2:
			PRST B 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_PROTOBUSTER)
			PRST B 1 A_WeaponReady
			Goto Ready2+1
			
		Select:
			PRST B 0
			goto SelectSwap
		Deselect:
			PRST B 0
			goto DeselectSwap
			
		Fire:
			PRST B 0 A_PlaySoundEx("weapons/busters/protostrikefire", "Weapon")
			PRST B 0 A_FireCustomMissile("ProtoStrikeShot", 0, 0, 8, 0)
			PRST B 0 A_ChangeVelocity(-cos(pitch)*9, 0, sin(pitch)*9, CVF_RELATIVE)
			PRST CDEFGH 2
			PRST B 17
			PRST B 0 A_Refire
			goto Ready2+1
	}
}
```

If you remember from earlier tutorials, weapons typically will have an ammo bar and thus a `NormalBar` actor associated with it, but what to do with buster upgrades which are typically infinite ammo? 

We still want some mechanism that defines colors for the weapon, otherwise Maestro’s mugshot won’t look quite right while holding the weapon. That’s where the `MugshotColor` actor comes in. The below code defines that Maestro’s mugshot should use palette color 87 for the cyan portion and palette color 42 for the blue portion, but does it without drawing any ammo bar.

```c
actor ProtoStrike_MugshotColor : MugshotColor { args 87, 42 }
```

If you want some more advanced logic for determining the mugshot colors, you also have the option of creating a `ScriptBar` actor and using [SetMugshotColor](./setmugshotcolor-c71038d3.md) in the corresponding `DrawBar_` script. This is what all of the charging buster upgrades do in core MM8BDM.

> 🚨 **Even though buster upgrades are infinite ammo, their weapons should always still define at least one of its ammo types as **`BusterAmmo`** with a **`weapon.ammogive`** of 1. This is required to prevent some esoteric issues in the Training Room.**

Buster upgrades typically do not use a weapon icon, so that is set to `NULLICON` in our case. Additionally, we do not want players to drop this weapon whenever they die and weapon dropping is enabled. To rectify that, we define the property below:

```c
Dropitem ""
```

As mentioned earlier, when a player receives a buster upgrade, it should be as a replacement to their Mega Buster (or previous buster upgrade). This is where that earlier `BusterGiven` flag and the `Ready` state in the weapon above come into play.

```c
Ready:
	PRST B 0 A_JumpIfInventory("BusterGiven",1,"TakeBusters")
	Goto Ready2
TakeBusters:
	PRST B 0 A_GiveInventory("TakeBuster", 1)
	Goto Ready2
Ready2:
	PRST B 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_PROTOBUSTER)
	PRST B 1 A_WeaponReady
	Goto Ready2+1
```

Essentially, when the weapon is first equipped, if the player has `BusterGiven`, that will jump to another state where `TakeBuster` is given. `TakeBuster` is an internally defined inventory actor in MM8BDM which takes all defined buster weapons (except the currently held one) as well as the `BusterGiven` flag. Once the player no longer has `BusterGiven`, `Ready2` is used as the idle state.

The end result of this is that the player now has our buster weapon selected and they’ve lost all of their other buster weapons in an invisible manner.

## The ACS Portion

---

Like both weapons and assist items, we also need to do some extra work in ACS to make sure that the existence of our newly created buster upgrade is known. Like always, we’ll use some functions from `DTADD.acs` to accomplish this.

```c
#library "PRTOSTRK"
#include "zcommon.acs"

#include "DTADD.acs"

// General buster upgrade setup
script "protostrike_info" OPEN {
	DefineBusterUpgradeAndTake("TAG_PROTOSTRIKE", "ProtoStrike", "TAG_PROTOSTRIKEUPGRADE", "ProtoStrikeUpgrade", "PRSTA0", true, true, true);
}
```

[DefineBusterUpgradeAndTake](./definebusterupgradeandtake-7767993e.md) is a function that’s made up of two parts. It first tells the game that your newly created weapon actor that should be taken whenever a different buster upgrade is given, hence the `Take` portion of the name. It also defines information that allows your buster upgrade to appear from pickup randomization and in LMS’s weapon loadout. Below are the parameters for this function.

- `busterTag`: String - The buster's language definition, or its proper name (Ex. `"TAG_PROTOBUSTER"` or `"Proto Buster"`)

- `busterActor`: String - Actor name of the buster weapon. (Ex. `ProtoBuster`).

- `busterUpgradeTag`: String - The Buster Upgrade's language definition (Ex. `"TAG_PROTOUPGRADE"` or `"Proto Upgrade"`)

- `busterUpgrade`: String - Actor name of the Buster Upgrade pickup. (Ex. `ProtoUpgrade`)

- `busterIcon`: String - The weapon's spawn sprite. (Ex. `"WEA2Q0"`)

- `busterMapValid`: Bool - Can you pick this Buster Upgrade from maps?

- `busterLMSValid`: Bool - Can you get this Buster Upgrade in LMS?

- `busterEddieValid`: Bool - Can you get this Buster Upgrade from Eddie?

Also like weapons and assist items, we’ll want to add our new buster upgrade to the training room. This setup is more or less exactly the same as for weapons, using both [RegisterTrainingDef](./registertrainingdef-9ebad3a6.md) and [DefineTrainingEntry](./definetrainingentry-91396e36.md). The only difference is that we use `DTADD_TRAINING_BUSTER` instead of `DTADD_TRAINING_WEP`. Below is the definition for our Proto Strike buster upgrade.

```c
#library "PRTOSTR2"
#include "zcommon.acs"

#include "DTADD.acs"

// Training room setup
script "protostrike_definesetup" OPEN {
	RegisterTrainingDef("protostrike_definetraining");
}

script "protostrike_definetraining" (void) {
	DefineTrainingEntry(DTADD_TRAINING_BUSTER, "TAG_PROTOSTRIKE", "DESC_PROTOSTRIKE", "PRSTA0", "ProtoStrike");
}
```

## Wrap-Up

---

This buster upgrade was fairly simple, but you can certainly get more complex with your own creations. For example, you can even create buster upgrades which do use and restore ammo via crafty use of [DefineWeapon](./defineweapon-6a4db7e0.md). Spend some time experimenting around with weapons, assist items, and buster upgrades and try making some cool inventions! 

Once you’ve hopefully mastered implementing all the different aspects of vanilla gameplay, the [next tutorial](./creating-classes-5863e4dc.md) focuses on extending past the vanilla gameplay by implementing custom classes.

## Example File

---

[v6b-ProtoStrike-v1a.pk3](../assets/2baf6f49e5824f3d9cc8951d1a96ff98-v6b-ProtoStrike-v1a.pk3)

## See Also

---

[BaseMM8BDMBusterUpgrade](../decorate-actor-reference-2fdd3e69/basemm8bdmbusterupgrade-ce8d4a6a.md)

[DefineBusterUpgradeAndTake](./definebusterupgradeandtake-7767993e.md)

[DefineBusterUpgrade](./definebusterupgrade-022aee6b.md)

[DefineBusterTake](./definebustertake-bea07a6a.md)

[Creating Classes](./creating-classes-5863e4dc.md)
