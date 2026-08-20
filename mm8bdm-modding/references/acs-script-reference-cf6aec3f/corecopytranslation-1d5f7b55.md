---
title: "core_copytranslation"
notion_id: 1d5f7b5543f9461bae1d895f13cd3ce7
source: https://www.notion.so/1d5f7b5543f9461bae1d895f13cd3ce7
---

# core_copytranslation

> ⚡ script "core\_copytranslation" (void)

## Usage

---

This script can be called by an actor to immediately change its translation to the same translation being used by that actor’s target actor pointer ([`AAPTR_TARGET`](https://zdoom.org/wiki/Actor_pointer#:~:text=are%20generally%20used%3A-,target,-tracer)). The translation that is applied will exist on the server-side, meaning that it can be transferred to another server-side actor using [`SXF_TRANSFERTRANSLATION`](https://zdoom.org/wiki/A_SpawnItemEx#:~:text=the%20constant%20names%3A-,SXF_TRANSFERTRANSLATION,-%2D%20the%20spawned%20actor).

## Example

---

This code defines an actor called `CopyRobot` which can be summoned similar to Copy Vision. It will teleport in, fire Mega Buster shots while copying the user’s colors for a moment, then teleport out with the last set of colors it had.

```c
actor CopyRobot : BasicWatcher
{
	renderstyle "normal"
	reactiontime 42
	scale 2.5
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_PlaySoundEx("misc/teleportin", "weapon")
			TFOG CCAAABBBBB 1
		Shooting:
			MEGM F 0 A_PlaySoundEx("weapons/busters/megabusterfire", "body")
			MEGM F 0 A_CustomMissile("MegaShot", 32, 0, 0, CMF_AIMDIRECTION)
			MEGM FFFFFFFF 1 ACS_NamedExecuteWithResult("core_copytranslation")
			MEGM F 0 A_JumpIfInTargetInventory("IsDead", 1, "Death")
			MEGM F 0 A_Countdown
			loop
		Death:
			TNT1 A 5 A_SpawnItemEx("TeleportFogFancy",0,0,0,0,0,0,0,SXF_TRANSFERTRANSLATION)
      stop
	}
}
```

## See Also

---

[core_copytranslation_client](./corecopytranslationclient-20f7fd81.md)
