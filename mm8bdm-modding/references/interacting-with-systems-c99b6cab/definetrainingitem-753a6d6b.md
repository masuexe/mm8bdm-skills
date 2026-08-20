---
title: "DefineTrainingItem"
notion_id: 753a6d6b187641608c8ec61e9b26a4fb
source: https://www.notion.so/753a6d6b187641608c8ec61e9b26a4fb
---

# DefineTrainingItem

> 📦 DTADD.acs

> ⚡ 
>
> int DefineTrainingItem(int type, str tag, str desc, str icon, str actor, int amount)

## Usage

---

This function performs the same role and should be used in the same context as [DefineTrainingEntry](./definetrainingentry-91396e36.md), but is a bit more specialized for assist items which may want to give multiple of its actor.

### Parameters

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

[DefineTrainingItemUpdated](./definetrainingitemupdated-bdd5c264.md)

[RegisterTrainingDef](./registertrainingdef-9ebad3a6.md)
