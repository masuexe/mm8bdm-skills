---
title: "core_clearbotline"
notion_id: d2c675f8a52e4efcb986415096900b70
source: https://www.notion.so/d2c675f8a52e4efcb986415096900b70
---

# core_clearbotline

> ⚡ Script "core\_clearbotline" (int line)

## Usage

---

Removes monster blocking from a given linedef if `mm8bdm_sv_nobotblocklines` is true. This should be called on lines that were specifically given Block Monster to prevent bots from mosh-pitting, but should allow normal players to move freely through in case a mod uses block monster lines as a form of pit protection.

### Parameters

- `line`: int - The tag of the linedef to tag monster blocking off
