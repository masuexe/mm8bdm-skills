---
title: "Water Sector"
notion_id: 98eda73c55944d0ab7add14567a65da1
source: https://www.notion.so/98eda73c55944d0ab7add14567a65da1
---

# Water Sector

> ⚡ actor MM8BDM\_Water 10560

## Usage

---

`"Water Sector"` is a Thing located under the category `MM8BDM-Mapper Tools`. This object is used to create water.

To create water in your map, simply place this actor down, click the `Action / Tag / Misc.` tab, and fill in the necessary info.

### Action and Identification

- Argument 1: `Water Direction` - Which direction to build the water.
  - `"Down"` - Everything beneath this actor becomes water.

  - `"Up"` - Everything above this actor becomes water.

  - `"Use height of current sector"` - Everything between the floor and ceiling of the sector this thing is placed within becomes water.

> 💡 **Tip: The **`“Use height of current sector”`** option is actually quite versatile—anything below the floor of the containing sector or above its ceiling will not be counted as being in water. This means you can create floating cubes or water, or suspended tanks of liquid, or a vertical flowy tube of water that jets out from a pipe and loops around. It’s also useful for creating a simple hallway that is completely submerged.**

- Tag: `Tag` - Which tag to apply the water to. 0 Applies the water to all tags and prevents other sectors from being created.

> 💡 **Tip: Water building with this actor is all relative to the actor’s current vertical position. A common strategy for water creation is to place the actor *****within the 3D floor control sector that visualizes the water*****. This allows the mapper to directly manipulate the position of the 3D floor itself to change the water level. This can even be done at runtime to allow water to either fill up, or drain, without needing to do any sort of cumbersome management.**

## See Also

---

[map_watersplash](./mapwatersplash-397ccfe2.md)
