---
title: "BasicFastProjectile"
notion_id: 46b999123b704437822c07226eff796d
source: https://www.notion.so/46b999123b704437822c07226eff796d
---

# BasicFastProjectile

---

`BasicFastProjectile` is an actor that can be inherited from to get an actor that will receive projectile team colors and acts as a projectile, colliding on terrain and other actors. This actor is primarily used for projectiles that move at a speed of 60 or higher, and handles collision as more of a line of projectiles than a single hitbox. 

This means this projectile *cannot bounce or reflect* and may appear to collide in strange places if used in improper contexts. You should also take caution using this type of projectile with the `RIPPER` flag, as it will do far more damage than expected unless you use the special damage properties noted below.

Please use [BasicProjectile](./basicprojectile-4723f2cd.md) for projectiles moving lower than 60 speed.

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
actor BasicFastProjectile : ProjSpawnFuncActorFast
{
    PROJECTILE
    damagetype "Buster"
    Obituary "%o told %k they forgot the obituary. (BasicFastProjectile)"
    Speed 60
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

Here is a projectile actor for the Metal Blade projectile used in MM8BDM’s Instagib game mode. Note that it uses `user_TranslateWhiteColors` to give it team colors. This projectile uses `RIPPER` without using any special damage properties, but that is fine because this projectile is designed to one-shot regardless.

```c
actor IGMetalBlade : BasicFastProjectile
{
	+RIPPER
	+DONTBLAST
	seesound "weapons/mm2/metalbladefire"
	damagetype "Instagib"
	Obituary "$OB_IGMETALBLADE"
	Speed 100
	Radius 3
	Height 4
	Damage (100)
	var int user_TranslateWhiteColors;
	States
	{
		Spawn:
			METL AB 3
			loop
	}
}
```

## See Also

---

[BasicProjectile](./basicprojectile-4723f2cd.md) 
