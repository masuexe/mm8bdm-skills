---
title: "DefineBusterUpgrade"
notion_id: 022aee6b3b9443fc85f6e875949dba37
source: https://www.notion.so/022aee6b3b9443fc85f6e875949dba37
---

# DefineBusterUpgrade

> 📦 DTADD.acs

> ⚡ int DefineBusterUpgrade(str busterTag, str busterActor, str busterUpgradeTag, str busterUpgrade, str busterIcon, bool busterMapValid, bool busterLMSValid, bool busterEddieValid)

## Usage

---

This defines a new Buster Upgrade like [DefineBusterUpgradeAndTake](./definebusterupgradeandtake-7767993e.md) but does not add it to the list of weapons to be taken whenever using a new Buster Upgrade. This function is really not recommended to be used for that reason, it only exists as an intermediate function for the proper function, [DefineBusterUpgradeAndTake](./definebusterupgradeandtake-7767993e.md). 

### Parameters

- `busterTag`: String - The buster's language definition, or its proper name (Ex. `"TAG_PROTOBUSTER"` or `"Proto Buster"`)

- `busterActor`: String - Actor name of the buster weapon. (Ex. `ProtoBuster`).

- `busterUpgradeTag`: String - The Buster Upgrade's language definition (Ex. `"TAG_PROTOUPGRADE"` or `"Proto Upgrade"`)

- `busterUpgrade`: String - Actor name of the Buster Upgrade pickup. (Ex. `ProtoUpgrade`)

- `busterIcon`: String - The weapon's spawn sprite. (Ex. `"WEA2Q0"`)

- `busterMapValid`: Bool - Can you pick this Buster Upgrade from maps?

- `busterLMSValid`: Bool - Can you get this Buster Upgrade in LMS?

- `busterEddieValid`: Bool - Can you get this Buster Upgrade from Eddie?

### Return Value

- Returns the index of the newly added Buster Upgrade in the Buster Upgrades table.

## See Also

---

[DefineBusterUpgradeAndTake](./definebusterupgradeandtake-7767993e.md)

[DefineBusterTake](./definebustertake-bea07a6a.md)
