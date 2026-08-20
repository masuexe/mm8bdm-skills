---
title: "Hazard Pit"
notion_id: f1db99f7e06f4274892f60d976763a6d
source: https://www.notion.so/f1db99f7e06f4274892f60d976763a6d
---

# Hazard Pit

> ⚡ actor MM8BDM\_DeathPit 10569

## Usage

---

`"Hazard Pit"` is a Thing located under the category `MM8BDM-Mapper Tools`. This object is used to create pits that will be sure to frag the player while being detectable via [`"core_checkPit"`](../acs-script-reference-cf6aec3f/corecheckpit-99614e84.md) and variants.

To create a pit in your map, simply place this actor down, click the `Action / Tag / Misc.` tab, and fill in the necessary info.

### Action and Identification

- Argument 1: `Damage` - The amount of damage that the pit should deal per instance of damage. Should typically be set to 256 for an instant kill pit.

- Argument 2: `Damage Type` - Determines the death type and obituary used for the pit. Supported values include the following:
  - `"Drowning"`
    - Means-of-Death: `MOD_WATER` (12)

    - Obituary: `“%o can’t swim.”` 

    - Damage Type: `"Drowning"`

  - `"Mutation"` 
    - Means-of-Death: `MOD_SLIME` (13)

    - Obituary: `“%o mutated.”` 

    - Damage Type: `"Slime"`

  - `"Melting"`
    - Means-of-Death: `MOD_LAVA` (14)

    - Obituary: `“%o melted.”`

    - Damage Type: `"Fire"`

  - `"Crushing"`
    - Means-of-Death: `MOD_CRUSH` (15)

    - Obituary: `“%o was squished.”`

    - Damage Type: `"Crush"`

  - `“Falling”` - Players simply disappear upon death with this type of pit.
    - Means-of-Death: `MOD_FALLING` (17)

    - Obituary: `“%o fell too far.”`

    - Damage Type: `"Falling"`

  - `“Leaving”`
    - Means-of-Death: `MOD_EXIT` (20)

    - Obituary: `“%o tried to leave.”`

    - Damage Type: `"Exit"`

  - `“Freezing”` - Players freeze and break into ice chunks with this type of pit. 
    - Means-of-Death: `MOD_ICE` (24)

    - Obituary: `“%o died.”` 

    - Damage Type: `"Ice"`

  - `“Non-specific”`
    - Means-of-Death: `MOD_MASSACRE` (1000)

    - Obituary: `“%o died.”` 

    - Damage Type: `"Massacre"`

- Argument 3: `Damage Interval` - How often to apply damage to players within the pit in tics.

> 💡 **Tip: **`Damage`** and **`Damage Interval`** can be used together to create a pit that deals slow tick damage. A pit with 10 damage and 10 tics as the damage interval will slowly kill the player by dealing 10 damage every 10 tics that they stand within it. These are commonly used with **`"Mutation"`** and **`"Melting"`** pits.**

- Argument 4: `3D Floor Target Sector` - The tag of the target sector of a 3D floor. Only use this if you are making a pit that is a 3D floor. Make sure that this is the *target sector* of the 3D floor.

- Tag: `Tag` - Which tag to apply the pit to. A tag of 0 will apply a pit to every non-tagged sector in the map!

> 💡 **Warning: **3D floors are tricky to create pits using, but just remember the control sector (the sector outside of the map) and the target sector (the sector inside). The `Tag` field should have the tag of the control sector while the `3D Floor Target Sector` argument should be using the tag of the target sector, also used as the `Sector Tag` in `Sector Set 3D Floor`.

## See Also

---

[Fragging Hazards](../interacting-with-systems-c99b6cab/fragging-hazards-41d2174e.md)

[core_checkPit](../acs-script-reference-cf6aec3f/corecheckpit-99614e84.md)

[core_checkPitByType](../acs-script-reference-cf6aec3f/corecheckpitbytype-3c3e7442.md)
