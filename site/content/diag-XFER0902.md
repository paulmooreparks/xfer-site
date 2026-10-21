---
title: "XFER0902: special float has no JSON mapping"
description: "Error: special float has no JSON mapping."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0902

**Error.** Special float has no JSON mapping.

## What it means

`inf`, `-inf` and `nan` have no form in JSON. The converter writes `null` in their place, so the output is still JSON, and reports the loss as an error.

## An example

From the conformance suite, `to-json/812-no-json-form`:

```xfer
[ 1 inf nan -inf 2 ]
```

```
$ xfer to-json example.xfer
[1,null,null,null,2]
example.xfer:1:1: error XFER0902: special float has no JSON mapping: inf at /1
example.xfer:1:1: error XFER0902: special float has no JSON mapping: nan at /2
example.xfer:1:1: error XFER0902: special float has no JSON mapping: -inf at /3
```

## How to fix it

Decide what the JSON reader should get instead (a very large number, a string, `null`) and put that in the XferLang document, or accept `null`.

## In the specification

Section 8.1, [XferLang to JSON](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#81-xferlang-to-json), of the specification at `v1.0.0-draft.1`.

## Conformance cases

The suite's cases that expect XFER0902:

- [`to-json/812-no-json-form`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/to-json.txtar)

[All diagnostic codes](/diag)
