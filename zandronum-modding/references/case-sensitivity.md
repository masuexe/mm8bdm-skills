# Case sensitivity (Zandronum / ACC)

Most **names and keywords** are case-insensitive. **ACS string contents** and a few string APIs are case-sensitive. Do not assume C-style case sensitivity for class, script, or lump names.

Authority: Zandronum `name.cpp` (`FName` + `stricmp`), `sc_man.cpp` (`FScanner::Compare`), `p_acs.cpp` (string pool / `strcmp` vs `stricmp`), ACC `token.c` (`MS_StrLwr` before keyword/symbol lookup).

## Case-insensitive (usual rule)

| Area | Behavior |
|------|----------|
| DECORATE keywords, properties, flags | `FScanner::Compare` → `stricmp` |
| Actor / class names | `FName` / `PClass::FindClass` — `Foo` and `foo` are the same class |
| State labels / `goto` targets | Labels are `FName`; `See` and `see` match |
| Named ACS scripts | Loaded into `FName`; `CallACS("Core_Foo")` matches `Script "core_foo"` |
| Inventory / Spawn class strings | Looked up as class `FName` (`CheckInventory`, `Spawn`, …) |
| Special lump identity | Basename → strip last ext → **uppercase** → max 8 (`decorate.txt` = `DECORATE`) |
| Texture / flat names | `MakeKey` (`SuperFastHashI`) + `stricmp` |
| SNDINFO logical sound names | `S_FindSound` uses case-insensitive match |
| LANGUAGE string **keys** | `MakeKey` + `stricmp` |
| ACC keywords and identifiers | Token lowercased (`MS_StrLwr`) before keyword/symbol tables — `Script`/`script`, `MyVar`/`myvar` collide |

Reserved DECORATE state controls (`Loop` / `Wait` / `Stop` / `Fail` / `Goto`) are reserved **case-insensitively** — do not use them as label names.

## Case-sensitive

| Area | Behavior |
|------|----------|
| ACS string **literals / pool** | Pool uses case-sensitive `SuperFastHash`; `"Foo"` and `"foo"` are different strings |
| ACS `==` on strings | Compares string identities / contents with case; mismatch if casing differs |
| ACS `StrCmp` | Case-sensitive (`strcmp`) |
| ACS `StrICmp` | Case-insensitive (`stricmp`) — use when casing must not matter |
| Printed / HUD text, obituaries, tags | Displayed as stored; casing is part of the text |
| `#include` / `#library` **paths on disk** | OS filesystem rules (Linux is case-sensitive; Windows usually is not) |
| `#define` token text after ACC lowercasing of identifiers | Macros that rely on exact spelling still go through the same lowered identifier path for names; string bodies in quotes keep case |

## Practical rules

1. Treat DECORATE and ACS **identifiers** (actors, scripts, states, inventory types, textures, sounds, LANGUAGE keys) as case-insensitive for matching.
2. Treat **quoted ACS string data** as case-sensitive unless you compare with `StrICmp` or the API documents otherwise.
3. Prefer one consistent casing in source (project style), but do not “fix” a missing actor by only changing letter case — if lookup failed, the name or load order is wrong.
4. Never invent a second actor/script that differs only by case; the engine/ACC will collapse or conflict them.
