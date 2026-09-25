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

// --- Guidance embeds (MDX Canvas targets, hidden from sidebar) ---

// Long current-page title, demonstrating the ellipsis cap on the
// current crumb. Only the non-link current page clips; ancestor
// links stay fully readable.
export const LongTitle = {
  name: 'Long current-page title',
  tags: ['!dev'],
  render: () =>
    breadcrumb([
      '…',
      'Contracting assistance programs',
      'Women-owned small business federal contracting program overview and eligibility',
    ]),
};

// Structured-data (RDFa) markup for schema.org BreadcrumbList, which
// powers breadcrumb rich results in search. Adapted from the USWDS
// metadata pattern to the HDS 3-element trail with real hrefs.
export const StructuredData = {
  name: 'Structured data (RDFa)',
  tags: ['!dev'],
  render: () => `
    <nav class="usa-breadcrumb" aria-label="Breadcrumbs">
      <ol vocab="https://schema.org/" typeof="BreadcrumbList" class="usa-breadcrumb__list">
        <li property="itemListElement" typeof="ListItem" class="usa-breadcrumb__list-item">
          <a property="item" typeof="WebPage" href="/" class="usa-breadcrumb__link">
            <span property="name">Home</span>
          </a>
          <meta property="position" content="1" />
        </li>
        <li property="itemListElement" typeof="ListItem" class="usa-breadcrumb__list-item">
          <a property="item" typeof="WebPage" href="/missions" class="usa-breadcrumb__link">
            <span property="name">Missions</span>
          </a>
          <meta property="position" content="2" />
        </li>
        <li property="itemListElement" typeof="ListItem" class="usa-breadcrumb__list-item usa-current" aria-current="page">
          <span property="name">Artemis I</span>
          <meta property="position" content="3" />
        </li>
      </ol>
    </nav>
  `,
};

// Legacy USWDS wrapping default: verbatim USWDS markup with a full
// trail (no HDS 3-element collapse). Constrained width so the wrap is
// visible. Shows what unmodified USWDS breadcrumb markup renders as
// under HDS Core.
export const LegacyWrap = {
  name: 'Legacy USWDS wrap (default)',
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 30rem;">
      ${breadcrumb(['Home', 'Missions', 'Artemis', 'Artemis I', 'Multimedia', 'Launch Coverage'])}
    </div>
  `,
};

// Legacy USWDS --truncate: verbatim USWDS markup with the opt-in
// single-line clip. Constrained width so the ellipsis clipping shows.
export const LegacyTruncate = {
  name: 'Legacy USWDS --truncate',
  tags: ['!dev'],
  render: () => `
    <div style="max-width: 30rem;">
      <nav class="usa-breadcrumb usa-breadcrumb--truncate" aria-label="Breadcrumbs">
        <ol class="usa-breadcrumb__list">
          <li class="usa-breadcrumb__list-item">
            <a class="usa-breadcrumb__link" href="/">Home</a>
          </li>
          <li class="usa-breadcrumb__list-item">
            <a class="usa-breadcrumb__link" href="/missions">Missions</a>
          </li>
          <li class="usa-breadcrumb__list-item">
            <a class="usa-breadcrumb__link" href="/missions/artemis">Artemis</a>
          </li>
          <li class="usa-breadcrumb__list-item usa-current" aria-current="page">
            <span>Artemis I Launch Coverage and Multimedia</span>
          </li>
        </ol>
      </nav>
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
