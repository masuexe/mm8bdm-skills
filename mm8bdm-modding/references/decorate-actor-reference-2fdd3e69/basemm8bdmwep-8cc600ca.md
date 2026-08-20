---
title: "BaseMM8BDMWep"
notion_id: 8cc600ca63704fd59c44528ca4060cac
source: https://www.notion.so/8cc600ca63704fd59c44528ca4060cac
---

# BaseMM8BDMWep

---

All normal weapons in MM8BDM should inherit from `BaseMM8BDMWep` and override the `SpawnLoop` state. This allows the pickup access to all spawn functions of type `SFT_WEP`.

Weapons inheriting from this actor will not be able to be picked up or used by classes which inherit from [CustWepClassBase](./custwepclassbase-6e611b72.md) by design. If you need a weapon to be used by that type of class, look at [BaseMM8BDMCustWep](./basemm8bdmcustwep-d23769c5.md).

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
actor BaseMM8BDMWep0 : Weapon
{
	//$NotAngled
	//$Color 5
	+WEAPON.AMMO_OPTIONAL
	+WEAPON.ALT_AMMO_OPTIONAL
	+WEAPON.ALT_USES_BOTH
	+WEAPON.DONTBOB
	+THRUACTORS
	var int user_RemoveAsWeapon;
	inventory.pickupsound "weapon/weaponup"
	Scale 2.0
	States
	{
		Spawn:
			TNT1 A 0
			TNT1 A 1 A_GiveInventory("MM8BDMWepSpawnFunc",1)
			TNT1 A 0 A_ChangeFlag("THRUACTORS", false)
			TNT1 A 1 A_Jump(256, "SpawnLoop")
			wait
		SpawnLoop:
			WEAP X 1
			loop
	
		DeselectSwap:
			"----" "#" 0 A_JumpIfHealthLower(1,"DeselectDeath")
			"----" "######################" 0 A_Lower
			"----" "#" 1 A_Lower
			Goto DeselectSwap+1
		DeselectDeath:
			"----" "#" 0 A_GunFlash("NoFlash",GFF_NOEXTCHANGE)
			goto DeselectSwap+1
			
		SelectSwap:
			"----" "######################" 0 A_Raise
			"----" "#" 1 A_Raise
			Loop
	
		Altfire:
			"----" A 1 A_JumpIfInventory("MM8BDMPlayer", 1, "Fire")
			"----" A 1 A_Jump(256, "NoAmmo")
			wait
	
		Flashloop:
			TNT1 A 0
			stop
		NoFlash:
			TNT1 A 0
			stop
		Sound.BusterCharge:
			TNT1 A 9 A_PlaySoundEx("weapon/adapterchargeloop","Weapon",0)
			TNT1 A 1 A_JumpIfInventory("WeaponCharge",1,"Sound.BusterCharge")
	    stop
	    Sound.GBCharge:
			TNT1 A 6 A_PlaySoundEx("weapon/gbcharge","Weapon",0)
			TNT1 A 1 A_JumpIfInventory("WeaponCharge",1,"Sound.GBCharge")
			stop
	}
}

actor BaseMM8BDMWep : BaseMM8BDMWep0
{
	Inventory.ForbiddenTo "CustWepClassBase"
	+INVENTORY.RESTRICTABSOLUTELY
}
```

## See Also

---

[Creating Weapons](../interacting-with-systems-c99b6cab/creating-weapons-bf312efa.md)

[BaseMM8BDMCustWep](./basemm8bdmcustwep-d23769c5.md)
