# HDS Core Design Decisions

Visual and UX decisions for designers and developers.

Last updated: 2026-03-15

## Class Naming Convention

HDS Core follows a three-tier naming rule:

### Tier 1: USWDS Override (`usa-*`)

When an HDS component maps 1:1 to a USWDS component in both markup and purpose, HDS Core overrides the `usa-*` styles directly. Existing USWDS sites get HDS theming without changing class names.

**Examples:** `.usa-button`, `.usa-button--outline`, `.usa-link`, `.usa-link--external`, `.usa-intro`, `.usa-input`, `.usa-accordion`, `.usa-alert`, `.usa-breadcrumb`, `.usa-banner`

### Tier 2: HDS Divergent (`hds-*`, replaces USWDS twin)

When HDS requires fundamentally different markup or serves a different purpose than a same-named USWDS component, HDS Core creates an `hds-*` class to avoid breaking the USWDS version.

**Examples:** Identified case-by-case as components are built.

### Tier 3: HDS-Only (`hds-*`, no USWDS equivalent)

Components unique to HDS with no USWDS counterpart use `hds-*` classes.

**Examples:** `.hds-btn--primary` (arrow button), `.hds-btn-icon` (circle icon buttons), `.hds-label`, `.hds-eyebrow`, `.hds-metadata`, `.hds-caption`, `.hds-glyph`, `.hds-link--internal` (escape hatch modifier), `.hds-palette-*` / `data-hds-palette`

### Rule of Thumb

If a USWDS site could adopt HDS Core and the component works without changing HTML, it's Tier 1. If adopting it would break existing usage, it's Tier 2. If USWDS doesn't have it, it's Tier 3.

**Why:** USWDS sites migrating to HDS Core should get HDS theming with minimal markup changes. Developers shouldn't need to swap class names for components that serve the same purpose.

## Global Element Styles

### Gating Behind USWDS Flags

Bare HTML element styles (headings, paragraphs, links, tables, forms, etc.) are gated behind existing USWDS settings. Developers control whether global styles are applied — HDS Core respects their choice:

| USWDS Setting | Controls |
| --- | --- |
| `$theme-style-body-element` | `<body>` font, color, background |
| `$theme-global-content-styles` | `h1`–`h6`, `blockquote`, `table`, `ul`/`ol`, `code`, `hr`, `img`, `figure`, forms, bare `<button>` |
| `$theme-global-paragraph-styles` | `<p>` margins (also enabled by content) |
| `$theme-global-link-styles` | `<a>` underline/color (also enabled by content) |

All flags default to `false` (USWDS defaults). When `false`, developers use `.usa-prose` containers or explicit `usa-*` classes to activate styling.

**Always active regardless of flags:**

- Focus styles (accessibility requirement)
- Palette element wiring (only applies inside palette containers)
- `.usa-*` component overrides (Tier 1)
- `.hds-*` components (Tier 3)

**Why:** Mirrors USWDS behavior exactly. No new configuration flags to learn. Existing USWDS sites migrating to HDS Core keep their existing scoping behavior.

## Color

### Primary / Secondary Swap

**USWDS default:** `primary` = blue, `secondary` = red.

**HDS Core:** `primary` = NASA Red, `secondary` = NASA Blue.

This swap is defined in the HDS Core Proposal. It means:

- `.usa-button` automatically renders NASA Red (CTA / navigates away)
- `.usa-button--secondary` automatically renders NASA Blue (on-page action)
- `color("primary")` returns NASA Red throughout USWDS components
- `color("secondary")` returns NASA Blue throughout USWDS components

**Why:** Aligns with the HDS wayfinding rule (red = navigates away, blue = stays on page) and ensures all USWDS components render with correct HDS brand colors without per-component overrides.

### Three Color Systems

HDS Core has three ways to reference colors. They serve different purposes:

| Method | Syntax | Values | Use When |
| --- | --- | --- | --- |
| USWDS theme tokens | `color("base-darker")` | Approximate (USWDS system palette) | Inside USWDS functions/mixins |
| HDS Sass variables | `$hds-color-carbon-90` | Exact HDS hex | In custom Sass |
| CSS custom properties | `var(--hds-color-carbon-90)` | Exact HDS hex | In plain CSS or JS |

**Important:** USWDS theme tokens use approximate values because USWDS requires its own system color token strings (e.g., `"gray-90"`), not arbitrary hex values. The HDS Carbon scale doesn't have exact matches.

For example:

- `color("base-darker")` → USWDS `gray-90` → `#1b1b1b`
- `$hds-color-carbon-90` → `#17171B`

These are close but not identical. All HDS component styles use exact `$hds-color-*` values. USWDS utility classes (`.bg-base-darker`, `.text-base-darker`) use the approximate values.

**Recommendation for consumers:** Use `$hds-color-*` or `var(--hds-color-*)` for Carbon colors in custom styles. Use USWDS `color()` for state colors (`error`, `warning`, `success`, `info`) where exact hex values are less critical.

### Link Colors

HDS links use body text color — not brand color — for the text itself. The dotted underline and external arrow provide the visual affordance.

USWDS link color settings are set to `"ink"` (body text color) to prevent bare `<a>` tags from rendering in NASA Red after the primary/secondary swap:

```scss
$theme-link-color:        "ink",
$theme-link-visited-color: "ink",
$theme-link-hover-color:   "ink",
$theme-link-active-color:  "ink",
```

Full HDS link treatment (dotted underline, arrow) is applied via `.usa-link` overrides in `_hds-components.scss`, not through USWDS theme tokens.

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

**Why:** `hds-palette-dark` communicates intent; `hds-palette-4` requires lookup.

### Consolidated Palette Variables

**Original HDS:** ~30 individual color assignments per palette

**HDS Core:** 23 semantic variables

Elements sharing the same color are combined:

- Label, metadata, caption → `muted`
- Heading, primary button text → `heading`
- Text on filled buttons → `btn-filled-text`

Button-specific variables added for palette-aware behavior:

- `btn-secondary-bg-hover` — secondary button hover color
- `btn-disabled-stroke` — disabled outline button border
- `btn-disabled-text` — disabled button text

**Why:** Fewer variables = fewer inconsistencies, simpler mental model.

### Palette-Specific Overrides

The white and light palettes share a light scheme mixin. The dark and black palettes share a dark scheme mixin. The midtone and blue palettes override specific values after the shared mixin:

**Midtone** overrides from light scheme:

- `text` → Carbon Black (was Carbon 90) for higher contrast on gray background
- `muted` → Carbon 80 (was Carbon 60)
- `border` → Carbon 40 (was Carbon 20)
- `utility-stroke` → Carbon 40 (was Carbon 20)

**Blue** is fully custom (doesn't use either shared mixin).

**Dark scheme** separates underline and arrow colors:

- `link-underline` → Carbon 30
- `link-arrow` → Carbon 40

This split is intentional per the HDS Core Proposal. HDS Core has separate CSS custom properties for each (`--hds-palette-link-underline` and `--hds-palette-link-arrow`).

### Component Organization

**Original HDS:** Separate "Elements" (atomic) and "Components" (composed) categories.

**HDS Core:** Flattened into a single "Components" category.

**Why:** Mirrors USWDS structure, reduces cognitive overhead. A developer looking for "checkbox" shouldn't have to decide whether it's an element or a component. Storybook sidebar uses `Components/` for all interactive pieces and `Foundations/` for design system reference.

## Typography

### Font Family Slot Mapping

USWDS has four type slots: `sans`, `serif`, `mono`, `cond`. HDS needs three fonts in three slots:

| HDS Font    | USWDS Slot | Role Tokens                   |
| ----------- | ---------- | ----------------------------- |
| Public Sans | `sans`     | `body`                        |
| Inter       | `serif`    | `heading`, `ui`, `alt`→`mono` |
| DM Mono     | `mono`     | `code`, `alt`                 |

**`family("serif")` returns Inter (a sans-serif font).** This is a USWDS architectural constraint — there are only four slots and `serif` is the only one available for Inter after `sans` and `mono` are taken.

**Recommendation for consumers:** Always use role tokens (`family("heading")`, `family("body")`, `family("code")`), never type tokens (`family("serif")`). Role tokens communicate intent correctly regardless of the underlying slot mapping.

### Heading Line-Heights and Letterspacing

**USWDS:** One `$theme-heading-line-height` for all headings.

**HDS Core:** Per-element values, set as raw CSS values in `_hds-custom-styles.scss`:

| Element | Line-Height | Letterspacing | Weight   |
| ------- | ----------- | ------------- | -------- |
| H1      | 1 (100%)    | -1.5px        | 700 bold |
| H2      | 1.1 (110%)  | -1px          | 700 bold |
| H3      | 1.2 (120%)  | -0.5px        | 700 bold |
| H4      | 1.3 (130%)  | -0.5px        | 600 semi |
| H5      | 1.2 (120%)  | -0.5px        | 600 semi |
| H6      | 1.3 (130%)  | -0.25px       | 600 semi |

**Why:** USWDS's heading line-height token is too coarse (one value for all headings). The HDS Core Proposal specifies different values per level. Negative letterspacing gives Inter headings their signature tight, editorial look at large sizes.

### Body Line-Height

Paragraph line-height is 160% per the HDS Core Proposal. USWDS line-height token `5` (1.62) is the closest available approximation. This is set via `$theme-body-line-height`.

### Label, Metadata, and Caption Font Families

**HDS spec:** Three distinct font treatments for small uppercase text:

| Element  | Font        | Weight |
| -------- | ----------- | ------ |
| Label    | DM Mono     | Bold   |
| Metadata | Inter       | Bold   |
| Caption  | Public Sans | Normal |

**HDS Core:** The `label-uppercase` mixin provides shared properties (uppercase, small size, 0.25px letterspacing) using Inter. `.hds-label` and `.hds-eyebrow` override `font-family` to DM Mono. `.hds-caption` uses Public Sans directly without the mixin.

**Why:** Shared mixin reduces duplication for the common properties while allowing per-class font-family overrides to match the spec.

### DM Mono Bold

DM Mono (from Google Fonts) only ships Light (300), Regular (400), and Medium (500) weights. The HDS spec calls for "bold" labels. The browser synthesizes faux bold from the Medium weight. This is an acceptable tradeoff — DM Mono Medium is already visually heavier than most monospace regulars. If faux bold proves problematic, `.hds-label` can be changed to `font-weight: 500`.

### Type Normalization (Known Tech Debt)

USWDS uses `cap-height` values in `$theme-typeface-tokens` to normalize optical size across fonts. All three HDS fonts currently use the same `cap-height: 364px`, which effectively disables normalization. The HDS Core Proposal acknowledges this:

> "Currently, only one font within HDS has been normalized—Public Sans. Work will need to be done on the development side to normalize DM Mono and Inter."

When actual cap-heights are measured and updated, it will cause a visual shift across the system. This is tracked as future work.

## Links

### Underline Style

**Figma spec:** Dashed, 1px, "2, 3" dash pattern

**HDS Core:** `text-decoration-style: dotted`

**Why:** CSS `dashed` creates long dashes that look dramatically different from Figma. CSS `dotted` is visually much closer to the short-dash pattern in the spec, even though it's technically dots not dashes.

### Hover Behavior

Link text color stays constant. Only the underline changes from dotted to solid on hover.

### Bare Link Styling

Bare `<a>` tag styling is gated behind USWDS flags (`$theme-global-link-styles` or `$theme-global-content-styles`). When enabled, bare links receive HDS treatment (body-text color, dotted underline). When disabled (the default), link styling is opt-in via:

- `.usa-link` class (Tier 1)
- `.usa-prose` container
- `$theme-global-link-styles: true`

**Why:** Mirrors USWDS behavior. Prevents unintended styling of nav links, linked images, icon buttons.

### External Link Arrow

**USWDS:** CSS `::after` pseudo-element with USWDS launch icon.

**HDS Core:** CSS `::after` with `mask-image` using the HDS diagonal arrow (`arrow-line-diagonal.svg`).

Key CSS decisions:

- **`display: inline !important`** overrides USWDS `inline-block`. This allows the arrow to flow as part of the text line and align correctly regardless of line-height differences between headings and body text. Without this, the arrow misaligns at different font sizes.

- **`height: 1em` container with `mask-size: 0.75em`** creates a box that matches the text height with a proportionally smaller arrow centered inside via `mask-position: center`. Previous approach of `height: 0.75em` with `vertical-align` offsets produced inconsistent results across heading and body sizes.

- **`content: '\a0'`** (non-breaking space) prevents the arrow from orphaning onto its own line at narrow viewport widths.

- **`vertical-align: baseline`** explicitly set to override USWDS `vertical-align: middle`, which misaligns icons in 1em-height containers.

**Underline gap:** CSS `text-decoration` cannot flow through `::after` pseudo-elements (they are atomic inline boxes per the CSS spec). The small underline gap before the arrow is a known limitation shared by USWDS, GOV.UK, GitHub Primer, and other design systems.

**Screen reader note:** The HDS `::after` replacement overrides USWDS's built-in external link SR labels (`$theme-external-link-sr-label-tab-new`/`same`). Developers should add SR text manually: `<span class="usa-sr-only">(external)</span>`.

**Why:** Automatic arrow appearance with no markup changes. Arrow direction follows the HDS wayfinding rule: diagonal = leaving NASA.

## Icons & Buttons

### Wayfinding Color Rule

HDS rule: Red = navigates away. Blue = stays on page.

| Role          | Color            | Meaning                |
| ------------- | ---------------- | ---------------------- |
| `--cta`       | NASA Red         | Navigates to new page  |
| `--secondary` | NASA Blue        | On-page action         |
| `--outline`   | NASA Blue border | Lower emphasis on-page |
| `--utility`   | Neutral          | UI controls            |
| `--social`    | Gray             | Social media           |

This rule applies to both HDS icon buttons (`.hds-btn-icon--*`, Tier 3) and USWDS buttons (`.usa-button` = NASA Red primary, `.usa-button--outline` = NASA Blue, Tier 1).

**Why:** Naming roles semantically makes it hard to accidentally violate the rule.

### USWDS ↔ HDS Button Mapping

HDS and USWDS use the same terms to mean different things. This mapping is critical for developers moving between the two systems:

| USWDS Term | USWDS Meaning | HDS Equivalent |
| --- | --- | --- |
| "Primary" (`.usa-button`) | Filled rectangle, most important action | **HDS "CTA"** — NASA Red filled |
| "Secondary" (`.usa-button--secondary`) | Filled rectangle, secondary color | **HDS "Secondary Filled"** — NASA Blue |
| "Outline" (`.usa-button--outline`) | Transparent with stroke | **HDS "Outline Secondary"** — NASA Blue border |
| N/A | No equivalent | **HDS "Primary"** — text + red circle arrow (`.hds-btn--primary`) |

**USWDS variants HDS uses:**

| USWDS Class                                | HDS Role                                  | Tier |
| ------------------------------------------ | ----------------------------------------- | ---- |
| `.usa-button`                              | CTA — NASA Red filled                     | 1    |
| `.usa-button--secondary`                   | Secondary filled — NASA Blue              | 1    |
| `.usa-button--outline`                     | Outline — NASA Blue border                | 1    |
| `.usa-button--outline.usa-button--inverse` | Outline on dark (non-palette fallback)    | 1    |
| `.usa-button--unstyled`                    | Utility reset — pass-through, no override | 1    |

**USWDS variants HDS does not use:**

| USWDS Class | Reason |
| --- | --- |
| `.usa-button--accent-cool` | HDS two-color system (Red + Blue) maps to wayfinding meaning. A third color would break the rule. |
| `.usa-button--accent-warm` | Same as accent-cool |
| `.usa-button--base` | HDS uses icon circle buttons (`.hds-btn-icon--utility`) for neutral/low-emphasis actions instead |
| `.usa-button--big` | Not overridden. USWDS default works if a consumer needs it. |

### Button States

**Hover:** Explicit HDS values — NASA Red Shade (CTA), NASA Blue Shade (secondary filled), border darkens (outline). USWDS auto-darkening is overridden because USWDS has no theme setting for hover color and its Sass math doesn't reliably produce the exact HDS shade tokens.

**Active:** Visually identical to hover. HDS does not define a distinct active state. This is consistent with Apple HIG's approach for many controls.

**Focus:** 2px dashed Carbon 30 ring with 2px offset, universal across all button types. Not yet addressed in HDS Core Proposal palettes — pending creative director review.

**Disabled:** Color-based, not opacity-based. Filled buttons get Carbon 20 fill with white text. Outline buttons get palette-aware muted border and text. Disabled buttons do not respond to hover or focus.

### Outline Inverse — Two-Layer Approach

HDS outline buttons on dark backgrounds differ from USWDS: the border stays **NASA Blue** (not monotone white like USWDS `--inverse`). Only the text flips to white.

Two mechanisms provide this:

1. **Palette-aware (automatic):** `.usa-button--outline` inside an HDS palette wrapper reads custom properties that automatically adapt border and text colors. No extra class needed.

2. **Manual fallback:** `.usa-button--outline.usa-button--inverse` provides dark-background styling for developers on dark backgrounds without an HDS palette wrapper.

**Why:** USWDS sites migrating to HDS can use `--inverse` immediately. Sites using HDS palettes get automatic adaptation.

### Glyph + CSS Container Architecture

**Original HDS:** Multi-color SVGs (e.g., blue circle with white icon baked in)

**HDS Core:** Two layers:

1. **Glyph** — Single-color SVG (`currentColor`)
2. **Container** — CSS-styled circle

**Why:** Icons automatically adapt to palettes. One file works everywhere.

### Inline Glyph Alignment

`.hds-glyph` and `::after` icon pseudo-elements use `vertical-align: baseline` (not `middle`). With `height: 1em`, baseline alignment naturally places the icon correctly relative to text. CSS `vertical-align: middle` aligns to the baseline + half x-height, which paradoxically renders low for small inline icons.

**Why:** Consistent alignment across all font sizes without magic-number offsets.

### Primary Arrow Button

**Original HDS:** Uses `Primary-Arrow.svg`

**HDS Core:** CSS `::after` pseudo-element generates circle and line arrow via inline SVG data-URI.

**Why:** Arrow direction auto-swaps for external links. No SVG markup needed in HTML. Data-URI is required because the arrow must be hardcoded white (not `currentColor`) — `currentColor` doesn't work inside `background-image`, only `mask-image`, and `mask-image` would mask the red circle container rather than layering an arrow on top.

### Fixed-Color Button Graphics

Seven graphics have colors baked in and don't respond to palettes:

| File                    | Appearance                 |
| ----------------------- | -------------------------- |
| `interactive-*.svg` (6) | NASA Blue fill, white icon |
| `primary-arrow.svg`     | NASA Red fill, white arrow |

These are intentional brand elements per HDS spec.

## Build & Distribution

### CSS Minification

HDS Core ships both development and production CSS:

| File             | Purpose                            |
| ---------------- | ---------------------------------- |
| `styles.css`     | Development (readable, debuggable) |
| `styles.min.css` | Production                         |

Both include sourcemaps. Minification uses `gulp-clean-css`. Sourcemaps use Gulp 4 built-in support (not `gulp-sourcemaps`) to avoid a postcss vulnerability in the `gulp-sourcemaps` dependency chain.

**Why:** Standard for any distributable design system package. Consumers choose which to load based on their environment.

### No JavaScript (Currently)

HDS Core is a pure CSS/Sass package. No JavaScript is shipped. A JS progressive enhancement approach (for features like auto-injecting external link SVG arrows) was evaluated and deferred — the architecture is documented and ready for when JS is genuinely needed (e.g., accordion behavior, nav toggles).

**Why:** Simpler integration. No script loading, no execution order concerns, no progressive enhancement edge cases to document.

## Storybook as Documentation

HDS Core uses Storybook as its primary component documentation for designers and developers familiar with USWDS and HDS.

**WordPress site** serves CMS/Gutenberg block consumers (different audience).

**Storybook** serves designers and developers using HDS Core directly.

Story structure mirrors the sidebar:

| Category    | Content                                  |
| ----------- | ---------------------------------------- |
| Foundations | Icons inventory, Palette Spec reference  |
| Components  | Link, Icon Button, Button, Form Elements |

**Why:** Single source of truth that can't drift from the code. When styles update, the documentation updates automatically. Small team can't maintain parallel documentation surfaces.

## System Behavior

### OS Dark Mode Is Opt-In

HDS Core does not automatically switch palettes based on OS dark mode.

**Why:** Current nasa.gov doesn't implement this. Enable with `$hds-enable-auto-dark-mode: true`.

### TV Breakpoint (Deferred)

The HDS Core Proposal defines a `tv` breakpoint at 1920px with wider gutters (`grid-gap-4`). HDS Core currently stops at `widescreen` (1400px) with `$theme-grid-container-max-width: "widescreen"`. The TV breakpoint is deferred — USWDS does not have a built-in `tv` breakpoint, and adding one requires custom breakpoint registration. This will be revisited when TV-scale layouts are needed.

## Creative Director Review

Pending visual sign-offs, to be reviewed once visible in Storybook:

| Item | Question | Context |
| --- | --- | --- |
| Focus ring color | Is universal Carbon 30 correct across all palettes, or does it need per-palette tuning for contrast? | HDS Core Proposal doesn't address focus states in palettes |
| CTA hover on dark palettes | Does NASA Red Shade work on dark/blue/black backgrounds? | Figma only shows light-background hover |
| Secondary filled hover on dark | Does NASA Blue (one step darker from Blue Tint) look right? | Inferred from "darken by one shade step" pattern |
| Midtone disabled buttons | Carbon 20 stroke on Carbon 20 background is invisible — what values should midtone use? | Proposed: Carbon 40 stroke, Carbon 50 text |
| Primary arrow size variants | Figma shows 6 sizes (14–36) — confirm which are needed for initial release | Deferred until this review |

## What Hasn't Changed

All of these match the approved HDS Core Proposal exactly:

- Color hex values (all 20 brand/Carbon colors)
- Font families (Inter, Public Sans, DM Mono)
- Font size scale (3xs through 4xl)
- Spacing tokens
- Grid settings (12-column, breakpoints through widescreen)
- Wayfinding color rule (red = away, blue = on-page)
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
