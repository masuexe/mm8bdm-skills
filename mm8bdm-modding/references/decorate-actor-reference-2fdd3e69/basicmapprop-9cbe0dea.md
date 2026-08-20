---
title: "BasicMapProp"
notion_id: 9cbe0deafb2c48a196ef30ff560ec41c
source: https://www.notion.so/9cbe0deafb2c48a196ef30ff560ec41c
---

# BasicMapProp

---

`BasicMapProp` is a simple actor used as a jumping off point for making custom props for maps.

This actor by default is a 32x32x32 map unit solid cube that abides by gravity and has the standard MM8BDM visual scale of 2.5.

### DECORATE Definition

> 🚨 **Wait! Stop! Before you copy this actor's definition into your mod, remember the following things:**
>
> - **You do **<u>**not**</u>** need to copy this actor, since it is already defined.**
>
> - **In fact, it's not just useless, it's actually **<u>**harmful**</u>** as it can cause problems.**
>
> - **If you want to use it as a basis, **[**using inheritance**](../starting-guides-77c9d72f/decorate-the-world-57ad7756.md)** is the way to go.**
>
> - **The actor definitions here are put on the wiki for reference purpose only. Learn from them, don't copy them into your mod.**

```c
actor BasicMapProp
{
    //$Category MM8BDM-Props
    +SOLID
    -NOGRAVITY
    height 32
    radius 16
    scale 2.5
    States
    {
		    Spawn:
		        SKEJ AB 10
		        loop
    }
}
```

## Example

---

Here is a custom Fire Metool prop that uses the `BasicMapProp`. It’s been modified from the version that appears on the Robot Museum map to demonstrate this actor as a simple method of creating map props.

```c
actor FireMetMuseumSimple : BasicMapProp
{
	+NOGRAVITY
	+NOINTERACTION
	Scale 1.8
	Translation "4:4=85:85", "216:216=58:58", "227:227=60:60"
	States
	{
		Spawn:
			METF A -1
			stop
	}
}
```
