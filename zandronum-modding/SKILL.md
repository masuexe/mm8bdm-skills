---
name: zandronum-modding
description: >-
  Correct Zandronum DECORATE and ACS authoring for Zandronum-only mods (no ZScript).
  Covers DECORATE gotchas, ACS int vs fixed (no promotion), HudMessage vs SBARINFO
  coords, special lump naming, state labels, ACC include rules, and case sensitivity
  (names mostly insensitive; ACS string contents sensitive).
  Use when writing or reviewing DECORATE, ACS, LOADACS, KEYCONF, SNDINFO, TEXTURES,
  or any Zandronum PK3 lump; when the user mentions Zandronum, DECORATE states,
  A_Jump*, Offset, Spawn, ACC, HudMessage, fixed, CustomInventory, CLIENTSIDEONLY,
  case sensitivity, StrCmp, StrICmp, or online desync.
---

# Zandronum Modding

Target engine: **Zandronum only** (ZDoom 2.8pre / GZDoom 1.8.6 lineage).

Do **not** use ZScript or post-2.8pre / post-GZDoom-1.8.6 language features. If uncertain, assume the feature is unavailable.

## Before editing

1. Prefer engine / ACC source over generic Doom or GZDoom wiki memory.
2. Read the matching reference below before inventing syntax.

## ACC executable selection

When compiling ACS from WSL, prefer a native Linux ACC executable. Resolve it
from the project's compiler setting, `PATH` (`command -v acc`), or a native
installation supplied by the user; verify that the file is executable before
invoking it. A WSL UNC path such as `\\wsl.localhost\Ubuntu\home\...` is the
Windows view of a Linux path, so use the corresponding `/home/...` path when
running from WSL. Keep the ACC executable directory on the include/search path
so standard libraries such as `zcommon.acs` resolve.

Use Windows `acc.exe` only when the user explicitly requests it or when a
Windows-specific compatibility comparison is the goal. Do not cross the
WSL/Windows boundary merely because a Windows compiler is installed; such a
launch may require sandbox approval.

## Engine MCP (default off)

Do **not** call Zandronum MCP for ordinary DECORATE/ACS authoring or review. Gotchas, workspace source, and ACC are enough.

**Allowed** only when:

- the user explicitly asked to launch or test in-engine, or
- text cannot prove the issue: parse/startup failure, or a runtime-only symptom (psprite, projectile liveness, alpha/render style, net desync).

**Forbidden:** probing engine version “just in case”; launching after an edit to confirm it; screenshot loops; a full addon/debug profile unless a focused case already passed.

**If allowed:** newest local Zandronum (not older than 3.2.1 unless the user requested an older regression). One launch, smallest tracked profile (`ZANDRONUM_LAUNCH_PROFILES` when the repo has one), one action, then `actor_state` / `wait_for_actor` / `actors_near` / `read_engine_log` / `get_startup_errors` as needed; stop when the answer is clear. Keep machine-specific paths in the project, not this skill.

## References (read on demand)

| Topic | File |
|-------|------|
| DECORATE parse/runtime traps | [references/decorate-gotchas.md](references/decorate-gotchas.md) |
| ACS types, HudMessage coords, `#import` | [references/acs-gotchas.md](references/acs-gotchas.md) |
| Lump names, state labels, ACC paths | [references/lumps-and-labels.md](references/lumps-and-labels.md) |
| Case sensitivity (names vs string contents) | [references/case-sensitivity.md](references/case-sensitivity.md) |

## Quick checklist

- Names (actors, scripts, states, inventory types, textures, sounds, LANGUAGE keys) are **case-insensitive**; ACS string **contents** and `StrCmp` are **case-sensitive** (`StrICmp` when casing must not matter). See [case-sensitivity.md](references/case-sensitivity.md).
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
- ACS does **not** promote `int + 0.1` to `N.1` — use `(n * 1.0) + 0.1` or a `256.1` literal (`HudMessage` / BARLIB). See [acs-gotchas.md](references/acs-gotchas.md).
- SBARINFO `fullscreenoffsets` negative X is from the **right**; `SetHudSize(320,200)` `HudMessage` X is from the **left** (`-64` → `256`).
- `#import` does not export `#define`; duplicate macros needed for local array sizes.

## MM8BDM-specific APIs

For `core_*`, ClassBase, DTADD/BARLIB, and official modding tutorials, use the **mm8bdm-modding** skill (bundled wiki references). Rage rune psprite timing is documented there, not here.
