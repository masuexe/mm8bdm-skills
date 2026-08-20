---
title: "core_checkservercvar"
notion_id: 674fdcab6ec2491881868d4fac7ed289
source: https://www.notion.so/674fdcab6ec2491881868d4fac7ed289
---

# core_checkservercvar

## Usage

---

Used to return the current value of a specified server variable.

### Parameters

- `which`: int - Which server variable to check.
  - `SVCVAR_HAZARD` (1): `mm8bdm_sv_credithazardtrigger`

### Return Value

It will return the value of whichever server variable you request. If you give an invalid `which` parameter, it will always return -1.

## Example

---

This script is used in [BasicHazardExplosion](../decorate-actor-reference-2fdd3e69/basichazardexplosion-6bc400f9.md) to branch between performing a frag crediting explosion versus a non-crediting one.

```c
actor BasicHazardExplosion : BasicExplosion
{
    States
    {
		    // Replace this state if using custom sound or OilPitIgnite
		    Spawn:
		        TNT1 A 0
		        TNT1 A 0 A_PlaySoundEx("misc/mm3explosion","Voice")
		        TNT1 A 1 A_JumpIf(true, "Explode")
		        wait
		
		    Explode:
		        TNT1 A 0 A_JumpIf(CallACS("core_checkservercvar", SVCVAR_HAZARD), "Credit")
				TNT1 A 0 A_RearrangePointers(AAPTR_NULL, AAPTR_NULL, AAPTR_NULL)
		        TNT1 A 1 A_JumpIf(true, "NoCredit")
		        wait
		    
		    // Replace these states for different animation and damage value
		    Credit:
		        TNT1 E 0 A_SpawnItemEx("OilCanisterExplodeFX")
		        TNT1 A 35 ACS_NamedExecuteWithResult("core_propexplode", 20, 120, 120)
		        stop
		    NoCredit:
		        TNT1 E 0 A_SpawnItemEx("OilCanisterExplodeFX")
		        TNT1 A 35 A_Explode(20,120,XF_HURTSOURCE,0,120)
		        stop
    }
}
```

## See Also

---

[Fragging Hazards](../interacting-with-systems-c99b6cab/fragging-hazards-41d2174e.md)
