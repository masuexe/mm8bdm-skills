---
title: "BasicProjectile"
notion_id: 4723f2cdaaf5462496f1f941ebea9b1a
source: https://www.notion.so/4723f2cdaaf5462496f1f941ebea9b1a
---

# BasicProjectile

---

`BasicProjectile` is an actor that can be inherited from to get an actor that will receive projectile team colors and acts as a projectile, colliding on terrain and other actors, making it a good starting step for a projectile.

If your projectile has a `speed` higher than 60, you should use [BasicFastProjectile](./basicfastprojectile-46b99912.md) instead!

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
actor BasicProjectile : ProjSpawnFuncActor
{
    PROJECTILE
    damagetype "Buster"
    Obituary "%o told %k they forgot the obituary. (BasicProjectile)"
    Speed 27
    Damage (5000)
    radius 5
    height 5
    scale 2.5
    States
    {
    Spawn:
        BUST A 1
		    wait
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

- `var int user_noOwnerDamage` - If the actor has the `+SHOOTABLE` actor flag, the [`+USEDAMAGEEVENTSCRIPT`](https://wiki.zandronum.com/DECORATE#:~:text=USEDAMAGEEVENTSCRIPT) actor flag, and a `health` value, this property will prevent the owner of the actor as well as their teammates from dealing damage to it.

## Example

---

Here is the projectile actor that Hard Knuckle uses in MM8BDM.

```c
actor HardKnuckle : BasicProjectile
{
	damagetype "HardKnuckle"
	Obituary "$OB_HARDKNUCKLE"
	
	Speed 38
	Radius 12
	Height 10
	Damage (75)
	
	States
	{
		Spawn:
			HARD A 3
			loop
		Death:
			TNT1 A 0 A_SpawnItemEx("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_WEPFXCOLOR)
			stop
	}
}
```

## See Also

---

[BasicBouncer](./basicbouncer-b8de71dd.md)

[BasicFastProjectile](./basicfastprojectile-46b99912.md)
