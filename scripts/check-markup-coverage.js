#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * check-markup-coverage.js
 *
 * Verifies that every selector in the public API snapshot appears in at least
 * one rendered story, and writes a class inventory derived from that markup.
 *
 * Why this exists: check:api-snapshot and check:tokens guard the CSS side of
 * the contract — which selectors and custom properties we ship. Nothing guards
 * the *markup* side. A class can be part of the public contract, be documented
 * in prose, and still have no tested HTML anywhere. Consumers (increasingly,
 * their coding agents) then invent markup instead of copying markup we have
 * axe-tested and snapshotted.
 *
 * Every story is executed under Vitest in real Chromium with a11y set to
 * `test: 'error'` in preview.js, so a class appearing in a rendered story is
 * a class whose markup we have actually verified.
 *
 * Prerequisite: npm run build-storybook
 * Usage:        node scripts/check-markup-coverage.js [--dist storybook-static]
 *                                                     [--write-inventory]
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import * as prettier from 'prettier';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = 6121;

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};
const distDir = path.resolve(ROOT, opt('dist', 'storybook-static'));
const writeInventory = argv.includes('--write-inventory');

/**
 * Generating the inventory and gating on coverage are separate concerns that
 * happen to need the same expensive render pass. Doc builds pass --no-gate so
 * a coverage shortfall reports without failing the build; CI runs without it,
 * where a shortfall should stop the pipeline.
 */
const gate = !argv.includes('--no-gate');

/**
 * Selectors that are part of the public contract but legitimately have no
 * rendered example. Each entry needs a reason — this list is the escape hatch,
 * not a backlog. Anything not listed here must appear in a story.
 */
const ALLOWED_WITHOUT_MARKUP = {
  'hds-print-visible': 'Print-only utility — has no visible rendered state.',
};

// ─── Static server (Playwright needs an origin, not file://) ─────────────────

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

function serve(root, port) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(root, urlPath === '/' ? '/index.html' : urlPath);
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.statusCode = 404;
      return res.end('Not found');
    }
    res.setHeader('Content-Type', MIME[path.extname(file)] ?? 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

// ─── Public API snapshot ─────────────────────────────────────────────────────

function readSnapshotSelectors() {
  const snapshot = fs.readFileSync(path.join(ROOT, 'public-api.snapshot.txt'), 'utf8');
  const section = snapshot.split('## Selectors — HDS Authored')[1];
  if (!section) {
    console.error('Error: could not find the "## Selectors — HDS Authored" section in public-api.snapshot.txt.');
    process.exit(1);
  }
  return section
    .split('\n')
    .filter((line) => line.startsWith('.'))
    .map((line) => line.slice(1).trim());
}

// ─── Markup capture ──────────────────────────────────────────────────────────

/**
 * Render every story and record, for each class, the element types it appears
 * on and the stories that demonstrate it.
 */
async function collectClasses(stories) {
  const server = await serve(distDir, PORT);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const seen = new Map();

  try {
    for (const story of stories) {
      await page.goto(`http://localhost:${PORT}/iframe.html?id=${story.id}&viewMode=story`, {
        waitUntil: 'domcontentloaded',
      });
      // Decorators in preview.js defer USWDS init to setTimeout(0).
      await page.waitForTimeout(120);

      const found = await page.evaluate(() => {
        const out = [];
        const root = document.querySelector('#storybook-root');
        if (!root) return out;
        root.querySelectorAll('[class]').forEach((el) => {
          el.classList.forEach((cls) => out.push([cls, el.tagName.toLowerCase()]));
        });
        return out;
      });

      for (const [cls, tag] of found) {
        if (!seen.has(cls)) seen.set(cls, { elements: new Set(), stories: new Set() });
        seen.get(cls).elements.add(tag);
        seen.get(cls).stories.add(story.id);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }

  return seen;
}

// ─── Inventory output ────────────────────────────────────────────────────────

/**
 * The element and example columns are derived from rendered markup, so they
 * cannot drift. They are descriptive, not prescriptive: they report what the
 * stories happen to do. Editorial columns (prohibited, requires USWDS JS) are
 * deliberately absent — they require judgment and belong in hand-authored docs.
 */
function renderInventory(selectors, seen) {
  const lines = [
    '<!-- Generated by scripts/check-markup-coverage.js. Do not edit directly. -->',
    '',
    '# HDS Core class inventory',
    '',
    'Every class below is part of the public API surface and appears in at least one',
    'story that is rendered in a real browser and checked with axe. The element and',
    'example columns are extracted from that rendered markup.',
    '',
    'This table reports what the tested markup does. It is not a specification, and it',
    'does not record which classes are prohibited or which require USWDS JavaScript —',
    'see the component guidance pages for that.',
    '',
    '| Class | Element(s) | Example story |',
    '| --- | --- | --- |',
  ];

  for (const selector of selectors) {
    const entry = seen.get(selector);
    if (!entry) continue;
    const elements = [...entry.elements]
      .sort()
      .map((el) => `\`<${el}>\``)
      .join(', ');
    const example = [...entry.stories].sort()[0];
    lines.push(`| \`.${selector}\` | ${elements} | \`${example}\` |`);
  }

  return `${lines.join('\n')}\n`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

const indexPath = path.join(distDir, 'index.json');
if (!fs.existsSync(indexPath)) {
  console.error(`Error: no index.json at ${path.relative(ROOT, indexPath)}.`);
  console.error('Run `npm run build-storybook` first.');
  process.exit(1);
}

const stories = Object.values(JSON.parse(fs.readFileSync(indexPath, 'utf8')).entries).filter(
  (entry) => entry.type === 'story',
);
const selectors = readSnapshotSelectors();

console.log(`Rendering ${stories.length} stories to collect tested markup...`);
const seen = await collectClasses(stories);

const missing = selectors.filter((selector) => !seen.has(selector));
const unexplained = missing.filter((selector) => !(selector in ALLOWED_WITHOUT_MARKUP));
const excused = missing.filter((selector) => selector in ALLOWED_WITHOUT_MARKUP);

console.log(
  `${seen.size} distinct classes in tested markup; ` +
    `${selectors.length - missing.length}/${selectors.length} public selectors covered.`,
);

if (writeInventory) {
  const outPath = path.join(distDir, 'llms', 'class-inventory.md');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  // Format with the repo config so `npm run format` passes and regenerating
  // never dirties the tree. Table alignment is the only visible effect.
  const options = await prettier.resolveConfig(outPath, {
    config: path.join(ROOT, '.config/prettierrc.json'),
  });
  const formatted = await prettier.format(renderInventory(selectors, seen), {
    ...options,
    filepath: outPath,
    parser: 'markdown',
  });
  fs.writeFileSync(outPath, formatted);
  console.log(`Wrote ${path.relative(ROOT, outPath)}`);
}

// A selector that stops being public should leave the allowlist with it,
// otherwise the exception outlives the thing it excused.
const staleExcuses = Object.keys(ALLOWED_WITHOUT_MARKUP).filter(
  (selector) => !selectors.includes(selector) || seen.has(selector),
);
if (staleExcuses.length) {
  console.error('\nError: stale entries in ALLOWED_WITHOUT_MARKUP — these now have markup, or are no longer public:\n');
  for (const selector of staleExcuses) console.error(`  .${selector}`);
  console.error('\nRemove them from the allowlist in scripts/check-markup-coverage.js.');
  if (gate) process.exit(1);
}

if (excused.length) {
  console.log(`\n${excused.length} selector(s) exempt by allowlist:`);
  for (const selector of excused) console.log(`  .${selector} — ${ALLOWED_WITHOUT_MARKUP[selector]}`);
}

if (unexplained.length) {
  console.error(`\nError: ${unexplained.length} public selector(s) have no tested markup:\n`);
  for (const selector of unexplained) console.error(`  .${selector}`);
  console.error('\nAdd a story that renders each one, or add it to ALLOWED_WITHOUT_MARKUP');
  console.error('in scripts/check-markup-coverage.js with a reason.');
  if (gate) process.exit(1);
  process.exit(0);
}

console.log('\n✓ Every public selector has tested markup.');
process.exit(0);
