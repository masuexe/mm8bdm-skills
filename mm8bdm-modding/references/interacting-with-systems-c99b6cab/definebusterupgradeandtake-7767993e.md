---
title: "DefineBusterUpgradeAndTake"
notion_id: 7767993e6379464dbd2d5ba4097738b8
source: https://www.notion.so/7767993e6379464dbd2d5ba4097738b8
---

# DefineBusterUpgradeAndTake

> 📦 DTADD.acs

> ⚡ int DefineBusterUpgradeAndTake(str busterTag, str busterActor, str busterUpgradeTag, str busterUpgrade, str busterIcon, bool busterMapValid, bool busterLMSValid, bool busterEddieValid)

## Usage

---

This function defines a new Buster Upgrade for purposes of LMS loadout, map randomization, and Eddie.

It also defines that this Buster Upgrade weapon should be taken whenever the user receives a new Buster Upgrade weapon, hence the “take” part of the function name.

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

## Example

---

This is a block of code that would add Proto Buster to the list of buster upgrades, assuming that it did not already exist which it does already in base MM8BDM.

```javascript
Script "protobuster_busterdef" OPEN {
	DefineBusterUpgradeAndTake("TAG_PROTOBUSTER", "ProtoBuster", "TAG_PROTOUPGRADE", "ProtoUpgrade", "WEA2Q0", true, true, true);
}
```

## See Also

---

[DefineBusterUpgrade](./definebusterupgrade-022aee6b.md)

[DefineBusterTake](./definebustertake-bea07a6a.md)
