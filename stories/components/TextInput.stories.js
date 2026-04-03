// ============================================================
// Text Input Stories — @nasa/hds-core
// CSS: components/_form.scss
//
// Sidebar structure:
//   Guidance   — TextInput.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Default, Textarea, All Variants
//              (visible in sidebar)
// ============================================================

import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Text Input',
};

// --- Helpers ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

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

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
  },
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

export const AllVariants = {
  name: 'All Variants',
  render: (args = {}) => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('With value')}
        <div style="margin-top: 0.5rem;">
          ${textInput({ prefix: 'av-value', value: 'James Webb Space Telescope' })}
        </div>
      </div>
      <div>
        ${label('Error')}
        <div style="margin-top: 0.5rem;">
          ${textInput({ prefix: 'av-error', error: 'Error explanation text' })}
        </div>
      </div>
      <div>
        ${label('Disabled')}
        <div style="margin-top: 0.5rem;">
          ${textInput({ prefix: 'av-disabled', value: 'Cannot edit', disabled: true })}
        </div>
      </div>
      <div>
        ${label('Textarea')}
        <div style="margin-top: 0.5rem;">
          ${textareaField({ prefix: 'av-textarea' })}
        </div>
      </div>
    </div>
  `,
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

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(AllVariants.render),
};

// --- Focus tests (Chromatic modes + play function) ---

export const FocusTextInput = {
  name: 'Focus [text input]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () =>
    textInput({
      prefix: 'focus',
      hint: '',
      ariaHint: false,
    }),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const input = canvas.getByRole('textbox', { name: 'Text input label' });
    await expect(input).toHaveFocus();
  },
};
