---
title: "SetOverlayBarReverse"
notion_id: 176de6ab2f4241eabb5e263b9183e0a7
source: https://www.notion.so/176de6ab2f4241eabb5e263b9183e0a7
---

# SetOverlayBarReverse

> 📦 BARLIB.acs

> ⚡ void SetOverlayBarReverse(int owned, int capacity)

## Usage

---

Draws a flashing, overlay bar on the primary ammo bar which draws from the top of the bar downwards.

### Parameters

- `owned`: Int - The amount to draw for the bar.

- `capacity`: Int - The capacity of the bar.

> 💡 **Note: One way to visualize what these latter two parameters do is that they set up a ratio that equals the percentage of the bar drawn. If I own 2 **`HomingSniperCharge`** and the capacity is 4, then it sets up the ratio 2/4, meaning that 50% of the bar is drawn.**

## Example

---

```javascript
script "DrawBar_DeepDiggerWep" (void) {
	SetOverlayBar(CheckInventory("DeepDiggerFlagL"), 2);
	SetOverlayBarReverse(CheckInventory("DeepDiggerFlagR"), 2);
}
```

## See Also

---

[SetOverlayBar](./setoverlaybar-a4554a75.md)

[SetOverlayBar2](./setoverlaybar2-c7ecc71c.md)

[SetOverlayBarReverse2](./setoverlaybarreverse2-44fdd1a3.md)

[SetOverlayBarHP](./setoverlaybarhp-978d7c2b.md)

[SetOverlayBarReverseHP](./setoverlaybarreversehp-70f4edb2.md)
