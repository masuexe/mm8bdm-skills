---
title: "BaseMM8BDMCustWep"
notion_id: d23769c5353f40169bf4355492943907
source: https://www.notion.so/d23769c5353f40169bf4355492943907
---

# BaseMM8BDMCustWep

---

`BaseMM8BDMCustWep` is more or less functionally equivalent to [BaseMM8BDMWep](./basemm8bdmwep-8cc600ca.md), it is just designed to be inherited from for weapons intended to be used by classes which inherit from [CustWepClassBase](./custwepclassbase-6e611b72.md) as they cannot normally use the latter type of the weapon.

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
actor BaseMM8BDMCustWep : BaseMM8BDMWep
{
	Weapon.AmmoUse 0
	Weapon.AmmoGive 0
	Weapon.ammotype "BusterAmmo"
	Dropitem ""
	Inventory.ForbiddenTo ""
	Inventory.RestrictedTo "CustWepClassBase" //helpful with "Give Weapons"
	+INVENTORY.UNDROPPABLE
}
```

## See Also

---

[Creating Weapons](../interacting-with-systems-c99b6cab/creating-weapons-bf312efa.md)

[Creating Classes](../interacting-with-systems-c99b6cab/creating-classes-5863e4dc.md)

[BaseMM8BDMWep](./basemm8bdmwep-8cc600ca.md)
