// ============================================================
// List — Storybook Stories
// @nasa/hds-core
// ============================================================
// Sidebar stories: Unordered, Ordered, Long Ordered, Unstyled
// Guidance embeds: !dev tagged for MDX Canvas references
// Palette tests: !dev tagged for automated a11y contrast
//
// Structure:
//   1. Helpers
//   2. Sidebar stories
//   3. Guidance embeds
//   4. Palette tests
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

// ============================================================
// Meta
// ============================================================

export default {
  title: 'Components/List',
  parameters: {
    docs: { page: null },
  },
};

// ============================================================
// 1. Helpers
// ============================================================

const sampleItems = [
  "SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon's southern hemisphere.",
  "NASA has previously confirmed ice in permanently shadowed craters around the Moon's poles.",
  'Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.',
];

const longItems = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}: ${sampleItems[i % sampleItems.length]}`);

/**
 * Build a list component.
 * @param {'ul'|'ol'} tag       — Element tag
 * @param {string[]}  items     — Array of text strings
 * @param {string}    [classes] — Additional classes on the list element
 * @param {string}    [label]   — aria-label for the list
 */
const list = (tag, items, classes = '', label = '') => {
  const cls = `usa-list${classes ? ` ${classes}` : ''}`;
  const ariaLabel = label ? ` aria-label="${label}"` : '';
  const lis = items.map((item) => `  <li role="listitem">${item}</li>`).join('\n');
  return `<${tag} class="${cls}" role="list"${ariaLabel}>\n${lis}\n</${tag}>`;
};

// ============================================================
// 2. Sidebar stories
// ============================================================

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
    const items = sampleItems.slice(0, itemCount);
    return list('ul', items, '', 'Key findings');
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
    const items = sampleItems.slice(0, itemCount);
    return list('ol', items, '', 'Key findings');
  },
};

export const LongOrdered = {
  name: 'Long ordered (20 items)',
  render: () => list('ol', longItems, '', 'Extended findings'),
};

export const Unstyled = {
  render: () => list('ul', sampleItems, 'usa-list--unstyled', 'Related links'),
};

// ============================================================
// 3. Guidance embeds (!dev)
// ============================================================

export const UnorderedEmbed = {
  tags: ['!dev'],
  render: () => list('ul', sampleItems, '', 'Key findings'),
};

export const OrderedEmbed = {
  tags: ['!dev'],
  render: () => list('ol', sampleItems, '', 'Key findings'),
};

export const UnstyledEmbed = {
  tags: ['!dev'],
  render: () => list('ul', sampleItems, 'usa-list--unstyled', 'Related links'),
};

// ============================================================
// 4. Palette tests (!dev)
// ============================================================

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(Ordered.render),
};
