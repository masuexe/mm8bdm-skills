---
title: "Team Colors"
notion_id: 679c2e935457413dba70d2375689b089
source: https://www.notion.so/679c2e935457413dba70d2375689b089
---

# Team Colors

---

> ⚠️ 
>
> **Warning: Before considering this material, you should already have experience with **[**DECORATE**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** and **[**ACS**](../starting-guides-77c9d72f/hello-acs-447542af.md)**.**

Because Mega Man 8-Bit Deathmatch has customizable team colors, special care has to be taken when creating new translations based off of the user’s team colors or when trying to make props which are team colored.

This page will detail some of the common use cases when interacting with MM8BDM’s team color system.

## Team Colored Projectiles

---

Team colored projectiles are fairly straight forward to set up. In general, any actor that inherits from [BasicProjectile](../decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md), [BasicFastProjectile](../decorate-actor-reference-2fdd3e69/basicfastprojectile-46b99912.md), [BasicBouncer](../decorate-actor-reference-2fdd3e69/basicbouncer-b8de71dd.md), [BasicExplosion](../decorate-actor-reference-2fdd3e69/basicexplosion-85dc080a.md), or [BasicGraphicEffect](../decorate-actor-reference-2fdd3e69/basicgraphiceffect-95b89f4a.md) already have the mechanisms to have team colors already supported. The only caveat is to make sure that actors inheriting from [BasicGraphicEffect](../decorate-actor-reference-2fdd3e69/basicgraphiceffect-95b89f4a.md) use the `SpawnFrame` state instead of `Spawn`, otherwise that actor will fail to get team colors.

Below is a simpler Crash Bomb which illustrates this inheritance.

```c
actor SimpleCrashBomb : BasicProjectile
{
	DamageType "CrashBomb"
	Obituary "$OB_CRASHBOMB"
	damage (0)
	speed 40
	Radius 6
	Height 6

	States
	{
		Spawn:
			CRAS A 1
			loop
		Death:
			CRAS A 0 A_PlaySound("weapons/mm2/crasbombexplode")
			CRAS A 0 A_SpawnItemEx("SimpleCrashBombExplode", 0, 0, 0, 0, 0, 0, 0, SXF_TRANSFERTRANSLATION)
			TNT1 AAAA 9 A_Explode(24,64,0)
			stop
	}
}

actor SimpleCrashBombExplode : BasicGraphicEffect
{
	+FORCEXYBILLBOARD
	+BRIGHT

	States
	{
		SpawnFrame:
			CRAS KKLMNNOPQQRSTTVWKKLMNNOPQQRSTTVW 1
			stop
	}
}
```

> 💡 **Note that you may see a custom **`A_SpawnItemEX`** flag, **`SXF_WEPFXCOLOR`**, used throughout Mega Man 8-Bit Deathmatch. This custom flag is simply an alias for **`SXF_TRANSFERTRANSLATION`**, meaning it is more or less functionally equivalent.**

In the example above, the `SXF_TRANSFERTRANSLATION` flag of [`A_SpawnItemEX`](https://zdoom.org/wiki/A_SpawnItemEx) is used, but it should be noted that there’s important rules regarding how it can be used with the translations given for team colored projectiles. The translation applied is only applied on the client-side, meaning that only the client knows that that translation has been set for the actor.

What this means in practice is that any actor that does not have the `+CLIENTSIDEONLY` flag set cannot transfer a translation to another actor that does not have the `+CLIENTSIDEONLY` flag set. Any actor, however, can transfer a projectile team color translation to another actor that *is* set with the `+CLIENTSIDEONLY` flag (such as actors inheriting from [BasicGraphicEffect](../decorate-actor-reference-2fdd3e69/basicgraphiceffect-95b89f4a.md)). 

However, you must still take care, because if the server-side actor does not receive the translation in time due to missed packets on the user’s end, the client-side actor may not receive the transferred translation. This is the reason that our client-side FX actors (actors inherited from [BasicGraphicEffect](../decorate-actor-reference-2fdd3e69/basicgraphiceffect-95b89f4a.md)) are designed to obtain the team colored translation themselves also.

> 🚨 **Warning! Because this deals with client-side and server-side aspects, you should **<u>**always**</u>** test this **<u>**online**</u>** for confirmation testing! Just spin up a local server and connect to it locally. It helps to catch easily avoidable errors!**

You can also add the following properties to actors receiving team colors to customize how the team colors look if needed.

- `var int user_NoTranslation` - Disables projectile team colors on this actor

- `var int user_TranslateWhiteColors` - Allows projectile team colors to recolor white.

- `var int user_TranslateBlackColors` - Allows projectile team colors to recolor black.

## Team Color Translations

---

It will often times be useful to be able to create your own, new translation based off of the user’s current team colors. However, without the use of MM8BDM’s systems, there is no good way to guarantee when team colors are changed and when to remake your own translations.

However, with our systems, we have a function in `DTADD.acs` called [RegisterTeamColorDef](./registerteamcolordef-7284a305.md) which will allow you to specify a script which should be called whenever team colors are adjusted.

The example below uses this function alongside more team color translation related functions to create a set of team colors which add a white outline to the base team color translation with translation IDs of 370, 371, 372, and 373, one for each team.

```javascript
#library "TCLRDEMO"
#include "zcommon.acs"

#include "DTADD.acs"

script "teamcol_demo_def" OPEN CLIENTSIDE {
	RegisterTeamColorDef("teamcol_maketranslation");
}

#define TCLR_OUTLINE 370

// next translation ID would go here, 4 IDs after.
#define TCLR_NEXT 374

script "teamcol_maketranslation" (int team, int refTeam) CLIENTSIDE {
	CreatePlayerTranslationGlow(TCLR_OUTLINE + team,
		GrabTeamRGBTriplet(refTeam,COLOR_SECONDARY),
	  GrabTeamRGBTriplet(refTeam,COLOR_PRIMARY),
		4
	);
}
```

Whenever the script in [RegisterTeamColorDef](./registerteamcolordef-7284a305.md) is called, it is called with two arguments, one for the team the translation is being made for, and another for which team should be referenced for grabbing the colors.

The first parameter should be used for incrementing the translation ID while the second should be used for [GrabTeamRGBTriplet](./grabteamrgbtriplet-63936077.md), a function within `DTADD.acs` that allows you to get a given [RGB triplet](../acs-script-reference-cf6aec3f/pack-bytes-and-shorts-16ba96bd.md) for the given team. Parameters for the function are the following:

- `team`: Int - Team to grab the RGB triplet from.

- `col`: Int - The color to grab from a set of colors in a team color. Valid values include:
  - `DTADD_COLOR_LIGHTER`

  - `DTADD_COLOR_SECONDARY`

  - `DTADD_COLOR_PRIMARY`

  - `DTADD_COLOR_DARK`

With this translation created, you could then use [core_chargecolor](../acs-script-reference-cf6aec3f/corechargecolor-cd423b1c.md) as follows.

```javascript
ACS_NamedExecuteWithResult("core_chargecolor", CLR_OUTLINE, TCLR_OUTLINE)
```

## Team Colored Props

---

Making props which are team colored is incredibly easy. All you need to do is set its translation to one of the existing team color translation IDs. Here’s a modified example of a prop from core which will always use the Light Team colors.

```c
actor KemumakinB
{
	PROJECTILE
	Damage 0
	+RIPPER
	+DONTBLAST
	+BLOODLESSIMPACT
	+CLIENTSIDEONLY
	+DONTREFLECT
	scale 2.5
	speed 9
	-SOLID
	+NOGRAVITY
	var int user_direction;
	weaveindexz 31
	States
	{
			Spawn:
				KMUM A 0
				KMUM A 0 A_SetUserVar(user_direction, random(0, 1)*-2+1)
			SpawnLoop:
				KMUM I 0 Thing_SetTranslation(0, TCLR_LIGHT)
				KMUM IIIIIJJK 1 A_Weave(0,1,0,user_direction*8)
				KMUM K 0 A_SpawnItemEX("KemumakinCloud",-16,0,0,0,0,0,0,1)
				goto SpawnLoop
	}
}
```

## See Also

---

[RegisterTeamColorDef](./registerteamcolordef-7284a305.md)

[CreatePlayerTranslation](./createplayertranslation-d06d89f1.md)

[CreatePlayerTranslationGlow](./createplayertranslationglow-6f7b0592.md)

[BasicProjectile](../decorate-actor-reference-2fdd3e69/basicprojectile-4723f2cd.md)

[BasicExplosion](../decorate-actor-reference-2fdd3e69/basicexplosion-85dc080a.md)

[BasicGraphicEffect](../decorate-actor-reference-2fdd3e69/basicgraphiceffect-95b89f4a.md)
