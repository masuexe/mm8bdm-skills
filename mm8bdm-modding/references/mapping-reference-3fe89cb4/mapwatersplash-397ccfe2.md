---
title: "map_watersplash"
notion_id: 397ccfe2bc8745b79af237a278fd5908
source: https://www.notion.so/397ccfe2bc8745b79af237a278fd5908
---

# map_watersplash

> ⚡ script "map\_watersplash" (int direction, int entering, int eyes)

## Event

---

This script is called by the player whenever they enter or leave any body of water on the map. 

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_watersplash`, to add additional behavior to this event, or override the existing behavior.

This script is called by the global water management script, which expects a return value of how many tics (1/35th of a second) to wait before splashing again. If the return value is 0, or none is specified, it will default to 20.

### Parameters

- `direction`: int - Which direction the player entered or exited the water from.
  - `0`: From the top

  - `1`: From the bottom

  - `2`: From the side

- `entering`: bool - Whether or not the player is entering the water.

- `eyes`: bool - Whether the trigger of the script was the player’s eyes. (If `direction` is `2`, this will always be `false` because a `direction` of `2` means both the eyes and feet of the player entered or left the water at the same time).

## Default Script

---

The default water splash script simply spawns the Mega Man water splash in a relevant position.

The spawn position of the splash is the player’s position 1 tic ago (this better syncs the splash with the water’s surface).

If the splash was triggered by the player’s eyes entering or leaving the water, the view height is added to the z-position to account for that.

Finally, determine which splash to use depending on the direction the player splashes from, then spawn it.

The `SetResultValue` returns how long the global water script should wait before attempting to splash again. Which, by default, is 20 tics.

```javascript
// Activator: The player who splashed
script "map_watersplash" (int direction, int entering, int eyes)
{
    int x = GetActorX(0)-GetActorVelX(0);
    int y = GetActorY(0)-GetActorVelY(0);
    int z = GetActorZ(0)-GetActorVelZ(0);
    int angle = GetActorAngle(0) >> 8;
    str type;

    if(eyes) {
        z += GetActorProperty(0, APROP_ViewHeight);
    }

    switch(direction) {
        case 0: // From the top
            type = "MMSplash";
            break;
        case 1: // From the bottom
            type = "MMSplash_Down";
            break;
        case 2: // From the side
            type = "MMSplash_Mid";
            break;
    }

    SpawnForced(type, x, y, z, 0, angle);
    
    SetResultValue(20);
}
```

## Example Replacement

---

We’ve seen a couple Sonic maps floating around, so here’s a simple script replacement that spawns a `STHSplash` instead. This script assumes you will only ever enter or exit water from the top. It also can splash more frequently because, Sonic The Hedgehog.

To use, simply copy this into your scripts and [create a DECORATE actor](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md) called `STHSplash` that plays the splash animation and sound effect.

```javascript
script "map_watersplash" (int direction, int entering, int eyes)
{
    int x = GetActorX(0)-GetActorVelX(0);
    int y = GetActorY(0)-GetActorVelY(0);
    int z = GetActorZ(0)-GetActorVelZ(0);
    str type;

    SpawnForced("STHSplash", x, y, z, 0, 0);
    
    SetResultValue(10);
}
```

## See Also

---

[Water Sector](./water-sector-98eda73c.md)

[map_gelsplash](./mapgelsplash-e35297a0.md)
