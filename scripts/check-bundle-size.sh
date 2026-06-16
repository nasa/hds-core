#!/usr/bin/env bash
# check-bundle-size.sh
# Validates compiled CSS bundle sizes against gzipped byte thresholds.
# Targets .min.css files only -- these are the actual adopter deliverables.
# Run automatically in CI when src/scss/** or tokens.json changes.
# Run locally: bash scripts/check-bundle-size.sh (requires gzip + wc)
#
# All limits use decimal KB (1 KB = 1,000 bytes), matching browser devtools.
#
# Thresholds set from post-refactor measurements (June 2026, v0.8.0):
#   hds.min.css:       47.8 KB measured -- 50 KB ceiling (hard fail)
#   hds-uswds.min.css: 47.9 KB measured -- combined 96 KB ceiling (informational)
#
# hds.min.css is the mandatory adopter load and the only enforced gate.
# hds-uswds.min.css is an optional utilities addon for USWDS migration sites.

set -euo pipefail

HDS_MAX=50000        # 50 KB
COMBINED_MAX=96000   # 96 KB

if [ ! -f dist/css/hds.min.css ]; then
  echo "ERROR: dist/css/hds.min.css not found -- run npm run build first"
  exit 1
fi

hds_gz=$(gzip -c dist/css/hds.min.css | wc -c)

fail=0

if [ "$hds_gz" -gt "$HDS_MAX" ]; then
  echo "FAIL hds.min.css: ${hds_gz}B > ${HDS_MAX}B (limit: 50 KB gzipped)"
  fail=1
else
  echo "OK   hds.min.css: ${hds_gz}B (limit: ${HDS_MAX}B)"
fi

if [ -f dist/css/hds-uswds.min.css ]; then
  uswds_gz=$(gzip -c dist/css/hds-uswds.min.css | wc -c)
  combined=$((hds_gz + uswds_gz))
  if [ "$combined" -gt "$COMBINED_MAX" ]; then
    echo "INFO combined: ${combined}B > ${COMBINED_MAX}B (informational -- optional utilities bundle)"
  else
    echo "OK   combined:  ${combined}B (limit: ${COMBINED_MAX}B)"
  fi
else
  echo "INFO hds-uswds.min.css not found -- skipping combined check"
fi

exit $fail