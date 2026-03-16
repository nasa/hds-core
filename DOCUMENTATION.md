# HDS Core Documentation Conventions

Standards for Storybook documentation pages. Use this as a guide when adding or updating HDS Core documentation in Storybook.

Last updated: 2026-03-15

## Sidebar Structure

Every component gets two sidebar entries:

| Entry | Format | Audience | Purpose |
| --- | --- | --- | --- |
| Guidance | Unattached MDX | Designers + devs | Design rationale, Canvas embeds with "Show code," usage rules, accessibility |
| Playground | CSF story | Devs | Single interactive story with full controls |

Foundations (Color, Typography, etc.) are docs-only — no Playground needed.

Sort order configured in preview.js:

```js
storySort: {
  order: [
    'Overview',
    'Foundations',
    'Components', ['*', ['Guidance', 'Playground']],
  ],
},
```

"Guidance" aligns with USWDS component documentation terminology.

### Why not Guidance / Reference / Playground?

An earlier iteration used three tabs, adding a Reference page auto-generated from story metadata (`tags: ['autodocs']`). In practice this created heavy duplication — Guidance already embeds every variant via Canvas with "Show code," so Reference just repeated the same rendered output with context stripped away. Users couldn't tell which page they were on.

The two-tab model keeps one source of truth per component. If a future component grows to 10+ variants with a complex prop API, `tags: ['autodocs']` can be re-enabled on that component's meta.

## Story Tags

| Tag | Effect |
| --- | --- |
| `tags: ['!dev']` | On a story — hidden from sidebar, available for Canvas embeds in Guidance MDX |
| `tags: ['!dev', '!autodocs']` | Hidden from sidebar AND autodocs (QA-only) |

Playground stories get no extra tags (visible in sidebar).

**Do not add `tags: ['autodocs']` to component meta.** The Guidance MDX replaces the auto-generated Reference page. If a specific component needs autodocs in the future, add it per-component with a code comment explaining why.

## Story Descriptions

Story-level `parameters.docs.description.story` is optional. It is not rendered anywhere in the two-tab model (no Reference page), but can be kept as inline code documentation for contributors if useful. Keep to one sentence if included.

## Guidance Page Structure

USWDS-aligned subheadings, adapted per component. General order:

1. **Component name + intro** — what it is, tier level
2. **Variants** — Canvas embed for each, HDS-unique variants first (Tier 3), then USWDS overrides (Tier 1)
3. **When to use the [component] component**
4. **When to consider something else**
5. **Usability guidance**
6. **Component-specific sections** (e.g., "Hover behavior," "Dark palette behavior," "Bare link styling")
7. **Accessibility**

Lead with what's unique to HDS. A designer should understand the component fully without ever reading a USWDS or Figma note.

## Canvas Embeds

Import stories and embed with Canvas:

```mdx
import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Canvas of={ButtonStories.AllRoles} />
```

If the import path errors, try `'@storybook/blocks'` instead.

Below the **first** Canvas on each Guidance page, add a palette hint using the HDS caption component:

```mdx
<p class="hds-caption">
  Use the palette switcher (🖌 toolbar) to preview on all six HDS backgrounds.
</p>
```

Include the palette caption **under the first Canvas only** on each Guidance page. Once a user sees it, repeating it adds noise.

Do NOT hardcode dark background sections in story renders. The palette toolbar decorator applies to Canvas embeds — users switch palettes via the toolbar.

## Callout Notes

Three callout types for contextual information that supplements the main guidance. Uses usa-alert--info --slim --no-icon with inline sprite icons.

| Type | Sprite | Label | Use for |
| --- | --- | --- | --- |
| `uswds` | `hds-sprite.svg#logo-uswds` | Differs from USWDS | Where HDS intentionally diverges from vanilla USWDS |
| `figma` | `hds-sprite.svg#logo-figma` | Differs from Figma | Where HDS Core deviates from the HDS Figma spec |
| `code` | `sprite.svg#code` | How this works | Technical detail useful for understanding, not essential for usage |

### Usage

```mdx
import { Note } from '../helpers/Note';

<Note type="uswds">
  USWDS link applies an external icon automatically. HDS replaces it with a diagonal arrow via
  mask-image.
</Note>
```

### Guidelines for Notes

- Always visible (not collapsible) — people don't click what they don't know is relevant
- 1–3 sentences max — if it's longer, it belongs in the main text
- Don't duplicate in main text — if something is in a Note, the main prose shouldn't also explain it
- Main text must stand alone — strip all Notes and the docs should still be complete and meaningful
- Only when someone would be legit confused — don't add a USWDS note for every minor difference

### Note Component

Located at `stories/helpers/Note.jsx`. Uses React (Storybook's internal dependency) for JSX. Icon config maps types to sprite references — if creative review approves `code` for the HDS sprite, update one line in `iconConfig`.

## Story Helpers

Shared helpers keep story presentation consistent across all components. Define at the top of each story file:

```js
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
```

- `.hds-label` for all variant labels (DM Mono, uppercase, muted)
- `min-width: 10rem` on grid items for consistent alignment
- `flex-wrap: wrap` so grids adapt to narrow viewports
- Button text should reflect realistic NASA use cases, not generic labels

### Icon lists

Shared icon ID arrays live in `stories/helpers/icons.js`. Import in any story that needs an icon picker:

```js
import { hdsUiIcons, uswdsUniqueIcons } from '../helpers/icons';
```

Available exports:

| Export             | Contents                             | Use in                        |
| ------------------ | ------------------------------------ | ----------------------------- |
| `hdsUiIcons`       | UI icons only (no tag-\*)            | Icon buttons, action bars     |
| `hdsTagIcons`      | Tag/category icons only              | Chips, filters, content types |
| `hdsIcons`         | All HDS (UI + Tag)                   | Full icon pickers             |
| `uswdsUniqueIcons` | USWDS icons with no HDS equivalent   | USWDS compatibility testing   |
| `uswdsPortedIcons` | USWDS icons replaced by HDS versions | Reference / porting history   |
| `uswdsIcons`       | All USWDS (unique + ported)          | Full USWDS pickers            |

When porting a USWDS icon to HDS, move it from `uswdsUniqueIcons` to `uswdsPortedIcons` and add the HDS name to the appropriate HDS array.

To regenerate after adding or removing icons:

```bash
ls src/assets/img/hds-icons/*.svg | xargs -I{} basename {} .svg | sort
```

## Cross-Linking Between Stories

Use plain markdown links with Storybook query paths:

```mdx
For icon-only actions, use [Icon Button](?path=/docs/components-icon-button--guidance).
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

- Store in `stories/assets/` (served via `staticDirs`, not shipped in `dist`)
- Use the standard caption:

```mdx
<p class="hds-caption">
  Source: HDS Figma spec — implementation details may differ. Follow the Guidance tab for current
  behavior.
</p>
```

## Markdown Tables

MDX requires the `remark-gfm` plugin for markdown table support. This is configured in `.storybook/main.js` via the addon-docs options. Markdown tables require blank lines above and below to render correctly. For tables with embedded JSX (color swatches, links), use HTML tables instead.

## File Structure

```
stories/
  assets/                    # Storybook-only images (screenshots, not shipped)
  helpers/
    Note.jsx                 # Callout note component
    icons.js                 # Shared icon ID arrays (HDS + USWDS)
  components/
      Breadcrumb.mdx            # Guidance page
      Breadcrumb.stories.js     # Canvas-embed stories + Playground
      Button.mdx                # Guidance page
      Button.stories.js         # Canvas-embed stories + Playground
      IconButton.mdx            # Guidance page
      IconButton.stories.js     # Canvas-embed stories + Playground
      IntroText.mdx             # Guidance page
      IntroText.stories.js      # Canvas-embed stories + Playground
      Link.mdx                  # Guidance page
      Link.stories.js           # Canvas-embed stories + Playground
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
| --- | --- |
| `.storybook/main.js` | Stories glob (MDX + CSF), addons, remark-gfm, staticDirs, docs.defaultName, disableSaveFromUI |
| `.storybook/preview.js` | Palette toolbar, decorators, storySort, dynamic source |
| `.storybook/preview-head.html` | CSS link to HDS styles, docs-only CSS (`.hds-note__icon`) |

## Pending Docs Work

- [ ] Overview landing page (MDX)
- [ ] Accessibility foundation story
- [ ] Convert other foundation stories to MDX for consistency
- [ ] Explore reusable story helpers as shared module (if helpers diverge across files)
