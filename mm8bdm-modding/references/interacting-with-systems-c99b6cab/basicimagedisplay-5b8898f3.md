---
title: "BasicImageDisplay"
notion_id: 5b8898f39dde4c668f450e9697b1bcd5
source: https://www.notion.so/5b8898f39dde4c668f450e9697b1bcd5
---

# BasicImageDisplay

> 📦 ASSTLIB.acs

> ⚡ void BasicImageDisplay(str image, int id, int x, int y)

## Usage

---

This function just draws a basic given image at a given x and y coordinate of the screen.

### Parameters

- `image`: String - The name of the graphic to draw (Ex. `"RUSJGO"`).

- `id`: Int - Internally this function uses [`HudMessage`](https://zdoom.org/wiki/HudMessage) which requires an ID, so you should pass a unique [`HudMessage`](https://zdoom.org/wiki/HudMessage) ID using [Get_And_Inc_AssistDisplayID](./getandincassistdisplayid-00a4e858.md). Alternatively, you can supply your own static ID, just make sure that it is unique!

- `x`: Fixed - The X coordinate of the screen to draw the image at.

- `y`: Fixed - The Y coordinate of the screen to draw the image at.

> 💡 **Note: Again, because this function is implemented using **[`HudMessage`](https://zdoom.org/wiki/HudMessage)** internally, the X and Y coordinates here abide by the **[**rules of **](https://zdoom.org/wiki/SetHudSize#:~:text=height%20you%20specified.-,Coordinate%20Behavior,-After%20SetHudSize%2C%20you)[`SetHudSize`](https://zdoom.org/wiki/SetHudSize#:~:text=height%20you%20specified.-,Coordinate%20Behavior,-After%20SetHudSize%2C%20you)** as that function does.  
>   
> If you’re using **[Get_AssistDisplayBar_X](./getassistdisplaybarx-b1024a06.md)** and **[Get_AssistDisplayBar_Y](./getassistdisplaybary-031bc9a7.md)**, this is not much of a concern to you, because they already give coordinates assuming that **`SetHudSize(320, 200, 0)`** has been used, but it is good to know for specifying your own coordinates! **

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
