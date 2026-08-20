---
title: "map_bouncepad_horizontal"
notion_id: 9593933bd1844299a1244dcbd1daba62
source: https://www.notion.so/9593933bd1844299a1244dcbd1daba62
---

# map_bouncepad_horizontal

> ⚡ script "map\_bouncepad\_horizontal" (int force, int angle, int sound)

## Event

---

This script is called by the player whenever they step on a horizontal bounce pad. The parameters are determined by the bounce pad on which they stepped on.

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_bouncepad_horizontal`, to add additional behavior to this event, or override the existing behavior.

This script has no expected return value.

### Parameters

- `force`: int - How much force to apply to the player when they are **not** holding jump.

- `angle`: int - Which direction the bounce pad is facing, in degrees.

- `sound`: int - Which sound effect to play when launched.

## Default Script

---

The default horizontal bounce pad script has relatively universal behavior.

First, to prevent the player from getting unintended extra bounce, check for a short-lived powerup called `"JumpDirDelay"`. This powerup lasts 8 tics. If the player has this powerup, stop the script. Otherwise, give it to them.

Apply the given `force` in the direction corresponding to `angle`.

Using `sound` as an index into an array, play a sound effect for the bounce sound.

```javascript
// Activator: Player who bounced
//
str padSounds[3] = {
    "misc/boing",
    "misc/jumppad",
    "misc/pumpjet",
};

script "map_bouncepad_horizontal" (int force, int angle, int sound)
{
    if(CheckInventory("JumpDirDelay") > 0)
        terminate;
    GiveInventory("JumpDirDelay", 1);
    if(sound > -1) {
        ThingSound(ActivatorTID(), padSounds[sound], 128);
    }
    ThrustThing(angle * 256 / 360, force, force>30, 0);
}
```

## Example Replacement

---

The below replacement just replaces the bounce pad script with a random bounce direction and force, with the force ranging between 0 and the given value of `force`, and plays the Mecha Dragon’s cry on bounce.

```javascript
script "map_bouncepad_horizontal" (int force, int superforce, int sound)
{
    ThingSound(ActivatorTID(), "misc/dragoncry", 128);
		int finForce = random(0, force);
    ThrustThing(random(0, 255), finForce, finForce>30, 0);
}
```

## See Also

---

[Bounce Pads](./bounce-pads-2f4f6800.md)

[map_bouncepad_vertical](./mapbouncepadvertical-e22222c8.md)
