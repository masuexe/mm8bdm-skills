---
title: "DrawBarColorGlow"
notion_id: fe29747ca2854d58893e5c32fc2524d6
source: https://www.notion.so/fe29747ca2854d58893e5c32fc2524d6
---

# DrawBarColorGlow

> 📦 BARLIB.acs

> ⚡ 
>
> void DrawBarColorGlow(int cyan, int blue, int black)

## Usage

---

Used to draw an ammo bar with the given palette colors. It uses the weapon’s primary ammo to determine how much of the bar to draw.

### Parameters

- `cyan`: Int - The palette color to draw within the middle of the bar.

- `blue`: Int - The palette color to draw within the outer portion of the bar.

- `black`: Int - The palette color to draw within the border of the bar.

## Example

---

This is Magma Bazooka’s `ScriptBar` script, it has two sections, one for the legacy style of charge bar animations and one for the newer style.

```javascript
script "DrawBar_MagmaBazookaWep" (void) {
    if(GetUserCvar(ConsolePlayerNumber(),"mm8bdm_usechargebars")) {
        if(CheckInventory("WeaponCharge") >= 19) {
            if(Timer() % 3 == 1) {
                DrawBarColorGlow(216,42,38);
            } else if (Timer() % 3 == 2) {
                DrawBarColor(216,42);
            } else if (Timer() % 3 == 0) {
                DrawBarColorGlow(36,229,216);
            }
        } else {
            DrawBarColor(216,42);
        }
    } else {
        DrawBarColor(216,42);
        if(CheckInventory("WeaponCharge") >= 19) SetFlashingBar();
    }
}
```

## See Also

---

[DrawBarColor](./drawbarcolor-11e91750.md)

[DrawBar2Color](./drawbar2color-e6704b72.md)

[DrawBar2ColorGlow](./drawbar2colorglow-81228e97.md)
