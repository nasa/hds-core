// ============================================================
// Select Stories — @nasa/hds-core
// Covers §5.1, §5.2, §5.3, §5.8, §5.9
//
// HDS Figma: Text and Select Fields.pdf, Dropdown Menus.pdf
// USWDS: https://designsystem.digital.gov/components/select/
//
// Sidebar structure:
//   Guidance   — Select.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Default (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Select',
};

// --- Helpers ---

const selectField = ({
  prefix = 'select',
  labelText = 'Topic',
  options = [],
  selected = '',
  hint = 'Help text (optional)',
  error = '',
  disabled = false,
  required = false,
  ariaHint = true,
} = {}) => {
  const id = `${prefix}-field`;
  const hintId = `${prefix}-hint`;
  const errorId = `${prefix}-error`;
  const selectClass = ['usa-select', error ? 'usa-input--error' : ''].filter(Boolean).join(' ');
  const groupClass = [
    'usa-form-group',
    error ? 'usa-form-group--error' : '',
    disabled ? 'usa-form-group--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const describedBy = [hint && ariaHint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ');

  const optionsHtml = options
    .map((opt) => `<option value="${opt.value}"${opt.value === selected ? ' selected' : ''}>${opt.text}</option>`)
    .join('');

  return `
    <form class="usa-form">
      <div class="${groupClass}">
        <label class="usa-label" for="${id}">${labelText}${required ? ' <abbr title="required" class="usa-hint usa-hint--required">*</abbr>' : ''}</label>
        <select
          class="${selectClass}"
          name="${id}"
          id="${id}"
          ${disabled ? 'disabled' : ''}
          ${required ? 'required' : ''}
          ${describedBy ? `aria-describedby="${describedBy}"` : ''}
        >
          <option value>- Select -</option>
          ${optionsHtml}
        </select>
        ${hint ? `<span class="usa-hint"${ariaHint ? ` id="${hintId}"` : ''}>${hint}</span>` : ''}
        ${error ? `<span class="usa-error-message" id="${errorId}" role="alert">${error}</span>` : ''}
      </div>
    </form>
  `;
};

// Hoisted to module scope — .label renamed to .text (parser safety)
const topicOptions = [
  { value: 'humans', text: 'Humans in Space' },
  { value: 'moon', text: 'Moon to Mars' },
  { value: 'earth', text: 'Earth' },
  { value: 'solar', text: 'Solar System' },
  { value: 'universe', text: 'Universe' },
];

const centerOptions = [
  { value: 'ames', text: 'Ames Research Center' },
  { value: 'armstrong', text: 'Armstrong Flight Research Center' },
  { value: 'glenn', text: 'Glenn Research Center' },
  { value: 'goddard', text: 'Goddard Space Flight Center' },
  { value: 'jpl', text: 'Jet Propulsion Laboratory' },
  { value: 'johnson', text: 'Johnson Space Center' },
  { value: 'kennedy', text: 'Kennedy Space Center' },
  { value: 'langley', text: 'Langley Research Center' },
  { value: 'marshall', text: 'Marshall Space Flight Center' },
  { value: 'stennis', text: 'Stennis Space Center' },
];

// --- Stories (visible in sidebar) ---

export const Default = {
  args: {
    labelText: 'Topic',
    hint: 'Help text (optional)',
    error: '',
    disabled: false,
    required: false,
    optionSet: 'topics',
  },
  argTypes: {
    labelText: {
      control: 'text',
      name: 'Label',
      description: 'Label text above the select',
    },
    hint: {
      control: 'text',
      description: 'Help text below the select',
    },
    error: {
      control: 'text',
      description: 'Error message (empty = no error)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    optionSet: {
      control: 'select',
      options: ['topics', 'centers'],
      name: 'Option set',
      description: 'Which option set to display — use "centers" to test long lists',
    },
  },
  render: (args = {}) => {
    const {
      labelText = 'Topic',
      hint = 'Help text (optional)',
      error = '',
      disabled = false,
      required = false,
      optionSet = 'topics',
    } = args;
    return selectField({
      prefix: 'default',
      labelText,
      hint,
      error,
      disabled,
      required,
      options: optionSet === 'centers' ? centerOptions : topicOptions,
    });
  },
};

// --- Guidance embeds (MDX only) ---

export const WithValue = {
  tags: ['!dev'],
  render: () =>
    selectField({
      prefix: 'value',
      options: topicOptions,
      selected: 'humans',
    }),
};

export const WithHelpText = {
  tags: ['!dev'],
  render: () =>
    selectField({
      prefix: 'help',
      labelText: 'Mission type',
      hint: 'Choose the primary mission category',
      options: [
        { value: 'crewed', text: 'Crewed' },
        { value: 'robotic', text: 'Robotic' },
        { value: 'flyby', text: 'Flyby' },
      ],
    }),
};

export const Disabled = {
  tags: ['!dev'],
  render: () =>
    selectField({
      prefix: 'disabled',
      options: [],
      disabled: true,
    }),
};

export const Error = {
  tags: ['!dev'],
  render: () =>
    selectField({
      prefix: 'error',
      options: topicOptions,
      error: 'Error explanation text',
    }),
};

export const ManyOptions = {
  tags: ['!dev'],
  render: () =>
    selectField({
      prefix: 'many',
      labelText: 'NASA center',
      options: centerOptions,
      hint: 'Use a select field when there are 7 or more options',
    }),
};

export const PaletteReference = {
  tags: ['!dev'],
  render: () => `
    ${selectField({ prefix: 'pal-default', options: topicOptions, selected: 'humans' })}
    ${selectField({ prefix: 'pal-error', options: topicOptions, error: 'Error explanation text' })}
    ${selectField({ prefix: 'pal-disabled', options: [], disabled: true })}
  `,
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(PaletteReference.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(PaletteReference.render),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible },
  render: paletteRender(PaletteReference.render),
};
