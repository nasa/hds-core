# HDS Core Documentation Conventions

Standards for Storybook documentation pages.

Last updated: 2026-03-31

## Audience

HDS Core Storybook documentation is for developers, designers, and site administrators implementing HDS components. It is not for HDS Core maintainers — maintainer context belongs in code comments, DESIGN.md, and ARCHITECTURE.md.

Write as if the reader knows HTML/CSS and USWDS basics, but has never looked at HDS Core source code.

## Language guidelines

**No internal architecture terms in docs.** "Tier 1 override," "palette-aware custom properties," "shared mixin" — these belong in code comments and DESIGN.md.

**No visual implementation details.** Don't explain which CSS tokens produce a color or how a `::after` pseudo-element creates an indicator. Show the result, not the mechanism.

**Assume palette awareness.** All HDS components adapt to palettes automatically. Don't document per-palette color values unless something is broken or pending review.

**Use plain language.** Instead of "Tier 1 override," say "uses standard USWDS markup." Instead of "palette-aware," just show it working on different backgrounds via the palette switcher.

## Define once in Overview, never repeat

The Overview page explains these concepts once — don't re-explain on component or foundation pages:

- "Horizon Design System (HDS)" and "U.S. Web Design System (USWDS)" — acronyms only after Overview
- HDS Core is a Sass/CSS theme layer on USWDS
- All components adapt to color palettes automatically

## File structure

<!-- prettier-ignore -->
```
stories/
├── assets/                           # Storybook-only images (not shipped)
├── helpers/
│   ├── Note.jsx                      # Callout note component
│   ├── icons.js                      # Shared icon ID arrays (HDS + USWDS)
│   └── paletteTests.js               # Palette a11y test helpers
├── overview/
│   ├── Getting Started.mdx
│   ├── Overview.mdx
│   └── Roadmap.mdx
├── foundations/
│   ├── Accessibility.mdx             # Docs-only (no stories file)
│   ├── Color.mdx                     # Docs-only
│   ├── ColorPalettes.mdx             # Attached to ColorPalettes.stories.js
│   ├── ColorPalettes.stories.js
│   ├── DataVisualization.mdx         # Docs-only
│   ├── DataVisualizationPalettes.mdx # Docs-only
│   ├── Grid.mdx                      # Attached to Grid.stories.js
│   ├── Grid.stories.js
│   ├── Icons.mdx                     # Attached to Icons.stories.js
│   ├── Icons.stories.js
│   ├── Spacing.mdx                   # Standalone MDX
│   ├── Typography.mdx                # Attached to Typography.stories.js
│   └── Typography.stories.js
└── components/
    ├── {Component}.mdx               # Guidance page
    └── {Component}.stories.js        # Sidebar variant stories + guidance embeds + palette tests + focus tests
```

## Storybook configuration

| File | Purpose |
|---|---|
| `.storybook/main.js` | Stories glob (MDX + CSF), addons, remark-gfm, staticDirs, disableSaveFromUI |
| `.storybook/preview.js` | Palette toolbar, decorators, storySort, a11y test config, code panel, Chromatic global opt-out |
| `.storybook/preview-head.html` | CSS link to HDS styles, docs-only CSS (`.hds-note__icon`) |
| `.storybook/modes.js` | Chromatic palette modes for FocusTest stories (imported by story files, not preview.js) |
| `chromatic.config.json` | Chromatic project link, TurboSnap (`onlyChanged`), external file tracking (`externals`) |

Do not add `tags: ['autodocs']` to component meta. The Guidance MDX replaces any auto-generated page.

## MDX conventions

### Meta tag

Always use `<Meta title="..." />` with an explicit title string. Do not use `<Meta of={...} />` — it breaks when story module references change.

```mdx
// ✅ Correct
<Meta title="Components/Button/Guidance" />

// ❌ Breaks when stories file is renamed or exports change
<Meta of={ButtonStories} />
```

Component Guidance pages use a `/Guidance` suffix in the title. Foundation pages use `Foundations/PageName`.

### Above the fold

Every Guidance and Foundation page should include a Canvas or visual element immediately after the intro text — before any reference tables or detailed content. This lets users quickly identify which page they're on.

### Code blocks

Always add a language identifier to fenced code blocks (` ```html `, ` ```scss `, ` ```js `, ` ```mdx `) for syntax highlighting.

### Key rules

- MDX compiles as JSX — use `className`, `style={{ }}`, `htmlFor`
- Markdown tables require `remark-gfm` (configured in `main.js`) and blank lines above and below
- Do not use `---` horizontal rules — headings provide sufficient separation
- Always import from `@storybook/addon-docs/blocks`

### Canvas embeds

Canvas embeds can reference both `!dev` guidance stories and visible sidebar stories:

```mdx
import { Canvas } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

{/* References a visible sidebar story — shows with controls */}
<Canvas of={ButtonStories.CTA} />

{/* References a !dev guidance embed */}
<Canvas of={ButtonStories.PrimaryArrowSizes} />
```

**Prefer embedding sidebar stories directly.** Only create `!dev` guidance embeds when a specific layout is needed that no sidebar story provides — for example, `PrimaryArrowSizes` shows all 6 sizes side-by-side, which the single-size sidebar story can't replicate. Canvas does not support an `args` prop, so you cannot override story args in the embed.

**Consolidate multiple similar states into one labeled `!dev` story** rather than creating separate stories for each state. For example, pagination shows 5 bounded states (middle, near-end, last page, few pages, minimal) in one `BoundedStates` story with `hds-overline` labels, rather than 5 separate stories.

Below the first Canvas on each Guidance page, add:

```mdx
> Use the palette switcher (🖌 toolbar) to preview on all six HDS backgrounds.
```

Include this caption once per page only.

When renaming or removing story exports, always check the corresponding MDX file for `<Canvas of={} />` references — stale references cause `of={undefined}` build errors.

### Live component demos

Never inline live HDS component HTML directly in MDX. MDX renders in React context, not the HTML story renderer. HDS classes, SVG sprites, and palette wiring won't work.

**Rule of thumb:** If it uses `var(--hds-*)`, HDS classes, USWDS classes, or SVG sprites → Canvas-embedded story. Static content (swatches, tables, text) is fine inline.

### Demo-only styles in stories

Stories that need visual styling for demonstration purposes (e.g., Grid column backgrounds) should use a scoped `<style>` block with a wrapper class, not inline styles on every element. This keeps "Show code" output clean and avoids shipping demo artifacts.

```js
const demoStyles = `<style>
  .grid-demo [class*="grid-col"] {
    background-clip: content-box;
    background-color: var(--hds-color-nasa-blue, #1C67E3);
    opacity: 0.15;
    min-height: 3rem;
  }
</style>`;

const demo = (content) => `${demoStyles}<div class="grid-demo">${content}</div>`;
```

See `Grid.stories.js` for reference implementation.

### Color swatches and grids

For color swatch patterns (inline styled spans, CSS grid layouts), see `Color.mdx` and `ColorPalettes.mdx` as reference implementations.

### Figma screenshots

Store in `stories/assets/`. Use a `<figure>` with a standard caption noting that implementation may differ from Figma. See `DataVisualization.mdx` for an example.

### Callout notes

Three types for contextual information that supplements guidance:

| Type | Label | Use for |
|---|---|---|
| `uswds` | Differs from USWDS | Where HDS requires different markup or usage than vanilla USWDS |
| `figma` | Differs from Figma | Where HDS Core intentionally deviates from the HDS Figma spec |
| `code` | How this works | Technical detail useful for understanding, not essential for usage |

```mdx
import { Note } from '../helpers/Note';

<Note type="uswds">HDS ordered lists require `role="list"` for VoiceOver.</Note>
```

**Note guidelines:**

- 1–3 sentences max — longer content belongs in the main text
- Main text must stand alone without Notes
- Only when a developer would be genuinely confused
- **USWDS notes:** Focus on markup and usage differences, not visual differences. HDS is a visual theme — everything looks different from vanilla USWDS. Only note differences that affect how a developer writes markup.
- **Figma notes:** Flag where developers or designers would see a discrepancy between Storybook and Figma. Don't flag maintainer concerns (pending reviews, inferred values) — those belong in DESIGN.md.

### Future Foundations improvements

Storybook provides native doc blocks that could replace custom markup on Foundation pages:

| Block | Where it would help |
|---|---|
| `ColorPalette` / `ColorItem` | `Color.mdx` — replace custom inline JSX swatches |
| `Typeset` | `Typography.mdx` — document font families/sizes |
| `IconGallery` / `IconItem` | `Icons.mdx` — replace custom grid rendering |

These are documentation quality improvements for Phase 2 — no testing impact.

## Component Guidance page structure

- **Component name + intro** — one or two sentences: what it is and what markup it uses
- **Variants** — Canvas embed per variant, grouped under clear subheadings
- **When to use**
- **When to consider something else**
- **Usability guidance**
- **Legacy USWDS support** (optional — only when HDS markup differs from vanilla USWDS. Show the legacy markup, note tradeoffs, keep it short and skippable.)
- **Accessibility** — bulleted list of what the developer must do (ARIA attributes, keyboard behavior). Don't duplicate attributes already visible in the Canvas "Show code" view.

### Variant headings mirror the sidebar

Each variant heading under `## Variants` should match the corresponding sidebar story name. Developers should see the same structure in both the sidebar and the docs page. If a variant is worth a sidebar entry, it's worth a `<Canvas>` in the docs. If it's only worth a `<Canvas>` in the docs, ask whether the docs are organized correctly.

### What to leave out of Guidance pages

- CSS architecture, token names, mixin structure
- Per-palette color value tables
- Hover/focus/disabled state mechanics
- Information already visible in Canvas "Show code"

## Story conventions

### Sidebar variants model

Each component stories file follows this structure:

1. **Helpers** — shared builder functions
2. **Sidebar stories** — visible variants with own args (no tags), including one `AllVariants` composed story per component
3. **Guidance embeds** — MDX Canvas targets (`tags: ['!dev']`). Prefer embedding sidebar stories directly via `<Canvas of={} />`. Use `!dev` stories only when a specific layout is needed that no sidebar story provides (e.g., PrimaryArrowSizes, BoundedStates).
4. **Palette tests** — stacked PaletteA11y + PaletteA11yHover (`tags: ['!dev']`), rendering `AllVariants.render` via `paletteRender`
5. **Focus tests** — FocusTest stories with Chromatic modes + play functions (`tags: ['!dev']`), one per unique focus treatment

Stories appear in the sidebar in export order. Place sidebar stories first, then guidance embeds, then palette tests, then focus tests.

**Gold standard:** `Button.stories.js` — refer to this when refactoring other components.

### AllVariants composed story

Every component should have one `AllVariants` sidebar story that serves dual duty:

1. **Visual overview for developers** — see all variants at a glance in the sidebar
2. **Render target for PaletteA11y test stories** — maximum regression coverage per snapshot

`AllVariants` should include all major variants plus disabled states where applicable. It replaces the former `States` pattern.

When `AllVariants` renders multiple instances of a component that shares a landmark role (e.g., multiple `<nav>` elements in Pagination), disable the `landmark-unique` axe rule on that story:

```js
const multiNavA11y = {
  a11y: {
    config: {
      rules: [{ id: 'landmark-unique', enabled: false }],
    },
  },
};

export const AllVariants = {
  name: 'All Variants',
  parameters: multiNavA11y,
  render: (args = {}) => `...`,
};
```

### Sidebar stories

Each major variant gets its own export with args relevant to that variant:

```js
export const CTA = {
  name: 'CTA (default)',
  args: { label: 'Download Report', disabled: false },
  argTypes: { ... },
  render: (args = {}) => { ... },
};
```

**Default parameter values in render functions:** Sidebar story render functions must use `(args = {})` with destructured defaults so they can be safely called with no arguments by `paletteRender`:

```js
render: (args = {}) => {
  const { level1 = 'Home', level2 = 'Missions' } = args;
  return breadcrumb([level1, level2]);
},
```

### Guidance embeds

Stories referenced only by `<Canvas of={} />` in MDX. Tagged `!dev` to hide from sidebar:

```js
export const PrimaryArrowSizes = {
  name: 'Primary arrow sizes',
  tags: ['!dev'],
  render: () => `...`,
};
```

**Consolidate related states into labeled composed stories** rather than creating one story per state:

```js
export const BoundedStates = {
  name: 'Bounded states',
  tags: ['!dev'],
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        ${label('Middle page (6 of 20) — ellipsis on both sides')}
        ${pagination({ totalPages: 20, currentPage: 6 })}
      </div>
      <div>
        ${label('Near end (17 of 20) — ellipsis shifts left')}
        ${pagination({ totalPages: 20, currentPage: 17 })}
      </div>
    </div>
  `,
};
```

### Parser safety for object arrays

Storybook's indexer can misparse `label:` inside render functions as a JavaScript label statement, causing `SyntaxError: Missing semicolon` build errors. This only affects stories visible in the sidebar (not `!dev` stories, which are skipped by the indexer).

Fix: Hoist object arrays with label-like keys to module scope and rename the property:

```js
// ✅ Hoisted to module scope, property renamed to `text`
const stateVariants = [
  { text: 'CTA', classes: 'usa-button' },
  { text: 'Secondary', classes: 'usa-button usa-button--secondary' },
];

export const AllVariants = {
  render: () => {
    const rows = stateVariants.map((v) => `${label(v.text)} ...`).join('');
    return `...${rows}...`;
  },
};

// ❌ Breaks — label: inside render parsed as JS label statement
export const AllVariants = {
  render: () => {
    const variants = [
      { label: 'CTA', classes: 'usa-button' },
    ];
    ...
  },
};
```

### Story helpers

Define at the top of each story file for consistent presentation:

```js
const label = (text) => `<span class="hds-overline">${text}</span>`;

const grid = (items) => `
  <div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">
    ${items}
  </div>`;

const gridItem = (labelText, content) => `
  <div style="min-width: 10rem;">
    ${label(labelText)}
    <div style="margin-top: 0.5rem;">${content}</div>
  </div>`;
```

For components with multiple roles or variants, consider shared arg types and render factories to reduce duplication:

```js
const disabledArgTypes = {
  label: { control: 'text' },
  disabled: { control: 'boolean' },
};
```

### Unique id values

USWDS components with `id`/`aria-controls` wiring (Accordion, Tabs, Dialogs) need unique IDs per story — all Canvas embeds on a Guidance page render in the same DOM. Use a prefix parameter in helper functions:

```js
const accordion = ({ prefix = 'acc', ... }) => { ... };
export const Default = { render: () => accordion({ prefix: 'default' }) };
export const AllCollapsed = { render: () => accordion({ prefix: 'collapsed' }) };
```

### Shared icon arrays

Icon ID arrays live in `stories/helpers/icons.js` — the single source of truth for which icons exist in each sprite.

| Export | Contents |
|---|---|
| `hdsUiIcons` | UI icons (no `tag-*` or `logo-*`) |
| `hdsTagIcons` | Tag/category icons only |
| `hdsLogoIcons` | Logo/brand icons |
| `hdsIcons` | All HDS (UI + Tag + Logo) |
| `uswdsUniqueIcons` | USWDS icons with no HDS equivalent |
| `uswdsPortedIcons` | USWDS icons replaced by HDS |
| `uswdsIcons` | All USWDS (unique + ported) |

## Palette accessibility tests

Every palette-aware component should include hidden stories that test contrast across all palettes. Use the shared helpers from `stories/helpers/paletteTests.js`:

```js
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';
```

`paletteRender(renderFn)` stacks all 6 palettes in one DOM, each wrapped in a `<div class="hds-palette-{name}" style="padding: 2rem;">`. This mirrors production usage where HDS palettes coexist on pages and produces one snapshot per story — budget-efficient. Padding matches the toolbar palette decorator so Chromatic snapshots match what developers see in Storybook.

Pseudo-states are applied via `pseudoParams` spread into parameters:

```js
// Default state — stacked paletteRender
export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllVariants.render),
};

// Hover state — stacked paletteRender + pseudo-states addon
export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(AllVariants.render),
};
```

**Which story to reference:** The `AllVariants` composed sidebar story — it shows the most variants in one view, giving maximum regression coverage per snapshot.

**Non-interactive foundations** (Typography): Only need a default PaletteA11y story — no hover or focus variants since there are no interactive elements.

**Skip:** Site Alert (scoped palette vars), Color Palettes (tests palettes by definition), Grid (layout only — uses Chromatic breakpoint modes instead), Icons (catalog display).

**Chromatic visual regression:** PaletteA11y stories use stacked `paletteRender` (all 6 palettes in one image). This produces one Chromatic snapshot per story — budget-efficient. FocusTest stories use Chromatic modes instead (see below). All other stories are excluded via the global `disableSnapshot: true` in `preview.js`. Grid uses separate Chromatic breakpoint mode snapshots (see `Grid.stories.js`). Review results at the [Chromatic dashboard](https://www.chromatic.com/library?appId=69c86234709fb66fd7e0b4ab).

**Vitest local a11y:** Vitest runs axe-core against every exported story including PaletteA11y stories. The stacked DOM gives local palette contrast coverage across all 6 palettes in one pass.

**Large components (Prose pattern):** If a component's PaletteA11y story exceeds Chromatic's 25,000,000px snapshot limit when rendered via `paletteRender` (stacking all 6 palettes vertically), use individual per-palette stories instead. See Typography stories for reference.

**Known issues pending design review:** Use `a11y.test: 'todo'` inline so the test warns in Storybook UI but doesn't block CI:

```js
parameters: { ...paletteA11yParams, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
```

## Focus tests

Interactive components need FocusTest stories that capture real `:focus-visible` rings across all six palettes. These use Chromatic modes (not `paletteRender`) because play functions require a single palette per run — real DOM focus is exclusive to one element.

### Why modes for focus, stacked for everything else

HDS palettes coexist on production pages — stacked `paletteRender` mirrors this reality and is budget-efficient (1 snapshot). But play functions produce a genuine `:focus-visible` state on one element, and only the last focused element is visible in a snapshot. Modes run the play function once per palette, producing 6 independent snapshots with the real toolbar decorator.

### Why play functions, not pseudo-states

The `storybook-addon-pseudo-states` approach (still used for hover) has known timing issues in Chromatic — snapshots may capture the default state instead of the pseudo-state. Play functions produce real browser focus, which Chromatic captures reliably. Hover remains on pseudo-states because CSS `:hover` is a trusted event that cannot be triggered programmatically.

### Pattern

```js
import { expect } from 'storybook/test';
import { paletteModes } from '../../.storybook/modes';

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
  },
};

export const FocusButton = {
  name: 'Focus [button]',
  tags: ['!dev'],
  parameters: focusParams,
  render: () => btn('usa-button', 'CTA Button'),
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const button = canvas.getByRole('button', { name: 'CTA Button' });
    await expect(button).toHaveFocus();
  },
};
```

**Import path:** `paletteModes` is imported from `.storybook/modes.js` in each story file — never from `preview.js`. This avoids TurboSnap full rebuilds when modes change.

**Storybook API:** Use the Storybook 10 play function context — `canvas` and `userEvent` come from the context, not imported separately. Import `expect` from `storybook/test`.

### How many FocusTest stories per component

Analyze the component's `:focus-visible` SCSS. One FocusTest per unique focus treatment — a unique combination of outline style, width, color token, and method. If two variants share the same focus SCSS, they share one FocusTest.

Example — Button has two distinct treatments:

| Treatment | SCSS | Visual |
|---|---|---|
| `.usa-button` (all filled/outline variants) | §4.1: `2px dashed Carbon-30` (fixed) | Dashed gray ring |
| `.hds-btn--primary` (arrow button) | §11.1: `2px dotted palette-aware` | Dotted, color adapts |

Result: 2 FocusTest stories for Button.

### Deduplication across components

If a focus treatment is already captured by another component's FocusTest, don't duplicate it. For example:

- **Unstyled button** focus matches **Link** focus (both use `hds-link-appearance` mixin) → covered by Link FocusTest
- **Pagination prev/next arrows** are icon buttons → covered by Icon Button FocusTest
- **Pagination page numbers** and **simplified buttons** are unique to Pagination → need their own FocusTest stories

### Play function design

`userEvent.tab()` to reach the target element. Each tab validates that tab order is correct — if an element traps focus, the `expect` assertion fails. The final `expect(element).toHaveFocus()` confirms the right element received focus. Chromatic snapshots after the play function completes — the last focused element's `:focus-visible` ring is captured.

```js
// Tab past Previous arrow → land on first page number link
play: async ({ canvas, userEvent }) => {
  await userEvent.tab(); // Previous arrow (covered by Icon Button FocusTest)
  await userEvent.tab(); // Page 1 link — STOP
  const pageLink = canvas.getByRole('link', { name: 'Page 1' });
  await expect(pageLink).toHaveFocus();
},
```

### USWDS JS-dependent components

Components requiring USWDS JavaScript (Accordion, Banner, In-Page Navigation) may not be initialized when Chromatic captures the snapshot. For non-play-function stories, add a delay:

```js
parameters: {
  chromatic: { delay: 300 },
},
```

For play-function stories, the play function itself provides implicit delay — Chromatic waits for the play function to complete before snapshotting. If the play function interacts with a JS-dependent element (e.g., tabbing to an accordion button), it naturally waits for initialization.

## Chromatic budget and configuration

### Snapshot budget

Target: ~100–120 snapshots per build at steady state.

| Story type | Approach | Snapshots per story |
|---|---|---|
| PaletteA11y (default) | Stacked `paletteRender` | 1 |
| PaletteA11yHover | Stacked + pseudo-states | 1 |
| FocusTest | 6 Chromatic palette modes | 6 |
| Grid breakpoints | Chromatic viewport modes | 7 |

At the 5,000 free snapshots/month tier: ~40+ builds/month.

### Chromatic accessibility tests

Chromatic a11y tests are **OFF** for now. Vitest handles local a11y via axe-core. Chromatic currently bundles a11y with visual snapshots (`disableSnapshot` controls both) — enabling a11y doubles the snapshot count with no way to enable it selectively per story. Re-evaluate when Chromatic ships independent a11y/visual toggles.

### TurboSnap

Enabled via `chromatic.config.json` (`onlyChanged: true`). External Sass and asset files are declared via `externals` — any SCSS or asset change triggers a full rebuild. This is correct behavior for a CSS design system where a token change can affect any component.

TurboSnap savings apply to story-only and docs-only changes (no SCSS changes in the commit). Most active HDS Core development involves SCSS, so expect ~30–60% of builds to be full rebuilds.

TurboSnap unlocks after 10 successful Chromatic builds on CI.

### Configuration files

`.storybook/modes.js` — Chromatic palette modes. Imported by story files only (not `preview.js`) to avoid TurboSnap full rebuilds when modes change.

`chromatic.config.json` — TurboSnap config, project ID, external file globs.

`preview.js` — Global `disableSnapshot: true`. Individual test stories override to `false`.

### CSS parity

Storybook loads the same compiled `dist/css/styles.css` file that consumers receive via `<link>` in `preview-head.html`. This ensures Chromatic snapshots always reflect the shipped CSS. Do not configure Vite to compile SCSS directly for Storybook — this would create a second compilation path with potential drift from the distributed output.

## Pending documentation tasks

- [ ] Overview: Add screenshots for "Using Storybook" section
- [ ] Color: Check against color tokens, consider adding more detailed role token documentation
- [ ] Color: Evaluate Storybook `ColorPalette`/`ColorItem` native doc blocks as replacement for custom JSX swatches
- [ ] Typography: Evaluate Storybook `Typeset` native doc block
- [ ] Icons: Evaluate Storybook `IconGallery`/`IconItem` native doc blocks
- [ ] Data Visualization: Add screenshots to better match original HDS guidance
- [ ] Data Visualization Palettes: Increase border thickness/padding on categorical table containers
- [ ] Data Visualization Palettes: Add hex codes to sequential palette gradient strips
- [ ] Data Visualization Palettes: Add smaller categorical groupings (3, 4, 5, 6, 8 color subsets) from HDS Figma
- [ ] Roll out AllVariants + FocusTest pattern to remaining components
