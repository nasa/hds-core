# HDS Core Documentation Conventions

Standards for Storybook documentation pages. Use this as a guide when adding or updating HDS Core documentation in Storybook.

Last updated: 2026-03-15


## Sidebar Structure

Every component gets three sidebar entries:

| Entry | Format | Audience | Purpose |
|-------|--------|----------|---------|
| **Guidance** | Unattached MDX | Designers + devs | Design rationale, usage rules, accessibility |
| **Reference** | Autodocs (auto-generated) | Devs | All variants rendered, source code, controls |
| **Playground** | CSF story | Devs | Single interactive story with full controls |

Foundations (Color, Typography, etc.) are docs-only — no Playground needed.

Sort order configured in preview.js:

```js
storySort: {
  order: [
    'Overview',
    'Foundations',
    'Components', ['*', ['Guidance', 'Reference', 'Playground']],
  ],
},
```

"Guidance" aligns with USWDS component documentation terminology.


## Story Tags

| Tag | Effect |
|-----|--------|
| `tags: ['autodocs']` | On component meta — generates the Reference page |
| `tags: ['!dev']` | On a story — hidden from sidebar, visible in Reference page |
| `tags: ['!dev', '!autodocs']` | Hidden from sidebar AND Reference (QA-only) |

Playground stories get no extra tags (visible in sidebar + Reference).


## Story Descriptions

Two levels of description, each with a different purpose:

**`parameters.docs.description.component`** — appears at the top of the Reference page. Keep to 1–2 sentences. End with:

> See the **Guidance** tab for design rationale and usage rules.

**`parameters.docs.description.story`** — appears above each story in the Reference page. Short functional reminder only. Design rationale belongs in the Guidance MDX, not here.


## Guidance Page Structure

USWDS-aligned subheadings, adapted per component. General order:

1. **Component name + intro** — what it is, tier level
2. **HDS-unique variants first** (Tier 3), then USWDS overrides (Tier 1)
3. **When to use the [component] component**
4. **When to consider something else**
5. **Usability guidance**
6. **Component-specific sections** (e.g., "Outline on dark backgrounds", "Disabled states")
7. **Accessibility**

Lead with what's unique to HDS. A designer should understand the component fully without ever reading a USWDS or Figma note.


## Canvas Embeds

Import stories and embed with Canvas:

```mdx
import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Canvas of={ButtonStories.FilledVariants} />
```

If the import path errors, try `'@storybook/blocks'` instead.

Below each Canvas, add a palette hint using the HDS caption component:

```mdx
<p className="hds-caption">
  Use the palette switcher (🖌 toolbar) to preview on all six HDS backgrounds.
</p>
```

Do NOT hardcode dark background sections in story renders. The palette toolbar decorator applies to Canvas embeds — users switch palettes via the toolbar.


## Callout Notes

Three callout types for contextual information that supplements the main guidance. Uses `usa-alert--info --slim --no-icon` with inline sprite icons.

| Type | Sprite | Label | Use for |
|------|--------|-------|---------|
| `uswds` | `hds-sprite.svg#logo-uswds` | Differs from USWDS | Where HDS intentionally diverges from vanilla USWDS |
| `figma` | `hds-sprite.svg#logo-figma` | Differs from Figma | Where HDS Core deviates from the HDS Figma spec |
| `code` | `sprite.svg#code` | How this works | Technical detail useful for understanding, not essential for usage |

### Usage

```mdx
import { Note } from '../helpers/Note';

<Note type="uswds">
  USWDS defaults to primary = blue. HDS Core flips this at the theme level — no class changes needed.
</Note>
```

### Guidelines for Notes

- **Always visible** (not collapsible) — people don't click what they don't know is relevant
- **1–3 sentences max** — if it's longer, it belongs in the main text
- **Don't duplicate in main text** — if something is in a Note, the main prose shouldn't also explain it
- **Main text must stand alone** — strip all Notes and the docs should still be complete and meaningful
- **Only when someone would be legit confused** — don't add a USWDS note for every minor difference

### Note Component

Located at `stories/helpers/Note.jsx`. Uses React (Storybook's internal dependency) for JSX. Icon config maps types to sprite references — if creative review approves `code` for the HDS sprite, update one line in `iconConfig`.


## Story Helpers

Shared helpers keep story presentation consistent across all components. Define at the top of each story file:

```js
const label = (text) => `<span class="hds-label">${text}</span>`;

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

- **`.hds-label`** for all variant labels (DM Mono, uppercase, muted)
- **`min-width: 10rem`** on grid items for consistent alignment
- **`flex-wrap: wrap`** so grids adapt to narrow viewports
- Button text should reflect **realistic NASA use cases**, not generic labels


## Cross-Linking Between Stories

Use plain markdown links with Storybook query paths:

```mdx
For icon-only actions, use [Icon Button](?path=/story/components-icon-button--all-roles).
```

URL patterns:
- Docs pages: `?path=/docs/{story-id}`
- Canvas stories: `?path=/story/{story-id}`

To find a story's ID, click it in the sidebar and read the URL.


## Color Swatches in Tables

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


## Figma Screenshots

When Figma reference images are useful (composed patterns, real page layouts):

- Store in `stories/assets/` (served via `staticDirs`, not shipped in dist)
- Use the standard caption:

```mdx
<p className="hds-caption">
  Source: HDS Figma spec — implementation details may differ.
  Follow the Reference tab for current behavior.
</p>
```


## Markdown Tables

MDX requires the `remark-gfm` plugin for markdown table support. This is configured in `.storybook/main.js` via the `addon-docs` options. Markdown tables require blank lines above and below to render correctly. For tables with embedded JSX (color swatches, links), use HTML tables instead.


## File Structure

```
stories/
  assets/                    # Storybook-only images (screenshots, not shipped)
  helpers/
    Note.jsx                 # Callout note component
  components/
    Button.mdx               # Guidance page
    Button.stories.js         # Reference + Playground stories
    IconButton.mdx            # Guidance page (TODO)
    IconButton.stories.js     # Stories
    Link.mdx                  # Guidance page (TODO)
    Link.stories.js           # Stories
  foundations/
    Color.stories.js
    Grid.stories.js
    Icons.stories.js
    PaletteSpec.stories.js
    Spacing.stories.js
    Typography.stories.js
```


## Storybook Configuration

| File | Purpose |
|------|---------|
| `.storybook/main.js` | Stories glob (MDX + CSF), addons, remark-gfm, staticDirs, docs.defaultName |
| `.storybook/preview.js` | Palette toolbar, decorators, storySort |
| `.storybook/preview-head.html` | CSS link to HDS styles, docs-only CSS (.hds-note__icon) |


## Pending Docs Work

[ ] Apply Guidance / Reference / Playground pattern to Icon Button
[ ] Apply Guidance / Reference / Playground pattern to Link
[ ] Style .hds-note callouts — neutral gray background/border, spacing between consecutive notes
[ ] Note code.svg creative review in GitHub Discussions (currently referencing USWDS sprite)
[ ] Overview landing page (MDX)
[ ] Accessibility foundation story
[ ] Convert other foundation stories to MDX for consistency
[ ] Explore reusable story helpers as shared module (if helpers diverge across files)