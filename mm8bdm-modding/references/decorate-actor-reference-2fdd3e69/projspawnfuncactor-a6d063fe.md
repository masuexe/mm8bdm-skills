---
title: "ProjSpawnFuncActor"
notion_id: a6d063feed764bdebae7bf3a356cc60e
source: https://www.notion.so/a6d063feed764bdebae7bf3a356cc60e
---

# ProjSpawnFuncActor

---

`ProjSpawnFuncActor` is a simpler version of [`BasicProjectile`](./basicprojectile-4723f2cd.md). It’s a basic actor with no new properties aside from the fact that it activates all [spawn functions](../interacting-with-systems-c99b6cab/hook-functions-be9ac6f6.md) for projectiles. This actor is extremely bare-bones and should only be used when you specifically want a projectile that triggers [spawn functions](../interacting-with-systems-c99b6cab/hook-functions-be9ac6f6.md), but has different requirements from `BasicProjectile`.

Similar to `BasicProjectile`, this should only be used for projectiles below speed 60. If you want a projectile that’s faster, use [`ProjSpawnFuncActorFast`](./projspawnfuncactorfast-64bc3599.md) instead.

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
actor ProjSpawnFuncActor
{
    +USESPAWNEVENTSCRIPT
    var int user_UseProjSpawnFunc;
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

- `var int user_noOwnerDamage` - If the actor has the `+SHOOTABLE` actor flag, the [`+USEDAMAGEEVENTSCRIPT`](https://wiki.zandronum.com/DECORATE#:~:text=USEDAMAGEEVENTSCRIPT) actor flag, and a `health` value, this property will prevent the owner of the actor as well as their teammates from dealing damage to it.

## Example

---

Here is the actor that Item-1 uses in MM8BDM.

```c
actor Item1Platform : ProjSpawnFuncActor
{
	height 4
	radius 24
	scale 2.5
	+FORCEYBILLBOARD
	+NOGRAVITY
	-SHOOTABLE
	+SOLID
	+THRUSPECIES
	+THRUGHOST
	+DONTBLAST
	+DONTREFLECT
	+MISSILE
	species "MovingPlatform"
	+THRUSPECIES
	States
	{
		Spawn:
			ITEM A 1
			ITEM A 0 A_Stop
			ITEM A 0 A_ChangeFlag(MISSILE,0)
			ITEM A 0 A_ChangeFlag(THRUGHOST,0)
			ITEM A 0 A_PlaySoundEx("assists/item1spawn", "Body")
			ITEM ABABABABABABABAB 3
			ITEM AZBZAZBZAZ 3
			Goto Death
		Death:
			TNT1 A 0 A_SpawnItemEx("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_WEPFXCOLOR)
			stop
	}
}
```

## See Also

---

[ProjSpawnFuncActorFast](./projspawnfuncactorfast-64bc3599.md) 

[BasicProjectile](./basicprojectile-4723f2cd.md) 

[BasicBouncer](./basicbouncer-b8de71dd.md) 
