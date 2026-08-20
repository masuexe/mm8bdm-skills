---
title: "AssistDisplayBar_HUDMode"
notion_id: d51c005d43f94f6ab7488e2a71796969
source: https://www.notion.so/d51c005d43f94f6ab7488e2a71796969
---

# AssistDisplayBar_HUDMode

> 📦 ASSTLIB.acs

> ⚡ int AssistDisplayBar\_HUDMode(void)

## Usage

---

Sometimes when using the assist display system, if you’re using it to draw a graphic outside of the typical assist bar setup, you may want to draw it in separate spots depending on which HUD style the user is using, which this function will allow.

### Return Value

- This function returns the current HUD style of the user
  - `BAR_DISPLAY_NONE` (0): HUD is disabled

  - `BAR_DISPLAY_VERT` (1): HUD is using vertical style

  - `BAR_DISPLAY_HORI` (2): HUD is using horizontal style

## Example

---

The code below uses this function to draw a lock-on icon in separate spots between vertical and horizontal HUD styles. This sort of check is <u>**not**</u> necessary if using [Get_AssistDisplayBar_X](./getassistdisplaybarx-b1024a06.md) and [Get_AssistDisplayBar_Y](./getassistdisplaybary-031bc9a7.md).

```javascript
#library "MMUAST"
#include "zcommon.acs"

#include "DTADD.acs"

Script "mmu_assists_define" OPEN CLIENTSIDE {
	DefineAssistDisplay("mmu_assists");
}

#include "ASSTLIB.acs"

Script "mmu_assists" (int cam) CLIENTSIDE {
	if(AssistDisplayBar_HUDMode()!=BAR_DISPLAY_NONE) {
		SetHudSize(320,200,0);
		if(CheckActorInventory(cam,"JetVision")>0) {
			int x = 28.1;
			int y = 36.1;
			if(AssistDisplayBar_HUDMode()==BAR_DISPLAY_HORI) {
				x = 157.1;
				y = 188.1;
			}
			BasicImageDisplay("JETLOCKA",Get_And_Inc_AssistDisplayID(),x,y);
		}
	}
}
```
