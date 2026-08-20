---
title: "core_gettracer"
notion_id: 6bfa7e0cef604f1586aa168e60dcae1f
source: https://www.notion.so/6bfa7e0cef604f1586aa168e60dcae1f
---

# core_gettracer

> ⚡ 
>
> script "core\_gettracer" (int l)

## Usage

---

A script that can be called to get the TID of the calling actor’s `AAPTR_TRACER` actor pointer.

### Parameters

- `l`: bool - If true, logs the returned TID to chat. Useful for debugging!

### Return Value

Returns the TID of the calling actor’s `AAPTR_TRACER` actor pointer.

## See Also

---

[core_getptrtid](./coregetptrtid-bc4f8073.md)

[core_gettarget](./coregettarget-bf294e03.md)

[core_getmaster](./coregetmaster-4d71e571.md)
