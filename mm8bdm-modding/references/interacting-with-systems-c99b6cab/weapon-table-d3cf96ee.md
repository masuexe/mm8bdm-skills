---
title: "Weapon Table"
notion_id: d3cf96eee3f2466384172114e5eacfc0
source: https://www.notion.so/d3cf96eee3f2466384172114e5eacfc0
---

# Weapon Table

> 📦 8BDT.acs

## Usage

---

Stores information about all defined weapons. See more info about how to interact with this table at the tutorial for [basic](./creating-weapons-bf312efa.md) and [advanced](./advanced-weapons-d87e2f5f.md) weapons.

### Static Variables

- `MAX_WEAPONS_GLOBAL`: int - Count of stored weapons.

### Fields

- `Tag`: String - The weapon's language definition, or its proper name (Ex. `"TAG_ROLLINGCUTTER"` or `"Rolling Cutter"`)

- `Actor`: String - The weapon's class name. (Ex. `"RollingCutterWep"`)

- `Icon`: String - The weapon's spawn sprite. (Ex. `"WEA2F0"`)

- `AmmoType`: String - The weapon's ammo class name. (Ex. `"RollingCutterAmmo"`)

- `AmmoFactor`: Fixed - The weapon's ammo collection rate. (1.0 for normal, bigger number for faster ammo regen, smaller number for slower ammo regen)

- `Ammo2Type`: String - The weapon's ammo2 class name. (Ex. `"RollingCutterAmmo"`)

- `Ammo2Factor`: Fixed - The weapon's ammo2 collection rate. (1.0 for normal, bigger number for faster ammo regen, smaller number for slower ammo regen)

- `Slot`: Int - The weapon's slot, should match the actor definition.

- `MapValid`: Bool - Can you pick this weapon up from maps?

- `LMSValid`: Bool - Can you get this weapon from the LMS rotation?

- `EddieValid`: Bool - Can you get this weapon from Eddie?

### Utility Functions

> ⚡ int findWeaponByActor(str actor)

- Parameters:
  - `actor`: String - the actor name of the weapon to search for

- Return values:
  - Index of the weapon (starting from 0), if one is found

  - -1 if none is found

> ⚡ int randomWeapon(void)

- Return values:
  - Random weapon index from the table.

> ⚡ int randomWeaponSlot(int slot)

- Parameters:
  - `slot`: int - expected slot to pull the weapon from

> 💡 **Note: For any of these parameters, you may enter -1 if you don’t need to filter by that field.**

- Return values:
  - Index of the weapon (starting from 0), if one is found

  - -1 if the specified criteria does not present a valid option from the table

> ⚡ int randomWeaponEx(int slot, int mapValid, int LMSValid, int eddieValid)

- Parameters:
  - `slot`: int - expected slot to pull the weapon from

  - `mapValid`: bool - whether the weapon can spawn on a map

  - `LMSValid`: bool - whether the weapon can appear in LMS

  - `eddieValid`: bool - whether the weapon can be dropped by Eddie

> 💡 **Note: For any of these parameters, you may enter -1 if you don’t need to filter by that field.**

- Return values:
  - Index of the weapon (starting from 0), if one is found

  - -1 if the specified criteria does not present a valid option from the table

> ⚡ int getWeaponSlotCount(int slot)

- Parameters:
  - `slot`: int - slot to get the count for

- Return values:
  - Amount of weapons in the given slot

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ str getWeaponTag(int idx)

> ⚡ str getWeaponActor(int idx)

> ⚡ str getWeaponIcon(int idx)

> ⚡ str getWeaponAmmoType(int idx)

> ⚡ int getWeaponAmmoFactor(int idx)

> ⚡ str getWeaponAmmo2Type(int idx)

> ⚡ int getWeaponAmmo2Factor(int idx)

> ⚡ 
>
> int getWeaponSlot(int idx)

> ⚡ int isWeaponMapValid(int idx)

> ⚡ int isWeaponLMSValid(int idx)

> ⚡ int isWeaponEddieValid(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setWeaponTag(int idx, str val)

> ⚡ void setWeaponActor(int idx, str val)

> ⚡ void setWeaponIcon(int idx, str val)

> ⚡ void setWeaponAmmoType(int idx, str val)

> ⚡ void setWeaponAmmoFactor(int idx, int val)

> ⚡ void setWeaponAmmo2Type(int idx, str val)

> ⚡ void setWeaponAmmo2Factor(int idx, int val)

> ⚡ void setWeaponSlot(int idx, int val)

> ⚡ void setWeaponMapValid(int idx, int val)

> ⚡ void setWeaponLMSValid(int idx, int val)

> ⚡ void setWeaponEddieValid(int idx, int val)

> ⚡ 
>
> void setWeaponEddieValid(int idx, int val)

## See Also

---

[Creating Weapons](./creating-weapons-bf312efa.md)

[Advanced Weapons](./advanced-weapons-d87e2f5f.md)
