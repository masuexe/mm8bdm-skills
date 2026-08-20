---
title: "map_bossoverride"
notion_id: edda8d54107f4507a7e769179ebcbbdf
source: https://www.notion.so/edda8d54107f4507a7e769179ebcbbdf
---

# map_bossoverride

> ⚡ script "map\_bossoverride" (int client)

## Event

---

This script is called by the map after the boss music, intense music, or victory music begins playing. It is first called on server-side, then again on client-side.

## Usage

---

This script can replaced by adding a new script in your map of the name, `map_bossoverride`, to add additional behavior to this event, or override the existing behavior.

This script has no expected return value.

### Parameters

- `client`: bool - Whether this script is being called as `CLIENTSIDE`.

## Default Script

---

The default script does nothing.

```javascript
script "map_bossoverride" (int client) { }
```

## Example Replacement

---

The following script changes the sky black on server-side on music change.

```javascript
script "map_bossoverride" (int client) {
    if(!client) {
				ReplaceTextures("F_SKY1", "BLACK");
		}
}
```

## See Also

---

[core_bossmusicstate](../acs-script-reference-cf6aec3f/corebossmusicstate-e8de4010.md)

[map_stagemusic](./mapstagemusic-093ac02f.md)
