---
title: "core_checkrune"
notion_id: 696370f5eb4345f5b85bb88adc6d319b
source: https://www.notion.so/696370f5eb4345f5b85bb88adc6d319b
---

# core_checkrune

> ⚡ script "core\_checkrune" (int rune, int ptr)

## Usage

---

This is a standardized script which can be used to check if the calling actor (or an actor pointer of the calling actor) has a given rune.

### Parameters

- `rune`: int - Which rune to check for. Valid runes include the following:
  - `RUNE_STRENGTH`: Doubles all damage output.

  - `RUNE_RAGE`: Doubles firing speed.

  - `RUNE_DRAIN`: Damage dealt immediately heals for half.

  - `RUNE_SPREAD`: Every projectile shoots out in a spread of 3.

  - `RUNE_RESISTANCE`: Halves all incoming damage.

  - `RUNE_REGENERATION`: You gradually heal HP, up to a max of 100.

  - `RUNE_PROSPERITY`: Doubles healing from all sources.

  - `RUNE_REFLECTION`: Upon taking damage, instantly deal 75% damage back to the target.

  - `RUNE_HIGHJUMP`: Doubles your jump height.

  - `RUNE_HASTE`: Doubles your running speed.

- `ptr`: int - An optional [actor pointer](https://zdoom.org/wiki/Actor_pointer) to use in lieu of the calling actor.

### Return Value

Returns true if the selected actor has the requested rune, false otherwise.

## See Also

---

[Property Stackers](./property-stackers-0e63b9b2.md)
