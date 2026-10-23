---
title: "2. Invariants"
description: "The XferLang specification, 2. Invariants"
order: 2
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 2. Invariants

Three properties hold for every conformant implementation. They are stated first because every later rule serves one of them, and the conformance suite tests each directly.

**The embedding invariant.** For any sequence of Unicode scalar values *s* that contains no U+000D, there is a string literal whose content is exactly *s*, and the scalar values of *s* appear in the literal unchanged and in order. Because the rule is the same at every level, a document that contains a document that contains a string holds the innermost content unchanged, at a cost of one delimiter character per level. The literal exists for every such *s*; whether a particular parser accepts it is a matter of its run-length limit ([section 3.4](/page/spec/text#34-limits)), which only content with a quote run or a run of `#` after a quote of every length up to the limit can exceed ([section 6](/page/spec/canonical-form), rule 10).

**The whitespace invariant.** Outside string literals and comments, whitespace carries no meaning beyond separating tokens. Whitespace between a scalar token and a following scalar token is mandatory and may be any non-empty run; whitespace adjacent to a self-delimiting token is optional. Replacing any whitespace run with any other run permitted by these rules does not change the document's value. In particular, line breaks never carry meaning, and no construct runs to the end of a line.

**The explicitness invariant.** Every value's type is determined by its spelling alone. No value is ever coerced to another type by its content, position or neighbours. The only bare words with meaning are the keywords in [section 4.2](/page/spec/lexical-structure#42-keywords).
