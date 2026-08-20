---
title: "Creating Assist Items"
notion_id: d57d327f59654814a4ed5d2bac0512bd
source: https://www.notion.so/d57d327f59654814a4ed5d2bac0512bd
---

# Creating Assist Items

---

> ⚠️ **Warning: Before beginning this tutorial, you should have already read through and completed the tutorials for **[**DECORATE**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** and **[**ACS**](../starting-guides-77c9d72f/hello-acs-447542af.md)**. It is also helpful to come into this knowing how to **[implement custom graphics](../starting-guides-77c9d72f/adding-custom-graphics-28261edf.md)** and **[**implement custom sounds**](../starting-guides-77c9d72f/adding-custom-sounds-6cf0678b.md)**.**

Another facet that separates MM8BDM is its diversity of non-weapon *Assist* items. Assist items can be seen in almost any stage in this game, from the deceptively simple Item-1 to the complicated Rush Jet.

This page will walk you through how to create one of the more complicated style of assist item. Inspired by Beat Call, we’ll be building `Elec'n Hover`.

Let’s start somewhere simple, first—A basic item that spawns a projectile on activation.

```c
actor NotItem1 : BaseMM8BDMUseItem
{
	inventory.amount 2
	inventory.maxamount 4

	inventory.pickupmessage "Support Item! Item 1!"
	Tag "Item-1"
	Inventory.PickupSound "item/1up"

	inventory.icon "ITEM1"

	Inventory.RespawnTics 350

	mass 40
	accuracy 16
	states
	{
	SpawnLoop:
		WEA2 A -1
		loop
	Use:
		WEA2 D 0 A_SpawnItemEx("Item1Platform", 56, 0, 28, 1)
		stop
	}
}

actor NotItem1_Respawn : 8BDMItemRespawn
{
	translation "192:192=4:4", "198:198=42:42"
	mass 350
}
actor NotItem1_RespawnShadow : 8BDMItemRespawnShadow
{
	mass 350
	States
	{
	Spawn:
		WEA2 A 0
		goto Super::Spawn
	}
}
```

The code above defines an assist that will be our template. The actor is called `NotItem1`, a simplified copy of Item-1.

Every assist item starts by inheriting from [BaseMM8BDMUseItem](../decorate-actor-reference-2fdd3e69/basemm8bdmuseitem-31fa996d.md), an actor that already exists in Mega Man 8-Bit Deathmatch that sets up more of the semi-universal functionality for such pickups as a whole. Things like visible respawn timers and the event hooks will happen on this actor if you leave it as-is.

It’ll also look like Item-1 if you spawn it in and pick it up. Don’t worry—we’ll get to that later.

## Basic Item Properties

---

Assist items have some properties that should be defined in order to handle the functionality you may want from them.

Sometimes you can carry more than one of a given item, so you’ll want to define how much of one item you have access to by modifying the amount properties. The amount you get on pickup, and the max amount you can carry. Note that these do not have to be the same, but they usually usually are. In our case, let’s make it so they aren’t the same. Just for fun.

```c
inventory.amount 2
inventory.maxamount 4
```

This will make it so we can carry 4 `NotItem1`s, but only get two per pickup. This is fine, just means you can stock up.

Next, you’ll want to see some of the “user info” properties. We’ll start with the messages.

We then define a set of properties corresponding to which messages to play at certain item events.

- The pickup message is the message that will be seen in chat whenever picking up the item. 

- The tag is the message that the player will see on their screen whenever swapping to the item.

```c
	inventory.pickupmessage "Support Item! Item 1!"
	Tag "Item-1"
```

Another “user info” type property would be the pickup sound! This is the sound that plays when the item is picked up. This can be any sound, but most items just use the sound played when you pick up a 1-Up or E-Tank in the classic series.

```c
Inventory.PickupSound "item/1up"
```

The next property showcased here is the icon to be drawn in the spot underneath where the health bar goes. We’ll set this to the icon for Item-1, `"ITEM1"`, for now. We’ll be changing it later.

```c
inventory.icon "ITEM1"
```

Finally, we’ve got the respawn timer. This is the amount of time it takes for an item to reappear after being picked up, in tics. The default respawn time is 30 seconds, and since 1 tic is 1/35th of a second, that means the default 1050 tics.

We’ll set it to 10 seconds here, for demonstration purposes.

```c
	Inventory.RespawnTics 350
```

  
Now that we know how to define how long it takes for pickups to respawn, we should also discuss how respawn timers work.

In the basic pickup, there are these two properties, `mass` and `accuracy`. These are “custom properties” we use to handle respawn timers.

On actors inheriting from `BaseMM8BDMUseItem`, these properties do the following:

- `mass` is how tall the respawn timer sprites are, in pixels.

- `accuracy` is how tall the item’s icon is, in pixels.

```c
	mass 40
	accuracy 16
```

If neither of these numbers are 0, and the pickup can respawn, the assist item will attempt to spawn the required timer visuals. The names of these visuals is handled automatically by appending the word `_Respawn` and `_RespawnShadow` to the pickup’s name. Let’s briefly go over these two actors from the bottom of our template:

```c
actor NotItem1_Respawn : 8BDMItemRespawn
{
	translation "192:192=4:4", "198:198=42:42"
	mass 350
}
actor NotItem1_RespawnShadow : 8BDMItemRespawnShadow
{
	mass 350
	States
	{
	Spawn:
		WEA2 A 0
		goto Super::Spawn
	}
}
```

Both of these actors are discussed on the `BaseMM8BDMUseItem` documentation in [this section](../decorate-actor-reference-2fdd3e69/basemm8bdmitem-c44bd5a5.md), but I’ll go over them here for simplicity.

Respawn timers, if inheriting from the correct actors, handle a lot of stuff automatically, but need to be told *how long* to do it for. Therefore, on these actors, `mass` represents how long their parent pickup will take to respawn and should correlate with the [`inventory.respawntics`](./creating-assist-items-d57d327f.md) discussed above. To that end, `mass` on both respawn actors is defined as `350`.

Also of note is the `translation` property, which changes the color of the respawn timer. We’ll go further into this in a later section.

## Basic Item States

---

As you may recall from the DECORATE tutorial that actors enter the `Spawn` state whenever they first begin to exist. Just like weapons, assists are [BaseMM8BDMUseItem](../decorate-actor-reference-2fdd3e69/basemm8bdmuseitem-31fa996d.md) actors that actually implement a special `Spawn` state to handle some behavior for other game systems. Since we don’t want to interrupt or override those systems, we’ll want to define a `SpawnLoop` state instead. [BaseMM8BDMUseItem](../decorate-actor-reference-2fdd3e69/basemm8bdmuseitem-31fa996d.md) will automatically guide our assist item into `SpawnLoop`. 

`SpawnLoop` is thus the state the item is in while it’s on the ground.

```c
	SpawnLoop:
		WEA2 A -1
		loop
```

The `Use` state is fired when the inventory item is activated. Unlike weapons, these items don’t have any animations that are drawn in the user’s vision. 

```c
	Use:
		WEA2 D 0 A_SpawnItemEx("Item1Platform", 56, 0, 28, 1)
		stop
```

Ending a `Use` state with `stop` will cause the item to leave your inventory.

If you end a `Use` state with `fail` instead of `stop`, the item will not leave your inventory. We will be using this in the actual example later.

You should not end a `Use` state with `loop`.

### Other states

Actors inheriting from [`CustomInventory`](https://zdoom.org/wiki/Classes:CustomInventory), including [BaseMM8BDMUseItem](../decorate-actor-reference-2fdd3e69/basemm8bdmuseitem-31fa996d.md), also have access to a `Pickup` state, which is activated instantly on pickup. This can be useful if you want static powerups that must be activated instantly, or other instantly used pickups. See [BaseMM8BDMItem](../decorate-actor-reference-2fdd3e69/basemm8bdmitem-c44bd5a5.md). However, this `Pickup` state can’t have any behavior within it if you want a `Use` state, as there is no way to get an item to a usable state if behavior is defined in `Pickup`.

If you end a `Pickup` state with `stop`, the pickup will be taken from the ground and immediately leave your inventory after the state’s behavior has completed.

If you end a `Pickup` state with `fail`, the pickup will be left on the ground and immediately leave your inventory after the state’s behavior has completed.

You should not end a `Pickup` state with `loop`.

## Spicing it Up

---

Alright, so now that we have the ingredients, let’s build ourselves `Elec'n Hover`. This assist item will do a few things:

- On activation, will allow you to temporarily hover in the air.

- On press of jump, cancel the effect early.

- When the effect ends, spray out a wide attack below.

Let’s start first by changing the simplified Item-1 pickup a bit:

```c
actor ElecnHover : BaseMM8BDMUseItem
{
	inventory.amount 2
	inventory.maxamount 4

	inventory.pickupmessage "Support Item! Elec'n Hover!"
	Tag "Elec'n Hover"
	Inventory.PickupSound "item/1up"

	inventory.icon "ITEM1"

	Inventory.RespawnTics 350

	mass 40
	accuracy 16
	states
	{
	SpawnLoop:
		WEA2 A -1
		loop
	Use:
		WEA2 D 0 A_SpawnItemEx("Item1Platform", 56, 0, 28, 1)
		stop
	}
}

actor ElecnHover_Respawn : 8BDMItemRespawn
{
	translation "192:192=4:4", "198:198=42:42"
	mass 350
}
actor ElecnHover_RespawnShadow : 8BDMItemRespawnShadow
{
	mass 350
	States
	{
	Spawn:
		WEA2 A 0
		goto Super::Spawn
	}
}
```

At this point, we’ve covered some simple stuff about making an item. One thing that we can still do for organization is to put those message properties into a [`LANGUAGE`](https://zdoom.org/wiki/LANGUAGE) file in the root of our project. These files are meant to store strings and give them shorthand, definition names. They can even allow for one definition to become different strings between different languages! To do this, we would create a [`LANGUAGE`](https://zdoom.org/wiki/LANGUAGE) file in the root of our project, then have code in it that looks as follows.

```c
[enu default]

PU_ELECNHOVER = "Support Item! Elec'n Hover!";
TAG_ELECNHOVER = "Elec'n Hover";
```

The line at the top specifies that these strings will be applied to these definition names in US English (denoted by `enu`) but also any other language that lacks their own strings for these definitions (denoted by `default`). If we had another file with `[de]` at the top, we could define strings for these same definitions and those would be used if the user was using German language settings. Having these definition names in their own file will now allow us to change our weapon properties as follows.

```c
Inventory.Pickupmessage "$PU_ELECNHOVER"
Tag "$TAG_ELECNHOVER"
```

Note that in DECORATE, we use “$” in front of the `LANGUAGE` definition to denote it as such. That basic organization aside, our next task is now to get some custom graphics ready for the weapon. 

## Custom Icon and Graphics

---

Here’s a sheet of all sprites planned to use for this item!

<!-- image omitted (assets not vendored) -->

Let’s start by creating the sprite that the item will use during its pickup `SpawnLoop` state. The pickup icon is on the top-left of the sheet above I have it upscaled on the right for better viewing. Give it the name  `ENHVA0`. When implementing sprites of this style, we typically use an x-offset of 8 and a y-offset of 16. We are brief on the details of custom sprites in this tutorial, so be sure to check our section on [implementing custom graphics](../starting-guides-77c9d72f/adding-custom-graphics-28261edf.md) for more details.

<!-- image omitted (assets not vendored) -->

This will handle the graphic used by the actor itself, but what about the inventory icon seen by the player when the item is equipped? It will use this sprite as a basis, but it needs to be resized, because 16px by 16px is too big to fit underneath the 8px by 56px health bar in the UI.

We’ll accomplish this by using a texture definition in a [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) file that will need to be added in the root of your project. [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) essentially uses a programming syntax to build a new graphic out of one or multiple other graphics. It starts by creating a “canvas” of a certain size, in our case we’ll start with 16px by 16px. Then, it allows you to place other graphics into that canvas by using the [`patch`](https://zdoom.org/wiki/TEXTURES#Patch) keyword. The numbers after the graphic specified represent where in that initial “canvas” we want to place the patch. So in our case, we have a 16px by 16px canvas, and we’re inserting a 16px by 16px graphic at coordinate 0, 0 of our canvas. Once we’ve done that, we can use the `XScale` and `YScale` properties to change the size to our desired 8px by 8px so it will fit snugly underneath the ammo bar. Note that [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) uses an inverse scale, so 2.0 really means 50% of the original size.

```c
graphic ELNHOV, 16, 16
{
   Patch ENHVA0, 0, 0
   XScale 2.0
   YScale 2.0
}
```

With these two new graphics implemented now, we can adjust our inventory icon property and our `SpawnLoop` state.

```c
...
	inventory.icon "ELNHOV"

	States
	{
		SpawnLoop:
			ENHV A 1
			loop
...
```

With that done, let’s go ahead and split up the rest of the sprites. Please review the [guide for implementing custom graphics](../starting-guides-77c9d72f/adding-custom-graphics-28261edf.md), and set up the remaining sprites as directed below:

- Assist sprites: `ENHVB` to `ENHVE` - Rotated, aligned as `Projectile`.

- Projectile sprites: `ENHVF0` and `ENHVG0` - Non-rotated, aligned as `Projectile`.

We’ll need the other sprites for this a bit later.

<!-- image omitted (assets not vendored) -->

## Actually Making the Assist

---

Let’s return to the requirements we outlined earlier.

- On activation, will allow you to temporarily hover in the air.

- On press of jump, cancel the effect early.

- When the effect ends, spray out a wide attack below.

Let’s start with that first step.

As stated in a prior section, `On activation` simply means, “in the Use” state. I’m gonna jump ahead a few steps and then fill you in on the details after.

```c
Use:
		ENHV D 0 A_PlaySoundEx("item/refill","Voice")
		ENHV D 0 A_GiveInventory("ElecnHoverTime", 350)
		ENHV D 0 A_SpawnItemEx("ElecnHoverWatcher")
		ENHV D 0 A_SpawnItemEx("ElecnHoverWarper", 0, 0, 96)
		stop
```

This state block will be called when the selects this item and activates it.

Let’s break this down.

1. Play the generic item activation sound.

2. Give the user 350 of an item called `ElecnHoverTime`. This is an inventory item that we need to define:
   ```c
   actor ElecnHoverTime : Inventory
   {
   	inventory.maxamount 350
   	inventory.amount 350
   }
   ```

   This will be used to manage the “timing” of the assist. We will time this in tics, and it will last 10 seconds. Recall that 1 tic is 1/35th of a second. 350 tics is 10 seconds.

   Each unit of `ElecnHoverTime` will represent 1 tic of the assist’s active time.

3. Spawn the `ElecnHoverWatcher`, which will actually manage the assist’s time. More on this below…

4. Spawn the `ElecnHoverWarper` 96 units above the user. This become the visual for the assist.

That’s all we’ll need on the actor `ElecnHover`. Let’s get started on the `ElecnHoverWatcher`.

```c
actor ElecnHoverWatcher : BasicWatcher
{
	States
	{
	Spawn:
		TNT1 A 0
		TNT1 A 1 A_GiveToTarget("ElecnHoverFlyFunc", 1)
		TNT1 A 0 A_TakeFromTarget("ElecnHoverTime", 1)
		TNT1 A 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, "Spawn")
		stop
	}
}
```

This actor is a `BasicWatcher`, which is a sort of helper actor that can handle processes in parallel with player and weapon behavior.

Let’s go over the spawn states one line at a time:

1. The first line is blank, per DECORATE functionality.

2. The second line gives the user (the owner of a Watcher is the “target”) one `ElecnHoverFlyFunc`, then wait 1 tic. We’ll define `ElecnHoverFlyFunc` later. For now, just create an empty `CustomInventory` actor for it:
   ```c
   actor ElecnHoverFlyFunc : CustomInventory {}
   ```

3. Take away one `ElecnHoverTime` from the user.

4. Check if the user still has `ElecnHoverTime`, and if so, return to line 1. Otherwise…

By giving the delaying 1 tic, and taking away 1 `ElecnHoverTime`, and then checking the amount left, `ElecnHoverWatcher` functions as a “sensor” of sorts that handles all the timing mechanisms for this Assist. It also manages the effect of the Assist itself by giving the player `ElecnHoverFlyFunc` while the user still has `ElecnHoverTime`.

Next, we’ll handle the main effect, `ElecnHoverFlyFunc`.

```c
actor ElecnHoverFlyFunc : CustomInventory
{
	States
	{
	Pickup:
		TNT1 A 0 A_ChangeVelocity(momx*1.025, momy*1.025, 0, CVF_REPLACE)
		stop
	}
}
```

Recall in a previous section, we mentioned how a `CustomInventory` can have defined behavior that occurs the instant it enters another actor’s inventory. This is what `ElecnHoverFlyFunc` does. Every tic, when given by `ElecnHoverWatcher`, this actor will enter the inventory of the user of this assist. It will then reset their vertical velocity, preventing them from falling, and apply a minor slippery effect to their horizontal momentum.

By now, you should have a simple assist actor that causes you to hover at a static height for 10 seconds, but doesn’t have anything visually indicating to other people that this is the case. This is where `ElecnHoverWarper` comes in.

```c
actor ElecnHoverWarper : BasicGraphicEffect
{
	States
	{
	SpawnFrame:
		ENHV B 0
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) stop
		ENHV B 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) stop
		ENHV C 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) stop
		ENHV B 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) stop
		ENHV D 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		loop
	}
}
```

Here, we have a [BasicGraphicEffect](../decorate-actor-reference-2fdd3e69/basicgraphiceffect-95b89f4a.md) that attaches itself to the user, 64 units above. If the user doesn’t have any `ElecnHoverTime`, it will disappear.

We inherit from `BasicGraphicEffect` to give this actor some simple visual flags, such as relegating the clients to managing this actor, and granting team color effects to it—make sure you use `SpawnFrame` here instead of `Spawn` to grant those team colors!

[`A_JumpIfInTargetInventory`](https://zdoom.org/wiki/A_JumpIfInTargetInventory) works here the same way it does in `ElecnHoverWatcher`, but because we’re trying to do a complete animation, we have to do a negative check… which `A_JumpIfInTargetInventory` cannot do. We have to bodge it.

Those `stop` calls be called immediately after the `A_JumpIfInTargetInventory` calls when the jump fails, immediately destroying the actor. So, until the user of this item runs out of `ElecnHoverTime`, this `ElecnHoverWarper` will continue to exist.

Now, we have those [`A_Warp`](https://zdoom.org/wiki/A_Warp) calls. More details on the ZDoom wiki (linked), but this particular call to it just sticks the prop 64 units directly above its user. Every time `A_Warp` is called, this actor is repositioned. This must be called every tic to maintain the illusion of this actor “sticking to” the user.

Finally, this actor animates as `ENHV BCBD 1` to maintain a flashing, sparking effect between the plugs. This has to be separated out on separate lines due to DECORATE’s limitation of only calling one function per line, but it works.

This concludes the simple assist item, we will begin adding more advanced features, such as user input and projectiles in the next section.

## User Input and Projectiles

---

Let’s go ahead and address point 2 of our item requirements:

- On press of jump, cancel the effect early.

Since we have an item that calls our function every tic of this actor being active, we already have the needed framework to check player input.

Let’s add some extra lines to `ElecnHoverFlyFunc` that checks if the player is pressing jump, and if they are, end the effect early.

```c
actor ElecnHoverFlyFunc : CustomInventory
{
	States
	{
	Pickup:
		TNT1 A 0 A_JumpIf(CallACS("core_checkforjump")==1, "End")
		TNT1 A 0 A_ChangeVelocity(momx*1.025, momy*1.025, 0, CVF_REPLACE)
		stop
	End:
		TNT1 A 0 A_TakeInventory("ElecnHoverTime", 350)
		stop
	}
}
```

We add 1 line to the `Pickup` state to check if the player is pressing jump, via the `"core_checkforjump"` script. If the check succeeds, execute the `End` state instead, which takes away all of your `ElecnHoverTime`, which we previously built the `ElecnHoverWatcher` and `ElecnHoverWarper` to check for.

That was easy, relative to the last section, so let’s introduce something new. Projectiles.

Let’s move into the final requirement:

- When the effect ends, spray out a wide attack below.

```c
actor ElecnHoverShot : BasicProjectile
{
	-NOGRAVITY
	gravity 1.2
	Damage (15)
	Obituary "%o was galvanized by %k's Elec'n Hover."
	Speed 20
	Height 5
	Radius 5
	States
	{
	Spawn:
		ENHV FG 3
		loop
	}
}
```

We are inheriting from [BasicProjectile](../decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md), to automatically handle team-colored projectiles.

`BasicProjectile` comes with a number of preset properties that we are overriding here. Notice how I’ve put `-NOGRAVITY` on this projectile. That will make it so it lobs, traveling in a downwards arc as it travels. `gravity 1.2` slightly increases how quickly the arc travels downwards.

`Damage` determines how much damage this projectile deals, we’re going with 15 here. This projectile will deal 15 damage to the person it hits.

Next, as discussed in the [DECORATE tutorial](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md), we’ll just be giving this actor a basic animation. Since we set the projectile sprites to `ENHVF0` and `ENHVG0`, we’ll go ahead and call those frames in the Spawn state. Since we want a basic looping animation, we can just end the state with a `loop`.

The final real item of note here, we have `Obituary`, which is the message that displays when a person is fragged by this projectile. `Obituary` has a number of “replacement” keywords, `%o` is the name of the person who was fragged by the projectile, `%k` is the name of the person who owned the projectile. Most obituaries in MM8BDM are formatted in a “Player A fragged Player B with Weapon C”, but following this format is not required.

As with the previously-discussed `Inventory.pickupmessage` and `Tag` properties, the `Obituary` can be defined in `LANGUAGE`, so let’s go ahead and do that.

```c
OB_ELECNHOVER = "%o was galvanized by %k's Elec'n Hover.";
```

And then, just like with the previous language strings, dropping it into the DECORATE property requires putting in a `$` to tell the game to look up the string in the language table…

```c
actor ElecnHoverShot : BasicProjectile
{
	-NOGRAVITY
	gravity 1.2
	Damage (15)
	Speed 30
	Obituary "$OB_ELECNHOVER"
	Height 5
	Radius 5
	States
	{
	Spawn:
		ENHV FG 3
		loop
	}
}
```

Now, we need to make Elec’n Hover *fire* this shot. Let’s go ahead and define a new `CustomInventory` called `ElecnHoverEndFunc` and have `ElecnHoverWatcher` give it to the user at the end of its timer.

```c
actor ElecnHoverWatcher : BasicWatcher
{
	States
	{
	Spawn:
		TNT1 A 0
		TNT1 A 1 A_GiveToTarget("ElecnHoverFlyFunc", 1)
		TNT1 A 0 A_TakeFromTarget("ElecnHoverTime", 1)
		TNT1 A 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, "Spawn")
		TNT1 A 0 A_GiveToTarget("ElecnHoverEndFunc", 1) // the new addition
		stop
	}
}

// Defined somewhere below ElecnHoverWatcher
actor ElecnHoverEndFunc : CustomInventory
{
	States
	{
	Pickup:
		TNT1 A 0 A_PlaySoundEx("assists/elecnhoverend", "Voice")
		TNT1 A 0 A_SpawnItemEx("ElecnHoverShot", 16, 0, 96, 0.8, 0, -0.2, 0, SXF_MULTIPLYSPEED)
		TNT1 A 0 A_SpawnItemEx("ElecnHoverShot", 16, 0, 96, 0.8, 0, -0.2, 45, SXF_MULTIPLYSPEED)
		TNT1 A 0 A_SpawnItemEx("ElecnHoverShot", 16, 0, 96, 0.8, 0, -0.2, 90, SXF_MULTIPLYSPEED)
		TNT1 A 0 A_SpawnItemEx("ElecnHoverShot", 16, 0, 96, 0.8, 0, -0.2, 135, SXF_MULTIPLYSPEED)
		TNT1 A 0 A_SpawnItemEx("ElecnHoverShot", 16, 0, 96, 0.8, 0, -0.2, 180, SXF_MULTIPLYSPEED)
		TNT1 A 0 A_SpawnItemEx("ElecnHoverShot", 16, 0, 96, 0.8, 0, -0.2, 225, SXF_MULTIPLYSPEED)
		TNT1 A 0 A_SpawnItemEx("ElecnHoverShot", 16, 0, 96, 0.8, 0, -0.2, 270, SXF_MULTIPLYSPEED)
		TNT1 A 0 A_SpawnItemEx("ElecnHoverShot", 16, 0, 96, 0.8, 0, -0.2, 315, SXF_MULTIPLYSPEED)
		stop
	}
}
```

There’s quite a bit to this, so let’s break it down line by line.

1. Play a sound to denote the floating effect has ended, and projectiles were fired.
   This sound is actually using a new definition, but it uses an existing asset. Create new text file in the root folder called `SNDINFO` and insert the following into it.

   ```c
   assists/elecnhoverend SPRKSPRD
   ```

   `SPRKSPRD.lmp` is a sound used for one of the bosses in MM8BDM, but it also happens to be the sound the Elec’n makes when it attacks in Mega Man 3. If you wish to use an entirely custom sound, place a sound file into a new folder called `sounds`, name it something 8 characters or fewer long, and in SNDINFO, replace `SPRKSPRD` with that name. For more information on sounds, [check this ZDoom wiki article on it](https://zdoom.org/wiki/SNDINFO).

2. Fire 8 `ElecnHoverShots` out in a wide spread surrounding the user. These will all spawn from the center of the warper above, and slightly out from the center. (16 units forward, 96 units up, relative to the angle). 0.8 is the forward speed, and -0.2 is the vertical speed. These values are actually multiplied by the projectile’s main speed value of 20, due to our use of `SXF_MULTIPLYSPEED`. See [`A_SpawnItemEx`](https://zdoom.org/wiki/A_SpawnItemEx) on the remaining arguments.

With all that out of the way, we’re only missing one thing on the DECORATE side: the warper’s “attack” frame, and it disappearing gracefully.

Fortunately for us, that’s actually really easy. Recall this actor from earlier:

```c
actor ElecnHoverWarper : BasicGraphicEffect
{
	States
	{
	SpawnFrame:
		ENHV B 0
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) stop
		ENHV B 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) stop
		ENHV C 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) stop
		ENHV B 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) stop
		ENHV D 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		loop
	}
}
```

Those `stop`s placed after the jumps are called whenever you run out of `ElecnHoverTime`. But… you can change this. It doesn’t *have* to just disappear when you run out of time… we have an attack frame for this dude, let’s give it a little animation!

```c
actor ElecnHoverWarper : BasicGraphicEffect
{
	States
	{
	SpawnFrame:
		ENHV B 0
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) goto End
		ENHV B 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) goto End
		ENHV C 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) goto End
		ENHV B 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		ENHV B 0 A_JumpIfInTargetInventory("ElecnHoverTime", 1, 1) goto End
		ENHV D 1 A_Warp(AAPTR_TARGET, 0, 0, 96, 0, WARPF_COPYINTERPOLATION|WARPF_NOCHECKPOSITION)
		loop
	End:
		ENHV E 5
		ENHV B 10
		ENHV B 0 A_SpawnItemEx("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_WEPFXCOLOR)
		stop
	}
}
```

Here, I created a new state called `End`, which contains a simple “attack” animation for the assist duder, then added a simple explosion effect to mark its departure. The explosion puff transfers the team color using the flag `SXF_WEPFXCOLOR`.

And that’s it! This Assist now does all that’s needed. The rest of this tutorial will show how to make it appear on maps, how to give it an assist bar, and how to make the item appear in Training.

## Making Existence Known

---

Next, we’ll be moving into the ACS portion of the tutorial.

Create a new directory for ACS source code, then create a new directory within that one called “includes.” For this section, we’ll need to copy `DTADD.acs` from the latest MM8BDM pk3. You’ll find it under `acs_source/_includes/mod api`. Copy it directly into the “includes” directory of your mod’s pk3.

Next, create a new ACS source file. It can be called anything you wish, but I’ll be calling mine `ELCHOV.acs`.

I’m gonna put a code block underneath with all that will be needed. It’s not too much! Bear with me.

```javascript
#library "ELCHOV" // the library can also be named whatever, but typically it's the same as the file.
// Also, newer ACS requirements mean the library line must be first.

#include "zcommon.acs" // This must be included before any MM8BDM include files.
#include "DTADD.acs" // This contains the needed methods for adding to DTs.

script "elchov_servdefs" OPEN
{
	DefineAssistItem("TAG_ELECNHOVER", "ElecnHover", "ENHVA0", 2, DTADD_GRP_DASH, true);
}
```

Okay! This script above contains a basic addition to the assist table for Elec’n Hover. This script is fired on map and round start, ensuring this item is always in the table.

As discussed on the [DefineAssistItem](./defineassistitem-4654f632.md) page, the arguments for this function are as follows:

Since Elec’n Hover doesn’t exactly grant flight, it doesn’t belong in that category. It’s something between a “dash” and a “weapon”… but given its “weapon” side seems a bit marginal, let’s go ahead and put it in “dash”.

Everything else on this function call should be fairly self-evident—We mentioned the language tag of the item a previous section, we know the name of our pickup, as well as the sprite that represents it on the ground. We also know how many of this item we should receive on pickup (2), and… it *is* designed to be picked up as an assist on a map. So here it is!

Make sure you add your ACS file to a LOADACS!

You should now be able to boot up the game with your mod and, when enabling randomized pickups, should be able to see Elec’n Hover appear instead of Item-2 on occasion.

Cool!

Next, let’s make sure our assist item can be seen in the training room.

The functions required for this are a little more complicated, but are fortunately still included in `DTADD.acs`. 

Let’s add a new line to our “server defs” script:

```javascript
script "elchov_servdefs" OPEN
{
	DefineAssistItem("TAG_ELECNHOVER", "ElecnHover", "ENHVA0", 2, DTADD_GRP_DASH, true);
	RegisterTrainingDef("elchov_traininginfo"); // New line here
}
```

[RegisterTrainingDef](./registertrainingdef-9ebad3a6.md) creates a script to be executed when the training room requests it. This is to prevent too much data from being sent to or from the server every time `OPEN` scripts are called. Training mode information is usually handled on an as-needed basis.

This also means that training mode information definition is actually a two-step process. We now need to create a `(void)` script to handle the info addition. Name it the same as the script name you put into the `RegisterTrainingDef` call above.

```javascript
script "elchov_traininginfo" (void)
{
	DefineTrainingItem(DTADD_TRAINING_ITEM, "TAG_ELECNHOVER", "DESC_ELECNHOVER", "ENHVA0", "ElecnHover", 2);
}
```

[DefineTrainingItem](./definetrainingitem-753a6d6b.md) registers the item with the training room. Here are this function’s parameters:

Once again, this is *generally *self-explanatory. This is simple data entry for the most part. But I do want to take extra note of the `DESC_ELECNHOVER` we have here—since this is another `LANGUAGE` tag we need to define:

```c
DESC_ELECNHOVER = "Summons an Elec'n to carry you at a fixed height for a short while. When it's done, it shoots a wide spray of shots before disappearing. Can be dismissed early by pressing jump.";
```

And that’s it! Our assist will now show up in training mode!

<!-- image omitted (assets not vendored) -->

## Assist Display

---

The final thing we need to create for the assist display. You can see when using items like Rush Jet and Rush Marine that a little icon and bar appear when their abilities are active. This is what’s known as “Assist Display.”

Hang on tight for this one, since it’s gonna look pretty intimidating. But it’s a lot simpler than it looks.

First, you’ll need to copy `ASSTLIB.acs` from MM8BDM pk3’s `acs_source/_includes/mod api` folder into our `acs_source/includes` folder. Then, `#include` it in our ACS file.

```javascript

// Typically, you'll want to do all your #includes in the same place, but it can typically be done anywhere.
#include "ASSTLIB.acs"

// This script needs to be OPEN CLIENTSIDE
script "elchov_clientdefs" OPEN CLIENTSIDE
{
	DefineAssistDisplay("elehov_assists");
}
```

Just like `RegisterTrainingDef` in the previous section, [DefineAssistDisplay](./defineassistdisplay-34353c79.md) actually registers a script name to be called. This time, we’re adding a script to a list of scripts that are all called on the clientside every tick. This script needs to be `OPEN CLIENTSIDE` so the clients know what scripts to call.

Next is the really scary looking script, `"elehov_assists"` itself. This script should also be `CLIENTSIDE`, as it only manipulates HUD elements. Even if it’s not, it will only be called on clientside anyway. The server will never see any of this code.

```javascript
script "elehov_assists" (int cam) CLIENTSIDE
{
	if(AssistDisplayBar_On()) {
		SetHudSize(320,200,0);
		int pos;
		str img;
		int x;
		int y;
		int timeSec;

		if(CheckActorInventory(cam,"ElecnHoverTime")>0) {
			pos = Get_And_Inc_AssistBarCount();
			x = Get_AssistDisplayBar_X(pos);
			y = Get_AssistDisplayBar_Y(pos);
			img = "ENHVC8C2";
			int hovTime = CheckActorInventory(cam,"ElecnHoverTime")/35+1;
			if(hovTime <= 1 && Timer() % 8 <= 3) img = "TNT1A0";
			BasicImageDisplay(img,Get_And_Inc_AssistDisplayID(),x,y);
			DrawBasicBarAndNumber(
			    "ASTBARPR","ASSTBARE",
			    "ASTVARPR","ASSTVARE",
				x,y,
				Get_And_Inc_AssistDisplayID(),Get_And_Inc_AssistDisplayID(),Get_And_Inc_AssistDisplayID(),
				hovTime*8/10,
				CheckActorInventory(cam,"AssistNumberFlag")>0,
				hovTime
			);
		}
	}
}
```

This is a lot. Let’s take this apart and discuss it.

- [AssistDisplayBar_On](./assistdisplaybaron-6f51f58c.md) returns true if the user wishes to display Assist Displays in general.

- [`SetHudSize`](https://zdoom.org/wiki/SetHudSize) changes the resolution of the screen on which [`HudMessage`](https://zdoom.org/wiki/HudMessage) can be drawn. We typically just set this to 320x200 to keep the UI scale consistent.

- The next prominent line is the `CheckActorInventory` call. This just checks to see if the person you’re looking at has Elec’n Hover active, as the only time you’ll ever have any `ElecnHoverTime` is if you are using Elec’n Hover.

- Next, are these three lines:
  ```javascript
  pos = Get_And_Inc_AssistBarCount();
  x = Get_AssistDisplayBar_X(pos);
  y = Get_AssistDisplayBar_Y(pos);
  ```

  These three function calls are ubiquitous in Assist Display scripts. They’re used to position the icon and bar by checking the background Assist Display stack on that given frame, and then incrementing the stack.

- The icon is specified by `img = "ENHVC8C2";`. I’m just using forward-diagonal sprite of the Elec’n here for simplicity.

- `int hovTime = CheckActorInventory(cam,"ElecnHoverTime")/35+1;` specifies how long the amount of time is left on the Elec’n Hover, in seconds. This is calculated by dividing the amount of `ElecnHoverTime` you have left, divided by 35 (number of tics per second), +1.

- If remaining time is less than 1 second, begin flashing the icon by toggling the icon to invisible every 4 tics.

- [BasicImageDisplay](./basicimagedisplay-5b8898f3.md) displays a given image at a given position. This code is also ubiquitous for all Assist Display scripts.

- Finally, we have [DrawBasicBarAndNumber](./drawbasicbarandnumber-071d9763.md), which handles the bar itself.
  - The given strings, `"ASTBARPR"`,`"ASSTBARE"`,`"ASTVARPR"`, and `"ASSTVARE"` are Rush Jet’s assist bar graphics. Leave these alone for now—we’ll swap these out later!

  - `x` and `y` were defined earlier, this is just the position of the bar.

  - three calls to [Get_And_Inc_AssistDisplayID](./getandincassistdisplayid-00a4e858.md), increments the assist display ID stack for creating unique IDs for `HudMessage`. This is also universal to all Assist Display scripts and should be left alone.

  - Next parameter here is the amount of the bar the Assist Display needs to show. Every Assist Display bar has 8 pips, so if your max value does not match 8 pips, it needs to be normalized by multiplying by 8 and dividing by your max. In our case, we’re normalizing to 10 seconds—so we’ll multiply by `8/10`.

  - Next is whether to draw the number. Since this is just tied to a cvar in this case, leave this alone since this `CheckActorInventory` already handles the cvar check for us.

  - Finally, the last field is the value to draw in the number. Just plug in `hovTime`.

I mentioned earlier that this script currently draws Rush Jet’s meter. Let’s go ahead and make some new ones… and explain how colors work.

In the `TEXTURES` file, go ahead and copy the following two lines into it.

```javascript
texture ASTBAREH, 5, 2{patch ASSTBARP, 0, 0 {Translation "192:192=4:4", "198:198=42:42"}}
texture ASTVAREH, 2, 5{patch ASSTVARP, 0, 0 {Translation "192:192=4:4", "198:198=42:42"}}
```

Notice the `Translation` field above in these two lines, and check out the table of colors to the right. A `Translation` is a color swap that is tied to the palette. The engine will find the closest colors it can to the colors on a given graphic, and then remap the colors given to other colors.

In our case, `192` maps to Mega Man’s Cyan color, and `198` maps to Mega Man’s Blue color.

Let’s match `192` to the blue on the Elec’n plugs… which is `198`. And let’s map `198` to the yellow on its body, `216`.

<!-- image omitted (assets not vendored) -->

```javascript
texture ASTBAREH, 5, 2{patch ASSTBARP, 0, 0 {Translation "192:192=198:198", "198:198=216:216"}}
texture ASTVAREH, 2, 5{patch ASSTVARP, 0, 0 {Translation "192:192=198:198", "198:198=216:216"}}
```

And then, just plug those textures into the main script:

```javascript
script "elehov_assists" (int cam) CLIENTSIDE
{
	if(AssistDisplayBar_On()) {
		SetHudSize(320,200,0);
		int pos;
		str img;
		int x;
		int y;
		int timeSec;

		if(CheckActorInventory(cam,"ElecnHoverTime")>0) {
			pos = Get_And_Inc_AssistBarCount();
			x = Get_AssistDisplayBar_X(pos);
			y = Get_AssistDisplayBar_Y(pos);
			img = "ENHVC8C2";
			int hovTime = CheckActorInventory(cam,"ElecnHoverTime")/35+1;
			if(hovTime <= 1 && Timer() % 8 <= 3) img = "TNT1A0";
			BasicImageDisplay(img,Get_And_Inc_AssistDisplayID(),x,y);
			DrawBasicBarAndNumber(
			    "ASTBAREH","ASSTBARE", // these two lines changed
			    "ASTVAREH","ASSTVARE",
				x,y,
				Get_And_Inc_AssistDisplayID(),Get_And_Inc_AssistDisplayID(),Get_And_Inc_AssistDisplayID(),
				hovTime*8/10,
				CheckActorInventory(cam,"AssistNumberFlag")>0,
				hovTime
			);
		}
	}
}
```

And we’re done! The finished product:

<!-- image omitted (assets not vendored) -->

If you want, you can also go back and apply this translation to the pickup respawn timer:

```c
actor ElecnHover_Respawn : 8BDMItemRespawn
{
	translation "192:192=198:198", "198:198=216:216"
	mass 350
}
```

## Example File

---

[v6b-ElecnHover-v1a.pk3](../assets/4f5ea7326e084f39b1195046ec5039ce-v6b-ElecnHover-v1a.pk3)

## See Also

---

[Advanced Weapons](./advanced-weapons-d87e2f5f.md)

[DefineWeapon](./defineweapon-6a4db7e0.md)

[CreatePlayerTranslation](./createplayertranslation-d06d89f1.md)

[DefineTrainingEntry](./definetrainingentry-91396e36.md)

[RegisterTrainingDef](./registertrainingdef-9ebad3a6.md)
