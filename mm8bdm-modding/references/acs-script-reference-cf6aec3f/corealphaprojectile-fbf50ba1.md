---
title: "core_alphaprojectile"
notion_id: fbf50ba148ba4cdda6467f344e25aabd
source: https://www.notion.so/fbf50ba148ba4cdda6467f344e25aabd
---

# core_alphaprojectile

> ⚡ script "core\_alphaprojectile" (int who, int teamMode, int minAlpha, int maxDist) CLIENTSIDE

## Usage

---

This script makes an actor become semitransparent for the given client only, fading in and out with distance.

For use of the TID parameter, you can use [core_getptrtid](./coregetptrtid-bc4f8073.md) to get the actor you want this script to relate to.

> 💡 **Note**: Because this script takes 4 parameters, it is required to call it using [`ACS_NamedExecuteWithResult`](https://zdoom.org/wiki/ACS_NamedExecuteWithResult).

### Parameters

- `who`: int - TID of the person the `teamMode` is relative to.

- `teamMode`: int - The collective this should apply to, can be one the following:
  - `APROJ_ALL`: This actor fades out for <u>everyone</u> who approaches it.

  - `APROJ_TEAM`: This actor fades out for the owner and their team.

  - `APROJ_TEAM_ENEMY`: This actor fades out for the owner’s enemies, but not their allies.

- `minAlpha`: int - Fixed point value of the minimum alpha.

- `maxDist`: int - The farthest distance the transparency effect will apply.
