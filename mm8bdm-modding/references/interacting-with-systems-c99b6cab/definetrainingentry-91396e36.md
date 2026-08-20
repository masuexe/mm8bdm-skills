---
title: "DefineTrainingEntry"
notion_id: 91396e36f8e1479d90e107461142973a
source: https://www.notion.so/91396e36f8e1479d90e107461142973a
---

# DefineTrainingEntry

> 📦 DTADD.acs

> ⚡ int DefineTrainingEntry(int type, str tag, str desc, str icon, str actor)

## Usage

---

This is a function that will actually add a weapon or item to the list of entries for the training room. This function should *not* be called in any script that occurs on `OPEN`, `OPEN CLIENTSIDE`, or anything of the sort. It should only be called in scripts that are being called from [RegisterTrainingDef](./registertrainingdef-9ebad3a6.md).

### Parameters

- `type`: Int - This refers to the type of entry to add, which corresponds to the area it appears in. The following values are accepted.
  - `DTADD_TRAINING_WEP`: Appears after the Mega Buster but before buster upgrades.

  - `DTADD_TRAINING_BUSTER`: Appears after the weapons but before the Mega Buster.

  - `DTADD_TRAINING_ITEM`: Appears separated and in the category below the weapons.

- `tag`: String - The entry tag's language definition, or its proper name (Ex. `"TAG_ROLLINGCUTTER"` or `"Rolling Cutter"`).

- `desc`: String - The entry description’s language definition, or just the full description (Ex. `"DESC_ROLLINGCUTTER"` or `"Rolling Cutter throws scissors."`).

- `icon`: String - The entry's `SpawnLoop` sprite (Ex. `"WEA2F0"`).

- `actor`: String - The entry's actor name (Ex. `"RollingCutterWep"`). This corresponds to the actor given when the user selects the entry.

### Return Value

- Returns the index of the newly added training entry in its respective table

## Example

---

This function shows how you would use this function alongside its closely related [RegisterTrainingDef](./registertrainingdef-9ebad3a6.md) function.

```javascript
script "sparkscatter_definetraining" (void) {
	DefineTrainingEntry(DTADD_TRAINING_WEP, "TAG_SPARKSCATTER", "DESC_SPARKSCATTER", "SKSTA0", "SparkScatterWep");
}

script "sparkscatter_definesetup" OPEN {
	RegisterTrainingDef("sparkscatter_definetraining");
}
```

## See Also

---

[DefineTrainingEntryUpdated](./definetrainingentryupdated-348c3990.md)

[DefineTrainingItem](./definetrainingitem-753a6d6b.md)

[DefineTrainingItemUpdated](./definetrainingitemupdated-bdd5c264.md)

[RegisterTrainingDef](./registertrainingdef-9ebad3a6.md)
