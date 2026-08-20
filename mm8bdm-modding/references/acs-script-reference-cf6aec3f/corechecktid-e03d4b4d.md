---
title: "core_checktid"
notion_id: e03d4b4d18934ca3928f7dce474e66e9
source: https://www.notion.so/e03d4b4d18934ca3928f7dce474e66e9
---

# core_checktid

> ⚡ 
>
> script "core\_checktid" (int id, int idMax)

## Usage

---

> 💡 **This script is not intended to be called in code, instead it is a debug script which should be called via using the **[`pukename`](https://zdoom.org/wiki/CCMDs:Debug#pukename:~:text=cannot%20be%20puked.-,pukename,-%3Cscript%3E%20%5Balways%5D%20%5Barg1)** command in console!**

This script allows you to provide a range of TIDs and check if they’ve already been reserved by [DefineReservedTID](../interacting-with-systems-c99b6cab/definereservedtid-0ab62544.md) or [DefineReservedTIDRange](../interacting-with-systems-c99b6cab/definereservedtidrange-187671d5.md).

> 💡 **If puking this script offline, you will need to close the console then reopen it to view the results of the run.**

### Parameters

- `id`: int - The minimum TID to check

- `idMax`: int - The maximum TID to check. If 0 will default to the same as `id`.

## See Also

---

[core_logtids](./corelogtids-b7a53114.md)
