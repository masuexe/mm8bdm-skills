---
title: "core_propexplode"
notion_id: 6e51d65ed40b4df296e2eb22602801a6
source: https://www.notion.so/6e51d65ed40b4df296e2eb22602801a6
---

# core_propexplode

> ⚡ script "core\_propexplode" (int dmg, int radius, int maxradius)

## Usage

---

A simplified wrapper of [core_teamexplode](./coreteamexplode-67a2da4f.md) intended to use for stage hazards triggered by players.

This script just calls [core_teamexplode](./coreteamexplode-67a2da4f.md) by passing the a string of `"HazardCredit_"` appended to the beginning of the calling actor’s name as the `type`. Like with [core_teamexplode](./coreteamexplode-67a2da4f.md), make sure this actor is defined.

### Parameters

- `dmg`: int - Amount of damage the explosion should deal, max.

- `range`: int - How big the explosion should be.

- `fullRange`: int - How big the max damage radius in the explosion should be.

## Example

---

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
		TNT1 A 35 ACS_NamedExecuteWithResult("core_propexplode", 20, 120, 120) // explosion deals 20 damage in radius.
		stop
	NoCredit:
		TNT1 E 0 A_SpawnItemEx("OilCanisterExplodeFX")
		TNT1 A 35 A_Explode(20,120,XF_HURTSOURCE,0,120)
		stop
	}
}

actor HazardCredit_OilCanisterExplosion : BasicACSDamager // but uses this actor to deal the damage.
{
	DamageType "OilCanister"
	Obituary "$OB_OILBARRELCREDIT"
}
```

## See Also

---

[core_damageactor](./coredamageactor-ee0369fe.md) 
