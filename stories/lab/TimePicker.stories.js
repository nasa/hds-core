// ============================================================
// Time Picker — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_time-picker.scss` exists
// and no HDS rule targets `.usa-time-picker*` (confirmed by grep across
// `src/scss/`). The rendered field is a combo box under the hood, and
// `src/scss/components/_form.scss:108-118` themes `.usa-input,
// .usa-textarea, .usa-select` — it does not list `.usa-combo-box__input`,
// so nothing HDS authored ever reaches the enhanced field. See Baseline
// observations below.
//
// USWDS docs:   https://designsystem.digital.gov/components/time-picker/
// USWDS styles: packages/usa-time-picker/src/styles/_usa-time-picker.scss
//               (one rule, `width: 10em`; everything else is
//               packages/usa-combo-box/src/styles/_usa-combo-box.scss)
// USWDS JS:     packages/usa-time-picker/src/index.js — REQUIRED.
//
// Time picker has no combo box markup of its own — it generates one.
// `init()` (packages/usa-time-picker/src/index.js:141-149) reads the
// authored `<input>` plus `data-min-time` / `data-max-time` / `data-step`
// off `.usa-time-picker`, builds a `<select>` of `hh:mmam/pm` `<option>`s
// at the requested step, removes the original input, adds the
// `usa-combo-box` class, and then calls `enhanceComboBox()` — imported
// directly from `usa-combo-box/src/index.js` — on its own element
// (line 144). From that point the DOM is an ordinary enhanced combo box.
// Without the re-init decorator below, none of this runs and the story
// would show a bare `<input type="text">` with no dropdown, no
// filtering, and no generated options — the component would not exist,
// the same native-input fallback `docs/508.md:165` and
// `docs/USWDS-3.14.0-IMPACT.md:30` document for file input, and the
// general mechanism `stories/lab/README.md:38-53` and this repo's own
// `Tooltip.stories.js` exemplar already establish for JS-dependent lab
// stories.
//
// Order matters in `parameters.uswds`: `timePicker` must run before
// `comboBox`. `timePicker`'s own `init()` performs the entire build
// itself — the markup transform *and* the direct `enhanceComboBox()`
// call above — so it does not depend on `comboBox`'s init running at
// all. `comboBox`'s exported `init(root)`
// (packages/usa-combo-box/src/index.js:886-890) only re-scans `root`
// for elements that already carry the `usa-combo-box` class and enhances
// any not yet marked `dataset.enhanced`. Before `timePicker` runs, this
// element is still a bare `.usa-time-picker` with no `usa-combo-box`
// class, so a `comboBox` pass at that point finds nothing and silently
// no-ops; listing `timePicker` first guarantees the real work happens
// on this story's first (and only) init pass. Reversing the order would
// not break this story — `enhanceComboBox()`'s `dataset.enhanced` guard
// makes a second, later `comboBox` pass a no-op either way — but it
// would make the listed dependency meaningless, so `['timePicker',
// 'comboBox']` is kept as the order that documents the real one.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - Same defect the Combo Box lab triage found, not a distinct one:
//     `enhanceComboBox()` builds `.usa-combo-box__input`
//     (usa-combo-box/src/index.js:221-230) and hides the generated
//     `<select>` with `usa-sr-only`. `.usa-combo-box__input` is not in
//     the `.usa-input, .usa-textarea, .usa-select` selector list in
//     `_form.scss:108-118`, so the visible field gets none of
//     `var(--hds-palette-border)` / `$hds-border-radius-control` and
//     falls back to USWDS's own border/radius defaults — because
//     `usa-time-picker`'s `init()` hands off to the exact same
//     `enhanceComboBox()` function, it inherits this exactly.
//   - Focus and hover follow the same gap: `_form.scss:141-161` styles
//     `.usa-input:focus`/`:hover`, never `.usa-combo-box__input:focus`/
//     `:hover`, so the field keeps USWDS's own combo-box focus/hover
//     treatment rather than the HDS solid-blue highlight.
//   - Disabled state: `.usa-combo-box__input:disabled` is styled by
//     USWDS's own `u-disabled` / `u-disabled-high-contrast-border`
//     mixins in `_usa-combo-box.scss`, not by `_form.scss:400`'s
//     `.usa-input:disabled` rule — another consequence of the same
//     selector gap.
//   - `.usa-combo-box`'s width is capped by `max-width:
//     units($theme-input-max-width)` (`_usa-combo-box.scss`);
//     `_hds-uswds-theme.scss` never sets `$theme-input-max-width`, so
//     that is an unmodified USWDS default, and
//     `usa-time-picker/src/styles/_usa-time-picker.scss` layers a
//     hardcoded `width: 10em` on top — a fixed width no themed HDS
//     input carries.
//   - No HDS rule targets `usa-time-picker` or `usa-combo-box` anywhere
//     in `src/scss/` (confirmed by grep), and `_hds-uswds-theme.scss`
//     sets no time-picker- or combo-box-specific `$theme-*` setting —
//     the dropdown list, options, and generated `<select>` are as
//     unthemed as the visible field.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Time Picker',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    // Order matters — see the header comment above.
    uswds: ['timePicker', 'comboBox'],
  },
};

// --- Helpers ---

/**
 * A time picker, in its pre-enhancement form.
 *
 * `init()` reads `data-min-time` / `data-max-time` / `data-step` off the
 * `.usa-time-picker` wrapper, replaces the inner `<input>` with a
 * generated `<select>`, and hands off to `enhanceComboBox()` — see the
 * header comment. `minTime` / `maxTime` are `hh:mm` 24-hour strings;
 * `value`, if given, must match a generated option's text exactly
 * (`h:mm` + lowercase `am`/`pm`, no space) to be pre-selected.
 *
 * @param {object} options
 * @param {string} options.prefix    Unique id/for prefix for this copy
 * @param {string} options.labelText Field label
 * @param {string} options.hint      Hint text under the label
 * @param {string} options.value     Authored `value`, pre-enhancement
 * @param {string} options.minTime   `data-min-time` (`hh:mm`, 24-hour)
 * @param {string} options.maxTime   `data-max-time` (`hh:mm`, 24-hour)
 * @param {string} options.step      `data-step`, in minutes
 * @param {boolean} options.disabled Disable the field
 */
const timePicker = ({
  prefix = 'time',
  labelText = 'Launch window open (UTC)',
  hint = 'Select a time, or type to filter the list.',
  value = '',
  minTime = '',
  maxTime = '',
  step = '',
  disabled = false,
} = {}) => `
  <div class="usa-form-group">
    <label class="usa-label" id="${prefix}-label" for="${prefix}-input">${labelText}</label>
    <div class="usa-hint" id="${prefix}-hint">${hint}</div>
    <div
      class="usa-time-picker"
      ${minTime ? `data-min-time="${minTime}"` : ''}
      ${maxTime ? `data-max-time="${maxTime}"` : ''}
      ${step ? `data-step="${step}"` : ''}
    >
      <input
        class="usa-input"
        id="${prefix}-input"
        name="${prefix}-input"
        type="text"
        aria-describedby="${prefix}-label ${prefix}-hint"
        ${value ? `value="${value}"` : ''}
        ${disabled ? 'disabled' : ''}
      />
    </div>
  </div>`;

const contentArgTypes = {
  labelText: { control: 'text', name: 'Label' },
  hint: { control: 'text', name: 'Hint text' },
  value: { control: 'text', name: 'Pre-filled value' },
};

/** One copy of every variant, uniquely prefixed — reused by AllVariants and the palette tests. */
const variants = (prefix) =>
  stack([
    block(
      'Default',
      timePicker({
        prefix: `${prefix}-default`,
        labelText: 'Launch window open (UTC)',
        hint: 'Select a time, or type to filter the list.',
      }),
    ),
    block(
      'Min/max range with step',
      timePicker({
        prefix: `${prefix}-range`,
        labelText: 'Static fire test window — Kennedy Space Center (UTC)',
        hint: 'Select a time between 08:00 and 18:00, in 15-minute increments.',
        minTime: '08:00',
        maxTime: '18:00',
        step: '15',
      }),
    ),
    block(
      'Pre-filled value',
      timePicker({
        prefix: `${prefix}-prefilled`,
        labelText: 'Preferred launch time (UTC)',
        hint: 'Select a time, or type to filter the list.',
        value: '2:00pm',
      }),
    ),
    block(
      'Disabled',
      timePicker({
        prefix: `${prefix}-disabled`,
        labelText: 'Launch time (UTC) — window closed',
        hint: 'This launch window has closed and cannot be edited.',
        value: '11:00pm',
        disabled: true,
      }),
    ),
  ]);

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    labelText: 'Launch window open (UTC)',
    hint: 'Select a time, or type to filter the list.',
    value: '',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => timePicker({ ...args, prefix: 'default' }),
};

export const RangeWithStep = {
  name: 'Min/max range with step',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    timePicker({
      ...args,
      prefix: 'range',
      labelText: 'Static fire test window — Kennedy Space Center (UTC)',
      hint: 'Select a time between 08:00 and 18:00, in 15-minute increments.',
      minTime: '08:00',
      maxTime: '18:00',
      step: '15',
    }),
};

export const PreFilled = {
  name: 'Pre-filled value',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    timePicker({
      ...args,
      prefix: 'prefilled',
      labelText: 'Preferred launch time (UTC)',
      hint: 'Select a time, or type to filter the list.',
      value: '2:00pm',
    }),
};

export const Disabled = {
  name: 'Disabled',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    timePicker({
      ...args,
      prefix: 'disabled',
      labelText: 'Launch time (UTC) — window closed',
      hint: 'This launch window has closed and cannot be edited.',
      value: '11:00pm',
      disabled: true,
    }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () => variants('all'),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) => variants(palette)),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) => variants(palette)),
};
