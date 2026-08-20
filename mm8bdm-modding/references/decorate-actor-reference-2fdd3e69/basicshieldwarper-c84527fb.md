---
title: "BasicShieldWarper"
notion_id: c84527fbde29411c9af01785f07a6a32
source: https://www.notion.so/c84527fbde29411c9af01785f07a6a32
---

# BasicShieldWarper

---

Several “shield effects” are accomplished by inheriting from `BasicShieldWarper`. Much like [`BasicGraphicEffect`](./basicgraphiceffect-95b89f4a.md), this actor is not synced to the server.

This actor cannot use the normal method of executing spawn events, so it uses its `Spawn` state to do so. If inheriting from this actor and desiring spawn events (such as projectile team colors) to occur, use the `SpawnFrame` state instead of a `Spawn` state. By overriding the `Spawn` state, all of these `SFT_PROJCLIENT` spawn functions are skipped, most often meaning no projectile team colors.

The primary thing to consider different from `BasicGraphicEffect` is that this actor uses an ACS script to manage when it should disappear. Most instances of this script check for the removal of an inventory item from this actor’s `target` called `ShieldCheck`, but if you have more specific needs, it may warrant a more complicated script. See below for both a simple example and a more complicated example.

### DECORATE Definition

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
actor BasicShieldWarper
{
	Scale 2.5
	Height 0
	Radius 0
	+NOINTERACTION
	+CLIENTSIDEONLY
	-SOLID
	+NOGRAVITY
	+MISSILE
	+DONTBLAST
	States
	{
	Spawn:
		TNT1 A 0
		TNT1 A 0 A_GiveInventory("MM8BDMProjSpawnFuncClient",1)
		TNT1 A 0 ACS_NamedExecuteAlways("core_shieldwarper", 0, 0)
		TNT1 A 0 A_Jump(256, "Shield")
		Goto Shield
	Shield:
		STAR AABBCCDD 1 A_Warp(AAPTR_TARGET, 0, 0, 16, 0, WARPF_INTERPOLATE|WARPF_NOCHECKPOSITION)
		loop
	}
}
```

### Custom Properties

These are user variables that can be added to the actor for various effects. You do not need to give them a value, they just must be defined.

- `var int user_NoTranslation` - Disables projectile team colors on this actor

- `var int user_TranslateWhiteColors` - Allows projectile team colors to recolor white.

- `var int user_TranslateBlackColors` - Allows projectile team colors to recolor black.

## Example

---

A basic `ShieldWarper` only needs to check for `ShieldCheck`. It would need no other functionality beyond what `BasicShieldWarper` provides. — Star Crash is one such example.

```c
actor StarCrashWarper : BasicShieldWarper
{
	+BRIGHT
	States
	{
	Shield:
	STAR AABBCCDD 1 A_Warp(AAPTR_TARGET, 0, 0, 16, 0, WARPF_INTERPOLATE|WARPF_NOCHECKPOSITION)
	loop
	}
}
```

However, in more complicated cases, you might need to make your own checks. In this case, you’ll need to put in a bit more effort. An example from vanilla is the 4-shot magazine of Jewel Satellite. Jewel Satellite has 4 warpers that each check for different amounts of `JewelShieldCheck`.

```c
actor JewelSatelliteWarper : BasicShieldWarper
{
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1 A_GiveInventory("MM8BDMProjSpawnFuncClient",1)
			TNT1 A 0 ACS_NamedExecuteAlways("core_shieldwarper_jewel", 0, 0) // jewel number is placed into last argument
		ShieldLoop:
			JEWS AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPP 1 A_Warp(AAPTR_TARGET, 0, 0, 0, 0, WARPF_INTERPOLATE|WARPF_NOCHECKPOSITION)
			loop
	}
}

actor JewelSatelliteWarper2 : JewelSatelliteWarper
{
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1 A_GiveInventory("MM8BDMProjSpawnFuncClient",1)
			TNT1 A 0 ACS_NamedExecuteAlways("core_shieldwarper_jewel", 0, 1) // second jewel here
			Goto ShieldLoop+8
	}
}

actor JewelSatelliteWarper3 : JewelSatelliteWarper
{
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1 A_GiveInventory("MM8BDMProjSpawnFuncClient",1)
			TNT1 A 0 ACS_NamedExecuteAlways("core_shieldwarper_jewel", 0, 2) // third
			Goto ShieldLoop+16
	}
}

actor JewelSatelliteWarper4 : JewelSatelliteWarper
{
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1 A_GiveInventory("MM8BDMProjSpawnFuncClient",1)
			TNT1 A 0 ACS_NamedExecuteAlways("core_shieldwarper_jewel", 0, 3) //etc
			Goto ShieldLoop+24
	}
}
```

```javascript
// Script called by Jewel Satellite
Script "core_shieldwarper_jewel" (int jewelno) CLIENTSIDE
{
	int Player = ACS_NamedExecuteWithResult("core_gettarget",0);
	int Weapon = ACS_NamedExecuteWithResult("core_getplayerweapon", Player - 1000);
	
	// Loop if shield is active
	while(GetActorProperty(Player, APROP_HEALTH)>0
	&& ACS_NamedExecuteWithResult("core_getplayerweapon", Player - 1000) == Weapon
	&& CheckActorInventory(Player, "ShieldCheck") > 0
	&& CheckActorInventory(Player, "JewelShieldCheck") > jewelno
	){
		Delay(1);
	}
	
	// Remove
	Thing_Remove(0);
}
```

## See Also

---

[BasicGraphicEffect](./basicgraphiceffect-95b89f4a.md) 

[core_shieldwarper](../acs-script-reference-cf6aec3f/coreshieldwarper-fe74d816.md)
