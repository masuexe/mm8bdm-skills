---
title: "DefinePowerAprop"
notion_id: 8a721a49007543569731966705075cfc
source: https://www.notion.so/8a721a49007543569731966705075cfc
---

# DefinePowerAprop

> 📦 DTADD.acs

> ⚡ int DefinePowerAprop(str giver, str powerUp, int property, int factor, int permanent)

## Usage

---

Defines an Aprop Powerup to multiply the given property of the actor by factor.

### Parameters

- `giver`: String - the actor name that triggers the AProp Powerup

- `powerUp`: String - the actor name that is used as the timer for the AProp Powerup

- `property`: Int - Which actor property to modify. This function supports the following properties:
  - `APROP_JumpZ`: Jump speed

  - `APROP_Gravity`: Falling speed

  - `APROP_Alpha`: Transparency

  - `APROP_Speed`: Movement speed

  - `APROP_ScaleX`: Horizontal scale

  - `APROP_ScaleY`: Vertical scale

  - `APROP_Friction`: Currently unsupported but reserved for future use.

  - `DTADD_CAPROP_AirJumpZ`: Air jump speed

  - `DTADD_CAPROP_WallJumpZ`: Wall jump speed

- `factor`: Fixed - Fixed point number to multiply the actor’s property by

- `permanent`: bool - Whether the powerup should be considered permanent

### Return Value

- Table index in which the new powerup is stored.

> 💡 **Tip: If an AProp Powerup is marked “permanent,” it’s often a good idea to save the table index so it can be revoked manually. An AProp Powerup marked “permanent” *****does not***** become disabled when the powerup leaves your inventory, so it needs to be removed using the script, **[core_revokeApropPower](../acs-script-reference-cf6aec3f/corerevokeaproppower-6da0c053.md)

## See Also

---

[AProp Powerups](./aprop-powerups-eae6f550.md)
