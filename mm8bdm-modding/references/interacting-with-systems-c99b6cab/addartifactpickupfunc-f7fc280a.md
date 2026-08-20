---
title: "AddArtifactPickupFunc"
notion_id: f7fc280ac41a446395ccf67fd627b35d
source: https://www.notion.so/f7fc280ac41a446395ccf67fd627b35d
---

# AddArtifactPickupFunc

> 📦 DTADD.acs

> ⚡ int AddArtifactPickupFunc(int type, str name)

## Usage

---

Artifact pickup functions are scripts to call when Possession or Terminator’s key item is picked up. Useful for if you have special buffs or effects you want to remove from the carrier of the Circuit Board or Terminator Capsule.

> 💡 **Note: The activator of these scripts is the player who picks up these items, **<u>**not**</u>** the pickups themselves.**

### Parameters

- `type`: int - Which event calls the script
  - `DTADD_PFT_TERMINATOR`: 0 - On Terminator Capsule pickup

  - `DTADD_PFT_POSSESSION`: 1 - On Circuit Board pickup

- `name`: string - Name of the script to run

### Return Value

- Index of the newly added script in the table

## See Also

---

[Hook Functions](./hook-functions-be9ac6f6.md)
