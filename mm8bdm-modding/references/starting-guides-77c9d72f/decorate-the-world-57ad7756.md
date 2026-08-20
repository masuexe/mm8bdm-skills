---
title: "DECORATE the World"
notion_id: 57ad77562c6b489f8217f4e6255e4cf3
source: https://www.notion.so/57ad77562c6b489f8217f4e6255e4cf3
---

# DECORATE the World

---

So you’ve decided to begin modding Mega Man 8-Bit Deathmatch? We’re glad to have you on board! This page will walk you through using the DECORATE programming language which drives all the objects in the game. Along the way you’ll hopefully pick up some general programming skills which can be adapted to any programming language, including the other programming language of MM8BDM, ACS.

> 💡 **Required Materials:**
>
> - [**SLADE 3**](https://slade.mancubus.net/index.php?page=downloads)

## Table of Contents

## Zandronum and GZDoom

---

Before we begin modding for Mega Man 8-Bit Deathmatch, we need to take a step back and widen our view of what this game is built using. MM8BDM is what’s known as a total conversion that runs on the Zandronum game engine. This game engine is a multiplayer focused fork of another game engine now called GZDoom.

This context is important because it means that whenever you’re making a mod for MM8BDM, while you should be leveraging all the systems that MM8BDM itself implements, you are primarily using the systems implemented by Zandronum and the GZDoom version that Zandronum is forked off of.

That means that for any information that this wiki does not cover, you will want to reference the documentation wikis of [Zandronum](https://wiki.zandronum.com/Main_Page) and [GZDoom](https://zdoom.org/wiki/Main_Page). As mentioned earlier, Zandronum is forked from an older version of GZDoom, so you can use [this tool](https://drinkybird.net/wikirevfinder.php) to convert a ZDoom wiki (GZDoom’s wiki) URL to the older version that reflects Zandronum’s version. With that out of the way, let’s begin modding!

## File Structure and Organization

---

When we write code, we typically use specialized programs which are classed as Integrated Development Environments (IDEs). These provide us with some nice features such as directory manipulation, syntax highlighting, and tooltip information when hovering important elements.

SLADE 3 is a popular IDE for Zandronum modding because it is specialized to deal with the PK3 and WAD file formats which Zandronum runs off of. Once you have SLADE 3 installed, go ahead and open it up. You should see a view that looks similar to below:

<!-- image omitted (assets not vendored) -->

We’re going to want to start our modding ventures by creating a new PK3 file to place our code into. SLADE calls these “archives,” so let’s create a new archive by clicking the green icon in the top left. This will bring up a pop-up asking which type of archive we want to create. PK3 files are equivalent to ZIP archives, so we’ll use a ZIP archive for our project.

<!-- image omitted (assets not vendored) -->

We now have an entirely empty project, ready for some code to be placed into it!

<!-- image omitted (assets not vendored) -->

One important thing to understand about DECORATE is that Zandronum only loads code that is located in a `DECORATE` file in the root of our project. This sounds pretty bad at first, all of our code localized in one single file? Let’s go with it for now and we’ll quickly figure out a way to better organize our code.

With that in mind, let’s go ahead and create that `DECORATE` file. We’ll do this by creating a new “entry.” Note that for Zandronum to recognize our `DECORATE` file, it must actually be named exactly that.

<!-- image omitted (assets not vendored) -->

Now that we have a `DECORATE` file, you can click on it to see a text editor. This is where we can begin placing some code and have the game interpret it as DECORATE code!

<!-- image omitted (assets not vendored) -->

Before we start getting carried away, however, let’s first learn how to save our project so that we can begin to start saving regularly. We can do this by clicking the floppy disk icon in the upper left. When we save our archive, we’ll want to make sure we specify its file extension to be `.pk3`, otherwise it will save as a standard `.zip` file.

<!-- image omitted (assets not vendored) -->

Now that we’ve saved the file, we can proceed with some confidence that at least our DECORATE file won’t be going anywhere. Once the file has been made, you can save more quickly by using the typical `Ctrl + S` hotkey, so be sure to make a habit of saving often!

Now while we can begin writing code into this `DECORATE` file directly, that’s realistically not how projects are made, or at least not how they should be made. Instead, we leverage the ability to “include” DECORATE files into other DECORATE files. You can think of this as Zandronum copying and pasting the contents of one file into another at startup. 

Using this, we can write all of our code in other files, but then include them into the root `DECORATE` file, allowing us to organize our code nicely. Let’s go ahead and make some folders (formally called directories) to contain our real project files. We can do this by clicking the folder icon on the left.

<!-- image omitted (assets not vendored) -->

The typical convention for DECORATE is to have all of our other files in an `actors` folder. This will give a hint to SLADE 3 on which syntax highlighting to use. Inside of this folder, let’s go ahead and make one more folder. You can specify where entries and folders are created by highlighting a specific folder.

<!-- image omitted (assets not vendored) -->

Inside of this new folder, we can now create a new DECORATE file. This’ll be another entry with a type of text and whatever name we want.

<!-- image omitted (assets not vendored) -->

Now, you may be wondering, why’d we create an extra `tutorial` folder when the `actors` one would suffice by itself? This is because we need to take some extra care regarding directory paths when beginning to use non-`DECORATE` files. 

A directory path for a given file is made up of all the folders which lead to that file alongside its file name and extension. For example, the directory path of our `DECORATE` file is `DECORATE.txt`. The directory path of our newly created `first_actors.txt` file is `actors/tutorial/first_actors.txt`.

For reasons that we’ll cover later, we want to make sure that the directory paths for all of our files are unique from that of core MM8BDM’s files and any other mods which we plan to play our project with. Failing to accomplish this can lead to conflicts in files and some very insidious errors! 

> 🚨 **To highlight the importance of this concept, creating a file which has the directory path of **`/actors/root.txt`** in your project can instantly cause MM8BDM to not load when loading your project!**

Now that we have a new file which we can write code inside of, let’s now “include” it into our root `DECORATE` file. We’ll accomplish this by using the `#include` directive inside of our `DECORATE` file. This directive should be used following the format below:

```c
#include "<file_directory_path_here>"
```

Below is an implementation of it for our previously created file.

<!-- image omitted (assets not vendored) -->

Now that `first_actors.txt` is included into our root `DECORATE` file, any code which we write into it will be loaded. We can even make another file and include it using the same process!

<!-- image omitted (assets not vendored) -->

Now we have two files which we can write code inside of. Since we now understand how we can write code in any arbitrary text file then just include it into our root `DECORATE` file, you can assume that any code showcased outside of SLADE’s user interface is being put into either `first_actors.txt` or a different file which has been included into `DECORATE.txt`. All that talk about organization and inclusion aside, let’s actually begin talking the DECORATE programming language.

## High Level Overview

---

The DECORATE programming language was originally created for map decorations, hence the name. It has since evolved to be much more capable than solely decorations, but that gives us a starting point to think about what the DECORATE language is for. DECORATE is for creating the objects of the world, called “actors.” These “actors” can be as simple as a static map prop or as complicated as the player and their weapons.

We can create an absolute barebones actor by using the syntax below:

```c
actor NothingActor 
{
	// Nothing here!
}
```

The line with a `//` is what we call a comment. Anything after the `//` but on the same line will be ignored by the engine. These are useful for documenting what you’re thinking for future reference. 

Until we learn some more skills, we’ll test all of our actors by summoning them in the console. To open the console, the default key is the `~` button. In this console, you can use the `summon` command in the format below:

```c
summon <actor_name>
```

While we can do `summon NothingActor`, as the name suggests, this actor is literally nothing. It *does* exist on the map whenever you summon it, but it has no states and no properties, meaning it’s entirely invisible and completely noninteractive.

Every good actor has a set of properties and flags. These govern how the actor interacts with the environment and other actors. For example, `gravity` is a property. We can say that an actor has 2.0 gravity to make it act heavier or we can say it has 0.5 gravity to make it act lighter. We can make it disregard gravity entirely by giving it a `+NOGRAVITY` flag.

Good actors also have states. States can be thought of as the different phases of an actor. It’s inside of these states that we can create the animations of the actor and call functions to perform special actions. You could say a torch actor has a `Spawn` state, played out just as it spawns into the world. Then you can say it goes into an `Idle` state, occasionally playing an animation with a `Flicker` state. Although you can make actors using only one state, multiple states are highly valuable, if not required, for actors with complex patterns and behavior.

With those two sets of aspects in mind, we can see a better actor below:

```c
actor BetterActor
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 A 70
			PLY1 H 17 A_Log("\cvMaestro\c-: Ow!")
			stop
	}
}
```

This actor has 3 properties, one flag, one state, and even calls a function! It appears as Maestro, sits idle for 2 seconds, and then briefly shows a hurt animation before the actor disappears. We’ll talk more in detail about all of these concepts below.

## Actor Properties and Flags

---

Let’s truncate the actor above to just its actor properties and flags:

```c
actor BetterActor
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	...
}
```

The `+SOLID` line is the `SOLID` actor flag being enabled, indicated by the `+`. Actor flags can be removed by prepending a `-` instead, which will be useful later. This particular flag makes the actor unable to be walked or shot through. The `height`, `radius`, and `scale` lines are actor properties. 

The `height` property sets the height of the actor in map units. 56 map units is just shorter than a Guts Block and conveniently, the same height that players are. The `radius` property sets the radius of the actor in map units. 16 map units is the same radius as players and Oil Canisters. 

The `scale` property is solely a visual one. It determines how much the sprites of the actor should be upsized by for the final rendered sprite. In other words, each pixel of Maestro is being upsized to be 2.5x the size. A scale of 2.5 is generally the standard for MM8BDM’s actors, unless the actor is intended to match the scaling of the textures in the map, in which case 2.0 should be used.

Some special keywords can be put as a property to automatically add a group of flags. We call these “flag combos.” An example is the `PROJECTILE` flag combo. By adding this, it will automatically add the following flags: `NOBLOCKMAP`, `NOGRAVITY`, `DROPOFF`, `MISSILE`, `ACTIVATEIMPACT`, `ACTIVATEPCROSS`, and `NOTELEPORT`. As you can guess, this combo is the basis of making an actor which acts as a projectile.

```c
actor FirstProjectile
{
	PROJECTILE
	damagetype "Buster"
	Obituary "%o was wowed by %k's first projectile!"
	Speed 27
	Damage (20)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			BUST A 0
			BUST A 105
			stop
	}
}
```

This actor uses some of the same properties as our previous actor, but introduces a few new ones that are more fitting for a projectile type actor, such as `speed`, `damage`, `damagetype`, and `obituary`. Speed and damage are fairly self explanatory. Damage types are useful for giving our projectile a unique pain or death effect, which will be covered in a future tutorial. 

> 🚨 **Don’t forget to use parentheses when using the **`damage`** property! If you exclude them, Zandronum will use a default expression of **`(random(1,8) * damage)`** to determine the final damage. Putting our desired value in parentheses prevents this!**

The obituary is a property which determines the chat message broadcasted whenever a player receives a kill with the projectile. `%o` acts as a placeholder for the fragged player, while `%k` acts as a placeholder for the fragging player.

There’s certainly too many actor flags and properties to cover in this tutorial directly, so we’ll see more of them as we create more actors. However, you can always view all the actor [flags](https://zdoom.org/wiki/Actor_flags) and [properties](https://zdoom.org/wiki/Actor_properties) on the ZDoom wiki. Just don’t forget to use the aforementioned tool to obtain the URLs for Zandronum’s version of GZDoom!

## Actor States

---

Now that we understand actor properties and flags, let’s instead truncate our `BetterActor` to just its states:

```c
actor BetterActor
{
	...
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 A 70
			PLY1 H 17 A_Log("\cvMaestro\c-: Ow!")
			stop
	}
}
```

This actor just has one state, with that state being the `Spawn` state. The line which has `Spawn:` is called the state label. Some state names have special meaning and and may entail some innate engine behavior when using them. For example, if an actor has a `Spawn` state, Zandronum will start the actor’s execution at the beginning of the `Spawn` state.

States are made up of “lines.” Whenever an actor’s execution reaches a given state, Zandronum will begin to execute its lines sequentially, one by one. Each line specifies the sprite name for the actor to use on that line, the sprite frame out of that sprite name set to use, a duration for the line, and potentially an action to be executed when that line is reached, all in the following format:

```c
<sprite_name> <sprite_frame> <duration> [action]
```

We can break down the following line into these four pieces.

```c
PLY1 H 17 A_Log("\cvMaestro\c-: Ow!")
```

`PLY1` is the sprite name. This is a set of frames which corresponds to Maestro’s skin. `H` is the desired sprite frame. Out of all of the `PLY1` sprites, we’ll use the `H` frame, which corresponds to Maestro’s hurt sprite. 

We can see in the attached image the correlation between how sprites are typically named and then how we refer to them in our DECORATE code. The sprite name is always the first four characters of the sprite, while the sprite frame is the 5th (and 7th) character. For more details of how sprites work, you can refer to the tutorial for [graphics](./adding-custom-graphics-28261edf.md).

<!-- image omitted (assets not vendored) -->

The `17` in the line of code indicates that the engine will stall on this line for 17 “tics.” A “tic” is 1/35 of a second, so you could say that 17 tics is just under half a second. While the execution is stalling on this line, it will display the sprite frame specified.

This particular line does have an action, being the [`A_Log`](https://zdoom.org/wiki/A_Log) function. This function will log whatever message we specify to the chat. This function is typically not very useful in practice, but it is great for debugging and illustration purposes such as this. 

With the action of a line, it is worth noting that it is executed immediately when that line is reached, with no regard for the line duration. Essentially, the two following bits of code are identical:

```c
PLY1 H 17 A_Log("\cvMaestro\c-: Ow!")

```

```c
PLY1 H 0 A_Log("\cvMaestro\c-: Ow!")
PLY1 H 17
```

If you have multiple lines which have the exact same sprite name, duration, and action, we can combine them with a handy shorthand. Take the following lines of code as an example:

```c
PLY1 B 5
PLY1 C 5
PLY1 D 5
PLY1 E 5
```

These lines of code can be combined into the single line of code below:

```c
PLY1 BCDE 5
```

However, just don’t forget that although this is one line of code in text, it is being evaluated as multiple lines. This behavior becomes evident once we introduce an action. The `A_Log` function below will execute 4 times, once for each sprite frame.

```c
PLY1 BCDE 5 A_Log("\cvMaestro\c-: I'm running!")
```

Each state should typically end with a state control instruction or another state label. The `stop` line that we’ve seen multiple times earlier is an example of a state control instruction. When the actor reaches a line with this instruction, the actor will instantly remove itself. We’ll learn about more state control instructions later.

By adding more state labels, we introduce more states into our actor. Below will take the running code we have above and introduce it into `BetterActor` as a `Running` state.

```c
actor EvenBetterActor
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 A 70
		Running:
			PLY1 BCDE 5 A_Log("\cvMaestro\c-: I'm running!")
			PLY1 BCDE 5 A_Log("\cvMaestro\c-: I'm still running!")
			PLY1 B 5 A_Log("\cvMaestro\c-: I!")
			PLY1 C 5 A_Log("\cvMaestro\c-: am!")
			PLY1 D 5 A_Log("\cvMaestro\c-: still!")
			PLY1 E 5 A_Log("\cvMaestro\c-: running!")
		Trip:
			PLY1 H 17 A_Log("\cvMaestro\c-: Ow!")
			stop
	}
}
```

Whenever a state ends with another state label, the line-by-line execution of the first state “falls” into the state below. 

Before we move on from states, there is one oddity to mention about the `Spawn` state. Actors are hard-coded to skip the first tic of the first line of their `Spawn` state. This means that the following behavior can be expected:

```c
Spawn:
	PLY1 A 2 A_Log("\cvMaestro\c-: You see this right?")
	PLY1 H 5 A_Log("\cvMaestro\c-: Oh no...")
	stop
>>>
Spawn:
	PLY1 A 1
	PLY1 H 5 A_Log("\cvMaestro\c-: Oh no...")
	stop
```

It’s for this reason that we typically add an empty line with 0 duration to the beginning of the `Spawn` state as follows:

```c
Spawn:
	PLY1 A 0
	PLY1 A 2 A_Log("\cvMaestro\c-: Now this is visible!")
	PLY1 F 5 A_Log("\cvMaestro\c-: Woo!")
	stop
```

Now that we understand states, let’s talk about some more state control instructions to be able to create some actors with more complex behavior and longevity.

## Basic Loops

---

So far, we’ve only been able to create actors that only exist for some duration, so it’d be nice if we could create an actor that just exists forever. As you can guess, loops allow us to accomplish this.

Let’s take our `FirstProjectile` from earlier and create an `InfiniteProjectile` that has no range limit.

```c
actor InfiniteProjectile
{
	PROJECTILE
	damagetype "Buster"
	Obituary "%o was wowed by %k's first projectile!"
	Speed 27
	Damage (10)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			BUST A 0
			BUST A 1
			loop
		Death:
			MMFX BCDE 2
			stop
	}
}
```

The `loop` state control instruction will cause the actor’s line execution to return to the beginning of the current state. In this instance, that creates an infinite loop, meaning our projectile will go on forever until hitting a wall or player.

This projectile also showcases a new special state name, `Death`. If defined, actors with the `MISSILE` actor flag, which is given by the `PROJECTILE` flag combo, will automatically disable its collision and enter the `Death` state upon colliding with a wall or actor. This can be useful for on-collision effects such as pop animations or explosions.

We can also use the `loop` instruction in our other actors as well.

```c
actor RunningForeverActor
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 A 70
		Running:
			PLY1 BCDE 5 A_Log("\cvMaestro\c-: I'm running!")
			PLY1 BCDE 5 A_Log("\cvMaestro\c-: I'm still running!")
			PLY1 B 5 A_Log("\cvMaestro\c-: I!")
			PLY1 C 5 A_Log("\cvMaestro\c-: am!")
			PLY1 D 5 A_Log("\cvMaestro\c-: still!")
			PLY1 E 5 A_Log("\cvMaestro\c-: running!")
			loop
	}
}
```

Now our Maestro actor will run forever without tripping. As you may be able to guess, the `loop` instruction is valuable for just about any type of actor.

Aside from the `loop` instruction, we can create loops using the `wait` instruction. The `wait` instruction will cause the actor’s line execution to go backwards by one line, execute that line again, and then hit the `wait` instruction again.

```c
actor WaitingForeverActor
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 A 70
			PLY1 F 5 A_Log("\cvMaestro\c-: I'm waiting...")
			wait
	}
}
```

Once this actor hits the `wait` instruction, it will be stuck in an infinite loop of logging a message every 5 tics. Good thing there’s no spam filter for actors!

One important consideration with loops is to not create an infinite, 0 tic loops. These are loops where there is no line with a duration greater than 0 from the beginning of the loop to the end of the loop. Creating a loop like this will instantly crash the game with not much indication of why it occurred. 

This is because sequential lines with 0 duration are executed with no delay between them, so if you create an infinite loop of sequential lines with 0 duration, the game is forever stuck evaluating your actor. Below is an example of one of these dangerous loops:

> 💡 **As seen in the actor below, the sprite name **`TNT1`** with sprite frame **`A`** is reserved by Zandronum to mean an entirely invisible sprite. It’s actually impossible to provide a sprite for this combo, so it is preferable to use this over a manually implemented invisible sprite.**

```c
actor GoodbyeWorld
{
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 35 A_Log("Life ends in one second...")
		SpawnLoop:
			TNT1 A 0
			loop
	}
}

actor GoodbyeWorldWithWait
{
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 35 A_Log("Life ends in one second...")
			TNT1 A 0
			wait
	}
}
```

## Goto Statements

---

The `loop` and `wait` state control instructions introduced the idea of being able to return to an earlier state or line when executing the lines of a state. This leads us to the more flexible state control instruction called `goto`. 

The `goto` state control instruction allows the line execution to go to any arbitrary state label next. We can use this to implement a basic three animation cycle. We’ll have Maestro idle for a bit, fire his buster, run for a bit, then loop back around the cycle.

```c
actor ThreeAnimationCycleActor
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 A 70 A_Log("\cvMaestro\c-: I'm hanging around!")
			goto Missile
		See:
			PLY1 B 0 A_Log("\cvMaestro\c-: Time to run!")
			PLY1 BCDEBCDE 5 
			goto Spawn
		Missile:
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew pew pew!")
			PLY1 GFGFG 5
			goto See
	}
}
```

Note that now that we use `goto` to manually specify which state to go to at the end of a state, we can order our states in any order. There’s no longer any need to rely on state fall-through.

The `goto` state control instruction also has another trick up its sleeve with its ability to specify what’s called a relative offset. While we can use it to directly go to the first line of a state as we did above, we can also specify a number of lines to skip by appending `+X` where `X` is some number of lines to skip.

Below is an example of using the relative offset alongside some equivalent code using only `loop` instead:

```c
Spawn:
	PLY1 A 0
	PLY1 A 0 A_Log("\cvMaestro\c-: You'll only see this once!")
	PLY1 A 1
	goto Spawn+2

```

```c
Spawn:
	PLY1 A 0
	PLY1 A 0 A_Log("\cvMaestro\c-: You'll only see this once!")
SpawnLoop:			
	PLY1 A 1
	loop
```

This feature can be a nice shorthand to be able to play animations or perform setup only once before going into a traditional loop. Just be careful when using relative offsets alongside combined lines, because the behavior can become a bit unintuitive. The actor below shows an example of the two combined and how tricky it can be to figure out which line the relative offset skips to.

```c
actor GotoWithMoreOffsetActor
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 BCDE 5 A_Log("\cvMaestro\c-: I'm running!")
			PLY1 A 1
			goto Spawn+5
	}
}
```

## Fun with Functions

---

Now that we know our way around navigating between states, let’s try to do more inside of them than basic animation and logging. This’ll be a section dedicated to introducing some simple, commonly used functions. 

Before we get into it, we need to introduce the idea of function parameters. Many functions have required parameters, which means that whenever we call the function, we must supply an argument for each required parameter. The list of required parameters for every function can be seen in that function’s respective ZDoom / Zandronum wiki page. This mechanism is our way of specifying and tweaking the behavior of functions when called. 

When we were previously calling the `A_Log` function, we were calling it with one argument for its message parameter. We did this by using a set of parentheses and our string value (a value surrounded by quotes) inside of it. If we didn’t supply this parameter, then `A_Log` wouldn’t have worked, since it wouldn’t know what message to log.

We’ll illustrate some common functions by starting with a Hard Knuckle that explodes using the [`A_Explode`](https://zdoom.org/wiki/A_Explode) function. As mentioned earlier, another piece to accomplish this will be to use the `MISSILE` actor flag’s `Death` state behavior.

```c
actor ExplodingHardKnuckle
{
	PROJECTILE
	damagetype "HardKnuckle"
	Obituary "%o went boom from %k's Hard Knuckle."
	Speed 38
	Damage (75)
	radius 12
	height 10
	scale 2.5
	States
	{
		Spawn:
			HARD A 0
			HARD A 1
			wait
		Death:
			TNT1 A 0 A_Explode(50, 96, 0, 0, 32)
			MXP2 ABCDEFGHIJKLMNOPQRST 1
			stop
	}
}
```

The `A_Explode` function call in the `Death` state indicates that when that line is reached, it will perform an explosion with a specified radius and amount of damage. In this case, our set of arguments is `50, 96, 0, 0, 32`.

These arguments indicate that the Hard Knuckle will do an explosion of max `50` damage in a radius of `96` map units. The next `0` indicates that there’s no `XF_` flags being used, so there’s no special behavior to be expected. The `0` after indicates that the explosion shouldn’t trigger any alarms. This argument should generally always be 0, since the alarm behavior is never used in MM8BDM. The final argument, `32`, specifies that this explosion will always deal its max damage within 32 map units.

[2024-02-18 19-26-17.mp4](../assets/34840dc0da864601a7ffcc712f635dc5-2024-02-18_19-26-17.mp4)

We’re informed enough to be dangerous, but our explosion is oddly silent. That’s because we haven’t called any function to play a sound, so let’s add that. We’ll use the [`A_PlaySoundEx`](https://zdoom.org/wiki/A_PlaySoundEx) function to do so as seen below:

```c
Death:
			TNT1 A 0 A_PlaySoundEx("weapons/mm5/napalmbombexplode", "Weapon")
			TNT1 A 0 A_Explode(50, 96, 0, 0, 32)
			MXP2 ABCDEFGHIJKLMNOPQRST 1
			stop
```

In this particular example, we’re saying that we want to play the predefined `weapons/mm4/drillbombexplode` sound on the `Weapon` channel. The channel is a means for us to determine whether or not subsequent sound calls should overlap or interrupt the sound. If we had two sounds attempting to play on the `Weapon` channel at the same time, the latter will interrupt the former.

[2024-02-18 19-52-13.mp4](../assets/444dd1c5c5004e54a60018603607c43c-2024-02-18_19-52-13.mp4)

Mega Man 8-Bit Deathmatch already has a lot of sounds defined in its `SNDINFO` file that can be leveraged for new actors, but if you want, you can also implement your own sounds and use them just the same. See the page for [Adding Custom Sounds](./adding-custom-sounds-6cf0678b.md) if you’re interested.

Now that our explosion is all functional, let’s talk balance and mitigate a balance issue with our new projectile. If you actually hit an enemy with this projectile, it’ll hit for 75 direct damage but then continue to explode for 50 extra damage. 

Depending on the values you’re using for the direct and explosion damage, this can be preferable behavior. However, for the sake of example, let’s say that we only want this Hard Knuckle to explode when hitting surfaces. We can accomplish this by using the special `Crash` and `XDeath` states.

The `Crash` state is entered whenever a projectile hits a non-bleeding actor while the `XDeath` actor is entered whenever a projectile hits a bleeding actor. Although MM8BDM doesn’t use blood, there can be inconsistent behavior if you choose one or the other, so for best practices, you’ll typically want to use both states to mean that the projectile has hit an actor. With that in mind, we can modify our exploding Hard Knuckle to look like below:

```c
States
	{
		Spawn:
			HARD A 0
			HARD A 1
			wait
		Death:
			TNT1 A 0 A_Explode(50, 96, 0, 0, 32)
			MXP2 ABCDEFGHIJKLMNOPQRST 1
			stop
		XDeath:
		Crash:
			MMFX BCDE 2
			stop
	}
```

This modification will cause the Hard Knuckle to (relatively) harmlessly fizzle upon hitting an actor, instead of stacking the explosion on top of the direct hit damage and delivering a fatal shot.

Now that our Hard Knuckle is fairly different from the basic one, let’s change its color for kicks. We’ll make it red and give its explosion a red hue. To accomplish this, we’ll make use of the `translation` actor property and MM8BDM’s palette, seen below.

<!-- image omitted (assets not vendored) -->

The `translation` actor property allows us to remap a range of palette colors on the actor to another range of palette colors. For example, a lot of explosions use the palette colors 210 to 215 for their peach color, so we can remap 210 to 215 to another palette color such as 172.

In practice, that change would look like the following `translation` property:

```c
translation "210:215=172:172"
```

We combine multiple color translations into the same property by separating them by comma. Below is our exploding Hard Knuckle but with an added translation to also make it from blue into red.

```c
actor ExplodingHardKnuckle
{
	PROJECTILE
	damagetype "HardKnuckle"
	Obituary "%o went boom from %k's Hard Knuckle."
	translation "210:215=172:172", "199:199=42:42"
	Speed 38
	Damage (75)
	radius 12
	height 10
	scale 2.5
	...
}
```

[2024-02-18 20-22-57.mp4](../assets/2c2cfbe1756841fabca5dc097c227fe6-2024-02-18_20-22-57.mp4)

[2024-02-18 22-36-48.mp4](../assets/20880e74196e4ccf971b42877e6e6898-2024-02-18_22-36-48.mp4)

We can optimize this projectile even further. We’re currently handling the explosion effects of the projectile within the death state itself, which isn’t the worst, but it’s a bit tedious and limiting. This method is prone to copy and paste errors and we can’t layer explosion effects easily.

What would be better is to instead spawn another actor (or actors) at the location of the projectile whose sole job is playing that animation in a standardized way. This brings us to one of the more powerful DECORATE functions to know, [`A_SpawnItemEX`](https://zdoom.org/wiki/A_SpawnItemEx). This function allows us to spawn any actor from another actor.

Mega Man 8-Bit Deathmatch already implements basic explosion effect actors that can be reused between projectiles for a standardized effect. We’ll use `A_SpawnItemEX` to spawn these pre-existing actors from our exploding Hard Knuckle. Below is an example of this:

```c
actor ExplodingHardKnuckle
{
	translation "210:215=172:172", "199:199=42:42"
	...
	States
	{
		Spawn:
			HARD A 0
			HARD A 1
			wait
		Death:
			TNT1 A 0 A_PlaySoundEx("weapons/mm5/napalmbombexplode", "Weapon")
			TNT1 A 0 A_Explode(50, 96, 0, 0, 32)
			TNT1 A 0 A_SpawnItemEX("ExplosionEffect2")
			stop
		XDeath:
		Crash:
			TNT1 A 0 A_SpawnItemEX("ExplosionEffect1")
			stop
	}
}
```

`ExplosionEffect1` is the standard “pop” animation, `ExplosionEffect2` is Napalm Bomb’s explosion, `ExplosionEffect3` is Hyper Bomb’s explosion, and `ExplosionEffect4` is Mega Man V’s mini-boss explosion. 

[Untitled](../assets/0a86ec86d6ac4874b1419db9609ae2df-Untitled.mp4)

There’s just one caveat with moving to this method. Since these explosion effects are their own actor, the `translation` property we’re applying to the exploding Hard Knuckle won’t take effect on them.

We can fix this very quickly by making use of the `SXF_TRANSFERTRANSLATION` flag as an argument for the flags parameter of `A_SpawnItemEX`. As the name of the flag suggests, this flag will transfer the translation to the actors being spawned. Understanding this flag will be particularly useful for later! Below is an implementation, note the 0 arguments being provided because we cannot skip parameters on the way to the flags parameter.

```c
Death:
	TNT1 A 0 A_PlaySoundEx("weapons/mm5/napalmbombexplode", "Weapon")
	TNT1 A 0 A_Explode(50, 96, 0, 0, 32)
	TNT1 A 0 A_SpawnItemEX("ExplosionEffect2", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
	stop
XDeath:
Crash:
	TNT1 A 0 A_SpawnItemEX("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
	stop
```

> 💡 If you’re browsing in Mega Man 8-Bit Deathmatch’s source code, you may find that it uses a `SXF_WEPFXCOLOR` flag in the flags parameter. That flag is an alias of `SXF_TRANSFERTRANSLATION` that MM8BDM has created, so it is functionally equivalent.

There’s many, many more functions than this, these few are just a sampler to begin with. We’ll introduce some more important functions in the coming sections once we cover a bit more knowledge.

## Expressions

---

In DECORATE, when using functions and certain actor properties, such as `damage`, we can also leverage “expressions.” Formally, an expression is code that can be evaluated by the computer into a single value. For example, DECORATE supports all of the basic arithmetic operators in expressions, so if we put `2 + 7` as a function argument, it will be evaluated at runtime to use the value `9`. Below are two examples of this in practice:

```c
damage (50 - 2) // evaluated to 48
...
A_Explode(50, 96, 0, 0, 16 + 16) // evaluated to 32
```

As you can probably guess, these sorts of hardcoded arithmetic expressions aren’t the full extent of DECORATE’s expressions. Expressions get more interesting once we start to use the [special functions](https://zdoom.org/wiki/DECORATE_expressions) designed solely for them. 

Some of these functions include basic mathematical operations and more advanced trigonometry functions. Another useful function is the [`random`](https://zdoom.org/wiki/DECORATE_expressions#:~:text=Random%20number%20functions-,random,-%5Bidentifier%5D() function, which we can use to obtain a random number in a given range. Below is our `ExplodingHardKnuckle` except modified to have some more random flair.

```c
actor RandomExplodingHardKnuckle
{
	PROJECTILE
	damagetype "HardKnuckle"
	Obituary "%o went boom from %k's Hard Knuckle."
	translation "210:215=172:172", "199:199=42:42"
	Speed 38
	Damage (random(60, 80))
	radius 12
	height 10
	scale 2.5
	States
	{
		Spawn:
			HARD A 0
			HARD A 1
			wait
		Death:
			TNT1 A 0 A_PlaySoundEx("weapons/mm5/napalmbombexplode", "Weapon")
			TNT1 A 0 A_Explode(random(40, 60), 96, 0, 0, 32)
			TNT1 A 2 A_SpawnItemEX("ExplosionEffect2", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			TNT1 AAA 2 A_SpawnItemEX("ExplosionEffect2", random(0, 64), 0, random(0, 64) - 32, 0, 0, 0, random(0, 359), SXF_TRANSFERTRANSLATION)
			stop
		XDeath:
		Crash:
			TNT1 A 0 A_SpawnItemEX("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			stop
	}
}
```

With these changes, its direct hit damage is a random number in the inclusive range of 60 to 80. Its explosion damage is now in the inclusive range of 40 to 60. On a non-direct hit, it’ll first spawn one explosion effect at its point of impact. Afterwards, it’ll spawn 3 more explosion effects randomly within a cylinder with a radius of 64 map units and a height of 64 map units, offset downwards by 32 map units.

In addition to these expression functions, we get access to special variables when using expressions as well. We’ll illustrate one useful set of these variables by creating a projectile that pierces enemies and slows down as it travels.

```c
actor DeadlyPerfectFreeze
{
	PROJECTILE
	+RIPPER
	
	damagetype "IceSlasher"
	Obituary "%o was frozen by %k's Perfect Freeze."
	
	Speed 40
	Damage (8)
	reactiontime 5
	
	radius 5
	height 5
	
	scale 2.5
	renderstyle translucent
	alpha 1.0
	States
	{
		Spawn:
			ICES A 0
			ICES AAABBB 1 A_ChangeVelocity(velx * 0.9, vely * 0.9, velz * 0.9, CVF_REPLACE)
			ICES A 0 A_Countdown
			loop
		Death:
			ICES AAABBB 1 A_FadeOut(0.1)
			loop
	}
}
```

There’s a lot of new concepts here, so we’ll break it down one step at a time. Like before, this actor uses the `Projectile` actor flag combo, but we’re introducing a new `RIPPER` actor flag. This turns our projectile into what’s typically called a “ripper.” 

Instead of entering its `Death` state whenever it hits a shootable actor, `+RIPPER` projectiles will instead “rip” through the shootable actor, piercing through them and dealing its damage value (8 damage in this case) every tic that the projectile is overlapping the shootable actor.

This actor also has a few new actor properties, one of which being `reactiontime`. This actor property is one which works in tandem with the [`A_Countdown`](https://zdoom.org/wiki/A_Countdown) function. The `reactiontime` property defines a counter, while `A_Countdown` reduces that counter down each time it is called. Whenever the counter reaches 0, the actor is instantly sent to its `Death` state. This gives us an easy way to add a distance limit to our projectiles.

This actor also has two translucency related actor properties, seen below:

```c
renderstyle translucent
alpha 1.0
```

If we ever want our actor to appear translucent, we have to make sure that its [`renderstyle`](https://zdoom.org/wiki/Actor_properties#:~:text=Rendering-,RenderStyle,-type) actor property is one of the ones which support transparency. In this case, our actor still has a default opacity of 1.0, but by giving it `renderstyle translucent`, we give it the option for it to go lower. 

This is important, because in the projectile’s `Death` state, we’re making use of the [`A_FadeOut`](https://zdoom.org/wiki/A_FadeOut) function. This function will lower the actor’s opacity by a given value, removing the actor completely whenever its opacity reaches 0.0. This allows us to do easy fade to nothing animations that’ll automatically remove the actor when it’s no longer visible. 

With those details out of the way, we can now move to the meat of this actor, [`A_ChangeVelocity`](https://zdoom.org/wiki/A_ChangeVelocity). Velocity is how we describe an actor’s current speed. An actor will have an X velocity, a Y velocity, and a Z velocity. 

`A_ChangeVelocity` allows us to apply additive forces to these velocities or to replace them entirely. Combined with the expression variables that represent the actor’s current velocity, `velx`, `vely`, and `velz`, this gives us some pretty good control of an actor’s current velocity.

In this instance, we’re essentially using `A_ChangeVelocity` to get the actor’s velocity on each axis, multiply that velocity by 0.9, then replace the actor’s velocity to use the new values. The end result is a projectile which slows to a halt the further it travels.

Sounds all good, right? Well, we did introduce a bit of a balance problem with our new projectile. As you’ll come to learn, `+RIPPER` projectiles and slow speeds tend to not be a very good idea at all, so our new projectile absolutely shreds at its apex.

[2024-02-29 23-12-26.mp4](../assets/5d54419e6c204c2685ee90ac0a322743-2024-02-29_23-12-26.mp4)

Ideally, we’d keep our projectile’s damage high whenever it’s at full speed then we’d lower its damage as it slows down. Thankfully, with clever use of math and expressions, we can accomplish this. Below is a modified version of the actor which adds an expression to the `damage` actor property as well as a [`A_LogInt`](https://zdoom.org/wiki/A_LogInt) function call to give an idea of how the damage changes as the projectile travels.

```c
actor PerfectFreeze
{
	PROJECTILE
	+RIPPER
	
	damagetype "IceSlasher"
	Obituary "%o was frozen by %k's Perfect Freeze."
	
	Speed 40
	Damage (((abs(velx) + abs(vely) + abs(velz)) / 40) * 5 + 3)
	reactiontime 5
	
	radius 5
	height 5
	
	scale 2.5
	renderstyle translucent
	alpha 1.0
	States
	{
		Spawn:
			ICES A 0
			ICES A 0 A_LogInt(((abs(velx) + abs(vely) + abs(velz)) / 40) * 5 + 3)
			ICES AAABBB 1 A_ChangeVelocity(velx * 0.9, vely * 0.9, velz * 0.9, CVF_REPLACE)
			ICES A 0 A_Countdown
			loop
		Death:
			ICES AAABBB 1 A_FadeOut(0.1)
			loop
	}
}
```

[2024-02-29 23-19-42.mp4](../assets/b002e2db049d400b82bf788e5f3f0ebf-2024-02-29_23-19-42.mp4)

## Boolean Expressions

---

Continuing from expressions, boolean expressions are a subset of expressions that always evaluate to a boolean value (`true` or `false`). Compared to typical expressions, boolean expressions use a different set of operators which can be broken down into “comparison” and “logical” operators.

Below are a few examples of the comparison operators. Their behavior is fairly straight forward and shares the same functionality as their mathematical counterparts.

```c
> // greater than operator
10 > 5 // evaluates to `true`

< // less than operator
10 < 5 // evaluates to `false`

== // equality operator
10 == 5 // evaluates to `false`

>= // greater than or equality operator
10 >= 10 // evaluates to `true`

<= // less than or equality operator
4 <= 5 // evaluates to `true`

!= // inequality operator
10 != 5 // evaluates to `true`
```

The logical operators are distinct, however, because they are use to operate upon boolean values, meaning that when using a logical operator, all the operands are `true`, `false`, or other boolean expressions which evaluate to one of those two.

To begin, we have the logical NOT operator, `!`. By placing a `!` in front of a boolean value or expression, we invert its result. Note the use of parentheses below to dictate which parts of the expression are evaluated first.

```c
! // logical NOT operator
!true // evaluates to `false`
!false // evaluates to `true`
!(10 > 5) // evaluates to `false`
!(10 < 5) // evaluates to `true`
```

Next, we have the logical AND operator, `&&`. In general, we use this operator when we want to enforce that two or more conditions are true. Below are a few examples:

```c
&& // logical AND operator
true && true // evaluates to `true`
true && false // evaluates to `false`
false && true // evaluates to `false`
false && false // evaluates to `false`

(10 > 5) && (5 > 3) // evaluates to `true`
(10 > 5) && (5 < 4) // evaluates to `false`
```

Finally, we have the logical OR operator, `||`. This operator will return true if either of its operands are true, so we typically use it for just confirming that one of many conditions is true. Below are examples of this operator:

```c
|| // logical OR operator
true || true // evaluates to `true`
true || false // evaluates to `true`
false || true // evaluates to `true`
false || false // evaluates to `true`

(10 > 5) || (5 > 3) // evaluates to `true`
(10 > 5) || (5 < 4) // evaluates to `true`
```

Until we learn about conditional jumps in the next section, our use of boolean expressions will be fairly limited, but we can still find clever uses of them in larger expressions.

In DECORATE, the `true` and `false` values are equivalent to the values 1 and 0, meaning that we can use them as a part of arithmetic expressions, particularly with multiplication. Using our `PerfectFreeze` projectile from earlier, we can use this idea to create a less granular version which does 3 damage at minimum with an extra 6 damage if it’s moving quicker than 20 speed.

```c
actor SteppedPerfectFreeze
{
	PROJECTILE
	+RIPPER
	
	damagetype "IceSlasher"
	Obituary "%o was frozen by %k's Perfect Freeze."
	
	Speed 40
	Damage ((((abs(velx) + abs(vely) + abs(velz)) / 40) > 0.5) * 6 + 3)
	reactiontime 5
	
	radius 5
	height 5
	
	scale 2.5
	renderstyle translucent
	alpha 1.0
	States
	{
		Spawn:
			ICES A 0
			ICES A 0 A_LogInt((((abs(velx) + abs(vely) + abs(velz)) / 40) > 0.5) * 6 + 3)
			ICES AAABBB 1 A_ChangeVelocity(velx * 0.9, vely * 0.9, velz * 0.9, CVF_REPLACE)
			ICES A 0 A_Countdown
			loop
		Death:
			ICES AAABBB 1 A_FadeOut(0.1)
			loop
	}
}
```

## Conditional Jumps

---

While the `goto` state control instruction is useful for deterministic, “static” state navigation, it isn’t too useful once we want nondeterministic, “virtual” state navigation. For example, we can’t have an actor randomly choose between two states using only the `goto` instruction. This is where the `Jump` family of functions comes in, because they allow us to conditionally “jump” to a different state.

The general format for these `Jump` functions is that they have some condition and a destination (a state label or relative offset) to be jumped to whenever the condition is true. We’ll first go over one of the simpler `Jump` functions, [`A_Jump`](https://zdoom.org/wiki/A_Jump).

This function’s condition is RNG based, meaning we can jump to states randomly. We dictate the probability of the jump by providing a “chance” argument in the range of 0 to 256, where 0 means to never jump while 256 means to always jump. Below is an example of this function being used:

```c
actor RandomMaestroAnimator
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_Jump(192, "See")
			goto Missile
		See:
			PLY1 B 0 A_Log("\cvMaestro\c-: Time to run!")
			PLY1 BCDEBCDE 5 
			goto Spawn
		Missile:
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew pew!")
			PLY1 G 4 
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew!")
			PLY1 G 4
			goto Spawn
	}
}
```

At the end of this actor’s `Spawn` state, the `A_Jump` function is used to give a 192 / 256 (75%) chance of playing a walking animation or a 25% chance of continuing onwards to a shooting animation.

Like mentioned earlier and similarly to the `goto` instruction, we can also make use of relative offsets with various `Jump` functions, with `A_Jump` being one of the supporting functions. Below is an actor which uses relative offsets with `A_Jump` to randomly skip part of its animation.

```c
actor AlternateMaestroAnimator
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_Jump(192, 5)
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew pew!")
			PLY1 G 4 
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew!")
			PLY1 G 4
			PLY1 A 10
			goto Spawn
	}
}
```

> 💡 **Note that when using relative offsets with **`Jump`** functions, the line count *****includes***** the line with the **`Jump`** function and *****excludes***** any state control instruction lines. This means that a relative offset of 1 practically skips no lines, but it will skip a state control instruction if immediately below the **`Jump`** function.**

`A_Jump` is also unique because we can provide multiple destinations. It will first randomly decide if it will jump, then it will randomly choose between the destinations with an even distribution. Below is an example of this being used.

```c
actor MultiMaestroAnimator
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_Jump(64, "Missile", "See")
			PLY1 A 10
			goto Spawn
		See:
			PLY1 B 0 A_Log("\cvMaestro\c-: Time to run!")
			PLY1 BCDEBCDE 5 
			goto Spawn+2
		Missile:
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew pew!")
			PLY1 G 4 
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew!")
			PLY1 G 4
			goto Spawn+2
	}
}
```

This actor has a 64 / 256 (25%) chance to break out of its idle, `Spawn` state, in which it will then coinflip between going to either the `Missile` state or the `See` state.

Another fundamental `Jump` function to know is [`A_JumpIf`](https://zdoom.org/wiki/A_JumpIf). This function allows us to use an arbitrary boolean expression as its condition to jump. For example, we can actually reimplement `A_Jump`'s condition using `A_JumpIf` as seen below:

```c
actor JumpIfMaestroAnimator
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_JumpIf(random(1, 256) <= 192, "See")
			goto Missile
		See:
			PLY1 B 0 A_Log("\cvMaestro\c-: Time to run!")
			PLY1 BCDEBCDE 5 
			goto Spawn
		Missile:
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew pew!")
			PLY1 G 4 
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew!")
			PLY1 G 4
			goto Spawn
	}
}
```

We can also create and use boolean expressions which use expression variables, for example, one which checks if the calling actor is on the floor by using the `z` and `floorz` expression variables. Below is an implementation of this:

```c
actor JumpingBass
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	translation "192:192=217:217", "198:198=95:95"
	States
	{
		Spawn:
			BASS A 0
			BASS A 5
			BSB1 B 1 A_ChangeVelocity(0.0, 0.0, random(12, 20), CVF_REPLACE)
		Leaping:
			BSB1 B 1
			BSB1 B 0 A_JumpIf(z != floorz, "Leaping")
			goto Spawn
	}
}
```

[Untitled](../assets/a085548602764534a2d9c649305cfab4-Untitled.mp4)

In this instance, we also could’ve opted to use the [`A_CheckFloor`](https://zdoom.org/wiki/A_CheckFloor) function instead of `A_JumpIf`, but there’s typically no harm in using the more flexible `A_JumpIf` function compared to the other, more focused `Jump` family functions.

> 🚨 **Note that the **`Jump`** family of functions can have strange behavior online, almost behaving as if there’s a delay on when the jump occurs depending on ping. Some of the above actors have intentionally been programmed to showcase this.  
>   
> The example file at the end of this tutorial contains notes about which actors have this issue, but we’ll also return back to examples similar and cover why these “desyncs” occur with some workarounds later in this tutorial!**

## User Variables and Constants

---

In addition to actor properties, we can also define “user variables” within the scope of actors. These variables essentially give us reserved spaces to hold important values for the actor to reference and change. These variables are required to be named in the scheme of `user_[variableName]` to denote them as separate from any other actor properties. Below is an example of the syntax to define one.

```c
var int user_closeRange;
```

User variables can come as both `int` (integer) and `float` (decimal values). We can also create user variables which act as an array (a list) of integers or floats, but we’ll show an example of that being used later. Notably, unlike actor properties, we cannot initialize user variables, meaning we cannot give them an initial value besides 0.

To set the value of user variables, we have to use different DECORATE functions depending on the type of the user variable. For integer user variables, we use the [`A_SetUserVar`](https://zdoom.org/wiki/A_SetUserVar) function. If you’re working with a float user variable, you use [`A_SetUserVarFloat`](https://zdoom.org/wiki/A_SetUserVarFloat). For array user variables, we would use [`A_SetUserArray`](https://zdoom.org/wiki/A_SetUserArray) and [`A_SetUserArrayFloat`](https://zdoom.org/wiki/A_SetUserArrayFloat) respectively. 

Just like actor properties, we can use user variables within expressions. Below is a projectile which moves quick but loses most its damage after 4 tics of travelling.

```c
actor ScalingProjectile
{
	var int user_closeRange;
	
	PROJECTILE
	damagetype "Buster"
	Obituary "%o was poked to death by %k."
	Speed 60
	Damage (5 + user_closeRange)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			BUST A 0
			BUST A 0 A_SetUserVar(user_closeRange, 10)
			BUST A 4
			BUST A 0 A_SetUserVar(user_closeRange, 0)
			BUST A 1
			wait
	}
}
```

[2024-03-17 19-12-58.mp4](../assets/c45e38e1d02b4685aeb670ac392205f7-2024-03-17_19-12-58.mp4)

[2024-03-17 19-13-07.mp4](../assets/2e965c3962a44c31852af8fb1552afc5-2024-03-17_19-13-07.mp4)

However, this actor reveals one of the flaws of being unable to initialize user variables. If a projectile is shot point blank at an enemy, it can actually hit them before it executes even the first line in its `Spawn` state. In this case, that means that our user variable isn’t properly initialized and so the wrong damage is dealt.

[2024-03-17 19-15-27.mp4](../assets/1f5d115980c04ecc9600b92837a1fd8a-2024-03-17_19-15-27.mp4)

Thankfully, this particular instance can be fixed rather easily by recontextualizing the user variable to be a damage decrease rather than a damage increase in the user variable. 

```c
actor BetterScalingProjectile
{	
	var int user_farRange;
	
	PROJECTILE
	damagetype "Buster"
	Obituary "%o was poked to death by %k."
	Speed 60
	Damage (15 - user_farRange)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			BUST A 0
			BUST A 4
			BUST A 0 A_SetUserVar(user_farRange, 10)
			BUST A 1
			wait
	}
}
```

[2024-03-17 19-22-42.mp4](../assets/2d9b57d4fc6d4a56b3ac9723d6720fe2-2024-03-17_19-22-42.mp4)

In addition to being able to use user variables for expressions, Mega Man 8-Bit Deathmatch reserves some user variable names to use them as a means to indicate custom actor flags. A useful example is the `user_damageKill` user variable. 

Combined with the `reactiontime` actor property from earlier, giving a `user_damageKill` user variable to any projectile or damager will automatically set it up to only be able to deal damage a certain number of times before it enters its `Death` state. The value of `reactiontime` determines how many times it can hit before expiring.

One use case of this custom actor flag is to allow us to implement projectiles with a larger damaging radius than their actual radius, while only allowing them to hit enemies once, unlike a standard `+RIPPER` or `A_Explode` reliant projectile. Below is an example of this in action.

```c
actor BigStarCrash
{
	var int user_damageKill;
	reactiontime 1
	
	PROJECTILE
	+RIPPER
	damagetype "StarCrash"
	Obituary "%o saw stars from %k's Star Crash."
	Speed 30
	Damage (0)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			STAR A 0
			STAR AABBCCDD 1 A_Explode(30, 80, 0, 0, 80)
			loop
	}
}
```

While the 30 damage per tic `A_Explode` might look scary at first, combined with `user_damageKill` and a `reactiontime` of 1, this projectile only hits once (assuming the victim actor has the actor flag `+USEDAMAGEEVENTSCRIPT`, which should always be the case for players). Notice in the video below how this projectile hits the enemy with more lenience than terrain.

[2024-03-17 19-32-14.mp4](../assets/92f65ec9fc37405c8ef33222534ceea7-2024-03-17_19-32-14.mp4)

With a similar syntax to user variables, we can also define “constants” in DECORATE. Unlike user variables which are intended to store dynamic values, constants can be initialized and are solely intended to hold static values. 

Constants come in only float and integer variations, with no array variants. Additionally, we can name them however we want, though we typically fully uppercase them. Constants can be a very useful tool for reducing redundancy in our code and making it easier to tweak duplicate expressions. Just note that constants cannot be used to initialize actor properties.

Below is our `BigStarCrash` from above tweaked to use a constant instead of hardcoding 80 for radius and max damage radius. In this instance, we’re using an actor scoped constant, meaning that the constant only exists in the scope of `ConstantBigStarCrash`.

```c
actor ConstantBigStarCrash
{
	const int EXPLOSION_RADIUS = 80;
	
	var int user_damageKill;
	reactiontime 1
	
	PROJECTILE
	+RIPPER
	damagetype "StarCrash"
	Obituary "%o saw stars from %k's Star Crash."
	Speed 30
	Damage (0)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			STAR A 0
			STAR AABBCCDD 1 A_Explode(30, EXPLOSION_RADIUS, 0, 0, EXPLOSION_RADIUS)
			loop
	}
}
```

By using this constant, we can ensure that the radius and max damage radius are always the same value, since we only need to tweak it in one spot if we ever make changes.

We can extend this further by using globally scoped constants. These are constants which are defined outside of actors but as a result can be used within multiple actors.

> 🚨 **When using this form of constant, take care to ensure that your constant is uniquely named, otherwise it might conflict with other globally scoped constants and cause the game to fail to launch!**

```c
const int SHIELD_EXPLOSION_RADIUS = 80;

actor BigLeafShield
{
	var int user_damageKill;
	reactiontime 1
	
	PROJECTILE
	+RIPPER
	damagetype "LeafShield"
	Obituary "%o was brushed by %k's Leaf Shield."
	Speed 27
	Damage (0)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			WOOD A 0
			WOOD AABBCCDD 1 A_Explode(40, SHIELD_EXPLOSION_RADIUS, 0, 0, SHIELD_EXPLOSION_RADIUS)
			loop
	}
}

actor BigPlantBarrier
{
	var int user_damageKill;
	reactiontime 1
	
	PROJECTILE
	+RIPPER
	damagetype "PlantBarrier"
	Obituary "%o was made into a bouquet by %k's Plant Barrier."
	Speed 32
	Damage (0)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			PLAN A 0
			PLAN ABCDEFGHIJKLMNOPQR 1 A_Explode(20, SHIELD_EXPLOSION_RADIUS, 0, 0, SHIELD_EXPLOSION_RADIUS)
			loop
	}
}
```

By using a globally scoped constant, we ensure that these two actors have the same damaging hitbox and can tweak both projectiles by changing the single constant.

## Inheritance

---

With various different types of actors under our belt, we should starting leveraging one of DECORATE’s defining features, inheritance. Inheritance is a shortcut that allows us to create a “child” actor based off of another previously defined “parent” actor. 

When using inheritance, the child actor inherits all of the actor properties and actor states from the parent actor, but also has the option to replace any of them with its own. As an initial example, we can recreate our `SteppedPerfectFreeze` from earlier, except using inheritance instead.

```c
// this actor is just repeated for reference
actor PerfectFreeze
{
	PROJECTILE
	+RIPPER
	
	damagetype "IceSlasher"
	Obituary "%o was frozen by %k's Perfect Freeze."
	
	Speed 40
	Damage (((abs(velx) + abs(vely) + abs(velz)) / 40) * 5 + 3)
	reactiontime 5
	
	radius 5
	height 5
	
	scale 2.5
	renderstyle translucent
	alpha 1.0
	States
	{
		Spawn:
			ICES A 0
			ICES A 0 A_LogInt(((abs(velx) + abs(vely) + abs(velz)) / 40) * 5 + 3)
			ICES AAABBB 1 A_ChangeVelocity(velx * 0.9, vely * 0.9, velz * 0.9, CVF_REPLACE)
			ICES A 0 A_Countdown
			loop
		Death:
			ICES AAABBB 1 A_FadeOut(0.1)
			loop
	}
}

// this actor is the one using inheritance
actor SmallSteppedPerfectFreeze : PerfectFreeze
{
	Damage ((((abs(velx) + abs(vely) + abs(velz)) / 40) > 0.5) * 6 + 3)
	States
	{
		Spawn:
			ICES A 0
			ICES A 0 A_LogInt((((abs(velx) + abs(vely) + abs(velz)) / 40) > 0.5) * 6 + 3)
			ICES AAABBB 1 A_ChangeVelocity(velx * 0.9, vely * 0.9, velz * 0.9, CVF_REPLACE)
			ICES A 0 A_Countdown
			loop
	}
}
```

This `SmallSteppedPerfectFreeze` inherits all of the actor properties and actor states from `PerfectFreeze`, but it overrides the `damage` property and `Spawn` state, meaning it acts just like the `SteppedPerfectFreeze` without all of the duplicated bloat of that actor.

Just like constants, inheritance is a very powerful tool to simplify our code and make sure that actors intended to act similarly share the same base properties, flags, and states. To help out modders, Mega Man 8-Bit Deathmatch implements a set of “basic” actors which should be used as inheritance fodder, so we’ll cover a few of them below.

If you need a basic, solid map prop, then MM8BDM’s [BasicMapProp](../decorate-actor-reference-2fdd3e69/basicmapprop-9cbe0dea.md) is a good actor to inherit from. Similar to the demonstration actors we’ve been creating previously, inheriting from [BasicMapProp](../decorate-actor-reference-2fdd3e69/basicmapprop-9cbe0dea.md) creates an actor which has `+SOLID`, 2.5 `scale`, a `radius` of 16, and a `height` of 32. Below is our `RandomMaestroAnimator` actor except recreated using inheritance.

```c
actor InheritedMaestroAnimator : BasicMapProp
{
	height 56
	radius 16
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_Jump(192, "See")
			goto Missile
		See:
			PLY1 B 0 A_Log("\cvMaestro\c-: Time to run!")
			PLY1 BCDEBCDE 5 
			goto Spawn
		Missile:
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew pew!")
			PLY1 G 4 
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew!")
			PLY1 G 4
			goto Spawn
	}
}
```

By inheriting from [BasicMapProp](../decorate-actor-reference-2fdd3e69/basicmapprop-9cbe0dea.md), we were able to save some effort, only needing to override a few actor properties and then add the states for the actor. Inheriting from MM8BDM’s basic actor is also preferable for enabling the extra, common behaviors that’s expected for certain actors without having to put too much thought into it. 

Most notably, in team modes such as Capture the Flag, MM8BDM has colorizes players and projectiles based on their team. We can have our projectiles respect this by inheriting from [BasicProjectile](../decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md) (or other similar actors). For more technical details about the team color system in MM8BDM, see [here](../interacting-with-systems-c99b6cab/team-colors-679c2e93.md). Below is an example of inheriting from [BasicProjectile](../decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md).

```c
actor ProperExplodingHardKnuckle : BasicProjectile
{
	damagetype "HardKnuckle"
	Obituary "%o went boom from %k's Hard Knuckle."
	translation "210:215=172:172", "199:199=42:42"
	Speed 38
	Damage (75)
	radius 12
	height 10
	States
	{
		Spawn:
			HARD A 0
			HARD A 1
			wait
		Death:
			TNT1 A 0 A_PlaySoundEx("weapons/mm5/napalmbombexplode", "Weapon")
			TNT1 A 0 A_Explode(50, 96, 0, 0, 32)
			TNT1 A 0 A_SpawnItemEX("ExplosionEffect2", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			stop
		XDeath:
		Crash:
			TNT1 A 0 A_SpawnItemEX("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			stop
	}
}
```

[2024-03-17 21-43-41.mp4](../assets/199d9dff24084e91aeeddd1ef30e09f0-2024-03-17_21-43-41.mp4)

> 🚨 **Be wary that **[BasicProjectile](../decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md)**, and other similar actors, have a default **`damage`** of 5000 and a dummy **`obituary`**. This is to help modders be more cognizant about overriding relevant actor properties and states, so make sure to keep this in mind!**

Similarly, MM8BDM also implements [BasicFastProjectile](../decorate-actor-reference-2fdd3e69/basicfastprojectile-46b99912.md) actor to inherit from. This inheritance target should be preferred whenever creating projectiles with more than 60 `speed`. Failure to use this actor can cause collision issues where the projectile skips through enemies rather than hitting them. Below is our `BetterScalingProjectile` tweaked to have a higher speed and to inherit from [BasicFastProjectile](../decorate-actor-reference-2fdd3e69/basicfastprojectile-46b99912.md).

```c
actor FastScalingProjectile : BasicFastProjectile
{	
	var int user_farRange;
	
	damagetype "Buster"
	Obituary "%o was poked to death by %k."
	Speed 80
	Damage (15 - user_farRange)
	radius 5
	height 5
	States
	{
		Spawn:
			BUST A 0
			BUST A 3
			BUST A 0 A_SetUserVar(user_farRange, 10)
			BUST A 1
			wait
	}
}
```

> 🚨 **Actors which inherit from **`FastProjectile`** (or MM8BDM’s **[BasicFastProjectile](../decorate-actor-reference-2fdd3e69/basicfastprojectile-46b99912.md)**) cannot be reflected or make use of bounce actor flags.   
>   
> If those are a requirement alongside more than 60 **`speed`**, you’ll have to opt for not inheriting from either of those two actors and to suffer the collision issues.**

To encourage standardization of bouncing projectiles, MM8BDM implements a [BasicBouncer](../decorate-actor-reference-2fdd3e69/basicbouncer-b8de71dd.md) actor. This actor has all the properties of [BasicProjectile](../decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md) but also enables the bounce actor flags to make the projectile bounce on floors, walls, and ceilings. Below is a simple, bouncing crystal ball which inherits from this actor. Note the use of the different bounce related actor properties to tweak the bouncing behavior.

```c
actor FallingCrystalBit : BasicBouncer
{
	-NOGRAVITY
	+FORCEXYBILLBOARD
	+BRIGHT
	
	bouncesound "weapons/mm5/crystaleyebounce"
	bouncefactor 1.0
	wallbouncefactor 1.0
	bouncecount 3
	
	damagetype "CrystalEye"
	Obituary "%o did not see %k's Crystal Bit."
	Speed 28
	Damage (13)
	radius 4
	height 4
	States
	{	
		Spawn:
			CRYE F 0
			CRYE F 4 // skipping FX spawn on first frame helps vision
		SpawnLoop:
			CRYE GHIJFFF 4 A_SpawnItemEx("FallingCrystalBitFX", 16, 0, random(-16, 16), 0, 0, 0, random(0, 359), SXF_TRANSFERTRANSLATION)
			loop
		Death:
			TNT1 A 0 A_SpawnItemEx("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			stop
	}
}
```

[2024-03-17 22-15-58.mp4](../assets/b6d786ca683048ec9117d704efa868fa-2024-03-17_22-15-58.mp4)

The `FallingCrystalBitFX` actor referenced above leads us to our next common inheritance target, [BasicGraphicEffect](../decorate-actor-reference-2fdd3e69/basicgraphiceffect-95b89f4a.md). This actor is perfect to inherit from for actors intended to be non-interactive visual flair. Below is the definition of `FallingCrystalBitFX`.

```c
actor FallingCrystalBitFX : BasicGraphicEffect
{
	+BRIGHT
	States
	{
		SpawnFrame:
			FLAS ABC 4
			stop
	}
}
```

> 🚨 **Unlike most other actors, whenever inheriting from **[BasicGraphicEffect](../decorate-actor-reference-2fdd3e69/basicgraphiceffect-95b89f4a.md)**, you should use a **`SpawnFrame`** state instead of the **`Spawn`** state. Failure to do so can break team color related functionality for your actor!**

Before closing out this section, we’re gonna cover some common tripping hazards regarding inheritance and overriding actor states or actor scoped constants, since the behavior is not always as intuitive as you might think.

Earlier we made the distinction between “static” state navigation, `goto` statements, and “virtual” state navigation, the `Jump` family of functions. This is because these two types of state navigation behave differently when inheritance is in the play. We can reveal this difference by inheriting from the `InheritedMaestroAnimator` we created just earlier. Once we spawn this actor in and observe it, you should notice some weird behavior.

```c
// inherited spawn state here for reference
/*
Spawn:
	TNT1 A 0
	TNT1 A 0 A_Jump(192, "See")
	goto Missile
*/

actor MegamanAnimator : InheritedMaestroAnimator
{
	States
	{
		See:
			MEGM B 0 A_Log("\chMegaman\c-: Time to run!")
			MEGM BCDEBCDE 5 
			goto Spawn
		Missile:
			MEGM F 5 A_Log("\chMegaman\c-: Pew pew!")
			MEGM G 4 
			MEGM F 5 A_Log("\chMegaman\c-: Pew!")
			MEGM G 4
			goto Spawn
	}
}
```

[2024-03-17 22-25-49.mp4](../assets/366e50a2e44347d5b4dff14cc13b52ba-2024-03-17_22-25-49.mp4)

It appears that overriding the `See` state works but overriding the `Missile` state does not, because it’s reverting back to the `Missile` state in `InheritedMaestroAnimator` instead. This is because of the static `goto` statement being used in the parent actor to go to the `Missile` state. 

Static state navigation won’t navigate to states that exist in the child actor if the state calling it is within the parent actor. Instead, it will go to the parent actor’s version of that state. This is in contrast to virtual state navigation which will always go to the child version of the state. That’s why the `A_Jump` to the `See` state works fine in our case. One way to rectify this issue is to use the two modified actors below.

```c
actor FixedMaestroAnimator : BasicMapProp
{
	height 56
	radius 16
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_Jump(192, "See")
			TNT1 A 1 A_JumpIf(true, "Missile")
			wait
		See:
			PLY1 B 0 A_Log("\cvMaestro\c-: Time to run!")
			PLY1 BCDEBCDE 5 
			goto Spawn
		Missile:
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew pew!")
			PLY1 G 4 
			PLY1 F 5 A_Log("\cvMaestro\c-: Pew!")
			PLY1 G 4
			goto Spawn
	}
}

actor FixedMegamanAnimator : FixedMaestroAnimator
{
	States
	{
		See:
			MEGM B 0 A_Log("\chMegaman\c-: Time to run!")
			MEGM BCDEBCDE 5 
			goto Spawn
		Missile:
			MEGM F 5 A_Log("\chMegaman\c-: Pew pew!")
			MEGM G 4 
			MEGM F 5 A_Log("\chMegaman\c-: Pew!")
			MEGM G 4
			goto Spawn
	}
}
```

This makes it so both forms of state navigation in the parent actor’s `Spawn` state are virtual, meaning that both of them will adhere to the overridden states in the child actor, as seen in the video below.

[2024-03-17 22-32-32.mp4](../assets/8ac1788d2f9244938495c5eaf4c1f4f0-2024-03-17_22-32-32.mp4)

Additionally, actor scoped constants have a bit of unintuitive behavior as well. You might think that overriding one in a child actor would make any uses of that constant within the parent actor adhere to the new value, but unfortunately, that’s not the case. Consider the actors below:

```c
// this actor is repeated for reference
actor ConstantBigStarCrash
{
	const int EXPLOSION_RADIUS = 80;
	
	var int user_damageKill;
	reactiontime 1
	
	PROJECTILE
	+RIPPER
	damagetype "StarCrash"
	Obituary "%o saw stars from %k's Star Crash."
	Speed 30
	Damage (0)
	radius 5
	height 5
	scale 2.5
	States
	{
		Spawn:
			STAR A 0
			STAR AABBCCDD 1 A_Explode(30, EXPLOSION_RADIUS, 0, 0, EXPLOSION_RADIUS)
			loop
	}
}

// this actor is the delinquent
actor BrokenSmallStarCrash : ConstantBigStarCrash
{
	const int EXPLOSION_RADIUS = 12;
}
```

[2024-03-17 22-36-28.mp4](../assets/8c737b2e81134ebeb3847318f9537601-2024-03-17_22-36-28.mp4)

As you can see in the video, this “small” Star Crash has far more radius than the 12 that the new constant would have you believe. For an overridden constant to take effect, you also need to override any states which use that constant. Below is a proper example of this.

```c
actor FixedSmallStarCrash : ConstantBigStarCrash
{
	const int EXPLOSION_RADIUS = 12;
	
	States
	{
		Spawn:
			STAR E 0
			STAR EEFFGGHH 1 A_Explode(30, EXPLOSION_RADIUS, 0, 0, EXPLOSION_RADIUS)
			loop
	}
}
```

[2024-03-17 22-40-21.mp4](../assets/48669bfa99c3482aa866f49eea57472d-2024-03-17_22-40-21.mp4)

We’ll learn about “actor arguments” later which can be a better way to implement this behavior while respecting inheritance overrides without requiring the additional actor state override.

## Inventory

---

With some understanding of inheritance, we can also begin to leverage inventory. Every actor has an “inventory,” or in other words, a set of currently held items, ammo, flags, weapons, powerups, etc. Inventory actors refers to the types of actors that can be picked up and held by other actors. We’ll discuss weapons in much further detail in a future tutorial, but we’ll introduce some of the different types of inventory actors in this section.

We can create our first inventory actor by inheriting from [`Inventory`](https://zdoom.org/wiki/Classes:Inventory).

```c
actor BrandNewInventoryFlag : Inventory
{
	inventory.amount 1
	inventory.maxamount 35
}
```

Whenever inheriting from `Inventory`, we gain the ability to specify additional actor properties specific to inventory actors. In this instance, we’re specifying how much of this actor to obtain when unspecified and the max amount of this actor we can hold in our inventory total. 

We can confirm these two actor properties by using the [`give`](https://zdoom.org/wiki/CCMDs:Debug#:~:text=work%20in%20multiplayer.-,give,-%3Citem%3E) command in the console then checking our inventory using the [`printinv`](https://zdoom.org/wiki/CCMDs:Debug#:~:text=Tome%20of%20Power.-,printinv,-Lists%20your%20current) command.

<!-- image omitted (assets not vendored) -->

We can go a bit further and create an ammo actor as well. Ammo actors are more or less functionally equivalent to inventory actors, they just have a bit of extra functionality attached. We create one by inheriting from [`Ammo`](https://zdoom.org/wiki/Classes:Ammo) instead.

```c
actor BrandNewAmmoType : Ammo
{
	inventory.amount 1
	inventory.maxamount 28
	+INVENTORY.IGNORESKILL
}
```

Ammo actors are primarily useful for weapons, because for their `ammotype` actor property, they require actors which inherit from `Ammo`, so we’ll see use cases of these types of actors later down the line. By default, actors which inherit from `Ammo` have a doubled inventory gain when the game’s difficulty is either easy mode or the hardest difficulty, so we always give these actors `+INVENTORY.IGNORESKILL` to prevent this unwieldly behavior.

Although it’s typically not very useful for `Inventory` and `Ammo` specifically, we can make these actors able to be present on the map just like any other actor by specifying a `Spawn` state. These actors will be able to be picked up whenever a player walks over them. By specifying a few extra actor properties, we can also customize the pickup message and sound.

```c
actor SpawnableInventoryFlag : Inventory
{
	inventory.amount 1
	inventory.maxamount 35
	
	inventory.pickupmessage "You got a scoreball!"
	inventory.pickupsound "ctf/itempickup"
	
	translation "210:215=110:110"
	scale 2.0
	States
	{
		Spawn:
			HBAL A 0
			HBAL A 1
			wait
	}
}

actor SpawnableAmmoType : Ammo
{
	inventory.amount 1
	inventory.maxamount 28
	+INVENTORY.IGNORESKILL
	
	inventory.pickupmessage "You got an ammo scoreball!"
	inventory.pickupsound "ctf/itempickup"
	
	translation "210:215=41:41"
	scale 2.0
	States
	{
		Spawn:
			HBAL A 0
			HBAL A 1
			wait
	}
}
```

[2024-03-19 21-33-10.mp4](../assets/6fe6cc883e5c4562b6e179b8f2d6e857-2024-03-19_21-33-10.mp4)

For another fundamental type of inventory, we can also create “powerup” actors, though their name is a bit of a misnomer. Powerup actors actually refer to a type of inventory that has a max amount of one, but will automatically leave an actor’s inventory after a specified duration. Below is an example of a powerup created by inheriting from [`PowerUp`](https://zdoom.org/wiki/Classes:Powerup).

```c
actor NothingPowerup : PowerUp
{
	powerup.duration 350
}
```

While `inventory.amount` and `inventory.maxamount` are no longer relevant, we now use the `powerup.duration` actor property to determine how many tics the actor should stay in another actor’s inventory. This particular powerup exists in another actor’s inventory for 350 tics or 10 seconds. We can instead explicitly specify the duration in seconds by putting a minus in front of the duration.

```c
actor NothingPowerupSeconds : PowerUp
{
	powerup.duration -10
}
```

As the name implies though, this powerup doesn’t actually do anything, and we probably want these powerups to do something while held. We can accomplish that by inheriting from different types of powerup actors. For example, by inheriting from `PowerSpeed`, we can create a powerup which modifies the speed of the player holding it.

```c
actor GoFastFor5Seconds : PowerSpeed
{
	powerup.strength 2.0
	powerup.duration -5
	+INVENTORY.ALWAYSPICKUP
}
```

The `powerup.strength` actor property determines how much the player is sped up by. In this case, the player receives 2.0x speed whenever holding this powerup. The `+INVENTORY.ALWAYSPICKUP` actor flag allows the player to receive this powerup while they already have it to refresh the timer on the powerup. Generally we’ll always want this flag on powerups for that refreshing behavior.

[2024-03-18 22-58-17.mp4](../assets/a0cecd82bfb5493aa2ce9662252af248-2024-03-18_22-58-17.mp4)

We can similarly create damage and defense buffs by inheriting from [`PowerDamage`](https://zdoom.org/wiki/Classes:PowerDamage) and [`PowerProtection`](https://zdoom.org/wiki/Classes:PowerProtection).

```c
actor BuffedHardKnuckle : PowerDamage
{
	damagefactor "HardKnuckle", 2.0
	powerup.duration 0x7FFFFFFD
}

actor NoDamageFromBuster : PowerProtection
{
	damagefactor "Buster", 0.0
	powerup.duration 0x7FFFFFFD
}
```

A `powerup.duration` of `0x7FFFFFFD` is effectively infinite. The first powerup doubles the actor’s damage for Hard Knuckle while the second powerup makes the actor immune to the Mega Buster and similar weapons.

These types of powerups give you the option to define specific `damagetypes` that the player should receive a damage (de)buff or resistance / weakness to using the `damagefactor` actor property. If you want to instead specify all `damagetypes`, you can omit the damage type and simply put the multiplier.

Unlike `Inventory` and `Ammo`, we cannot make use of a `Spawn` state for `PowerUp` actors (and `PowerUp` derived actors such as `PowerSpeed`). This brings us to our last fundamental inventory actor, [`CustomInventory`](https://zdoom.org/wiki/Classes:CustomInventory).

`CustomInventory` is a customizable inventory actor where we can customize its pickup handling and inventory status. Unlike our earlier spawnable inventory actors, actors derived from this actor typically act more like a vehicle for giving items and performing actions rather than an actor held in the inventory themselves. 

`CustomInventory` inheriting actors can make use of a `Pickup` state which is entered whenever a player attempts to pick up the actor. This state has special behavior which extends into any other jumped to states in the process of evaluating the pickup attempt.

Perhaps against intuition, the `Pickup` state’s “activator” is actually the player that is attempting to pick up the actor. In other words, any functions called within the state will be called as if the player actor attempting to pick the actor up is calling them. 

Additionally, once the `Pickup` state is entered, the sprite frame and line duration of all subsequent lines are entirely ignored by the engine. In practice, this means that the entire pickup attempt is evaluated in 0 tics with no delay. The two setups below are functionally identical in a `CustomInventory` inheriting actor.

```c
Pickup:
	PLY1 AAA 5 A_PlaySoundEx("weapons/mm1/timeslowfire", "Voice")
Explosion:
	PLY1 A 3 A_SpawnItemEX("ExplosionEffect2", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
	PLY1 A 0 A_SpawnItemEX("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
	stop
===
Pickup:
	TNT1 AAA 0 A_PlaySoundEx("weapons/mm1/timeslowfire", "Voice")
Explosion:
	TNT1 A 0 A_SpawnItemEX("ExplosionEffect2", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
	TNT1 A 0 A_SpawnItemEX("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
	stop
```

The outcome of a `Pickup` state is dependent on the last function and last state control instruction used within it. 

We can use a new state control instruction, `fail`, to instantly stop the pickup attempt and mark it as unsuccessful. Any functions used in the `Pickup` state will still occur, but the pickup won’t remove itself, as it was not successfully picked up. 

```c
// you can't unplay the sound...
// but the inventory actor won't vanish
Pickup:
	TNT1 A 0 A_PlaySoundEx("weapons/mm1/timeslowfire", "Voice")
	fail
```

Alternatively, we can use the `stop` state control instruction to mark the pickup attempt as successful to remove the actor. However, there is a caveat. Not only does the last state control instruction have to be `stop`, but the function called prior to the `stop` must have returned a “truthy” value. Internally, every function can either be successful in its execution or unsuccessful. If the last called function was unsuccessful, then the `stop` state control instruction is identical to a `fail` one.

```c
// this state only succeeds if the jump succeeds
// despite the relative offset going nowhere
// Jump functions are only "truthy" if their jump succeeds
Pickup:
	TNT1 A 0 A_JumpIf(floorz == z, 1)
	stop
```

With all of that in mind, we can create our first `CustomInventory` actor by creating a simple pickup actor for our `GoFastFor5Seconds` powerup actor. For now we’ll disregard the properties related to inventory count, but otherwise it’ll look similar to our spawnable actors for `Inventory` and `Ammo`.

```c
actor SpeedPickup : CustomInventory
{	
	inventory.pickupmessage "Time to speed it up!"
	inventory.pickupsound "ctf/itempickup"
	
	scale 2.0
	States
	{	
		Spawn:
			SLOT X 0
			SLOT X 1
			wait
			
		Pickup:
			TNT1 A 0 A_GiveInventory("GoFastFor5Seconds", 1)
			stop
	}
}
```

In this actor’s `Pickup` state, we’re using the [`A_GiveInventory`](https://zdoom.org/wiki/A_GiveInventory) function to give the powerup to the player whenever they pick up this `CustomInventory` actor. `A_GiveInventory` has a “truthy” return value whenever the inventory actor is successfully given. 

Because our `GoFastFor5Seconds` actor has `+INVENTORY.ALWAYSPICKUP`, the inventory actor will always be successfully given. If that were removed (or we were using a basic `Inventory` actor with a max amount), then the `A_GiveInventory` call could fail, resulting in a failed pickup attempt. 

We can manually implement this logic using a new `Jump` function, [`A_JumpIfInventory`](./decorate-the-world-57ad7756.md). This function checks the calling actor’s inventory for a minimum amount of an inventory actor and will jump if that threshold is met.

```c
actor TunedSpeedPickup : SpeedPickup
{
	States
	{
		Pickup:
			TNT1 A 0 A_JumpIfInventory("GoFastFor5Seconds", 1, "NoPickup")
			TNT1 A 0 A_GiveInventory("GoFastFor5Seconds", 1)
			stop
		NoPickup:
			TNT1 A 0
			fail
	}
}
```

This implementation makes the behavior more explicit and allows us to keep `+INVENTORY.ALWAYSPICKUP` on our `GoFastFor5Seconds` powerup actor.

[2024-03-24 20-54-32.mp4](../assets/00066bb7b915467e9d97046a35dc5697-2024-03-24_20-54-32.mp4)

More similarly to our `Inventory` and `Ammo` actors from earlier, we can also make held `CustomInventory` actors. We do this by adding a `Use` state and some additional actor properties. 

The `Use` state is another special `CustomInventory` state with similar rules to the `Pickup` state. This state is entered whenever the player holding the actor “uses” the inventory item, either via console command or their item use button. The only difference in the `Use` state’s rules is that `stop` indicates that the item use always succeeds, resulting in it leaving their inventory, while `fail` causes the item use to always fail, staying in their inventory.

We typically give the `+INVENTORY.INVBAR` actor flag and `inventory.icon` actor property to held `CustomInventory` actors. These two flags combined cause the item to show up in the player’s assist item slot. The `tag` actor property is shown whenever the user is swapping between their held items. Technically, these actor properties are not required for a holdable `CustomInventory` actor, but forgoing them creates an actor that can only be activated via console command, which is almost always undesirable.

Below is an example that turns our `TunedSpeedPickup` into something closer to an assist item which can be activated at any time. Note the use of [`A_RailWait`](https://zdoom.org/wiki/A_RailWait), a dummy function that always successfully does nothing, forcing the `Pickup` state to succeed.

```c
actor HeldSpeedPickup : CustomInventory
{	
	inventory.amount 1
	inventory.maxamount 1
	
	inventory.pickupmessage "Time to speed it up!"
	inventory.pickupsound "ctf/itempickup"
	
	+INVENTORY.INVBAR
	inventory.icon "TIMMI2"
	tag "Speed Boost"
	
	scale 2.0
	States
	{	
		Spawn:
			SLOT X 0
			SLOT X 1
			wait
			
		Pickup:
			TNT1 A 0 A_JumpIfInventory("GoFastFor5Seconds", 1, "NoPickup")
			TNT1 A 0 A_RailWait
			stop
		NoPickup:
			TNT1 A 0
			fail
			
		Use:
			TNT1 A 0 A_PlaySoundEx("weapons/mm1/timeslowfire", "Voice")
			TNT1 A 0 A_GiveInventory("GoFastFor5Seconds", 1)
			stop
	}
}
```

> 🚨 **The **`inventory.maxamount`** actor property is validated **<u>**after**</u>** the **`Pickup`** state is fully processed. Be careful putting actions in the **`Pickup`** state which generate sound or visuals if the player is not guaranteed to be able to hold the pickup afterwards.**

A useful quirk of `CustomInventory` actors is that their `Pickup` state is executed whenever the actor is given to another actor by `A_GiveInventory` or the `give` console command. This quirk is fundamental for one of the primary uses of this inventory type. 

By creating a `CustomInventory` actor with no `Spawn` state and no `Use` state, we can give that actor to another actor to execute code separately from its own states, almost acting as an “anonymous function.” Consider the example below:

```c
actor JumpForward : CustomInventory
{
	States
	{	
		Pickup:
			TNT1 A 0 A_JumpIf(pitch < 270 || pitch > 345, "ForcedPitch")
			TNT1 A 0 A_ChangeVelocity(30 * cos(pitch), 0, 30 * -sin(pitch), CVF_RELATIVE|CVF_REPLACE)
			stop
		ForcedPitch:
			TNT1 A 0 A_ChangeVelocity(30 * cos(345), 0, 30 * -sin(345), CVF_RELATIVE|CVF_REPLACE)
			stop
	}
}
```

> 💡 **The **`|`** symbol used in the code above indicates the combination of different flags. In this case, combining the **`CVF_RELATIVE`** and **`CVF_REPLACE`** flags when calling **`A_ChangeVelocity`**.**

With some use of trigonometry and the design paradigm described above, we’ve created an inventory actor which will cause any actor to jump forward automatically when they receive it. 

[2024-03-24 21-17-37.mp4](../assets/95e1978a51c2400789106584be2786d1-2024-03-24_21-17-37.mp4)

We can extend this further by combining it with a dummy `PowerUp` actor to create a cooldown for the leap. Below is an implementation of this idea.

```c
actor JumpForwardCooldown : PowerUp
{
	powerup.duration -3
}

actor JumpForwardWithCooldown : JumpForward
{
	States
	{	
		Pickup:
			TNT1 A 0 A_JumpIfInventory("JumpForwardCooldown", 1, "No")
			TNT1 A 0 A_GiveInventory("JumpForwardCooldown", 1)
			goto Super::Pickup
		No:
			TNT1 A 0
			stop
	}
}
```

> 💡 **The **`Super::`** syntax seen in the above actor is a neat trick to be able to navigate to any state of the parent actor. In this instance, that **`goto`** statement is making the actor go to the **`Pickup`** state of **`JumpForward`**. You can also manually specify the parent actor in the inheritance chain that you’re interested in navigating to, ex: **`JumpForward::Pickup`**.**

Good use of all of these different inventory types is essential for being able to make complex weapons and classes later down the line, so be sure to familiarize yourself with them!

## Actor Pointers

---

It’s often useful for actors to be able to “communicate” with each other, for example, a projectile communicating its status to the shooter. To accomplish this, we use “[actor pointers](https://zdoom.org/wiki/Actor_pointer).” For any given actor, its actor pointers serve as references to other related actors. In other words, an actor’s actor pointers can be also described as its relationships. There’s three main actor pointers we typically talk about, `AAPTR_TARGET`, `AAPTR_TRACER`, and `AAPTR_MASTER`.

The “target” actor pointer, `AAPTR_TARGET`, has two meanings. For monsters, it is the actor that the monster is currently angry at. However for actors with the `+MISSILE` actor flag, which is much more common in our use cases, `AAPTR_TARGET` refers to the originator of the actor, also known as the shooter.

The “tracer” actor pointer, `AAPTR_TRACER`, only comes into play with seeking projectiles. This is the actor that the projectile is currently seeking.

The “master” actor pointer, `AAPTR_MASTER` is unused by default for both monsters and projectiles, but it can act as a free slot to put our own meaning / actor into.

<!-- image omitted (assets not vendored) -->

Many DECORATE functions are designed to accept an additional “pointer” argument which will swap the actor which the function is called on. Notably, `A_GiveInventory` accepts that additional argument. We can use this to implement a projectile which gives an inventory actor to its shooter.

```c
actor OneShotMegaShot : BasicProjectile
{
	damagetype "Buster"
	Obituary "%o was bombed by %k's Mega Buster."

	Speed 35
	Damage (10)
	radius 10
	height 5
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1 A_GiveInventory("OneShotMegaShotCooldown", 1, AAPTR_TARGET)
			BUST A 1 A_GiveInventory("OneShotMegaShotCooldown", 1, AAPTR_TARGET)
			wait
	}
}

actor OneShotMegaShotCooldown : Powerup
{
	powerup.duration 3
}
```

By combining this with a `CustomInventory` actor to shoot this projectile using the [`A_FireCustomMissile`](https://zdoom.org/wiki/A_FireCustomMissile) function, we can create a singleton projectile.

```c
actor FireOneShot : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 A_JumpIfInventory("OneShotMegaShotCooldown", 1, "NoFire")
			TNT1 A 0 A_FireCustomMissile("OneShotMegaShot", 0, 0, 8, 0)
		NoFire:
			TNT1 A 0
			stop
	}
}	
```

[2024-03-24 21-43-03.mp4](../assets/c03d695e85fb492e9fb510c515e4a2c5-2024-03-24_21-43-03.mp4)

This functionality is the basis of MM8BDM’s [BasicWatcher](../decorate-actor-reference-2fdd3e69/basicwatcher-6391f072.md) actor that can be inherited from. It is a completely non-interactive `+MISSILE` actor, so it can be spawned by an actor to execute code separately from its own states. This might sound familiar to `CustomInventory` actors, and it truly is, but we primarily use this for prolonged effects.

The actor below implements an invincibility effect that can be spawned to give the spawner invincibility for 5 seconds alongside sparkles indicating such. It makes use of `A_GiveInventory` and `A_JumpIfInventory` with the additional actor pointer parameter supplied. It also uses [`A_Warp`](https://zdoom.org/wiki/A_Warp), an incredibly powerful function that allows us to move an actor relative to one of its actor pointers.

```c
actor InvincibilityEffectWatcher : BasicWatcher
{
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_JumpIfInventory("InvincibilityEffect", 1, "Refresh", AAPTR_TARGET)
			TNT1 A 0 A_GiveInventory("InvincibilityEffect", 1, AAPTR_TARGET)
		SpawnLoop:
			TNT1 AAAA 0 A_SpawnItemEx("TimeStopGFX", random(8, 64), 0, random(0, 64), 0, 0, 0, random(0, 359))
			TNT1 A 1 A_Warp(AAPTR_TARGET, 0, 0, 0, 0, WARPF_NOCHECKPOSITION)
			TNT1 A 90 A_JumpIfInventory("InvincibilityEffect", 1, "SpawnLoop", AAPTR_TARGET)
			stop
		Refresh:
			TNT1 A 0 A_GiveInventory("InvincibilityEffect", 1, AAPTR_TARGET)
			stop
	}
}

actor InvincibilityEffect : PowerProtection
{
	damagefactor "Normal", 0.0
	powerup.duration -5
}
```

[2024-03-24 21-50-37.mp4](../assets/55be6d15981c4950a4fa6f72b5542404-2024-03-24_21-50-37.mp4)

Like mentioned earlier, we can create seeking missiles that leverage the `AAPTR_TRACER` actor pointer. This is done by creating a projectile with the `+SEEKERMISSILE` actor flag. This enables the use of the [`A_SeekerMissile`](https://zdoom.org/wiki/A_SeekerMissile) function. We typically also use `+SCREENSEEKER` alongside these two so that the homing missile only homes into people the shooter can see.

By using the `A_SeekerMissile` function alongside using the [`IsPointerEqual`](https://zdoom.org/wiki/IsPointerEqual) function within a `Jump` condition, we can create an Emperor shot which speeds up once it’s on someone’s tail.

```c
actor EmperorBullet : BasicProjectile
{
	+SEEKERMISSILE
	+SCREENSEEKER
	+FORCEXYBILLBOARD
	+BRIGHT
	
	damagetype "EmperorBullet"
	Obituary "%o was retired by %k's Emperor."
	translation "197:197=39:39", "210:215=39:39", "194:194=39:39", "192:192=4:4"
	
	speed 30
	damage (18)
	Radius 8
	Height 5
	States
	{
		Spawn:
			GEMI A 0
			
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.0*velx, -0.0*vely, -0.0*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.2*velx, -0.2*vely, -0.2*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.4*velx, -0.4*vely, -0.4*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.6*velx, -0.6*vely, -0.6*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.8*velx, -0.8*vely, -0.8*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SeekerMissile (2, 10, SMF_LOOK|SMF_PRECISE|SMF_CURSPEED, 256, 2)
			
			GEMI A 1 A_JumpIf(!IsPointerEqual(AAPTR_TRACER, AAPTR_NULL), "RampUp")
			loop
		RampUp:
			GEMI A 0 A_ScaleVelocity(2.0)
			GEMI A 0 A_SpawnItemEx("EmperorBulletFX", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.0*velx, -0.0*vely, -0.0*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.1*velx, -0.1*vely, -0.1*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.2*velx, -0.2*vely, -0.2*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.3*velx, -0.3*vely, -0.3*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.4*velx, -0.4*vely, -0.4*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 1 A_SeekerMissile (2, 10, SMF_PRECISE|SMF_CURSPEED)
		RampedUpLoop:
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.0*velx, -0.0*vely, -0.0*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.1*velx, -0.1*vely, -0.1*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.2*velx, -0.2*vely, -0.2*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.3*velx, -0.3*vely, -0.3*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.4*velx, -0.4*vely, -0.4*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.5*velx, -0.5*vely, -0.5*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.6*velx, -0.6*vely, -0.6*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.7*velx, -0.7*vely, -0.7*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.8*velx, -0.8*vely, -0.8*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.9*velx, -0.9*vely, -0.9*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 1 A_SeekerMissile (2, 10, SMF_PRECISE|SMF_CURSPEED)
			
			GEMI A 0 A_SpawnItemEx("EmperorBulletFX", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.0*velx, -0.0*vely, -0.0*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.1*velx, -0.1*vely, -0.1*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.2*velx, -0.2*vely, -0.2*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.3*velx, -0.3*vely, -0.3*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.4*velx, -0.4*vely, -0.4*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.5*velx, -0.5*vely, -0.5*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.6*velx, -0.6*vely, -0.6*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.7*velx, -0.7*vely, -0.7*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.8*velx, -0.8*vely, -0.8*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 0 A_SpawnItemEx("EmperorTrail", -0.9*velx, -0.9*vely, -0.9*velz, 0, 0, 0, 0, SXF_ABSOLUTEPOSITION|SXF_TRANSFERTRANSLATION)
			GEMI A 1 A_SeekerMissile (2, 10, SMF_PRECISE|SMF_CURSPEED)
			loop
		Death:
			TNT1 A 0 A_SpawnItemEx("ExplosionEffect1", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
		XDeath:
		Crash:
			TNT1 A 0
			stop
	}
}

actor EmperorTrail : BasicGraphicEffect
{
	+FORCEXYBILLBOARD
	+BRIGHT
	speed 60
	States
	{
		SpawnFrame:
			GEMI A 5
			stop
	}
}

actor EmperorBulletFX : BasicGraphicEffect
{
	+BRIGHT
	scale 1.5
	States
	{
		SpawnFrame:
			GIGF HH 1 A_SetScale(scalex * 1.05, scaley * 1.05)
		DeathLoop:
			GIGF H 0 A_FadeOut(0.1)
			GIGF H 1 A_SetScale(scalex * 1.05, scaley * 1.05)
			loop
	}
}
```

[2024-03-24 22-09-55.mp4](../assets/93c8ba5776b842ba90a1f5e9241ee4ed-2024-03-24_22-09-55.mp4)

Actor pointers become incredibly relevant when creating custom hazards and when using ACS scripts and writing more complex ACS. We’ll see a few more examples of interacting with actor pointers in the next section.

## Executing ACS Scripts

---

With a fair bit of functions in our tool kit now, it’s a good time to talk about ACS scripts. ACS scripts allow us to extend that tool kit even further by essentially allowing us to write custom DECORATE functions. To be a bit more exact, we can make use of the [`ACS_NamedExecuteWithResult`](https://zdoom.org/wiki/ACS_NamedExecuteWithResult) function to “execute” any ACS scripts that have already been programmed using ACS.

We’ll talk about how to create our own ACS scripts in the next tutorial, so for now we’re just going to discuss how we can execute some of the existing ones provided in Mega Man 8-Bit Deathmatch. You can see a full list of those existing ACS scripts [here](../acs-script-reference-cf6aec3f/README.md).

We can start off simple by creating a version of MM8BDM’s turtle prop which can be ridden by players using the [core_stickyLifts](../acs-script-reference-cf6aec3f/corestickylifts-94bfbdc6.md) ACS script. This script requires the calling actor to have a `user_playerRiding` user variable array with a length of 64 defined, since it uses that to track which players are currently riding the actor. If we were to exclude this script call, we would still be able to stand on the turtle, but it wouldn’t carry us along, necessitating the use of [core_stickyLifts](../acs-script-reference-cf6aec3f/corestickylifts-94bfbdc6.md).

```c
actor SolidTurtle : BasicMapProp
{
	var int user_playerRiding[64];
	
	+CANPASS
	
	Speed 1
	Height 48
	Radius 32
	States
	{
		Spawn:
			TURT A 0
			TURT A 0 ACS_NamedExecuteWithResult("core_stickyLifts", STICKYMODE_GUTSLIFT)
		SpawnLoop:
			TURT AAABBBCCCBBB 1 A_Wander
			loop
	}
}
```

[2024-03-24 22-31-14.mp4](../assets/4152455445f54770a72d6ac88d0730cd-2024-03-24_22-31-14.mp4)

As the “with result” part of `ACS_NamedExecuteWithResult` implies, we can also use this function within expressions. Some ACS scripts are designed to return a result value, otherwise they will return a default value of 1. 

In practice, we typically use `ACS_NamedExecuteWithResult`'s functionally equivalent shorthand, `CallACS` in expressions. Below is our `JumpingBass` actor tweaked to use [core_CheckFooting](../acs-script-reference-cf6aec3f/corecheckfooting-6ffa1119.md) for its `Jump` condition. This script can be preferable to manual floor checks, because it will smoothly handle standing on top of solid actors.

```c
actor ACSDrivenJumpingBass
{
	+SOLID
	height 56
	radius 16
	scale 2.5
	translation "192:192=217:217", "198:198=95:95"
	States
	{
		Spawn:
			BASS A 0
			BASS A 5
			BSB1 B 1 A_ChangeVelocity(0.0, 0.0, random(12, 20), CVF_REPLACE)
		Leaping:
			BSB1 B 1
			BSB1 B 0 A_JumpIf(!CallACS("core_checkfooting"), "Leaping")
			goto Spawn
	}
}
```

We can also use ACS scripts to augment our projectiles with fancy behavior. To showcase this, we’ll create a projectile which travels a short distance and explodes, additionally pulling enemies into the explosion using [core_radiusPull](../acs-script-reference-cf6aec3f/coreradiuspull-24f601dd.md). This script allows us to pull enemy players towards the calling actor with a specified pull strength and pull radius.

Below is our starting implementation. Note the use of actor scoped and global scoped constants to keep our explosion and pull radius consistent functionally and visually.

```c
const int KS_SUCTION_RADIUS = 128;
actor KineticSphere : BasicProjectile
{
	const int SUCTION_PULL = 7;
	const int EXPLOSION_DMG = 6;
	const int EXPLOSION_RADIUS = 64;
	const int EXPLOSION_MAX_RADIUS = 32;
	const float SHIRNK_VAL = 0.2;
	
	+FORCEXYBILLBOARD
	+BRIGHT
	
	Obituary "%o was spaghettified by %k's Kinetic Sphere."
	damagetype "BlackHoleBomb"
	translation "210:215=62:62", "208:208=59:59", "4:4=59:59", "168:168=59:59"

	speed 45
	damage (0)
	Radius 15
	Height 8
	
	reactiontime 1
	States
	{
		Spawn:
			BLKH B 0
			BLKH BCDE 3
			BLKH B 1 A_Countdown
			wait
		Death:
	    9P_H A 0 A_PlaySoundEx("weapons/mm9/blackholebombboom", "Body")
			9P_H A 0 A_SpawnItemEx("KineticSphereExplodeFX", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			
			9P_H A 0 ACS_NamedExecuteWithResult("core_radiuspull", SUCTION_PULL, KS_SUCTION_RADIUS)
			9P_H A 0 A_Explode(EXPLOSION_DMG, EXPLOSION_RADIUS, 0, 0, EXPLOSION_MAX_RADIUS)
			9P_H AAA 0 A_SpawnItemEx("KineticSphereFX", KS_SUCTION_RADIUS, 0, 0, 0, 0, 0, random(0, 359), SXF_TRANSFERTRANSLATION)
			9P_H AB 1 A_SetScale(scalex - SHIRNK_VAL, scaley - SHIRNK_VAL)
			
			9P_H A 0 ACS_NamedExecuteWithResult("core_radiuspull", SUCTION_PULL, KS_SUCTION_RADIUS)
			9P_H A 0 A_Explode(EXPLOSION_DMG, EXPLOSION_RADIUS, 0, 0, EXPLOSION_MAX_RADIUS)
			9P_H AAA 0 A_SpawnItemEx("KineticSphereFX", KS_SUCTION_RADIUS, 0, 0, 0, 0, 0, random(0, 359), SXF_TRANSFERTRANSLATION)
			9P_H AB 1 A_SetScale(scalex - SHIRNK_VAL, scaley - SHIRNK_VAL)
			
			9P_H A 0 ACS_NamedExecuteWithResult("core_radiuspull", SUCTION_PULL, KS_SUCTION_RADIUS)
			9P_H A 0 A_Explode(EXPLOSION_DMG, EXPLOSION_RADIUS, 0, 0, EXPLOSION_MAX_RADIUS)
			9P_H AAA 0 A_SpawnItemEx("KineticSphereFX", KS_SUCTION_RADIUS, 0, 0, 0, 0, 0, random(0, 359), SXF_TRANSFERTRANSLATION)
			9P_H AB 1 A_SetScale(scalex - SHIRNK_VAL, scaley - SHIRNK_VAL)
			
			9P_H A 0 ACS_NamedExecuteWithResult("core_radiuspull", SUCTION_PULL, KS_SUCTION_RADIUS)
			9P_H A 0 A_Explode(EXPLOSION_DMG, EXPLOSION_RADIUS, 0, 0, EXPLOSION_MAX_RADIUS)
			9P_H AAA 0 A_SpawnItemEx("KineticSphereFX", KS_SUCTION_RADIUS, 0, 0, 0, 0, 0, random(0, 359), SXF_TRANSFERTRANSLATION)
			9P_H AB 1 A_SetScale(scalex - SHIRNK_VAL, scaley - SHIRNK_VAL)
			
			9P_H A 0 ACS_NamedExecuteWithResult("core_radiuspull", SUCTION_PULL, KS_SUCTION_RADIUS)
			9P_H A 0 A_Explode(EXPLOSION_DMG, EXPLOSION_RADIUS, 0, 0, EXPLOSION_MAX_RADIUS)
			9P_H AAA 0 A_SpawnItemEx("KineticSphereFX", KS_SUCTION_RADIUS, 0, 0, 0, 0, 0, random(0, 359), SXF_TRANSFERTRANSLATION)
			9P_H AB 1 A_SetScale(scalex - SHIRNK_VAL, scaley - SHIRNK_VAL)
			stop
	}
}

actor KineticSphereExplodeFX : BasicGraphicEffect
{
	scale 1.5
	States
	{
		SpawnFrame:
			ASEX ABCDEF 1
			stop
	}
}

actor KineticSphereFX : BasicGraphicEffect
{
	+FORCEXYBILLBOARD
	+BRIGHT
	States
	{
		SpawnFrame:
			BLKH TS 1
			BLKH S 0 A_ChangeVelocity(-(KS_SUCTION_RADIUS / 4), 0, 0, CVF_RELATIVE|CVF_REPLACE)
			BLKH RRRR 1 A_SpawnItemEx("KineticSphereFX2", 0, 0, 0, momx / 1.5, momy / 1.5, 0, 0, SXF_ABSOLUTEMOMENTUM|SXF_TRANSFERTRANSLATION)
			stop
	}
}
```

[2024-03-25 12-53-07.mp4](../assets/ce2df428147242fbb65d616c90e5a7af-2024-03-25_12-53-07.mp4)

We can jazz this projectile up further by also giving it Black Hole Bomb’s redirection capabilities. We can use [core_SetToPtrPitchYaw](../acs-script-reference-cf6aec3f/coresettoptrpitchyaw-7b632d39.md) for this. This script accepts an actor pointer argument and will make the calling actor’s angle and pitch match the actor which the specified actor pointer refers to. Combined with `A_ChangeVelocity`, this makes for an easy way to create a projectile which drifts in the direction the shooter is facing.

Note that we’re also using [core_targetexists](../acs-script-reference-cf6aec3f/coretargetexists-2625a2e6.md) in the below implementation. This is a highly useful ACS script worth dedicating to memory. This script returns true if the calling actor’s `AAPTR_TARGET` actor pointer refers to a valid player, false otherwise. 

We typically use this to destroy projectiles or effects which should expire whenever their corresponding player dies or spectates. In this instance, we want to destroy the projectile so that the player cannot continue to aim it while they spectate or have died.

```c
actor AimedKineticSphere : KineticSphere
{
	States
	{
		Spawn:
			BLKH B 0
			BLKH BBBCCCDDDEEE 1 A_GiveInventory("KineticSphereHelper")
			BLKH E 1 A_Countdown
			wait
	}
}

actor KineticSphereHelper : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 A_JumpIf(!ACS_NamedExecuteWithResult("core_targetexists"), "Explode")
			TNT1 A 0 ACS_NamedExecuteWithResult("core_SetToPtrPitchYaw", AAPTR_TARGET)
			TNT1 A 0 A_ChangeVelocity(cos(-pitch) * 45, 0, sin(-pitch) * 45, CVF_RELATIVE|CVF_REPLACE)
			stop
		Explode:
			TNT1 A 0 A_Countdown
			stop
	}
}
```

[2024-03-25 13-05-54.mp4](../assets/9399050cc6a44ea696b9a2a2ae29c1f5-2024-03-25_13-05-54.mp4)

Some ACS scripts are also designed to set which actor a given actor pointer refers to. By leveraging scripts like [core_getPlayersInRadius](../acs-script-reference-cf6aec3f/coregetplayersinradius-f8ebd948.md), we can create some fairly complex map props. Below is a Cut Man NPC which will respond to a player which walks into his radius, and continue facing that player until they leave his radius.

In the below code, we use the [`A_RearrangePointers`](https://zdoom.org/wiki/A_RearrangePointers) function to do additional actor pointer management. This function allows us to set `AAPTR_TARGET`, `AAPTR_TRACER`, and `AAPTR_MASTER` to a different actor pointer. In this instance, we use it to duplicate the `AAPTR_TARGET` actor pointer to the actor’s `AAPTR_TRACER` slot and also to empty out the actor pointers by setting them to `AAPTR_NULL`.

```c
actor TalkingCutman : BasicMapProp
{
	const int TALKING_RADIUS = 160;
	var int user_initialAngle;
	
	translation "198:198=41:41", "192:192=4:4"
	height 52
	radius 16
	States
	{
		Spawn:
			CUTM A 0 
			CUTM A 0 A_SetUserVar(user_initialAngle, angle)
		SpawnLoop:
			CUTM A 0 A_Jump(4, "IdleAnim")
			CUTM A 1 A_JumpIf(ACS_NamedExecuteWithResult("core_getPlayersInRadius", TALKING_RADIUS, PRF_CLOSESTPOINTER, AAPTR_TARGET) > 0, "Talking")
			loop
			
		IdleAnim:
			CUTM JJJJJAAAAA 1 A_JumpIf(ACS_NamedExecuteWithResult("core_getPlayersInRadius", TALKING_RADIUS, PRF_CLOSESTPOINTER, AAPTR_TARGET) > 0, "Talking")
			CUTM JJJJJAAAAA 1 A_JumpIf(ACS_NamedExecuteWithResult("core_getPlayersInRadius", TALKING_RADIUS, PRF_CLOSESTPOINTER, AAPTR_TARGET) > 0, "Talking")
			CUTM JJJJJAAAAA 1 A_JumpIf(ACS_NamedExecuteWithResult("core_getPlayersInRadius", TALKING_RADIUS, PRF_CLOSESTPOINTER, AAPTR_TARGET) > 0, "Talking")
			CUTM JJJJJAAAAA 1 A_JumpIf(ACS_NamedExecuteWithResult("core_getPlayersInRadius", TALKING_RADIUS, PRF_CLOSESTPOINTER, AAPTR_TARGET) > 0, "Talking")
			CUTM JJJJJAAAAA 1 A_JumpIf(ACS_NamedExecuteWithResult("core_getPlayersInRadius", TALKING_RADIUS, PRF_CLOSESTPOINTER, AAPTR_TARGET) > 0, "Talking")
			goto SpawnLoop
			
		Talking:
			// duplicate AAPTR_TARGET pointer to AAPTR_TRACER
			CUTM A 0 A_RearrangePointers(AAPTR_TARGET, AAPTR_NULL, AAPTR_TARGET)
			
			// play chat sound and message globally
			// in practice, a custom built ACS script is better for this
			// can implement only playing the chat message to AAPTR_TARGET
			CUTM A 0 A_PlaySoundEx("misc/chat", "Voice", false, 1)
			CUTM A 0 A_Log("\caCutman\c-: Hello there!")
			
			CUTM IIIIAAAAIIIIAAAAIIIIAAAAIIIIAAAA 1 A_FaceTarget
			goto TalkingCooldown
			
		TalkingCooldown:
			CUTM AAAAA 1 A_FaceTarget
			CUTM AAAAA 1 A_FaceTarget
			CUTM AAAAA 1 A_FaceTarget
			goto TalkedIdle
			
		TalkedIdle:
			CUTM A 1 A_FaceTarget
			CUTM A 0 A_JumpIf(ACS_NamedExecuteWithResult("core_getPlayersInRadius", TALKING_RADIUS, PRF_CLOSESTPOINTER, AAPTR_TARGET) > 0, "AttemptTalking")
			CUTM A 1 A_JumpIf(true, "CleanUp")
			wait
			
		AttemptTalking:
			// only talk if AAPTR_TARGET is different from previous AAPTR_TARGET / current AAPTR_TRACER
			CUTM A 0 A_JumpIf(!IsPointerEqual(AAPTR_TARGET, AAPTR_TRACER), "Talking")
			goto TalkedIdle
			
		CleanUp:
			// remove all pointers and reset if no one around
			CUTM A 0 A_RearrangePointers(AAPTR_NULL, AAPTR_NULL, AAPTR_NULL)
			CUTM A 0 A_SetAngle(user_initialAngle)
			goto SpawnLoop
	}
}
```

[2024-03-25 21-35-15.mp4](../assets/86129f8e728846bca130c09382442f69-2024-03-25_21-35-15.mp4)

The various ACS examples above only scratch the surface of the types of actors possible to create. You’ll truly only know the full extent once you’ve experimented with the different ACS scripts provided by MM8BDM seen [here](../acs-script-reference-cf6aec3f/README.md). Furthermore, once you exhaust your options with those scripts, you can still always make your own ACS scripts to execute once we learn how to do so in the next tutorial.

## Desyncs

---

As we’re nearing the end of this tutorial, it’s now a good time to address the warning about `Jump` functions when used online. If you’ve played online in Mega Man 8-Bit Deathmatch before, you may have already heard the phrase, “desync.” If not, in short, desyncs are whenever what you see as a player is different than what actually exists for other players or the server. Many don’t know what causes desyncs, so for that, we’ll need some more context about how the Zandronum engine works.

Zandronum is built using a client-server architecture. This means that each player is running their own client instance of Zandronum that communicates to a server instance of Zandronum. In other words, there are client copies of the game and a server copy of the game all running in parallel that refer to each other. When a player hits a button, their client instance will send a signal to the server, the server will evaluate the result of that button press, then send a response back to the client, with the client then displaying the result. 

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--Sf-LPDr9--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h9lqex9m1vxogt0j13mt.png)

This allows the gameplay experience to stay smooth for players with better ping to the server regardless of one player having poor connection. Additionally, it means that the server, which is typically not compromised / hacked, can act as a source of truth for all players.

However, solely communicating to the server for every gameplay action can be pretty slow for players with a bad connection. It wouldn’t be a fun experience if you had to press a movement button, send that signal to the server, wait for a response back, and only once the response arrives then see the result of the movement. 

For this reason, Zandronum implements a form of client-side prediction for various actions, including basic movements. The client will evaluate those actions on its end to the best of its ability and immediately display the result. This prediction allows the client to see immediate results of their actions, even if it’s going to be verified or corrected by the server just a moment later.

To wrap this back around to the original point, `Jump` functions are also client-side predicted, but in a rather unintuitive manner. The client will always predict a `Jump` function to have a false result, essentially skipping it and waiting for the server to fix it with its next update. This gives us a formal understanding of the most prevalent desync, being the client incorrectly predicting a `Jump` function and then failing to receive the update from the server.

> 💡 **The **`A_JumpIfInventory`** function slightly differs in this behavior. The client **<u>**does**</u>** attempt to evaluate the condition based off of its knowledge of the calling actor’s inventory.   
>   
> Generally speaking, however, you shouldn’t count on it predicting correctly, because the client is not guaranteed to be properly aware of the inventory of all actors.**

Now that we know the essence of a `Jump` desync, we can manufacture them very easily.

```c
actor DesyncingActor : BasicMapProp
{
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 A 1 
			PLY1 A 0 A_JumpIf(true, "Spawn")
			goto Death
		Death:
			PLY1 H 0
			stop
	}
}
```

This actor is a bit contrived in isolation, but it represents a pretty common “loop state if x is true” pattern that you’ll see across props and weapons alike. This actor will work offline with no issues, but is more or less guaranteed to disappear for clients if you bring it online. This is because the clients will predict that `A_JumpIf` to be false and instantly continue onwards to the `stop` instruction which kills the actor. No good!

Notably, however, the actor still exists for the server’s instance of the game. This is evident because although it has disappeared for the client, they still cannot walk through it. The client will predict the movement and begin to look like it’s walking through it, but the server will quickly correct their position, because the server has correctly evaluated the `A_JumpIf` function and is acting as the source of truth for all clients.

[2024-03-26 18-48-07.mp4](../assets/b0358954855d4344b6174fba2b5d5645-2024-03-26_18-48-07.mp4)

In this particular case, because the actor is rather contrived, it’s a very simple, fool-proof solution:

```c
actor NoLongerDesyncingActor : BasicMapProp
{
	States
	{
		Spawn:
			PLY1 A 0
			PLY1 A 1 
			loop
	}
}
```

That’s not a very exciting outcome because we essentially compiled out our `Jump` function, so let’s return back to a more exciting actor which desyncs.

```c
actor DesyncingMegaman? : BasicMapProp
{
	States
	{
		Spawn:
			EMEG A 0
			EMEG A 5
			EMEG R 1 A_ChangeVelocity(0.0, 0.0, random(12, 20), CVF_REPLACE)
		Leaping:
			EMEG R 1
			EMEG R 0 A_JumpIf(!CallACS("core_checkfooting"), "Leaping")
			goto Spawn
	}
}
```

This is a reskinned prop from earlier, now a simple Mega Man? prop which will jump at some random height with a cool jump animation. Like before, it uses [core_CheckFooting](../acs-script-reference-cf6aec3f/corecheckfooting-6ffa1119.md) to poll whether or not Mega Man? has landed to determine which sprite he should use. 

However, if you’ve been following along, you’ll now realize that this prop will flicker pretty badly online. The client will always predict that `A_JumpIf` condition to be false, so it will briefly show the beginning of the `Spawn` state before the server corrects it, causing a nasty sprite flicker. With that in mind, let’s go through a few potential desync fixes and talk about their ups and downs.

[2024-02-25 00-07-42.mp4](../assets/c3870c68aa814bf4bf97097a2ee94c4c-2024-02-25_00-07-42.mp4)

First, the easiest (but potentially naive) fix for this problem:

```c
actor DesyncingMegaman?_Variant1 : BasicMapProp
{
	States
	{
		Spawn:
			EMEG A 0
			EMEG A 5
			EMEG R 1 A_ChangeVelocity(0.0, 0.0, random(12, 20), CVF_REPLACE)
		Leaping:
			EMEG R 1
			EMEG R 3 A_JumpIf(!CallACS("core_checkfooting"), "Leaping")
			goto Spawn
	}
}
```

If the server is going to correct the result of the `A_JumpIf` briefly after the client skips it, why not add some delay after the skipped `A_JumpIf` so that the client cannot stray too far? The logic here is sound, but it incorrectly assumes that every client will have the same request / response time from the server. 3 tics of delay may be perfect for the client with 20 ping, but certainly not for the client with 100 ping.

We can extend the idea here a bit further. If the server is going to eventually correct the client, why should we let the client make any decision about the state at all? Let’s create a buffer that will stop the client until the server gets back to it:

```c
actor DesyncingMegaman?_Variant2 : BasicMapProp
{
	States
	{
		Spawn:
			EMEG A 0
			EMEG A 5
			EMEG R 1 A_ChangeVelocity(0.0, 0.0, random(12, 20), CVF_REPLACE)
		Leaping:
			EMEG R 1
			EMEG R 0 A_JumpIf(!CallACS("core_checkfooting"), "Leaping")
			EMEG R 1 A_JumpIf(true, "Spawn")
			wait
	}
}
```

This is generally a better way of implementing the previous solution, but it is important to note that this solution can fail as well. Particularly, consider what will happen in the case of a packet loss, a signal from the server failing to reach the client for whatever reason. If the packet carrying the result of the server’s evaluation of these `A_JumpIf`'s is dropped, this actor can get stuck at that `wait` instruction, potentially forever.

So instead, let’s think about this problem a different way. Instead of trying to fight the client-side prediction, why don’t we help it? The logic behind the client-side prediction is to assume it is more likely for the `A_JumpIf` to be `false` than it is to be `true`. In this example, with our current `A_JumpIf` condition being `!CallACS("core_checkfooting")`, that logic doesn’t hold up, because it is more likely for Mega Man? to continue staying airborne after having just jumped. With that in mind, we should look to flip our `A_JumpIf` condition. Instead of jumping to `Leaping` when Mega Man? is airborne, let’s instead use our jump for the less likely condition, jumping to `Spawn` whenever he has grounded.

Here’s an implementation of that idea:

```c
actor DesyncingMegaman?_Variant3 : BasicMapProp
{
	States
	{
		Spawn:
			EMEG A 0
			EMEG A 5
			EMEG R 1 A_ChangeVelocity(0.0, 0.0, random(12, 20), CVF_REPLACE)
		Leaping:
			EMEG R 1
			EMEG R 0 A_JumpIf(CallACS("core_checkfooting"), "Spawn")
			loop
	}
}
```

Make no mistake, this solution still leaves some room for desync to occur, specifically a brief desync on landing. However, that desync ends up being largely unnoticeable. Using a more informed solution like this can allow our actor to still take advantage of the perks of client-side prediction.

No one solution presented here can be called the best, but it is a good idea to know all the trade-offs and how to pick the best one for the particular scenario.

## Actor Arguments and Mapping

---

> 🚨 **This section notes some ways that we can integrate our DECORATE knowledge with making maps for the game. It may be useful to have at least some basic knowledge of **[**map making skills**](./doombuilder-and-you-49fe1007.md)** for the full context of this section.**

As mentioned earlier, as an inheritance friendly alternative to actor scoped constants, we can choose to instead use actor arguments. This refers to a special `args` actor property which can hold up to 5 different integer values. We can then use `args[x]` in any expression where `x` indicates which value to access. 

> 💡 **Note that actor arguments are **<u>**0-indexed**</u>** meaning that to access the first actor argument, we must use **`args[0]`**.**

Actor arguments are special also because we can use the `SXF_TRANSFERSPECIAL` flag with `A_SpawnItemEX` to transfer actor arguments from the calling actor to the spawned actor. This behavior combined with [`A_SetArg`](https://zdoom.org/wiki/A_SetArg) occasionally makes actor arguments preferable to even user variables. 

Below is a recoded version of MM8BDM’s bubble spawner map prop that makes use of actor arguments and the ability to transfer them. The first argument indicates the chance for a bubble to spawn, the second argument indicates the radius from the prop in which bubbles can spawn, the third argument indicates the vertical speed of the bubbles, and the fourth argument indicates the max height the bubbles will travel in map units.

```c
actor ImprovedBubbleSpawner : BasicWatcher
{
	args 5, 64, 6, 128
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1
			TNT1 A 0 A_Jump(args[0], "Bubble")
			loop
		Bubble:
			TNT1 A 2 A_SpawnItemEx("DynamicBubbleFX", random(0,args[1]), 0, 0, 0, 0, args[2], random(0,359), SXF_TRANSFERSPECIAL)
			Goto Spawn
	}
}

actor DynamicBubbleFX
{
	var int user_duration;
	
	// Can't be clientsided unfortunately
	// Client won't know about transferred args
	// +CLIENTSIDEONLY
	
	PROJECTILE
	+DONTBLAST
	+DONTREFLECT
	
	damage (0)
	height 2
	radius 2
	scale 2.5
	States
	{
		Spawn:
			BUBS E 0
			BUBS E 0 A_SetUserVar(user_duration, ((args[3] > 0) * args[3]) + ((args[3] <= 0) * 65535))
		SpawnLoop:
			BUBS E 0 A_Recoil(-10)
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS EE 0 A_Recoil(10)
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_SetUserVar(user_duration, user_duration - args[2])
			BUBS E 1 A_JumpIf(user_duration <= 0, "Death")
			BUBS E 0 A_Recoil(-10)
			loop
		Death:
			BUBS E 0
			stop
	}
}
```

[2024-03-25 22-52-50.mp4](../assets/3e2f504d0cb44867987026e414d5cb3b-2024-03-25_22-52-50.mp4)

With all of the behavior dependent on the actor arguments, we can then easily make altered versions of this actor by just inheriting from the actor then modifying the actor arguments.

```c
actor BubbleColumnBubbleSpawner : ImprovedBubbleSpawner
{
	args 256, 128, 12, 0
}
```

[2024-03-25 22-55-31.mp4](../assets/2d7c9fc4307346b3ab0792454916eaac-2024-03-25_22-55-31.mp4)

Actor arguments are particularly special, however, because if we omit the `args` actor property entirely, then it is possible to customize the arguments per actor when placing the actor into a map using tools such as Ultimate Doom Builder.

To accomplish this, however, we first should learn how make map placeable actors. This is done by adding a Doom Editor (DoomED) number to the actor. This must be a unique number in the range of 1 and 32767. We recommend that you refer to the [Mod List](../mod-list-b6aae364.md) to make sure that you’re not conflicting with any other mods when choosing your DoomED numbers. Below is an example of how to add a DoomED number to an actor, in this case using 23500.

```c
actor BubbleColumnBubbleSpawner : ImprovedBubbleSpawner 23500
{
	args 256, 128, 12, 0
}
```

Once an actor has a DoomED number, it’ll show up as a thing which can be placed so long as you load the file with the actor as an additional resource.

<!-- image omitted (assets not vendored) -->

By default, our new thing entry won’t look very pretty. It’s using the actor name as the display name, it appears in a strange “User-defined” category, and the sprite shows up as an error because the first sprite name in the `Spawn` state is `TNT1`. We can fix all of these issues through the use of [editor keys](https://zdoom.org/wiki/Editor_keys).

Editor keys are special comments that are ignored by Zandronum but will be parsed by map editors such as Ultimate Doom Builder. We can use them to specify additional details about the actor to help those editors out. Below is our `BubbleColumnBubbleSpawner` with some editor keys added.

```c
actor BubbleColumnBubbleSpawner : ImprovedBubbleSpawner 23500
{
	//$Category Tutorial-Props
	//$Title Bubble Column
	//$NotAngled
	//$Sprite BUBSA0
	args 256, 128, 12, 0
}
```

<!-- image omitted (assets not vendored) -->

Now we’ve got some nicer labels and a proper image for our new map prop. Editor keys are particularly useful for actors intended to be given actor arguments, because we can use editor keys to document what the arguments mean. Below is a bubble spawner which has no `args` actor property but has editor keys to document what types of values are valid. Note the use of `A_SetArg` to supply default values if the mapper sets a bad value.

> 🚨 **If you provide an **`args`** actor property for an actor intended to have its actor arguments set via Ultimate Doom Builder, the **`args`** actor property will override the supplied ones. For that reason, you must instead use the **`$ArgXDefault`** editor key to provide a default!**

```c
actor DynamicBubbleSpawner : BasicWatcher 23501
{
	//$Category Tutorial-Props
	//$Title Bubble Spawner
	//$NotAngled
	//$Sprite BUBSA0
	
	//$Arg0 Bubble Chance (256 = Max)
	//$Arg0Default 5
	
	//$Arg1 Bubble Radius
	//$Arg1Default 64
	
	//$Arg2 Bubble Speed
	//$Arg3Default 6
	
	//$Arg3 Bubble Height (0 = Infinite)
	//$Arg3Default 0
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 0 A_SetArg(0, ((args[0] > 0) * args[0]) + ((args[0] <= 0) * 5))
			TNT1 A 0 A_SetArg(2, ((args[0] != 0) * args[0]) + ((args[0] == 0) * 6))
		SpawnLoop:
			TNT1 A 1
			TNT1 A 0 A_Jump(args[0], "Bubble")
			loop
		Bubble:
			TNT1 A 2 A_SpawnItemEx("DynamicBubbleFX", random(0,args[1]), 0, 0, 0, 0, args[2], random(0,359), SXF_TRANSFERSPECIAL)
			Goto Spawn
	}
}
```

<!-- image omitted (assets not vendored) -->

[2024-03-26 13-02-50.mp4](../assets/c3a513853fb146c9a127a2763b3fdfa9-2024-03-26_13-02-50.mp4)

As seen through these examples, good use of actor arguments can help you make highly customizable actors without having to have a lot of added bloat and duplicated actors.

## Substituting DECORATE Files

---

> 🚨 **This section will detail how you can replace DECORATE code which is in a prior loaded file with your own substituted DECORATE code.   
>   
> Unless you are replacing a file explicitly meant for replacing, this should be seen as a last resort option, with the better option being to instead add your code in an isolated manner!**

Occasionally, we may find ourselves wanting to entirely replace a DECORATE actor that exists in another loaded file to modify its behavior. Typically we should only do this when there’s absolutely no other option to achieve our modified behavior or because we’re planning to replace an actor that is explicitly meant to be replaced. When we find ourselves in this situation, DECORATE provides a means to “substitute” files, including all of the actors within it.

This brings us back to the concept of directory paths from the very beginning of this tutorial. By creating a file with the exact same directory path as another DECORATE file, only affecting files before ours in the load order, we will entirely replace that DECORATE file with ours. This means that we can copy a DECORATE file from, for example, MM8BDM’s PK3, put it into the exact same directory path in our own PK3, make modifications to it, and then see our modifications in action when we load our PK3 as a mod.

Mega Man 8-Bit Deathmatch does actually have a fair few files which are intended to be replaced in this manner. We’ll cover one example here, but you’ll later see another example once we begin making weapons.

Inside of MM8BDM’s PK3, there’s a file with a directory path of `actors/player/megamanedit.txt`. This file has a `Megaman` actor which does nothing but inherit from `MegamanCore`, as seen below.

```c
// If your mod makes simple changes to the existing Megaman class
// but not the classbase (eg, toggling flags), make those changes here
actor Megaman : MegaManCore
{
    //+NOSKIN
} 
```

Notably, however, this `Megaman` actor is the actor used uniquely for the default player class in this game, so by modifying this actor, we can modify the default class and only the default class.

You might be wondering why this is relevant. Some of the most common class mods in this game revolve around Mega Man’s robot masters. However, by default, the default class in MM8BDM is allowed to use skins, including other robot masters. As a result, once some robot master themed classes are added, the default class can now masquerade as them, which is no good!

As the comments suggest then, we’d want to replace and modify this actor to disable the ability for the default class to use skins without impacting any other classes that exist. By making a simple actor flag modification and placing this file at the `actors/player/megamanedit.txt` directory path in our own file, we can easily do so.

```c
// If your mod makes simple changes to the existing Megaman class
// but not the classbase (eg, toggling flags), make those changes here
actor Megaman : MegaManCore
{
    +NOSKIN // this is normally commented out
}
```

<!-- image omitted (assets not vendored) -->

To stress it one more time, using this feature should be seen as a last resort. If you do it irresponsibly and without regard for documenting the changes you’re making, you can easily create a real headache for yourself once other projects begin updating. You’ll end up with a project that replaces other projects’ files with outdated, modified copies, which gets confusing very quickly.

## Closing

---

Since you’ve gotten all the way here, you should have enough knowledge to now be dangerous in DECORATE. However, your programming journey shouldn’t end here. This tutorial is by no means fully comprehensive, in fact, a few things likely have been oversimplified or omitted entirely. Likewise, these skills aren’t yet enough to get you to your first weapon or even class mod, but that’s alright, even expected.

Learning to program begins with learning the basic toolkit but continues as a never-ending journey of applying those tools to bigger problems. On the way, you’ll keep learning new tools and new ways of applying older tools. Through that process, you’ll be able to make anything you desire down the road. For the next big step, we’ll learn how to write ACS scripts which can then be executed in DECORATE the same as we did previously. You can find that tutorial [here](./hello-acs-447542af.md).  

## Example File

---

[v6b-DECORATE-the-World-v1a.pk3](../assets/1f2880da825f4e9084e41bf85b19e26e-v6b-DECORATE-the-World-v1a.pk3)

## See Also

---

[Hello ACS](./hello-acs-447542af.md)

[Adding Custom Graphics](./adding-custom-graphics-28261edf.md)

[Adding Custom Sounds](./adding-custom-sounds-6cf0678b.md)

[Doombuilder and You](./doombuilder-and-you-49fe1007.md)

[Decorate Actor Reference](../decorate-actor-reference-2fdd3e69/README.md) 

[ACS Script Reference](../acs-script-reference-cf6aec3f/README.md)
