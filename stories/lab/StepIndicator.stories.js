// ============================================================
// Step Indicator — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_step-indicator.scss`
// exists and no HDS rule targets `.usa-step-indicator*` anywhere in
// `src/scss/` (confirmed by grep; no match at all, not even in
// `base/_palettes.scss` or `base/_print.scss`). Everything below is
// USWDS default styling inside `@layer uswds`, recolored only by the
// HDS theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/step-indicator/
// USWDS styles: packages/usa-step-indicator/src/styles/_usa-step-indicator.scss
// USWDS JS:     none. `packages/usa-step-indicator/src/` has no `index.js` —
//               only `styles/` and a Twig template — and
//               docs/USWDS-3.14.0-IMPACT.md's per-package JS diff table lists
//               "Step indicator | no". State (complete/current/pending) is
//               authored directly into the markup; there is nothing to
//               initialize.
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `$theme-step-indicator-segment-color-current: 'primary'` and
//     `$theme-step-indicator-segment-color-complete: 'primary-darker'`
//     (uswds-core `_settings-components.scss`) both resolve through the
//     HDS primary-family swap in `_hds-uswds-theme.scss` to NASA Red
//     hues — `red-50` (current) and `red-70v` (complete). Only
//     `$theme-step-indicator-segment-color-pending: 'gray-40'` stays a
//     neutral, untouched gray. Upstream ships current-vs-complete as
//     blue-vs-red (two hues); under the HDS theme both are red,
//     differing only in shade.
//   - `$theme-step-indicator-text-pending-color: 'base-dark'` resolves
//     to Carbon 80 (`gray-80`, ≈#2d2d2d per the Carbon-approximation
//     table in `_hds-uswds-theme.scss`) — a fixed dark value, not a
//     `--hds-palette-*` custom property, so pending step labels do not
//     adapt to the surrounding palette.
//   - `$theme-step-indicator-heading-color: 'ink'` (Carbon Black,
//     exact) is likewise fixed rather than palette-aware.
//   - `.usa-step-indicator--no-labels` sets
//     `.usa-step-indicator__segment-label { display: none; }`
//     (`_usa-step-indicator.scss`). That element is also where the
//     authored markup nests each segment's `.usa-sr-only`
//     "completed"/"not completed" text, so `display: none` removes
//     that status text from the accessibility tree, not just the
//     visible label. In this variant, segment state — complete vs.
//     pending — is conveyed by the segment bar's color alone, for
//     sighted and assistive-tech users both. See the WCAG 1.4.1 note
//     in the triage fragment; this is the component's core finding.
//   - The component has no interactive elements at all (`<ol>`/`<li>`/
//     `<span>` only, no links or buttons), so `base/_focus.scss`'s
//     global `:focus-visible` baseline never has anything to attach
//     to — unlike Card or Tooltip, there is no mismatched-ring problem
//     here to report.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, paletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Step Indicator',
  parameters: labParams,
};

// --- Helpers ---

/** A real, public, multi-step NASA process: the FOIA request lifecycle (foia.nasa.gov). */
const foiaSteps = [
  'Submit your request',
  'NASA acknowledges receipt',
  'Records are searched and reviewed',
  'NASA responds with a determination',
];

/**
 * @param {object} options
 * @param {number} options.currentStep 1-indexed current step
 * @param {string} options.modifier    Extra `.usa-step-indicator--*` modifier class
 * @param {string[]} options.steps     Step labels
 */
const stepIndicator = ({ currentStep = 3, modifier = '', steps = foiaSteps } = {}) => {
  const segments = steps
    .map((text, i) => {
      const stepNum = i + 1;
      let className = 'usa-step-indicator__segment';
      let status = '';
      if (stepNum < currentStep) {
        className += ' usa-step-indicator__segment--complete';
        status = ' <span class="usa-sr-only">completed</span>';
      } else if (stepNum === currentStep) {
        className += ' usa-step-indicator__segment--current';
      } else {
        status = ' <span class="usa-sr-only">not completed</span>';
      }
      const ariaCurrent = stepNum === currentStep ? ' aria-current="true"' : '';
      return `
        <li class="${className}"${ariaCurrent}>
          <span class="usa-step-indicator__segment-label">${text}${status}</span>
        </li>`;
    })
    .join('');

  return `
    <div class="usa-step-indicator${modifier ? ` ${modifier}` : ''}">
      <ol class="usa-step-indicator__segments">
        ${segments}
      </ol>
      <div class="usa-step-indicator__header">
        <h4 class="usa-step-indicator__heading">
          <span class="usa-step-indicator__heading-counter">
            <span class="usa-sr-only">Step</span>
            <span class="usa-step-indicator__current-step">${currentStep}</span>
            <span class="usa-step-indicator__total-steps">of ${steps.length}</span>
          </span>
          <span class="usa-step-indicator__heading-text">${steps[currentStep - 1]}</span>
        </h4>
      </div>
    </div>`;
};

const currentStepArgTypes = {
  currentStep: {
    control: 'select',
    options: [1, 2, 3, 4],
    name: 'Current step',
  },
};

// --- Variants ---

export const Default = {
  name: 'Default (with labels)',
  tags: ['!dev', '!test'],
  args: { currentStep: 3 },
  argTypes: currentStepArgTypes,
  render: (args = {}) => stepIndicator(args),
};

export const Counters = {
  name: 'Counters',
  tags: ['!dev', '!test'],
  args: { currentStep: 3 },
  argTypes: currentStepArgTypes,
  render: (args = {}) => stepIndicator({ ...args, modifier: 'usa-step-indicator--counters' }),
};

export const CountersSmall = {
  name: 'Counters, small',
  tags: ['!dev', '!test'],
  render: () => stepIndicator({ currentStep: 3, modifier: 'usa-step-indicator--counters-sm' }),
};

export const NoLabels = {
  name: 'No labels',
  tags: ['!dev', '!test'],
  render: () => stepIndicator({ currentStep: 3, modifier: 'usa-step-indicator--no-labels' }),
};

export const Centered = {
  name: 'Centered',
  tags: ['!dev', '!test'],
  render: () => stepIndicator({ currentStep: 3, modifier: 'usa-step-indicator--center' }),
};

export const ProgressPositions = {
  name: 'Progress positions',
  tags: ['!dev', '!test'],
  render: () =>
    stack([
      block('First step (nothing complete)', stepIndicator({ currentStep: 1 })),
      block('Middle step (some complete, some pending)', stepIndicator({ currentStep: 2 })),
      block('Last step (all prior steps complete)', stepIndicator({ currentStep: 4 })),
    ]),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    stack([
      block('Default (with labels)', stepIndicator(args)),
      block('Counters', stepIndicator({ currentStep: 3, modifier: 'usa-step-indicator--counters' })),
      block('Counters, small', stepIndicator({ currentStep: 3, modifier: 'usa-step-indicator--counters-sm' })),
      block('No labels', stepIndicator({ currentStep: 3, modifier: 'usa-step-indicator--no-labels' })),
      block('Centered', stepIndicator({ currentStep: 3, modifier: 'usa-step-indicator--center' })),
      block(
        'Progress positions',
        stack([
          block('First step', stepIndicator({ currentStep: 1 })),
          block('Middle step', stepIndicator({ currentStep: 2 })),
          block('Last step', stepIndicator({ currentStep: 4 })),
        ]),
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
