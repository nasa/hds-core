# HDS Core Documentation Conventions

Standards for Storybook documentation pages.

Last updated: 2026-03-30

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
    └── {Component}.stories.js        # Sidebar variant stories + guidance embeds + palette tests
```

## Storybook configuration

| File | Purpose |
|---|---|
| `.storybook/main.js` | Stories glob (MDX + CSF), addons, remark-gfm, staticDirs, disableSaveFromUI |
| `.storybook/preview.js` | Palette toolbar, decorators, storySort, a11y test config, code panel, Chromatic global opt-out |
| `.storybook/preview-head.html` | CSS link to HDS styles, docs-only CSS (`.hds-note__icon`) |
| `chromatic.config.json` | Chromatic project link (visual regression) |

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

Always add a language identifier to fenced code blocks (` ```html `, ` ```scss `, ` ```js `, ` ```mdx `) for syntax highlighting. A full pass across existing files is pending.

### Key rules

- MDX compiles as JSX — use `className`, `style={{ }}`, `htmlFor`
- Markdown tables require `remark-gfm` (configured in `main.js`) and blank lines above and below
- Do not use `---` horizontal rules — headings provide sufficient separation
- Always import from `@storybook/addon-docs/blocks`

### Live component demos

Never inline live HDS component HTML directly in MDX. MDX renders in React context, not the HTML story renderer. HDS classes, SVG sprites, and palette wiring won't work.

**Rule of thumb:** If it uses `var(--hds-*)`, HDS classes, USWDS classes, or SVG sprites → Canvas-embedded story. Static content (swatches, tables, text) is fine inline.

Canvas embeds can reference both `!dev` guidance stories and visible sidebar stories:

```mdx
import { Canvas } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

{/* References a !dev guidance embed */}
<Canvas of={ButtonStories.AllVariants} />

{/* References a visible sidebar story — shows with controls */}
<Canvas of={ButtonStories.Default} />
```

Below the first Canvas on each Guidance page, add:

```mdx
> Use the palette switcher (🖌 toolbar) to preview on all six HDS backgrounds.
```

Include this caption once per page only.

When renaming or removing story exports, always check the corresponding MDX file for `<Canvas of={} />` references — stale references cause `of={undefined}` build errors.

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

## Component Guidance page structure

- **Component name + intro** — one or two sentences: what it is and what markup it uses
- **Variants** — Canvas embed per variant, grouped under clear subheadings
- **When to use**
- **When to consider something else**
- **Usability guidance**
- **Legacy USWDS support** (optional — only when HDS markup differs from vanilla USWDS. Show the legacy markup, note tradeoffs, keep it short and skippable.)
- **Accessibility** — bulleted list of what the developer must do (ARIA attributes, keyboard behavior). Don't duplicate attributes already visible in the Canvas "Show code" view.

### What to leave out of Guidance pages

- CSS architecture, token names, mixin structure
- Per-palette color value tables
- Hover/focus/disabled state mechanics
- Information already visible in Canvas "Show code"

## Story conventions

### Sidebar variants model

Each component stories file follows this structure:

1. **Helpers** — shared builder functions
2. **Sidebar stories** — visible variants with own args (no tags)
3. **Guidance embeds** — MDX Canvas targets (`tags: ['!dev']`)
4. **Palette tests** — a11y contrast tests (`tags: ['!dev']`)

Stories appear in the sidebar in export order. Place sidebar stories first, then guidance embeds, then palette tests.

**Gold standard:** `Accordion.stories.js` — refer to this when refactoring other components.

### Sidebar stories

Sidebar stories replace the former Playground pattern. Each major variant gets its own export with args relevant to that variant:

```js
// Visible in sidebar — each variant has own args
export const Default = {
  args: { itemCount: 5, firstExpanded: true },
  argTypes: { ... },
  render: (args = {}) => { ... },
};

export const Multiselectable = {
  args: { ... },
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
export const AllCollapsed = {
  tags: ['!dev'],
  render: () => accordion({ prefix: 'collapsed', firstExpanded: false }),
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

export const States = {
  render: () => {
    const rows = stateVariants.map((v) => `${label(v.text)} ...`).join('');
    return `...${rows}...`;
  },
};

// ❌ Breaks — label: inside render parsed as JS label statement
export const States = {
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

const grid = (items) => `<div class="grid">${items}</div>`;

const gridItem = (labelText, content) => `
  <div>
    ${label(labelText)}
    ${content}
  </div>
`;
```

For components with multiple roles or variants, consider shared arg types and render factories to reduce duplication:

```js
// Shared argTypes
const disabledArgTypes = {
  label: { control: 'text' },
  disabled: { control: 'boolean' },
};

// Render factory
const roleRender = (role) => (args = {}) => {
  return iconBtn(role, args.iconName, args.ariaLabel, { disabled: args.disabled });
};

export const CTA = {
  args: { ... },
  argTypes: disabledArgTypes,
  render: roleRender('cta'),
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

### Palette accessibility tests

Every palette-aware component should include hidden stories that test contrast across all non-default palettes. Use the shared helpers from `stories/helpers/paletteTests.js`:

```js
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';
```

`paletteRender(renderFn)` takes only the render function — no pseudo-state parameter. Pseudo-states are applied via `pseudoParams` spread into parameters:

```js
// Default state
export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(Default.render),
};

// Hover state — spread pseudoParams.hover into parameters
export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(Default.render),
};

// Focus state — spread pseudoParams.focusVisible into parameters
export const PaletteA11yFocus = {
  name: 'Palette a11y [focus-visible]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.focusVisible },
  render: paletteRender(Default.render),
};
```

**Which story to reference:** The most visually complex variant — the one with the most distinct text colors, button types, or interactive states.

**Non-interactive foundations** (Typography): Only need a default PaletteA11y story — no hover or focus-visible variants since there are no interactive elements.

**Skip:** Site Alert (scoped palette vars), Color Palettes (tests palettes by definition), Grid (layout only — uses Chromatic breakpoint modes instead), Icons (catalog display).

**Known limitation:** `storybook-addon-pseudo-states` rewrites CSS selectors at runtime to simulate hover and focus-visible states. This works in live Storybook but has known issues:
- **Chromatic snapshots** may capture default state instead of the pseudo-state due to addon timing
- **Complex USWDS selectors** may not rewrite correctly, producing inaccurate hover renders
- **Vitest/axe-core** runs against the rendered DOM without pseudo-state activation — axe checks default-state contrast on hover/focus stories

Play-function-based focus stories (Chromatic's recommended approach) are planned as a replacement for focus-visible testing. See ARCHITECTURE.md § Pending Work.

**Known issues pending design review:** Use `a11y.test: 'todo'` inline so the test warns in Storybook UI but doesn't block CI:

```js
parameters: { ...paletteA11yParams, a11y: { ...paletteA11yParams.a11y, test: 'todo' } },
```

**Chromatic visual regression:** PaletteA11y stories are the only component stories snapshotted by Chromatic (`disableSnapshot: false` inherited from `paletteA11yParams`). All other stories are excluded via the global `disableSnapshot: true` in `preview.js`. Grid uses separate Chromatic breakpoint mode snapshots (see `Grid.stories.js`). Review results at the [Chromatic dashboard](https://www.chromatic.com/library?appId=69c86234709fb66fd7e0b4ab).

**Large components (Prose pattern):** If a component's PaletteA11y story exceeds Chromatic's 25,000,000px snapshot limit when rendered via `paletteRender` (stacking all 6 palettes vertically), use individual per-palette stories instead:

```js
const paletteProse = (palette) => `
<div class="hds-palette-${palette}">
  ${prose()}
</div>
`;

export const PaletteA11yWhite = {
  name: 'Palette a11y [white]',
  tags: ['!dev'],
  parameters: prosePaletteParams,
  render: () => paletteProse('white'),
};
// ... one per palette
```

## Pending documentation tasks

- [ ] Overview: Add screenshots for "Using Storybook" section, update any references to "Playground"
- [ ] Color: Check against color tokens, consider adding more detailed role token documentation
- [ ] Data Visualization: Add screenshots to better match original HDS guidance
- [ ] Data Visualization Palettes: Increase border thickness/padding on categorical table containers
- [ ] Data Visualization Palettes: Add hex codes to sequential palette gradient strips
- [ ] Data Visualization Palettes: Add smaller categorical groupings (3, 4, 5, 6, 8 color subsets) from HDS Figma