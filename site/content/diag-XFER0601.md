---
title: "XFER0601: document exceeds size limit"
description: "Error: document exceeds size limit."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0601

**Error.** Document exceeds size limit.

## What it means

The document is larger than the parser's size limit. Every parser accepts documents up to 2^28 − 1 bytes, about 268 MB, by default, and a program that reads untrusted input may set a lower limit. A writer reports the same code when the text it would write is over the limit, which indentation can cause for a deeply nested value.

## How to fix it

Split the data into several documents, or, if you control the parser and trust the input, raise its limit.

## In the specification

Section 3.4, [Limits](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#34-limits), of the specification at `v1.0.0-draft.1`.

[All diagnostic codes](/diag)
