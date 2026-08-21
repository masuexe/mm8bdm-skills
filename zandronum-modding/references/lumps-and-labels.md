# Special lumps, state labels, and ACC

## Engine compatibility

Target: **Zandronum only** (based on ZDoom 2.8pre-441-g458e1b1 and GZDoom 1.8.6).

Do not use:

- ZScript
- post ZDoom 2.8pre-441-g458e1b1 language features
- post GZDoom 1.8.6 language features

If uncertain, assume the feature is **not** available.

## Special lump naming

Zandronum identifies special lumps by an **8-character uppercase name derived from the file basename after stripping the last extension**. Extensions are **not** part of the lump identity.

Engine PK3 load path (`FResourceLump::LumpNameSetup`):

1. Take the path segment after the last `/`
2. Strip everything from the **last** `.` onward (no `.` → keep the whole name)
3. Uppercase and truncate to 8 characters → that is the lump `Name` used by `FindLump`

| On disk | Lump `Name` |
|---------|-------------|
| `DECORATE` | `DECORATE` |
| `DECORATE.txt` | `DECORATE` |
| `DECORATE.whatever` | `DECORATE` |
| `LOADACS.txt` | `LOADACS` |
| `loadacs` | `LOADACS` |

Implications:

- Never require an exact full filename when matching special lumps. Strip the last extension, compare case-insensitively (first 8 chars).
- Real mods commonly use `*.txt` (`LOADACS.txt`, `DECORATE.txt`, `MAPINFO.txt`). Bare-name-only matching is wrong.
- Root-directory lumps enter the global namespace. Files under unmapped dirs (e.g. `actors/`) are **not** found via `FindLump("DECORATE")`; they are usually pulled in via `#include` with a full path.
- Editor language associations (`.dec`, `.acs`) do **not** change how the engine names lumps.

## ACC and ACS extensions

ACC does **not** require `.acs` if the caller already passes a name with an extension (`MS_SuggestFileExt` only appends `.acs` when there is no `.`). `#include` paths are similarly free-form. Prefer matching sources by library / `#library` name and path.

ACC searches its **own executable directory** for standard libraries (`zcommon.acs`). Include path resolution must add the ACC directory. Nested project includes also need the source tree (and often its subdirectories).

## DECORATE state labels (engine string rules)

Source of truth: Zandronum `thingdef_states.cpp` (`ParseStateString`), `p_states.cpp`, `sc_man_scanner.re` (DECORATE **CMode**), `thingdef_parse.cpp` (state args `'L'`/`'l'`).

### How a label path is built

`ParseStateString`:

1. `MustGetString()` → one **segment**
2. Optional `::` + another string → `ClassOrSuper::Segment` (class-scoped goto)
3. Zero or more `.` + string → append segments (`Flash.AnimA`)

`MakeStateNameList` / `FindStateByString` split on `.` only (also remaps legacy names like `XDeath` → `Death.Extreme`).

### Unquoted segments (label lines and `goto`)

DECORATE uses `FScanner` with **CMode**. Among printable ASCII, an unquoted label **segment** may only contain:

| Allowed | Notes |
|---------|--------|
| `A–Z` `a–z` | Letters (case-insensitive at lookup) |
| `0–9` | Digits; a segment **may start with a digit** |
| `_` | Underscore |
| `'` | Apostrophe |

**Not** allowed: space, `"`, and punctuation in the CMode stop set (including `-`, `$`, `#`, etc.).

Also do **not** use state control keywords as label names (`Loop`, `Wait`, `Stop`, `Fail`, `Goto` — case-insensitive). That yields `Sprite names must be exactly 4 characters` (see [decorate-gotchas.md](decorate-gotchas.md)).

Separators (not part of a segment):

| Token | Role |
|-------|------|
| `.` | Child / dotted path (`Flash.AnimA`) |
| `::` | Class scope (`Super::See`) |
| `:` | Ends a label definition (`Flash:`) |
| `+` number | Goto offset (`goto See+1`) |

### Quoted state arguments

Action params typed as state use `MustGetToken(TK_StringConst)` — the name **must** be in `"..."`. Inside quotes, characters illegal in unquoted segments are allowed (rare). Empty string / `"None"` / `"*"` have special meanings for some call sites.

### Definition forms that yield `Flash.AnimA`

1. Single dotted label line: `Flash.AnimA:`
2. Consecutive labels before frames: `Flash:` then `AnimA:` with only blank/comment lines between

Unquoted segment regex (printable ASCII):

```text
[A-Za-z0-9_']+(?:\.[A-Za-z0-9_']+)*
```

Do **not** require a leading letter. Do **not** treat `-` / `$` as part of unquoted labels.
