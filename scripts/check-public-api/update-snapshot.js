#!/usr/bin/env node
/* eslint-disable no-console */

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateSnapshot } from './generate-snapshot.js';

const ROOT = resolve(import.meta.dirname, '..', '..');
const SNAPSHOT_PATH = resolve(ROOT, 'public-api.snapshot.txt');

const snapshot = generateSnapshot();
writeFileSync(SNAPSHOT_PATH, snapshot, 'utf-8');
console.log('✓ public-api.snapshot.txt updated.');
