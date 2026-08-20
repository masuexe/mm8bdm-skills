---
title: "BasicShieldHitbox"
notion_id: f5554ebf0abc40cd99ea77049d6a7830
source: https://www.notion.so/f5554ebf0abc40cd99ea77049d6a7830
---

# BasicShieldHitbox

---

For shields that spawn hitboxes that protect you from specific directions, you may want to use a `BasicShieldHitbox`. This is a shootable actor that is invisible and, by default, is tall and thin. It’s designed such that this actor should be used alongside several others of its kind to create a “shield wall” in the same manner as Proto Buster’s shield. It will always appear in front of its `target` by a given distance offset by its `meleerange`, `accuracy`, and `mass`.

This shield is built to disappear when the user is given the item `StopShield`.

See the [Custom Properties](./basicshieldhitbox-f5554ebf.md) section for details.

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
// Used for projectile blocking shields ala Proto Shield
actor BasicShieldHitbox
{
    -SOLID
    +MISSILE
    +DONTSPLASH
    +DONTBLAST
    +DONTDRAIN
    +DONTREFLECT
    +DONTRIP
    +NOBLOOD
    +NOCLIP
    +NORADIUSDMG
    +GHOST
    +SHOOTABLE
    +NOTIMEFREEZE
    +NOGRAVITY
    +NOTARGETSWITCH
    +NOTAUTOAIMED
    +NODAMAGE
    //PainSound "item/protoreflect"
    RenderStyle "None"
    bloodtype ""
    damagefactor "Telefrag",0.0
    painchance 256
    health 99999

    Meleerange 28 // Warp X
    Accuracy 0 // Warp Y 
    Mass 8 // Warp Z

    Damage 0
    Height 42
    Radius 5
    Speed 0
    scale 2.5

    States
    {
		    Spawn:
		        TNT1 A 0
		        TNT1 A 0 A_JumpIf(ACS_NamedExecuteWithResult("core_targetexists")==0,"Death2")
		        TNT1 A 0 A_JumpIfInTargetInventory("StopShield",1,"SpawnStop")
		        PLAY A 1 A_Warp(2,Meleerange,Accuracy,Mass,0,24)
		        loop
		    SpawnStop:
		        TNT1 A 0 //A_Log("SpawnStop")
		        PLAY H 1
		        stop
		    Pain:
		        TNT1 A 0 A_PlaySound("item/protoreflect")//A_Pain
		        TNT1 A 0 A_SpawnItemEx("ProtoShieldDeathFX")
		        goto Spawn
		    Death:
		        TNT1 A 0 //A_PlaySound("item/protoreflect")
		        PLAY H 1
		        stop
		    Death2:
		        TNT1 A 0 //A_Log("Death2")
		        PLAY H 1
		        stop
    }
}
```

### Custom Properties

The following properties affect this actor’s behavior:

- `Meleerange` - Determines the X value of the shield’s position, relative to the `target`'s position and angle. This is how far “forward” the shield is. This value cannot be negative.

- `Accuracy` - Determines the Y value of the shield’s position, relative to the `target`'s position and angle. This is how far to the left or right the shield is. Negative values place it more to the left while positive moves it to the right.

- `Mass` - Determines the Z value of the shield’s position, relative to the `target`'s position and angle. This is how high up from the `target`'s feet the shield is. This value cannot be negative.

## Example

---

The principal use case for `BasicShieldHitbox` in vanilla is the shield that comes with Proto Buster. It uses five shield hitboxes to protect the user from the front:

```c
actor ProtoShieldHitbox1 : BasicShieldHitbox
{
	Meleerange 28
	Accuracy -16
	Mass 8
}

actor ProtoShieldHitbox2 : ProtoShieldHitbox1
{
	Accuracy -8
}

actor ProtoShieldHitbox3 : ProtoShieldHitbox1
{
	Accuracy 0
}

actor ProtoShieldHitbox4 : ProtoShieldHitbox1
{
	Accuracy 8
}

actor ProtoShieldHitbox5 : ProtoShieldHitbox1
{
	Accuracy 16
}
```
