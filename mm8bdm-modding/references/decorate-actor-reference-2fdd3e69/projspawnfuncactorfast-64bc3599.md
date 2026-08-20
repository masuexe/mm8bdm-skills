---
title: "ProjSpawnFuncActorFast"
notion_id: 64bc35994ac0467a99df41fd82844df1
source: https://www.notion.so/64bc35994ac0467a99df41fd82844df1
---

# ProjSpawnFuncActorFast

---

`ProjSpawnFuncActorFast` is a simpler version of [`BasicFastProjectile`](./basicfastprojectile-46b99912.md). It’s a simple actor inheriting from [`FastProjectile`](https://zdoom.org/wiki/Classes:FastProjectile) with no new properties aside from the fact that it activates all [spawn functions](../interacting-with-systems-c99b6cab/hook-functions-be9ac6f6.md) for projectiles. This actor is extremely bare-bones and should only be used when you specifically want a projectile that triggers [spawn functions](../interacting-with-systems-c99b6cab/hook-functions-be9ac6f6.md), but has different requirements from `BasicFastProjectile`.

Similar to `BasicFastProjectile`, this should only be used for projectiles at or above speed 60. If you want a projectile that’s slower, consider [`ProjSpawnFuncActor`](./projspawnfuncactorfast-64bc3599.md) instead.

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

Here is a modified Wheel Cutter actor from MM8BDM. It is used to “instantly” place Wheel Cutter’s launched projectile 96 units forward.

```c
actor WheelCutterLaunchPlacerSimple : ProjSpawnFuncActorFast
{
    PROJECTILE
    Obituary "$OB_WHEELCUTTER"
    Damagetype "WheelCutter"
    scale 2.5
    Radius 10
    Height 10
    Damage (20)
    Speed 96 // WEPC_10WC_SAWRADIUS
    States
    {
		    Spawn:
		        TNT1 A 0
		        TNT1 A 0 A_SpawnItemEx("WheelCutterLauncher", 0, 0, 0, momx/WEPC_10WC_SAWRADIUS, momy/WEPC_10WC_SAWRADIUS, momz/WEPC_10WC_SAWRADIUS, 0, SXF_ABSOLUTEMOMENTUM|SXF_MULTIPLYSPEED)
		        stop
		    Death:
		        TNT1 A 0 A_SpawnItemEx("WheelCutter", 0, 0, 0, 1.0, 0, 0, 0, SXF_MULTIPLYSPEED)
		        TNT1 A 10
		        stop
    }
}
```

## See Also

---

[ProjSpawnFuncActor](./projspawnfuncactor-a6d063fe.md) 

[BasicProjectile](./basicprojectile-4723f2cd.md) 

[BasicFastProjectile](./basicfastprojectile-46b99912.md) 
