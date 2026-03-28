# HDS Core Design Decisions

Visual and UX decisions for the HDS creative director, designers, and design-minded developers. This document tracks where HDS Core intentionally differs from the HDS Core Proposal and HDS Figma spec, and flags items needing creative director review.

For implementation architecture, see ARCHITECTURE.md. For Storybook documentation conventions, see DOCUMENTATION.md.

Last updated: 2026-03-28

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

**Disabled:** Use `--hds-palette-btn-disabled-bg` token (not hardcoded Carbon 20) so they remain visible on midtone palette (Carbon 20 background).

Explicit hover, focus, and focus-visible guards prevent USWDS rules from overriding disabled button colors. Variant-specific selectors (`.usa-button--secondary:disabled`) are required to match USWDS specificity on CTA and secondary variants.

### Secondary Button on Blue Palette

NASA Blue (`#1C67E3`) is used for secondary filled buttons on all palettes per creative director review (2026-03-27). Passes WCAG AA (4.54:1 with white text).

On the blue palette only, secondary filled text buttons automatically render as outline (§4.8) because any blue fill blends into the NASA Blue Shade background. Icon buttons are excluded — their smaller surface area avoids the contrast issue.

Blue palette tokens use Blue Tint / Blue (not Blue / Blue Shade) because these tokens serve outline borders on this palette — they need contrast against the Blue Shade background.

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

### Icon Button Size Scale

8-size scale aligned with HDS Figma spec plus two sizes observed in Figma modules (flagged for creative director confirmation):

| Class       | Container | Figma equivalent | Source                                          |
| ----------- | --------- | ---------------- | ----------------------------------------------- |
| `--2xs`     | 12px      | —                | Observed in filter dropdowns (11px, rounded up) |
| `--xs`      | 16px      | XS               | Figma spec                                      |
| `--sm`      | 20px      | S                | Figma spec                                      |
| _(default)_ | 24px      | M                | Figma spec — promoted to default                |
| `--lg`      | 28px      | L                | Figma spec                                      |
| `--xl`      | 32px      | XL               | Figma spec — was HDS Core default               |
| `--2xl`     | 36px      | XXL              | Figma spec                                      |
| `--3xl`     | 40px      | —                | Observed in pagination/carousel modules         |

Default was moved from 32px (Figma XL) to 24px (Figma M) because 24px is the most frequently used size across Figma modules and matches the primary arrow button container. USWDS-style t-shirt naming (2xs–3xl) is used instead of Figma labels (XS–XXL) so modifier names always indicate size relative to default.

Uses px instead of em/rem — USWDS sets the root font-size to a non-16px value via its type scale config, causing em/rem to produce fractional pixel values.

The 2xs size (12px) is below the WCAG 2.5.8 minimum touch target (24px). Desktop-only usage with mouse context required.

72px media play button is deferred to a future media player component (Github discussion #7).

### Primary Arrow Button

Text + CSS `::after` red circle with white arrow. No SVG markup needed — the arrow is rendered via CSS background-image. Arrow direction auto-swaps for external links via `.usa-link--external`.

#### Size Scale

6-size scale matching HDS Figma spec. Circle containers align with icon button sizes at each step. Text-to-circle ratios vary across sizes, so px values are used for both.

| Class       | Text | Circle | Icon btn equivalent |
| ----------- | ---- | ------ | ------------------- |
| `--xs`      | 14px | 16px   | `--xs`              |
| `--sm`      | 16px | 20px   | `--sm`              |
| _(default)_ | 18px | 24px   | default             |
| `--lg`      | 22px | 28px   | `--lg`              |
| `--xl`      | 29px | 32px   | `--xl`              |
| `--2xl`     | 36px | 36px   | `--2xl`             |

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

The circle is 24px, matching the icon button default size (Figma M). See §12.3 in `_hds-components.scss`.

### Bordered Variant

USWDS offers `.usa-accordion--bordered`. HDS Figma shows only borderless accordions. The bordered variant renders with default USWDS treatment. Pending creative director review: should HDS define its own bordered variant?

### Hover State

HDS Figma does not specify a hover state for the accordion heading row. Currently unimplemented — pending Figma research on full-row hover patterns.

## Form Elements

### Palette Token Renames

Three checkbox-specific tokens renamed to generic control names (shared by checkbox + radio):

- `--hds-palette-checkbox-text` → `--hds-palette-control-text`
- `--hds-palette-checkbox-fill` → `--hds-palette-control-fill`
- `--hds-palette-checkbox-stroke` → `--hds-palette-control-stroke`

### New Form Tokens (Flagged for Review)

Six new tokens inferred from Figma component CSS. The HDS Core Proposal defines checkbox colors and UI borders but does not specify input backgrounds, disabled states, or error states. These need review — especially on midtone and blue palettes, which Figma never designed form elements for.

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| `--hds-palette-control-border` | Carbon 40 | Carbon 60 | Checkbox/radio default border (intentionally darker than text input borders for visibility on smaller targets) |
| `--hds-palette-input-bg` | White | Black | Form control backgrounds (always the extreme, unlike `--hds-palette-bg` which varies) |
| `--hds-palette-disabled` | Carbon 40 | Carbon 60 | Disabled text and labels |
| `--hds-palette-disabled-bg` | Carbon 05 | Carbon 90 | Disabled backgrounds |
| `--hds-palette-error-border` | NASA Red | Red/Tint | Error state borders |
| `--hds-palette-error-text` | Red/Shade | Red/Tint | Error message text |

### Disabled Help Text

Figma dims help text to Carbon 40 in disabled groups. That's 2.85:1 contrast on white — fails WCAG 4.5:1. WCAG exempts disabled _controls_ but help text isn't a control. HDS Core keeps help text readable in disabled groups.

### Select Chevron (Deferred Post-1.0)

Figma shows a single thin down chevron. Currently using USWDS default double-arrow. Replacing it requires a palette-aware approach or a custom dropdown component. Deferred.

### Custom Dropdown Panel (Deferred Post-1.0)

Figma shows a styled dropdown with rounded corners and blue active highlight. HDS Core uses the native browser `<select>` dropdown, which can't be styled. Requires JavaScript.

### Floating Label (Deferred Post-1.0)

Figma shows a compact pattern where the label sits inside the field as placeholder text and moves above on focus. Requires JavaScript.

## Table

### Surface Model

Tables use a fixed background — white for light palettes (white, light, midtone, blue), Carbon 90 for dark palettes (dark, black) — rather than inheriting the surrounding palette background. All Figma-confirmed colors (borders, sorted column tints, caption text) are designed against these two specific surfaces. Blue palette uses the light table variant per creative director review (2026-03-27).

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
- Midtone palette sorted column colors
- Advanced features: tabs, actions bar, filter panel, search, download, print, accordion mobile layout, fixed first column

## List

### Architecture

Tier 1 — uses standard USWDS `.usa-list` markup with `role="list"` and `aria-label` per HDS Figma accessibility spec. Two scopes:

| Scope | File | Approach | Always active? |
| --- | --- | --- | --- |
| Bare elements (`<ul>`, `<ol>` inside `.usa-prose` or with `$theme-global-content-styles`) | `_hds-custom-styles.scss` §4.7 | Native `::marker` for both `ul` and `ol` | No — gated |
| `.usa-list` component | `_hds-components.scss` §17 | `ul`: native `::marker`. `ol`: `::before` + flex | Yes |
| Palette wiring | `_hds-custom-styles.scss` §5.3 | `li::marker` color in palette containers | Yes |

The hybrid approach exists because bare `<ol>` inside `.usa-prose` cannot add `role="list"` (CMS/markdown content), and `list-style: none` breaks Safari VoiceOver without it. The `::marker` fallback preserves native list semantics. The `.usa-list` component uses `::before` + flex for precise DM Mono numeral control, with `role="list"` required in markup.

### Typography Scale Pattern

HDS lists use a step-down pattern through the USWDS type scale, confirmed across multiple Figma example pages:

| Element          | USWDS size call       | px   | Steps from body |
| ---------------- | --------------------- | ---- | --------------- |
| Body `<p>`       | `size('body', 'xs')`  | 16px | —               |
| List item `<li>` | `size('body', '2xs')` | 14px | −1 step         |
| OL numeral       | `size('body', '3xs')` | 12px | −2 steps        |

This is an intentional HDS design choice — USWDS list items inherit body font size. Documented as a difference from USWDS on the Guidance page.

### Item Spacing

`margin-block-end: units(2.5)` (20px) per Figma. Line-height: `line-height('body', 3)` ≈ 1.35 — within 10% of Figma's 1.43 (20px / 14px), following the simplified Proposal approach of using USWDS tokens when within 10%.

### Ordered List Numerals

DM Mono medium (500), 12px, no trailing period, no added letterspacing.

Figma shows 3.5px letterspacing on numerals, but this matches the overline/label style — not the Proposal's DM Mono Number pattern, which uses 0px (`'auto'`) at small sizes. Visual review confirmed 3.5px is too wide at double-digit item counts.

**On `ol.usa-list`:** `::before` counter + flex gives precise control over font, gap (`units(1.5)` = 12px, closest token to Figma's 11px), and right-alignment. `min-width: 1.5em` accommodates double-digit numbers. `align-items: baseline` aligns numerals to text baseline.

**On bare `<ol>` (prose/CMS):** `::marker` with `content: counter(list-item)` unlocks `font-family` in some browsers but support is inconsistent. DM Mono is not guaranteed on bare `<ol>` — Public Sans may render instead. This is a known limitation of the `::marker` approach.

### Indentation

| List type | `padding-inline-start` | Rationale                                         |
| --------- | ---------------------- | ------------------------------------------------- |
| `ul`      | `units(2)` (16px)      | Bullet flush left per Figma — 5px disc + 11px gap |
| `ol`      | `units(4)` (32px)      | Room for double-digit DM Mono numerals + gap      |

### Marker Colors

Single palette token `--hds-palette-marker` for both `ul` and `ol` markers.

| Palettes              | Color                    | Token                       |
| --------------------- | ------------------------ | --------------------------- |
| White, Light, Midtone | NASA Blue `#1C67E3`      | `$hds-color-nasa-blue`      |
| Dark, Black           | NASA Blue Tint `#288BFF` | `$hds-color-nasa-blue-tint` |
| Blue                  | NASA Blue Tint `#288BFF` | `$hds-color-nasa-blue-tint` |

Midtone inherits NASA Blue from the light scheme. Black inherits Blue Tint from the dark scheme.

### Marker Contrast (WCAG 1.4.11 Non-text, 3:1 minimum)

| Palette | Background | Marker    | Ratio   | Pass                      |
| ------- | ---------- | --------- | ------- | ------------------------- |
| White   | `#FFFFFF`  | NASA Blue | ~4.8:1  | ✅                        |
| Light   | `#F6F6F6`  | NASA Blue | ~4.6:1  | ✅                        |
| Midtone | `#D1D1D1`  | NASA Blue | ~3.35:1 | ✅                        |
| Dark    | `#17171B`  | Blue Tint | ~6.1:1  | ✅                        |
| Blue    | `#0B3D91`  | Blue Tint | ~3.0:1  | ✅ (borderline, approved) |
| Black   | `#000000`  | Blue Tint | ~7.5:1  | ✅                        |

`::marker` contrast cannot be tested by axe-core. `::before` contrast (on `ol.usa-list`) can be tested. Ratios documented here and verified manually.

### Figma Deviations

| What | Figma | HDS Core | Why |
| --- | --- | --- | --- |
| Dark `ul` marker | NASA Blue (same as light) | NASA Blue Tint | Likely Figma oversight — NASA Blue on dark backgrounds fails 3:1. Dark `ol` numerals already use Tint in Figma. |
| OL letterspacing | 3.5px | 0px (default) | Figma value matches overline/label style. Proposal DM Mono at small sizes uses `'auto'` (0px). Visual review confirmed 3.5px too wide at double digits. |
| Blue palette marker | Not specified | NASA Blue Tint | NASA Blue is invisible on Blue Shade background. Blue Tint at ~3.0:1 is borderline but approved. |

### Unstyled Variant

§17.4 resets HDS typography additions (`font-size`, `line-height`, `margin-block-end`) to `inherit` / `0`. USWDS `.usa-list--unstyled` handles its own resets (`list-style-type: none`, `padding-left: 0`). Unstyled lists fully inherit from context.

### Nested Lists

HDS Figma does not define nested list behavior. Browser defaults apply for nested marker glyphs (circle, square, etc.). Marker color cascades to nested levels via `::marker` inheritance. Nested lists are tested in the Prose story.

## System Behavior

### OS Dark Mode Is Opt-In

HDS Core does not automatically switch palettes based on OS dark mode. Enable with `$hds-enable-auto-dark-mode: true`.

### TV Breakpoint (Deferred)

The Proposal defines a `tv` breakpoint at 1920px. Deferred — USWDS doesn't have a built-in `tv` breakpoint.

## Creative Director Review

Pending visual sign-offs:

| Item | Question | Context |
| --- | --- | --- |
| Overline font-weight | Should overline use 400 (Proposal) or 500 (Figma)? | Proposal says "normal" (400). Figma uses Medium (500). Currently shipping 500. |
| Blue palette utility hover/disabled | Utility circle colors on blue palette are inferred, not confirmed in Figma | Hover stroke → White, disabled stroke → NASA Blue |
| Midtone utility hover/disabled | Carbon 05 hover fill on Carbon 20 background — visible but subtle | May need override |
| Icon button 2xs and 3xl sizes | Are 12px (filter dropdowns) and 40px (pagination/carousel) confirmed sizes? | Observed in Figma modules but not in the formal icon button spec |
| Accordion bordered variant | Should HDS define its own bordered variant or discourage it? | Figma shows only borderless |
| Accordion hover state | Figma doesn't specify heading row hover — should one be added? | Full-row hover patterns need research |
| Form token colors | Are the 6 Figma-inferred form tokens correct for midtone and blue palettes? | Tokens inferred from Figma light/dark only — midtone and blue not designed in Figma |

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
| Checkbox/radio size | 20px (USWDS default) | 18px forced via CSS | Figma specifies 18×18px. USWDS setting can't express 2.25 units. |
| Checkbox icon | USWDS default glyph | HDS check icon via data URI | Visually distinct from USWDS checkmark |
| Form font family | Not specified | Public Sans (body) | Figma shows Public Sans for input values and help text |
| Icon button default size | Not specified | 24px (Figma M) | Most frequently used size across Figma modules; matches primary arrow container |
| Icon button sizing units | Not specified | px (not em/rem) | USWDS root font-size is non-16px, causing fractional em/rem values |
| Secondary filled on dark | NASA Blue Tint | NASA Blue | Creative director approved; passes AA on all palettes |
| Secondary filled on blue | NASA Blue Tint filled | Outline (NASA Blue Tint border) | Filled variant blends into Blue Shade background |
| Table on blue palette | Dark table (Carbon 90) | Light table (white) | Creative director approved; white surface inside blue section |
| OL numeral letterspacing | 3.5px (Figma) | 0px | Figma value matches overline/label pattern. Proposal DM Mono Number elements at small sizes use 'auto' (0px). Visual review confirmed too wide at double digits. |
