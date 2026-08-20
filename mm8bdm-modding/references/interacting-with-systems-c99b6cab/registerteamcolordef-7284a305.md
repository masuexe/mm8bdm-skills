---
title: "RegisterTeamColorDef"
notion_id: 7284a305a4f7418baeea34362aad0fdb
source: https://www.notion.so/7284a305a4f7418baeea34362aad0fdb
---

# RegisterTeamColorDef

> 📦 DTADD.acs

> ⚡ int RegisterTeamColorDef(str callee)

## Usage

---

This function adds a script name to a list of scripts to run *after* the scripts that parse the user’s team color inputs.

All scripts added to this list will run whenever the client joins the server, enters the game, respawns, spectates, or clicks “Apply Changes” in the team color options menu. The activator is the world.

> 💡 **Note: This function should be run within a **`OPEN CLIENTSIDE`** script*****. *****Failure to do so will cause your team color scripts to not run properly.**

### Parameters

- `callee`: string - Name of the script to run

### Return Value

- Index of the newly added script in the table

## See Also

---

[Team Colors](./team-colors-679c2e93.md)
