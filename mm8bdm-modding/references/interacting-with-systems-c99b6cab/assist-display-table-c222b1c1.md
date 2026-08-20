---
title: "Assist Display Table"
notion_id: c222b1c14ee64ef6a2ab495a86094d6f
source: https://www.notion.so/c222b1c14ee64ef6a2ab495a86094d6f
---

# Assist Display Table

> 📦 8BDT.acs

## Usage

---

Stores a list of scripts to execute every tic on the client for purposes of displaying assists and other graphics. See more info about how to interact with this table at the [tutorial for advanced weapons](./advanced-weapons-d87e2f5f.md) and the [tutorial for assist items](./creating-assist-items-d57d327f.md).

### Static Variables

- `MAX_ASSISTD`: int - Count of stored Assist Displays.

### Fields

- `assistScript`: string - Name of the script for the assist display function

### Utility Functions

> ⚡ int findAssistByScript(str scr)

- Parameters:
  - `scr`: String - name of the assist display script

- Return values:
  - Index of the assist script (starting from 0), if one is found

  - -1 if none is found

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ int str getAssistScript(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setAssistScript(int idx, str val)

## See Also

---

[Advanced Weapons](./advanced-weapons-d87e2f5f.md)

[Creating Assist Items](./creating-assist-items-d57d327f.md)
