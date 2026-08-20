---
title: "core_setcustomstate"
notion_id: 9508fca96bfa48a288571fa774e07ecc
source: https://www.notion.so/9508fca96bfa48a288571fa774e07ecc
---

# core_setcustomstate

> ⚡ script "core\_setcustomstate" (int i)

## Usage

---

This script can be used to change the calling actor’s state to `CustomStateX` where `X` is the value passed for the `i` parameter.

> 🚨 **Although it may be tempting to use this for players as an implementation of custom skin animations, it is not a good idea! This script performs *****no safety checking***** to prevent interrupting pain or even death states! Proceed with caution!**

### Parameters

- `i`: int - This value is appended to `CustomState` to create the final state which is set for the calling actor.

## See Also

---

[core_updatecustomstate](./coreupdatecustomstate-9529446f.md)
