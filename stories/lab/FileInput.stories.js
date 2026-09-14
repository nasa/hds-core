// ============================================================
// File Input — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_file-input.scss` exists,
// and `grep -rn "usa-file-input" src/scss/` returns nothing at all — not
// a surface bridge in `base/_palettes.scss`, not a rule in
// `base/_print.scss`. Everything below is USWDS default styling inside
// `@layer uswds`, recolored only by the HDS theme settings in
// `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/file-input/
// USWDS styles: packages/usa-file-input/src/styles/_usa-file-input.scss
// USWDS JS:     packages/usa-file-input/src/index.js — REQUIRED.
//
// `init()` does not decorate the authored markup, it replaces it.
// `createTargetArea()` strips `.usa-file-input` off the `<input>`, renames
// it `.usa-file-input__input`, wraps everything in a new
// `.usa-file-input` div, and inserts a `.usa-file-input__target` holding
// an absolutely positioned `.usa-file-input__box`.
// `createVisibleInstructions()` builds `.usa-file-input__instructions`
// with its `.usa-file-input__drag-text` / `.usa-file-input__choose` spans
// and writes the input's `aria-label`. `createSROnlyStatus()` adds the
// `aria-live="polite"` file-status region. Every class the component's
// SCSS styles — the dashed drop zone, the white box, the error border —
// exists only after that pass; the authored `<input type="file">` carries
// none of them.
//
// This file, with `parameters.uswds: ['fileInput']`, closes the coverage
// gap recorded in `docs/USWDS-3.14.0-IMPACT.md` ("One finding the analysis
// did not predict") and in `docs/508.md` (Testing Methodology → Known
// coverage gaps): both state that the file input is never enhanced in
// Storybook and that neither axe nor Chromatic can see its error border,
// focus ring, or drag instructions. With the decorator in
// `.storybook/preview.js` running `init()` for this story file, that is no
// longer true and both notes are stale.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The 3.14.0 blue-to-red error fix does land under the HDS theme, and
//     it survives the cascade layers. `.usa-form-group--error
//     .usa-file-input__target` takes `border-color: color("error-dark")` at
//     `border-width: 2px`, and `$theme-color-error-dark: 'red-60v'`
//     (`_hds-uswds-theme.scss` line 154) → `#b50909`. The only HDS rule
//     touching `.usa-form-group--error` (`components/_form.scss` line 442,
//     `@layer hds-components`) zeroes `border-left` / `padding-left` /
//     `margin-left` and nothing else, so it cannot erase the target's
//     border the way `.usa-hint` erases character count's status. It is
//     still the wrong red and the wrong weight: HDS themed inputs use
//     `--hds-palette-error-indicator` (NASA Red `#f64137`) at 1px
//     (`components/_form.scss` line 432), and swap to NASA Red Tint on the
//     dark and black palettes, where `#b50909` does not move.
//   - The same blue-error bug 3.14.0 fixed is still live on the JS state.
//     `preventInvalidFiles()` adds `.has-invalid-file` and inserts
//     `.usa-file-input__accepted-files-message`; the SCSS colors that
//     message `color("secondary-dark")` → `$theme-color-secondary-dark:
//     'blue-70v'` (line 118) and the border `color("accent-warm")` →
//     `$theme-color-accent-warm: 'orange-40v'` (line 135). So a rejected
//     file type reports itself as blue text on an orange border.
//   - `.usa-file-input__box` hardcodes `background: white`, so the drop
//     zone is a white panel on all six palettes — the same cutout
//     behaviour as the card. Anything inside it resolves `--hds-palette-*`
//     against the surrounding palette, not against the white it sits on.
//   - The drop zone's only affordance is `1px dashed color("base-light")`
//     → `$theme-color-base-light: 'gray-10'` (line 78), i.e. `#e6e6e6` on
//     that hardcoded white: roughly 1.3:1, well under the 3:1 that 1.4.11
//     asks of non-text UI. `:hover` only moves it to `color("base")`.
//   - `.usa-file-input__choose` — the one interactive-looking string in
//     the component — is `@include typeset-link`, and
//     `$theme-link-color: 'ink'` (line 203), so it renders as ink with a
//     plain underline. It is a `<span>`, so none of the HDS gradient link
//     treatment in `base/` reaches it.
//   - `base/_focus.scss` (`@layer hds-base`) applies `hds-focus-ring` to
//     `input:not([disabled]):focus-visible`, which sets `outline: none` and
//     paints the dashed ring in a `::before`. After enhancement that input
//     is `.usa-file-input__input`, absolutely positioned at `z-index: 1`
//     beneath `.usa-file-input__box` at `z-index: 2`. ⚠️ The suppression is
//     certain from the source; whether any ring paints at all was not
//     verified in a browser in this session. Related upstream: USWDS #5616,
//     cited in `docs/508.md` under 2.4.7 and 502.3.12.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/File Input',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    uswds: ['fileInput'],
  },
};

// --- Helpers ---

/**
 * A file input form group, in its pre-enhancement form.
 *
 * `init()` selects `.usa-file-input` and rebuilds everything from this
 * input outwards, so what is authored here is what a developer writes,
 * not what ends up in the DOM. `aria-describedby` wiring is the author's
 * responsibility; `aria-label` is written by `updateVisibleInstructions()`.
 *
 * Note: USWDS's own error example points `aria-describedby` at the hint
 * only, not at `.usa-error-message`. Reproduced verbatim so this stays a
 * baseline of the published markup rather than an improvement on it.
 *
 * @param {object} options
 * @param {string} options.prefix    Unique id prefix (see stories/lab/README.md)
 * @param {string} options.text      Label text
 * @param {string} options.hint      `.usa-hint` copy, omitted when empty
 * @param {string} options.accept    `accept` attribute value, omitted when empty
 * @param {string} options.errorText `.usa-error-message` copy, omitted when empty
 * @param {string} options.errorMessage `data-errormessage` override for the
 *   rejected-file-type string `preventInvalidFiles()` inserts
 * @param {boolean} options.multiple Accept more than one file
 * @param {boolean} options.disabled Render the input disabled
 */
const fileInput = ({
  prefix = 'fi',
  text = 'Upload mission telemetry',
  hint = '',
  accept = '',
  errorText = '',
  errorMessage = '',
  multiple = false,
  disabled = false,
} = {}) => {
  const inputId = `${prefix}-input`;
  const hintId = `${prefix}-hint`;
  const errorId = `${prefix}-error`;

  return `
  <div class="usa-form-group${errorText ? ' usa-form-group--error' : ''}">
    <label class="usa-label${errorText ? ' usa-label--error' : ''}" for="${inputId}">${text}</label>
    ${hint ? `<span class="usa-hint" id="${hintId}">${hint}</span>` : ''}
    ${errorText ? `<span class="usa-error-message" id="${errorId}">${errorText}</span>` : ''}
    <input
      id="${inputId}"
      class="usa-file-input"
      type="file"
      name="${inputId}"
      ${hint ? `aria-describedby="${hintId}"` : ''}
      ${accept ? `accept="${accept}"` : ''}
      ${errorMessage ? `data-errormessage="${errorMessage}"` : ''}
      ${multiple ? 'multiple="multiple"' : ''}
      ${disabled ? 'disabled' : ''}
    />
  </div>`;
};

/** Constrains the 480px (`$theme-input-max-width`) component sensibly. */
const wrap = (content) => `<div style="max-width: 34rem;">${content}</div>`;

/**
 * Every variant in one stack, with a caller-supplied id prefix so the six
 * palette copies do not collide.
 *
 * @param {string} prefix Unique per rendered copy
 */
function allVariants(prefix) {
  return stack([
    block('Default (single file)', fileInput({ prefix: `${prefix}-default` })),
    block(
      'With hint text',
      fileInput({
        prefix: `${prefix}-hint`,
        text: 'Upload an instrument calibration report',
        hint: 'Reports from Webb, Hubble, and Chandra are accepted.',
      }),
    ),
    block(
      'Accepts specific file types',
      fileInput({
        prefix: `${prefix}-accept`,
        text: 'Upload a Planetary Data System label',
        hint: 'Select PDF or TXT files.',
        accept: '.pdf,.txt',
        errorMessage: 'Error: Select a PDF or TXT file.',
      }),
    ),
    block(
      'Accepts multiple files',
      fileInput({
        prefix: `${prefix}-multiple`,
        text: 'Upload Landsat scene imagery',
        hint: 'Select one or more files.',
        multiple: true,
      }),
    ),
    block(
      'Error state',
      fileInput({
        prefix: `${prefix}-error`,
        text: 'Upload mission telemetry',
        hint: 'Select any valid file.',
        errorText: 'Select a telemetry file before continuing.',
      }),
    ),
    block(
      'Disabled',
      fileInput({
        prefix: `${prefix}-disabled`,
        text: 'Upload mission telemetry',
        hint: 'Uploads open once the launch window is confirmed.',
        disabled: true,
      }),
    ),
  ]);
}

const baseArgTypes = {
  text: { control: 'text', name: 'Label' },
  hint: { control: 'text', name: 'Hint text' },
};

// --- Variants ---

export const Default = {
  name: 'Default (single file)',
  tags: ['!dev', '!test'],
  args: {
    text: 'Upload mission telemetry',
    hint: '',
  },
  argTypes: baseArgTypes,
  render: (args = {}) => wrap(fileInput({ ...args, prefix: 'default' })),
};

export const WithHint = {
  name: 'With hint text',
  tags: ['!dev', '!test'],
  args: {
    text: 'Upload an instrument calibration report',
    hint: 'Reports from Webb, Hubble, and Chandra are accepted.',
  },
  argTypes: baseArgTypes,
  render: (args = {}) => wrap(fileInput({ ...args, prefix: 'hint' })),
};

export const SpecificFileTypes = {
  name: 'Accepts specific file types',
  tags: ['!dev', '!test'],
  render: () =>
    wrap(
      fileInput({
        prefix: 'accept',
        text: 'Upload a Planetary Data System label',
        hint: 'Select PDF or TXT files.',
        accept: '.pdf,.txt',
        errorMessage: 'Error: Select a PDF or TXT file.',
      }),
    ),
};

export const MultipleFiles = {
  name: 'Accepts multiple files',
  tags: ['!dev', '!test'],
  render: () =>
    wrap(
      fileInput({
        prefix: 'multiple',
        text: 'Upload Landsat scene imagery',
        hint: 'Select one or more files.',
        multiple: true,
      }),
    ),
};

export const ErrorState = {
  name: 'Error state',
  tags: ['!dev', '!test'],
  render: () =>
    wrap(
      fileInput({
        prefix: 'error',
        text: 'Upload mission telemetry',
        hint: 'Select any valid file.',
        errorText: 'Select a telemetry file before continuing.',
      }),
    ),
};

export const Disabled = {
  name: 'Disabled',
  tags: ['!dev', '!test'],
  render: () =>
    wrap(
      fileInput({
        prefix: 'disabled',
        text: 'Upload mission telemetry',
        hint: 'Uploads open once the launch window is confirmed.',
        disabled: true,
      }),
    ),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () => allVariants('all'),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) => allVariants(palette)),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) => allVariants(`hover-${palette}`)),
};
