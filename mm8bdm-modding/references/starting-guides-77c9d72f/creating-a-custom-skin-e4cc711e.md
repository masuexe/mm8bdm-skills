---
title: "Creating a Custom Skin"
notion_id: e4cc711e41314096936b70f0bbe496fd
source: https://www.notion.so/e4cc711e41314096936b70f0bbe496fd
---

# Creating a Custom Skin

---

Have you ever seen a blue-and-cyan robot running around your Mega Man 8-bit Deathmatch video game and thought, “Hey! I want to make one of those!” Well, if you’ve got the time and motivation, it’s surprisingly simple!

> 💡 **Required Materials:**
>
> - An image editing program that supports PNG transparency (such as [GIMP](https://www.gimp.org/downloads/), [Paint.NET](https://www.getpaint.net/download.html), [Aseprite](https://www.aseprite.org/), etc.)
>
> - [Trillster’s Skin Assembler](https://trillster.dev/?project=Skin)

## Creating your skin

---

First things first, we have to create the individual frames for the skin. 

To the right is a very basic example sheet showing every unique frame - there are 40 frames in total.

More accurately, there are 8 sets of 5 frames - The lettered rows (A, B, C, etc.) are the different action states, while the numbered columns (1, 8/2, 7/3, etc.) are the rotated angles of those actions. 

So essentially, your workload is the following:

- A rotated idle frame

- A rotated movement animation

- Rotated firing frame(s)

- At least 2 pain frames (front-right and back-right)

<!-- image omitted (assets not vendored) -->

With that out of the way, there are a few more additional things to know about the frames themselves.

For compatibility with the base game’s weapons, it is important that your skins are primarily colored using **Blue (#0078FC)** and **Cyan (#00F8FC)**.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

When the player switches to a different weapon, the weapon calls a script that modifies the values of these two colors.** If these colors are not on your frames, your character will not change colors when switching weapons**. You might imagine you could use this to gain an unfair advantage in multiplayer games, but really it just means other players won’t download your skin.

This doesn’t mean that you can’t use other colors on your skins, though!

<!-- image omitted (assets not vendored) -->

This is the palette that the game uses. The numbers on each color signify their internal palette number — the numbers don’t matter for this tutorial, but it’s useful knowledge regardless.

From this palette, we can pick out a few other commonly used colors.

<!-- image omitted (assets not vendored) -->

**#000000** is pure black. Useful on just about any skin for outlines and such.

<!-- image omitted (assets not vendored) -->

**#FFFFFF** is pure white. Useful for additional detailing, such as basic highlighting or… parts of the skin you want to be white.

<!-- image omitted (assets not vendored) -->

**#FCFCFC** is “eye white,” an off-white that isn’t affected by certain flashing charge weapons. Use it on your skin’s eyes!

In Software renderer, any colors on a skin that do not exist on the internal palette will be automatically changed to their nearest palette equivalent. Because of this, it’s generally a good idea to limit yourself to using those colors so that you can avoid weirdness.

---

That’s about all that you NEED to know to make a skin, but here are some basic tips and easy things you can do to keep your skins in decent quality:

- If you want your skin to fit in with the Mega Man visual style, check out the individual frames of the skins you like and try to reference what they do.
  - Do note, however: skins in the base game have been made by dozens of people throughout the game’s lifespan, so there’s no definitive “style” to follow. Pick and choose the methods you like best!

- Generally, it’s a good etiquette to make sure that rotational frames have consistency in their height. An example can be seen below:

<!-- image omitted (assets not vendored) -->

- If you’re stuck with a certain part of your skin, don’t be afraid to ask around the community for help!

This is the point where you would go and make the frames for your skin. Come back when it’s all done!

## Assembling the Skin

---

Now that you’ve got your sprites finished, go ahead and open up Trillster’s Skin Assembler. When you first open the Skin Assembler, you’ll see a view similar to the image below.

<!-- image omitted (assets not vendored) -->

You should first take the moment to fill in the fields on the left side. Any field with an asterisk to the left of it is mandatory to fill out.

- The author is you, of course!

- The skin display name is the name that appears in Player Setup.

- The sprite name is a 4 character name that your sprites will use internally. Try to choose a name that sounds unique, one that won’t conflict with existing sprites!

- The crouching sprite name is another 4 character name that will be used if you define a set of crouching sprites to be used while the player is crouching with your skin.

- The class is the class that will be able to use the skin once it’s created. If you’re just creating this skin for base Mega Man 8-Bit Deathmatch, keep it as `Megaman`

For the sound fields, it’ll ask you to upload a sound to be used for each of those scenarios. You can find some default sounds to use in the same directory that the Skin Assembler downloaded into.

The mugshot sprite name is a 3 character name that will be used for your mugshot if you provide one. This name should be unique and not conflict with any other mugshot sprite names. The mugshot sprite that you upload should be a 32px by 32px image.

The gender of the skin is an unused property, so it can be left alone.

The highlighted area to the right is a set of buttons that can be used to swap the set of frames that you are viewing. As mentioned previously, A is for idle, BCDE is for walking, FG is for attacking, and H is for hurt.

The section just underneath the highlighted area will allow you to add extra frames to the skin for the purpose of class skins.

<!-- image omitted (assets not vendored) -->

The slider below Proto Man there will allow you to spin him around to view the different rotations for a given frame. You can also change how many rotations the skin has for a given frame just below the slider. The Maestro skin above had 5 frames, but you can have skins with even 8 rotations per frame!

Sometimes when creating a skin, you may have the skin rotating in a different direction, rotating towards the left rather than rotating towards the right like Maestro is. In that case, you can toggle the checkbox to invert the rotations and keep that on for the entire process of assembling the skin.

We can see the effect that has below:

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

Now that all of the basic controls are known, you can begin slotting in your own sprites! To start this process, click the `Open Spritesheet` button near the bottom right. It’ll ask you to navigate to your sprite sheet to open it up.

Once you do that, you’ll see a few new windows open up such as below.

<!-- image omitted (assets not vendored) -->

What the program has done is separated each of your sprites and bordered each one with a purple outline. If your sprite sheet doesn’t look like this, you may want to give more breathing room between the individual sprites and give more of a border around your sprite sheet as a whole.

With this sprite sheet opened, you can now just click on a sprite in the sprite sheet and it’ll replace the Proto Man sprite. Make sure to do this for every rotation of every frame!

<!-- image omitted (assets not vendored) -->

Once you’ve done this for every rotation of every frame, you can hit the `Process Skin` button in the bottom left. This will ask you to select a directory to place the finalized skin in.

If you’ve made a mistake in filling out the info on the left side, you may get a warning or error, so be sure to correct that and to try again.

## Trying it Out

---

Once you have your file, navigate to your Mega Man 8-Bit Deathmatch folder. There should be a skins folder there — put your file in there!

Boot up the game, and if you did everything right, you should see your skin in the Player Setup skin list towards the end.

## Troubleshooting

---

**Q: How do I get other people online to see my skin?**

**A:** People will only be able to see your skin if they also have it installed and loaded in their skins folder. Alternatively, you can host it as a required / optional file on a multiplayer server for people to download and load.

**Q: My skin is working fine, but it’s jittering around weirdly in some frames.**

**A:** This is can be solved pretty easily, but it involves editing the `.pk3` file that you get from the Skin Assembler. Look at the page for [Adding Custom Graphics](./adding-custom-graphics-28261edf.md) to learn about graphic offsets.

**Q: I get an “Invalid data encountered” error when loading my skin / my sounds don’t work!**

**A:** This can occur when you have sound files that share the first 4 four characters with your skin sprite name. You should try to avoid reusing the same first 4 four characters for the sounds to avoid this.

## See Also

---

[Adding Custom Graphics](./adding-custom-graphics-28261edf.md)
