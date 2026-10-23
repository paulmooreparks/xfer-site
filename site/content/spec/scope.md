---
title: "1. Scope"
description: "The XferLang specification, 1. Scope"
order: 1
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 1. Scope

XferLang is a text format for structured data. A document denotes one value. Values are objects (ordered key/value pairs), sequences (ordered values), strings, numbers, temporals, booleans, null and symbols. The format is designed so that a person or a program can write it without escaping anything, so that line breaks and indentation never carry meaning, and so that every value's type is stated by its spelling and never guessed.

This specification defines Level 0, the data format, and Level 1, a closed set of annotations that carry metadata and never evaluate. Anything that computes (bindings, conditionals, interpolation, external values) is outside this specification; a document that needs it is written in a separate language that produces XferLang.
