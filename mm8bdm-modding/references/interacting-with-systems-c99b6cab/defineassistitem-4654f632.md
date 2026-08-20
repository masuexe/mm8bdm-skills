---
title: "DefineAssistItem"
notion_id: 4654f6320aa74063816ae382b396f8fe
source: https://www.notion.so/4654f6320aa74063816ae382b396f8fe
---

# DefineAssistItem

> 📦 
>
> DTADD.acs

> ⚡ int DefineAssistItem(str itemTag, str itemActor, str itemIcon, int itemAmount, int itemGroup, int itemMap)

## Usage

---

This function adds a new assist item to the internal list of assist items used for map randomization.

### Parameters

- `itemTag`: String - The item's language tag, or its proper name (Ex. `"TAG_EDDIE"` or `"Eddie"`)

- `itemActor`: String - The actor's class name. (Ex. `"EddieSummon"`)

- `itemIcon`: String - The icon's spawn sprite. (Ex. `"WEAPQ0"`)

- `itemAmount`: Int - How many are obtained upon pickup?

- `itemGroup`: Int - The item's group, used for determining if an item can be replaced with another. Accepted values include:
  - `DTADD_GRP_JUMP`: Vertical boost items such as Rush Coil

  - `DTADD_GRP_DASH`: Horizontal boost items such as Item-2

  - `DTADD_GRP_FLIGHT`: Flight items or items with extreme mobility

  - `DTADD_GRP_WEAPON`: Items that augment the weapon such as Beat Support

  - `DTADD_GRP_GIFT`: Items that give you some other item such as Eddie Summon

  - `DTADD_GRP_ATTACK`: Attack summons such as Tango

  - `DTADD_GRP_ESCAPE`: On-demand escapes such as Exit Unit

  - `DTADD_GRP_HEAL`: Items that heal such as E Tanks

  - `DTADD_GRP_RELOAD`: Items that give ammo such as W Tanks

  - `DTADD_GRP_FULLRESTORE`: Items that restore both such as M Tanks

  - `DTADD_GRP_PASSIVE`: Items that give some passive effect such as Energy Balancer

- `itemMap`: Bool - Can you pick this item up from maps?

### Return Value

- Returns the index of the newly added assist item in the internal table.

## Example

---

This is a block of code that would add Wire Adaptor to the list of assist items, assuming that it did not already exist which it does already in base MM8BDM.

```javascript
Script "wire_itemdef" OPEN {
	DefineAssistItem("TAG_WIREADAPTOR", "WireAdaptor", "WADPA0", 2, DTADD_GRP_FLIGHT, true);
}
```

## See Also

---

[Creating Assist Items](./creating-assist-items-d57d327f.md)
