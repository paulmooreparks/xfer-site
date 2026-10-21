---
title: "XFER0802: key matches no member of the target"
description: "Error: key matches no member of the target."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0802

**Error.** Key matches no member of the target.

## What it means

A key matches no member of the type being read, and the program has asked for unknown keys to be refused. By default mappers skip them.

## An example

```xfer
{ name "Ada" colour "blue" }
```

Read into a type with only a `name` member, with unknown keys refused, `colour` is reported at the key.

## How to fix it

Remove or rename the key, or add the member to the type.

## In the specification

Section 9, [Parsing results and the lossless tree](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#9-parsing-results-and-the-lossless-tree), of the specification at `v1.0.0-draft.1`.

[All diagnostic codes](/diag)
