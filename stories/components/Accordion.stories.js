// ============================================================
// Accordion Stories — @nasa/hds-core
// Covers §8 (USWDS .usa-accordion override, Tier 1)
//
// Sidebar structure:
//   Guidance   — Accordion.mdx (design rationale, Canvas embeds)
//   Stories    — Default, Multiselectable (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Accordion',
};

// --- Helpers (used in multiple stories) ---

const label = (text) => `<p class="hds-overline" style="margin-bottom: 0.5rem">${text}</p>`;

const accordionItem = (id, title, content, expanded = false) => `
  <h4 class="usa-accordion__heading">
    <button
      type="button"
      class="usa-accordion__button"
      aria-expanded="${expanded}"
      aria-controls="${id}"
    >
      ${title}
    </button>
  </h4>
  <div id="${id}" class="usa-accordion__content usa-prose"${expanded ? '' : ' hidden'}>
    ${content}
  </div>
`;

const faqItems = [
  {
    title: 'What is the Horizon Design System?',
    content: `<p>The Horizon Design System (HDS) is NASA's unified visual language for
      digital products. It provides colors, typography, spacing, icons, and component
      patterns that ensure a consistent experience across NASA websites.</p>`,
  },
  {
    title: 'How does HDS Core relate to USWDS?',
    content: `<p>HDS Core is a Sass/CSS theme layer on top of the U.S. Web Design System
      (USWDS). All standard USWDS components and utility classes continue to work — HDS
      Core configures them with NASA's brand values.</p>`,
  },
  {
    title: 'Do I need JavaScript for accordions?',
    content: `<p>Yes. Accordions require the standard
      <a class="usa-link usa-link--external" href="https://designsystem.digital.gov/documentation/getting-started/developers/phase-two-compile/#step-4-add-the-uswds-javascript">USWDS JavaScript
      <span class="usa-sr-only">(external)</span></a>
      for expand/collapse toggling. HDS Core does not add any additional JavaScript.</p>`,
  },
  {
    title: 'Can accordion content include more than text?',
    content: `<p>Yes. Accordion content panels are flexible — they can include paragraphs,
      lists, links, images, and other components. Wrap content in
      <code>.usa-prose</code> for full typography styling.</p>
      <ul>
        <li>Paragraphs and formatted text</li>
        <li>Bulleted and numbered lists</li>
        <li>Links and inline elements</li>
      </ul>`,
  },
  {
    title: 'How do accordions adapt to color palettes?',
    content: `<p>HDS accordions are fully palette-aware. Heading text, separator lines,
      chevron circles, and content text all adapt automatically when placed inside a
      palette wrapper.</p>`,
  },
];

const accordion = ({ prefix = 'acc', multiselectable = false, itemCount = 5, firstExpanded = true } = {}) => {
  const items = faqItems.slice(0, itemCount);
  const attrs = multiselectable
    ? 'class="usa-accordion usa-accordion--multiselectable" data-allow-multiple'
    : 'class="usa-accordion"';

  return `
    <div ${attrs}>
      ${items
        .map((item, i) => accordionItem(`${prefix}-${i + 1}`, item.title, item.content, i === 0 && firstExpanded))
        .join('')}
    </div>
  `;
};

// --- Stories (visible in sidebar) ---

export const Default = {
  args: {
    itemCount: 5,
    firstExpanded: true,
  },
  argTypes: {
    itemCount: {
      control: { type: 'range', min: 2, max: 5, step: 1 },
      description: 'Number of accordion items',
    },
    firstExpanded: {
      control: 'boolean',
      description: 'First item expanded on load',
    },
  },
  render: (args) => accordion({ ...args, prefix: 'default' }),
};

export const Multiselectable = {
  args: {
    itemCount: 5,
    firstExpanded: true,
  },
  argTypes: {
    itemCount: {
      control: { type: 'range', min: 2, max: 5, step: 1 },
      description: 'Number of accordion items',
    },
    firstExpanded: {
      control: 'boolean',
      description: 'First item expanded on load',
    },
  },
  render: (args) => accordion({ ...args, prefix: 'multi', multiselectable: true }),
};

// --- Guidance embeds (MDX only) ---

// AllCollapsed is Default with firstExpanded: false.
// Kept as a named embed target for Accordion.mdx.
export const AllCollapsed = {
  tags: ['!dev'],
  render: () => accordion({ prefix: 'collapsed', firstExpanded: false }),
};

// --- Palette Accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(Default.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(Default.render),
};

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible },
  render: paletteRender(Default.render),
};
