// ============================================================
// Search — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_search.scss` exists and
// `grep -rn "usa-search" src/scss/` returns zero matches anywhere in
// the theme — not even a `base/_palettes.scss` surface bridge.
// Everything below is USWDS default styling inside `@layer uswds`,
// composed from two components that ARE themed (`.usa-input`,
// `.usa-button`) joined by an unthemed `.usa-search` wrapper.
//
// USWDS docs:   https://designsystem.digital.gov/components/search/
// USWDS styles: packages/usa-search/src/styles/_usa-search.scss
// USWDS JS:     packages/usa-search/src/index.js — opted in below,
//               but a no-op against every variant on this page.
//
// `init()` implements the collapsible small-screen search used by
// USWDS's extended header: it looks for a `.js-search-button` inside
// a `header` ancestor (falling back to `document`), and on click hides
// that button, un-hides the sibling `.js-search-form`, focuses its
// `[type=search]` input, and attaches a one-shot `document.body` click
// listener that re-collapses the form the moment a click lands outside
// it. None of the markup on this page contains a `.js-search-button`
// trigger — the USWDS docs page for Search itself never shows one,
// only the extended-header pattern does — so `select()` finds nothing
// and `init()` runs harmlessly to completion. `parameters.uswds` is
// still set for spec parity with other JS-listed components and so
// this behavior is documented accurately rather than assumed absent.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `.usa-search` itself sets no color or shape, only
//     `@include typeset($theme-search-font-family)`, and HDS never
//     assigns `$theme-search-font-family` — it resolves to the USWDS
//     default `"ui"` (`uswds-core/.../settings-components.scss:170`),
//     not the HDS/Public Sans type used by every themed component.
//   - Cascade-layer trap (confirmed a sixth time on this branch): HDS's
//     `.usa-input` rule (`src/scss/components/_form.scss`) sets an
//     unconditional `border: 1px solid var(--hds-palette-border);
//     border-radius: 2px;` in `@layer hds-components`. Unthemed
//     `[type="search"]` (`@layer uswds`) zeroes `border-right` and the
//     two right corners so the input reads as one shape with the
//     button beside it. `hds-components` outranks `uswds` regardless
//     of specificity, so HDS's shorthand wins on every side — the
//     right border and right-side radius come back, leaving a rounded,
//     bordered right edge butted against the button's square
//     (`$theme-button-border-radius: 0`) left edge. A visible seam
//     where USWDS's markup intended a continuous control.
//   - Padding/height collision, independent of the layer trap: HDS's
//     `.usa-input` sets `padding: 14px 16px` (border-box, from the
//     unthemed `[type="search"]` rule) with no explicit height, while
//     `.usa-search [type="search"]` pins `height: units(4)` = 32px.
//     28px of vertical padding plus a 1–2px border leaves roughly 2px
//     of content box for the input's own line box — search input text
//     will clip inside the default and `--small` variants.
//     `usa-search--big` raises the fixed height to `units(6)` = 48px
//     at `mobile-lg`+, which has enough room; the smaller variants do
//     not.
//   - Focus makes the seam worse: `.usa-input:focus` thickens the
//     border to `$hds-border-width-thick` (2px, solid blue — the
//     non-dashed input focus system, AGENTS.md → Focus rings) on all
//     four sides, so the leaked right border in the point above grows
//     by another pixel against the button on focus.
//   - The button half of the seam is correct: `.usa-button`'s
//     border-radius is themed to `$theme-button-border-radius:
//     hds.$hds-border-radius` (0, `_hds-uswds-theme.scss:439`) and it
//     gets the full HDS button focus ring
//     (`button-interactive-states`, `_hds-mixins.scss`). The mismatch
//     documented above is entirely on the input side.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Search',
  parameters: {
    ...labParams,
    uswds: ['search'],
  },
};

// --- Helpers ---

/**
 * @param {object} options
 * @param {string} options.prefix      Unique id prefix for this copy
 * @param {string} options.labelText   Visually-hidden `<label>` text
 * @param {string} options.placeholder Input placeholder text
 * @param {string} options.variant     '' | 'usa-search--big' | 'usa-search--small'
 */
const search = ({ prefix = 'search', labelText = 'Search', placeholder = '', variant = '' } = {}) => {
  const showText = variant !== 'usa-search--small';
  return `
  <form class="usa-search ${variant}" role="search">
    <label class="usa-sr-only" for="${prefix}-field">${labelText}</label>
    <input
      class="usa-input"
      id="${prefix}-field"
      type="search"
      name="search"
      placeholder="${placeholder}"
    />
    <button class="usa-button" type="submit">
      ${showText ? '<span class="usa-search__submit-text">Search </span>' : ''}
      <img src="assets/img/usa-icons-bg/search--white.svg" class="usa-search__submit-icon" alt="Search" />
    </button>
  </form>`;
};

const contentArgTypes = {
  labelText: { control: 'text', name: 'Label (visually hidden)' },
  placeholder: { control: 'text', name: 'Placeholder' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    prefix: 'default',
    labelText: 'Search',
    placeholder: 'Search NASA.gov',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => search(args),
};

export const Big = {
  name: 'Big',
  tags: ['!dev', '!test'],
  args: {
    prefix: 'big',
    labelText: 'Search',
    placeholder: 'Search missions, data, and imagery',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => search({ ...args, variant: 'usa-search--big' }),
};

export const Small = {
  name: 'Small (icon only)',
  tags: ['!dev', '!test'],
  args: {
    prefix: 'small',
    labelText: 'Search',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => search({ ...args, variant: 'usa-search--small' }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Default', search({ prefix: 'all-default', placeholder: 'Search NASA.gov' })),
      block(
        'Big',
        search({ prefix: 'all-big', placeholder: 'Search missions, data, and imagery', variant: 'usa-search--big' }),
      ),
      block('Small (icon only)', search({ prefix: 'all-small', variant: 'usa-search--small' })),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Default', search({ prefix: `${palette}-default`, placeholder: 'Search NASA.gov' })),
      block(
        'Big',
        search({
          prefix: `${palette}-big`,
          placeholder: 'Search missions, data, and imagery',
          variant: 'usa-search--big',
        }),
      ),
      block('Small (icon only)', search({ prefix: `${palette}-small`, variant: 'usa-search--small' })),
    ]),
  ),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Default', search({ prefix: `${palette}-hover-default`, placeholder: 'Search NASA.gov' })),
      block(
        'Big',
        search({
          prefix: `${palette}-hover-big`,
          placeholder: 'Search missions, data, and imagery',
          variant: 'usa-search--big',
        }),
      ),
      block('Small (icon only)', search({ prefix: `${palette}-hover-small`, variant: 'usa-search--small' })),
    ]),
  ),
};
