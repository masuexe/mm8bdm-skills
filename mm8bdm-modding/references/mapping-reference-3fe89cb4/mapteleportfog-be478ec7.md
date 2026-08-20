---
title: "map_teleportfog"
notion_id: be478ec790ff4be5859f46b5c395be22
source: https://www.notion.so/be478ec790ff4be5859f46b5c395be22
---

# map_teleportfog

> ⚡ script "map\_teleportfog" (void)

## Event

---

This script is called whenever any actor on the map spawns a teleport effect. It determines which teleport graphics to use.

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_teleportfog`, to add additional behavior to this event, or override the existing behavior.

This script has no parameters or expected return value.

## Default Script

---

The default teleport fog script spawns the Mega Man teleport effect.

There’s some extra behavior for the Mega Man teleport effect, which relies on it knowing where the player that spawned it *is* so it can play the “entering” or “leaving” version of the animation. The specifics are outlined in this section, but they are not necessary for understanding how to make a simple replacement, as discussed in the next section.

In order to do this, this script gets the Thing ID of the player who spawned the teleport effect, gives the teleport effect a temporary Thing ID, and then sets the `AAPTR_TARGET` of the teleport effect to the player’s Thing ID before erasing the temporary Thing ID.

```javascript
// Activator: The original teleportfog.
// The teleportfog's target is the player who spawned it.
script "map_teleportfog" (void)
{
    int plr = ACS_NamedExecuteWithResult("core_getptrtid", AAPTR_TARGET);
    int tid = UniqueTID();
    SpawnForced("TeleportFogFX", GetActorX(0), GetActorY(0), GetActorZ(0), tid, 0);
    SetActivator(tid);
    SetPointer(AAPTR_TARGET, plr);
    SetActivator(plr);
    Thing_SetTranslation(tid, -1);
    Thing_ChangeTID(tid, 0);
}
```

## Example Replacement

---

Here’s a simple script replacement that spawns a Battle Network style teleport effect called `BNTeleportFog`.

To use, simply copy this into your scripts and [create a DECORATE actor](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md) called `BNTeleportFog` that plays the teleport animation and sound effect.

```javascript
script "map_teleportfog" (void)
{
    int plr = ACS_NamedExecuteWithResult("core_getptrtid", AAPTR_TARGET);
    int tid = UniqueTID();
    SpawnForced("BNTeleportFog", GetActorX(0), GetActorY(0), GetActorZ(0), tid, 0);
    SetActivator(tid);
    SetPointer(AAPTR_TARGET, plr);
    SetActivator(plr);
    Thing_SetTranslation(tid, -1);
    Thing_ChangeTID(tid, 0);
}
```

## See Also

---

[map_itemfog](./mapitemfog-1ba46a24.md)
