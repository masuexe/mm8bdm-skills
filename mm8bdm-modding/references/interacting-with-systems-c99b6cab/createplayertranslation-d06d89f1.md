---
title: "CreatePlayerTranslation"
notion_id: d06d89f15beb41879070dac7e51f1593
source: https://www.notion.so/d06d89f15beb41879070dac7e51f1593
---

# CreatePlayerTranslation

> 📦 DTADD.acs

> ⚡ int CreatePlayerTranslation(int id, int cyan, int blue)

## Usage

---

This function acts as a shorthand, wrapper for the Zandronum function [`CreateTranslation`](https://zdoom.org/wiki/CreateTranslation). However, it also logs the ID being used into a table for the debug functions, [core_checktranslation](../acs-script-reference-cf6aec3f/corechecktranslation-b2f12d89.md) and [core_logtranslations](../acs-script-reference-cf6aec3f/corelogtranslations-848d101d.md). 

### Parameters

- `id`: Int - The translation ID to reference the created translation by.

- `cyan`: Int - The palette color or RGB triplet to change palette color 192 (cyan) to.

- `blue`: Int - The palette color or RGB triplet to change palette color 198 (blue) to.

> 💡 Note: The RGB triplet being referred to here is an integer that has been packed with bytes such that the first byte is a 0-255 red value, the second byte is a 0-255 green value, and the third byte is a 0-255 blue value.   
>   
> An integer such as this can be made using the `rgbTriplet` function from `COLOFUNC.acs` or it can be done using the functions and scripts noted in the [Pack Bytes and Shorts](../acs-script-reference-cf6aec3f/pack-bytes-and-shorts-16ba96bd.md) page.

### Return Value

- Returns the `id` value handed to the function. A very niche return value, but it has its uses.

## Example

---

This example highlights 2 translations made in base MM8BDM, one that only uses palette colors and another that uses an RGB triplet to show how it is done using the `rgbTriplet` function from `COLOFUNC.acs`.

```javascript
#include "COLOFUNC.acs"

script "core_shortenedcolors" OPEN CLIENTSIDE {
	CreatePlayerTranslation (CLR_JEWELMAN, 4, 36);
	CreatePlayerTranslation (CLR_MAGMAMAN, 216, rgbTriplet(208, 32, 32));
}
```

## See Also

---

[CreatePlayerTranslationGlow](./createplayertranslationglow-6f7b0592.md)

[DefineTranslation](./definetranslation-f3640351.md)
