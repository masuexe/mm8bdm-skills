---
title: "Bounce Pads"
notion_id: 2f4f6800074e4ebcb914787a889b9ce0
source: https://www.notion.so/2f4f6800074e4ebcb914787a889b9ce0
---

# Bounce Pads

> ⚡ actor MM8BDM\_JumpPad : SecActHitFloor 10563

> ⚡ actor MM8BDM\_DirThrust : SecActHitFloor 10564

## Usage

---

`"Bounce Pad (Vertical)"` and `"Bounce Pad (Horizontal)"` are Things located under the category `MM8BDM-Mapper Tools`. These objects are used to create bounce pads.

To create a bounce pads, place one or both of these actors the sector you wish to be a bounce pad, click the `Action / Tag / Misc.` tab, and fill in the necessary info.

### Action and Identification (Vertical)

- Argument 1: `Jump Force` - The base force to apply to the player on bounce.

- Argument 2: `Super Jump Force` - The force to apply to the player instead of the base jump force on bounce if they are holding jump. 

- Argument 3: `Boost Sound` - Which sound to play on bounce.
  - `"None"` - Play no sound (Default)

  - `“Spring”` - A “boing” spring sound

  - `“Jet Boost”` - A “Whoosh” jet sound

  - `“Underwater Jet”` - A “Whoosh” pump sound

### Action and Identification (Horizontal)

- Argument 1: `Thrust Force` - The base force to apply to the player on bounce.

- Argument 2: `Activation Method` - Where to trigger the horizontal thrust.
  - `“Player Hits Floor”` - Trigger on floor (Default)

  - `“Player Hits Ceiling”` - Trigger on ceiling

- Argument 3: `Thrust Sound` - Which sound to play on bounce.
  - `"None"` - Play no sound (Default)

  - `“Spring”` - A “boing” spring sound

  - `“Jet Boost”` - A “Whoosh” jet sound

  - `“Underwater Jet”` - A “Whoosh” pump sound

> 💡 The direction of the thrust is the “angle” of the actor set in the main properties tab.

## See Also

---

[map_bouncepad_vertical](./mapbouncepadvertical-e22222c8.md)

[map_bouncepad_horizontal](./mapbouncepadhorizontal-9593933b.md)

[map_bouncesound](./mapbouncesound-e07ed6f9.md)
