---
title: "Diagnostic codes"
description: "Every diagnostic an XferLang implementation reports, by code."
date: 2026-10-22T00:00:00
lastModified: 2026-10-22T00:00:00
lang: en-us
---
# Diagnostic codes

Every fault an XferLang parser, writer, converter or object mapper reports has a code from the specification (section 10 at `v1.0.0-draft.1`). The code is stable: it never changes meaning, and every implementation reports the same code for the same fault. Each code has a page with an example and the fix.

| Code | Severity | Meaning |
|---|---|---|
| [XFER0101](/diag/XFER0101) | error | scalar token not followed by a separator |
| [XFER0102](/diag/XFER0102) | error | `<` not followed by `/` or `!` |
| [XFER0103](/diag/XFER0103) | error | character cannot begin a token |
| [XFER0104](/diag/XFER0104) | error | unterminated comment |
| [XFER0105](/diag/XFER0105) | error | identifier ends with `.` |
| [XFER0201](/diag/XFER0201) | error | unterminated string |
| [XFER0202](/diag/XFER0202) | error | `#` not followed by `#` or `"` |
| [XFER0301](/diag/XFER0301) | error | leading zero on a decimal integer |
| [XFER0302](/diag/XFER0302) | error | malformed number |
| [XFER0303](/diag/XFER0303) | error | number out of range for the requested type (conversion, not parsing) |
| [XFER0304](/diag/XFER0304) | error | malformed temporal |
| [XFER0305](/diag/XFER0305) | error | temporal denotes no valid instant |
| [XFER0401](/diag/XFER0401) | error | document has no element |
| [XFER0402](/diag/XFER0402) | error | content after the root element |
| [XFER0403](/diag/XFER0403) | error | duplicate key |
| [XFER0404](/diag/XFER0404) | error | object body has a key without a value |
| [XFER0405](/diag/XFER0405) | error | unterminated object or sequence |
| [XFER0406](/diag/XFER0406) | error | unexpected closing bracket |
| [XFER0407](/diag/XFER0407) | error | token in key position is not an identifier or string |
| [XFER0501](/diag/XFER0501) | error | annotation value carries an annotation |
| [XFER0502](/diag/XFER0502) | error | annotation has no target |
| [XFER0503](/diag/XFER0503) | error | `xfer` annotation is not the first token |
| [XFER0504](/diag/XFER0504) | error | unsupported major version |
| [XFER0505](/diag/XFER0505) | error | duplicate `id` |
| [XFER0506](/diag/XFER0506) | error | unknown annotation |
| [XFER0601](/diag/XFER0601) | error | document exceeds size limit |
| [XFER0602](/diag/XFER0602) | error | nesting exceeds depth limit |
| [XFER0603](/diag/XFER0603) | error | scalar token exceeds length limit |
| [XFER0604](/diag/XFER0604) | error | delimiter run exceeds length limit |
| [XFER0605](/diag/XFER0605) | error | element count exceeds limit |
| [XFER0701](/diag/XFER0701) | error | invalid UTF-8 |
| [XFER0801](/diag/XFER0801) | error | value has the wrong kind for its target |
| [XFER0802](/diag/XFER0802) | error | key matches no member of the target |
| [XFER0803](/diag/XFER0803) | error | required member missing |
| [XFER0804](/diag/XFER0804) | error | two keys match one member |
| [XFER0901](/diag/XFER0901) | warning | integer outside JSON's safe range |
| [XFER0902](/diag/XFER0902) | error | special float has no JSON mapping |
| [XFER0903](/diag/XFER0903) | informational | symbol mapped to JSON string |
| [XFER0904](/diag/XFER0904) | informational | temporal mapped to JSON string |
| [XFER0905](/diag/XFER0905) | warning | duplicate key in JSON source; last value kept |
| [XFER0906](/diag/XFER0906) | error | malformed JSON |
| [XFER0907](/diag/XFER0907) | error | JSON string holds a character XferLang cannot represent |
