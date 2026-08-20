---
title: "core_gettarget"
notion_id: bf294e03e5f6438daf8518a36e97e131
source: https://www.notion.so/bf294e03e5f6438daf8518a36e97e131
---

# core_gettarget

> ⚡ script "core\_gettarget" (int l, int pln)

## Usage

---

A script that can be called to get the TID of the calling actor’s `AAPTR_TARGET` actor pointer.

### Parameters

- `l`: bool - If true, logs the returned TID to chat. Useful for debugging!

- `pln`: bool - If true, will instead return a player number instead.

### Return Value

Returns the TID / player number of the calling actor’s `AAPTR_TARGET` actor pointer.

## See Also

---

[core_getptrtid](./coregetptrtid-bc4f8073.md)

[core_gettracer](./coregettracer-6bfa7e0c.md)

[core_getmaster](./coregetmaster-4d71e571.md)
