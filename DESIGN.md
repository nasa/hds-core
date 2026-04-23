# HDS Core Design Decisions

Visual and UX decisions for the HDS creative director, designers, and design-minded developers. This document tracks where HDS Core intentionally differs from the HDS Core Proposal and HDS Figma spec, and flags items needing creative director review.

For implementation architecture, see ARCHITECTURE.md. For Storybook documentation conventions, see DOCUMENTATION.md. For implementation details (token values, contrast ratios, typography specs), see the SCSS source files — code comments are the single source of truth for "what values does this use."

Last updated: 2026-04-03

## Class Naming Convention

| Pattern | When to use | Examples |
| --- | --- | --- |
| `usa-*` | HDS maps to a USWDS component — same markup, same class names | `.usa-button`, `.usa-link`, `.usa-accordion`, `.usa-pagination` |
| `hds-*` | No USWDS equivalent | `.hds-btn--primary`, `.hds-btn-icon`, `.hds-overline`, `.hds-palette-*` |

**Rule of thumb:** If a component maps to a USWDS component, it keeps `usa-*` regardless of how much HDS changes the styling or internals. If USWDS doesn't have it, it's `hds-*`. Where HDS diverges from USWDS in ways that affect developer markup or behavior, those differences are documented with "Differs from USWDS" callout notes in component guidance pages and migration guide entries.

## Navigation Component Mapping

HDS Figma, USWDS, and HDS Core use overlapping terms for navigation components. This table defines the canonical mapping for Phase 2 implementation.

| HDS Figma | What it is | USWDS Equiv | HDS Core CSS | Status |
| --- | --- | --- | --- | --- |
| Global Navigation | Murphy Bed menu, dropdown menus, NASA logo link, NASA TV link — the full site header and footer | `usa-header`, `usa-footer` | `components/_navigation.scss` | Phase 2 (top priority) |
| Secondary Navigation | Horizontal bar beneath the header on topic/subtopic pages. Section links with optional dropdown menus. Breadcrumb on left swaps to page title on scroll. Light and dark themes. | No clean equivalent — composed pattern | `components/_navigation.scss` | Phase 2 (ships with Header/Footer) |
| Tertiary / Local Navigation | Fixed sidebar on long-form articles and encyclopedic reference pages. Scroll spy highlights current section. Optional 2nd-level links for subsections. HDS Figma notes this should be used sparingly — it inhibits full-width modules. | `usa-in-page-nav` | `components/_in-page-nav.scss` | Phase 1 |
| Table of Contents | Non-sticky multi-column link grid at the top of the page (2-col or 3-col). Links can be anchor (↓), internal (→), or external (↗). Collapses to dropdown on small/medium screens. Minimum 5 rows. Should not duplicate Secondary Navigation. | No equivalent | — | Phase 2 |
| _(none)_ | Vertical sidebar for navigating between pages in a section (docs left rail pattern). Not defined in HDS Figma. | `usa-sidenav` | — | Phase 2 (low — use USWDS default) |

## Color

### Primary / Secondary Swap

**USWDS default:** `primary` = blue, `secondary` = red. **HDS Core:** `primary` = NASA Red, `secondary` = NASA Blue.

This swap is defined in the HDS Core Proposal. It means `.usa-button` renders NASA Red (CTA) and `.usa-button--secondary` renders NASA Blue (on-page action).

### Color Precision

HDS Core uses exact HDS hex values for all component styles. USWDS utility classes (`.bg-base-darker`, etc.) use USWDS approximations that are close but not identical — a USWDS architectural constraint.

### Link Colors

HDS links use body text color — not brand color — for the text itself. The dashed underline and external arrow provide the visual affordance. This prevents bare `<a>` tags from rendering in NASA Red after the primary/secondary swap.

### Data Visualization Color Alignment

The original HDS Figma data visualization palette used custom hex values unique to HDS. The HDS Core Proposal recommended aligning data viz colors with USWDS system color tokens for compatibility and maintainability, while keeping the HDS brand palette (NASA Red, Carbon series, etc.) as custom values. HDS Core follows this recommendation.

Data viz colors are exposed as `--hds-dataviz-cat-1` through `--hds-dataviz-cat-12` CSS custom properties. Light-background defaults are set in `:root` (`base/_custom-properties.scss`). Dark-background overrides are set in `_scheme-dark` (`_hds-palettes.scss`) — dark and black palettes inherit automatically. Blue palette inherits light defaults (chart surfaces inside blue sections use a light background, same as tables).

The HDS Figma naming system (Blue 80, Slate 70, Purple 80, etc.) and the USWDS token names (blue-70v, blue-cool-60, indigo-warm-70v) are deliberately hidden from consumers. The Figma-to-USWDS mapping is documented only in SCSS code comments for maintainers. Consumers use the `--hds-dataviz-cat-*` properties or copy hex values from the Palettes documentation.

Sequential palette custom properties are deferred — categorical covers the primary use case. See `base/_custom-properties.scss` for the full mapping table.

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

**Original HDS:** ~30 individual color assignments per palette. **HDS Core:** 27+ semantic variables (including 4 focus ring tokens). Elements sharing the same color are combined (e.g., overline + metadata + caption → `muted`, heading + primary button text → `heading`).

### Palette-Specific Overrides

White and light share a light scheme. Dark and black share a dark scheme. Midtone and blue override specific values. See `_hds-palettes.scss` for the complete token list per palette.

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

Per-element values per the HDS Core Proposal (USWDS only supports one line-height for all headings). See `base/_elements.scss` for the exact values.

### Body Line-Height

160% per the HDS Core Proposal.

### Typography Classes

Three distinct small-text utility classes with unique typography per the HDS Core Proposal:

**`.hds-overline`**: DM Mono uppercase label. Used above headlines, for section labels, time-to-read indicators. HDS Figma calls this "Label" — renamed to avoid collision with USWDS `.usa-label` form labels. See `components/_text-styles.scss`.

**`.hds-metadata`**: Inter uppercase label. Used for dates, content counts, category indicators. Not a named style in HDS Figma — derived from usage patterns, size standardized to 12px. See `components/_text-styles.scss`.

**`.hds-caption`**: Public Sans sentence-case caption for images and media. Called "Figcaption" in the HDS Core Proposal. See `components/_text-styles.scss`.

### Form Labels

Form labels (`<label>`, `.usa-label`) use Inter 14px semibold — distinct from the typography classes above. See `components/_form.scss`.

### Type Normalization (Known Tech Debt)

All three fonts use the same USWDS cap-height, which disables optical normalization. The Proposal acknowledges this needs future work.

## Links

### Underline Style

**Figma:** Dashed, 1px, "2, 3" dash pattern. **HDS Core:** `text-decoration-style: dashed`.

Matches NASA.gov production styling: dashed underline, `.05em` thickness, `.25rem` offset. CSS `text-decoration` doesn't support custom dash patterns ("2, 3") but `dashed` at thin weights is visually close to the Figma intent and consistent with focus ring styles (also dashed) across the system.

### Hover Behavior

Link text color stays constant. Only the underline changes from dashed to solid on hover.

### External Link Arrow

HDS diagonal arrow (`arrow-line-diagonal.svg`) replaces USWDS launch icon. Arrow direction follows the HDS wayfinding rule: diagonal = leaving NASA. Appears automatically with no markup changes.

**Known limitation:** CSS `text-decoration` cannot flow through `::after` pseudo-elements, creating a small underline gap before the arrow. Shared by USWDS, GOV.UK, and other government design systems.

### Unstyled Button

`.usa-button--unstyled` is visually identical to a text link — same color, dashed underline, hover behavior, and focus ring. This matches USWDS's intent ("A button that looks like a link") and ensures unstyled buttons are visible across all palettes.

## Icons & Buttons

### Wayfinding Color Rule

Red = navigates away. Blue = stays on page.

| Role            | Color                   | Meaning                                           |
| --------------- | ----------------------- | ------------------------------------------------- |
| `--cta`         | NASA Red                | Navigates to new page                             |
| `--secondary`   | NASA Blue filled        | On-page action                                    |
| `--outline`     | NASA Blue border        | Lower emphasis on-page                            |
| `--utility`     | Neutral                 | UI controls                                       |
| `--social`      | Gray                    | Social media                                      |
| `--interactive` | NASA Blue Shade (fixed) | Disclosure triggers over images and 3D content    |

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

**Disabled:** Color-based (not opacity-based). Variant-specific selectors required to match USWDS specificity. See `components/_button.scss` for token values.

### Secondary Button on Blue Palette

NASA Blue (`#1C67E3`) is used for secondary filled buttons on all palettes per creative director review (2026-03-27). Passes WCAG AA (4.54:1 with white text).

On the blue palette only, secondary filled text buttons automatically render as outline (see `components/_button.scss` Blue Palette section) because any blue fill blends into the NASA Blue Shade background. Icon buttons are excluded — their smaller surface area avoids the contrast issue.

### Outline Inverse — Two-Layer Approach

HDS outline buttons on dark backgrounds keep the **NASA Blue** border (not monotone white like USWDS `--inverse`). Only the text flips to white.

- **Inside palette wrappers:** Automatic — no extra class needed.
- **Without palette wrappers:** Add `.usa-button--inverse` for dark-background styling.

### Glyph + CSS Container Architecture

**Original HDS:** Multi-color SVGs (e.g., blue circle with white icon baked in). **HDS Core:** Two layers: single-color SVG glyph (`currentColor`) + CSS-styled circle container. All roles — including interactive — use sprite glyphs with `currentColor`. CSS handles color changes for palettes, hover states, and `aria-expanded` toggling. No standalone SVG files are needed.

### Utility Circle Stroke Contrast

Utility circle strokes are decorative framing — the icon glyph and contextual placement (accordion chevron, pagination arrow, media control, toolbar action) provide the primary affordance for identifying the interactive element. Icon glyph contrast against its background must meet WCAG 1.4.11 (3:1). Circle stroke contrast is not required under 1.4.11 because the stroke is not the visual information "required to identify" the component. See `_hds-palettes.scss` for per-palette token values.

### Interactive Icon Button

Disclosure triggers designed for use over images, video, and 3D content. Not palette-aware — uses fixed colors for high contrast on dynamic backgrounds.

Default: NASA Blue Shade circle, white border, white glyph. Hover/active/expanded: inverts to white circle, black glyph, subtle box shadow. Focus: dashed ring only (no color inversion).

Visual inversion is triggered by `:hover`, `:active`, and `[aria-expanded='true']`. Consumers toggle `aria-expanded` to control the active/open state — CSS handles the visual swap. Per HDS Figma accessibility guidance, popovers should automatically display when the button receives focus and hide when the user tabs away.

Uses sprite glyphs with `currentColor` (same system as all other icon button roles). The `hds-buttons/` directory of standalone interactive SVGs has been removed.

**Glyph mapping:** `interactive-more-info` → `plus`, `interactive-less-info` → `minus`, `interactive-close` → `close`, `interactive-location` → `location`, `interactive-play` → `play`, `interactive-menu` → `menu`.

**Figma discrepancy:** The Figma default fill is NASA Blue (#1C67E3) but the Figma CSS shows NASA Blue Shade (#0B3D91). HDS Core uses NASA Blue Shade per the CSS.

### Primary Arrow Button

Text + CSS `::after` red circle with white arrow. The arrow is rendered via CSS background-image — no SVG markup needed. Arrow direction auto-swaps for external links via `.usa-link--external`. See `components/_primary-arrow-button.scss`.

### Icon Button Default Size

Default was moved from 32px (Figma XL) to 24px (Figma M) because 24px is the most frequently used size across Figma modules and matches the primary arrow button container. Uses px instead of em/rem — USWDS sets the root font-size to a non-16px value, causing em/rem to produce fractional pixel values. The 2xs size (12px) is below the WCAG 2.5.8 minimum touch target (24px) — desktop-only.

## Focus Ring

### Three Focus Systems

HDS components use three distinct focus mechanisms. The dashed outline ring system is the only one addressed by the focus token infrastructure. See ARCHITECTURE.md for implementation details (tokens, mixin, file locations).

| System | Mechanism | Components |
| --- | --- | --- |
| **Dashed outline ring** | Outline or border around component, contrasts against palette background | Link, Buttons, Icon buttons, Primary arrow, Accordion, Breadcrumb, Pagination, Checkbox/Radio outer box |
| **Solid blue element highlight** | Blue border on the form element itself | Text input, Select, Checkbox inner ring, Radio inner ring |
| **Surface-inverse ring** | Ring color is inverse of component's own fill | Table body cells, Table header cells |

### Five Figma Focus Treatments

Figma specifies five distinct treatments for the dashed outline ring system. Four are palette-aware via semantic tokens. One is exempt.

| Treatment | Light Value | Dark Value | Components | Token |
| --- | --- | --- | --- | --- |
| **Default** | C60 | C30 | Link, Primary arrow, Utility icon btn, Accordion (global), Pagination prev/next, Breadcrumb | `--hds-palette-focus` |
| **Bold** | C30 | C30 | CTA/Secondary/Outline text buttons, CTA/Secondary/Outline/Social icon btns | `--hds-palette-focus-bold` |
| **Subtle** | C60 | C40 | Pagination page numbers, Pagination simplified btn | `--hds-palette-focus-subtle` |
| **Minimal** | C30 | C80 | Checkbox/Radio outer box | `--hds-palette-focus-minimal` |
| **Fixed** | C40 | C40 | Interactive icon button | None — exempt |

### Figma Inconsistencies Resolved

Figma's focus ring spec was not consistent across components. The standardization resolved these:

| Issue | What Figma showed | What HDS Core does | Why |
| --- | --- | --- | --- |
| **Buttons use C30 on light** | C30 on both light and dark (Pattern B) | Ships as Figma specifies | Known WCAG 1.4.11 failure — tracked in Issue #40 for CD review |
| **Checkbox/Radio C80 on dark** | C80 outer box on Carbon 90 | Ships as Figma specifies | Very hard to see — flagged but matches Figma intent |
| **No midtone/blue designs** | Only white + dark designed | Extended using closest scheme values | Midtone uses light scheme; blue uses dark scheme |
| **Midtone/blue minimal swap** | Not designed | Midtone gets C80 (dark value), blue gets C30 (light value) | C30 on C20 is ~1.1:1 (invisible); C80 on Blue Shade is invisible. Swapped values use existing Figma colors without inventing new ones |

### Style and Width

All dashed outline focus rings use `dashed` style (not `dotted` — 1px dashed is visually indistinguishable from dotted at browser rendering level). Two widths per Figma:

| Width | Value | Components |
| --- | --- | --- |
| **Thin** | 1px | Link, Icon buttons, Checkbox/Radio outer, Pagination, Global baseline |
| **Thick** | 2px | Text buttons (CTA/Secondary/Outline), Primary arrow, Breadcrumb |

### Interactive Icon Button Exemption

Interactive icon buttons use a fixed focus ring (1px dashed Carbon 40, 1px offset) that does not adapt to palettes. They are designed for use over images, video, and 3D content where palette backgrounds don't apply. The fixed ring provides consistent visibility on dynamic backgrounds.

### Bug Fixes

The following bugs were fixed as part of the focus ring standardization:

| Bug | Components | Fix |
| --- | --- | --- |
| `dotted` instead of `dashed` | Link, Primary arrow, Breadcrumb | Style corrected to `dashed` |
| Unstyled button focus doesn't match Link | `.usa-button--unstyled` | Own `:focus-visible` rule: thin width, default color |
| Wrong token used for focus | Link (`--hds-palette-link-arrow`), Primary arrow (`--hds-palette-link-text`), Checkbox/Radio (`--hds-palette-border`) | Dedicated focus tokens |
| No per-role focus on icon buttons | All roles shared one rule | Split: Utility → default, CTA/Sec/Out/Social → bold |

## Table

### Surface Model

Tables use a fixed background — white for light palettes (white, light, midtone, blue), Carbon 90 for dark palettes (dark, black) — rather than inheriting the surrounding palette background. Blue palette uses the light table variant per creative director review (2026-03-27). Palette-aware table backgrounds are deferred to Phase 2.

### Caption vs Title Naming

HTML `<caption>` = HDS Figma "Title" + optional "Subtitle." It is the semantic accessible name of the table, positioned at top. HDS Figma "Caption" (small attribution text below the table) uses `.hds-caption` on a `<p>` outside `<table>`, linked via `aria-describedby`.

### Sort Icon Approach

USWDS JS injects a `<button>` with inline SVG arrows into each `th[data-sortable]`. HDS replaces the arrows visually with filled triangle icons via CSS mask-image — same technique as the accordion chevron. The USWDS SVG stays in the DOM for High Contrast Mode fallback. See `components/_table.scss`.

### Deferred to Phase 2

- Mobile text sizing, mobile stacked variants
- Midtone palette sorted column colors
- Advanced features (tabs, actions bar, filter panel, search, download, print, accordion mobile layout, fixed first column).
- Surface-inverse focus ring (Figma specifies ring color inverse of component fill for table cells — not yet implemented, currently inherits global focus ring)

## List

### Architecture

Uses standard USWDS `.usa-list` markup with `role="list"` per HDS Figma accessibility spec. Two rendering approaches: `.usa-list` component (in `components/_list.scss`) uses `::before` + flex for precise DM Mono numeral control; bare `<ol>` inside `.usa-prose` (in `base/_elements.scss`) uses `::marker` fallback (DM Mono not guaranteed — browser support limitation).

### Figma Deviations

| What | Figma | HDS Core | Why |
| --- | --- | --- | --- |
| Dark `ul` marker | NASA Blue (same as light) | NASA Blue Tint | Likely Figma oversight — NASA Blue on dark backgrounds fails 3:1. Dark `ol` numerals already use Tint in Figma. |
| OL letterspacing | 3.5px | 0px (default) | Figma value matches overline/label style. Proposal DM Mono at small sizes uses `'auto'` (0px). Visual review confirmed 3.5px too wide at double digits. |
| Blue palette marker | Not specified | NASA Blue Tint | NASA Blue is invisible on Blue Shade background. Blue Tint at ~3.0:1 is borderline but approved. |

## Form Elements

### Key Decisions

- Three checkbox-specific tokens renamed to generic control names shared by checkbox + radio (`--hds-palette-control-text`, `--hds-palette-control-fill`, `--hds-palette-control-stroke`)
- Disabled help text kept readable — Figma dims to Carbon 40 (2.85:1 on white, fails WCAG 4.5:1). WCAG exempts disabled controls but help text isn't a control.
- Checkbox/radio size forced to 18px via CSS — Figma specifies 18×18px but USWDS setting can't express 2.25 units
- Checkbox icon replaced with HDS check glyph via data URI

See `components/_form.scss` for implementation.

### Deferred to Phase 2+

- **Select Chevron:** Figma shows a single thin down chevron. Currently using USWDS default double-arrow. Requires palette-aware approach or custom dropdown.
- **Custom Dropdown Panel:** Figma shows styled dropdown with rounded corners and blue active highlight. Native browser `<select>` can't be styled. Requires JavaScript.
- **Floating Label:** Figma shows label-inside-field pattern. Requires JavaScript.

## Pagination

### Key Decisions

- **Current Page Indicator:** No background fill (unlike USWDS filled pill). 2px solid bottom bar, palette-aware heading color.
- **Previous/Next Arrows:** Utility icon circle buttons. Legacy USWDS arrow markup auto-restyled via CSS.
- **Filter Variant:** Deferred to Phase 2+ (requires dropdown menu component).

See `components/_pagination.scss` for implementation.

## Site Alert

### Naming

**HDS Figma:** "Banner". **HDS Core:** "Site Alert" — renamed to match the USWDS component it maps to (`.usa-site-alert`). The USWDS "Banner" is the government compliance bar (see `components/_banner.scss`).

### Color Variants

| Variant       | Background                | Text  | Use                                               |
| ------------- | ------------------------- | ----- | ------------------------------------------------- |
| `--emergency` | NASA Red Shade (#B60109)  | White | Lapse in appropriations, outages, critical safety |
| `--info`      | NASA Blue Shade (#0B3D91) | White | Live events, language redirects, announcements    |

See `components/_site-alert.scss` for implementation.

## Accordion

### Key Decisions

- **Chevron Icon:** Circled chevron (down/up) replaces USWDS +/− icons, using utility circle tokens. 24px, matching icon button default.
- **Bordered Variant:** Figma shows only borderless. Bordered renders with USWDS default treatment. Pending creative director review.
- **Hover State:** Not specified in Figma. Currently unimplemented — pending research on full-row hover patterns.

See `components/_accordion.scss` for implementation.

## System Behavior

### OS Dark Mode Is Opt-In

HDS Core does not automatically switch palettes based on OS dark mode. Enable with `$hds-enable-auto-dark-mode: true` in `_hds-tokens.scss`.

### TV Breakpoint (Deferred)

The Proposal defines a `tv` breakpoint at 1920px. Deferred — USWDS doesn't have a built-in `tv` breakpoint.

## Creative Director Review

Pending visual sign-offs:

| Item | Question | Context |
| --- | --- | --- |
| Focus bold on light backgrounds | C30 on white/light/midtone fails WCAG 1.4.11 (3:1 non-text contrast). Should bold focus treatment use a darker value on light backgrounds? | Tracked in Issue #40. Ships as Figma spec for now. |
| Overline font-weight | Should overline use 400 (Proposal) or 500 (Figma)? | Proposal says "normal" (400). Figma uses Medium (500). Currently shipping 500. |
| Blue palette utility | Blue palette utility now uses Proposal palette 5 values (Carbon Black fill, Carbon 60 stroke — matching dark scheme). Figma shows NASA Blue fill + Blue Tint stroke. | Currently shipping Proposal values. Flagged in case CD prefers Figma treatment. |
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
| Overline weight | 400 (normal) | 500 (medium) | Figma consistently uses 500. Pending review. |
| Overline class name | "Label" | `.hds-overline` | Avoids collision with USWDS `.usa-label`. Industry standard term. |
| Type normalization | Normalize all three fonts | Deferred | Requires measurement work; noted as tech debt |
| TV breakpoint | 1920px | Deferred | USWDS doesn't support it |
| Checkbox/radio size | 20px (USWDS default) | 18px forced via CSS | Figma specifies 18×18px. USWDS setting can't express 2.25 units. |
| Checkbox icon | USWDS default glyph | HDS check icon via data URI | Visually distinct from USWDS checkmark |
| Secondary filled on dark | NASA Blue Tint | NASA Blue | Creative director approved; passes AA on all palettes |
| Secondary filled on blue | NASA Blue Tint filled | Outline (NASA Blue Tint border) | Filled variant blends into Blue Shade background |
| Table on blue palette | Dark table (Carbon 90) | Light table (white) | Creative director approved; white surface inside blue section |
| OL numeral letterspacing | 3.5px (Figma) | 0px | Proposal DM Mono Number elements at small sizes use 'auto' (0px). Visual review confirmed too wide at double digits. |
| Interactive icon buttons | Standalone SVGs with baked-in colors | Sprite glyphs with `currentColor` + CSS states | Same visual result, simpler for consumers, supports hover/expanded states |
