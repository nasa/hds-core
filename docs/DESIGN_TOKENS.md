# Life of a Design Token

How a primitive value travels from `tokens.json` to shipped CSS, docs, and the adopter contract. Follow this to add, change, or remove a token correctly.

## Before you start

- **`tokens.json` is the only source of truth** for primitive values (colors, spacing, borders, focus, layout, typography primitives). It follows the [W3C DTCG format](https://www.designtokens.org/tr/2025.10/).
- **Never hand-edit** `src/scss/_hds-tokens.scss` or `src/scss/base/_custom-properties.scss`. Both are regenerated every build from `tokens.json` and carry a "Do not edit directly" header.
- **Propose first if the change is visible.** Anything that shifts NASA's visual identity goes through a Discussion, not a PR. See [Design proposals](../CONTRIBUTING.md#design-proposals). Tokens rarely need creative-director sign-off, but a visible value change still needs agreement first. A purely internal refactor does not. This guide assumes the value is agreed on.

## 1. Add the token to the right place

Add your token to the matching group in `tokens.json`. The group determines whether it is generated and where it lands.

Hard rules: colors only in `color`, spacing only in `spacing`, never hardcode a value that already exists in a scale.

| If your token is | Goes in group | Generated to |
| --- | --- | --- |
| color, border, focus, layout, line-height, letter-spacing, font-weight, font-size, font-family, spacing | that group | both `_hds-tokens.scss` (Sass) and `base/_custom-properties.scss` (CSS) |
| a breakpoint | `breakpoint` | Sass only. CSS custom properties cannot drive media or container queries. |
| a composite type style (a full ramp entry, `$type: typography`) | not a primitive. Assemble it in the `$_type` map in `_hds-typography.scss` from existing primitives. | neither (built in Sass) |
| a dataviz chart color | `dataviz.color.*` | neither. Parallel contract, see step 6. |
| a per-palette color assignment | not `tokens.json` at all. Hand-authored in `base/_palettes.scss`. | see step 6 |
| another primitive that fits nowhere above (e.g. motion) | a new group in `tokens.json` | both files automatically, but a new group needs setup: see [Adding a new token group](#adding-a-new-token-group) |

### Create the token entry

In `tokens.json`, every token needs `$value` and `$description`. The `$description` is the usage contract (allowed uses, prohibitions, required pairings). It flows into the generated Sass and CSS as an inline comment and renders on the Storybook token page, so match the voice of its neighbors (the color descriptions state "Never for…" rules). Follow the [W3C DTCG format spec](https://www.designtokens.org/tr/2025.10/format/#design-token-0).

Give the group itself a `$description` too. Nearly every group carries one (`focus`, `layout`, `line-height`, and others), and it states the doctrine for the whole group, not just an individual token.

**Spacing note:** whole-number keys are for layout; fractional keys (`0.5`, `1.5`, `2.5`) are component-internal only.

### Adding a new token group

Adding a token to an existing group is covered above. A brand-new top-level group (e.g. `motion`) emits to both files without any change to the platform filters, but four things do not happen on their own:

1. **Register the group** under `$extensions.gov.nasa.hds.domains.base` in `tokens.json`. Add the group name to that array alongside `color`, `spacing`, and the rest. Nothing fails loudly if you skip this, so it is easy to miss.
2. **Add a value transform if the type is not already handled.** The shared transforms cover color and the existing dimension and letter-spacing cases. A new type whose raw `$value` does not serialize to valid CSS (for example a motion value needing a `cubicBezier` or an array flattened to a CSS string) needs its own `value/` transform in `sd.config.js`, added to `hdsTransforms`.
3. **Add a `tokenCategory()` case** in `sd.config.js`. Without one, the group falls through to the `default` branch and lands under a label with no presenter, so its Storybook preview is untyped.
4. **Add the Storybook block** in `stories/overview/DesignTokens.mdx`: a `## Heading` plus `<DesignTokenDocBlock categoryName="…" />`, where `categoryName` matches the label you set in `tokenCategory()`.

## 2. Regenerate the Sass

```bash
npm run build:tokens        # Style Dictionary, sd.config.js
```

This rewrites `_hds-tokens.scss` and `base/_custom-properties.scss`. Commit the generated output alongside your `tokens.json` change. Name transforms happen here automatically (`sd.config.js`): prefix `hds`, kebab-case, a trailing `default` segment is dropped (`border.radius.default` becomes `$hds-border-radius`), `0em` letter-spacing normalizes to `0`, and dimensions stay px, not rem.

## 3. Wire it into use

The generated `$hds-*` scalars should be consumed downstream:

- **USWDS theming:** map it in `_hds-uswds-theme.scss` if it should drive a USWDS `$theme-*` setting. If you touch a theme setting, mirror it in `_hds-uswds-theme-utils.scss`; the two must stay identical.
- **Components:** find any literal values in `src/scss/components/` that should become the new token. Use the Sass variable (`$hds-*`) when the value is always the same, or the CSS custom property (`var(--hds-*)`) when it depends on context, as color tokens depend on palettes.
- **Fallbacks:** when a component color varies by palette, use the palette var with a default fallback to the white-palette value: `color: var(--hds-palette-link-text, #{$hds-color-carbon-90});`

## 4. Update docs (mostly automatic)

`stories/overview/DesignTokens.mdx` renders each category with a `<DesignTokenDocBlock categoryName="…" />` block that reads the annotations `sd.config.js` emits. Adding a token to an **existing** group is automatic: your new row and its description appear with no manual edit. A **new** group does not appear on its own. Add a `## Heading` and a `<DesignTokenDocBlock categoryName="…" />` by hand, where `categoryName` exactly matches the label from `tokenCategory()` in `sd.config.js` (see [Adding a new token group](#adding-a-new-token-group)).

If your change alters usage guidance, update the prose Foundations pages people actually read: `Color`, `Spacing`, `Typography`. Dataviz tokens do not yet have an auto-generated page and must be documented by hand on `Data Visualization` or `Data Visualization Palettes`.

## 5. Changeset and the public API contract

Adding a root-level `$hds-*` variable (or mixin, custom property, or selector) expands the public surface tracked in `public-api.snapshot.txt`.

```bash
npm run check:api-snapshot   # fails if the surface changed and the snapshot is stale
npm run update:api-snapshot  # regenerate, then review and commit the diff
npx changeset                # write the changeset
```

A new token is a `minor` bump. For removals, renames, and the full table, see the [semver rubric](../CONTRIBUTING.md#semver-rubric). Write the summary for adopters, since it goes straight into the changelog. Purely internal changes under `base/` or `components/` with no snapshot diff need no changeset.

## 6. Special cases

- **Palettes are hand-authored and must not be flattened.** `base/_palettes.scss` is never generated from `tokens.json`. Adding a new brand color does not auto-wire it into the six palettes; that is separate, deliberate work. Never convert `var(--hds-palette-*)` assignments to static variables, and never generate palette CSS from tokens.
- **Dataviz is a parallel contract.** `dataviz.color.*` in `tokens.json` is filtered out of generation (`sd.config.js`); the shipped values live hand-authored in `_hds-dataviz-palettes.scss`. Change both and keep them in sync by hand. Dataviz colors are for charts only, never UI.
- **What if `tokens.json` disagrees with compiled output?** `$description` is the authority for design intent; `public-api.snapshot.txt` plus compiled CSS is the authority for what HDS promises adopters today. Flag the mismatch for reconciliation, and do not silently fix either side.

## 7. Pre-PR checklist

```bash
npm run build:tokens        # regenerate (commit output)
npm run check:tokens        # drift gate, must pass (also runs in CI)
npm run build               # compile dist/ — check:api-snapshot and npm test read it
npm run check:api-snapshot  # if it fails: update:api-snapshot + changeset
npm run lint:scss           # lint (add lint:mdx if you touched docs)
npm run format              # formatting
npm test                    # vitest unit + a11y
npm run test:visual         # Chromatic, if the change is visible
```

`check:api-snapshot` and `npm test` read the compiled CSS in `dist/`, so `npm run build` has to run before them (`build` also runs `build:tokens`, so it subsumes the first line).

Then open the PR against `main` and fill out the template. A visual restyle that will not change the snapshot but will meaningfully shift adopter layouts should get the `visual-breaking-change` label and a bump one notch above the rubric.

## 8. Deprecate and remove a token (end of life)

Removing a public token is breaking, so give it a runway. Never delete a public `$hds-*` variable or custom property in one step. See [Deprecation](../CONTRIBUTING.md#deprecation) for the policy.

**Deprecate first.** Keep the token at least one minor release cycle before removing it. In that window:

- Migrate every downstream reference (components, `_hds-uswds-theme.scss`, docs) to the replacement, so nothing in the repo still depends on it.
- Note the deprecation and its replacement in the token's `$description` and in the changeset.

**Then remove**, in a later release:

1. Delete the token from `tokens.json`. Run `npm run build:tokens` and commit the regenerated files. The variable and custom property drop out of the generated output.
2. Run `npm run update:api-snapshot`. Removed symbols show as deleted lines.
3. Set the bump: removing a public symbol is minor pre-v1.0, major post-v1.0.
4. Call out in the changeset summary any removal that shipped without a prior deprecation cycle.

Palettes and dataviz values are hand-authored, so removing one is a manual edit to `base/_palettes.scss` or `_hds-dataviz-palettes.scss`, not a `tokens.json` change. The same runway applies.
