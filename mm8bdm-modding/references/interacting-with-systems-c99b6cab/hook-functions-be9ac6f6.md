---
title: "Hook Functions"
notion_id: be9ac6f6c5a2403ba0d51583f04f6063
source: https://www.notion.so/be9ac6f6c5a2403ba0d51583f04f6063
---

# Hook Functions

---

> ⚠️ **Warning: Before beginning this tutorial, you should already be experienced with **[**DECORATE**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** and **[**ACS**](../starting-guides-77c9d72f/hello-acs-447542af.md)**.**

When making certain types of projects, it can be highly useful to be able to call a script whenever a certain type of actor spawns or when the player picks up a Circuit Board or Terminator Capsule. Mega Man 8-Bit Deathmatch has a setup that allows you to use ACS to define a scripts to be called in these circumstances.

## Adding New Hooks

---

Adding new hook scripts can be done via two different functions from `DTADD.acs`, either [AddSpawnFunc](./addspawnfunc-58042bc1.md) or [AddArtifactPickupFunc](./addartifactpickupfunc-f7fc280a.md), depending on the situation which you need a hook to be added for.

Let’s imagine that we want to add auto-map icons for weapons, assist items, and buster upgrades, so we’ll want to use `AddSpawnFunc` to accomplish that. The parameters for this function are as follows:

### Parameters

- `type`: int - Which actors call the script
  - `DTADD_SFT_WEP`: 0 - Weapon Token Spawn

  - `DTADD_SFT_ITEM`: 1 - Item Spawn

  - `DTADD_SFT_PARTYBALL`: 2 - Party Ball Spawn

  - `DTADD_SFT_FLAG`: 3 - CTF Flag Spawn (including White Flag)

  - `DTADD_SFT_PROJ`: 4 - Projectile Spawn

  - `DTADD_SFT_PROJCLIENT`: 5 - Projectile Spawn (executed on CLIENTSIDE)

  - `DTADD_SFT_PILLAR`: 6 - Skulltag Score Statue Spawn

- `name`: string - Name of the script to run

> ⚠️ **Note: If defining a spawn function for projectiles to be called on the client-side, you need to call this function in an **`OPEN CLIENTSIDE`** script.**

As you might be able to assume, we’ll want to use the `SFT_WEP` and `SFT_ITEM` types, so let’s go ahead and create the spawn functions for those.

```javascript
#library "AUTOMAP"
#include "zcommon.acs"

#include "DTADD.acs"

script "automap_icons_funcs" OPEN {
	AddSpawnFunc(DTADD_SFT_WEP, "automap_icons_wep");
	AddSpawnFunc(DTADD_SFT_ITEM, "automap_icons_item");
}

script "automap_icons_wep" (void) {
	if(Timer() <= 1) {
		GiveInventory("WeaponIconSpawner",1);
	}
}

script "automap_icons_item" (void) {
	if(Timer() <= 1) {
		GiveInventory("ItemIconSpawner",1);
	}
}
```

When weapons spawn, they will execute `"automap_icons_wep"`, and when items spawn, they will execute `"automap_icons_item"`. These scripts will execute for the pickup each time they respawn as well, which is why there is a [`Timer`](https://zdoom.org/wiki/Timer) check. These scripts will have the pickup as the activator, so we’ll be giving these inventory items to the pickups when they spawn.

```c
actor WeaponIconSpawner : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 A_SpawnItemEX("WeaponAutomapIcon")
			stop
	}
}

actor ItemIconSpawner : CustomInventory
{
	States
	{
		Pickup:
			TNT1 A 0 A_JumpIf(CheckClass("BaseMM8BDMBusterUpgrade",AAPTR_DEFAULT,true), "BusterSpawn")
			TNT1 A 0 A_JumpIf(CheckClass("BaseMM8BDMUseItem",AAPTR_DEFAULT,true), "AssistSpawn")
			TNT1 A 0 // This is where I'd put my basic ItemAutomapIcon if I had one
			stop
		BusterSpawn:
			TNT1 A 0 A_SpawnItemEX("BusterAutomapIcon")
			stop
		AssistSpawn:
			TNT1 A 0 A_SpawnItemEX("AssistAutomapIcon")
			stop
	}
}
```

The weapon one is self explanatory, but the item one requires a bit more explaining. The item spawn functions are executed by all types of items, basic pickups, assist items, and buster upgrades. Because of this, any spawn function executed for `SFT_ITEM` has to make sure it narrows down between those. In this case, we’re only wanting to spawn auto-map icons for buster upgrades and assist items.

The actual actors being spawned from these inventory actors can be seen below.

```c
actor WeaponAutomapIcon : MapMarker
{
	States
	{
		Spawn:
			ATOM A -1
			Stop
	}
}

actor BusterAutomapIcon : MapMarker
{
	States
	{
		Spawn:
			ATOM B -1
			Stop
	}
}

actor AssistAutomapIcon : MapMarker
{
	States
	{
		Spawn:
			ATOM C -1
			Stop
	}
}
```

With all of this code in place as well as some graphics added, we’ve got a very simple auto-map mod that may be helpful for folks who are new to the game.

<!-- image omitted (assets not vendored) -->

## Example File

---

[v6b-automapicons-v1a.pk3](../assets/215739a633904ff68c8700820c8a19d4-v6b-automapicons-v1a.pk3)

## See Also

---

[AddSpawnFunc](./addspawnfunc-58042bc1.md)

[AddArtifactPickupFunc](./addartifactpickupfunc-f7fc280a.md)
