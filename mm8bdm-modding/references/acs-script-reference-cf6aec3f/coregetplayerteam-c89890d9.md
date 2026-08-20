---
title: "core_getplayerteam"
notion_id: c89890d9c1184c86b19273ac0d6bb101
source: https://www.notion.so/c89890d9c1184c86b19273ac0d6bb101
---

# core_getplayerteam

> ⚡ 
>
> script "core\_getplayerteam" (int player)

## Usage

---

Returns the current team of a selected player, chosen by providing their player number.

### Parameters

- `player`: int - The player number of the player to get a team for. Use a value of -1 to specify the calling player.

### Return Value

Returns the selected player’s team. 

> 🚨 **This script can have some unintuitive behavior in modes without teams! Be wary of using this script in those situations!**

## See Also

---

[core_gettidteam](./coregettidteam-ed243bb9.md)

[core_getptrteam](./coregetptrteam-291f0eeb.md)
