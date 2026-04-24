// ============================================================
// List Stories — @nasa/hds-core
// CSS: components/_list.scss
//
// Sidebar structure:
//   Guidance   — List.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Unordered, Ordered, Unstyled, All Variants (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/List',
};

// --- Helpers ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

const sampleItems = [
  'SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon\u2019s southern hemisphere.',
  'NASA has previously confirmed ice in permanently shadowed craters around the Moon\u2019s poles.',
  'Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.',
];

const longItems = Array.from(
  { length: 20 },
  (_, i) => `Item ${i + 1}: ${sampleItems[i % sampleItems.length]}`
);

const list = (tag, items, classes = '', ariaLabel = '') => {
  const cls = `usa-list${classes ? ` ${classes}` : ''}`;
  const attr = ariaLabel ? ` aria-label="${ariaLabel}"` : '';
  const lis = items.map((item) => `  <li role="listitem">${item}</li>`).join('\n');
  return `<${tag} class="${cls}" role="list"${attr}>\n${lis}\n</${tag}>`;
};

// --- Stories (visible in sidebar) ---

export const Unordered = {
  args: {
    itemCount: 3,
  },
  argTypes: {
    itemCount: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Number of list items',
    },
  },
  render: (args = {}) => {
    const { itemCount = 3 } = args;
    return list('ul', sampleItems.slice(0, itemCount), '', 'Key findings');
  },
};

export const Ordered = {
  args: {
    itemCount: 3,
  },
  argTypes: {
    itemCount: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Number of list items',
    },
  },
  render: (args = {}) => {
    const { itemCount = 3 } = args;
    return list('ol', sampleItems.slice(0, itemCount), '', 'Key findings');
  },
};

export const Unstyled = {
  render: (args = {}) => list('ul', sampleItems, 'usa-list--unstyled', 'Related links'),
};

export const AllVariants = {
  name: 'All Variants',
  render: (args = {}) => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('Unordered')}
        <div style="margin-top: 0.5rem;">
          ${list('ul', sampleItems, '', 'Key findings')}
        </div>
      </div>
      <div>
        ${label('Ordered')}
        <div style="margin-top: 0.5rem;">
          ${list('ol', sampleItems, '', 'Key findings')}
        </div>
      </div>
      <div>
        ${label('Unstyled')}
        <div style="margin-top: 0.5rem;">
          ${list('ul', sampleItems, 'usa-list--unstyled', 'Related links')}
        </div>
      </div>
    </div>
  `,
};

// --- Guidance embeds (MDX only) ---

export const LongOrdered = {
  name: 'Long ordered (20 items)',
  tags: ['!dev'],
  render: () => list('ol', longItems, '', 'Extended findings'),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllVariants.render),
};