---
'@nasa-hds/core': patch
---

Inter now ships subset by Unicode range, cutting the webfont a typical page downloads by about 64%.

The bundled Inter files previously carried about 2,850 glyphs per weight (110 KB), including Cyrillic, polytonic Greek, Vietnamese, and IPA.

Each Inter font weight is now two files: a base file (kept under its original name, so existing asset URLs still resolve) covering Latin-1, punctuation, the full scientific and technical set (math operators, arrows, sub/superscripts, letterlike units, fractions), and modern Greek; and one `.extended` file covering Latin Extended, polytonic Greek, Cyrillic, and Vietnamese.

The new base is about 39 KB per weight. English, Spanish, and technical pages fetch only the base font files. Pages in another script pick up the extended font files automatically through `unicode-range`, with no configuration, on both the compiled-CSS and Sass paths.
