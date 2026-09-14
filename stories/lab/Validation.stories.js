// ============================================================
// Validation — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_validation.scss` or
// `_checklist.scss` exists and no HDS rule targets `.usa-checklist*`
// or `[data-validation-element]`. The `usa-validation` package ships
// no stylesheet of its own — every visible style below comes from
// `usa-checklist`'s SCSS inside `@layer uswds`, recolored only by the
// HDS theme settings in `_hds-uswds-theme.scss`. (The surrounding
// `.usa-alert--validation` wrapper IS HDS-themed — see
// `src/scss/components/_alert.scss` — so only the checklist and input
// inside it are the unstyled baseline under test.)
//
// USWDS docs:   https://designsystem.digital.gov/components/validation/
// USWDS styles: packages/usa-checklist/src/styles/_usa-checklist.scss
// USWDS JS:     packages/usa-validation/src/index.js — REQUIRED.
//
// This is a JS-dependent lab story. `init()` does two things the
// authored markup cannot do on its own: it creates a hidden
// `usa-sr-only` status span after the input, wires it up with
// `id="{input}-sr-summary"` and `aria-describedby` on the input, and
// sets `aria-controls` on the input pointing at the checklist. It also
// walks every `.usa-checklist__item` once and sets an initial
// `aria-label` of "<text> status incomplete" — unconditionally, even
// on an item pre-marked `usa-checklist__item--checked` in markup,
// since it never inspects the item's class list before writing that
// label (`createInitialStatus`, packages/usa-validation/src/index.js).
//
// Without the re-init decorator below, the input has no
// `aria-describedby` at all, because the `usa-sr-only` status span is
// never created — so a screen reader user gets zero live feedback,
// same class of failure as an un-enhanced tooltip. Worse, the
// delegated `input change` listener still fires (it lives on
// `document.body` per stories/lab/README.md → "USWDS JavaScript"), so
// typing still toggles `usa-checklist__item--checked` visually, but
// `validate-input.js` then does
// `statusSummaryContainer.textContent = statusSummary` against a
// `querySelector('[data-validation-status]')` that returns `null`
// (that span was never built) — a `TypeError` thrown from inside a
// debounced callback a second after every keystroke. `parameters.uswds`
// opts this file into the decorator in `.storybook/preview.js` that
// runs `init()` after Storybook renders, so this story shows the real
// enhanced markup instead of that broken half-state.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived):
//   - `add-checkbox-placeholder` (uswds-core mixin) draws the empty
//     "unmet" indicator with a blank `::before` box — no color, no
//     icon, no `$theme-color-error` involved. An unmet requirement is
//     visually silent, not red; there is no error/invalid state color
//     in this component at all.
//   - `add-success-mark` (uswds-core mixin), the only color/graphic
//     `.usa-checklist__item--checked::before` gets, is a hardcoded
//     background-image reference to `check--blue-60v.svg`
//     (`packages/usa-icon/src/img/usa-icons-bg/check--blue-60v.svg`,
//     fill `#005ea2`). It does not read `$theme-color-success` at all —
//     the checkmark is USWDS system blue on every HDS theme, never the
//     HDS/theme green-cool success family configured in
//     `_hds-uswds-theme.scss`. So the "is HDS error red distinguishable
//     from NASA Red" question this baseline was expected to answer does
//     not actually arise in this component's rendered output: no red is
//     drawn here at all, themed or otherwise.
//   - `.usa-checklist` runs through `@include typeset`, so requirement
//     text renders in the ambient USWDS type scale/line-height, not the
//     HDS `hds-mixins` typography mixins used by themed HDS components.
//   - The checklist sits inside `.usa-alert--validation`, which IS
//     HDS-themed (`src/scss/components/_alert.scss`), so the outer
//     info-alert surface, icon, and heading look correct — the mismatch
//     is confined to the checklist and its checkmark.
//   - The `usa-input` and `usa-button` in the form ARE themed
//     (`src/scss/components/_form.scss`, `_button.scss`), so the text
//     field itself gets the HDS solid-blue focus treatment; only the
//     checklist reads as foreign.
//   - The generated status span carries `usa-sr-only`, not `usa-hint`,
//     so it does NOT collide with the `.usa-hint { color; font-weight }`
//     rule in `src/scss/components/_form.scss` that broke Character
//     Count's JS-generated hint element — that specific cascade-layer
//     trap does not repeat here. ⚠️ Not independently verified: whether
//     any other `hds-components`/`hds-base` rule targets `.usa-sr-only`
//     or `[data-validation-element]` — `grep -rn` for both returned no
//     matches in `src/scss/`.
//   - The "Form error hover" known bug (`.usa-input--error` border lost
//     on hover, see AGENTS.md → Known bugs) does not apply: neither
//     `validate-input.js` nor `usa-validation.twig` ever applies
//     `usa-input--error` to the text input — the component's only
//     error-adjacent behavior is the checklist item toggle above.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Validation',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    uswds: ['validator'],
  },
};

// --- Helpers ---

/** One requirement row. `checked` simulates a post-typing state for display. */
const requirement = ({
  text = 'Use at least one uppercase character',
  validator = 'uppercase',
  checked = false,
} = {}) =>
  `<li class="usa-checklist__item${checked ? ' usa-checklist__item--checked' : ''}" data-validator="${validator}">${text}</li>`;

/**
 * The validation form: an API-key request field (a project short code
 * the requester invents, not a secret) checked live against a
 * checklist. `checkedList` marks which requirements render as already
 * met, for the display-only variants below — `init()` still overwrites
 * every item's `aria-label` to "status incomplete" on first run
 * regardless (see header comment), which is itself part of the
 * baseline, not a bug in this story.
 *
 * @param {object} options
 * @param {string} options.prefix       Unique id/aria-controls root
 * @param {string} options.legend       Fieldset legend text
 * @param {string} options.value        Pre-filled input value (display only)
 * @param {Array<{checked: boolean}>} options.checkedList Per-requirement checked state
 */
const validationForm = ({
  prefix = 'validate',
  legend = 'Request an API key',
  value = '',
  checkedList = [false, false, false],
} = {}) => {
  const checklistId = `${prefix}-code`;
  const inputId = `${prefix}-project-code`;
  return `
  <form class="usa-form">
    <fieldset class="usa-fieldset">
      <legend class="usa-legend usa-legend--large">${legend}</legend>
      <div class="usa-alert usa-alert--info usa-alert--validation">
        <div class="usa-alert__body">
          <h4 class="usa-alert__heading">Project code requirements</h4>
          <ul class="usa-checklist" id="${checklistId}">
            ${requirement({ text: 'Use at least one uppercase letter', validator: 'uppercase', checked: checkedList[0] })}
            ${requirement({ text: 'Use at least one number', validator: 'numerical', checked: checkedList[1] })}
            ${requirement({ text: 'Use 6 to 12 characters', validator: 'length', checked: checkedList[2] })}
          </ul>
        </div>
      </div>
      <label class="usa-label" for="${inputId}">Project short code</label>
      <span class="usa-hint" id="${inputId}-hint">Used to label your API key in the NASA Open Data Portal dashboard.</span>
      <input
        class="usa-input"
        id="${inputId}"
        name="project-code"
        type="text"
        value="${value}"
        aria-describedby="${inputId}-hint"
        data-validate-uppercase="[A-Z]"
        data-validate-numerical="\\d"
        data-validate-length="^.{6,12}$"
        data-validation-element="${checklistId}"
      />
      <input class="usa-button" type="submit" value="Request key" />
    </fieldset>
  </form>`;
};

// --- Variants ---

export const Default = {
  name: 'Default (unmet)',
  tags: ['!dev', '!test'],
  render: () =>
    validationForm({
      prefix: 'default',
      value: '',
      checkedList: [false, false, false],
    }),
};

export const AllRequirementsMet = {
  name: 'All requirements met',
  tags: ['!dev', '!test'],
  render: () =>
    validationForm({
      prefix: 'all-met',
      legend: 'Request an API key',
      value: 'Europa9',
      checkedList: [true, true, true],
    }),
};

export const SomeMet = {
  name: 'Some requirements met',
  tags: ['!dev', '!test'],
  render: () =>
    validationForm({
      prefix: 'some-met',
      legend: 'Request an API key',
      value: 'europa',
      checkedList: [false, false, true],
    }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Default (unmet)', validationForm({ prefix: 'all-default', checkedList: [false, false, false] })),
      block(
        'All requirements met',
        validationForm({ prefix: 'all-allmet', value: 'Europa9', checkedList: [true, true, true] }),
      ),
      block(
        'Some requirements met',
        validationForm({ prefix: 'all-somemet', value: 'europa', checkedList: [false, false, true] }),
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
      block('Default (unmet)', validationForm({ prefix: `${palette}-default`, checkedList: [false, false, false] })),
      block(
        'All requirements met',
        validationForm({ prefix: `${palette}-allmet`, value: 'Europa9', checkedList: [true, true, true] }),
      ),
      block(
        'Some requirements met',
        validationForm({ prefix: `${palette}-somemet`, value: 'europa', checkedList: [false, false, true] }),
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
      block(
        'Default (unmet)',
        validationForm({ prefix: `${palette}-hover-default`, checkedList: [false, false, false] }),
      ),
      block(
        'All requirements met',
        validationForm({ prefix: `${palette}-hover-allmet`, value: 'Europa9', checkedList: [true, true, true] }),
      ),
      block(
        'Some requirements met',
        validationForm({ prefix: `${palette}-hover-somemet`, value: 'europa', checkedList: [false, false, true] }),
      ),
    ]),
  ),
};
