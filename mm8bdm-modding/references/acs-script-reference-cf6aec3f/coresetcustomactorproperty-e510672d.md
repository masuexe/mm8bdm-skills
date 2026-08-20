---
title: "core_SetCustomActorProperty"
notion_id: e510672de29d4dfa9445816166a54ede
source: https://www.notion.so/e510672de29d4dfa9445816166a54ede
---

# core_SetCustomActorProperty

> ⚡ script "core\_SetCustomActorProperty" (int pln, int prop, int val)

## Usage

---

Sets the custom actor property value of a given player. Like [`SetActorProperty`](https://zdoom.org/wiki/SetActorProperty) and [`"core_setactorproperty"`](./coresetactorproperty-8ddae68f.md), it is not recommended to use this manually. Instead consider looking into [AProp powerups](../interacting-with-systems-c99b6cab/aprop-powerups-eae6f550.md), which allow usage of this while supporting stacking powerups.

### Parameters

- `pln`: int - The player to manipulate this property on.

- `prop`: int - The custom actor property to manipulate. The following properties are supported:
  - `CAPROP_AirJumpZ`: The speed the actor is launched vertically when air jumping.

  - `CAPROP_WallJumpZ`: The speed the actor is launched vertically when wall jumping.

- `val`: fixed - The value to give to this property.
