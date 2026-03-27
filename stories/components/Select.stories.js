// ============================================================
// Select Stories — @nasa/hds-core
// Covers §5.1, §5.2, §5.3, §5.8, §5.9
//
// HDS Figma: Text and Select Fields.pdf, Dropdown Menus.pdf
// USWDS: https://designsystem.digital.gov/components/select/
//
// Sidebar structure:
//   Components / Select / Guidance  — Select.mdx
//   Components / Select / Playground — interactive story with controls
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/Select',
};

// --- Helpers ---

const label = (text) => `<p class="hds-label" style="margin-bottom: 0.5rem">${text}</p>`;

const selectField = ({
  prefix = 'select',
  label: labelText = 'Topic',
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
    .map((opt) => `<option value="${opt.value}"${opt.value === selected ? ' selected' : ''}>${opt.label}</option>`)
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

const topicOptions = [
  { value: 'humans', label: 'Humans in Space' },
  { value: 'moon', label: 'Moon to Mars' },
  { value: 'earth', label: 'Earth' },
  { value: 'solar', label: 'Solar System' },
  { value: 'universe', label: 'Universe' },
];

const centerOptions = [
  { value: 'ames', label: 'Ames Research Center' },
  { value: 'armstrong', label: 'Armstrong Flight Research Center' },
  { value: 'glenn', label: 'Glenn Research Center' },
  { value: 'goddard', label: 'Goddard Space Flight Center' },
  { value: 'jpl', label: 'Jet Propulsion Laboratory' },
  { value: 'johnson', label: 'Johnson Space Center' },
  { value: 'kennedy', label: 'Kennedy Space Center' },
  { value: 'langley', label: 'Langley Research Center' },
  { value: 'marshall', label: 'Marshall Space Flight Center' },
  { value: 'stennis', label: 'Stennis Space Center' },
];

// --- Guidance embeds (hidden from sidebar) ---

export const Default = {
  tags: ['!dev'],
  render: () =>
    selectField({
      prefix: 'default',
      options: topicOptions,
    }),
};

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
      label: 'Mission type',
      hint: 'Choose the primary mission category',
      options: [
        { value: 'crewed', label: 'Crewed' },
        { value: 'robotic', label: 'Robotic' },
        { value: 'flyby', label: 'Flyby' },
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
      label: 'NASA center',
      options: centerOptions,
      hint: 'Use a select field when there are 7 or more options',
    }),
};

// Most visually complex variant for palette testing
export const PaletteReference = {
  tags: ['!dev'],
  render: () => `
    ${selectField({ prefix: 'pal-default', options: topicOptions, selected: 'humans' })}
    ${selectField({ prefix: 'pal-error', options: topicOptions, error: 'Error explanation text' })}
    ${selectField({ prefix: 'pal-disabled', options: [], disabled: true })}
  `,
};

// --- Palette accessibility tests (hidden from sidebar) ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(PaletteReference.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(PaletteReference.render, 'hover'),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(PaletteReference.render, 'focus-visible'),
};

// --- Playground (visible in sidebar) ---

export const Playground = {
  name: 'Playground',
  argTypes: {
    label: {
      control: 'text',
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
      description: 'Which option set to display',
    },
  },
  args: {
    label: 'Topic',
    hint: 'Help text (optional)',
    error: '',
    disabled: false,
    required: false,
    optionSet: 'topics',
  },
  render: (args) =>
    selectField({
      prefix: 'playground',
      label: args.label,
      hint: args.hint,
      error: args.error,
      disabled: args.disabled,
      required: args.required,
      options: args.optionSet === 'centers' ? centerOptions : topicOptions,
    }),
};
