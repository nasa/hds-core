#!/usr/bin/env bash
# check-bundle-size.sh
# Validates compiled CSS bundle sizes against gzipped byte thresholds.
# Targets .min.css files only -- these are the actual adopter deliverables.
# Run automatically in CI when src/scss/** or tokens.json changes.
# Run locally: bash scripts/check-bundle-size.sh (requires gzip + wc)
#
# Thresholds set from post-refactor measurements (May 2026, v0.7.2):
#   hds.min.css:       43.3 KB measured -- 45 KB ceiling (hard fail)
#   hds-uswds.min.css: 47.9 KB measured -- combined 95 KB ceiling (informational)
#
# hds.min.css is the mandatory adopter load and the only enforced gate.
# hds-uswds.min.css is an optional utilities addon for USWDS migration sites.

set -euo pipefail

HDS_MAX=46080        # 45 KB
COMBINED_MAX=97280   # 95 KB

if [ ! -f dist/css/hds.min.css ]; then
  echo "ERROR: dist/css/hds.min.css not found -- run npm run build first"
  exit 1
fi

hds_gz=$(gzip -c dist/css/hds.min.css | wc -c)

fail=0

if [ "$hds_gz" -gt "$HDS_MAX" ]; then
  echo "FAIL hds.min.css: ${hds_gz}B > ${HDS_MAX}B (limit: 45 KB gzipped)"
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