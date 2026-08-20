---
title: "core_AmmoScript_MTank"
notion_id: e105ba1bdefd42bca5600d75ae18ee6b
source: https://www.notion.so/e105ba1bdefd42bca5600d75ae18ee6b
---

# core_AmmoScript_MTank

> ⚡ script "core\_AmmoScript\_MTank" (void)

## Usage

---

An alternate version of [core_AmmoScript](./coreammoscript-7ff6a3d7.md) that implements the behavior of the M Tank. When used, it will set all of the player’s weapons’ ammo to max, regardless of any ammo gain modifiers.

> 🚨 **This script only works for weapons defined using **[DefineWeapon](../interacting-with-systems-c99b6cab/defineweapon-6a4db7e0.md)**! It will have no effect when used for undefined weapons.**

## Example

---

The modified inventory actor below could be given by a successful M Tank use to restore all of the player’s ammo.

```c
actor MTankAmmo_Modified : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 ACS_NamedExecuteWithResult("core_AmmoScript_MTank")
			stop
	}
}
```

## See Also

---

[core_AmmoScript](./coreammoscript-7ff6a3d7.md)
