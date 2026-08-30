#!/bin/bash
# Prints a stable hash of the compiled CSS bundles. Requires a build first.
# CI compares two invocations (base vs PR) to decide whether to run Chromatic;
# see .github/workflows/ci.yml (detect-css-change).
set -e

BUNDLES=(
  dist/css/hds.min.css
  dist/css/hds-uswds.min.css
  dist/css/hds-dataviz.min.css
)

for f in "${BUNDLES[@]}"; do
  if [ ! -f "$f" ]; then
    echo "✗ $f not found. Run 'npm run build' first." >&2
    exit 1
  fi
done

# Strip the version stamp before hashing: it embeds the release version, so a
# bump moves the bytes without changing any style, and this answers "did the
# CSS change?". These patterns match the stamp plugin's own output
# (.config/postcss-hds-stamp.mjs) -- if its format changes, change these too.
strip_stamp() {
  sed -e 's#/\*![^*]*\*/##g' \
    -e 's#@layer hds-base[{]:root[{]--hds-version:[^}]*[}][}]##g' "$1"
}

# shasum (not sha256sum) for macOS. Piping each file on stdin keeps shasum
# from emitting a filename column, whose mode-marker ('*' vs ' ') differs by
# OS and would leak into the hash; the filename is added back portably via
# printf so bundles can't cancel out.
for f in "${BUNDLES[@]}"; do
  printf '%s  %s\n' "$(strip_stamp "$f" | shasum -a 256 | cut -d' ' -f1)" "$f"
done | shasum -a 256 | cut -d' ' -f1
