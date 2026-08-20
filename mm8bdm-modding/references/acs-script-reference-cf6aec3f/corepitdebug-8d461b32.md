---
title: "core_pitdebug"
notion_id: 8d461b32846b46d0905e5ed6524b59c4
source: https://www.notion.so/8d461b32846b46d0905e5ed6524b59c4
---

# core_pitdebug

> ⚡ script "core\_pitdebug" (int tid, int who, int debugger)

## Usage

---

> 💡 **This script is not intended to be called in code, instead it is a debug script which should be called via using the **[`pukename`](https://zdoom.org/wiki/CCMDs:Debug#pukename:~:text=cannot%20be%20puked.-,pukename,-%3Cscript%3E%20%5Balways%5D%20%5Barg1)** command in console!**

This debug script can be puked in console to see if a given actor is detected as being over a pit or not. The effects of this script can be cancelled by the player denoted by `debugger` pressing crouch.

### Parameters

- `tid`: int - This parameter is only used if `who` is also set. The information obtained will be from one of the actor pointers of the TID passed. Use 0 to refer to activator of the script.

- `who`: int - Determines which actor that information is obtained from. The following values are accepted:
  - 0: Activator of script.

  - 1: `AAPTR_TARGET` of `tid`

  - 2: `AAPTR_MASTER` of `tid`

  - 3: `AAPTR_TRACER` of `tid`

  - 4: `AAPTR_PLAYER_GETTARGET` of `tid`

  - 5: `AAPTR_FRIENDPLAYER` of `tid`

- `debugger`: int - The player number of the player who wants to control the script. This player must hit crouch to disable the debugging.

## See Also

---

[core_debug](./coredebug-dd51f5c1.md)
