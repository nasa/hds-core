// ============================================================
// Character Count — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_character-count.scss`
// exists and `grep -rn "character-count" src/scss/` returns nothing —
// not even a palette bridge or a print rule. The `.usa-character-count*`
// selectors are USWDS defaults inside `@layer uswds`, recolored only by
// the HDS theme settings in `_hds-uswds-theme.scss`.
//
// The component is still a special case: it *wraps* a `.usa-input` or
// `.usa-textarea`, and those HDS does theme, in
// `src/scss/components/_form.scss`. So the field is HDS and the counter
// is USWDS, inside one component. That split is the whole finding here.
//
// USWDS docs:   https://designsystem.digital.gov/components/character-count/
// USWDS styles: packages/usa-character-count/src/styles/_usa-character-count.scss
// USWDS JS:     packages/usa-character-count/src/index.js — REQUIRED.
//
// Almost nothing a user sees is in the authored markup. `init()` calls
// `enhanceCharacterCount()` on every `.usa-character-count__field`, which:
//   1. adds `usa-sr-only` to the authored `.usa-character-count__message`
//      and strips its `aria-live` — the fallback sentence the author wrote
//      stops being visible;
//   2. moves `maxlength` off the field onto `data-maxlength` on the
//      `.usa-character-count` root, so native browser truncation is
//      replaced by USWDS's own over-limit handling;
//   3. appends the two elements that actually display the count —
//      `.usa-character-count__status.usa-hint[aria-hidden]` (visual) and
//      `.usa-character-count__sr-status.usa-sr-only` (screen reader),
//      the latter given `aria-live="polite"` 100 ms later so iOS
//      VoiceOver does not announce it on page load.
// Without the re-init decorator the canvas is a plain input plus a
// sentence of body copy: no counter, no live region, no over-limit
// state, and a `maxlength` the browser enforces silently. `parameters.uswds`
// opts this file into the decorator in `.storybook/preview.js` that runs
// that pass after Storybook renders.
//
// USWDS 3.14 changed this component: the deferred `aria-live` above and a
// fix to the associated-label selector (docs/USWDS-3.14.0-IMPACT.md, JS
// behaviour changes). `docs/USWDS-3.14.0-IMPACT.md` also flags it as the
// one shipped component that generates status messages, against a 508
// record that says HDS Core v1.0 components do not.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The field is fully HDS: `.usa-input` / `.usa-textarea` in
//     `src/scss/components/_form.scss` set `--hds-palette-input-bg`,
//     `$hds-border-radius-control`, `size('body', '2xs')`, 14px/16px
//     padding and the solid NASA Blue focus border. The counter beneath
//     it has no HDS rule at all. The mismatch is inside one component,
//     not between two.
//   - The one thing that does carry over: `createStatusMessages()` adds
//     the `usa-hint` class to the visual status, so it picks up the HDS
//     hint treatment — `color: var(--hds-palette-muted)`,
//     `size('body', '3xs')`, `$hds-letter-spacing-1`, weight normal.
//     That is why the resting counter adapts across all six palettes.
//   - ⚠️ And that is also what breaks the over-limit state.
//     `.usa-character-count__status--invalid` sets `color: color("error-dark")`
//     (`$theme-color-error-dark: 'red-60v'`) and `font-weight('bold')` in
//     `@layer uswds`; the HDS `.usa-hint` rule sets color and weight in
//     `@layer hds-components`, which wins by layer order (`src/scss/hds.scss`
//     declares `uswds, uswds-utils, hds-base, hds-components, …`) no matter
//     the specificity. Both invalid declarations lose. The counter reads
//     muted grey at normal weight whether you are 10 under or 40 over.
//   - Same mechanism on the label: `.usa-label--error` in 3.14 only adds
//     `font-weight('bold')`, and HDS `.usa-label` re-declares weight via
//     `@include hds-type('h6')` (semibold) in `hds-components`. The label's
//     over-limit emphasis never renders either.
//   - What survives is the border: `updateCountMessage()` toggles
//     `.usa-input--error`, which HDS themes to
//     `var(--hds-palette-error-indicator)`, and `.usa-form-group--error`,
//     whose USWDS left bar HDS deliberately suppresses. So the only
//     over-limit signal left on screen is a red border — colour alone,
//     on a component whose accessibility tests require "visible and
//     audible feedback about character count errors".
//   - Spacing is hardcoded: `.usa-character-count__status` is
//     `display: inline-block` with `padding-top: units(0.5)` (4px), and it
//     is appended to the `.usa-character-count` root, *outside* the
//     `.usa-form-group`, so no HDS form spacing reaches it.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Character Count',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    uswds: ['characterCount'],
  },
};

// --- Helpers ---

/**
 * A character count field in its pre-enhancement form — what an author
 * writes. `init()` hides the `__message` span, moves `maxlength` to
 * `data-maxlength` on the root, and appends the two status elements.
 *
 * `prefix` keeps `id` / `for` / `aria-describedby` unique: the palette
 * stories stack six copies of this markup in one DOM.
 *
 * @param {object} options
 * @param {string} options.prefix     Unique id prefix for this instance
 * @param {string} options.labelText  Field label
 * @param {string} options.hint       Help text above the field
 * @param {number} options.maxlength  Character limit
 * @param {boolean} options.multiline Render a textarea instead of an input
 * @param {number} options.rows       Textarea rows
 */
const characterCount = ({
  prefix = 'cc',
  labelText = 'Mission acronym',
  hint = 'For example, TESS, MAVEN, or OSIRIS-REx.',
  maxlength = 25,
  multiline = false,
  rows = 5,
} = {}) => {
  const field = multiline
    ? `<textarea
        class="usa-textarea usa-character-count__field"
        id="${prefix}-field"
        name="${prefix}-field"
        rows="${rows}"
        maxlength="${maxlength}"
        aria-describedby="${prefix}-info ${prefix}-hint"
      ></textarea>`
    : `<input
        class="usa-input usa-character-count__field"
        id="${prefix}-field"
        name="${prefix}-field"
        maxlength="${maxlength}"
        aria-describedby="${prefix}-info ${prefix}-hint"
      />`;

  return `
  <div class="usa-character-count">
    <div class="usa-form-group">
      <label class="usa-label" for="${prefix}-field">${labelText}</label>
      <span class="usa-hint" id="${prefix}-hint">${hint}</span>
      ${field}
    </div>
    <span class="usa-character-count__message" id="${prefix}-info">
      You can enter up to ${maxlength} characters
    </span>
  </div>`;
};

/**
 * The over-limit state, authored as the DOM `updateCountMessage()`
 * produces it.
 *
 * `enhanceCharacterCount()` only ever writes the default
 * "N characters allowed" message — it never reads an existing value — so
 * a pre-filled field would render as if it were empty until the first
 * keystroke. This builder therefore writes the post-enhancement DOM
 * itself (`data-maxlength` on the root, no `maxlength` on the field,
 * both status elements present, `--error` classes toggled on) and marks
 * the field `data-enhanced="true"` so the decorator's `init()` leaves it
 * alone. The delegated `input` listener on `document.body` still reaches
 * it, so typing recomputes the count normally.
 *
 * @param {object} options
 * @param {string} options.prefix    Unique id prefix for this instance
 * @param {string} options.labelText Field label
 * @param {string} options.hint      Help text above the field
 * @param {number} options.maxlength Character limit
 * @param {string} options.value     Field contents, longer than the limit
 */
const overLimitCount = ({
  prefix = 'cc-over',
  labelText = 'Observation notes',
  hint = 'Describe the target and the observing conditions.',
  maxlength = 100,
  value = 'Perseverance sampled the Jezero Crater delta front at Wildcat Ridge, where fine-grained mudstone preserves the best organic-matter signal of the campaign so far.',
} = {}) => {
  const over = Math.abs(value.length - maxlength);
  const status = `${over} character${over === 1 ? '' : 's'} over limit`;

  return `
  <div class="usa-character-count" data-maxlength="${maxlength}">
    <div class="usa-form-group usa-form-group--error">
      <label class="usa-label usa-label--error" for="${prefix}-field">${labelText}</label>
      <span class="usa-hint" id="${prefix}-hint">${hint}</span>
      <textarea
        class="usa-textarea usa-character-count__field usa-input--error"
        id="${prefix}-field"
        name="${prefix}-field"
        rows="5"
        data-enhanced="true"
        data-character-count-over-limit="true"
        aria-describedby="${prefix}-info ${prefix}-hint"
      >${value}</textarea>
    </div>
    <span class="usa-character-count__message usa-sr-only" id="${prefix}-info">
      You can enter up to ${maxlength} characters
    </span>
    <div class="usa-character-count__status usa-hint usa-character-count__status--invalid" aria-hidden="true">
      ${status}
    </div>
    <div class="usa-character-count__sr-status usa-sr-only" aria-live="assertive">
      Character limit exceeded. ${status}
    </div>
  </div>`;
};

const fieldArgTypes = {
  labelText: { control: 'text', name: 'Label' },
  hint: { control: 'text', name: 'Help text' },
  maxlength: { control: 'number', name: 'Character limit' },
};

// --- Variants ---

export const TextInput = {
  name: 'Text input',
  tags: ['!dev', '!test'],
  args: {
    labelText: 'Mission acronym',
    hint: 'For example, TESS, MAVEN, or OSIRIS-REx.',
    maxlength: 25,
  },
  argTypes: fieldArgTypes,
  render: (args = {}) => characterCount({ prefix: 'input', ...args }),
};

export const Textarea = {
  name: 'Textarea',
  tags: ['!dev', '!test'],
  args: {
    labelText: 'Observation notes',
    hint: 'Describe the target and the observing conditions.',
    maxlength: 200,
  },
  argTypes: fieldArgTypes,
  render: (args = {}) => characterCount({ prefix: 'textarea', multiline: true, ...args }),
};

export const OverLimit = {
  name: 'Over limit',
  tags: ['!dev', '!test'],
  render: () => overLimitCount({ prefix: 'over' }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Text input', characterCount({ prefix: 'all-input' })),
      block(
        'Textarea',
        characterCount({
          prefix: 'all-textarea',
          labelText: 'Observation notes',
          hint: 'Describe the target and the observing conditions.',
          maxlength: 200,
          multiline: true,
        }),
      ),
      block('Over limit', overLimitCount({ prefix: 'all-over' })),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Text input', characterCount({ prefix: `${palette}-input` })),
      block(
        'Textarea',
        characterCount({
          prefix: `${palette}-textarea`,
          labelText: 'Observation notes',
          hint: 'Describe the target and the observing conditions.',
          maxlength: 200,
          multiline: true,
        }),
      ),
      block('Over limit', overLimitCount({ prefix: `${palette}-over` })),
    ]),
  ),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) =>
    stack([
      block('Text input', characterCount({ prefix: `${palette}-hover-input` })),
      block(
        'Textarea',
        characterCount({
          prefix: `${palette}-hover-textarea`,
          labelText: 'Observation notes',
          hint: 'Describe the target and the observing conditions.',
          maxlength: 200,
          multiline: true,
        }),
      ),
      block('Over limit', overLimitCount({ prefix: `${palette}-hover-over` })),
    ]),
  ),
};
