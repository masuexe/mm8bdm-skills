---
title: "core_GetCustomActorProperty"
notion_id: 906cf910277c4895b70aa2914270e675
source: https://www.notion.so/906cf910277c4895b70aa2914270e675
---

# core_GetCustomActorProperty

> ⚡ script "core\_GetCustomActorProperty" (int pln, int prop)

## Usage

---

Gets the custom actor property value of a given player. This is mainly used to grab the air jump and wall jump speed of players.

### Parameters

- `pln`: int - The player to access this property on.

- `prop`: int - The custom actor property to access. The following properties are supported:
  - `CAPROP_AirJumpZ`: The speed the actor is launched vertically when air jumping.

  - `CAPROP_WallJumpZ`: The speed the actor is launched vertically when wall jumping.

### Return Value

- Fixed point value of the property accessed.

> 💡 **Note: This function may return unpredictable values for invalid players or when called on CLIENTSIDE scripts. Be sure to check the player you’re polling is in the server and playing and that you’re using this from something with knowledge of the global ACS variables.**
