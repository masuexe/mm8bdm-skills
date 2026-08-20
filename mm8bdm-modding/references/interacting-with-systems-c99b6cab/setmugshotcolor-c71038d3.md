---
title: "SetMugshotColor"
notion_id: c71038d3740a49529c11dfd74531478d
source: https://www.notion.so/c71038d3740a49529c11dfd74531478d
---

# SetMugshotColor

> 📦 BARLIB.acs

> ⚡ void SetMugshotColor(int cyan, int blue)

## Usage

---

By default, when drawing a bar, it will already handle the colors for the base mugshot as well. However, this function can be used to draw a separate mugshot color for the base mugshot from the color being drawn for the bar.

Alternatively, you can use this function to set a mugshot color without even needing to draw a bar!

### Parameters

- `cyan`: Int - The palette color to change palette color 192 (cyan) to.

- `blue`: Int - The palette color to change palette color 198 (blue) to.

## Example

---

The code below sets mugshot colors for a Proto Strike buster upgrade without needing to draw a bar.

```c
script "DrawBar_ProtoStrike" (void) {
	SetMugshotColor(87, 42);
}
```

## See Also

---

[SetMugshotColorGlow](./setmugshotcolorglow-a27904c1.md)
