/**
 * ============================================================
 * HDS Webfont Subset Ranges
 * @nasa-hds/core
 * ============================================================
 * Single source of truth for how HDS splits its webfonts.
 *
 * Consumed by:
 *   - scripts/subset-fonts.mjs — cuts the woff2 files in dist/
 *     and generates src/scss/base/_webfonts.scss
 *
 * WHY SPLIT AT ALL
 * ----------------
 * Inter ships ~2,850 codepoints: Cyrillic, polytonic Greek,
 * Vietnamese, IPA, and ~744 private-use stylistic alternates.
 * A .gov page rendering English or Spanish downloads all of it
 * — roughly 112 KB per weight, and HDS ships ten weights.
 *
 * Splitting on `unicode-range` lets the browser fetch only the
 * files a page's text actually needs. It is fully automatic: a
 * page with Cyrillic text pulls the Cyrillic file with no work
 * from the site, and an English page never sees it. That matters
 * because HDS's largest consumer segment has no build pipeline
 * and therefore no way to optimize this themselves.
 *
 * THE BASE RANGE IS NOT THE USUAL "latin"
 * ---------------------------------------
 * The conventional Google-Fonts `latin` / `latin-ext` split does
 * NOT include Greek letters, math operators, sub/superscripts,
 * arrows, or fractions. On a NASA site that silently breaks
 * ordinary technical copy — `Δv`, `λ = 550 nm`, `CO₂`, `10⁻⁹ m`,
 * `±`, `≈`, `≤`, `∞`, `√`, `∑`, `∫`, `→`, `½` — each character
 * falling back to a mismatched system font mid-sentence.
 *
 * So the base range folds those blocks in. It costs ~11 KB per
 * weight over a bare latin subset and is not optional for HDS.
 *
 * Latin-Extended (Polish, Czech, Turkish, Romanian) is NOT in the
 * base range: Spanish — by far the most common non-English case
 * on NASA sites — lives entirely in Latin-1, which is in the base.
 * Central and Eastern European pages pick up `latin-ext` on demand
 * exactly like Cyrillic.
 *
 * ORDER MATTERS
 * -------------
 * `base` must be first. It keeps the original filename, so
 * existing deep links to e.g. assets/fonts/inter/Inter-Regular.woff2
 * keep resolving — the file is simply smaller. Every other range
 * is emitted as `<Name>.<id>.woff2` alongside it.
 * ============================================================
 */

/** Latin-1 and the punctuation/symbols every page needs. */
const LATIN = [
  'U+0000-00FF',
  'U+0131',
  'U+0152-0153',
  'U+02BB-02BC',
  'U+02C6',
  'U+02DA',
  'U+02DC',
  'U+2000-206F',
  'U+20AC',
  'U+2122',
  'U+2212',
  'U+2215',
  'U+FEFF',
  'U+FFFD',
];

/**
 * Scientific and technical characters. Folded into the base range
 * because NASA body copy uses them inline. See header.
 *   U+02B0-02FF  modifier letters (RA hours: 12ʰ)
 *   U+0370-03FF  Greek (Δ Ω θ λ μ α β σ π)
 *   U+2070-209F  super/subscripts (10⁻⁹, CO₂)
 *   U+2100-214F  letterlike (™ ℓ Å)
 *   U+2150-218F  fractions (⅓ ⅔)
 *   U+2190-21FF  arrows (→ ⇒)
 *   U+2200-22FF  math operators (± ≈ ≤ ∞ √ ∑ ∫ ∂ ′ ″)
 *   U+2300-23FF  misc technical
 *   U+25A0-25FF  geometric shapes
 *   U+27F0-27FF  supplemental arrows (⟶)
 *   U+2A00-2AFF  supplemental math
 */
const SCIENTIFIC = [
  'U+02B0-02FF',
  'U+0370-03FF',
  'U+2070-209F',
  'U+2100-214F',
  'U+2150-218F',
  'U+2190-21FF',
  'U+2200-22FF',
  'U+2300-23FF',
  'U+25A0-25FF',
  'U+27F0-27FF',
  'U+2A00-2AFF',
];

/**
 * Which families are worth splitting, keyed by directory under
 * dist/assets/fonts.
 *
 *   display  must match the @font-face family name USWDS emits, from
 *            $theme-typeface-tokens in _hds-uswds-theme.scss.
 *   source   the unsubsetted originals. Always read from here and write
 *            to dist, never subset dist in place — otherwise a second
 *            run would re-subset already-subset files, and the extra
 *            ranges (already stripped out) would look uncovered.
 *
 * ONLY INTER IS SPLIT, deliberately:
 *
 *   Inter        2,852 codepoints, ~112 KB/weight, 10 weights.
 *                All of the opportunity is here.
 *   Public Sans    564 codepoints,  ~32 KB/weight. Measured: base
 *                subset (22 KB) + a latin-ext face (13 KB) totals
 *                MORE than the 32 KB original, because per-file woff2
 *                table overhead swamps the saving. Left untouched.
 *   DM Mono        221 codepoints,  ~15 KB/weight. Subsetting saves
 *                under 1 KB/weight. Not worth the moving parts.
 *
 * Splitting a font whose glyphs are already nearly all in the base
 * range makes the package bigger, not smaller. Measure before adding
 * a family here.
 */
export const SPLIT_FAMILIES = {
  inter: { display: 'Inter', source: 'src/assets/fonts/inter' },
};

/**
 * Minimum number of codepoints a font must actually have inside a range
 * before that range gets its own @font-face.
 *
 * This guard is not cosmetic. `unicode-range` matches on the DECLARED
 * range, not on real glyph coverage — so declaring a Cyrillic face for a
 * font with no Cyrillic letters makes the browser select that file for
 * Russian text and render blank .notdef boxes, which is strictly worse
 * than letting it fall back to a system font. Public Sans tripped exactly
 * this: its only codepoint in the Cyrillic range is № (U+2116).
 */
export const MIN_COVERAGE = 24;

export const FONT_SUBSETS = [
  {
    id: 'base',
    label: 'Latin-1 + punctuation + Greek, math, sub/superscripts, arrows, fractions',
    ranges: [...LATIN, ...SCIENTIFIC],
    // Keeps the original filename so existing asset URLs keep working.
    keepsOriginalFilename: true,
  },
  {
    id: 'latin-ext',
    label: 'Latin Extended — Polish, Czech, Turkish, Romanian, Croatian',
    ranges: [
      'U+0100-02AF',
      'U+0304',
      'U+0308',
      'U+0329',
      'U+1E00-1E9F',
      'U+1EF2-1EFF',
      'U+2020',
      'U+20A0-20AB',
      'U+20AD-20C0',
      'U+2C60-2C7F',
      'U+A720-A7FF',
    ],
  },
  {
    id: 'cyrillic',
    label: 'Cyrillic — Russian, Ukrainian, Bulgarian, Serbian',
    ranges: [
      'U+0301',
      'U+0400-045F',
      'U+0460-052F',
      'U+1C80-1C88',
      'U+20B4',
      'U+2DE0-2DFF',
      'U+A640-A69F',
      'U+FE2E-FE2F',
      'U+2116',
    ],
  },
  {
    id: 'vietnamese',
    label: 'Vietnamese',
    ranges: [
      'U+0102-0103',
      'U+0110-0111',
      'U+0128-0129',
      'U+0168-0169',
      'U+01A0-01A1',
      'U+01AF-01B0',
      'U+0300-0301',
      'U+0303-0304',
      'U+0308-0309',
      'U+0323',
      'U+0329',
      'U+1EA0-1EF9',
      'U+20AB',
    ],
  },
];

/** The CSS `unicode-range` value for a subset. */
export function unicodeRange(subset) {
  return subset.ranges.join(', ');
}

/** Every codepoint a subset covers, as an array of numbers. */
export function codepoints(subset) {
  const out = [];
  for (const part of subset.ranges) {
    const spec = part.replace('U+', '');
    if (spec.includes('-')) {
      const [lo, hi] = spec.split('-').map((h) => parseInt(h, 16));
      for (let c = lo; c <= hi; c += 1) out.push(c);
    } else {
      out.push(parseInt(spec, 16));
    }
  }
  return out;
}
