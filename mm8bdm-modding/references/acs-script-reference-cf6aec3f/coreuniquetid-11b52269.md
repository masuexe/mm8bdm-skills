---
title: "core_uniquetid"
notion_id: 11b52269a2ac4543a5ea826465deed46
source: https://www.notion.so/11b52269a2ac4543a5ea826465deed46
---

# core_uniquetid

> ⚡ script "core\_uniquetid" (int start, int limit)

## Usage

---

This script is a wrapper for [`UniqueTID`](https://zdoom.org/wiki/UniqueTID) which will dodge any TIDs which have already been reserved for long term use by [DefineReservedTID](../interacting-with-systems-c99b6cab/definereservedtid-0ab62544.md) and [DefineReservedTIDRange](../interacting-with-systems-c99b6cab/definereservedtidrange-187671d5.md).

> 🚨 **This script can be a bit intensive when spammed, so for best practices, this should only be used for TIDs which need to exist for longer than 1 tic, be created relatively infrequently, but still need to be guaranteed unique.  
>   
> If this is not the case, you may want to consider using **[core_NewUniqueTID](./corenewuniquetid-042826a8.md)** instead!**

### Parameters

- `start`: int - Starting value from which to check. If non-zero, then it checks TIDs one-by-one, starting here until it finds a free one. If zero, then it returns a completely random TID.

- `limit`: int - Specifies the number of attempts to make to find a free TID. If `limit` is non-zero, then it will only check that many times for a free TID, so it might not find a free one. If no free TID is found, 0 is returned. If `limit` is zero, then the search is effectively unlimited.

### Return Value

Returns a unique TID which can be used long term.

## See Also

---

[core_NewUniqueTID](./corenewuniquetid-042826a8.md)
