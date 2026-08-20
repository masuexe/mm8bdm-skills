---
title: "AddSpawnFunc"
notion_id: 58042bc1e07b48f1ba8c98268924ddc0
source: https://www.notion.so/58042bc1e07b48f1ba8c98268924ddc0
---

# AddSpawnFunc

> 📦 DTADD.acs

> ⚡ 
>
> int AddSpawnFunc(int type, str name)

## Usage

---

Spawn functions are scripts that execute when specific actors spawn. Scripts can be made to execute on those actors as the activator. This function adds a script to be executed in that list of scripts.

### Parameters

- `type`: int - Which actors call the script
  - `DTADD_SFT_WEP`: 0 - Weapon Token Spawn

  - `DTADD_SFT_ITEM`: 1 - Item Spawn

  - `DTADD_SFT_PARTYBALL`: 2 - Party Ball Spawn

  - `DTADD_SFT_FLAG`: 3 - CTF Flag Spawn (including White Flag)

  - `DTADD_SFT_PROJ`: 4 - Projectile Spawn

  - `DTADD_SFT_PROJCLIENT`: 5 - Projectile Spawn (executed on CLIENTSIDE)

  - `DTADD_SFT_PILLAR`: 6 - Skulltag Score Statue Spawn

- `name`: string - Name of the script to run

> ⚠️ **Note: If defining a spawn function for projectiles to be called on the client-side, you need to call this function in an **`OPEN CLIENTSIDE`** script.**

### Return Value

- Index of the newly added script in the table

## Example

---

An excerpt from core’s scripts which show how to properly use `SFT_PROJ` and `SFT_PROJCLIENT`.

```javascript
script "core_spawnfuncs" OPEN
{
    AddSpawnFunc(DTADD_SFT_PROJ, "core_projtransgive");
}

script "core_spawnfuncs_client" OPEN CLIENTSIDE
{
    AddSpawnFunc(DTADD_SFT_PROJCLIENT, "core_projtransgiveclient");
}
```

## See Also

---

[Hook Functions](./hook-functions-be9ac6f6.md)
