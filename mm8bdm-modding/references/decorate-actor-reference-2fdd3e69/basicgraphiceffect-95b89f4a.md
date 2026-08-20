---
title: "BasicGraphicEffect"
notion_id: 95b89f4ad02f4057bda090d8aa1b70fb
source: https://www.notion.so/95b89f4ad02f4057bda090d8aa1b70fb
---

# BasicGraphicEffect

---

`BasicGraphicEffect`, when inherited from, will create a client-sided actor. Use this to create particle effects and visuals that should not be synced to the server.

This actor cannot use the normal method of executing spawn events, so it uses its `Spawn` state to do so. If inheriting from this actor and desiring spawn events (such as projectile team colors) to occur, use the `SpawnFrame` state instead of a `Spawn` state. By overriding the `Spawn` state, all of these `SFT_PROJCLIENT` spawn functions are skipped, most often meaning no projectile team colors.

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
actor BasicGraphicEffect
{
    +CLIENTSIDEONLY
    +NOINTERACTION
    +NOGRAVITY
    -SOLID
    +MISSILE
    +DONTBLAST
    renderstyle "Translucent"
    alpha 1.0
    radius 2
    height 2
    scale 2.5
    States
    {
		    // Replace this state if you *do not* want ACS to run on these items...
		    Spawn:
		        TNT1 A 0
		        TNT1 A 0 A_GiveInventory("MM8BDMProjSpawnFuncClient", 1)
		        TNT1 A 1 A_JumpIf(true, "SpawnFrame")
		        wait
		    
		    // Replace this state if you want ACS to run on these items...
		    SpawnFrame:
		        "----" "#" 0
		        stop
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

The example below shows Centaur Flash’s sparkle effects from MM8BDM. Note it uses `user_TranslateWhiteColors` so it properly translates white colors when team colors run on it.

```c
actor CentaurFlashFX : BasicGraphicEffect
{
	+FORCEXYBILLBOARD
	+BRIGHT
	var int user_TranslateWhiteColors;
	States
	{
		SpawnFrame:
			TNT1 A 0
			CFL5 ABCD 3
			stop
	}
}
```
