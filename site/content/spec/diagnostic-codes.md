---
title: "10. Diagnostic codes"
description: "The XferLang specification, 10. Diagnostic codes"
order: 10
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 10. Diagnostic codes

Codes are stable. A code is never reused for a different meaning; a retired code is listed as retired.

| Code | Severity | Meaning |
|---|---|---|
| [XFER0101](/page/diag/XFER0101) | error | scalar token not followed by a separator |
| [XFER0102](/page/diag/XFER0102) | error | `<` not followed by `/` or `!` |
| [XFER0103](/page/diag/XFER0103) | error | character cannot begin a token |
| [XFER0104](/page/diag/XFER0104) | error | unterminated comment |
| [XFER0105](/page/diag/XFER0105) | error | identifier ends with `.` |
| [XFER0201](/page/diag/XFER0201) | error | unterminated string |
| [XFER0202](/page/diag/XFER0202) | error | `#` not followed by `#` or `"` |
| [XFER0301](/page/diag/XFER0301) | error | leading zero on a decimal integer |
| [XFER0302](/page/diag/XFER0302) | error | malformed number |
| [XFER0303](/page/diag/XFER0303) | error | number out of range for the requested type (conversion, not parsing) |
| [XFER0304](/page/diag/XFER0304) | error | malformed temporal |
| [XFER0305](/page/diag/XFER0305) | error | temporal denotes no valid instant |
| [XFER0401](/page/diag/XFER0401) | error | document has no element |
| [XFER0402](/page/diag/XFER0402) | error | content after the root element |
| [XFER0403](/page/diag/XFER0403) | error | duplicate key |
| [XFER0404](/page/diag/XFER0404) | error | object body has a key without a value |
| [XFER0405](/page/diag/XFER0405) | error | unterminated object or sequence |
| [XFER0406](/page/diag/XFER0406) | error | unexpected closing bracket |
| [XFER0407](/page/diag/XFER0407) | error | token in key position is not an identifier or string |
| [XFER0501](/page/diag/XFER0501) | error | annotation value carries an annotation |
| [XFER0502](/page/diag/XFER0502) | error | annotation has no target |
| [XFER0503](/page/diag/XFER0503) | error | `xfer` annotation is not the first token |
| [XFER0504](/page/diag/XFER0504) | error | unsupported major version |
| [XFER0505](/page/diag/XFER0505) | error | duplicate `id` |
| [XFER0506](/page/diag/XFER0506) | error | unknown annotation |
| [XFER0601](/page/diag/XFER0601) | error | document exceeds size limit |
| [XFER0602](/page/diag/XFER0602) | error | nesting exceeds depth limit |
| [XFER0603](/page/diag/XFER0603) | error | scalar token exceeds length limit |
| [XFER0604](/page/diag/XFER0604) | error | delimiter run exceeds length limit |
| [XFER0605](/page/diag/XFER0605) | error | element count exceeds limit |
| [XFER0701](/page/diag/XFER0701) | error | invalid UTF-8 |
| [XFER0801](/page/diag/XFER0801) | error | value has the wrong kind for its target |
| [XFER0802](/page/diag/XFER0802) | error | key matches no member of the target |
| [XFER0803](/page/diag/XFER0803) | error | required member missing |
| [XFER0804](/page/diag/XFER0804) | error | two keys match one member |
| [XFER0901](/page/diag/XFER0901) | warning | integer outside JSON's safe range |
| [XFER0902](/page/diag/XFER0902) | error | special float has no JSON mapping |
| [XFER0903](/page/diag/XFER0903) | informational | symbol mapped to JSON string |
| [XFER0904](/page/diag/XFER0904) | informational | temporal mapped to JSON string |
| [XFER0905](/page/diag/XFER0905) | warning | duplicate key in JSON source; last value kept |
| [XFER0906](/page/diag/XFER0906) | error | malformed JSON |
| [XFER0907](/page/diag/XFER0907) | error | JSON string holds a character XferLang cannot represent |
