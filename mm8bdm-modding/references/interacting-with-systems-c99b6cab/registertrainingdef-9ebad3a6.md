---
title: "RegisterTrainingDef"
notion_id: 9ebad3a68c7f46b99c65a37d0d59257b
source: https://www.notion.so/9ebad3a68c7f46b99c65a37d0d59257b
---

# RegisterTrainingDef

> 📦 DTADD.acs

> ⚡ int RegisterTrainingDef(str callee)

## Usage

---

This function is used to define a new script to be called whenever the training room initializes its set of provided weapons and items.

### Parameters

- `Script`: String - The script to add to a list of scripts to execute for the goal of creating all training room entries.

### Return Value

- The index of the newly added script in the table of training room scripts

## Example

---

This function shows how you would use this function alongside its closely related [DefineTrainingEntry](./definetrainingentry-91396e36.md) function.

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

[DefineTrainingEntry](./definetrainingentry-91396e36.md)

[DefineTrainingEntryUpdated](./definetrainingentryupdated-348c3990.md)

[DefineTrainingItem](./definetrainingitem-753a6d6b.md)

[DefineTrainingItemUpdated](./definetrainingitemupdated-bdd5c264.md)
