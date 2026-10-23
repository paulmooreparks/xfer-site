---
title: "3. Text"
description: "The XferLang specification, 3. Text"
order: 3
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 3. Text

## 3.1 Encoding

A document is a sequence of bytes that MUST be valid UTF-8. A leading U+FEFF (byte order mark) MUST be accepted and removed. Any other encoding is outside this specification. Invalid UTF-8 is an error ([`XFER0701`](/page/diag/XFER0701)).

## 3.2 Line-ending normalization

Before lexing, every sequence U+000D U+000A and every U+000D not followed by U+000A MUST be replaced by U+000A. All later rules, including the embedding invariant, apply to the normalized text. A string value therefore never contains U+000D, and a document means the same thing whatever a version-control system or editor has done to its line endings.

## 3.3 Whitespace

Whitespace is U+0020 (space), U+0009 (tab), U+000A (line feed) and U+000C (form feed). No other code point is whitespace. Unicode space characters outside this set are not whitespace; where they are permitted at all (inside strings, comments and identifiers) they are ordinary content.

## 3.4 Limits

Every conformant parser, in its default configuration, MUST accept any document within the following minimums, and MAY accept larger. The spec fixes minimums so that two conformant parsers never disagree on a document within them.

A deployment may choose stricter limits for its own purposes, such as a server that parses untrusted input and wants to refuse a document over a megabyte. An implementation SHOULD allow that as an explicit option. A parser so configured is not conformant for documents beyond the limits its caller chose, and reports the diagnostic in the table when it refuses one. The minimums bind the default configuration, not a deployment's policy. A parser that keeps a tree of the whole document may need many times the document's size in memory, and a runtime that cannot recover from running out of memory can be ended by a hostile document that is within every limit below, so a parser of untrusted input SHOULD be configured with limits well under the minimums.

| Limit | Minimum a parser MUST accept | Diagnostic when exceeded |
|---|---|---|
| Document size | 2^28 − 1 bytes | [`XFER0601`](/page/diag/XFER0601) |
| Nesting depth (objects and sequences) | 256 | [`XFER0602`](/page/diag/XFER0602) |
| Scalar token length | 2^28 − 1 bytes | [`XFER0603`](/page/diag/XFER0603) |
| Delimiter run length (quotes, hashes, slashes) | 64 | [`XFER0604`](/page/diag/XFER0604) |
| Elements in a document | 2^31 − 1 | [`XFER0605`](/page/diag/XFER0605) |

Nesting depth counts every open object or sequence including the root, so `[[1]]` has depth 2 and a document of 256 nested sequences MUST be accepted while one of 257 MAY be rejected by a parser at the minimum. Exceeding a limit is a diagnostic, never a crash, an allocation failure or a stack overflow. Implementations SHOULD expose the limits as options with the minimums as defaults, and a caller may raise or lower each.
