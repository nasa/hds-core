// ============================================================
// Breadcrumb Stories — @nasa/hds-core
// Covers §3 (USWDS .usa-breadcrumb override, Tier 1)
//
// Sidebar structure:
//   Guidance   — Breadcrumb.mdx (design rationale, Canvas embeds)
//   Stories    — Default, ThreeLevels, Truncated (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

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

// --- Stories (visible in sidebar) ---

export const Default = {
  name: '2 levels (default)',
  args: {
    level1: 'Home',
    level2: 'Missions',
  },
  argTypes: {
    level1: {
      control: 'text',
      name: 'Root page',
    },
    level2: {
      control: 'text',
      name: 'Current page',
    },
  },
  render: (args = {}) => {
    const { level1 = 'Home', level2 = 'Missions' } = args;
    return breadcrumb([level1, level2]);
  },
};

export const ThreeLevels = {
  name: '3 levels',
  args: {
    level1: 'Home',
    level2: 'Missions',
    level3: 'Artemis I',
  },
  argTypes: {
    level1: {
      control: 'text',
      name: 'Root page',
    },
    level2: {
      control: 'text',
      name: 'Parent page',
    },
    level3: {
      control: 'text',
      name: 'Current page',
    },
  },
  render: (args = {}) => {
    const { level1 = 'Home', level2 = 'Missions', level3 = 'Artemis I' } = args;
    return breadcrumb([level1, level2, level3]);
  },
};

export const Truncated = {
  name: '4+ levels (truncated)',
  args: {
    level2: 'Artemis I',
    level3: 'Multimedia',
  },
  argTypes: {
    level2: {
      control: 'text',
      name: 'Parent page',
    },
    level3: {
      control: 'text',
      name: 'Current page',
    },
  },
  render: (args = {}) => {
    const { level2 = 'Artemis I', level3 = 'Multimedia' } = args;
    return breadcrumb(['…', level2, level3]);
  },
};

// --- Guidance embeds (MDX only) ---

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
        <span class="hds-overline">2 levels</span>
        <div style="margin-top: 0.5rem;">
          ${breadcrumb(['Home', 'Missions'])}
        </div>
      </div>
      <div>
        <span class="hds-overline">3 levels</span>
        <div style="margin-top: 0.5rem;">
          ${breadcrumb(['Home', 'Missions', 'Artemis I'])}
        </div>
      </div>
      <div>
        <span class="hds-overline">4+ levels (truncated)</span>
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
      <span class="hds-overline">Hover the middle link to see bold treatment</span>
    </p>
    ${breadcrumb(['Home', 'Missions', 'Artemis I'])}
  `,
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllDepths.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(AllDepths.render),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible },
  render: paletteRender(AllDepths.render),
};
