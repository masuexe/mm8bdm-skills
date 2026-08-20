---
title: "core_stickyLifts"
notion_id: 94bfbdc68cfd40f791240af497d4a793
source: https://www.notion.so/94bfbdc68cfd40f791240af497d4a793
---

# core_stickyLifts

> ⚡ script "core\_stickyLifts" (int mode)

## Usage

---

This script is used to create rideable platforms like those seen on MM1GUT.

Make sure when using this script to apply `var int user_playerRiding[64];` to the calling actor’s properties.

> 🚨 **If applying this script to an actor that is going to die or disappear, make sure to take away **`“CutterFlag”`** in the death state at least one tick before the actor disappears. Otherwise, players may be able to use this script to go out of bounds in certain circumstances.**

### Parameters

- `mode`: int - The carry mode of the platform:
  - `STICKYMODE_GUTSLIFT`: Carries players riding on top. Momentum is transferred when jumping off. Used by Ice Wall, the blocks on MMBCOL, and the lifts on MM1GUT.

  - `STICKYMODE_MAGFLY`: Players underneath are dragged upwards until they hit the bottom of this actor. Used by the magnets on MM3MAG.
