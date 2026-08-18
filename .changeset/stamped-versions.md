---
'@nasa-hds/core': minor
---

Stamp the HDS and USWDS versions into the compiled CSS

Every bundle now opens with a banner naming its version and the USWDS version it was built against, and `hds.min.css` exposes `--hds-version` and `--hds-uswds-version` for runtime reads. These are diagnostics for copied-`dist/` deployments that keep no other record of what is installed; both values belong in any bug report. See [Installation](https://nasa.github.io/hds-core/?path=/docs/overview-installation--docs) for how to read them.
