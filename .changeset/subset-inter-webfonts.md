---
'@nasa-hds/core': patch
---

Inter now ships subset by Unicode range, cutting the webfont a typical page downloads by about 63%.

Each Inter weight is now two files. The base file keeps its original name (existing URLs still resolve) and covers Latin-1, punctuation, the scientific and technical set (math operators, arrows, sub/superscripts, units, modern Greek), and common symbols (✓ ✗ ★ ⚠, circled numbers). A new `.extended` file covers Latin Extended, Vietnamese, combining diacritics, and currency signs, and is fetched automatically through `unicode-range` only when a page uses those characters.

Cyrillic, polytonic Greek, and IPA are no longer bundled. Public Sans (body) never covered them, so headings fall back to the same system font as body text.

Base is about 41 KB per weight (was 110 KB); extended about 31 KB.
