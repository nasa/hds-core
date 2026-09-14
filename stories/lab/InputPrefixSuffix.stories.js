// ============================================================
// Input Prefix and Suffix — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE, at the component level. No
// `src/scss/components/_input-prefix-suffix.scss` exists and
// `grep -rn "usa-input-group\|usa-input-prefix\|usa-input-suffix"
// src/scss/` returns nothing — no rule, no surface bridge, no
// `_print.scss` match. `.usa-input-group`, `.usa-input-prefix`, and
// `.usa-input-suffix` are pure USWDS defaults inside `@layer uswds`.
//
// BUT: the `<input>` inside the group carries the shared `.usa-input`
// class, which IS themed by `src/scss/components/_form.scss` — and
// `_form.scss` is `@forward`ed into `@layer hds-components`
// (`src/scss/hds.scss`), which outranks `@layer uswds` for any
// non-`!important` declaration regardless of specificity. That
// collision, not an absent theme, is what this file documents. See
// "Baseline observations" below and the layer-priority precedent
// already confirmed for `.usa-table` in
// `docs/USWDS-3.14.0-IMPACT.md` §2.4.
//
// USWDS docs:   https://designsystem.digital.gov/components/input-prefix-suffix/
// USWDS styles: packages/usa-input-prefix-suffix/src/styles/_usa-input-prefix-suffix.scss
// USWDS JS:     none
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `.usa-input-group input` sets `border: 0` and reserves clearance
//     for the icon/text with `@include u-padding-right($icon-offset)`
//     (`packages/usa-input-prefix-suffix/src/styles/_usa-input-prefix-suffix.scss`,
//     `@layer uswds`). HDS's `.usa-input` sets its OWN
//     `border: $hds-border-width-thin solid var(--hds-palette-border)`
//     and `padding: 14px 16px` (`src/scss/components/_form.scss`,
//     `@layer hds-components`). Because `hds-components` outranks
//     `uswds` regardless of specificity, the HDS border reappears
//     nested inside the group's outer USWDS border (a double-border
//     box), and the flat `14px 16px` padding clobbers the icon-offset
//     clearance — input text can sit under the prefix icon or run into
//     the suffix text instead of stopping short of it.
//   - Focus lands on the wrong element for the wrong reason. HDS's
//     `.usa-input:focus { border-color: var(--hds-palette-btn-secondary-bg);
//     border-width: $hds-border-width-thick; outline: none !important; }`
//     targets the inner `<input>`, not `.usa-input-group`. The
//     `!important` unconditionally beats `.usa-input-group--error,
//     &--success { input:focus { outline-offset: ... } }`
//     (`_usa-input-prefix-suffix.scss`), which needs an outline to
//     offset in the first place — so that outline-based indicator is
//     neutralized outright. What a keyboard user sees is a solid blue
//     border drawn on the inner input, nested inside the group's own
//     border, not a highlight on the group boundary.
//   - Error state compounds this: `.usa-input-group--error` draws
//     `u-border($theme-input-state-border-width, "error-dark")` — a
//     thin (`$theme-input-state-border-width` resolves to
//     `hds.$hds-border-width-thin` in `src/scss/_hds-uswds-theme.scss`)
//     red border on the OUTER group. The USWDS markup does not add
//     `.usa-input--error` to the inner `<input>`, so the input keeps
//     plain HDS `.usa-input` styling — a blue focus border nested
//     inside a red error border, reading as two controls disagreeing
//     rather than one.
//   - `.usa-input-prefix` / `.usa-input-suffix` are untouched by HDS:
//     `color: color("base")` (a static USWDS grey) and
//     `.usa-icon { @include u-square($icon-width) }` stay fixed on
//     every palette — the icon/text decoration does not read
//     `--hds-palette-*` and its contrast against the (HDS-themed)
//     input background is unverified on the dark and black palettes.
//   - Width modifiers (`--2xs` through `--2xl`, mapped through
//     `$system-input-widths`) are unaffected — they only set
//     `max-width` and carry no color or border.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Input Prefix and Suffix',
  parameters: labParams,
};

// --- Helpers ---

const sprite = 'assets/img/sprite.svg';

/** @param {string} name USWDS icon id, e.g. "credit_card" */
const icon = (name) =>
  `<svg aria-hidden="true" role="img" focusable="false" class="usa-icon"><use href="${sprite}#${name}"></use></svg>`;

/**
 * @param {object} options
 * @param {string} options.prefixId    Unique id root for label/input pairing
 * @param {string} options.label       Field label text
 * @param {string} options.prefixText  Text prefix content (mutually exclusive with prefixIcon)
 * @param {string} options.prefixIcon  USWDS icon id for an icon prefix
 * @param {string} options.suffixText  Text suffix content (mutually exclusive with suffixIcon)
 * @param {string} options.suffixIcon  USWDS icon id for an icon suffix
 * @param {boolean} options.error      Apply `usa-input-group--error`
 * @param {string} options.groupClass  Extra `.usa-input-group` modifiers (e.g. width)
 */
const inputGroup = ({
  prefixId = 'ips',
  label: fieldLabel = 'Credit card number',
  prefixText = '',
  prefixIcon = '',
  suffixText = '',
  suffixIcon = '',
  error = false,
  groupClass = '',
} = {}) => {
  const groupClasses = ['usa-input-group', error ? 'usa-input-group--error' : '', groupClass].filter(Boolean).join(' ');
  const prefix = prefixIcon
    ? `<div class="usa-input-prefix" aria-hidden="true">${icon(prefixIcon)}</div>`
    : prefixText
      ? `<div class="usa-input-prefix" aria-hidden="true">${prefixText}</div>`
      : '';
  const suffix = suffixIcon
    ? `<div class="usa-input-suffix" aria-hidden="true">${icon(suffixIcon)}</div>`
    : suffixText
      ? `<div class="usa-input-suffix" aria-hidden="true">${suffixText}</div>`
      : '';
  const inputId = `${prefixId}-input`;
  return `
    <div class="usa-form-group">
      <label class="usa-label" for="${inputId}">${fieldLabel}</label>
      <div class="${groupClasses}">
        ${prefix}
        <input type="text" id="${inputId}" class="usa-input" />
        ${suffix}
      </div>
    </div>`;
};

const contentArgTypes = {
  label: { control: 'text', name: 'Field label' },
  prefixText: { control: 'text', name: 'Prefix text' },
  suffixText: { control: 'text', name: 'Suffix text' },
};

// --- Variants ---

export const TextPrefix = {
  name: 'Text prefix',
  tags: ['!dev', '!test'],
  args: {
    label: 'Total mission cost',
    prefixText: '$',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => inputGroup({ prefixId: 'text-prefix', label: args.label, prefixText: args.prefixText ?? '$' }),
};

export const TextSuffix = {
  name: 'Text suffix',
  tags: ['!dev', '!test'],
  args: {
    label: 'Payload mass, in kilograms',
    suffixText: 'kg',
  },
  argTypes: contentArgTypes,
  render: (args = {}) =>
    inputGroup({ prefixId: 'text-suffix', label: args.label, suffixText: args.suffixText ?? 'kg' }),
};

export const TextPrefixAndSuffix = {
  name: 'Text prefix and suffix',
  tags: ['!dev', '!test'],
  render: () =>
    inputGroup({
      prefixId: 'text-both',
      label: 'Orbital altitude',
      prefixText: '~',
      suffixText: 'km',
    }),
};

export const IconPrefix = {
  name: 'Icon prefix',
  tags: ['!dev', '!test'],
  render: () =>
    inputGroup({
      prefixId: 'icon-prefix',
      label: 'Credit card number',
      prefixIcon: 'credit_card',
    }),
};

export const IconSuffix = {
  name: 'Icon suffix',
  tags: ['!dev', '!test'],
  render: () =>
    inputGroup({
      prefixId: 'icon-suffix',
      label: 'Launch date',
      suffixIcon: 'calendar_today',
    }),
};

export const ErrorState = {
  name: 'Error state',
  tags: ['!dev', '!test'],
  render: () =>
    inputGroup({
      prefixId: 'error-state',
      label: 'Credit card number',
      prefixIcon: 'credit_card',
      error: true,
    }),
};

/**
 * Every variant, stacked. Shared by `AllVariants` and the palette
 * tests — each caller supplies its own `prefix` so the six stacked
 * palette copies never collide on `id`/`for`.
 *
 * @param {string} prefix Unique id root for this stack's instances
 */
const allVariantsStack = (prefix) =>
  stack([
    block(
      'Text prefix',
      inputGroup({ prefixId: `${prefix}-text-prefix`, label: 'Total mission cost', prefixText: '$' }),
    ),
    block(
      'Text suffix',
      inputGroup({ prefixId: `${prefix}-text-suffix`, label: 'Payload mass, in kilograms', suffixText: 'kg' }),
    ),
    block(
      'Text prefix and suffix',
      inputGroup({ prefixId: `${prefix}-text-both`, label: 'Orbital altitude', prefixText: '~', suffixText: 'km' }),
    ),
    block(
      'Icon prefix',
      inputGroup({ prefixId: `${prefix}-icon-prefix`, label: 'Credit card number', prefixIcon: 'credit_card' }),
    ),
    block(
      'Icon suffix',
      inputGroup({ prefixId: `${prefix}-icon-suffix`, label: 'Launch date', suffixIcon: 'calendar_today' }),
    ),
    block(
      'Error state',
      inputGroup({
        prefixId: `${prefix}-error`,
        label: 'Credit card number',
        prefixIcon: 'credit_card',
        error: true,
      }),
    ),
  ]);

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () => allVariantsStack('all'),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) => allVariantsStack(palette)),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) => allVariantsStack(palette)),
};
