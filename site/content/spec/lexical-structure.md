---
title: "4. Lexical structure"
description: "The XferLang specification, 4. Lexical structure"
order: 4
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 4. Lexical structure

The normalized text is divided into tokens and trivia. Trivia is whitespace and comments and is discarded from the value but kept by lossless tools. Tokens are **self-delimiting** or **scalar**.

The self-delimiting tokens are `{`, `}`, `[`, `]`, the `<` that opens a comment or annotation, and the `!>` that closes an annotation. Every other token is scalar.

**Separation rule.** A scalar token MUST be followed by whitespace, a comment, a self-delimiting token, or end of input ([`XFER0101`](/page/diag/XFER0101)). So `1-2` is an error (two scalars with nothing between them), `"a"1` is an error, and `{a 1 b [1 2]}` is well formed because every omitted space is beside a bracket. Note that `"a""b"` is not a separation case at all: under exact run matching (4.4) the run of two quotes is content, and the whole is the single string `a""b`.

A `<` not followed by `/` or `!` is an error ([`XFER0102`](/page/diag/XFER0102)). A `#` not followed by `#` or `"` is an error ([`XFER0202`](/page/diag/XFER0202)). Any other character that cannot begin a token, including `(`, `)`, `~`, `?`, `+` and a leading `.`, is an error ([`XFER0103`](/page/diag/XFER0103)).

## 4.1 Comments

A comment opens with `<` followed by a run of one or more `/`, and closes at the first maximal run of exactly the same number of `/` that is immediately followed by `>`. A run of a different length is comment content. Comments may appear anywhere trivia may and count as whitespace for the separation rule. Comments do not nest syntactically; a comment that must contain `/>` is written with a longer run (`<// ... //>`), which is how a region containing comments is commented out. A comment's content may not begin or end with `/` (a leading slash is absorbed into the opening run; a trailing one merges with the closing run); write a space. An unterminated comment is an error ([`XFER0104`](/page/diag/XFER0104)).

```xfer
</ a comment />
<// a comment containing </ a comment /> //>
```

## 4.2 Keywords

The keywords are `true`, `false`, `null`, `inf` and `nan`, together with `-inf`, which is lexed as a number (4.5). Keywords are case-sensitive. A bare word that differs from a keyword only in case is a symbol. A keyword is never an identifier, in any position.

## 4.3 Identifiers and symbols

An identifier begins with an ASCII letter, `_`, or an admitted non-ASCII scalar value, and continues with ASCII letters, digits, `_`, `-`, `.`, or admitted non-ASCII scalar values. It MUST NOT end with `.` ([`XFER0105`](/page/diag/XFER0105)). An admitted non-ASCII scalar value is any scalar value at or above U+0080 except the Unicode space characters (U+00A0, U+1680, U+2000 to U+200A, U+2028, U+2029, U+202F, U+205F, U+3000, U+FEFF) and the format and bidirectional controls (U+200B to U+200F, U+202A to U+202E, U+2060 to U+2064, U+2066 to U+2069). An identifier that spells a keyword is the keyword.

Identifiers compare by scalar-value sequence. No normalization is applied; `é` as U+00E9 and as `e` U+0301 are different identifiers. Implementations MUST NOT normalize.

An identifier in value position is a **symbol**. A symbol is a value of its own type; it is never a string, a boolean or a number. `.` and `-` have no meaning inside an identifier: `a.b` is one identifier, not a path, and `v1.2.3` and `read-only` are symbols.

## 4.4 Strings

A string has two spellings. Both yield a sequence of scalar values taken verbatim from the text between the delimiters: there are no escape sequences, and nothing between the delimiters is interpreted.

**Repetition.** The opening delimiter is a maximal run of n `"`, where n is 1 or at least 3. The closing delimiter is the first following maximal run of exactly n `"`. A run of any other length is content. Consequently the content may contain quote runs of any length other than n, and may not begin or end with `"` (a leading quote would be part of the opening run; a trailing quote would merge with the closing run into a run that is not n).

**The empty string.** A maximal run of exactly two `"` that begins a token is the empty string, whatever follows it. It never opens a string: `""x""` is the empty string followed by a separation error at `x`. Content that contains a quote is therefore written with a run of three or more, as in Python, C#, Kotlin, Swift and Java. Inside a string's content a run of two quotes is ordinary content.

```xfer
"plain"
""
"""He said "hello" and left."""
"""Content with "" inside"""
"Content with "" inside"
```

The last two are the same string. The fifth is well formed because the run of two is content of a string opened with one quote; the canonical form ([section 6](/page/spec/canonical-form)) would write the fourth.

**Hash-run.** The opening delimiter is a run of m ≥ 1 `#` followed by `"`. The closing delimiter is the first following `"` that is followed by a maximal run of exactly m `#`. A `"` followed by a hash run of any other length, or by no hash, is content. The content may begin and end with anything. Hash-run has no exception: every string is representable with m one greater than the longest run of `#` that follows a `"` in the content.

```xfer
#"say "hi""#
#""To be, or not to be""#
##"a "# inside, and ends with #"##
```

An unterminated string is an error ([`XFER0201`](/page/diag/XFER0201)). A string's content may contain any scalar value, including U+0000 and other control characters; implementations MUST represent strings as length-delimited data, never as NUL-terminated text.

The newline that follows an opening delimiter, and the indentation of every continuation line, are content. The idiom for multi-line text is to open the string on the same line as its key and continue flush left.

## 4.5 Numbers

A number is an **integer** or a **fractional**. The two are different types.

An integer is an optional `-` followed by one of:

- a decimal form: `0`, or a digit `1` to `9` followed by digits;
- a hexadecimal form: `0x` followed by hexadecimal digits of either case;
- an octal form: `0o` followed by digits `0` to `7`;
- a binary form: `0b` followed by `0` or `1`.

A fractional is an optional `-` followed by a decimal integer form, then a fraction (`.` and at least one digit), an exponent (`e` or `E`, optional `+` or `-`, at least one digit), or both; or one of the special values `inf`, `-inf`, `nan`.

In any number a single `_` MAY appear between two digits and nowhere else. A leading zero on a non-zero decimal integer is an error ([`XFER0301`](/page/diag/XFER0301)), so `0755` never means 755 or 493. `1.`, `1.e5`, `1__0`, `1_`, `1_a`, a `-` followed by neither digits nor `inf`, and a radix prefix with no digits after it are errors ([`XFER0302`](/page/diag/XFER0302)). The radix prefixes are lowercase only, and an uppercase one (`0XFF`, `0O17`, `0B1`) is also [`XFER0302`](/page/diag/XFER0302). `.5` and `+1` are not numbers at all: `.` and `+` cannot begin a token ([`XFER0103`](/page/diag/XFER0103), [section 4](/page/spec/lexical-structure)). Any exponent makes a literal fractional: `1e5` is fractional and `100000` is an integer.

`-inf` is a complete token wherever it appears, so `-infinity` is `-inf` followed by a separation error at the second `i`. Without the minus sign, `infinity` is an identifier like any other.

A number's written form has no width. The value is the exact number the text denotes. An implementation MUST keep enough of the lexeme to deliver that value exactly to a consumer whose type can hold it, and MUST report a diagnostic ([`XFER0303`](/page/diag/XFER0303)) rather than wrap, truncate or silently promote when a consumer's type cannot. Whether a fractional becomes a decimal or a binary floating-point value is the consumer's choice; the implementation MUST say when the conversion is inexact.

## 4.6 Temporals

A temporal is one of three RFC 3339 forms, spelled bare:

- a date, `full-date`: `2025-08-01`;
- a time, `partial-time`: `09:30:00`, `09:30:00.250`;
- a date-time, `full-date "T" partial-time [time-offset]`: `2025-08-01T09:30:00Z`, `2025-08-01T09:30:00+08:00`, and with no offset a local date-time `2025-08-01T09:30:00`.

The separator between date and time is `T` only, and the UTC offset `Z` is uppercase only. RFC 3339's lowercase `t` and `z` and its space separator are excluded, the space because it would split the literal under the separation rule. A temporal takes no sign and no digit separator: `-2025-08-01` is the integer `-2025` followed by a separation error. Reduced forms (`09:30`, `2025-08`) and a fraction point with no digits after it are errors ([`XFER0304`](/page/diag/XFER0304)). Durations are not part of this version.

A temporal whose fields are well formed but out of range is an error ([`XFER0305`](/page/diag/XFER0305)). The ranges are: the year is any four digits, `0000` to `9999`; the month is `01` to `12`; the day is `01` to the length of the month, where February has 29 days in a year divisible by 4, except a century year not divisible by 400; the hour is `00` to `23`; the minute is `00` to `59`; the second is `00` to `60`, where `60` is a leap second as RFC 3339 permits; an offset's hour is `00` to `23` and its minute `00` to `59`. A fraction of a second may have any number of digits. So `2024-02-29` and `23:59:60` are valid, and `2023-02-29`, `1900-02-29`, `24:00:00` and `+24:00` are not.

The three forms are three types. A date is not a date-time with a missing time; the consumer decides what to do with each.

## 4.7 Booleans and null

`true` and `false` are the booleans. `null` is the null value. These are keywords (4.2).
