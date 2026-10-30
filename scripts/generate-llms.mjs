#!/usr/bin/env node
/**
 * generate-llms.mjs
 *
 * Generates an llms.txt index plus one Markdown file per documentation page
 * from a built Storybook, following https://llmstxt.org/.
 *
 * We don't use an off-the-shelf extractor because HDS Core is CSS-only: the
 * deliverable for a consuming AI is markup, and markup only exists after a
 * story's render function runs. So each <Canvas of={...} /> is replaced with
 * the rendered HTML, captured from a headless browser. Canvases with
 * sourceState="none" are skipped: their authors hid the code because it is
 * demo scaffolding, not markup to copy.
 *
 * Output goes into the built Storybook (llms.txt, llms/*.md) and is never
 * committed. Any unresolved Canvas, empty render or broken doc link exits
 * non-zero so the deploy fails rather than publishing a gap.
 *
 * Prerequisite: npm run build-storybook
 * Usage:        npm run docs:llms
 *               node scripts/generate-llms.mjs [--dist storybook-static]
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
const SECTIONS = ['Overview', 'Foundations', 'Components', 'Guides', 'About'];

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

/**
 * Call each story's own render function, without decorators, instead of
 * reading the mounted DOM. Adopters write the markup that goes in before
 * USWDS JS runs, and Storybook's decorators re-create that JS (in-page nav,
 * table sort buttons, accordion `hidden`), so the mounted DOM is runtime
 * output, not markup to copy.
 *
 * __STORYBOOK_PREVIEW__ is Storybook internals, not a public API. If an
 * upgrade changes it, this throws and the deploy fails loudly.
 */
async function captureStories(page, ids, problems) {
  await page.goto(`http://localhost:${PORT}/iframe.html`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__STORYBOOK_PREVIEW__?.storyStoreValue, null, { timeout: 30_000 });

  const markup = new Map();
  for (const id of ids) {
    const html = await page.evaluate(async (storyId) => {
      const store = window.__STORYBOOK_PREVIEW__.storyStoreValue;
      const story = await store.loadStory({ storyId });
      const out = story.undecoratedStoryFn(store.getStoryContext(story));
      return out instanceof Node ? (out.outerHTML ?? out.textContent) : String(out ?? '');
    }, id);
    if (!html.trim()) {
      problems.push(`empty render: ${id}`);
      continue;
    }
    markup.set(id, dedent(html));
  }
  return markup;
}

// ─── MDX → Markdown ───────────────────────────────────────────────────────────

/**
 * Lines that instruct a reader to interact with the Storybook UI. They are
 * correct in the app and meaningless in an export — worse than meaningless for
 * an agent, which cannot reach a toolbar and may waste turns looking for one.
 * `react-setup` even tells the reader to fetch markup from the "Show code"
 * panel, which this generator has already inlined into the page.
 *
 * Patterns are deliberately narrow and the count of stripped lines is logged,
 * so over-matching shows up rather than silently deleting guidance.
 */
const STORYBOOK_ONLY_PATTERNS = [
  /palette switcher/i,
  /\bShow code\b/i,
  /addons panel/i,
  /Storybook toolbar/i,
  /\bin the toolbar\b/i,
  /^Storybook includes tools\b/i,
];

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
  return (
    text
      .replace(/\(\/?\?path=\/docs\/([a-z0-9-]+?)--docs(#[^)]*)?\)/g, (match, slug, hash = '') => {
        if (!knownSlugs.has(slug)) {
          unresolved.add(slug);
          return match;
        }
        return `(./${slug}.md${hash})`;
      })
      // Story links have no Markdown export; relative, they'd resolve against llms/*.md.
      .replace(/\(\/?\?path=\/story\//g, `(${baseUrl}/?path=/story/`)
  );
}

const CANVAS_RE = /<Canvas\s+of=\{([A-Za-z0-9_$]+)\.([A-Za-z0-9_$]+)\}([^>]*?)\/>/g;
const isSourceHidden = (attrs) => /sourceState="none"/.test(attrs);

function mdxToMarkdown(source, { mdxPath, storyIdFor, markup, knownSlugs, unresolved, strippedLines, problems }) {
  let text = source;

  // About pages render a repo Markdown file (`import content from '../../CHANGELOG.md?raw'`
  // + <Markdown>{content}</Markdown>); inline that file or the export is an empty shell.
  for (const [, name, spec] of source.matchAll(/^import\s+(\w+)\s+from\s+'([^']+\.md)\?raw';/gm)) {
    const content = fs.readFileSync(path.resolve(path.dirname(mdxPath), spec), 'utf8');
    text = text.replace(new RegExp(`<Markdown>\\{${name}\\}</Markdown>`), () => content);
  }
  text = text.replace(/^<div className="hds-doc-md">\s*$|^<\/div>\s*$/gm, '');

  // Storybook scaffolding that carries no meaning outside the app.
  text = text.replace(/^import\s[\s\S]*?;\s*$/gm, '');
  text = text.replace(/<style>[\s\S]*?<\/style>\s*/g, '');
  text = text.replace(/<(Meta|Controls)\b[^>]*\/>\s*/g, '');
  text = text.replace(/<\/?Unstyled>/g, '');
  text = text
    .split('\n')
    .filter((line) => {
      const isStorybookOnly = STORYBOOK_ONLY_PATTERNS.some((pattern) => pattern.test(line));
      if (isStorybookOnly) strippedLines.push(line.trim());
      return !isStorybookOnly;
    })
    .join('\n');
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  // <Canvas of={NS.Export} /> → the story's real rendered markup.
  text = text.replace(CANVAS_RE, (match, ns, exportName, attrs) => {
    if (isSourceHidden(attrs)) return '';
    const id = storyIdFor(ns, exportName);
    if (!id || !markup.has(id)) {
      problems.push(`unresolved Canvas: ${ns}.${exportName}`);
      return '';
    }
    return `\`\`\`html\n${markup.get(id)}\n\`\`\``;
  });

  // <Note type="uswds">…</Note> → labelled blockquote. Untyped notes get no label.
  text = text.replace(/<Note(?:\s+type="([a-z]+)")?\s*>([\s\S]*?)<\/Note>/g, (_, type, body) => {
    const content = inlineJsxToMarkdown(body);
    if (!type) return `> ${content}`;
    return `> **${NOTE_LABELS[type] ?? type}:** ${content}`;
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
const problems = [];

for (const entry of docsEntries) {
  const mdxPath = path.resolve(repoRoot, entry.importPath);
  if (!fs.existsSync(mdxPath)) {
    problems.push(`missing MDX source: ${entry.importPath}`);
    continue;
  }
  const source = fs.readFileSync(mdxPath, 'utf8');
  const namespaces = buildNamespaceMap(source, entry.importPath);
  const storyIdFor = (ns, exportName) => namespaces.get(ns)?.get(exportName);

  for (const m of source.matchAll(CANVAS_RE)) {
    if (isSourceHidden(m[3])) continue;
    const id = storyIdFor(m[1], m[2]);
    if (id) neededStoryIds.add(id);
  }
  pages.push({ entry, source, storyIdFor });
}

console.log(`${pages.length} docs pages, ${neededStoryIds.size} stories to render`);

const server = await serve(distDir, PORT);
const browser = await chromium.launch();
const page = await browser.newPage();
const markup = await captureStories(page, [...neededStoryIds], problems);
await browser.close();
server.close();

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const unresolved = new Set();
const strippedLines = [];
const written = [];

for (const { entry, source, storyIdFor } of pages) {
  const slug = slugOf(entry);
  const body = mdxToMarkdown(source, {
    mdxPath: path.resolve(repoRoot, entry.importPath),
    storyIdFor,
    markup,
    knownSlugs,
    unresolved,
    strippedLines,
    problems,
  });
  const header = [
    `<!-- Source: ${entry.importPath} -->`,
    `<!-- Storybook: ${baseUrl}/?path=/docs/${entry.id} -->`,
    '',
  ].join('\n');
  const filepath = path.join(outDir, `${slug}.md`);
  fs.writeFileSync(filepath, `${header}${body}\n`);
  written.push({ slug, title: entry.title, summary: firstSentence(body) });
}

// ─── llms.txt index ───────────────────────────────────────────────────────────

/**
 * The page's opening sentence, used as the llms.txt link note so agents can
 * pick a page without opening it. Taken from the MDX so it never drifts.
 */
function firstSentence(body) {
  let inFence = false;
  for (const line of body.split('\n')) {
    if (line.startsWith('```')) inFence = !inFence;
    // Only the intro: past the first H2 it's section content, not a page summary.
    if (!inFence && line.startsWith('## ')) break;
    if (inFence || !line.trim() || /^[#>`<|*{-]/.test(line.trim())) continue;
    const text = line.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
    return text.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? text;
  }
  return '';
}

// "Components/Blockquote/Guidance" → "Blockquote"; the H2 already names the section.
const displayTitle = (title) => {
  const parts = title.split('/').slice(1);
  if (parts.length > 1 && parts.at(-1) === 'Guidance') parts.pop();
  return parts.join(' / ');
};

const linkLine = ({ slug, title, summary }) =>
  `- [${displayTitle(title)}](${baseUrl}/llms/${slug}.md)${summary ? `: ${summary}` : ''}`;

const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const sectionOf = (title) => title.split('/')[0];
const rank = (title) => {
  const i = SECTIONS.indexOf(sectionOf(title));
  return i === -1 ? SECTIONS.length : i;
};

// Guidance for agents, between the summary and the link lists. The spec allows
// any Markdown here except headings.
const AGENT_GUIDANCE = [
  '- HDS Core is for NASA-branded `*.nasa.gov` websites only. Other federal sites should use USWDS directly.',
  '- HDS Core is a theme layer on USWDS, not a replacement. Use the markup on these pages instead of USWDS markup from memory: HDS adds classes and changes defaults, and components without HDS theming ship USWDS defaults.',
  '- Class prefixes: `usa-*` for components that map to a USWDS component, `hds-*` for HDS-only components. All classes within one component share its prefix (`usa-accordion__*`, `hds-blockquote__*`), but components with different prefixes can nest inside each other and sit on the same page.',
  '- Examples show the markup to write. Interactive components (accordion, in-page navigation, sortable tables, mobile menu) also need the unmodified USWDS scripts, `uswds-init.min.js` in `<head>` and `uswds.min.js` loaded `defer`, which generate the rest at runtime. Do not hand-write the generated parts.',
  '- Never hard-code a value that a design token covers (spacing, color, font, line height, letter spacing, border). Use the CSS custom property (`var(--hds-spacing-2)`) or, in Sass, the matching variable (`$hds-spacing-2`). When a design calls for a value close to a token, such as 15px where `--hds-spacing-2` is 16px, use the token. When no token is close, tell the human instead of inventing a value. Every token is listed on the Design Tokens page.',
  '- Whole-number spacing steps (`--hds-spacing-1`, `-2`, `-3`) are for layout. Fractional steps (`-0-5`, `-1-5`, `-2-5`) are for spacing inside a component only. Data visualization color tokens (`--hds-dataviz-*`) are for charts only.',
  '- To change a section background, put an `hds-palette-*` class (`white`, `light`, `midtone`, `dark`, `blue`, `black`) on its container and the components inside adapt. Do not hard-code colors.',
];

const lines = [
  `# ${pkg.name} v${pkg.version}`,
  '',
  `> ${pkg.description} HDS Core ships compiled CSS and Sass. It is not a component library and adds no JavaScript of its own. Components are applied as classes on standard HTML markup, and each page below includes the markup for every example.`,
  '',
  ...AGENT_GUIDANCE,
  '',
];

for (const section of SECTIONS) {
  const inSection = written
    .filter((w) => sectionOf(w.title) === section)
    .sort((a, b) => displayTitle(a.title).localeCompare(displayTitle(b.title)));
  if (!inSection.length) continue;
  lines.push(`## ${section}`, '');
  for (const w of inSection) lines.push(linkLine(w));
  lines.push('');
}

const orphans = written.filter((w) => rank(w.title) === SECTIONS.length);
if (orphans.length) {
  lines.push('## Other', '');
  for (const w of orphans) lines.push(linkLine(w));
  lines.push('');
}

fs.writeFileSync(path.join(distDir, 'llms.txt'), lines.join('\n'));

console.log(`Wrote ${written.length} pages to ${path.relative(repoRoot, outDir)}/`);
console.log(`Wrote ${path.relative(repoRoot, path.join(distDir, 'llms.txt'))}`);
const uniqueStripped = [...new Set(strippedLines)];
console.log(`Stripped ${strippedLines.length} Storybook-only line(s) (${uniqueStripped.length} distinct)`);
for (const line of uniqueStripped) {
  console.log(`  - ${line.length > 96 ? `${line.slice(0, 96)}…` : line}`);
}

for (const slug of [...unresolved].sort()) problems.push(`broken doc link in MDX: ?path=/docs/${slug}--docs`);
if (!written.length) problems.push('no docs pages written');

if (problems.length) {
  console.error(`\n${problems.length} problem(s); llms.txt would publish with gaps:`);
  for (const p of problems) console.error(`  ✗ ${p}`);
  process.exit(1);
}
