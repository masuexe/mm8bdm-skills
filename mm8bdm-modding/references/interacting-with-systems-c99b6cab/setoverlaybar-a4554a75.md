---
title: "SetOverlayBar"
notion_id: a4554a75397645f5ab69deb1aa00b7dc
source: https://www.notion.so/a4554a75397645f5ab69deb1aa00b7dc
---

# SetOverlayBar

> 📦 BARLIB.acs

> ⚡ void SetOverlayBar(int owned, int capacity)

## Usage

---

Draws a flashing, overlay bar on the primary ammo bar which draws from the bottom of the bar upwards.

### Parameters

- `owned`: Int - The amount to draw for the bar.

- `capacity`: Int - The capacity of the bar.

> 💡 **Note: One way to visualize what these latter two parameters do is that they set up a ratio that equals the percentage of the bar drawn. If I own 2 **`HomingSniperCharge`** and the capacity is 4, then it sets up the ratio 2/4, meaning that 50% of the bar is drawn.**

## Example

---

```javascript
script "DrawBar_TenguBladeWep" (void) {
	if(CheckInventory("WeaponCharge")>0) SetOverlayBar(CheckInventory("WeaponCharge"), 25);
}
```

## See Also

---

[SetOverlayBarReverse](./setoverlaybarreverse-176de6ab.md)

[SetOverlayBar2](./setoverlaybar2-c7ecc71c.md)

[SetOverlayBarReverse2](./setoverlaybarreverse2-44fdd1a3.md)

[SetOverlayBarHP](./setoverlaybarhp-978d7c2b.md)

[SetOverlayBarReverseHP](./setoverlaybarreversehp-70f4edb2.md)
