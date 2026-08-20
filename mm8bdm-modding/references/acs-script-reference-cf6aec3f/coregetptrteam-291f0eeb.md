---
title: "core_getptrteam"
notion_id: 291f0eeb1fe14945baea44137933fa7d
source: https://www.notion.so/291f0eeb1fe14945baea44137933fa7d
---

# core_getptrteam

> ⚡ script "core\_getptrteam" (int ptr)

## Usage

---

Returns the current team of the calling actor’s selected [actor pointer](https://zdoom.org/wiki/Actor_pointer).

### Parameters

- `ptr`: int - The actor pointer to obtain the team of. Use `AAPTR_DEFAULT` to refer to the calling actor itself.

### Return Value

Returns the selected pointer’s team. If the current game mode has no teams, then this will always return -1.

## See Also

---

[core_gettidteam](./coregettidteam-ed243bb9.md)

[core_getplayerteam](./coregetplayerteam-c89890d9.md)
