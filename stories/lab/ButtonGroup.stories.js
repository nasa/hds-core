// ============================================================
// Button Group — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_button-group.scss`
// exists and `grep -rn "usa-button-group" src/scss/` finds no match.
// The wrapper's flex layout and the segmented negative-margin /
// separator logic ship untouched inside `@layer uswds`. The buttons
// placed *inside* the group are fully themed — HDS heavily overrides
// `.usa-button` in `src/scss/components/_button.scss` (CTA red,
// secondary blue, outline box-shadow, disabled Carbon-20, focus ring)
// — so this component is a themed part inside an unthemed container,
// not an unthemed component outright.
//
// USWDS docs:   https://designsystem.digital.gov/components/button-group/
// USWDS styles: packages/usa-button-group/src/styles/_usa-button-group.scss
// USWDS JS:     none
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The segmented separator is a color compiled once at build time,
//     not a live token: `.usa-button::before { border-right: 1px solid
//     color("primary-dark") }` and `.usa-button--secondary::before {
//     border-right-color: color("secondary-dark") }` resolve
//     `$theme-color-primary-dark: 'red-60v'` /
//     `$theme-color-secondary-dark: 'blue-70v'`
//     (`src/scss/_hds-uswds-theme.scss:103,118`) — a USWDS system
//     color, not HDS's own `$hds-color-nasa-red-shade: #b60109`
//     (`src/scss/_hds-tokens.scss:6`) used for the same button's hover
//     state. Two unrelated "dark" shades exist on one button.
//   - `.usa-button-group--segmented .usa-button--outline::before {
//     display: none }` suppresses that separator for outline buttons
//     because outline buttons draw their own edge via
//     `box-shadow: $button-stroke color(...)` rather than a real
//     border, in both stock USWDS
//     (`node_modules/@uswds/uswds/packages/usa-button/src/styles/_usa-button.scss:107`)
//     and HDS's override (`src/scss/components/_button.scss`) — this
//     suppression is inherited behavior that happens to keep working,
//     not an HDS-specific fix.
//   - That suppression keys off the literal `.usa-button--outline`
//     class, not what a button looks like. On the blue palette HDS
//     repaints `.usa-button--secondary:not(.hds-btn-icon)` to look
//     like an outline button — transparent background, inset
//     box-shadow border (`_button.scss`, "Blue Palette — Secondary
//     Filled → Outline") — without ever adding the `usa-button--outline`
//     class, so the segmented CSS still paints its static
//     `secondary-dark` separator line over what now renders as an
//     outline button. See `SegmentedSecondary` under `PaletteA11y`'s
//     blue-palette copy.
//   - `$theme-button-border-radius: hds.$hds-border-radius` is `0px`
//     (`_hds-uswds-theme.scss:439`, `_hds-tokens.scss:26`), so the
//     segmented rules that zero corner radii at the group's first and
//     last child are inert under HDS — buttons are already
//     square-cornered everywhere, so that part of the USWDS segmented
//     logic has nothing left to do.
//   - `[class*="usa-button"]:disabled::before { border-right-color:
//     color($theme-body-background-color) }` resolves to `'white'`
//     (`_hds-uswds-theme.scss:200`), designed to blend the separator
//     into a white page. HDS's own disabled override repaints the
//     button Carbon-20 with white text (`_button.scss`, "Filled
//     Disabled") but never touches this separator variable, so on any
//     non-white palette a disabled segment keeps a hardcoded white
//     seam next to a Carbon-20 button. See `SegmentedDisabled`.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Button Group',
  parameters: labParams,
};

// --- Helpers ---

/**
 * @param {object} options
 * @param {string} options.text     Button label
 * @param {string} options.classes  `.usa-button` + modifier classes
 * @param {boolean} options.disabled Native disabled attribute
 */
const groupItem = ({ text = 'Continue', classes = 'usa-button', disabled = false } = {}) => `
    <li class="usa-button-group__item">
      <button type="button" class="${classes}"${disabled ? ' disabled="disabled"' : ''}>${text}</button>
    </li>`;

/**
 * @param {object} options
 * @param {Array<{text: string, classes: string, disabled?: boolean}>} options.items
 * @param {boolean} options.segmented Add `usa-button-group--segmented`
 */
const buttonGroup = ({ items = [], segmented = false } = {}) => `
  <ul class="usa-button-group${segmented ? ' usa-button-group--segmented' : ''}">
    ${items.map((item) => groupItem(item)).join('')}
  </ul>`;

const contentArgTypes = {
  backText: { control: 'text', name: 'Back label' },
  continueText: { control: 'text', name: 'Continue label' },
};

const cameraViews = [
  { key: 'navcam', text: 'Navcam' },
  { key: 'hazcam', text: 'Hazcam' },
  { key: 'mastcam', text: 'Mastcam-Z' },
];

// --- Variants ---

export const Default = {
  name: 'Default',
  tags: ['!dev', '!test'],
  args: {
    backText: 'Back',
    continueText: 'Continue',
  },
  argTypes: contentArgTypes,
  render: (args = {}) => {
    const { backText = 'Back', continueText = 'Continue' } = args;
    return buttonGroup({
      items: [
        { text: backText, classes: 'usa-button usa-button--outline' },
        { text: continueText, classes: 'usa-button' },
      ],
    });
  },
};

export const Segmented = {
  name: 'Segmented (current / non-current)',
  tags: ['!dev', '!test'],
  args: { current: 'navcam' },
  argTypes: {
    current: {
      control: 'select',
      options: cameraViews.map((v) => v.key),
      name: 'Current view',
    },
  },
  render: (args = {}) => {
    const { current = 'navcam' } = args;
    return buttonGroup({
      segmented: true,
      items: cameraViews.map((v) => ({
        text: v.text,
        classes: `usa-button${v.key === current ? '' : ' usa-button--outline'}`,
      })),
    });
  },
};

export const SegmentedOutline = {
  name: 'Segmented, all outline',
  tags: ['!dev', '!test'],
  render: () =>
    buttonGroup({
      segmented: true,
      items: [
        { text: '24 hours', classes: 'usa-button usa-button--outline' },
        { text: '7 sols', classes: 'usa-button usa-button--outline' },
        { text: '30 sols', classes: 'usa-button usa-button--outline' },
      ],
    }),
};

export const SegmentedSecondary = {
  name: 'Segmented, secondary (blue)',
  tags: ['!dev', '!test'],
  render: () =>
    buttonGroup({
      segmented: true,
      items: [
        { text: 'Elevation', classes: 'usa-button usa-button--secondary' },
        { text: 'Temperature', classes: 'usa-button usa-button--secondary' },
        { text: 'Vegetation', classes: 'usa-button usa-button--secondary' },
      ],
    }),
};

export const SegmentedDisabled = {
  name: 'Segmented, disabled item',
  tags: ['!dev', '!test'],
  render: () =>
    buttonGroup({
      segmented: true,
      items: [
        { text: 'Visible', classes: 'usa-button' },
        { text: 'Infrared', classes: 'usa-button usa-button--outline' },
        { text: 'Thermal', classes: 'usa-button usa-button--outline', disabled: true },
      ],
    }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block(
        'Default',
        buttonGroup({
          items: [
            { text: 'Back', classes: 'usa-button usa-button--outline' },
            { text: 'Continue', classes: 'usa-button' },
          ],
        }),
      ),
      block(
        'Segmented (current / non-current)',
        buttonGroup({
          segmented: true,
          items: cameraViews.map((v) => ({
            text: v.text,
            classes: `usa-button${v.key === 'navcam' ? '' : ' usa-button--outline'}`,
          })),
        }),
      ),
      block(
        'Segmented, all outline',
        buttonGroup({
          segmented: true,
          items: [
            { text: '24 hours', classes: 'usa-button usa-button--outline' },
            { text: '7 sols', classes: 'usa-button usa-button--outline' },
            { text: '30 sols', classes: 'usa-button usa-button--outline' },
          ],
        }),
      ),
      block(
        'Segmented, secondary (blue)',
        buttonGroup({
          segmented: true,
          items: [
            { text: 'Elevation', classes: 'usa-button usa-button--secondary' },
            { text: 'Temperature', classes: 'usa-button usa-button--secondary' },
            { text: 'Vegetation', classes: 'usa-button usa-button--secondary' },
          ],
        }),
      ),
      block(
        'Segmented, disabled item',
        buttonGroup({
          segmented: true,
          items: [
            { text: 'Visible', classes: 'usa-button' },
            { text: 'Infrared', classes: 'usa-button usa-button--outline' },
            { text: 'Thermal', classes: 'usa-button usa-button--outline', disabled: true },
          ],
        }),
      ),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: paletteRender(AllVariants.render),
};
