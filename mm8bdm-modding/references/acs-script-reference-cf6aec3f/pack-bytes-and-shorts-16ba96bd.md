---
title: "Pack Bytes and Shorts"
notion_id: 16ba96bd2e1e45d2ba5534fb8bc34e32
source: https://www.notion.so/16ba96bd2e1e45d2ba5534fb8bc34e32
---

# Pack Bytes and Shorts

---

> ⚠️ **This page assumes you know some basic things about how computers store numbers, because bytes and shorts are fundamentally related to bit operations.**

In ACS, integers are 32-bit numbers. That’s a lot of bits for data, actually. If you multiply numbers in such a way that frees up certain numbers of bits for additional storage, you can easily store a lot more information.

This is the basic principle behind packing and unpacking.

## Byte Packing and Unpacking

---

8 bits equal 1 byte and up to 4 bytes can be packed into a single integer. This makes them very useful for storing and transmitting a lot of smaller-number information across multiple scripts or actors, such as color data or scoreboards. Just need to be mindful that a byte can only be 0-255 inclusive—they cannot be less than 0 or greater than 255.

### Packing Functions

This script and function pack together the given bytes into one integer, then return that integer.

> ⚡ script "core\_packBytes" (int r, int g, int b, int a)

> ⚡ function int PackBytes(int a, int b, int c, int d)

### Unpacking Functions

These scripts/functions return a packed byte from the given packed byte. Which byte they return is based on the called script/function. 1 unpacks the farthest left byte while 4 unpacks the farthest right.

> ⚡ script "core\_unpackByte1" (int x)

> ⚡ script "core\_unpackByte2" (int x)

> ⚡ script "core\_unpackByte3" (int x)

> ⚡ script "core\_unpackByte4" (int x)

> ⚡ function int UnpackByte1(int x)

> ⚡ function int UnpackByte2(int x)

> ⚡ function int UnpackByte3(int x)

> ⚡ function int UnpackByte4(int x)

## Short Packing and Unpacking

---

Up to 2 shorts can be packed into a single int. This can be useful if you have limited space to store larger numbers: 0-65535 inclusive.

This type of packed integer closely resembles a fixed point number and can be used as such. See our [ACS reference guide](../starting-guides-77c9d72f/hello-acs-447542af.md) for more info on the fluid nature of our data types.

### Packing Functions

This script and function pack together the given shorts into one integer, then return that integer.

> ⚡ 
>
> script "core\_packShorts" (int x, int y)

> ⚡ function int PackShorts(int a, int b)

### Unpacking Functions

These scripts/functions return a packed short from the given packed short. Which short they return is based on the called script/function. 1 unpacks the left short while 2 unpacks the right one.

> ⚡ script "core\_unpackShort1" (int x)

> ⚡ script "core\_unpackShort2" (int x)

> ⚡ function int UnpackShort1(int x)

> ⚡ function int UnpackShort2(int x)
