---
title: "core_checkmode"
notion_id: 277200ac533f47d6a6bee2987d90a743
source: https://www.notion.so/277200ac533f47d6a6bee2987d90a743
---

# core_checkmode

> ⚡ script "core\_checkmode" (int checkmode)

## Usage

---

This script can be used to check the game mode that is currently being played. It has multiple modes which specifies the attributes more important to return off of.

### Parameters

- `checkmode`: int - Which type of mode to check for.

### Return Value

The return value of this script actually varies based on the value of `checkmode`.

- If `checkmode` is 0:
  - 0 if the mode is (Team) Deathmatch

  - 1 if the mode is (Team) Possession

  - 2 if the mode is (Team) LMS

  - 3 if the mode is Duel

  - 4 if the mode is (1F)CTF or Team Game

  - 5 if the mode is Terminator

  - 6 if the mode is Skulltag

- if `checkmode` is 1:
  - 0 if the mode is a non-team mode

  - 1 if the mode is a team mode

- if `checkmode` is 2:
  - 0 if neither Instagib nor Buckshot modifier is enabled

  - 1 if the Instagib modifier is enabled

  - 2 if the Buckshot modifier is enabled

## Examples

---

`PartyBall` directly checks for LMS modes on its spawn state. If it’s LMS or a modified mode it disappears.

```c
Spawn:
PRTB A 0
PRTB A 0 A_JumpIf(ACS_NamedExecuteWithResult("core_checkmode",0)==2 || ACS_NamedExecuteWithResult("core_checkmode",2)>0, "End")
PRTB A 0 A_ChangeFlag("FLOATBOB", true)
PRTB A 0 A_GiveInventory("PartyBallSpawnFunc",1)
goto Spawn2
```

`DangerWrapMine` explodes immediately upon landing in CTF, One-Flag, and Skulltag to avoid locking down the objective item too easily.

```c
Spawn:
DWRA I 0
DWRA I 0 A_JumpIf(CallACS("core_checkmode", 0)==4 || CallACS("core_checkmode", 0)==6,"Death")
DWRA I 0 A_SetArg(0, 200)
DWRA I 5 bright
DWRA G 0 A_ChangeFlag("NOCLIP",0)
Goto Mine
```
