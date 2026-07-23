// ============================================================
// Breadcrumb Stories — @nasa-hds/core
// CSS: components/_breadcrumb.scss
//
// Sidebar structure:
//   Guidance   — Breadcrumb.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — 2 levels (default), 3 levels, 4+ levels (truncated),
//              All Variants (visible in sidebar)
// ============================================================

import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Breadcrumb',
};

// --- Helpers ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

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

const multiNavA11y = {
  a11y: {
    config: {
      rules: [{ id: 'landmark-unique', enabled: false }],
    },
  },
};

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
  },
};

// --- Stories (visible in sidebar) ---

export const Default = {
  name: '2 levels (default)',
  args: {
    level1: 'Home',
    level2: 'Missions',
  },
  argTypes: {
    level1: { control: 'text', name: 'Root page' },
    level2: { control: 'text', name: 'Current page' },
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
    level1: { control: 'text', name: 'Root page' },
    level2: { control: 'text', name: 'Parent page' },
    level3: { control: 'text', name: 'Current page' },
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
    level2: { control: 'text', name: 'Parent page' },
    level3: { control: 'text', name: 'Current page' },
  },
  render: (args = {}) => {
    const { level2 = 'Artemis I', level3 = 'Multimedia' } = args;
    return breadcrumb(['…', level2, level3]);
  },
};

export const AllVariants = {
  name: 'All Variants',
  parameters: multiNavA11y,
  render: (args = {}) => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        ${label('2 levels')}
        <div style="margin-top: 0.5rem;">
          ${breadcrumb(['Home', 'Missions'])}
        </div>
      </div>
      <div>
        ${label('3 levels')}
        <div style="margin-top: 0.5rem;">
          ${breadcrumb(['Home', 'Missions', 'Artemis I'])}
        </div>
      </div>
      <div>
        ${label('4+ levels (truncated)')}
        <div style="margin-top: 0.5rem;">
          ${breadcrumb(['…', 'Artemis I', 'Multimedia'])}
        </div>
      </div>
    </div>
  `,
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...multiNavA11y },
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...multiNavA11y, ...pseudoParams.hover },
  render: paletteRender(AllVariants.render),
};

// --- Focus tests (Chromatic modes + play function) ---

export const FocusBreadcrumb = {
  name: 'Focus [breadcrumb]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => breadcrumb(['Home', 'Missions', 'Artemis I']),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const link = canvas.getByRole('link', { name: 'Home' });
    await expect(link).toHaveFocus();
  },
};
