---
'@nasa-hds/core': minor
---

Split Inter into Unicode-range subsets — roughly half the font weight on a typical page

Inter shipped unsubsetted: 2,852 codepoints per weight across ten weights, including Cyrillic, polytonic Greek, Vietnamese, IPA, and about 744 private-use stylistic alternates. Every page downloaded all of it to render English. Measured on a representative page, webfonts were 87% of total transfer.

Inter is now cut into four ranges at build time. On a representative page this takes total transfer from **564 KB to 279 KB (−51%)**, and the published tarball from 3,026,030 to 2,795,024 packed bytes.

**No action required, and nothing is lost.** The base file keeps its original name and covers Latin-1 plus the scientific characters. Latin Extended, Cyrillic, and Vietnamese are separate files that the browser fetches automatically when a page contains that script — no configuration, on both the compiled-CSS and Sass paths. Rendering is unchanged: text metrics are identical to three decimal places in every language tested.

Two things to know:

- **Copy the whole `fonts/` directory.** If your build copies font files selectively based on what the CSS appears to reference, a Russian or Polish page will lose its webfont. The extra range files are referenced from `@font-face` rules that only apply conditionally.
- **`Inter-*.woff2` files now contain fewer glyphs.** If you deep-link one through `@nasa-hds/core/assets/*`, it still resolves and covers Latin-1, Greek, math, sub/superscripts, arrows, and fractions — but no longer Cyrillic, Vietnamese, polytonic Greek, or IPA. Those live in the sibling range files.

**The base range deliberately includes scientific characters.** The conventional `latin`/`latin-ext` split omits Greek, math operators, sub/superscripts, arrows, and fractions, which silently breaks ordinary NASA technical copy — `Δv`, `λ = 550 nm`, `CO₂`, `10⁻⁹ m`, `±`, `≈`, `≤`, `∞`, `√`, `∑`, `∫`, `→`, `½`. Those blocks cost about 11 KB per weight and are folded into the file every page loads. Latin Extended is on demand instead, since Spanish sits entirely within Latin-1.

Only Inter is split. Public Sans and DM Mono are byte-identical to before — measured, splitting them costs more in per-file woff2 overhead than it saves.

Also adds `npm run check:webfonts`, a drift gate for the generated `src/scss/base/_webfonts.scss`, mirroring `check:tokens`.

New guidance in **Foundations → Typography** documents which scientific characters each typeface actually covers. The short version: Greek letters, subscripts, superscript minus, arrows, and primes exist only in Inter, so they fall back in body copy (Public Sans) and code (DM Mono), where non-monospaced fallbacks also break the character grid.
