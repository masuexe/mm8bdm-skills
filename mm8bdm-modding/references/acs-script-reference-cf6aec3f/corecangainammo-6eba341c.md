---
title: "core_CanGainAmmo"
notion_id: 6eba341c828a407abe898fb25afb9ffb
source: https://www.notion.so/6eba341c828a407abe898fb25afb9ffb
---

# core_CanGainAmmo

> ⚡ script "core\_CanGainAmmo" (int any)

## Usage

---

Checks if the calling player can gain ammo for either of their weapon’s (or weapons’) ammo types.

> 🚨 **The result of this script is only meaningful for weapons defined using **[DefineWeapon](../interacting-with-systems-c99b6cab/defineweapon-6a4db7e0.md)**! Refrain from calling this script in scenarios where the player’s current weapon is not defined to avoid getting solely false / garbage results.**

### Parameters

- `any`: bool - If this parameter is true, it will check if the calling player can gain ammo for any [DefineWeapon](../interacting-with-systems-c99b6cab/defineweapon-6a4db7e0.md) defined weapon which they own.

### Return Value

Returns true if the player can gain ammo, false otherwise.

## Example

---

W Tank and M Tanks both use this script in their `Use` state to prevent usage unless the player can actually gain ammo.

```c
// W Tank
Use:
	TNT1 A 0 A_JumpIf(CallACS("core_CanGainAmmo"),"Success")
	fail
...
// M Tank
Use:
	TNT1 A 0 A_JumpIf(CallACS("core_CanGainAmmo",true) || CallACS("core_CanGainHealth"),"Success")
	fail
```

## See Also

---

[core_getweaponammo](./coregetweaponammo-bdecf623.md)

[core_getweaponammo2](./coregetweaponammo2-e71613be.md)

[core_getweaponammocapacity](./coregetweaponammocapacity-5d50f462.md)

[core_getweaponammo2capacity](./coregetweaponammo2capacity-55e8a1e4.md)
