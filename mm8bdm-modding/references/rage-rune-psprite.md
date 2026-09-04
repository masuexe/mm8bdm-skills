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

## Do not put the Rage relative jump on an animation's terminal frame

`A_JumpIfInventory("PlayerPropertyRage", 1, 1)` resolves its `1` against the next owned sprite state. A standalone `goto` after the frame is not an offset target. On the last frame of an animation branch, the jump can therefore point past the actor's state table (a load-time error), or into the next label's animation if another state follows. The latter is especially easy to miss in a weapon that has several labels in one `States` block.

For a final duplicated 1-tic frame, merge the pair into a 2-tic terminal hold and leave the transition explicit:

```cpp
// WRONG — the relative jump does not target the following goto
FireEnd:
    6H43 A 1 Offset(8, 28)
    6H43 A 1 Offset(8, 28) A_JumpIfInventory("PlayerPropertyRage", 1, 1)
    goto Ready1

// CORRECT — 2 written tics normally, 1 real tic under Rage
FireEnd:
    6H43 A 2 Offset(8, 28)
    goto Ready1
```

Use the same terminal-hold form for every final 1-tic pair that would otherwise jump relatively into a following control line or label.
