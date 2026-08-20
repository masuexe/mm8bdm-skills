---
title: "SetOverlayBar2"
notion_id: c7ecc71c6ab040e797465dbcf7a708d3
source: https://www.notion.so/c7ecc71c6ab040e797465dbcf7a708d3
---

# SetOverlayBar2

> 📦 BARLIB.acs

> ⚡ void SetOverlayBar2(int owned, int capacity)

## Usage

---

Draws a flashing, overlay bar on the secondary ammo bar which draws from the bottom of the bar upwards.

### Parameters

- `owned`: Int - The amount to draw for the bar.

- `capacity`: Int - The capacity of the bar.

> 💡 **Note: One way to visualize what these latter two parameters do is that they set up a ratio that equals the percentage of the bar drawn. If I own 2 **`HomingSniperCharge`** and the capacity is 4, then it sets up the ratio 2/4, meaning that 50% of the bar is drawn.**

## See Also

---

[SetOverlayBar](./setoverlaybar-a4554a75.md)

[SetOverlayBarReverse](./setoverlaybarreverse-176de6ab.md)

[SetOverlayBarReverse2](./setoverlaybarreverse2-44fdd1a3.md)

[SetOverlayBarHP](./setoverlaybarhp-978d7c2b.md)

[SetOverlayBarReverseHP](./setoverlaybarreversehp-70f4edb2.md)
