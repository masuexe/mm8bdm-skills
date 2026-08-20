---
title: "Adding Custom Graphics"
notion_id: 28261edf902c43e38e0a9f4f6df51645
source: https://www.notion.so/28261edf902c43e38e0a9f4f6df51645
---

# Adding Custom Graphics

---

Adding custom graphics is a skill that crosses many domains in our game, so it’s very important to learn how! Thankfully, it’s very simple once you know what to do.

> 💡 **Required Materials:**
>
> - [**SLADE 3**](https://slade.mancubus.net/index.php?page=downloads)

If you’ve already got a PK3 file with some sprites in it (potentially from the Skin Assembler), then you can open the PK3 file that you have and skip ahead to the [offset portion](./adding-custom-graphics-28261edf.md). Otherwise, it’s recommended to read through it all to know how to start fresh.

## Starting a New PK3

---

For the sake of starting fresh, we’re gonna start this tutorial by just creating a new PK3 archive in SLADE. We can do this by opening SLADE and clicking on the buttons shown to the right. 

<!-- image omitted (assets not vendored) -->

Once you’ve clicked that `Archive` button, it’ll prompt you for which type of archive to create. You’ll want to create a `Zip Archive`. With our new archive, let’s go ahead and create some folders which we’ll need for the graphics. There are two main folders to focus on here, one for sprites and one for graphics.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

Now that we’ve made some changes to our archive, we can go ahead and save it using `CTRL + S`. Be very cognizant when saving this archive, because we want to save it as a PK3 file, not a standard ZIP file! The screenshot below shows me saving the file with the name `GraphicsDemo` and a file extension of `.pk3` so that we create a PK3 file.

<!-- image omitted (assets not vendored) -->

## Adding Some Graphics

---

Before we can begin modifying the offsets on graphics, we need to actually have the graphics in the archive. There’s some rules to keep in mind when bringing graphics into our file.

For general graphics and textures, the only rule is that it must have a name which is 8 or less characters in length. However, you should take care to make sure that the name you decide on does not conflict with any other graphic names!

For sprites, their name should be in the pattern of a 4 character sprite name, a 1 character frame, and a rotation number. An example is `PLY1A1`. This specifies the `PLY1` sprite name, the `A` frame, and a rotation number of `1`. The rotation numbers for a frame with 8 rotations are shown below:

<!-- image omitted (assets not vendored) -->

Typically, sprite frames in this game share the same graphic for the `2/8`, `3/7`, and `4/6` rotations. This is done in practice by using a naming scheme such as `PLY1A8A2`. `PLY1` is still the 4 character sprite name, `A` is the 1 character frame, and two rotations are combined, rotation `2` and `8`. 

For the first specified rotation number, the graphic is used as is, but for the second rotation number, the sprite is flipped horizontally.

If your frame is designed to have no rotations, then you can use one graphic with a `0` for the rotation number. With that in mind, let’s just toss some graphics into our project by dragging them into SLADE.

<!-- image omitted (assets not vendored) -->

## Offsets for Sprites

---

Once we have a graphic selected, SLADE opens a separate view for displaying them in a more appropriate format. We can use the section highlighted in orange below for zooming into the sprite. We can use the section highlighted in red to change the mode for rendering offsets. Lastly, the section in green shows the current horizontal and vertical offsets for the sprite.

<!-- image omitted (assets not vendored) -->

The horizontal line in the `Sprite` mode represents the floor, while the vertical line is how centered the sprite is. So in our case, we can see our sprite is not well centered and is well below the floor. We can fix this either by dragging the graphic itself or using the number fields in the bottom left. Don’t forget to save the graphic when done!

<!-- image omitted (assets not vendored) -->

We’ve also added some skin sprites into our archive. For these ones, let’s try using the `Automatic Offset` feature by clicking the button highlighted below.

<!-- image omitted (assets not vendored) -->

Clicking that button will bring up a menu that looks as follows. Typically `Monster (GL-Friendly)` is the best auto offset method to use for skins, so let’s go with that.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

We’re just about done with this sprite. Skins in Mega Man 8-Bit Deathmatch are typically sunk into the floor by 1 pixel to look a bit better, so let’s go back to that menu where the `Automatic Offset` was. Instead, this time we’ll use the `Set Offsets` option with `Relative` toggled.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

Now that we know the process of doing `Automatic Offsets` and relative `Set Offsets` for one sprite, let’s do it in bulk for the rest. Select all the sprites that you wish to change the offsets of and click the `Modify Gfx Offsets` button.

<!-- image omitted (assets not vendored) -->

Clicking that button will bring up the same GUI as previously, so let’s just do the same steps.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

As a final note, typically, any graphics file that’s in a `graphics` folder won’t have offsets set for it. That’s because those files are instead used for special definitions in a [`TEXTURES`](https://zdoom.org/wiki/TEXTURES) file which typically redefines the offsets.

## Example File

---

[GraphicsDemo.pk3](../assets/875865a15ccb4abba35fd9afca4e79b7-GraphicsDemo.pk3)
