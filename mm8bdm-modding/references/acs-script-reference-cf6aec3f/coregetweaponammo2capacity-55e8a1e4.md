---
title: "core_getweaponammo2capacity"
notion_id: 55e8a1e4105b4e728aea6f7df3a2ae6e
source: https://www.notion.so/55e8a1e4105b4e728aea6f7df3a2ae6e
---

# core_getweaponammo2capacity

> ⚡ script "core\_getweaponammo2capacity" (void)

## Usage

---

Returns the secondary ammo capacity of the calling player’s weapon, if it exists.

> 🚨 **The result of this script is only meaningful for weapons defined using **[DefineWeapon](../interacting-with-systems-c99b6cab/defineweapon-6a4db7e0.md)**! Refrain from calling this script in scenarios where the player’s current weapon is not defined to avoid getting solely false / garbage results.**

### Return Value

The secondary ammo capacity of the calling player’s weapon, if it exists.

## See Also

---

[core_getweaponammo](./coregetweaponammo-bdecf623.md)

[core_getweaponammo2](./coregetweaponammo2-e71613be.md)

[core_getweaponammocapacity](./coregetweaponammocapacity-5d50f462.md)

[core_CanGainAmmo](./corecangainammo-6eba341c.md)
