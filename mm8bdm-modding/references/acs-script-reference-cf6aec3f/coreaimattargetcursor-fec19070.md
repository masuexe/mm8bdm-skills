---
title: "core_aimattargetcursor"
notion_id: fec1907046084a0698dd9953107f9796
source: https://www.notion.so/fec1907046084a0698dd9953107f9796
---

# core_aimattargetcursor

> ⚡ Script "core\_aimattargetcursor" (int AimTarget, int HeightAdjust)

## Usage

---

This script will cause the calling actor to aim at a given TID.

### Parameters

- `AimTarget`: int - The TID of the actor to aim at.

- `HeightAdjust`: int - A height offset to factor into the aiming.

## Example

---

The primary use of this is with `TargetMarker`, an inventory actor that is implemented in core. When given to players, `TargetMarker` will spawn an actor at that player’s cursor with a TID of the player’s TID + `PLN_TARGETPOINT_OFFSET`.

By combining that with this script, you can make other actors aim where the player is. Below is how Copy Vision uses this to accomplish its redirecting aim.

```c
actor CopyVision : BasicProjectile
{
	+THRUGHOST
	+RIPPER
	+NOCLIP
	+DONTBLAST
	+BRIGHT
	RenderStyle "Translucent"
	Alpha 0.90
	Radius 16
	Height 32
	Damage (0)
	reactiontime 40
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_PlaySoundEx("weapons/mmb/copyvisionactivate", "weapon")
			TNT1 A 0 ACS_NamedExecuteAlways("core_targetyawpitch", 0, 0)
			COPY FGHI 2
			Goto Shooting+1
		Shooting:
			COPY C 0 A_Countdown
			COPY C 0 A_PlaySoundEx("weapons/mmb/copyvisionshoot", "body")
			COPY C 0 A_CustomMissile("CopyShot",32,0,0,2,-pitch)
			COPY CCCCCC 1 A_JumpIfInTargetInventory("CopyVisionRedirect", 1, "Redirect")
			COPY C 0 A_JumpIfInTargetInventory("IsDead", 1, "Death")
			Loop
		Redirect:
			COPY C 0 A_GiveToTarget("TargetMarker", 1)
			COPY C 3
			COPY C 0 ACS_NamedExecuteAlways("core_aimattargetcursor", 0, CallACS("core_gettarget") + PLN_TARGETPOINT_OFFSET, 32)
			COPB A 0 A_TakeFromTarget("CopyVisionRedirect", 1)
			goto Shooting
		Death:
			TNT1 A 0 A_TakeFromTarget("CopyVisionFlag", 1)
			COPB A 0 A_TakeFromTarget("CopyVisionRedirect", 1)
			COPY IJK 3
			Stop
	}
}
```
