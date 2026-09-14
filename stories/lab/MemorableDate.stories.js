// ============================================================
// Memorable Date — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE for `.usa-memorable-date*` itself — no
// `src/scss/components/_memorable-date.scss` exists and
// `grep -rn "usa-memorable-date" src/scss/` returns nothing. But the
// fields it composes — `.usa-form-group`, `.usa-label`, `.usa-hint`,
// `.usa-select`, `.usa-input` — are ALL themed in
// `src/scss/components/_form.scss`, so this component is themed
// almost entirely by composition rather than by any rule of its own.
// See Baseline observations below for exactly which parts that
// covers and which parts are still raw USWDS geometry.
//
// USWDS docs:   https://designsystem.digital.gov/components/memorable-date/
// USWDS styles: packages/usa-memorable-date/src/styles/_usa-memorable-date.scss
// USWDS JS:     none
//
// USWDS 3.14 changed this component's markup: the single shared group
// hint (one `aria-describedby` on all three fields) became per-field
// `usa-hint usa-sr-only` spans, each wired to its own field via its
// own `aria-describedby` (docs/USWDS-3.14.0-IMPACT.md, "Memorable
// date moves from one shared hint to per-field hints"). The verified
// 3.14 markup for both the default and error patterns below is taken
// from `stories/guides/USWDSForm.stories.js` (lines ~222-278 and
// ~875-929), cross-checked against the live docs page and against
// `packages/usa-memorable-date/src/test/template.html`.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `.usa-input`, `.usa-select`, `.usa-label`, `.usa-legend`, and
//     `.usa-hint` all resolve through `_form.scss`: themed color,
//     border, `$hds-border-radius-control`, HDS type sizes, the solid
//     blue `.usa-input:focus`/`.usa-select:focus` ring, and hover —
//     identical to every other themed HDS text field. This is the
//     only lab component whose typography, color, and focus treatment
//     already read as HDS on all six palettes.
//   - Field geometry is entirely USWDS's own, hardcoded via the
//     `units()` function in `_usa-memorable-date.scss`, never an HDS
//     token: month/day inputs `width: units(6)`, the month select
//     `width: units(card-lg)`, the year input `width: units(9)`. HDS's
//     spacing scale (`AGENTS.md` → Spacing usage) is never consulted.
//   - The same file sets `.usa-memorable-date { display: flex;
//     flex-wrap: wrap; }`, `margin-right: units(2)` on each field
//     wrapper, and `margin-top: units(2)` on `.usa-form-group` for the
//     wrapped-row case — all unthemed layout, though visually
//     unobtrusive.
//   - The error state is fully themed and matches the verified
//     pattern in `stories/guides/USWDSForm.stories.js`: `.usa-input--error`,
//     `.usa-form-group--error`, and `.usa-error-message` all resolve
//     through `_form.scss`, so an invalid month field reads exactly
//     like any other HDS error field, not a USWDS default.
//   - The 3.14 per-field `usa-hint usa-sr-only` spans inherit the same
//     themed `.usa-hint` color/size/letter-spacing as the visible
//     group hint, so the accessibility fix and the HDS visual theme
//     do not conflict.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Memorable Date',
  parameters: labParams,
};

// --- Helpers ---

const months = [
  ['1', 'January'],
  ['2', 'February'],
  ['3', 'March'],
  ['4', 'April'],
  ['5', 'May'],
  ['6', 'June'],
  ['7', 'July'],
  ['8', 'August'],
  ['9', 'September'],
  ['10', 'October'],
  ['11', 'November'],
  ['12', 'December'],
];

const monthOptions = (selected = '') =>
  months
    .map(([value, text]) => `<option value="${value}"${value === selected ? ' selected' : ''}>${text}</option>`)
    .join('\n          ');

/**
 * The 3.14 baseline: month select + day/year text inputs. `hints`
 * toggles the per-field `usa-hint usa-sr-only` markup 3.14 introduced
 * (see header comment) — off by default so the plain field-only
 * layout is visible on its own.
 *
 * Every id is namespaced by `prefix` so six stacked palette copies
 * (each a full `id`/`for`/`aria-describedby` triple, three times
 * over) never collide.
 *
 * @param {object} options
 * @param {string} options.prefix Unique id prefix
 * @param {string} options.legend Fieldset legend text
 * @param {boolean} options.hints Render the 3.14 per-field hint spans
 * @param {string} options.month  Selected month value, '1'-'12'
 * @param {string} options.day    Day value
 * @param {string} options.year   Year value
 */
const memorableDate = ({
  prefix = 'md',
  legend = 'Launch date',
  hints = false,
  month = '7',
  day = '16',
  year = '1969',
} = {}) => {
  const groupHintId = `${prefix}-hint`;
  const monthId = `${prefix}-month`;
  const dayId = `${prefix}-day`;
  const yearId = `${prefix}-year`;
  const monthHintId = `${monthId}-hint`;
  const dayHintId = `${dayId}-hint`;
  const yearHintId = `${yearId}-hint`;

  return `
  <fieldset class="usa-fieldset">
    <legend class="usa-legend">${legend}</legend>
    ${
      hints
        ? `<span class="usa-hint" aria-hidden="true" id="${groupHintId}">
      Select a month. Enter 1 or 2 digits for the day and 4 digits for the year.
    </span>`
        : ''
    }
    <div class="usa-memorable-date">
      <div class="usa-form-group usa-form-group--month usa-form-group--select">
        <label class="usa-label" for="${monthId}">Month</label>
        ${hints ? `<span class="usa-hint usa-sr-only" id="${monthHintId}">Select a month from the dropdown.</span>` : ''}
        <select class="usa-select" id="${monthId}" name="${monthId}"${hints ? ` aria-describedby="${monthHintId}"` : ''}>
          <option value>- Select -</option>
          ${monthOptions(month)}
        </select>
      </div>
      <div class="usa-form-group usa-form-group--day">
        <label class="usa-label" for="${dayId}">Day</label>
        ${hints ? `<span class="usa-hint usa-sr-only" id="${dayHintId}">Enter 1 or 2 digits for the day.</span>` : ''}
        <input
          class="usa-input"
          ${hints ? `aria-describedby="${dayHintId}"` : ''}
          id="${dayId}"
          name="${dayId}"
          maxlength="2"
          pattern="[0-9]*"
          inputmode="numeric"
          value="${day}"
        />
      </div>
      <div class="usa-form-group usa-form-group--year">
        <label class="usa-label" for="${yearId}">Year</label>
        ${hints ? `<span class="usa-hint usa-sr-only" id="${yearHintId}">Enter 4 digits for the year.</span>` : ''}
        <input
          class="usa-input"
          ${hints ? `aria-describedby="${yearHintId}"` : ''}
          id="${yearId}"
          name="${yearId}"
          minlength="4"
          maxlength="4"
          pattern="[0-9]*"
          inputmode="numeric"
          value="${year}"
        />
      </div>
    </div>
  </fieldset>`;
};

/**
 * The verified 3.14 error pattern from `stories/guides/USWDSForm.stories.js`
 * (lines ~875-929): only the field that failed validation carries
 * `usa-input--error` / `aria-invalid`, with `aria-describedby`
 * pointing at both the group hint and the error message. Day and
 * year stay plain, because only month is invalid in that example.
 *
 * @param {object} options
 * @param {string} options.prefix  Unique id prefix
 * @param {string} options.legend  Fieldset legend text
 * @param {string} options.message Error message text
 * @param {string} options.day     Day value
 * @param {string} options.year    Year value
 */
const memorableDateError = ({
  prefix = 'md-error',
  legend = 'Launch date',
  message = 'Launch date must include a valid month',
  day = '16',
  year = '1969',
} = {}) => {
  const hintId = `${prefix}-hint`;
  const messageId = `${prefix}-message`;
  const monthId = `${prefix}-month`;
  const dayId = `${prefix}-day`;
  const yearId = `${prefix}-year`;

  return `
  <fieldset class="usa-fieldset">
    <legend class="usa-legend">${legend}</legend>
    <span class="usa-hint" id="${hintId}">For example: July 16 1969</span>
    <span class="usa-error-message" id="${messageId}">${message}</span>
    <div class="usa-memorable-date">
      <div class="usa-form-group usa-form-group--month usa-form-group--select usa-form-group--error">
        <label class="usa-label usa-label--error" for="${monthId}">Month</label>
        <select
          class="usa-select usa-input--error"
          id="${monthId}"
          name="${monthId}"
          aria-invalid="true"
          aria-describedby="${hintId} ${messageId}"
        >
          <option value>- Select -</option>
          ${monthOptions()}
        </select>
      </div>
      <div class="usa-form-group usa-form-group--day">
        <label class="usa-label" for="${dayId}">Day</label>
        <input class="usa-input" id="${dayId}" name="${dayId}" maxlength="2" pattern="[0-9]*" inputmode="numeric" value="${day}" />
      </div>
      <div class="usa-form-group usa-form-group--year">
        <label class="usa-label" for="${yearId}">Year</label>
        <input
          class="usa-input"
          id="${yearId}"
          name="${yearId}"
          minlength="4"
          maxlength="4"
          pattern="[0-9]*"
          inputmode="numeric"
          value="${year}"
        />
      </div>
    </div>
  </fieldset>`;
};

const contentArgTypes = {
  legend: { control: 'text', name: 'Legend' },
  month: {
    control: 'select',
    options: months.map(([value]) => value),
    name: 'Month',
  },
  day: { control: 'text', name: 'Day' },
  year: { control: 'text', name: 'Year' },
};

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    legend: 'Launch date',
    month: '7',
    day: '16',
    year: '1969',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => memorableDate({ ...args, prefix: 'default' }),
};

export const WithHint = {
  name: 'With hint text',
  tags: ['!dev', '!test'],
  render: () => memorableDate({ prefix: 'hint', hints: true }),
};

export const ErrorState = {
  name: 'Error state',
  tags: ['!dev', '!test'],
  render: () => memorableDateError({ prefix: 'error' }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Default', memorableDate({ prefix: 'all-default' })),
      block('With hint text', memorableDate({ prefix: 'all-hint', hints: true })),
      block('Error state', memorableDateError({ prefix: 'all-error' })),
    ]),
};

// --- Palette accessibility tests ---
//
// Uses `labPaletteRender`, not the shared `paletteRender`, because
// every field here carries `id` / `for` / `aria-describedby` — six
// stacked copies with the same ids would collide. See
// stories/lab/labHelpers.js.

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Default', memorableDate({ prefix: `${palette}-default` })),
      block('With hint text', memorableDate({ prefix: `${palette}-hint`, hints: true })),
      block('Error state', memorableDateError({ prefix: `${palette}-error` })),
    ]),
  ),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Default', memorableDate({ prefix: `${palette}-default` })),
      block('With hint text', memorableDate({ prefix: `${palette}-hint`, hints: true })),
      block('Error state', memorableDateError({ prefix: `${palette}-error` })),
    ]),
  ),
};
