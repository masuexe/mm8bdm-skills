---
title: "Hello ACS"
notion_id: 447542af09f4467892d9bcfc38432db3
source: https://www.notion.so/447542af09f4467892d9bcfc38432db3
---

# Hello ACS

> 🚨 **A few pages are still in flux, so expect unfinished pages that will be updated as time passes. Keep checking back later for more updated info!  
>   
> If you have any specific questions before a given page is finished, be sure to ask around for what you’re trying to do!**

---

> 🚨 **It is heavily recommended to finish the **[**tutorial for DECORATE**](./decorate-the-world-57ad7756.md)** before reading this one! ACS can be used without DECORATE, but it is truly best understood as compared to DECORATE and when used as a complement. This tutorial **<u>**will**</u>** refer back to information in the previous tutorial and skip past basics already covered.**

Before we can fully delve into making the weapons and player classes that we typically see in mods across the community, we also need to understand the other programming language that Zandronum gives us access to. If DECORATE is the language which deals with individual pieces of the world, ACS is the glue which allows us to manage a global state and write scripts to handle interactions between those different DECORATE pieces.

> 💡 **Required Materials:**
>
> - [**SLADE 3**](https://slade.mancubus.net/index.php?page=downloads)
>
> - [**ACC**](https://trillster.dev/downloads/ACC.zip)

## Table of Contents

## Setting Up the Compiler

---

Generally speaking, whenever we program, the code that we read and write is not understandable to our computer directly. Instead, the code that we write is typically interpreted or “compiled” into lower level languages that computers do understand, such as machine code. Whenever we load the game, part of that load time is automatically spent parsing and interpreting our DECORATE code to turn it into something usable by the computer. 

Likewise, the ACS code we’re about to write also cannot be directly understood by machines. Unlike DECORATE, however, Zandronum won’t automatically compile it, we need to do that ourselves. We do this by making use of a compiler. Different programming languages are compiled by different compilers, with some languages even having multiple compiler options. For ACS, ACC is the most popular, basic compiler.

We’ll be using SLADE 3 once again to write our ACS code, so we need to configure it to use ACC, which can be downloaded from the link at the top of this page. Once you have it downloaded, extract the entire ZIP file to any folder you want. We’ll point SLADE 3 to the `acc.exe` file that you just extracted.

<!-- image omitted (assets not vendored) -->

<!-- image omitted (assets not vendored) -->

Once you’ve saved that preference, you should be all ready to begin compiling ACS.

> 💡 **Making maps is another domain where programming in ACS is relevant, so you can additionally write ACS in tools such as Ultimate Doom Builder. In that instance, Ultimate Doom Builder already comes with a version of ACC preconfigured for its script editor.**

## File Structure and Organization

---

We can create our project including ACS the same as creating any DECORATE-involving project. Using SLADE, you just need to make a ZIP archive and we’ll have an empty project to begin placing code into.

<!-- image omitted (assets not vendored) -->

Projects which include ACS will typically have two folders related to ACS, `acs_source` and `acs`. The `acs_source` folder can have any number of subfolders and will hold our uncompiled, “source” ACS files. The `acs` folder typically doesn’t have any folders and is where our compiled ACS files will end up. SLADE will automatically create our `acs` folder for us if it’s missing, so we’ll only worry about creating the `acs_source` folder.

<!-- image omitted (assets not vendored) -->

We can now start placing ACS source files into this folder. All ACS files should have 8 or less characters in their name. You should also take care to name your ACS file something fairly unique, otherwise it can conflict with other mods, even MM8BDM itself.

> 🚨 **Although it may appear that ACS files with more than 8 characters will work, Zandronum only ever interprets up to 8 of them, meaning two files with the same first 8 characters will conflict.**

Like creating a DECORATE file, we can do this by selecting our ACS source folder then creating a new entry with a type of text.

<!-- image omitted (assets not vendored) -->

Unlike DECORATE, however, we typically prefer our ACS source files to have a file extension of `.acs` rather than `.txt`. This gives a hint to SLADE that whenever we go to edit this file, it should use the syntax highlighting for ACS rather than DECORATE (or even no syntax highlighting).

<!-- image omitted (assets not vendored) -->

Of course we also shouldn’t forget to save the project now that we’ve got some content inside of it. Once again, don’t forget to change the file extension to `.pk3` so that we have a file which Zandronum can load.

<!-- image omitted (assets not vendored) -->

Whenever we create a new ACS file, there’s two lines we should always include at the top of it. One is the `#library` directive. Unless you know what you’re doing, this line should typically always match the name of the ACS file minus the file extension. In our case, this line would look as follows:

```typescript
#library "TUTORACS"
```

> 🚨 **If you’re writing ACS in a map’s **`SCRIPTS`** file, such as through Ultimate Doom Builder, you should exclude this **`#library`** line.   
>   
> This line is only required for **<u>**non-map**</u>** ACS files explicitly to avoid conflicting with the map’s ACS scope. You’ll run into all sorts of strange issues if you fail to include it.**

The second line of our ACS files should be as follows. We’ll cover towards the end of the tutorial the meaning of this line. For now, all you need to know is that your ACS file wouldn’t be able to do much without this line.

```typescript
#include "zcommon.acs"
```

When we combine these two lines, our beginning ACS source file should look as follows:

<!-- image omitted (assets not vendored) -->

These two lines alone are enough for us to be able to compile our ACS. Our file won’t do anything at this point still, but let’s go ahead and do that to get familiar with the process. 

We have multiple ways we can compile the file. We can either right-click the file which we wish to compile or we can select the ACS file and use the button in the top right of the text editor to compile it. 

<!-- image omitted (assets not vendored) -->

Once you compile the file, you should see the `acs` folder pop up with a file ending in `.o`. This file is our newly compiled ACS file. Every time we make a change to the source file, we’ll have to recompile it to update this compiled file.

<!-- image omitted (assets not vendored) -->

With our file now compiled, there’s just one more step we need to take to get our ACS file recognized. In the root of our project, we need to create a `LOADACS` file. Like the `DECORATE` file, this is the entry point which defines which ACS files should be loaded by the game. Inside of this file, we should include the name of all of the ACS files which we want loaded, with one name per line. Our `LOADACS` file will look as follows:

<!-- image omitted (assets not vendored) -->

If we had multiple ACS files we needed to load, it might look something like below.

```typescript
TUTORACS
SECNDACS
THIRDACS
```

As mentioned earlier, the ACS file we’ve created currently won’t do anything because it has no scripts defined inside of it. However, with this setup, once we start writing scripts, we’ll have no troubles using them. For the rest of this tutorial, you can assume that each example is being written in the `TUTORACS` file or a different ACS file which has been compiled and loaded.

## Your First Script

---

With our setup out of the way, let’s write our first bit of ACS. In ACS, the majority of what we write is “scripts.” These are mostly isolated routines that execute line by line either when called manually via [`ACS_NamedExecuteWithResult`](https://zdoom.org/wiki/ACS_NamedExecuteWithResult) or the [`pukename`](https://zdoom.org/wiki/CCMDs:Debug#pukename:~:text=cannot%20be%20puked.-,pukename,-%3Cscript%3E%20%5Balways%5D%20%5Barg1) console command or automatically via some game event. To make our testing easy, we’ll primarily “puke” (execute) the scripts via `pukename`.

The basic syntax of a script looks like below. The first line of the script is the script signature, including its name and parameters. We’ll cover parameters in more detail later, so for now we’ll only use `void` to denote that our script has no parameters. The code that relates to the script should be wrapped in a pair of curly braces to denote the scope of it. Additionally as the code below shows, ACS accepts the same comment formatting as DECORATE.

```typescript
script "tutorial_scriptNameHere" (void) {
	// code goes here
}
```

Typically when naming our ACS scripts, we’ll do some prefix with an underscore. This generally ensures that our scripts are named uniquely compared to other mods, preventing any potential overlap or issue.

> 🚨 **ACS also has legacy support for numbered scripts, scripts identified by a number instead of a string name. Numbered scripts should be executed via **[`ACS_ExecuteWithResult`](https://zdoom.org/wiki/ACS_ExecuteWithResult)** and **[`puke`](https://zdoom.org/wiki/CCMDs:Debug#pukename:~:text=it%20looks%20like.-,puke,-%3Cscript%3E%20%5Barg1%20%5Barg2)** respectively.   
>   
> However, their use is heavily, heavily discouraged due to their poor maintainability and high chance for mod conflict.**

Unlike DECORATE’s comparatively strange line structure, each line within an ACS script is only concerned with performing some operation. Any line which performs an operation should end in a semi-colon. This tells the ACS compiler that the line is finished. Below is a basic script with some code in it.

```typescript
script "tutorial_helloACS" (void) {
	PrintBold(s:"Hello ACS!");
}
```

This script uses the [`PrintBold`](https://zdoom.org/wiki/PrintBold) ACS function to print a message to the screen of all players. When using this function, we have to use a “cast type” specify the type of data of what we’re printing to the screen. In this instance, since we want to print a string, we use the `s:` cast. 

Below is the result of executing this new script. Note that if you’re using the console for script testing, you’ll need to close the console before the script will run.

<!-- image omitted (assets not vendored) -->

As you probably already noticed, standard ACS lines don’t reference any sprites or have any delays listed, instead it operates invisibly and instantly in the background. We can reveal this behavior by introducing more `PrintBold` lines. We’ll see all of them in the console, but only one on our screen (because the lattermost overwrote the former instantly).

```typescript
script "tutorial_segmentedHelloACS" (void) {
	PrintBold(s:"Hello...");
	PrintBold(s:"ACS!");
}
```

<!-- image omitted (assets not vendored) -->

Sometimes we are interested in introducing delays to our ACS scripts, so we can use the [`Delay`](https://zdoom.org/wiki/Delay) function to accomplish this. This function takes a number of tics to wait for, so we can have our script wait for one second by delaying for 35 tics. Combining this with [`AmbientSound`](https://zdoom.org/wiki/AmbientSound) to play sounds globally, we can make a rather suspenseful script.

```typescript
script "tutorial_suspensefulHelloACS" (void) {
	AmbientSound("misc/chatsound", 127);
	PrintBold(s:"Hello...");
	
	Delay(35);
	
	AmbientSound("misc/gutssuspense", 127);
	PrintBold(s:"ACS!");
}
```

[Untitled](../assets/72253923f1a844eeb2b373a854aa81b0-Untitled.mp4)

## Activators, Players, and Things

---

Similar to DECORATE’s idea of a “calling actor”, every ACS script has an activator. This is the actor which the script is associated to, typically the actor which called the script. Many functions are designed to operate solely upon the activator of the script. 

For example, if we use [`Print`](https://zdoom.org/wiki/Print) and [`LocalAmbientSound`](https://zdoom.org/wiki/LocalAmbientSound) functions instead of `PrintBold` and `AmbientSound`, then the messages and sounds will only play for the activator of the script. We can additionally use a special cast type, `n:`, which will print the activator’s name if given a `0` and the activator is a player. We’re also using commas to combine different phrases to be printed.

```typescript
script "tutorial_activatorSuspense" (void) {
	LocalAmbientSound("misc/chat", 127);
	Print(s:"Hello...");
	
	Delay(35);
	
	LocalAmbientSound("misc/gutssuspense", 127);
	Print(n:0, s:"\c-!");
}
```

[2024-03-30 22-11-32.mp4](../assets/bd20254811bb498da3a77be8d056c2c4-2024-03-30_22-11-32.mp4)

We can change the activator of a script in the middle of a script’s execution, but we need a bit more context before we’ll be able to use the functions to do so.

Every player in a lobby has an integer, player number in the range of 0 to 63. Sometimes you may see these shorthanded as a PLN. The first player to join the lobby has player number 0 while the next players get 1, 2, 3, so on and so forth. We can use the `PlayerNumber` function to return the player number which the activator has. Note the `i:` cast being used to print an integer number.

```typescript
script "tutorial_pln" (void) {
	Print(i:PlayerNumber());
}
```

<!-- image omitted (assets not vendored) -->

When playing offline, player 0 will always be the player while players 1 - 63 will be bots. Some functions, particularly ones which deal with exclusively players, will require a player number as an argument to dictate which player the function will operate on. With all this in mind, we can create a script which changes its activator to player 1 using [`SetActivatorToPlayer`](https://wiki.zandronum.com/SetActivatorToPlayer) and prints their name instead. Note the return to using the global variants of `Print` and `AmbientSound`, otherwise we wouldn’t see or hear any information being printed due to the activator swap.

```typescript
script "tutorial_player1Name" (void) {
	SetActivatorToPlayer(1);
	
	AmbientSound("misc/chat", 127);
	PrintBold(s:"Hello...");
	
	Delay(35);
	
	AmbientSound("misc/gutssuspense", 127);
	PrintBold(n:0, s:"\c-!");
}
```

[Untitled](../assets/f0ed0d33969b49cf976aade944dee3ad-Untitled.mp4)

While player related functions use player numbers, the larger majority of ACS functions instead use an identification scheme called TIDs (Thing IDs). If you’ve ever done mapping, you might remember that actors are also sometimes called “things,” which is where this name originates from.

> 💡 **While a lot of these functions take a TID parameter, they also typically always provide the option to use a value of **`0`** to mean the current activator of the script.**

Mappers and programmers alike can choose to give actors an identification number which can then be supplied to various ACS functions to indicate which actors to operate upon. In the context of mapping, this identification number is called a “tag,” however, in a programming context, we call this number a TID. If an actor has no tag or TID, then it is typically impossible to operate ACS functions upon it unless it is the activator calling the script.

For that reason, Mega Man 8-Bit Deathmatch makes life easier for us by automatically assigning TIDs to player actors. It uses a scheme of taking the player’s already unique player number then adding 1000 to it. We can verify that this is the case by using the [`ActivatorTID`](https://zdoom.org/wiki/ActivatorTID) function which retrieves the current TID of the activator.

```typescript
script "tutorial_player2TID" (void) {
	SetActivatorToPlayer(2);
	PrintBold(i:ActivatorTID());
}
```

<!-- image omitted (assets not vendored) -->

If we know the TID of an actor, we can use the [`SetActivator`](https://zdoom.org/wiki/SetActivator) function to change the activator of the current script to that actor. Another notable set of TIDs that MM8BDM sets up for us is the range 2000 - 2063. If we add 2000 to a player’s player number, we get the TID of an actor that corresponds to their spawn point (assuming they’ve already joined the game and started playing). 

We can use this knowledge to create a script which teleports the player back to their spawn point using the ACS function, [`Thing_Move`](https://zdoom.org/wiki/Thing_Move). This function allows us to teleport one TID to another TID’s location, while specifying whether or not the teleport shows an animation. Note the use of 0 to mean the current activator’s TID.

```typescript
script "tutorial_returnToSpawn" (void) {
	Thing_Move(0, PlayerNumber() + 2000, true);
}
```

Note that it is also possible for a script to have no activator. In this case, we generally say that the activator of the script is the “world.” Many functions have differing or undocumented behavior when used in a script with no activator, so take care when doing this. 

One perk of having a script with no activator is that the script won’t terminate if the activator is destroyed or leaves the game, which particularly useful for scripts with delays. For this instance, we can use the line below to change the activator of a script to the world. 

```typescript
SetActivator(0, AAPTR_NULL);
```

This method leverages the actor pointer parameter of `SetActivator`. Typically we might also use that parameter to set the activator of a script to one of the actor pointers of a given TID. For example, if you recall our [`TalkingCutman`](./decorate-the-world-57ad7756.md) actor from the DECORATE tutorial, using this parameter, we can now create a custom ACS script with more finetuned dialogue visibility. Calling the script below in lieu of the previous dialogue functions will only show the dialogue to the `AAPTR_TARGET` actor pointer of Cut Man. 

```typescript
script "tutorial_targetDialogue" (void) {
	SetActivator(0, AAPTR_TARGET);
	
	AmbientSound("misc/chat", 127);
	Print(s:"\caCutman\c-: Hello there!");
}
```

## Variables and Data Types

---

int - your standard boring every day integer

bool - an integer in disguise

char - an integer in a worse disguise (no explicit type)

str - an integer in a very good disguise, talk about the lookup table

fixed - introduce the idea, explain it in larger detail later

## Constants

---

## Operators

---

Adding, subtracting, post-increment, etc.

## Bit Shifting and Fixed Point

---

Hello and welcome to Introduction to x86 Assembly

## String Operations

---

Fun with StrParam

## Boolean Operators & Expressions

---

\>=, \<=, ==, !=, \<, \>, &&, ||

## Conditional Statements

---

If statements and switch statements

## Loops

---

While, do while, then for

## Variable Scope

---

ACS does not scope within blocks, so this really talks about map scope and global variables instead.

## Arrays

---

This needs to be after variable scope, because our arrays are currently only map scope in named scripts, soon to be fixed though!

## Script Parameters

---

## Script Types

---

## CLIENTSIDE Scripts

---

## Functions

---

## File Inclusions

---

## Importing Data Tables

---

## Replacing ACS Scripts

---

## Closing

---

## Example File

---

## See Also

---

[Creating Weapons](../interacting-with-systems-c99b6cab/creating-weapons-bf312efa.md)

[Doombuilder and You](./doombuilder-and-you-49fe1007.md)

[ACS Script Reference](../acs-script-reference-cf6aec3f/README.md)
