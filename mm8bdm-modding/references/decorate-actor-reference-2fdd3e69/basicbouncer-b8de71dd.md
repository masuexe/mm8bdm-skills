---
title: "BasicBouncer"
notion_id: b8de71dd16414f7f9a447e749b22d0a2
source: https://www.notion.so/b8de71dd16414f7f9a447e749b22d0a2
---

# BasicBouncer

---

`BasicBouncer` when inherited from will create a projectile that can receive projectile team colors and that can bounce on floors, ceilings, walls, and water floors as well.

Unlike normal projectiles, if your projectile must bounce but goes over 60 `speed`, you cannot use `BasicFastProjectile` or `FastProjectile` inherited actors, because they cannot bounce. Your projectile will just have to be subject to phasing through people at odd angles.

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
actor BasicBouncer : BasicProjectile
{
    +BOUNCEONFLOORS
    +BOUNCEONWALLS
    +BOUNCEONCEILINGS
    +CANBOUNCEWATER
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

Here is a simplified version of the Triple Blade projectile from MM8BDM. Note that it is using `user_PierceRipper` with a finetuned limit, so it will only be able to damage the same person 3 times, totaling for 15 damage.

```c
actor SimpleTripleBlade : BasicBouncer
{
	+RIPPER
	+DONTBLAST
	-BOUNCEONWALLS
	bouncecount 2
	Obituary "$OB_TRIPLEBLADE"
	damagetype "TripleBlade"
	Radius 16
	Height 5
	Damage (5)
	Speed 30
	var int user_PierceRipper;
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_GiveInventory("PierceRipperLimit", 3)
			TBL1 E 1
			wait
		Death:
			TNT1 A 0
			stop
	}
}
```
