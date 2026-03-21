# HDS Core Design Decisions

Visual and UX decisions for the HDS creative director, designers, and design-minded developers. This document tracks where HDS Core has intentionally evolved from or differs from the HDS Core Proposal and HDS Figma spec, and flags items needing creative director review.

For implementation architecture, see ARCHITECTURE.md. For Storybook documentation conventions, see DOCUMENTATION.md.

Last updated: 2026-03-17

## Class Naming Convention

HDS Core follows a three-tier naming rule:

### Tier 1: USWDS Override (`usa-*`)

When an HDS component maps 1:1 to a USWDS component in both markup and purpose, HDS Core overrides the `usa-*` styles directly. Existing USWDS sites get HDS theming without changing class names.

**Examples:** `.usa-button`, `.usa-button--outline`, `.usa-link`, `.usa-link--external`, `.usa-intro`, `.usa-input`, `.usa-accordion`, `.usa-alert`, `.usa-site-alert`, `.usa-breadcrumb`, `.usa-banner`, `.usa-pagination`

### Tier 2: HDS Divergent (`hds-*`, replaces USWDS twin)

When HDS requires fundamentally different markup or serves a different purpose than a same-named USWDS component, HDS Core creates an `hds-*` class to avoid breaking the USWDS version.

**Examples:** Identified case-by-case as components are built.

### Tier 3: HDS-Only (`hds-*`, no USWDS equivalent)

Components unique to HDS with no USWDS counterpart use `hds-*` classes.

**Examples:** `.hds-btn--primary` (arrow button), `.hds-btn-icon` (circle icon buttons), `.hds-label`, `.hds-eyebrow`, `.hds-metadata`, `.hds-caption`, `.hds-glyph`, `.hds-link--internal` (escape hatch modifier), `.hds-palette-*` / `data-hds-palette`

### Rule of Thumb

If a USWDS site could adopt HDS Core and the component works without changing HTML, it's Tier 1. If adopting it would break existing usage, it's Tier 2. If USWDS doesn't have it, it's Tier 3.

## Color

### Primary / Secondary Swap

**USWDS default:** `primary` = blue, `secondary` = red.

**HDS Core:** `primary` = NASA Red, `secondary` = NASA Blue.

This swap is defined in the HDS Core Proposal. It means:

- `.usa-button` automatically renders NASA Red (CTA / navigates away)
- `.usa-button--secondary` automatically renders NASA Blue (on-page action)
- `color("primary")` returns NASA Red throughout USWDS components
- `color("secondary")` returns NASA Blue throughout USWDS components

### Color Precision

HDS Core uses exact HDS hex values (`$hds-color-carbon-90` = `#17171B`) for all component styles. USWDS utility classes (`.bg-base-darker`, etc.) use USWDS approximations that are close but not identical (USWDS `gray-90` = `#1b1b1b`). This is a USWDS architectural constraint — it requires its own system color token strings, not arbitrary hex values.

### Link Colors

HDS links use body text color — not brand color — for the text itself. The dotted underline and external arrow provide the visual affordance. This prevents bare `<a>` tags from rendering in NASA Red after the primary/secondary swap.

## Naming & Organization

### Palette Names

**Original HDS:** "Palette one" through "Palette six"

**HDS Core:** Descriptive names

| Original      | HDS Core  | Background                          |
| ------------- | --------- | ----------------------------------- |
| Palette one   | `white`   | Spacesuit White (#FFFFFF) — default |
| Palette two   | `light`   | Carbon 05 (#F6F6F6)                 |
| Palette three | `midtone` | Carbon 20 (#D1D1D1)                 |
| Palette four  | `dark`    | Carbon 90 (#17171B)                 |
| Palette five  | `blue`    | NASA Blue Shade (#0B3D91)           |
| Palette six   | `black`   | Carbon Black (#000000)              |

### Consolidated Palette Variables

**Original HDS:** ~30 individual color assignments per palette

**HDS Core:** 23+ semantic variables. Elements sharing the same color are combined:

- Label, metadata, caption → `muted`
- Heading, primary button text → `heading`
- Text on filled buttons → `btn-filled-text`

### Palette-Specific Overrides

The white and light palettes share a light scheme. The dark and black palettes share a dark scheme. Midtone and blue override specific values:

**Midtone** overrides from light scheme:

- `text` → Carbon Black (was Carbon 90) for higher contrast on gray
- `muted` → Carbon 80 (was Carbon 60)
- `border` → Carbon 40 (was Carbon 20)
- `utility-stroke` → Carbon 40 (was Carbon 20)

**Blue** is fully custom (doesn't use either shared scheme).

**Dark scheme** separates link underline and arrow colors per the HDS Core Proposal:

- `link-underline` → Carbon 30
- `link-arrow` → Carbon 40

### Component Organization

**Original HDS:** Separate "Elements" (atomic) and "Components" (composed) categories.

**HDS Core:** Flattened into a single "Components" category, mirroring USWDS structure.

## Typography

### Font Family Slot Mapping

USWDS has four type slots. HDS needs three fonts in three slots:

| HDS Font    | USWDS Slot | Role Tokens                   |
| ----------- | ---------- | ----------------------------- |
| Public Sans | `sans`     | `body`                        |
| Inter       | `serif`    | `heading`, `ui`, `alt`→`mono` |
| DM Mono     | `mono`     | `code`, `alt`                 |

`family("serif")` returns Inter (a sans-serif font) — a USWDS constraint. Consumers should always use role tokens (`family("heading")`) not type tokens (`family("serif")`).

### Heading Line-Heights and Letterspacing

**USWDS:** One `$theme-heading-line-height` for all headings.

**HDS Core:** Per-element values per the HDS Core Proposal:

| Element | Line-Height | Letterspacing | Weight   |
| ------- | ----------- | ------------- | -------- |
| H1      | 1 (100%)    | -1.5px        | 700 bold |
| H2      | 1.1 (110%)  | -1px          | 700 bold |
| H3      | 1.2 (120%)  | -0.5px        | 700 bold |
| H4      | 1.3 (130%)  | -0.5px        | 600 semi |
| H5      | 1.2 (120%)  | -0.5px        | 600 semi |
| H6      | 1.3 (130%)  | -0.25px       | 600 semi |

### Body Line-Height

160% per the HDS Core Proposal. USWDS token `5` (1.62) is the closest approximation.

### Label, Metadata, and Caption

Three distinct small-uppercase treatments:

| Element  | Font        | Weight |
| -------- | ----------- | ------ |
| Label    | DM Mono     | Bold   |
| Metadata | Inter       | Bold   |
| Caption  | Public Sans | Normal |

### DM Mono Bold

DM Mono only ships up to Medium (500). The browser synthesizes faux bold — acceptable since DM Mono Medium is already visually heavy for a monospace.

### Type Normalization (Known Tech Debt)

All three fonts use the same USWDS `cap-height: 364px`, which disables optical normalization. The HDS Core Proposal acknowledges this needs future work. Updating cap-heights will cause a visual shift across the system.

## Links

### Underline Style

**Figma:** Dashed, 1px, "2, 3" dash pattern **HDS Core:** `text-decoration-style: dotted`

CSS `dashed` creates long dashes that look dramatically different from Figma. `dotted` is visually closer to the Figma short-dash pattern.

### Hover Behavior

Link text color stays constant. Only the underline changes from dotted to solid on hover.

### External Link Arrow

**USWDS:** `::after` pseudo-element with USWDS launch icon. **HDS Core:** `::after` with `mask-image` using the HDS diagonal arrow (`arrow-line-diagonal.svg`).

Arrow direction follows the HDS wayfinding rule: diagonal = leaving NASA. Arrow appears automatically with no markup changes.

**Known limitation:** CSS `text-decoration` cannot flow through `::after` pseudo-elements, creating a small underline gap before the arrow. This is shared by USWDS, GOV.UK, and other government design systems.

## Icons & Buttons

### Wayfinding Color Rule

Red = navigates away. Blue = stays on page.

| Role          | Color            | Meaning                |
| ------------- | ---------------- | ---------------------- |
| `--cta`       | NASA Red         | Navigates to new page  |
| `--secondary` | NASA Blue filled | On-page action         |
| `--outline`   | NASA Blue border | Lower emphasis on-page |
| `--utility`   | Neutral          | UI controls            |
| `--social`    | Gray             | Social media           |

### USWDS ↔ HDS Button Mapping

HDS and USWDS use the same terms to mean different things:

| USWDS Term | USWDS Meaning | HDS Equivalent |
| --- | --- | --- |
| "Primary" (`.usa-button`) | Filled rectangle, most important action | **HDS "CTA"** — NASA Red filled |
| "Secondary" (`.usa-button--secondary`) | Filled rectangle, secondary color | **HDS "Secondary Filled"** — NASA Blue |
| "Outline" (`.usa-button--outline`) | Transparent with stroke | **HDS "Outline Secondary"** — NASA Blue border |
| N/A | No equivalent | **HDS "Primary"** — text + red circle arrow (`.hds-btn--primary`) |

**USWDS variants HDS does not use:**

| USWDS Class | Reason |
| --- | --- |
| `.usa-button--accent-cool` | HDS two-color system (Red + Blue) maps to wayfinding meaning. A third color would break the rule. |
| `.usa-button--accent-warm` | Same as accent-cool |
| `.usa-button--base` | HDS uses `.hds-btn-icon--utility` for neutral actions instead |

### Button States

**Hover:** Explicit HDS values — NASA Red Shade (CTA), NASA Blue Shade (secondary filled), border darkens (outline). USWDS auto-darkening is overridden because USWDS Sass math doesn't reliably produce exact HDS shade tokens.

**Active:** Visually identical to hover. HDS does not define a distinct active state, consistent with Apple HIG.

**Disabled:** Color-based, not opacity-based. Filled buttons get Carbon 20 fill with white text. Outline buttons get palette-aware muted border and text. Disabled buttons do not respond to hover or focus.

### Outline Inverse — Two-Layer Approach

HDS outline buttons on dark backgrounds keep the **NASA Blue** border (not monotone white like USWDS `--inverse`). Only the text flips to white.

- **Inside palette wrappers:** Automatic — no extra class needed.
- **Without palette wrappers:** Add `.usa-button--inverse` for dark-background styling.

### Glyph + CSS Container Architecture

**Original HDS:** Multi-color SVGs (e.g., blue circle with white icon baked in)

**HDS Core:** Two layers: single-color SVG glyph (`currentColor`) + CSS-styled circle container.

Icons automatically adapt to palettes. One SVG file works everywhere.

### Utility Circle States

| State    | Property | Light                       | Dark                        |
| -------- | -------- | --------------------------- | --------------------------- |
| Default  | Fill     | Spacesuit White             | Carbon Black                |
| Default  | Stroke   | Carbon 20                   | Carbon 60                   |
| Default  | Icon     | Carbon Black                | Spacesuit White             |
| Hover    | Fill     | Carbon 05                   | Carbon Black (unchanged)    |
| Hover    | Stroke   | Carbon 40                   | Carbon 05                   |
| Hover    | Icon     | Carbon Black (unchanged)    | Spacesuit White (unchanged) |
| Disabled | Stroke   | Carbon 05 (fades toward bg) | Carbon 80 (fades toward bg) |
| Disabled | Icon     | Carbon 30 (muted)           | Carbon 60 (muted)           |

Disabled treatment is color-based (not opacity-based), consistent with all HDS button disabled states.

Note: Figma shows Carbon 30 for the default light stroke, but the HDS Core Proposal specifies Carbon 20. Proposal takes precedence.

### Icon Button Sizing (TODO)

Figma defines 6 icon button sizes. HDS Core currently implements 3:

| Figma | Container | HDS Core | CSS size      | Status          |
| ----- | --------- | -------- | ------------- | --------------- |
| XS    | 16px      | —        | —             | Missing         |
| S     | 20px      | `--sm`   | 1.2em (~19px) | Close           |
| M     | 24px      | —        | —             | Missing         |
| L     | 28px      | —        | —             | Missing         |
| XL    | 32px      | default  | 2em (32px)    | ✅              |
| XXL   | 36px      | `--lg`   | 2.5em (40px)  | Wrong — 40 ≠ 36 |

Additionally, HDS Core updated all SVG icons from 20×20px to 24×24px (with 2px empty padding around the centered original 20×20px glyph). Figma's glyph-to-container ratio assumes 20×20px originals. CSS icon sizing needs adjustment — glyphs currently render slightly smaller than Figma intends.

HDS Core uses `em`-based sizing so circles scale with browser zoom (WCAG 1.4.4). The em values produce exact pixel sizes at the standard 16px body font-size.

### Primary Arrow Button

**Original HDS:** Uses `Primary-Arrow.svg`

**HDS Core:** CSS `::after` pseudo-element generates circle and line arrow. Arrow direction auto-swaps for external links — no SVG markup needed in HTML.

### Fixed-Color Button Graphics

Seven graphics have colors baked in and don't respond to palettes:

| File                    | Appearance                 |
| ----------------------- | -------------------------- |
| `interactive-*.svg` (6) | NASA Blue fill, white icon |
| `primary-arrow.svg`     | NASA Red fill, white arrow |

These are intentional brand elements per HDS spec.

## Focus Ring

1px dashed, palette-aware, `:focus-visible` only (keyboard navigation, not mouse clicks).

| Property | Light palettes                        | Dark palettes                     |
| -------- | ------------------------------------- | --------------------------------- |
| Style    | 1px dashed                            | 1px dashed                        |
| Color    | Carbon 60 (`--hds-palette-muted`)     | Carbon 30 (`--hds-palette-muted`) |
| Offset   | 2px default (components may override) | Same                              |

Components with generous internal spacing (e.g., pagination page numbers in their 32×32 containers) use 0 offset. Utility circles show the focus ring as an additional dashed outline outside the solid circle border — the solid border stays visible during focus.

## Pagination

### Current Page Indicator

**USWDS:** Filled pill with `background-color: primary`.

**HDS:** No background fill. 2px solid bottom bar at the bottom of a 32×32 container, palette-aware heading color. Hover shows the same bottom bar on non-current pages.

### Page Number Typography

Inter semibold (600), 16px, -0.5px letterspacing — heading-family tokens, not body tokens.

### Previous/Next Arrows

HDS uses utility icon circle buttons for prev/next. For legacy USWDS sites, CSS automatically restyles USWDS pagination arrow markup to look like utility circles.

### Filter Variant (Deferred)

The HDS Figma spec includes a rows-per-page filter alongside pagination. This requires a dropdown menu component and is deferred to Phase 2+.

## Site Alert

### Naming

**HDS Figma:** "Banner"

**HDS Core:** "Site Alert" — renamed to match the USWDS component it maps to (`.usa-site-alert`). The USWDS "Banner" is the government compliance bar, which is a separate component.

### Color Variants

| Variant | Background | Text | Use |
| --- | --- | --- | --- |
| `--emergency` | NASA Red Shade (#B60109) | White | Lapse in appropriations, outages, critical safety |
| `--info` | NASA Blue Shade (#0B3D91) | White | Live events, language redirects, announcements |

Link treatment on both variants follows the dark-background pattern from the blue palette: white text, Carbon 30 underline, Carbon 40 arrow.

### Scoped Palette Vars

Site alerts define `--hds-palette-*` vars directly on the component selector rather than through `_hds-palettes.scss`. This means existing link, heading, and text wiring works automatically without one-off overrides. The vars are not available as a palette wrapper for arbitrary content.

### USWDS `set-text-from-bg` Override

USWDS applies hardcoded colors via its `set-text-from-bg` mixin at high specificity (4-segment selectors on `.usa-alert__body`, `::before`, links). §15.1 overrides all of these comprehensively at matching specificity.

## Accordion

### Chevron Icon

USWDS renders +/− icons via `background-image` (`set-icon-from-bg` mixin) with a filled background on the heading row. HDS replaces these with a circled chevron (down when collapsed, up when expanded) using the same `mask-image` technique as the external link arrow (§13.2). The circle uses `--hds-palette-utility-stroke` and `--hds-palette-utility-icon` — the same tokens as other utility circles.

The circle is 24px (1.5em at 16px base), matching the Figma "M" icon button size. This is hardcoded in §8 until the icon button size system adds a `--md` size. See GitHub Discussions #13.

### Bordered Variant

USWDS offers `.usa-accordion--bordered`. HDS Figma shows only borderless accordions with thin separator lines between items. The bordered variant is not restyled by HDS — it renders with default USWDS bordered treatment. Pending creative director review: should HDS define its own bordered variant, or should bordered be discouraged?

### Hover State

HDS Figma does not specify a hover state for the accordion heading row. The Figma accessibility guidance states the entire header area should be selectable, which implies a visible hover affordance. Pending Figma research on similar full-row hover patterns for components with embedded utility circles (e.g., does the circle get hover treatment, the row, or both?). Currently unimplemented — the heading row has no hover effect.

## System Behavior

### OS Dark Mode Is Opt-In

HDS Core does not automatically switch palettes based on OS dark mode. Enable with `$hds-enable-auto-dark-mode: true`. Current nasa.gov doesn't implement this.

### TV Breakpoint (Deferred)

The HDS Core Proposal defines a `tv` breakpoint at 1920px. HDS Core currently stops at `widescreen` (1400px). Deferred — USWDS doesn't have a built-in `tv` breakpoint.

### Global Element Style Gating

Bare HTML element styles are gated behind standard USWDS flags (`$theme-style-body-element`, `$theme-global-content-styles`, etc.). HDS Core respects these settings exactly as USWDS does — no new flags to learn. Focus styles and palette wiring are always active.

## Creative Director Review

Pending visual sign-offs, to be reviewed once visible in Storybook:

| Item | Question | Context |
| --- | --- | --- |
| CTA hover on dark palettes | Does NASA Red Shade work on dark/blue/black backgrounds? | Figma only shows light-background hover |
| Secondary filled hover on dark | Does NASA Blue Shade (one step darker from Blue Tint) look right? | Inferred from "darken by one shade step" pattern |
| Midtone disabled buttons | Carbon 20 stroke on Carbon 20 background is invisible — what values should midtone use? | Proposed: Carbon 40 stroke, Carbon 50 text |
| Blue palette utility hover/disabled | Utility circle hover and disabled colors on blue palette are inferred from dark-scheme patterns, not confirmed in Figma | Hover stroke → Spacesuit White, disabled stroke → NASA Blue, disabled icon → Carbon 30 |
| Midtone utility hover/disabled | Carbon 05 hover fill on Carbon 20 background — visible but subtle. Acceptable? | Inherits from light scheme, may need override |
| Icon button sizes | Figma shows 6 sizes (XS–XXL, 16–36px). HDS Core has 3. `--lg` is 40px but Figma XXL is 36px. | Confirm which sizes to support for v1.0 |
| Icon button glyph sizing | HDS Core SVGs are 24×24px (not Figma's 20×20px) — glyph-to-container ratio needs adjustment | Glyphs render slightly smaller than Figma intends |

## What Hasn't Changed

All of these match the approved HDS Core Proposal exactly:

- Color hex values (all 20 brand/Carbon colors)
- Font families (Inter, Public Sans, DM Mono)
- Font size scale (3xs through 4xl)
- Spacing tokens
- Grid settings (12-column, breakpoints through widescreen)
- Palette background colors

## What Changed From the Proposal

Intentional deviations from the HDS Core Proposal, with rationale:

| Area | Proposal | HDS Core | Rationale |
| --- | --- | --- | --- |
| Line-height values | Exact percentages (100%, 110%, etc.) | Closest USWDS token or raw CSS value | USWDS line-height scale is too coarse for exact mapping |
| `text-decoration-style` | Dashed | Dotted | CSS `dashed` looks wrong; `dotted` is closer to Figma |
| DM Mono bold | Bold (700) | Faux bold from Medium (500) | DM Mono doesn't ship a 700 weight |
| Type normalization | Normalize all three fonts | Deferred (all use same cap-height) | Requires measurement work; noted as tech debt |
| TV breakpoint | 1920px | Deferred | USWDS doesn't have built-in TV breakpoint |
| Button font family | Not specified | Inter (via `"heading"` slot) | Figma shows Inter for all button text |
| Button active state | Not specified | Matches hover (no distinct active) | Consistent with Apple HIG; HDS Figma shows no active state |

## USWDS Override Complexity

Components where HDS overrides require `!important` due to USWDS mixin-generated styles (`set-text-and-bg`, `set-icon-from-bg`) or high-specificity selectors that compile at the same specificity and load earlier in the cascade.

| Section | Properties | Reason |
|---|---|---|
| §1.1 Footer | `border` on footer nav/content | USWDS footer sets borders at high specificity |
| §1.1 Footer | `padding-bottom`, `padding-top` on mobile footer nav | USWDS mobile footer padding override |
| §1.2 Agency Navbar | `padding` on `.usa-button--arrow` | USWDS button padding conflicts |
| §1.3 Nav Triggers | `mask-size`, `mask-position`, `mask-image` on menu chevrons | USWDS `background-image` icons replaced with `mask-image` |
| §7.5 Simplified Pagination | `outline: none` on `:focus-visible` | Composed button needs `border` focus instead of global `outline` |
| §8 Accordion | `background-color`, `background-image`, `color` on button + content | USWDS `set-text-and-bg` and `set-icon-from-bg` mixins bake in colors and +/- icons |
| §13.2 External Link Arrow | `display: inline` on `::after` | USWDS sets `inline-block` — needs `inline` for text-flow alignment |
| §13.3 Internal Link Escape | `display: none` on `::after` | Force-hide arrow regardless of USWDS external link styling |

Additionally, `_hds-custom-styles.scss` uses `!important` in print styles and palette variable definitions to override USWDS defaults at the system level. `_hds-components.scss` §5 (Forms) has overrides not yet cataloged — will be documented when Forms stories are built.

This table is tracked for potential selective USWDS package imports post-v1.0. See ARCHITECTURE.md § Pending Work → Infrastructure for the `@uswds/compile` replacement plan.