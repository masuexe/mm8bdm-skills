---
title: "core_logtranslations"
notion_id: 848d101d944b4b719bf3d029bdf244e2
source: https://www.notion.so/848d101d944b4b719bf3d029bdf244e2
---

# core_logtranslations

> ⚡ script "core\_logtranslations" (void) CLIENTSIDE

## Usage

---

> 💡 **This script is not intended to be called in code, instead it is a debug script which should be called via using the **[`pukename`](https://zdoom.org/wiki/CCMDs:Debug#pukename:~:text=cannot%20be%20puked.-,pukename,-%3Cscript%3E%20%5Balways%5D%20%5Barg1)** command in console!**

This script allows you to view all the translation IDs which are currently in use by other translations created using [CreatePlayerTranslation](../interacting-with-systems-c99b6cab/createplayertranslation-d06d89f1.md), [CreatePlayerTranslationGlow](../interacting-with-systems-c99b6cab/createplayertranslationglow-6f7b0592.md), or [DefineTranslation](../interacting-with-systems-c99b6cab/definetranslation-f3640351.md).

It will log the lowest translation ID, the highest translation ID, as well as the entire list of IDs used.

> 💡 **If puking this script offline, you will need to close the console then reopen it to view the results of the run.**

## See Also

---

[core_checktranslation](./corechecktranslation-b2f12d89.md)
