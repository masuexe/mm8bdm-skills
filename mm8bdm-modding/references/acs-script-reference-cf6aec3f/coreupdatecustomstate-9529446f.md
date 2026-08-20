---
title: "core_updatecustomstate"
notion_id: 9529446f5567442691bbcde498e8ff33
source: https://www.notion.so/9529446f5567442691bbcde498e8ff33
---

# core_updatecustomstate

> ⚡ script "core\_updatecustomstate" (int i)

## Usage

---

Much like [core_setcustomstate](./coresetcustomstate-9508fca9.md), This script can be used to change the calling actor’s state to `CustomStateX` where `X` is the value passed for the `i` parameter.

However, this script will also store the previously set custom state on the actor and will only perform subsequent updates if the new state is different than the last.

> 🚨 **Although it may be tempting to use this for players as an implementation of custom skin animations, it is not a good idea! This script performs *****no safety checking***** to prevent interrupting pain or even death states! Proceed with caution!**

### Parameters

- `i`: int - This value is appended to `CustomState` to create the final state which is set for the calling actor. For this script, it must be a positive value to have meaningful effect!

## See Also

---

[core_count_customstateflag](./corecountcustomstateflag-9ac6f1c4.md)

[core_set_customstateflag](./coresetcustomstateflag-f7cd58de.md)

[core_setcustomstate](./coresetcustomstate-9508fca9.md)
