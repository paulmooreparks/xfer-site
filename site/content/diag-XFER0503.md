---
title: "XFER0503: `xfer` annotation is not the first token"
description: "Error: `xfer` annotation is not the first token."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0503

**Error.** `xfer` annotation is not the first token.

## What it means

`<! xfer 1 !>` gives the version of the specification the document was written for, and it must be the document's first token. Anywhere else, including after a comment, it is out of place.

## An example

From the conformance suite, `invalid/503-xfer-inside-object`:

```xfer
{ <! xfer 1 !> a 1 }
```

```
$ xfer validate example.xfer
example.xfer:1:3: error XFER0503: `xfer` annotation is not the first token: it must be the first token of the document
```

## How to fix it

Move the version annotation to the top of the document. Whitespace before it is fine; a comment is not, so put any comment after it.

## In the specification

Section 7, [Annotations (Level 1)](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#7-annotations-level-1), of the specification at `v1.0.0-draft.1`.

## Conformance cases

The suite's cases that expect XFER0503:

- [`invalid/503-xfer-inside-object`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)
- [`invalid/503-xfer-not-first`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)

[All diagnostic codes](/diag)
