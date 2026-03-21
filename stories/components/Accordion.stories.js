const label = (text) => `<p class="hds-label" style="margin-bottom: 0.5rem">${text}</p>`;

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

const accordion = ({ multiselectable = false, itemCount = 5, firstExpanded = true } = {}) => {
  const prefix = multiselectable ? 'm' : 'a';
  const items = faqItems.slice(0, itemCount);
  const attrs = multiselectable
    ? 'class="usa-accordion usa-accordion--multiselectable" data-allow-multiple'
    : 'class="usa-accordion"';

  return `
    <div ${attrs}>
      ${items
        .map((item, i) =>
          accordionItem(`${prefix}-${i + 1}`, item.title, item.content, i === 0 && firstExpanded),
        )
        .join('')}
    </div>
  `;
};

export default {
  title: 'Components/Accordion',
};

// --- Guidance embeds (hidden from sidebar) ---

export const Default = {
  tags: ['!dev'],
  render: () => `
    ${label('Default')}
    ${accordion()}
  `,
};

export const AllCollapsed = {
  tags: ['!dev'],
  render: () => `
    ${label('All collapsed')}
    ${accordion({ firstExpanded: false })}
  `,
};

export const Multiselectable = {
  tags: ['!dev'],
  render: () => `
    ${label('Multiselectable')}
    ${accordion({ multiselectable: true })}
  `,
};

// --- Playground (visible in sidebar) ---

export const Playground = {
  argTypes: {
    multiselectable: {
      control: 'boolean',
      description: 'Allow multiple sections to be open at once',
    },
    itemCount: {
      control: { type: 'range', min: 2, max: 5, step: 1 },
      description: 'Number of accordion items',
    },
    firstExpanded: {
      control: 'boolean',
      description: 'First item expanded on load',
    },
  },
  args: {
    multiselectable: false,
    itemCount: 5,
    firstExpanded: true,
  },
  render: (args) => accordion(args),
};
