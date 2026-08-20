---
title: "Creating Weapons"
notion_id: bf312efabf6e4b9cb6566bf6825daa2c
source: https://www.notion.so/bf312efabf6e4b9cb6566bf6825daa2c
---

# Creating Weapons

---

> ⚠️ **Warning: Before beginning this tutorial, you should already have some experience with **[**DECORATE**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** and **[**ACS**](../starting-guides-77c9d72f/hello-acs-447542af.md)**. It is also helpful to come into this knowing how to **[implement custom graphics](../starting-guides-77c9d72f/adding-custom-graphics-28261edf.md)** and **[**implement custom sounds**](../starting-guides-77c9d72f/adding-custom-sounds-6cf0678b.md)**.**

Weapons are the mechanic that drives vanilla Mega Man 8-Bit Deathmatch, so it is inevitable to want to create custom weapons that interact nicely with the weapons already existing in the game. 

Thankfully, weapons are just a combination of one main weapon actor and a multitude of projectile or accessory actors, so we can still use our knowledge of DECORATE when creating weapons. Additionally, Mega Man 8-Bit Deathmatch provides many base actors to inherit from and ACS functions to use when defining some properties specific to weapons. 

This tutorial will walk through the setup and creation of a basic minimum weapon. It’s recommended to try following along with your own project file, but don’t worry if you get lost, as a file with everything is provided at the end.

We can begin creating a weapon by first understanding the basic properties and states needed to make a weapon function.

```c
actor NotMegaBuster : BaseMM8BDMWep
{
	Weapon.AmmoUse 1
	Weapon.AmmoGive 28
	weapon.ammotype "NotBusterAmmo"

	Weapon.SlotNumber 3

	Inventory.Pickupmessage "Power Up! Mega Buster!"
	Obituary "%o was bombed by %k's Mega Buster."
	Tag "Mega Buster"

	inventory.icon "NULLICON"

	States
	{
		SpawnLoop:
			WEAP X 1
			loop

		Ready:
			BUST B 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_MEGABUSTER)
			BUST B 1 A_WeaponReady
			goto Ready+1

		Select:
			BUST B 0
			goto SelectSwap
		Deselect:
			BUST B 0
			goto DeselectSwap

		Fire:
			BUST B 0 A_JumpIfNoAmmo("NoAmmo")
			BUST B 0 A_PlaySoundEx("weapons/busters/megabusterfire","Weapon")
			BUST B 0 A_FireCustomMissile("MegaShot",0,1,8,0)
			BUST CD 3
			BUST B 2
			BUST B 0 A_Refire
			goto Ready+1

		NoAmmo:
			BUST B 1 ACS_NamedExecuteAlways("core_noammo",0)
			goto Ready+1
	}
}
```

The code above defines a weapon that can be a template called `NotMegaBuster`, an almost copy of the Mega Buster. We begin by inheriting from [BaseMM8BDMWep](../decorate-actor-reference-2fdd3e69/basemm8bdmwep-8cc600ca.md), an actor that already exists in Mega Man 8-Bit Deathmatch that sets up some of the more nitty gritty states such as `DeselectSwap` and `SelectSwap` which are being jumped to, but do not exist in our weapon that we’ve just created. 

## Basic Weapon Properties

---

Every weapon should define a few properties that describe its unique attributes.

We define a few ammo-based properties unique to our weapon, such as the amount of ammo it uses per shot, the amount of ammo received when picking up our weapon, and the actor name of the ammo used for our weapon.

```c
Weapon.AmmoUse 1
Weapon.AmmoGive 28
weapon.ammotype "NotBusterAmmo"
```

This ammo type must correspond to an actor that exists, so in this case, we would have an actor which looks like the following.

```c
actor NotBusterAmmo : Ammo
{
	inventory.amount 1
	inventory.maxamount 28
	+INVENTORY.IGNORESKILL
}
```

We also need to define a slot number for our weapon. This slot number corresponds to the scroll order of weapons and which number players can use to instantly swap to the weapon. The convention for Mega Man 8-Bit Deathmatch is to indicate the type of weapon it is via its slot number. We can use the following numbers to indicate the following slots.

- `SLOT_BUSTER`: 1

- `SLOT_RANGED`: 2

- `SLOT_RAPID`: 3

- `SLOT_CLOSE`: 4

- `SLOT_POWER`: 5

- `SLOT_AOE`: 6

- `SLOT_SHIELD`: 7

In this case, we are saying that `NotMegaBuster` is a weapon that fires rapidly, so we’re putting it into the `SLOT_RAPID` category. The default Mega Buster uses a value of 1 for its slot number because it is in the `SLOT_BUSTER` category.

```c
Weapon.SlotNumber 3
```

We then define a set of properties corresponding to which messages to play at certain weapon events.

- The pickup message is the message that will be seen in chat whenever picking up the weapon. 

- The obituary is the message that will play in chat whenever a player frags another player using the weapon and the projectile is missing an obituary.

- The tag is the message that the player will see on their screen whenever swapping to the weapon.

```c
Inventory.Pickupmessage "Power Up! Mega Buster!"
Obituary "%o was bombed by %k's Mega Buster."
Tag "Mega Buster"
```

The last property showcased here is the icon to be drawn in the spot underneath where the ammo bar goes. Mega Buster typically does not have an icon, so we draw the invisible `"NULLICON"` graphic instead.

```c
inventory.icon "NULLICON"
```

## Basic Weapon States

---

Recall from the previous DECORATE tutorial that actors enter the `Spawn` state whenever they first begin to exist. Weapons are still actors, so they do the same, but [BaseMM8BDMWep](../decorate-actor-reference-2fdd3e69/basemm8bdmwep-8cc600ca.md) implements a special `Spawn` state to handle some behavior for other systems in the game. We don’t want to interrupt or override that behavior in our custom weapon because we want to make sure it works the same as any other vanilla weapon. Therefore, we use the `SpawnLoop` state which [BaseMM8BDMWep](../decorate-actor-reference-2fdd3e69/basemm8bdmwep-8cc600ca.md)'s `Spawn` state routes into when done. This state is the one that reflects the weapon lying on the ground, so all it needs to do is loop a single line to show a graphic.

```c
SpawnLoop:
	WEAP X 1
	loop
```

> 🚨 **Incorrectly using the wrong state here gives the obvious tell of being unable to pick up your newly made weapon from the ground. That’s an indication that you’ve used **`Spawn`** instead of properly using **`SpawnLoop`**!**

The `Select` state is the state that the weapon enters when the weapon is swapped to. This state can be used for giving flags or inventory items when the user selects the weapon from another weapon, but typically it will only need to have a single line with the idle sprite of the weapon set for 0 tics. It is important to note that this state should lead into the `SelectSwap` state, as this is what actually handles the weapon swap!

```c
Select:
	BUST B 0
	goto SelectSwap
```

Once the weapon is done selecting, the `Ready` state is what is used to handle the idle loop. First, we play the weapon select sound and set the color of the player for this weapon by using the script [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) which handles both actions. Then we make use of the [`A_WeaponReady`](https://zdoom.org/wiki/A_WeaponReady) function to allow the user to go from this idle state to firing states. The actual loop of this state skips over that first line in subsequent calls, because we do not want the select sound from [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) to play repeatedly.

```c
Ready:
	BUST B 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_MEGABUSTER)
	BUST B 1 A_WeaponReady
	goto Ready+1
```

The `Fire` state is the state that is entered whenever the player presses primary fire during an [`A_WeaponReady`](https://zdoom.org/wiki/A_WeaponReady) line. In our case, we first want to check if the weapon has enough ammo for the attack by using [`A_JumpIfNoAmmo`](https://zdoom.org/wiki/A_JumpIfNoAmmo). If this jump does not occur, we can use the lines after to begin playing sounds and firing projectiles. At the end of this state, we can use [`A_Refire`](https://zdoom.org/wiki/A_ReFire) as a jump statement back to the `Fire` state if the user is still holding fire.

For the particular `Fire` state below, the [`A_FireCustomMissile`](https://zdoom.org/wiki/A_FireCustomMissile) line is the one which handles actually taking the ammo defined in the weapon’s properties. That function has a parameter which is either 1 if ammo should be taken, or 0 if not, and in our case, it is set to 1.

Although our weapon does not yet use it and we will discuss more in detail later, it is worth mentioning that an `Altfire` state exists for alternate fires. For convenience, [BaseMM8BDMWep](../decorate-actor-reference-2fdd3e69/basemm8bdmwep-8cc600ca.md) routes the `Altfire` state into the `Fire` state by default, so we do not need to worry about it yet.

```c
Fire:
	BUST B 0 A_JumpIfNoAmmo("NoAmmo")
	BUST B 0 A_PlaySoundEx("weapons/busters/megabusterfire","Weapon")
	BUST B 0 A_FireCustomMissile("MegaShot",0,1,8,0)
	BUST CD 3
	BUST B 2
	BUST B 0 A_Refire
	goto Ready+1
```

The `NoAmmo` state is what we typically name the state jumped to whenever the user attempts to fire without enough ammo to do so. This state typically calls [core_noammo](../acs-script-reference-cf6aec3f/corenoammo-4e6385da.md) which is responsible for playing the “buzzer” sound that indicates no ammo for the weapon, but more behavior can be added here if needed.

```c
NoAmmo:
	BUST B 1 ACS_NamedExecuteAlways("core_noammo",0)
	goto Ready+1
```

The last major state to know about is the `Deselect` state. As the name may suggest, this state is entered whenever the player is swapping off of the weapon. Many weapons use this state to perform clean-up tasks, an example being Noise Crush taking away its charge state. However, the standard state will look very similar to the `Select` state, just routing into `DeselectSwap` instead.

```c
Deselect:
	BUST B 0
	goto DeselectSwap
```

## Spicing it Up

---

Now that we understand the basics, let’s create a weapon that’s a bit more interesting than a nerfed Mega Buster.

The most important part of creating a weapon is going into it with some idea of what you plan to make. For our example, we’re gonna start by making a simple, gravity-affected, explosive stun launcher.

Let’s start by copying the template from before but changing some easy relevant information for our weapon.

```c
actor SparkScatterWep : BaseMM8BDMWep
{
	Weapon.AmmoUse 3
	Weapon.AmmoGive 33
	weapon.ammotype "SparkScatterAmmo"

	Weapon.SlotNumber 4

	Inventory.Pickupmessage "Power Up! Spark Scatter!"
	Obituary "%o was charred by %k's Spark Scatter."
	Tag "Spark Scatter"

	inventory.icon "NULLICON"

	States
	{
		SpawnLoop:
			WEAP X 1
			loop

		Ready:
			BUST B 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_MEGABUSTER)
			BUST B 1 A_WeaponReady
			goto Ready+1

		Select:
			BUST B 0
			goto SelectSwap
		Deselect:
			BUST B 0
			goto DeselectSwap

		Fire:
			BUST B 0 A_JumpIfNoAmmo("NoAmmo")
			BUST B 0 A_PlaySoundEx("weapons/busters/megabusterfire","Weapon")
			BUST B 0 A_FireCustomMissile("MegaShot",0,1,8,0)
			BUST CD 3
			BUST B 2
			BUST B 0 A_Refire
			goto Ready+1

		NoAmmo:
			BUST B 1 ACS_NamedExecuteAlways("core_noammo",0)
			goto Ready+1
	}
}

actor SparkScatterAmmo : Ammo
{
	inventory.amount 1
	inventory.maxamount 33
	+INVENTORY.IGNORESKILL
}
```

So far we’ve done only the easy things, creating a new custom ammo type to use, changing the weapon to a `SLOT_CLOSE` weapon, and defining some new messages to play. One thing that we can still do for organization is to put those message properties into a [`LANGUAGE`](https://zdoom.org/wiki/LANGUAGE) file in the root of our project. These files are meant to store strings and give them shorthand, definition names. They can even allow for one definition to become different strings between different languages! To do this, we would create a [`LANGUAGE`](https://zdoom.org/wiki/LANGUAGE) file in the root of our project, then have code in it that looks as follows.

```c
[enu default]

PU_SPARKSCATTER = "Power Up! Spark Scatter!";
OB_SPARKSCATTER = "%o was charred by %k's Spark Scatter.";
TAG_SPARKSCATTER = "Spark Scatter";
```

The line at the top specifies that these strings will be applied to these definition names in US English (denoted by `enu`) but also any other language that lacks their own strings for these definitions (denoted by `default`). If we had another file with `[de]` at the top, we could define strings for these same definitions and those would be used if the user was using German language settings. Having these definition names in their own file will now allow us to change our weapon properties as follows.

```c
Inventory.Pickupmessage "$PU_SPARKSCATTER"
Obituary "$OB_SPARKSCATTER"
Tag "$TAG_SPARKSCATTER"
```

Note that in DECORATE, we use “$” in front of the `LANGUAGE` definition to denote it as such. That basic organization aside, our next task is now to get some custom graphics ready for the weapon. 

## Custom Icon Graphics

---

Let’s start by creating the sprite that the weapon will use during its pickup `SpawnLoop` state. For our purposes, we can just recolor the 16px by 16px Spark Shock icon and give it a unique name of `SKSTA0`. When implementing sprites of this style, we typically use an x-offset of 8 and a y-offset of 16. We are brief on the details of custom sprites in this tutorial, so be sure to check our section on [implementing custom graphics](../starting-guides-77c9d72f/adding-custom-graphics-28261edf.md) for more details.

<!-- image omitted (assets not vendored) -->

This will handle the graphic used by the actor itself, but what about the inventory icon seen by the player when the weapon is equipped? It will use this sprite as a basis, but it needs to be resized, because 16px by 16px is too big to fit underneath the 8px by 56px ammo bar in the UI.

We’ll accomplish this by using a texture definition in a [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) file that will need to be added in the root of your project. [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) essentially uses a programming syntax to build a new graphic out of one or multiple other graphics. It starts by creating a “canvas” of a certain size, in our case we’ll start with 16px by 16px. Then, it allows you to place other graphics into that canvas by using the [`patch`](https://zdoom.org/wiki/TEXTURES#Patch) keyword. The numbers after the graphic specified represent where in that initial “canvas” we want to place the patch. So in our case, we have a 16px by 16px canvas, and we’re inserting a 16px by 16px graphic at coordinate 0, 0 of our canvas. Once we’ve done that, we can use the `XScale` and `YScale` properties to change the size to our desired 8px by 8px so it will fit snugly underneath the ammo bar. Note that [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) uses an inverse scale, so 2.0 really means 50% of the original size.

```c
graphic SPKSCATR, 16, 16
{
   Patch SKSTA0, 0, 0
   XScale 2.0
   YScale 2.0
}
```

With these two new graphics implemented now, we can adjust our inventory icon property and our `SpawnLoop` state.

```c
...
	inventory.icon "SPKSCATR"

	States
	{
		SpawnLoop:
			SKST A 1
			loop
...
```

## Custom Buster Graphics

---

The other large portion of sprites to be accounted for is the set of sprites used for the idle and firing states. This is typically also handled by using [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) to recolor a set of base sprites in Mega Man 8-Bit Deathmatch to our desired weapon color scheme. For example, this is how Ice Slasher creates its weapon HUD sprites.

```c
Sprite ICESD0, 116, 96 {Offset -184, -94  Patch BUSTB0, 0, 0 {Translation "192:192=4:4", "198:198=75:75"}}
Sprite ICESE0, 124, 96 {Offset -184, -98  Patch BUSTC0, 0, 0 {Translation "192:192=4:4", "198:198=75:75"}}
Sprite ICESF0, 128, 92 {Offset -188, -102 Patch BUSTD0, 0, 0 {Translation "192:192=4:4", "198:198=75:75"}}
```

In this case, it is recoloring frames `BUSTB0`, `BUSTC0`, and `BUSTD0` to use the palette color 4 in place of palette color 192 and to use the palette color 75 in place of palette color 198, then giving those sets of frames new names. 

In practice, this means that `ICESD0`, `ICESE0`, and `ICESF0` have white instead of cyan, and a slightly darker blue in place of the Mega Buster’s blue.

For Spark Scatter, let’s create a weapon color scheme which is similar, but yellow instead of blue, so we’ll want to use palette color 229.

By implementing that, our `TEXTURES` definitions will look as below.

<!-- image omitted (assets not vendored) -->

```c
Sprite SKSTB0, 116, 96 {Offset -184, -94  Patch BUSTB0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
Sprite SKSTC0, 124, 96 {Offset -184, -98  Patch BUSTC0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
Sprite SKSTD0, 128, 92 {Offset -188, -102 Patch BUSTD0, 0, 0 {Translation "192:192=4:4", "198:198=229:229"}}
```

You can choose to either organize your `TEXTURES` definitions into separate `TEXTURES.ICONS` and `TEXTURES.HUDS` files or into one combined `TEXTURES` file, but our case will assume they are the same `TEXTURES` file.

This will allow us to implement the rest of the state changes to use our new sprites.

## Putting the Pieces Together

---

After assembling our new graphics and giving more theming to our weapon, this is what we’ve got.

```c
actor SparkScatterWep : BaseMM8BDMWep
{
	Weapon.AmmoUse 3
	Weapon.AmmoGive 33
	weapon.ammotype "SparkScatterAmmo"

	Weapon.SlotNumber 4

	Inventory.Pickupmessage "$PU_SPARKSCATTER"
	Obituary "$OB_SPARKSCATTER"
	Tag "$TAG_SPARKSCATTER"

	inventory.icon "SPKSCATR"

	States
	{
		SpawnLoop:
			SKST A 1
			loop

		Ready:
			SKST B 0 ACS_NamedExecuteWithResult("core_weaponcolor",CLR_MEGABUSTER)
			SKST B 1 A_WeaponReady
			goto Ready+1

		Select:
			SKST B 0
			goto SelectSwap
		Deselect:
			SKST B 0
			goto DeselectSwap

		Fire:
			SKST B 0 A_JumpIfNoAmmo("NoAmmo")
			SKST B 0 A_PlaySoundEx("weapons/busters/megabusterfire","Weapon")
			SKST B 0 A_FireCustomMissile("MegaShot",0,1,8,0)
			SKST CD 3
			SKST B 2
			SKST B 0 A_Refire
			goto Ready+1

		NoAmmo:
			SKST B 1 ACS_NamedExecuteAlways("core_noammo",0)
			goto Ready+1
	}
}

actor SparkScatterAmmo : Ammo
{
	inventory.amount 1
	inventory.maxamount 33
	+INVENTORY.IGNORESKILL
}
```

As mentioned in the DECORATE tutorial, don’t forget to have a `DECORATE` file in the root of your project which is including this file with the actual weapon actors.

## The Basic Ammo Bar

---

If you’ve been following along and have this file set up, you’ll notice that this weapon still has no ammo bar, so let’s take a moment to set that up as well. For now, we can implement a simple ammo bar because our weapon is not going to use any fancy bar effects.

The easiest way to do that is to create an actor inheriting from `NormalBar`, as this will handle the ammo bar for the primary ammo type. Whenever your weapon is selected to, the game looks for an actor named `[YourWeapon]_NormalBar`, or in our case, `SparkScatterWep_NormalBar`. If this actor exists, some information is pulled from it to determine what colors to draw for the ammo bar for the duration of holding it. Let’s create that actor and place it into our file at the top.

```c
actor SparkScatterWep_NormalBar : NormalBar {}
```

If you use the actor above, you’ll notice that now we do have an ammo bar (and also ammo number), but the bar is drawn with an inner color of 192 (cyan) and an outer color of 198 (blue). These are the default colors defined in the `NormalBar` actor. We can override those by setting our own as follows.

```c
actor SparkScatterWep_NormalBar : NormalBar { args 4, 229 }
```

This will create a bar with an inner color of 4 (white), and an outer color of 229 (yellow), which matches our color scheme for Spark Scatter.

## Making Existence Known

---

Now that our ammo is visible and known, it might become more obvious that ammo pickups do not work for our newly created weapon. This is because the Mega Man 8-Bit Deathmatch systems don’t yet know our weapon exists and how to handle giving it ammo. We have to manually set up this connection via ACS. We’re going to create an ACS file and script which uses [DefineWeapon](./defineweapon-6a4db7e0.md) from `DTADD.acs` to accomplish this task.

```javascript
#library "SPKSCATR"
#include "zcommon.acs"

#include "DTADD.acs"

script "sparkscatter_info" OPEN {
	DefineWeapon("TAG_SPARKSCATTER", "SparkScatterWep", "SKSTA0", "SparkScatterAmmo", 1.00, DTADD_SLOT_CLOSE, true, true, true);
}
```

Don’t forget to compile this ACS file and use a [`LOADACS`](https://zdoom.org/wiki/LOADACS) file in the root of the project to load the compiled file.

The arguments of the [DefineWeapon](./defineweapon-6a4db7e0.md) function are as follows:

So in our case, by creating this script and loading it, the game is storing information about a `SparkScatterWep` with the name of `Spark Scatter`, it restores `SparkScatterAmmo` with a multiplier of 1.00, it is a `SLOT_CLOSE` weapon, and it is valid to be placed on the map, to appear in LMS with the icon of `“SKSTA0”`, and to appear from Eddie.

You’ll notice that our ammo gain from Weapon Energy now works, but also as a by-product, our weapon will now appear in LMS, from Eddie, and on the map when randomized weapons are enabled!

It’s worth noting that if you’re creating a pack that has multiple weapons, you don’t need to define multiple scripts for this job. You can reuse the same script, but just add more [DefineWeapon](./defineweapon-6a4db7e0.md) calls into it.

## Weapon Translation

---

While we’re working in ACS, there’s another task that we need to accomplish here. For now, our weapon has been reusing the Mega Buster’s skin colors. Ideally, we would like to be able to define and use our own.

We need to create what’s called a “translation.” A translation can be applied to an actor to map any colors on its sprite to another color. Typically a translation is referred to by its ID or a constant referring to an ID, but be careful! Translations can easily share IDs and thus overwrite each other, so be sure to check around that you are using a unique translation ID by using the debug scripts, 

[core_checktranslation](../acs-script-reference-cf6aec3f/corechecktranslation-b2f12d89.md) and [core_logtranslations](../acs-script-reference-cf6aec3f/corelogtranslations-848d101d.md).

We can create a translation through another, `OPEN CLIENTSIDE` script that we can add to our current ACS file such as the one below.

```javascript
#DEFINE CLR_SPARKSCATTER 5000

script "sparkscatter_color" OPEN CLIENTSIDE {
	CreatePlayerTranslation(CLR_SPARKSCATTER, 4, 229);
}
```

Note that this is using the [CreatePlayerTranslation](./createplayertranslation-d06d89f1.md) function from `DTADD.acs`. Assuming that we are simply inserting this script after our previous script, we should not re-include `DTADD.acs` or `zcommon.acs`, as those will cause a compiler error!

This function is essentially a wrapper for [`CreateTranslation`](https://zdoom.org/wiki/CreateTranslation), simplified to take the following parameters:

- `id`: Int - The translation ID to reference the created translation by.

- `cyan`: Int - The palette color or RGB triplet to change palette color 192 (cyan) to.

- `blue`: Int - The palette color or RGB triplet to change palette color 198 (blue) to.

Our code above essentially creates a translation with ID of 5000 which will map 192 to 4 and 198 to 229, or in other words, cyan to white and blue to yellow. We are using a constant to allow us to give a name to a number and to improve code readability.

As with the previous script, if you’re creating a pack that has multiple weapons, you don’t need to define multiple scripts for this job. You can reuse the same script, but just add more [CreatePlayerTranslation](./createplayertranslation-d06d89f1.md) calls into it.

In our initial DECORATE code, we can now update the [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) call to use this new translation.

```c
Ready:
	SKST B 0 ACS_NamedExecuteWithResult("core_weaponcolor", 5000)
	SKST B 1 A_WeaponReady
	goto Ready+1
```

We could update it in this way, or we can continue our best practice from ACS and create a constant in DECORATE as follows, which is much preferable.

```c
// Above the weapon actors
const int CLR_SPARKSCATTER = 5000;

...

Ready:
	SKST B 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_SPARKSCATTER)
	SKST B 1 A_WeaponReady
	goto Ready+1
```

## Finally Making the Weapon

---

Everything up until this point has largely been setup for creating the weapon, so laying the groundwork with assets and making sure it is hooked into the right systems. However, now we want our weapon to actually behave differently.

Fortunately, there are not any new skills past the DECORATE tutorial needed to do this step, as we will just implement a custom projectile and modify our `Fire` state as follows.

```c
Fire:
	SKST B 0 A_JumpIfNoAmmo("NoAmmo")
	SKST B 0 A_PlaySoundEx("weapons/mm7/thunderboltfire", "Weapon")
	SKST B 0 A_PlaySoundEx("weapons/mm3/sparkshockfire", "SoundSlot6")
	SKST B 0 A_FireCustomMissile("SparkScatterLob",0,1,8,0)
	SKST CD 5
	SKST B 10
	SKST B 0 A_Refire
	goto Ready+1

...

// Underneath our SparkScatterAmmo actor
actor SparkScatterLob : BasicProjectile
{
	-NOGRAVITY
	+FORCEXYBILLBOARD
	+BRIGHT

	Radius 6
	Height 6

	damage (1)
	speed 45
	gravity 1.8

	translation "225:225=229:299"
	damagetype "SparkShock"
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
	damagetype "SparkShock"
	Obituary "$OB_SPARKSCATTER"

	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_SpawnItemEX("ElectrifyEffect")
			TNT1 A 0 A_Explode(15, 80, 0, 0, 80)
			SPAS AHIJ 1
			stop
	}
}
```

For simplicity, there are several spots where we’re reusing assets from the base game in this newly added code. Our weapon overlays the Thunder Bolt and Spark Shock firing sounds, we’re using Spark Shock’s sprites for our projectile and explosion (but using a translation to recolor them in real time), and we’re borrowing the `SparkShock` damage type for our projectile and explosion. 

As talked about previously in the DECORATE tutorial, the damage type of a projectile or explosion determines which pain state an actor will enter when hit by it. In our case, players and actors will enter the `Pain.SparkShock` state if they have it defined. For players, this is defined as a state which will give them a brief stun and spawn a visual. If the respective pain state for a damage type does not exist on the actor, they will default to their normal `Pain` state. Because of this, we would not yet be able to use `SparkScatter` as our damage type and expect it to do a stun, because `Pain.SparkScatter` will not exist on the player actor.

We will talk later about how to create custom pain states and damage types in a way that will not interfere with anyone else’s mod, but for now reusing the damage type, `SparkShock`, is fine enough to get the idea across of our weapon.

As for creating custom sprites and sounds to use instead, refer to the tutorials for [implementing custom sounds](../starting-guides-77c9d72f/adding-custom-sounds-6cf0678b.md) and [implementing custom sprites](../starting-guides-77c9d72f/adding-custom-graphics-28261edf.md) and experiment around to create a unique feeling weapon!

In our `SparkScatterExplode` actor, like other electric weapons, we’re spawning an internal actor called `ElectrifyEffect`. This is an invisible explosion that deals damage using the `Electrify` damage type. By default, nothing can take damage from this damage type, but some map props can opt into taking damage from it as a means to detect whenever it’s been hit by an electric weapon. This is how oil pit ignition is handled as well. Below is a list of all the elemental explosion actors and some props that they may trigger.

- `OilPitIgnite` - Ignites oil pits and anything that may burn.

- `IcePitFreeze` - Freezes fire and lava pillars.

- `PropBlowerEffect` - Can push Pirate Mines found in Pirate Man’s stage.

- `ElectrifyEffect` - Instant bad weather when shooting Tel Tel in Cloud Man’s stage.

- `ConcreteCaseEffect` - Can encase Magma Pillars in concrete.

- `SoakifyEffect` - Unused in vanilla but designed for water extinguishable custom props.

- `ThunderClawPegHelper` - Can swing on Thunder Claw pegs.

As a final note, because we are inheriting from [BasicProjectile](../decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md) and [BasicExplosion](../decorate-actor-reference-2fdd3e69/basicexplosion-85dc080a.md), team colored projectiles are already handled for us!

## The Training Room

---

One way to test this weapon has been to give it to ourselves via cheats via the console command, `give SparkScatterWep`. However, this is not simple for the common player looking to play our mod and requires them to know the name of our weapon beforehand.

What we can do instead is add our weapon to the list of weapons accessible in the campaign’s training room. This will also allow us the opportunity to give it a description to tell people what our new weapon does, so let’s start there in our previous `LANGUAGE` file. We’ll define a new definition for the description of the weapon.

```c
DESC_SPARKSCATTER = "Spark Scatter lobs an explosive that stuns your enemies and does moderate damage.";
```

With that created, we’ll now move into ACS to let the game know that we want to add a weapon to the training room. We’re going to have to create two scripts to do this, but let’s start by creating a script which will actually define and put the weapon into the training catalogue.

That script will use the function [DefineTrainingEntry](./definetrainingentry-91396e36.md) from `DTADD.acs` and look as follows.

```javascript
script "sparkscatter_definetraining" (void) {
	DefineTrainingEntry(DTADD_TRAINING_WEP, "TAG_SPARKSCATTER", "DESC_SPARKSCATTER", "SKSTA0", "SparkScatterWep");
}
```

As with our previous weapon translation script, while this function we’re using is from `DTADD.acs`, we’re assuming that we are adding this to our running file which already has it included, so we do not want to re-include it.

The [DefineTrainingEntry](./definetrainingentry-91396e36.md) function takes the following parameters.

- `type`: Int - This refers to the type of entry to add, which corresponds to the area it appears in. The following values are accepted.
  - `DTADD_TRAINING_WEP`: Appears after the Mega Buster but before buster upgrades.

  - `DTADD_TRAINING_BUSTER`: Appears after the weapons but before the Mega Buster.

  - `DTADD_TRAINING_ITEM`: Appears separated and in the category below the weapons.

- `tag`: String - The entry tag's language definition, or its proper name (Ex. `"TAG_ROLLINGCUTTER"` or `"Rolling Cutter"`).

- `desc`: String - The entry description’s language definition, or just the full description (Ex. `"DESC_ROLLINGCUTTER"` or `"Rolling Cutter throws scissors."`).

- `icon`: String - The entry's `SpawnLoop` sprite (Ex. `"WEA2F0"`).

- `actor`: String - The entry's actor name (Ex. `"RollingCutterWep"`). This corresponds to the actor given when the user selects the entry.

So in our case, `"sparkscatter_definetraining"` defines an entry for the weapon `"Spark Scatter"` with the respective description and icon, and when the user selects it, they receive `"SparkScatterWep"`. 

If you had more weapons in your mod, you would again add more [DefineTrainingEntry](./definetrainingentry-91396e36.md) calls to this single script, as there is no need for multiple scripts for this job.

If you remember from the ACS tutorial, you may notice that there is nothing that will naturally call this script currently. It’s lacking anything like `OPEN`, `ENTER`, or `RESPAWN` in its script signature. However, this is by design, so none of those should be added.

For optimization reasons, we do not always want to define the training room catalogue. After all, it would have little purpose to be defined in online games. So instead, the training room calls a list of scripts that are designed to set up their respective weapons. The second script we’ll be making will essentially add this setup script we’ve just made to that list of scripts.

The main function for this second script will be [RegisterTrainingDef](./registertrainingdef-9ebad3a6.md) from `DTADD.acs` and the script will look as follows.

```javascript
script "sparkscatter_definesetup" OPEN {
	RegisterTrainingDef("sparkscatter_definetraining");
}
```

Again, while the function we’re using are from `DTADD.acs`, we’re assuming that we are adding this to our running file, so we do not want to re-include it.

This script uses [RegisterTrainingDef](./registertrainingdef-9ebad3a6.md) from `DTADD.acs` which just has a single parameter.

- `Script`: String - The script to add to a list of scripts to execute for the goal of creating all training room entries.

With this script in place, in the list of scripts for the training room to execute, we’ve now included our `"sparkscatter_definetraining"`, creating the entry point for it to execute which it previously lacked.

## Play Around

---

Since you’ve gotten this far, you’ve got a fully functioning basic weapon in our game! There are, of course, much fancier things that you can do with weapons, and we’re going to talk about that in the [follow-up tutorial for Advanced Weapons](./advanced-weapons-d87e2f5f.md).

Before moving on though, check out the example file below which has this entire tutorial combined into a single, playable file. Try modifying it a bit, change some properties to make it feel different to use, change its theming with a new set of colors, or even try implementing a set of custom sprites and sounds to make it look and feel unique.

Once you’ve got a good grasp of the basics, the [follow-up tutorial](./advanced-weapons-d87e2f5f.md) will walk through doing more complex things with bars, implementing custom pain states, and implementing alternate fires, so make sure to check that out as well.

## Example File

---

[v6b-SparkScatter-v1b.pk3](../assets/bec10cfcf6824edd93df4064394524fb-v6b-SparkScatter-v1b.pk3)

## See Also

---

[Advanced Weapons](./advanced-weapons-d87e2f5f.md)

[DefineWeapon](./defineweapon-6a4db7e0.md)

[CreatePlayerTranslation](./createplayertranslation-d06d89f1.md)

[DefineTrainingEntry](./definetrainingentry-91396e36.md)

[RegisterTrainingDef](./registertrainingdef-9ebad3a6.md)
