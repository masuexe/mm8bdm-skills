---
title: "DrawSecondAmmo"
notion_id: a1116b9280bf46bf82f7cc101cbcbf0e
source: https://www.notion.so/a1116b9280bf46bf82f7cc101cbcbf0e
---

# DrawSecondAmmo

> 📦 BARLIB.acs

> ⚡ void DrawSecondAmmo(void)

## Usage

---

This function will begin drawing the ammo numbers for the secondary ammo of the weapon, without needing to specify a standard bar for it.

This is primarily useful if you’re using [DrawCustomBar](./drawcustombar-c036f3e3.md), as that does not natively support ammo numbers like drawing normal and secondary bars do.

## Example

---

This `ScriptBar` script will draw only ammo numbers for the primary and secondary ammo of the weapon, but offset as if there were two bars between the ammo numbers and the HP bar.

```javascript
script "DrawBar_InvisibleBarWep" (void) {
	SetInventory("SBARAmmoOffset",2);
  DrawNormalAmmo();
  DrawSecondAmmo();
}
```

## See Also

---

[DrawNormalAmmo](./drawnormalammo-3c94c3d6.md)
