---
title: "Get_AssistDisplayBar_Y"
notion_id: 031bc9a7a82f448fbb4797839a35c692
source: https://www.notion.so/031bc9a7a82f448fbb4797839a35c692
---

# Get_AssistDisplayBar_Y

> 📦 ASSTLIB.acs

> ⚡ int Get\_AssistDisplayBar\_Y(int pos)

## Usage

---

Uses the maintained “assist bar” from [Get_And_Inc_AssistBarCount](./getandincassistbarcount-966b9980.md) to retrieve what Y coordinate to place a given image and bar at.

### Parameters

- `pos`: Int - You should pass in the result of [Get_And_Inc_AssistBarCount](./getandincassistbarcount-966b9980.md) for this parameter.

### Return Value

- Returns the Y coordinate to use for [BasicImageDisplay](./basicimagedisplay-5b8898f3.md) and [DrawBasicBarAndNumber](./drawbasicbarandnumber-071d9763.md) 

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
