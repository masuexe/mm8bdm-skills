---
title: "core_GetPtrPitch"
notion_id: ac14affe5ab24c95819512fa93d9e595
source: https://www.notion.so/ac14affe5ab24c95819512fa93d9e595
---

# core_GetPtrPitch

> ⚡ script "core\_GetPtrPitch" (int ptr, int tid, int fixed)

## Usage

---

This script can be used to get the pitch of a TID or any of its actor pointers, either as a degree or a [fixed point angle](https://zdoom.org/wiki/Definitions#:~:text=224%0ASoutheast-,Fixed%20point%20angles,-These%20angles%20are).

### Parameters

- `ptr`: int - The actor pointer to grab the pitch of. Use `AAPTR_DEFAULT` to specify the TID itself.

- `tid`: int - The TID to use for getting the pitch. Use 0 to mean the calling actor.

- `fixed`: bool - If true, returns the pitch as a fixed point angle instead of degree.

### Return Value

Returns the pitch as the specified type.
