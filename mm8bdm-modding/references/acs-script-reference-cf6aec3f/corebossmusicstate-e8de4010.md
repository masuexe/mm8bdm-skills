---
title: "core_bossmusicstate"
notion_id: e8de4010c240400b9d09e9ebe96b90e2
source: https://www.notion.so/e8de4010c240400b9d09e9ebe96b90e2
---

# core_bossmusicstate

> ⚡ Script "core\_bossmusicstate" (int Mode, int MusicToValue)

## Usage

---

This script is a catch all script for interacting with default stage music, boss music, intense music, and victory music. Its behavior changes depending on the `Mode` parameter.

### Parameters

- `Mode`: int - Dictates the behavior of the script. Below are valid modes:
  - `BMSF_GETSTATE` (0): Get the value stored as the boss music state

  - `BMSF_SETVAL` (1): Set the value stored in the boss music state, do not change the music

  - `BMSF_SETVALMUS` (2): Set the value stored in the boss music state and change the music

  - `BMSF_GETINTENSE` (3) : Get whether the intense music is currently playing

  - `BMSF_SETINTENSE` (4): Set the intense music to play

- `MusicToValue`: int - When using the `BMSF_SETVAL` or `BMSF_SETVALMUS` as the mode, the following values are accepted:
  - `BMS_STAGE` (0): No boss music playing

  - `BMS_BOSS` (1): Boss music playing

  - `BMS_VICTORY` (2): Victory music playing

  - `BMS_DISABLE` (100): Disables boss music system

> 💡 If intending to use `BMS_SETVAL` with `BMS_DISABLE` in an `OPEN` script, you should have a `Delay(1)` at the beginning of your script to have it execute after the internal `OPEN` script which manages these values.

### Return Value

If using `BMSF_GETSTATE`, this script will return the current boss music state, with 0 meaning stage music, 1 meaning boss music, and 2 meaning victory music. If using `BMSF_GETINTENSE`, this script will return true if the intense music is playing, false otherwise.
