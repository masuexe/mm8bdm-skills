---
title: "core_chargecolor"
notion_id: cd423b1c77f64a30899a1d20ac41f083
source: https://www.notion.so/cd423b1c77f64a30899a1d20ac41f083
---

# core_chargecolor

> ⚡ script "core\_chargecolor" (int weap, int teamweap)

## Usage

---

This script is essentially an alias for:

```c
ACS_NamedExecuteWithResult("core_weaponcolor", weap, CLRF_SILENT, teamweap);
```

### Parameters

- `weap`: Int - The translation ID to swap the player to use.

> 💡 **Note: **`CLR_PREVCOLOR`** is a special constant which can be used for this parameter to not change the user’s color. Useful if you only need a weapon swap noise!**

- `teamweap`: Int - The starting translation ID of 4 consecutive translations, one for each of the 4 teams. For example, the default value for this parameter is `TCLR_DEFAULT`, which is 230, because `TCLR_LIGHT` is 230, `TCLR_WILY` is 231, `TCLR_COSSACK` is 232, and `TCLR_KING` is 233.

> 💡 **Note: This parameter is what facilitates team charge color animations, so check out **[Team Colors](../interacting-with-systems-c99b6cab/team-colors-679c2e93.md)** for more info.**

## Example

---

Below is a modified excerpt of Homing Sniper’s charge animation

```c
Charge2AnimStart:
	TNT1 A 0 A_GunFlash("ChargeLevel2")
Charge2Anim.A:
	HSNI I 1 ACS_NamedExecuteWithResult("core_chargecolor",CLR_HOMINGCHRG2,TCLR_CHARGE2)
	HSNI C 0 A_Refire("Charge2Anim.B")
	Goto Fire1
Charge2Anim.B:
	HSNI J 1 ACS_NamedExecuteWithResult("core_chargecolor",CLR_HOMINGCHRG3,TCLR_CHARGE3)
	HSNI C 0 A_Refire("Charge2Anim.C")
	Goto Fire1
Charge2Anim.C:
	HSNI C 1 ACS_NamedExecuteWithResult("core_chargecolor",CLR_HOMINGSNIPER,TCLR_DEFAULT)
	HSNI C 0 A_Refire("Charge2Anim.A")
	Goto Fire1
```

## See Also

---

[core_weaponcolor](./coreweaponcolor-db216af3.md)
