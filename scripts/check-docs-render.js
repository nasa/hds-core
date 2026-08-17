/* eslint-disable no-console */
// Renders every MDX docs page in a served static Storybook and fails if any
// throws at runtime. Closes the gap left by the two build-time checks: the
// Storybook build proves docs *compile*, and the vitest `storybook` project
// renders *stories* -- neither catches an MDX page that compiles but throws
// when a browser actually renders it (e.g. a <Canvas of={...}> pointing at a
// story that was renamed or deleted). Stories are intentionally skipped here;
// vitest already renders them.
//
// Discovery uses Storybook's public index.json (v5: `entries` keyed by id,
// each carrying a `type`) and the iframe.html isolation URL -- both stable
// public contracts. Error detection has three independent signals so a change
// to any one selector degrades thoroughness rather than blinding the check:
// uncaught page errors, console.error output, and Storybook's error overlay.

import { chromium } from 'playwright';

const BASE_URL = process.env.STORYBOOK_URL ?? 'http://127.0.0.1:6006';
const NAV_TIMEOUT = 30_000;
const ROOT_TIMEOUT = 15_000;

async function main() {
  const indexRes = await fetch(`${BASE_URL}/index.json`);
  if (!indexRes.ok) {
    throw new Error(
      `Could not fetch ${BASE_URL}/index.json (HTTP ${indexRes.status}). Is the static Storybook being served?`,
    );
  }
  const index = await indexRes.json();
  const docs = Object.values(index.entries).filter((e) => e.type === 'docs');

  if (docs.length === 0) {
    throw new Error('No docs entries found in index.json -- expected MDX pages. Refusing to pass silently.');
  }

  console.log(`Rendering ${docs.length} docs pages against ${BASE_URL}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const failures = [];

  for (const entry of docs) {
    const url = `${BASE_URL}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=docs`;
    const errors = [];

    const onConsole = (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    };
    const onPageError = (err) => errors.push(`Uncaught: ${err.message}`);
    page.on('console', onConsole);
    page.on('pageerror', onPageError);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT });
      await page
        .locator('#storybook-root, #storybook-docs')
        .first()
        .waitFor({ state: 'attached', timeout: ROOT_TIMEOUT });

      const overlay = page.locator('.sb-errordisplay, #error-message');
      if (
        (await overlay.count()) &&
        (await overlay
          .first()
          .isVisible()
          .catch(() => false))
      ) {
        const text = await overlay
          .first()
          .innerText()
          .catch(() => '(error overlay visible, text unreadable)');
        errors.push(`Storybook error overlay: ${text.split('\n')[0]}`);
      }
    } catch (err) {
      errors.push(`Failed to render: ${err.message}`);
    } finally {
      page.off('console', onConsole);
      page.off('pageerror', onPageError);
    }

    if (errors.length) {
      failures.push(`  ${entry.id}  (${entry.importPath})\n    ${errors.join('\n    ')}`);
    }
  }

  await browser.close();

  if (failures.length) {
    console.error(`\n${failures.length} of ${docs.length} docs pages threw at render:\n`);
    console.error(failures.join('\n\n'));
    process.exit(1);
  }

  console.log(`All ${docs.length} docs pages rendered without errors.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
