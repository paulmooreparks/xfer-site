---
title: "XFER0403: duplicate key"
description: "Error: duplicate key."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0403

**Error.** Duplicate key.

## What it means

Two pairs in one object have the same key. Keys compare by their characters, whether written bare or as a string, so `a` and `"a"` are the same key.

## An example

From the conformance suite, `invalid/403-duplicate-key`:

```xfer
{ a 1 a 2 }
```

```
$ xfer validate example.xfer
example.xfer:1:7: error XFER0403: duplicate key: the key "a" is already used
```

## How to fix it

Rename one of them, or remove the one you do not want. If both values belong together, make the value a sequence.

## In the specification

Section 5.3, [Objects](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#53-objects), of the specification at `v1.0.0-draft.1`.

## Conformance cases

The suite's cases that expect XFER0403:

- [`invalid/403-duplicate-key`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/403-duplicate-key-bare-and-quoted`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)

[All diagnostic codes](/diag)
