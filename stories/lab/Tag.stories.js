// ============================================================
// Tag — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_tag.scss` exists and
// no HDS rule targets `.usa-tag*` (`grep -rn "usa-tag" src/scss/`
// returns nothing at all — not even a surface-bridge or print
// match). Everything below is USWDS default styling inside
// `@layer uswds`, recolored only by the HDS theme settings in
// `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/tag/
// USWDS styles: packages/usa-tag/src/styles/_usa-tag.scss
// USWDS JS:     none
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `.usa-tag` has no `_usa-tag-settings.scss` of its own and consumes
//     no `$theme-tag-*` setting at all — `packages/usa-tag/src/styles/_usa-tag.scss`
//     hardcodes `background-color: color("base-dark")`, which resolves
//     through `$theme-color-base-dark: 'gray-80'` in `_hds-uswds-theme.scss`
//     (the neutral **base** family, not primary NASA Red or secondary
//     NASA Blue) to USWDS system `gray-80` = `#2e2e2e`. The tag never
//     reads `--hds-palette-*`, so this dark-gray box is identical on
//     every one of the six palettes.
//   - Text is `@include u-text("white", "uppercase")` — a literal system
//     color, not `$theme-text-reverse-color` (`'base-lightest'`), so the
//     tag bypasses HDS's reverse-text token entirely. White-on-`#2e2e2e`
//     is ~13.6:1, comfortably AA (and AAA) on all six palettes, but on
//     the dark (`#1b1b1b`) and black (`#000000`) palettes the tag's own
//     box-to-page-background contrast drops to roughly 1.3:1–1.5:1 — the
//     tag nearly disappears as a distinct shape even though its text
//     stays legible.
//   - `border-radius: radius('sm')` resolves to `$theme-border-radius-sm`
//     (`packages/uswds-core/src/styles/settings/_settings-spacing.scss`),
//     which HDS never overrides — it is not one of the border-radius
//     settings assigned in `_hds-uswds-theme.scss`. It defaults to `2px`,
//     which happens to equal `$hds-border-radius-control` (the token
//     `_hds-tokens.scss` explicitly earmarks for "tag/chip"), but the
//     match is coincidental USWDS default, not HDS theming — there is no
//     `$theme-tag-border-radius` hook to theme it through.
//   - `@include u-font("ui", "2xs")` (and `u-font("ui", $theme-body-font-size)`
//     on `.usa-tag--big`) resolves through `$theme-font-role-ui: 'serif'`,
//     which HDS maps to Inter (`$theme-font-type-serif: 'inter'`) — tag
//     text renders in HDS's heading typeface, not Public Sans body text.
//   - HDS's own `hds-tag-*` icon family (`stories/helpers/icons.js` →
//     `hdsTagIcons`: `tag-data`, `tag-document`, `tag-topic`, etc.) is
//     an unrelated content-category icon sprite (`hds-sprite.svg`), not
//     part of this component — USWDS's `.usa-tag` markup has no icon
//     slot at all. Flagged for whoever themes this: the shared "tag"
//     name is a real collision risk if an icon-plus-label chip variant
//     is designed later and someone assumes `tag-*` icons were built
//     for `.usa-tag`.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Tag',
  parameters: labParams,
};

// --- Helpers ---

/**
 * @param {object} options
 * @param {string} options.text Tag content
 * @param {boolean} options.big Apply `.usa-tag--big`
 */
const tag = ({ text = 'Earth Science', big = false } = {}) =>
  `<span class="usa-tag${big ? ' usa-tag--big' : ''}">${text}</span>`;

/** A row of tags as they appear on a dataset or mission listing. */
const tagRow = (items) => `
  <div style="display: flex; flex-wrap: wrap; align-items: center;">
    ${items.map((text) => tag({ text })).join('\n')}
  </div>`;

const missionDivisionTags = ['Planetary Science', 'Astrophysics', 'Heliophysics', 'Earth Science'];
const dataTypeTags = ['Imagery', 'Spectral Data', 'Radar', 'In Situ Measurements', 'Ephemeris'];

const contentArgTypes = {
  text: { control: 'text', name: 'Tag text' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    text: 'Earth Science',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => tag(args),
};

export const Big = {
  name: 'Big',
  tags: ['!dev', '!test'],
  args: {
    text: 'Active Mission',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => tag({ ...args, big: true }),
};

export const InlineText = {
  name: 'Inline in body text',
  tags: ['!dev', '!test'],
  render: () => `
    <p>
      The Europa Clipper spacecraft carries instruments spanning the
      ${tag({ text: 'Planetary Science' })} and ${tag({ text: 'Astrophysics' })}
      divisions, and its returned products are catalogued as
      ${tag({ text: 'Imagery' })} and ${tag({ text: 'Spectral Data' })} in the
      Planetary Data System.
    </p>`,
};

export const Collection = {
  name: 'Collection (row of tags)',
  tags: ['!dev', '!test'],
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <p style="margin: 0 0 0.5rem;"><strong>Science divisions</strong></p>
        ${tagRow(missionDivisionTags)}
      </div>
      <div>
        <p style="margin: 0 0 0.5rem;"><strong>Data types</strong></p>
        ${tagRow(dataTypeTags)}
      </div>
    </div>`,
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    stack([
      block('Default', tag({ ...args })),
      block('Big', tag({ text: 'Active Mission', big: true })),
      block(
        'Inline in body text',
        `<p>
          The Europa Clipper spacecraft carries instruments spanning the
          ${tag({ text: 'Planetary Science' })} and ${tag({ text: 'Astrophysics' })}
          divisions, and its returned products are catalogued as
          ${tag({ text: 'Imagery' })} and ${tag({ text: 'Spectral Data' })} in the
          Planetary Data System.
        </p>`,
      ),
      block(
        'Collection (row of tags)',
        `<div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <p style="margin: 0 0 0.5rem;"><strong>Science divisions</strong></p>
            ${tagRow(missionDivisionTags)}
          </div>
          <div>
            <p style="margin: 0 0 0.5rem;"><strong>Data types</strong></p>
            ${tagRow(dataTypeTags)}
          </div>
        </div>`,
      ),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: paletteRender(AllVariants.render),
};
