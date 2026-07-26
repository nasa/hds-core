---
'@nasa-hds/core': minor
---

Split Inter into two Unicode-range files per weight — roughly half the font weight on a typical page

Inter shipped unsubsetted: 2,852 codepoints per weight across ten weights, including Cyrillic, polytonic Greek, Vietnamese, IPA, and about 744 private-use stylistic alternates. Every page downloaded all of it to render English. Measured on a representative page, webfonts were 87% of total transfer.

Inter is now cut at build time into two files per weight: a base file every page loads, and one `ext` file carrying Latin Extended, Cyrillic, and Vietnamese that the browser fetches only when a page uses one of those scripts. On a representative page this takes total transfer from **564 KB to 279 KB (−51%)**, and the published tarball from 3,026,030 to 2,736,087 packed bytes.

Webfonts measured on a representative English page: **256.1 KB to 111.0 KB (−57%)**, one file per weight instead of one oversized one.

**No action required, and nothing is lost.** The base file keeps its original name and covers Latin-1 plus the scientific characters. The `ext` file is fetched automatically when a page contains one of its scripts — no configuration, on both the compiled-CSS and Sass paths. Rendering is unchanged: text metrics are identical to three decimal places in every language tested.

Two things to know:

- **Copy the whole `fonts/` directory.** If your build copies font files selectively based on what the CSS appears to reference, a Russian, Polish, or Vietnamese page will lose its webfont and fall back to a system font — silently, and invisibly if you test in English. The `ext` files are referenced from `@font-face` rules that only apply conditionally.
- **`Inter-*.woff2` files now contain fewer glyphs.** If you deep-link one through `@nasa-hds/core/assets/*`, it still resolves and covers Latin-1, Greek, math, sub/superscripts, arrows, and fractions — but no longer Cyrillic, Vietnamese, polytonic Greek, or IPA. Those live in the sibling `Inter-*.ext.woff2` file.

**The base range deliberately includes scientific characters.** The conventional `latin`/`latin-ext` split omits Greek, math operators, sub/superscripts, arrows, and fractions, which silently breaks ordinary NASA technical copy — `Δv`, `λ = 550 nm`, `CO₂`, `10⁻⁹ m`, `±`, `≈`, `≤`, `∞`, `√`, `∑`, `∫`, `→`, `½`. Those blocks cost about 11 KB per weight and are folded into the file every page loads. Latin Extended is on demand instead, since Spanish sits entirely within Latin-1.

**Two files per weight, not four.** The three extended scripts share one file because woff2 per-file table overhead is larger than the glyph savings from splitting them: cut separately they cost 5.4–6.0 KB per weight _more_ than cut together. Merging takes the Inter tree from 911.3 KB across 40 files to 854.3 KB across 20, and leaves English and Spanish pages byte-identical. The trade is over-fetch per weight on pages that do use an extended script — 82.6 KB instead of 70.7 KB for Polish, 52.0 KB for Russian, 44.6 KB for Vietnamese — which is the right way round for a system whose non-English traffic is overwhelmingly Spanish, and it halves the number of files an adopter copying by hand can lose. It also removes an overlap: `U+0301` was declared by both the Cyrillic and Vietnamese ranges, and `U+0304` / `U+0308` / `U+0329` by both Latin Extended and Vietnamese, so which file a combining mark pulled depended on declaration order.

Coverage is still evaluated per script, not per file. `unicode-range` matches the declared range rather than real glyph coverage, so a font that has Latin Extended but no Cyrillic would otherwise be selected for Russian and paint `.notdef` boxes; each script is dropped from a font's merged range unless the font clears `MIN_COVERAGE` for it independently.

Only Inter is split. Public Sans and DM Mono are byte-identical to before — measured, splitting them costs more in per-file woff2 overhead than it saves.

Also adds `npm run check:webfonts`, a drift gate for the generated `src/scss/base/_webfonts.scss`, mirroring `check:tokens`.

New guidance in **Foundations → Typography** documents which scientific characters each typeface actually covers. The short version: Greek letters, subscripts, superscript minus, arrows, and primes exist only in Inter, so they fall back in body copy (Public Sans) and code (DM Mono), where non-monospaced fallbacks also break the character grid.
