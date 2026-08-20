---
title: "ClassBase"
notion_id: c7f9de443745462fb5e8ce150e28eaab
source: https://www.notion.so/c7f9de443745462fb5e8ce150e28eaab
---

# ClassBase

---

`ClassBase` is an actor which all classes that wish to use normal weapons that inherit from [BaseMM8BDMWep](./basemm8bdmwep-8cc600ca.md) should inherit from.

This actor extends across multiple files and includes multiple systems, so it is not feasible to post its code in one block on this page.

## Custom Properties

The following are inventory flags which can be given to the class as a start item to disable certain behaviors.

- `NoTeamTranslation`: Disables team colors on the class’s actor.

- `NoWeaponTranslation`: Disables [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) changing actor color entirely.

- `NoWeaponSwitchSound`: Disables [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) playing a weapon swap sound entirely.

- `NoProjectileTeamTranslation`: Disables team colors on the class’s projectiles.

- `NoBusterUpgrades`: Disables the class from being able to pick up buster upgrades.

## HUD Properties

These flags disable certain HUD elements for a class.

- `NoHud`: Disables drawing the HUD of the class actor entirely.

- `NoHealthBar`: Disables drawing the health bar.

- `NoTeamFlag`: Disables drawing the team flag which shows in team modes.

- `NoDrawMaestroMugshot`: Disables drawing the base mugshot.

- `NoDrawScoreIcon`: Disables drawing a class’s score icon property.

- `NoDrawFaceMugshot`: Disables drawing a class’s face or skin face property.

### Air and Wall Jump Properties

These flags are specific to the air jump and wall jump systems

- `AirJumpLimit`: Determines how many air jumps the class has access to.
  - `AirJumpZ`: Specifies the whole number portion of how high their air jumps are

  - `AirJumpZDecimal`: Specifies the decimal portion of how high their air jumps are (Ex. 5 `AirJumpz` and 500 `AirJumpZDecimal` makes a final value of 5.0500 `CAPROP_AirJumpZ`

- `InfiniteAirJumps`: Gives infinite air jumps

- `DisabledAirJumps`: Disables air jumps, even if the class is at some point given some.

- `WallJumpLimit`: Determines how many wall jumps the class has access to.
  - `WallJumpZ`: Specifies the whole number portion of how high their wall jumps are

  - `WallJumpZDecimal`: Species the decimal portion of how high their wall jumps are (Ex. 5 `WallJumpz` and 500 `WallJumpZDecimal` makes a final value of 5.0500 `CAPROP_WallJumpZ`

- `InfiniteWallJumps`: Gives infinite wall jumps

- `DisabledWallJumps`: Disables wall jumps, even if the class is at some point given some.

### LMS Loadout Properties

These flags are only applicable if the class is also receiving `ModeWeps`.

This set of flags allows the class to obtain a slot of weapons even if the server variable for it is disabled.

- `AlwaysReceiveLMSAoE`

- `AlwaysReceiveLMSBuster`

- `AlwaysReceiveLMSRapid`

- `AlwaysReceiveLMSClose`

- `AlwaysReceiveLMSPower`

- `AlwaysReceiveLMSShield`

This set of flags disables a class from obtaining a slot of weapons, regardless of server setting.

- `NeverReceiveLMSAoE`

- `NeverReceiveLMSBuster`

- `NeverReceiveLMSRapid`

- `NeverReceiveLMSRanged`

- `NeverReceiveLMSClose`

- `NeverReceiveLMSPower`

- `NeverReceiveLMSShield`

## Example

---

This is an example Megaman? class which would be functionally identical to the base class in MM8BDM. Some properties that are already defined in `ClassBase` are repeated for illustration purposes.

```c
actor Megaman? : ClassBase
{
	player.scoreicon "135ST00"
	player.displayname "Megaman?"
	player.soundclass "megaman"

	player.forwardmove 0.8, 0.8
	player.sidemove 0.78, 0.78

	player.jumpz 10
	gravity 0.8

	Health 100
	Player.MaxHealth 100

	player.startitem "BaseFlagPack", 1
	player.startitem "ModeWeps", 1

	player.startitem "MegaBuster"
	player.startitem "BusterAmmo", 3
	States
	{
		Spawn:
			EMEG A 0
			EMEG B 1
			EMEG A 1
			Goto Spawn+2

		See:
			EMEG BCDE 5
			Goto Spawn

		Missile:
			EMEG F 5
			EMEG G 4
			goto Spawn+2

		ClassPain:
			EMEG H 0
			goto MegamanPain
		ClassDeath:
			EMEG H 0
			goto MegamanDeath
	}
}
```

## See Also

---

[Creating Classes](../interacting-with-systems-c99b6cab/creating-classes-5863e4dc.md)

[CustWepClassBase](./custwepclassbase-6e611b72.md)
