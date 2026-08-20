---
title: "core_knockback"
notion_id: 6f3f4b65f7c94dc9a5e816e24db914ad
source: https://www.notion.so/6f3f4b65f7c94dc9a5e816e24db914ad
---

# core_knockback

> ⚡ script "core\_knockback" (int force, int forcez, int aimed, int ptr)

## Usage

---

This script is a standardized way of performing isolated push / pulls. It will push / pull the calling actor away from / towards the actor pointer specified by `ptr`. 

### Parameters

- `force`: int - The force of the push / pull

- `forcez`: int - The vertical force of the knockback

- `aimed`: bool - If true, the vertical force is instead a factor of `force` and the pitch of the actor referred to by `ptr`.

- `ptr`: int - The actor pointer of the calling actor to be pushed away from / pulled towards.

## Example

---

Using this script in the context of pain states can be a bit unintuitive with how the player’s `AAPTR_TARGET` pointer changes during a pain state, so below is a reusable example of how to properly use this script for that scenario.

```c
Pain.WindStorm:
	PLY1 H 0 A_GiveInventory("WindStormHit", 1)
	Goto Pain+1

...

actor WindStormHit : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 A_SpawnItemEx("WindStormHitGiver")
			stop
	}
}

actor WindStormHitGiver : BasicWatcher
{
	States
	{
		Spawn:
			TNT1 AA 0 A_GiveToTarget("WindStormEffect", 1)
			stop
	}
}

actor WindStormEffect : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 ACS_NamedExecuteWithResult("core_knockback", -10, 30, false, AAPTR_TARGET)
			stop
	}
}
```
