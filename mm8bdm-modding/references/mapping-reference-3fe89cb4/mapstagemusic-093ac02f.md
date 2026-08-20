---
title: "map_stagemusic"
notion_id: 093ac02f71eb418dad20e9e94d41888a
source: https://www.notion.so/093ac02f71eb418dad20e9e94d41888a
---

# map_stagemusic

> ⚡ script "map\_stagemusic" (int client)

## Event

---

This script is called by the map whenever the main stage music should begin playing. It is first called on server-side, then again on client-side.

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_stagemusic`, to add additional behavior to this event, or override the existing behavior.

This script has no expected return value.

### Parameters

- `client`: bool - Whether this script is being called as `CLIENTSIDE`.

## Default Script

---

The default script actually just sets the MAPINFO music.

```javascript
script "map_stagemusic" (int client) {
    SetMusic("*");
}
```

## Example Replacement

---

The following script changes the music to MAPINFO defined music, unless run on `CLIENTSIDE`, and the user is running software mode.

```javascript
script "map_stagemusic" (int client) {
    if(client) {
				if(GetCvar("vid_renderer")==0)
						SetMusic("AMBFIRE");
				else
						SetMusic("*");
		} else {
				SetMusic("*");
		}
}
```

## See Also

---

[core_bossmusicstate](../acs-script-reference-cf6aec3f/corebossmusicstate-e8de4010.md)

[map_bossoverride](./mapbossoverride-edda8d54.md)
