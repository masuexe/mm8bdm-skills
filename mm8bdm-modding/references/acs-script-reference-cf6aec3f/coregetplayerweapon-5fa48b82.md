---
title: "core_getplayerweapon"
notion_id: 5fa48b82e5d64ae0a6fbbdbff886a825
source: https://www.notion.so/5fa48b82e5d64ae0a6fbbdbff886a825
---

# core_getplayerweapon

> ⚡ Script "core\_getplayerweapon" (int playerno)

## Usage

---

Returns the currently held weapon of any given player. Because it returns it as a string, this script is only really useful to use in another ACS.

### Parameter

- `playerno`: int - The player number of the player to retrieve the weapon of.

### Return Value

Returns the player’s current weapon as a string.

## Example

---

This is a script that will log a cheeky message whenever a player dies to the same weapon that they’re holding.

```javascript
script "example_deathmessage" DEATH {
	int self = PlayerNumber();
	int killer = ACS_NamedExecuteWithResult("core_gettarget", false, true);
	if(killer == self)
		terminate;

	str killer_weapon = ACS_NamedExecuteWithResult("core_getplayerweapon", killer);
	if(StrICmp(GetWeapon(), killer_weapon) == 0)
		ACS_NamedExecuteWithResult("example_showdeathmessage", self, killer);
}

script "example_showdeathmessage" (int victim, int killer) CLIENTSIDE {
	Log(n:victim + 1, s:" was skill diffed by ", n:killer + 1, s:"!");
}
```
