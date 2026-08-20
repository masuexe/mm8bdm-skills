---
title: "core_weaponcolor"
notion_id: db216af3cad3448b917d4d5fbb2a7aa6
source: https://www.notion.so/db216af3cad3448b917d4d5fbb2a7aa6
---

# core_weaponcolor

> ⚡ script "core\_weaponcolor" (int weap, int flags, int teamweap)

## Usage

---

This script can be called in the `Ready` state of weapons to play a weapon selection noise and to change the color of the player using a translation created by [CreatePlayerTranslation](../interacting-with-systems-c99b6cab/createplayertranslation-d06d89f1.md).

### Parameters

- `weap`: Int - The translation ID to swap the player to use.

> 💡 **Note: **`CLR_PREVCOLOR`** is a special constant which can be used for this parameter to not change the user’s color. Useful if you only need a weapon swap noise!**

- `flags`: Int - A set of flags which can be added to change the behavior of this script. Allowed flags include:
  - `CLRF_SILENT`: Disables the weapon swap sound.

- `teamweap`: Int - The starting translation ID of 4 consecutive translations, one for each of the 4 teams. For example, the default value for this parameter is `TCLR_DEFAULT`, which is 230, because `TCLR_LIGHT` is 230, `TCLR_WILY` is 231, `TCLR_COSSACK` is 232, and `TCLR_KING` is 233.

> 💡 **Note: This parameter is what facilitates team charge color animations, so check out **[Team Colors](../interacting-with-systems-c99b6cab/team-colors-679c2e93.md)** for more info.**

## Example

---

```c
Ready:
	DRIL D 0 ACS_NamedExecuteWithResult("core_weaponcolor", CLR_DRILLBOMB)
	DRIL D 1 A_WeaponReady
	Goto Ready+1
```

## See Also

---

[core_chargecolor](./corechargecolor-cd423b1c.md)
