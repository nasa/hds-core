// ============================================================
// Link Stories — @nasa/hds-core
// CSS: components/_link.scss
//
// Sidebar structure:
//   Guidance   — Link.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Internal (default), External, All Variants
//              (visible in sidebar)
// ============================================================

import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export default {
  title: 'Components/Link',
};

// --- Helpers ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

const grid = (items) => `
  <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
    ${items}
  </div>`;

const gridItem = (labelText, content) => `
  <div style="min-width: 10rem;">
    ${label(labelText)}
    <div style="margin-top: 0.5rem;">${content}</div>
  </div>`;

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
  },
};

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
    suppressArrow: false,
  },
  argTypes: {
    text: { control: 'text', description: 'Link text' },
    href: { control: 'text', description: 'URL' },
    suppressArrow: {
      control: 'boolean',
      name: 'Internal escape (.hds-link--internal)',
      description: 'Suppress external arrow for NASA subdomains',
    },
  },
  render: (args = {}) => {
    const { text = "NASA's Flickr", href = 'https://flickr.com/nasa', suppressArrow = false } = args;
    const escapeClass = suppressArrow ? ' hds-link--internal' : '';
    const srText = suppressArrow ? '' : '<span class="usa-sr-only"> (external)</span>';
    return `<p>View the gallery on <a class="usa-link usa-link--external${escapeClass}" href="${href}" rel="noreferrer">${text}${srText}</a>.</p>`;
  },
};

export const AllVariants = {
  name: 'All Variants',
  render: (args = {}) =>
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

// --- Guidance embeds (MDX only) ---

export const LinksInContext = {
  name: 'Links in context',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        ${label('In headings')}
        <h2 style="margin-top: 0.5rem;">
          <a class="usa-link usa-link--external" href="https://www.spacex.com"
             rel="noreferrer">Heading with external link<span class="usa-sr-only"> (external)</span></a>
        </h2>
        <h3>
          <a class="usa-link" href="#">Heading with internal link</a>
        </h3>
      </div>
      <div>
        ${label('In body text')}
        <p style="margin-top: 0.5rem;">
          As NASA advances its plans to explore the Moon under its
          <a class="usa-link" href="#">Artemis program</a>, the two will
          discuss areas of collaboration that include support for
          <a class="usa-link" href="#">human spaceflight</a>, emerging
          space transportation, and
          <a class="usa-link usa-link--external"
             href="https://science.nasa.gov/"
             rel="noreferrer">scientific research<span class="usa-sr-only"> (external)</span></a>.
        </p>
      </div>
      <div>
        ${label('Multi-line wrap')}
        <p style="max-width: 320px; margin-top: 0.5rem;">
          On narrow viewports, this longer link wraps to multiple lines:
          <a class="usa-link usa-link--external" href="https://example.com"
             rel="noreferrer">a multi-line external link that demonstrates
          the underline following across line breaks<span class="usa-sr-only"> (external)</span></a>.
        </p>
      </div>
    </div>
  `,
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

// --- Focus tests (Chromatic modes + play function) ---

export const FocusLink = {
  name: 'Focus [link]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => `
    <p>Learn more about the <a class="usa-link" href="#">Artemis Program</a> and upcoming lunar missions.</p>
  `,
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const link = canvas.getByRole('link', { name: 'Artemis Program' });
    await expect(link).toHaveFocus();
  },
};
