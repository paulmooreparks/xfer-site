---
title: "6. Canonical form"
description: "The XferLang specification, 6. Canonical form"
order: 6
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 6. Canonical form

The canonical form of a document is a single spelling of its value, defined so that two implementations given the same document produce identical bytes. It is what the conformance suite compares. It is not a general-purpose formatter: comments are dropped (they are not part of the value), while annotations are kept (they are part of the Level 1 meaning). A lossless formatter that preserves comments and the author's layout is a tool, built on the lossless tree ([section 9](/page/spec/parsing-results-and-the-lossless-tree)), and is outside this specification.

Rules:

1. Output is UTF-8 with LF line endings and no byte order mark, ending with one LF.
2. The version annotation is written first, as `<! xfer 1 !>` on its own line, if the source had one.
3. Indentation is four spaces per nesting level.
4. An object or sequence with no members is written `{}` or `[]`. Otherwise the opening bracket ends its line, each member is on its own line at the next indentation level, and the closing bracket is on its own line at the enclosing level.
5. A pair is the key, one space, the value. A key is written bare if it is a valid identifier that is not a keyword, otherwise as a string.
6. Each annotation is written on its own line immediately before the element or pair it attaches to, at that element's indentation, as `<! name value !>` with the value in canonical form.
7. Numbers are written as in the source except that the hexadecimal digits of a hexadecimal integer are lowercased. Digit separators and radix are preserved. Special floats are written `inf`, `-inf`, `nan`.
8. Temporals are written as in the source.
9. Keywords and symbols are written as spelled.
10. Strings use the choice rule: if the content is empty, write `""`. If the content contains no `"`, write `"content"`. Otherwise, if the content neither begins nor ends with `"`, write repetition with n one greater than the longest quote run in the content, or 3 when that would be 2 (a run of two is the empty string). Otherwise write hash-run with m one greater than the longest run of `#` that follows a `"` in the content. If the chosen length would exceed the run-length limit, use instead the smallest length of the same form that is not the length of any run in the content (other than 2, for repetition). That length can still exceed the limit, but only for content that has a quote run, or a run of `#` after a quote, of every length up to the limit, which no practical document has. A parser enforcing the limit reports [`XFER0604`](/page/diag/XFER0604) for such a string and a parser that accepts longer runs reads it, so a string can always be written and is read by any parser whose limit admits it.

Canonical form is idempotent: the canonical form of a canonical document is itself.

Indentation makes the size of canonical output grow with the square of the nesting depth, so a short document that is deeply nested can have canonical output larger than any string an implementation can hold. A canonical writer MAY refuse a value nested deeper than the depth limit ([section 3.4](/page/spec/text#34-limits)), or whose canonical form would exceed the document size limit, and MUST report the refusal as an error and not fail by exception from the platform (an allocation failure, for example).
