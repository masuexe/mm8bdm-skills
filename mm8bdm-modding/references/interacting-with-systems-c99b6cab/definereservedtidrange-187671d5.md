---
title: "DefineReservedTIDRange"
notion_id: 187671d514a64498a028099e806b862f
source: https://www.notion.so/187671d514a64498a028099e806b862f
---

# DefineReservedTIDRange

> 📦 DTADD.acs

> ⚡ void DefineReservedTIDRange(int tid, int tidMax)

## Usage

---

This function has the same premise as [DefineReservedTID](./definereservedtid-0ab62544.md) but allows the definition of an entire range of reserved TIDs, which is typically a bit more useful.

This range is inclusive, meaning that the first TID specified and the last TID are both included as reserved TIDs.

### Parameters

- `tid`: Int - The beginning of the range to reserve

- `tidMax`: Int - The end of the inclusive range to reserve

## Example

---

TIDs 1000 to 1063 are reserved for player actors so that we can quickly access them at any given time. It would not be good if some random actor got a TID of 1000, because then it might get referred to with the assumption of being a player, hence we reserve those as well.

```javascript
DefineReservedTIDRange(PLN_TID, PLN_TID + MAX_PLAYERS-1); //Player TIDs
```

## See Also

---

[DefineReservedTID](./definereservedtid-0ab62544.md)

[core_uniquetid](../acs-script-reference-cf6aec3f/coreuniquetid-11b52269.md)
