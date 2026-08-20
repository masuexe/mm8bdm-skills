---
title: "Buster Takes"
notion_id: 89d30377820347f099ab0bdbda90d956
source: https://www.notion.so/89d30377820347f099ab0bdbda90d956
---

# Buster Takes

> 📦 8BDT.acs

## Usage

---

Stores information about all defined inventory to take when receiving a buster upgrade (Buster Takes). See more info about how to interact with this table at the [tutorial for Buster Upgrades](./creating-buster-upgrades-058630f6.md).

### Static Variables

- `MAX_BUSTERTAKES`: int - Count of stored Buster Takes.

### Fields

- `busterTake`: string - The name of the buster actor to be taken

### Utility Functions

> ⚡ int findBusterTakeByBuster(str take)

- Parameters:
  - `take`: String - the actor name of the buster taken

- Return values:
  - Index of the buster take (starting from 0), if one is found

  - -1 if none is found

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ 
>
> str getBusterTake(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setBusterTake(int idx, str val)

## See Also

---

[Creating Buster Upgrades](./creating-buster-upgrades-058630f6.md)
