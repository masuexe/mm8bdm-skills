---
title: "core_getPlayersInRadius"
notion_id: f8ebd948d73240bfbb527f2aea13fe0e
source: https://www.notion.so/f8ebd948d73240bfbb527f2aea13fe0e
---

# core_getPlayersInRadius

> ⚡ script "core\_getPlayersInRadius" (int radius, int flags, int pointer, int unused)

## Usage

---

This script is a more robust version of [core_checkDistance](./corecheckdistance-c8081850.md), providing the number of players within a given radius of the calling actor, as well as providing flags to tweak behavior.

### Parameters

- `radius`: int - The radius of the check, in map units.

- `flags`: int - A bitwise flags field. Flags should be combined as follows: `FLAG_1|FLAG_2`. Acceptable flags are below:
  - `PRF_CUBE`: Changes the detection zone to a cube instead of a sphere.

  - `PRF_CHECKCOLLISION`: Changes the detection zone to factor in the radius of players.

  - `PRF_CLOSESTPOINTER`: Will set a given [actor pointer](https://zdoom.org/wiki/Actor_pointer) on the calling actor to the closest player found.

> 🚨 **Note that as of V6B, **`PRF_CLOSESTPOINTER`** has improper and unexpected behavior, tending to prefer players with a lower player number or players which are more perpendicular to the calling actor. This behavior will be cleaned up in a later version!**

- `pointer`: int - The pointer field to set if using the `PRF_CLOSESTPOINTER` flag.

### Return Value

Returns the number of players whose origin is within the specified radius.

## Example

---

Below is a minimized example of Rush Jet showing how the `PRF_CLOSESTPOINTER` flag can be used in practice.

```c
Look:
	RUSH III 1 A_JumpIf(CallACS("core_getPlayersInRadius", 80, PRF_CLOSESTPOINTER, AAPTR_TRACER) > 0, "Melee")
	RUSH I 0 A_CountDown
	Goto Look
Melee:
	RUSH G 0 A_GiveInventory("RushJetActivate", 1, AAPTR_TRACER)
	stop
```

Below is an example of how `PRF_CUBE` and `PRF_CHECKCOLLISION` are used, in this case to disallow Concrete Shot from spawning inside players and blocking them.

```c
Spawn:
	CONC D 0
	CONC D 0 A_JumpIf(CallACS("core_getPlayersInRadius", 20, PRF_CUBE|PRF_CHECKCOLLISION) > 0, "Death")
	CONC D 1
	CONC E 0 A_ChangeFlag(TOUCHY, false)
	CONC E 0 A_ChangeFlag(MISSILE, false)
	CONC E 0 A_ChangeFlag(SOLID, true)
	CONC EF 64
	Goto Death
Death:
	CONC B 0 A_NoBlocking
	CONC FG 3
	stop
```

## See Also

---

[core_checkDistance](./corecheckdistance-c8081850.md)

[core_radiusPull](./coreradiuspull-24f601dd.md)
