---
title: "core_checktranslation"
notion_id: b2f12d896d2245c1953d85748824935a
source: https://www.notion.so/b2f12d896d2245c1953d85748824935a
---

# core_checktranslation

> ⚡ script "core\_checktranslation" (int id, int idMax) CLIENTSIDE

## Usage

---

> 💡 **This script is not intended to be called in code, instead it is a debug script which should be called via using the **[`pukename`](https://zdoom.org/wiki/CCMDs:Debug#pukename:~:text=cannot%20be%20puked.-,pukename,-%3Cscript%3E%20%5Balways%5D%20%5Barg1)** command in console!**

This script allows you to provide a range of translation IDs and check if they’ve already been used by some other translation created using [CreatePlayerTranslation](../interacting-with-systems-c99b6cab/createplayertranslation-d06d89f1.md), [CreatePlayerTranslationGlow](../interacting-with-systems-c99b6cab/createplayertranslationglow-6f7b0592.md), or [DefineTranslation](../interacting-with-systems-c99b6cab/definetranslation-f3640351.md).

> 💡 **If puking this script offline, you will need to close the console then reopen it to view the results of the run.**

### Parameters

- `id`: int - The minimum translation ID to check

- `idMax`: int - The maximum translation ID to check. If 0 will default to the same as `id`.

## See Also

---

[core_logtranslations](./corelogtranslations-848d101d.md)
