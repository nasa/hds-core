---
'@nasa/hds-core': minor
---

form style updates

**Added:** `.usa-legend--large` and `.usa-radio__label-description` selectors are now part of the HDS authored surface.

**Renamed:** `--hds-palette-error-border` is now `--hds-palette-error-indicator`. If you were referencing this property directly, update to the new name.

**Removed:** `--hds-border-radius-pill` custom property. Use a static value or define your own in `@layer site`.

**Removed:** `.usa-file-input__target` selector (HDS override dropped).
