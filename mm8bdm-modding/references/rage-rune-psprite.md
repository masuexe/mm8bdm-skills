# MM8BDM Rage rune and weapon psprite timing

MM8BDM Rage (`PowerDoubleFiringSpeedRune` → `CF_DOUBLEFIRINGSPEED`) makes `P_MovePsprites` decrement weapon/flash `tics` **twice** per game tic (second decrement skipped when tics already hit 0).

| Written duration | Real duration under Rage |
|------------------|---------------------------|
| `1` | still `1` |
| even `N` | `N / 2` |
| odd `N` (e.g. 13) | `⌈N / 2⌉` (e.g. 7) |

Implications:

- Smoothing a fire anim to all `duration 1` frames **disables** this speedup; use `A_JumpIfInventory("PlayerPropertyRage", 1, 1)` skips and/or a separate Rage state branch.
- Holds written as `A 13` inside a Rage-only state are really ~7 tics — double the written value when you need a target real length (e.g. want 13 real → write `26`).
