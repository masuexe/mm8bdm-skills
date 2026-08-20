---
title: "core_logtids"
notion_id: b7a531142215472e84a6febfe410815f
source: https://www.notion.so/b7a531142215472e84a6febfe410815f
---

# core_logtids

> ⚡ script "core\_logtids" (void)

## Usage

---

> 💡 **This script is not intended to be called in code, instead it is a debug script which should be called via using the **[`pukename`](https://zdoom.org/wiki/CCMDs:Debug#pukename:~:text=cannot%20be%20puked.-,pukename,-%3Cscript%3E%20%5Balways%5D%20%5Barg1)** command in console!**

This script allows you to view all the TIDs which have been reserved by using [DefineReservedTID](../interacting-with-systems-c99b6cab/definereservedtid-0ab62544.md) or [DefineReservedTIDRange](../interacting-with-systems-c99b6cab/definereservedtidrange-187671d5.md).

It will log the lowest TID, the highest TID, as well as the entire list of TIDs reserved.

> 💡 **If puking this script offline, you will need to close the console then reopen it to view the results of the run.**

## See Also

---

[core_checktid](./corechecktid-e03d4b4d.md)
