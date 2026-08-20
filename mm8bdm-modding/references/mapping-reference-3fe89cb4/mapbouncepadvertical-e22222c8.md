---
title: "map_bouncepad_vertical"
notion_id: e22222c8e7544a1199d2bc057b73688a
source: https://www.notion.so/e22222c8e7544a1199d2bc057b73688a
---

# map_bouncepad_vertical

> ⚡ script "map\_bouncepad\_vertical" (int force, int superforce, int sound)

## Event

---

This script is called by the player whenever they step on a vertical bounce pad. The parameters are determined by the bounce pad on which they stepped on.

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_bouncepad_vertical`, to add additional behavior to this event, or override the existing behavior.

This script has no expected return value.

### Parameters

- `force`: int - How much force to apply to the player when they are **not** holding jump.

- `superforce`: int - How much force to apply to the player when they are holding jump.

- `sound`: int - Which sound effect to play when launched.

## Default Script

---

The default vertical bounce pad script has relatively universal behavior.

First, to prevent the player from getting unintended extra bounce, check for a short-lived powerup called `"JumpPadDelay"`. This powerup lasts 8 tics. If the player has this powerup, stop the script. Otherwise, give it to them.

Next, do some simple checks to figure out how much force to apply to the player.

If `superforce` is 0, populate it with the value of force.

Next, if the player is holding jump, apply `superforce`. Otherwise, apply `force`.

Finally, using `sound`, play the bounce sound using the script `"map_bouncesound"`.

```javascript
// You can override these scripts to add extra effects to the bounce.
// Activator: Player who bounced
//
script "map_bouncepad_vertical" (int force, int superforce, int sound)
{
    if(CheckInventory("JumpPadDelay") > 0)
        terminate;
    GiveInventory("JumpPadDelay", 1);
    if(superforce == 0) {
        superforce = force;
    }

    int finForce = force;
    if(GetPlayerInput(-1, INPUT_BUTTONS) & BT_JUMP) {
        finForce = superforce;
    }
    ACS_NamedExecuteWithResult("map_bouncesound", sound, finForce);
    ThrustThingZ(0, finForce, 0, 0);
}
```

## Example Replacement

---

The below replacement just replaces the bounce pad script with a random bounce force, with its range decided by the inputs of `force` and `superforce` and plays the Mecha Dragon’s cry on bounce.

```javascript
script "map_bouncepad_vertical" (int force, int superforce, int sound)
{
    ThingSound(ActivatorTID(), "misc/dragoncry", 128);
    ThrustThingZ(0, random(force, superforce), 0, 0);
}
```

## See Also

---

[Bounce Pads](./bounce-pads-2f4f6800.md)

[map_bouncesound](./mapbouncesound-e07ed6f9.md)

[map_bouncepad_horizontal](./mapbouncepadhorizontal-9593933b.md)
