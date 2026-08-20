---
title: "SetOverlayBarHP"
notion_id: 978d7c2bf09b4175b0fba98883c5dbc0
source: https://www.notion.so/978d7c2bf09b4175b0fba98883c5dbc0
---

# SetOverlayBarHP

> 📦 BARLIB.acs

> ⚡ void SetOverlayBarHP(int owned, int capacity)

## Usage

---

Draws a flashing, overlay bar on the health bar which draws from the bottom of the bar upwards.

### Parameters

- `owned`: Int - The amount to draw for the bar.

- `capacity`: Int - The capacity of the bar.

> 💡 **Note: One way to visualize what these latter two parameters do is that they set up a ratio that equals the percentage of the bar drawn. If I own 2 **`HomingSniperCharge`** and the capacity is 4, then it sets up the ratio 2/4, meaning that 50% of the bar is drawn.**

## See Also

---

[SetOverlayBar](./setoverlaybar-a4554a75.md)

[SetOverlayBarReverse](./setoverlaybarreverse-176de6ab.md)

[SetOverlayBar2](./setoverlaybar2-c7ecc71c.md)

[SetOverlayBarReverse2](./setoverlaybarreverse2-44fdd1a3.md)

[SetOverlayBarReverseHP](./setoverlaybarreversehp-70f4edb2.md)
