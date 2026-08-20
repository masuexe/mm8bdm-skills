---
title: "SetMugshotColorGlow"
notion_id: a27904c13ffb44fbb3ad29dfda199613
source: https://www.notion.so/a27904c13ffb44fbb3ad29dfda199613
---

# SetMugshotColorGlow

> 📦 BARLIB.acs

> ⚡ void SetMugshotColorGlow(int cyan, int blue, int black)

## Usage

---

By default, when drawing a bar, it will already handle the colors for the base mugshot as well. However, this function can be used to draw a separate mugshot color for the base mugshot from the color being drawn for the bar.

Alternatively, you can use this function to set a mugshot color without even needing to draw a bar!

### Parameters

- `cyan`: Int - The palette color to change palette color 192 (cyan) to.

- `blue`: Int - The palette color to change palette color 198 (blue) to.

- `black`: Int - The palette color to change palette color 0 (black) to.

## Example

---

Homing Sniper shows the charge animation on the mugshot while the bar shows a simple overlay bar, the code below is how it accomplishes that.

```c
actor HomingSniperWep_NormalBar : NormalBar { args 192, 230 }
actor HomingSniperWep_ScriptBar : ScriptBar {}
```

```javascript
script "DrawBar_HomingSniperWep" (void) {
    if(GetUserCvar(ConsolePlayerNumber(),"mm8bdm_usechargebars")) {
        if(CheckInventory("WeaponChargeLevel") >= 2) {
            if(Timer() % 3 == 1) {
                SetMugshotColorGlow(0,192,230);
            } else if (Timer() % 3 == 2) {
                SetMugshotColorGlow(230,0,192);
            } else if (Timer() % 3 == 0) {
                SetMugshotColor(192,230);
            }
        } else if(CheckInventory("WeaponChargeLevel") >= 1) {
            if(Timer() % 2 == 1) {
                SetMugshotColorGlow(192,230,26);
            } else {
                SetMugshotColor(192,230);
            }
        } else {
            SetMugshotColor(192,230);
        }
    } else {
        SetMugshotColor(192,230);
    }
    if(CheckInventory("HomingSniperCharge") > 0) SetOverlayBar(CheckInventory("HomingSniperCharge"), 4);
}
```

## See Also

---

[SetMugshotColor](./setmugshotcolor-c71038d3.md)
