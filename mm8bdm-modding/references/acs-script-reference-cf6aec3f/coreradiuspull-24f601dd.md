---
title: "core_radiusPull"
notion_id: 24f601dde74342418d621c712148533d
source: https://www.notion.so/24f601dde74342418d621c712148533d
---

# core_radiusPull

> ⚡ script "core\_radiusPull" (int maxforce, int maxRange, int noFalloff)

## Usage

---

This script can be used to perform a horizontal push / pull in a radius to all enemy players.

### Parameters

- `maxForce`: int - The maximum force to use for the push / pull

- `maxRange`: int - The radius of the detection sphere in map units. 

- `noFalloff`: bool - If true, the force will always be `maxForce`, otherwise it will vary with distance from the pushing / pulling actor.

### Return Value

Returns the number of players afflicted by the push / pull.

> ⚡ If you set `maxForce` to 0, this can be an easy way to obtain the number of enemies in a radius.
