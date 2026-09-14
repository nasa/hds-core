// ============================================================
// Input Mask — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_input-mask.scss` exists
// and no HDS rule targets `.usa-input-mask*` or `.usa-masked`
// (`grep -rn "usa-input-mask\|usa-masked" src/scss/` — no matches).
// But the control it decorates, `.usa-input`, IS themed by HDS
// (`src/scss/components/_form.scss`) — see the cascade-layer trap
// below, which is the real defect this component has.
//
// USWDS docs:   https://designsystem.digital.gov/components/input-mask/
// USWDS styles: packages/usa-input-mask/src/styles/_usa-input-mask.scss
// USWDS JS:     packages/usa-input-mask/src/index.js — REQUIRED.
//
// This is a JS-dependent lab story. The authored markup is a plain
// `<input class="usa-input usa-masked" placeholder="___-___-____">` —
// USWDS input masks do not exist until `init()` runs. It reads the
// `placeholder` attribute off each `.usa-masked` input, moves it to
// `data-placeholder` (and sets `maxlength`), wraps the input in a new
// `.usa-input-mask` span, and inserts a sibling `.usa-input-mask--content`
// span — `aria-hidden`, `id="${input.id}Mask"` — that renders the
// placeholder characters as a positioned overlay sitting on top of the
// real input. A `keyup` handler then rewrites the input's value against
// the mask on every keystroke. Without the re-init decorator below, the
// story shows a bare input whose `placeholder` was never migrated: no
// `.usa-input-mask` shell, no overlay, no reformatting — nothing about
// the component that gives it its name is present, so the story would
// be indistinguishable from a plain `.usa-input`. `parameters.uswds`
// opts this file into the decorator in `.storybook/preview.js` that
// runs that pass after Storybook renders.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - Cascade-layer trap (the sixth time on this branch): the overlay
//     span, `.usa-input-mask--content`, assumes the default USWDS
//     `.usa-input` box — `padding: units(1)` (8px, all sides), per
//     `%block-input-general`/`%block-input-styles` in
//     `packages/uswds-core/src/styles/placeholders/_forms.scss` — and
//     is itself built with `padding: units(1)` plus `left: 2px` to line
//     up with it (`packages/usa-input-mask/src/styles/_usa-input-mask.scss`).
//     HDS repads the real input to `padding: 14px 16px`
//     (`src/scss/components/_form.scss:117`) in `@layer hds-components`,
//     which outranks `@layer uswds` regardless of selector specificity
//     (see AGENTS.md → cascade layer order). The `.usa-masked` padding
//     rule loses that layer contest, so the live input gets 14px/16px
//     while the untouched overlay keeps 8px + a 2px left offset — the
//     placeholder text renders roughly 6px too high and 5px too far
//     left of where typed characters actually land, on every palette.
//   - The overlay's visible text color is hardcoded `color("gray-50")`
//     (USWDS gray), not `--hds-palette-*` anything, so it does not
//     adapt with the six HDS palettes the way `--hds-palette-input-bg`
//     and `--hds-palette-control-text` do on the real input underneath.
//   - `.usa-input` gets its font size from an HDS override,
//     `font-size: size('body', '2xs')` (`src/scss/components/_form.scss:114`),
//     while `.usa-input-mask--content` sets no font of its own and
//     simply inherits from its ancestor — so the overlay glyphs are
//     only guaranteed to match the real input's type size by
//     coincidence of ambient context, not by any shared rule.
//   - The one dimension that does line up: the overlay's
//     `border: 1px solid transparent` matches HDS's
//     `$hds-border-width-thin: 1px` (`src/scss/_hds-tokens.scss:24`),
//     which is also what `.usa-input`'s themed border resolves to
//     (`src/scss/components/_form.scss:112`) — so border width is not
//     part of the misalignment, only padding and color are.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Input Mask',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    uswds: ['inputMask'],
  },
};

// --- Helpers ---

/**
 * A masked text input, in its pre-enhancement form.
 *
 * `init()` reads `placeholder` and (optionally) `data-charset` and
 * replaces this element with the shell/overlay pair described above,
 * so the markup here is what an author writes, not what ends up in
 * the DOM. `prefix` keeps `id`/`aria-describedby` unique when several
 * copies of this component render in one document (`AllVariants`,
 * the six stacked palette copies).
 *
 * @param {object} options
 * @param {string} options.prefix      Unique id namespace
 * @param {string} options.labelText   Field label
 * @param {string} options.hint        Hint text below the label
 * @param {string} options.type        `<input>` type attribute
 * @param {string} options.inputmode   `<input>` inputmode attribute
 * @param {string} options.placeholder The mask template, e.g. `___-___-____`
 * @param {string} options.pattern     Validation pattern
 * @param {string} options.dataCharset Wildcard charset for non-numeric masks
 */
const maskedInput = ({
  prefix = 'mask',
  labelText = 'US telephone number',
  hint = 'Format: area code-prefix-line number',
  type = 'tel',
  inputmode = 'numeric',
  placeholder = '___-___-____',
  pattern = '\\d{3}-\\d{3}-\\d{4}',
  dataCharset = '',
} = {}) => {
  const inputId = `${prefix}-input`;
  const hintId = `${prefix}-hint`;
  return `
  <div class="usa-form" style="max-width: 20rem;">
    <label class="usa-label" for="${inputId}">${labelText}</label>
    <div class="usa-hint" id="${hintId}">${hint}</div>
    <input
      id="${inputId}"
      type="${type}"
      inputmode="${inputmode}"
      name="${inputId}"
      placeholder="${placeholder}"
      pattern="${pattern}"
      class="usa-input usa-masked"
      aria-describedby="${hintId}"
      ${dataCharset ? `data-charset="${dataCharset}"` : ''}
    />
  </div>`;
};

const maskedInputArgTypes = {
  labelText: { control: 'text', name: 'Label' },
  hint: { control: 'text', name: 'Hint text' },
  placeholder: { control: 'text', name: 'Mask template' },
  type: { control: 'select', options: ['text', 'tel'], name: 'Input type' },
};

/** All four documented mask patterns, stacked, for one prefix namespace. */
const allMaskPatterns = (prefix) =>
  stack([
    block(
      'Telephone number',
      maskedInput({
        prefix: `${prefix}-phone`,
        labelText: 'US telephone number',
        hint: 'Format: area code-prefix-line number',
        type: 'tel',
        inputmode: 'numeric',
        placeholder: '___-___-____',
        pattern: '\\d{3}-\\d{3}-\\d{4}',
      }),
    ),
    block(
      'ZIP code',
      maskedInput({
        prefix: `${prefix}-zip`,
        labelText: 'ZIP code',
        hint: 'For example, a NASA center ZIP such as 20546 or 20546-0001',
        type: 'text',
        inputmode: 'numeric',
        placeholder: '_____-____',
        pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
      }),
    ),
    block(
      'Launch date',
      maskedInput({
        prefix: `${prefix}-date`,
        labelText: 'Launch date',
        hint: 'mm/dd/yyyy',
        type: 'text',
        inputmode: 'numeric',
        placeholder: 'MM/DD/YYYY',
        pattern: '\\d{2}/\\d{2}/\\d{4}',
      }),
    ),
    block(
      'Observation ID (custom charset)',
      maskedInput({
        prefix: `${prefix}-custom`,
        labelText: 'Observation ID',
        hint: 'For example, A1B 2C3',
        type: 'text',
        inputmode: 'text',
        placeholder: '___ ___',
        pattern: '\\w\\d\\w \\d\\w\\d',
        dataCharset: 'A#A #A#',
      }),
    ),
  ]);

// --- Variants ---

export const Phone = {
  name: 'Telephone number',
  tags: ['!dev', '!test'],
  args: {
    labelText: 'US telephone number',
    hint: 'Format: area code-prefix-line number',
    placeholder: '___-___-____',
    type: 'tel',
  },
  argTypes: maskedInputArgTypes,
  render: (args = {}) =>
    maskedInput({
      prefix: 'phone',
      pattern: '\\d{3}-\\d{3}-\\d{4}',
      inputmode: 'numeric',
      ...args,
    }),
};

export const ZipCode = {
  name: 'ZIP code',
  tags: ['!dev', '!test'],
  render: () =>
    maskedInput({
      prefix: 'zip',
      labelText: 'ZIP code',
      hint: 'For example, a NASA center ZIP such as 20546 or 20546-0001',
      type: 'text',
      inputmode: 'numeric',
      placeholder: '_____-____',
      pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
    }),
};

export const LaunchDate = {
  name: 'Date (numeric wildcard)',
  tags: ['!dev', '!test'],
  render: () =>
    maskedInput({
      prefix: 'date',
      labelText: 'Launch date',
      hint: 'mm/dd/yyyy',
      type: 'text',
      inputmode: 'numeric',
      placeholder: 'MM/DD/YYYY',
      pattern: '\\d{2}/\\d{2}/\\d{4}',
    }),
};

export const CustomCharset = {
  name: 'Custom (alphanumeric charset)',
  tags: ['!dev', '!test'],
  render: () =>
    maskedInput({
      prefix: 'custom',
      labelText: 'Observation ID',
      hint: 'For example, A1B 2C3',
      type: 'text',
      inputmode: 'text',
      placeholder: '___ ___',
      pattern: '\\w\\d\\w \\d\\w\\d',
      dataCharset: 'A#A #A#',
    }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () => allMaskPatterns('all'),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) => allMaskPatterns(palette)),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) => allMaskPatterns(palette)),
};
