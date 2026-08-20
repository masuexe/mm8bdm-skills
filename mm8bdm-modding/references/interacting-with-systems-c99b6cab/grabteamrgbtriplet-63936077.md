---
title: "GrabTeamRGBTriplet"
notion_id: 6393607765974dcba7c71344fb5be72e
source: https://www.notion.so/6393607765974dcba7c71344fb5be72e
---

# GrabTeamRGBTriplet

> 📦 
>
> DTADD.acs

> ⚡ int GrabTeamRGBTriplet(int team, int col)

## Usage

---

Intended to be used alongside [RegisterTeamColorDef](./registerteamcolordef-7284a305.md). This function allows you to get one of the RGB triplets for a team, perfect for passing to [CreatePlayerTranslation](./createplayertranslation-d06d89f1.md) and [CreatePlayerTranslationGlow](./createplayertranslationglow-6f7b0592.md).

### Parameters

- `team`: Int - Team to grab the RGB triplet from.

- `col`: Int - The color to grab from a set of colors in a team color. Valid values include:
  - `DTADD_COLOR_LIGHTER`

  - `DTADD_COLOR_SECONDARY`

  - `DTADD_COLOR_PRIMARY`

  - `DTADD_COLOR_DARK`

### Return Value

Returns the selected RGB triplet for the chosen team.

## Example

---

If registered using [RegisterTeamColorDef](./registerteamcolordef-7284a305.md), this script would create a set of team colored translations that add a white outline to the default team color translation.

```c
script "example_outlineteamcolors" (int team, int refTeam) CLIENTSIDE {
    CreatePlayerTranslationGlow(
        TCLR_DEFAULT+team,
        GrabTeamRGBTriplet(refTeam,COLOR_SECONDARY),
        GrabTeamRGBTriplet(refTeam,COLOR_PRIMARY),
				4
    );
}
```

## See Also

---

[Team Colors](./team-colors-679c2e93.md)

[RegisterTeamColorDef](./registerteamcolordef-7284a305.md)
