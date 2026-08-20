---
title: "DefineWeapon"
notion_id: 6a4db7e06fb0415e8f80c3407c378ff8
source: https://www.notion.so/6a4db7e06fb0415e8f80c3407c378ff8
---

# DefineWeapon

> 📦 DTADD.acs

> ⚡ int DefineWeapon(str wepTag, str wepActor, str wepIcon, str wepAmmo, int wepMult, int wepSlot, int wepMap, int wepLms, int wepEddie)

## Usage

---

This is used to add new weapons to the internal table of weapons for purposes of LMS loadout, weapon randomization, and ammo pickups.

### Parameters

- `wepTag`: String - The weapon's language definition, or its proper name (Ex. `"TAG_ROLLINGCUTTER"` or `"Rolling Cutter"`)

- `wepActor`: String - The weapon's actor name. (Ex. `"RollingCutterWep"`)

- `wepIcon`: String - The weapon's `SpawnLoop` sprite. (Ex. `"WEA2F0"`)

- `wepAmmo`: String - The weapon's ammo type actor name. (Ex. `"RollingCutterAmmo"`)

- `wepMult`: Fixed - The weapon's ammo collection rate. (1.0 for normal, bigger number for faster ammo regen, smaller number for slower ammo regen)

- `wepSlot`: Int - The weapon's slot, should match the actor definition.

- `wepMap`: Bool - Can you pick this weapon up from maps?

- `wepLMS`: Bool - Can you get this weapon from the LMS rotation?

- `wepEddie`: Bool - Can you get this weapon from Eddie?

> 🚨 **Due to an oversight, none of these three bools can disable the weapon from appearing as a starting weapon when **`mm8bdm_sv_randomstartweapon`** is enabled. Define your weapons with caution!**

### Return Value

- Returns the index of the newly added weapon in the table

## Example

---

This is a block of code that would add Rolling Cutter to the list of weapons, assuming that it did not already exist which it does already in base MM8BDM.

```javascript
Script "rollingcutter_wepdef" OPEN {
	DefineWeapon("TAG_ROLLINGCUTTER", "RollingCutterWep", "WEA2F0", "RollingCutterAmmo", 1.00, DTADD_SLOT_CLOSE, true, true, true);
}
```

## See Also

---

[Creating Weapons](./creating-weapons-bf312efa.md)

[DefineDoubleAmmoWeapon](./definedoubleammoweapon-ebfeb97c.md)
