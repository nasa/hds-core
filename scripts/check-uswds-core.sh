#!/bin/bash
# ============================================================
# USWDS Core CSS Leak Check
# Ensures that @uswds/uswds-core does not emit any CSS selectors.
# This is critical for our CSS cascade layer architecture.
# ============================================================
set -e

TMP_SCSS=$(mktemp test-uswds-core-XXXXXX.scss)
TMP_CSS=$(mktemp test-uswds-core-XXXXXX.css)
trap 'rm -f "$TMP_SCSS" "$TMP_CSS"' EXIT

cat << 'EOF' > "$TMP_SCSS"
@forward 'hds-uswds-theme';
@forward 'uswds-core';
EOF

echo "Checking if uswds-core emits CSS selectors..."

npx sass "$TMP_SCSS" "$TMP_CSS" \
  --load-path=node_modules/@uswds/uswds/packages \
  --load-path=src/scss \
  --quiet-deps \
  --style=compressed \
  --no-source-map

SIZE=$(wc -c < "$TMP_CSS")

# A completely empty Sass compile with compressed style emits 1 byte (a newline).
if [ "$SIZE" -gt 1 ]; then
  echo "✗ FAIL: uswds-core emitted $SIZE bytes of CSS!"
  echo "  This breaks the CSS layer architecture. uswds-core must only contain APIs."
  exit 1
else
  echo "✓ PASS: uswds-core emits no CSS."
  exit 0
fi
