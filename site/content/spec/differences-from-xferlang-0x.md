---
title: "Appendix A. Differences from XferLang 0.x"
description: "The XferLang specification, Appendix A. Differences from XferLang 0.x"
order: 12
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# Appendix A. Differences from XferLang 0.x

This specification is a clean-sheet redesign and is not compatible with documents written for the 0.x library. The differences, for anyone migrating:

- All type sigils (`#`, `&`, `*`, `^`, `~`, `?`, `@`, `=`, `:`, `_`, `|`) are gone. Types are stated by literal form.
- The explicit `<...>` wrapper around values is gone; `<` introduces only comments and annotations.
- Tuples are gone and sequences are heterogeneous.
- Bare words in value position are symbols rather than errors.
- Keys may be any string.
- The recursive key/value form (`a b "c"`) is gone.
- Processing instructions that compute (`let`, `if`, `script`, `dynamicSource`, interpolation) are gone from the format. `document` is replaced by `xfer`, `id` and `tag` remain, `lang` is new.
- Line endings are normalized; strings are verbatim otherwise.
- Hash-run strings are new.
- Parsing never throws and never reads the environment or the file system.
