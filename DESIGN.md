# HDS Core Design Decisions

Visual and UX decisions for designers and developers.

Last updated: 2026-03-14

## Naming & Organization

### Palette Names

**Original HDS:** "Palette one" through "Palette six"

**HDS Core:** Descriptive names

| Original | HDS Core  | Background                      |
|----------|-----------|---------------------------------|
| Palette one   | `white`   | Spacesuit White (#FFFFFF) — default |
| Palette two   | `light`   | Carbon 05 (#F6F6F6)            |
| Palette three | `midtone` | Carbon 20 (#D1D1D1)            |
| Palette four  | `dark`    | Carbon 90 (#17171B)            |
| Palette five  | `blue`    | NASA Blue Shade (#0B3D91)      |
| Palette six   | `black`   | Carbon Black (#000000)          |

**Why:** `hds-palette-dark` communicates intent; `hds-palette-4` requires lookup.

### Consolidated Palette Variables

**Original HDS:** ~30 individual color assignments per palette

**HDS Core:** 20 semantic variables

Elements sharing the same color are combined:
- Label, metadata, caption → `muted`
- Heading, primary button text → `heading`
- Text on filled buttons → `btn-filled-text`

**Why:** Fewer variables = fewer inconsistencies, simpler mental model.

### Component Organization

**Original HDS:** Separate "Elements" (atomic) and "Components" (composed) categories.

**HDS Core:** Flattened into a single "Components" category.

**Why:** Mirrors USWDS structure, reduces cognitive overhead. A developer looking for "checkbox" shouldn't have to decide whether it's an element or a component. Storybook sidebar uses `Components/` for all interactive pieces and `Foundations/` for design system reference.

## Typography

### Label, Metadata, and Caption Font Families

**HDS spec:** Three distinct font treatments for small uppercase text:

| Element   | Font        | Weight  |
|-----------|-------------|---------|
| Label     | DM Mono     | Bold    |
| Metadata  | Inter       | Bold    |
| Caption   | Public Sans | Normal  |

**HDS Core:** The `label-uppercase` mixin provides shared properties (uppercase, small size, letterspacing) using Inter. `.hds-label` and `.hds-eyebrow` override `font-family` to DM Mono. `.hds-caption` uses Public Sans directly without the mixin.

**Why:** Shared mixin reduces duplication for the common properties while allowing per-class font-family overrides to match the spec.

## Links

### Underline Style

**Figma spec:** Dashed, 1px, "2, 3" dash pattern

**HDS Core:** `text-decoration-style: dotted`

**Why:** CSS `dashed` creates long dashes that look dramatically different from Figma. CSS `dotted` is visually much closer to the short-dash pattern in the spec, even though it's technically dots not dashes.

### Hover Behavior

Link text color stays constant. Only the underline changes from dotted to solid on hover.

### Base Links Are Unstyled

Base `<a>` tags receive no HDS styling. Link styling is opt-in via:
- `.usa-link` class
- `.usa-prose` container
- `$theme-global-link-styles: true`

**Why:** Prevents unintended styling of nav links, linked images, icon buttons.

### External Link Arrow

**USWDS:** CSS `::after` pseudo-element with USWDS launch icon.

**HDS Core:** CSS `::after` with `mask-image` using the HDS diagonal arrow (`arrow-line-diagonal.svg`).

Key CSS decisions:

- **`display: inline !important`** overrides USWDS `inline-block`. This allows the arrow to flow as part of the text line and align correctly regardless of line-height differences between headings and body text. Without this, the arrow misaligns at different font sizes.

- **`height: 1em` container with `mask-size: 0.75em`** creates a box that matches the text height with a proportionally smaller arrow centered inside via `mask-position: center`. Previous approach of `height: 0.75em` with `vertical-align` offsets produced inconsistent results across heading and body sizes.

- **`content: '\a0'`** (non-breaking space) prevents the arrow from orphaning onto its own line at narrow viewport widths.

- **`vertical-align: baseline`** explicitly set to override USWDS `vertical-align: middle`, which misaligns icons in 1em-height containers.

**Underline gap:** CSS `text-decoration` cannot flow through `::after` pseudo-elements (they are atomic inline boxes per the CSS spec). The small underline gap before the arrow is a known limitation shared by USWDS, GOV.UK, GitHub Primer, and other design systems. A JavaScript approach (auto-injecting inline SVGs) was evaluated and would solve the gap, but introduces FOUC, a JS dependency, and progressive enhancement complexity — all for a visual detail that no shipping design system has solved in pure CSS. The pure CSS approach was chosen for simplicity and zero-JS architecture.

**Why:** Automatic arrow appearance with no markup changes. Arrow direction follows the HDS wayfinding rule: diagonal = leaving NASA.

## Icons & Buttons

### Wayfinding Color Rule

HDS rule: Red = navigates away. Blue = stays on page.

| Role          | Color              | Meaning                |
|---------------|--------------------|------------------------|
| `--cta`       | NASA Red           | Navigates to new page  |
| `--secondary` | NASA Blue          | On-page action         |
| `--outline`   | NASA Blue border   | Lower emphasis on-page |
| `--utility`   | Neutral            | UI controls            |
| `--social`    | Gray               | Social media           |

**Why:** Naming roles semantically makes it hard to accidentally violate the rule.

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

**HDS Core:** CSS `::after` pseudo-element generates circle and arrow

**Why:** Arrow direction auto-swaps for external links. No SVG markup needed in HTML.

**Known issue:** The current arrow glyph is a filled triangle. The HDS spec shows a line arrow (`arrow-line-right.svg`). This is a pending fix.

### Fixed-Color Button Graphics

Seven graphics have colors baked in and don't respond to palettes:

| File                   | Appearance                        |
|------------------------|-----------------------------------|
| `interactive-*.svg` (6)| NASA Blue fill, white icon        |
| `primary-arrow.svg`   | NASA Red fill, white arrow         |

These are intentional brand elements per HDS spec.

## Build & Distribution

### CSS Minification

HDS Core ships both development and production CSS:

| File              | Purpose                         |
|-------------------|---------------------------------|
| `styles.css`      | Development (readable, debuggable) |
| `styles.min.css`  | Production                       |

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

| Category      | Content                                        |
|---------------|------------------------------------------------|
| Foundations    | Icons inventory, Palette Spec reference         |
| Components    | Link, Icon Button, Button, Form Elements        |

**Why:** Single source of truth that can't drift from the code. When styles update, the documentation updates automatically. Small team can't maintain parallel documentation surfaces.

## System Behavior

### OS Dark Mode Is Opt-In

HDS Core does not automatically switch palettes based on OS dark mode.

**Why:** Current nasa.gov doesn't implement this. Enable with `$hds-enable-auto-dark-mode: true`.

## What Hasn't Changed

All of these match the approved HDS Core Proposal exactly:
- Color hex values
- Font families (Inter, Public Sans, DM Mono)
- Font sizes
- Spacing tokens
- Grid settings
- Line heights