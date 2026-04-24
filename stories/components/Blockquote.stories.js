// ============================================================
// Blockquote Stories — @nasa/hds-core
// CSS: components/_blockquote.scss, base/_elements.scss
//
// Sidebar structure:
//   Guidance    — Blockquote.mdx (design rationale, Canvas embeds, usage rules)
//   Stories     — Default, Author, Source, All Variants (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/Blockquote',
  decorators: [(story) => `<div style="padding-left: 3rem; max-width: 64em;">${story()}</div>`],
};

// --- Defaults (single source of truth) ---

const defaults = {
  quoteDefault:
    'NASA explores the unknown in air and space, innovates for the benefit of humanity, and inspires the world through discovery.',
  quoteAuthor:
    "I've learned that most problems aren't rocket science, but when they are rocket science, you should ask a rocket scientist. In other words, I don't know everything, so I've learned to seek advice and counsel and to listen to experts.",
  quoteSource:
    'Congress declares that it is the policy of the United States that activities in space should be devoted to peaceful purposes for the benefit of all humankind.',
  name: 'Scott Kelly',
  description: 'NASA Astronaut, spent a record-breaking 340 consecutive days on ISS in 2016',
  source: 'National Aeronautics and Space Act of 1958 (as amended), 51 U.S.C. § 20102',
};

// --- Shared helpers ---

const label = (text) => `<span class="hds-overline">${text}</span>`;

const quoteArg = {
  quote: { control: 'text', description: 'Quote text content' },
};

const nameEl = (name, linked) =>
  linked ? `<a href="#" class="hds-blockquote-name">${name}</a>` : `<span class="hds-blockquote-name">${name}</span>`;

const avatarEl = (name) => `<img class="hds-blockquote-avatar" src="blockquote-avatar-kelly.png" alt="${name}" />`;

const blockquote = (inner, ariaLabel) =>
  `<blockquote class="hds-blockquote"${ariaLabel ? ` aria-label="${ariaLabel}"` : ''}>${inner}</blockquote>`;

// Helpers for AllVariants / PaletteA11y (use defaults, not args)
const personAttribution = ({ linked = false } = {}) => `
  <div class="hds-blockquote-attribution">
    ${avatarEl(defaults.name)}
    ${nameEl(defaults.name, linked)}
    <span class="hds-blockquote-description">${defaults.description}</span>
  </div>`;

const sourceAttribution = ({ linked = false } = {}) => {
  const desc = linked
    ? `<a href="#"><cite class="hds-blockquote-description">${defaults.source}</cite></a>`
    : `<cite class="hds-blockquote-description">${defaults.source}</cite>`;
  return `<div class="hds-blockquote-attribution">${desc}</div>`;
};

// --- Stories (visible in sidebar) ---

export const Default = {
  name: 'Default',
  args: { quote: defaults.quoteDefault },
  argTypes: quoteArg,
  render: ({ quote }) => blockquote(`<p>${quote}</p>`),
};

export const Author = {
  name: 'Author',
  args: {
    quote: defaults.quoteAuthor,
    name: defaults.name,
    description: defaults.description,
    showAvatar: true,
    linked: false,
  },
  argTypes: {
    ...quoteArg,
    name: { control: 'text', description: 'Attribution name (person)' },
    description: { control: 'text', description: 'Attribution description (role, context)' },
    showAvatar: { control: 'boolean', description: 'Show avatar image' },
    linked: { control: 'boolean', description: 'Link name to bio page' },
  },
  render: ({ quote, name, description, showAvatar, linked }) =>
    blockquote(
      `<p>${quote}</p>
    <div class="hds-blockquote-attribution">
      ${showAvatar ? avatarEl(name) : ''}
      ${nameEl(name, linked)}
      <span class="hds-blockquote-description">${description}</span>
    </div>`,
      `Quote by ${name}`,
    ),
};

export const Source = {
  name: 'Source',
  args: {
    quote: defaults.quoteSource,
    source: defaults.source,
    linked: true,
  },
  argTypes: {
    ...quoteArg,
    source: { control: 'text', description: 'Source title (uses <cite>)' },
    linked: { control: 'boolean', description: 'Link source to original document' },
  },
  render: ({ quote, source, linked }) => {
    const desc = linked
      ? `<a href="#"><cite class="hds-blockquote-description">${source}</cite></a>`
      : `<cite class="hds-blockquote-description">${source}</cite>`;

    return blockquote(
      `<p>${quote}</p>
      <div class="hds-blockquote-attribution">${desc}</div>`,
      `Quote from ${source}`,
    );
  },
};

export const AllVariants = {
  name: 'All Variants',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <div>
        ${label('Default')}
        <div style="margin-top: 0.5rem;">
          ${blockquote(`<p>${defaults.quoteDefault}</p>`)}
        </div>
      </div>
      <div>
        ${label('Author')}
        <div style="margin-top: 0.5rem;">
          ${blockquote(`<p>${defaults.quoteAuthor}</p>${personAttribution()}`)}
        </div>
      </div>
      <div>
        ${label('Author (linked)')}
        <div style="margin-top: 0.5rem;">
          ${blockquote(`<p>${defaults.quoteAuthor}</p>${personAttribution({ linked: true })}`)}
        </div>
      </div>
      <div>
        ${label('Source')}
        <div style="margin-top: 0.5rem;">
          ${blockquote(`<p>${defaults.quoteSource}</p>${sourceAttribution()}`)}
        </div>
      </div>
      <div>
        ${label('Source (linked)')}
        <div style="margin-top: 0.5rem;">
          ${blockquote(`<p>${defaults.quoteSource}</p>${sourceAttribution({ linked: true })}`)}
        </div>
      </div>
    </div>
  `,
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(() => `<div style="padding-left: 3rem;">${AllVariants.render()}</div>`),
};
