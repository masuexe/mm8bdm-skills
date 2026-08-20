---
title: "core_getactorx"
notion_id: 3572b91ab2894cc3902cab618341a6c8
source: https://www.notion.so/3572b91ab2894cc3902cab618341a6c8
---

# core_getactorx

> ⚡ script "core\_getactorx" (int pointer, int tid, int fixed)

## Usage

---

Returns the X coordinate position of a selected actor.

### Parameters

- `pointer`: int - An optional [actor pointer](https://zdoom.org/wiki/Actor_pointer) to use in lieu of the TID.

- `tid`: int - The TID of the actor (or basis actor for an actor pointer) to get position of.

- `fixed`: bool - If toggled, will return the value as a [fixed point number](https://zdoom.org/wiki/Fixed_point_number).

### Return Value

Returns the X coordinate position of the selected actor.

## See Also

---

[core_getactory](./coregetactory-01e0a411.md)

[core_getactorz](./coregetactorz-07f6e7a5.md)
