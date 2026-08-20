---
title: "Creating Classes"
notion_id: 5863e4dc32854b8ca941f95705aa70a8
source: https://www.notion.so/5863e4dc32854b8ca941f95705aa70a8
---

# Creating Classes

---

> ⚠️ **Warning: Before beginning this tutorial, you should have already read through and completed the tutorials for **[**creating weapons**](./creating-weapons-bf312efa.md)**, **[**advanced weapons**](./advanced-weapons-d87e2f5f.md)**, and **[**assist items**](./creating-assist-items-d57d327f.md)** to have a good understanding of all previous concepts.**

While weapons drive the vanilla gameplay forward and it’s fun to rack up a high count of unique weapons for a varied experience, a lot of the modding scene revolves around class based modifications which add new characters to play, either variants of the weapon based gameplay or new characters which have a restricted kit.

This page will discuss creating multiple types of classes as well as briefly go into custom death states for a class. We’ll begin basic then work our way upwards. Files for each class are provided at the bottom of this page, so make sure to browse through those after following along with the tutorial.

As with everything before, classes are just actors which use weapons and items at the end of the day, so our previous knowledge will serve us well. Just the same, it’s easiest to understand what makes up a class by seeing and adding a default one first.

```c
actor Megaman? : ClassBase
{
	player.scoreicon "135ST00"
	player.displayname "Megaman?"
	player.soundclass "megaman"

	player.forwardmove 0.8, 0.8
	player.sidemove 0.78, 0.78

	player.jumpz 10
	gravity 0.8

	Health 100
	Player.MaxHealth 100

	player.startitem "BaseFlagPack", 1
	player.startitem "ModeWeps", 1

	player.startitem "MegaBuster"
	player.startitem "BusterAmmo", 3
	States
	{
		Spawn:
			EMEG A 0
			EMEG B 1
			EMEG A 1
			Goto Spawn+2

		See:
			EMEG BCDE 5
			Goto Spawn

		Missile:
			EMEG F 5
			EMEG G 4
			goto Spawn+2

		ClassPain:
			EMEG H 0
			goto MegamanPain
		ClassDeath:
			EMEG H 0
			goto MegamanDeath
	}
}
```

The DECORATE actor above is an almost duplicate of the default class except changed to be stylized after the Mega Man? character, mugshot included. This class will also be unable to use all the vanilla skins, because its display name is different from `Megaman`, which most skins are designed to be for.

However, this actor alone isn’t quite enough to get us to this class being playable. We also need to tell the game to make it a class option, so we’ll create a [`KEYCONF`](https://zdoom.org/wiki/KEYCONF) file in the root of our project and add the following code to it:

```c
addplayerclass Megaman?
```

These two elements combined are enough to get this class into the game and playable.

## Basic Class Properties

---

Every class can and should define some properties to define some aesthetic options and its gameplay statistics.

We define a score icon for the class to determine which graphic should be drawn as a mugshot for the class. In the case below, the graphic `135ST00`, a resized version of Mega Man?’s mugshot, is used.

```c
player.scoreicon "135ST00"
```

The `TEXTURES` definition for that graphic looks as follows:

```c
graphic 135ST00, 32, 32 {XScale 4.0 YScale 4.0 Patch FACE135,0,0} //Megaman?
```

We then define a display name for the class. This is the name that players will actually see in menus and UI elements in-game. Additionally, this is the name that should be used for any custom skins for the class or bots designed to play as this class.

```c
player.displayname "Megaman?"
```

We should also define a sound class for the class. This will allow us to give unique landing or pain sounds to a given class. For now, we’ll just copy the default sound class, but we’ll see more examples of how this works in practice later.

```c
player.soundclass "megaman"
```

Next is the set of properties which dictates the movement speed of our class. The speed of a player is separated between forward / backward movement and sideways movement. Additionally, two values are specified, one speed for walking, then a second speed which is doubled for the running speed. 

In Mega Man 8-Bit Deathmatch, sideways movement is typically made to be 0.02 slower than forward movement, while the walking and running values are kept equivalent.

```c
player.forwardmove 0.8, 0.8
player.sidemove 0.78, 0.78
```

Of course with horizontal movement, we also have properties that dictate vertical movement, or in other words, jumping and gravity.

```c
player.jumpz 10
gravity 0.8
```

The jump value of a class really acts more as a jump speed rather than a height, because the player’s gravity can modify that jump height and their fall speed. Use these two values combined to get a unique feeling jump.

Another very typical property to change for classes is their health default and maximum. All HP pickups are designed to scale in relation to their max health, so go nuts with the wide ranges.

```c
Health 100
Player.MaxHealth 100
```

Last but not least for basic properties is the class’s starting inventory. This is the inventory that they actually hold and use, weapons and custom inventory included. In the case below, we just copy the default inventory which includes some setup items, the Mega Buster, and its ammo.

```c
// Required always!
player.startitem "BaseFlagPack", 1

// Gives LMS and Instagib weapons
player.startitem "ModeWeps", 1

// Actual class inventory
player.startitem "MegaBuster"
player.startitem "BusterAmmo", 3
```

> 🚨 `BaseFlagPack`** must always be given! It provides fixes for multiple engine quirks and enables behavior of a few MM8BDM weapons!**

## Basic Class States

---

With properties out of the way, we should now talk about the different states required for a class to function.

As with every other actor, we need a `Spawn` state. This is just the state which the class actor starts in, loops in while standing, and will return to after every action.

```c
Spawn:
	EMEG A 0
	EMEG B 1
	EMEG A 1
	Goto Spawn+2
```

Note the B frame at the beginning. This is the first frame of every skin’s walking cycle, so its placement in what is essentially the standing state may seem a bit odd.

However, once we look at the `See` state, which is the state which the class actor uses when beginning to move, we begin to see why it is there. You can imagine that the class actor transitions from `Spawn` (standing) into `See` (walking), then once the `See` (walking) state ends, there is a tic where the class actor is still in the `Spawn` state before transitioning again to `See`. Because of that, we continue the walking animation for one tic into the `Spawn` state in case the player is continuing to walk to smoothen that animation. 

```c
See:
	EMEG BCDE 5
	Goto Spawn
```

In our `Missile` state, the state used whenever the player fires with either primary or alternate fire, we play the two firing frames but then go to `Spawn` and skip that walk animation smoothening line.

```c
Missile:
	EMEG F 5
	EMEG G 4
	goto Spawn+2 
```

Finally, we have two more states which are used to define the frame which should be used for the class’s pain and death animations. We’ll talk further in detail later when it comes to adding custom death scenarios for particular classes.

```c
ClassPain:
		EMEG H 0
		goto MegamanPain
ClassDeath:
		EMEG H 0
		goto MegamanDeath
```

## Additional Class Properties

---

Mega Man 8-Bit Deathmatch provides some further properties that can be assigned to classes. 

The following are inventory flags which can be given to the class as a start item to disable certain behaviors.

- `NoTeamTranslation`: Disables team colors on the class’s actor.

- `NoWeaponTranslation`: Disables [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) changing actor color entirely.

- `NoWeaponSwitchSound`: Disables [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) playing a weapon swap sound entirely.

- `NoProjectileTeamTranslation`: Disables team colors on the class’s projectiles.

These flags disable certain HUD elements for a class.

- `NoHud`: Disables drawing the HUD of the class actor entirely.

- `NoHealthBar`: Disables drawing the health bar.

- `NoTeamFlag`: Disables drawing the team flag which shows in team modes.

- `NoDrawMaestroMugshot`: Disables drawing the base mugshot.

- `NoDrawScoreIcon`: Disables drawing a class’s score icon property.

- `NoDrawFaceMugshot`: Disables drawing a class’s face or skin face property.

### Air and Wall Jump Properties

These flags are specific to the air jump and wall jump systems

- `AirJumpLimit`: Determines how many air jumps the class has access to.
  - `AirJumpZ`: Specifies the whole number portion of how high their air jumps are

  - `AirJumpZDecimal`: Specifies the decimal portion of how high their air jumps are (Ex. 5 `AirJumpz` and 500 `AirJumpZDecimal` makes a final value of 5.0500 `CAPROP_AirJumpZ`

- `InfiniteAirJumps`: Gives infinite air jumps

- `DisabledAirJumps`: Disables air jumps, even if the class is at some point given some.

- `WallJumpLimit`: Determines how many wall jumps the class has access to.
  - `WallJumpZ`: Specifies the whole number portion of how high their wall jumps are

  - `WallJumpZDecimal`: Species the decimal portion of how high their wall jumps are (Ex. 5 `WallJumpz` and 500 `WallJumpZDecimal` makes a final value of 5.0500 `CAPROP_WallJumpZ`

- `InfiniteWallJumps`: Gives infinite wall jumps

- `DisabledWallJumps`: Disables wall jumps, even if the class is at some point given some.

There are even more additional flags, however, first we must talk about the concept of copy weapon (i.e. copywep) classes versus custom weapon classes.

Copy weapon classes are classes which are designed to play into the standard vanilla mechanics of being able to pick up the vanilla weapons off of the ground and obtain them in (T)LMS. Meanwhile, custom weapon classes are designed to use their own kit and be unable to obtain the vanilla weapons by any means.

This distinction is implemented by either inheriting from [ClassBase](../decorate-actor-reference-2fdd3e69/classbase-c7f9de44.md) or [CustWepClassBase](../decorate-actor-reference-2fdd3e69/custwepclassbase-6e611b72.md). The former inheritance creates a copy weapon class with the latter creating a custom weapon class. The class we created just above would fall into the former category and be able to use all the vanilla weapons. 

With those two sets of classes in mind, the following flags are exclusive to classes inheriting from [ClassBase](../decorate-actor-reference-2fdd3e69/classbase-c7f9de44.md), or in other words, copy weapon classes.

- `NoBusterUpgrades`: Disables the class from being able to pick up buster upgrades.

These flags are only applicable if the class is also receiving `ModeWeps`.

This set of flags allows the class to obtain a slot of weapons even if the server variable for it is disabled.

- `AlwaysReceiveLMSAoE`

- `AlwaysReceiveLMSBuster`

- `AlwaysReceiveLMSRapid`

- `AlwaysReceiveLMSClose`

- `AlwaysReceiveLMSPower`

- `AlwaysReceiveLMSShield`

This set of flags disables a class from obtaining a slot of weapons, regardless of server setting.

- `NeverReceiveLMSAoE`

- `NeverReceiveLMSBuster`

- `NeverReceiveLMSRapid`

- `NeverReceiveLMSRanged`

- `NeverReceiveLMSClose`

- `NeverReceiveLMSPower`

- `NeverReceiveLMSShield`

## Copy Weapon Classes

---

With all of those properties and states out of the way, let’s now create a copy weapon class that’s a bit more unique. The code below implements a Bass class and further below, all noteworthy points are highlighted.

```c
actor BassC : ClassBase
{
	player.scoreicon "103ST00"
	player.displayname "Bass"
	player.soundclass "bassc"

	player.forwardmove 1.01, 1.01
	player.sidemove 0.99, 0.99

	player.jumpz 10
	gravity 0.8
	player.startitem "AirJumpLimit", 1
	player.startitem "AirJumpZ", 12
	player.startitem "AirJumpZDecimal", 5000

	Health 75
	Player.MaxHealth 75
	
	// Required always
	player.startitem "BaseFlagPack", 1
	
	// Gives LMS and Instagib weapons
	player.startitem "ModeWeps", 1
	
	// Custom instagib modifier
	player.startitem "BassInstagib", 1
	
	// LMS modifiers
	player.startitem "NeverReceiveLMSRanged", 1
	player.startitem "AlwaysReceiveLMSAoE", 1
	
	// Disables Buster Upgrades (too much ego)
	player.startitem "NoBusterUpgrades", 1
	
	// Actual class inventory
	player.startitem "BassBuster"
	player.startitem "BusterAmmo", 3
	States
	{
		Spawn:
			BASS A 0
			BASS B 1
			BASS A 1
			Goto Spawn+2
		See:
			BASS BCDE 5
			Goto Spawn
			
		Missile:
			BASS F 5
			BASS G 4
			goto Spawn+2
			
		ClassPain:
			BASS H 0
			goto MegamanPain
		ClassDeath:
			BASS H 0
			goto MegamanDeath
	}
}
```

Going down the list, now that we’ve requested a unique `bassc` sound class, we can implement that in a [`SNDINFO`](https://zdoom.org/wiki/SNDINFO) file in the root of our project and use it to define the sounds used for our class.

```typescript
player.soundclass "bassc"
```

```c
$playersound	bassc	male	*death		MEGADEAT
$playersound	bassc	male	*pain100	MEGAPAIN
$playersound	bassc	male	*land		  LAND
//$playersound	bassc	male	*airjump	BASSJUMP
//$playersound	bassc	male	*taunt		BASSTAUN
```

The `ModeWeps` inventory being given as a start item gives `LMSWeps` and `IGWeps`, the latter of which, in default Instagib, runs to take the Mega Buster, give some boosted stats, and give the Instagib Metal Blade weapon. However, our Bass class doesn’t have Mega Buster as its default weapon, it has Bass Buster that needs to be taken. Because of that, if we want our class to fully support Instagib, we should rectify that problem ourselves.

```c
// Custom Instagib modifier
player.startitem "BassInstagib", 1
...

actor BassInstagib : CustomInventory
{
	states
	{
		Pickup:
			TNT1 A 0 ACS_NamedExecuteAlways("bass_handleinstagib", 0)
			stop
	}
}
```

```typescript
script "bass_handleinstagib" (void) {
	if(GetCvar("instagib")==1 && !GetCVar("mm8bdm_sv_noigbehavior")){
		// Default Instagib only takes "MegaBuster", so we handle BassBuster
    TakeInventory("BassBuster",1);
		
		// Could even take his air jump or give a custom Instagib weapon here
		// TakeInventory("AirJumpLimit",999);
		// TakeInventory("IGMetalBladeWep", 999);
		// GiveInventory("BassIGWep", 1);
	}
}
```

We use some of the additional properties to modify the LMS loadout given by `LMSWeps` (which is received from `ModeWeps`) to no longer include ranged weapons, instead including area of effect weapons, and to give him his iconic air jump with an effective air jump Z value of 12.5.

```c
// LMS modifiers
player.startitem "NeverReceiveLMSRanged", 1
player.startitem "AlwaysReceiveLMSAoE", 1

// Air jump addition
player.startitem "AirJumpLimit", 1
player.startitem "AirJumpZ", 12
player.startitem "AirJumpZDecimal", 5000
```

We’ve also made it so that Bass can’t use Buster Upgrades as a downside to the class.

```typescript
// Disables Buster Upgrades (too much ego)
player.startitem "NoBusterUpgrades", 1
```

If you were to remove this start item, this class would be able to use Buster Upgrades cleanly without any additional setup, because Bass Buster is already declared as needing to be taken when using a new Buster Upgrade by the base game.

However, if you had a class with a unique starting weapon and also wanted them to be able to use Buster Upgrades in a consistent way, you may want to look into [DefineBusterTake](./definebustertake-bea07a6a.md).

Finally we give him his iconic Bass Buster as a starting weapon.

```c
// Actual class inventory
player.startitem "BassBuster"
player.startitem "BusterAmmo", 3
```

All the states are the same as our example above, except for swapping out the Mega Man? sprites for Bass sprites. This similarity in states will typically be the case unless you begin to do more complex animation logic.

## Custom Weapon Classes

---

With a basic copy weapon class out of the way, now let’s create a class that would resemble a robot master instead. Snake Man provides some interesting opportunities so this tutorial will create a version of his class inspired by older legacy versions.

We’ll again start with the class actor, note the inheritance from [CustWepClassBase](../decorate-actor-reference-2fdd3e69/custwepclassbase-6e611b72.md) this time.

```typescript
actor SnakemanC : CustWepClassBase
{
	player.scoreicon "021ST00"
	player.displayname "Snakeman"
	player.soundclass "snakemanc"

	player.forwardmove 1.0, 1.0
	player.sidemove 0.98, 0.98

	player.jumpz 10
	gravity 0.8
	
	health 85
	player.maxhealth 85

	// Required always
	player.startitem "BaseFlagPack", 1
	
	// Weapon inventory
	player.startitem "SearchSnakeBoss"
	player.startitem "TastySnakeAmmo", 28
	
	// Climbing inventory
	player.startitem "SnakeClimberAmmo", 250
	player.startitem "SnakemanIsClimbing", 1
	player.startitem "SnakemanClimbingItem", 1
	
	States
	{
		Spawn:
			SNAM A 0
			SNAM B 1
			SNAM A 1
			Goto Spawn+2

		See:
			SNAM BCDE 5
			Goto Spawn

		Missile:
			SNAM F 5
			SNAM G 4
			goto Spawn

		ClassPain:
			SNAM H 0
			goto MegamanPain
		ClassDeath:
			SNAM H 0
			goto MegamanDeath
	}
}
```

Because classes that inherit from [CustWepClassBase](../decorate-actor-reference-2fdd3e69/custwepclassbase-6e611b72.md) are designed to be unable to pick up and use weapons that inherit from [BaseMM8BDMWep](../decorate-actor-reference-2fdd3e69/basemm8bdmwep-8cc600ca.md) (essentially every copy weapon), we’ll have to actually create a unique weapon for Snake Man using [BaseMM8BDMCustWep](../decorate-actor-reference-2fdd3e69/basemm8bdmcustwep-d23769c5.md) rather than being able to just reuse Search Snake’s weapon.

Ironically, most of the time when creating a new custom weapon class, the actual bulk of the effort is with the class weapon itself, so we’re now back to using our previous set of skills. For this Snake Man class, he’ll have a primary fire which shoots Search Snake, an alternate fire which does a melee swipe, allowing him to climb on surfaces or poison enemies, and an item which toggles the climbing behavior on his alternate fire.

Below is the weapon actor created to accomplish this and further is some different portions highlighted. Note that the weapon is now inheriting from [BaseMM8BDMCustWep](../decorate-actor-reference-2fdd3e69/basemm8bdmcustwep-d23769c5.md) because the class intended to use it is inheriting from [CustWepClassBase](../decorate-actor-reference-2fdd3e69/custwepclassbase-6e611b72.md).

```c
actor SearchSnakeBoss_ScriptBar : ScriptBar {}

actor SearchSnakeBoss : BaseMM8BDMCustWep
{
	Weapon.AmmoUse 2
	Weapon.AmmoGive 28
	weapon.ammotype "TastySnakeAmmo"

	Weapon.AmmoUse2 20
	Weapon.AmmoGive2 500
	weapon.ammotype2 "SnakeClimberAmmo"

	tag "$TAG_SEARCHSNAKE"
	Obituary "$OB_SEARCHSNAKE"

	inventory.icon "NULLICON"
	dropitem "SearchSnakeWep"

	States
	{
		Ready:
			SNAB A 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_SNAKEMAN)
			SNAB A 0 A_GunFlash("Flash", GFF_NOEXTCHANGE)
			goto Ready1
		Ready1:
			SNAB A 0 A_JumpIfInventory("TastySnakeAmmo",2,"Ready2")
			SNAB A 5 A_WeaponReady(WRF_NOPRIMARY)
			SNAB A 0 A_GiveInventory("TastySnakeAmmo",2)
			loop
		Ready2:
			SNAB A 5 A_WeaponReady
			SNAB A 0 A_GiveInventory("TastySnakeAmmo",2)
			loop
		
		Deselect:
			SNAB A 0
			goto DeselectSwap
		Select:
			SNAB A 0
			goto SelectSwap

		Fire:
			SNAB B 0 A_PlaySoundEx("weapons/mm3/searchsnakefire","Weapon")
			SNAB B 0 A_FireCustomMissile("SearchSnakeStart",0, 1, -8, 0)
			SNAB BC 3
			SNAB A 4
			Goto Ready1

		AltFire:
			SNAA A 0 A_PlaySoundEx("weapons/mm7/slashclawfire","Weapon")
			SNAA A 0 A_FireCustomMissile("SnakeClimber", 0, 0, 0, 0)
			SNAA ABCDE 2 
			SNAA F 0 A_GiveInventory("TastySnakeAmmo",2) // Slower ammo regen
			SNAA F 0 A_PlaySoundEx("weapons/mm7/slashclawfire","Weapon")
			SNAA F 0 A_FireCustomMissile("SnakeClimber", 0, 0, 0, 0)
			SNAA FGHIJ 2 
			SNAA F 0 A_GiveInventory("TastySnakeAmmo",2) // Even during altfire
			SNAA X 0 A_Refire
			SNAB XDE 2
			Goto Ready1

		Flash:
			TNT1 A 1 A_JumpIf(CallACS("core_CheckFooting"),"GiveAmmo")
			loop
		GiveAmmo:
			TNT1 A 1 A_GiveInventory("SnakeClimberAmmo", 2)
			TNT1 A 0 A_JumpIf(!CallACS("core_CheckFooting"),"Flash")
			loop
	}
}
```

A standard convention for custom weapon classes is to only give them a weapon icon if they actually have multiple weapons to swap through. In this case, Snake Man is just going to have the single weapon, so we explicitly give him no weapon icon.

```c
inventory.icon "NULLICON"
```

A new property added to this weapon is a drop item. This allows us to specify what weapon the class should drop if weapon drop on death is enabled. We don’t want them to drop the class weapon, so instead we specify it should drop the class’s copy weapon alternative.

```c
dropitem "SearchSnakeWep"
```

We typically aren’t as concerned about the `SpawnLoop` state for custom weapon classes because typically these weapons should never see themselves on the ground, but if you wanted to support weapon dropping (which is typically disabled), then you could add one just as previous tutorials did.

What stands out more in comparison to other weapons is how the `Ready` state is handled. Custom weapon classes are typically designed to use passively regenerating ammo instead of ammo pickups. However, this means that we don’t actually want to use a `NoAmmo` state like typical copy weapons do. If we did, then a player could continue holding fire after running out of ammo, get stuck in a loop of the `NoAmmo` state, and indirectly stop their own passive ammo regeneration.

Instead, what this `Ready` state does is make use of [`A_WeaponReady`](https://zdoom.org/wiki/A_WeaponReady) flags to outright disable primary fire until the player has enough ammo to use it, no longer requiring a `NoAmmo` state, and essentially turning it into a reduced fire rate without enough ammo.

You can still have custom weapon classes with weapons that use ammo pickups using [DefineWeapon](./defineweapon-6a4db7e0.md). Just be sure to disable the weapon’s LMS, map, and Eddie validity. In that case, this style of `Ready` state is not really necessary and you will instead want to use a `NoAmmo` state.

```c
Ready:
	SNAB A 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_SNAKEMAN)
	SNAB A 0 A_GunFlash("Flash", GFF_NOEXTCHANGE)
	goto Ready1
Ready1:
	SNAB A 0 A_JumpIfInventory("TastySnakeAmmo",2,"Ready2")
	SNAB A 5 A_WeaponReady(WRF_NOPRIMARY)
	SNAB A 0 A_GiveInventory("TastySnakeAmmo",2)
	loop
Ready2:
	SNAB A 5 A_WeaponReady
	SNAB A 0 A_GiveInventory("TastySnakeAmmo",2)
	loop
```

The beginning of this `Ready` state also calls [`A_GunFlash`](https://zdoom.org/wiki/A_GunFlash) which creates a new concurrent thread starting at the `Flash` state (or any state specified). This is commonly used in Mega Man 8-Bit Deathmatch to run actions concurrently while the main weapon thread is running. This thread is killed once the weapon swaps or the player dies, so typically its use is limited in copy weapons, but they end up being highly useful for custom weapon classes who typically have just the one weapon.

In this case, we’re using the `Flash` to handle the ammo gain for Snake Man’s alternate fire, making it so that he only gains ammo when grounded by using [core_CheckFooting](../acs-script-reference-cf6aec3f/corecheckfooting-6ffa1119.md).

```c
Flash:
	TNT1 A 1 A_JumpIf(CallACS("core_CheckFooting"),"GiveAmmo")
	loop
GiveAmmo:
	TNT1 A 1 A_GiveInventory("SnakeClimberAmmo", 2)
	TNT1 A 0 A_JumpIf(!CallACS("core_CheckFooting"),"Flash")
	loop
```

Search Snake is a really, really tricky projectile to get right, so we’re not going to reinvent the wheel for this tutorial, instead we’re just going to reuse vanilla’s projectile. However, Snake Man is notably left-handed with his buster, so instead of a horizontal offset of `8`, we use one of `-8` instead.

```c
Fire:
	SNAB B 0 A_PlaySoundEx("weapons/mm3/searchsnakefire","Weapon")
	SNAB B 0 A_FireCustomMissile("SearchSnakeStart",0, 1, -8, 0)
	SNAB BC 3
	SNAB A 4
	Goto Ready1
```

Sometimes having outright no ammo regeneration during other actions can feel really bad to play, so we sneak passive ammo gain into other actions by various means. Our alternate fire handles the melee swiping, but also outright gives primary fire ammo during it to act as a slower ammo regeneration while climbing and poking.

```c
Altfire:
	SNAA A 0 A_PlaySoundEx("weapons/mm7/slashclawfire","Weapon")
	SNAA A 0 A_FireCustomMissile("SnakeClimber", 0, 0, 0, 0)
	SNAA ABCDE 2 
	SNAA F 0 A_GiveInventory("TastySnakeAmmo",2) // Slower ammo regen
	SNAA F 0 A_PlaySoundEx("weapons/mm7/slashclawfire","Weapon")
	SNAA F 0 A_FireCustomMissile("SnakeClimber", 0, 0, 0, 0)
	SNAA FGHIJ 2 
	SNAA F 0 A_GiveInventory("TastySnakeAmmo",2) // Even during altfire
	SNAA X 0 A_Refire
	SNAB XDE 2
	Goto Ready1
```

Now that we’ve revealed where the climbing projectile is actually shot, let’s begin to show that projectile off. It’s just a simple melee style projectile with a `Death` state that gives inventory to the owner of the projectile using the `AAPTR_TARGET` [actor pointer](https://zdoom.org/wiki/Actor_pointer).

This inventory then checks for a `SnakemanIsClimbing` inventory flag which we’ll discuss later and also checks to make sure that Snake Man has enough climbing ammo to climb.

```c
actor SnakeClimber : BasicProjectile
{
	damagetype "SnakeVenom"
	Obituary "$OB_SNAKEPOKE"
	damage (10)
	speed 40
	Radius 7
	Height 7
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1
			stop
		Death:
			TNT1 A 0 A_CheckFloor("NoClimb")
			TNT1 A 0 A_GiveToTarget("SnakemanClimb")
			stop
		NoClimb:
			TNT1 A 0
			stop
	}
}

actor SnakemanClimb : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 A_JumpIfInventory("SnakemanIsClimbing", 1, "ClimbTry")
			stop
		ClimbTry:
			TNT1 A 0 A_JumpIfInventory("SnakeClimberAmmo", 20, "Climb")
			stop
		Climb:
			TNT1 A 0 A_TakeInventory("SnakeClimberAmmo", 20, TIF_NOTAKEINFINITE)
			TNT1 A 0 ThrustThingZ(0,30,0,0)
			stop
	}
}
```

Now about that inventory flag that’s being checked for. We mentioned earlier that we wanted Snake Man to be able to toggle the climbing behavior in case he’s swiping an enemy and wishes to not climb them. That inventory flag and the following [BaseMM8BDMUseItem](../decorate-actor-reference-2fdd3e69/basemm8bdmuseitem-31fa996d.md) implements that behavior.

This inventory flag and use item is given to Snake Man as part of his set of start items. Using the item will take away the flag if he has it or give him the flag if he’s missing it. Note that both states end in the `fail` keyword, meaning that this inventory item will never be taken upon use.

```c
actor SnakemanIsClimbing : Inventory 
{
	inventory.amount 1
	inventory.maxamount 1
}

actor SnakemanClimbingItem : BaseMM8BDMUseItem
{
	+INVENTORY.UNDROPPABLE
	Tag "$TAG_SNAKEITEM"
	inventory.icon "SNAKICON"
	States
	{
		Use:
			TNT1 A 0 A_PlaySoundEx("items/snake/toggle", "SoundSlot7")
			TNT1 A 0 A_JumpIfInventory("SnakemanIsClimbing", 1, "ToggleOff")
			TNT1 A 0 A_GiveInventory("SnakemanIsClimbing", 1)
			fail
		ToggleOff:
			TNT1 A 0 A_TakeInventory("SnakemanIsClimbing", 999)
			fail
	}
}
```

This Snake Man class has one more trick up its sleeve, venom. If you noticed earlier, `SnakeClimber` has a custom damage type of `SnakeVenom`. This is handled using the same pain state methods introduced in earlier tutorials.

Essentially, this pain state will give a debuff inventory then spawn a watcher style actor only on the first time of receiving the debuff.

```c
actor ClassBaseSlot12 : ClassBaseSlot11 
{
	States
	{
		Pain.SnakeVenom:
			PLY1 H 0 A_JumpIfInventory("SnakeVenom",1,2)
			PLY1 H 0 A_SpawnItemEX("SnakeVenomIndicator")
			PLY1 H 0 A_GiveInventory("SnakeVenom",1)
			goto Pain+1
	}
}
```

Below are the associated venom actors referenced above. Now we can see what the venom actually does. It makes it so the enemy receives 1.5x damage from Search Snakes for 10 seconds after receiving the debuff. While the enemy is debuffed, they’ll have droplets dripping from them to indicate the weakness.

```c
actor SnakeVenom : PowerProtection
{
	Powerup.Duration -10
	damagefactor "SearchSnake", 1.5
}

actor SnakeVenomIndicator : BasicWatcher
{
	States
	{
		Spawn:
			TNT1 A 0 
			TNT1 A 3 A_GiveToTarget("SnakeVenomDropper",1)
			TNT1 A 0 A_JumpIfInTargetInventory("SnakeVenom",1,"Spawn")
			stop
	}
}

actor SnakeVenomDropper : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 A_SpawnItemEx("SnakeVenomDrip",random(-24,24),random(-24,24),random(8,32))
			stop
	}
}

actor SnakeVenomDrip : BasicGraphicEffect
{
	-NOINTERACTION
  -NOGRAVITY
	Translation "44:44=110:110", "225:225=104:104"
	ReactionTime 4
	Radius 4
	Height 4
	Speed 10
	Scale 1.0
	States
	{
		SpawnFrame:
			ACID D 4 A_CountDown
			loop
		Death:
			ACID E 0 A_SetGravity(0.0)
			ACID E 0 A_Stop
			ACID EF 5
			stop
	}
}
```

That was a lot of actors to get through, but we’re still not quite done talking about this class’s weapon, because we haven’t yet talked about its UI elements. You can imagine that we’re going to want some bars for the class because it has ammo, but it also has a toggled element, so we’re going to want some indication there. Below is the ScriptBar / DrawBar implementation of that using functions from `BARLIB.acs` and `ASSTLIB.acs`.

```typescript
#library "SNAKEACS"
#include "zcommon.acs"

#include "BARLIB.acs"
#include "ASSTLIB.acs"

// bars for Snakeman class

script "DrawBar_SearchSnakeBoss" (void) CLIENTSIDE {
	// animated custom bar with custom overlay bar on top
	DrawCustomBar(6, CheckInventory("TastySnakeAmmo"), 28);
	DrawCustomBar(7, CheckInventory("SnakeClimberAmmo"), 500);
	
	// ammo number setup
	SetInventory("SBARAmmoOffset", 1);
	DrawNormalAmmo();
	DrawSecondAmmo();
	
	// animated icon for climb indication
	if(AssistDisplayBar_On()) {
		if(CheckInventory("SnakemanIsClimbing") > 0) {
			SetHudSize(320, 200, false);
			BasicImageDisplay("SNACRAWA", 55, 282.1, 8.1);
		}	
	}
}
```

I figured it would be fun to give him a bar that grooves in the same style as the Snakey enemies from his stage, so we’re using [DrawCustomBar](./drawcustombar-c036f3e3.md) to implement an animated bar. Additionally, we’re using it to draw an overlay bar on top of it. Custom bars with higher slot numbers draw over top of lower ones.

Because we’re using custom bars for both ammo bars, we then have to perform the manual setup to draw the ammo numbers, but that is quickly resolved using [DrawNormalAmmo](./drawnormalammo-3c94c3d6.md) and [DrawSecondAmmo](./drawsecondammo-a1116b92.md).

Finally, we’re drawing an animated icon for whenever his climbing is enabled. This is done simply using functions from `ASSTLIB.acs`. First we need to make sure that the user should have icons drawn on their screen using [AssistDisplayBar_On](./assistdisplaybaron-6f51f58c.md). If Snake Man has the inventory indicating that climbing is toggled, we use [`SetHudSize`](https://zdoom.org/wiki/SetHudSize) to set the right aspect ratio then use [BasicImageDisplay](./basicimagedisplay-5b8898f3.md).

If you wanted to draw an icon in a different spot between vertical and horizontal UI style, you may want to look into [AssistDisplayBar_HUDMode](./assistdisplaybarhudmode-d51c005d.md).

Below is how the [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) definitions and [`ANIMDEFS`](https://zdoom.org/wiki/ANIMDEFS) definitions look for the above UI elements. Note how the pieces used as pictures for custom bar 6 in `ANIMDEFS` have their offset set. Unintuitively, it is those entries that are important for offsetting rather than the entries for `BRSLT006` and `VRSLT006`.

```c
texture SNKAVBR1, 8, 56 {offset -16,-8 patch SNAKBAR1, 0, 0}
texture SNKAVBR2, 8, 56 {offset -16,-8 patch SNAKBAR2, 0, 0}
texture SNKAVBR3, 8, 56 {offset -16,-8 patch SNAKBAR3, 0, 0}
texture BRSLT006, 8, 56 {offset -16,-8 patch SNAKBAR1, 0, 0}
texture BRSLB006, 8, 56 {offset -16,-8 patch BAREMPTY, 0, 0}

texture SNKAHBR1, 56, 8 {offset -58,-184 patch SNAKBAR1, 0, 0 {rotate 90}}
texture SNKAHBR2, 56, 8 {offset -58,-184 patch SNAKBAR2, 0, 0 {rotate 90}}
texture SNKAHBR3, 56, 8 {offset -58,-184 patch SNAKBAR3, 0, 0 {rotate 90}}
texture VRSLT006, 56, 8 {offset -58,-184 patch SNAKBAR1, 0, 0 {rotate 90}}
texture VRSLB006, 56, 8 {offset -58,-184 patch VAREMPTY, 0, 0}

texture BRSLT007, 8, 56 {offset -16,-8 patch SNAKBAR4, 0, 0}
texture BRSLB007, 8, 56 {offset -16,-8 patch NOBAR, 0, 0}

texture VRSLT007, 56, 8 {offset -58,-184 patch SNAKBAR4, 0, 0 {rotate 90}}
texture VRSLB007, 56, 8 {offset -58,-184 patch VNOBAR, 0, 0}

texture SNACRAWA, 1, 1 {offset 0, 0 patch SNACRAW1, 0, 0}
```

```c
texture BRSLT006
pic SNKAVBR1 tics 4
pic SNKAVBR2 tics 4
pic SNKAVBR3 tics 4
pic SNKAVBR2 tics 4

texture VRSLT006
pic SNKAHBR1 tics 4
pic SNKAHBR2 tics 4
pic SNKAHBR3 tics 4
pic SNKAHBR2 tics 4

texture SNACRAWA
pic SNACRAW1 tics 4
pic SNACRAW2 tics 4
```

Additionally, enemies have a debuff that they can receive, so we may want to give them a UI indication of their venom status. Below is a simple implementation of that.

Because this debuff isn’t associated to holding any specific weapon, we have to display it through an assist display, a `CLIENTSIDE` script to call every tic which needs to be defined using [DefineAssistDisplay](./defineassistdisplay-34353c79.md) first.

Once we’ve defined that script, we can then use the earlier functions in a very similar way.

```typescript
// same ACS file as earlier

// indicator for Snake Venom debuff

// Already included earlier in the file
//#include "ASSTLIB.acs"
#include "DTADD.acs"

script "SnakeVenom_Add_Display" OPEN CLIENTSIDE {
	DefineAssistDisplay("SnakeVenom_Show_Display");
}	

script "SnakeVenom_Show_Display" (int cam) {
	SetActivator(cam);
	SetHudSize(320, 200, false);
	
	if(AssistDisplayBar_On()) {
		if(CheckInventory("SnakeVenom") > 0) {
			BasicImageDisplay("SNAKEVNM", 56, 150.1, 8.1);
		}
	}
}
```

> 💡 **You may also want to consider using the actual assist display bar system talked about earlier while **[**creating assist items**](./creating-assist-items-d57d327f.md)**. However, this is a different, simple way to create a display in a static spot which that system does not allow easily.**

Below is the `TEXTURES` and `ANIMDEFS` entry for the graphic used.

```c
texture SNAKEVNM, 1, 1 {offset 0, 0 patch SNAKVNM1, 0, 0}

...

texture SNAKEVNM
pic SNAKVNM1 tics 6
pic SNAKVNM2 tics 6
```

With that, that’s all there is to talk about with regards to Snake Man!

## Custom Death States

---

We’ve got one more class to talk about to illustrate how we can accomplish custom death states using these basic class actors. We’re going to create a simpler form of the kamikaze effect, while supporting a few of the basic death types in MM8BDM, that Grenade Man typically has in larger class mods. Below is an implementation of that.

```c
actor GrenademanC : CustWepClassBase
{
	player.scoreicon "080ST00"
	player.displayname "Grenademan"
	player.soundclass "megaman"
	
	player.forwardmove 0.74, 0.74
	player.sidemove 0.72, 0.72

	player.jumpz 10
	gravity 0.8
	
	health 100
	player.maxhealth 100
	
	// Required always
	player.startitem "BaseFlagPack", 1
	
	// Weapon inventory
	player.startitem "FlashBombBoss"
	player.startitem "FlashBombAmmo", 30
	
	States
	{
		Spawn:
			GREM A 0
			GREM B 1
			GREM A 1
			Goto Spawn+2

		See:
			GREM BCDE 5
			Goto Spawn

		Missile:
			GREM F 5
			GREM G 4
			goto Spawn+2

		ClassPain:
			GREM H 0
			goto MegamanPain
			
		ClassDeath:
			GREM H 0 A_JumpIfInventory("ExplodeDeathFlag", 1, 10)
			GREM H 0 A_JumpIfInventory("FallingDeathFlag",1,"MegamanFall")
			//GREM H 0 A_JumpIfInventory("RisingDeathFlag",1,"GrenademanRise")
			GREM H 0 A_JumpIfInventory("IceDeathFlag", 1, "GrenademanIce")
			
			GREM H 0 A_JumpIfInventory("CriticalDeath",1, 7)
			
			GREM H 0 A_PlaySoundEx("misc/BombCount","Voice")
			GREM H 10 bright A_SpawnItemEx("GrenademanDeathFX_H")
			GREM H 0 A_PlaySoundEx("misc/BombCount","Voice")
			GREM H 10 bright A_SpawnItemEx("GrenademanDeathFX_H")
			GREM H 0 A_PlaySoundEx("misc/BombCount","Voice")
			GREM H 10 bright A_SpawnItemEx("GrenademanDeathFX_H")
			
			GREM H 0 A_SpawnItemEX("GrenademanDeathBoom",0,0,28)
			goto MegamanGib
		GrenademanIce:
			GREM H 0 ACS_NamedExecuteWithResult("core_chargecolor",CLR_ICEDEATH,TCLR_ICEDEATH)
			GREM H 0 A_PlaySoundEx("*icefreze","Voice")
			
			GREM H 0 A_JumpIfInventory("CriticalDeath",1,7)
			
			GREM H 0 A_PlaySoundEx("misc/BombCount","Body")
			GREM H 10 bright A_SpawnItemEx("GrenademanDeathFX_H")
			GREM H 0 A_PlaySoundEx("misc/BombCount","Body")
			GREM H 10 bright A_SpawnItemEx("GrenademanDeathFX_H")
			GREM H 0 A_PlaySoundEx("misc/BombCount","Body")
			GREM H 10 bright A_SpawnItemEx("GrenademanDeathFX_H")
			
			GREM H 0 A_SpawnItemEX("GrenademanDeathBoom",0,0,28)
			goto MegamanIceGib
	}
}

actor GrenademanDeathFX_H : BasicExplosion
{
	renderstyle none
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 AA 1 A_SpawnItemEx("FlashBombFX1",0,0,28,random(-7,7),random(-7,7),random(-7,7),random(0,359))
			TNT1 A 0 A_SpawnItemEx("FlashBombFX2",Random(-16,16),Random(-16,-40), Random(-32,32)+28,0,0,0,0)
			TNT1 AA 1 A_SpawnItemEx("FlashBombFX2",Random(-16,16),Random(16,40), Random(-32,32)+28,0,0,0,0)
			TNT1 A 1 A_SpawnItemEx("FlashBombFX1",0,0,28,random(-7,7),random(-7,7),random(-7,7),random(0,359))
			stop
	}
}

actor GrenademanDeathBoom : BasicExplosion
{
	damagetype "GrenadeManKamikaze"
	Obituary "$OB_THATFELTGOOD"
	scale 5.0
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_PlaySoundEx("misc/hugequake","Weapon")
			TNT1 A 0 A_Explode(40,500,0,0,96)
			TNT1 A 1 A_SpawnItemEx("ExplosionEffect2",0,0,0,0,0,0,0,SXF_TRANSFERTRANSLATION|SXF_NOCHECKPOSITION|SXF_TRANSFERSCALE)
			stop
	}
}
```

The `CriticalDeath` flag referenced a few times in the code above is an internal flag used for determining if the player should use a more extreme death (a gib death) or not.

The `ClassDeath` state here essentially inserts a few potential animations before jumping back to some states from `ClassBase0` or `ClassBase1` which are shown below.

```c
MegamanFall:
	"----" A 0 A_PlayerScream
MegamanErase:
	"####" Z 1 A_CheckPlayerDone
	wait
MegamanGib:
	"----" A 0 A_GiveInventory("CriticalDeathGiver", 1)
	"----" A 0 A_SpawnItemEx("FakeDeathFX", 0, 0, 32)
	goto MegamanErase
```

```c
MegamanIceGib:
	"----" H 0 A_SpawnItemEx("FrozenDeathFX", 0, 0, 1, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
	"----" H 0 A_SpawnItemEX("CriticalDeathSpawner",0,0,0,0,0,0,0,SXF_TRANSFERTRANSLATION)
	"----" H 0 A_SpawnItemEx("FakeDeathFX", 0, 0, 32)
	"----" H 0 A_PlaySoundEx("*icedeath","Voice")
	goto MegamanErase
```

This is just a brief introduction to this topic and what you can do with it because this is best understood by doing your own code reading to understand the flow of states between `ClassBase0`, `ClassBase1`, and your own defined classes. It’s quite the exercise in DECORATE inheritance with numerous jump tricks as shown in the provided state diagram.

<!-- image omitted (assets not vendored) -->

In general, however, all of your custom death animations should begin from the `ClassDeath` state within your class actor, because `ClassBase0`'s `Death` state handles important setup.

It’s also worth noting that you can perform the same sort of custom animation insertion in the place of `ClassPain` instead, but you’ll need to reference `ClassBase1` and `ClassBase0`'s `MegamanPain` states to make sure those are accounted for. 

## Closing Words

---

If the classes above were any indication, there’s quite a world of possibilities once you get to this level of modding the game. While this ends the track of successive tutorials, there’s still a few more miscellaneous tutorials about unrelated topics and plenty of additional guides to check out! We hope that you look to learn as much as possible and to bring interesting content to Mega Man 8-Bit Deathmatch!

## Example Files

---

[v6b-FakeMegamanClass-v1a.pk3](../assets/32fb88c261c34feeaf0d7205b5e3f574-v6b-FakeMegamanClass-v1a.pk3)

[v6b-BassClass-v1a.pk3](../assets/1c47c439dd804556aae2fea65d59e6a6-v6b-BassClass-v1a.pk3)

[v6b-SnakemanClass-v1a.pk3](../assets/2c69e3259af445938c2a87d5896757d8-v6b-SnakemanClass-v1a.pk3)

[v6b-GrenadeManClass-v1a.pk3](../assets/f7958eb19070448a819db5485fecf7f7-v6b-GrenadeManClass-v1a.pk3)

## See Also

---

[ClassBase](../decorate-actor-reference-2fdd3e69/classbase-c7f9de44.md)

[CustWepClassBase](../decorate-actor-reference-2fdd3e69/custwepclassbase-6e611b72.md)

[BaseMM8BDMCustWep](../decorate-actor-reference-2fdd3e69/basemm8bdmcustwep-d23769c5.md)

[BaseMM8BDMUseItem](../decorate-actor-reference-2fdd3e69/basemm8bdmuseitem-31fa996d.md)

[Custom Classes with CBM](../additional-guides-7149f7a8/custom-classes-with-cbm-2196ad22.md)

[Pinging Out Classes](../additional-guides-7149f7a8/pinging-out-classes-1414aac1.md)
