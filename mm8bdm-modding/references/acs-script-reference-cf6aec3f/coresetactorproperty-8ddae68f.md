---
title: "core_setactorproperty"
notion_id: 8ddae68fb2134f259c277c5012ea1f33
source: https://www.notion.so/8ddae68fb2134f259c277c5012ea1f33
---

# core_setactorproperty

> ⚡ script "core\_setactorproperty" (int prop, int mult, int div)

## Usage

---

Changes the given actor property of the calling actor to the given amount. This is designed to be used from DECORATE to manipulate the calling actor’s property. For players, you may want to consider using [AProp Powerups](../interacting-with-systems-c99b6cab/aprop-powerups-eae6f550.md) instead, however!

For the parameters `mult` and `div`, treat them as a fraction. If you wanted to increase an actor’s speed property to 1.2x, first convert that to a fraction. 1.2 can be represented as 6/5. The resulting call would look like:

```c
ACS_NamedExecuteWithResult("core_setactorproperty", APROP_Speed, 6, 5)
```

If you don’t know how to convert decimal numbers to fractions, see [this article](https://www.mathsisfun.com/converting-decimals-fractions.html) for intel, or [this calculator](https://www.calculatorsoup.com/calculators/math/decimal-to-fraction-calculator.php) to do it for you. Make sure to convert your whole numbers to fractions as well!

### Parameters

- `prop`: int - [Actor property](https://zdoom.org/wiki/SetActorProperty) to change.

- `mult`: int - The numerator of the fraction being applied.

- `div`: int - The denominator of the fraction being applied.

## See Also

---

[AProp Powerups](../interacting-with-systems-c99b6cab/aprop-powerups-eae6f550.md)

[core_getactorproperty](./coregetactorproperty-a48484e9.md)
