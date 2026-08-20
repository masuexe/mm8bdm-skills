---
title: "Custom Weapons with CBM"
notion_id: d7343e16e4d04b0b808c40d044a27dd5
source: https://www.notion.so/d7343e16e4d04b0b808c40d044a27dd5
---

# Custom Weapons with CBM

---

[Class Based Modification (CBM)](https://mm8bdm.net/forum/thread/class-based-modification-v9gh-42) is the community’s longest running and most notable class mod, introducing a class for just about every mainline robot master in the Mega Man series. It’s been in the works for over 10 years and has been passed between multiple groups of developers over time, making it one of the most varied modded experiences.

## Custom Weapon Support

---

> ⚠️ **Warning: This tutorial details *****extra***** steps that should be taken when creating a weapon for compatibility with CBM. It goes without saying that you should already have experience with **[**creating weapons for MM8BDM V6B**](../interacting-with-systems-c99b6cab/creating-weapons-bf312efa.md)** itself.**

With the release of MM8BDM V6B, as with a lot of other newer mods, CBM is now fully compatible with select weapons and content expansions. Using CBM’s `CBMADD.acs` ACS library, which can be found inside of its file at `acs_source/cbm_dt/CBMADD.acs`, you’ll be able to follow along with this page and implement the two major mechanics that allow compatibility.

## Beefed Up Values

---

CBM is one of the community’s mods which has “beefed up” damage and HP values, meaning that it multiplies every original damage and HP value by 10. While in base MM8BDM, the default HP range is 100 and the Mega Buster deals 10 damage, in CBM, the default HP range is 1000 and the Mega Buster deals 100 damage.

It does this to enable some steeper damage and defense multipliers which would be unviable or cause unintended consequences in the standard range of values due to limitations of the Zandronum engine.

For your weapons, this means that you’ll need a mechanism to do normal damage, except when CBM’s “beefed up” values are loaded, in which case you should multiply that damage by 10. `CBMADD.acs` provides a helper function to help us create that mechanism. You should create a script that looks like below for your own weapon pack.

```javascript
#library "SPRKCBM"
#include "zcommon.acs"

#include "CBMADD.acs"

script "sparkscatter_cbm_damage" (int dmg) {
    if (CBMBeefInPlay()) { // Checks for beefed up values
        dmg *= 10;
    }
    SetResultValue(dmg);
}
```

This script is fairly simple in concept, it takes in a damage value and returns back a damage value using [`SetResultValue`](https://zdoom.org/wiki/SetResultValue). If CBM’s beefed up values are loaded, it’ll return the damage given but multiplied by 10. Using Spark Scatter’s DECORATE as an example, this script can be used like below.

```c
actor SparkScatterLob : BasicProjectile
{
	-NOGRAVITY
	+FORCEXYBILLBOARD
	+BRIGHT

	Radius 6
	Height 6

	damage (CallACS("sparkscatter_cbm_damage", 1))
	speed 45
	gravity 1.8

	translation "225:225=229:299"
	damagetype "SparkScatter"
	Obituary "$OB_SPARKSCATTER"

	States
	{
		Spawn:
			SPAS AB 4
			loop
		Death:
			SPAS A 0 A_SpawnItemEx("SparkScatterExplode")
			stop
	}
}

actor SparkScatterExplode : BasicExplosion
{
	scale 3.6

	translation "225:225=229:299"
	damagetype "SparkScatter"
	Obituary "$OB_SPARKSCATTER"

	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_SpawnItemEX("ElectrifyEffect")
			TNT1 A 0 A_Explode(CallACS("sparkscatter_cbm_damage", 15), 80, 0, 0, 80)
			SPAS AHIJ 1
			stop
	}
}
```

Notably, every instance where a damage value is defined, we’ve substituted it with [`CallACS`](https://zdoom.org/wiki/ACS_NamedExecuteWithResult) using our new script. If you’re experienced with regex and use a more advanced code editor (such as VSCode), you can use the below regex to find all common instances of where damage values would be specified.

```c
(a_explode\s*\()|(damage((\s*\()|(thing)))|(core_((propexplode)|(teamexplode)|(damageowner)|(damageactor)))
```

## Class Specific Support

---

CBM has a few classes which have special mechanics surrounding copy weapons. Universally (barring Maestro), copy weapon classes receive a “copy nerf.” This is a damage debuff which nerfs the damage of their copy weapons to 0.777x as a general baseline. We’ll want to define this debuff for our weapon(s) and use a similar range to keep the damage feeling right for those classes. 

Rock doesn’t use copy weapons himself, but he has a mechanic where he can pick them up to receive a corresponding Mega Man 1 inspired variant of Mega Ball. Doc Robot has a special mechanic where while using a weapon, his base, passive stats change to match the robot master which the weapon belongs to. Last but not least, Evil Robot has a mechanic where each copy weapon is associated to one of his Giga Attacks from his Chapter 8 boss battle.

We’ll again use some functions from `CBMADD.acs` to set all of these mechanics up.

```c
#library "SPRKCBM2"
#include "zcommon.acs"

#include "CBMADD.acs"

script "sparkscatter_cbm_defines" OPEN {
	if (CBMInPlay()) { // Checks that CBM is loaded at all
		// Your weapon pack should only use ONE CopyNerf actor
		// You can put the damage debuffs for all your weapons into it!
		AddCopyNerf("SparkScatter_CopyNerf");
		
		// You will need one of these lines for EACH weapon.
		AddCBMWepInfoEX("SparkScatterWep", CBMADD_ELEC, 750, 115, 115, CBMADD_GTC);
	}
}
```

The first `CBMADD.acs` function which we use here is `CBMInPlay`. Similar to `CBMBeefInPlay`, this just checks if CBM is loaded at all. 

> 🚨 **You should always use **`CBMInPlay`** to determine whether or not to call these functions, they’ll throw errors on **`OPEN`** if you call them when CBM isn’t loaded!**

The second function used, `AddCopyNerf`, is used to define which “copy nerf” is given to copy weapon classes for your weapon pack.

## Parameters

- `nerf`: String - Actor name of the [`PowerDamage`](https://zdoom.org/wiki/Classes:PowerDamage) actor (Ex. `CBM_CopyNerf`)

As you might be able to expect, by defining this, we need to create the respective DECORATE actor, so below is an example of what that should look like.

```c
actor SparkScatter_CopyNerf : PowerDamage
{
	+INVENTORY.ALWAYSPICKUP
	Powerup.Duration 0x7FFFFFFC
	
	damagefactor "SparkScatter", 0.777
	// More weapons could be put below here
	// Allowing you to save space and only
	// use one CopyNerf actor.
}
```

It should have an infinite duration and use [`damagefactor`](https://zdoom.org/wiki/Actor_properties#:~:text=Default%20is%200.-,DamageFactor,-type%2C%20value) to nerf the damage of each [`damagetype`](https://zdoom.org/wiki/Actor_properties#:~:text=value%20is%20200.-,DamageType,-type) which your weapons use.

> 💡 **Note: A good practice regarding these CopyNerf actors is to put them in their own isolated DECORATE file with a filename unique to your project.   
>   
> Some forks of CBM wish to replace these CopyNerf actors to further nerf copy weapons or finetune the multiplier per weapon, which is much easier done when they’re isolated and in uniquely named files.**

With the third ACS function we used, `AddCBMWepInfoEX`, this is the function that actually defines how Rock, Doc, and Evil Robot’s mechanics behave with your weapon(s). The parameters of that function are as follows.

## Parameters

- `actor`: String - The weapon's class name. (Ex. `"RollingCutterWep"`)

- `rock`: int - The slot that Rock should obtain (Ex. `CBMADD_FIRE`). The following values are accepted.
  - `CBMADD_NONE` (0): Random

  - `CBMADD_CUT` (1): Mega Cut Ball

  - `CBMADD_TIME` (2): Mega Time Ball

  - `CBMADD_FIRE` (3): Mega Fire Ball

  - `CBMADD_ELEC` (4): Mega Elec Ball

  - `CBMADD_GUTS` (5): Mega Guts Ball

  - `CBMADD_ICE` (6): Mega Ice Ball

  - `CBMADD_BOMB` (7): Mega Bomb Ball

  - `CBMADD_OIL` (8): Mega Oil Ball

- `health`: int - The health that Doc should have (Ex. 1000)

- `jump`: int - Jump percentage modifier (Ex. 125)

- `speed`: int - Speed percentage modifier (Ex. 120)

- `ER`: int - The slot that Evil Robot should obtain (Ex. `CBMADD_GFS`). The following values are accepted.
  - `CBMADD_NONE` (0): Evil Beam

  - `CBMADD_GTH` (1): Giga Tornado Hold

  - `CBMADD_GAS` (2): Giga Astro Crush

  - `CBMADD_GFS` (3): Giga Flame Sword

  - `CBMADD_GTC` (4): Giga Thunder Claw

  - `CBMADD_GHS` (5): Giga Homing Sniper

  - `CBMADD_GIW` (6): Giga Ice Wave

  - `CBMADD_GFB` (7): Giga Flash Bomb

  - `CBMADD_GWB` (8): Giga Water Balloon

For most use cases in CBM, Rock and Evil Robot are designed to use the same numerical slot value for a given weapon, so the standard, shortcut version of `AddCBMWepInfo` can be used as follows:

## Parameters

- `actor`: String - The weapon's class name. (Ex. `"RollingCutterWep"`)

- `rockER`: int - The slot that Rock and ER should obtain (Ex. `CBMADD_FIRE`). The following values are accepted.
  - `CBMADD_NONE` (0): Random / Evil Beam

  - `CBMADD_CUT`/`CBMADD_GTH` (1): Mega Cut Ball / Giga Tornado Hold

  - `CBMADD_TIME`/`CBMADD_GAS` (2): Mega Time Ball / Giga Astro Crush

  - `CBMADD_FIRE`/`CBMADD_GFS` (3): Mega Fire Ball / Giga Flame Sword

  - `CBMADD_ELEC`/`CBMADD_GTC` (4): Mega Elec Ball / Giga Thunder Claw

  - `CBMADD_GUTS`/`CBMADD_GHS` (5): Mega Guts Ball / Giga Homing Sniper

  - `CBMADD_ICE`/`CBMADD_GIW` (6): Mega Ice Ball / Giga Ice Wave

  - `CBMADD_BOMB`/`CBMADD_GFB` (7): Mega Bomb Ball / Giga Flash Bomb

  - `CBMADD_OIL`/`CBMADD_GWB` (8): Mega Oil Ball / Giga Water Balloon

- `health`: int - The health that Doc should have (Ex. 1000)

- `jump`: int - Jump percentage modifier (Ex. 125)

- `speed`: int - Speed percentage modifier (Ex. 120)

In short, in the script we created above, Spark Scatter grants Rock his Mega Elec Ball, gives Doc the stats of 750 HP, 115% jump, and 115% speed, and allows Evil Robot to use his Giga Thunder Claw.

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

With those two extra elements implemented, your weapon pack is on its way to be played alongside CBM, so enjoy!

While we’re sure that CBM and copy weapons won’t ever be the most balanced experience, we hope that with these compatibility systems, there can be the space for weapon packs to shine alongside CBM.

## Example File

---

[CBM-AdvancedSparkScatter-v1c.pk3](../assets/d57b85251ffe4930929709213380dcfa-CBM-AdvancedSparkScatter-v1c.pk3)

## See Also

---

[Custom Classes with CBM](./custom-classes-with-cbm-2196ad22.md)
