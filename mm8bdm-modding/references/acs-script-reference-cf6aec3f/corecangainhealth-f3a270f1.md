---
title: "core_CanGainHealth"
notion_id: f3a270f12da64b97a5e6067f35e3e811
source: https://www.notion.so/f3a270f12da64b97a5e6067f35e3e811
---

# core_CanGainHealth

> ⚡ script "core\_CanGainHealth" (void)

## Usage

---

Checks if the calling player’s health is lower than their max health, essentially the condition for them being able to restore health.

> 🚨 **This script currently *****does not***** check if the player is dead, so make sure to check for that manually to avoid giving health to dead players!**

### Return Value

Returns true if the player’s health is lower than their max health, false otherwise.

## Example

---

E Tank’s `Use` state uses this script to disallow use if the player is already full health (or even overhealed).

```c
Use:
	EBAL E 0 A_JumpIf(CallACS("core_CanGainHealth"),"Success")
	fail
```

## See Also

---

[core_gethealth](./coregethealth-bbbefebd.md)

[core_getmaxhealth](./coregetmaxhealth-02e4f1fe.md)
