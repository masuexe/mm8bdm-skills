---
title: "SetFlashingBar"
notion_id: 853408ee72184b67bcc653a16fe4407c
source: https://www.notion.so/853408ee72184b67bcc653a16fe4407c
---

# SetFlashingBar

> 📦 BARLIB.acs

> ⚡ void SetFlashingBar(void)

## Usage

---

Gives the primary ammo bar a basic flashing effect.

## Example

---

```javascript
script "DrawBar_BlackHoleBombWep" (void) {
	if(CheckInventory("BlackHoleBombCooldown")) SetFlashingBar();
}
```

## See Also

---

[SetFlashingBar2](./setflashingbar2-6e829871.md)

[SetFlashingBarHP](./setflashingbarhp-14516244.md)
