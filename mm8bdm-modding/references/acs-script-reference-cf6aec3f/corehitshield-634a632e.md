---
title: "core_hitshield"
notion_id: 634a632e1e5e4bcb838128897ae12a6d
source: https://www.notion.so/634a632e1e5e4bcb838128897ae12a6d
---

# core_hitshield

> ⚡ script "core\_hitshield" (int hits, int customProtect)

## Usage

---

This script can be used to activate an easy shield on the calling player which blocks a set number of hits. To cancel this effect early, give the player `StopHitShield` then take it away one tic later.

### Parameters

- `hits`: int - The number of hits that can be blocked by this shield.

- `customProtect`: bool - If true, will disable the giving of `HitShieldProtection` on hit. Below is the actor definition for `HitShieldProtection`.

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
actor HitShieldProtection : PowerProtection
{
	powerup.duration 10
	damagefactor "normal", 0.0
	damagefactor "crush", 1.0
	damagefactor "telefrag", 1.0
}
```

## See Also

---

[core_shieldwarper](./coreshieldwarper-fe74d816.md)
