---
title: "Adding and Replacing Music"
notion_id: f3e917daa26d421ca60d8019301118e2
source: https://www.notion.so/f3e917daa26d421ca60d8019301118e2
---

# Adding and Replacing Music

---

> 🚨 **This tutorial assumes that you already have a music file which is in a **[**Zandronum supported music format**](https://zdoom.org/w/index.php?oldid=37855)** and **[**looped properly**](https://cutstuff.net/forum/index.php?topic=10701.msg334071#msg334071)**, if your track requires looping.**

Mega Man 8-Bit Deathmatch has support for the creation of addon music packs. These music packs can both add additional tracks which can be called upon by the `changemus` console command or they can even replace existing tracks with covers of the same track or entirely new tracks. This page will cover both use cases.

> 💡 **Required Materials:**
>
> - [**SLADE 3**](https://slade.mancubus.net/index.php?page=downloads)

## Starting a New PK3

---

For the sake of starting fresh, we’re gonna start this tutorial by just creating a new PK3 archive in SLADE. We can do this by opening SLADE and clicking on the buttons shown to the right. 

<!-- image omitted (assets not vendored) -->

Once you’ve clicked that `Archive` button, it’ll prompt you for which type of archive to create. You’ll want to create a `Zip Archive`. With our new archive, let’s go ahead the `music` folder which we’ll need for our music.

<!-- image omitted (assets not vendored) -->

Now that we’ve made some changes to our archive, we can go ahead and save it by using the save button in the upper left, or its shortcut hotkey, `CTRL + S`. Be very cognizant when saving this archive, because we want to save it as a PK3 file, not a standard ZIP file! The screenshot below shows me saving the file with the name `v6b-Thielcore-v1a` and a file extension of `.pk3` so that we create a PK3 file.

<!-- image omitted (assets not vendored) -->

## Adding Music

---

Now that we have a PK3, we can begin adding our music into it. As you may have been able to guess from the chosen file name, we’ll first add one of RRThiel’s tracks then later add a RRThiel inspired cover of Stone Man by MarkTherence to replace the base game’s Stone Man track.

A simple way to add files into the PK3 via SLADE is to first click the folder where you want files to end up in, then to click the `Import Files` button. This will bring up a file browser where you can select all of the files to import. Select all the files in there, then click the `Open` button to bring them into SLADE.

> 🚨 **The filenames for all music tracks should only be 8 characters or less (not including the file extension itself). If it is longer, it will cause insidious errors which may be difficult to track down and correct!**

<!-- image omitted (assets not vendored) -->

You’ll then be able to verify that it was put into the desired location and if the music format allows for it, you can even preview the music.

<!-- image omitted (assets not vendored) -->

## Adjusting Volume

---

If your music track is a bit too low or high volume, you can adjust the volume of it programmatically. We do this by using the `$musicvolume` command in a [`SNDINFO`](https://zdoom.org/wiki/SNDINFO) file. Let’s create that `SNDINFO` file in our PK3 to slightly lower the volume of `PBINTRO`.

To do this, we’ll click the `New Entry` button. This will bring up a prompt that will ask things such as the desired name of the file, the type of file it should be, and where it should be placed. The `SNDINFO` file should always go into the root of the PK3, so the directory should always be `/`.

<!-- image omitted (assets not vendored) -->

Once that file is created, we can select it by clicking on it which will bring a text editor up to the right. It’s inside of this text editor that we can put the `$musicvolume` command mentioned earlier. Its format is as follows:

```c
$musicvolume <music_name> <multiplier>
```

Below is the command that will make `PBINTRO` 90% of its original volume.

<!-- image omitted (assets not vendored) -->

## Replacing Music

---

The process for replacing music is largely the same, we just have to make sure that our music track is named the exact same (disregarding file extension) as some track in the base game. If you’re unsure which name to use, you can use the `changemus` command in console whenever a given track is playing to get the name of it.

Since we want to replace Stone Man’s track, our new track will be named `STOMUS` just like the base game’s track is. Using the same PK3, let’s go ahead and import that music file as well.

<!-- image omitted (assets not vendored) -->

Let’s also adjust the volume of this track to raise it a bit instead. We can use the same `SNDINFO` file as before to accomplish this.

<!-- image omitted (assets not vendored) -->

## Updating Credits

---

Now since we’ve replaced an existing track, there’s one more thing we should do. Mega Man 8-Bit Deathmatch has an accreditation system called map cards. For every map, there’s a map card which pops up at the beginning of a match with music credits. 

Since we just replaced one of the tracks with a different one which may have a different composer / arranger, we should update those credits as well. To accomplish this, we’ll need to create a new [`LANGUAGE`](https://zdoom.org/wiki/LANGUAGE) file in the root our project, so let’s do that.

<!-- image omitted (assets not vendored) -->

The purpose of this file in general is to translate a given language tag to a full message. Mega Man 8-Bit Deathmatch already sets up a set of language tags for each track that appears on map cards to handle the base accreditation. Below is a snippet of MM8BDM’s `LANGUAGE` file for `STOMUS`.

```c
// This line below is required for every LANGUAGE file
[enu default]

// Many language tags later...
MAPCARD_STOMUS_MUSICNAME = "Stone Man";
MAPCARD_STOMUS_MUSICGAME = "Mega Man 5";
MAPCARD_STOMUS_MUSICCOMPOSER = "Capcom"; 
```

In our own `LANGUAGE` file, if we provide language tags with the exact same name, we can replace the ones from base MM8BDM. Below is how our entire `LANGUAGE` file should look to accomplish this. 

<!-- image omitted (assets not vendored) -->

## Loading the Pack

---

With all of those pieces in place, that’s all that’s needed to be able to then load the music pack alongside the game. You’ll be able to hear `PBINTRO` by using `changemus PBINTRO` in the console, and Stone Man’s music will be replaced with our new track. 

For best practices, if playing single player, you would load a music pack that replaces existing tracks just like you would [load any other mod](../frequently-asked-questions-cc9fdea3.md). If your music pack does not need to replace any existing tracks, then you can just put it into the `skins` folder in your MM8BDM directory. If you want to host a server using your music pack, you should include the PK3 as an [optional wad](../hosting-a-server-557f298d.md), that way players can opt out of using the music pack if desired.

## Example File

---

[v6b-Thielcore-v1a.pk3](../assets/cad8bb04532a4e7f97ef76db411b81f6-v6b-Thielcore-v1a.pk3)

## See Also

---

[Adding Custom Sounds](./adding-custom-sounds-6cf0678b.md)
