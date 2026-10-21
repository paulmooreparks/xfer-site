---
title: "XFER0406: unexpected closing bracket"
description: "Error: unexpected closing bracket."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0406

**Error.** Unexpected closing bracket.

## What it means

A closing bracket has no open object or sequence to close, or closes the wrong kind (`]` for an open `{`).

## An example

From the conformance suite, `invalid/406-unexpected-close`:

```xfer
]
```

```
$ xfer validate example.xfer
example.xfer:1:1: error XFER0406: unexpected closing bracket: there is nothing open to close
```

## How to fix it

Remove the extra bracket, or change it to match the one it closes.

## In the specification

Section 5.4, [Sequences](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#54-sequences), of the specification at `v1.0.0-draft.1`.

## Conformance cases

The suite's cases that expect XFER0406:

- [`invalid/406-mismatched-close`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/406-unexpected-close`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)

[All diagnostic codes](/diag)
