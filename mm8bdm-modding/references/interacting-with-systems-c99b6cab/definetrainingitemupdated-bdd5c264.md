---
title: "DefineTrainingItemUpdated"
notion_id: bdd5c2640a704f2dadc5d0f91355b4ef
source: https://www.notion.so/bdd5c2640a704f2dadc5d0f91355b4ef
---

# DefineTrainingItemUpdated

> 📦 DTADD.acs

> ⚡ int DefineTrainingItemUpdated(str version, int type, str tag, str desc, str icon, str actor, int amount)

## Usage

---

This function performs the same role and should be used in the same context as [DefineTrainingItem](./definetrainingitem-753a6d6b.md), but allows you to specify a message indicating the weapon as updated in some version. Base MM8BDM uses this for its updated weapons and items to tell people to check out the new updates.

### Parameters

- `version`: String - This is a string to display after the name of the entry (Ex. `"(v6b)!"`).

- `type`: Int - This refers to the type of entry to add, which corresponds to the area it appears in. The following values are accepted.
  - `DTADD_TRAINING_WEP`: Appears after the Mega Buster but before buster upgrades.

  - `DTADD_TRAINING_BUSTER`: Appears after the weapons but before the Mega Buster.

  - `DTADD_TRAINING_ITEM`: Appears separated and in the category below the weapons.

- `tag`: String - The entry tag's language definition, or its proper name (Ex. `"TAG_ROLLINGCUTTER"` or `"Rolling Cutter"`).

- `desc`: String - The entry description’s language definition, or just the full description (Ex. `"DESC_ROLLINGCUTTER"` or `"Rolling Cutter throws scissors."`).

- `icon`: String - The entry's `SpawnLoop` sprite (Ex. `"WEA2F0"`).

- `actor`: String - The entry's actor name (Ex. `"RollingCutterWep"`). This corresponds to the actor given when the user selects the entry.

- `amount`: Int - The amount of the actor to give to the user when selected.

### Return Value

- Returns the index of the newly added training entry in its respective table

## See Also

---

[DefineTrainingEntry](./definetrainingentry-91396e36.md)

[DefineTrainingEntryUpdated](./definetrainingentryupdated-348c3990.md)

[DefineTrainingItem](./definetrainingitem-753a6d6b.md)

[RegisterTrainingDef](./registertrainingdef-9ebad3a6.md)
