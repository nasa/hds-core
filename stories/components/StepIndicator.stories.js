// ============================================================
// Step Indicator Stories — @nasa-hds/core
// CSS: components/_step-indicator.scss
//
// Sidebar structure:
//   Guidance   — StepIndicator.mdx
//   Stories    — Default, Condensed, Error state,
//                All Variants (visible in sidebar)
//
// No focus or hover tests: the step indicator is presentational.
// Nothing inside it is focusable or hoverable (navigation controls
// sit outside it), so it ships neither a Focus story nor
// PaletteA11yHover. Their absence is intentional.
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/Step Indicator',
  tags: ['status:experimental'],
};

// --- Helpers ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

// Hoisted to module scope with a `text` key: a `label:` key inside a
// render function breaks the Storybook indexer.
const internshipSteps = [
  { text: 'Personal information', caption: 'Name and contact details' },
  { text: 'Academic background', caption: 'School, major, and GPA' },
  { text: 'Opportunity preferences', caption: 'NASA centers and topics' },
  { text: 'Review and submit', caption: 'Check your answers' },
];

const statusText = {
  complete: 'completed',
  error: 'not completed, has errors',
  upcoming: 'not completed',
};

const stepState = (stepNum, currentStep, errorStep) => {
  if (stepNum === currentStep) return 'current';
  if (stepNum === errorStep) return 'error';
  if (stepNum < currentStep) return 'complete';
  return 'upcoming';
};

const segment = (step, state, showCaption) => {
  const modifier = state === 'upcoming' ? '' : ` usa-step-indicator__segment--${state}`;
  const ariaCurrent = state === 'current' ? ' aria-current="true"' : '';
  const sr = state === 'current' ? '' : ` <span class="usa-sr-only">${statusText[state]}</span>`;
  const caption = showCaption ? `\n    <span class="usa-step-indicator__segment-caption">${step.caption}</span>` : '';
  return `
  <li class="usa-step-indicator__segment${modifier}"${ariaCurrent}>
    <span class="usa-step-indicator__segment-label">${step.text}${sr}</span>${caption}
  </li>`;
};

const stepCounter = (currentStep, total) => `
  <div class="usa-step-indicator__header">
    <p class="usa-step-indicator__heading">
      <span class="usa-step-indicator__heading-counter">Step
        <span class="usa-step-indicator__current-step">${currentStep}</span>
        <span class="usa-step-indicator__total-steps">of ${total}</span>
      </span>
    </p>
  </div>`;

const stepIndicator = ({
  steps = internshipSteps,
  currentStep = 2,
  errorStep = 0,
  condensed = false,
  showCaptions = true,
} = {}) => {
  const segments = steps
    .map((step, i) => segment(step, stepState(i + 1, currentStep, errorStep), showCaptions))
    .join('');
  const classes = condensed ? 'usa-step-indicator usa-step-indicator--condensed' : 'usa-step-indicator';
  // The "Step X of Y" line belongs to the condensed form. The default
  // form below tablet width collapses to condensed bars without it;
  // the page <h1> carries the step title.
  const header = condensed ? stepCounter(currentStep, steps.length) : '';
  return `
<div class="${classes}" aria-label="progress">
  <ol class="usa-step-indicator__segments">${segments}
  </ol>${header}
</div>`;
};

// Legacy USWDS markup, verbatim: header with the counter circle and
// heading text, no captions. Shows what a USWDS site carries over.
const legacyUSWDS = () => `
<div class="usa-step-indicator" aria-label="progress">
  <ol class="usa-step-indicator__segments">
    <li class="usa-step-indicator__segment usa-step-indicator__segment--complete">
      <span class="usa-step-indicator__segment-label">Personal information <span class="usa-sr-only">completed</span></span>
    </li>
    <li class="usa-step-indicator__segment usa-step-indicator__segment--complete">
      <span class="usa-step-indicator__segment-label">Academic background <span class="usa-sr-only">completed</span></span>
    </li>
    <li class="usa-step-indicator__segment usa-step-indicator__segment--current" aria-current="true">
      <span class="usa-step-indicator__segment-label">Opportunity preferences</span>
    </li>
    <li class="usa-step-indicator__segment">
      <span class="usa-step-indicator__segment-label">Review and submit <span class="usa-sr-only">not completed</span></span>
    </li>
  </ol>
  <div class="usa-step-indicator__header">
    <h4 class="usa-step-indicator__heading">
      <span class="usa-step-indicator__heading-counter">
        <span class="usa-sr-only">Step</span>
        <span class="usa-step-indicator__current-step">3</span>
        <span class="usa-step-indicator__total-steps">of 4</span>
      </span>
      <span class="usa-step-indicator__heading-text">Opportunity preferences</span>
    </h4>
  </div>
</div>`;

const currentStepArgType = {
  currentStep: {
    control: { type: 'range', min: 1, max: internshipSteps.length, step: 1 },
    name: 'Current step',
  },
};

// --- Stories (visible in sidebar) ---

export const Default = {
  name: 'Default',
  args: { currentStep: 2, showCaptions: true },
  argTypes: {
    ...currentStepArgType,
    showCaptions: { control: 'boolean', name: 'Show captions' },
  },
  render: (args = {}) => {
    const { currentStep = 2, showCaptions = true } = args;
    return stepIndicator({ currentStep, showCaptions });
  },
};

export const Condensed = {
  name: 'Condensed',
  args: { currentStep: 2 },
  argTypes: currentStepArgType,
  render: (args = {}) => {
    const { currentStep = 2 } = args;
    return stepIndicator({ currentStep, condensed: true });
  },
};

export const ErrorState = {
  name: 'Error state',
  args: { currentStep: 3, errorStep: 2 },
  argTypes: {
    ...currentStepArgType,
    errorStep: {
      control: { type: 'range', min: 1, max: internshipSteps.length, step: 1 },
      name: 'Step with errors',
    },
  },
  render: (args = {}) => {
    const { currentStep = 3, errorStep = 2 } = args;
    return stepIndicator({ currentStep, errorStep });
  },
};

export const AllVariants = {
  name: 'All Variants',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('Default — first step')}
        <div style="margin-top: 0.5rem;">${stepIndicator({ currentStep: 1 })}</div>
      </div>
      <div>
        ${label('Default — complete, current, upcoming')}
        <div style="margin-top: 0.5rem;">${stepIndicator({ currentStep: 3 })}</div>
      </div>
      <div>
        ${label('Default — error')}
        <div style="margin-top: 0.5rem;">${stepIndicator({ currentStep: 3, errorStep: 2 })}</div>
      </div>
      <div>
        ${label('Default — no captions')}
        <div style="margin-top: 0.5rem;">${stepIndicator({ currentStep: 4, showCaptions: false })}</div>
      </div>
      <div>
        ${label('Condensed')}
        <div style="margin-top: 0.5rem;">${stepIndicator({ currentStep: 2, condensed: true })}</div>
      </div>
      <div>
        ${label('Condensed — error')}
        <div style="margin-top: 0.5rem;">${stepIndicator({ currentStep: 3, errorStep: 1, condensed: true })}</div>
      </div>
      <div>
        ${label('Legacy USWDS markup')}
        <div style="margin-top: 0.5rem;">${legacyUSWDS()}</div>
      </div>
    </div>
  `,
};

// --- Guidance embeds (MDX Canvas targets, hidden from sidebar) ---

// Recommended page structure: the stepper sits above the page <h1>,
// which carries the step title, so no USWDS header is needed.
export const InContext = {
  name: 'In a multi-page form',
  tags: ['!dev'],
  render: () => `
    <p class="hds-overline">NASA Internship application</p>
    ${stepIndicator({ currentStep: 2, showCaptions: false })}
    <h1 class="hds-h2" style="margin-top: 2rem;">Academic background</h1>
  `,
};

// Many steps: the condensed form keeps a long process to one row.
const manySteps = [
  { text: 'Eligibility', caption: '' },
  { text: 'Personal information', caption: '' },
  { text: 'Citizenship', caption: '' },
  { text: 'Academic background', caption: '' },
  { text: 'Transcripts', caption: '' },
  { text: 'Opportunity preferences', caption: '' },
  { text: 'References', caption: '' },
  { text: 'Essay', caption: '' },
  { text: 'Review and submit', caption: '' },
];

export const CondensedManySteps = {
  name: 'Condensed, many steps',
  tags: ['!dev'],
  render: () => stepIndicator({ steps: manySteps, currentStep: 5, condensed: true, showCaptions: false }),
};

// Legacy USWDS markup rendered under HDS (see legacyUSWDS above).
export const LegacyUSWDS = {
  name: 'Legacy USWDS markup',
  tags: ['!dev'],
  render: () => legacyUSWDS(),
};

// --- Palette accessibility tests ---
// Default state only. No PaletteA11yHover: nothing is hoverable.

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllVariants.render),
};
