---
title: "core_getteampalette"
notion_id: a10a8a3a4e894ab9b45706ba5c8cdd1b
source: https://www.notion.so/a10a8a3a4e894ab9b45706ba5c8cdd1b
---

# core_getteampalette

> ⚡ script "core\_getteampalette" (int team, int col) CLIENTSIDE

## Usage

---

This script can be used to get one of the palette numbers for a given team’s team colors.

### Parameters

- `team`: Int - Team to grab the palette mapped color from.

- `col`: Int - The color to grab from a set of colors in a team color. Valid values include:
  - `COLOR_LIGHTER`

  - `COLOR_SECONDARY`

  - `COLOR_PRIMARY`

  - `COLOR_DARK`

### Return Value

Returns the palette mapped color’s palette number.

> 🚨 **Because team colors differ between clients and only exist on **`CLIENTSIDE`**, this script’s return value is only meaningful when called in a **`CLIENTSIDE`** context!**

## Example

---

This `DrawBar` script creates an ammo bar which matches the player’s current team.

```c
#include "8BDMDEFS.acs"

script "DrawBar_Springfield" (void) CLIENTSIDE {
	int team = GetPlayerInfo(PlayerNumber(), PLAYERINFO_TEAM);
	if(team >= 0 && team <= 3) {
		DrawBarColor(
			ACS_NamedExecuteWithResult("core_getteampalette", team, COLOR_SECONDARY), 
			ACS_NamedExecuteWithResult("core_getteampalette", team, COLOR_PRIMARY)
		);
	} else {
		DrawBarColor(192, 198);
	}
}
```

## See Also

---

[Team Colors](../interacting-with-systems-c99b6cab/team-colors-679c2e93.md)
