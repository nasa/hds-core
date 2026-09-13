// ============================================================
// Tooltip — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_tooltip.scss` exists and
// no HDS rule targets `.usa-tooltip*`. Everything below is USWDS
// default styling inside `@layer uswds`, recolored only by the HDS
// theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/tooltip/
// USWDS styles: packages/usa-tooltip/src/styles/_usa-tooltip.scss
// USWDS JS:     packages/usa-tooltip/src/index.js — REQUIRED.
//
// This is the reference example for a JS-dependent lab story. USWDS
// tooltips do not exist in the authored markup at all: `init()` strips
// the `title` attribute off the trigger, wraps the trigger in a
// `.usa-tooltip` span, and builds the `.usa-tooltip__body` sibling that
// carries every tooltip style. Without the re-initialization below, the
// canvas shows a plain button and the tooltip text is a native browser
// tooltip on hover — so nothing about the component is actually under
// test. `parameters.uswds` opts this file into the decorator in
// `.storybook/preview.js` that runs that pass after Storybook renders.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - The tooltip body is pinned to `$theme-tooltip-background-color`
//     (`ink`, i.e. black under the HDS theme) with reverse text. It is
//     the same black box on all six palettes, including the black
//     palette where it disappears into its own background.
//   - `$theme-tooltip-font-size` resolves through the HDS type scale,
//     so tooltip text is Public Sans at USWDS sizing while HDS body
//     copy around it is not.
//   - The body keeps `$theme-tooltip-border-radius`, so it is rounded
//     against otherwise square HDS surfaces.
//   - The trigger gets `tabindex="0"` from `init()`, so the USWDS focus
//     ring — not the HDS dashed ring — is what a keyboard user sees.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Tooltip',
  parameters: {
    ...labParams,
    // Opts into the USWDS DOM enhancement decorator in preview.js.
    uswds: ['tooltip'],
  },
};

// --- Helpers ---

/**
 * A tooltip trigger, in its pre-enhancement form.
 *
 * `init()` reads `title` and `data-position` and replaces this element
 * with the wrapper/trigger/body trio, so the markup here is what an
 * author writes, not what ends up in the DOM.
 *
 * @param {object} options
 * @param {string} options.text     Trigger label
 * @param {string} options.tip      Tooltip content (authored as `title`)
 * @param {string} options.position `top` | `bottom` | `left` | `right`
 * @param {string} options.classes  Trigger classes
 */
const tooltip = ({
  text = 'Perigee',
  tip = 'The point in an orbit closest to Earth.',
  position = 'top',
  classes = 'usa-button',
} = {}) =>
  `<button class="${classes} usa-tooltip" data-position="${position}" title="${tip}" type="button">${text}</button>`;

/** Inline text trigger — USWDS's abbreviation pattern. */
const abbrTooltip = ({ text = 'LEO', tip = 'Low Earth orbit — below 2,000 kilometers altitude.' } = {}) =>
  `<p>Most crewed missions operate in <span class="usa-tooltip" data-position="top" title="${tip}">${text}</span>.</p>`;

const positionRow = (items) => `
  <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center; padding: 3rem 0;">
    ${items.join('\n')}
  </div>`;

const positionArgTypes = {
  text: { control: 'text', name: 'Trigger label' },
  tip: { control: 'text', name: 'Tooltip text' },
  position: {
    control: 'select',
    options: ['top', 'bottom', 'left', 'right'],
    name: 'Position',
  },
};

// --- Variants ---

export const Default = {
  name: 'Default (top)',
  tags: ['!dev', '!test'],
  args: {
    text: 'Perigee',
    tip: 'The point in an orbit closest to Earth.',
    position: 'top',
  },
  argTypes: positionArgTypes,
  render: (args = {}) => `<div style="padding: 3rem 0;">${tooltip(args)}</div>`,
};

export const Positions = {
  name: 'Positions',
  tags: ['!dev', '!test'],
  render: () =>
    positionRow([
      tooltip({ text: 'Top', tip: 'Tooltip above the trigger.', position: 'top' }),
      tooltip({ text: 'Bottom', tip: 'Tooltip below the trigger.', position: 'bottom' }),
      tooltip({ text: 'Left', tip: 'Tooltip left of the trigger.', position: 'left' }),
      tooltip({ text: 'Right', tip: 'Tooltip right of the trigger.', position: 'right' }),
    ]),
};

export const OnText = {
  name: 'On inline text',
  tags: ['!dev', '!test'],
  render: () => `<div style="padding: 3rem 0;">${abbrTooltip()}</div>`,
};

export const LongContent = {
  name: 'Long content (wrapping)',
  tags: ['!dev', '!test'],
  render: () =>
    `<div style="padding: 4rem 0;">${tooltip({
      text: 'Delta-v',
      tip: 'A measure of the impulse per unit of spacecraft mass needed to perform a maneuver, and the usual currency of mission planning.',
    })}</div>`,
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('Default (top)', `<div style="padding: 2rem 0;">${tooltip()}</div>`),
      block(
        'Positions',
        positionRow([
          tooltip({ text: 'Top', tip: 'Tooltip above the trigger.', position: 'top' }),
          tooltip({ text: 'Bottom', tip: 'Tooltip below the trigger.', position: 'bottom' }),
          tooltip({ text: 'Left', tip: 'Tooltip left of the trigger.', position: 'left' }),
          tooltip({ text: 'Right', tip: 'Tooltip right of the trigger.', position: 'right' }),
        ]),
      ),
      block('On inline text', abbrTooltip()),
      block(
        'Long content',
        `<div style="padding: 2rem 0;">${tooltip({
          text: 'Delta-v',
          tip: 'A measure of the impulse per unit of spacecraft mass needed to perform a maneuver.',
        })}</div>`,
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
