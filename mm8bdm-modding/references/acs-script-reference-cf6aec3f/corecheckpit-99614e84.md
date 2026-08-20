---
title: "core_checkPit"
notion_id: 99614e843a3b4633a0831aa362c42cc7
source: https://www.notion.so/99614e843a3b4633a0831aa362c42cc7
---

# core_checkPit

> ⚡ script "core\_checkPit" (int tid)

## Usage

---

Checks if the specified actor is above a pit as defined by the mapper.

### Parameters

- `tid`: int - The TID of the actor to check. A TID of 0 specifies the activator of the script instead.

### Return Value

- Returns true if the actor is above a pit, otherwise false.

> 💡 **Note: This function may return unpredictable values for invalid actors or when called on CLIENTSIDE scripts. Be sure to check the actor you’re polling exists and that you’re using this from something with knowledge of the global ACS variables.**

## See Also

---

[core_checkPitByType](./corecheckpitbytype-3c3e7442.md)
