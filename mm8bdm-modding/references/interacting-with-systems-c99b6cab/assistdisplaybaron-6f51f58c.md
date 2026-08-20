---
title: "AssistDisplayBar_On"
notion_id: 6f51f58cd19c47c2ad2fbf98b12f4160
source: https://www.notion.so/6f51f58cd19c47c2ad2fbf98b12f4160
---

# AssistDisplayBar_On

> 📦 ASSTLIB.acs

> ⚡ bool AssistDisplayBar\_On(void)

## Usage

---

This function should be used in a conditional statement surrounding your assist item assist display script’s code, so that it is only drawn whenever the user has `mm8bdm_assistdisplay` toggled on and has the UI enabled.

### Return Value

- Returns whether or not assist display should be drawn.

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
