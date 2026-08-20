---
title: "core_respawnspot"
notion_id: 10f045ca959640bc846faa6105abbbf4
source: https://www.notion.so/10f045ca959640bc846faa6105abbbf4
---

# core_respawnspot

> ⚡ script "core\_respawnspot" (int ptr, int type)

## Usage

---

Teleports the calling actor (or pointer of the calling actor) to a random spawn point on the map. Should be used in lieu of [`ArtiTeleport`](https://zdoom.org/wiki/Classes:ArtiTeleport) due to engine issues regarding its implementation.

### Parameters

- `ptr`: int - The actor pointer of the calling actor to teleport to a respawn pointer. Specify 0 to teleport the calling actor.

- `type`: int - The conditions to consider when choosing a respawn point to teleport to. The following values are supported:
  - `RS_NORM`: Chooses the spawn point of any player within the game.

  - `RS_SAMETEAM`: Chooses the spawn point of any ally within the game, abiding by team spawns.

  - `RS_ARTITELEPORT`: Uses [`ArtiTeleport`](https://zdoom.org/wiki/Classes:ArtiTeleport) to perform the teleport, including how it teleports below floating player spawns.
