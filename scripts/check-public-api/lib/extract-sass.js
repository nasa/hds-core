import { readFileSync } from 'node:fs';

const VARIABLE_PATTERN = /^\$(hds-[\w-]+)\s*:/gm;
const MIXIN_PATTERN = /^@mixin\s+(hds-[\w-]+)/gm;
const FUNCTION_PATTERN = /^@function\s+(hds-[\w-]+)/gm;

/**
 * Extract $hds-* variable names from a Sass file.
 * Returns sorted array of variable names including $ prefix.
 */
export function extractSassVariables(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const variables = new Set();

  let match;
  while ((match = VARIABLE_PATTERN.exec(content)) !== null) {
    variables.add(`$${match[1]}`);
  }

  // Reset lastIndex for reuse
  VARIABLE_PATTERN.lastIndex = 0;

  return [...variables].sort();
}

/**
 * Extract hds-* mixin and function names from a Sass file.
 * Returns sorted array of names (without @mixin/@function prefix).
 */
export function extractSassMixins(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const names = new Set();

  let match;
  while ((match = MIXIN_PATTERN.exec(content)) !== null) {
    names.add(match[1]);
  }
  MIXIN_PATTERN.lastIndex = 0;

  while ((match = FUNCTION_PATTERN.exec(content)) !== null) {
    names.add(match[1]);
  }
  FUNCTION_PATTERN.lastIndex = 0;

  return [...names].sort();
}
