// ============================================================
// Icon Button Stories — @nasa-hds/core
// CSS: components/_icon-button.scss
//
// Sidebar structure:
//   Guidance   — IconButton.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — CTA, Secondary, Outline, Utility, Social,
//              Interactive, All Variants (visible in sidebar)
// ============================================================

import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';
import { hdsUiIcons, hdsSocialIcons, uswdsUniqueIcons } from '../helpers/icons';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Icon Button',
};

// --- Helpers ---

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
  const path = sprite === 'uswds' ? 'assets/img/sprite.svg' : 'assets/img/hds-sprite.svg';
  return `
    <svg class="hds-icon" aria-hidden="true" focusable="false">
      <use xlink:href="${path}#${name}"></use>
    </svg>`;
};

const iconBtn = (role, iconName, ariaLabel, opts = {}) => {
  const sizeClass = opts.size && opts.size !== 'default' ? ` hds-btn-icon--${opts.size}` : '';
  const disabled = opts.disabled ? ' disabled' : '';
  const expanded = opts.expanded != null ? ` aria-expanded="${opts.expanded}"` : '';
  const cls = `hds-btn-icon hds-btn-icon--${role}${sizeClass}`;
  const sprite = opts.sprite || 'hds';

  if (opts.element === 'a') {
    return `<a class="${cls}" href="#" aria-label="${ariaLabel}"${expanded}>${iconSvg(iconName, sprite)}</a>`;
  }
  return `<button class="${cls}" type="button" aria-label="${ariaLabel}"${disabled}${expanded}>${iconSvg(iconName, sprite)}</button>`;
};

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
      expanded: args.expanded,
      sprite,
    });
  };

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
  },
};

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
    ariaLabel: 'Next slide',
    spriteSource: 'HDS',
    hdsIcon: 'arrow-chevron-right',
    uswdsIcon: 'search',
    size: '3xl',
    disabled: false,
    element: 'button',
  },
  argTypes: sharedArgTypes,
  render: roleRender('utility'),
};

export const Social = {
  name: 'Social',
  args: {
    ariaLabel: 'NASA on Facebook',
    spriteSource: 'HDS',
    hdsIcon: 'logo-facebook',
    uswdsIcon: 'search',
    size: 'xl',
    disabled: false,
    element: 'a',
  },
  argTypes: {
    ...sharedArgTypes,
    hdsIcon: { ...sharedArgTypes.hdsIcon, options: hdsSocialIcons },
  },
  render: roleRender('social'),
};

export const Interactive = {
  name: 'Interactive',
  args: {
    ariaLabel: 'More info',
    spriteSource: 'HDS',
    hdsIcon: 'plus',
    uswdsIcon: 'search',
    size: 'default',
    expanded: false,
  },
  argTypes: {
    ariaLabel: sharedArgTypes.ariaLabel,
    spriteSource: sharedArgTypes.spriteSource,
    hdsIcon: sharedArgTypes.hdsIcon,
    uswdsIcon: sharedArgTypes.uswdsIcon,
    size: sharedArgTypes.size,
    expanded: {
      control: 'boolean',
      description: 'aria-expanded — controls active/open visual state',
    },
  },
  render: (args = {}) => {
    const isUswds = args.spriteSource === 'USWDS';
    const iconName = isUswds ? args.uswdsIcon : args.hdsIcon;
    const sprite = isUswds ? 'uswds' : 'hds';
    return iconBtn('interactive', iconName, args.ariaLabel, {
      size: args.size,
      expanded: args.expanded,
      sprite,
    });
  },
};

export const AllVariants = {
  name: 'All Variants',
  render: (args = {}) => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        ${label('Roles')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('CTA', iconBtn('cta', 'arrow-line-right', 'Navigate'))}
            ${gridItem('Secondary', iconBtn('secondary', 'download', 'Download'))}
            ${gridItem('Outline', iconBtn('outline', 'share', 'Share'))}
            ${gridItem('Utility', iconBtn('utility', 'settings', 'Settings'))}
            ${gridItem('Social', iconBtn('social', 'logo-facebook', 'NASA on Facebook', { element: 'a' }))}
            ${gridItem('Interactive', iconBtn('interactive', 'plus', 'More info'))}
          `)}
        </div>
      </div>
      <div>
        ${label('Disabled')}
        <div style="margin-top: 0.5rem;">
          ${grid(`
            ${gridItem('CTA', iconBtn('cta', 'arrow-line-right', 'Navigate', { disabled: true }))}
            ${gridItem('Secondary', iconBtn('secondary', 'download', 'Download', { disabled: true }))}
            ${gridItem('Outline', iconBtn('outline', 'share', 'Share', { disabled: true }))}
            ${gridItem('Utility', iconBtn('utility', 'settings', 'Settings', { disabled: true }))}
            ${gridItem('Social', iconBtn('social', 'logo-facebook', 'NASA on Facebook', { disabled: true }))}
            ${gridItem('Expanded', iconBtn('interactive', 'minus', 'Close', { expanded: true }))}
          `)}
        </div>
      </div>
    </div>
  `,
};

// --- Guidance embeds (MDX only) ---

export const InteractiveStates = {
  name: 'Interactive states',
  tags: ['!dev'],
  render: () => `
    ${grid(`
      ${gridItem('Default', iconBtn('interactive', 'plus', 'More info'))}
      ${gridItem('Expanded', iconBtn('interactive', 'minus', 'Close info', { expanded: true }))}
    `)}
    <p style="margin-top: 1rem; font-size: 14px; color: var(--hds-palette-muted, #717171);">
      Toggle <code>aria-expanded</code> to control the active/open state.
      Hover any button to preview the inverted treatment.
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

// Accessible names for every social mark, written to be copied as-is.
// Telegram and WhatsApp are share targets on NASA+, not NASA accounts.
const socialLabels = {
  'logo-android': 'NASA app for Android',
  'logo-apple': 'NASA app on the App Store',
  'logo-apple-podcasts': 'NASA podcasts on Apple Podcasts',
  'logo-facebook': 'NASA on Facebook',
  'logo-flickr': 'NASA on Flickr',
  'logo-giphy': 'NASA on Giphy',
  'logo-github': 'NASA on GitHub',
  'logo-google-play': 'NASA app on Google Play',
  'logo-instagram': 'NASA on Instagram',
  'logo-linkedin': 'NASA on LinkedIn',
  'logo-pinterest': 'NASA on Pinterest',
  'logo-reddit': 'NASA on Reddit',
  'logo-snapchat': 'NASA on Snapchat',
  'logo-soundcloud': 'NASA on SoundCloud',
  'logo-spotify': 'NASA on Spotify',
  'logo-telegram': 'Share on Telegram',
  'logo-threads': 'NASA on Threads',
  'logo-tiktok': 'NASA on TikTok',
  'logo-tumblr': 'NASA on Tumblr',
  'logo-twitch': 'NASA on Twitch',
  'logo-whatsapp': 'Share on WhatsApp',
  'logo-x': 'NASA on X',
  'logo-youtube': 'NASA on YouTube',
};

const socialBtn = (name) => iconBtn('social', name, socialLabels[name], { element: 'a', size: 'xl' });

const socialRow = `
  <ul class="usa-button-group">
    ${['logo-facebook', 'logo-instagram', 'logo-x', 'logo-youtube', 'logo-linkedin']
      .map((n) => `<li class="usa-button-group__item">${socialBtn(n)}</li>`)
      .join('')}
  </ul>`;

export const SocialRow = {
  name: 'Social row',
  tags: ['!dev'],
  render: () => socialRow,
};

export const SocialAllPlatforms = {
  name: 'Social platforms',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; max-width: 72em;">
      ${hdsSocialIcons
        .map(
          (n) => `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem 0.5rem; min-width: 6rem;">
          ${socialBtn(n)}
          <code style="font-size: 0.65rem; word-break: break-all; opacity: 0.7;">${n}</code>
        </div>`,
        )
        .join('')}
    </div>`,
};

const shareTargets = [
  ['share', 'Share this page'],
  ['notification', 'Get notifications'],
  ['rss', 'Subscribe by RSS'],
  ['mail', 'Share by email'],
];

export const ShareTargets = {
  name: 'Share targets',
  tags: ['!dev'],
  render: () => `
    <ul class="usa-button-group">
      ${shareTargets
        .map(([n, text]) => `<li class="usa-button-group__item">${iconBtn('secondary', n, text, { size: 'xl' })}</li>`)
        .join('')}
    </ul>`,
};

export const ActionBar = {
  name: 'Action bar',
  tags: ['!dev'],
  render: () => `
    <ul class="usa-button-group">
      <li class="usa-button-group__item">${iconBtn('secondary', 'download', 'Download report')}</li>
      <li class="usa-button-group__item">${iconBtn('outline', 'print', 'Print report')}</li>
      <li class="usa-button-group__item">${iconBtn('outline', 'expand', 'View full screen')}</li>
    </ul>`,
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

export const FocusIconButton = {
  name: 'Focus [icon button]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => `
    <div style="display: flex; gap: 1rem;">
      ${iconBtn('cta', 'arrow-line-right', 'Navigate')}
      ${iconBtn('secondary', 'download', 'Download')}
      ${iconBtn('utility', 'settings', 'Settings')}
    </div>
  `,
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const button = canvas.getByRole('button', { name: 'Navigate' });
    await expect(button).toHaveFocus();
  },
};

export const FocusInteractive = {
  name: 'Focus [interactive]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => iconBtn('interactive', 'plus', 'More info'),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const button = canvas.getByRole('button', { name: 'More info' });
    await expect(button).toHaveFocus();
  },
};
