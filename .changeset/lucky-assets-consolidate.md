---
'@nasa-hds/core': minor
---

Consolidate published package contents onto a single asset tree, and make asset paths configurable from Sass

**BREAKING CHANGE — `src/assets/` is no longer published.** The tarball shipped HDS's fonts and icons twice: `src/assets/` (120 files) was a strict subset of `dist/assets/`. Only `dist/assets/` ships now.

If you copy assets out of the package, copy from `dist/assets/` instead of `src/assets/`. It is one complete tree and needs only a single copy target — it contains everything `src/assets/` had, plus Public Sans, the full USWDS image tree, and the generated sprite at `img/hds-sprite.svg`. Multi-target copy configs (HDS fonts + HDS img + Public Sans from `@uswds/uswds` + USWDS img) collapse to one:

```js
// vite-plugin-static-copy
{ src: 'node_modules/@nasa-hds/core/dist/assets', dest: '', rename: 'assets' }
```

Note that the sprite now arrives at `assets/img/hds-sprite.svg`, not `assets/hds-sprite.svg` — update any `<use href>` accordingly.

**BREAKING CHANGE — the `./assets` export is now `./assets/*`.** The deprecated trailing-slash form `"./assets": "./dist/assets/"` has been replaced with the subpath-pattern form. Import individual files: `@nasa-hds/core/assets/img/hds-sprite.svg`, `@nasa-hds/core/assets/fonts/inter/Inter-Regular.woff2`.

**New: configurable asset paths.** Three variables are added to the public Sass surface in `_hds-config.scss`, so you no longer have to copy assets next to your compiled CSS:

```scss
@use '@nasa-hds/core/scss' with (
  $hds-asset-path: '/static/hds-assets'
);
```

| Variable          | Default                      |
| ----------------- | ---------------------------- |
| `$hds-asset-path` | `'../assets'`                |
| `$hds-image-path` | `'#{$hds-asset-path}/img'`   |
| `$hds-font-path`  | `'#{$hds-asset-path}/fonts'` |

Setting `$hds-asset-path` retargets every `url()` HDS emits — webfonts, USWDS imagery, and HDS icons alike. Compiled CSS output is unchanged at the default value.

**New: `./js/uswds` and `./js/uswds-init` exports** for the USWDS JavaScript pass-through. Both were already shipping in `dist/js/`, just not addressable through the `exports` map:

```js
import '@nasa-hds/core/js/uswds-init'; // synchronous, in <head>
import '@nasa-hds/core/js/uswds'; // deferred, end of <body>
```

They are separate entry points because they load differently. `uswds-init` is tiny and must run before first paint — it marks the page as still-loading so `hds.min.css` can hide JavaScript-dependent content until `uswds` initializes it. Without it, navigation submenus, banner content, and modal wrappers flash open on load. `./js` itself is deliberately not claimed; it is reserved for possible future HDS JavaScript.
