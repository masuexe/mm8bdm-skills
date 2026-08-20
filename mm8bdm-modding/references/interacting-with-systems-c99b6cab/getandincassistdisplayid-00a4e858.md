---
title: "Get_And_Inc_AssistDisplayID"
notion_id: 00a4e858bdcd4550ab346852f18050be
source: https://www.notion.so/00a4e858bdcd4550ab346852f18050be
---

# Get_And_Inc_AssistDisplayID

> 📦 ASSTLIB.acs

> ⚡ int Get\_And\_Inc\_AssistDisplayID(void)

## Usage

---

Both [BasicImageDisplay](./basicimagedisplay-5b8898f3.md) and [DrawBasicBarAndNumber](./drawbasicbarandnumber-071d9763.md) require unique IDs for their internal [`HudMessage`](https://zdoom.org/wiki/HudMessage) uses. This function is used to provide that easily. 

### Return Value

- Returns a unique ID that can be used for the assist display drawing functions.

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
