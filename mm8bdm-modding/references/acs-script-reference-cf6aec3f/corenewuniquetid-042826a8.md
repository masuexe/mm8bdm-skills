---
title: "core_NewUniqueTID"
notion_id: 042826a8255e44cd906755cd5f6aed1a
source: https://www.notion.so/042826a8255e44cd906755cd5f6aed1a
---

# core_NewUniqueTID

> ⚡ script "core\_NewUniqueTID" (void)

## Usage

---

This script is a wrapper for [`UniqueTID`](https://zdoom.org/wiki/UniqueTID) that can be used alongside its sister scripts in DECORATE to emulate the behavior of `A_SpawnItemEX` flags which Zandronum does not yet support, such as `SXF_ISTRACER` or `SXF_SETTRACER`. 

The TID created by this script will also be stored for later retrieval by [core_CurrentUniqueTID](./corecurrentuniquetid-3b0cafaa.md). However, it must be cleared on the same tic that it is created by using [core_ClearUniqueTID](./coreclearuniquetid-5e671566.md).

### Return Value

Returns a unique TID.

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

[core_CurrentUniqueTID](./corecurrentuniquetid-3b0cafaa.md)

[core_ClearUniqueTID](./coreclearuniquetid-5e671566.md)

[core_uniquetid](./coreuniquetid-11b52269.md)
