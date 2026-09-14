// ============================================================
// Date Range Picker — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_date-range-picker.scss`
// or `_date-picker.scss` exists and `grep -rn "usa-date-range-picker\|
// usa-date-picker" src/scss/` matches nothing at all — not even a
// palette bridge. The only HDS styling either component receives is
// incidental: both pickers' visible `<input>` elements carry the plain
// `.usa-input` class, which `src/scss/components/_form.scss:108-150`
// themes like any other text field (palette-aware background/border,
// the solid-blue focus highlight, hover). Everything else — the
// calendar toggle button and the popup calendar itself — is USWDS
// default styling inside `@layer uswds`, recolored only by the HDS
// theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/date-range-picker/
// USWDS styles: packages/usa-date-range-picker/_index.scss (forwards
//               to usa-date-picker — the range picker package ships
//               no styles of its own) and
//               packages/usa-date-picker/src/styles/_usa-date-picker.scss
// USWDS JS:     packages/usa-date-range-picker/src/index.js and
//               packages/usa-date-picker/src/index.js — REQUIRED.
//
// `usa-date-range-picker`'s `init()` finds the two child `.usa-date-picker`
// elements, tags them `__range-start` / `__range-end`, copies the
// range picker's `data-min-date` / `data-max-date` onto both, and wires
// an `input change` handler: picking a start date writes it as the end
// picker's `data-min-date` + `data-range-date` + `data-default-date`
// (and the reverse for end → start), then calls
// `updateCalendarIfVisible`. `usa-date-picker`'s `init()` does the real
// per-input build (`enhanceDatePicker`,
// packages/usa-date-picker/src/index.js): it clones the authored input
// into a visible `.usa-date-picker__external-input`, hides the
// original as `.usa-date-picker__internal-input`, and appends a
// calendar-toggle `.usa-date-picker__button` plus a `hidden`
// `.usa-date-picker__calendar`. Both `enhanceDatePicker` (line 898) and
// `enhanceDateRangePicker` guard nothing themselves against
// re-running, but `enhanceDatePicker` checks
// `if (datePickerEl.dataset.enhanced) return;` (index.js:898) before
// doing any work, so this file only needs `init()` to run once per
// canvas. Without `parameters.uswds` the story would show two bare
// `<input>` elements with no calendar affordance at all, and the
// min/max linking between the pair — this component's entire reason
// to exist over two independent date pickers — would never fire.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The range picker package has no `styles/` directory of its own
//     (`packages/usa-date-range-picker/_index.scss` only
//     `@forward`s `usa-date-picker`) and neither USWDS nor HDS gives
//     `.usa-date-range-picker` a layout rule. The two `.usa-form-group`
//     children stack vertically with plain USWDS
//     `margin-top: units(3)` between them
//     (`packages/usa-form-group/src/styles/_usa-form-group.scss:3-4`) —
//     there is no side-by-side arrangement to go wrong, because 3.14
//     never attempts one.
//   - Each `.usa-date-picker__wrapper` is capped at
//     `max-width: units($theme-input-max-width)`
//     (`usa-date-picker/src/styles/_usa-date-picker.scss:57`), and
//     `$theme-input-max-width` is not set in `_hds-uswds-theme.scss`,
//     so both pickers take the USWDS default width rather than an
//     HDS one.
//   - The calendar popup's selected/range fills are hardcoded to
//     `color("primary-vivid")` and the in-between days to
//     `color("blue-10v")`
//     (`usa-date-picker/src/styles/_usa-date-picker.scss:262-311`) —
//     literal USWDS palette colors, not `$theme-*` settings, so they
//     do not adapt to any of the six HDS palettes. On the blue
//     palette this is a saturated blue calendar floating over a blue
//     page; on black it is untested against the palette's own blues.
//   - The calendar's focused-date outline is a hardcoded
//     `focus-outline($width: 2px, $offset: -2px, $color:
//     "blue-warm-80v")` (`_usa-date-picker.scss:230,343,404,462`) —
//     the USWDS ring, never the HDS `hds-focus-ring` mixin
//     (`src/scss/_hds-mixins.scss`, `src/scss/base/_focus.scss`).
//   - The two visible `<input>` elements ARE themed: both keep the
//     plain `.usa-input` class after cloning
//     (`usa-date-picker/src/index.js` `enhanceDatePicker`), so they
//     get the same palette-aware border/background and solid-blue
//     focus highlight as any HDS text field
//     (`src/scss/components/_form.scss:108-150`). The mismatch is
//     entirely between that themed chrome and the unthemed calendar
//     button/popup it opens.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Date Range Picker',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    // Order matters: dateRangePicker's init() looks for the two child
    // .usa-date-picker elements, so datePicker's own init() must have
    // already run (uswds-components.js runs them in the order given
    // when a story asks for both).
    uswds: ['dateRangePicker', 'datePicker'],
  },
};

// --- Helpers ---

/**
 * One `.usa-date-picker`-wrapped input, as authored (pre-enhancement).
 *
 * @param {object} options
 * @param {string} options.id           Input id / label `for`
 * @param {string} options.text         Label text
 * @param {string} options.defaultValue `data-default-value` on the
 *   `.usa-date-picker` wrapper (`YYYY-MM-DD`) — pre-fills the picker.
 * @param {boolean} options.disabled    Native `disabled` on the input
 */
const datePickerField = ({ id = 'date', text = 'Date', defaultValue = '', disabled = false } = {}) => `
  <div class="usa-form-group">
    <label class="usa-label" id="${id}-label" for="${id}">${text}</label>
    <div class="usa-hint" id="${id}-hint">mm/dd/yyyy</div>
    <div class="usa-date-picker"${defaultValue ? ` data-default-value="${defaultValue}"` : ''}>
      <input
        class="usa-input"
        id="${id}"
        name="${id}"
        aria-labelledby="${id}-label"
        aria-describedby="${id}-hint"
        ${disabled ? 'disabled' : ''}
      />
    </div>
  </div>`;

/**
 * A start/end pair wrapped in `.usa-date-range-picker`.
 *
 * @param {object} options
 * @param {string} options.prefix        Unique id root for this copy
 * @param {string} options.startLabel    Start field label
 * @param {string} options.endLabel      End field label
 * @param {string} options.minDate       `data-min-date` on the wrapper (`YYYY-MM-DD`)
 * @param {string} options.maxDate       `data-max-date` on the wrapper (`YYYY-MM-DD`)
 * @param {string} options.startDefault  `data-default-value` for the start picker
 * @param {string} options.endDefault    `data-default-value` for the end picker
 * @param {boolean} options.disabled     Disable both inputs
 */
const dateRangePicker = ({
  prefix = 'range',
  startLabel = 'Observation window start',
  endLabel = 'Observation window end',
  minDate = '',
  maxDate = '',
  startDefault = '',
  endDefault = '',
  disabled = false,
} = {}) => `
  <div
    class="usa-date-range-picker"
    ${minDate ? ` data-min-date="${minDate}"` : ''}
    ${maxDate ? ` data-max-date="${maxDate}"` : ''}
  >
    ${datePickerField({ id: `${prefix}-start`, text: startLabel, defaultValue: startDefault, disabled })}
    ${datePickerField({ id: `${prefix}-end`, text: endLabel, defaultValue: endDefault, disabled })}
  </div>`;

const rangeArgTypes = {
  startLabel: { control: 'text', name: 'Start label' },
  endLabel: { control: 'text', name: 'End label' },
};

// --- Variants ---

export const Default = {
  name: 'Default range',
  tags: ['!dev', '!test'],
  args: {
    startLabel: 'Observation window start',
    endLabel: 'Observation window end',
  },
  argTypes: rangeArgTypes,
  render: (args = {}) => dateRangePicker({ ...args, prefix: 'default' }),
};

export const MinMaxBounds = {
  name: 'Min/max bounds',
  tags: ['!dev', '!test'],
  render: () =>
    dateRangePicker({
      prefix: 'bounds',
      startLabel: 'TESS sector 1 start date',
      endLabel: 'TESS sector 1 end date',
      minDate: '2018-07-25',
      maxDate: '2018-08-22',
    }),
};

export const PreFilled = {
  name: 'Pre-filled range',
  tags: ['!dev', '!test'],
  render: () =>
    dateRangePicker({
      prefix: 'prefilled',
      startLabel: 'OSIRIS-REx sample return window start',
      endLabel: 'OSIRIS-REx sample return window end',
      minDate: '2023-01-01',
      maxDate: '2023-12-31',
      startDefault: '2023-09-24',
      endDefault: '2023-09-24',
    }),
};

export const Disabled = {
  name: 'Disabled',
  tags: ['!dev', '!test'],
  render: () =>
    dateRangePicker({
      prefix: 'disabled',
      startLabel: 'Artemis II crewed flight window start',
      endLabel: 'Artemis II crewed flight window end',
      startDefault: '2026-02-05',
      endDefault: '2026-02-05',
      disabled: true,
    }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    stack([
      block('Default range', dateRangePicker({ ...args, prefix: 'all-default' })),
      block(
        'Min/max bounds',
        dateRangePicker({
          prefix: 'all-bounds',
          startLabel: 'TESS sector 1 start date',
          endLabel: 'TESS sector 1 end date',
          minDate: '2018-07-25',
          maxDate: '2018-08-22',
        }),
      ),
      block(
        'Pre-filled range',
        dateRangePicker({
          prefix: 'all-prefilled',
          startLabel: 'OSIRIS-REx sample return window start',
          endLabel: 'OSIRIS-REx sample return window end',
          minDate: '2023-01-01',
          maxDate: '2023-12-31',
          startDefault: '2023-09-24',
          endDefault: '2023-09-24',
        }),
      ),
      block(
        'Disabled',
        dateRangePicker({
          prefix: 'all-disabled',
          startLabel: 'Artemis II crewed flight window start',
          endLabel: 'Artemis II crewed flight window end',
          startDefault: '2026-02-05',
          endDefault: '2026-02-05',
          disabled: true,
        }),
      ),
    ]),
};

// --- Palette accessibility tests ---
//
// The calendar popup is `hidden` until the toggle button is clicked
// (`usa-date-picker/src/index.js` `enhanceDatePicker` appends it with
// the `hidden` attribute), and USWDS JS only opens it in response to a
// real click/keyboard event dispatched through `behavior.on()`. These
// palette stories render static markup with no play function per the
// lab conventions, so they cover the closed-picker chrome — the
// themed `.usa-input` fields and the unthemed toggle button — across
// all six palettes, but NOT the open calendar's hardcoded
// `primary-vivid` / `blue-10v` fills. ⚠️ Coverage limit: the open
// calendar state is not exercised by any story in this file.

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Default range', dateRangePicker({ prefix: `${palette}-default` })),
      block(
        'Min/max bounds',
        dateRangePicker({
          prefix: `${palette}-bounds`,
          startLabel: 'TESS sector 1 start date',
          endLabel: 'TESS sector 1 end date',
          minDate: '2018-07-25',
          maxDate: '2018-08-22',
        }),
      ),
      block(
        'Pre-filled range',
        dateRangePicker({
          prefix: `${palette}-prefilled`,
          startLabel: 'OSIRIS-REx sample return window start',
          endLabel: 'OSIRIS-REx sample return window end',
          minDate: '2023-01-01',
          maxDate: '2023-12-31',
          startDefault: '2023-09-24',
          endDefault: '2023-09-24',
        }),
      ),
      block(
        'Disabled',
        dateRangePicker({
          prefix: `${palette}-disabled`,
          startLabel: 'Artemis II crewed flight window start',
          endLabel: 'Artemis II crewed flight window end',
          startDefault: '2026-02-05',
          endDefault: '2026-02-05',
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
  render: labPaletteRender((palette) =>
    stack([
      block('Default range', dateRangePicker({ prefix: `${palette}-hover-default` })),
      block(
        'Min/max bounds',
        dateRangePicker({
          prefix: `${palette}-hover-bounds`,
          startLabel: 'TESS sector 1 start date',
          endLabel: 'TESS sector 1 end date',
          minDate: '2018-07-25',
          maxDate: '2018-08-22',
        }),
      ),
      block(
        'Pre-filled range',
        dateRangePicker({
          prefix: `${palette}-hover-prefilled`,
          startLabel: 'OSIRIS-REx sample return window start',
          endLabel: 'OSIRIS-REx sample return window end',
          minDate: '2023-01-01',
          maxDate: '2023-12-31',
          startDefault: '2023-09-24',
          endDefault: '2023-09-24',
        }),
      ),
      block(
        'Disabled',
        dateRangePicker({
          prefix: `${palette}-hover-disabled`,
          startLabel: 'Artemis II crewed flight window start',
          endLabel: 'Artemis II crewed flight window end',
          startDefault: '2026-02-05',
          endDefault: '2026-02-05',
          disabled: true,
        }),
      ),
    ]),
  ),
};
