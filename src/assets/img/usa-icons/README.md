# USWDS icon overrides

These files intentionally **replace** icons of the same name shipped by `@uswds/uswds`. They are not additions.

## How the replacement happens

`npm run copy:all` copies USWDS assets first and HDS assets last:

```
copy:uswds-fonts → copy:uswds-img → copy:uswds-js → copy:hds
```

`fs.cpSync` defaults to `force: true`, so anything in `src/assets/` overwrites the USWDS file of the same path in `dist/assets/`. No build step is needed to opt in — being in this directory _is_ the opt-in.

## Why

The USWDS footer renders social links as `<img class="usa-social-link__icon">`. An `<img>` is a replaced element: the SVG loads in its own document, page CSS does not cascade into it, and `currentColor` resolves against that document rather than ours. CSS therefore cannot recolor these icons at all.

Replacing the asset is the only way to give a stock USWDS footer HDS-consistent social marks without asking adopters to change their markup.

## Consequences

- **Fills are baked**, not `currentColor` — an `<img>` cannot resolve it. The baked value is `#f6f6f6` (`$hds-color-carbon-05`), which is what `--hds-palette-social-icon` resolves to on _every_ HDS palette, so nothing palette-aware is lost. The circle behind the glyph is drawn in CSS by `components/_social.scss` and stays palette-aware.
- **`twitter.svg` contains the X mark.** USWDS still ships the retired bird under this name. Any NASA site pointing at `twitter.svg` renders a dead brand, so it resolves to the current mark. `x.svg` is also provided for markup that has already migrated.
- Adopters who load assets from `@uswds/uswds` directly rather than from `@nasa-hds/core/assets` get the stock USWDS icons, not these.

## Provenance

Glyph geometry is normalized to the HDS convention (`viewBox="-2 -2 24 24"`, 20×20 glyph centered at 10,10). Sources are recorded in `src/assets/img/hds-icons/README.md`.

Platform names and marks are trademarks of their respective owners. Inclusion does not indicate endorsement in either direction.
