---
title: "XFER0603: scalar token exceeds length limit"
description: "Error: scalar token exceeds length limit."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# XFER0603

**Error.** Scalar token exceeds length limit.

## What it means

A single scalar token, usually a very long string, is longer than the parser's token limit. The default is 2^28 − 1 bytes; a program may set a lower one.

## How to fix it

Store the text outside the document and refer to it, or raise the limit if you control the parser.

## In the specification

Section 3.4, [Limits](https://github.com/paulmooreparks/xferlang/blob/v1.0.0-draft.1/spec/xferlang.md#34-limits), of the specification at `v1.0.0-draft.1`.

[All diagnostic codes](/diag)
