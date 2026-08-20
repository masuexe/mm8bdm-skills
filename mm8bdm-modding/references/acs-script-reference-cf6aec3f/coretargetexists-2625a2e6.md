---
title: "core_targetexists"
notion_id: 2625a2e69eb54e05a37b0b5a7c50d815
source: https://www.notion.so/2625a2e69eb54e05a37b0b5a7c50d815
---

# core_targetexists

> ⚡ 
>
> script "core\_targetexists" (int tracer, int noTID)

## Usage

---

This is a script that can be called by projectiles to check if their target pointer spectated, disconnected, or is dead.

### Parameters

- `tracer`: bool - When toggled, this swaps the checked actor pointer to `AAPTR_TRACER`.

- `noTID`: bool - By default, this script will require the target / tracer to have a TID to be counted as alive, toggling this disables that check. 

### Return Value

Returns true if the target / tracer player is still valid, false otherwise.
