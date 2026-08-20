---
title: "core_changeClientProperty"
notion_id: ded62dd7a42d402a8a06f9c53a40b412
source: https://www.notion.so/ded62dd7a42d402a8a06f9c53a40b412
---

# core_changeClientProperty

> ⚡ script "core\_changeClientProperty" (int prop, int val, int chkptr) CLIENTSIDE

## Usage

---

This script changes a given property to the given value on the activator, and only the person specified by `chkptr` can see the change.

For example, you may want a shield weapon to be fully opaque for everyone except the user… this is how you would do that.

Note that the `val` entry must come as the fixed value you’re targeting, which will require some math on the developer’s end. But it’s a simple multiplication of your decimal number with 65536, as specified in the [data types](../starting-guides-77c9d72f/hello-acs-447542af.md) section of our basic ACS reference.

### Parameters

- `prop`: int - [Actor property](https://zdoom.org/wiki/SetActorProperty) to change.

- `val`: int - The fixed point value of the target value.

- `chkptr`: int - The [actor pointer ](https://zdoom.org/wiki/Actor_pointer)of the person who should see the changed value.

## Example

---

Below is an excerpt from Water Shield which sets the bubble to 0.6 alpha, but only for the user (`AAPTR_TARGET`).

```c
WATS B 0 ACS_NamedExecuteWithResult("core_changeClientProperty", APROP_Alpha, 39321, AAPTR_TARGET) // 0.6 * 65536
```
