---
title: "Custom Darkness with GvH Arcade"
notion_id: b72b2c4df86e4672becfa7734614520d
source: https://www.notion.so/b72b2c4df86e4672becfa7734614520d
---

# Custom Darkness with GvH Arcade

---

[Ghouls versus Humans Arcade](https://mm8bdm.net/forum/thread/ghouls-vs-humans-arcade-117) is an unofficial class mod which acts as a Mega Man 8-Bit Deathmatch focused fork of the classic Ghouls versus Humans mode originally made for Doom.

To fit the horror theming, it has a system to automatically darken the typically fully bright MM8BDM maps. However, some custom maps may wish to provide their own lighting and thus disable or modify the automatic darkening which GvH Arcade does.

GvH Arcade provides a mechanism similar to the [replaceable map scripts](../mapping-reference-3fe89cb4/README.md) to do this task which this page will document in a similar way to those.

# gvh\_map\_defaultlight

> ⚡ script "gvh\_map\_defaultlight" (void)

## Event

---

This script is called by GvH Arcade on map start to initialize the darkness.

## Usage

---

This script can replaced by adding a new script in your map’s scripts sharing the name, `gvh_map_defaultlight`, to add additional behavior to this event or override the existing behavior.

This script has no parameters or expected return value.

# gvh\_map\_raiselight

> ⚡ script "gvh\_map\_raiselight" (int val)

## Event

---

This script is called by GvH Arcade during its daybreak round ending to slowly raise the light level.

## Usage

---

This script can replaced by adding a new script in your map’s scripts sharing the name, `gvh_map_raiselight`, to add additional behavior to this event or override the existing behavior.

This script has no expected return value.

### Parameters

- `val`: int - The value to raise the light level by.

## Default Scripts

---

By default, `gvh_map_defaultlight` and `gvh_map_raiselight` will only operate on sectors tagged from 0 to 599.

`gvh_map_defaultlight` will stop any flickering lights set on those sectors, lower their light level by 107, and use [`Sector_SetFade`](https://zdoom.org/wiki/Sector_SetFade) to create a fog effect of pure black.

```javascript
script "gvh_map_defaultlight" (void) {
	for(int i = 0; i < 600; i++) {
		Light_Stop(i);
		Light_LowerByValue (i, 107);
		Sector_SetFade(i, 1, 1, 1);
	}
}
```

`gvh_map_raiselight` will raise the light level of any sector in the range which does not have a light level of 0 by the value passed into `val`.

```javascript
script "gvh_map_raiselight" (int val) {
	for(int i = 0; i < 600; i++) {
		if(GetSectorLightLevel(i) != 0) {
			Light_RaiseByValue (i, val);
		}
	}
}
```

## Example Replacements

---

If you want GvH Arcade to leave the lighting alone on your map entirely, you can simply void out both scripts by adding scripts to your map such as below.

```javascript
#include "zcommon.acs"

script "gvh_map_defaultlight" (void) {}
script "gvh_map_raiselight" (int val) {}
```

Alternatively, you may want to have more nuanced behavior where the light level changing is disabled, but not the fog.

```javascript
#include "zcommon.acs"

script "gvh_map_defaultlight" (void) {
	for(int i = 0; i < 600; i++) {
		Sector_SetFade(i, 1, 1, 1);
	}
}
script "gvh_map_raiselight" (int val) {}
```

Another potential use case is a map that is fully bright in normal MM8BDM gameplay but receives its own tailored, non-uniform lighting when played with GvH Arcade.

```javascript
#include "zcommon.acs"

script "gvh_map_defaultlight" (void) {
	// fog everywhere
	for(int i = 0; i < 600; i++) {
		Sector_SetFade(i, 1, 1, 1);
	}

	// lighting per sector
	Light_ChangeToValue(1, 148);
	Light_ChangeToValue(2, 70);
	Light_ChangeToValue(3, 200);
}

// no replacement of `gvh_map_raiselight` to retain its default behavior
```
