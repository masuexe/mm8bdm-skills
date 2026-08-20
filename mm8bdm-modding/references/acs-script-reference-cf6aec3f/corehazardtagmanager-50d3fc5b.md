---
title: "core_HazardTag_manager"
notion_id: 50d3fc5be7224b4080c0b00c8ddc380c
source: https://www.notion.so/50d3fc5be7224b4080c0b00c8ddc380c
---

# core_HazardTag_manager

> ⚡ script "core\_HazardTag\_manager" (int atk\_tid, int vic\_tid, int time)

## Usage

---

This script can be used to manually apply hazard assist tags between players. Primarily useful for ACS based suctions that do no damage (which would otherwise apply hazard assist tags by default).

### Parameters

- `atk_tid`: int - The TID of the attacker.

- `vic_tid`: int - The TID of the victim.

> 🚨 **Although these two parameters are TIDs, you should only provide TIDs of players, not of any other non-player actor.**

- `time`: int - How many seconds the assist tag should last for. If this value is 0, it will pull the value of `mm8bdm_sv_hazardtagtime` as a default.
