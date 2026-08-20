---
title: "BasicExplosion"
notion_id: 85dc080ade894bfab476f85977952985
source: https://www.notion.so/85dc080ade894bfab476f85977952985
---

# BasicExplosion

---

`BasicExplosion` is an actor that can be inherited from to get an actor that will receive projectile team colors, but will not collide on terrain or other actors, making it ideal for handling explosion effects with graphics.

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
actor BasicExplosion : ProjSpawnFuncActor
{
    Obituary "%o told %k they forgot the obituary. (BasicExplosion)"
    DamageType "Normal"
    +MISSILE
    +NOTELEPORT
    -SOLID
    +NOCLIP
    +DONTBLAST
    +NOGRAVITY
    +RIPPER
    +SKYEXPLODE
    +NOINTERACTION
    +DONTSPLASH
    +THRUGHOST
    +THRUACTORS
    +DONTREFLECT
    Damage (0)
    radius 2
    height 2
    scale 2.5
    Speed 0
    States
    {
    Spawn:
        TNT1 A 0
        TNT1 A 1 A_Explode(5000,32,0)
        stop
    Death:
        TNT1 A 1
        stop
    }
}
```

### Custom Properties

These are user variables that can be added to the actor for various effects. You do not need to give them a value, they just must be defined.

- `var int user_NoTranslation` - Disables projectile team colors on this actor

- `var int user_TranslateWhiteColors` - Allows projectile team colors to recolor white.

- `var int user_TranslateBlackColors` - Allows projectile team colors to recolor black.

- `var int user_PierceRipper` - Makes it so that this actor only does damage once to another actor. The actor being damaged must have [`+USEDAMAGEEVENTSCRIPT`](https://wiki.zandronum.com/DECORATE#:~:text=USEDAMAGEEVENTSCRIPT), like players already do.
  - You can fine-tune the number of times that this actor deals damage by using `A_GiveInventory("PierceRipperLimit", x)` in the `Spawn` state of the actor.

- `var int user_DamageKill` - Makes it so that this actor only does damage once before entering `Death` state. The actor that is being damaged must have [`+USEDAMAGEEVENTSCRIPT`](https://wiki.zandronum.com/DECORATE#:~:text=USEDAMAGEEVENTSCRIPT), like players already do. The actor with this flag must also have `reactiontime` set.
  - The amount of times that this actor can deal damage before perishing is determined by the `reactiontime` value. A projectile with `reactiontime 3` will only be able to damage 3 times to any players before dying.

## Example

---

This is the actor spawned by Top Spin in MM8BDM for its damage dealing.

```c
actor TopRadius : BasicExplosion
{
	damagetype "TopSpin"
	Obituary "$OB_TOPSPIN"

	States
	{
		Spawn:
			TNT1 A 0
			TOPS A 2 A_Explode(15,90,0)
			stop
	}
}
```
