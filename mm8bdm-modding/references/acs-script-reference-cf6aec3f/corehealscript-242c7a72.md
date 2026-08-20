---
title: "core_HealScript"
notion_id: 242c7a721ef549e8aa9f876611a85a5f
source: https://www.notion.so/242c7a721ef549e8aa9f876611a85a5f
---

# core_HealScript

> ⚡ script "core\_HealScript" (int amount)

## Usage

---

A standardized healing script which performs a percentage heal on the calling player, dealing with classes of differing HP values.

> 🚨 **This script currently *****does not***** check if the player is dead, so make sure to check for that manually to avoid giving health to dead players!**

### Parameters

- `amount`: int - The percent of HP to heal

### Return Value

Returns if the player was successfully healed or not.

## Example

---

The inventory actor below is given by a successful E Tank use to heal 100% of the player’s HP.

```c
actor ETankHeal : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 ACS_NamedExecuteWithResult("core_HealScript", 100)
			stop
	}
}
```
