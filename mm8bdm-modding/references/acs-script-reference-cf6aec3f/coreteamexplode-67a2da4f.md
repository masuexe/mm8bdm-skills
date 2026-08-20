---
title: "core_teamexplode"
notion_id: 67a2da4f56624929a9bc1f08a650b847
source: https://www.notion.so/67a2da4f56624929a9bc1f08a650b847
---

# core_teamexplode

> ⚡ script "core\_teamexplode" (int type, int dmg, int range, int fullRange)

## Usage

---

An ACS recreation of [`A_Explode`](https://zdoom.org/wiki/A_Explode) that damages the user and their allies as well.

Because this uses [core_damageactor](./coredamageactor-ee0369fe.md), a [`BasicACSDamager`](../decorate-actor-reference-2fdd3e69/basicacsdamager-7afdcb44.md) must be created and passed as the first parameter.

> 💡 **Note**: Because this script takes 4 parameters, it is required to call it using [`ACS_NamedExecuteWithResult`](https://zdoom.org/wiki/ACS_NamedExecuteWithResult).

### Parameters

- `type`: string - Name of the [`BasicACSDamager`](../decorate-actor-reference-2fdd3e69/basicacsdamager-7afdcb44.md) actor that deals the damage.

- `dmg`: int - Amount of damage the explosion should deal, max.

- `range`: int - How big the explosion should be.

- `fullRange`: int - How big the max damage radius in the explosion should be.

## See Also

---

[core_damageactor](./coredamageactor-ee0369fe.md) 
