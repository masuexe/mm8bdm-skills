---
title: "Map Previews for Map Voting"
notion_id: 12379ff1ba8b49039644ba4071f747b9
source: https://www.notion.so/12379ff1ba8b49039644ba4071f747b9
---

# Map Previews for Map Voting

---

[Map Voting](https://mm8bdm.net/forum/thread/map-voting-126) is an unofficial quality of life addon which allows players to vote on the next map.

![image](https://trillster.dev/images/example%20(1).png)

As shown above, as part of Map Voting’s UI, it provides a visual preview for each map. By default, Map Voting will show a placeholder graphic for custom maps, but it also provides a means for them to implement their own previews.

This page will detail everything needed to add a good map preview for your own maps.

## Taking the Picture

---

Map Voting previews are designed to take after the stage previews seen in Light’s Lab, so they share the same resolution and style guide. This entails having pickups enabled and all UI elements turned off. The easiest way to do this is to enter the map in Deathmatch mode, turning off crosshair, turning off the spectating indicator, and setting the UI style to disabled. These settings can both be found in the [UI Settings](../user-settings-4b8a0d76.md) menu. Alternatively, you can use the console commands `crosshair 0`, `r_drawspectatingstring false`, and `screenblocks 12`.

```javascript
alias screenie "spectate; crosshair 0; screenblocks 12; r_drawspectatingstring false"
```

The final resolution required for the images is 512x384. Your resolution can be changed in the [Video Settings](../user-settings-4b8a0d76.md) menu. Depending on your graphics driver, you may be able to just use this final resolution in-game, in which case, you *should* take your screenshot using it. However, 1024x768 tends to be the only one supported, meaning you will more likely have to use that resolution instead.

If that latter case is true, then you will have to resize the screenshot by 50% to make it into the final 512x384 resolution. You should use an art program which supports `Nearest Neighbor` resize filtering, meaning that no aliasing is used and no artifacting occurs. 

Below is a comparison of a bad preview which breaks the style guide versus a proper one.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

## Implementing the Picture

---

Once you have your picture finalized, you should name it the same as whatever your map’s map code is. For example, if the map is `RNCWOO`, then the map preview would be named `RNCWOO.png`. Place this graphic into a `textures` folder in your map pack’s PK3 and it should be all set.

<!-- image omitted (assets not vendored) -->

## Testing the Picture

---

Map Voting provides a debug command for ensuring that it is picking up your map’s preview and showcasing what it would look like in-game.

All you need to do is load Map Voting and your pack together offline and type into chat `!preview` followed by your map’s map code. For example, to test that `RNCWOO` has its map preview functioning, you would type into chat `!preview RNCWOO` like below.

<!-- image omitted (assets not vendored) -->
