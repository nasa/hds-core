# HDS Core — Design Decisions Summary for Creative Director Review

**Date:** March 2026

**Context:** During implementation of the HDS Core Proposal as a distributable code package (@nasa/hds-core), several design-level decisions were made that refine or extend the original Proposal. This document summarizes each decision and its rationale for review and approval.

**What hasn't changed:** All color hex values, font families, font sizes, spacing tokens, grid settings, and line heights from the approved HDS Core Proposal are preserved exactly. The changes below are about naming, organization, and structural patterns — not about the visual design itself.

---

## 1. Palette naming: descriptive names instead of numbers

**Proposal:** Palettes identified as "Palette one" through "Palette six"

**Change:** Palettes are referenced by descriptive name:

| Proposal | New name | Background color |
|----------|----------|------------------|
| Palette one | `white` | Spacesuit White (#FFFFFF) |
| Palette two | `light` | Carbon 05 (#F6F6F6) |
| Palette three | `midtone` | Carbon 20 (#D1D1D1) |
| Palette four | `dark` | Carbon 90 (#17171B) |
| Palette five | `blue` | NASA Blue Shade (#0B3D91) |
| Palette six | `black` | Carbon Black (#000000) |

**Why:** Palette numbers require memorization and a reference table. A designer or developer reading "dark" immediately understands the intent. "White" and "black" form a natural pair as bookends of the palette range. "Light" for Carbon 05 is intuitive — it's the light-but-not-white option. Descriptive naming is the universal standard across all major design systems (Material Design, IBM Carbon, Atlassian, Bootstrap). The Proposal's palette numbers remain documented for cross-reference.

---

## 2. Palettes 4–6 shipped as experimental

**Proposal:** Palettes four, five, and six marked as "in development"

**Change:** The dark, blue, and black palettes are included in HDS Core but gated behind an opt-in flag. They are not available to production sites by default. Developers must explicitly enable them to use them.

**Why:** Several elements within dark palettes have not been fully specified in the Proposal, including:
- Form fields (inputs, selects, textareas) on dark backgrounds
- Error, warning, and success state colors on dark backgrounds
- Focus ring visibility on the blue palette (blue ring on blue background)

Shipping as experimental allows internal testing and refinement while preventing premature production use. When the specs are finalized and approved, the flag is simply removed. No visual changes — the palette definitions are ready, they're just waiting for sign-off on the unspecified elements.

---

## 3. OS dark mode is opt-in, not automatic

**Change:** HDS Core does not automatically switch to the dark palette when a user's operating system is in dark mode. This behavior is available but must be explicitly enabled.

**Why:**
- Current nasa.gov does not respect OS dark mode
- USWDS does not implement dark mode at all
- Automatic dark mode would transform the entire appearance of a site without the team having tested their specific content — images, custom styles, third-party embeds, and CMS content may not work well on dark backgrounds
- HDS Core provides the tools (dark palette, automatic recoloring) for teams to support dark mode when they choose to, but does not impose it

**Recommendation:** Keep this permanently opt-in. A design system should provide tools, not make assumptions about content that only each site's team can validate.

---

## 4. Palette element colors simplified to 19 semantic variables

**Proposal:** Each palette table lists individual colors for label, metadata, caption, heading, paragraph, link text, link underline, primary button text, checkbox text/fill/stroke, CTA fill/text, secondary CTA fill/text, secondary circle filled/outline, utility circle fill/stroke/icon, social fill/icon, and UI borders.

**Change:** These have been consolidated based on an audit showing that many values are always identical:

| Elements that always share the same color | Combined as |
|------------------------------------------|-------------|
| Label, metadata, caption, utility button text | `muted` (one variable) |
| Heading, primary button text, outline button icon | `heading` (one variable) |
| Text on any filled button (red CTA, blue CTA, secondary circle, checkbox icon, primary arrow icon) | `btn-filled-text` (always Spacesuit White) |
| Blue CTA fill, secondary circle fill, outline circle stroke | `btn-secondary-bg` (one variable) |

Additionally, five values that never change across any palette are set once globally rather than repeated six times:
- CTA/primary arrow button fill → always NASA Red
- Text on any filled button → always Spacesuit White
- Checkbox fill → always NASA Blue
- Social circle fill → always Carbon 60
- Social circle icon → always Carbon 05

**Result:** 19 total variables per palette instead of ~30, with zero loss of visual fidelity. Every element renders identically to the Proposal specs.

**Why:** Fewer variables means fewer places for inconsistencies to creep in, and a simpler mental model for both designers creating new palette variants and developers implementing them.

---

## 5. SVG icons separated into glyph + CSS container

**Proposal:** Icon assets include multi-color SVGs (e.g., blue circle with white plus sign, blue circle with white download arrow)

**Change:** Icons are split into two layers:
1. **The glyph** — a single-color SVG silhouette (just the plus sign, just the arrow, just the download shape)
2. **The container** — a CSS-styled circle that provides the background color, border, and border-radius

The same download arrow glyph appears inside a blue filled circle, a blue outlined circle, a neutral utility circle, or a gray social circle — all controlled by CSS, never by the SVG file.

**Before:** Changing from Palette 1 (light) to Palette 5 (blue) required different icon SVG files or had no way to recolor icons.

**After:** Drop a section into any palette and every icon automatically gets the correct colors. The download icon in a secondary circle is blue on light palettes and NASA Blue Tint on dark palettes — with no code changes and no different SVG files.

**Why:**
- The Proposal's palette tables specify different icon container colors per palette — this can only work automatically if the SVG and the container are separate
- The original HDS Figma designs already use this layered approach — the circle and glyph are separate objects in Figma. The SVG exports just happened to flatten them together.
- Every major design system (USWDS, Material, Carbon, Heroicons, Phosphor) ships single-color icons
- Reduces the total icon file count (no light/dark variants needed)

---

## 6. Fixed-color button graphics stored separately from themeable icons

**Context:** The original HDS (2022) includes Interactives buttons (6 icons with NASA Blue fill + white outline + white icon) and a Primary Arrow graphic (red circle + white arrow). These have colors "baked in" and do not respond to palette theming. The HDS Core Proposal (2025) does not address how to handle these multi-color assets.

**Change:** Create a separate `src/img/hds-buttons/` directory for fixed-color button graphics, distinct from `src/img/hds-icons/` (which contains themeable `currentColor` icons compiled into a sprite).

**Rationale:**
- Maintains clear separation between themeable icons and fixed-color assets
- Aligns with HDS taxonomy (Iconography = Foundation; Buttons = Elements)
- Prevents developer confusion about color behavior
- Primary Arrow SVG provides fallback for edge cases where CSS implementation is impractical

**Contents of `hds-buttons/` directory:**
- `interactive-close.svg`
- `interactive-less-info.svg`
- `interactive-location.svg`
- `interactive-menu.svg`
- `interactive-more-info.svg`
- `interactive-play.svg`
- `primary-arrow.svg`

**Note:** These 7 files are NOT included in the icon sprite and must be referenced as standalone files.

---

## 7. Primary arrow button implemented in CSS

**Proposal:** Primary buttons use Primary-Arrow.svg — a red circle with a white arrow inside

**Change:** The red circle + white arrow after primary button text (e.g., "Learn More →") is generated entirely by CSS. The Primary-Arrow.svg file is retained in `hds-buttons/` as a fallback but is not the default implementation.

**Why:**
- The SVG had hardcoded NASA Red and white, making it impossible to adjust per palette
- As a CSS element, the circle fill automatically reads from the palette variables (NASA Red across all 6 palettes per the Proposal)
- The arrow direction automatically swaps from horizontal (→ internal link) to diagonal (↗ external link) based on link destination, with no manual intervention
- The rendered button looks visually identical to the current design

---

## 8. External link arrow uses HDS diagonal instead of USWDS launch icon

**Proposal:** Arrow / Line-diagonal reserved for external links and primary buttons to non-NASA sites

**Change:** When a link is marked as external, the trailing icon uses the HDS diagonal arrow instead of USWDS's default "launch" icon (a square with an arrow pointing out).

**Why:**
- The Proposal explicitly reserves Arrow / Line-diagonal for external use
- USWDS's launch icon is visually inconsistent with HDS's arrow system
- Maintains the HDS wayfinding rule: horizontal arrows = internal navigation, diagonal arrows = leaving NASA
- External link accessibility text ("External." / "External, opens in a new tab.") is provided automatically by USWDS's built-in CSS — no additional work needed

---

## 9. Color wayfinding rule enforced in icon button component roles

**Proposal:** "Red is always used to indicate navigating to a new page. Blue is always used for elements that are interactive but keep the user on the same page."

**Change:** Icon button components have named roles that structurally enforce this rule:

| Role name | Color | Meaning |
|-----------|-------|---------|
| `cta` | NASA Red | Navigates to a new page |
| `secondary` | NASA Blue | On-page action (download, share) |
| `outline` | NASA Blue border | Lower-emphasis on-page action |
| `utility` | Neutral (varies per palette) | UI controls (carousel, accordion) |
| `social` | Carbon 60 | Social media sharing/linking |
| `interactive` | Neutral (varies per palette) | Tooltip/popover triggers |

**Why:** These names map directly to the HDS Buttons documentation terminology. By naming the roles semantically, it becomes structurally difficult for a developer to accidentally use a red (navigation) icon for an on-page action, or a blue (on-page) icon for a navigation link. The wayfinding rule is enforced by the system rather than relying on individual developer knowledge.

---

## 10. Accessibility patterns built into icon and link systems

**Change:** The component naming and documentation enforce these accessibility patterns by default:

- **Icon buttons without visible text** (e.g., a standalone download circle) require a screen-reader-accessible label describing the action. The component naming makes it clear these are interactive buttons, not decorative icons.

- **Icons alongside text** (e.g., the arrow next to "Learn More") are automatically hidden from screen readers since the visible text already describes the action. Announcing both the text and the icon would be redundant.

- **External links** automatically get:
  - A diagonal arrow icon (visual signal)
  - Screen reader text announcing "External" or "External, opens in a new tab" (accessible signal)
  - Both provided by USWDS's built-in external link CSS — no custom code needed

**Why:** The HDS Accessibility documentation states: "Color provides signals on HDS buttons and links, but ARIA labeling ensures their meaning and intent is clear to non-sighted users." These patterns ensure the design system makes it easy to do the right thing and hard to accidentally create inaccessible interfaces.

---

## 11. Image asset directory structure with namespaced folders

**Context:** The HDS Core build output (`/dist/assets/img/`) coexists with numerous USWDS-generated asset folders (`usa-icons/`, `usa-icons-bg/`, `uswds-icons/`, `material-icons/`, etc.). HDS assets need to be immediately identifiable and not get lost in this mix.

**Change:** Source images are organized into namespaced folders:

```
src/img/
├── hds-icons/           ← currentColor icons → compiled to hds-sprite.svg
├── hds-buttons/         ← fixed-color button graphics (standalone files)
└── nasa-branding/       ← nasa-logo.svg and future brand assets
```

**Output in `/dist/assets/img/`:**

```
dist/assets/img/
├── hds-icons/           ← copied from source
├── hds-buttons/         ← copied from source
├── hds-sprite.svg       ← generated sprite (remains at root for easy paths)
├── nasa-branding/       ← copied from source
└── [USWDS-generated folders...]
```

**Why:**
- `hds-` prefix makes HDS assets immediately identifiable
- `nasa-branding/` uses `nasa-` prefix because it's NASA's brand, not HDS-specific (future-proofs for meatball variants, wordmark, etc.)
- `hds-sprite.svg` stays at img root for simpler path references
- Clear separation prevents confusion and makes maintenance easier

---

## Summary of what needs approval

| # | Decision | Type |
|---|----------|------|
| 1 | Descriptive palette names | Naming convention |
| 2 | Dark palettes experimental | Rollout strategy |
| 3 | OS dark mode opt-in | Default behavior |
| 4 | 19 consolidated variables | Technical simplification |
| 5 | Icons as glyph + CSS container | Asset architecture |
| 6 | Fixed-color button graphics in separate folder | Asset architecture |
| 7 | Primary arrow as CSS (SVG fallback available) | Implementation approach |
| 8 | HDS diagonal arrow for external links | Visual consistency |
| 9 | Role names enforce wayfinding rule | Component architecture |
| 10 | Accessibility patterns built-in | Component defaults |
| 11 | Namespaced image folders | File organization |

None of these change what the final rendered site looks like. They are all decisions about how to organize, name, and implement the visual specifications already approved in the HDS Core Proposal (2025).