---
title: "core_checkDistance"
notion_id: c80818500c6c43e59e7c42aa5215f2d1
source: https://www.notion.so/c80818500c6c43e59e7c42aa5215f2d1
---

# core_checkDistance

> ⚡ Script "core\_checkDistance" (int Distance)

## Usage

---

> 💡 This script is simple to use, but has a very limited scope and may not be suitable for all uses. Consider using [core_getPlayersInRadius](./coregetplayersinradius-f8ebd948.md) and its more robust features instead!

Returns a true or false value depending on if there are any players within `distance` units to the actor calling the script.

### Parameters

- `distance`: int - The radius of the sphere to check within.

### Return Value

Returns true if there is any player within range, false otherwise.

## Example

---

The Drop Platforms in Shadow Man’s stage will stay open so long as there is a player inside of them.

```c
PlayerCheck:
	SHPL E 2
	SHPL E 2 A_JumpIf(ACS_NamedExecuteWithResult("core_checkdistance", 64) == 1, "PlayerCheck")
	SHPL D 0 A_ChangeFlag("SOLID",1)
	SHPL DCB 3
	SHPL A 2 
	goto Spawn+1
```

## See Also

---

[core_getPlayersInRadius](./coregetplayersinradius-f8ebd948.md)

[core_radiusPull](./coreradiuspull-24f601dd.md)
