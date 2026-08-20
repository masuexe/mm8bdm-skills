---
title: "SetOverlayBarReverseHP"
notion_id: 70f4edb2504a45fab934614c80563dc8
source: https://www.notion.so/70f4edb2504a45fab934614c80563dc8
---

# SetOverlayBarReverseHP

> 📦 BARLIB.acs

> ⚡ void SetOverlayBarReverseHP(int owned, int capacity)

## Usage

---

Draws a flashing, overlay bar on the health bar which draws from the top of the bar downwards.

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

[SetOverlayBarHP](./setoverlaybarhp-978d7c2b.md)
