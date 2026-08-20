---
title: "core_ClearUniqueTID"
notion_id: 5e67156647094a15bb4376d8f2426936
source: https://www.notion.so/5e67156647094a15bb4376d8f2426936
---

# core_ClearUniqueTID

> ⚡ script "core\_ClearUniqueTID" (int tid)

## Usage

---

This script is intended to be used alongside [core_NewUniqueTID](./corenewuniquetid-042826a8.md). This script should be called on the same tic as that script to clear out the stored unique TID.

> 🚨 **If you call this script too late after using **`core_NewUniqueTID`** or if multiple actors have the same TID created by **[core_NewUniqueTID](./corenewuniquetid-042826a8.md)**, this script will log a warning! Use this script with care!**

### Parameters

- `tid`: int - The new TID to set for any actors which had the previously stored unique TID.

## Example

---

The example below emulates `SXF_ISTRACER` while creating a projectile which is essentially two pellets which orbit around an invisible center piece.

```c
actor MegaShotWithOrbiter : BasicProjectile
{
	+BRIGHT
	damagetype "Buster"
	Obituary "$OB_MEGABUSTER"
	Speed 35
	Damage (0)
	+RIPPER
	renderstyle "None"
	radius 10
	height 5
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_SpawnItemEx("MegaShotOrbiter",30,0,0,0,0,0,90,0,0,CallACS("core_NewUniqueTID"))
			TNT1 A 0 ACS_NamedExecuteWithResult("core_setTIDsPointerToThis", CallACS("core_CurrentUniqueTID"), AAPTR_TRACER)
			TNT1 A 0 ACS_NamedExecuteWithResult("core_ClearUniqueTID", 0)
			TNT1 A 0 A_SpawnItemEx("MegaShotOrbiter",30,0,0,0,0,0,270,0,0,CallACS("core_NewUniqueTID"))
			TNT1 A 0 ACS_NamedExecuteWithResult("core_setTIDsPointerToThis", CallACS("core_CurrentUniqueTID"), AAPTR_TRACER)
			TNT1 A 0 ACS_NamedExecuteWithResult("core_ClearUniqueTID", 0)
			BUST A 1
			wait
	}
}

actor MegaShotOrbiter : MegaShotWithOrbiter
{
	Damage (10)
	-RIPPER
	renderstyle "Normal"
	States
	{
		Spawn:
			BASB E 0
			BASB E 0 A_JumpIf(!CallACS("core_targetexists", true), "Death")
			BASB E 1 A_Warp(AAPTR_TRACER, 30, 0, 0, 10, WARPF_USECALLERANGLE|WARPF_NOCHECKPOSITION)
			loop
		Death:
			TNT1 A 0
			stop
	}
}
```

## See Also

---

[core_NewUniqueTID](./corenewuniquetid-042826a8.md)

[core_CurrentUniqueTID](./corecurrentuniquetid-3b0cafaa.md)

[core_uniquetid](./coreuniquetid-11b52269.md)
