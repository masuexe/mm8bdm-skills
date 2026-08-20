---
title: "Modern ZDoom PK3 Structure"
notion_id: 4c1351f89d174496903b483d18058348
source: https://www.notion.so/4c1351f89d174496903b483d18058348
---

# Modern ZDoom PK3 Structure

---

This article talks about the modern ZDoom PK3 structure that is preferable for server clusters and should be migrated towards in favor of embedded wads in PK3 files.

## Just What Are Embedded Wads Anyway?

---

Embedded wads, or “nested” wads as they’ve come to be called recently, are wad files placed into the root folder of a pk3. This practice has historically been frowned upon, but had many benefits such as more readily-sharable map files with custom assets and easy packaging.

Unfortunately, embedded wads do cause something of a performance hit on the user and server end due to the way Zandronum stores them in working memory. Embedded wads are **always loaded into working memory,** regardless of whether the game is using the assets within the wad itself. This is because of legacy concerns where you’ll never know when you’ll need a given asset, so it must always be readily available.

In addition, embedded wads are associated with **memory leaks**, while up to debate, MM8BDM still moved to the new structure anyway to mitigate concerns.

## Who Should Care?

---

Map pack developers, mainly! Also anyone who’s made a full expansion with a bunch of maps in it that use embedded wads. If you made a fun game mode that’s stored in only a wad file with no PK3, this doesn’t at all apply to you!

## Rules of the ZDoom Structure

---

- Only one map per map wad.

- Map wad name must match the map code.

- Map wads can **only** contain the minimum required files to run the map. No graphics, audio, or custom prop definitions, or `MAPINFO`. **Only** the files between the map marker and `ENDMAP` must exist in these files.

- No embedded wads can exist in the root directory of the PK3, regardless of their contents.

## So… How Do I Move to the New Structure?

---

The process of moving is simple, though a little labor-intensive. Let’s go over this step-by-step.

Unless otherwise stated, all directories mentioned can have as many sub directories as you want and they’ll all be treated the same as their parent directory.

1. In every map wad in your pk3, take all files between `PP_START` and `PP_END` and put them into a folder in your pk3 called `patches`. Delete the original files, and the namespace markers.
   1. `P_START` and `P_END` are also patch namespace markers. Stuff between these should also go in `patches`.

2. In every map wad in your pk3, take all files between `TX_START` and `TX_END` and put them into a folder in your pk3 called `patches`. Delete the original files, and the namespace markers.
   1. `HI_START` and `HI_END` are also texture namespace markers. Stuff between these should also go in `textures`... though it’s very unlikely you’ll need to know that, since these correlate with a very old naming scheme for these.

3. In every map wad in your pk3, take all files between `SS_START` and `SS_END` and put them into a folder in your pk3 called `sprites`. Delete the original files, and the namespace markers.
   1. `S_START` and `S_END` are also patch namespace markers. Stuff between these should also go in `sprites`.

4. Music in your wads should also be placed in a folder called `music`.
   > 🚨 **This means your music wad file too!** MM8BDM’s `musics.wad` was actually half of its RAM usage before v6b came out.

5. Custom sound effects go under `sounds` folder in the pk3.

6. Any remaining graphics should be placed into a `graphics` folder in the pk3.

7. *All other files* that are not between your map marker (the file named your map code) and `ENDMAP` need to be moved to the root folder of your pk3.
   1. Usually this will apply to code definition files and typically includes, but is not limited to: `MAPINFO`, `TEXTURES`, `ANIMDEFS`, `DECORATE`, `SNDINFO`, and `TERRAIN`.

   2. For example, if you have a `MAPINFO` in your map wad, copy its contents, create a `MAPINFO` in the root folder of your pk3, and paste it in there. Then, delete the original. For all other maps in your pk3, paste the `MAPINFO` code into the pk3’s version and delete the originals.

8. Delete any wad files that were made empty by these changes.

9. Finally, rename each wad that still has maps in them to match the map codes and place the wads into a folder called `maps`. This folder **does not support sub directories**. Map wads must be placed *directly* into the folder.

10. If completed successfully, your maps should load properly and you should be able to see them in Offline Skirmish like before.

## Terms and FAQs

---

1. What is a “namespace marker”?
   1. Those little files in the WAD file that SLADE calls a marker that have a size of 0. Usually they look like `x_START` and `x_END` where `x` is some character or pair of characters. These are used to tell the engine what those files between `x_START` and `x_END` are supposed to be.

2. Is this required for V6B compatibility?
   1. Nope. If you simply choose not to do this, your map set will work just fine with V6B. Don’t expect server clusters to be very happy about that decision, however!

3. What are the benefits for doing this, exactly?
   1. MM8BDM’s working memory usage was cut in half by transitioning into this file structure. Your mod probably won’t have as significant a reduction in footprint, but it will still improve the performance at least somewhat.

   2. The old file structure has been correlated with memory leaks. Even if this may be a false correlation, following the new structure will make it easier to account for actual issues with engines and mods.

## Additional Resources

---

The [PK3Reorder](https://mm8bdm.net/forum/thread/pk3-reorder-automatic-map-pack-reorganization-39) tool partially automates the process of converting the pk3 structure. It’s not perfect, due to the sheer number of possible edge cases, but it does the basic stuff.
