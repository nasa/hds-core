#!/bin/bash
# ============================================================
# Compiled CSS Output Hash Check
# Compares a hash of the compiled CSS bundles against the saved
# baseline (scripts/css-output-hash.txt). Detects whether a change
# altered published CSS output.
#
# Why a committed baseline: the PR gate uses a change to this file
# as the signal that CSS output moved, which decides whether the
# visual-regression run is needed -- without rebuilding the base
# branch in CI just to diff it.
#
# Requires a build first (reads dist/css/*.min.css). After an
# intentional CSS change, refresh the baseline:
#   npm run update:css-hash
# ============================================================
set -e

HASH_FILE="scripts/css-output-hash.txt"
BUNDLES=(
  dist/css/hds.min.css
  dist/css/hds-uswds.min.css
  dist/css/hds-dataviz.min.css
)

for f in "${BUNDLES[@]}"; do
  if [ ! -f "$f" ]; then
    echo "✗ $f not found. Run 'npm run build' first."
    exit 1
  fi
done

# Strip the version stamp before hashing: it embeds the release version, so a
# bump moves the bytes without changing any style, and this baseline answers
# "did the CSS change?". These patterns match the stamp plugin's own output
# (.config/postcss-hds-stamp.mjs) -- if its format changes, change these too.
strip_stamp() {
  sed -e 's#/\*![^*]*\*/##g' \
    -e 's#@layer hds-base[{]:root[{]--hds-version:[^}]*[}][}]##g' "$1"
}

# shasum (not sha256sum) for macOS. Piping each file on stdin keeps shasum
# from emitting a filename column, whose mode-marker ('*' vs ' ') differs by
# OS and would leak into the hash; the filename is added back portably via
# printf so bundles can't cancel out.
current=$(
  for f in "${BUNDLES[@]}"; do
    printf '%s  %s\n' "$(strip_stamp "$f" | shasum -a 256 | cut -d' ' -f1)" "$f"
  done | shasum -a 256 | cut -d' ' -f1
)

# --update: (re)write the baseline and exit (used by update:css-hash).
if [ "$1" = "--update" ]; then
  echo "$current" > "$HASH_FILE"
  echo "✓ CSS output baseline updated: $current"
  exit 0
fi

# First run with no baseline: generate and pass (mirrors check:uswds).
if [ ! -f "$HASH_FILE" ]; then
  echo "No baseline found. Generating $HASH_FILE..."
  echo "$current" > "$HASH_FILE"
  echo "✓ Baseline saved: $current"
  exit 0
fi

baseline=$(tr -d '[:space:]' < "$HASH_FILE")

if [ "$current" = "$baseline" ]; then
  echo "✓ Compiled CSS matches the committed baseline ($current)"
else
  echo "✗ Compiled CSS output changed."
  echo "  baseline: $baseline"
  echo "  current:  $current"
  echo ""
  echo "  If this CSS change is intentional, refresh the baseline and commit it:"
  echo "    npm run update:css-hash"
  echo "  (The committed change also signals the visual-regression run for this PR.)"
  exit 1
fi
