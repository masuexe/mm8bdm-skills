---
title: "core_SetVelPitch"
notion_id: c6c87cee33904973bade8f12fe0899d4
source: https://www.notion.so/c6c87cee33904973bade8f12fe0899d4
---

# core_SetVelPitch

> ⚡ script "core\_SetVelPitch" (int tid1, int tid2)

## Usage

---

Calculates the pitch `tid2` is moving on, and applies it to the pitch of `tid1`.

> 💡 Generally, this script is most useful for setting the pitch of a projectile based off of its own velocity by using 0 for both parameters.

### Parameters

- `tid1`: int - The TID of actor to apply the calculated pitch to.

- `tid2`: int - The TID of the actor whose velocity the pitch is calculated from.
