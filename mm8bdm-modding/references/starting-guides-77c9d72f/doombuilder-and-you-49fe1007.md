---
title: "Doombuilder and You"
notion_id: 49fe1007ef6b4735b7b02585e2153b4e
source: https://www.notion.so/49fe1007ef6b4735b7b02585e2153b4e
---

# Doombuilder and You

---

> 💡 **Required Materials:**
>
> - [**Ultimate Doom Builder**](https://forum.zdoom.org/viewtopic.php?t=66745)
>
> - [**SLADE 3**](https://slade.mancubus.net/index.php?page=downloads)

> ⚠️ **Common Issue Resolutions:**
>
> - If you can’t run Ultimate Doom Builder, use [GZDoom Builder-Bugfix](https://forum.zdoom.org/viewtopic.php?t=54957) instead.
>
> - If Doom Builder freezes after using the texture editor (eg. on reload resources or save) download [this Map Resources file](https://drive.google.com/file/d/13AbPpQ8MJ12FLvnhsDQ1RHxE75UGC9AP/view?usp=share_link) and use it in instead of the MM8BDM pk3 as a Doom Builder resource.

## Table of Contents

## Chapter C1 - Setting Up

---

So you just installed the latest and hip level editor that is "The Doombuilder". First we're going to need to get you set up. Open Doombuilder and press F6. You'll be brought to the screen shown.

Select **Zandronum: Doom 2 (UDMF)** format.

<!-- image omitted (assets not vendored) -->

Next you'll want to add resources.

<!-- image omitted (assets not vendored) -->

Head to **PK3/PK7 tab**, then locate and add your MM8BDMv##.pk3 file. (Where ## is the latest version number/letter) Add those in and make sure "**exclude this resource from testing parameters**" is left unticked.

At time of writing, the latest version is **MM8BDM-v6b.pk3.**

<!-- image omitted (assets not vendored) -->

> 💡 If Doom Builder has issues loading textures, please download the Mapping Resources file [here](https://drive.google.com/file/d/13AbPpQ8MJ12FLvnhsDQ1RHxE75UGC9AP/view?usp=share_link). Installation process is the same, just make sure to **replace** the MM8BDM pk3 with the resource pack.

Head over to the Testing tab

<!-- image omitted (assets not vendored) -->

Under application select the location to your **Zandronum.exe.** The skill level is **4**. Copy/paste the text below into the parameters field:

```javascript
-iwad "megagame.wad" -skill "4" -file "%AP" "%F" +map %L %NM -deathmatch
```

Press F5 to open the **Preferences** window and head to the **Controls** tab.

![image](https://i.imgur.com/0901qoE.png)

The only thing I've changed is Q-\>W for **Visual Mode**, but you can adjust your settings however you want. Just be aware this tutorial will use default controls.

Head to the **Appearance** tab.

![image](https://i.imgur.com/gb1G0j6.png)

Make sure the slider for **Anisotropic filtering** is set to "None". Adjust other settings how you want.

Finally, it's time to start a new map. Go to **File-\>New Map** to be greeted to the screen in the below screenshot.

<!-- image omitted (assets not vendored) -->

Make sure your game configuration is set to **Zandronum (Doom 2) UDMF**. This is the exact same configuration we just set our resources up for. The level name presented here is the map code, not the actual map name. If you're making a pack, usually it'll be your letter identifiers followed by numbers ## (For example, in Rozpack I use the codes Roz01-Roz20 and Ark01-Ark15).

> 💡 Make sure to change the default map code. If it stays on **MAP01**, you're going to accidentally replace Light's Lab.

Once the map opens, you’ll see **5 warnings** in the bottom right corner. Those are normal and can be disregarded.

## Chapter C2 - The Basics

---

![image](https://i.imgur.com/Co7kxFO.png)

Once open, familiarize yourself with the highlighted boxes. They’re the tools you’re going to end up using the most.

Blue Box (Top to Bottom): **Vertices Mode, Linedef Mode, Sector Mode, Things Mode, Make Sectors Mode**

Red Box (Left to Right): **New Map, Open Map, Save Map, Script Editor**

Purple Box (Left to Right): **Cut, Copy, Paste**

Pink Box (Left to Right): **View Wireframe, View Brightness Levels, View Flooring Texture, View Ceiling Texture**

Green Box (Left to Right): **Snap to Grid, Dynamic Grid Size, Snap to Geometry**

Next to the Help tab (Left to Right): **Copy Properties, Paste Properties, Paste Properties Special** (In **Linedef Mode**, the word **Linear** appears on this row. To the immediate right of that is a string with two blue dots on the end. This is **Curved Linedefs Mode.**)

The following shortcuts are also of major use:

- Ctrl C - Copy

- Ctrl V/Mouse wheel click - Paste

- Shift + J - Join Sectors

- Insert - Place a vertex/start drawing a line

- Delete - Deletes desired thing

- E - Edit

- F - Flip Linedef

- W - Enter Visual Mode

- F3 - Texture/Thing Search

- F4 - Error Analysis

- F9 - Testing

Moving in Visual Mode

- E - Forward

- D - Backward

- S - Strafe Left

- F - Strafe Right

- Shift - Hold to move faster

- G - Toggle Gravity

Here's the grid.

<!-- image omitted (assets not vendored) -->

By default, each square is 32 units and each "Blue" square is 64 units. This game uses a "Rule of 32" and you should scale correctly towards that. Notice the **32mp** at the bottom of that screenshot? That tells you what **Gridmode** you're in. 

> 💡 Keep the option “grid snap” on and work in the mindset of 32x32. 16x16 can be used for detail while 8x8 can be used for super detail, but try not to shrink the grid any further than that.

There's a few exceptions we'll mention later on. For now, just stick to the blue lines when possible. The orange crosshair is the "center of the map". If you wish to grab everything when you're finished and readjust it to the center, feel free to do so but in no way is it mandatory.

Got all that? Good! Let's make a box!

Enter **Linedef Mode** and press insert to start the process of drawing a line. Click around and you'll draw lines. Draw a box. Woo.

![image](https://i.imgur.com/lnBVJRz.png)

Head to **Sector Mode** and right click the box to be brought to this screen, sort of. You need to hit the **Surfaces** tab first.

![image](https://i.imgur.com/P18pXIS.png)

This is where you'll manage what texture a surface is and any texture offsets they might have.

> 💡 If you see any orange exclamation marks (!) anywhere, those are "Missing Textures". When testing, these will create a “Hall of Mirrors” effect inside your map. You want to avoid these at any cost as they create visual glitchiness to your map.

Click on the big gray squares.

![image](https://i.imgur.com/H7QRFFk.png)

From here, you'll be able to select any texture loaded in. Use the filter at the bottom to specifically look for a texture.

> 💡 Functionally, don't put a wall texture on the floor, don't put a railing texture on the floor, etc. They have different size values, tile poorly, or transparency values that don’t work properly when used for purposes other than their intention. 

> 💡 Don’t be too concerned about where the texture originated from. Just because it’s a texture from Centaurman doesn’t mean it has to be used with other Centaurman textures. If it matches the overall feel or segment of a map you wanted to do, then use it.

You can do the same with linedefs, not just ceilings or floors. Linedefs have front and back sides while also being divided into three sections - Upper, Middle, and Lower.

![image](https://i.imgur.com/2Iy72AP.png)

> 💡 Fix texture offsets to the best of your ability. Please. Yes it takes an extra few minutes but your map will look so much nicer because of it.

Heading back to the **Properties** tab, you should see a screen similar to the above screenshot. This screen gives you access to special properties, tags, and a slew of other stuff.

![image](https://i.imgur.com/iu4TfFp.png)

> 💡 Note the Brightness parameter towards the bottom. For MM8BDM mapping, this number should be set to 255 at all times. This is "Max Brightness" and is set this way for gameplay/visibility reasons. Attempting to make it 256 or higher will reset it back to 0.

If you wish to edit an existing vertex, linedef, or sector, simply select what you need and press "E". You'll enter **Edit Mode** and be able to adjust any mistakes or shapes you created.

![image](https://i.imgur.com/7vSwy3T.png)

I stretched the sector I made and divided it into two sectors. If you wish to join the two sectors, select both of them and hit **Shift+J**. This will rejoin them together.

![image](https://i.imgur.com/vijYU8K.png)

Enter **Visual Mode** by pressing Q or whatever you bound your **Visual Mode** key to earlier. Feel free to navigate around in this 3D space, but notice the crosshair. Whenever it's pointed at something, that thing lights up. You can right click your selection to edit it in **Visual Mode.**

![image](https://i.imgur.com/XyUOfqH.png)

If you hold shift then click, you'll select almost everything connected to that surface. Useful for mass texturing or adjusting a wall.

![image](https://i.imgur.com/7MlgXXF.png)

If you wish to control it a bit more, select the beginning (far left) and end (far right) of the surface you want, then shift click. The selection will only take whats in between the two points.

I mass replaced the entire default texture wall with something more suitable.

![image](https://i.imgur.com/NowUzKa.png)

If you select a floor or ceiling, you can use your scroll wheel to raise or lower it without having to use the ceiling height/floor height properties in the **Properties** tab.

![image](https://i.imgur.com/59nzAGH.png)

Hit Ctrl+S or navigate to the **Save Map** icon at the top. Make sure the type is a .wad file and the filename is the same as the map code.

<!-- image omitted (assets not vendored) -->

## Chapter C3 - Things

---

Enter **Things Mode.** I'm going to go over a few common "Things" that are commonly used in this game.

Player starts are, well, important. 32 Deathmatch starts are mandatory in every map while the team spawns are used for modes that use them.

It is recommended for all maps made for Deathmatch to have the following player start counts:

- 32 Deathmatch Starts

- 16 Team Light and Team Wily Starts

- 8 Team Cossack and Team King starts

- 1 SP Player 1 Start

When you place a thing, remember that you can adjust its height.

![image](https://i.imgur.com/NIpVN5L.png)

One of the folders of things we use that aren't MM8BDM related is from the ZDoom folder. In here, The "Map Spot" thing is commonly used to place actors or other custom objects into the map. We don't really use any of the other ones. We also use the "Teleport" folder, but that has its own section in this tutorial.

![image](https://i.imgur.com/12JuADf.png)

## Chapter C4 - Walkable Stairs

---

It is time to ascend - let’s add some verticality to that layout of yours.

Create a few sectors that you desire to be stairs.

![image](https://i.imgur.com/JRRFtVd.png)

Enter **Visual Mode** and select all of the sectors that you just made.

![image](https://i.imgur.com/4Jk5Tea.png)

Raise them to the absolute highest point that you wish to make.

![image](https://i.imgur.com/99E62c4.png)

From there, lower the sectors down in increments of 16. This will make them walkable, thus not requiring the player to jump while climbing up them. If you want to make them jumpable, use 32 or 64 increments.

![image](https://i.imgur.com/wxkkHDa.png)

Clean up your new staircase with some textures that aren't default or gross.

![image](https://i.imgur.com/gHUwat9.png)

> 💡 Walkable stairs or jump stairs? Both have their own position and usage. If you want speed and free mobility, use walkable stairs. If you want to hold up an area of the map or to slow things down a bit, use jump stairs.

## Chapter C5 - Railings

---

Sometimes, you'll want railings. They look neat and, when constructed properly, can block shots from other players while still giving visibility.

Change the **Gridmode** to 16 map units and draw two squares. These will be the posts of where your rail will go. Posts are not necessary, but can make the rails logistically make more sense to exist.

![image](https://i.imgur.com/ZVBQWG9.png)

Draw a line between the two of them. This is your rail.

![image](https://i.imgur.com/VbY7K6s.png)

Right click to edit the linedef. Make sure "**Lower unpegged**" and "**Walkable middle texture**" are ticked.

![image](https://i.imgur.com/3BHx5Av.png)

Proceed to the Front and Back tabs. This is where you're going to add your rail texture. Select the middle box and choose a texture. Do the same for the other side that you didn't do.

![image](https://i.imgur.com/2UtMSZq.png)

Raise up your post by about 32 units. You'll need to add textures all around them, as currently they're missing.

![image](https://i.imgur.com/UHSQ0Cs.png)

A completed and textured rail, all set to save you from dying (or just to look cool)

![image](https://i.imgur.com/YQZ3fS2.png)

## Chapter C6 - Ladders

---

Ladders provide an alternative, more restrictive method of gaining access to higher ground. Strategically, these should generally be used as alternative ways to climb around areas and never part of the main route, as they end up creating a chokepoint. Well, unless that’s your desired effect.

Change the **Gridmode** to 16 map units and draw a line covering two squares (totaling 16 units in length).

> 💡 Take note of which direction the linedef is facing. You can tell by which way the orange line sticking out of the line. Make sure that faces towards the direction you want the player to climb the ladder on.

![image](https://i.imgur.com/n62X0Iq.png)

Right click the above highlighted line to enter the **Properties** tab. 

In the lower right corner of the red box shown, there is another box. This will open a "table of contents" of all the special actions you can apply to that line. Click it, scroll down to the "Thing" header, open that, and find "Thing Thrust Z". This is the action we're going to use. You can also search for this using the Filter field.

![image](https://i.imgur.com/xdzbVyF.png)

> 💡 Back in the **Properties Tab**, make sure you set your Force to 15. This is the standard speed that players climb ladders in MM8BDM.

As for the Activation requirements, tick "**Repeatable Action**", "**When Player Bumps**", and "**Front Side Only**".

See, the logistics behind this is that the player is running repeatedly into a wall, which the player is thrusted up at a speed of 15, only on the front side of the ladder.

![image](https://i.imgur.com/Bmlxedi.png)

If you get an offset, just fix it by readjusting the texture offset value to 0. You want your ladder to look right, after all.

![image](https://i.imgur.com/chQEKPg.png)

There we have it, a completed ladder.

![image](https://i.imgur.com/SsCYmJv.png)

> 💡 If an upper wall is directly above the ladder (They share the same linedef), then you'll also be able to climb that overhang, which is usually unintended and can create “invisible ladders”. To remedy this, simply push the ladder or the overhang out so that they no longer share the same linedef.

## Chapter C7 - Ramps

---

Ramps are a little tricky at first but are a neat tool we can use to make our sectors look a bit blocky. Some weapons interact differently with ramps, notably floorhuggers, so be sure to be aware of your layout’s surroundings before placing one.

Start by drawing two sectors close to each other like the below screenshot.

![image](https://i.imgur.com/SQkGVzd.png)

Enter **Visual Mode** and raise one of the sectors to the max height you want the ramp to be.

![image](https://i.imgur.com/Z2wHfBi.png)

Head back to **Builder View** and select the linedef that both sectors share. Make sure the linedef is pointing from the higher sector to the lower sector. In my case, I raised the top sector, so my linedef points down towards the lower sector.

![image](https://i.imgur.com/g9Xe6s2.png)

Right click the line to enter the **Properties** tab. In the **Actions** Menu, scroll down to the "**Plane**" header and choose "**Plane Align Slope**".

![image](https://i.imgur.com/X0BS1jd.png)

Exit back to the **Properties** Tab and adjust "**Align Floor**" to "**Front**". If you wish to ramp up the ceiling, simply choose ceiling instead of floor.

![image](https://i.imgur.com/kw0pVFs.png)

Enter **Visual Mode** and you may notice that the textures on the ramp are skewed in size a little bit. You can fix this by adjusting the "Texture Scale" option in the Surfaces tab when you right click the sector.

![image](https://i.imgur.com/Nd4aKB7.png)

Wow it's a completed ramp doesn't it look so slick.

![image](https://i.imgur.com/A7QLEI7.png)

> 💡 Slopes as steep as 45 degrees or higher have complicated physics. If you find it’s difficult to walk up the slope or some weapons behave oddly on the slope, you can remedy this by making the slope longer or lowering how tall it is.  
>   
> If you *need* a slope that’s 45 degrees, you can lower the slope’s height by 1 map unit to avoid this by holding shift and scrolling the floor of the slope up once.

## Chapter C8 - Death Pits

---

These are pits that do exactly what they say they do. They’re quite tricky to use properly, so please be responsible when placing them. Never casually throw them onto a main path and always make your pits “safe pits”. That is, pits that only risk-takers or people that aren’t paying attention to their surroundings would fall into. 

Draw the pit sector.

![image](https://i.imgur.com/wYeVIX1.png)

Lower the pit sector and give the floor a black texture. I hate to break it to you, but it’s always been just a flat color and not actually bottomless. The illusion is now ruined.

![image](https://i.imgur.com/nIao7hf.png)

I added a slick border around my pit but you do whatever you want. It helps by highlighting the surrounding area to alert players that do pay attention that a pit is nearby.

![image](https://i.imgur.com/0cEobNl.png)

Right click it and enter **Properties**. At the bottom exists tags. Give the pit sector a new tag, in my instance, 1.

![image](https://i.imgur.com/wb0jsk7.png)

Insert a "**Thing**" in the pit sector.

Enter **Things Mode**. Scroll down to "**MM8BDM-Mapper Tools**” to find the "**Hazard Pit**" thing. Looks almost like a funny wet floor sign.

<!-- image omitted (assets not vendored) -->

Once placed, you need to adjust the properties of the pit sector so it does what you want. Go to the **Actions / Tag / Misc** tab and set the Tag you want affected (my tag is 1 so the value here is 1). Then, set the damage to 256, and the Damage Type to “**Falling**.”

This last part has a few other values you could use. The main thing this does is change the obituary and occasionally, the “death state” animation. You can see a full list of damage types and an explanation of the other arguments on the [Hazard Pit thing explanation page](../mapping-reference-3fe89cb4/hazard-pit-f1db99f7.md).

Your pit is now complete. Nice job.

<!-- image omitted (assets not vendored) -->

If you’re making multiple pits, this Thing applies to all sectors of **the same tag**. This means if you want another “Falling” pit, you can just give a sector a tag of 1 and it’ll work.

## Chapter C9 - 3D Floors

---

These bad boys help to create bridges or more complicated structures in your layout and are definitely a fan-favorite to use.

Draw the sector for your 3D floor.

![image](https://i.imgur.com/lxVQ9Pj.png)

Right click the new sector and give it a new tag. For me, this value is 2.

![image](https://i.imgur.com/m2oAKj7.png)

Now, for this next part, you'll want to create a small sector in unplayable space. This is known as a "Dummy Sector" and will be the control unit for our 3D floor.

Right click any of the linedefs on this Dummy Sector and enter **Properties.**

![image](https://i.imgur.com/E5zIRZ3.png)

In the **Actions** Menu, scroll down to the "**Sector**" header and choose "**Sector Set 3D Floor**". Give this linedef the tag you gave your desired 3D floor sector earlier, for me, 2. Leave the Type as 1. 

![image](https://i.imgur.com/iLDSVFU.png)

> 💡 If you wish to have a more transparent 3D floor, feel free to mess with the Opacity settings. Most transparent 3D floors look decent at 150, but you’re free to adjust them to whatever value you want.

Enter Visual Mode. If you mess with the height of the ceiling and floor of the Dummy Sector, it readjusts and conveys those heights to the actual sector you want a 3D floor in.

For the purposes of 3D floors, the ceiling height is the bottom of the 3D floor while the floor height is the top of the 3D floor. Logically, it’s the inverse of what you would normally consider a floor and a ceiling.

![image](https://i.imgur.com/3Ey6z5B.png)

I added some poles underneath the 3D floor so logistically it looks like the floor is being held up. You don't have to do this, but it helps make your floating polygon a bit more convincing if you’re going for any sort of realism.

The 3D floor is complete.

![image](https://i.imgur.com/gNAketS.png)

## Chapter C10 - Skybox

---

You’re going to want a background environment, yeah? Skyboxes do that. Want your map to float in the void? Not a problem. 

I created the following sectors to mimic a cheap and easy window.

![image](https://i.imgur.com/NrtTEcB.png)

> 💡 While not always necessary, especially if the map is outdoors or only needs a ceiling skybox, windows can sometimes help create more convincing skyboxes and can clearly define player boundaries inside a layout.

Enter **Visual Mode** and apply textures, raise/lower heights, and just rearrange your window. If you want to put a 3D floor glass wall here to sell the idea of a window, go for it.

![image](https://i.imgur.com/ILFwCdn.png)

Select all sides that you want to display the skybox. Right click and head straight to **Textures.** You'll want to apply **F\_SKY1.** Do the same for any ceilings or floors.

![image](https://i.imgur.com/Rfqd9yM.png)

Enter the **Properties** tab, head to** Actions**, and scroll down until you find "**Line Horizon**". Apply this on any walls (not ceilings or floors) that are going to display the skybox.

![image](https://i.imgur.com/zWaKN3J.png)

Now that our window is set up, create a Dummy Sector somewhere in out of bounds territory. Select all four sides of the sector and click the curved icon shown by the red square.

![image](https://i.imgur.com/6BRg7ed.png)

Your square sector will now curve inwards or outwards, depending on the direction the linedefs were facing. If you need to fix or reinvert them, select the flip curves button highlighted by the red square in the screenshot below.

Adjust the Angle to 90 and, generally, increase the amount of vertices to something like 16 or 32.

![image](https://i.imgur.com/T0tOfP8.png)

Head over to our Dummy Sector and apply the skybox textures you desire. If the wall textures aren't aligned, don't worry. **Shift+Click** to select all of them, followed by pressing the "**a**" key. This will auto-align the textures. Do note that this won't always 100% realign them, so you may have to do manual texture offset adjustments if necessary.

> 💡 To remove the darker and lighter portions of the skybox, remember to always have every sector be at 255 lighting! (At least in the finished design)

![image](https://i.imgur.com/QxSfP6e.png)

An example of how I completed my skybox. I stretched the ceiling and floor in order to get more of the texture shown.

![image](https://i.imgur.com/8XT9laJ.png)

Insert a "**Thing**" in the dead center of the circle.

Enter **Things Mode.** Scroll down to "**Cameras and Interpolation**" to find the "**Skybox Viewpoint**" thing. That eye creeps me out.

![image](https://i.imgur.com/xJrmlC8.png)

Once placed, you can move the viewpoint up or down. At the very least, always move it up at least 32 units. This view will be the position of the skybox.

![image](https://i.imgur.com/iTawTsp.png)

This is how the skybox will look in game. You don't want players entering the skybox in most circumstances, so make sure to make the linedefs around your windows "Impassable", found in the Properties tab.

<!-- image omitted (assets not vendored) -->

> 💡 There's one more important thing you should probably know about skyboxes. A line horizon wall takes whatever ceiling and floor it has immediately connected to it and stretches it out. What this means is that should you not use F\_SKY as your ceiling or floor texture near line horizon walls, the line horizon will take and stretch infinitely whatever texture you instead use. In most instances, this is not a desired effect someone would want. To remedy this, make a small 16 or 32 unit incision near the wall and raise it up (or down) a slight bit. By using F\_SKY in your newly created sector, you'll have both the cutoff of the original ceiling and have a regular line horizon skybox.

## Chapter M1 - Jump Pad

---

Jump Pads, Bounce Pads, Force Accelerators, whatever you call them, they do the same thing. They’re a faster, popular way of projecting someone onto higher ground.

First you draw a square.

![image](https://i.imgur.com/ynsbidb.png)

Then you add a thing - **Bounce Pad (Vertical)** under **MM8BDM-Mapper Tools.**

<!-- image omitted (assets not vendored) -->

Next, you edit the Thing. Under Action / Tag / Misc, give it a Jump Force of 25 and a Super Jump Force of 50. We even get a small number of sounds to pick from in the dropdown. I’m picking the underwater jet sound.

Force tells how fast to launch up when you’re not holding jump, while Super Jump Force is the force to give while holding jump. These can be the same if you want, and if you leave Super Jump Force blank, they will be the same.

<!-- image omitted (assets not vendored) -->

> 💡 In the above example, our Jump Force is 25 and our Super Jump Force is 50. This is a very, very, very low bounce. More often than not, you'll probably be in the 80 to 120 range.

Make sure to give it appropriate textures and raise it either 32 or 16 units - depending on whether or not you want easier access.

<!-- image omitted (assets not vendored) -->

> 💡 Different heights have different advantages - it’s a tradeoff. Lowering it down means players can accidentally run into it if they aren't being aware, but ultimately, it's up to you to decide.

## Chapter M2 - Teleporters

---

Make two sectors as shown and apply a teleport floor texture to it. Depending on the location of the sector you'll need a different texture offset. Make sure the floor is raised 32 units, or don't.

![image](https://i.imgur.com/TkI9lUb.png)

Insert a thing\>Teleports\>Teleport Destination. Adjust the facing angle off to the side.

If it's a two way teleporter, you'll have to do this twice. If it's one-way, well, only place one.

Make sure to give them different tags in the Action / Tag / Misc. tab. In this example, I set the left one to "3" and the right one to "4".

![image](https://i.imgur.com/FPXyXrP.png)

Add two more things and make them "Teleport Entrance". Head over to the action tab afterwords.

<!-- image omitted (assets not vendored) -->

For both of the bottom things, open the Action tab. In the Destination box, you will want the teleport destination tag of the exit.

I highlighted the links (red goes to red and white goes to white) between my things. For example, because I want the left thing to teleport to the right destination, and the right destination's tag is 4, I put a 4 in the "Destination" box. Do the same for the other pair.

<!-- image omitted (assets not vendored) -->

I've split this image into two parts. Take each vertical half and push them over to your teleporter. Then, place that pair of things on top of each other and over the teleporter. It's done. The magic is done.

<!-- image omitted (assets not vendored) -->

The completed product.

<!-- image omitted (assets not vendored) -->

Now, if you want, you can have the player come out of the ceiling, but not into it, instead of the setup here.

To accomplish this, flip the teleporter to a ceiling and raise the height of the "Teleport Destination" thing.

Then, switch the "Teleport Destination" thing to a "Teleport Z Height" thing.

Voila, it is done.

This can only work on 1-way teleporters, so the "Teleport Entrance" thing is only used on the entrance, which, should definitely be on the floor.

I have included an example of this in the .wad if you wish to check it out. An image of it is below.

<!-- image omitted (assets not vendored) -->

## Chapter M3 - Water

---

Draw out your swimming pool.

![image](https://i.imgur.com/SjMEzeL.png)

There's a lot here, so hang with me. Make a dummy sector outside of the map to make a 3D floor. Set the sector tag to the tag of the pool as you would a normal 3D floor. Set the "Type" to 3 (to make it non-solid) and set the "Opacity" to 150 (to let players see through the water plane). Make both the floor AND the ceiling EQUAL in height, then lower (or raise) it to the height you want the 3D floor at. One of the arguments is "Water Direction" and the default option is down. Mess with it if you want. Try to make the water line about 16 units below the nearby surface level - it just looks cleaner in my opinion.

![image](https://i.imgur.com/bT0lX1p.png)

Here's how all of this looks in visual mode. The dummy sector that holds our "visual water trick" is just a paper thin 3D floor.

![image](https://i.imgur.com/6qLY8VR.png)

Introducing: The Water Sector Thing. You can slap down one of these things and give it the same tag as you gave your sectors (in my instance, everything is "6"). Make sure it's inside the 3D floor. Done.

<!-- image omitted (assets not vendored) -->

As a closing point, most maps that feature underwater segments have their own underwater textures. Color or fog filters are generally frowned upon. Be sure to include your own underwater textures for a better theming bonus.

## Chapter M4 - Treadmills

---

Design your treadmill. Give the sector it's in a new tag.

![image](https://i.imgur.com/AZtL17Q.png)

Enter the Script Editor and make a new script.

```javascript
#include "zcommon.acs"

Script 1 OPEN 
{
	Scroll_Floor(7, 0, -350, 1);
}
```

The values for this are as follows: The tag (my tag is 7 so the value here is 7), the horizontal scrolling speed (use a positive value for right and a negative value for left), the vertical scrolling speed (use a positive value for up and a negative value for down), and the type of scroll.

There are three main types of scroll, and depending on what you want, this value can change. Use 0 to scroll the floor texture. Use 1 to push objects but not scroll the floor texture. Finally, using 2 does both (Push and Scroll). Due to the texture I chose being animated, I only needed the push mechanics and not the texture to scroll, so I used 1 in the last position.

When you're done, make sure to compile your scripts. Treadmills complete.

## Chapter M5 - Crushers

---

Get your crusher pit or sector ready. This is usually a 128x128 sector due to the core textures, but if you provide your own, can be however big you want. Make sure to give the sector a new tag.

![image](https://i.imgur.com/jkleALJ.png)

Raise your crusher to the max height you want it to go. This is the height it always raises to after it has smashed the ground.

![image](https://i.imgur.com/11hLwLt.png)

Open up the Script Editor and make a new script.

```javascript
Script 2 OPEN 
{
	Ceiling_CrushAndRaise(8, 23, 256, 2);
}
```

The values for this are as follows: The tag (my tag is 8 so the value here is 8), the speed it travels (23, change if you want), the damage (256, do not change this), and the mode.

There are a few different types of mode and the variable you put here will reflect that. Using a 0 will throw the crusher into compatibility mode. Using a 1 will enter it in Doom mode with no slowdown upon crush. Use 2 for the default, Hexen mode. Finally, use a 3 to enter it in Doom mode with slowdown upon crush. For us, simply keeping this at a 2 will be more than sufficient. Compile your scripts to finish creating your death ceiling.

## Chapter M6 - Thunder Claw Pegs

---

These things are easy. Place down a new thing and make the type 10632. This will give you a Thunderclaw Peg. Give it a new, unused tag.

![image](https://i.imgur.com/otKL8jt.png)

Adjust the height in visual mode. In visual mode, it will appear floating, but once you test in-game, the chain will appear from the ceiling to the peg itself. Done.

![image](https://i.imgur.com/l3BfxRH.png)

## Chapter M7 - Yoku Blocks

---

Place down a map spot for each block you want to have. Make sure to give each individual map spot a new, unused tag and raise them to the height you want.

![image](https://i.imgur.com/6wBRWmp.png)

Open up the Script Editor and make a new script.

```javascript
Script 3 OPEN 
{
	Delay(35);
	SpawnSpot("VBlock",9);
	Delay(35);
	SpawnSpot("VBlock",10);
	Delay(35);
	Delay(35);
	SpawnSpot("VBlock",11);
	restart;
}
```

When adding in a delay, remember that there are 35 tics for 1 second. Then, Spawnspot "Vblock" followed by the tag of the map spot, as shown in the picture. The restart at the end will keep the process running indefinitely. Compile the script and you're good to go.

(Yes, I know I could've condensed the delays to a 70, but for the purposes of explaining things, I kept them separate).

## Chapter M8 - Gravity Wells

---

Draw sector.

![image](https://i.imgur.com/rZwl0Xg.png)

Change gravity to -1. If you want to decorate the sides, give both sides of the linedefs midtextures and tick "Wrap midtexture" under the Properties tab. Then, give them Action 208, or "Translucent Line". Adjust the transparency as desired.

![image](https://i.imgur.com/pZsExlZ.png)

An image of my completed gravity well. The texture I used was 9W3LITE.

![image](https://i.imgur.com/65FiSFw.png)

## Chapter S1 - File Structure

---

All wads that include maps need to follow a specific format.

Open SLADE, click on New Archive. You’re gonna want a Zip Archive here.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

Alright. Got a new zip in SLADE now.

This is where we’ll be putting all the resources for our map. Go ahead and save it.

<!-- image omitted (assets not vendored) -->

This file can be called whatever you want to, though this still does not determine what your map’s name will be. Make sure to make the file extension “.pk3.” This file will be loaded into the game and naming it this way will make it easier to distinguish from a normal zip file.

Next, go into Doom Builder and click Edit → Map Options.

Add this new pk3 as a resource, in the same way as the MM8BDM pk3 in Chapter C1.

<!-- image omitted (assets not vendored) -->

## Chapter S2 - MAPINFO

---

All maps need to be defined with a `MAPINFO` file. Click this button to add a new lump to the pk3.

<!-- image omitted (assets not vendored) -->

The file should be called `MAPINFO` and should be a text file that contains the following code:

```javascript
map DEMO "Map Tutorial"
{
    next = "DEMO"
    sky1 = "BLACK", 0
    music = "DEMOMUS"
    aircontrol = 0.5
    forcenoskystretch
    clipmidtextures
    evenlighting
}
```

Replace the first DEMO with the map code of your map. The "Map Tutorial" part is the proper name of the map. The second DEMO is the map code of the next map which is useful for a map pack.

> 💡 If you’re making a map pack, **you can define multiple maps in the same MAPINFO file.** Simply copy the code block and repeat the described steps for every map in your pack, using the “next” field to link to each map after.

## Chapter S3 - Custom Textures

---

Before I begin this section, look at the below 256 colors. If you want your textures to remain “fairly close” to the MM8BDM’s art direction, you’ll need to restrict yourself to those above colors, and any given texture should not have more than 4 colors.

<!-- image omitted (assets not vendored) -->

To add your custom texture, add a new directory called “patches.” In this directory, you will place your textures:

<!-- image omitted (assets not vendored) -->

Name them something arbitrary and special to the map, but nothing specific yet. I named my frozen water texture DEMO1.

The name of this reference texture must be no greater than 8 characters in length or it will break.

<!-- image omitted (assets not vendored) -->

Add a new text lump called `TEXTURES` in the root folder.

<!-- image omitted (assets not vendored) -->

Inside, follow the formatting below for each texture that you wish to add:

```javascript
texture TUTWAT, 64, 64
{
XScale 0.5
YScale 0.5
Patch DEMO1, 0, 0
WorldPanning
}
```

This patches in DEMO1, which we named earlier. As for the actual texture name that we find inside the editor, I have chosen TUTWAT. This is shorthand for "Tutorial Water" and \[i\]nothing\[/i\] else. Just like the patch name, the max character length of this is 8.

Make sure the dimensions of the texture match the dimensions listed. The texture I chose is 64x64, so the dimensions listed are 64, 64.

Save everything. Mission complete.

Try to get into a specific naming habit for textures. Let's say you have four different rock textures to add for a mountain map. Really get into the specifics of it so the textures don't conflict with textures used by other maps. Let's make this mountain a coal mine. For the actual texture names, I would use something like COALRK01, COALRK02, COALRK03, and COALRK04 while I could likely leave the patch names as just COAL01, COAL02, COAL03, and COAL04. Have the first six char slots be relevant to the texture while the last two are reserved for numbers.

## Chapter S4 - Music

---

In your pk3, add a new directory called “music.”

<!-- image omitted (assets not vendored) -->

Drop that tune right in that folder. Make sure the max character length doesn't exceed 8 and that it matches the name of the song in `MAPINFO`.

<!-- image omitted (assets not vendored) -->

MM8BDM's common form of music filetype is a .ogg. As for "genre", Famitracker or chiptune music is generally accepted among the community. 2A03, VRC6, MMC5 - to list a few examples of the common chips used.

If you're having trouble picking something out, ask around and someone will certainly assist you.

MM8BDM has a little special something for music. There exists a "boss music" and an "intense music". Boss music generally plays when there are 5 frags left in DM or 1 person is left alive on a team in TLMS. Intense music plays in TLMS when both teams are about to win and each team only has 1 player remaining. Finally, there is a victory tune. This, of course, plays when the round is over.

To include these, plop them into your map file and name them something special. I'm using the same song for all of these in my example but I have named them differently to illustrate the type of naming scheme you should have.

<!-- image omitted (assets not vendored) -->

To actually use those songs in a map, please refer to Chapter S4.

## Chapter S5 - Map Cards

---

Map cards show up for a few seconds at the beginning of each map to display information about the map.

![image](https://i.imgur.com/KQPfWd6.png)

Open up Script Editor and copy the following down into its own script.

```javascript
Script 4 OPEN
{
	SetCvarString("mm8bdm_map_creator", "NAME");
	SetCvarString("mm8bdm_map_icon", "MAPCARDI");
	SetCvarString("mm8bdm_map_background", "MAPCD10");
	SetCvarString("mm8bdm_map_musicname", "MUSICNAME");
	SetCvarString("mm8bdm_map_musiccomposer", "MUSICAUTHOR");
	SetCvarString("mm8bdm_map_musicgame", "MUSICGAME");

	SetCvarString("mm8bdm_map_bossmusic", "DEMOBOSS");
	SetCvarString("mm8bdm_map_victorymusic", "DEMOVIC");
	SetCvarString("mm8bdm_map_intensemusic", "DEMOBOSF");
}
```

Replace "NAME" with your name. Replace "MUSICNAME" with the music name. Replace "MUSICAUTHOR" with music author. Replace "MUSICGAME" with the game the music comes from. Finally, replace the three DEMO songs with the songs you've chosen.

To see how it looks in the script editor, I have left the proper credentials for this demo map in the script editor.

`MAPCARDI` and `MAPCD10` are default graphic names for the icon and map card itself. You can replace them by [Adding Custom Graphics](./adding-custom-graphics-28261edf.md) to the a new directory in your pk3 called `graphics`. Let’s leave that alone, though.

The map card as it is shown in-game.

<!-- image omitted (assets not vendored) -->

## Chapter S6 - Maps Folder

---

When you’re done with your map and are ready to ship it out, open the pk3 in SLADE and add a new directory called “maps.”

<!-- image omitted (assets not vendored) -->

Now, all you have do is just plop your map right in there! - But make sure it’s named the same as your map code.

<!-- image omitted (assets not vendored) -->

That’s it! You’re done! You can now share your map with your friends and beat them up, in an all-new arena created by you!

## Chapter EX - Tips and Other Tutorials

---

- Unless it's a hallway, the majority of rooms should aim to have at least 3 entrances/exits in order to promote flow and decrease the chances of having a negative chokepoint.

- Take frequent breaks if you begin to feel a creative block. Don't demotivate yourself out of it.

- Need to replace a thing or texture? Hit F3!

- Once you're finished with your map, hit F4. Run the analysis and it'll pick up any errors you might have missed. If none show up, congrats! Your map is finished.

- It's acceptable (and recommended) to have only about 8 unique weapons per map. Buster upgrades count towards this. The max that it should probably ever be is 10. Any more weapons than 10 and you're creating a mess. Duplicating weapon tokens is highly recommended.

- **General Architectural Do's and Don'ts:** [http://www.wired.com/2004/03/15-rules-for-rebuilding-the-world/](http://www.wired.com/2004/03/15-rules-for-rebuilding-the-world/)

Good Luck, have fun, and enjoy your new hobby or profession!

## Example File

---

[Tutorial Map.pk3](../assets/3fd7624207834cb8a040d2820bb4330e-Tutorial_Map.pk3)

## See Also

---

[DECORATE the World](./decorate-the-world-57ad7756.md)

[Hello ACS](./hello-acs-447542af.md)

[Fragging Hazards](../interacting-with-systems-c99b6cab/fragging-hazards-41d2174e.md)

[Modern ZDoom PK3 Structure](../additional-guides-7149f7a8/modern-zdoom-pk3-structure-4c1351f8.md)

[Map Previews for Map Voting](../additional-guides-7149f7a8/map-previews-for-map-voting-12379ff1.md)
