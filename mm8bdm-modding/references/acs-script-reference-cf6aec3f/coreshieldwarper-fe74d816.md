---
title: "core_shieldwarper"
notion_id: fe74d8163ab64f05953f57562478b9d3
source: https://www.notion.so/fe74d8163ab64f05953f57562478b9d3
---

# core_shieldwarper

> ⚡ Script "core\_shieldwarper" (int noshieldcheck) CLIENTSIDE

## Usage

---

This script is called by actors that inherit from [BasicShieldWarper](../decorate-actor-reference-2fdd3e69/basicshieldwarper-c84527fb.md). It handles removing the calling actor whenever the player’s weapon swaps or they lose `ShieldCheck` (if `noshieldcheck` is set to false).

### Parameters

- `noshieldcheck`: bool - If true, the actor will not be removed if the player has no `ShieldCheck`

## See Also

---

[core_hitshield](./corehitshield-634a632e.md)
