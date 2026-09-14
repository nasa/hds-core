// ============================================================
// Summary Box — unstyled USWDS baseline (lab)
// @nasa-hds/core
//
// HDS styling: NONE. No `src/scss/components/_summary-box.scss` exists
// and no HDS rule targets `.usa-summary-box*`. `base/_component-properties.scss`
// exposes `--hds-summary-border-radius` / `--hds-summary-border-width` as
// `:root` custom-property hooks, but nothing applies them to
// `.usa-summary-box` — they just mirror the two theme settings below.
// Everything else below is USWDS default styling inside `@layer uswds`,
// recolored only by the HDS theme settings in `_hds-uswds-theme.scss`.
//
// USWDS docs:   https://designsystem.digital.gov/components/summary-box/
// USWDS styles: packages/usa-summary-box/src/styles/_usa-summary-box.scss
// USWDS JS:     none
//
// Hidden from the sidebar and from Vitest (`tags: ['!dev', '!test']`).
// See stories/lab/README.md for why, and how to promote this file.
//
// Baseline observations (source-derived — see docs/UNSTYLED-USWDS-INVENTORY.md):
//   - `$theme-summary-box-background-color` / `$theme-summary-box-border-color`
//     are left at their USWDS defaults (`info-lighter` / `info-light`).
//     `_hds-uswds-theme.scss` maps those to bare USWDS swatches
//     (`$theme-color-info-lighter: 'cyan-5'`, `$theme-color-info-light:
//     'cyan-20'`) — not a `--hds-palette-*` token. The box is the same
//     pale-cyan surface on all six palettes: the same non-adapting-surface
//     problem as Card, just a themed-looking swatch instead of raw white.
//   - The only two settings HDS actually sets for this component are
//     `$theme-summary-box-border-radius` and `$theme-summary-box-border-width`
//     (`_hds-uswds-theme.scss`), pulling `hds.$hds-border-radius` /
//     `hds.$hds-border-width-thin`. Nothing else about the component is
//     themed.
//   - `$theme-summary-box-font-family: 'ui'` (USWDS default, unset by HDS)
//     resolves through `$theme-font-role-ui: 'serif'` → `'inter'`, so the
//     heading and body text render in Inter, HDS's heading face — but at
//     USWDS's own `typeset('ui', 'lg', 2)` size/line-height, not the HDS
//     type ramp (`hds-type()`). It reads as HDS type at the wrong scale
//     rather than as USWDS type.
//   - Contrast risk: `.usa-summary-box__link` computes an accessible color
//     against the pinned `cyan-5` background via USWDS's own
//     `set-link-from-bg` mixin. That computed color is overridden the
//     moment the box sits inside `.usa-prose` — the exact placement
//     USWDS's own docs recommend ("surface critical details from a longer
//     article"). `base/_content-rules.scss`'s bare `a:not(:has(> img, >
//     svg))` rule is always active inside `.usa-prose` via the `@scope`
//     block in `base/_elements.scss`, and it compiles into the
//     `hds-base` layer, which outranks `uswds` regardless of selector
//     specificity (`AGENTS.md` → Cascade layer order). That rule repaints
//     the link from `var(--hds-palette-link-text)` — the surrounding
//     palette's link color, not a color chosen for the fixed cyan-5
//     surface. On the `dark`, `black`, and `blue` palettes that token is
//     spacesuit white: white link text on the same pale-cyan box. Same
//     shape as the "Table blue palette" bug in `AGENTS.md` — a
//     palette-aware link painted onto a surface whose background does not
//     move with the palette. See the "Within .usa-prose" variant below,
//     stacked across all six palettes in `PaletteA11y`.
//   - `.usa-summary-box__link` is a bare `<a>`, not `.usa-link`, so
//     `components/_link.scss`'s themed dashed focus ring never applies to
//     it. `base/_focus.scss`'s always-active `hds-focus-ring` list covers
//     `button` / `input` / `select` / `textarea` / `[tabindex]` / etc.,
//     but not bare `<a>` — outside `.usa-prose` this link keeps whatever
//     default focus indication the browser/USWDS gives a plain anchor.
// ============================================================

import { block, labParams, labPaletteHoverParams, labPaletteParams, labPaletteRender, stack } from './labHelpers';

export default {
  title: 'Components/Summary Box',
  parameters: labParams,
};

// --- Helpers ---

/**
 * List items for the "list of links" variant. Plain strings (not
 * objects with a `label` key) per docs/DOCUMENTATION.md → "Parser
 * safety for object arrays" — hoisted to module scope either way.
 */
const europaClipperFacts = [
  `Launched in October 2024 aboard a Falcon Heavy from Kennedy Space Center.`,
  `Uses gravity assists at Mars (2025) and Earth (2026) to reach Jupiter in 2030.`,
  `Track the spacecraft in real time with NASA's <a class="usa-summary-box__link" href="#">Eyes on the Solar System</a>.`,
  `Browse raw instrument readings in the <a class="usa-summary-box__link" href="#">Planetary Data System</a> Europa Clipper collection.`,
  `Read mission updates on the <a class="usa-summary-box__link" href="#">Europa Clipper mission blog</a>.`,
];

const artemisBody = `Artemis II will send four astronauts around the Moon and back, testing Orion's life-support and navigation systems with a crew aboard for the first time.`;

/**
 * @param {object} options
 * @param {string} options.prefix  Unique id prefix — see "Unique IDs" in
 *   the lab story spec. Every copy needs its own `heading`/`aria-labelledby`
 *   pair so stacked palette copies don't collide.
 * @param {string} options.heading Summary box heading text
 * @param {string[]|null} options.items Renders a `.usa-list` of these
 *   (already-marked-up) list items when given
 * @param {string} options.body   Plain paragraph copy, used when `items`
 *   is not given
 */
const summaryBox = ({ prefix = 'summary', heading = 'Europa Clipper — key facts', items = null, body = '' } = {}) => {
  const headingId = `${prefix}-heading`;
  const content = items
    ? `<ul class="usa-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`
    : `<p>${body}</p>`;

  return `
    <div class="usa-summary-box" role="region" aria-labelledby="${headingId}">
      <div class="usa-summary-box__body">
        <h4 class="usa-summary-box__heading" id="${headingId}">${heading}</h4>
        <div class="usa-summary-box__text">
          ${content}
        </div>
      </div>
    </div>`;
};

/**
 * Summary box embedded mid-article inside `.usa-prose`, matching the
 * USWDS docs' own guidance for the component ("surface critical details
 * from a longer article"). This is the placement that triggers the
 * `.usa-prose` link-color override described in the header comment above.
 */
const inProse = ({ prefix = 'prose' } = {}) => `
  <div class="usa-prose">
    <p>
      Perseverance has spent more than three years exploring Jezero Crater,
      drilling rock cores that will eventually return to Earth aboard a
      future sample-return mission.
    </p>
    ${summaryBox({
      prefix,
      heading: 'Perseverance rover — public data',
      items: [
        `Browse raw camera images in the <a class="usa-summary-box__link" href="#">Mars 2020 raw images archive</a>.`,
        `Review surface weather logs from the <a class="usa-summary-box__link" href="#">Mars Environmental Dynamics Analyzer</a> instrument.`,
      ],
    })}
    <p>
      Each cached sample is documented in the mission's public log so that
      its collection site can be matched to orbital imagery years later.
    </p>
  </div>`;

const headingArgTypes = {
  heading: { control: 'text', name: 'Heading' },
};

// --- Variants ---

export const Default = {
  name: 'Default (list of links)',
  tags: ['!dev', '!test'],
  args: {
    heading: 'Europa Clipper — key facts',
  },
  argTypes: headingArgTypes,
  render: (args = {}) =>
    summaryBox({
      prefix: 'default',
      heading: args.heading,
      items: europaClipperFacts,
    }),
};

export const HeadingAndText = {
  name: 'Heading and text only',
  tags: ['!dev', '!test'],
  args: {
    heading: 'Artemis II — quick facts',
    body: artemisBody,
  },
  argTypes: {
    ...headingArgTypes,
    body: { control: 'text', name: 'Body copy' },
  },
  render: (args = {}) =>
    summaryBox({
      prefix: 'heading-and-text',
      heading: args.heading,
      body: args.body,
    }),
};

export const WithinProse = {
  name: 'Within .usa-prose',
  tags: ['!dev', '!test'],
  render: () => inProse({ prefix: 'within-prose' }),
};

export const AllVariants = {
  name: 'All Variants',
  tags: ['!dev', '!test'],
  render: (args = {}) =>
    stack([
      block(
        'List of links',
        summaryBox({
          prefix: 'all-list',
          heading: args.heading || 'Europa Clipper — key facts',
          items: europaClipperFacts,
        }),
      ),
      block(
        'Heading and text only',
        summaryBox({
          prefix: 'all-text',
          heading: 'Artemis II — quick facts',
          body: artemisBody,
        }),
      ),
      block('Within .usa-prose', inProse({ prefix: 'all-prose' })),
    ]),
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev', '!test'],
  parameters: labPaletteParams,
  render: labPaletteRender((palette) =>
    stack([
      block(
        'List of links',
        summaryBox({
          prefix: `${palette}-list`,
          heading: 'Europa Clipper — key facts',
          items: europaClipperFacts,
        }),
      ),
      block(
        'Heading and text only',
        summaryBox({
          prefix: `${palette}-text`,
          heading: 'Artemis II — quick facts',
          body: artemisBody,
        }),
      ),
      block('Within .usa-prose', inProse({ prefix: `${palette}-prose` })),
    ]),
  ),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev', '!test'],
  parameters: labPaletteHoverParams,
  render: labPaletteRender((palette) =>
    stack([
      block(
        'List of links',
        summaryBox({
          prefix: `${palette}-hover-list`,
          heading: 'Europa Clipper — key facts',
          items: europaClipperFacts,
        }),
      ),
      block(
        'Heading and text only',
        summaryBox({
          prefix: `${palette}-hover-text`,
          heading: 'Artemis II — quick facts',
          body: artemisBody,
        }),
      ),
      block('Within .usa-prose', inProse({ prefix: `${palette}-hover-prose` })),
    ]),
  ),
};
