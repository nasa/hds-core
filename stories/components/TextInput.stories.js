// ============================================================
// Text Input Stories — @nasa/hds-core
// Covers §5.1, §5.2, §5.3, §5.4, §5.5, §5.8, §5.9
//
// HDS Figma: Text and Select Fields.pdf
// USWDS: https://designsystem.digital.gov/components/text-input/
//
// Sidebar structure:
//   Guidance   — TextInput.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Default, Textarea (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Text Input',
};

// --- Helpers ---

const textInput = ({
  prefix = 'input',
  labelText = 'Text input label',
  type = 'text',
  value = '',
  placeholder = '',
  hint = 'Help text (optional)',
  error = '',
  disabled = false,
  success = false,
  width = '',
  required = false,
  ariaHint = true,
} = {}) => {
  const id = `${prefix}-field`;
  const hintId = `${prefix}-hint`;
  const errorId = `${prefix}-error`;
  const inputClass = [
    'usa-input',
    error ? 'usa-input--error' : '',
    success ? 'usa-input--success' : '',
    width ? `usa-input--${width}` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const groupClass = [
    'usa-form-group',
    error ? 'usa-form-group--error' : '',
    disabled ? 'usa-form-group--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const describedBy = [hint && ariaHint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ');

  return `
    <div class="${groupClass}">
      <label class="usa-label" for="${id}">${labelText}${required ? ' <abbr title="required" class="usa-hint usa-hint--required">*</abbr>' : ''}</label>
      <input
        class="${inputClass}"
        id="${id}"
        name="${id}"
        type="${type}"
        ${value ? `value="${value}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${disabled ? 'disabled' : ''}
        ${required ? 'required' : ''}
        ${describedBy ? `aria-describedby="${describedBy}"` : ''}
      />
      ${hint ? `<span class="usa-hint"${ariaHint ? ` id="${hintId}"` : ''}>${hint}</span>` : ''}
      ${error ? `<span class="usa-error-message" id="${errorId}" role="alert">${error}</span>` : ''}
    </div>
  `;
};

const textareaField = ({
  prefix = 'textarea',
  labelText = 'Textarea label',
  hint = 'Help text (optional)',
  error = '',
  disabled = false,
  required = false,
} = {}) => {
  const id = `${prefix}-field`;
  const hintId = `${prefix}-hint`;
  const errorId = `${prefix}-error`;
  const inputClass = ['usa-textarea', error ? 'usa-input--error' : ''].filter(Boolean).join(' ');
  const groupClass = [
    'usa-form-group',
    error ? 'usa-form-group--error' : '',
    disabled ? 'usa-form-group--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ');

  return `
    <div class="${groupClass}">
      <label class="usa-label" for="${id}">${labelText}${required ? ' <abbr title="required" class="usa-hint usa-hint--required">*</abbr>' : ''}</label>
      <textarea
        class="${inputClass}"
        id="${id}"
        name="${id}"
        ${disabled ? 'disabled' : ''}
        ${required ? 'required' : ''}
        ${describedBy ? `aria-describedby="${describedBy}"` : ''}
      ></textarea>
      ${hint ? `<span class="usa-hint" id="${hintId}">${hint}</span>` : ''}
      ${error ? `<span class="usa-error-message" id="${errorId}" role="alert">${error}</span>` : ''}
    </div>
  `;
};

// --- Stories (visible in sidebar) ---

export const Default = {
  args: {
    labelText: 'Text input label',
    type: 'text',
    placeholder: '',
    hint: 'Help text (optional)',
    error: '',
    disabled: false,
    required: false,
    width: '',
  },
  argTypes: {
    labelText: {
      control: 'text',
      name: 'Label',
      description: 'Label text above the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'tel', 'url', 'password', 'number', 'search'],
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text inside the input',
    },
    hint: {
      control: 'text',
      description: 'Help text below the input',
    },
    error: {
      control: 'text',
      description: 'Error message (empty = no error)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    width: {
      control: 'select',
      options: ['', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Constrain input width',
    },
  },
  render: (args = {}) => {
    const {
      labelText = 'Text input label',
      type = 'text',
      placeholder = '',
      hint = 'Help text (optional)',
      error = '',
      disabled = false,
      required = false,
      width = '',
    } = args;
    return textInput({
      prefix: 'default',
      labelText,
      type,
      placeholder,
      hint,
      error,
      disabled,
      required,
      width,
    });
  },
};

export const Textarea = {
  args: {
    labelText: 'Textarea label',
    hint: 'Help text (optional)',
    error: '',
    disabled: false,
    required: false,
  },
  argTypes: {
    labelText: {
      control: 'text',
      name: 'Label',
      description: 'Label text above the textarea',
    },
    hint: {
      control: 'text',
      description: 'Help text below the textarea',
    },
    error: {
      control: 'text',
      description: 'Error message (empty = no error)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
  },
  render: (args = {}) => {
    const {
      labelText = 'Textarea label',
      hint = 'Help text (optional)',
      error = '',
      disabled = false,
      required = false,
    } = args;
    return textareaField({
      prefix: 'textarea',
      labelText,
      hint,
      error,
      disabled,
      required,
    });
  },
};

// --- Guidance embeds (MDX only) ---

export const Placeholder = {
  tags: ['!dev'],
  render: () =>
    textInput({
      prefix: 'placeholder',
      placeholder: 'e.g., Artemis I',
    }),
};

export const WithValue = {
  tags: ['!dev'],
  render: () =>
    textInput({
      prefix: 'value',
      value: 'James Webb Space Telescope',
    }),
};

export const WithHelpText = {
  tags: ['!dev'],
  render: () =>
    textInput({
      prefix: 'help',
      labelText: 'Email address',
      type: 'email',
      hint: 'e.g., mission-lead@nasa.gov',
    }),
};

export const Disabled = {
  tags: ['!dev'],
  render: () =>
    textInput({
      prefix: 'disabled',
      value: 'Cannot edit',
      disabled: true,
    }),
};

export const Error = {
  tags: ['!dev'],
  render: () =>
    textInput({
      prefix: 'error',
      error: 'Error explanation text',
    }),
};

export const Success = {
  tags: ['!dev'],
  render: () =>
    textInput({
      prefix: 'success',
      value: 'james.green@nasa.gov',
      success: true,
    }),
};

export const Widths = {
  tags: ['!dev'],
  render: () => `
    ${textInput({ prefix: 'w-2xs', labelText: 'Width 2xs (5ex)', width: '2xs', hint: '', ariaHint: false })}
    ${textInput({ prefix: 'w-xs', labelText: 'Width xs (9ex)', width: 'xs', hint: '', ariaHint: false })}
    ${textInput({ prefix: 'w-sm', labelText: 'Width sm (13ex)', width: 'sm', hint: '', ariaHint: false })}
    ${textInput({ prefix: 'w-md', labelText: 'Width md (20ex)', width: 'md', hint: '', ariaHint: false })}
    ${textInput({ prefix: 'w-lg', labelText: 'Width lg (30ex)', width: 'lg', hint: '', ariaHint: false })}
    ${textInput({ prefix: 'w-xl', labelText: 'Width xl (40ex)', width: 'xl', hint: '', ariaHint: false })}
    ${textInput({ prefix: 'w-2xl', labelText: 'Width 2xl (50ex)', width: '2xl', hint: '', ariaHint: false })}
  `,
};

// --- Palette accessibility tests ---

export const PaletteReference = {
  tags: ['!dev'],
  render: () => `
    ${textInput({ prefix: 'pal-default', value: 'James Webb Space Telescope' })}
    ${textInput({ prefix: 'pal-error', error: 'Error explanation text' })}
    ${textInput({ prefix: 'pal-disabled', value: 'Cannot edit', disabled: true })}
  `,
};

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
