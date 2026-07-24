---
'@nasa-hds/core': minor
---

First npm publish and package rename: `@nasa/hds-core` → `@nasa-hds/core`

HDS Core is now published to npm under the `@nasa-hds` organization. Install with `npm install @nasa-hds/core @uswds/uswds`.

**Breaking for early adopters installing from GitHub:** the package name changed from `@nasa/hds-core` to `@nasa-hds/core`. Update your imports and Sass load paths accordingly:

- CSS: `@nasa-hds/core/css`, `@nasa-hds/core/css/uswds`, `@nasa-hds/core/css/dataviz`
- Sass: `@use '@nasa-hds/core/scss'` (plus `/scss/uswds`, `/scss/dataviz`)
- Sass load path: `node_modules/@nasa-hds/core/src/scss`

The `@nasa-hds` scope leaves room for sibling packages (e.g. dataviz, framework bindings) without renaming core again. Subpath exports and class names are unchanged.
