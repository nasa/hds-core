// ============================================================
// Icon Button Stories — @nasa/hds-core
// Covers §12 (HDS icon buttons, Tier 3)
//
// Sidebar structure:
//   Guidance   — IconButton.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — CTA, Secondary, Outline, Utility, Social,
//              Interactive, States (visible in sidebar)
// ============================================================

import { hdsUiIcons, uswdsUniqueIcons } from '../helpers/icons';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Icon Button',
};

// --- Helpers (used in multiple stories) ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

const grid = (items) => `
  <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">
    ${items}
  </div>`;

const gridItem = (labelText, content) => `
  <div style="min-width: 5rem; text-align: center;">
    ${label(labelText)}
    <div style="margin-top: 0.5rem;">${content}</div>
  </div>`;

const iconSvg = (name, sprite = 'hds') => {
  const path = sprite === 'uswds' ? '/assets/img/sprite.svg' : '/assets/img/hds-sprite.svg';
  return `
    <svg class="hds-icon" aria-hidden="true" focusable="false">
      <use xlink:href="${path}#${name}"></use>
    </svg>`;
};

const iconBtn = (role, iconName, ariaLabel, opts = {}) => {
  const sizeClass = opts.size && opts.size !== 'default' ? ` hds-btn-icon--${opts.size}` : '';
  const disabled = opts.disabled ? ' disabled' : '';
  const cls = `hds-btn-icon hds-btn-icon--${role}${sizeClass}`;
  const sprite = opts.sprite || 'hds';

  if (opts.element === 'a') {
    return `<a class="${cls}" href="#" aria-label="${ariaLabel}">${iconSvg(iconName, sprite)}</a>`;
  }
  return `<button class="${cls}" type="button" aria-label="${ariaLabel}"${disabled}>${iconSvg(iconName, sprite)}</button>`;
};

// Shared argTypes for icon button role stories
const sharedArgTypes = {
  ariaLabel: {
    control: 'text',
    name: 'aria-label',
    description: 'Required — icon buttons have no visible text',
  },
  spriteSource: {
    control: 'radio',
    options: ['HDS', 'USWDS'],
    name: 'Sprite source',
    description: 'Which icon sprite to pull from',
  },
  hdsIcon: {
    control: 'select',
    options: hdsUiIcons,
    name: 'Icon (HDS)',
    if: { arg: 'spriteSource', eq: 'HDS' },
  },
  uswdsIcon: {
    control: 'select',
    options: uswdsUniqueIcons,
    name: 'Icon (USWDS)',
    if: { arg: 'spriteSource', eq: 'USWDS' },
  },
  size: {
    control: 'select',
    options: ['2xs', 'xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'],
    description: 'Button size — default is 24px (no class)',
  },
  disabled: {
    control: 'boolean',
    description: 'Disabled state',
  },
  element: {
    control: 'radio',
    options: ['button', 'a'],
    description: '<button> for actions, <a> for navigation',
  },
};

// Shared render factory — builds a render function for a given role
const roleRender =
  (role) =>
  (args = {}) => {
    const isUswds = args.spriteSource === 'USWDS';
    const iconName = isUswds ? args.uswdsIcon : args.hdsIcon;
    const sprite = isUswds ? 'uswds' : 'hds';
    return iconBtn(role, iconName, args.ariaLabel, {
      size: args.size,
      disabled: args.disabled,
      element: args.element,
      sprite,
    });
  };

// Hoisted for States story — avoids label: parse ambiguity
const stateRoles = [
  { role: 'cta', iconName: 'arrow-line-right', text: 'CTA' },
  { role: 'secondary', iconName: 'download', text: 'Secondary' },
  { role: 'outline', iconName: 'share', text: 'Outline' },
  { role: 'utility', iconName: 'settings', text: 'Utility' },
  { role: 'social', iconName: 'rss', text: 'Social' },
];

// --- Stories (visible in sidebar) ---

export const CTA = {
  name: 'CTA',
  args: {
    ariaLabel: 'Navigate to page',
    spriteSource: 'HDS',
    hdsIcon: 'arrow-line-right',
    uswdsIcon: 'search',
    size: 'default',
    disabled: false,
    element: 'button',
  },
  argTypes: sharedArgTypes,
  render: roleRender('cta'),
};

export const Secondary = {
  name: 'Secondary',
  args: {
    ariaLabel: 'Download file',
    spriteSource: 'HDS',
    hdsIcon: 'download',
    uswdsIcon: 'search',
    size: 'default',
    disabled: false,
    element: 'button',
  },
  argTypes: sharedArgTypes,
  render: roleRender('secondary'),
};

export const Outline = {
  name: 'Outline',
  args: {
    ariaLabel: 'Share page',
    spriteSource: 'HDS',
    hdsIcon: 'share',
    uswdsIcon: 'search',
    size: 'default',
    disabled: false,
    element: 'button',
  },
  argTypes: sharedArgTypes,
  render: roleRender('outline'),
};

export const Utility = {
  name: 'Utility',
  args: {
    ariaLabel: 'Settings',
    spriteSource: 'HDS',
    hdsIcon: 'settings',
    uswdsIcon: 'search',
    size: 'default',
    disabled: false,
    element: 'button',
  },
  argTypes: sharedArgTypes,
  render: roleRender('utility'),
};

export const Social = {
  name: 'Social',
  args: {
    ariaLabel: 'RSS feed',
    spriteSource: 'HDS',
    hdsIcon: 'rss',
    uswdsIcon: 'search',
    size: 'default',
    disabled: false,
    element: 'button',
  },
  argTypes: sharedArgTypes,
  render: roleRender('social'),
};

export const Interactive = {
  name: 'Interactive',
  args: {
    ariaLabel: 'More info',
    spriteSource: 'HDS',
    hdsIcon: 'info',
    uswdsIcon: 'search',
  },
  argTypes: {
    ariaLabel: sharedArgTypes.ariaLabel,
    spriteSource: sharedArgTypes.spriteSource,
    hdsIcon: sharedArgTypes.hdsIcon,
    uswdsIcon: sharedArgTypes.uswdsIcon,
  },
  render: (args = {}) => {
    const isUswds = args.spriteSource === 'USWDS';
    const iconName = isUswds ? args.uswdsIcon : args.hdsIcon;
    const sprite = isUswds ? 'uswds' : 'hds';
    return iconBtn('interactive', iconName, args.ariaLabel, { sprite });
  },
};

export const States = {
  name: 'States (all roles)',
  render: () => {
    const header = `
      <div style="display: grid; grid-template-columns: 7rem repeat(2, 5rem); gap: 1rem; align-items: center; margin-bottom: 0.75rem;">
        <div></div>
        ${label('Default')}
        ${label('Disabled')}
      </div>`;

    const rows = stateRoles
      .map(
        (r) => `
      <div style="display: grid; grid-template-columns: 7rem repeat(2, 5rem); gap: 1rem; align-items: center;">
        ${label(r.text)}
        <div>${iconBtn(r.role, r.iconName, `${r.text} default`)}</div>
        <div>${iconBtn(r.role, r.iconName, `${r.text} disabled`, { disabled: true })}</div>
      </div>`,
      )
      .join('');

    return `
      ${header}
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${rows}
      </div>
      <p style="margin-top: 1.5rem; font-size: 14px; color: var(--hds-palette-muted, #717171);">
        Hover states require mouse interaction — hover each button above to preview.
        <strong>Interactive</strong> role omitted (fixed-color SVG, no state changes).
        Active matches hover on all roles.
      </p>
    `;
  },
};

// --- Guidance embeds (MDX only) ---

export const AllRoles = {
  name: 'All roles',
  tags: ['!dev'],
  render: () => `
    ${grid(`
      ${gridItem('CTA', iconBtn('cta', 'arrow-line-right', 'Navigate to page'))}
      ${gridItem('Secondary', iconBtn('secondary', 'download', 'Download file'))}
      ${gridItem('Outline', iconBtn('outline', 'share', 'Share page'))}
      ${gridItem('Utility', iconBtn('utility', 'settings', 'Settings'))}
      ${gridItem('Social', iconBtn('social', 'rss', 'RSS feed'))}
      ${gridItem('Interactive', iconBtn('interactive', 'info', 'More info'))}
    `)}
    <p style="margin-top: 1.5rem; font-size: 14px; color: var(--hds-palette-muted, #717171);">
      <strong>Red</strong> = navigates away · <strong>Blue</strong> = stays on page · <strong>Neutral</strong> = UI controls
    </p>
  `,
};

export const Sizes = {
  name: 'Sizes',
  tags: ['!dev'],
  render: () =>
    grid(`
      ${gridItem('2XS (12px)', iconBtn('secondary', 'play', 'Play', { size: '2xs' }))}
      ${gridItem('XS (16px)', iconBtn('secondary', 'play', 'Play', { size: 'xs' }))}
      ${gridItem('SM (20px)', iconBtn('secondary', 'play', 'Play', { size: 'sm' }))}
      ${gridItem('Default (24px)', iconBtn('secondary', 'play', 'Play'))}
      ${gridItem('LG (28px)', iconBtn('secondary', 'play', 'Play', { size: 'lg' }))}
      ${gridItem('XL (32px)', iconBtn('secondary', 'play', 'Play', { size: 'xl' }))}
      ${gridItem('2XL (36px)', iconBtn('secondary', 'play', 'Play', { size: '2xl' }))}
      ${gridItem('3XL (40px)', iconBtn('secondary', 'play', 'Play', { size: '3xl' }))}
    `),
};

export const SocialRow = {
  name: 'Social row',
  tags: ['!dev'],
  render: () =>
    grid(`
      ${iconBtn('social', 'notification', 'Notifications', { element: 'a', size: 'xl' })}
      ${iconBtn('social', 'rss', 'RSS feed', { element: 'a', size: 'xl' })}
      ${iconBtn('social', 'share', 'Share', { element: 'a', size: 'xl' })}
    `),
};

export const ActionBar = {
  name: 'Action bar',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; gap: 0.75rem;">
      ${iconBtn('secondary', 'download', 'Download')}
      ${iconBtn('outline', 'print', 'Print')}
      ${iconBtn('utility', 'expand', 'Expand')}
    </div>
  `,
};

export const CTAWithText = {
  name: 'CTA with adjacent text',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-weight: 600;">Explore the mission</span>
      ${iconBtn('cta', 'arrow-line-right', 'Go to mission page', { size: 'sm', element: 'a' })}
    </div>
  `,
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllRoles.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(AllRoles.render),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible },
  render: paletteRender(AllRoles.render),
};

export const PaletteA11yDisabled = {
  name: 'Palette a11y [disabled]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(States.render),
};

export const PaletteA11yStates = {
  name: 'Palette a11y [states]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(States.render),
};
