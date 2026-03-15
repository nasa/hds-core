export default {
  title: 'Components/Link',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const label = (text) => `<span class="hds-label">${text}</span>`;

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

// ---------------------------------------------------------------------------
// Reference stories (hidden from sidebar, embedded in Guidance via Canvas)
// ---------------------------------------------------------------------------

export const InternalLink = {
  name: 'Internal link',
  tags: ['!dev'],
  render: () => `
    <p>
      Learn more about the
      <a class="usa-link" href="#">Artemis program</a>
      and upcoming lunar missions.
    </p>
  `,
};

export const ExternalLink = {
  name: 'External link',
  tags: ['!dev'],
  render: () => `
    <p>
      View the gallery on
      <a class="usa-link usa-link--external" href="https://flickr.com/nasa"
         rel="noreferrer">NASA's Flickr<span class="usa-sr-only"> (external)</span></a>.
    </p>
  `,
};

export const InternalEscapeHatch = {
  name: 'Internal escape hatch',
  tags: ['!dev'],
  render: () => `
    <p>
      Explore the latest findings at
      <a class="usa-link usa-link--external hds-link--internal"
         href="https://science.nasa.gov/"
         rel="noreferrer">science.nasa.gov</a>.
    </p>
  `,
};

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

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground = {
  args: {
    text: 'Artemis Program',
    href: '#',
    external: false,
    internalEscape: false,
  },
  argTypes: {
    text: { control: 'text', description: 'Link text' },
    href: { control: 'text', description: 'URL' },
    external: {
      control: 'boolean',
      description: 'Add usa-link--external (diagonal arrow)',
    },
    internalEscape: {
      control: 'boolean',
      description: 'Add hds-link--internal (suppress arrow for NASA subdomains)',
      if: { arg: 'external' },
    },
  },
  render: (args) => {
    const classes = ['usa-link'];
    if (args.external) classes.push('usa-link--external');
    if (args.external && args.internalEscape) classes.push('hds-link--internal');
    const rel = args.external ? ' rel="noreferrer"' : '';
    const sr =
      args.external && !args.internalEscape ? '<span class="usa-sr-only"> (external)</span>' : '';
    return `<p><a class="${classes.join(' ')}" href="${args.href}"${rel}>${args.text}${sr}</a></p>`;
  },
};
