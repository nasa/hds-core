// ============================================================
// Breadcrumb Stories — @nasa/hds-core
// Covers §3 (USWDS .usa-breadcrumb override, Tier 1)
//
// Sidebar structure:
//   Guidance   — Breadcrumb.mdx
//   Playground — interactive story with controls
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/Breadcrumb',
};

// --- Helpers (used in multiple stories) ---

const breadcrumb = (items) => {
  const listItems = items
    .map((item, i) => {
      const isLast = i === items.length - 1;
      if (item === '…') {
        return `<li class="usa-breadcrumb__list-item"><span class="usa-breadcrumb__link">…</span></li>`;
      }
      if (isLast) {
        return `<li class="usa-breadcrumb__list-item usa-current" aria-current="page"><span>${item}</span></li>`;
      }
      return `<li class="usa-breadcrumb__list-item"><a class="usa-breadcrumb__link" href="#">${item}</a></li>`;
    })
    .join('\n      ');

  return `
    <nav class="usa-breadcrumb" aria-label="Breadcrumbs">
      <ol class="usa-breadcrumb__list">
        ${listItems}
      </ol>
    </nav>
  `;
};

// --- Guidance embeds (hidden from sidebar) ---

export const TwoLevels = {
  name: '2 levels',
  tags: ['!dev'],
  render: () => breadcrumb(['Home', 'Missions']),
};

export const ThreeLevels = {
  name: '3 levels',
  tags: ['!dev'],
  render: () => breadcrumb(['Home', 'Missions', 'Artemis I']),
};

export const FourPlusLevels = {
  name: '4+ levels (ellipsis)',
  tags: ['!dev'],
  render: () => breadcrumb(['…', 'Artemis I', 'Multimedia']),
};

export const AllDepths = {
  name: 'All depths',
  tags: ['!dev'],
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'landmark-unique', enabled: false }],
      },
    },
  },
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <span class="hds-label">2 layers</span>
        <div style="margin-top: 0.5rem;">
          ${breadcrumb(['Home', 'Missions'])}
        </div>
      </div>
      <div>
        <span class="hds-label">3 layers</span>
        <div style="margin-top: 0.5rem;">
          ${breadcrumb(['Home', 'Missions', 'Artemis I'])}
        </div>
      </div>
      <div>
        <span class="hds-label">4+ layers</span>
        <div style="margin-top: 0.5rem;">
          ${breadcrumb(['…', 'Artemis I', 'Multimedia'])}
        </div>
      </div>
    </div>
  `,
};

export const HoverState = {
  name: 'Hover state',
  tags: ['!dev'],
  render: () => `
    <p style="margin-bottom: 0.5rem;">
      <span class="hds-label">Hover the middle link to see bold treatment</span>
    </p>
    ${breadcrumb(['Home', 'Missions', 'Artemis I'])}
  `,
};

// --- Palette Accessibility tests (hidden from sidebar) ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllDepths.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllDepths.render, 'hover'),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllDepths.render, 'focus-visible'),
};

// --- Playground (visible in sidebar) ---

export const Playground = {
  args: {
    depth: '3',
    level1: 'Home',
    level2: 'Missions',
    level3: 'Artemis I',
  },
  argTypes: {
    depth: {
      control: 'radio',
      options: ['2', '3', '4+'],
      description: 'Breadcrumb depth pattern',
    },
    level1: {
      control: 'text',
      name: 'First item',
      description: 'Root page (Home) or ellipsis for 4+ levels',
    },
    level2: {
      control: 'text',
      name: 'Second item',
      description: 'Parent page',
    },
    level3: {
      control: 'text',
      name: 'Current page',
      description: 'Current page (rendered as plain text, not a link)',
      if: { arg: 'depth', neq: '2' },
    },
  },
  render: (args) => {
    if (args.depth === '2') {
      return breadcrumb([args.level1, args.level2]);
    }
    if (args.depth === '4+') {
      return breadcrumb(['…', args.level2, args.level3]);
    }
    return breadcrumb([args.level1, args.level2, args.level3]);
  },
};
