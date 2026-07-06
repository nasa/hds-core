#!/usr/bin/env node
/* eslint-disable no-console */

import { readFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { tmpdir } from 'node:os';
import StyleDictionary from 'style-dictionary';
import baseConfig from '../sd.config.js';

const ROOT = resolve(import.meta.dirname, '..');

// Generated-file paths are derived from sd.config.js itself (buildPath +
// each file's destination), so this check can never drift out of sync with
// the generator's actual output targets.
const targets = Object.values(baseConfig.platforms).flatMap((platform) =>
  platform.files.map((file) => join(platform.buildPath, file.destination)),
);

const tempDir = resolve(tmpdir(), `hds-tokens-check-${process.pid}`);
mkdirSync(tempDir, { recursive: true });

let buildFailed = false;

try {
  // Build into a scratch directory instead of the real tree. The committed
  // files are never touched, so there's no window where an interrupted run
  // (SIGKILL, OOM, Ctrl-C) can leave the working tree with
  // regenerated-but-uncommitted files.
  const scratchConfig = {
    ...baseConfig,
    platforms: Object.fromEntries(
      Object.entries(baseConfig.platforms).map(([name, platform]) => [
        name,
        { ...platform, buildPath: join(tempDir, platform.buildPath) },
      ]),
    ),
  };

  try {
    const sd = new StyleDictionary(scratchConfig);
    await sd.buildAllPlatforms();
  } catch (err) {
    buildFailed = true;
    console.error('Error: token generation failed during the drift check.\n');
    console.error(err.stack ?? err.message);
  }

  if (buildFailed) {
    process.exit(1);
  }

  // Compare
  let hasDrift = false;
  for (const relPath of targets) {
    const committedPath = resolve(ROOT, relPath);
    const generatedPath = resolve(tempDir, relPath);

    let committed;
    try {
      committed = readFileSync(committedPath, 'utf-8');
    } catch {
      console.error(`Error: ${relPath} not found.`);
      console.error('Run `npm run build:tokens` to generate it.');
      process.exit(1);
    }

    const generated = readFileSync(generatedPath, 'utf-8');

    if (committed !== generated) {
      if (!hasDrift) {
        console.error('Token generation drift detected. Generated files do not match committed versions.\n');
        console.error('Run `npm run build:tokens` and commit the changes.\n');
      }
      hasDrift = true;
      console.error(`File: ${relPath}`);

      const committedLines = committed.split('\n');
      const generatedLines = generated.split('\n');

      // Show first few differences
      let diffCount = 0;
      const maxDiffs = 10;
      for (let j = 0; j < Math.max(committedLines.length, generatedLines.length) && diffCount < maxDiffs; j++) {
        if (committedLines[j] !== generatedLines[j]) {
          console.error(`  Line ${j + 1}:`);
          if (committedLines[j] !== undefined) console.error(`    - ${committedLines[j]}`);
          if (generatedLines[j] !== undefined) console.error(`    + ${generatedLines[j]}`);
          diffCount++;
        }
      }
      if (diffCount === maxDiffs) {
        console.error('  ... (showing first 10 differences)\n');
      } else {
        console.error('');
      }
    }
  }

  if (hasDrift) {
    process.exit(1);
  } else {
    console.log('✓ Token generation is up to date.');
    process.exit(0);
  }
} finally {
  rmSync(tempDir, { recursive: true, force: true });
}
