---
title: "core_getactorproperty"
notion_id: a48484e9e41949418850e41998b323ee
source: https://www.notion.so/a48484e9e41949418850e41998b323ee
---

# core_getactorproperty

> ⚡ script "core\_getactorproperty" (int tid, int prop, int type)

## Usage

---

Returns the value of the given actor property for the given TID, in the given format. This is meant to be called from DECORATE, which has different numerical storage from ACS.

### Parameters

- `tid`: int - The TID of the target actor. 0 for yourself.

- `prop`: int - The [actor property](https://zdoom.org/wiki/SetActorProperty) to get. 

- `type`: int - The data type to convert the output to before returning
  - `DATATYPE_RAW` - Return whatever value is stored in the property field, regardless of type.

  - `DATATYPE_INT` - Convert the value stored in the property field into an integer.

### Return Value

The value stored in the property for the given TID.

## Example

---

Oil Slider uses this function to get the `APROP_JumpZ` of the user to apply to the aerial jump.

```c
OILL A 0 A_ChangeVelocity(momx, momy, CallACS("core_getactorproperty", 0, APROP_JumpZ, DATATYPE_RAW) / 65536.0, CVF_REPLACE)
```
