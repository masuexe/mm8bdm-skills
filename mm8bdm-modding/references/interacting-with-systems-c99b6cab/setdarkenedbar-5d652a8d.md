---
title: "SetDarkenedBar"
notion_id: 5d652a8d5374498987cb141a32701cff
source: https://www.notion.so/5d652a8d5374498987cb141a32701cff
---

# SetDarkenedBar

> 📦 BARLIB.acs

> ⚡ void SetDarkenedBar(void)

## Usage

---

Gives the primary ammo bar a darkened effect.

## Example

---

```
script "DrawBar_SkullBarrierWep" (void) {
	if(CheckInventory("SkullShieldCheck")) SetFlashingBar();
	if(CheckInventory("SkullBarrierCooldown")) SetDarkenedBar();
}
```

## See Also

---

[SetDarkenedBar2](./setdarkenedbar2-c7c13a33.md)

[SetDarkenedBarHP](./setdarkenedbarhp-9dfceb9e.md)
