---
title: "DefineAssistDisplay"
notion_id: 34353c797aa64f998f0be24ed19a27db
source: https://www.notion.so/34353c797aa64f998f0be24ed19a27db
---

# DefineAssistDisplay

> 📦 DTADD.acs

> ⚡ void DefineAssistDisplay(str name)

## Usage

---

An “assist display” is a script that is called every tic (1/35 of a second) on the client-side. This can be used for drawing graphics for assist items, but despite the misnomer name, it can actually be used for a lot more flexible things such as drawing any sort of graphic on screen.

This function is what allows you to define new assist displays to be called. Whenever your assist display script is called, it will be called with an argument of `cam` which is the TID of the player that should be used for different ACS operations.

> 💡 **Note: This function should be run within a **`OPEN CLIENTSIDE`** script*****. *****Failure to do so will cause your assist display scripts to not run properly.**

### Parameters

- `name`: String - The name of the script to call every tic through the assist display system.

## Examples

---

This first example uses the assist display system for a standard assist item purpose.

```javascript
#library "WERDMUSH"
#include "zcommon.acs"

#include "DTADD.acs"

script "weirdmushroom_assistdisplay_define" OPEN CLIENTSIDE {
	DefineAssistDisplay("weirdmushroom_assistdisplay");
}

#include "ASSTLIB.acs"

script "weirdmushroom_assistdisplay" (int cam) CLIENTSIDE {
	if(AssistDisplayBar_On()) {
		if(CheckActorInventory(cam, "MushJumpPower") > 0) {
			SetHudSize(320,200,0);
			int pos = Get_And_Inc_AssistBarCount();
			int x = Get_AssistDisplayBar_X(pos);
			int y = Get_AssistDisplayBar_Y(pos);
			
			str img = "WRDMA0";
			if(CheckActorInventory(cam, "MushCounter") <= 35 && Timer() % 8 <= 3) img = "TNT1A0";
			
			BasicImageDisplay(img,Get_And_Inc_AssistDisplayID(), x + 8.0, y + 16.0);
			
			int timeSec = CheckActorInventory(cam,"MushCounter") / 35 + (CheckActorInventory(cam,"MushCounter") % 35 > 0);
			DrawBasicBarAndNumber(
				"WRDMSHBR","ASSTBARE",
				"WRDMSHVR","ASSTVARE",
				x,y,
				Get_And_Inc_AssistDisplayID(),Get_And_Inc_AssistDisplayID(),Get_And_Inc_AssistDisplayID(),
				((CheckActorInventory(cam,"MushCounter") * 8.0 / 700) + 0.5) >> 16,
				CheckActorInventory(cam,"AssistNumberFlag")>0,
				timeSec
			);
		}
	}
}
```

This second example uses the assist display system for drawing a debuff graphic for Mega Man Unlimited’s Glue Shot. It gives a peek into how [BasicImageDisplay](./basicimagedisplay-5b8898f3.md) is implemented by providing an alternate which accepts transparent images.

```javascript
#library "MMUAST"
#include "zcommon.acs"

#include "DTADD.acs"

Script "mmu_assists_define" OPEN CLIENTSIDE {
	DefineAssistDisplay("mmu_assists");
}

#include "ASSTLIB.acs"

Script "mmu_assists" (int cam) CLIENTSIDE {
	if(AssistDisplayBar_On()) {
		SetHudSize(320,200,0);
		if(CheckActorInventory(cam,"GlueVision")>0) {
			BasicImageDisplay2Trans("GLUEHUD",Get_And_Inc_AssistDisplayID(),0.1,0.1,0.1,0.5);
		}
	}
}

function void BasicImageDisplay2Trans(str image, int id, int x, int y, int holdtime, int alpha) {
	SetFont(image);
	HudMessage(s:"A";HUDMSG_PLAIN|HUDMSG_ALPHA,id,CR_UNTRANSLATED,x,y,holdtime,alpha);
}
```

## See Also

---

[Advanced Weapons](./advanced-weapons-d87e2f5f.md)

[Creating Assist Items](./creating-assist-items-d57d327f.md)
