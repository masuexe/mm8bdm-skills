---
title: "core_drawhookshot"
notion_id: b1fac9aaf2c442a9b73fe62ce906d30c
source: https://www.notion.so/b1fac9aaf2c442a9b73fe62ce906d30c
---

# core_drawhookshot

> ⚡ Script "core\_drawhookshot" (int playerTid, int density, int horiOffset, int flags) CLIENTSIDE

## Usage

---

This script is a very flexible way of drawing a chain of actors between the calling actor and a given player TID. For every actor that calls it, this script will attempt to spawn `[ActorClassName]FX` where `[ActorClassName]` is the name of the actor calling the script.

### Parameters

- `playerTid`: int - The TID of the player to draw the chain to.

- `density`: int - The distance between each point in the drawn chain.

- `horiOffset`: int - Specifies a horizontal offset to aim for on the TID when drawing the chain.

> 💡 **This is primarily useful for matching the offset which most all projectiles are fired with.**

- `flags`: int - A bitwise flags field. Flags should be combined as follows: `FLAG_1|FLAG_2`. Acceptable flags are below:
  - `DHS_MAXDIST`: Allows you to specify a max distance for the chain to be drawn. If you use this flag, you must also add the max distance you want to it, like this, `DHS_MAXDIST + 1024`.

  - `DHS_NOMIDDLEHEIGHT`: When toggled, the chain will draw to the bottom of the player rather than the middle.

## Example

---

Below is how a left-handed Duo Fist could be implemented.

```c
DUOF C 0 A_FireCustomMissile("DuoPunch_Lefty",0,0,-8,0)

...

actor DuoPunch_Lefty : BasicProjectile
{
	+SKYEXPLODE
	Radius 10
	Height 10
	Speed 32
	Damage (25)
	damagetype "DuoFist1"
	Obituary "$OB_DUOFIST"
	States
	{
		Spawn:
			GIGF A 0
			GIGF A 0 ACS_NamedExecuteWithResult("core_drawhookshot", ACS_NamedExecuteWithResult("core_gettarget"), 32, -8, DHS_MAXDIST + 1024)
			GIGF A 0 A_GiveInventory("CutterFlag", 5)
		Spawn2: 
			GIGF A 0
			GIGF A 2
			TNT1 A 0 A_SpawnItemEx("ThunderClawPegHelper")
			GIGF A 0 A_TakeInventory("CutterFlag", 1)
			GIGF A 0 A_JumpIfInventory("Cutterflag", 1, "Spawn2")
			GIGF A 0
			Goto Spawn3
		Spawn3:
			GIGF AA 1
			GIGF A 0 A_TakeInventory("CutterFlag", 999) 
			Goto Death
		Death:
			TNT1 A 0 A_SpawnItemEx("ThunderClawPegHelper")
			TNT1 A 1 A_CustomMissile("DuoPunchReturn_Lefty",0,0,0,0)
			stop
	}
}

actor DuoPunchReturn_Lefty : BasicProjectile
{
	+DONTBLAST
	+RIPPER
	+SKYEXPLODE
	+NOINTERACTION
	radius 0
	height 0
	speed 40
	damage (0)
	states
	{
		Spawn:
			GIGF J 0
			GIGF A 0 ACS_NamedExecuteWithResult("core_drawhookshot", ACS_NamedExecuteWithResult("core_gettarget"), 32, -8, DHS_MAXDIST + 1024)
			GIGF J 0 A_FaceTarget
			GIGF JJJJ 1 A_JumpIfCloser(60,"Return")
			TNT1 A 0 A_CustomMissile("DuoPunchReturn_Lefty",0,0,0,0)
			stop
		Return:
			GIGF A 0 A_GiveToTarget("FistFlag",1)
			stop
	}
}

actor DuoPunch_LeftyFX : BasicGraphicEffect
{
	+NOTIMEFREEZE
	States
	{
		Spawn:
			GIGF B 0
			GIGF B 1
			stop
	}
}
actor DuoPunchReturn_LeftyFX : DuoPunchFX {}
```
