---
title: "core_changepit"
notion_id: 96f6d2e2c31f4d3fbfbb8da95af1176a
source: https://www.notion.so/96f6d2e2c31f4d3fbfbb8da95af1176a
---

# core_changepit

> ⚡ script "core\_changepit" (int tag, int dmg, int mod, int inr)

## Usage

---

Changes the damage amount and type of an existing pit sector. If the given tag does not exist in the list of known pits, a warning will be thrown to the console.

### Parameters

- `tag`: int - The sector tag to apply the damage change to.

- `dmg`: int - The amount of damage this pit should deal.

- `mod`: int - The pit’s new damagetype, or Means-of-Death. Pick from the following values:
  - `MOD_WATER` (12)

  - `MOD_SLIME` (13)

  - `MOD_LAVA` (14)

  - `MOD_CRUSH` (15)

  - `MOD_FALLING` (17)

  - `MOD_EXIT` (20)

  - `MOD_ICE` (24)

  - `MOD_MASSACRE` (1000)

- `inr`: int - How frequently damage is dealt. (Default: 0, which is all the time.)
