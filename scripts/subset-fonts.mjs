/**
 * ============================================================
 * HDS Webfont Subsetter
 * @nasa-hds/core
 * ============================================================
 * Splits HDS webfonts by Unicode range so a page fetches only the
 * glyphs its text needs, and generates the matching @font-face
 * rules into src/scss/base/_webfonts.scss.
 *
 * Runs inside `npm run init`, after `copy:all` and before Sass.
 *
 * WHAT IT DOES TO dist/ (Inter only — see SPLIT_FAMILIES)
 *   Inter-Regular.woff2             rewritten, base range only
 *   Inter-Regular.latin-ext.woff2   new
 *   Inter-Regular.cyrillic.woff2    new
 *   Inter-Regular.vietnamese.woff2  new
 *
 * The base file keeps its original name, so USWDS's own @font-face
 * output — which carries no unicode-range and therefore covers every
 * page — still resolves, and existing deep links to the asset still
 * work. HDS then declares one narrower face per extra range.
 *
 * The browser resolves @font-face per codepoint against the narrowest
 * matching range, so the extra faces win for their scripts while the
 * base file serves everything else. There is no ordering dependency
 * on the USWDS rules, which is what lets this work identically in the
 * compiled-CSS and Sass consumption paths.
 *
 * Sources in src/assets/fonts/ are never modified — dist is
 * regenerated from them on every build, so this is idempotent.
 * ============================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import * as fontkit from 'fontkit';
import subsetFont from 'subset-font';

import {
  FONT_SUBSETS,
  MIN_COVERAGE,
  SPLIT_FAMILIES,
  codepoints,
  unicodeRange,
} from '../.config/font-subsets.js';

const FONTS_DIR = 'dist/assets/fonts';
const SASS_OUT = 'src/scss/base/_webfonts.scss';

const BASE = FONT_SUBSETS.find((s) => s.keepsOriginalFilename);
const EXTRA = FONT_SUBSETS.filter((s) => !s.keepsOriginalFilename);

/** Filename stem -> { weight, style }. Mirrors $theme-font-*-custom-src. */
const WEIGHTS = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};

function parseFace(stem) {
  const italic = /Italic$/.test(stem);
  const part = stem.replace(/^[^-]+-/, '').replace(/Italic$/, '') || 'Regular';
  const weight = WEIGHTS[part];
  if (weight === undefined) return null;
  return { weight, style: italic ? 'italic' : 'normal' };
}

async function subsetTo(buffer, subset) {
  return subsetFont(buffer, String.fromCodePoint(...codepoints(subset)), {
    targetFormat: 'woff2',
  });
}

/** How many codepoints of `subset` this font actually contains. */
function coverage(file, subset) {
  const set = new Set(fontkit.openSync(file).characterSet);
  return codepoints(subset).filter((c) => set.has(c)).length;
}

async function main() {
  if (!fs.existsSync(FONTS_DIR)) {
    console.error(`✗ ${FONTS_DIR} not found — run \`npm run init\` first.`);
    process.exit(1);
  }

  const declarations = [];
  const report = [];
  let before = 0;
  let after = 0;

  for (const [dir, { display, source }] of Object.entries(SPLIT_FAMILIES)) {
    const outDir = path.join(FONTS_DIR, dir);
    if (!fs.existsSync(source)) {
      console.error(`✗ ${source} not found — cannot subset ${dir}.`);
      process.exit(1);
    }
    if (!fs.existsSync(outDir)) {
      console.error(`✗ ${outDir} not found — is copy:all wired before this step?`);
      process.exit(1);
    }

    const files = fs
      .readdirSync(source)
      .filter((f) => f.endsWith('.woff2'))
      .sort();

    for (const file of files) {
      const stem = file.replace(/\.woff2$/, '');
      const face = parseFace(stem);
      if (!face) {
        console.error(`✗ ${dir}/${file}: cannot derive weight/style from filename.`);
        process.exit(1);
      }

      // Always read the unsubsetted original, never dist — see SPLIT_FAMILIES.
      const src = path.join(source, file);
      const original = fs.readFileSync(src);
      before += original.length;

      const covered = Object.fromEntries(EXTRA.map((s) => [s.id, coverage(src, s)]));

      // Base range overwrites the copy in dist, keeping the original name.
      const baseBuf = await subsetTo(original, BASE);
      fs.writeFileSync(path.join(outDir, file), baseBuf);
      after += baseBuf.length;
      const sizes = { base: baseBuf.length };

      for (const subset of EXTRA) {
        if (covered[subset.id] < MIN_COVERAGE) continue;
        const buf = await subsetTo(original, subset);
        fs.writeFileSync(path.join(outDir, `${stem}.${subset.id}.woff2`), buf);
        after += buf.length;
        sizes[subset.id] = buf.length;
        declarations.push({
          family: display,
          dir,
          file: `${stem}.${subset.id}.woff2`,
          weight: face.weight,
          style: face.style,
          subset,
        });
      }
      report.push({ name: `${dir}/${stem}`, original: original.length, sizes, covered });
    }
  }

  writeSass(declarations);

  const pct = before ? Math.round(((before - after) / before) * 100) : 0;
  console.log(
    `✓ ${report.length} faces subset: ${before.toLocaleString()} B → ${after.toLocaleString()} B ` +
      `on disk (${pct >= 0 ? '−' : '+'}${Math.abs(pct)}%), ` +
      `${declarations.length} extra-range @font-face rules generated`
  );
  for (const r of report) {
    const parts = Object.entries(r.sizes).map(([k, v]) => `${k} ${v.toLocaleString()}`);
    const dropped = EXTRA.filter((s) => r.covered[s.id] < MIN_COVERAGE).map(
      (s) => `${s.id}: ${r.covered[s.id]} cp < ${MIN_COVERAGE}`
    );
    console.log(
      `    ${r.name.padEnd(30)} ${r.original.toLocaleString().padStart(9)} B → ${parts.join(', ')}` +
        (dropped.length ? `   [skipped ${dropped.join('; ')}]` : '')
    );
  }
}

function writeSass(declarations) {
  const lines = [
    '// ============================================================',
    '// HDS Webfonts — Extended Unicode Ranges',
    '// @nasa-hds/core',
    '// ============================================================',
    '// Do not edit directly. Generated by scripts/subset-fonts.mjs',
    '// from .config/font-subsets.js — run `npm run subset:fonts`.',
    '//',
    '// USWDS emits the base @font-face rules from $theme-font-path.',
    '// Those carry no unicode-range, so they apply to every page. The',
    '// rules below add back the scripts that were subset OUT of those',
    '// base files — Latin Extended, Cyrillic, Vietnamese — each scoped',
    '// to its own unicode-range.',
    '//',
    '// The browser resolves @font-face per codepoint against the',
    '// narrowest matching range, so these win for their scripts and the',
    '// base files serve everything else. A page with no Cyrillic text',
    '// never requests a Cyrillic file, and a site needs no',
    '// configuration to get one when it does.',
    '//',
    '// Paths interpolate $hds-font-path, so the $hds-asset-path',
    '// override applies to these faces exactly as to the base ones.',
    '// ============================================================',
    '',
    "@use '../hds-config' as *;",
    '',
  ];

  for (const subset of FONT_SUBSETS) {
    const group = declarations.filter((d) => d.subset.id === subset.id);
    if (!group.length) continue;
    lines.push(`// ── ${subset.id} — ${subset.label} ──`);
    lines.push('');
    for (const d of group) {
      // Stylelint's font-family-name-quotes: quote only when the name
      // contains a space (e.g. 'DM Mono'), leave single words bare.
      const family = /\s/.test(d.family) ? `'${d.family}'` : d.family;
      lines.push('@font-face {');
      lines.push(`  font-family: ${family};`);
      lines.push(`  font-style: ${d.style};`);
      lines.push(`  font-weight: ${d.weight};`);
      lines.push('  font-display: fallback;');
      lines.push(`  src: url('#{$hds-font-path}/${d.dir}/${d.file}') format('woff2');`);
      lines.push(`  unicode-range: ${unicodeRange(subset)};`);
      lines.push('}');
      lines.push('');
    }
  }

  fs.mkdirSync(path.dirname(SASS_OUT), { recursive: true });
  fs.writeFileSync(SASS_OUT, `${lines.join('\n').trimEnd()}\n`);
  console.log(`✓ wrote ${SASS_OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
