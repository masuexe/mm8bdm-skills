---
title: "Property Stackers"
notion_id: 0e63b9b2a16247038079c6764b62ad51
source: https://www.notion.so/0e63b9b2a16247038079c6764b62ad51
---

# Property Stackers

## Usage

---

Property stackers are an entire group of scripts present in MM8BDM that allow you to stack the same **boolean effect** on a given player from multiple sources. When toggled on, the script applies the script’s property *immediately*. When turned off, the script will only remove the script’s property **when all other sources have also turned it off.**

Wherever possible, it is recommended to use these scripts to apply any of the following effects to a player to avoid adding or removing these effects unexpectedly.

> 🚨 **All of these scripts should be called using **`ACS_NamedExecuteWithResult`**! The typical **`ACS_NamedExecuteAlways`** can have brief delays on startup which will cause issues when used with these scripts!**

The following property stacker scripts share the same arguments.

### Supported Properties

> ⚡ script "core\_freezeplayer" (int player, int toggle)

Entirely freezes the target player, as if they’ve become completely unable to use any controls.

> ⚡ script "core\_stopplayer" (int player, int toggle)

Prevents the target player from moving, but they can still jump, shoot, and interact with the environment in other ways.

> ⚡ script "core\_groundplayer" (int player, int toggle)

Makes the player unable to use flight such as Rush Jet or air thrust based abilities such as Super Adaptor or Treble Boost. They will still be able to air jump and wall jump, however. For that behavior, look into [`"core_airjumpplayer"`](./property-stackers-0e63b9b2.md) and [`"core_walljumpplayer"`](./property-stackers-0e63b9b2.md).

> ⚡ script "core\_invulnerableplayer" (int player, int toggle)

Grants the player invulnerability, preventing them from taking any damage at all.

> ⚡ script "core\_buddhaplayer" (int player, int toggle)

Grants the player Buddha, preventing the player’s health from being reduced below 1 HP. They still take damage and flinch upon taking hits, however.

> ⚡ script "core\_nonshootableplayer" (int player, int toggle)

Makes the player unable to be directly hit with projectiles. Splash damage can still interact with the player, however.

> ⚡ script "core\_nopushplayer" (int player, int toggle)

Makes the player unable to be pushed or pulled by attacks that displace the enemy, whether by on hit or by area effects.

> ⚡ script "core\_cantseekplayer" (int player, int toggle)

Grants the player immunity to homing shot tracking. This does not make homing shots “forget” the player if they were already seen by the homing shot, however.

> ⚡ script "core\_invisibleplayer" (int player, int toggle)

Grants the player complete invisibility.

> 🚨 
>
> **Due to an oversight, this script currently does not work online!**

> ⚡ script "core\_dontidentifytargetplayer" (int player, int toggle)

The player’s name and information do not display to someone looking directly at them.

> ⚡ script "core\_notargetplayer" (int player, int toggle)

Makes the player unable to be targeted by monsters, as if they were invisible. However, monsters that were already targeting that player will not lose focus.

> ⚡ script “core\_monsterblockplayer” (int player, int toggle)

Makes the player unable to walk through linedefs with the `Block monsters` flag enabled. In practice, these linedefs are usually placed around pits, so this script can be used to make players unable to fall into pits, the way it is typically used for bot players.

### Parameters

- `player`: int - The player to apply the effect to. 0 means the activator, 1 or higher is the [`PlayerNumber()`](https://zdoom.org/wiki/PlayerNumber)+1. (Example: Player 0 is referenced using 1, Player 1 is 2, etc.)

- `toggle`: boolean - True enables the script’s property and adds 1 to its stack. False removes 1 from the script’s property stack and disables the property if the stack is empty.

The following property scripts have additional or modified arguments.

### Special Properties

> ⚡ script "core\_flyplayer" (int player, int toggle, int forced)

Grants the player flight that allows them to rise with jump / fly up and descend with fly down.

### Modified and Additional Parameters

- `toggle`: int - Positive values enable the flight and adds 1 to its stack. Otherwise, 1 is removed from the stack and flight is disabled if the stack is empty. If the toggle value is 2, the player is not stopped upon flight activation.

- `forced`: bool - True makes it such that the flight cannot be disabled by [`"core_groundplayer"`](./property-stackers-0e63b9b2.md). This is useful for effects such as Time Stopper.

> 💡 **Note: If the flight is enabled using the **`forced`** argument, it should also be disabled using the **`forced`** argument. Failure to do so can result in improper flight disabling!**

> ⚡ script "core\_nogravityplayer" (int player, int toggle, int forced)

Grants the player quicker flight that allows them to fly via aiming around. Shares the same parameters as [`"core_flyplayer"`](./property-stackers-0e63b9b2.md), but has lower priority than it.

> ⚡ script "core\_runeplayer" (int player, int toggle, int mode)

Grants the player runes, special buffs, which can be stacked with no interference through using this script.

### Additional Parameter

- `mode`: int - Specifies which rune should be interacted with. The following values are supported:
  - `RUNE_STRENGTH`: Doubles all damage output.

  - `RUNE_RAGE`: Doubles firing speed.

  - `RUNE_DRAIN`: Damage dealt immediately heals for half.

  - `RUNE_SPREAD`: Every projectile shoots out in a spread of 3.

  - `RUNE_RESISTANCE`: Halves all incoming damage.

  - `RUNE_REGENERATION`: You gradually heal HP, up to a max of 100.

  - `RUNE_PROSPERITY`: Doubles healing from all sources.

  - `RUNE_REFLECTION`: Upon taking damage, instantly deal 75% damage back to the target.

  - `RUNE_HIGHJUMP`: Doubles your jump height.

  - `RUNE_HASTE`: Doubles your running speed.

> ⚡ script "core\_unsolidplayer" (int player, int toggle, int damage)

Turns the player unsolid such that they can move through solid actors and other players and handles turning them solid again in a clean manner.

### Modified and Additional Parameters

- `toggle`: int - Takes different values to specify what should occur when a player is unable to become solid again. The following values are supported:
  - `USP_TOGGLEON`: Makes the player unsolid and adds 1 to the stack.

  - `USP_TOGGLEOFF_NONE`: Takes 1 from the stack, which when empty, will repeatedly attempt to make the player solid again, doing nothing on failure.

  - `USP_TOGGLEOFF_DAMAGE`: Takes 1 from the stack, which when empty, will repeatedly attempt to make the player solid again, dealing the specified `damage` every second on failure.

  - `USP_TOGGLEOFF_KILL`: Takes 1 from the stack, which when empty, will repeatedly attempt to make the player solid again, killing the player instantly on failure.

  - `USP_TOGGLEOFF_TELEPORT`: Takes 1 from the stack, which when empty, will repeatedly attempt to make the player solid again, teleporting the player back to a random spawn on failure using [`"core_respawnspot"`](./corerespawnspot-10f045ca.md) with argument of `RS_SAMETEAM`. 

- `damage`: int - Specifies the damage that should be done every second if the solid restoration method is `USP_TOGGLEOFF_DAMAGE`. Not specifying a damage or specifying a damage of 0 defaults it to 1/10th of the player’s max health.

> ⚡ script "core\_airjumpplayer" (int player, int toggle, int mode)

Gives the specified player either infinite air jumps, disabled air jumps, or adds / subtracts from their limit of air jumps.

### Modified and Additional Parameters

- `toggle`: int - If true, adds 1 to the stack of infinite or disabled jumps. If false, takes 1 from the stack of infinite or disabled jumps. If `mode` is `JUMPP_ADDSUB`, this parameter acts as the amount of jumps to add or subtract to the limit. Negative values specify subtraction from the limit.

- `mode`: int - Specifies the behavior of `toggle`. The following values are supported:
  - `JUMPP_ADDSUB`: Specifies that the limit of jumps should be changed.

  - `JUMPP_INFINITE`: Specifies that infinite jumps should be toggled.

  - `JUMPP_DISABLED`: Specifies that disabled jumps should be toggled.

> ⚡ script "core\_walljumpplayer" (int player, int toggle, int mode)

Gives the specified player either infinite wall jumps, disabled wall jumps, or adds / subtracts from their limit of wall jumps. Shares the same parameters and values as [`"core_airjumpplayer"`](./property-stackers-0e63b9b2.md).

## See Also

---

[AProp Powerups](../interacting-with-systems-c99b6cab/aprop-powerups-eae6f550.md)

[core_checkrune](./corecheckrune-696370f5.md)
