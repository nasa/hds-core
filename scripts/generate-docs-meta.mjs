#!/usr/bin/env node
/**
 * generate-docs-meta.mjs
 *
 * Generates stories/docs-meta.json — a build-time manifest mapping each MDX
 * file to its last-commit metadata. Used by the Storybook docs footer to
 * satisfy NAII 2800.2 §14.2 (Page Editor) and §14.3 (Last Updated date).
 *
 * Output per file:
 *   date           "June 4, 2026"     — NAII 14.3 display format
 *   dateISO        "2026-06-04"       — for <time datetime="...">
 *   authorName     "Abby Bowman"      — from git %aN (honors .mailmap)
 *   githubUsername "abbybowman"       — resolved from noreply email or
 *                                       GITHUB_USERNAMES fallback map
 *
 * Note: authorEmail is intentionally excluded from the manifest.
 * docs-meta.json is bundled into the public Storybook static build —
 * email addresses must not be included.
 *
 * Runs automatically before npm run dev and npm run build-storybook
 * via the docs:meta script entry in package.json.
 *
 * ⚠️  Requires full git history for accurate dates.
 * - Local dev: works as long as the repo is a full (non-shallow) clone.
 * - GitHub Pages deploy: the checkout step MUST set fetch-depth: 0.
 *   When the Pages deploy workflow is added (roadmap §2), include:
 *
 *     - uses: actions/checkout@v6
 *       with:
 *         fetch-depth: 0
 *
 *   Without this, shallow clones show the deployment date for all files
 *   rather than each file's actual last-edit date.
 */

import { execSync } from 'child_process';
import { writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

// ─── GitHub username fallback map ─────────────────────────────────────────────
// Contributors who commit locally with a real email address (rather than
// GitHub's noreply format) won't resolve automatically from the email pattern.
// Add them here so their names still link to their GitHub profiles.
//
// Contributors using GitHub's web editor, or whose git client is configured
// to use the GitHub noreply email, resolve automatically without an entry here.
const GITHUB_USERNAMES = {
  'Abby Bowman': 'abbybowman',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Recursively collect all .mdx files under dir. */
function findMdxFiles(dir) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (entry.endsWith('.mdx')) {
      files.push(fullPath.replace(/\\/g, '/'));
    }
  }
  return files;
}

/**
 * Format a Unix timestamp as "Month D, YYYY".
 * e.g. "June 4, 2026" — the format specified in NAII 2800.2 §14.3.
 */
function formatDate(unixSeconds) {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date(unixSeconds * 1000);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** ISO date string from a Unix timestamp, for use in <time datetime="...">. */
function toISODate(unixSeconds) {
  return new Date(unixSeconds * 1000).toISOString().split('T')[0];
}

/**
 * Resolves a GitHub username from a commit email or the fallback map.
 * Returns null if neither source provides a match — the name will still
 * appear in the footer, just without a profile link.
 */
function resolveGitHubUsername(email, name) {
  // GitHub noreply format: {numeric_id}+{username}@users.noreply.github.com
  const match = email?.match(/^\d+\+(.+)@users\.noreply\.github\.com$/);
  if (match) return match[1];
  // Fallback: known contributors who commit with a real email address
  return GITHUB_USERNAMES[name] ?? null;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const files = findMdxFiles('stories');
const manifest = {};

for (const file of files) {
  try {
    // %at  author Unix timestamp
    // %aN  author name, honoring .mailmap
    // %aE  author email, honoring .mailmap
    // --follow  tracks the file across renames
    const raw = execSync(`git log --follow -1 --format="%at|%aN|%aE" -- "${file}"`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();

    if (raw) {
      const [timestamp, authorName, authorEmail] = raw.split('|');
      const ts = parseInt(timestamp, 10);

      manifest[file] = {
        date: ts ? formatDate(ts) : null,
        dateISO: ts ? toISODate(ts) : null,
        authorName: authorName || null,
        githubUsername: resolveGitHubUsername(authorEmail, authorName),
        // authorEmail is intentionally excluded — this manifest is bundled
        // into the public Storybook build and must not expose email addresses.
      };
    }
  } catch {
    // File has no git history yet. Omit from manifest.
  }
}

writeFileSync('stories/docs-meta.json', JSON.stringify(manifest, null, 2));
console.log(`  ✓ docs-meta.json — ${Object.keys(manifest).length} MDX files indexed`);
