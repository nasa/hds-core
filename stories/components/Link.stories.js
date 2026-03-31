// ============================================================
// Link Stories — @nasa/hds-core
// Covers §13 (USWDS .usa-link override, Tier 1 + .hds-link--internal, Tier 3)
//
// Sidebar structure:
//   Guidance   — Link.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Internal (default), External, Internal Escape
//              (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Link',
};

// --- Helpers (used in multiple stories) ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

const grid = (items) => `
  <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
    ${items}
  </div>
`;

const gridItem = (labelText, content) => `
  <div style="min-width: 10rem;">
    ${label(labelText)}
    <div style="margin-top: 0.5rem;">${content}</div>
  </div>
`;

// --- Stories (visible in sidebar) ---

export const Internal = {
  name: 'Internal (default)',
  args: {
    text: 'Artemis Program',
    href: '#',
  },
  argTypes: {
    text: { control: 'text', description: 'Link text' },
    href: { control: 'text', description: 'URL' },
  },
  render: (args = {}) => {
    const { text = 'Artemis Program', href = '#' } = args;
    return `<p>Learn more about the <a class="usa-link" href="${href}">${text}</a> and upcoming lunar missions.</p>`;
  },
};

export const External = {
  args: {
    text: "NASA's Flickr",
    href: 'https://flickr.com/nasa',
  },
  argTypes: {
    text: { control: 'text', description: 'Link text' },
    href: { control: 'text', description: 'URL' },
  },
  render: (args = {}) => {
    const { text = "NASA's Flickr", href = 'https://flickr.com/nasa' } = args;
    return `<p>View the gallery on <a class="usa-link usa-link--external" href="${href}" rel="noreferrer">${text}<span class="usa-sr-only"> (external)</span></a>.</p>`;
  },
};

export const InternalEscape = {
  name: 'Internal Escape',
  args: {
    text: 'science.nasa.gov',
    href: 'https://science.nasa.gov/',
  },
  argTypes: {
    text: { control: 'text', description: 'Link text' },
    href: { control: 'text', description: 'URL (NASA subdomain)' },
  },
  render: (args = {}) => {
    const { text = 'science.nasa.gov', href = 'https://science.nasa.gov/' } = args;
    return `<p>Explore the latest findings at <a class="usa-link usa-link--external hds-link--internal" href="${href}" rel="noreferrer">${text}</a>.</p>`;
  },
};

// --- Guidance embeds (MDX only) ---

export const LinksInHeadings = {
  name: 'Links in headings',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <h2>
        <a class="usa-link usa-link--external" href="https://www.spacex.com"
           rel="noreferrer">Heading 2 with external link<span class="usa-sr-only"> (external)</span></a>
      </h2>
      <h3>
        <a class="usa-link" href="#">Heading 3 with internal link</a>
      </h3>
      <h4>
        <a class="usa-link" href="#">Heading 4 with internal link</a>
      </h4>
    </div>
  `,
};

export const LinksInParagraph = {
  name: 'Links in paragraph',
  tags: ['!dev'],
  render: () => `
    <p>
      As NASA advances its plans to explore the Moon under its
      <a class="usa-link" href="#">Artemis program</a>, the two will
      discuss areas of collaboration that include support for
      <a class="usa-link" href="#">human spaceflight</a>, emerging
      space transportation, and
      <a class="usa-link usa-link--external"
         href="https://science.nasa.gov/"
         rel="noreferrer">scientific research<span class="usa-sr-only"> (external)</span></a>.
    </p>
  `,
};

export const MultiLineWrap = {
  name: 'Multi-line wrap',
  tags: ['!dev'],
  render: () => `
    <p style="max-width: 320px;">
      On narrow viewports, this longer link wraps to multiple lines:
      <a class="usa-link usa-link--external" href="https://example.com"
         rel="noreferrer">a multi-line external link that demonstrates
      the underline following across line breaks<span class="usa-sr-only"> (external)</span></a>.
    </p>
  `,
};

export const AllVariants = {
  name: 'All variants',
  tags: ['!dev'],
  render: () =>
    grid([
      gridItem('Internal', '<a class="usa-link" href="#">Artemis Program</a>'),
      gridItem(
        'External',
        '<a class="usa-link usa-link--external" href="https://flickr.com/nasa" rel="noreferrer">NASA Flickr<span class="usa-sr-only"> (external)</span></a>',
      ),
      gridItem(
        'Internal escape',
        '<a class="usa-link usa-link--external hds-link--internal" href="https://science.nasa.gov/" rel="noreferrer">science.nasa.gov</a>',
      ),
    ]),
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

export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible },
  render: paletteRender(AllVariants.render),
};
