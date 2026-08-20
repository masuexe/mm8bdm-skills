---
title: "core_predicthome"
notion_id: d22c5d30d0974e39945f09eff8c172a0
source: https://www.notion.so/d22c5d30d0974e39945f09eff8c172a0
---

# core_predicthome

> ⚡ script "core\_predicthome" (int spd, int ptr, int timeOffs)

## Usage

---

This script sets the pitch and angle of the calling projectile to predict the given pointer's position, essentially leading its aim towards that pointer, taking into account distance and speed.

### Parameters

- `spd`: int - The speed of the projectile

- `ptr`: int - The actor pointer to aim towards

- `timeOffs`: int - An optional time offset in tics to take into account for prediction.

## Example

---

Below is a fairly accurate Magnet Missile that only redirects a single time.

```c
actor LoreAccurate_MagnetMissile : BasicProjectile
{
	Radius 8
	Height 5
	damagetype "MagnetMissile"
	Obituary "$OB_MAGNETMISSILE"
	damage (20)
	speed 47
	+SEEKERMISSILE
	+SCREENSEEKER
	var int user_speed;
	States
	{
		Spawn:
			MAGG A 0
			MAGG A 0 A_SetUserVar(user_speed, 47)
			MAGG A 0 ACS_NamedExecuteWithResult("core_SetVelPitch",0,0)
			MAGG A 8
		SpawnLoop:
			MAGG A 0 A_SeekerMissile (0, 0, SMF_LOOK|SMF_PRECISE, 256, 10)
			MAGG A 1 A_JumpIfTargetInLOS("SpawnChase", 0, JLOSF_PROJECTILE)
			loop
		SpawnChase:
			MAGG A 0 A_Stop
			MAGG A 0 ACS_NamedExecuteWithResult("core_predicthome", user_speed, AAPTR_TRACER, 10)
			MAGG A 10
			TNT1 A 0 A_SpawnItemEx("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
		ChaseLoop:
			MAGG A 0 A_ChangeVelocity(cos(pitch)*user_speed, 0, sin(-pitch)*user_speed, CVF_RELATIVE|CVF_REPLACE)
			MAGG A 2
			loop
		Death:
			TNT1 A 0 A_SpawnItemEx("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			stop
	}
}
```
