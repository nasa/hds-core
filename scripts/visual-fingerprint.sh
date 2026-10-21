#!/bin/bash
# Prints one stable hash over everything a Chromatic snapshot can see.
# Requires a build first. CI uses it in detect-visual-change and chromatic
# (.github/workflows/ci.yml).
#
# Inputs: compiled CSS (via css-output-hash.sh, version stamp stripped),
# dist/js and dist/assets, and tracked story sources and Storybook config,
# excluding .mdx/.md docs pages.
#
# Usage: visual-fingerprint.sh [repo-root]   (default: this script's repo)
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "${1:-$SCRIPT_DIR/..}"

# shasum (not sha256sum) for macOS. Its mode marker (' ' vs '*') differs by
# OS, so sed strips it. Paths stay in the hash so renames count.
hash_files() {
  xargs -0 shasum -a 256 | sed -E 's/^([0-9a-f]+) [ *]/\1  /'
}

{
  printf '%s  compiled-css\n' "$(bash "$SCRIPT_DIR/css-output-hash.sh")"
  find dist/js dist/assets -type f -print0 | LC_ALL=C sort -z | hash_files
  git ls-files -z -- stories .storybook ':!*.mdx' ':!*.md' | LC_ALL=C sort -z | hash_files
} | shasum -a 256 | cut -d' ' -f1
