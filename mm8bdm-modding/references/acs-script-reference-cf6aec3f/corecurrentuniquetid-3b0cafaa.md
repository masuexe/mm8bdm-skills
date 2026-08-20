---
title: "core_CurrentUniqueTID"
notion_id: 3b0cafaaeed04af4b6cbdc9ed43e2449
source: https://www.notion.so/3b0cafaaeed04af4b6cbdc9ed43e2449
---

# core_CurrentUniqueTID

> ⚡ script "core\_CurrentUniqueTID” (void)

## Usage

---

This script is designed to be used in conjunction with [core_NewUniqueTID](./corenewuniquetid-042826a8.md). It will return the previously stored unique TID created by that script.

### Return Value

Returns the previously stored unique TID.

> 🚨 **Note that if no previous unique TID has been stored, this script will log an error! Use this script with care!**

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

[core_ClearUniqueTID](./coreclearuniquetid-5e671566.md)

[core_uniquetid](./coreuniquetid-11b52269.md)
