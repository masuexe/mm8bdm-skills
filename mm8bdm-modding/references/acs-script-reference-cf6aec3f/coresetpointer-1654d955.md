---
title: "core_setpointer"
notion_id: 1654d955d1624bcb9d710eb9678d4afe
source: https://www.notion.so/1654d955d1624bcb9d710eb9678d4afe
---

# core_setpointer

> ⚡ script "core\_setpointer" (int assign\_slot, int tid, int pointer\_selector)

## Usage

---

This script is a script wrapper for the ACS function [`SetPointer`](https://zdoom.org/wiki/SetPointer).

### Parameters

- `assign_slot`: int - The actor pointer field to assign to.

- `tid`: int - The TID of the actor that the new actor pointer will point to.

- `pointer_selector`: int - If an actor pointer is specified in this field, the final actor used for assignment will be the TID’s actor pointer specified by this field.

## See Also

---

[core_setTIDsPointerToThis](./coresettidspointertothis-8496d0cd.md)
