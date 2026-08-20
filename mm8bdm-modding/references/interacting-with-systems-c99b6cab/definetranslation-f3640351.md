---
title: "DefineTranslation"
notion_id: f3640351d82a4cf393a6c70dbed9b5c5
source: https://www.notion.so/f3640351d82a4cf393a6c70dbed9b5c5
---

# DefineTranslation

> 📦 DTADD.acs

> ⚡ int DefineTranslation(int id)

## Usage

---

Sometimes it can be useful to use the actual [`CreateTranslation`](https://zdoom.org/wiki/CreateTranslation) call from Zandronum to translate an entire scale of colors, however, it is still good practice to want to let other modders know what translation IDs you’re using.

In that case, you can nest a `DefineTranslation` call into your [`CreateTranslation`](https://zdoom.org/wiki/CreateTranslation) call. Check out the example below for how or why you’d want to do this.

### Parameters

- `id`: Int - The translation ID to put into the list of used translation IDs.

### Return Value

- Returns the `id` given as a parameter, but actually has neat use here.

## Example

---

This is the ice death translation defined in MM8BDM. Note how the `DefineTranslation` is nested as the ID field for [`CreateTranslation`](https://zdoom.org/wiki/CreateTranslation). This is why this set of functions return the ID that they’re given as a parameter.

```javascript
CreateTranslation (DefineTranslation(CLR_ICEDEATH), 192:192=4:4, 198:198=201:201, 5:8=72:72, 243:247=72:72, 208:215=4:4);
```

## See Also

---

[CreatePlayerTranslation](./createplayertranslation-d06d89f1.md)

[CreatePlayerTranslationGlow](./createplayertranslationglow-6f7b0592.md)
