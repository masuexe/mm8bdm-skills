---
title: "CreatePlayerTranslationGlow"
notion_id: 6f7b0592d0944330b7a030d6e98d07b6
source: https://www.notion.so/6f7b0592d0944330b7a030d6e98d07b6
---

# CreatePlayerTranslationGlow

> 📦 DTADD.acs

> ⚡ int CreatePlayerTranslationGlow(int id, int cyan, int blue, int black)

## Usage

---

This function acts as a shorthand, wrapper for the Zandronum function [`CreateTranslation`](https://zdoom.org/wiki/CreateTranslation). However, it also logs the ID being used into a table for the debug functions, [core_checktranslation](../acs-script-reference-cf6aec3f/corechecktranslation-b2f12d89.md) and [core_logtranslations](../acs-script-reference-cf6aec3f/corelogtranslations-848d101d.md). 

### Parameters

- `id`: Int - The translation ID to reference the created translation by.

- `cyan`: Int - The palette color or RGB triplet to change palette color 192 (cyan) to.

- `blue`: Int - The palette color or RGB triplet to change palette color 198 (blue) to.

- `black`: Int - The palette color or RGB triplet to change various black palette colors to.

> 💡 Note: The RGB triplet being referred to here is an integer that has been packed with bytes such that the first byte is a 0-255 red value, the second byte is a 0-255 green value, and the third byte is a 0-255 blue value.   
>   
> An integer such as this can be made using the `rgbTriplet` function from `COLOFUNC.acs` or it can be done using the functions and scripts noted in the [Pack Bytes and Shorts](../acs-script-reference-cf6aec3f/pack-bytes-and-shorts-16ba96bd.md) page.

### Return Value

- Returns the `id` value handed to the function. A very niche return value, but it has its uses.

## Example

---

These are the translations defined for MM8BDM’s Wild Coil.

```javascript
CreatePlayerTranslation (CLR_WILDCOIL, 109, 238);
CreatePlayerTranslationGlow (CLR_WILDCOILCRG1, 109, 238, 41);
CreatePlayerTranslationGlow (CLR_WILDCOILCRG2, 238, 0, 109);
CreatePlayerTranslationGlow (CLR_WILDCOILCRG3, 0, 109, 238);
```

## See Also

---

[CreatePlayerTranslation](./createplayertranslation-d06d89f1.md)

[DefineTranslation](./definetranslation-f3640351.md)
