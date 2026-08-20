---
title: "map_teleportto"
notion_id: 56f23e789cfd4536a598f25a39b63392
source: https://www.notion.so/56f23e789cfd4536a598f25a39b63392
---

# map_teleportto

> ⚡ script "map\_teleportto" (int dest)

## Event

---

This script is called by the player whenever they enter a teleporter created by [Teleport Entrance](./teleport-entrance-2a87ee76.md). 

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_teleportto`, to add additional behavior to this event, or override the existing behavior.

This script has no expected return value.

### Parameters

- `dest`: int - The tag / Thing ID of the teleport destination.

## Default Script

---

The default teleport script teleports the player, with some protections to keep them from teleporting infinitely.

First, to prevent the player from teleporting recursively, it checks for a short-lived 5 tic long powerup called `TeleportFlag`. If the player has this powerup, the script is stopped, requiring them to jump on the teleporter again once the powerup fades. 

> 🚨 **When replacing this script, you must make sure to preserve this powerup behavior! Failure to do so can cause infinite teleport recursion which will crash the game!**

If the player does not have this powerup, then give them the powerup and actually perform the teleport to the target destination.

```javascript
// Activator: Player who teleported,
script "map_teleportto" (int dest)
{
if(CheckInventory("TeleportFlag")==0)
    {
    GiveInventory("TeleportFlag", 1);
    Teleport(dest, 0, 0);
    }
}
```

## Example Replacement

---

The below replacement spawns a Hyper Bomb at the teleporting player’s feet before teleporting. Note that it uses [core_setTIDsPointerToThis](../acs-script-reference-cf6aec3f/coresettidspointertothis-8496d0cd.md) to set the owner of the Hyper Bomb to the teleporting player.

```javascript
script "map_teleportto" (int dest)
{
if(CheckInventory("TeleportFlag")==0)
    {
    int u = UniqueTID();
    SpawnForced("HyperBomb", GetActorX(0), GetActorY(0), GetActorZ(0), u);
    ACS_NamedExecuteWithResult("core_setTIDsPointerToThis", u, AAPTR_TARGET);
    Thing_ChangeTID(u, 0);

    GiveInventory("TeleportFlag", 1);
    Teleport(dest, 0, 0);
    }
}
```

## See Also

---

[Teleport Entrance](./teleport-entrance-2a87ee76.md)
