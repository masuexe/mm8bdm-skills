---
title: "Translation Table"
notion_id: d0e135de438340ba94f4027348f04991
source: https://www.notion.so/d0e135de438340ba94f4027348f04991
---

# Translation Table

> 📦 8BDT.acs

## Usage

---

Stores information about all defined translations. See more info about how to interact with this table at the tutorial for [basic](./creating-weapons-bf312efa.md) and [advanced](./advanced-weapons-d87e2f5f.md) weapons.

### Static Variables

- `MAX_TRANS`: int - Count of stored Translation IDs

- `TRANS_LOWEST`: int - Lowest Translation ID

- `TRANS_HIGHEST`: int - Highest Translation ID

### Fields

- `TransId`: int - Translation ID

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ int getTransId(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setTransId(int idx, int val)

## See Also

---

[Creating Weapons](./creating-weapons-bf312efa.md)

[Advanced Weapons](./advanced-weapons-d87e2f5f.md)
