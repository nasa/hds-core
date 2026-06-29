#!/usr/bin/env node
/* eslint-disable no-console */

import { execSync } from 'node:child_process';
import { readFileSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdirSync, rmSync } from 'node:fs';

const ROOT = resolve(import.meta.dirname, '..');
// Keep this list in sync with the file `destination`s in sd.config.js.
const GENERATED_FILES = ['src/scss/_hds-tokens.scss', 'src/scss/base/_custom-properties.scss'];

// Read committed files
const committedContents = GENERATED_FILES.map((file) => {
  const path = resolve(ROOT, file);
  try {
    return { file, content: readFileSync(path, 'utf-8') };
  } catch {
    console.error(`Error: ${file} not found.`);
    console.error('Run `npm run build:tokens` to generate it.');
    process.exit(1);
  }
});

// Create temp directory and backup generated files
const tempDir = resolve(tmpdir(), `hds-tokens-check-${Date.now()}`);
mkdirSync(tempDir, { recursive: true });

// Backup the current generated files
const backups = GENERATED_FILES.map((file) => {
  const sourcePath = resolve(ROOT, file);
  const backupPath = resolve(tempDir, file);
  mkdirSync(resolve(tempDir, file, '..'), { recursive: true });
  copyFileSync(sourcePath, backupPath);
  return { file, backupPath };
});

let buildFailed = false;
let generatedContents;

try {
  // Regenerate tokens in place (overwrites the committed files).
  try {
    execSync('npm run build:tokens', {
      cwd: ROOT,
      stdio: 'pipe',
    });
  } catch (err) {
    buildFailed = true;
    console.error('Error: `npm run build:tokens` failed during the drift check.\n');
    if (err.stdout) console.error(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
  }

  // Read regenerated files (only meaningful if the build succeeded).
  if (!buildFailed) {
    generatedContents = GENERATED_FILES.map((file) => {
      const path = resolve(ROOT, file);
      return { file, content: readFileSync(path, 'utf-8') };
    });
  }
} finally {
  // ALWAYS restore the committed files from backup and remove the temp dir.
  // The build overwrites the working-tree copies in place, so this must run
  // even when the build fails or the read throws — otherwise a local run
  // could leave the developer's working tree with regenerated files.
  backups.forEach(({ file, backupPath }) => {
    copyFileSync(backupPath, resolve(ROOT, file));
  });
  rmSync(tempDir, { recursive: true, force: true });
}

// A failed build can't be compared; surface it as drift-check failure.
if (buildFailed) {
  process.exit(1);
}

// Compare
let hasDrift = false;
for (let i = 0; i < GENERATED_FILES.length; i++) {
  const committed = committedContents[i].content;
  const generated = generatedContents[i].content;

  if (committed !== generated) {
    if (!hasDrift) {
      console.error('Token generation drift detected. Generated files do not match committed versions.\n');
      console.error('Run `npm run build:tokens` and commit the changes.\n');
    }
    hasDrift = true;
    console.error(`File: ${GENERATED_FILES[i]}`);

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
