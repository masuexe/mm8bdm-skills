# Zandronum ACS gotchas

Engine-correct ACS for ACC / Zandronum. Prefer these over C / GZDoom / ZScript habits.

ACS has **one** 32-bit cell type. `int`, `bool`, `str`, and `fixed` are the same storage. A decimal literal (`256.1`, `0.1`) is **16.16 fixed** (`value * 65536`). There is **no** automatic promotion when you mix an integer cell with a fixed literal.

## `int + 0.1` does **not** become `N.1`

`HudMessage` / BARLIB `AdjustedImageDisplay` take **fixed** HUD coords (`320.1` = pixel 320, alignment bits in the fraction). Writing `slotX[i] + 0.1` looks like “convert int 256 to 256.1”. ACC does **not** promote the left operand.

What actually happens:

| Expression | Bits (approx) | `Log(f:…)` | `Log(i:…)` |
|------------|---------------|------------|------------|
| `256.1` (literal) | `256 << 16 \| 0.1*65536` | `256.1` | `16783769` |
| `256 + 0.1` | integer `256` **plus** the bits of `0.1` (`6554`) | **`0.10`** | `6809` |
| `(256 * 1.0) + 0.1` | same as the literal | `256.1` | `16783769` |

`6809 / 65536 ≈ 0.104` — the icon is drawn on the **left** of a 320-wide HUD, often stacked on other left-edge widgets (`Damage Done`, ammo, stats). Two slots (`256+0.1` and `272+0.1`) land ~0.10 apart in HUD units and **overlap**.

```acs
// WRONG — int cell + fixed literal; HudMessage X ≈ 0.10
int slotX[4] = {256, 272, 288, 305};
xhud = slotX[i] + 0.1;

// CORRECT — force the int into 16.16 first
xhud = (slotX[i] * 1.0) + 0.1;

// ALSO CORRECT — write a fixed literal when the value is constant
AdjustedImageDisplay("ICON", "ICON", id, id2, 256.1, 106.1, 256.1, 106.1);
```

Same trap for `-`, `*`, `/` whenever one operand is an integer HUD/map unit and the other is a `.` literal. Prefer `* 1.0` (or a `.0` literal on the integer side) **before** adding the alignment fraction.

Symptom check: `Log(s:"x=", f:x, s:" raw=", i:x)`. If `f` is `0.10` and `raw` is a few thousand, you mixed types. If `f` is `256.1` and `raw` is ~`16783769`, the cell is already fixed.

## Do not paste SBARINFO `fullscreenoffsets` into `HudMessage`

SBARINFO `statusbar …, fullscreenoffsets`: **negative X is from the right** of the screen (`-64` = 64px in from the right).

`SetHudSize(320, 200, …)` + `HudMessage` / BARLIB: **X=0 is the left**. Copying `-64` into ACS draws **off the left** (or wraps into garbage). Convert:

`hudX = 320 + sbarinfoX` → `-64` becomes `256`.

Then apply the previous rule: pass **`256.1`**, not `256` or `256 + 0.1` without `* 1.0`.

Vertical SBARINFO `+center` stats stay on the **ammo-bar cluster**. Do not “fix” overlap by stretching those Y values (e.g. `128/144/160` instead of `155/163/171`) — that was a wrong response to icons that were actually sitting at X≈0 because of the int+fixed bug.

## `#import` does not export `#define` for local array sizes

`#import "lib.acs"` brings in **functions / scripts**, not preprocessor macros. A `#define CAP 4` in the imported library is **not** visible in the importer. Array sizes in the importer must `#define` the same constant locally (or use a literal). Duplicate the `#define` in both files when both need it.
