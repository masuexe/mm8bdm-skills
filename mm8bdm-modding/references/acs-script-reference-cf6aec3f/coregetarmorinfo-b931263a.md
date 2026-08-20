---
title: "core_getarmorinfo"
notion_id: b931263ac51242e6b9565194b4d34e6c
source: https://www.notion.so/b931263ac51242e6b9565194b4d34e6c
---

# core_getarmorinfo

> ⚡ script "core\_getarmorinfo" (int info, int ptr)

## Usage

---

This script is a script wrapper for the ACS function, [`GetArmorInfo`](https://zdoom.org/wiki/GetArmorInfo). It will grab information about the armor of the calling player (or an actor pointer of the calling actor that points to a player).

### Parameters

- `info`: int - The info to obtain about the calling actor’s armor. The following options are accepted:
  - `ARMORINFO_CLASSNAME` (0): The class name of the armor. If the player has no armor, the class name will be None.

  - `ARMORINFO_SAVEAMOUNT` (1): The [save amount](https://zdoom.org/wiki/Actor_properties#Armor.SaveAmount) of the armor if the equipped armor is of the [`BasicArmorPickup`](https://zdoom.org/wiki/Classes:BasicArmorPickup) type, the [max save amount](https://zdoom.org/wiki/Actor_properties#Armor.MaxSaveAmount) if it is of the [`BasicArmorBonus`](https://zdoom.org/wiki/Classes:BasicArmorBonus) type. Do note, however, that if the player is already equipped with some sort of armor, this value could change upon picking up `BasicArmorBonus`-derived items whose max save amount is higher than whatever value is currently stored for this info type; the higher of the two values will be the one used, and thus returned.

  - `ARMORINFO_ACTUALSAVEAMOUNT` (2): The save amount of the armor if the equipped armor is of the `BasicArmorPickup` type, the max save amount if it is of the `BasicArmorBonus` type. Unlike `ARMORINFO_SAVEAMOUNT` above, picking up `BasicArmorBonus`-derived items on top of the current armor does not alter the value returned for this info type in any way.

  - `ARMORINFO_SAVEPERCENT` (3): The [save percent](https://zdoom.org/wiki/Actor_properties#Armor.SavePercent) of the armor.

  - `ARMORINFO_MAXABSORB` (4): The [max absorb](https://zdoom.org/wiki/Actor_properties#Armor.MaxAbsorb) of the armor.

  - `ARMORINFO_MAXFULLABSORB` (5): The [max full absorb](https://zdoom.org/wiki/Actor_properties#Armor.MaxFullAbsorb) of the armor.

> ⚡ The constants for `GetArmorInfo` are not defined in DECORATE, so you will have to use the respective integer values above when calling `"core_getarmorinfo"` in DECORATE.

- `ptr`: int - An optional [actor pointer](https://zdoom.org/wiki/Actor_pointer) to use in lieu of the calling player.

### Return Value

Returns the stored value of the specified `info`. 

- For `ARMORINFO_CLASSNAME`, the value is returned as a string. 

- For `ARMORINFO_SAVEAMOUNT`, `ARMORINFO_ACTUALSAVEAMOUNT`, `ARMORINFO_MAXABSORB` and `ARMORINFO_MAXFULLABSORB`, it is returned as an integer. 

- For `ARMORINFO_SAVEPERCENT`, it is returned as a [fixed point](https://zdoom.org/wiki/Fixed_point) value.

## Example

---

This actor is already defined in core and can be given to a player to make their armor bar on their HP bar match the max amount of armor allowed for their armor type.

```c
actor SetDynamicArmorDosage : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 A_GiveInventory("DynamicArmorDosage", CallACS("core_getarmorinfo", 1)) // ARMORINFO_SAVEAMOUNT
			stop
	}
}
```
