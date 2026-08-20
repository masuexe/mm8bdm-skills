---
title: "DrawBasicBarAndNumber"
notion_id: 071d97635f904ec5a8d245b0d5b632f7
source: https://www.notion.so/071d97635f904ec5a8d245b0d5b632f7
---

# DrawBasicBarAndNumber

> 📦 ASSTLIB.acs

> ⚡ void DrawBasicBarAndNumber(str barPiece, str barBack, str barPieceH, str barBackH, int x, int y, int id1, int id2, int id3, int barLength, bool drawnum, int number)

## Usage

---

This function draws a bar and a number at a given X and Y coordinate of the screen.

### Parameters

- `barPiece`: String - The name of the graphic to draw for a piece of the bar in vertical HUD style (Ex. `"ASTBARPR"`).

- `barBack`: String - The name of the graphic to draw for the bar backing in vertical HUD style (Ex. `"ASSTBARE"`).

- `barPiece`: String - The name of the graphic to draw for a piece of the bar in horizontal HUD style (Ex. `"ASTVARPR"`).

- `barBack`: String - The name of the graphic to draw for the bar backing in horizontal HUD style (Ex. `"ASSTVARE"`).

> 💡 **Warning: A bad “gotcha” with core graphics is that they are typically flipped in their naming scheme due to legacy reasons. Any graphic with **`VAR`** typically refers to the horizontal alternative rather than the vertical as you might expect!**

- `x`: Fixed - The X coordinate of the screen that the bar’s respective image is drawn at.

- `y`: Fixed - The Y coordinate of the screen that the bar’s respective image is drawn at.

> 💡 **Note: Because this function is implemented using **[`HudMessage`](https://zdoom.org/wiki/HudMessage)** internally, the X and Y coordinates here abide by the **[**rules of **](https://zdoom.org/wiki/SetHudSize#:~:text=height%20you%20specified.-,Coordinate%20Behavior,-After%20SetHudSize%2C%20you)[`SetHudSize`](https://zdoom.org/wiki/SetHudSize#:~:text=height%20you%20specified.-,Coordinate%20Behavior,-After%20SetHudSize%2C%20you)** as that function does.  
>   
> If you’re using **[Get_AssistDisplayBar_X](./getassistdisplaybarx-b1024a06.md)** and **[Get_AssistDisplayBar_Y](./getassistdisplaybary-031bc9a7.md)**, this is not much of a concern to you, because they already give coordinates assuming that **`SetHudSize(320, 200, 0)`** has been used, but it is good to know for specifying your own coordinates! **

- `id`: Int - Internally this function uses [`HudMessage`](https://zdoom.org/wiki/HudMessage) which requires an ID, so you should pass a unique [`HudMessage`](https://zdoom.org/wiki/HudMessage) ID using [Get_And_Inc_AssistDisplayID](./getandincassistdisplayid-00a4e858.md). Alternatively, you can supply your own static IDs, just make sure that they are unique!

- `id2`: Int - The implementation of this uses three [`HudMessage`](https://zdoom.org/wiki/HudMessage) IDs, one for the number, one for the bar pieces, and the third for the bar backing, so this function requires you to provide three IDs.

- `id3`: Int - The implementation of this uses three [`HudMessage`](https://zdoom.org/wiki/HudMessage) IDs, one for the number, one for the bar pieces, and the third for the bar backing, so this function requires you to provide three IDs.

- `barLength`: Int - How many bar segments to draw out of 8. If you have an inventory that is measured in tics for duration, you can use an expression such as this, `((CheckActorInventory(cam,"BeatSupportCounter") * 8.0 / BEAT_SUPPORT_MAX) + 0.5) >> 16`. 

- `drawnum`: Bool - The number should only be shown if the user has it enabled, so typically this expression is put into this argument, `CheckActorInventory(cam,"AssistNumberFlag")>0`.

- `number`: Int - The actual number to show on the display if enabled. If you have an inventory that is measured in tics for duration, you can use an expression such as this, `CheckActorInventory(cam,"BeatSupportCounter") / 35 + (CheckActorInventory(cam,"BeatSupportCounter") % 35 > 0)`.

## Example

---

Below is a truncated version of MM8BDM’s main assist item assist display script which only has Rush Jet which will show every function being used.

```javascript
#library "COREAST"
#include "zcommon.acs"

#include "DTADD.acs"

Script "core_trunc_assists_define" OPEN CLIENTSIDE
{
	DefineAssistDisplay("core_trunc_assists");
}

#include "ASSTLIB.acs"

Script "core_trunc_assists" (int cam) CLIENTSIDE
{
	if(AssistDisplayBar_On()) {
		SetHudSize(320,200,0);

		if(CheckActorInventory(cam,"RushJetCounter")>0) {
			int pos = Get_And_Inc_AssistBarCount();
			int x = Get_AssistDisplayBar_X(pos);
			int y = Get_AssistDisplayBar_Y(pos);

			str img = "RUSJGO";
			if(CheckActorInventory(cam, "PlayerPropertyGrounded") > 0) img = "RUSJGON";
			if(CheckActorInventory(cam, "RushJetCounter") <= 1 && Timer() % 8 <= 3) img = "TNT1A0";
			
			BasicImageDisplay(img,Get_And_Inc_AssistDisplayID(),x,y);

			DrawBasicBarAndNumber(
			  "ASTBARPR","ASSTBARE",
			  "ASTVARPR","ASSTVARE",
				x,y,
				Get_And_Inc_AssistDisplayID(),Get_And_Inc_AssistDisplayID(),Get_And_Inc_AssistDisplayID(),
				CheckActorInventory(cam,"RushJetCounter"),
				CheckActorInventory(cam,"AssistNumberFlag")>0,
				CheckActorInventory(cam,"RushJetCounter")
			);
		}
	}
}
```

For reference, the way that the bar graphics for this assist display is defined is as follows:

```c
texture ASTBARPR, 5, 2{patch ASSTBARP, 0, 0 {Translation "192:192=4:4", "198:198=42:42"}}
texture ASTVARPR, 2, 5{patch ASSTVARP, 0, 0 {Translation "192:192=4:4", "198:198=42:42"}}
```
