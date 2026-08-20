---
title: "DrawCustomBar"
notion_id: c036f3e3d7764251807d5d76626801f4
source: https://www.notion.so/c036f3e3d7764251807d5d76626801f4
---

# DrawCustomBar

> 📦 BARLIB.acs

> ⚡ void DrawCustomBar(int slot, int amount, int capacity)

## Usage

---

This function allows you to use a custom styled bar in lieu of the standard segmented bar. The only caveat is that you must choose a bar slot from a limited inclusive range 0-255 and you have to define a `TEXTURES` definition for the bars.

The `TEXTURES` to create are `BRSLTXXX` (vertical bar full), `BRSLBXXX` (vertical bar empty), `VRSLTXXX` (horizontal bar full), `VRSLBXXX` (horizontal bar empty) where `XXX` is some 0-padded number in the inclusive range 0-255 (Ex. `005`). The offsets of this definition determine where on the screen the custom bar is placed, so use that to create secondary versus primary bar placements.

See the example below for a practical example of using this function.

### Parameters

- `slot`: Int - The bar slot that you’ve defined `TEXTURES` for.

- `amount`: Int - The amount to draw for the bar.

- `capacity`: Int - The capacity of the bar.

> 💡 **Note: One way to visualize what these latter two parameters do is that they set up a ratio that equals the percentage of the bar drawn. If I own 2 **`HomingSniperCharge`** and the capacity is 4, then it sets up the ratio 2/4, meaning that 50% of the bar is drawn.**

## Example

---

These blocks of code define a custom bar which looks like Dust Man’s bar.

```c
actor DustCrusherBoss_ScriptBar : ScriptBar {}
```

```javascript
script "DrawBar_DustCrusherBoss" (void) {
    DrawCustomBar(100, CheckInventory("CrushEmAmmo"), GetAmmoCapacity("CrushEmAmmo"));
    SetInventory("SBARAmmoOffset",1);
    DrawNormalAmmo();
}
```

Note the manual drawing of the ammo number and using `SBARAmmoOffset` so that the custom bar doesn’t clip with the ammo number.

```c
texture BRSLT100, 8, 56{offset -16,-8 patch DUSBAR, 0, 0}
texture BRSLB100, 8, 56{offset -16,-8 patch DUSEMPTY, 0, 0}
texture VRSLT100, 56, 8{offset -58,-184 patch DUSBAR, 0, 0 {rotate 90}}
texture VRSLB100, 56, 8{offset -58,-184 patch DUSEMPTY, 0, 0 {rotate 90}}
```

Note that the number at the end of these `TEXTURES` matches the slot being used in the ACS code. Also note the offsets being used for a primary ammo bar for vertical and horizontal bars.
