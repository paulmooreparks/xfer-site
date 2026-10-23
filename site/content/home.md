---
title: "XferLang"
description: "XferLang: a data format with no escape sequences, typed values and no meaning in line breaks."
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# XferLang

XferLang is a data format with the data model of JSON, typed values, no escape sequences anywhere in its grammar, and no meaning in line breaks or indentation. Any text can be embedded in an XferLang string exactly as it is, at any depth, including another XferLang document.

```xfer
<! xfer 1 !>
{
    title """She said "hello" and left"""
    count 42
    ratio 1.50
    released 2025-08-01
    mode dark
    tags [ alpha beta ]
}
```

A string is written between runs of quotation marks, and a string that holds quotation marks is written with a longer run, so nothing inside it is ever escaped. Bare words are symbols, integers keep their exact value at any size, and dates and times are values of their own type.

This site is being built. The [diagnostic codes](/page/diag) are here now: every fault a parser reports, with an example and the fix. The specification is in the [xferlang](https://github.com/paulmooreparks/xferlang) repository, and two implementations are published: [`xferlang`](https://www.npmjs.com/package/xferlang) on npm for JavaScript and TypeScript, and [`ParksComputing.XferLang`](https://www.nuget.org/packages/ParksComputing.XferLang) on NuGet for .NET, with the `xfer` command line tool in both.
