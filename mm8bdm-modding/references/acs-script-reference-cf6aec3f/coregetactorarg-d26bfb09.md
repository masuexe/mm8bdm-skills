---
title: "core_GetActorArg"
notion_id: d26bfb09b9104ae8ac543442690788c4
source: https://www.notion.so/d26bfb09b9104ae8ac543442690788c4
---

# core_GetActorArg

> ⚡ script "core\_GetActorArg" (int tid, int argNum)

## Usage

---

Retrieve a value from an actor’s [`args`](https://zdoom.org/wiki/Actor_properties#:~:text=Special-,Args,-arg0%5B%2C%20arg1) array.

> 🚨 **Due to an oversight, this script will currently only work when called from **`CLIENTSIDE`** scripts!**

### Parameters

- `tid`: int - The TID of the actor to get an `arg` from.

- `argNum`: int - Which argument to retrieve from the TID.

### Return Value

Returns the value in the TID’s `args` array at index `argNum`.
