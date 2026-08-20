---
title: "Custom Classes with CBM"
notion_id: 2196ad22ae6845d6b606bd104024e52d
source: https://www.notion.so/2196ad22ae6845d6b606bd104024e52d
---

# Custom Classes with CBM

---

[Class Based Modification (CBM)](https://mm8bdm.net/forum/thread/class-based-modification-v9gh-42) is the community’s longest running and most notable class mod, introducing a class for just about every mainline robot master in the Mega Man series. It’s been in the works for over 10 years and has been passed between multiple groups of developers over time, making it one of the most varied modded experiences.

## Custom Class Support

---

> ⚠️ **Warning: This tutorial details *****extra***** steps that should be taken when creating a class for compatibility with CBM. It goes without saying that you should already have experience with **[**creating classes for MM8BDM V6B**](../interacting-with-systems-c99b6cab/creating-classes-5863e4dc.md)** itself.  
>   
> It is also useful to go ahead and look at the **[**tips for custom weapons with CBM**](./custom-weapons-with-cbm-d7343e16.md)**!**

With the release of MM8BDM V6B, as with a lot of other newer mods, CBM is now largely compatible with content expansions such as additional classes. Using CBM’s `CBMADD.acs` ACS library, which can be found inside of its file at `acs_source/cbm_dt/CBMADD.acs`, you’ll be able to follow along with this page and implement a class which is compatible with standalone MM8BDM, CBM, and even potentially the forks of CBM to come.

The class that we’ll be making as an example is Megaman X as a copy weapon class. For that reason, we’ll be using `ClassBase` as our class’s inherited actor and `BaseMM8BDMWep` as our weapons’ inherited actor. However, all the same rules as standalone MM8BDM classes apply when extending the compatibility to CBM.

## Beefed Up Values

---

CBM is one of the community’s mods which has “beefed up” damage and HP values, meaning that it multiplies every original damage and HP value by 10. While in base MM8BDM, the default HP range is 100 and the Mega Buster deals 10 damage, in CBM, the default HP range is 1000 and the Mega Buster deals 100 damage.

It does this to enable some steeper damage and defense multipliers which would be unviable or cause unintended consequences in the standard range of values due to limitations of the Zandronum engine.

For your class, this means that you’ll need a mechanism to have normal HP and do normal damage, except when CBM’s “beefed up” values are loaded, in which case you should multiply the class’s HP and their damage by 10. We’ll discuss how to handle the HP in the next section, but for the damage, `CBMADD.acs` provides a helper function to help us create that mechanism. You should create a script that looks like below for your own class(es).

```javascript
#library "XACS"
#include "zcommon.acs"

#include "CBMADD.acs"

script "MMX_CBM_Damage" (int dmg) {
	if(CBMBeefInPlay()) { // Checks for beefed up values
		dmg *= 10;
	}
	SetResultValue(dmg);
}
```

This script is fairly simple in concept, it takes in a damage value and returns back a damage value using [`SetResultValue`](https://zdoom.org/wiki/SetResultValue). If CBM’s beefed up values are loaded, it’ll return the damage given but multiplied by 10. We’ll use this script in our class’s DECORATE like below.

```c
actor X_Shot1 : BasicProjectile
{
	damagetype "Buster"
	Obituary "$OB_XBUSTER"
	+BRIGHT
	Damage (CallACS("MMX_CBM_Damage", 10))
	radius 10
	height 5
	Speed 35
	States
	{
		Spawn:
			TNT1 A 2
			BUST A 1
			wait
		}
}

actor X_Shot2 : X_Shot1
{
	Damage (CallACS("MMX_CBM_Damage", 15))
	radius 15
	height 5
	Speed 40
	States
	{
		Spawn:
			TNT1 A 2
			X1AB JKLMN 2
			Goto Spawn+1
	}
}

actor X_Shot3 : X_Shot2
{
	Damage (CallACS("MMX_CBM_Damage", 35))
	radius 18
	height 25
	speed 40
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1
			X1AB ABC 2
			goto Spawn+2
	}
}
```

Notably, every instance where a damage value is defined, we’ve substituted it with [`CallACS`](https://zdoom.org/wiki/ACS_NamedExecuteWithResult) using our new script. If you’re experienced with regex and use a more advanced code editor (such as VSCode), you can use the below regex to find all common instances of where damage values would be specified.

```c
(a_explode\s*\()|(damage((\s*\()|(thing)))|(core_((propexplode)|(teamexplode)|(damageowner)|(damageactor)))
```

## Starting Inventory

---

In addition to dealing with the class’s starting HP, we’ve also got their starting inventory to resolve. If you recall, a class made for standalone MM8BDM should always have `BaseFlagPack` as a starting item. CBM has its own variant of this inventory named `CBM_BaseFlagPack` which adds additional behavior in addition to giving `BaseFlagPack`. Additionally, CBM has its copy weapon nerf actors which need to be given if you’re designing a class intended to use copy weapons.

This means for best practices, we’ll need to be able to give `BaseFlagPack` in standalone MM8BDM but `CBM_BaseFlagPack` and potentially copy weapon nerf actors whenever CBM is loaded. To accomplish this as well as the issue of starting HP. We’ll do the following:

```c
actor MegamanXC : ClassBase
{
	Player.ScoreIcon "XMUGSHT1"
	player.displayname "MegamanX"
	player.soundclass "megamanx"

	player.maxhealth 1000
	health 1000
	player.jumpz 10
	player.forwardmove 0.8, 0.8
	player.sidemove 0.78, 0.78

	player.startitem "X_StartingInventory"
	...
}

actor X_StartingInventory : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 ACS_NamedExecuteWithResult("MMX_StartingInventory", true)
			stop
	}
}
```

We’ll first pretend that CBM is always loaded and give our class their intended HP value but multiplied by 10. Instead of giving `BaseFlagPack` or `CBM_BaseFlagPack`, we’ll actually give our own defined actor which calls an ACS script. The ACS script is defined below.

```c
#library "XACS2"
#include "zcommon.acs"

#include "CBMADD.acs"

script "MMX_StartingInventory" (int copynerf) {
	if(!CBMBeefInPlay()) {
		SetActorProperty(0, APROP_Health, GetActorProperty(0, APROP_Health) / 10);
		SetActorProperty(0, APROP_SpawnHealth, GetActorProperty(0, APROP_SpawnHealth) / 10);
	}
	
	if(CBMInPlay()) {
		GiveInventory("CBM_BaseFlagPack", 1);
		if(copynerf) {
			GiveInventory("CopyNerfGiver_P", 1);
		}
	} else {
		GiveInventory("BaseFlagPack", 1);
	}
}
```

This script is a reusable starter script which handles the different edge cases of standalone MM8BDM, versus CBM, versus its forks. It takes in a parameter to determine whether or not the class should receive the various copy weapon nerf actors. 

If CBM’s beefed up values aren’t loaded, then the class’s HP is divided by 10 to set them up for a normal range of values. If CBM is in play, then its version of the base flag inventories are given instead of MM8BDM’s.

## Doc Scanner

---

Doc Scanner is Doc Robot’s special ability and the copy weapon he drops. It has a mechanic where if it scans a copy weapon class, it will borrow their current copy weapon, and if he scans a non-copy weapon class, it can give him their respective copy weapon.

`CBMADD.acs` gives us the ability to define Doc Scanner’s behavior when scanning our custom class. Because Megaman X is a copy weapon class, we’ll use the function which tells Doc Scanner to attempt to borrow his weapon. 

```c
#library "XACS3"
#include "zcommon.acs"

#include "CBMADD.acs"

script "MMX_CBM_DocDefine" OPEN {
	if(CBMInPlay()) {
		AddCBMClassScanCopy2("MegamanXC", "Megaman X");
		
		// Various other examples of
		// non-copy weapon classes
		
		// AddCBMClassScan2("RollClass", "Roll", "RollSweepWep");
		// AddCBMClassScanEX2("Astroman", "Astroman", "CopyVisionWep", "AstroCrushWep", 5.0);
		// AddCBMClassScanNull2("BBAMegaman", "BBA Mega Man");
	}
}
```

> 🚨 **You should always use **`CBMInPlay`** to determine whether or not to call these functions, they’ll throw errors on **`OPEN`** if you call them when CBM isn’t loaded!**

Below is a list of parameters that explain how `AddCBMClassScanCopy2` works.

## Parameters

- `class`: String - The actor name of the class (Ex. `"Tenguman"` or `"RollClass"`)

- `name`: String - A presentable name for the class (Ex. `"Tenguman"` or `"Roll"`)

If you have a non-copy weapon class which should give a separate copy weapon or inventory when scanned, you should use `AddCBMClassScan2` instead. Below are the parameters for that function.

## Parameters

- `class`: String - The actor name of the class (Ex. `"Tenguman"` or `"RollClass"`)

- `name`: String - A presentable name for the class (Ex. `"Tenguman"` or `"Roll"`)

- `wep1`: String - The weapon given when scanned (Ex. `"TornadoHoldWep"` or `"RollSweepWep"`)

If you’re familiar with CBM, you’ll know that some classes even have the potential to give two weapons when scanned. For that functionality, you can use `AddCBMClassScanEX2` with its parameters below.

## Parameters

- `class`: String - The actor name of the class (Ex. `"Tenguman"` or `"RollClass"`)

- `name`: String - A presentable name for the class (Ex. `"Tenguman"` or `"Roll"`)

- `wep1`: String - The weapon given when scanned (Ex. `"TornadoHoldWep"` or `"RollSweepWep"`)

- `wep2`: String - A secondary weapon that can be obtained (Ex. `"TenguBladeWep"` or `""`)

- `chance`: fixed - Percent chance of `wep2` being given instead of `wep1` (Ex. `50.0` or `0.0`)

Some classes don’t have any effect when scanned by Doc Scanner, so you can define that explicitly by using `AddCBMClassScanNull2`.

## Parameters

- `class`: String - The actor name of the class (Ex. `"RaThor"` or `"BBAMegaman"`)

- `name`: String - A presentable name for the class (Ex. `"RaThor"` or `"BBA Mega Man"`)

For the case in which your class’s actor name is the same as its presentable name, you can use a shortcut version of these functions which do not have a `name` parameter, instead using the `class` parameter to also act as the presentable name. A shortcut function for each of the above functions exists simply omitting the `2` on the end.

## Time Stopper

---

In CBM, Time Stopper and similar attacks can showcase a special frame depending on the class. It does this by instead showing a `]` frame instead of the typical hurt frame, `H`. This `]` frame typically has no rotations, so it’d be named like `XXXX]0`, where `XXXX` is your class’s skin sprite name. For example, because our X class uses the skin sprite names `MMX0` and `MMX2`, his time stopped sprites exist as for `MMX0]0` and `MMX2]0`.

> 🚨 **If you don’t provide these additional frames, your class will turn invisible when time stopped!**

## Class Help

---

CBM has a `classhelp` command which can be used in the game’s console to return information about the user’s current class. Additionally, it has an extra area in the game’s `TRAINING` map which showcases class info in a similar manner.

It implements supplying this information by defining specifically named `LANGUAGE` definitions. The general format of the `LANGUAGE` definition is `CBM_H_X_ClassName` where `X` is some symbol representing a different piece of the class’s information. All `LANGUAGE` definitions should be defined, with any non-applicable ones blank. 

Below are all the different symbols and their meaning.

- `N` - Presentable name for the class, typically this is colored for fun!

- `H` - The health of the class, should be x10 because this is for CBM.

- `S` - The movement speed values for the class in the form of `forwardmove/sidemove`.

- `J` - The `jumpz` value for the class.

- `W` - The number of weapons which the class has. If the class has only one weapon, leave this blank. CBM reserves the number `77` to indicate the class being a copy weapon class.

- `E` - Extra information about the class such as passives or bonus abilities.

- `M` - Information about the primary fire of the class. If the class has multiple weapons, both weapons should have their information listed here.

- `A` - Information about the alternate fire of the class. If the class has multiple weapons, both weapons should have their information listed here.

- `I` - Information about any items that the class might have.

```c
CBM_H_N_MegamanXC="\c[CBM0B]Megaman X";
CBM_H_H_MegamanXC="1000";
CBM_H_S_MegamanXC="0.8/0.78";
CBM_H_J_MegamanXC="10";
CBM_H_W_MegamanXC="77";
CBM_H_E_MegamanXC="Can Wall Jump";
CBM_H_M_MegamanXC=
				"Can be charged to fire a stronger shot.";
CBM_H_A_MegamanXC=
				"You perform a basic dash.";
CBM_H_I_MegamanXC=
				"Every 45 seconds, you can choose a new armor piece to equip."
				"\nThe helmet part halves your copy weapon ammo use."
				"\nThe chest part gives you extra health."
				"\nThe arm parts give an improved buster."
				"\nThe boot parts allow you perform an air dash.";

// A second example pulled from CBM
CBM_H_N_Galaxyman="\c[CBM9H]Galaxyman";
CBM_H_H_Galaxyman="850";
CBM_H_S_Galaxyman="0.8/0.78";
CBM_H_J_Galaxyman="10";
CBM_H_W_Galaxyman="2";
CBM_H_E_Galaxyman="";
CBM_H_M_Galaxyman=
				"Weapon 1 fires a Black Hole Bomb."
				"\nPress mainfire again detonates the bomb."
				"\nThis pulls enemies into the center of the explosion."
				"\nWeapon 2 fires a basic shot with varying power and speed.";
CBM_H_A_Galaxyman=
				"Begin hovering forward, doing slight ramming damage."
				"\nWhile hovering, you are able to detonate Black Hole Bombs with mainfire.";
CBM_H_I_Galaxyman=
				"Spawns a portal that can be teleported back to with altfire.";
```

<!-- image omitted (assets not vendored) -->

## Shootable Actors

---

If you have any attacks which should do less damage to shootable actors or have any general `PowerProtection` use in a `ClassBase` slot which needs a `damagefactor` alternative for shootable actors, CBM provides a set of 50 actors which can be replaced in the same vein as MM8BDM’s `ClassBase` slots. These files take the form of `actors/CBM/slots/CBMSlotX.txt`. An example is shown below.

> 🚨 **Replacing these actors should only be used to place **`damagefactors`** into them! These are *****not***** intended to used as the **`ClassBase`** slots are!**

```c
actor CBM_ShootableActor42 : CBM_ShootableActor41 
{
	damagefactor "VirusOutbreak", 0.33
}
```

> 💡 **Note: To keep things easy to track, it’s best if you share the same number as your **`ClassBase`** slot if you’re using one, that way the Mod List can document both!**

## Closing

---

Because class expansions for CBM are so popular and it’s historically been tricky to make one that’s compatible with it and its forks in the past, we hope that these new features are sufficient to be able to handle the majority of CBM systems which a new class might want to interact with. Happy modding! 

## Example File

---

[CBM-XClass-v1b.pk3](../assets/4c32cbc48d2b455f80a421d845629518-CBM-XClass-v1b.pk3)

## See Also

---

[Pinging Out Classes](./pinging-out-classes-1414aac1.md)

[Custom Weapons with CBM](./custom-weapons-with-cbm-d7343e16.md)
