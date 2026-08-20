---
title: "BasicWatcher"
notion_id: 6391f0721df04f459a7acca0a6e242e7
source: https://www.notion.so/6391f0721df04f459a7acca0a6e242e7
---

# BasicWatcher

---

`BasicWatcher` is a simple actor you want to use when you need a parallel process done in DECORATE. 

You can imagine this actor as an invisible helper actor that can manipulate the spawner’s inventory or wait for a specific case to happen before executing a task.

This actor has helped facilitate a lot of the more complicated weapons in MM8BDM by offloading certain behaviors from the weapons. Because of this, examples might be difficult to grasp at a glance.

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
actor BasicWatcher
{
    +MISSILE
    -SOLID
    +NOCLIP
    +NOINTERACTION
    +NOGRAVITY
    +DONTBLAST
    +DONTREFLECT
    +THRUACTORS
    +NOBLOCKMAP
    renderstyle none
    radius 2
    height 2
    States
    {
    Spawn:
        TNT1 A 1
        stop
    Death:
        TNT1 A 1
        stop
    }
}
```

## Example

---

Here is a custom example watcher that borrows some base MM8BDM actors to give the spawner 1.45x speed for 45 seconds and a dusty trail effect while that speed is active.

```c
actor DustySpeed : BasicWatcher
{
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_GiveToTarget("ScorchWheelPowerup", 1)
		SpawnLoop:
			TNT1 A 1 A_Warp(AAPTR_TARGET, 0.0,0.0,0.0,0.0,WARPF_NOCHECKPOSITION)
			TNT1 A 0 A_SpawnItemEx("MetDaddyJumpFog", 0, 0, 0, -10, 0, 0, 0)
			TNT1 A 0 A_JumpIfInTargetInventory("ScorchWheelPowerup", 1, "Spawn")
			TNT1 A 5
			stop
	}
}
```
