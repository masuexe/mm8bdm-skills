---
title: "core_damageactor"
notion_id: ee0369fe773743bf83c80e877cb03593
source: https://www.notion.so/ee0369fe773743bf83c80e877cb03593
---

# core_damageactor

> ⚡ script "core\_damageactor" (int type, int amt, int target, int owner)

## Usage

---

Used for damaging actors via ACS if you are aware of the TIDs. Used for hazard credit.

The first parameter is an actor name, the actor must inherit from [`BasicACSDamager`](../decorate-actor-reference-2fdd3e69/basicacsdamager-7afdcb44.md) and have a damagetype.

> 💡 **Note**: Because this script takes 4 parameters, it is required to call it using [`ACS_NamedExecuteWithResult`](https://zdoom.org/wiki/ACS_NamedExecuteWithResult).

### Parameters

- `type`: string - Name of the [`BasicACSDamager`](../decorate-actor-reference-2fdd3e69/basicacsdamager-7afdcb44.md) actor that deals the damage.

- `amt`: int - Amount of damage to deal.

- `target`: int - TID of the person being damaged.

- `owner`: int - TID of the person dealing the damage.

## See Also

---

[core_damageowner](./coredamageowner-ce89c559.md) 
