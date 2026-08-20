---
title: "Adding Custom Sounds"
notion_id: 6cf0678b0ffe4329838831a45ac53060
source: https://www.notion.so/6cf0678b0ffe4329838831a45ac53060
---

# Adding Custom Sounds

---

Similar to custom graphics, custom sounds crosses multiple domains, including but not included to, custom weapons, items, and map props. This page will cover some of the common use cases with implementing new sounds and show a brief example of how that sound might be used in practice.

> 💡 **Required Materials:**
>
> - [**SLADE 3**](https://slade.mancubus.net/index.php?page=downloads)

## Starting a New PK3

---

For the sake of starting fresh, we’re gonna start this tutorial by just creating a new PK3 archive in SLADE. We can do this by opening SLADE and clicking on the buttons shown to the right. 

<!-- image omitted (assets not vendored) -->

Once you’ve clicked that `Archive` button, it’ll prompt you for which type of archive to create. You’ll want to create a `Zip Archive`. With our new archive, let’s go ahead the `sounds` folder which we’ll need for our new sounds.

<!-- image omitted (assets not vendored) -->

Now that we’ve made some changes to our archive, we can go ahead and save it by using the save button in the upper left, or its shortcut hotkey, `CTRL + S`. Be very cognizant when saving this archive, because we want to save it as a PK3 file, not a standard ZIP file! The screenshot below shows me saving the file with the name `v6b-HonkingPenguins-v1a` and a file extension of `.pk3` so that we create a PK3 file.

<!-- image omitted (assets not vendored) -->

## Adding Sounds

---

Now that we have a PK3, we can begin adding our sounds into it. We’ll be adding some funny honking sounds to the Penguin Bombers in Gemini Man’s stage.

A simple way to add files into the PK3 via SLADE is to first click the folder where you want files to end up in, then to click the `Import Files` button. This will bring up a file browser where you can select all of the files to import. Select all the files in there, then click the `Open` button to bring them into SLADE.

> 🚨 **The filenames for all sounds generally should only be 8 characters or less (not including the file extension itself). If it is longer, it can cause insidious errors which may be difficult to track down and correct!**

<!-- image omitted (assets not vendored) -->

You’ll then be able to verify that it was put into the desired location and if the sound format allows for it, you can even preview the sound.

<!-- image omitted (assets not vendored) -->

## Registering the Sound

---

Before we can actually use this sound in DECORATE or ACS, we need to register it in a [`SNDINFO`](https://zdoom.org/wiki/SNDINFO) file that needs to be located at the root of our project. Let’s go ahead and create that file.

To do this, we’ll click the `New Entry` button. This will bring up a prompt that will ask things such as the desired name of the file, the type of file it should be, and where it should be placed. The `SNDINFO` file should always go into the root of the PK3, so the directory should always be `/`.

<!-- image omitted (assets not vendored) -->

Once that file is created, we can select it by clicking on it which will bring a text editor up to the right. It’s inside of this text editor that we can begin registering our sounds. We do this by adding a line that looks as follows:

```c
<qualified_sound_name> <sound_file_name>
```

Below is an example of making that line for our honking sound:

<!-- image omitted (assets not vendored) -->

With this `SNDINFO` file, we can actually go ahead and now use this sound by adding this ill-advised Penguin Bomber replacement actor to a `DECORATE` file. Find more details about DECORATE [here](./decorate-the-world-57ad7756.md).

<!-- image omitted (assets not vendored) -->

## Tweaking the Sound

---

We have a few options built into `SNDINFO` for tweaking sounds to try and get the volume mixing right on them. Most obviously, there’s a [`$volume`](https://zdoom.org/wiki/SNDINFO#:~:text=to%20be%20heard.-,%24volume,-soundname%20%3Cvolume%3E) command which can be used to reduce the volume of the sound. Its format is as follows:

```c
$volume <qualified_sound_name> <multiplier>
```

As an example, we can reduce the sound of the current honk to 60% by using the code below:

<!-- image omitted (assets not vendored) -->

We may also want to reduce how much the same sound can overlap with itself. Imagine that there’s going to be many Penguin Bombers playing this sound at once, so we may want to say to only be able to have 3 instances of the sound playing at a time within some radius in map units.

Zandronum allows us to accomplish this by using the [`$limit`](https://zdoom.org/wiki/SNDINFO#:~:text=game%20is%20played.-,%24limit,-soundname%20%3Camount%3E%20%5Blimitdistance) command. With this command, we can specify a number of concurrent instances of a sound allowed and the range to check within for that sound. Its format is as follows:

```c
$limit <qualified_sound_name> <number_allowed> [radius]
```

All sounds default to a limit of 2 within a radius of 256 map units. We can specify no limit with a `number_allowed` of 0. If you don’t specify a `radius` value when using this command, it will still default to 256 map units. Below is an example of how we can use this command to tweak our honk sound.

<!-- image omitted (assets not vendored) -->

These changes combined should make our Penguin Bombers a bit more tolerable.

## Randomized Sounds

---

Another way to make our game sound better is to make smart use of randomized sounds, so let’s add more honk variations.

<!-- image omitted (assets not vendored) -->

Then let’s go ahead and have a `SNDINFO` entry for all three honks.

<!-- image omitted (assets not vendored) -->

To finish off our randomized sound, we’ll make use of the `$random` command in `SNDINFO`. This command essentially makes an alias sound that will pick from a list of given sounds. Its format is below:

```c
$random <alias_sound_name> { <sound_name_1> <sound_name_2> [...] } 
```

> 💡 Creating a randomized alias sound is essentially treated as its own sound entirely, so it requires its own `$volume` and `$limit` commands for them to properly take effect.

Below is how we would implement this for our 3 honking sounds:

<!-- image omitted (assets not vendored) -->

Now that we have a randomized sound, we can perform the following swap in our `DECORATE` actor to get a Penguin Bomber with a randomized honk sound.

```c
PENG E 0 A_PlaySoundEx("props/mm3/penguin_honk", "Voice")
>>>
PENG E 0 A_PlaySoundEx("props/mm3/penguin_honk_random", "Voice")
```

## Example File

---

[v6b-HonkingPenguins-v1a.pk3](../assets/d46703fb38b14100944479bee3d5fb78-v6b-HonkingPenguins-v1a.pk3)

## See Also

---

[Adding and Replacing Music](./adding-and-replacing-music-f3e917da.md)
