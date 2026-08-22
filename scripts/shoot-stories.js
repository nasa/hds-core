/* eslint-disable no-console */
// Homegrown visual regression capture.
//
// Screenshots every story in a served static Storybook, writes one PNG per
// story plus a manifest of content hashes, and can diff two manifests to say
// exactly which stories changed. Built for pre-Chromatic checks on a USWDS
// version bump: capture before, upgrade, capture after, compare.
//
// This is a local QA aid, not a CI gate. Chromatic remains the source of truth
// for visual review -- this exists so a bump can be triaged before spending a
// Chromatic run, and so a reviewer has before/after images to look at.
//
// Discovery uses Storybook's public index.json (v5: `entries` keyed by id) and
// the iframe.html isolation URL, matching scripts/check-docs-render.js.
//
// Usage:
//   node scripts/shoot-stories.js shoot --out .visual/before
//   node scripts/shoot-stories.js shoot --out .visual/after
//   node scripts/shoot-stories.js compare .visual/before .visual/after
//
// Options for `shoot`:
//   --out <dir>          Output directory (required)
//   --url <url>          Storybook base URL (default http://127.0.0.1:6006)
//   --filter <regex>     Only stories whose id matches
//   --palette <name>     Storybook palette global (white|light|midtone|dark|blue|black)
//   --width <px>         Viewport width (default 1024)
//   --concurrency <n>    Parallel pages (default 2)
//   --settle <ms>        Settle delay before capture (default 600)

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const BASE_URL_DEFAULT = 'http://127.0.0.1:6006';
const NAV_TIMEOUT = 30_000;
const ROOT_TIMEOUT = 15_000;

// Storybook decorators defer accordion collapse, table-sort button injection,
// and in-page-nav build to setTimeout(0). Fonts and mask-image sprites also
// need a beat. This is the settle window after networkidle.
//
// 600ms rather than something tighter because decode of the SVG sprite behind
// mask-image lands after `document.fonts.ready` and after networkidle. At
// 250ms roughly 8% of stories captured mid-decode and produced byte-level
// diffs on reruns -- form controls and icon-bearing components especially.
const SETTLE_MS_DEFAULT = 400;

// Consecutive identical screenshots required before a capture is accepted, and
// the pause between attempts.
const STABILITY_ATTEMPTS = 6;
const STABILITY_INTERVAL_MS = 150;

// Animation and caret suppression. Transitions (the accordion chevron rotate)
// and blinking carets are the two things that make repeat captures differ.
const FREEZE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
  html { scrollbar-width: none; }
  ::-webkit-scrollbar { display: none; }
`;

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}

const sha256 = (buffer) => crypto.createHash('sha256').update(buffer).digest('hex');

// Hash decoded pixels, never the PNG file bytes.
//
// Chromium's PNG encoder is not byte-reproducible: two captures of a
// pixel-identical page routinely differ in compressed output. Hashing the file
// produced an ~8% false-positive rate; hashing the RGBA buffer is exact.
const pixelHash = (pngBuffer) => {
  const { data, width, height } = PNG.sync.read(pngBuffer);
  return sha256(Buffer.concat([Buffer.from(`${width}x${height}:`), Buffer.from(data)]));
};

// A filesystem-safe name. Story ids are already kebab-case and unique, so this
// only guards against a future id containing a path separator.
const safeName = (id) => id.replace(/[^a-z0-9._-]/gi, '_');

async function shoot(args) {
  const outDir = args.out;
  if (!outDir || outDir === true) throw new Error('shoot requires --out <dir>');

  const baseUrl = args.url && args.url !== true ? args.url : BASE_URL_DEFAULT;
  const width = Number(args.width ?? 1024);
  const concurrency = Number(args.concurrency ?? 2);
  const settleMs = Number(args.settle ?? SETTLE_MS_DEFAULT);
  const filter = args.filter && args.filter !== true ? new RegExp(args.filter) : null;
  const palette = args.palette && args.palette !== true ? args.palette : null;

  const indexRes = await fetch(`${baseUrl}/index.json`);
  if (!indexRes.ok) {
    throw new Error(`Could not fetch ${baseUrl}/index.json (HTTP ${indexRes.status}). Is the static Storybook served?`);
  }
  const index = await indexRes.json();

  let stories = Object.values(index.entries).filter((e) => e.type === 'story');
  if (filter) stories = stories.filter((e) => filter.test(e.id));

  if (stories.length === 0) {
    throw new Error('No stories matched. Refusing to write an empty manifest.');
  }
  stories.sort((a, b) => a.id.localeCompare(b.id));

  fs.mkdirSync(outDir, { recursive: true });

  console.log(`Capturing ${stories.length} stories at ${width}px${palette ? ` (palette: ${palette})` : ''}`);

  // Environments that ship a preinstalled Chromium (containers, sandboxes) may
  // have a build number Playwright's own resolver rejects. Point at it rather
  // than downloading a second copy.
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });

  const manifest = {
    capturedAt: new Date().toISOString(),
    baseUrl,
    width,
    palette,
    stories: {},
  };
  const failures = [];
  const unstable = [];

  // Fixed pool of pages rather than one page per story: page creation dominates
  // runtime at this story count.
  const queue = [...stories];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    const page = await context.newPage();
    await page.addInitScript(() => {
      // Keep Math.random deterministic so any story seeding sample content
      // does not produce a spurious diff.
      let seed = 0x2f6e2b1;
      Math.random = () => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
      };
    });

    for (;;) {
      const entry = queue.shift();
      if (!entry) break;

      const params = new URLSearchParams({ id: entry.id, viewMode: 'story' });
      if (palette) params.set('globals', `palette:${palette}`);
      const url = `${baseUrl}/iframe.html?${params.toString()}`;

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
        await page.locator('#storybook-root').first().waitFor({ state: 'attached', timeout: ROOT_TIMEOUT });
        await page.addStyleTag({ content: FREEZE_CSS });
        await page.evaluate(() => document.fonts.ready);
        // Wait for every image and mask/background asset to finish decoding,
        // not just to finish downloading. `networkidle` and `fonts.ready` both
        // resolve before decode completes.
        await page.evaluate(async () => {
          const nodes = Array.from(document.images);
          await Promise.all(nodes.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve())));
        });
        await page.waitForTimeout(settleMs);

        // Capture until two consecutive frames are byte-identical.
        //
        // Timing alone cannot make this reliable: CSS background images (the
        // select arrow, icon masks) are not covered by `document.images`
        // decode, and no event fires when they finish painting. Rather than
        // guess at an ever-larger delay, shoot twice and accept only a stable
        // pair. Re-screenshotting is cheap -- the page is already loaded -- so
        // this costs far less than the reload a false positive would trigger
        // during review.
        let buffer = null;
        let previousHash = null;
        let stable = false;

        for (let attempt = 0; attempt < STABILITY_ATTEMPTS; attempt += 1) {
          // Two frames: one to flush style/layout, one to flush paint.
          await page.evaluate(
            () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
          );
          const shot = await page.screenshot({ fullPage: true });
          const hash = pixelHash(shot);
          if (hash === previousHash) {
            buffer = shot;
            stable = true;
            break;
          }
          previousHash = hash;
          buffer = shot;
          await page.waitForTimeout(STABILITY_INTERVAL_MS);
        }

        if (!stable) unstable.push(entry.id);

        const file = `${safeName(entry.id)}.png`;
        fs.writeFileSync(path.join(outDir, file), buffer);

        manifest.stories[entry.id] = {
          file,
          title: entry.title,
          name: entry.name,
          sha256: pixelHash(buffer),
          bytes: buffer.length,
          stable,
        };
      } catch (err) {
        failures.push({ id: entry.id, error: err.message });
      }
    }

    await page.close();
  });

  await Promise.all(workers);
  await browser.close();

  fs.writeFileSync(path.join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  const captured = Object.keys(manifest.stories).length;
  console.log(`Captured ${captured} stories to ${outDir}`);

  if (unstable.length) {
    console.warn(
      `\n⚠ ${unstable.length} story/stories never settled to a stable frame. ` + 'Treat their diffs as unreliable:',
    );
    unstable.forEach((id) => console.warn(`  ${id}`));
  }

  if (failures.length) {
    console.error(`\n${failures.length} story/stories failed to capture:`);
    failures.forEach((f) => console.error(`  ${f.id}: ${f.error}`));
    process.exitCode = 1;
  }
}

function compare(beforeDir, afterDir) {
  const load = (dir) => {
    const file = path.join(dir, 'manifest.json');
    if (!fs.existsSync(file)) throw new Error(`No manifest.json in ${dir}. Run \`shoot --out ${dir}\` first.`);
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  };

  const before = load(beforeDir);
  const after = load(afterDir);

  if (before.width !== after.width || before.palette !== after.palette) {
    console.warn(
      `⚠ Captures used different settings (before: ${before.width}px/${before.palette}, ` +
        `after: ${after.width}px/${after.palette}). Differences below are not meaningful.`,
    );
  }

  const beforeIds = new Set(Object.keys(before.stories));
  const afterIds = new Set(Object.keys(after.stories));

  const added = [...afterIds].filter((id) => !beforeIds.has(id)).sort();
  const removed = [...beforeIds].filter((id) => !afterIds.has(id)).sort();

  // The pixel hash is a fast path only. A matching hash is proof of no change,
  // but a differing hash is not proof of a change: sub-threshold antialiasing
  // shifts alter pixel values without altering what anyone can see. Every
  // hash mismatch is therefore confirmed with pixelmatch before it is called a
  // change, which is what keeps the false-positive rate at zero.
  const candidates = [...beforeIds]
    .filter((id) => afterIds.has(id) && before.stories[id].sha256 !== after.stories[id].sha256)
    .sort();

  const identical = [...beforeIds].filter(
    (id) => afterIds.has(id) && before.stories[id].sha256 === after.stories[id].sha256,
  ).length;

  const list = (label, ids) => {
    if (!ids.length) return;
    console.log(`\n${label}:`);
    ids.forEach((id) => {
      const meta = after.stories[id] ?? before.stories[id];
      console.log(`  ${id}  (${meta.title} › ${meta.name})`);
    });
  };

  // Quantify each change and write a diff image, so a reviewer can tell a
  // one-line shift apart from a component that reflowed entirely.
  const diffDir = path.join(afterDir, 'diff');
  const details = [];
  const subThreshold = [];

  if (candidates.length) {
    fs.mkdirSync(diffDir, { recursive: true });

    for (const id of candidates) {
      const a = PNG.sync.read(fs.readFileSync(path.join(beforeDir, before.stories[id].file)));
      const b = PNG.sync.read(fs.readFileSync(path.join(afterDir, after.stories[id].file)));

      if (a.width !== b.width || a.height !== b.height) {
        details.push({
          id,
          resized: true,
          before: `${a.width}x${a.height}`,
          after: `${b.width}x${b.height}`,
        });
        continue;
      }

      const diff = new PNG({ width: a.width, height: a.height });
      const pixels = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });

      if (pixels === 0) {
        subThreshold.push(id);
        continue;
      }

      const file = `${safeName(id)}.diff.png`;
      fs.writeFileSync(path.join(diffDir, file), PNG.sync.write(diff));

      details.push({
        id,
        pixels,
        total: a.width * a.height,
        percent: Number(((100 * pixels) / (a.width * a.height)).toFixed(4)),
        diffFile: path.join('diff', file),
      });
    }
  }

  const changedCount = details.length;
  const unchangedCount = identical + subThreshold.length;

  console.log(`\nVisual comparison: ${beforeDir} → ${afterDir}\n`);
  console.log(
    `  unchanged : ${unchangedCount}${subThreshold.length ? ` (${subThreshold.length} sub-threshold only)` : ''}`,
  );
  console.log(`  changed   : ${changedCount}`);
  console.log(`  added     : ${added.length}`);
  console.log(`  removed   : ${removed.length}`);

  if (details.length) {
    console.log('\nCHANGED (by magnitude):');
    const sorted = [...details].sort((x, y) => (y.pixels ?? Infinity) - (x.pixels ?? Infinity));
    for (const d of sorted) {
      const meta = after.stories[d.id] ?? before.stories[d.id];
      if (d.resized) {
        console.log(`  ${d.id}  — SIZE CHANGED ${d.before} → ${d.after}  (${meta.title} › ${meta.name})`);
      } else {
        console.log(`  ${d.id}  — ${d.pixels} px (${d.percent}%)  (${meta.title} › ${meta.name})`);
      }
    }
    console.log(`\nDiff images: ${diffDir}`);
  }

  list('ADDED', added);
  list('REMOVED', removed);

  const report = {
    before: beforeDir,
    after: afterDir,
    changed: details,
    added,
    removed,
    unchanged: unchangedCount,
    subThreshold,
  };
  fs.writeFileSync(path.join(afterDir, 'comparison.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`\nReport written to ${path.join(afterDir, 'comparison.json')}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];

  if (command === 'shoot') {
    await shoot(args);
  } else if (command === 'compare') {
    const [, beforeDir, afterDir] = args._;
    if (!beforeDir || !afterDir) throw new Error('compare requires <beforeDir> <afterDir>');
    compare(beforeDir, afterDir);
  } else {
    console.error('Usage: shoot-stories.js shoot --out <dir> | compare <beforeDir> <afterDir>');
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
