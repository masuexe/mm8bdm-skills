---
name: mm8bdm-modding
description: >-
  Mega Man 8-Bit Deathmatch (MM8BDM) modding on Zandronum: official wiki tutorials,
  core_* ACS scripts, ClassBase / BaseMM8BDMWep actors, DTADD / BARLIB / ASSTLIB APIs,
  and PK3 include conventions. Use when writing MM8BDM or CBM DECORATE/ACS, CallACS,
  ACS_NamedExecute, DefineWeapon, ClassBase, Assist displays, or when the user mentions
  MM8BDM, 8BDM, core_, CustWepClassBase, or BARLIB.
---

# MM8BDM Modding

Author MM8BDM-compatible DECORATE and ACS. Prefer existing `core_*` scripts and official base actors over inventing GZDoom/ZScript APIs.

Bundled docs live under [references/](references/) (relative to this skill). **Read those files before implementing.** Do not search the disk for a wiki exporter at runtime.

## Authority order

1. Zandronum engine / ACC — can this language construct exist?
2. Current workspace MM8BDM v6b sources (fingerprint: `acs_source/_includes/common/8BDMDEFS.acs` containing `#define PLN_TID 1000`, often under `ref/` or an extracted PK3)
3. This skill's wiki snapshots in `references/`
4. Never treat GZDoom or ZScript wiki as MM8BDM authority

## Include layout (mod ACS)

Typical addon ACS trees mirror the base game:

| Path under `acs_source/` | Role |
|--------------------------|------|
| `_includes/common/` | `8BDMDEFS.acs`, `8BDMLIB.acs`, `8BDMEFCT.acs`, … |
| `_includes/mod api/` | `ASSTLIB.acs`, `BARLIB.acs`, `DTADD.acs`, `PICKRPLC.acs` |

DECORATE calls named scripts via `ACS_NamedExecute*` / `CallACS("core_…")`. New ACS libraries must appear in `LOADACS` (with or without `.txt` — both are valid lumps).

TID constants: prefer `8BDMDEFS.acs` in the loaded base (`PLN_TID` etc.), not third-party TID tables.

Empty `Inventory` subclasses are boolean flags on players — a common MM8BDM pattern.

## Task → read these first

Paths are relative to this skill root.

| Task | Read |
|------|------|
| New weapon | [references/interacting-with-systems-c99b6cab/creating-weapons-bf312efa.md](references/interacting-with-systems-c99b6cab/creating-weapons-bf312efa.md), [references/decorate-actor-reference-2fdd3e69/basemm8bdmwep-8cc600ca.md](references/decorate-actor-reference-2fdd3e69/basemm8bdmwep-8cc600ca.md); then [defineweapon-6a4db7e0.md](references/interacting-with-systems-c99b6cab/defineweapon-6a4db7e0.md) if registering |
| Custom / CBM weapon | [references/additional-guides-7149f7a8/custom-weapons-with-cbm-d7343e16.md](references/additional-guides-7149f7a8/custom-weapons-with-cbm-d7343e16.md), [basemm8bdmcustwep-d23769c5.md](references/decorate-actor-reference-2fdd3e69/basemm8bdmcustwep-d23769c5.md) |
| New player class | [references/interacting-with-systems-c99b6cab/creating-classes-5863e4dc.md](references/interacting-with-systems-c99b6cab/creating-classes-5863e4dc.md), [classbase-c7f9de44.md](references/decorate-actor-reference-2fdd3e69/classbase-c7f9de44.md); CBM: [custom-classes-with-cbm-2196ad22.md](references/additional-guides-7149f7a8/custom-classes-with-cbm-2196ad22.md) |
| Call existing ACS | [references/acs-script-reference-cf6aec3f/README.md](references/acs-script-reference-cf6aec3f/README.md) then the matching `core*.md` page (signature, params, caveats) |
| HUD / ammo bars | BARLIB pages under [references/interacting-with-systems-c99b6cab/](references/interacting-with-systems-c99b6cab/) |
| Assist display | ASSTLIB pages in the same folder |
| Projectiles / FX bases | [references/decorate-actor-reference-2fdd3e69/README.md](references/decorate-actor-reference-2fdd3e69/README.md) |
| First DECORATE / ACS tutorial | [decorate-the-world-57ad7756.md](references/starting-guides-77c9d72f/decorate-the-world-57ad7756.md), [hello-acs-447542af.md](references/starting-guides-77c9d72f/hello-acs-447542af.md) (ignore SLADE screenshot steps; keep `#library` / LOADACS rules) |
| Mapping specials | [references/mapping-reference-3fe89cb4/README.md](references/mapping-reference-3fe89cb4/README.md) |
| Rage / double fire speed timing | [references/rage-rune-psprite.md](references/rage-rune-psprite.md) |

## Reference index (vendored wiki)

| Section | Directory |
|---------|-----------|
| Starting Guides | [references/starting-guides-77c9d72f/](references/starting-guides-77c9d72f/) |
| Interacting with Systems | [references/interacting-with-systems-c99b6cab/](references/interacting-with-systems-c99b6cab/) |
| ACS Script Reference | [references/acs-script-reference-cf6aec3f/](references/acs-script-reference-cf6aec3f/) |
| Decorate Actor Reference | [references/decorate-actor-reference-2fdd3e69/](references/decorate-actor-reference-2fdd3e69/) |
| Mapping Reference | [references/mapping-reference-3fe89cb4/](references/mapping-reference-3fe89cb4/) |
| Additional Guides | [references/additional-guides-7149f7a8/](references/additional-guides-7149f7a8/) |

Player-facing wiki pages (install, online play, FAQ, maps list) are **not** bundled.

## Engine language traps

For empty `{}`, `CheckInventory` in DECORATE, 0-tic loops, Spawn dummy frames, lump 8-char names, no-ZScript rules, `A_Jump*` online desync, and `CustomInventory` / `CLIENTSIDEONLY` net rules, use the **zandronum-modding** skill.

## Maintainers: refresh wiki snapshot

```bash
node scripts/sync-wiki.mjs [path-to-english-wiki-output]
```

Fingerprint (no fixed folder names): directory containing `acs-script-reference-cf6aec3f/README.md` with the English phrase `This page serves as a list of all the useful scripts`, plus `decorate-actor-reference-2fdd3e69/classbase-c7f9de44.md`. Optional: `MM8BDM_WIKI`. See [scripts/sync-wiki.mjs](scripts/sync-wiki.mjs).
