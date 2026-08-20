---
title: "BasicHazardExplosion"
notion_id: 6bc400f98f874becb1f67ed6adef7bab
source: https://www.notion.so/6bc400f98f874becb1f67ed6adef7bab
---

# BasicHazardExplosion

---

`BasicHazardExplosion` lets you create an explosion for a stage hazard that will let the originator earn frags with it if `mm8bdm_sv_credithazardtrigger` is enabled.

Hazards that use this functionality deal damage to the person who triggered them as well as to all of their allies. Friendly persons fragged by this means are fragged as if the stage fragged them, meaning they will either trigger a hazard assist for another player or will lose a frag.

To use this, inherit from `BasicHazardExplosion` and override the `Credit` and `NoCredit` states. The `Credit` state should use the ACS script [`"core_propexplode"`](../acs-script-reference-cf6aec3f/corepropexplode-6e51d65e.md) script to deal its damage while the `NoCredit` state can use [`A_Explode`](https://zdoom.org/wiki/A_Explode) to deal damage.

### DECORATE Definition

> 🚨 **Wait! Stop! Before you copy this actor's definition into your mod, remember the following things:**
>
> - **You do **<u>**not**</u>** need to copy this actor, since it is already defined.**
>
> - **In fact, it's not just useless, it's actually **<u>**harmful**</u>** as it can cause problems.**
>
> - **If you want to use it as a basis, **[**using inheritance**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** is the way to go.**
>
> - **The actor definitions here are put on the wiki for reference purpose only. Learn from them, don't copy them into your mod.**

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

## Example

---

Here is the Oil Canister explosion from the explosive barrels on MM1OIL.

```c
actor OilCanisterExplosion : BasicHazardExplosion
{
	damagetype "OilCanister"
	Obituary "$OB_OILBARRELCREDIT"
	States
	{
		Spawn:
			TNT1 E 0
			TNT1 E 0 A_PlaySoundEx("misc/mm3explosion", "Weapon")
			TNT1 E 0 A_SpawnItemEx("OilPitIgnite", 0, 0, -32)
			goto Explode
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

[BasicACSDamager](./basicacsdamager-7afdcb44.md) 

[BasicExplosion](./basicexplosion-85dc080a.md) 
