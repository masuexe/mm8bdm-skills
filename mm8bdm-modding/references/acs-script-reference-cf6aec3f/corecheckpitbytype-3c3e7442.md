---
title: "core_checkPitByType"
notion_id: 3c3e7442f12a43f8b18b1aeed55fe741
source: https://www.notion.so/3c3e7442f12a43f8b18b1aeed55fe741
---

# core_checkPitByType

> ⚡ script "core\_checkPitByType" (int type, int tid)

## Usage

---

Checks if the specified actor is above a pit of a specific type as defined by the mapper.

### Parameters

- `type`: int - The type of pit to check for. Supported values include the following:
  - `MOD_WATER` (12)

  - `MOD_SLIME` (13)

  - `MOD_LAVA` (14)

  - `MOD_CRUSH` (15)

  - `MOD_FALLING` (17)

  - `MOD_EXIT` (20)

  - `MOD_ICE` (24)

  - `MOD_MASSACRE` (1000)

- `tid`: int - The TID of the actor to check. A TID of 0 specifies the activator of the script instead.

### Return Value

- Returns true if the actor is above a pit, otherwise false.

> 💡 **Note: This function may return unpredictable values for invalid actors or when called on CLIENTSIDE scripts. Be sure to check the actor you’re polling exists and that you’re using this from something with knowledge of the global ACS variables.**

## See Also

---

[core_checkPit](./corecheckpit-99614e84.md)
