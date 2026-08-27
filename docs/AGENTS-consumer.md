# AGENTS.md — @nasa-hds/core

Instructions for AI coding agents building sites with the NASA Horizon Design System (HDS) Core.

## What this package is

HDS Core is **compiled CSS and Sass**. It is not a component library.

- There are no JavaScript exports. `import { Button } from '@nasa-hds/core'` does not exist and never will.
- Components are applied as **classes on HTML you write**.
- HDS Core is a theme layer over the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/), declared as a peer dependency (`@uswds/uswds ^3.13.0`).

Package entry points:

| Import                       | What it is                                                          |
| ---------------------------- | ------------------------------------------------------------------- |
| `@nasa-hds/core/css`         | `hds.min.css` — self-contained. All USWDS components + HDS theming. |
| `@nasa-hds/core/css/uswds`   | Optional USWDS utility classes (`.padding-2`, `.margin-top-3`)      |
| `@nasa-hds/core/css/dataviz` | Optional chart color custom properties                              |
| `@nasa-hds/core/scss`        | Sass entry point                                                    |
| `@nasa-hds/core/assets`      | Fonts, icon sprites, images                                         |

## Markup precedence — read this before writing any HTML

You have almost certainly been trained on USWDS. That knowledge is useful and **partly wrong here**. HDS Core changes USWDS's markup expectations in specific, documented ways. Follow this order:

**1. Use the markup HDS documents.** Every component page in `llms/` contains the exact rendered markup for each variant, extracted from examples that are rendered in a real browser and checked with axe on every commit. Copy it. Do not paraphrase it, restructure it, or "clean it up."

**2. If HDS documents no variant for what you need, use USWDS markup for that component.** `hds.min.css` contains every USWDS component, so USWDS markup will render and will be themed. But check the HDS page for that component first — several components change USWDS behavior (see the table below).

**3. For `hds-*` components, never infer markup from USWDS.** These have no USWDS equivalent. `.hds-blockquote`, `.hds-btn--primary`, `.hds-btn-icon`, `.hds-stat-*`, `.hds-overline`, and the typography classes are HDS-only. If a page in `llms/` does not show it, it does not exist — do not analogize from a USWDS pattern that looks similar.

**4. Invent markup only when nothing above covers it,** and then follow the constraints in "If you must write new markup."

Do not guess class names by analogy. `.hds-btn--primary` exists; `.hds-btn--secondary` **does not** — the secondary button is `.usa-button--secondary`. The `hds-btn` and `hds-btn-icon` families have deliberately different modifier sets.

## Where the markup lives

- `llms.txt` — index of every documentation page
- `llms/*.md` — one page per component, foundation, and guide, with real markup inlined
- `llms/class-inventory.md` — every public class, the HTML element(s) it renders on, and a story that demonstrates it

If you have network access, the same content is at <https://nasa.github.io/hds-core/llms.txt>. Prefer the copy in this package: it matches the version installed, and the site tracks the main branch.

## Where HDS differs from USWDS

These are the documented deltas. Where HDS and USWDS disagree, **HDS wins**.

| Component | USWDS behavior | HDS behavior |
| --- | --- | --- |
| Button | primary = blue, secondary = red | **Inverted.** `.usa-button` is NASA Red, `.usa-button--secondary` is NASA Blue. Same classes, no markup change. |
| Button | `--inverse` turns border and text white | Only the text flips; the border stays NASA Blue. |
| Button | disabled uses `opacity` | Disabled uses explicit colors, so it stays readable on all palettes. |
| Button | secondary is fixed | On the blue palette, secondary filled auto-renders as outline for contrast. Automatic — no class change. |
| Accordion | `+`/`−` icons, filled heading row | Circled chevron that adapts to palettes. No markup change. |
| Breadcrumb | chevron separators, unlimited depth | Forward slashes, **max 3 elements / 2 separators**, ellipsis truncation, current page always shown. |
| Link | `.usa-link--external` adds screen reader text automatically | **You must add it yourself:** `<span class="usa-sr-only"> (external)</span>` |
| List | list items inherit body size | List text is one step smaller (14px vs 16px). Intentional. |
| List (ordered) | native numerals | CSS counters. **Always add `role="list"`** or Safari VoiceOver won't announce it as a list. |
| Pagination | anchor tags with visible Previous/Next text | Text labels hidden visually, circle containers applied. The simplified Previous/Next variant is HDS-only markup. |
| Prose | browser markers, body-size list text | Smaller list text, palette-aware blue markers, 68ch measure, HDS heading and blockquote typography. |
| Form errors | error message before the input | Recommended markup places it after; legacy USWDS order is still supported. |
| Blockquote | no such component | HDS-only (`.hds-blockquote`). |

## Palettes

HDS components adapt to six background palettes. Wrap a section in a palette class and everything inside adapts — text, links, borders, focus rings:

```html
<div class="hds-palette-dark">
  <h2 class="hds-h2">Mission Overview</h2>
  <a class="hds-btn--primary" href="/missions">Explore the Mission</a>
</div>
```

Available: `hds-palette-white` (default), `hds-palette-light`, `hds-palette-midtone`, `hds-palette-dark`, `hds-palette-blue`, `hds-palette-black` (header/footer only).

Never hardcode colors to "fix" contrast inside a palette — the palette already handles it. If contrast looks wrong, the wrapper is probably missing or nested incorrectly.

## Class prefixes

- `usa-*` — component maps to a USWDS component, including HDS-only variants of it
- `hds-*` — no USWDS equivalent

**Never mix prefixes on a single component.**

## JavaScript

HDS Core authors no JavaScript. Interactive USWDS components — accordion, banner, header nav, in-page navigation, table sort — require USWDS's own JS. The compiled files are redistributed at `dist/js/uswds.min.js` and `dist/js/uswds-init.min.js`.

```html
<script src="/js/uswds.min.js" defer></script>
```

USWDS JS initializes on page load. If you render these components dynamically (React, Vue, HTMX swaps), you must reinitialize after mount.

## Overriding HDS styles

HDS Core declares cascade layers in this order:

```css
@layer uswds, uswds-utils, hds-base, hds-components, hds-dataviz, site;
```

`site` is reserved for you and always wins. Put your overrides there and you will never need `!important`:

```css
@layer site {
  .my-hero {
    padding-block: 4rem;
  }
}
```

Load order of stylesheets does not affect priority — layers do.

## Design tokens

Use tokens rather than literal values.

- CSS: `var(--hds-color-nasa-red)`, `var(--hds-spacing-3)`, `var(--hds-font-weight-bold)`
- Sass: `$hds-color-nasa-red` and USWDS functions (`family()`, `size()`, `units()`, `color()`)

Rules that matter:

- Never introduce a color outside the token palette.
- Layout spacing uses whole-number token keys (`--hds-spacing-1`, `-2`, `-3`, `-4`, `-6`, `-8`, `-9`, `-15`, `-30`). Fractional keys (`--hds-spacing-0-5`, `-1-5`, `-2-5`) are for spacing **inside** a component only, never for layout.
- `dataviz.color.*` tokens are for charts only. Never use them for UI.

## Do not use

- `.usa-button--accent-cool`, `.usa-button--accent-warm`, `.usa-button--base` — these render, because all of USWDS ships in the CSS, but they are **not part of the HDS color system**. HDS uses two-color wayfinding: red means the action navigates away, blue means it stays on the page. A third button color breaks that.
- More than one red (`.usa-button`) button per visible section.
- `<div>` or `<span>` for interactive controls. `<button>` for actions, `<a>` for navigation. A link styled as a button is still an `<a>`.

## Components with no HDS theme yet

Card, modal, footer, banner, header, identifier, and nav ship with **USWDS default styling only**. They work, but they are not NASA-branded yet. Do not assume an HDS-themed version exists, and do not fabricate `hds-*` classes for them.

## Known issues

Do not try to fix these — they are tracked upstream:

- **Table on the blue palette:** link text renders white on a white table body.
- **Form error hover:** the red error border is lost on hover.
- **Table sort focus:** the focus ring is clipped on sortable column headers.

## If you must write new markup

When nothing in `llms/` covers your case:

1. Start from the closest documented HDS example and extend it.
2. Keep the semantic element the documented example uses. `.hds-btn--primary` is only ever applied to `<a>`; `.usa-accordion__button` is only ever applied to `<button>`. `class-inventory.md` records the element for every public class.
3. Preserve every ARIA attribute from the source example. They are there because the example is a11y-tested.
4. Use existing classes. Do not invent `hds-*` class names — an undefined class silently does nothing.
5. For anything genuinely new, write plain semantic HTML and style it in `@layer site`. Do not add classes to the `hds-` or `usa-` namespaces.

## Accessibility baseline

Every documented example is checked with axe-core and reviewed for contrast across all six palettes. When you copy it unchanged, you inherit that. When you modify it, you own it.

- Never remove focus styles. HDS applies a visible focus ring to every interactive element.
- Use `disabled` for genuinely inactive controls; `aria-disabled="true"` when the control must stay focusable (for example, to explain why it is unavailable).
- Write labels that make sense out of context — screen reader users may encounter a control without surrounding text.
