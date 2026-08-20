---
title: "BasicACSDamager"
notion_id: 7afdcb44acc247ddaf07d1eb0345041c
source: https://www.notion.so/7afdcb44acc247ddaf07d1eb0345041c
---

# BasicACSDamager

---

You want to make an actor that inherits from `BasicACSDamager` if you’re going to use any of the following scripts:

- [`"core_propexplode"`](../acs-script-reference-cf6aec3f/corepropexplode-6e51d65e.md)

- [`"core_teamexplode"`](../acs-script-reference-cf6aec3f/coreteamexplode-67a2da4f.md)

- [`"core_damageowner"`](../acs-script-reference-cf6aec3f/coredamageowner-ce89c559.md)

- [`"core_damageactor"`](../acs-script-reference-cf6aec3f/coredamageactor-ee0369fe.md)

When calling these scripts, a `BasicACSDamager` handles assignment of the damage source, as well as the obituary in the event of the damage resulting in a frag.

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
actor BasicACSDamager : BasicExplosion
{
    -USESPAWNEVENTSCRIPT
    var int user_damage;
    renderstyle "none"
    States
    {
    Spawn:
        TNT1 AA 0 A_Explode(user_damage, 8, 0, 0, 8)
        TNT1 A 35
        stop
    }
}
```

## Example

---

Here is the Oil Canister explosion damager from the explosive barrels on MM1OIL.

```c
actor HazardCredit_OilCanisterExplosion : BasicACSDamager
{
	DamageType "OilCanister"
	Obituary "$OB_OILBARRELCREDIT"
}
```

## See Also

---

[Fragging Hazards](../interacting-with-systems-c99b6cab/fragging-hazards-41d2174e.md)

[BasicHazardExplosion](./basichazardexplosion-6bc400f9.md) 
