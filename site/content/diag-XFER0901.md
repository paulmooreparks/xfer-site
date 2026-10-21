---
title: "XFER0901: integer outside JSON's safe range"
description: "Warning: integer outside JSON's safe range."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0901

**Warning.** Integer outside JSON's safe range.

## What it means

An integer is outside the range a JSON reader that uses double-precision numbers can hold exactly, plus or minus 2^53. The JSON is still written with every digit, but a reader such as JavaScript's `JSON.parse` would round it. This is a warning, not an error.

## An example

From the conformance suite, `to-json/811-integers-as-strings`:

```xfer
[ 9007199254740992 9007199254740993 -9007199254740993 5 ]
```

```
$ xfer to-json --stringify-big-ints example.xfer
[9007199254740992,"9007199254740993","-9007199254740993",5]
example.xfer:1:1: warning XFER0901: integer outside JSON's safe range: /1
example.xfer:1:1: warning XFER0901: integer outside JSON's safe range: /2
```

## How to fix it

Ask the converter to write such integers as strings (`xfer to-json --stringify-big-ints`), if the reader can treat them as text, or make sure the reader keeps big integers exactly.

## In the specification

Section 8.1, [XferLang to JSON](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#81-xferlang-to-json), of the specification at `v1.0.0-draft.1`.

## Conformance cases

The suite's cases that expect XFER0901:

- [`to-json/811-integers-as-strings`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/to-json.txtar)
- [`to-json/811-integers-past-the-safe-range`](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/tests/to-json.txtar)

[All diagnostic codes](/diag)
