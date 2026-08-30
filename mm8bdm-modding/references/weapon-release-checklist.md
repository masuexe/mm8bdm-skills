# MM8BDM v6b weapon pre-release checklist

Agent first pass is **static review** against this list and Zandronum
[DECORATE gotchas](../../zandronum-modding/references/decorate-gotchas.md)
(states, 0-tic loops, flags, `DefineWeapon`). Do not launch Zandronum MCP to
work through this checklist unless the user asked to test, or a runtime-only
symptom cannot be judged from the source.

Map, dedicated-server, and two-client items are human playtests or an
explicitly allowed engine session — not a default agent loop.

If a launch is already allowed, use the
[documented runtime load order](../SKILL.md#runtime-load-order).

The first pass should still prioritize state/actor liveness and online
synchronization in the *source*; those failures are usually the most costly
to diagnose. Items marked **advanced** are conditional and may not apply to a
simple weapon.

This is a reviewed and reorganized adaptation of StardustMotion's
[Ultimate New Weapon Checklist (v6b)](https://gist.github.com/StardustMotion/278531046b736b84f637fbfeaba830e6),
not a list of flags that every weapon should receive. Add a flag or special
case only when it matches the intended behavior, then test that behavior.

## 1. Liveness and cleanup

- [ ] Every weapon-state path eventually reaches a usable state: the player
  can fire again, run out of ammo safely, and switch away. Check primary fire,
  alternate fire, refire, no-ammo, cooldown, select, deselect, and interrupted
  charge paths.
- [ ] No weapon or spawned actor has an all-0-tic cycle. Every deliberate loop
  contains time progression, and every temporary actor has a reachable end.
  See the Zandronum
  [DECORATE gotchas](../../zandronum-modding/references/decorate-gotchas.md)
  for the engine-level liveness rules.
- [ ] Projectiles, helpers, hitboxes, effects, and owner-following actors are
  removed even if the owner dies, becomes a spectator, or disconnects.
- [ ] Player inventory used as state flags is cleared at the correct lifecycle
  boundaries. **Advanced:** test a Cooperative map change, because inventory
  can survive it and accidentally preserve a charge, lock, cooldown, or other
  invalid weapon state.

## 2. Map and movement edge cases

Exercise the weapon itself and every persistent actor it creates in the
following environments:

- [ ] Conveyor belts, using `MM1TIM` as a regression map.
- [ ] Crushers, using `MM4DUS` as a regression map.
- [ ] Moving sectors or platforms, such as the boat in `MM6BLI`.
- [ ] Negative-gravity regions, such as those in `MM9DW3`.
- [ ] Sky surfaces. Decide whether impact behavior requires `+SKYEXPLODE`.
- [ ] Solid moving actors, such as Plant Man platforms and Wave Man bubbles.
- [ ] Water, including entry, submerged travel, impact, bounce, and unwanted
  splash generation.

Also test a `+SOLID` helper for actor trapping and telefrag behavior. A helper
that is safe in open space may still pin a player against geometry or remain
embedded in another actor.

## 3. Combat behavior and compatibility

- [ ] Primary and alternate fire have intentional behavior and ammo costs.
  Decide explicitly whether the mechanic should use a forced cooldown.
- [ ] `Weapon.SlotNumber` agrees with the slot registered through
  [`DefineWeapon`](interacting-with-systems-c99b6cab/defineweapon-6a4db7e0.md)
  or
  [`DefineDoubleAmmoWeapon`](interacting-with-systems-c99b6cab/definedoubleammoweapon-ebfeb97c.md).
- [ ] Every actor that can deal damage, including `A_Explode` helpers, defines
  the intended `DamageType` and obituary. Confirm the resulting player pain
  state and hitstun.
- [ ] Team modes do not harm, debuff, collide with, or otherwise penalize
  allies unless that is deliberate.
- [ ] The behavior is defined for players, monsters, and damageable props such
  as canisters or party balls. **Advanced:** test all three separately when
  ACS, pain states, or per-target hit limits are involved.
- [ ] Shield interaction is deliberate. Use `+THRUGHOST` only when the attack
  is meant to pass through compatible shields.
- [ ] Reflection by actors such as Hanging Tire and Jewel Satellite matches
  the design. If reflection is allowed, make sure `Speed` is meaningful and
  the reflected shot behaves correctly; otherwise consider `+DONTREFLECT`.
- [ ] Blast displacement is intentional. **Advanced:** consider `+DONTBLAST`
  for helpers or projectiles that must not be pushed.
- [ ] Repeated or ripping damage has the intended per-target/per-shot cap.
  Decide whether a hit should also grant temporary protection or other
  `DamageProtection`-style inventory.
  Prefer the facilities already exposed by
  [`BasicProjectile`](decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md),
  such as `user_PierceRipper` or `user_DamageKill`, when they fit.
- [ ] A `+STEPMISSILE` actor has a suitable `MaxStepHeight`.
- [ ] A bouncing actor has an explicit surface policy: floor, ceiling, wall,
  water, and actors. Start with
  [`BasicBouncer`](decorate-actor-reference-2fdd3e69/basicbouncer-b8de71dd.md)
  when its defaults match; otherwise review the individual bounce flags.

## 4. MM8BDM systems

- [ ] Projectiles and effects receive team colors in team modes and online.
  Inheriting from the appropriate MM8BDM base actor is normally safer than
  rebuilding its spawn-function integration.
- [ ] Spread Rune behavior is useful and balanced. If psprite timing matters,
  also test Rage Rune and review
  [Rage rune and weapon psprite timing](rage-rune-psprite.md).
- [ ] Bots can operate the weapon, especially charge mechanics that require
  releasing the fire button.
- [ ] Element-themed attacks spawn the appropriate environment interaction
  helper where applicable: `OilPitIgnite`, `IcePitFreeze`,
  `PropBlowerEffect`, `ElectrifyEffect`, `ConcreteCaseEffect`,
  `SoakifyEffect`, or `ThunderClawPegHelper`. The creating-weapons guide
  [describes their intended uses](interacting-with-systems-c99b6cab/creating-weapons-bf312efa.md#finally-making-the-weapon).
- [ ] Thunder Claw-style attacks interact with pegs when intended.
- [ ] The Training Room entry has an accurate name, description, icon, and
  actor registration through
  [`RegisterTrainingDef`](interacting-with-systems-c99b6cab/registertrainingdef-9ebad3a6.md)
  and
  [`DefineTrainingEntry`](interacting-with-systems-c99b6cab/definetrainingentry-91396e36.md).

## 5. Online synchronization and performance

- [ ] Run a dedicated-server test with at least two clients. Verify fire and
  switch states, ammo, cooldown/charge inventories, projectiles, damage,
  translations, sounds, and HUD elements from both the shooter and observer.
- [ ] Conditional weapon jumps do not leave the client displaying a stale
  psprite. Before changing the implementation, review the Zandronum
  [online `A_Jump*` behavior](../../zandronum-modding/references/decorate-gotchas.md#online-most-a_jump-skip-on-the-client--server-sends-the-frame).
- [ ] Actor creation is bounded under sustained fire, Spread Rune, latency,
  death, and disconnect. The community
  [HUDMessage Actor Tool](https://mm8bdm.net/forum/thread/ultimate-maplist-hudmessage-actor-tool-214?page=1&post=893)
  can help identify spawn-heavy behavior.
- [ ] **Advanced:** move an actor to `+SERVERSIDEONLY` only if clients do not
  need it for rendering or prediction. Re-test all online behavior after the
  change; it is an optimization, not a default.

## 6. Presentation and UI

- [ ] Pickup message, weapon tag, Training Room description, and localized
  `LANGUAGE` entries are present and accurate.
- [ ] Every damage source has the right obituary rather than relying on a
  fallback from an unrelated actor.
- [ ] The expected `[WeaponName]_NormalBar`, `_SecondBar`, or `_ScriptBar`
  actors exist, and both vertical and horizontal HUD modes lay out correctly.
- [ ] A projectile spawned close to the camera does not obscure the shooter's
  view. When appropriate, use
  [`core_alphaprojectile`](acs-script-reference-cf6aec3f/corealphaprojectile-fbf50ba1.md)
  or a deliberately invisible opening animation.
- [ ] `+BRIGHT` matches the intended lighting, `+FORCEXYBILLBOARD` matches the
  sprite's viewing requirements, and `+DONTSPLASH` is used only when the actor
  should not produce terrain/water splashes.

Record which cases are intentionally unsupported. A documented design choice
is different from an untested edge case.
