---
title: "PowerAProp Table"
notion_id: 40cbb344d32d4d70b9c39d590c5e71be
source: https://www.notion.so/40cbb344d32d4d70b9c39d590c5e71be
---

# PowerAProp Table

> 📦 8BDT.acs

## Usage

---

Stores information about all defined AProp Powerups. See more info about how to interact with this table at the [tutorial for AProp Powerups](./aprop-powerups-eae6f550.md).

### Static Variables

- `MAX_POWER_PROPERTY`: Count of all stored AProp Powers.

### Fields

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

### Utility Functions

> ⚡ int findPowerApropByGiver(str act)

- Parameters:
  - `act`: String - the actor name that triggers the AProp Powerup

- Return values:
  - Index of the power aprop (starting from 0), if one is found

  - -1 if none is found

> ⚡ int getPlayerDefaultProperty(int pln, int prop)

- Parameters:
  - `pln`: int - Player number of the player to check

  - `prop`: int - Which [property](./poweraprop-table-40cbb344.md) to check

- Return values:
  - Fixed point value of the property, if the player has a value

  - -1 if the property is invalid

> 💡 **Note: This function may return unpredictable values for invalid players. Be sure to check the player you’re polling is in the server and playing.**

> ⚡ void setPlayerDefaultProperty(int pln, int prop, int val)

- Parameters:
  - `pln`: int - Player number of the player to check

  - `prop`: int - Which [property](./poweraprop-table-40cbb344.md) to check

  - `val`: fixed - The new value to set the default property to, not the active property.

> 💡 **Note: This has to be used in conjunction with something such as **`SetActorProperty`** if attempting to change an actor’s current property! It is recommended still to instead use **[AProp Powerups](./aprop-powerups-eae6f550.md)**, but there are instances where this function is useful. **

### Getters

Each of the following returns the value of their given property, given a table index.

> ⚡ str getPowerApropGiver(int idx)

> ⚡ str getPowerApropPowerUp(int idx)

> ⚡ int getPowerApropProperty(int idx)

> ⚡ int getPowerApropFactor(int idx)

> ⚡ int isPowerApropPermanent(int idx)

### Setters

Each of the following changes the value of their given property, given a table index.

> ⚡ void setPowerApropGiver(int idx, str val)

> ⚡ void setPowerApropPowerUp(int idx, str val)

> ⚡ void setPowerApropProperty(int idx, int val)

> ⚡ void setPowerApropFactor(int idx, int val)

> ⚡ void setPowerApropPermanent(int idx, int val)

## See Also

---

[AProp Powerups](./aprop-powerups-eae6f550.md)
