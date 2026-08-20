---
title: "DefineBusterTake"
notion_id: bea07a6a55a54d0f85ad88b74081b38c
source: https://www.notion.so/bea07a6a55a54d0f85ad88b74081b38c
---

# DefineBusterTake

> 📦 DTADD.acs

> ⚡ int DefineBusterTake(str bustertake)

## Usage

---

This function exists to specify an inventory to take away whenever a player uses a Buster Upgrade. Typically, this action is already implicitly done whenever defining a new Buster Upgrade using [DefineBusterUpgradeAndTake](./definebusterupgradeandtake-7767993e.md), however, there are some items that you may want to take which are not Buster Upgrades themselves.

### Parameters

- `bustertake`: String - The weapon actor to remove from the player’s inventory when they use a new Buster Upgrade.

### Return Value

- The index of the newly added buster take.

## Example

---

Below is the one of the few reasonable uses of this function. The Mega Buster does not have an upgrade that can give it, so we must define to take away the Mega Buster when using a Buster Upgrade using this function.

```javascript
DefineBusterTake("MegaBuster");
```

## See Also

---

[DefineBusterUpgradeAndTake](./definebusterupgradeandtake-7767993e.md)

[DefineBusterUpgrade](./definebusterupgrade-022aee6b.md)
