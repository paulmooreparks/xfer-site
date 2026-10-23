---
title: "8. JSON mapping"
description: "The XferLang specification, 8. JSON mapping"
order: 8
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 8. JSON mapping

## 8.1 XferLang to JSON

| XferLang | JSON | Diagnostic |
|---|---|---|
| object | object, same key order | |
| sequence | array | |
| string | string, with JSON escaping applied | |
| integer | number, full precision | [`XFER0901`](/page/diag/XFER0901) (warning) above 2^53 or below −2^53 (2^53 itself is not flagged); an implementation MUST offer an option to emit such integers as strings instead |
| fractional | number, as written with `_` removed | |
| `inf`, `-inf`, `nan` | no mapping | [`XFER0902`](/page/diag/XFER0902) (error) |
| `true`, `false`, `null` | `true`, `false`, `null` | |
| symbol | string | [`XFER0903`](/page/diag/XFER0903) (informational) |
| temporal | string, as written | [`XFER0904`](/page/diag/XFER0904) (informational) |
| comments, annotations | dropped | |

An integer is written as decimal digits with a leading `-` when negative, whatever radix it was written in, so `0xFF` is `255` and `-0` is `0`. When [`XFER0901`](/page/diag/XFER0901) applies and the caller asked for strings, the integer is written as a JSON string of those digits; the warning is still reported, because the type changed. An `inf`, `-inf` or `nan` is reported and the converter writes `null` in its place, so that the output is still JSON.

**The compact form.** The JSON text an implementation writes by default has no whitespace outside strings, and writes object members in the order of the value. A string is written between `"` characters with `"` and `\` escaped as `\"` and `\\`, the control characters U+0008, U+0009, U+000A, U+000C and U+000D as `\b`, `\t`, `\n`, `\f` and `\r`, every other control character below U+0020 as `\u` and four lower-case hexadecimal digits, and every other character literally (so U+007F, U+2028 and characters above U+FFFF are not escaped). A key is a string. An implementation MAY also offer an indented form. The compact form is what the conformance suite compares, so that two implementations writing the same value write the same bytes.

A diagnostic from this direction has no position in the XferLang source, because it is about a value; an implementation SHOULD say where in the value it applies, as a JSON Pointer (RFC 6901), and SHOULD report the informational codes [`XFER0903`](/page/diag/XFER0903) and [`XFER0904`](/page/diag/XFER0904) once per conversion, with a count, rather than once per value.

An indented form grows with the nesting depth as canonical output does ([section 6](/page/spec/canonical-form)), so a short document can have JSON text larger than any string an implementation can hold. A converter MAY refuse a value whose JSON text would exceed the document size limit ([section 3.4](/page/spec/text#34-limits)). It then reports [`XFER0601`](/page/diag/XFER0601) and gives no text, and it MUST NOT fail by exception from the platform instead.

## 8.2 JSON to XferLang

| JSON | XferLang |
|---|---|
| object | object; on duplicate keys the last value wins with [`XFER0905`](/page/diag/XFER0905) (warning) |
| array | sequence |
| string | string, with JSON escapes decoded; never a symbol. A string that holds U+000D or a lone surrogate (from `\r` or an unpaired `\uD800` to `\uDFFF`) is not converted: [`XFER0907`](/page/diag/XFER0907) (error) |
| number with no fraction or exponent | integer |
| number with a fraction or exponent | fractional, spelled as in the source |
| `true`, `false`, `null` | keywords |

An object key is a string for this purpose, so a key that holds one of those characters is [`XFER0907`](/page/diag/XFER0907) too. Malformed JSON is [`XFER0906`](/page/diag/XFER0906) (error) and gives no value. The reason for [`XFER0907`](/page/diag/XFER0907) is that XferLang cannot hold the character: a document is normalized before it is read ([section 3.2](/page/spec/text#32-line-ending-normalization)), so U+000D would be read back as LF, and a lone surrogate is not a scalar value, so either would come back as a different value. A converter MUST report it and MUST NOT substitute another character.

JSON nested deeper than the depth limit ([section 3.4](/page/spec/text#34-limits)) is not converted. The converter reports [`XFER0602`](/page/diag/XFER0602) and gives no value, because the result would be a value that cannot be written as a document within the limit.

The mapping from JSON is lossless apart from duplicate keys and strings that hold U+000D or a lone surrogate, which are reported, and nesting past the depth limit, which is refused. The mapping to JSON is defined and diagnosed, not lossless; a document that round-trips through JSON may come back with symbols and temporals as strings.
