---
title: "DefineDoubleAmmoWeapon"
notion_id: ebfeb97ce4a8423785402daf4594fdf3
source: https://www.notion.so/ebfeb97ce4a8423785402daf4594fdf3
---

# DefineDoubleAmmoWeapon

> 📦 DTADD.acs

> ⚡ int DefineDoubleAmmoWeapon(str wepTag, str wepActor, str wepIcon, str wepAmmo, int wepMult, str wepAmmo2, int wepMult2, int wepSlot, int wepMap, int wepLms, int wepEddie)

## Usage

---

This function has the same purpose as [DefineWeapon](./defineweapon-6a4db7e0.md) but takes extra arguments to support defining a second ammo type for a weapon.

### Parameters

- `wepTag`: String - The weapon's language definition, or its proper name (Ex. `"TAG_ROLLINGCUTTER"` or `"Rolling Cutter"`)

- `wepActor`: String - The weapon's actor name. (Ex. `"RollingCutterWep"`)

- `wepIcon`: String - The weapon's `SpawnLoop` sprite. (Ex. `"WEA2F0"`)

- `wepAmmo`: String - The weapon's ammo type actor name. (Ex. `"RollingCutterAmmo"`)

- `wepMult`: Fixed - The weapon's ammo collection rate. (1.0 for normal, bigger number for faster ammo regen, smaller number for slower ammo regen)

- `wepAmmo2`: String - The weapon's second ammo type actor name. (Ex. `"RollingCutterAmmo"`)

- `wepMult2`: Fixed - The weapon's second ammo collection rate. (1.0 for normal, bigger number for faster ammo regen, smaller number for slower ammo regen)

- `wepSlot`: Int - The weapon's slot, should match the actor definition.

- `wepMap`: Bool - Can you pick this weapon up from maps?

- `wepLMS`: Bool - Can you get this weapon from the LMS rotation?

- `wepEddie`: Bool - Can you get this weapon from Eddie?

> 🚨 **Due to an oversight, none of these three bools can disable the weapon from appearing as a starting weapon when **`mm8bdm_sv_randomstartweapon`** is enabled. Define your weapons with caution!**

### Return Value

- Returns the index of the newly added weapon in the table

## See Also

---

[DefineWeapon](./defineweapon-6a4db7e0.md)
