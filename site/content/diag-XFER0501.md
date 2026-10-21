---
title: "XFER0501: annotation value carries an annotation"
description: "Error: annotation value carries an annotation."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0501

**Error.** Annotation value carries an annotation.

## What it means

An annotation's value is itself annotated. Annotations describe values; they do not nest.

## An example

From the conformance suite, `invalid/501-nested-annotation`:

```xfer
<! tag <! id "x" !> y !> 1
```

```
$ xfer validate example.xfer
example.xfer:1:8: error XFER0501: annotation value carries an annotation: an annotation's value cannot carry an annotation
```

## How to fix it

Remove the inner annotation. If both describe the same target, write them one after the other before the target.

## In the specification

Section 7, [Annotations (Level 1)](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#7-annotations-level-1), of the specification at `v1.0.0-draft.1`.

## Conformance cases

The suite's cases that expect XFER0501:

- [`invalid/501-nested-annotation`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/invalid.txtar)

[All diagnostic codes](/diag)
