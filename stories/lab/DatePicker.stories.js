// ============================================================
// Date Picker — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_date-picker.scss` exists
// and `grep -rn "usa-date-picker" src/scss/` matches nothing at all —
// not even a print or palette-bridge entry. Everything below is USWDS
// default styling inside `@layer uswds`, recolored only by the HDS
// theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/date-picker/
// USWDS styles: packages/usa-date-picker/src/styles/_usa-date-picker.scss
// USWDS JS:     packages/usa-date-picker/src/index.js — REQUIRED.
//
// This is a JS-dependent lab story. The authored markup is a plain
// `.usa-date-picker` wrapper around one `<input class="usa-input">`.
// `enhanceDatePicker()` (index.js:896) clones that input into an
// external, visible text input (`.usa-date-picker__external-input`,
// which keeps the `.usa-input` class), hides the original as a
// screen-reader-only value store (`.usa-date-picker__internal-input`),
// and appends a calendar-toggle `<button class="usa-date-picker__button">`
// plus a `.usa-date-picker__calendar[role="application"][hidden]` that
// is only populated once the button is opened. Without the
// re-initialization below the canvas shows a bare native
// `<input class="usa-input">` with no toggle button and no calendar —
// docs/508.md and docs/USWDS-3.14.0-IMPACT.md record this exact
// native-input fallback as a known Storybook coverage gap for
// JS-enhanced components; `parameters.uswds: ['datePicker']` plus the
// decorator in `.storybook/preview.js` closes it for this file by
// running `init()` against the story's own canvas after render.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The external input HDS actually paints is the clone, and it
//     keeps `.usa-input`. HDS's own `.usa-input` rule
//     (`src/scss/components/_form.scss:108-118`) lives in
//     `@layer hds-components`, which outranks `@layer uswds` by layer
//     order alone (`AGENTS.md` → Cascade layer order) — so its
//     `padding: 14px 16px` (`_form.scss:117`) wins over USWDS's own
//     `padding: units(1)` (8px, per
//     `uswds-core/src/styles/tokens/units/spacing.scss`) without
//     touching `height`. USWDS's `%block-input-general`/
//     `%block-input-styles` placeholders
//     (`uswds-core/src/styles/placeholders/_forms.scss:9-30`) still set
//     a fixed `height: units(5)` = 40px. At
//     `$theme-input-line-height: 2` (`_hds-uswds-theme.scss:349`), a
//     40px box with 28px of vertical padding leaves ~12px for a line
//     of text sized for a ~32px line box — the same fixed-height-vs.
//     -enlarged-padding mismatch already confirmed for Search. Expect
//     clipped or overflowing input text, not a color mismatch.
//   - `background-color: var(--hds-palette-input-bg)`
//     (`_form.scss:111`) also reaches the external input, same layer
//     mechanism — an opaque, palette-driven fill rather than USWDS's
//     own `color("base-dark")`-bordered white box.
//   - The calendar-toggle button (`.usa-date-picker__button`) and the
//     calendar itself (`.usa-date-picker__calendar*`) are untouched:
//     no selector in `src/scss/` matches them, so the button keeps its
//     `add-background-svg("usa-icons/calendar_today")` icon
//     (`_usa-date-picker.scss:132`) and the calendar keeps its
//     `color("base-lightest")` fill and `z-index(100)`
//     (`_usa-date-picker.scss:169-176`) — nothing paints over or
//     mis-sizes it.
//   - The generic HDS `:focus-visible` ring in `base/_focus.scss:22-28`
//     targets bare `input:not([disabled])`, so the external input gets
//     the dashed HDS ring, not a component-specific one — the one
//     piece of this component that already reads as HDS.
//   - Selected/range calendar dates are hardcoded to
//     `color("primary-vivid")` / `color("blue-10v")`
//     (`_usa-date-picker.scss:295-341`), which the HDS theme
//     recolors toward NASA Blue but which no `hds-focus-ring` mixin
//     or palette variable ever reaches — see Palette behaviour below.
//   - Coverage limit: `enhanceDatePicker()` guards on
//     `datePickerEl.dataset.enhanced` (index.js:898, set true at
//     index.js:967) the same way combo box and character count do, so
//     re-running `init()` per Storybook render is safe. But the
//     calendar node is built `hidden` and only shown by a click
//     handler inside `datePickerEvents` (index.js ~2260) — there is no
//     markup-only way to render it open. Per the lab story rules, no
//     play function is added here, so every variant below snapshots
//     as input + toggle button only; the open calendar grid, month/
//     year pickers, and range-selection classes are not exercised by
//     any story in this file.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, stack, labPaletteRender } from './labHelpers';

export default {
  title: 'Components/Date Picker',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    uswds: ['datePicker'],
  },
};

// --- Helpers ---

/**
 * A date picker, in its pre-enhancement form.
 *
 * `enhanceDatePicker()` reads `data-min-date` / `data-max-date` /
 * `data-default-value` off the `.usa-date-picker` wrapper (not the
 * input) and clones the inner `<input>` into the visible external
 * input, so the markup here is what an author writes, not what ends
 * up in the DOM after `init()` runs.
 *
 * @param {object} options
 * @param {string} options.prefix       Unique id/for prefix
 * @param {string} options.label        Field label
 * @param {string} options.hint         Hint text under the label
 * @param {string} options.minDate      `data-min-date`, YYYY-MM-DD
 * @param {string} options.maxDate      `data-max-date`, YYYY-MM-DD
 * @param {string} options.defaultValue `data-default-value`, YYYY-MM-DD
 * @param {boolean} options.disabled    Disables the inner input
 */
const datePicker = ({
  prefix = 'dp',
  label: fieldLabel = 'Appointment date',
  hint = 'mm/dd/yyyy',
  minDate = '',
  maxDate = '',
  defaultValue = '',
  disabled = false,
} = {}) => {
  const wrapperAttrs = [
    minDate ? `data-min-date="${minDate}"` : '',
    maxDate ? `data-max-date="${maxDate}"` : '',
    defaultValue ? `data-default-value="${defaultValue}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <div class="usa-form-group">
      <label class="usa-label" id="${prefix}-label" for="${prefix}-input">${fieldLabel}</label>
      <div class="usa-hint" id="${prefix}-hint">${hint}</div>
      <div class="usa-date-picker" ${wrapperAttrs}>
        <input
          class="usa-input"
          id="${prefix}-input"
          name="${prefix}-input"
          aria-labelledby="${prefix}-label"
          aria-describedby="${prefix}-hint"
          ${disabled ? 'disabled' : ''}
        />
      </div>
    </div>`;
};

const dateArgTypes = {
  label: { control: 'text', name: 'Label' },
  hint: { control: 'text', name: 'Hint' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    label: 'Appointment date',
    hint: 'mm/dd/yyyy',
  },
  argTypes: dateArgTypes,
  render: (args = {}) => datePicker({ prefix: 'default', ...args }),
};

export const MinMaxRange = {
  name: 'Min/max range',
  tags: ['!dev', '!test'],
  args: {
    label: 'Launch window date',
    hint: 'mm/dd/yyyy — 2026 only',
  },
  argTypes: dateArgTypes,
  render: (args = {}) =>
    datePicker({
      prefix: 'minmax',
      minDate: '2026-01-01',
      maxDate: '2026-12-31',
      ...args,
    }),
};

export const PreFilled = {
  name: 'Pre-filled',
  tags: ['!dev', '!test'],
  render: () =>
    datePicker({
      prefix: 'prefilled',
      label: 'Landing date',
      hint: 'mm/dd/yyyy',
      defaultValue: '2026-06-15',
    }),
};

export const Disabled = {
  name: 'Disabled',
  tags: ['!dev', '!test'],
  render: () =>
    datePicker({
      prefix: 'disabled',
      label: 'Appointment date',
      hint: 'mm/dd/yyyy',
      disabled: true,
    }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Default', datePicker({ prefix: 'all-default' })),
      block(
        'Min/max range',
        datePicker({
          prefix: 'all-minmax',
          label: 'Launch window date',
          hint: 'mm/dd/yyyy — 2026 only',
          minDate: '2026-01-01',
          maxDate: '2026-12-31',
        }),
      ),
      block(
        'Pre-filled',
        datePicker({
          prefix: 'all-prefilled',
          label: 'Landing date',
          defaultValue: '2026-06-15',
        }),
      ),
      block(
        'Disabled',
        datePicker({
          prefix: 'all-disabled',
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
      block('Default', datePicker({ prefix: `${palette}-default` })),
      block(
        'Min/max range',
        datePicker({
          prefix: `${palette}-minmax`,
          label: 'Launch window date',
          hint: 'mm/dd/yyyy — 2026 only',
          minDate: '2026-01-01',
          maxDate: '2026-12-31',
        }),
      ),
      block(
        'Pre-filled',
        datePicker({
          prefix: `${palette}-prefilled`,
          label: 'Landing date',
          defaultValue: '2026-06-15',
        }),
      ),
      block(
        'Disabled',
        datePicker({
          prefix: `${palette}-disabled`,
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
