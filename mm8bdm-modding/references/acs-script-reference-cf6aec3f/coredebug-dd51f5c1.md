---
title: "core_debug"
notion_id: dd51f5c1e0974da5bce6016c8094542e
source: https://www.notion.so/dd51f5c1e0974da5bce6016c8094542e
---

# core_debug

> ⚡ script "core\_debug" (int tid, int who, int debugger)

## Usage

---

> 💡 **This script is not intended to be called in code, instead it is a debug script which should be called via using the **[`pukename`](https://zdoom.org/wiki/CCMDs:Debug#pukename:~:text=cannot%20be%20puked.-,pukename,-%3Cscript%3E%20%5Balways%5D%20%5Barg1)** command in console!**

This debug script can be puked in console to have various bits of information about a given actor be printed onto the screen. The effects of this script can be cancelled by the player denoted by `debugger` pressing crouch.

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

[core_pitdebug](./corepitdebug-8d461b32.md)
