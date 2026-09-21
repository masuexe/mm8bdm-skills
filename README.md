# MM8BDM Skills

**English** | [简体中文](README.zh-CN.md)

Cross-project Cursor / Agent Skills: Proper Zandronum conventions + MM8BDM official modding documentation snapshots.


| Skill                                   | Purpose                                                                      |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| [zandronum-modding](zandronum-modding/) | DECORATE/ACS engine gotchas, lump naming, no ZScript                         |
| [mm8bdm-modding](mm8bdm-modding/)       | `core_*`, ClassBase, DTADD/BARLIB, wiki tutorials (bundled in `references/`) |


Complies with [Agent Skills](https://agentskills.io/specification): **Knowledge lives with the skill**, without runtime dependency on local wiki repository paths.

## Installation



### Recommended: skills CLI (Cursor)

Run directly in your terminal:

```bash
npx skills add masuexe/mm8bdm-skills --skill mm8bdm-modding --skill zandronum-modding -a cursor -g
```

Or from a local clone path (for local development/debugging):

```powershell
npx skills add "D:\path\to\mm8bdm-skills" --skill mm8bdm-modding --skill zandronum-modding -a cursor -g
```

Replace the path above with the clone location on your machine (do not hardcode drive letters into the skill body).

### Alternative: Junction (Windows)

```powershell
$src = "<path-to-cloned-mm8bdm-skills>"
$dst = "$env:USERPROFILE\.cursor\skills"
New-Item -ItemType Directory -Force -Path $dst | Out-Null
cmd /c mklink /J "$dst\zandronum-modding" "$src\zandronum-modding"
cmd /c mklink /J "$dst\mm8bdm-modding" "$src\mm8bdm-modding"
```

Do not install into `~\.cursor\skills-cursor\` (Cursor internal skills directory).

When switching machines: Re-run `npx skills add` or recreate the junctions. Wiki snapshots are already packaged in `mm8bdm-modding/references/`, so you **do not** need to carry the exporter.

## Maintenance: Updating Wiki Snapshots

Sync modding wiki sections from a local English wiki export (excludes player-facing pages and `assets/`):

```bash
node mm8bdm-modding/scripts/sync-wiki.mjs [wiki-output-root]
```

When omitting the argument, the script searches nearby directories for an English export using signature files (independent of directory names like `MM8BDM-Wiki-Exporter`). You can also set the `MM8BDM_WIKI` environment variable. Commit changes under `references/` after syncing.

## Relationship with Per-Mod [AGENTS.md](http://AGENTS.md)

- **Skill**: Cross-repo reusable engine gotchas + MM8BDM APIs and tutorials.
- **AGENTS.md**: Stays in the specific mod repository (project identity, directory layout, UH naming, `ref/`, and other private project context).

When authoring DECORATE/ACS, both skills will participate automatically based on their descriptions; refer to `zandronum-modding` for engine details and `mm8bdm-modding` for MM8BDM APIs.

## Credits & Attribution

This project is built upon the collective knowledge and contributions of the MM8BDM and Zandronum communities:

- **Official MM8BDM Wiki**: Documentation snapshots under `mm8bdm-modding/references/` are adapted from the [Official MM8BDM Notion Wiki](https://mm8bdm.notion.site/), authored by Trillster and community contributors.
- **Weapon Release Checklist**: Adapted with credit to **StardustMotion**'s [Ultimate New Weapon Checklist (v6b)](https://gist.github.com/StardustMotion/278531046b736b84f637fbfeaba830e6).
- **Zandronum Engine Gotchas & Netcode Patterns**: Compiled in `zandronum-modding/` based on Zandronum source analysis and the [Official MM8BDM Wiki's Netcode Desync Guide](https://mm8bdm.notion.site/DECORATE-the-World-57ad77562c6b489f8217f4e6255e4cf3#37a09dfba2d6405b9e5fa02fa6f24f4b), cross-referenced with community discussions including the [Zandronum Quirks Thread](https://mm8bdm.net/forum/thread/zandronum-quirks-thread-191) and [Trillster's clarification (Post #799)](https://mm8bdm.net/forum/post/799).
- **Mega Man 8-Bit Deathmatch**: Created by CutmanMike and the MM8BDM Development Team.



## Disclaimer

- Mega Man and related characters, names, and assets are trademarks and copyright of Capcom Co., Ltd.
- *Mega Man 8-Bit Deathmatch* is an unofficial, non-commercial fan game.
- This repository is an unofficial tool designed for AI-assisted modding. It is not affiliated with, endorsed by, or sponsored by Capcom Co., Ltd. or the MM8BDM development team.

