---
title: "core_gettidteam"
notion_id: ed243bb9cd304bc78f8ee224b9eba359
source: https://www.notion.so/ed243bb9cd304bc78f8ee224b9eba359
---

# core_gettidteam

> ⚡ script "core\_gettidteam" (int tid)

## Usage

---

Returns the current team of a selected player, chosen by providing their TID, or in other words, their player number + `PLN_TID` (1000).

### Parameters

- `tid`: int - The TID of the player to get a team for.

### Return Value

Returns the selected TID’s team. If the current game mode has no teams, then this will always return -1.

## See Also

---

[core_getplayerteam](./coregetplayerteam-c89890d9.md)

[core_getptrteam](./coregetptrteam-291f0eeb.md)
