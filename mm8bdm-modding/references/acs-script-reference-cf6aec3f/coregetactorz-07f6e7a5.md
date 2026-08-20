---
title: "core_getactorz"
notion_id: 07f6e7a59bd74f8db5d7a1a5b0c730ef
source: https://www.notion.so/07f6e7a59bd74f8db5d7a1a5b0c730ef
---

# core_getactorz

> ⚡ script "core\_getactorz" (int pointer, int tid, int fixed)

## Usage

---

Returns the Z coordinate position of a selected actor.

### Parameters

- `pointer`: int - An optional [actor pointer](https://zdoom.org/wiki/Actor_pointer) to use in lieu of the TID.

- `tid`: int - The TID of the actor (or basis actor for an actor pointer) to get position of.

- `fixed`: bool - If toggled, will return the value as a [fixed point number](https://zdoom.org/wiki/Fixed_point_number).

### Return Value

Returns the Z coordinate position of the selected actor.

## See Also

---

[core_getactorx](./coregetactorx-3572b91a.md)

[core_getactory](./coregetactory-01e0a411.md)
