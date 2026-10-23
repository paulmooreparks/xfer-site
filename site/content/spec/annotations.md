---
title: "7. Annotations (Level 1)"
description: "The XferLang specification, 7. Annotations (Level 1)"
order: 7
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 7. Annotations (Level 1)

An annotation is `<!`, trivia, an identifier (the name), trivia, a value, trivia, `!>`. The value is a Level 0 value and MUST NOT itself carry annotations ([`XFER0501`](/page/diag/XFER0501)). An annotation attaches to the next pair when it appears inside an object and to the next element otherwise. Several annotations may precede one target and all attach to it. An annotation with no target is an error ([`XFER0502`](/page/diag/XFER0502)): one that is last in an object or a sequence, one with nothing after it in a document that has no element, and one placed between a key and its value. An annotation after the root element is not a dangling annotation but content after the root, which is [`XFER0402`](/page/diag/XFER0402).

The defined annotations are:

| Name | Value | Meaning |
|---|---|---|
| `xfer` | integer | The major version of this specification the document was written against. If present it MUST be the first token of the document ([`XFER0503`](/page/diag/XFER0503)). If absent the version is 1. A parser MUST reject a major version it does not implement ([`XFER0504`](/page/diag/XFER0504)). |
| `id` | string | An identifier for the target, unique within the document ([`XFER0505`](/page/diag/XFER0505) on a repeat). |
| `tag` | string or symbol | A classification of the target. Repeats are permitted. |
| `lang` | symbol or string | For a string target: the language its content is written in, for editors. No effect on parsing. |

Any other annotation name is an error ([`XFER0506`](/page/diag/XFER0506)). So is an annotation that is malformed in any other way (no name, a name that is not an identifier, an unclosed or empty body), and so is one whose value has the wrong kind for its name. The code is the same for all of these, because the suite compares codes and not messages, and the message says which fault it is. There is one parse mode. A tool that must carry unknown annotations through does so from the lossless tree ([section 9](/page/spec/parsing-results-and-the-lossless-tree)), where every annotation is present whether or not it is defined here.

Annotations never evaluate, never read the environment or the file system, and never change the value of their target.
