---
title: "AProp Powerups"
notion_id: eae6f55089314b51bb15740d05c96fee
source: https://www.notion.so/eae6f55089314b51bb15740d05c96fee
---

# AProp Powerups

---

> ⚠️ **Warning: Before beginning this tutorial, you should already be familiar with the **[**DECORATE**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** and **[**ACS**](../starting-guides-77c9d72f/hello-acs-447542af.md)** languages.**

Some actor properties are floating point numbers and must be modified *multiplicatively* in order for multiple effects to impact the same property.

The engine handles certain effects like this automatically, such as [`PowerSpeed`](https://zdoom.org/wiki/Classes:PowerSpeed) or [`PowerDamage`](https://zdoom.org/wiki/Classes:PowerDamage). However, not all features you may want to modify are supported for us, or situations where supported properties can’t be modified due to complications such as morphs. This is where AProp Powerups come in.

AProp Powerups support the following actor properties:

- `APROP_JumpZ`: The speed the actor is launched vertically when jumping.

- `APROP_Gravity`: How quickly the actor accelerates downwards while airborne.

- `APROP_Alpha`: Translucency of the actor.

- `APROP_Speed`: How quickly the actor moves.

- `APROP_ScaleX`: How much the actor is horizontally scaled.

- `APROP_ScaleY`: How much the actor is vertically scaled.

- `APROP_Friction`: Currently unsupported but reserved for future use.

The following custom actor properties are also supported. These actor properties are accessed using [core_SetCustomActorProperty](../acs-script-reference-cf6aec3f/coresetcustomactorproperty-e510672d.md) and [core_GetCustomActorProperty](../acs-script-reference-cf6aec3f/coregetcustomactorproperty-906cf910.md).

- `CAPROP_AirJumpZ`: The speed the actor is launched vertically when air jumping.

- `CAPROP_WallJumpZ`: The speed the actor is launched vertically when wall jumping.

## Creating an AProp Powerup

---

To create an AProp Powerup, you need some code in DECORATE and ACS.  
in DECORATE, you need to define two actors: a powerup giver and the powerup itself. These actors are only really used as triggers for the scripts they run, so they require minimal information, but they should exist regardless.

```c
actor MushJumpPowerGiver : PowerApropGiver {}
actor MushJumpPower : PowerUp
{ 
	+INVENTORY.ALWAYSPICKUP 
	powerup.duration -20 
}

actor MushGravPowerGiver : PowerApropGiver {}
actor MushGravPower : PowerUp 
{ 
	+INVENTORY.ALWAYSPICKUP 
	powerup.duration -20 
}

actor MushHeightPowerGiver : PowerApropGiver {}
actor MushHeightPower : PowerUp
{ 
	+INVENTORY.ALWAYSPICKUP 
	powerup.duration -20 
}
```

The first actor inherits from `PowerApropGiver`, the second inherits from `PowerUp`. Be sure to specify the time limit in the [`powerup.duration`](https://zdoom.org/wiki/Classes:Powerup#Powerup.Duration). As with normal powerups, using [`+INVENTORY.ALWAYSPICKUP`](https://zdoom.org/wiki/Inventory_flags#INVENTORY.ALWAYSPICKUP) allows the duration to be reset if the powerup is given again within the initial duration.

Next, you need to use ACS to tell the game what property the powerup is going to effect. This is done with the function [DefinePowerAprop](./definepoweraprop-8a721a49.md) from `DTADD.acs`. `MushJumpPower` will cause the player to jump higher, `MushGravityPower` will make the player floatier, and `MushHeightPower` will make them slightly taller. Let’s specify that:

```dart
#library "WERDMUSH"
#include "zcommon.acs"

#include "DTADD.acs"

script "weirdmushroom_aproppowers" OPEN
{
    // str giver, str powerUp, int property, int factor, int permanent
    DefinePowerAprop("MushJumpPowerGiver", "MushJumpPower", APROP_JumpZ, 1.2, NO);
    DefinePowerAprop("MushGravPowerGiver", "MushGravPower", APROP_Gravity, 0.7, NO);
    DefinePowerAprop("MushHeightPowerGiver", "MushHeightPower", APROP_ScaleY, 1.2, NO);
}
```

Above, this code tells the game that `MushJumpPowerGiver` will give `MushJumpPower`, and while the actor given that has it, they have 1.2x jump speed. The same for `MushGravPowerGiver` and `MushGravPower` giving the player 0.7x gravity and `MushHeightPowerGiver` and `MushHeightPower` making the player appear to be 1.2x taller.

> 💡 **Tip: Note that any combination of **`APROP_Alpha`** AProp powerups cannot make a player less than 0.25 alpha for their allies or spectators. If this behavior is desired, consider using **[`"core_invisibleplayer"`](../acs-script-reference-cf6aec3f/property-stackers-0e63b9b2.md)** instead.**

## Example File

---

[v6b-WeirdMushroom-v1f.pk3](../assets/81c0174f13e34dceaf1b558f271fd048-v6b-WeirdMushroom-v1f.pk3)

## See Also

---

[DefinePowerAprop](./definepoweraprop-8a721a49.md)

[core_revokeApropPower](../acs-script-reference-cf6aec3f/corerevokeaproppower-6da0c053.md)

[PowerAProp Table](./poweraprop-table-40cbb344.md)
