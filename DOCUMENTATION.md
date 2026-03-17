Let me check what we've accumulated since the earlier DOCUMENTATION.md commit: Here's the complete updated DOCUMENTATION.md. I've incorporated everything from our earlier draft plus the additional items we picked up during the Grid, Spacing, Typography, and Icons work:

```markdown
# HDS Core Documentation Conventions

Standards for Storybook documentation pages. Use this as a guide when adding or updating HDS Core documentation in Storybook.

Last updated: 2026-03-17

## Audience

HDS Core Storybook documentation is for developers, designers, and site administrators who are implementing HDS components on their sites. It is not for HDS Core maintainers — maintainer context belongs in code comments, DESIGN.md, and ARCHITECTURE.md.

Write as if the reader knows HTML/CSS and USWDS basics, but has never looked at HDS Core source code. They don't need to know how the sausage is made — just how to use it.

## Language guidelines

**No internal architecture terms in docs.** "Tier 1 override," "Path A/B," "palette-aware custom properties," "shared mixin" — these belong in code comments and DESIGN.md, not in Storybook guidance pages.

**No visual implementation details.** Don't explain which CSS tokens produce a color or how a `::after` pseudo-element creates an indicator. Show the result, not the mechanism.

**Assume palette awareness.** All HDS Core components adapt to palettes automatically. Don't document per-palette color values unless something is broken or pending review. The whole point of HDS Core is not needing to know that stuff.

**Use plain language for concepts.** Instead of "Tier 1 override," say "uses standard USWDS markup." Instead of "palette-aware," just show it working on different backgrounds via the palette switcher.

### Define once in Overview, never repeat

The Overview page expands and explains these concepts so they don't need to be re-explained on every other page:

- **"Horizon Design System (HDS)"** and **"U.S. Web Design System (USWDS)"** — expanded once in Overview, then acronyms only everywhere else.
- **HDS Core is a Sass/CSS theme layer on USWDS** — don't re-explain on component pages.
- **"All components adapt to color palettes automatically"** — established in Overview, assumed everywhere else.
- **How to use Storybook** (palette switcher, viewport switcher, Measure tool, "Show code," Guidance vs Playground) — explained once in Overview.
- **Installation** — covered in Overview with link to README. Don't include setup instructions on component or foundation pages.
- **Current version / scope** (pre-1.0, CSS-only, no JS beyond USWDS) — stated in Overview, not repeated elsewhere.

### Cross-linking

Link to related Foundation or Component pages rather than re-explaining concepts. Keep the local mention to one sentence and link out for details.

Good: "HDS uses NASA Red for navigation actions and NASA Blue for on-page actions. See [Color](?path=/docs/foundations-color--docs) for the full palette."

Bad: Re-explaining the entire wayfinding color system on every component page.

Link to external USWDS docs when extending or overriding a USWDS concept:

Good: "HDS breadcrumbs use USWDS [Breadcrumb](https://designsystem.digital.gov/components/breadcrumb/) markup."

## File structure
```

stories/ assets/ # Storybook-only images (screenshots, not shipped) helpers/ Note.jsx # Callout note component icons.js # Shared icon ID arrays (HDS + USWDS) overview/ Overview.mdx # Landing page — <Meta title="Overview" /> Roadmap.mdx # What's in v1.0 — <Meta title="Overview/Roadmap" /> foundations/ Accessibility.mdx # Docs-only (no stories file) Color.mdx # Docs-only — swatches use inline styled spans ColorPalettes.mdx # Attached to ColorPalettes.stories.js ColorPalettes.stories.js # Hidden stories for palette Canvas embeds DataVisualization.mdx # Docs-only (no stories file) DataVisualizationPalettes.mdx # Docs-only — swatch tables Grid.mdx # Attached to Grid.stories.js Grid.stories.js # Hidden stories for grid Canvas embeds Icons.mdx # Attached to Icons.stories.js Icons.stories.js # Hidden stories — imports from helpers/icons.js Spacing.mdx # Standalone MDX — uses Grid.stories.js for stacking demo Typography.mdx # Attached to Typography.stories.js Typography.stories.js # Hidden stories for type Canvas embeds components/ Breadcrumb.mdx # Guidance page Breadcrumb.stories.js # Canvas-embed stories + Playground Button.mdx Button.stories.js IconButton.mdx IconButton.stories.js IntroText.mdx IntroText.stories.js Link.mdx Link.stories.js Pagination.mdx Pagination.stories.js

```


## Storybook configuration

| File | Purpose |
|---|---|
| `.storybook/main.js` | Stories glob (MDX + CSF), addons, remark-gfm, staticDirs, disableSaveFromUI |
| `.storybook/preview.js` | Palette toolbar, decorators, storySort, dynamic source |
| `.storybook/preview-head.html` | CSS link to HDS styles, docs-only CSS (`.hds-note__icon`) |

Auto-generated Reference pages are not used. Do not add `docs.defaultName` to
main.js or `tags: ['autodocs']` to component meta.


## Sidebar structure

```

Overview Overview / Roadmap Foundations / Accessibility Foundations / Color Foundations / Color Palettes Foundations / Data Visualization Foundations / Data Visualization Palettes Foundations / Grid Foundations / Icons Foundations / Spacing Foundations / Typography Components / [ComponentName] / Guidance Components / [ComponentName] / Playground

````

**Foundations sort alphabetically** — no explicit ordering needed beyond the
category level in `storySort`.

The `storySort` config in `preview.js` controls category order:

```js
storySort: {
  order: ['Overview', 'Foundations', 'Components', ['*', ['Guidance', 'Playground']]],
},
````

Sidebar positions are controlled by `<Meta title="..." />` in MDX files or `title` in CSF story exports. The file location is organizational only.

## MDX authoring

### Import path

Always use:

```mdx
import { Meta, Canvas } from '@storybook/addon-docs/blocks';
```

### JSX syntax in MDX

MDX files are compiled as JSX. When writing HTML inside MDX, use JSX attribute syntax:

- `className` not `class`
- `style={{ property: 'value' }}` not `style="property: value"`
- `htmlFor` not `for`

### Live component demos

**Never inline live HDS component HTML directly in MDX.** MDX docs render in React/JSX context, not the HTML story renderer. HDS classes, SVG sprites, and palette wiring won't behave as expected.

**Rule of thumb:** If a demo uses `var(--hds-*)` custom properties, HDS classes, USWDS classes, or SVG sprites, it must be a Canvas-embedded story. Inline MDX only works for purely structural/decorative elements with hardcoded values (color swatch `<span>`s, spacing bar `<div>`s, etc.).

Create hidden stories in a companion `.stories.js` file and embed via Canvas:

```mdx
import { Canvas } from '@storybook/addon-docs/blocks';
import * as PaletteStories from './ColorPalettes.stories';

<Canvas of={PaletteStories.White} />
```

The stories use plain HTML template literals (the same as all component stories) and render inside Storybook's story iframe where HDS CSS is fully active. Use `tags: ['!dev']` to hide these stories from the sidebar.

**Static content is fine in MDX.** Color swatches, tables, code blocks, text, and images work directly in MDX — they don't depend on HDS CSS.

### Horizontal rules

Do not use `---` horizontal rules to separate sections. Headings provide sufficient visual separation. If additional spacing is needed, use a margin spacer:

```mdx
<div style={{ marginTop: '3rem' }} />
```

### Color swatches in tables

Use inline styled spans for accurate brand colors in HTML tables:

```html
<span style={{
  display: 'inline-block',
  width: '0.85em',
  height: '0.85em',
  backgroundColor: '#FC3D21',
  borderRadius: '50%',
  verticalAlign: 'middle',
  marginRight: '0.35em',
}} />
```

Use HTML tables (not markdown) when embedding JSX like swatches.

### Hero swatches

For large color swatch grids (Primary palette, Extended palette, etc.), use a CSS grid with `auto-fill` to prevent swatches from stretching when the last row is short:

```mdx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1.5rem',
  marginBlock: '2rem',
}}>
```

For the Carbon neutral scale, use smaller swatches:

```mdx
gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
```

### Canvas embeds

Import stories and embed with Canvas:

```mdx
import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Canvas of={ButtonStories.Default} />
```

Below the first Canvas on each Guidance page, add a palette hint:

```mdx
> Use the palette switcher (🖌 toolbar) to preview on all six HDS backgrounds.
```

Include the palette caption under the first Canvas only on each Guidance page. Once a user sees it, repeating it adds noise.

Do NOT hardcode dark background sections in story renders. The palette toolbar decorator applies to Canvas embeds — users switch palettes via the toolbar.

### Figma screenshots

When Figma reference images are useful (composed patterns, real page layouts):

- Store in `stories/assets/` (served via `staticDirs`, not shipped in `dist`)
- Use the standard caption:

```mdx
<figure>
  <img
    src="/assets/my-image.png"
    alt="Descriptive alt text"
    style={{ maxWidth: '600px', width: '100%' }}
  />
  <figcaption style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.5rem' }}>
    Source: HDS Figma spec — implementation details may differ. Follow the Guidance tab for current
    behavior.
  </figcaption>
</figure>
```

For side-by-side text and image layouts, use a grid instead of floats:

```mdx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2rem',
  alignItems: 'start',
}}>
  <div>

Your guidance text here.

  </div>
  <img src="/assets/my-image.png" alt="Descriptive alt text"
       style={{ maxWidth: '100%' }} />
</div>
```

### Markdown tables

MDX requires the `remark-gfm` plugin for markdown table support. This is configured in `.storybook/main.js` via the addon-docs options. Markdown tables require blank lines above and below to render correctly. For tables with embedded JSX (color swatches, links), use HTML tables instead.

### Cross-linking between stories

Use plain markdown links with Storybook query paths:

```mdx
For icon-only actions, use [Icon Button](?path=/docs/components-icon-button--guidance).
```

URL patterns:

- Docs pages: `?path=/docs/{story-id}`
- Canvas stories: `?path=/story/{story-id}`

To find a story's ID, click it in the sidebar and read the URL. Links can target a Guidance page but not a specific heading within it — reference the section name in the link text (e.g., "see that page's Accessibility section").

## Callout notes

Three callout types for contextual information that supplements the main guidance. Uses `usa-alert--info --slim --no-icon` with inline sprite icons.

| Type | Sprite | Label | Use for |
| --- | --- | --- | --- |
| `uswds` | `hds-sprite.svg#logo-uswds` | Differs from USWDS | Where HDS requires different markup or usage patterns than vanilla USWDS |
| `figma` | `hds-sprite.svg#logo-figma` | Differs from Figma | Where HDS Core intentionally deviates from the HDS Figma spec |
| `code` | `sprite.svg#code` | How this works | Technical detail useful for understanding, not essential for usage |

Usage:

```mdx
import { Note } from '../helpers/Note';

<Note type="uswds">
  USWDS pagination uses anchor tags with visible Previous/Next text. HDS uses icon-only circle
  buttons.
</Note>
```

### Guidelines for notes

- Always visible (not collapsible) — people don't click what they don't know is relevant
- 1–3 sentences max — if it's longer, it belongs in the main text
- Don't duplicate in main text — if something is in a Note, the main prose shouldn't also explain it
- Main text must stand alone — strip all Notes and the docs should still be complete and meaningful
- Only when someone would be legit confused — don't add a note for every minor difference

### "Differs from USWDS" guidelines

These notes should focus on markup and usage differences — places where a developer's existing USWDS knowledge might lead them astray:

- Good: "USWDS pagination uses anchor tags with visible Previous/Next text. HDS uses icon-only circle buttons."
- Good: "USWDS breadcrumbs use chevron separators. HDS uses forward slashes."
- Bad: "HDS pagination uses Inter semibold with -0.5px letterspacing instead of USWDS defaults." (Visual difference — obviously HDS looks different from USWDS, that's the point.)
- Bad: "All colors are palette-aware via custom properties." (Implementation detail, and palette awareness is assumed for all components.)

Do not use USWDS notes to explain visual differences (colors, fonts, spacing, border radius). HDS Core is a visual theme — everything looks different from vanilla USWDS. Only note differences that affect how a developer writes markup or chooses a component.

### "Differs from Figma" guidelines

These notes flag where HDS Core's implementation intentionally differs from the HDS Figma spec. They help designers understand what to expect when comparing Storybook to Figma:

- Good: "The HDS Figma spec suggests simplified pagination for ≤5 pages. HDS Core treats this as a screen-size decision."
- Good: "The Figma spec includes a rows-per-page filter. This requires a dropdown menu component and is deferred."
- Bad: "Blue palette utility hover values are inferred, pending creative director review." (Maintainer concern — belongs in DESIGN.md.)

### Note component

Located at `stories/helpers/Note.jsx`. Uses React (Storybook's internal dependency) for JSX. Icon config maps types to sprite references — if creative review approves `code` for the HDS sprite, update one line in `iconConfig`.

## Component Guidance page structure

General order, adapted per component:

1. **Component name + intro** — one or two sentences: what it is and what markup it uses. Keep it short.
2. **Variants** — Canvas embed for each variant, grouped under clear subheadings with brief descriptions of when each variant applies.
3. **When to use the [component] component**
4. **When to consider something else**
5. **Usability guidance**
6. **Legacy USWDS support** (optional — only for components where HDS markup differs from vanilla USWDS)
7. **Accessibility**

### Intro guidelines

The intro should tell a developer what they need to know in one or two sentences:

- Good: "HDS pagination uses standard USWDS `.usa-pagination` markup, with no need for additional classes."
- Good: "HDS breadcrumbs use USWDS `.usa-breadcrumb` markup with a strict 3-element maximum."
- Too much: "HDS pagination uses USWDS `.usa-pagination` markup with HDS theming (Tier 1 override). All colors are palette-aware via CSS custom properties with Spacesuit White fallbacks."

### Variant guidelines

Each variant section should have clear, non-overlapping criteria. Avoid page-count ranges that overlap between variants. If a variant is context-dependent (e.g., screen size rather than data count), say so explicitly.

### What to include

- Practical usage guidance a developer needs to implement the component correctly.
- Clear variant boundaries with non-overlapping criteria.
- One code example per pattern when markup isn't obvious from "Show code" on the Canvas.
- Accessibility requirements that the developer must handle (ARIA attributes, keyboard behavior).

### What to leave out

- Internal implementation details (CSS architecture, token names, mixin structure).
- Per-palette color value tables — palette adaptation is automatic and assumed.
- Hover/focus/disabled state mechanics — these are visual and the developer doesn't configure them.
- Information already visible in the Canvas "Show code" view — don't duplicate markup the reader can already see.

### Legacy USWDS support sections

Some HDS components use different markup than vanilla USWDS for full fidelity (e.g., icon buttons for pagination arrows instead of USWDS text links). When this is the case, include a Legacy USWDS support section near the end of the Guidance page.

Structure:

- Brief explanation that existing USWDS markup is automatically restyled by HDS Core CSS.
- One code example showing the legacy USWDS markup.
- A short note on tradeoffs (e.g., "retains USWDS chevrons instead of HDS chevrons").
- A USWDS Note explaining the behavioral difference.

Keep it short and skippable — developers working on new sites can ignore this section entirely. Developers migrating existing USWDS sites get the information they need to decide whether to update their markup.

Do not use "Path A / Path B" or other internal labels. Just say "recommended markup" (the main docs) and "legacy USWDS markup" (this section).

### Accessibility sections

Every component Guidance page ends with an Accessibility section. Keep it focused on what the developer must do:

- Bulleted list of requirements — keyboard behavior, ARIA attributes, landmark roles.
- No code blocks if the required attributes are already visible in the variant markup above. Add a line like: "The recommended markup shown above includes all necessary ARIA attributes."
- Link to related components when accessibility patterns are shared. Example: "Previous/next arrows follow the same patterns as Icon Button — see that page's Accessibility section."
- Only document what the developer controls. Don't explain how CSS produces focus rings or how palette tokens change colors. Do explain which ARIA attributes to add and what keyboard behavior to expect.

## Story conventions

### Tags

```js
// Component stories: Guidance embeds are hidden from sidebar
export const Default = {
  tags: ['!dev'],
  render: () => `...`,
};

// Playground story: visible in sidebar
export const Playground = {
  render: (args) => `...`,
};
```

Do not add `tags: ['autodocs']` to component meta. The Guidance MDX replaces any auto-generated page.

### Story descriptions

`parameters.docs.description.story` is optional. It is not rendered anywhere in the Guidance + Playground model, but can be kept as inline code documentation for contributors if useful. Keep to one sentence if included.

### Story helpers

Shared helpers keep story presentation consistent across all components. Define at the top of each story file:

```js
const label = (text) => `<p class="hds-label">${text}</p>`;

const grid = (items) => `
  <div style="display: flex; flex-wrap: wrap; gap: 2rem;">
    ${items}
  </div>`;

const gridItem = (labelText, content) => `
  <div style="min-width: 10rem;">
    ${label(labelText)}
    <div style="margin-top: 0.75rem;">${content}</div>
  </div>`;
```

- `.hds-label` for all variant labels (DM Mono, uppercase, muted)
- `min-width: 10rem` on grid items for consistent alignment
- `flex-wrap: wrap` so grids adapt to narrow viewports
- Button text should reflect realistic NASA use cases, not generic labels

### Component-specific helpers

When a component needs a helper function to generate its markup (e.g., `breadcrumb()` for Breadcrumb, `pagination()` for Pagination), define it in the story file. These helpers generate static HTML for Storybook demos — they don't ship with HDS Core and aren't available to consumers.

### Shared icon arrays

Icon ID arrays live in `stories/helpers/icons.js` — the single source of truth for which icons exist in each sprite. Foundation and component stories import from here rather than maintaining separate icon lists.

Available exports:

| Export             | Contents                             | Use in                            |
| ------------------ | ------------------------------------ | --------------------------------- |
| `hdsUiIcons`       | UI icons (no `tag-*` or `logo-*`)    | Icon buttons, action bars         |
| `hdsTagIcons`      | Tag/category icons only              | Chips, filters, content types     |
| `hdsLogoIcons`     | Logo/brand icons (`logo-*`)          | Logos section of Icons foundation |
| `hdsIcons`         | All HDS (UI + Tag + Logo)            | Full icon pickers                 |
| `uswdsUniqueIcons` | USWDS icons with no HDS equivalent   | USWDS compatibility testing       |
| `uswdsPortedIcons` | USWDS icons replaced by HDS versions | Reference / porting history       |
| `uswdsIcons`       | All USWDS (unique + ported)          | Full USWDS pickers                |

The Icons foundation story derives subcategories (Arrows, Actions, Space, Files) by filtering prefixes from `hdsUiIcons` — adding a new icon to `icons.js` automatically includes it in the right subcategory.

When porting a USWDS icon to HDS, move it from `uswdsUniqueIcons` to `uswdsPortedIcons` and add the HDS name to the appropriate HDS array.

To regenerate after adding or removing icons:

```bash
ls src/assets/img/hds-icons/*.svg | xargs -I{} basename {} .svg | sort
```

## Pending documentation tasks

- [ ] Data Visualization Palettes: increase border thickness/padding on categorical table containers (currently 1px, needs more visual weight)
- [ ] Data Visualization Palettes: add hex codes to sequential palette gradient strips (match Color.mdx swatch style, scaled down)
- [ ] Data Visualization Palettes: add smaller categorical groupings (3, 4, 5, 6, 8 color subsets) from HDS Figma, converted to USWDS token hex values
- [ ] Audit existing Guidance pages (Breadcrumb, Button, IconButton, IntroText, Link, Pagination) against updated documentation conventions — simplify language, remove internal architecture terms, verify note usage follows USWDS/Figma note guidelines, add cross-links to Foundation pages, remove redundant color/palette explanations
