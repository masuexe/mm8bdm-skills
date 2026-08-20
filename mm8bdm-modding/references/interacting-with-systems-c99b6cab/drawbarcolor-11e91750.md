---
title: "DrawBarColor"
notion_id: 11e917502542439a814b3be093d80f00
source: https://www.notion.so/11e917502542439a814b3be093d80f00
---

# DrawBarColor

> 📦 BARLIB.acs

> ⚡ 
>
> void DrawBarColor(int cyan, int blue)

## Usage

---

Used to draw an ammo bar with the given palette colors. It uses the weapon’s primary ammo to determine how much of the bar to draw.

### Parameters

- `cyan`: Int - The palette color to draw within the middle of the bar.

- `blue`: Int - The palette color to draw within the outer portion of the bar.

## Example

---

This is a simple `ScriptBar` script that uses this function to draw its bar.

```javascript
script "DrawBar_SparkScatterWep" (void) {
	DrawBarColor(4, 229);
}
```

## See Also

---

[DrawBarColorGlow](./drawbarcolorglow-fe29747c.md)

[DrawBar2Color](./drawbar2color-e6704b72.md)

[DrawBar2ColorGlow](./drawbar2colorglow-81228e97.md)
