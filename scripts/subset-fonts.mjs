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
 *   Inter-Regular.woff2      rewritten, base range only
 *   Inter-Regular.ext.woff2  new — Latin Extended + Cyrillic + Vietnamese
 *
 * Two files per weight, not four: see TWO FILES PER WEIGHT in
 * .config/font-subsets.js for the measurements behind that.
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

import { FONT_SUBSETS, SPLIT_FAMILIES, codepoints, resolveSubset, unicodeRange } from '../.config/font-subsets.js';

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

/**
 * The subset a given font can actually serve, or null if it serves none of
 * it. Narrowed per script, so a merged range never promises glyphs the font
 * does not have — see resolveSubset in .config/font-subsets.js.
 */
function resolveFor(file, subset) {
  const set = new Set(fontkit.openSync(file).characterSet);
  return resolveSubset(subset, (c) => set.has(c));
}

/**
 * Which @font-face rules the generated Sass should contain.
 *
 * Depends only on the source fonts — which files exist, the weight/style
 * their names encode, and how much of each range they really cover. It does
 * NOT depend on the subset output, which is what lets `--check` verify the
 * committed Sass without producing a single woff2 or touching dist/.
 */
function plan() {
  const declarations = [];
  for (const [dir, { display, source }] of Object.entries(SPLIT_FAMILIES)) {
    if (!fs.existsSync(source)) {
      console.error(`✗ ${source} not found — cannot plan ${dir}.`);
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
      const src = path.join(source, file);
      for (const subset of EXTRA) {
        const resolved = resolveFor(src, subset);
        if (!resolved) continue;
        declarations.push({
          family: display,
          dir,
          file: `${stem}.${subset.id}.woff2`,
          weight: face.weight,
          style: face.style,
          subset: resolved,
        });
      }
    }
  }
  return declarations;
}

/** `--check`: fail if the committed Sass doesn't match what we'd generate. */
function check() {
  const expected = renderSass(plan());
  if (!fs.existsSync(SASS_OUT)) {
    console.error(`✗ ${SASS_OUT} is missing. Run \`npm run subset:fonts\` and commit the result.`);
    process.exit(1);
  }
  const actual = fs.readFileSync(SASS_OUT, 'utf8');
  if (actual === expected) {
    console.log(`✓ ${SASS_OUT} is up to date with .config/font-subsets.js`);
    return;
  }
  console.error(
    `✗ ${SASS_OUT} is out of date with .config/font-subsets.js and the fonts in src/assets/fonts.\n` +
      `  It is generated — do not hand-edit it.\n` +
      `  Run \`npm run subset:fonts\` and commit the result.\n`,
  );
  const a = actual.split('\n');
  const e = expected.split('\n');
  for (let i = 0; i < Math.max(a.length, e.length); i += 1) {
    if (a[i] !== e[i]) {
      console.error(`  first difference at line ${i + 1}:`);
      console.error(`    committed: ${a[i] ?? '(end of file)'}`);
      console.error(`    expected:  ${e[i] ?? '(end of file)'}`);
      break;
    }
  }
  process.exit(1);
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

      const resolved = Object.fromEntries(EXTRA.map((s) => [s.id, resolveFor(src, s)]));

      // Base range overwrites the copy in dist, keeping the original name.
      const baseBuf = await subsetTo(original, BASE);
      fs.writeFileSync(path.join(outDir, file), baseBuf);
      after += baseBuf.length;
      const sizes = { base: baseBuf.length };

      for (const subset of EXTRA) {
        const active = resolved[subset.id];
        if (!active) continue;
        const buf = await subsetTo(original, active);
        fs.writeFileSync(path.join(outDir, `${stem}.${subset.id}.woff2`), buf);
        after += buf.length;
        sizes[subset.id] = buf.length;
        declarations.push({
          family: display,
          dir,
          file: `${stem}.${subset.id}.woff2`,
          weight: face.weight,
          style: face.style,
          subset: active,
        });
      }
      report.push({ name: `${dir}/${stem}`, original: original.length, sizes, resolved });
    }
  }

  writeSass(declarations);

  const pct = before ? Math.round(((before - after) / before) * 100) : 0;
  console.log(
    `✓ ${report.length} faces subset: ${before.toLocaleString()} B → ${after.toLocaleString()} B ` +
      `on disk (${pct >= 0 ? '−' : '+'}${Math.abs(pct)}%), ` +
      `${declarations.length} extra-range @font-face rules generated`,
  );
  for (const r of report) {
    const parts = Object.entries(r.sizes).map(([k, v]) => `${k} ${v.toLocaleString()}`);
    const dropped = EXTRA.flatMap((s) =>
      (r.resolved[s.id]?.dropped ?? s.scripts ?? [s]).map(
        (d) => `${d.id}${d.codepoints === undefined ? '' : `: ${d.codepoints} cp`}`,
      ),
    );
    console.log(
      `    ${r.name.padEnd(30)} ${r.original.toLocaleString().padStart(9)} B → ${parts.join(', ')}` +
        (dropped.length ? `   [skipped ${dropped.join('; ')}]` : ''),
    );
  }
}

function writeSass(declarations) {
  fs.mkdirSync(path.dirname(SASS_OUT), { recursive: true });
  fs.writeFileSync(SASS_OUT, renderSass(declarations));
  console.log(`✓ wrote ${SASS_OUT}`);
}

/** Pure: declarations in, Sass source out. Shared by the write and check paths. */
function renderSass(declarations) {
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
    '// base files — Latin Extended, Cyrillic, and Vietnamese, together',
    '// in one file per weight, scoped to their combined unicode-range.',
    '//',
    '// The browser resolves @font-face per codepoint against the',
    '// narrowest matching range, so these win for their scripts and the',
    '// base files serve everything else. A page with no Cyrillic text',
    '// never requests the extended file, and a site needs no',
    '// configuration to get it when it does.',
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
      lines.push(`  unicode-range: ${unicodeRange(d.subset)};`);
      lines.push('}');
      lines.push('');
    }
  }

  return `${lines.join('\n').trimEnd()}\n`;
}

if (process.argv.includes('--check')) {
  check();
} else {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
