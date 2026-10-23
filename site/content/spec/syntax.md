---
title: "5. Syntax"
description: "The XferLang specification, 5. Syntax"
order: 5
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 5. Syntax

## 5.1 Document

A document is optional whitespace, an optional version annotation ([section 7](/page/spec/annotations)), optional trivia, exactly one element, and optional trivia. The version annotation may be preceded by whitespace but not by a comment: a comment before it makes `<! xfer 1 !>` an ordinary annotation named `xfer`, which is [`XFER0503`](/page/diag/XFER0503). A document with no element is an error ([`XFER0401`](/page/diag/XFER0401)). Anything other than trivia after the element is an error ([`XFER0402`](/page/diag/XFER0402)). A sequence of concatenated documents is not a document.

The root element may be any value, including a scalar. `42` and `"text"` are complete documents.

## 5.2 Elements and values

An element is zero or more annotations ([section 7](/page/spec/annotations)) followed by a value. A value is an object, a sequence or a scalar; a scalar is a string, a number, a temporal, a keyword value or a symbol.

## 5.3 Objects

An object is `{`, trivia, zero or more pairs separated by trivia, trivia, `}`. A pair is zero or more annotations, a key, trivia, and a value. A key is an identifier or a string; a keyword is not an identifier, so a key that spells a keyword is written as a string. Any other token in key position (a keyword, a number, a temporal, a bracket) is an error ([`XFER0407`](/page/diag/XFER0407)). The whitespace between a key and its value may be omitted only when the value begins with a self-delimiting token (separation rule): `{a[1]}` is well formed, and `{a"x"}` is not, because a string is not self-delimiting.

Pairs are ordered, and an implementation MUST preserve their order in the tree and in canonical output. Two pairs with the same key (compared as scalar-value sequences, whether spelled bare or as a string) are an error ([`XFER0403`](/page/diag/XFER0403)). A tool that builds a value model from a tree that contains the error keeps the last value for the key; which position the key keeps is unspecified.

An object body with an odd number of scalar tokens is an error ([`XFER0404`](/page/diag/XFER0404)). Because a bare word may be a key or a symbol value, a missing value shifts every later pair; the diagnostic MUST say that a value is missing and MUST list the key/value pairings the parser inferred, so the author can see where the shift began.

## 5.4 Sequences

A sequence is `[`, trivia, zero or more elements separated by trivia, trivia, `]`. Elements may be of different types. An unterminated object or sequence is an error ([`XFER0405`](/page/diag/XFER0405)); an unexpected closing bracket is an error ([`XFER0406`](/page/diag/XFER0406)).
