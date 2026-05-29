#!/usr/bin/env node
/* eslint-disable no-console */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateSnapshot } from './generate-snapshot.js';

const ROOT = resolve(import.meta.dirname, '..', '..');
const SNAPSHOT_PATH = resolve(ROOT, 'public-api.snapshot.txt');

let committed;
try {
  committed = readFileSync(SNAPSHOT_PATH, 'utf-8');
} catch {
  console.error('Error: public-api.snapshot.txt not found.\n' + 'Run `npm run update:api-snapshot` to generate it.');
  process.exit(1);
}

const generated = generateSnapshot();

if (generated === committed) {
  console.log('✓ Public API snapshot is up to date.');
  process.exit(0);
} else {
  console.error('Public API surface changed. Review the diff below.');
  console.error('If intentional, run `npm run update:api-snapshot` and add a changeset.\n');

  const committedLines = committed.split('\n');
  const generatedLines = generated.split('\n');
  const committedSet = new Set(committedLines);
  const generatedSet = new Set(generatedLines);

  const removed = committedLines.filter((l) => l && !generatedSet.has(l));
  const added = generatedLines.filter((l) => l && !committedSet.has(l));

  for (const line of removed) console.error(`- ${line}`);
  for (const line of added) console.error(`+ ${line}`);

  process.exit(1);
}
