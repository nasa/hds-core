// ============================================================
// Icon Button Stories — @nasa/hds-core
// Covers §12 (HDS icon buttons, Tier 3)
//
// Sidebar structure:
//   Guidance   — IconButton.mdx (design rationale, Canvas embeds, usage rules)
//   Playground — interactive story with controls
// ============================================================

import { hdsUiIcons, uswdsUniqueIcons } from '../helpers/icons';

// Shared helpers for consistent story presentation
const label = (text) => `<span class="hds-label">${text}</span>`;

const grid = (items) => `
  <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">
    ${items}
  </div>`;

const gridItem = (labelText, content) => `
  <div style="min-width: 5rem; text-align: center;">
    ${label(labelText)}
    <div style="margin-top: 0.5rem;">${content}</div>
  </div>`;

const icon = (name) => `
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#${name}"></use>
  </svg>`;

export default {
  title: 'Components/Icon Button',
};

// ---------------------------------------------------------------------------
// Reference stories (hidden from sidebar, embedded in Guidance via Canvas)
// ---------------------------------------------------------------------------

export const AllRoles = {
  name: 'All roles',
  tags: ['!dev'],
  render: () => `
    ${grid(`
      ${gridItem(
        'CTA',
        '<button class="hds-btn-icon hds-btn-icon--cta" type="button" aria-label="Navigate to page">' +
          icon('arrow-line-right') +
          '</button>',
      )}
      ${gridItem(
        'Secondary',
        '<button class="hds-btn-icon hds-btn-icon--secondary" type="button" aria-label="Download file">' +
          icon('download') +
          '</button>',
      )}
      ${gridItem(
        'Outline',
        '<button class="hds-btn-icon hds-btn-icon--outline" type="button" aria-label="Share page">' +
          icon('share') +
          '</button>',
      )}
      ${gridItem(
        'Utility',
        '<button class="hds-btn-icon hds-btn-icon--utility" type="button" aria-label="Settings">' +
          icon('settings') +
          '</button>',
      )}
      ${gridItem(
        'Social',
        '<button class="hds-btn-icon hds-btn-icon--social" type="button" aria-label="RSS feed">' +
          icon('rss') +
          '</button>',
      )}
      ${gridItem(
        'Interactive',
        '<button class="hds-btn-icon hds-btn-icon--interactive" type="button" aria-label="More info">' +
          icon('info') +
          '</button>',
      )}
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
    ${gridItem(
      'Small',
      '<button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--sm" type="button" aria-label="Play">' +
        icon('play') +
        '</button>',
    )}
    ${gridItem(
      'Default',
      '<button class="hds-btn-icon hds-btn-icon--secondary" type="button" aria-label="Play">' +
        icon('play') +
        '</button>',
    )}
    ${gridItem(
      'Large',
      '<button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--lg" type="button" aria-label="Play">' +
        icon('play') +
        '</button>',
    )}
  `),
};

export const SocialRow = {
  name: 'Social row',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; gap: 0.75rem;">
      <a class="hds-btn-icon hds-btn-icon--social" href="#" aria-label="RSS feed">
        ${icon('rss')}
      </a>
      <a class="hds-btn-icon hds-btn-icon--social" href="#" aria-label="Subscribe">
        ${icon('subscribe')}
      </a>
      <a class="hds-btn-icon hds-btn-icon--social" href="#" aria-label="Share">
        ${icon('share')}
      </a>
    </div>
  `,
};

export const ActionBar = {
  name: 'Action bar',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; gap: 0.75rem;">
      <button class="hds-btn-icon hds-btn-icon--secondary" type="button" aria-label="Download">
        ${icon('download')}
      </button>
      <button class="hds-btn-icon hds-btn-icon--outline" type="button" aria-label="Print">
        ${icon('print')}
      </button>
      <button class="hds-btn-icon hds-btn-icon--utility" type="button" aria-label="Expand">
        ${icon('expand')}
      </button>
    </div>
  `,
};

export const CTAWithText = {
  name: 'CTA with adjacent text',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-weight: 600;">Explore the mission</span>
      <a class="hds-btn-icon hds-btn-icon--cta hds-btn-icon--sm" href="#" aria-label="Go to mission page">
        ${icon('arrow-line-right')}
      </a>
    </div>
  `,
};

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground = {
  args: {
    role: 'secondary',
    size: 'default',
    spriteSource: 'HDS',
    hdsIcon: 'download',
    uswdsIcon: 'search',
    ariaLabel: 'Download file',
    element: 'button',
  },
  argTypes: {
    role: {
      control: 'select',
      options: ['cta', 'secondary', 'outline', 'utility', 'social', 'interactive'],
      description: 'Wayfinding role — determines color',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Button size',
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
      description: 'Icon name from hds-sprite.svg',
      if: { arg: 'spriteSource', eq: 'HDS' },
    },
    uswdsIcon: {
      control: 'select',
      options: uswdsUniqueIcons,
      name: 'Icon (USWDS)',
      description: 'USWDS-only icons — those with HDS equivalents are excluded',
      if: { arg: 'spriteSource', eq: 'USWDS' },
    },
    ariaLabel: {
      control: 'text',
      name: 'aria-label',
      description: 'Required — icon buttons have no visible text',
    },
    element: {
      control: 'radio',
      options: ['button', 'a'],
      description: '<button> for actions, <a> for navigation',
    },
  },
  render: (args) => {
    const isUswds = args.spriteSource === 'USWDS';
    const spritePath = isUswds ? '/assets/img/sprite.svg' : '/assets/img/hds-sprite.svg';
    const iconName = isUswds ? args.uswdsIcon : args.hdsIcon;
    const sizeClass = args.size === 'default' ? '' : ` hds-btn-icon--${args.size}`;
    const classes = `hds-btn-icon hds-btn-icon--${args.role}${sizeClass}`;
    const iconMarkup = `
      <svg class="hds-icon" aria-hidden="true" focusable="false">
        <use xlink:href="${spritePath}#${iconName}"></use>
      </svg>`;

    if (args.element === 'a') {
      return `<a class="${classes}" href="#" aria-label="${args.ariaLabel}">${iconMarkup}</a>`;
    }
    return `<button class="${classes}" type="button" aria-label="${args.ariaLabel}">${iconMarkup}</button>`;
  },
};
