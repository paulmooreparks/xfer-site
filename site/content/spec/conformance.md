---
title: "11. Conformance"
description: "The XferLang specification, 11. Conformance"
order: 11
date: 2026-10-23T00:00:00
lastModified: 2026-10-23T00:00:00
lang: en-us
---
# 11. Conformance

An implementation is conformant with this version when it:

1. accepts every document in `tests/valid.txtar`, produces its canonical form byte for byte, and produces its value model as the case states;
2. rejects every document in `tests/invalid.txtar` with the code the case states at the position it states;
3. accepts every document within the limits in 3.4;
4. never fails by exception, signal or abort on any input;
5. passes the property tests described in `tests/README.md` for the embedding and whitespace invariants.
