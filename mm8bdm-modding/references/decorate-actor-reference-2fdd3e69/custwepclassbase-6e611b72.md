---
title: "CustWepClassBase"
notion_id: 6e611b72560446bbbdca59d11f19bcf8
source: https://www.notion.so/6e611b72560446bbbdca59d11f19bcf8
---

# CustWepClassBase

---

`CustWepClassBase` is an actor to inherit from if you want to create a class that cannot use normal weapons that inherit from [BaseMM8BDMWep](./basemm8bdmwep-8cc600ca.md) and cannot use buster upgrades.

Any weapon that a class inheriting from this actor uses must inherit from [BaseMM8BDMCustWep](./basemm8bdmcustwep-d23769c5.md) instead.

This actor extends across multiple files and includes multiple systems, so it is not feasible to post its code in one block on this page.

## Custom Properties

The following are inventory flags which can be given to the class as a start item to disable certain behaviors.

- `NoTeamTranslation`: Disables team colors on the class’s actor.

- `NoWeaponTranslation`: Disables [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) changing actor color entirely.

- `NoWeaponSwitchSound`: Disables [core_weaponcolor](../acs-script-reference-cf6aec3f/coreweaponcolor-db216af3.md) playing a weapon swap sound entirely.

- `NoProjectileTeamTranslation`: Disables team colors on the class’s projectiles.

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

## Example

---

The code below creates an example Cutman class using some of the special properties. This code assumes that a weapon named `RollingCutterBoss` which inherits from [BaseMM8BDMCustWep](./basemm8bdmcustwep-d23769c5.md) already exists.

```c
actor Cutman : CustWepClassBase
{
	player.scoreicon "000ST00"
	player.displayname "Cutman"
	player.soundclass "cutman"

	player.forwardmove 1.0, 1.0
	player.sidemove 0.98, 0.98

	player.jumpz 12.5
	gravity 0.8
	player.startitem "WallJumpLimit", 9
	player.startitem "WallJumpZ", 12
	player.startitem "WallJumpZDecimal", 5000

	Health 85
	Player.MaxHealth 85

	player.startitem "BaseFlagPack", 1
	player.startitem "RollingCutterBoss"
	States
	{
		Spawn:
			CUTM A 0
			CUTM B 1
			CUTM A 1
			Goto Spawn+2

		See:
			CUTM BCDE 5
			Goto Spawn

		Missile:
			CUTM F 5
			CUTM G 4
			goto Spawn+2

		ClassPain:
			CUTM H 0
			goto MegamanPain
		ClassDeath:
			CUTM H 0
			goto MegamanDeath
	}
}
```

## See Also

---

[Creating Classes](../interacting-with-systems-c99b6cab/creating-classes-5863e4dc.md)

[ClassBase](./classbase-c7f9de44.md)
