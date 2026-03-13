# HDS Core Design Decisions

Visual and UX decisions for designers and developers.

Last updated: 2026-03-13

---

## Naming & Organization

### Palette Names

**Original HDS:** "Palette one" through "Palette six"

**HDS Core:** Descriptive names

| Original | HDS Core | Background |
|----------|----------|------------|
| Palette one | `white` | Spacesuit White (#FFFFFF) — default |
| Palette two | `light` | Carbon 05 (#F6F6F6) |
| Palette three | `midtone` | Carbon 20 (#D1D1D1) |
| Palette four | `dark` | Carbon 90 (#17171B) |
| Palette five | `blue` | NASA Blue Shade (#0B3D91) |
| Palette six | `black` | Carbon Black (#000000) |

**Why:** `hds-palette-dark` communicates intent; `hds-palette-4` requires lookup.

### Consolidated Palette Variables

**Original HDS:** ~30 individual color assignments per palette

**HDS Core:** 20 semantic variables

Elements sharing the same color are combined:
- Label, metadata, caption → `muted`
- Heading, primary button text → `heading`
- Text on filled buttons → `btn-filled-text`

**Why:** Fewer variables = fewer inconsistencies, simpler mental model.

---

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

---

## Icons & Buttons

### Wayfinding Color Rule

**HDS rule:** Red = navigates away. Blue = stays on page.

| Role | Color | Meaning |
|------|-------|---------|
| `--cta` | NASA Red | Navigates to new page |
| `--secondary` | NASA Blue | On-page action |
| `--outline` | NASA Blue border | Lower emphasis on-page |
| `--utility` | Neutral | UI controls |
| `--social` | Gray | Social media |

**Why:** Naming roles semantically makes it hard to accidentally violate the rule.

### Glyph + CSS Container Architecture

**Original HDS:** Multi-color SVGs (e.g., blue circle with white icon baked in)

**HDS Core:** Two layers:
1. **Glyph** — Single-color SVG (`currentColor`)
2. **Container** — CSS-styled circle

**Why:** Icons automatically adapt to palettes. One file works everywhere.

### Primary Arrow Button

**Original HDS:** Uses `Primary-Arrow.svg`

**HDS Core:** CSS `::after` pseudo-element generates circle and arrow

**Why:** Arrow direction auto-swaps for external links. No SVG markup needed in HTML.

### Fixed-Color Button Graphics

Seven graphics have colors baked in and don't respond to palettes:

| File | Appearance |
|------|------------|
| `interactive-*.svg` (6) | NASA Blue fill, white icon |
| `primary-arrow.svg` | NASA Red fill, white arrow |

These are intentional brand elements per HDS spec.

---

## System Behavior

### OS Dark Mode Is Opt-In

HDS Core does **not** automatically switch palettes based on OS dark mode.

**Why:** Current nasa.gov doesn't implement this. Enable with `$hds-enable-auto-dark-mode: true`.

---

## What Hasn't Changed

All of these match the approved HDS Core Proposal exactly:
- Color hex values
- Font families (Inter, Public Sans, DM Mono)
- Font sizes
- Spacing tokens
- Grid settings
- Line heights