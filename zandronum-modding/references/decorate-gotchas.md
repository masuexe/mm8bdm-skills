# Zandronum DECORATE gotchas

Engine-correct patterns for Zandronum DECORATE. Prefer these over GZDoom / ZScript habits.

## Empty inherit-only actors still need `{}`

An actor that only inherits (no properties/states) **must** still have an empty body. A bare inheritance line is illegal:

```cpp
// WRONG — parse error
actor Decoy_F_23TrailFX : StealthS_RailTrailFX

// CORRECT
actor Decoy_F_23TrailFX : StealthS_RailTrailFX {}
```

Do not strip empty `{}` when cleaning properties (e.g. removing `Translation`).

## `CheckInventory` is ACS-only — not a DECORATE expression function

In Zandronum DECORATE, `CheckInventory("Item")` is **not** a valid function in action arguments or expressions. Using it causes a load-time script error (`Call to unknown function 'CheckInventory'`). Inventory checks in DECORATE must use actions such as `A_JumpIfInventory` / `A_TakeInventory` / `A_GiveInventory`, or route through ACS via `CallACS` / `ACS_NamedExecute*`.

```cpp
// WRONG — parse/load error in DECORATE
6H50 A 0 ACS_NamedExecuteAlways("MyLog", 0, CheckInventory("UH_MoveHud_F"))

// CORRECT — jump on inventory in DECORATE
6H50 A 0 A_JumpIfInventory("UH_MoveHud_F", 1, "HasHud")

// CORRECT — read inventory inside ACS (CheckInventory is fine there)
6H50 A 0 ACS_NamedExecuteAlways("MyLog", 0, 0)
// script "MyLog" (int unused) { Log(i:CheckInventory("UH_MoveHud_F")); }
```

## `SPRITE A 0 goto Label` is illegal — put `goto` on its own line

State control keywords (`goto`, `loop`, `wait`, `stop`, `fail`) are **not** valid as the action/parameter of a sprite frame. Writing them on the same line as a frame is a parse error (`Invalid state parameter goto`):

```cpp
// WRONG — parse error
TNT1 A 0 goto DeselectInstant

// CORRECT — dummy frame, then standalone control
TNT1 A 0
goto DeselectInstant
```

The same rule applies to `loop` / `wait` / `stop` / `fail`: never append them after duration (and optional action) on one line. Standalone control lines also do **not** consume `A_Jump*` relative offsets (see below).

## Do not name state labels `Loop` / `Wait` / `Stop` / `Fail` / `Goto`

State control keywords are reserved. A **label** with the same name (case-insensitive) is not a normal state name — the parser treats the token as a control keyword / mis-parses the next line and reports:

`Sprite names must be exactly 4 characters`

```cpp
// WRONG — label "Loop" collides with keyword loop
Spawn:
    TNT1 A 0
Loop:
    TNT1 A 1 ACS_NamedExecuteAlways("uh_radiuspull", 0, 10, 128, 0)
    goto Loop

// CORRECT — use a non-keyword label
Spawn:
    TNT1 A 0
    goto AuraTick
AuraTick:
    TNT1 A 1 ACS_NamedExecuteAlways("uh_radiuspull", 0, 10, 128, 0)
    goto AuraTick
```

Same ban for labels named `Wait`, `Stop`, `Fail`, or `Goto`. Prefer descriptive names (`AuraTick`, `SpawnLoop`, `DoT`).

## `A_Jump*` label targets need a sprite frame — not bare `stop`

A state label that is only a control keyword (`stop` / `goto` / …) is **not** a valid `A_Jump*` / `A_JumpIf*` destination. The engine reports `Jump target 'Label' not found in ActorName`.

Give the label at least one dummy frame (`TNT1 A 0` or any `SPRITE F 0`), then the control:

```cpp
// WRONG — Jump target 'No' not found in EdenIpecacPoisonStart_P
Pickup:
    TNT1 A 0 A_JumpIf(CallACS("rz_ShouldPoison") == 0, "No")
    TNT1 A 0 ACS_NamedExecuteAlways("rz_SpawnDoT", 0)
No:
    stop

// CORRECT — label has a frame before stop
Pickup:
    TNT1 A 0 A_JumpIf(CallACS("rz_ShouldPoison") == 0, "No")
    TNT1 A 0 ACS_NamedExecuteAlways("rz_SpawnDoT", 0)
No:
    TNT1 A 0
    stop
```

Same trap for fail/skip labels that only contain `stop` after an `A_JumpIfInventory` / `A_JumpIf`.

## Relative offsets ignore standalone state control instructions

Relative offsets used by `A_Jump*` functions:

- **include** the state containing the `A_Jump*` call;
- **exclude** standalone state control instructions (`goto`, `loop`, `wait`, `stop`, `fail`).

A relative offset of **1** targets the very next state frame. Standalone control instructions do **not** consume an offset.

```cpp
ReadyX:
    8H00 A 0 A_JumpIfInventory("MyAmmo", 200, 2)
    8H00 A 2 A_WeaponReady                    // offset 1
    goto ReadyGive                             // not counted
    8H00 A 2 A_WeaponReady(WRF_ALLOWRELOAD)    // offset 2
```

Do **not** write `SPRITE A N goto Label` on one line — that is a parse error. Use a frame plus a following standalone `goto`.

A second `goto` after that **overwrites** the previous frame's next state (it is not unreachable dead code). Fail-path `goto Ready` must come *before* the success frames, never after `goto DeselectInstant`:

```cpp
// WRONG — second goto wins; success falls through to Ready instead of Deselect
TNT1 A 0
goto DeselectInstant
Goto Ready2

// CORRECT
6H50 A 0 A_JumpIf(CallACS("uh_DoMove"), 2)
6H50 A 0
Goto Ready2              // fail path (offset 1)
TNT1 A 0                 // success (offset 2)
goto DeselectInstant
```

## 0-tic loops are forbidden — they crash Zandronum

Every state loop cycle must contain at least one frame with duration >= 1. A loop where **all** frames in the cycle have duration 0 will execute infinitely in a single tic and crash the game.

```cpp
// WRONG — crashes
ReadyXGive:
    8H00 A 0 A_GiveInventory("UnholyBossAmmo200",4)
    loop

// CORRECT
ReadyXGive:
    8H00 A 1 A_GiveInventory("UnholyBossAmmo200",4)
    loop
```

This also applies to implicit cycles formed by `goto`. If `ReadyXGive` does `goto ReadyX` and `ReadyX` starts with 0-tic frames that eventually lead back to `ReadyXGive`, the cycle must include at least one non-zero duration somewhere on that path — typically the `A_WeaponReady` frame serves this purpose.

## `loop` jumps to the nearest state label, not to the parent

`loop` always goes to the **most recent** state label — which is the current state's own label, not the previous state. Use `goto <parent>` to return to the parent ready state.

```cpp
// WRONG — loops within Give, never calling A_WeaponReady again
ReadyXGive:
    8H00 A 1 A_GiveInventory("MyAmmo",4)
    loop

// CORRECT
ReadyXGive:
    8H00 A 1 A_GiveInventory("MyAmmo",4)
    goto ReadyX
```

## `Offset(0, y)` does not clear X — and `Offset(x, 0)` does not clear Y

In `P_SetPsprite`, Misc1/Misc2 from `Offset` are applied only when **non-zero**:

```cpp
if (state->GetMisc1()) psp->sx = state->GetMisc1()<<FRACBITS;
if (state->GetMisc2()) psp->sy = state->GetMisc2()<<FRACBITS;
```

So `Offset(0, 42)` after `Offset(2, 46)` leaves **sx = 2** (only sy becomes 42). Writing `Offset(0, y)` does **not** mean “absolute X = 0”.

```cpp
// WRONG — intends center-X settle; sx stays 2
8H19 A 1 Offset(2, 46)
8H19 A 1 Offset(0, 42)
8H19 A 1 Offset(0, 36)

// CORRECT — reset both axes, then Y-only motion keeps sx at 0
8H19 A 1 Offset(2, 46)
8H19 A 0 A_WeaponReady(14)
8H19 A 1 Offset(0, 42)
8H19 A 1 Offset(0, 36)

// ALSO CORRECT — keep stepping X with non-zero Misc1 until the final clear
8H19 A 1 Offset(2, 46)
8H19 A 1 Offset(1, 42)
8H19 A 1 A_WeaponReady(14)
```

To force absolute ready position `(sx=0, sy=WEAPONTOP)`, call `A_WeaponReady` **without** `WRF_NoBob` so `DoReadyWeaponToBob` runs. `A_WeaponReady(14)` (`14 = NoSwitch|NoFire`) still resets psprite coords.

## Converting composite `TEXTURES` offsets to weapon `Offset`

When replacing a first-person composite sprite with its base sprite plus a DECORATE `Offset`, do not use the target `TEXTURES` offset minus the base offset directly. In this MM8BDM weapon layout, the weapon psprite uses the opposite displacement and starts from the default Y coordinate 32.

For a base composite `B` and a target composite `T`, when the base frame is shown at the normal weapon position:

```text
weapon X = B.texture X - T.texture X
weapon Y = 32 + B.texture Y - T.texture Y
```

For example, `6H59I0` has `(-268, 46)` and `6H59J0` has `(-198, 4)`, so replacing J with I requires:

```cpp
6H59 I 1 Offset(-70, 74)
```

The corresponding Eden hand animation values are:

```text
J/K = (-70, 74), (-121, 114)
M/N = (-25, 56), (-33, 84)
P/Q = (70, 74), (121, 114)
S/T = (25, 56), (33, 84)
```

The earlier wrong conversion used `T - B`, producing `(70, -42)` for J. If an animation switches from an offset base group to another base group, reset the psprite first with `A_WeaponReady(14)`; `Offset(0, y)` does not clear the previous X coordinate.

## Weapon `Flash` shares weapon `sx`/`sy` every tic

At the end of `P_MovePsprites`, Zandronum copies weapon coords onto the flash layer:

```cpp
player->psprites[ps_flash].sx = player->psprites[ps_weapon].sx;
player->psprites[ps_flash].sy = player->psprites[ps_weapon].sy;
```

`A_GunFlash` Flash-state `Offset(...)` cannot diverge from the weapon layer. For different relative placement, bake deltas into TEXTURES (or put the overlay animation on the weapon layer). Zandronum has no `A_Overlay` / `A_OverlayOffset`.

## The first frame of the Spawn state never runs its action — put a dummy `TNT1 A 0` before it

When an actor is created, `AActor::StaticSpawn` sets the Spawn state **directly**, bypassing `SetState`, so the first frame's action is never called.

On the actor's first tick the state machine jumps straight to `state->GetNextState()`, skipping the first frame entirely. State actions only run when a state is **entered via `SetState`**.

```cpp
// WRONG — the ACS call never executes
Spawn:
    TNT1 A 0 ACS_NamedExecuteWithResult("uh_CopyPointerAnglePitch", 2, 0)
    X_4D JK 4
    loop

// CORRECT — dummy first frame; the action frame runs on the first tick
Spawn:
    TNT1 A 0
    TNT1 A 0 ACS_NamedExecuteWithResult("uh_CopyPointerAnglePitch", 2, 0)
    X_4D JK 4
    loop
```

Scope: this only applies to the **initial Spawn-state entry at actor creation**. States entered later via `SetState` (Death, Bounce, Pain, …) run their first frame's action normally. If an actor is later forced back into its Spawn state via `SetState(SpawnState)`, the action *does* run.

## DECORATE expressions can read native Actor fields — angles are float degrees

The expression evaluator exposes native `Actor` fields as readable variables:

- `angle_t angle`, `angle_t pitch` — read as **float degrees** (0–360; pitch: positive = down).
- `fixed_t x, y, z, velx, vely, velz, floorz, ceilingz, alpha, scaleX, scaleY` — floats in map units (fixed → `/65536.`).
- `int health, mass, tid, special, damage, score`, `args[5]` — plain ints.

Usable anywhere an expression is, e.g. `A_SpawnItemEx` velocity args:

```cpp
// velocity = Speed along the actor's aim (pitch). `sin(-pitch)` matches
// the engine's `vz = -sin(pitch)` convention.
A_SpawnItemEx("SomeShot", 0, 0, 0, cos(pitch)*Speed, 0, sin(-pitch)*Speed, 0)
```

`pitch` reads the **calling actor's own** `pitch` field. Do not route these through ACS when the native field is equivalent.

## Weapon `Ready` first sprite frame must exist — otherwise `TryPickup` fails

`AWeapon::TryPickup` refuses the weapon when the first `Ready` state's sprite/frame is missing:

```cpp
FState * ReadyState = FindState(NAME_Ready);
if (ReadyState != NULL &&
    ReadyState->GetFrame() < sprites[ReadyState->sprite].numframes)
{
    return Super::TryPickup (toucher);
}
return false;
```

The actor still **parses**. Online/offline, the player never receives it (`give`, pickup, or select). `TNT1` always exists. A `Ready` line whose sprite lump was never loaded (`XXXX A …` with no `XXXXA*` graphic) fails this check.

Abstract weapon bases with **no** `Ready`/`Select`/`Deselect`/`Fire` at all are allowed (no warning). Once any of those states exist, all four are required.

```cpp
// WRONG — Ready sprite has no graphic; TryPickup returns false
Ready:
    NOPE A 1 A_WeaponReady
    loop

// CORRECT — real sprite, or TNT1 if the ready anim is entered later
Ready:
    TNT1 A 0
    8H00 A 1 A_WeaponReady
    loop
```

## Online: client-side prediction and `A_Jump*` desyncs

Zandronum operates on a client-server architecture with client-side prediction. Understanding how the engine predicts states is essential to avoiding online desyncs and visual glitches.

### How Zandronum predicts `A_Jump*`

1. **Most jumps predict `FALSE` on clients**:
   For non-`+CLIENTSIDEONLY` actors, `A_Jump`, `A_JumpIf`, `A_JumpIfHealthLower`, and similar functions evaluate on the client but **skip the actual jump** (`NETWORK_InClientMode()` returns immediately). The client predicts that the jump was not taken and proceeds to the next frame. The server evaluates the jump authoritatively and sends the corrected state packet (`SetPlayerPSprite` for weapons, actor state sync for props/monsters).
2. **Local inventory exception (`A_JumpIfInventory`)**:
   `A_JumpIfInventory` and `A_JumpIfInTargetInventory` **do** predict locally on the local player's weapon psprites, because the client tracks the local player's inventory. (Do not rely on this for other players or non-player actors, as their full inventory is not synchronized to every client).
3. **The resulting symptom**:
   Until the server's update packet arrives (1 full RTT), the client executes the fall-through frames. If the server took the jump, the client snaps to the server's state upon packet arrival, causing a visible flicker or rubberbanding.

### Recommended pattern: Align with prediction (Condition Inversion)

As clarified by the MM8BDM development team ([Trillster, Post #799](https://mm8bdm.net/forum/post/799) and the official wiki's *DECORATE the World* guide): **do not fight client prediction; work with it**.

Since the client always predicts `A_Jump*` to be false, structure your states so that the **fall-through path is the most likely, continuous action**, and reserve the jump for the infrequent or terminal condition:

```cpp
// POOR — jumps on the common airborne state; client predicts false and flickers Spawn every frame
Spawn:
    EMEG A 0
    EMEG A 1 A_JumpIf(!CallACS("core_checkfooting"), "Leaping")
    loop
Leaping:
    EMEG B 1
    ...

// RECOMMENDED (Condition Inversion) — fall-through is the common airborne state; jump only on landing
Spawn:
    EMEG A 0
Leaping:
    EMEG B 1 A_JumpIf(CallACS("core_checkfooting"), "Landed")
    loop
Landed:
    EMEG A 1
    goto Leaping
```

With condition inversion, the client's prediction is correct the vast majority of ticks, producing smooth visuals with negligible server correction.

### Zero-latency weapon checks: Inventory token delegation

`A_JumpIf(CallACS("..."))` on a weapon cannot steer local weapon behavior instantaneously because:
- On the client, `A_JumpIf` skips the jump.
- `CLIENTSIDE` ACS cannot be used as an `A_JumpIf` condition: the server never executes `CLIENTSIDE` scripts (returns 0), so the server never jumps.
- Server-side ACS requires a full roundtrip (ping) before the weapon state updates.

**Solution**: Use `A_JumpIfInventory` on the weapon psprite. If complex calculation is required, execute ACS in the background to grant or revoke an inventory token, then jump on that token in DECORATE:

```cpp
// WRONG — client skips jump; weapon fire/HUD lags by player ping
Fire:
    TNT1 A 0 A_JumpIf(CallACS("my_check"), "DoFire")
    goto Ready

// CORRECT — A_JumpIfInventory predicts immediately on the local weapon
Fire:
    TNT1 A 0 A_JumpIfInventory("CanFireToken", 1, "DoFire")
    goto Ready
```

### Discouraged legacy pattern: The `A_Jump(256, 2) + wait` buffer

A legacy trick historically suggested on forums (e.g. *Zandronum Quirks Thread #191*) used an unconditional jump combined with `wait`:

```cpp
// DISCOURAGED LEGACY WORKAROUND
TNT1 A 1 A_Jump(256, 2)
wait
TNT1 A 0
// Continuation...
```

**Why this is discouraged in modern modding:**
- `wait` sets `NextState` to the current state, causing the client to loop in place until the server state packet arrives.
- **Packet loss / high ping vulnerability**: If the server update packet drops or is delayed, the client remains trapped in the `wait` loop indefinitely, causing weapon freezing or harsh stutter.
- It completely disables client prediction instead of taking advantage of it. Prefer **prediction alignment** or **inventory tokens** whenever possible.

## `CustomInventory` cannot spawn `+CLIENTSIDEONLY` actors online (server never creates them)

`NETWORK_ShouldActorNotBeSpawned` skips the spawn on the server when the spawn type (or `SXF_CLIENTSIDE`) is client-only. CustomInventory `Pickup`/`Use` runs via `CallStateChain` with `self` = **owner**, who is not `CLIENTSIDEONLY`, so the server drops the spawn.

Clients only re-run that chain when they themselves `CallTryPickup` / `UseInventory`. A Pickup-only CustomInventory (no `Use` state) `GoAwayAndDie`s on the server and is not given to the client, so Pickup never runs there either. The FX never appears online.

```cpp
// WRONG — server skips the CSO spawn; world Pickup-only items never re-run on the client
actor SpawnMyFX : CustomInventory
{
    States
    {
    Pickup:
        TNT1 A 0 A_SpawnItemEx("MyClientFX", 0, 0, 0)
        stop
    }
}

actor MyClientFX
{
    +CLIENTSIDEONLY
    // …
}

// CORRECT — spawn CSO FX from a weapon psprite (client predicts A_SpawnItemEx)
Fire:
    TNT1 A 0 A_SpawnItemEx("MyClientFX", 0, 0, 0, 0, 0, 0, 0, SXF_CLIENTSIDE)
```

Spawn `+CLIENTSIDEONLY` from the weapon layer or from an actor that is already `CLIENTSIDEONLY`, not from CustomInventory.

## `CustomInventory` Give/Take syncs inventory to clients (weapon Give/Take does not)

`A_GiveInventory` / `A_TakeInventory` from a **weapon/flash** psprite set `bNeedClientUpdate = false`: both sides predict, the server does **not** send `GiveInventory`. Predicted ammo/HUD can drift.

The same calls from CustomInventory `Pickup`/`Use` (`CallStateChain`, `statecall != NULL`) are **not** psprite calls, so the server sends `GiveInventoryNotOverwritingAmount` / `TakeInventory` with the owner's real amount. A net-zero Give+Take still overwrites the client's count — that is the ammo-bar resync trick:

```cpp
actor ResyncMyAmmo : CustomInventory
{
    States
    {
    Pickup:
        TNT1 A 0 A_GiveInventory("GenericAmmo", 1)
        TNT1 A 0 A_TakeInventory("GenericAmmo", 1)
        stop
    }
}
```

Give this item (from ACS, another CustomInventory, etc.) when the bar is desynced. Do not expect the same Give+Take on a weapon state to repair the bar.
