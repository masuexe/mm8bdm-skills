---
title: "Fragging Hazards"
notion_id: 41d2174e618443b3bb26d0418eea61ed
source: https://www.notion.so/41d2174e618443b3bb26d0418eea61ed
---

# Fragging Hazards

---

> ⚠️ **Warning: Before beginning this tutorial, you should have experience with **[**DECORATE**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** and **[**ACS**](../starting-guides-77c9d72f/hello-acs-447542af.md)**. You will also want to have experience with **[**mapping**](../starting-guides-77c9d72f/doombuilder-and-you-49fe1007.md)** because this page will cover elements of that as well.**

Mega Man 8-Bit Deathmatch Version 6B introduced the ability to gain frags from activating hazards and receiving assist frags if someone dies to a non-player activated hazard. 

Despite their gameplay similarity, these are actually two separate systems in play. Internally, obtaining a frag from activating a hazard (Oil Canisters, Count Bombs, oil pits) is called a hazard credit. 

Obtaining an assist frag from someone dying to a passive hazard (Turbo Roaders, spikes, pits) while fighting you and seeing a special obituary is called a hazard tag. Some hazards even have both elements in play at once, such as Kyorowns.

This page will cover both of those systems as well as the tangentially related oil pits, so use the table of contents below to skip ahead if needed.

## Table of Contents

## Hazards with Credit

---

The thing that typically allows players to receive frags from projectiles when killing other players is their ownership of the projectile, which is dictated by the `AAPTR_TARGET` [actor pointer](https://zdoom.org/wiki/Actor_pointers) field. Projectiles and damagers that don’t have any actor in the `AAPTR_TARGET` field will instead be owned by the world, instead causing a hazard assist kill or a lost frag if there is no player to award an assist to.

So with that mind, the goal at a basic level when creating a player-activated hazard which credits the activator is to have all damaging portions of the hazard owned by the player who activated it. There’s a few wrenches in that plan due to requiring support for more cases than you might expect, but we’ll solve those as we get into it.

For now, we’ll begin by making a basic hazard called a Charge Motor which can be shot with electric weapons to activate a damaging radius. Below is the implementation of the shootable actor itself. It has the typical flags that make it solid as well as capable of being shot to activate a pain state.

```c
actor ChargeMotor 32702
{
	//$Category Tutorial-Interactive Props
	
	+SOLID
	+SHOOTABLE
	+NOBLOOD
	+DONTDRAIN
	+QUICKTORETALIATE
	+NODAMAGE
	+NODAMAGETHRUST
	+DONTBLAST
	+CANTSEEK
	+NOTAUTOAIMED
	
	scale 2.0
	height 64
	Radius 32
	mass 99999
	Health 9999
	PainChance 256

	DamageFactor "Normal", 0.0
	DamageFactor "Electrify", 1.0
	States
	{
		Spawn:
			CHMT A 1
			wait
		Pain.Electrify: 
			// Disable some flags to prevent other players from
			// triggering it mid animation and activation.
			CHMT A 0 A_ChangeFlag(SHOOTABLE, false)
			CHMT A 1 A_ChangeFlag(NOPAIN, true)
			// one tic of delay to make sure that
			// activating player is set as AAPTR_TARGET
			
			// AAPTR_TARGET becomes player who shot it due to +QUICKTORETALIATE
			// Disable switching of AAPTR_TARGET temporarily just in case
			CHMT A 0 A_ChangeFlag(NOTARGETSWITCH, true)
			
			// Transfer AAPTR_TARGET to spawned explosions, meaning activating player will own it
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 0, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 0, SXF_TRANSFERPOINTERS)
			CHMT BCBC 2
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 22.5, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 22.5, SXF_TRANSFERPOINTERS)
			CHMT BCBC 2
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 45, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 45, SXF_TRANSFERPOINTERS)
			CHMT BCBC 2
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 67.5, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 67.5, SXF_TRANSFERPOINTERS)
			CHMT BCBC 2
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 90, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 90, SXF_TRANSFERPOINTERS)
			CHMT BCBC 2
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 112.5, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 112.5, SXF_TRANSFERPOINTERS)
			CHMT BCBC 2
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 135, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 135, SXF_TRANSFERPOINTERS)
			CHMT BCBC 2
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 157.5, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 157.5, SXF_TRANSFERPOINTERS)
			CHMT BCBC 2
			CHMT A 0 A_PlaySoundEx("misc/chargemotorwhirr", "Body")
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", CM_DIST, 0, 32, 0, 0, 0, 0, SXF_TRANSFERPOINTERS)
			CHMT B 0 A_SpawnItemEx("ChargeMotorExplosion", -CM_DIST, 0, 32, 0, 0, 0, 0, SXF_TRANSFERPOINTERS)
			CHMT A 10
			
			// Allow AAPTR_TARGET to change again for next cycle
			// Make sure to clear current AAPTR_TARGET to prevent weirdness
			CHMT A 0 A_ChangeFlag(NOTARGETSWITCH, false)
			CHMT A 0 A_ClearTarget
			
			// More flag fixing
			CHMT A 0 A_ChangeFlag(NOPAIN, false)
			CHMT A 0 A_ChangeFlag(SHOOTABLE, true)
			goto Spawn
	}
}
```

Most elemental weapons in the game actually spawn invisible explosions whenever they contact with surfaces with special damage types. Fire ones do so with a damage type of `Ignition`, ice ones do so with `Freeze`, water ones with `Soakify`, and electric ones with `Electrify`. There’s also the elemental explosions that use the damage types `ConcreteCase`, `PropBlower`, and `ThunderClawPegHelp`.

All of these invisible explosions are set with a 0.0x damage multiplier by default, meaning that they’re unable to hurt anything. However, we can toggle them back on for a specific actor by giving that actor a `damagefactor` property. So with this actor, we’ve disabled all damage with `damagefactor "Normal" 0.0`, but then enabled it to be hit by electric weapons by giving a 1.0x multiplier to the `Electrify` damage type.

This in addition to only having a `Pain.Electrify` state (no default `Pain` state) means that it will only ever enter a pain state when being hit by an electric weapon. We can then think of its pain state as an “activated” state.

Another notable property that this actor has is the flag [`QUICKTORETALIATE`](https://zdoom.org/wiki/Actor_flags#:~:text=of%20ceiling%20height.-,QUICKTORETALIATE,-Normally%2C%20when%20an). The name has its roots with monster actors, but what this means in our case is that whenever the actor is shot, one tic later in its pain state, it is guaranteed to have the shooter as its `AAPTR_TARGET` actor pointer. We disable and enable some other flags during the pain state so that no other player can become the Charge Motor’s `AAPTR_TARGET` or can restart the pain state in the middle of it.

So now we’ve got a Charge Motor that’s exploding and the player who activated it is the Charge Motor’s `AAPTR_TARGET` actor pointer. How do we get that pointer to the actual damaging portion, the explosions? That’s the [`SXF_TRANSFERPOINTERS`](https://zdoom.org/wiki/A_SpawnItemEx#:~:text=angle%3E%2C%3Cflags%3E%2C%3Cchance%3E)-,SXF_TRANSFERPOINTERS,-%2D%20transfers%20the%20calling) flag being used with [`A_SpawnItemEX`](https://zdoom.org/wiki/A_SpawnItemEx), it’ll make it so that the spawned actor shares the same pointer fields as the spawning actor. Because we’re transferring the activating player as `AAPTR_TARGET` to the spawned explosives, it’s as if the player shot the explosives themselves.

Below is the actual implementation of that explosion actor. The major thing to note is that it inherits from [BasicHazardExplosion](../decorate-actor-reference-2fdd3e69/basichazardexplosion-6bc400f9.md). This is to deal with one of those wrenches mentioned earlier. Hazard crediting is actually a toggleable server variable, so because of that, we need the means to handle cases where it’s enabled and where it’s not enabled. 

[BasicHazardExplosion](../decorate-actor-reference-2fdd3e69/basichazardexplosion-6bc400f9.md) has an `Explode` state that’ll either jump to `Credit` if hazard crediting is enabled. However, if hazard crediting is disabled, then it’ll clear all actor pointer fields then jump to `NoCredit`. This makes the `NoCredit` state fairly simple to understand, it just becomes a normal explosion owned by the world which is what we want when hazard crediting is disabled.

```c
actor ChargeMotorExplosion : BasicHazardExplosion
{
	damagetype "ChargeMotor"
	Obituary "$OB_CHARGEMOTORCREDIT"
	States
	{
		Spawn:
			TNT1 E 0
			TNT1 E 0 A_SpawnItemEx("ElectrifyEffect", 0, 0, -32)
			goto Explode
		// AAPTR_TARGET pointer is the activating player in this state
		Credit:
			TNT1 E 0 A_SpawnItemEx("ChargeMotorExplodeFX")
			TNT1 A 35 ACS_NamedExecuteWithResult("core_propexplode", 15, 64, 64)
			stop
		// AAPTR_TARGET pointer is cleared just before this state
		// This means that this explosion is owned by World
		NoCredit:
			TNT1 E 0 A_SpawnItemEx("ChargeMotorExplodeFX")
			TNT1 A 35 A_Explode(15,64,XF_HURTSOURCE,0,64)
			stop
	}
}

// Handles the hazard credit obituary and damage
actor HazardCredit_ChargeMotorExplosion : BasicACSDamager
{
	DamageType "ChargeMotor"
	Obituary "$OB_CHARGEMOTORCREDIT"
}

actor ChargeMotorExplodeFX : BasicGraphicEffect
{
	// We typically don't use team colors on exploding
	// hazards because they can hurt everyone.
	var int user_NoTranslation;
	scale 3.6
	States
	{
		SpawnFrame:
			SPAS AHIJ 1
			stop
	}
}
```

The `Credit` state still has a bit more to explain, however. We can’t use standard [`A_Explode`](https://zdoom.org/wiki/A_Explode) for it because `A_Explode` can’t actually hurt teammates in normal gameplay at all. That wouldn’t be any good for Oil Canisters. Additionally, we want to make sure that if someone hurts themselves with a hazard, it should count as a lost frag or an assist towards someone else. For these two reasons combined, we use [core_propexplode](../acs-script-reference-cf6aec3f/corepropexplode-6e51d65e.md) which emulates `A_Explode` but fixes these criteria.

The only caveat with this script is that we need to define an additional actor to deal the damage and handle the obituary. [core_propexplode](../acs-script-reference-cf6aec3f/corepropexplode-6e51d65e.md) expects to find an actor by the name of `HazardCredit_` prefixed to the actor name which called the script, in this case `ChargeMotorExplosion`. This actor must also inherit from [BasicACSDamager](../decorate-actor-reference-2fdd3e69/basicacsdamager-7afdcb44.md). 

That context hopefully explains the `HazardCredit_ChargeMotorExplosion` actor defined just underneath `ChargeMotorExplosion`, since that’s the actor that deals the final damage with a `$OB_CHARGEMOTORCREDIT` obituary.

As a final note for the `ChargeMotorExplosion` actor, the `Spawn` state actually spawns the invisible `Electrify` explosion mentioned earlier, so one Charge Motor can trigger another for a fun chain reaction.

---

That previous hazard was relatively painless to understand, but not all hazards with crediting are so straight forward. Sometimes we don’t actually want the `AAPTR_TARGET` field to be the activating player. This is again because a player cannot use projectiles to hurt their own teammates in normal play, but also a player cannot hit themselves with their own projectiles, meaning that single hit hazards would be very tricky to pull off.

To show off what could be done in that case, we’ll make a basic hazard inspired by Flare Man from Mega Man Rock Force. His stage had traps which would ignite after walking on top of them, so it would be cool to allow players to ignite them and earn frags for whoever may step into them after.

We’ll start that hazard by first making an actor that can be placed onto the map and will detect whenever it is stepped onto so that we can spawn the actual damaging flame.

```c
actor FlareFlameStarter 32701
{
	//$Category Tutorial-Interactive Props
	//$Sprite FLFLA0

	PROJECTILE
	+FORCEYBILLBOARD
	+DONTBLAST
	+FLOORHUGGER
	+DONTREFLECT
	+HITTRACER
	height 32
	Radius 12
	Damage (0)
	damagetype "Flare"
	Scale 2.0
	
	States
	{
		Spawn:
			TNT1 A 1
			wait
		Death:
			FLFL CDCDCDCDCDCDCDCDCDCDCDCDCDCDCDCD 1
			TNT1 A 0 A_PlaySoundEx("misc/flareflame","Voice")
			// Transfering the AAPTR_TRACER obtained from +HITTRACER
			TNT1 A 0 A_SpawnItemEX("FlareFlame",0,0,0,0,0,0,0,SXF_TRANSFERPOINTERS)
			TNT1 A 80 A_RearrangePointers(AAPTR_NULL, AAPTR_NULL, AAPTR_NULL)
			TNT1 A 0 A_SpawnItemEx("FlareFlameStarter")
			stop
	}	
}
```

It’s a fairly standard projectile type of actor, but most notable here is the [`HITTRACER`](https://zdoom.org/wiki/Actor_flags#:~:text=flag%20as%20well.-,HITTRACER,-Projectiles%20that%20die) flag. `HITTRACER` makes it so that whichever actor makes the projectile go into its `Death` state becomes that projectile’s `AAPTR_TRACER` actor pointer. Because we don’t want to use `AAPTR_TARGET` for the ignited flame, we’re instead going to carry the activator of the hazard in the `AAPTR_TRACER` field. We again use `SXF_TRANSFERPOINTERS` to make sure that the pointer gets carried into the spawned flame.

Below is the implementation of the spawned flame. Like the previous hazard, we still need to consider the situation where hazard crediting is disabled, so we essentially have two versions of the spawned flame, the first being the hazard crediting version, and the second not awarding credit.

```c
actor FlareFlame : FlareFlameStarter
{
	// We want to keep the previous AAPTR_TRACER because that is who activated
	// the trap, but we also want to be able to obtain whoever runs into it,
	// hence +HITMASTER
	-HITTRACER
	+HITMASTER
	+THRUACTORS
	
	reactiontime 80
	
	States
	{
		Spawn:
			TNT1 A 0 // If `mm8bdm_sv_credithazardtrigger` is disabled, bail
			TNT1 A 0 A_JumpIf(!CallACS("core_checkservercvar", SVCVAR_HAZARD), "NoCredit")
			
			// +THRUACTORS to begin with in case someone is sitting on a flame
			// as it spawns so it skips the jump check.
			TNT1 A 0 A_ChangeFlag(THRUACTORS, false)
		SpawnLoop:
			FLFL AABB 1 A_Countdown
			loop
		Death:
			TNT1 A 0 
			stop
		XDeath:
			// Uses the info of the hazard triggerer as well as the person who stepped into the hazard
			TNT1 A 0 ACS_NamedExecuteWithResult("core_damageowner", 10, AAPTR_MASTER, AAPTR_TRACER)
			stop
		NoCredit:
			TNT1 A 0 A_SpawnItemEx("FlareFlameNoCredit")
			stop
	}
}

// Handles the hazard credit obituary and damage
actor HazardCredit_FlareFlame : BasicACSDamager
{
	damagetype "Flare"
	Obituary "$OB_FLARECREDIT"
}

actor FlareFlameNoCredit : FlareFlame
{
	// Non-credit version, so we just add damage
	// and call it a day
	Damage (10)
	-HITMASTER
	-THRUACTORS
	
	States
	{
		Spawn:
			TNT1 A 0
			goto SpawnLoop
		XDeath:
			OILF A 0
			stop
	}
}
```

For that latter version of the Flare Flame, it doesn’t require much thought to implement it. We already know that the `AAPTR_TARGET` field is blank because it was always blank, so the projectile is owned by the world, so it just needs a damage property and it’ll take away frags when someone dies to it just like expected.

On the contrary, in the hazard crediting version of the actor, we can’t just give the projectile damage and call it a day, because again then it would just cause frag losses on kills. Instead, we’re going to use [core_damageowner](../acs-script-reference-cf6aec3f/coredamageowner-ce89c559.md), another script that is designed to handle the cases of frag loss when killing the owner but awarding a frag when killing enemies. 

We have to pass two bits of information into this script, a pointer of the victim and a pointer of the owner. For the former, we’ve now added the [`HITMASTER`](https://zdoom.org/wiki/Actor_flags#:~:text=flag%20as%20well.-,HITMASTER,-Projectiles%20that%20die) flag to the actor to receive that pointer in the `AAPTR_MASTER` field, and for the latter, we received that in the `AAPTR_TRACER` field from the previous `SXF_TRANSFERPOINTERS`. Just like [core_propexplode](../acs-script-reference-cf6aec3f/corepropexplode-6e51d65e.md), we need a `HazardCredit_` actor to actually deal the specified damage with the proper obituary, so we create a `HazardCredit_FlareFlame`.

That covers the basics of creating hazards which are capable of rewarding frags to activating players, however, these custom hazards aren’t quite done yet. Mega Man 8-Bit Deathmatch provides the ability to add custom obituaries for when a player receives an assist kill from a hazard. The activating player of a hazard will take priority for the frag, except in the case of the activating player or their teammates dying to said hazard, so we’ll want to add a custom obituary in those cases. See the section below for details on that system.

## Assist Tag Obituaries

---

Receiving an assist frag from a hazard occurs whenever a player is about to die and the owner of the killing damage is the world rather than any player or monster, essentially whenever the death would cause a lost frag instead. If an enemy player has hit that dying player previously within a certain time frame, MM8BDM internally intercepts that killing damage and instead will create a setup where that enemy player instead will frag the dying player.

It creates this setup by using [core_damageactor](../acs-script-reference-cf6aec3f/coredamageactor-ee0369fe.md) with a type parameter of `HazardTag_` prefixed to the damage type which was originally going to kill the player. For example, if a player was originally going to die to a Metal Press hazard (which has a damage type of `MetalPress`), that initial damage will get intercepted, and that player’s most recent combatant will get an assist frag by [core_damageactor](../acs-script-reference-cf6aec3f/coredamageactor-ee0369fe.md) being called using a type of `HazardTag_MetalPress`.

The importance of this type parameter is that it corresponds to an actual actor in DECORATE, inheriting from [BasicACSDamager](../decorate-actor-reference-2fdd3e69/basicacsdamager-7afdcb44.md), which is spawned with an owner of the player receiving the assist frag physically on top of the player who is dying. This is what sets up the frag relationship as well as handles the custom obituary. It’s no different than if the player receiving the assist had shot the dying player using their own projectiles.

Below is what `HazardTag_MetalPress`'s actor looks like in DECORATE.

```c
actor HazardTag_MetalPress : BasicACSDamager 
{ 
	damagetype "MetalPress" 
	Obituary "$OB_METALPRESSTAG" 
}
```

With that context out of the way, how does that apply to our own hazards? Well, if we have a hazard with a custom damage type and no hazard tag actor defined, by default, MM8BDM will just use a default `HazardTag_Normal` actor alongside its defined obituary. This means that assist frags will still work with no further setup, they just will have a rather generic obituary. However, we can actually supply the necessary `HazardTag_` prefixed actor to add in a custom obituary instead.

Consider the custom hazards we made just in the previous section. If a player or teammate is dying to their own activated hazard, then that will be a scenario where an assist frag can occur instead. So for our Charge Motor which had a damage type of `ChargeMotor`, we can define the following hazard tag actor and obituary.

```c
actor HazardTag_ChargeMotor : BasicACSDamager
{
	damagetype "ChargeMotor"
	Obituary "$OB_CHARGEMOTORTAG"
}
```

We can also do the same for our Flare Flame and its damage type `Flare`.

```c
actor HazardTag_Flare : BasicACSDamager 
{ 
	damagetype "Flare" 
	Obituary "$OB_FLARETAG" 
}
```

Once you understand the context of these actors, they’re all that’s needed for setting up the obituaries for assist scenarios, so have fun with creating plenty of funny obituaries.

## Oil Pits

---

Flammable oil pits that credit the activating player are a bit daunting at first, but largely just rely on a placed [Hazard Pit](../mapping-reference-3fe89cb4/hazard-pit-f1db99f7.md) actor, a few map side scripts, some map spots for the flames, and an [Actor hits Floor Sector Action](https://zdoom.org/wiki/Classes:SecActHitFloor) placed and set to execute the map side scripts added. 

There are two main types of oil pits, the ones you can see in Oil Man’s stage and the ones that you can see in Flame Man’s stage. For the beginning part of this setup, we’ll look at one from Oil Man’s stage, but the fairly similar scripts and physical setup for both will be provided.

We’ll start by showing a basic one that has already been set up.

<!-- image omitted (assets not vendored) -->

We’ve tagged the sector of the oil pit with a tag of 2, while each map spot that is placed there has a tag of 3. Below is how the Actor hits Floor Sector Action is configured.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

The `map_oilpit_ignite` script is a script that we’ll add to our map ourselves. It is **not** a core script provided already. We’re going to design it to take in two tags as a parameter, one which corresponds to the actual sector that makes up the oil pit, and another which corresponds to that tag we used for the map spots intended for the flames.

Let’s also not forget the [Hazard Pit](../mapping-reference-3fe89cb4/hazard-pit-f1db99f7.md), as oil pits are essentially just pits that are temporarily active. Because of that, we’re going to add one, but we’ll set its damage as 0 and its damage type as non-specific because we don’t want it active to begin with.

<!-- image omitted (assets not vendored) -->

Before we move onto the scripts, a quick side note about Flame Man styled oil pits. The physical setup is identical but the map spots are placed closer together in much higher quantity, because they serve visual purpose instead for that style.

<!-- image omitted (assets not vendored) -->

Now we’re onto the scripts. Generally speaking, these scripts can be copy and pasted into your `SCRIPTS` file (don’t forget to compile!) without much concern so long as every sector making up a single oil pit shares the same tag across it. Instances where this may not be the case is if you have a 3D floor going over top the middle of an oil pit (such as in Flame Man’s stage). In that case, the scripts below are commented to try and help you make adjustments where needed.

In a general sense, from that Actor hits Floor Sector Action, an ignition script is triggered. That script does a few initial checks to make sure it was an igniting projectile that triggered it and that the oil pit can be ignited currently. If all those succeed, then it splits off into one of two oil burning scripts using [core_checkservercvar](../acs-script-reference-cf6aec3f/corecheckservercvar-674fdcab.md). Hazard credit can be disabled by server hosts if desired, so we have one version of the oil burning script which handles giving credit to the activator and another version which does not. 

Both versions of the oil burning script use [core_changepit](../acs-script-reference-cf6aec3f/corechangepit-96f6d2e2.md) to enable the pit, but the hazard crediting version uses [core_damageactor](../acs-script-reference-cf6aec3f/coredamageactor-ee0369fe.md) to handle the damage of the pit.

Depending on which style of oil pit you want, you’ll want to use a different set of scripts, mainly because Oil Man pits have some extra handling for the slippery oil pits and their flame pillars. If you’re using that style, you will want to modify `"map_oilpit_init"` to properly apply that slippery friction to the proper sector tags.

## Oil Man Oil Pit Scripts

## Flame Man Oil Pit Scripts

Once you’ve got those scripts placed into your map, compiled, and done the physical setup, you should be good to go. Just don’t forget the fire weapons! Feel free to check out the example file below if needed.

## Example File

---

[v6b-HazardsOil-v1e.pk3](../assets/25b5854e471f800bb94cfa423bf47545-v6b-HazardsOil-v1e.pk3)

## See Also

---

[BasicHazardExplosion](../decorate-actor-reference-2fdd3e69/basichazardexplosion-6bc400f9.md)

[BasicACSDamager](../decorate-actor-reference-2fdd3e69/basicacsdamager-7afdcb44.md)

[Hazard Pit](../mapping-reference-3fe89cb4/hazard-pit-f1db99f7.md)

[core_checkservercvar](../acs-script-reference-cf6aec3f/corecheckservercvar-674fdcab.md)

[core_propexplode](../acs-script-reference-cf6aec3f/corepropexplode-6e51d65e.md)

[core_damageowner](../acs-script-reference-cf6aec3f/coredamageowner-ce89c559.md)

[core_changepit](../acs-script-reference-cf6aec3f/corechangepit-96f6d2e2.md)

[core_damageactor](../acs-script-reference-cf6aec3f/coredamageactor-ee0369fe.md)
