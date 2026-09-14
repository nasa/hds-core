# Life of a Component

This traces a net-new HDS component from proposal to merge, and eventually to removal. "Net-new" means no USWDS equivalent, so it uses the `hds-` prefix. If your component maps to a USWDS component, you use the `usa-` prefix and write overrides instead of net-new markup. The steps are the same, but a restyle carries a few extra obligations. See [Restyling a USWDS component](#restyling-a-uswds-component) first.

## Component lifecycle and status

Every component has one status that tells adopters how much they can rely on it. You set it as a Storybook tag when you write the stories (step 4), and change it as the component matures or retires (step 9).

| Status | Meaning | Storybook tag |
| --- | --- | --- |
| Experimental | Shipped and usable, but design or API may change without a deprecation cycle. | `status:experimental` |
| Stable | Design and markup are settled, documented, and tested. Breaking changes follow a deprecation cycle. | `status:stable` |
| Deprecated | Scheduled for removal, with a named replacement. Still ships for at least one more minor release. | `status:deprecated` |

New components enter as **experimental**. Promote to **stable** once the component meets every item in steps 3 through 7 with no open design questions: styles follow the token, palette, and focus rules; full stories and a Guidance page exist; and it passes accessibility checks across all six palettes. You do not demote a stable component. If it is superseded, you deprecate it.

Set the status with a literal tag on the component's default export. Keep it a literal array; the Storybook indexer cannot read tags from variables or spreads.

```js
export default {
  title: 'Components/MyComponent',
  tags: ['status:experimental'],
};
```

Mirror the status in `Roadmap.mdx` so adopters who read the roadmap, not the sidebar, see it too. For how status affects version bumps, see the [semver rubric](../CONTRIBUTING.md#semver-rubric).

## Restyling a USWDS component

This guide assumes a net-new `hds-` component. If yours maps to a USWDS one, you write `usa-` overrides instead of net-new markup, and that carries obligations a net-new component never hits. It is a mode, not a step: it changes what you do in steps 1, 3, 4, and 5. Two things are pure pre-work, do them before you write any SCSS:

- **Read the upstream partial first.** The USWDS source (`node_modules/@uswds/uswds/packages/<component>/src/styles/`, or the [jsDelivr CDN](https://cdn.jsdelivr.net/npm/@uswds/uswds/) when dependencies are not installed) reveals values hardcoded past the theme settings. A theme setting can silently do nothing if the partial overrides it at some breakpoint, and you only learn that by reading the source.
- **Confirm a theme setting can express your value.** `units()` only accepts keys in the USWDS spacing scale and hard-errors on arbitrary lengths, so a value between two scale steps is unreachable through theming and needs a direct override. Check the neighboring scale steps before assuming a theme setting will work.

The remaining restyle obligations appear inline at the relevant steps, each marked with a `> [!NOTE]` alert titled **Restyling a USWDS component**.

## 1. Propose the design first

Design is reviewed separately from code so pull requests do not turn into design debates. Settle the direction before writing any SCSS, or you risk rewriting finished work.

Find your path:

- **Already specced in the HDS Figma library:** no proposal needed. Build to match the spec and start at step 2. Expect to surface conflicts anyway: older specs can be internally inconsistent, cover only some palettes, or specify colors that fail a contrast rule. Build to spec, but when the spec conflicts with an accessibility requirement, flag it for reconciliation rather than silently correcting it, and note the conflict in the Guidance page. Step 7 covers the contrast thresholds to check against.
- **Net-new (this guide's assumption):** open a Discussion. Net-new designs need a creative-director review before a code PR can merge. See [Design proposals](../CONTRIBUTING.md#design-proposals) for what to include and the gates to settle up front (scope fit, USWDS-first, palette and accessibility).

New components ship as experimental, so plan to tag the component `status:experimental` in step 4.

## 2. Set up

```bash
npm ci                 # exact lockfile install, so your build matches CI
npm run dev            # Storybook + Sass watcher. Use this, not `npm run storybook`.
git checkout -b feature/my-component
```

## 3. Write the styles

Create `src/scss/components/_my-component.scss`. Match the header-comment style of `_button.scss` or `_blockquote.scss`: document markup, palette behavior, responsive behavior, and any deviations with a terse rationale.

### Standard imports

```scss
@use 'uswds-core' as *;
@use 'hds-tokens' as *; // $hds-* primitives, generated from tokens.json
@use 'hds-mixins' as *; // focus rings, type, links, buttons
@use 'hds-typography' as *; // hds-type() composites
```

### Authoring rules

- **BEM, `hds-` prefix:** `.hds-my-component`, `.hds-my-component__element`, `.hds-my-component--modifier`. Never mix `hds-` and `usa-` on one component.
- **No hardcoded values that exist in the token scale.** Colors from the color group only, spacing from the spacing group only. Layout spacing uses whole-number primaries (8, 16, 24, 32). Fractional spacing (4, 12, 20px) is component-internal only.
- **Palette-aware, never flattened.** Reference palette custom properties with a white-default fallback. Never convert them to static variables:
  ```scss
  color: var(--hds-palette-heading, #{$hds-color-carbon-90});
  ```
- **Focus rings via the mixins** (`hds-focus-ring`, `hds-focus-ring-inline`, `hds-focus-ring-size`). Never hardcode focus styles. If the Figma spec will not fit the mixins, stop and flag it rather than editing the mixin.
- Styles belong only in `hds.min.css`, via this file. Never touch `hds-uswds.min.css`.
- **Record deviations in the component MDX, not here.** Behavioral or markup differences from USWDS go in a `Differs from USWDS` callout; intentional departures from the Figma spec go in a Figma callout. Keep only a one-line _why_ in the SCSS header.

> [!NOTE] **Restyling a USWDS component.** Name HDS-invented parts in the existing `usa-` namespace, not a parallel `hds-` prefix. When Figma specs an element USWDS has no class for, keep it in the component's namespace (e.g. `.usa-step-indicator__segment-caption`, `--condensed`), the way `.usa-list--top-level` does. Such a net-new selector is still a new public API entry, so it lands on the snapshot (step 6). When a USWDS `$theme-*` setting expresses what you need, prefer it over a direct override, and mirror the change in both `_hds-uswds-theme.scss` and `_hds-uswds-theme-utils.scss`; the two must stay identical.

For the rationale behind these rules, see [ARCHITECTURE.md](ARCHITECTURE.md) (layers, palette variables, focus ring architecture).

### Palette custom properties

The rule above covers _consuming_ `var(--hds-palette-*)`. _Adding_ a new one is a deliberate step: edit `_scheme-light` and `_scheme-dark` in `base/_palettes.scss`, plus any per-palette block that needs a different value. Midtone and blue often need explicit overrides because the naive scheme mapping can fail WCAG contrast on them, so verify the new property on all six palettes, not just light and dark. New `--hds-palette-*` names land in the public API snapshot and are a permanent commitment. Palettes are intentionally not in `tokens.json`, so a non-token value (such as a translucent overlay) is legitimate here but would not be inside a component file.

### Icons

Themeable icons are drawn with a CSS mask so their color follows the palette. Set the color with `background-color` (not `fill`, the SVG is a mask), and point `mask-image` at the icon:

```scss
&::before {
  background-color: var(--hds-palette-utility-icon, #{$hds-color-carbon-black});
  content: '';
  height: 20px;
  mask-image: url('../assets/img/hds-icons/<name>.svg'); // path is relative to dist/css/
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: 24px 24px; // hds-icons use viewBox="-2 -2 24 24"
  width: 20px;
}
```

Precedent: `_accordion.scss`, `_link.scss`, `_table.scss`, `_form.scss`, `_blockquote.scss`. For an icon in markup rather than CSS, use the sprite: `<svg class="hds-glyph"><use href="/assets/img/hds-sprite.svg#<name>"></use></svg>`. One gotcha: `mask-image` does not load over `file://`, so a local HTML file shows an empty icon box. Serve over HTTP to check.

### Register and wire up

Register the component with a `@forward` in the correct category block of `src/scss/components/_index.scss`. That routes it into `@layer hds-components`, which outranks the base `@layer uswds`, so a restyle's overrides win without specificity hacks. This is true whether the component is net-new `hds-` or a `usa-` restyle: the layer does the work, not the selector weight.

You do not add anything to the USWDS import. Every USWDS component already ships, loaded once via `meta.load-css('uswds')` in `hds.scss`; a restyle just adds an overriding layer on top. The only reason to touch USWDS loading is if USWDS itself releases a brand-new component package, which is rare and outside the everyday flow.

## 4. Write the stories

Create `stories/components/MyComponent.stories.js` and set the status tag on the default export (see [Component lifecycle and status](#component-lifecycle-and-status)). A complete component has:

- a sidebar story per major variant, with exposed controls
- one `AllVariants` composed story
- `PaletteA11y` tests, plus `PaletteA11yHover` if the component has interactive elements
- a Focus test per unique `:focus-visible` treatment

A component with no interactive elements ships neither an interactive-focus test nor `PaletteA11yHover`. State that in the stories so its absence reads as intentional, not an oversight.

> [!NOTE] **Restyling a USWDS component.** It may already appear in a `stories/guides/USWDS*.stories.js` guide story. Those intentionally show unmodified USWDS markup, so leave them alone and just confirm they still render.

For how to structure and write these, including the export order, helpers, the `AllVariants` pattern, and the rules that fail silently if you break them (literal `tags`, no `label:` key), follow [DOCUMENTATION.md](DOCUMENTATION.md). `Button.stories.js` is the reference.

## 5. Write the docs

Create `stories/components/MyComponent.mdx`. A complete component has a Guidance page covering variants, when to use, when to consider something else, usability, and accessibility. For the full page structure, what to leave out, and Canvas embed conventions, follow [DOCUMENTATION.md](DOCUMENTATION.md). Start from an existing `.mdx` file; the `<Meta title="...">` must be a string. All content uses public NASA data only.

> [!NOTE] **Restyling a USWDS component.** Read the USWDS component page's Usability and Accessibility sections and reconcile them against the Figma spec before you finalize. USWDS carries guidance HDS inherits, and it can conflict with the visual design (for example, a USWDS instruction to mark unlabeled elements `aria-hidden` can clash with a condensed variant that hides labels with `display: none`). Note any conflict and how you resolved it in the Guidance page.

## 6. Write the changeset

A new component adds selectors to the public API surface, so regenerate the snapshot and write a changeset:

```bash
npm run build                 # compile dist/ first — the snapshot reads dist/css/hds.min.css
npm run update:api-snapshot   # regenerate public-api.snapshot.txt
npx changeset
```

`update:api-snapshot` reads the compiled `dist/css/*.min.css`, not SCSS source. Regenerating against a stale `dist/` produces a wrong snapshot that still passes `check:api-snapshot`, so build first.

A new experimental component is a `minor` bump. For the full rules and the experimental carve-out, see the [semver rubric](../CONTRIBUTING.md#semver-rubric). Commit both the snapshot and the changeset. If you edited `tokens.json`, also run `npm run build:tokens` and commit the regenerated files.

## 7. Test and lint

```bash
npm test                   # Storybook stories + axe a11y on every story, all six palettes
npm run check:api-snapshot # fails if the snapshot is stale
npm run check:tokens       # fails if generated token files drift from tokens.json
npm run format:fix
npm run lint:scss && npm run lint:js && npm run lint:md && npm run lint:mdx
```

`check:api-snapshot` reads the compiled `dist/`, so run `npm run build` first if you have not already (step 6 covers this).

Then verify by hand in Storybook: the palette switcher across all six palettes, mobile through desktop viewports, visible focus indicators, and meaning never carried by color alone. Check contrast at both thresholds: AA text contrast (4.5:1, or 3:1 for large text), and WCAG 1.4.11 for non-text (3:1 for UI components and meaningful graphics, which axe does not fully cover). Chromatic (`npm run test:visual`) runs in CI.

## 8. Open the PR

Push `feature/my-component` and open a PR to `main`. Fill out the template completely and confirm CI is green before requesting review.

## 9. Deprecate and remove a component (end of life)

> [!IMPORTANT] Never delete a public component in one step. [CONTRIBUTING.md](../CONTRIBUTING.md#deprecation) owns the deprecation policy (the grace period and what to record); this is the mechanics.

**Deprecate first.** Set the component to `status:deprecated`, then note the deprecation and its named replacement in the SCSS file header, the Guidance page, and a changeset.

**Then remove**, in a later release:

1. Delete the SCSS partial and its `@forward` in `components/_index.scss`. Delete the `.stories.js` and `.mdx` files. Update `Roadmap.mdx`.
2. Run `npm run build`, then `npm run update:api-snapshot`. Removed selectors and custom properties show as deleted lines.
3. Set the bump from the [rubric](../CONTRIBUTING.md#semver-rubric).
4. In the changeset summary, call out any removal that shipped without a prior deprecation cycle.
