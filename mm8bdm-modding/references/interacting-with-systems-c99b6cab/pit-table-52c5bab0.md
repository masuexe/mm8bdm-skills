---
title: "Pit Table"
notion_id: 52c5bab0e0594401bc86929fad8ab0da
source: https://www.notion.so/52c5bab0e0594401bc86929fad8ab0da
---

# Pit Table

> 🚨 **Warning!** This feature is reliant on a **change of mapping standards. **Custom maps made prior to <u>**version 6b**</u>** **may not support this table.

> 📦 8BDT.acs

## Usage

---

Stores information about all pits on the map. See more information about how to interact with this table at the page for [Hazard Pits](../mapping-reference-3fe89cb4/hazard-pit-f1db99f7.md).

### Static Variables

- `MAX_PIT_GLOBAL`: int - Count of all unique pits on the map.

- `inrActive`: bool - Whether there is an interval damage sector on the map.

### Fields

- `pitTag`: int - tag of the affected sector

- `pitMod`: int - "Means Of Death"-- a numerical indicator of the damage type of the sector.
  - `"Drowning"`
    - Means-of-Death: `MOD_WATER` (12)

    - Obituary: `“%o can’t swim.”`

    - Damage Type: `"Drowning"`

  - `"Mutation"`
    - Means-of-Death: `MOD_SLIME` (13)

    - Obituary: `“%o mutated.”`

    - Damage Type: `"Slime"`

  - `"Melting"`
    - Means-of-Death: `MOD_LAVA` (14)

    - Obituary: `“%o melted.”`

    - Damage Type: `"Fire"`

  - `"Crushing"`
    - Means-of-Death: `MOD_CRUSH` (15)

    - Obituary: `“%o was squished.”`

    - Damage Type: `"Crush"`

  - `“Falling”` - Players simply disappear upon death with this type of pit.
    - Means-of-Death: `MOD_FALLING` (17)

    - Obituary: `“%o fell too far.”`

    - Damage Type: `"Falling"`

  - `“Leaving”`
    - Means-of-Death: `MOD_EXIT` (20)

    - Obituary: `“%o tried to leave.”`

    - Damage Type: `"Exit"`

  - `“Freezing”` - Players freeze and break into ice chunks with this type of pit.
    - Means-of-Death: `MOD_ICE` (24)

    - Obituary: `“%o died.”`

    - Damage Type: `"Ice"`

  - `“Non-specific”`
    - Means-of-Death: `MOD_MASSACRE` (1000)

    - Obituary: `“%o died.”`

    - Damage Type: `"Massacre"`

- `pitTag3d`: int - tag of the target sector of a damaging 3D floor.

- `pitDamage`: int - Amount of damage dealt.

- `pitInterval`: int - How often damage is dealt.

### Utility Functions

> ⚡ int findPitByTagAndTag3d(int tag, int tag3d)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

> ⚡ int findPitByTag(int tag)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

> ⚡ bool checkPit(void)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

> ⚡ bool checkPitByTID(int tid)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

> ⚡ int getPit(void)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

> ⚡ int getPitByTID(int tid)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

> ⚡ int getGroundPitsByTID(int tid)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

> ⚡ int get3dPitsByTID(int tid)

- Parameters:
  - `tag`: int - The sector tag to search for

- Return values:
  - Index of the water actor (starting from 0), if one is found

  - -1 if none is found

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ int getPitTag(int idx)

> ⚡ int getPitMod(int idx)

> ⚡ int getPitTag3d(int idx)

> ⚡ int getPitDamage(int idx)

> ⚡ int getPitInterval(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setPitTag(int idx, int tag)

> ⚡ void setPitMod(int idx, int mod)

> ⚡ void setPitTag3d(int idx, int tag3d)

> ⚡ void setPitDamage(int idx, int dmg)

> ⚡ void setPitInterval(int idx, int inr)

## See Also

---

[Hazard Pit](../mapping-reference-3fe89cb4/hazard-pit-f1db99f7.md)
