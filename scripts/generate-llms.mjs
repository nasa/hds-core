#!/usr/bin/env node
/**
 * generate-llms.mjs
 *
 * Generates an llms.txt index plus one Markdown file per documentation page
 * from a built Storybook, following https://llmstxt.org/.
 *
 * The point of this script — and the reason we don't use an off-the-shelf
 * extractor — is that HDS Core is a CSS-only design system. The deliverable
 * for a consuming AI is *markup*, and markup only exists after a story's
 * render function runs. So each <Canvas of={...} /> is replaced with the
 * real rendered HTML, captured from a headless browser.
 *
 * Prerequisite: npm run build-storybook
 * Usage:        node scripts/generate-llms.mjs [--dist storybook-static]
 *                                              [--base-url https://nasa.github.io/hds-core]
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ─── Options ──────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};

const distDir = path.resolve(repoRoot, opt('dist', 'storybook-static'));
const baseUrl = opt('base-url', 'https://nasa.github.io/hds-core').replace(/\/$/, '');
const outDir = path.join(distDir, 'llms');
const PORT = 6120;

// Sidebar order from .storybook/preview.js storySort.
const SECTIONS = ['Overview', 'Foundations', 'Components', 'Guides'];

// ─── Static file server (Playwright needs an origin, not file://) ─────────────

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

// ─── Story markup capture ─────────────────────────────────────────────────────

/**
 * Strip the common leading indentation left behind by template-literal
 * render functions, so the emitted HTML reads like hand-written markup.
 */
function dedent(html) {
  const lines = html.replace(/\r/g, '').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines.at(-1).trim()) lines.pop();
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length);
  const shift = indents.length ? Math.min(...indents) : 0;
  return lines
    .map((l) => l.slice(shift).trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
}

async function captureStories(page, ids) {
  const markup = new Map();
  for (const id of ids) {
    await page.goto(`http://localhost:${PORT}/iframe.html?id=${id}&viewMode=story`, {
      waitUntil: 'networkidle',
    });
    // Decorators in preview.js defer USWDS init to setTimeout(0); give the
    // DOM a beat to settle so we capture post-init markup.
    await page.waitForTimeout(400);
    const html = await page.evaluate(() => document.querySelector('#storybook-root')?.innerHTML ?? '');
    if (!html.trim()) {
      console.warn(`  ! empty render: ${id}`);
      continue;
    }
    markup.set(id, dedent(html));
  }
  return markup;
}

// ─── MDX → Markdown ───────────────────────────────────────────────────────────

const NOTE_LABELS = {
  uswds: 'Differs from USWDS',
  figma: 'Differs from Figma',
  code: 'How this works',
};

/** Minimal inline-JSX to Markdown for the contents of <Note> blocks. */
function inlineJsxToMarkdown(s) {
  return s
    .replace(/<code>([\s\S]*?)<\/code>/g, (_, t) => `\`${t.trim()}\``)
    .replace(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, t) => `[${t.trim()}](${href})`)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Rewrite Storybook's in-app doc links to sibling Markdown files.
 * Returns the rewritten text plus any targets that don't exist in the index —
 * those are broken links in the source MDX and worth surfacing.
 */
function rewriteDocLinks(text, knownSlugs, unresolved) {
  return text.replace(/\(\/?\?path=\/docs\/([a-z0-9-]+?)--docs(#[^)]*)?\)/g, (match, slug, hash = '') => {
    if (!knownSlugs.has(slug)) {
      unresolved.add(slug);
      return match;
    }
    return `(./${slug}.md${hash})`;
  });
}

function mdxToMarkdown(source, { storyIdFor, markup, knownSlugs, unresolved }) {
  let text = source;

  // Storybook scaffolding that carries no meaning outside the app.
  text = text.replace(/^import\s[\s\S]*?;\s*$/gm, '');
  text = text.replace(/<Meta\b[^>]*\/>\s*/g, '');
  text = text.replace(/^>\s*Use the palette switcher.*$/gm, '');
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // <Canvas of={NS.Export} /> → the story's real rendered markup.
  text = text.replace(/<Canvas\s+of=\{([A-Za-z0-9_$]+)\.([A-Za-z0-9_$]+)\}\s*\/>/g, (match, ns, exportName) => {
    const id = storyIdFor(ns, exportName);
    if (!id || !markup.has(id)) {
      console.warn(`  ! unresolved Canvas: ${ns}.${exportName}`);
      return '';
    }
    return `\`\`\`html\n${markup.get(id)}\n\`\`\``;
  });

  // <Note type="uswds">…</Note> → labelled blockquote.
  text = text.replace(/<Note\s+type="([a-z]+)"\s*>([\s\S]*?)<\/Note>/g, (_, type, body) => {
    const label = NOTE_LABELS[type] ?? type;
    const content = inlineJsxToMarkdown(body);
    return `> **${label}:** ${content}`;
  });

  text = rewriteDocLinks(text, knownSlugs, unresolved);

  return text.replace(/\n{3,}/g, '\n\n').trim();
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const indexPath = path.join(distDir, 'index.json');
if (!fs.existsSync(indexPath)) {
  console.error(`No index.json at ${indexPath}. Run: npm run build-storybook`);
  process.exit(1);
}

const entries = Object.values(JSON.parse(fs.readFileSync(indexPath, 'utf8')).entries);
const docsEntries = entries.filter((e) => e.type === 'docs');
const storyEntries = entries.filter((e) => e.type === 'story');
const slugOf = (entry) => entry.id.replace(/--docs$/, '');
const knownSlugs = new Set(docsEntries.map(slugOf));

// exportName → story id, keyed by the stories file each MDX imports.
const storiesByImportPath = new Map();
for (const s of storyEntries) {
  if (!storiesByImportPath.has(s.importPath)) storiesByImportPath.set(s.importPath, new Map());
  storiesByImportPath.get(s.importPath).set(s.exportName, s.id);
}

/** Resolve `import * as NS from './Button.stories'` to an index importPath. */
function buildNamespaceMap(mdxSource, mdxImportPath) {
  const ns = new Map();
  const dir = path.posix.dirname(mdxImportPath);
  for (const m of mdxSource.matchAll(/import\s+\*\s+as\s+([A-Za-z0-9_$]+)\s+from\s+'([^']+)'/g)) {
    const [, name, spec] = m;
    if (!spec.startsWith('.')) continue;
    // normalize() strips a leading './', but index.json importPaths keep it.
    const joined = path.posix.normalize(path.posix.join(dir, spec));
    const candidates = joined.startsWith('.') ? [joined] : [`./${joined}`, joined];
    outer: for (const base of candidates) {
      for (const suffix of ['.js', '.jsx', '.ts', '.tsx', '']) {
        if (storiesByImportPath.has(base + suffix)) {
          ns.set(name, storiesByImportPath.get(base + suffix));
          break outer;
        }
      }
    }
  }
  return ns;
}

// Collect every story id referenced by a Canvas, so we only render what we need.
const pages = [];
const neededStoryIds = new Set();

for (const entry of docsEntries) {
  const mdxPath = path.resolve(repoRoot, entry.importPath);
  if (!fs.existsSync(mdxPath)) {
    console.warn(`  ! missing MDX source: ${entry.importPath}`);
    continue;
  }
  const source = fs.readFileSync(mdxPath, 'utf8');
  const namespaces = buildNamespaceMap(source, entry.importPath);
  const storyIdFor = (ns, exportName) => namespaces.get(ns)?.get(exportName);

  for (const m of source.matchAll(/<Canvas\s+of=\{([A-Za-z0-9_$]+)\.([A-Za-z0-9_$]+)\}\s*\/>/g)) {
    const id = storyIdFor(m[1], m[2]);
    if (id) neededStoryIds.add(id);
  }
  pages.push({ entry, source, storyIdFor });
}

console.log(`${pages.length} docs pages, ${neededStoryIds.size} stories to render`);

const server = await serve(distDir, PORT);
const browser = await chromium.launch();
const page = await browser.newPage();
const markup = await captureStories(page, [...neededStoryIds]);
await browser.close();
server.close();

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const unresolved = new Set();
const written = [];

for (const { entry, source, storyIdFor } of pages) {
  const slug = slugOf(entry);
  const body = mdxToMarkdown(source, { storyIdFor, markup, knownSlugs, unresolved });
  const header = [
    `<!-- Source: ${entry.importPath} -->`,
    `<!-- Storybook: ${baseUrl}/?path=/docs/${entry.id} -->`,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, `${slug}.md`), `${header}${body}\n`);
  written.push({ slug, title: entry.title });
}

// ─── llms.txt index ───────────────────────────────────────────────────────────

const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const sectionOf = (title) => title.split('/')[0];
const rank = (title) => {
  const i = SECTIONS.indexOf(sectionOf(title));
  return i === -1 ? SECTIONS.length : i;
};

const lines = [
  `# ${pkg.name} v${pkg.version}`,
  '',
  `> ${pkg.description} HDS Core ships compiled CSS and Sass — it is not a component library and contains no JavaScript. Components are applied as classes on standard HTML markup. Each page below includes the real rendered markup for every example.`,
  '',
];

for (const section of SECTIONS) {
  const inSection = written
    .filter((w) => sectionOf(w.title) === section)
    .sort((a, b) => a.title.localeCompare(b.title));
  if (!inSection.length) continue;
  lines.push(`## ${section}`, '');
  for (const { slug, title } of inSection) {
    lines.push(`- [${title}](${baseUrl}/llms/${slug}.md)`);
  }
  lines.push('');
}

const orphans = written.filter((w) => rank(w.title) === SECTIONS.length);
if (orphans.length) {
  lines.push('## Other', '');
  for (const { slug, title } of orphans) lines.push(`- [${title}](${baseUrl}/llms/${slug}.md)`);
  lines.push('');
}

fs.writeFileSync(path.join(distDir, 'llms.txt'), lines.join('\n'));

console.log(`Wrote ${written.length} pages to ${path.relative(repoRoot, outDir)}/`);
console.log(`Wrote ${path.relative(repoRoot, path.join(distDir, 'llms.txt'))}`);
if (unresolved.size) {
  console.warn(`\nBroken doc links in source MDX (target does not exist):`);
  for (const slug of [...unresolved].sort()) console.warn(`  ?path=/docs/${slug}--docs`);
}
