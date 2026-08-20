---
title: "map_itemfog"
notion_id: 1ba46a2406dd487c838cf9b8d2d7a35f
source: https://www.notion.so/1ba46a2406dd487c838cf9b8d2d7a35f
---

# map_itemfog

> ⚡ script "map\_itemfog" (void)

## Event

---

This script is called whenever any item on the map respawns. It determines which item respawn animation graphics to use.

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_teleportfog`, to add additional behavior to this event, or override the existing behavior.

This script has no parameters or expected return value.

## Default Script

---

The default item fog script spawns a tiny version of the Mega Man teleport effect.

```javascript
// Activator: The original itemfog.
// There is no information given about the spawned item.
script "map_itemfog" (void)
{
    SpawnForced("ItemFogFX", GetActorX(0), GetActorY(0), GetActorZ(0), 999, 0);
}
```

## Example Replacement

---

Here’s a simple script replacement that spawns a cartoon magic poof effect called `MagicPoofRespawn`.

To use, simply copy this into your scripts and [create a DECORATE actor](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md) called `MagicPoofRespawn` that plays the poof animation and sound effect.

```javascript
script "map_itemfog" (void)
{
    SpawnForced("MagicPoofRespawn", GetActorX(0), GetActorY(0), GetActorZ(0), 999, 0);
}
```

## See Also

---

[map_teleportfog](./mapteleportfog-be478ec7.md)
