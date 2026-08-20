---
title: "Get_And_Inc_AssistBarCount"
notion_id: 966b99807ba54c1d9e79df59763b879c
source: https://www.notion.so/966b99807ba54c1d9e79df59763b879c
---

# Get_And_Inc_AssistBarCount

> 📦 ASSTLIB.acs

> ⚡ int Get\_And\_Inc\_AssistBarCount(void)

## Usage

---

The large majority of assist display graphics are designed to stack on top of each other and fill the screen in such a way that there’s no overlap or excess spacing.

They do this by maintaining an “assist bar” with a count which determines where they should be placed. This function allows you to get the current count for your icon and to increment it for the next.

<!-- image omitted (assets not vendored) -->

### Return Value

- Returns the current count for the assist bar which can be passed into functions like [Get_AssistDisplayBar_X](./getassistdisplaybarx-b1024a06.md) and [Get_AssistDisplayBar_Y](./getassistdisplaybary-031bc9a7.md) to determine what X and Y coordinates to use.  

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
