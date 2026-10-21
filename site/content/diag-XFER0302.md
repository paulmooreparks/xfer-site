---
title: "XFER0302: malformed number"
description: "Error: malformed number."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0302

**Error.** Malformed number.

## What it means

The token starts like a number but is not one: a trailing `.`, a `.` before an exponent, a doubled or trailing `_`, an uppercase radix prefix, a prefix with no digits, or a `-` with no number after it.

## An example

From the conformance suite, `invalid/302-trailing-point`:

```xfer
1.
```

```
$ xfer validate example.xfer
example.xfer:1:1: error XFER0302: malformed number: a point must be followed by digits
```

## How to fix it

Write the number in one of the forms of section 4.5: `1.0` not `1.`, `1_000` not `1__000`, `0xff` not `0XFF`. Digit separators go between two digits only.

## In the specification

Section 4.5, [Numbers](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#45-numbers), of the specification at `v1.0.0-draft.1`.

## Conformance cases

The suite's cases that expect XFER0302:

- [`invalid/302-double-underscore`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-empty-hex`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-minus-alone`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-minus-then-letters`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-point-then-exponent`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-trailing-point`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-trailing-underscore`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-underscore-before-letter`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-uppercase-octal`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/302-uppercase-radix`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)

[All diagnostic codes](/diag)
