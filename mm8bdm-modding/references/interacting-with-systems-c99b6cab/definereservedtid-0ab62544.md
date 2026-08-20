---
title: "DefineReservedTID"
notion_id: 0ab6254422214b33a2c08eb5d27bb87b
source: https://www.notion.so/0ab6254422214b33a2c08eb5d27bb87b
---

# DefineReservedTID

> 📦 DTADD.acs

> ⚡ void DefineReservedTID(int tid)

## Usage

---

[core_uniquetid](../acs-script-reference-cf6aec3f/coreuniquetid-11b52269.md) is a script that will return to the caller a long-term, unique TID value that can be used for ACS operations. However, for that to be a guaranteed unique, long-term TID, it has to check through a list of reserved TID values.

This function is used to add specific TIDs to that list of reserved ones, which can also be seen by using the debug scripts, [core_checktid](../acs-script-reference-cf6aec3f/corechecktid-e03d4b4d.md) and [core_logtids](../acs-script-reference-cf6aec3f/corelogtids-b7a53114.md).

### Parameters

- `tid`: Int - The TID to reserve so that it cannot be given by our unique TID script.

## Example

---

Base MM8BDM reserves TID 999 for actors that should color change alongside the player. It would not be good if an actor got tried getting a unique TID and got 999, hence we reserve it and block it from giving such.

```javascript
DefineReservedTID(999); // Mirror console player's translation
```

## See Also

---

[DefineReservedTIDRange](./definereservedtidrange-187671d5.md)

[core_uniquetid](../acs-script-reference-cf6aec3f/coreuniquetid-11b52269.md)
