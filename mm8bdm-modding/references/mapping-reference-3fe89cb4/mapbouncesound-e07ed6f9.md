---
title: "map_bouncesound"
notion_id: e07ed6f909a8441cbbe0afe8d416961a
source: https://www.notion.so/e07ed6f909a8441cbbe0afe8d416961a
---

# map_bouncesound

> ⚡ script "map\_bouncesound" (int sound, int force)

## Event

---

By default, this script is called by a player who stepped on a vertical bounce pad. If a map has overridden the [map_bouncepad_vertical](./mapbouncepadvertical-e22222c8.md) script, this script may not be called by those respective bounce pads. 

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_bouncesound`, to add additional behavior to this event, or override the existing behavior.

This script has no expected return value.

### Parameters

- `sound`: int - Which sound effect to play when launched.

- `force`: int - The force at which the player was launched.

## Default Script

---

The default bounce pad sound script plays one of three sound effects, depending on the input of `sound`, inherited from the bounce pad actor:

- `0` - `"misc/boing"`: Basic spring noise.

- `1` - `"misc/jumppad"`: Generic “airy” bounce pad noise.

- `2` - `“misc/pumpjet”`: Underwater pump bounce pad noise.

```javascript
// You can override this scripts to play a custom sound for bounce pads.
// Simply remove the "sound" condition and change the array out for a 
// sound defined in SNDINFO
// Activator: Player who bounced
//
str padSounds[3] = {
    "misc/boing",
    "misc/jumppad",
    "misc/pumpjet",
};

script "map_bouncesound" (int sound, int force)
{
    if(sound > -1) {
        ThingSound(ActivatorTID(), padSounds[sound], 128);
    }
}
```

## Example Replacement

---

Below is a simple sound replacement using an existing sound, `"misc/sneeze"`. 

To use, simply copy this into your map’s scripts.

```javascript
script "map_bouncesound" (int sound, int force)
{
		ThingSound(ActivatorTID(), "misc/sneeze", 128);
}
```

## See Also

---

[Bounce Pads](./bounce-pads-2f4f6800.md)

[map_bouncepad_vertical](./mapbouncepadvertical-e22222c8.md)
