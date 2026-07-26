---
'@nasa-hds/core': minor
---

Stamp the HDS and USWDS versions into the compiled CSS

A deployed stylesheet can now identify itself. Every bundle opens with a banner naming its version and the USWDS version it was built against:

```css
/*! @nasa-hds/core v0.9.0 — hds.min.css | uswds v3.13.0 | CC0 1.0 | https://github.com/nasa/hds-core */
```

`hds.min.css` also exposes both as custom properties, readable at runtime:

```js
getComputedStyle(document.documentElement).getPropertyValue('--hds-version').trim(); // 0.9.0
getComputedStyle(document.documentElement).getPropertyValue('--hds-uswds-version').trim(); // 3.13.0
```

**Added:** `--hds-version` and `--hds-uswds-version`.

This is for adopters who copy `dist/` onto a server. That deployment keeps no package.json, no lockfile, and no install log, so until now nothing on the server recorded what was installed — and a pre-v1.0 minor that renames a custom property is impossible to reason about without knowing which version is live. Both values belong in any bug report.

Only the required bundle carries the properties. Emitting the same property from all three would let a stale copy of an optional bundle win the cascade and misreport the version; the per-file banner is what identifies `hds-uswds.min.css` and `hds-dataviz.min.css`.

Also substitutes USWDS's own banner. HDS compiles USWDS from source, where the string is the literal placeholder `uswds @version` — USWDS replaces it in its own build, so our bundles were shipping the unsubstituted token. It now reads `uswds v3.13.0`, matching what USWDS's own `dist` ships.

Versions are read from `package.json` and the installed `@uswds/uswds` at build time, so the stamp follows a version bump with no generated file to keep in sync.
