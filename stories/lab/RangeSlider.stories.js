// ============================================================
// Range Slider — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_range.scss` (or any
// file) exists, and `grep -rn "usa-range" src/scss/` returns no
// matches at all — not even a surface bridge or dark-context mapping
// in `base/_palettes.scss`. Everything below is USWDS default styling
// inside `@layer uswds`, recolored only by the HDS theme settings in
// `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/range-slider/
// USWDS styles: packages/usa-range/src/styles/_usa-range.scss
// USWDS JS:     packages/usa-range/src/index.js — REQUIRED.
//
// `init()` does two things the authored markup cannot do on its own:
// it wraps the input in a `.usa-range__wrapper` and inserts a
// `.usa-range__value` span showing the current numeric value for
// sighted users, and it computes the `aria-valuetext` callout (e.g.
// "50 percent of 100") from the optional `data-text-unit` /
// `data-text-preposition` attributes on `change`. Without it there is
// no visible value readout and no enhanced `aria-valuetext` — a
// screen reader gets only the native, unit-less `value`. `uswds:
// ['range']` opts this file into the decorator in `.storybook/preview.js`
// that runs that pass after Storybook renders.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The track and thumb border is hardcoded (`border: units(2px) solid
//     color('base-darker')` in the `range-track` / `range-thumb` mixins,
//     `_usa-range.scss`) — not a `$theme-*` setting. This is the one
//     rule the 3.14 bump actually changed (1px `#757575` → 2px
//     `#1b1b1b`), per `docs/USWDS-3.14.0-IMPACT.md`, and the sole
//     reason it produced the only changed Chromatic story in that
//     upgrade.
//   - ⚠️ Correcting the upstream release note, not repeating it:
//     `docs/USWDS-3.14.0-IMPACT.md` §4 records that "focus ring added
//     to slider input" did NOT survive verification — the
//     `range-focus` mixin and its `:focus` bindings are byte-identical
//     between 3.13.0 and 3.14.0. Only the border changed. There is no
//     new focus ring to baseline here.
//   - **Cascade-layer trap.** `base/_focus.scss` puts `input:not([disabled]):focus-visible
//     { @include hds-focus-ring; }` in `@layer hds-base`, which
//     outranks `@layer uswds` by layer order regardless of specificity
//     (`AGENTS.md` → "Cascade layer order"). `.usa-range` is a plain
//     `<input>`, so it matches: on keyboard focus HDS draws its dashed
//     `::before` ring (`hds-focus-ring`, `inset: -2px`, `_hds-mixins.scss`)
//     around the *input's own border box* — which is just the thin
//     track, since nothing enlarges it — while the round thumb
//     overflows that box vertically (`margin-top: px-to-rem(-4px)` in
//     `_usa-range.scss`) and keeps its own separate `box-shadow` ring
//     from the `range-focus` mixin (`box-shadow: 0 0 0 units(2px)
//     color($theme-focus-color)`, `$theme-focus-color: 'gray-60'` per
//     `_hds-uswds-theme.scss` line 221) applied via `::-webkit-slider-thumb`
//     / `::-moz-range-thumb`, which HDS's ring mixin cannot reach at
//     all. The result is two unrelated focus indicators at once: an
//     HDS dashed line across the track and USWDS's own solid gray-60
//     ring around the thumb — not a themed ring, a doubled one.
//   - The value readout span USWDS JS builds (`.usa-range__value`)
//     extends `%block-input-general`, so its type inherits the HDS
//     input font stack, but its layout (`max/min-inline-size: 5%`) is
//     USWDS hardcoded, independent of any `$theme-*` spacing setting.
//   - `$theme-input-select-size`, which sizes the thumb
//     (`@include u-circle($theme-input-select-size)`), is not set in
//     `_hds-uswds-theme.scss` — the thumb uses the unmodified USWDS
//     default diameter.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, stack, labPaletteRender } from './labHelpers';

export default {
  title: 'Components/Range Slider',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    uswds: ['range'],
  },
};

// --- Helpers ---

/**
 * A range slider, in its pre-enhancement form.
 *
 * `init()` (see header comment) wraps this input in `.usa-range__wrapper`
 * and adds the `.usa-range__value` readout, so the markup here is what
 * an author writes, not what ends up in the DOM after Storybook mounts.
 *
 * @param {object} options
 * @param {string} options.prefix      Unique id prefix — see "Unique IDs"
 * @param {string} options.labelText   `<label>` text
 * @param {string} options.hint        `.usa-hint` text (omit to skip the hint)
 * @param {number|string} options.min  `min` attribute
 * @param {number|string} options.max  `max` attribute
 * @param {number|string} options.step `step` attribute
 * @param {number|string} options.value `value` attribute
 * @param {string} options.unit        `data-text-unit` for the aria-valuetext callout
 * @param {string} options.preposition `data-text-preposition` (default "of")
 * @param {boolean} options.disabled   Render `disabled`
 */
const range = ({
  prefix = 'range',
  labelText = 'Thruster throttle',
  hint = 'Move the slider to change the value',
  min = 0,
  max = 100,
  step = 1,
  value = 50,
  unit = '',
  preposition = '',
  disabled = false,
} = {}) => {
  const hintId = `${prefix}-hint`;
  return `
  <form class="usa-form">
    <label class="usa-label" for="${prefix}-input">${labelText}</label>
    ${hint ? `<span class="usa-hint" id="${hintId}">${hint}</span>` : ''}
    <input
      id="${prefix}-input"
      class="usa-range"
      type="range"
      min="${min}"
      max="${max}"
      step="${step}"
      value="${value}"
      ${hint ? `aria-describedby="${hintId}"` : ''}
      ${unit ? `data-text-unit="${unit}"` : ''}
      ${preposition ? `data-text-preposition="${preposition}"` : ''}
      ${disabled ? 'disabled' : ''}
    />
  </form>`;
};

const rangeArgTypes = {
  labelText: { control: 'text', name: 'Label' },
  hint: { control: 'text', name: 'Hint' },
  min: { control: 'text', name: 'Min' },
  max: { control: 'text', name: 'Max' },
  step: { control: 'text', name: 'Step' },
  value: { control: 'text', name: 'Value' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    prefix: 'default',
    labelText: 'Thruster throttle',
    hint: 'Move the slider to change the value',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  },
  argTypes: rangeArgTypes,
  render: (args = {}) => range({ prefix: 'default', ...args }),
};

export const MinMaxStep = {
  name: 'Min/max/step',
  tags: ['!dev', '!test'],
  args: {
    labelText: 'Orbital altitude (km)',
    hint: 'Move the slider to change the value',
    min: 160,
    max: 400,
    step: 20,
    value: 260,
  },
  argTypes: rangeArgTypes,
  render: (args = {}) => range({ prefix: 'min-max-step', ...args }),
};

export const WithValuetextCallout = {
  name: 'With aria-valuetext callout',
  tags: ['!dev', '!test'],
  render: () =>
    range({
      prefix: 'valuetext',
      labelText: 'Thruster throttle',
      hint: 'Move the slider to change the value',
      min: 0,
      max: 100,
      step: 5,
      value: 50,
      unit: 'percent',
    }),
};

export const Disabled = {
  name: 'Disabled',
  tags: ['!dev', '!test'],
  render: () =>
    range({
      prefix: 'disabled',
      labelText: 'Thruster throttle (locked)',
      hint: 'This control is locked during ascent',
      min: 0,
      max: 100,
      step: 1,
      value: 100,
      disabled: true,
    }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block(
        'Default',
        range({ prefix: 'all-default', labelText: 'Thruster throttle', min: 0, max: 100, step: 1, value: 50 }),
      ),
      block(
        'Min/max/step',
        range({
          prefix: 'all-min-max-step',
          labelText: 'Orbital altitude (km)',
          min: 160,
          max: 400,
          step: 20,
          value: 260,
        }),
      ),
      block(
        'With aria-valuetext callout',
        range({
          prefix: 'all-valuetext',
          labelText: 'Thruster throttle',
          min: 0,
          max: 100,
          step: 5,
          value: 50,
          unit: 'percent',
        }),
      ),
      block(
        'Disabled',
        range({
          prefix: 'all-disabled',
          labelText: 'Thruster throttle (locked)',
          hint: 'This control is locked during ascent',
          min: 0,
          max: 100,
          step: 1,
          value: 100,
          disabled: true,
        }),
      ),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block(
        'Default',
        range({ prefix: `${palette}-default`, labelText: 'Thruster throttle', min: 0, max: 100, step: 1, value: 50 }),
      ),
      block(
        'Min/max/step',
        range({
          prefix: `${palette}-min-max-step`,
          labelText: 'Orbital altitude (km)',
          min: 160,
          max: 400,
          step: 20,
          value: 260,
        }),
      ),
      block(
        'With aria-valuetext callout',
        range({
          prefix: `${palette}-valuetext`,
          labelText: 'Thruster throttle',
          min: 0,
          max: 100,
          step: 5,
          value: 50,
          unit: 'percent',
        }),
      ),
      block(
        'Disabled',
        range({
          prefix: `${palette}-disabled`,
          labelText: 'Thruster throttle (locked)',
          hint: 'This control is locked during ascent',
          min: 0,
          max: 100,
          step: 1,
          value: 100,
          disabled: true,
        }),
      ),
    ]),
  ),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: PaletteA11y.render,
};
