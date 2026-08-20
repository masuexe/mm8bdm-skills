---
title: "core_damageowner"
notion_id: ce89c559ac0c4cf990e9c261dc3366a1
source: https://www.notion.so/ce89c559ac0c4cf990e9c261dc3366a1
---

# core_damageowner

> ⚡ script "core\_damageowner" (int amt, int targetptr, int ownerptr)

## Usage

---

Similar to [`core_damageactor`](./coredamageactor-ee0369fe.md) but if the target and owner are the same, or the target and owner are on the same team, the damage is owed to the world instead. This is useful for creating hazards, or damaging abilities that are dangerous to everyone. `Type` is also determined by appending `“HazardCredit_”` to the beginning of the calling actor’s name.

### Parameters

- `amt`: int - Amount of damage to deal.

- `target`: int - Actor pointer which points to the person which should be damaged.

- `owner`: int - Actor point which points to the person dealing the damage.

## See Also

---

[core_damageactor](./coredamageactor-ee0369fe.md) 
