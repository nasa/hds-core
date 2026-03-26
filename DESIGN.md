# HDS Core Design Decisions

Visual and UX decisions for the HDS creative director, designers, and design-minded developers. This document tracks where HDS Core intentionally differs from the HDS Core Proposal and HDS Figma spec, and flags items needing creative director review.

For implementation architecture, see ARCHITECTURE.md. For Storybook documentation conventions, see DOCUMENTATION.md.

Last updated: 2026-03-23

## Class Naming Convention

| Tier | Pattern | When to use | Examples |
| --- | --- | --- | --- |
| 1 | `usa-*` | HDS maps 1:1 to a USWDS component — override styles directly | `.usa-button`, `.usa-link`, `.usa-accordion`, `.usa-pagination` |
| 2 | `hds-*` | HDS needs different markup than a same-named USWDS component | Identified case-by-case |
| 3 | `hds-*` | No USWDS equivalent | `.hds-btn--primary`, `.hds-btn-icon`, `.hds-overline`, `.hds-palette-*` |

**Rule of thumb:** If a USWDS site could adopt HDS Core and the component works without changing HTML, it's Tier 1. If USWDS doesn't have it, it's Tier 3.

## Navigation Component Mapping

HDS Figma, USWDS, and HDS Core use overlapping terms for navigation components. This table defines the canonical mapping for Phase 2 implementation.

| HDS Figma | What it is | USWDS Equiv | HDS Core CSS | Status |
| --- | --- | --- | --- | --- |
| Global Navigation | Murphy Bed menu, dropdown menus, NASA logo link, NASA TV link — the full site header and footer | `usa-header`, `usa-footer` | §1 | Phase 2 (top priority) |
| Secondary Navigation | Horizontal bar beneath the header on topic/subtopic pages. Section links with optional dropdown menus. Breadcrumb on left swaps to page title on scroll. Light and dark themes. | No clean equivalent — composed pattern | §1 | Phase 2 (ships with Header/Footer) |
| Tertiary / Local Navigation | Fixed sidebar on long-form articles and encyclopedic reference pages. Scroll spy highlights current section. Optional 2nd-level links for subsections. HDS Figma notes this should be used sparingly — it inhibits full-width modules. | `usa-in-page-nav` | §6 | Phase 1 |
| Table of Contents | Non-sticky multi-column link grid at the top of the page (2-col or 3-col). Links can be anchor (↓), internal (→), or external (↗). Collapses to dropdown on small/medium screens. Minimum 5 rows. Should not duplicate Secondary Navigation. | No equivalent | — | Phase 2 |
| _(none)_ | Vertical sidebar for navigating between pages in a section (docs left rail pattern). Not defined in HDS Figma. | `usa-sidenav` | — | Phase 2 (low — use USWDS default) |

## Color

### Primary / Secondary Swap

**USWDS default:** `primary` = blue, `secondary` = red. **HDS Core:** `primary` = NASA Red, `secondary` = NASA Blue.

This swap is defined in the HDS Core Proposal. It means `.usa-button` renders NASA Red (CTA) and `.usa-button--secondary` renders NASA Blue (on-page action).

### Color Precision

HDS Core uses exact HDS hex values for all component styles. USWDS utility classes (`.bg-base-darker`, etc.) use USWDS approximations that are close but not identical — a USWDS architectural constraint.

### Link Colors

HDS links use body text color — not brand color — for the text itself. The dotted underline and external arrow provide the visual affordance. This prevents bare `<a>` tags from rendering in NASA Red after the primary/secondary swap.

## Naming & Organization

### Palette Names

| Original      | HDS Core  | Background                          |
| ------------- | --------- | ----------------------------------- |
| Palette one   | `white`   | Spacesuit White (#FFFFFF) — default |
| Palette two   | `light`   | Carbon 05 (#F6F6F6)                 |
| Palette three | `midtone` | Carbon 20 (#D1D1D1)                 |
| Palette four  | `dark`    | Carbon 90 (#17171B)                 |
| Palette five  | `blue`    | NASA Blue Shade (#0B3D91)           |
| Palette six   | `black`   | Carbon Black (#000000)              |

### Consolidated Palette Variables

**Original HDS:** ~30 individual color assignments per palette. **HDS Core:** 23+ semantic variables. Elements sharing the same color are combined (e.g., overline + metadata + caption → `muted`, heading + primary button text → `heading`).

### Palette-Specific Overrides

White and light share a light scheme. Dark and black share a dark scheme. Midtone and blue override specific values:

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

**Original HDS:** Separate "Elements" (atomic) and "Components" (composed) categories. **HDS Core:** Flattened into a single "Components" category, mirroring USWDS structure.

## Typography

### Font Family Slot Mapping

| HDS Font    | USWDS Slot | Role Tokens     |
| ----------- | ---------- | --------------- |
| Public Sans | `sans`     | `body`          |
| Inter       | `serif`    | `heading`, `ui` |
| DM Mono     | `mono`     | `code`, `alt`   |

Note: `family("serif")` returns Inter (a sans-serif font) — a USWDS constraint. Always use role tokens (`family("heading")`) not type tokens.

### Heading Line-Heights and Letterspacing

Per-element values per the HDS Core Proposal (USWDS only supports one line-height for all headings):

| Element | Line-Height | Letterspacing | Weight   |
| ------- | ----------- | ------------- | -------- |
| H1      | 1 (100%)    | -1.5px        | 700 bold |
| H2      | 1.1 (110%)  | -1px          | 700 bold |
| H3      | 1.2 (120%)  | -0.5px        | 700 bold |
| H4      | 1.3 (130%)  | -0.5px        | 600 semi |
| H5      | 1.2 (120%)  | -0.5px        | 600 semi |
| H6      | 1.3 (130%)  | -0.25px       | 600 semi |

### Body Line-Height

160% per the HDS Core Proposal.

### Typography Classes

Three distinct small-text utility classes with unique typography per the HDS Core Proposal:

**`.hds-overline`** (was `.hds-label` / `.hds-eyebrow`): DM Mono uppercase label. Used above headlines, for section labels, time-to-read indicators.

**`.hds-metadata`**: Inter uppercase label. Used for dates, content counts, category indicators. Values from Figma, size standardized to 12px.

**`.hds-caption`**: Public Sans sentence-case caption for images and media.

### Form Labels

Form labels (`<label>`, `.usa-label`) use Inter 14px semibold — distinct from the typography classes above.

### Type Normalization (Known Tech Debt)

All three fonts use the same USWDS cap-height, which disables optical normalization. The Proposal acknowledges this needs future work.

## Links

### Underline Style

**Figma:** Dashed, 1px, "2, 3" dash pattern. **HDS Core:** `text-decoration-style: dotted`.

CSS `dashed` creates long dashes that look dramatically different from Figma. `dotted` is visually closer to the Figma short-dash pattern.

### Hover Behavior

Link text color stays constant. Only the underline changes from dotted to solid on hover.

### External Link Arrow

HDS diagonal arrow (`arrow-line-diagonal.svg`) replaces USWDS launch icon. Arrow direction follows the HDS wayfinding rule: diagonal = leaving NASA. Appears automatically with no markup changes.

**Known limitation:** CSS `text-decoration` cannot flow through `::after` pseudo-elements, creating a small underline gap before the arrow. Shared by USWDS, GOV.UK, and other government design systems.

### Unstyled Button

`.usa-button--unstyled` is visually identical to a text link — same color, dotted underline, and hover behavior. This matches USWDS's intent ("A button that looks like a link") and ensures unstyled buttons are visible across all palettes.

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

| USWDS Term | USWDS Meaning | HDS Equivalent |
| --- | --- | --- |
| "Primary" (`.usa-button`) | Filled, most important action | **HDS "CTA"** — NASA Red filled |
| "Secondary" (`.usa-button--secondary`) | Filled, secondary color | **HDS "Secondary Filled"** — NASA Blue |
| "Outline" (`.usa-button--outline`) | Transparent with stroke | **HDS "Outline Secondary"** — NASA Blue border |
| "Unstyled" (`.usa-button--unstyled`) | Looks like a link | **Identical to HDS link treatment** |
| N/A | No equivalent | **HDS "Primary"** — text + red circle arrow (`.hds-btn--primary`) |

**USWDS variants HDS does not use:** `.usa-button--accent-cool`, `.usa-button--accent-warm` (would break the two-color wayfinding system), `.usa-button--base` (HDS uses `.hds-btn-icon--utility` for neutral actions).

### Button States

**Hover:** NASA Red Shade (CTA), NASA Blue Shade (secondary filled), border darkens (outline), underline changes to solid (unstyled).

**Active:** Visually identical to hover. HDS does not define a distinct active state, consistent with Apple HIG.

**Disabled:** Color-based, not opacity-based. Filled buttons get Carbon 20 fill with white text. Outline buttons get palette-aware muted border and text. Unstyled buttons get muted text with no underline. Disabled buttons do not respond to hover or focus.

### Secondary Button Contrast ⚠️

The Proposal specifies NASA Blue Tint (`#288BFF`) for secondary buttons on dark palettes. White text on this background has a contrast ratio of **3.37:1** — below the 4.5:1 AA minimum. NASA Blue itself (`#1C67E3`) on light palettes is **~4.68:1** — passes AA but fails AAA.

Under active review: [GitHub Discussion — Reassess secondary button fill color](https://github.com/nasa/hds-core/discussions).

### Outline Inverse — Two-Layer Approach

HDS outline buttons on dark backgrounds keep the **NASA Blue** border (not monotone white like USWDS `--inverse`). Only the text flips to white.

- **Inside palette wrappers:** Automatic — no extra class needed.
- **Without palette wrappers:** Add `.usa-button--inverse` for dark-background styling.

### Glyph + CSS Container Architecture

**Original HDS:** Multi-color SVGs (e.g., blue circle with white icon baked in). **HDS Core:** Two layers: single-color SVG glyph (`currentColor`) + CSS-styled circle container. Icons automatically adapt to palettes.

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

SVG icons updated from 20×20px to 24×24px. Figma's glyph-to-container ratio assumes 20×20px originals — CSS sizing needs adjustment. See GitHub Issue #13.

### Primary Arrow Button

**Original HDS:** Uses `Primary-Arrow.svg`. **HDS Core:** CSS `::after` pseudo-element generates circle and line arrow. Arrow direction auto-swaps for external links — no SVG markup needed in HTML.

### Fixed-Color Button Graphics

Seven graphics have colors baked in and don't respond to palettes (`interactive-*.svg` and `primary-arrow.svg`). These are intentional brand elements per HDS spec.

## Focus Ring

1px dashed, palette-aware, `:focus-visible` only (keyboard navigation, not mouse clicks).

| Property | Light palettes                        | Dark palettes         |
| -------- | ------------------------------------- | --------------------- |
| Style    | 1px dashed                            | 1px dashed            |
| Color    | `--hds-palette-muted`                 | `--hds-palette-muted` |
| Offset   | 2px default (components may override) | Same                  |

**Validated:** Focus ring contrast passes WCAG 2.4.11 (3:1 minimum for non-text UI) on all six palettes — all exceed 5:1.

**Known issue:** Focus styles are currently inconsistent across components — some use `dotted` instead of `dashed`, `2px` instead of `1px`, or `:focus` instead of `:focus-visible`. Tracked in Issue #20 for standardization.

## Pagination

### Current Page Indicator

**USWDS:** Filled pill with `background-color: primary`. **HDS:** No background fill. 2px solid bottom bar, palette-aware heading color.

### Page Number Typography

Inter semibold (600), 16px, -0.5px letterspacing.

### Previous/Next Arrows

HDS uses utility icon circle buttons. Legacy USWDS pagination arrow markup is automatically restyled to look like utility circles via CSS.

### Filter Variant (Deferred)

The HDS Figma spec includes a rows-per-page filter alongside pagination. Requires a dropdown menu component — deferred to Phase 2+.

## Site Alert

### Naming

**HDS Figma:** "Banner". **HDS Core:** "Site Alert" — renamed to match the USWDS component it maps to (`.usa-site-alert`). The USWDS "Banner" is the government compliance bar.

### Color Variants

| Variant       | Background                | Text  | Use                                               |
| ------------- | ------------------------- | ----- | ------------------------------------------------- |
| `--emergency` | NASA Red Shade (#B60109)  | White | Lapse in appropriations, outages, critical safety |
| `--info`      | NASA Blue Shade (#0B3D91) | White | Live events, language redirects, announcements    |

Link treatment on both follows the dark-background pattern: white text, Carbon 30 underline, Carbon 40 arrow.

## Accordion

### Chevron Icon

USWDS renders +/− icons with a filled background. HDS replaces these with a circled chevron (down when collapsed, up when expanded) using the same utility circle tokens as other icon circles.

The circle is 24px (1.5em at 16px base), matching the Figma "M" icon button size. Hardcoded until the icon button size system adds a `--md` size. See GitHub Discussion #13.

### Bordered Variant

USWDS offers `.usa-accordion--bordered`. HDS Figma shows only borderless accordions. The bordered variant renders with default USWDS treatment. Pending creative director review: should HDS define its own bordered variant?

### Hover State

HDS Figma does not specify a hover state for the accordion heading row. Currently unimplemented — pending Figma research on full-row hover patterns.

## Table

### Surface Model

Tables use a fixed background — white for light palettes, Carbon 90 for dark palettes — rather than inheriting the surrounding palette background. All Figma-confirmed colors (borders, sorted column tints, caption text) are designed against these two specific surfaces.

Palette-aware table backgrounds (where the table adapts to the exact palette background color like Carbon 05 or Carbon 20) are deferred to Phase 2 pending creative director review.

### Caption vs Title Naming

HTML `<caption>` = HDS Figma "Title" + optional "Subtitle." It is the semantic accessible name of the table, positioned at top. HDS Figma "Caption" (small attribution text below the table) uses `.hds-caption` on a `<p>` outside `<table>`, linked via `aria-describedby` per HDS Figma accessibility guidance.

### Sort Icon

USWDS JS injects a `<button>` with inline SVG arrows into each `th[data-sortable]`. HDS replaces the arrows visually with filled triangle icons (`arrow-filled-down.svg`, `arrow-filled-up.svg`) via CSS mask-image — same technique as the accordion chevron. The USWDS SVG stays in the DOM for High Contrast Mode fallback.

Sort icon colors: NASA Blue on light palettes, NASA Blue Tint on dark palettes. Unsorted columns show no icon by default; a gray (Carbon 40) icon appears on hover or keyboard focus.

### Sorted Column Colors

Light mode sorted column uses NASA Blue tints over white:

| Row  | Figma CSS                          | Rendered hex | Token                               |
| ---- | ---------------------------------- | ------------ | ----------------------------------- |
| Even | `rgba(28, 103, 227, 0.03)` / white | `#F8FAFE`    | `$hds-color-table-sorted-bg`        |
| Odd  | `rgba(28, 103, 227, 0.06)` / white | `#F2F6FE`    | `$hds-color-table-sorted-stripe-bg` |

Dark mode sorted column uses white tints over Carbon 90:

| Row  | Figma CSS                               | Rendered hex | Token                                    |
| ---- | --------------------------------------- | ------------ | ---------------------------------------- |
| Even | `rgba(255, 255, 255, 0.06)` / Carbon 90 | `#252528`    | `$hds-color-table-sorted-bg-dark`        |
| Odd  | `rgba(255, 255, 255, 0.04)` / Carbon 90 | `#202024`    | `$hds-color-table-sorted-stripe-bg-dark` |

⚠️ **Creative review needed:** Sorted column blue tints are designed for a white surface. On the light palette (Carbon 05 background), the even-row tint (`#F8FAFE`) is lighter than the page background (`#F6F6F6`), creating an inverted contrast effect. Midtone and blue palette sorted column colors are unspecified in Figma. See GitHub Discussion for details.

### Striped Variant

HDS Figma does not define a striped table variant. HDS Core overrides USWDS stripe defaults with Carbon scale colors (Carbon 05 light, Carbon 80 dark) so `.usa-table--striped` looks acceptable if used, but it is not an HDS-specified pattern.

### Header States

| State   | Light background     | Dark background  |
| ------- | -------------------- | ---------------- |
| Default | Carbon 10            | Carbon 80        |
| Hover   | Carbon 05            | Carbon 70        |
| Focus   | 1px dashed Carbon 60 | 1px dashed White |

### Body Typography

| Element          | Font        | Size  | Weight   | Notes                                   |
| ---------------- | ----------- | ----- | -------- | --------------------------------------- |
| Header cell      | Inter       | 14px  | Semibold | -0.25px letterspacing                   |
| Body cell        | Public Sans | 14px  | Regular  | `font-feature-settings: 'tnum', 'lnum'` |
| Caption title    | Inter       | ~28px | Bold     | Closest USWDS token to Figma 29px       |
| Caption subtitle | Inter       | 14px  | Regular  | Carbon 60 (light), Carbon 40 (dark)     |

### Deferred to Phase 2

- Mobile text sizing (small vs M-XL Figma variants)
- Mobile stacked variants (`.usa-table--stacked`, `.usa-table--stacked-header`) — untested with HDS overrides
- Palette-aware table backgrounds
- Midtone/blue palette sorted column colors
- Links and inline icon buttons in table cells (untested)
- Advanced features: tabs, actions bar, filter panel, search, download, print, accordion mobile layout, fixed first column

## System Behavior

### OS Dark Mode Is Opt-In

HDS Core does not automatically switch palettes based on OS dark mode. Enable with `$hds-enable-auto-dark-mode: true`.

### TV Breakpoint (Deferred)

The Proposal defines a `tv` breakpoint at 1920px. Deferred — USWDS doesn't have a built-in `tv` breakpoint.

## Creative Director Review

Pending visual sign-offs:

| Item | Question | Context |
| --- | --- | --- |
| `.hds-overline` naming | Is "overline" acceptable for the DM Mono label class? | Industry standard (Material, Salesforce, Atlassian). Replaces `.hds-label` / `.hds-eyebrow`. HDS Figma calls it "Label." |
| Overline font-weight | Should overline use 400 (Proposal) or 500 (Figma)? | Proposal says "normal" (400). Figma uses Medium (500). Currently shipping 500. |
| CTA hover on dark palettes | Does NASA Red Shade work on dark/blue/black backgrounds? | Figma only shows light-background hover |
| Secondary filled hover on dark | Does NASA Blue Shade work as the hover for Blue Tint? | Inferred from "darken by one shade step" pattern |
| Secondary button contrast | NASA Blue Tint fails AA on dark palettes (3.37:1). NASA Blue itself barely passes AA (4.68:1). | [GitHub Discussion](https://github.com/nasa/hds-core/discussions) |
| Midtone disabled buttons | Carbon 20 stroke on Carbon 20 background is invisible — what values? | Proposed: Carbon 40 stroke, Carbon 50 text |
| Blue palette utility hover/disabled | Utility circle colors on blue palette are inferred, not confirmed in Figma | Hover stroke → White, disabled stroke → NASA Blue |
| Midtone utility hover/disabled | Carbon 05 hover fill on Carbon 20 background — visible but subtle | May need override |
| Icon button sizes | Figma shows 6 sizes (XS–XXL). HDS Core has 3. `--lg` is 40px but Figma XXL is 36px. | See Issue #13 |
| Icon button glyph sizing | HDS Core SVGs are 24×24px (not Figma's 20×20px) — ratio needs adjustment | Glyphs render slightly smaller than Figma intends |
| Accordion bordered variant | Should HDS define its own bordered variant or discourage it? | Figma shows only borderless |
| Accordion hover state | Figma doesn't specify heading row hover — should one be added? | Full-row hover patterns need research |

## What Hasn't Changed

All of these match the approved HDS Core Proposal exactly:

- Color hex values (all 20 brand/Carbon colors)
- Font families (Inter, Public Sans, DM Mono)
- Font size scale (3xs through 4xl)
- Spacing tokens
- Grid settings (12-column, breakpoints through widescreen)
- Palette background colors

## What Changed From the Proposal

| Area | Proposal | HDS Core | Rationale |
| --- | --- | --- | --- |
| Line-height values | Exact percentages | Closest USWDS token or raw CSS when delta >10% | USWDS scale too coarse for exact mapping |
| `text-decoration-style` | Dashed | Dotted | CSS `dashed` looks wrong; `dotted` is closer to Figma |
| Overline weight | 400 (normal) | 500 (medium) | Figma consistently uses 500. Pending review. |
| Overline class name | "Label" | `.hds-overline` | Avoids collision with USWDS `.usa-label`. Industry standard term. |
| Type normalization | Normalize all three fonts | Deferred | Requires measurement work; noted as tech debt |
| TV breakpoint | 1920px | Deferred | USWDS doesn't support it |
| Button font family | Not specified | Inter | Figma shows Inter for all button text |
| Button active state | Not specified | Matches hover | Consistent with Apple HIG; Figma shows no active state |
| Unstyled button | Not specified | Styled as a text link | Matches USWDS intent; ensures palette visibility |
