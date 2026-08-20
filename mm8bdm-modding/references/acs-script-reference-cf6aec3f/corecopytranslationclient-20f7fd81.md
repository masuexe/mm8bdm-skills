---
title: "core_copytranslation_client"
notion_id: 20f7fd81e24b48b3a788d9975e4be91d
source: https://www.notion.so/20f7fd81e24b48b3a788d9975e4be91d
---

# core_copytranslation_client

> ⚡ script "core\_copytranslation\_client" (void) CLIENTSIDE

## Usage

---

This script performs the same action as [`“core_copytranslation”`](./corecopytranslation-1d5f7b55.md), but performs it on the client-side only. This can be more efficient when called repeatedly, however, it means that you cannot use [`SXF_TRANSFERTRANSLATION`](https://zdoom.org/wiki/A_SpawnItemEx#:~:text=the%20constant%20names%3A-,SXF_TRANSFERTRANSLATION,-%2D%20the%20spawned%20actor) to transfer the translation to another server-side actor, as the server does not recognize a new translation to transfer.

## See Also

---

[core_copytranslation](./corecopytranslation-1d5f7b55.md)
