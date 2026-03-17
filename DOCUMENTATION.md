# HDS Core Documentation Conventions

Standards for Storybook documentation pages. Use this as a guide when adding or updating HDS Core documentation in Storybook.

Last updated: 2026-03-16

## Audience

HDS Core Storybook documentation is for **developers, designers, and site administrators** who are implementing HDS components on their sites. It is not for HDS Core maintainers — maintainer context belongs in code comments, DESIGN.md, and ARCHITECTURE.md.

Write as if the reader knows HTML/CSS and USWDS basics, but has never looked at HDS Core source code. They don't need to know how the sausage is made — just how to use it.

### Language guidelines

- **No internal architecture terms in docs.** "Tier 1 override," "Path A/B," "palette-aware custom properties," "shared mixin" — these belong in code comments and DESIGN.md, not in Storybook guidance pages.
- **No visual implementation details.** Don't explain which CSS tokens produce a color or how a `::after` pseudo-element creates an indicator. Show the result, not the mechanism.
- **Assume palette awareness.** All HDS Core components adapt to palettes automatically. Don't document per-palette color values unless something is broken or pending review. The whole point of HDS Core is not needing to know that stuff.
- **Use plain language for concepts.** Instead of "Tier 1 override," say "uses standard USWDS markup." Instead of "palette-aware," just show it working on different backgrounds via the palette switcher.

## Sidebar Structure

Every component gets two sidebar entries:

| Entry | Format | Audience | Purpose |
| --- | --- | --- | --- |
| Guidance | Unattached MDX | Designers + devs | What it is, how to use it, when to use it, accessibility |
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

General order, adapted per component:

1. **Component name + intro** — one or two sentences: what it is and what markup it uses. Keep it short. Example: "HDS pagination uses standard USWDS `.usa-pagination` markup, with no need for additional classes."
2. **Variants** — Canvas embed for each variant, grouped under clear subheadings with brief descriptions of when each variant applies.
3. **When to use the [component] component**
4. **When to consider something else**
5. **Usability guidance**
6. **Legacy USWDS support** _(optional — only for components where HDS markup differs from vanilla USWDS)_
7. **Accessibility**

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

### Intro guidelines

The intro should tell a developer what they need to know in one or two sentences:

- **Good:** "HDS pagination uses standard USWDS `.usa-pagination` markup, with no need for additional classes."
- **Good:** "HDS breadcrumbs use USWDS `.usa-breadcrumb` markup with a strict 3-element maximum."
- **Too much:** "HDS pagination uses USWDS `.usa-pagination` markup with HDS theming (Tier 1 override). All colors are palette-aware via CSS custom properties with Spacesuit White fallbacks."

### Variant guidelines

Each variant section should have clear, non-overlapping criteria. Avoid page-count ranges that overlap between variants. If a variant is context-dependent (e.g., screen size rather than data count), say so explicitly.

## Canvas Embeds

Import stories and embed with Canvas:

```mdx
import { Meta, Canvas } from '@storybook/addon-docs/blocks';
import * as ButtonStories from './Button.stories';

<Canvas of={ButtonStories.AllRoles} />
```

If the import path errors, try `'@storybook/blocks'` instead.

Below the **first** Canvas on each Guidance page, add a palette hint:

```mdx
<div className="hds-caption">
  Use the palette switcher (🖌 toolbar) to preview on all six HDS backgrounds.
</div>
```

Include the palette caption **under the first Canvas only** on each Guidance page. Once a user sees it, repeating it adds noise.

Do NOT hardcode dark background sections in story renders. The palette toolbar decorator applies to Canvas embeds — users switch palettes via the toolbar.

## Callout Notes

Three callout types for contextual information that supplements the main guidance. Uses usa-alert--info --slim --no-icon with inline sprite icons.

| Type | Sprite | Label | Use for |
| --- | --- | --- | --- |
| `uswds` | `hds-sprite.svg#logo-uswds` | Differs from USWDS | Where HDS requires different **markup or usage patterns** than vanilla USWDS |
| `figma` | `hds-sprite.svg#logo-figma` | Differs from Figma | Where HDS Core intentionally deviates from the HDS Figma spec |
| `code` | `sprite.svg#code` | How this works | Technical detail useful for understanding, not essential for usage |

### Usage

```mdx
import { Note } from '../helpers/Note';

<Note type="uswds">
  USWDS pagination uses anchor tags with visible "Previous"/"Next" text. HDS Core hides the text
  labels visually and uses icon-only circle buttons instead.
</Note>
```

### Guidelines for Notes

- Always visible (not collapsible) — people don't click what they don't know is relevant
- 1–3 sentences max — if it's longer, it belongs in the main text
- Don't duplicate in main text — if something is in a Note, the main prose shouldn't also explain it
- Main text must stand alone — strip all Notes and the docs should still be complete and meaningful
- Only when someone would be legit confused — don't add a note for every minor difference

### "Differs from USWDS" guidelines

These notes should focus on **markup and usage differences** — places where a developer's existing USWDS knowledge might lead them astray:

- **Good:** "USWDS pagination uses anchor tags with visible Previous/Next text. HDS uses icon-only circle buttons."
- **Good:** "USWDS breadcrumbs use chevron separators. HDS uses forward slashes."
- **Bad:** "HDS pagination uses Inter semibold with -0.5px letterspacing instead of USWDS defaults." (Visual difference — obviously HDS looks different from USWDS, that's the point.)
- **Bad:** "All colors are palette-aware via custom properties." (Implementation detail, and palette awareness is assumed for all components.)

Do not use USWDS notes to explain visual differences (colors, fonts, spacing, border radius). HDS Core is a visual theme — everything looks different from vanilla USWDS. Only note differences that affect how a developer **writes markup** or **chooses a component**.

### "Differs from Figma" guidelines

These notes flag where HDS Core's implementation intentionally differs from the HDS Figma spec. They help designers understand what to expect when comparing Storybook to Figma:

- **Good:** "The HDS Figma spec suggests simplified pagination for ≤5 pages. HDS Core treats this as a screen-size decision."
- **Good:** "The Figma spec includes a rows-per-page filter. This requires a dropdown menu component and is deferred."
- **Bad:** "Blue palette utility hover values are inferred, pending creative director review." (Maintainer concern — belongs in DESIGN.md.)

### Note Component

Located at `stories/helpers/Note.jsx`. Uses React (Storybook's internal dependency) for JSX. Icon config maps types to sprite references — if creative review approves `code` for the HDS sprite, update one line in `iconConfig`.

## Legacy USWDS Support Sections

Some HDS components use different markup than vanilla USWDS for full fidelity (e.g., icon buttons for pagination arrows instead of USWDS text links). When this is the case, include a **Legacy USWDS support** section near the end of the Guidance page.

Structure:

1. Brief explanation that existing USWDS markup is automatically restyled by HDS Core CSS.
2. One code example showing the legacy USWDS markup.
3. A short note on tradeoffs (e.g., "retains USWDS chevrons instead of HDS chevrons").
4. A USWDS Note explaining the behavioral difference.

Keep it short and skippable — developers working on new sites can ignore this section entirely. Developers migrating existing USWDS sites get the information they need to decide whether to update their markup.

Do not use "Path A / Path B" or other internal labels. Just say "recommended markup" (the main docs) and "legacy USWDS markup" (this section).

## Accessibility Sections

Every component Guidance page ends with an Accessibility section. Keep it focused on what the developer must do:

- **Bulleted list of requirements** — keyboard behavior, ARIA attributes, landmark roles.
- **No code blocks** if the required attributes are already visible in the variant markup above. Add a line like: "The recommended markup shown above includes all necessary ARIA attributes."
- **Link to related components** when accessibility patterns are shared. Example: "Previous/next arrows follow the same patterns as [Icon Button](?path=/docs/components-icon-button--guidance) — see that page's Accessibility section."
- **Only document what the developer controls.** Don't explain how CSS produces focus rings or how palette tokens change colors. Do explain which ARIA attributes to add and what keyboard behavior to expect.

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

### Component-specific helpers

When a component needs a helper function to generate its markup (e.g., `breadcrumb()` for Breadcrumb, `pagination()` for Pagination), define it in the story file. These helpers generate static HTML for Storybook demos — they don't ship with HDS Core and aren't available to consumers.

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

To find a story's ID, click it in the sidebar and read the URL. Links can target a Guidance page but not a specific heading within it — reference the section name in the link text (e.g., "see that page's Accessibility section").

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
    Pagination.mdx            # Guidance page
    Pagination.stories.js     # Canvas-embed stories + Playground
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

- [ ] Overview landing page (MDX) — first thing users see; should cover what HDS Core is, how to install, and current scope (CSS-only, JS on roadmap)
- [ ] Accessibility foundation story
- [ ] Convert foundation stories to MDX for consistency
- [ ] Audit existing Guidance pages (Breadcrumb, Button, IconButton, IntroText, Link) against updated documentation conventions — simplify language, remove internal architecture terms, verify note usage follows USWDS/Figma note guidelines
- [ ] Explore reusable story helpers as shared module (if helpers diverge across files)
