---
title: "core_compareptr"
notion_id: bce0addcb5b54ec0932c24158c14b83a
source: https://www.notion.so/bce0addcb5b54ec0932c24158c14b83a
---

# core_compareptr

> ⚡ 
>
> script "core\_compareptr" (int ptr1, int ptr2)

## Usage

---

This script can be called to see if two of the calling actor’s actor pointers point to the same actor (and don’t point to `AAPTR_NULL`).

### Parameters

- `ptr1`: int - The first actor pointer to use for comparison.

- `ptr2`: int - The second actor pointer to use for comparison.

### Return Value

Returns true if the two actor pointers point to the same actor, false otherwise.
