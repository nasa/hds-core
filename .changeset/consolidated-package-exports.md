---
'@nasa-hds/core': minor
---

Consolidate the published package so that assets ship from `dist/` only, and add subpath patterns to the exports map

**Action required if you copy assets out of `node_modules`.** The package no longer ships `src/assets/` as it only duplicated what `dist/assets/` already contained. `dist/assets/` is a strict superset (all HDS fonts and icons, plus the USWDS assets and the generated sprite), so update any copy step that pointed at the source tree. The [React guide](https://nasa.github.io/hds-core/?path=/docs/guides-react-guidance--docs#sass-setup) shows the updated configuration.

**Exports map.** `./assets` (which mapped to a directory and could never resolve a file) is replaced by the `./assets/*` subpath pattern, so `@nasa-hds/core/assets/img/hds-sprite.svg` now resolves. Added `./js/uswds` for the USWDS script, a root export and `./package.json` so the package can be resolved and version-detected by tooling the way other design systems allow, and a `style` field for bundlers that look for one.

**Sass.** `hds.scss` now forwards `_hds-config.scss`, so `$hds-enable-auto-dark-mode` can be set through the package entry point as documented. It was listed as public API but was unreachable without importing an internal module.

**New public mixin.** The `visually-hidden` mixin is renamed `hds-visually-hidden`, matching the rule that only `hds-*` symbols are public. The old internal name still works and is scheduled for removal in the next minor release.
