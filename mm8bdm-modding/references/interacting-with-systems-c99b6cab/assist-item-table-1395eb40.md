---
title: "Assist Item Table"
notion_id: 1395eb40e5a140789497b85a7060593e
source: https://www.notion.so/1395eb40e5a140789497b85a7060593e
---

# Assist Item Table

> 📦 8BDT.acs

## Usage

---

Stores information about all defined assist items. See more info about how to interact with this table at the tutorial for [assist items](./creating-assist-items-d57d327f.md).

### Static Variables

- `MAX_ITEMS_GLOBAL`: int - Count of stored assist items.

### Fields

- `Tag`: String - The item's language tag, or its proper name (Ex. `"TAG_EDDIE"` or `"Eddie"`)

- `Actor`: String -The actor's class name. (Ex. `"EddieSummon"`)

- `Icon`: String - The icon's spawn sprite. (Ex. `"WEAPQ0"`)

- `Amount`: Int - How many are obtained upon pickup?

- `Group`: Int - The item's group.

- `MapValid`: Bool - Can you pick this item up from maps?

### Utility Functions

> ⚡ int findAssistItemByActor(str actor)

- Parameters:
  - `actor`: String - the actor name of the assist item to search for

- Return values:
  - Index of the assist item (starting from 0), if one is found

  - -1 if none is found

> ⚡ int randomAssistItem(void)

- Return values:
  - Random assist item index from the table.

> ⚡ int randomAssistItemGroup(int group)

- Parameters:
  - `group`: int - expected group to pull the assist item from

> 💡 **Note: For any of these parameters, you may enter -1 if you don’t need to filter by that field.**

- Return values:
  - Index of the weapon (starting from 0), if one is found

  - -1 if the specified criteria does not present a valid option from the table

> ⚡ int randomAssistItemEx(int group, int mapValid)

- Parameters:
  - `group`: int - expected group to pull the assist item from

  - `mapValid`: bool - whether the weapon can spawn on a map

> 💡 **Note: For any of these parameters, you may enter -1 if you don’t need to filter by that field.**

- Return values:
  - Index of the assist item (starting from 0), if one is found

  - -1 if the specified criteria does not present a valid option from the table

> ⚡ int getAssistItemGroupCount(int group)

- Parameters:
  - `group`: int - group to get the count for

- Return values:
  - Amount of assist items in the given group

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ str getAssistItemTag(int idx)

> ⚡ str getAssistItemActor(int idx)

> ⚡ 
>
> str getAssistItemIcon(int idx)

> ⚡ int getAssistItemAmount(int idx)

> ⚡ int getAssistItemGroup(int idx)

> ⚡ int isAssistItemMapValid(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setAssistItemTag(int idx, str val)

> ⚡ void setAssistItemActor(int idx, str val)

> ⚡ void setAssistItemIcon(int idx, str val)

> ⚡ void setAssistItemAmount(int idx, int val)

> ⚡ void setAssistItemGroup(int idx, int val)

> ⚡ void setAssistItemMapValid(int idx, int val)

## See Also

---

[Creating Assist Items](./creating-assist-items-d57d327f.md)
