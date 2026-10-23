---
title: "9. Parsing results and the lossless tree"
description: "The XferLang specification, 9. Parsing results and the lossless tree"
order: 9
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 9. Parsing results and the lossless tree

A conformant parser MUST NOT fail by exception, signal or abort on any input. It returns a result containing zero or more diagnostics and, where any part of the input was understood, a tree.

A **diagnostic** has a code from this specification, a severity (error, warning, informational), a position (UTF-8 byte offset and length, and line and column counted in scalar values from 1), and a message. The suite compares codes and positions, not messages.

Positions are measured in the normalized text ([section 3.2](/page/spec/text#32-line-ending-normalization)): after the leading byte order mark is removed and line endings are replaced by LF. So the first character after a byte order mark is at offset 0, column 1, and a lone CR in the input ends a line. A diagnostic about the input as a whole, such as the document size, is reported at offset 0, line 1, column 1. Invalid UTF-8 ([`XFER0701`](/page/diag/XFER0701)) SHOULD be reported at the first byte that is not part of a valid sequence, with its offset counted in bytes from after the byte order mark and its line and column counted as for the normalized text before it. A parser on a platform whose decoder does not say where it failed MAY report it at offset 0, line 1, column 1, so the suite does not require a position for these cases.

A parser SHOULD recover at the next element boundary it can isolate and continue, so that a document with several faults reports each one the parser can separate. Some faults have no boundary to recover at (an unterminated string consumes the rest of the document) and the spec does not require recovery from them. A tree returned with errors is partial and MUST mark the regions it could not parse. Where recovery happens, and so which further diagnostics follow the first fault, is a matter of quality and not of conformance: after a document's first fault, the suite requires only the diagnostics it lists, and a parser may report others. In particular a parser need not skip a malformed annotation to its closing `!>`, and it is better that it does not when the `!>` may simply be missing, because skipping would swallow a following closing bracket.

Implementations SHOULD provide a **lossless tree**, in which every byte of the source is reachable: tokens, trivia, delimiter run lengths, and the spelling of every number. A **value model** derived from it drops trivia and spellings and is what most consumers use. The canonical form ([section 6](/page/spec/canonical-form)) is a function of the value model plus annotations.

**Values built by a program.** An implementation that lets a program build a value model directly, and then write it as a document, MUST refuse a value that no document could hold, and MUST NOT repair it, so that the output always reads back as exactly the value given. It reports the refusal as an error. A value is refused when:

- a string or an object key contains U+000D, which normalization ([section 3.2](/page/spec/text#32-line-ending-normalization)) would read back as U+000A, or a lone surrogate, which is not a scalar value;
- a symbol is not an identifier ([section 4.3](/page/spec/lexical-structure#43-identifiers-and-symbols)) or is a keyword;
- a number's spelling is not exactly one number token of its kind, or does not denote the value it is stored with (an integer spelled `7` that holds 5, for example);
- a temporal's spelling is not exactly one temporal token of its kind;
- an annotation has a name other than `id`, `tag` or `lang`, has a value of the wrong kind for its name, has a value that is a container or carries an annotation itself, or repeats an `id` already used in the document; or
- the kind of a value is not one this specification defines.

The `xfer` head is part of a document, not an annotation of a value, so a value model has no place to hold it.

**Object mappers.** An implementation that maps values onto a host language's types (classes, records, structures) reports the faults of that mapping with the codes in the `08xx` range, so that every implementation's mapper reports the same code for the same fault: [`XFER0801`](/page/diag/XFER0801) for a value of a kind the target cannot take (a string where an integer is needed), [`XFER0802`](/page/diag/XFER0802) for a key that matches no member of the target when the caller has asked for unknown keys to be refused, [`XFER0803`](/page/diag/XFER0803) for a required member with no key, and [`XFER0804`](/page/diag/XFER0804) for two keys of one object that match the same member (for example under case-insensitive matching, or a key and an alias of it). A value of the right kind that the target cannot hold exactly (an integer out of range, a fraction the target would make infinite) is [`XFER0303`](/page/diag/XFER0303). A mapping diagnostic is reported at the position of the value, key or object it concerns, where the source is known. How a mapper chooses members, names and conversions is outside this specification.
