---
title: "Buster Table"
notion_id: 3d14fad152434a17bf2d89a414dae243
source: https://www.notion.so/3d14fad152434a17bf2d89a414dae243
---

# Buster Table

> 📦 8BDT.acs

## Usage

---

Stores information about all Buster Upgrades. See more info about how to interact with this table at the [tutorial for Buster Upgrades](./creating-buster-upgrades-058630f6.md).

### Static Variables

- `MAX_BUSTERUPGRADES`: int - Count of stored Buster Upgrades

### Fields

- `busterTag`: String - The buster's language definition, or its proper name (Ex. `"TAG_PROTOBUSTER"` or `"Proto Buster"`)

- `busterActor`: String - Actor name of the buster weapon. (Ex. `ProtoBuster`)

- `busterUpgradeTag`: String - The buster upgrade's language definition

- `busterUpgrade`: String - Actor name of the buster upgrade pickup. (Ex. `ProtoUpgrade`)

- `busterIcon`: String - The weapon's spawn sprite. (Ex. `"WEA2Q0"`)

- `busterMapValid`: Bool - Can you pick this weapon up from maps?

- `busterLMSValid`: Bool - Can you get this buster up in LMS?

- `busterEddieValid`: Bool - Can you get this buster upgrade from Eddie?

### Utility Functions

> ⚡ int findBusterUpgradeByActor(str act)

- Parameters:
  - `act`: String - the actor name of the buster weapon

- Return values:
  - Index of the buster weapon (starting from 0), if one is found

  - -1 if none is found

> ⚡ int findBusterUpgradeByUpgrade(str upgrade)

- Parameters:
  - `upgrade`: String - the actor name of the buster upgrade

- Return values:
  - Index of the buster upgrade (starting from 0), if one is found

  - -1 if none is found

> ⚡ int randomBusterUpgrade()

- Parameters:
  - `upgrade`: String - the actor name of the buster upgrade

- Return values:
  - Index of the buster upgrade (starting from 0), if one is found

  - -1 if none is found

> ⚡ int randomBusterUpgradeEx(int mapValid, int LMSValid, int eddieValid)

- Parameters:
  - `mapValid`: bool - whether the buster can spawn on a map

  - `LMSValid`: bool - whether the buster can appear in LMS

  - `eddieValid`: bool - whether the buster can be dropped by Eddie

> 💡 
>
> **Note: For any of these parameters, you may enter -1 if you don’t need to filter by that field.**

- Return values:
  - Index of the weapon (starting from 0), if one is found

  - -1 if the specified criteria does not present a valid option from the table

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ str getBusterTag(int idx)

> ⚡ 
>
> str getBusterActor(int idx)

> ⚡ str getBusterUpgradeTag(int idx)

> ⚡ 
>
> str getBusterUpgrade(int idx)

> ⚡ str getBusterIcon(int idx)

> ⚡ bool isBusterMapValid(int idx)

> ⚡ bool isBusterLMSValid(int idx)

> ⚡ bool isBusterEddieValid(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setBusterTag(int idx, str val)

> ⚡ void setBusterActor(int idx, str val)

> ⚡ void setBusterUpgradeTag(int idx, str val)

> ⚡ void setBusterUpgrade(int idx, str val)

> ⚡ void setBusterIcon(int idx, str val)

> ⚡ void setBusterMapValid(int idx, bool val)

> ⚡ void setBusterLMSValid(int idx, bool val)

> ⚡ void setBusterEddieValid(int idx, bool val)

## See Also

---

[Creating Buster Upgrades](./creating-buster-upgrades-058630f6.md)
