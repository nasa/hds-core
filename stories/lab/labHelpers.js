// ============================================================
// Lab story helpers — @nasa-hds/core
// ============================================================
// Shared parameters and layout helpers for the unstyled USWDS
// baseline stories in `stories/lab/`. See stories/lab/README.md
// for what these stories are and how to promote one.
//
// Tags are deliberately NOT exported from here. Storybook's static
// indexer cannot resolve tags through an import or a spread, so every
// lab story declares `tags: ['!dev', '!test']` as a literal array.
// ============================================================

import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';

export { paletteRender };

const palettes = ['white', 'light', 'midtone', 'dark', 'blue', 'black'];

/**
 * `paletteRender` for components whose markup carries IDs.
 *
 * The shared `paletteRender` calls its render function six times with no
 * arguments, so any `id` / `aria-controls` / `for` pairing in the markup
 * is repeated six times in one DOM — duplicate IDs, which axe flags and
 * which USWDS JS resolves to the first match, wiring every copy's
 * controls to the first palette's instance.
 *
 * This variant passes the palette name in, so a story can build unique
 * IDs per copy while staying a single stacked story:
 *
 *   const variants = (prefix) => `...id="${prefix}-input"...`;
 *
 *   export const AllVariants = { render: () => variants('all') };
 *   export const PaletteA11y = {
 *     render: labPaletteRender((palette) => variants(`pal-${palette}`)),
 *   };
 *
 * @param {(palette: string) => string} renderFn Receives the palette name
 */
export const labPaletteRender = (renderFn) => () =>
  palettes.map((p) => `<div class="hds-palette-${p}" style="padding: 2rem;">${renderFn(p)}</div>`).join('\n');

/**
 * Default parameters for every lab story.
 *
 * `chromatic.disableSnapshot` repeats the global default from
 * preview.js on purpose: lab stories are a pre-theming baseline, and
 * baselining them in Chromatic would spend snapshot budget on diffs
 * nobody is reviewing yet. Promoting a component flips this in one
 * place per file.
 *
 * `a11y.test: 'todo'` reports axe violations in the Storybook panel —
 * which is the whole point of these stories — without letting an
 * unthemed component fail CI if it is ever pulled into the test run.
 */
export const labParams = {
  chromatic: { disableSnapshot: true },
  a11y: { test: 'todo' },
};

/** Lab equivalent of `paletteA11yParams` — same axe config, no snapshot. */
export const labPaletteParams = {
  ...labParams,
  a11y: { ...paletteA11yParams.a11y, test: 'todo' },
};

/** Lab palette parameters with the hover pseudo-state applied. */
export const labPaletteHoverParams = {
  ...labPaletteParams,
  ...pseudoParams.hover,
};

/**
 * Merge extra axe rule overrides into the lab palette parameters.
 * Use for components that legitimately trip a structural rule when
 * stacked — duplicate landmarks, repeated IDs across palette copies.
 *
 * @param {Array<{id: string, enabled: boolean}>} rules axe rule overrides
 */
export const labPaletteParamsWith = (rules) => ({
  ...labPaletteParams,
  a11y: {
    ...labPaletteParams.a11y,
    config: {
      rules: [...labPaletteParams.a11y.config.rules, ...rules],
    },
  },
});

// --- Layout helpers (match the sidebar story conventions) ---

/** Overline label above a variant in a composed story. */
export const label = (text) => `<span class="hds-overline">${text}</span>`;

/** Vertical stack of composed variants. */
export const stack = (items) => `
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    ${items.join('\n')}
  </div>`;

/** One labelled block inside a `stack`. */
export const block = (labelText, content) => `
  <div>
    ${label(labelText)}
    <div style="margin-top: 0.5rem;">${content}</div>
  </div>`;
