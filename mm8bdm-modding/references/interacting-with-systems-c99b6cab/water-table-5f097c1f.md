---
title: "Water Table"
notion_id: 5f097c1f01ff4c528881ae1bcf960b69
source: https://www.notion.so/5f097c1f01ff4c528881ae1bcf960b69
---

# Water Table

> 🚨 **Warning!** This feature is reliant on a **change of mapping standards. **Maps made prior to <u>**version 5b**</u>** **may not support this table.

> 📦 8BDT.acs

## Usage

---

Stores information about all water on the map. See more information about how to interact with this table in the page for [water sectors](../mapping-reference-3fe89cb4/water-sector-98eda73c.md).

### Constants

- `SECTOR_LOWEST`: -32768.0 - The lowest possible z-value for a sector’s ceiling or floor

- `SECTOR_HIGHEST`: 32768.0 - The highest possible z-value for a sector’s ceiling or floor

- `GLOBAL_WATER_TID`: -9999 - The default “tag” to apply water to every sector in the map

### Static Variables

- `MAX_WATER_GLOBAL`: int - Count of stored water sectors in the map.

### Fields

- `tag`: int - The tag of the water sector (-9999 if applying to all sectors)

### Utility Functions

> ⚡ int findWaterByTag(int tag)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

> ⚡ bool isZPosInWaterTag(int tag, int zPos)

- Parameters:
  - `tag`: int - The sector tag affected by water

  - `zPos`: fixed - Vertical position being checked

- Return values:
  - True if `zPos` is in water, false otherwise

> 💡 **Entering a tag that does not have water could return unpredictable results. Make sure to validate the sector tag you have is a valid water tag.**

> ⚡ fixed getWaterTopZ(int tag)

- Parameters:
  - `tag`: int - sector tag affected by water

- Return values:
  - Fixed point value of the water’s surface

> 💡 **Entering a tag that does not have water could return unpredictable results. Make sure to validate the sector tag you have is a valid water tag.**

> ⚡ fixed getWaterBottomZ(int tag)

- Parameters:
  - `tag`: int - sector tag affected by water

- Return values:
  - Fixed point value of the water’s surface

> 💡 **Entering a tag that does not have water could return unpredictable results. Make sure to validate the sector tag you have is a valid water tag.**

> ⚡ int findActorWater(int tid)

- Parameters:
  - `tid`: int - Thing to search the water table for

- Return values:
  - Sector tag affected by water, if the given TID is found within one

  - 0 if none is found

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ int getWaterTag(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setWaterTag(int idx, int val)

## See Also

---

[Water Sector](../mapping-reference-3fe89cb4/water-sector-98eda73c.md)
