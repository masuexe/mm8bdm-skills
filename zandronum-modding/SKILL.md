---
name: zandronum-modding
description: >-
  Correct Zandronum DECORATE and ACS authoring for Zandronum-only mods (no ZScript).
  Covers DECORATE gotchas, special lump naming, state labels, and ACC include rules.
  Use when writing or reviewing DECORATE, ACS, LOADACS, KEYCONF, SNDINFO, TEXTURES,
  or any Zandronum PK3 lump; when the user mentions Zandronum, DECORATE states,
  A_Jump*, Offset, Spawn, ACC, CustomInventory, CLIENTSIDEONLY, or online desync.
---

# Zandronum Modding

Target engine: **Zandronum only** (ZDoom 2.8pre / GZDoom 1.8.6 lineage).

Do **not** use ZScript or post-2.8pre / post-GZDoom-1.8.6 language features. If uncertain, assume the feature is unavailable.

## Before editing

1. Prefer engine / ACC source over generic Doom or GZDoom wiki memory.
2. Read the matching reference below before inventing syntax.

## References (read on demand)

| Topic | File |
|-------|------|
| DECORATE parse/runtime traps | [references/decorate-gotchas.md](references/decorate-gotchas.md) |
| Lump names, state labels, ACC paths | [references/lumps-and-labels.md](references/lumps-and-labels.md) |

## Quick checklist

- Empty inherit-only actors still need `{}`.
- Extra `}` between actors → `Expected '{', got 'actor'` — balance braces after multi-actor edits.
- Inventory flags used by a weapon must be defined in this mod (or an earlier-loaded PK3); do not assume another wad’s `UOnce` flags exist.
- `CheckInventory` is ACS-only — use `A_JumpIfInventory` / `CallACS` in DECORATE.
- `goto` / `loop` / `wait` / `stop` / `fail` must be on their own line.
- Do not name state labels `Loop` / `Wait` / `Stop` / `Fail` / `Goto` — reserved keywords; causes `Sprite names must be exactly 4 characters`.
- `A_Jump*` labels need a sprite frame before bare `stop` — else `Jump target 'X' not found`.
- No all-0-tic state loops (crashes the engine).
- Spawn state's first frame action never runs — lead with a dummy `TNT1 A 0`.
- Weapon `Ready` first sprite/frame must exist or `TryPickup` fails.
- Most `A_Jump*` skip on the client (not `A_JumpIfInventory` on the local weapon); `CallACS` in `A_JumpIf` is RTT-delayed.
- Do not spawn `+CLIENTSIDEONLY` from `CustomInventory` online; Give/Take from CustomInventory *does* sync ammo to clients.
- Special lumps: basename without last extension → uppercase → max 8 chars (`DECORATE.txt` → `DECORATE`).

## MM8BDM-specific APIs

For `core_*`, ClassBase, DTADD/BARLIB, and official modding tutorials, use the **mm8bdm-modding** skill (bundled wiki references). Rage rune psprite timing is documented there, not here.
