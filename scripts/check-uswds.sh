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
  # Form controls: list each package HDS restyles. The uswds-form-controls
  # aggregator is only @forward lines, so hashing it misses real changes.
  usa-checkbox
  usa-error-message
  usa-fieldset
  usa-form-group
  usa-hint
  usa-input
  usa-label
  usa-legend
  usa-radio
  usa-select
  usa-textarea
  usa-table
  usa-accordion
  usa-alert
  usa-breadcrumb
  usa-in-page-navigation
  usa-intro
  usa-link
  usa-list
  usa-pagination
  usa-prose
  usa-sidenav
  usa-site-alert
)

if [ ! -f "$HASH_FILE" ]; then
  echo "No baseline found. Generating $HASH_FILE..."
  for pkg in "${PACKAGES[@]}"; do
    echo "$pkg: $(find node_modules/@uswds/uswds/packages/$pkg -name '*.scss' | LC_ALL=C sort | xargs cat | shasum | cut -c1-8)"
  done > "$HASH_FILE"
  echo "✓ Baseline saved to $HASH_FILE"
  exit 0
fi

echo "Checking USWDS packages against baseline..."
CHANGED=0
while IFS=': ' read -r pkg hash; do
  hash="${hash%$'\r'}"
  current=$(find node_modules/@uswds/uswds/packages/$pkg -name '*.scss' | LC_ALL=C sort | xargs cat | shasum | cut -c1-8)
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