#!/bin/bash
# ============================================================
# USWDS Package Hash Check
# Compares current USWDS package source against saved baseline.
# Run after any @uswds/uswds version bump to detect changes
# in packages HDS depends on.
# ============================================================

HASH_FILE="scripts/uswds-package-hashes.txt"
PACKAGES=(
  uswds-core
  uswds-global
  uswds-typography
  usa-layout-grid
  usa-button
  uswds-form-controls
  usa-table
  usa-accordion
  usa-breadcrumb
  usa-in-page-navigation
  usa-pagination
  usa-site-alert
)

if [ ! -f "$HASH_FILE" ]; then
  echo "No baseline found. Generating $HASH_FILE..."
  for pkg in "${PACKAGES[@]}"; do
    echo "$pkg: $(find node_modules/@uswds/uswds/packages/$pkg -name '*.scss' | sort | xargs cat | tr -d '\r' | shasum | cut -c1-8)"
  done > "$HASH_FILE"
  echo "✓ Baseline saved to $HASH_FILE"
  exit 0
fi

echo "Checking USWDS packages against baseline..."
CHANGED=0
while IFS=': ' read -r pkg hash; do
  hash="${hash%$'\r'}"
  current=$(find node_modules/@uswds/uswds/packages/$pkg -name '*.scss' | sort | xargs cat | tr -d '\r' | shasum | cut -c1-8)
  if [ "$current" != "$hash" ]; then
    echo "✗ $pkg changed (was $hash, now $current)"
    CHANGED=1
  fi
done < "$HASH_FILE"

if [ $CHANGED -eq 0 ]; then
  echo "✓ All USWDS packages match baseline"
else
  echo ""
  echo "⚠ Some packages changed. Review USWDS changelog and update"
  echo "  HDS overrides if needed, then regenerate baseline:"
  echo "  rm $HASH_FILE && npm run check:uswds"
  exit 1
fi