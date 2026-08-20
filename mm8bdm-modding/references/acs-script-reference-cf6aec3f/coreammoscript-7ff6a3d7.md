---
title: "core_AmmoScript"
notion_id: 7ff6a3d7782b40ad8716e5b13816de93
source: https://www.notion.so/7ff6a3d7782b40ad8716e5b13816de93
---

# core_AmmoScript

> ⚡ script "core\_AmmoScript" (int amount)

## Usage

---

A standardized ammo restoration script which restores a percentage of the calling player’s current weapon’s ammo, modified by that weapon’s ammo gain factor.

> 🚨 **This script only works for weapons defined using **[DefineWeapon](../interacting-with-systems-c99b6cab/defineweapon-6a4db7e0.md)**! It will have no effect when used for undefined weapons.**

### Parameters

- `amount`: int - The percent of ammo to restore

### Return Value

Returns if the player restored any ammo or not.

## Example

---

The inventory actor below is given by a successful W Tank use to restore 100% of the player’s current weapon’s ammo, modified by its ammo gain factor.

```c
actor WTankAmmo : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 ACS_NamedExecuteWithResult("core_AmmoScript", 100)
			stop
	}
}
```

## See Also

---

[core_AmmoScript_MTank](./coreammoscriptmtank-e105ba1b.md)
