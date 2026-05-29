---
'@nasa/hds-core': minor
---

minor: form error style updates

**Renamed:** `--hds-palette-error-border` is now `--hds-palette-error-indicator`. If you were referencing this property directly, update to the new name.

**Removed:** `--hds-border-radius-pill` custom property. Use a static value or define your own in `@layer site`.

**Removed:** `.usa-file-input__target` selector (HDS override dropped).

**Added:** `.usa-legend--large` selector is now part of the HDS authored surface.
