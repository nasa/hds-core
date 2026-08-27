---
name: hds-core
description: Build web pages and components with the NASA Horizon Design System (HDS) Core — a CSS-only theme layer over USWDS used on nasa.gov sites. Use this skill whenever a project depends on @nasa-hds/core, loads hds.min.css, or uses hds-* or usa-* classes, and whenever the user asks to build, style, review, or fix a NASA or .gov page, component, or layout where HDS is in play — even if they never name HDS. HDS ships no JavaScript and no React components: markup is hand-written HTML. HDS also inverts several USWDS defaults (button colors, disabled states, breadcrumb structure, external link labels), so writing USWDS markup from memory produces wrong results. This skill provides the tested markup for every component plus a class inventory. Do not use it for non-NASA design systems such as Material, Bootstrap, Tailwind, or vanilla USWDS projects with no HDS dependency.
license: CC0-1.0
---

# HDS Core

HDS Core is compiled CSS and Sass — a theme layer over the [U.S. Web Design System](https://designsystem.digital.gov/). There are no JavaScript exports and no components to import. You write HTML; HDS supplies the classes.

## Before writing markup, read the component's reference page

`references/` contains one page per component, each with the **real rendered markup** for every variant. That markup is extracted from examples that run in a real browser and are checked with axe on every commit — copying it means inheriting verified accessibility rather than reconstructing it.

Read the relevant page first. It costs one file read and removes all guesswork:

```
references/components-button-guidance.md
references/components-table-guidance.md
references/foundations-color-palettes.md
references/class-inventory.md
```

The full index is at the bottom of this file.

This matters more here than in most design systems. You have USWDS in training data, and HDS deliberately changes parts of it. Markup written from USWDS memory will look plausible and be wrong in ways that are hard to spot — a button in the wrong color, a missing screen reader label, a breadcrumb that violates the depth rule.

## Markup precedence

**1. Use the markup HDS documents.** Copy it from `references/`. Don't paraphrase it, restructure it, or tidy it up — the structure and the ARIA attributes are load-bearing.

**2. If HDS documents no variant you need, use USWDS markup for that component.** `hds.min.css` contains every USWDS component, so USWDS markup renders and gets themed. Still read the HDS page first, because several components change USWDS behavior.

**3. Never infer `hds-*` markup from USWDS patterns.** These have no USWDS equivalent: `.hds-blockquote`, `.hds-btn--primary`, `.hds-btn-icon`, `.hds-stat-*`, `.hds-overline`, and the typography classes. If `references/` doesn't show it, it doesn't exist.

**4. Invent markup only when nothing above covers it** — see "Writing new markup" below.

Class names don't follow a predictable pattern across families, so don't extrapolate. `.hds-btn--primary` exists but `.hds-btn--secondary` does not — the secondary button is `.usa-button--secondary`. Meanwhile `.hds-btn-icon--secondary` does exist. Check `references/class-inventory.md` rather than guessing; it lists every public class with the HTML element it renders on.

## Where HDS differs from USWDS

Where the two disagree, HDS wins.

| Component | USWDS | HDS |
| --- | --- | --- |
| Button | primary = blue, secondary = red | **Inverted.** `.usa-button` is NASA Red, `.usa-button--secondary` is NASA Blue. Same classes. |
| Button | `--inverse` turns border and text white | Only text flips; border stays NASA Blue. |
| Button | disabled uses `opacity` | Explicit colors, so disabled stays readable on every palette. |
| Button | secondary is fixed | On the blue palette, secondary filled auto-renders as outline. Automatic. |
| Accordion | `+`/`−` icons, filled heading row | Circled chevron, palette-aware. No markup change. |
| Breadcrumb | chevrons, unlimited depth | Slashes, **max 3 elements / 2 separators**, ellipsis truncation, current page always shown. |
| Link | `.usa-link--external` adds SR text automatically | **You must add it:** `<span class="usa-sr-only"> (external)</span>` |
| List | items inherit body size | One step smaller (14px vs 16px). Intentional. |
| List (ordered) | native numerals | CSS counters. **Add `role="list"`** or Safari VoiceOver won't announce it as a list. |
| Pagination | visible Previous/Next text | Text hidden visually, circle containers. Simplified variant is HDS-only markup. |
| Prose | browser markers, body-size list text | Smaller list text, blue palette-aware markers, 68ch measure. |
| Form errors | error message before the input | Recommended markup places it after; legacy order still supported. |
| Blockquote | no such component | HDS-only (`.hds-blockquote`). |

## Palettes

Wrap a section in a palette class and everything inside adapts — text, links, borders, focus rings:

```html
<div class="hds-palette-dark">
  <h2 class="hds-h2">Mission Overview</h2>
  <a class="hds-btn--primary" href="/missions">Explore the Mission</a>
</div>
```

`hds-palette-white` (default), `hds-palette-light`, `hds-palette-midtone`, `hds-palette-dark`, `hds-palette-blue`, `hds-palette-black` (header/footer only).

If contrast looks wrong inside a palette, the wrapper is missing or nested incorrectly. Don't hardcode a color to compensate — that breaks the adaptation everywhere else the component appears.

## Class prefixes

`usa-*` maps to a USWDS component (including HDS-only variants of one). `hds-*` has no USWDS equivalent. Never mix prefixes on a single component — the two families are styled in different cascade layers and mixing them produces unpredictable precedence.

## JavaScript

HDS Core authors none. Accordion, banner, header nav, in-page navigation, and table sort need USWDS's own JS, redistributed at `dist/js/uswds.min.js`:

```html
<script src="/js/uswds.min.js" defer></script>
```

It initializes on page load, so anything rendered dynamically (React, Vue, HTMX swaps) needs reinitializing after mount.

## Overriding HDS styles

```css
@layer uswds, uswds-utils, hds-base, hds-components, hds-dataviz, site;
```

`site` is reserved for adopters and always wins, so `!important` is never necessary:

```css
@layer site {
  .my-hero {
    padding-block: 4rem;
  }
}
```

Stylesheet load order doesn't affect priority — layers do.

## Design tokens

- CSS: `var(--hds-color-nasa-red)`, `var(--hds-spacing-3)`, `var(--hds-font-weight-bold)`
- Sass: `$hds-color-nasa-red`, plus USWDS functions (`family()`, `size()`, `units()`, `color()`)

Layout spacing uses whole-number keys (`--hds-spacing-1`, `-2`, `-3`, `-4`, `-6`, `-8`, `-9`, `-15`, `-30`). Fractional keys (`-0-5`, `-1-5`, `-2-5`) are for spacing inside a component, never for layout. `dataviz.color.*` tokens are for charts only.

Never introduce a color outside the token palette — palette adaptation and contrast testing both depend on components resolving through tokens.

## Do not use

- `.usa-button--accent-cool`, `.usa-button--accent-warm`, `.usa-button--base`. These render, because all of USWDS ships in the CSS, but they aren't part of the HDS color system. HDS uses two-color wayfinding — red means the action navigates away, blue means it stays on the page — and a third button color destroys that signal.
- More than one red (`.usa-button`) per visible section.
- `<div>` or `<span>` as an interactive control. `<button>` for actions, `<a>` for navigation; a link styled as a button is still an `<a>`.

## Components with no HDS theme yet

Card, modal, footer, banner, header, identifier, and nav ship with USWDS default styling only. They work but aren't NASA-branded yet. Don't assume an HDS-themed version exists, and don't fabricate `hds-*` classes for them.

## Known issues

Tracked upstream — don't try to fix them:

- **Table on the blue palette:** link text renders white on a white table body.
- **Form error hover:** the red error border is lost on hover.
- **Table sort focus:** the focus ring is clipped on sortable column headers.

## Writing new markup

When nothing in `references/` covers the case:

1. Start from the closest documented example and extend it.
2. Keep its semantic element. `.hds-btn--primary` only ever appears on `<a>`; `.usa-accordion__button` only on `<button>`. `class-inventory.md` records the element for every public class.
3. Preserve every ARIA attribute from the source. They're there because the example is tested.
4. Use existing classes. An invented `hds-*` class silently does nothing — it won't error, it just won't style.
5. For something genuinely new, write plain semantic HTML and style it in `@layer site`. Don't add classes to the `hds-` or `usa-` namespaces.

When you copy a documented example unchanged you inherit its axe coverage and its contrast review across all six palettes. When you modify it, that guarantee is yours to maintain — so keep the focus styles, keep the labels meaningful out of context, and use `aria-disabled="true"` rather than `disabled` when a control must stay focusable.

## Reference index

| Area | Files |
| --- | --- |
| Setup | `overview-installation.md`, `overview-getting-started.md`, `guides-no-build-environments.md`, `guides-sass-configuration.md`, `guides-react-setup.md` |
| Migration | `guides-existing-uswds-site-guidance.md` |
| Foundations | `foundations-color.md`, `foundations-color-palettes.md`, `foundations-typography.md`, `foundations-spacing.md`, `foundations-grid.md`, `foundations-icons.md`, `foundations-accessibility.md`, `foundations-data-visualization.md` |
| Components | `components-<name>-guidance.md` — accordion, blockquote, breadcrumb, button, checkbox, form, icon-button, in-page-navigation, intro-text, link, list, pagination, prose, radio-button, select, side-navigation, site-alert, table, text-input |
| Class lookup | `class-inventory.md` |
