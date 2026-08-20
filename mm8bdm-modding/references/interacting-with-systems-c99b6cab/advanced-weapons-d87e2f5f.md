---
title: "Advanced Weapons"
notion_id: d87e2f5f2d304967b24c7d72fe4c34e5
source: https://www.notion.so/d87e2f5f2d304967b24c7d72fe4c34e5
---

# Advanced Weapons

---

> ⚠️ **Warning: Before beginning this tutorial, you should have already read through and completed the **[**tutorial for creating a basic weapon**](./creating-weapons-bf312efa.md)**. This page will build on the previous weapon and concepts from that tutorial, making it essential to understand the previous page!**

Continuing from the previous page with weapons, we created [a weapon that scattered explosive, stunning shots](./creating-weapons-bf312efa.md). Let’s continue to build upon that weapon to show off some more things that can be done with weapons using the systems in Mega Man 8-Bit Deathmatch.

## The Alternate Fire

---

As mentioned in that previous tutorial, not only is there a `Fire` state, but there’s also an `Altfire` state. Let’s start our weapon ventures by adding an alternate fire to Spark Scatter. This alternate fire will fire a spread of three shots with a fancy weapon sprite animation.

Let’s begin by adding the `TEXTURES` definitions that will be needed to facilitate that fancy weapon sprite animation. We’ll add the following definitions to the `TEXTURES` file in our weapon file.

```c
sprite SKS0A0, 128, 92 {Offset -212, -114  Patch HBU1A0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0B0, 128, 92 {Offset -236, -134  Patch HBU1B0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0C0, 128, 92 {Offset -232, -134  Patch HBU1C0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0D0, 124, 96 {Offset -220, -122  Patch HBU1D0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0E0, 124, 96 {Offset -200, -106  Patch HBU1E0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0F0, 124, 96 {Offset -192, -98  Patch HBU1F0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
```

These offsets and animations are the same that Drill Bomb uses, so we’ll be involving some heavy kick back with our alternate fire. The actual DECORATE that we’ll be adding now is below.

```c
Altfire:
	SKST B 0 A_JumpIfNoAmmo("NoAmmo")
	SKST B 0 A_PlaySoundEx("weapons/mm7/thunderboltfire", "Weapon")
	SKST B 0 A_PlaySoundEx("weapons/mm3/sparkshockfire", "SoundSlot6")
	SKST B 0 A_FireCustomMissile("SparkScatterLob",-10,0,8,0)
	SKST B 0 A_FireCustomMissile("SparkScatterLob",0,0,8,0)
	SKST B 0 A_FireCustomMissile("SparkScatterLob",10,1,8,0)
	SKS0 ABCDEF 2
	SKST B 6
	SKST B 0 A_Refire
	goto Ready+1
```

Note how only one of those `A_FireCustomMissile` calls are using the argument which tells the weapon that it should take its ammo. If all three had a 1 for the second argument, then this alternate fire would take triple the ammo. That sort of behavior may be desirable, but we shouldn’t do it that way. What we should actually do is add some new weapon properties.

```c
-WEAPON.ALT_USES_BOTH
Weapon.AmmoUse2 6
Weapon.AmmoType2 "SparkScatterAmmo"
```

To go in order, this says to remove the flag which determines alternate fires taking both primary and alternate fire ammo, that alternate fire should use 6 ammo, and that the ammo which alternate fire uses should be `"SparkScatterAmmo"`. Using this method allows some more fine-tuning of the ammo take values. In our instance, rather than tripling the ammo usage, we’ve only doubled it.

## The Alternate Ammo

---

What if we wanted that alternate fire to use its own pool of ammo, however? Well, considering that we have access to a set of properties for the secondary ammo type, let’s just use those! First we’ll need to define a new ammo actor for the secondary ammo.

```c
actor SparkSpreadAmmo : Ammo
{
	inventory.amount 1
	inventory.maxamount 28
	+INVENTORY.IGNORESKILL
}
```

Now let’s change our properties to use it and also change them to specify how much of this ammo the user should receive on weapon pickup.

```c
-WEAPON.ALT_USES_BOTH
Weapon.AmmoUse2 7
Weapon.AmmoGive2 28
Weapon.AmmoType2 "SparkSpreadAmmo"
```

Last but certainly not least, just like we had to define an actor so that our primary ammo bar would show up, let’s do the same so that our secondary ammo bar will show up. The game will be searching for an actor named `[YourWeapon]_SecondBar`, or in our case, `SparkScatterWep_SecondBar`, so let’s go ahead and define that.

```c
actor SparkScatterWep_SecondBar : SecondBar { args 229, 232 }
```

This’ll get the job done, but we have one more task to make sure this secondary ammo is fully complete. Recall back to the previous tutorial how we had to tell the game in ACS what ammo our weapon is using. That was to enable our weapon to use ammo pickups. However, now that we’ve got two ammo types, that area is inaccurate and we can’t gain ammo on our secondary ammo. 

We’ll need to go back there to update it using the [DefineDoubleAmmoWeapon](./definedoubleammoweapon-ebfeb97c.md) function instead. This function is designed to allow you to specify two ammo types and two ammo multipliers. We’ll use it as follows:

```javascript
script "sparkscatter_info" OPEN {
	DefineDoubleAmmoWeapon("TAG_SPARKSCATTER", "SparkScatterWep", "SKSTA0", "SparkScatterAmmo", 0.50, "SparkSpreadAmmo", 0.50, DTADD_SLOT_CLOSE, true, true, true);
}
```

Notice how now I’m using a 0.5x multiplier on ammo gain for each ammo type. While this isn’t required, it can be a fun way to balance weapons that have multiple ammos, because this emulates splitting the ammo across both types.

<!-- image omitted (assets not vendored) -->

## Getting Fancier

---

Some of the best designed weapons tend to have more complicated mechanics than simply shooting projectiles. In our case, in fact, we’ve got a weapon that may be a bit too strong with how it spams stun projectiles. Let’s add a mechanic where firing too many times without waiting idle on the weapon will cause the weapon to overheat into a forced cooldown. We’ll combine this with our alternate fire by making it so that our alternate fire will instantly overheat the weapon.

To accomplish this, we’ll want to add an inventory flag that we can increment in the weapon user’s inventory. If the user ends up receiving too much of this inventory flag and they’re at the end of their firing state, then they’ll be locked into cooldown. In their `Ready` state, we’ll take this flag repeatedly to get the effect of the weapon cooling down.

First, the inventory flag:

```javascript
actor SparkScatterOverheat : Inventory
{
	inventory.amount 1
	inventory.maxamount 105
}
```

Next, some updated `TEXTURES` definitions we’re borrowing from Crystal Eye’s animation to handle the overheated state. Note that the first block of these are replacing the alternate fire animation that we just implemented earlier in this page, primarily because now we want our alternate fire animation to lead directly into the overheat animation.

```javascript
sprite SKS0A0, 128, 92 {Offset -212, -114  Patch HBUSA0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0B0, 128, 92 {Offset -236, -134  Patch HBUSB0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0C0, 128, 92 {Offset -232, -134  Patch HBUSC0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0D0, 124, 96 {Offset -220, -122  Patch HBUSD0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0E0, 124, 96 {Offset -200, -106  Patch HBUSE0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0F0, 124, 96 {Offset -192, -98  Patch HBUSF0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}

sprite SKS0G0, 116, 96 {Offset -184, -94  Patch HBUSG0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0H0, 116, 96 {Offset -184, -94  Patch HBUSH0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0I0, 116, 96 {Offset -184, -94  Patch HBUSI0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0J0, 116, 96 {Offset -184, -94  Patch HBUSJ0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
sprite SKS0K0, 116, 96 {Offset -184, -94  Patch HBUSK0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
```

Here are the states that we’ll actually be modifying inside of the weapon to align with our goals mentioned earlier.

```c
Ready:
	SKST B 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_SPARKSCATTER)
	SKST B 1 A_WeaponReady
	SKST B 0 A_TakeInventory("SparkScatterOverheat",1)
	goto Ready+1

Fire:
	SKST B 0 A_JumpIfNoAmmo("NoAmmo")
	SKST B 0 A_PlaySoundEx("weapons/mm7/thunderboltfire", "Weapon")
	SKST B 0 A_PlaySoundEx("weapons/mm3/sparkshockfire", "SoundSlot6")
	SKST B 0 A_GiveInventory("SparkScatterOverheat",45)
	SKST B 0 A_FireCustomMissile("SparkScatterLob",0,1,8,0)
	SKST CD 5
	SKST D 0 A_JumpIfInventory("SparkScatterOverheat",105,"Overheat")
	SKST B 10
	SKST B 0 A_Refire
	goto Ready+1
			
Altfire:
	SKST B 0 A_JumpIfNoAmmo("NoAmmo")
	SKST B 0 A_PlaySoundEx("weapons/mm7/thunderboltfire", "Weapon")
	SKST B 0 A_PlaySoundEx("weapons/mm3/sparkshockfire", "SoundSlot6")
	SKST B 0 A_GiveInventory("SparkScatterOverheat",105)
	SKST B 0 A_FireCustomMissile("SparkScatterLob",-10,0,8,0)
	SKST B 0 A_FireCustomMissile("SparkScatterLob",0,0,8,0)
	SKST B 0 A_FireCustomMissile("SparkScatterLob",10,1,8,0)
	SKS0 ABCDEF 2
Overheat:
	SKS0 G 35
	SKS0 G 0 A_TakeInventory("SparkScatterOverheat",999)
	SKS0 G 0 A_PlaySoundEx("weapons/mm8/homingsniperload", "Weapon")
	SKS0 HIJK 2
	SKST B 0 A_Refire
	goto Ready+1

NoAmmo:
	SKST B 1 ACS_NamedExecuteAlways("core_noammo",0)
	SKST B 0 A_TakeInventory("SparkScatterOverheat",1)
	goto Ready+1
```

This is a rather naive approach of doing an overheat mechanic, because the overheat will only tick down whenever the user is holding the weapon but not firing. However, it gets the job done, almost anyway. The part that we’re actually missing is some sort of indicator of how overheated the weapon is. The typical way to handle this would be some sort of special bar indicator, which transitions us nicely into the next, and likely most important section.

## Script Bars and Special Effects

---

Everything that we’ve been doing with our ammo bars currently has just been using the common use case, shortcut actors which we can define. However, we can get much more flexibility and many more effects out of using something called a `ScriptBar`. 

Whenever you define an actor with the scheme of `[YourWeapon]_ScriptBar`, whenever your weapon is selected, in addition to still using whichever other bar actors you may have defined, the game will also execute an ACS script every tic on the client-side with the name of `DrawBar_[YourWeapon]`.  By using that ACS script, we have *options*. We can use conditionals and change how the bar looks at a moment’s notice by using [all of the functions](./README.md) that can be included from `BARLIB.acs`.

We’ll start simple with this by just drawing a core style overlay bar for the amount of overheat that you have, and once you’re maxed out on overheat, it’ll darken the primary ammo bar.

First, as mentioned previously, we’ll want to create our entry point, the `ScriptBar` actor, so let’s do that with the following line of DECORATE.

```c
// our other bar actors are still right above here!
actor SparkScatterWep_ScriptBar : ScriptBar {}
```

Now, let’s move into ACS and begin creating our `DrawBar` script.

```c
#include "BARLIB.acs"

script "DrawBar_SparkScatterWep" (void) {

}
```

We’re assuming that this script is being added to the ACS file of the previous tutorial, so there is no need for us to redefine the library or to reinclude `"zcommon.acs"`. All we need to do that we weren’t doing previously is include `BARLIB.acs` which can be found inside of Mega Man 8-Bit Deathmatch’s PK3’s `acs_source/_includes/mod api` directory.

Right now, this script doesn’t do anything exciting, truly at all, so let’s add our logic to draw the overlay bar and the darkened bar.

```c
script "DrawBar_SparkScatterWep" (void) {
	if(CheckInventory("SparkScatterOverheat") >= 105) {
		SetDarkenedBar();
	} else if (CheckInventory("SparkScatterOverheat") > 0) {
		SetOverlayBar(CheckInventory("SparkScatterOverheat"), 105);
	}
}
```

This script uses the [SetDarkenedBar](./setdarkenedbar-5d652a8d.md) and [SetOverlayBar](./setoverlaybar-a4554a75.md) functions from `BARLIB.acs`. The former function takes no parameters, so it’s nice and simple to use. The latter takes two parameters. The way that these parameters can be imagined is a ratio of how much of the bar to draw. If the user has 35 of `"SparkScatterOverheat"`, we want to divide that by 105 (the max amount of `"SparkScatterOverheat"`) to draw 1/3 of the overlay bar. Hence when calling the function, we pass in the amount of a given inventory the user has using [`CheckInventory`](https://zdoom.org/wiki/CheckInventory), the max of that inventory, and we get the desired result.

That’s one of the more basic party tricks that we can do using this system, but let’s ramp up the stakes. In core, a darkened bar is typically used to indicate weapons that can be swapped off of, particularly all of the “quick-swap” weapons. During our weapon’s cooldown, we actually can’t swap off of it, and let’s not change that for the sake of the example. Let’s say instead that we wish to only dim the bar when overheated. We’ll dim it to the same colors that the secondary ammo bar uses.

Let’s start by getting rid of our `NormalBar` and `SecondBar` actors because we can handle all of their logic within our `DrawBar` script using [DrawBarColor](./drawbarcolor-11e91750.md) and [DrawBar2Color](./drawbar2color-e6704b72.md).

```c
script "DrawBar_SparkScatterWep" (void) {
	DrawBarColor(4, 229);
	DrawBar2Color(229, 232);
	if(CheckInventory("SparkScatterOverheat") >= 105) {
		SetDarkenedBar();
	} else if (CheckInventory("SparkScatterOverheat") > 0) {
		SetOverlayBar(CheckInventory("SparkScatterOverheat"), 105);
	}
}
```

Now that everything is handled in our `DrawBar` script, the next step will seem a bit more obvious.

```c
script "DrawBar_SparkScatterWep" (void) {
	if(CheckInventory("SparkScatterOverheat") >= 105) {
		DrawBarColor(229, 232);
	} else {
			if (CheckInventory("SparkScatterOverheat") > 0) {
				SetOverlayBar(CheckInventory("SparkScatterOverheat"), 105);
			}	
			DrawBarColor(4, 229);
	}
	DrawBar2Color(229, 232);
}
```

This gets the job almost fully done, but you may notice an error if you’ve been following up with the code up until now. The base skin in our game is actually color changing dependent on the color that the first ammo bar is set to. Because we’re changing the color of the primary ammo bar between frames, we end up in situations where our base skin is either a lighter yellow or a darker yellow. Sometimes this may be useful behavior, such as for charge weapons. In our case, not so much.

<!-- image omitted (assets not vendored) -->

Let’s add one line using [SetMugshotColor](./setmugshotcolor-c71038d3.md) as in the script below to fix that.

```c
script "DrawBar_SparkScatterWep" (void) {
	if(CheckInventory("SparkScatterOverheat") >= 105) {
		DrawBarColor(229, 232);
	} else {
			if (CheckInventory("SparkScatterOverheat") > 0) {
				SetOverlayBar(CheckInventory("SparkScatterOverheat"), 105);
			}	
			DrawBarColor(4, 229);
	}
	DrawBar2Color(229, 232);
	SetMugshotColor(4, 229);
}
```

Now that we’ve fixed that, our ammo bars and mugshot work entirely as intended for our previous goal. However, we can always raise the stakes a bit further, so let’s pull an even more daring party trick. Let’s make it so that our secondary ammo bar using a custom, four-segment bar. This’ll be a custom graphic that our weapon mod adds, making it even more impressive.

To do this, we’ll be using the [DrawCustomBar](./drawcustombar-c036f3e3.md) function, which requires a bit of prerequisite knowledge. The way that they’re implemented is that Mega Man 8-Bit Deathmatch has “template slot” bars which you can feed graphics into. These slots range from the numbers, 3-255, but you <u>must</u> consider what slots other mods may be using when you decide that you want to create a custom bar. 

If you use the same slot as another mod and both mods are loaded, that might result in some weird UI visuals, so it’s always the best practice to ask around, look around, and know which slots are safe to use. The reason why the range is from 3-255 is actually because base Mega Man 8-Bit Deathmatch uses slots 0, 1, and 2 for Skull Barrier, Plant Barrier, and Black Hole respectively.

Another bit of knowledge that’ll be necessary is knowing how to feed in the graphics that MM8BDM is expecting for a given slot’s custom bar. We’ll detail that below by first showing an example of us creating the `TEXTURES` definitions for our custom bar in slot 5, then we’ll explain more details of it.

```c
texture BRSLT005, 8, 56{offset -8,-8 patch SPRKBAR, 0, 0}
texture BRSLB005, 8, 56{offset -8,-8 patch BAREMPTY, 0, 0}
texture VRSLT005, 56, 8{offset -58,-176 patch SPRKBAR, 0, 0 {rotate 90}}
texture VRSLB005, 56, 8{offset -58,-176 patch VAREMPTY, 0, 0}
```

We need to define 4 textures for each custom bar we create. The first texture is the graphic shown for a full bar in vertical UI style, the second texture is the graphic shown for an empty bar in vertical UI style, the third texture is the graphic shown for a full bar in horizontal UI style, and the fourth texture is the graphic shown for an empty bar in horizontal UI style. These four textures are always in the format of `BRSLTXXX`, `BRSLBXXX`, `VRSLTXXX`, `VRSLBXXX`, where `XXX` is the bar slot you wish to use, except 0-padded, which is why we’re using `005`.

You may also notice that we’re specifying offsets for these custom bars. That is because this is where we define where on the screen the custom bar actually gets displayed. By having -8, -8 for our first graphic, that is indicating that our bar is going to get drawn at the coordinate (8, 8) on the screen, which is the typical spot where a secondary ammo bar will go. Same idea for the two horizontal UI style graphics. If we were placing a custom bar in the spot where a primary ammo bar typically goes, we would instead be using -16, -8 and -58, -184. Additionally, if we were creating a custom bar designed to go over top the HP bar, we would be using -24, -8 and -130, -184.

`SPRKBAR` is the name of the graphic that we’ll be putting into our weapon mod’s `graphics` folder while `BAREMPTY` and `VAREMPTY` are graphics which already exist in the base game.

Now that we’ve got our graphics for the custom bar properly set up, we can begin to actually use it in our code. Let’s adjust our previous `DrawBar` script to make use of it in place of our previous [DrawBar2Color](./drawbar2color-e6704b72.md).

```c
script "DrawBar_SparkScatterWep" (void) {
	if(CheckInventory("SparkScatterOverheat") >= 105) {
		DrawBarColor(229, 232);
	} else {
			if (CheckInventory("SparkScatterOverheat") > 0) {
				SetOverlayBar(CheckInventory("SparkScatterOverheat"), 105);
			}	
			DrawBarColor(4, 229);
	}
	DrawCustomBar(5, CheckInventory("SparkSpreadAmmo"), 28);
	SetMugshotColor(4, 229);
} 
```

The first parameter as you may expect is us signifying the slot of bar we wish to draw, while the second and third parameters are setting up that same bar ratio discussed with [SetOverlayBar](./setoverlaybar-a4554a75.md).

We can run this in-game and we’ll see we’re so close to the correct result, but we’ve naively replaced a normal bar draw call with a custom bar draw call. Because custom bars can be placed anywhere and used for any reason, the game does not make any assumptions about which ammo number to draw or where to draw ammo numbers at. The result of this in our case is that our ammo number for our secondary ammo has disappeared, and now our primary ammo number has started drawing behind the custom bar we just created. 

<!-- image omitted (assets not vendored) -->

To remedy this, we’ve actually got to manually align where the ammo numbers should go and we need to tell the game to draw our secondary ammo number. Thankfully, this is just two lines to add as seen below:

```c
script "DrawBar_SparkScatterWep" (void) {
	if(CheckInventory("SparkScatterOverheat") >= 105) {
		DrawBarColor(229, 232);
	} else {
			if (CheckInventory("SparkScatterOverheat") > 0) {
				SetOverlayBar(CheckInventory("SparkScatterOverheat"), 105);
			}	
			DrawBarColor(4, 229);
	}
	DrawCustomBar(5, CheckInventory("SparkSpreadAmmo"), 28);
	SetInventory("SBARAmmoOffset",2);
  DrawSecondAmmo();
	SetMugshotColor(4, 229);
}
```

By setting the user’s `"SBARAmmoOffset"` amount to 2, we’re essentially saying that we’re drawing two bars, so the ammo should go all the way to the left. Then we’re using [DrawSecondAmmo](./drawsecondammo-a1116b92.md) to manually tell the game to draw the ammo number for the secondary ammo type.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

Once you understand how to stretch the limits of `DrawBar` scripts and custom bars, the sky is truly the limit on what’s possible. You can do animated custom bars the same way that Skull Barrier and Black Hole do, you can use ACS’s [`HudMessageBold`](https://zdoom.org/wiki/HudMessageBold) or `ASSTLIB.acs`'s [BasicImageDisplay](./basicimagedisplay-5b8898f3.md) inside of `DrawBar` scripts to draw UI elements such as Ring Man’s UI, or you can create complex bars with multiple overlays.

Best of all, so long as everyone is sharing the slots and being courteous, everyone will be compatible with each other and future proofed for future versions of Mega Man 8-Bit Deathmatch!

With all of that done, we’re ready to move onto simpler things. Let’s create a custom pain state for our weapon without messing up any of core’s pain states.

## Custom Pain States

---

Similar to how custom bars are implemented, the actor that makes up the player is a chain of inheritance which includes 50 template actors which are designed to be replaced by modders for the purposes of adding custom pain states. Once again, you’ll want to look around, ask around, and be cognizant of which pain slots other mods are using. Only 1-50 are valid pain slots and folks have to share for the best compatibility!

If you fail to do so and end up using the same pain slot as another mod and load both, one of your mods’ pain states will be overwritten and not work entirely. To keep things simple on our end, let’s imagine we want to use pain slot 5. To do this, we’ll need to create a new DECORATE file in our project with a very specific location and name. Specifically, it needs to be `actors/player/classbase/customslots/classbaseslotX.txt` where X is the number which you wish to use as your pain slot, so in our case, the file we’ll be adding will be `classbaseslot5.txt`, located within `actors/player/classbase/customslots`.

Inside of that file, we should begin with something that looks like this,

```c
actor ClassBaseSlot5 : ClassBaseSlot4 
{
	States
	{
	// stuff will go here
	}
}
```

Note that for whichever slot you choose, your actor must inherit from the previous in the chain, otherwise you’ll break it for everybody!

What we actually want to add here is a special `Pain` state determined by the damage type of our projectiles. Recall earlier in the previous tutorial how we had our projectiles using the `SparkShock` damage type. This is because we wanted it to go to `Pain.SparkShock` in the player actor. Here, we’re going to change our projectile’s damage type to `SparkScatter`, so we’re going to want to create a `Pain.SparkScatter`, and we’re going to make it a buffed version of Spark Shock’s stun which will instantly stop the opponent when they’re stunned.

We won’t need to `#include` this file in our `DECORATE` root file, because this file is already being loaded by base MM8BDM.

```c
actor ClassBaseSlot5 : ClassBaseSlot4 
{
	States
	{
		Pain.SparkScatter:
			PLY1 H 0 A_Stop
			PLY1 H 0 A_SpawnItemEx("SparkShockFX",6,0,32)
			PLY1 H 0 A_GiveInventory("Shocked",1)
			Goto Pain+2
	}
}
```

Typically at the end of your pain state, you’ll want to have `goto Pain` or something similar. If you wish to skip the default hitstun, you’ll want to do `goto Pain+1`, and as we’re doing in this case, if you want to skip the default recoil and hitstun, you’ll do `goto Pain+2`.

You can also use these pain slot actors to define custom death states as well, just make sure to reference how core death states work to make sure you route into the correct states when they end.

Don’t forget to go back to the projectiles to update their damage type to match our newly created pain state.

```c
damagetype "SparkShock"
>>
damagetype "SparkScatter"
```

## Final Notes

---

With all of that said, that’s the essentials for creating weapons in Mega Man 8-Bit Deathmatch. There are extensions to this tutorial with [Creating Buster Upgrades](./creating-buster-upgrades-058630f6.md) and [Creating Classes](./creating-classes-5863e4dc.md), but it is strongly recommended to get a good grasp of the concepts from this tutorial and the previous weapon tutorial before moving on. Additionally, it is also useful to know how [Creating Assist Items](./creating-assist-items-d57d327f.md) works, because buster upgrades are the logical extension of both assist items and weapons.

Be sure to play around with creating fancy bar effects and interesting weapons, and be sure to share your weapons around with others in the community for feedback to work towards more interesting and more functional design.

## Example File

---

[v6b-AdvancedSparkScatter-v1b.pk3](../assets/f31d7482f8894bcb8f6e6d236f481d54-v6b-AdvancedSparkScatter-v1b.pk3)

## See Also

---

[Creating Assist Items](./creating-assist-items-d57d327f.md)

[Creating Buster Upgrades](./creating-buster-upgrades-058630f6.md)

[Custom Weapons with CBM](../additional-guides-7149f7a8/custom-weapons-with-cbm-d7343e16.md)
