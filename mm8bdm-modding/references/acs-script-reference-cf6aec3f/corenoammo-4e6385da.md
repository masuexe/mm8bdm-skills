---
title: "core_noammo"
notion_id: 4e6385da4d204fb794240ee0e600e321
source: https://www.notion.so/4e6385da4d204fb794240ee0e600e321
---

# core_noammo

> ⚡ script "core\_noammo" (void)

## Usage

---

A script designed to be called in the `NoAmmo` state for copy weapons. Plays a buzzer sound to indicate to the player that they’re out of ammo.

## Example

---

Below is an excerpt from Flash Bomb’s code showing how this script is used.

```c
Ready:
	FLSB T 0 ACS_NamedExecuteWithResult("core_weaponcolor",CLR_FLASHBOMB)
	FLSB T 1 A_WeaponReady
	Goto Ready+1
...
Fire:
	FLSB T 0 A_JumpIfNoAmmo("NoAmmo")
	FLSB T 0 A_PlaySoundEx("weapons/mm8/flashbombfire","Weapon")
	FLSB T 0 A_FireCustomMissile("FlashBomb",0,1,8,0)
	FLB0 ABCDEF 2
	FLSB T 24
	FLSB T 0 A_Refire // 36 frames
	Goto Ready+1
NoAmmo:
	FLSB T 1 ACS_NamedExecuteAlways("core_noammo",0)
	Goto Ready+1
```
