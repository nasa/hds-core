# Unstyled USWDS components — theming triage

Every USWDS component HDS Core has not themed yet, as it actually renders under the compiled HDS CSS today. Each row is backed by a hidden Storybook story in `stories/lab/` — see `stories/lab/README.md` for what those are and how to promote one.

This exists so theming work can be prioritised against evidence rather than a guess, and so the issues written against it can say what is broken and why.

Last updated: 2026-09-14. Compiled against `@uswds/uswds` 3.14.0.

## How to read this

Severity is a judgement about shipping on a NASA site today:

| Severity | Means |
| --- | --- |
| `Unusable` | Illegible, broken layout, or an accessibility failure on one or more palettes. Cannot ship as-is. |
| `Off-brand` | Renders and functions correctly, but reads as USWDS rather than HDS — wrong type, radius, spacing, or colour role. |
| `Close` | Inherits the HDS theme cleanly; only small gaps remain. |

Findings are derived from the USWDS 3.14 source in `node_modules/@uswds/uswds/packages/`, the HDS theme in `src/scss/`, and — where a contrast claim is made — measured from the rendered story against the compiled CSS.

## Summary

| Component | Severity | Headline |
| --- | --- | --- |
| [Summary Box](#summary-box) | `Unusable` | White link text at 1.11:1 on the pinned cyan surface across dark, blue and black — measured. |
| [Card](#card) | `Unusable` | Container hardcodes a white surface, so palette-aware content inside it resolves against the wrong background. |
| [Tag](#tag) | `Off-brand` | No theme hook at all; hardcoded gray-80 box that nearly vanishes on dark and black. |
| [Collection](#collection) | `Off-brand` | Body copy renders in Inter instead of Public Sans; tags and date block ignore the palette. |
| [Button Group](#button-group) | `Off-brand` | Segmented separators are static compiled colors; the blue palette leaves a seam on outline-styled buttons. |
| [Tooltip](#tooltip) | `Off-brand` | Fixed black body on every palette; USWDS focus ring on the trigger. |
| [Memorable Date](#memorable-date) | `Close` | Themed almost entirely by composition — only field geometry is raw USWDS. |

## Components

## Summary Box

- **File:** `stories/lab/SummaryBox.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/summary-box/>
- **USWDS JS:** none
- **Severity:** Unusable
- **Variants covered:** 4 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Only two settings. `$theme-summary-box-border-radius` and `$theme-summary-box-border-width` are assigned in `_hds-uswds-theme.scss` from `$hds-border-radius` / `$hds-border-width-thin`. Nothing else about the component is themed.

**Breaks or reads as foreign:**

- **Contrast failure inside `.usa-prose`.** `.usa-summary-box__link` normally gets an accessible color computed against the pinned background by USWDS's `set-link-from-bg`. That computed color is overridden the moment the box sits inside `.usa-prose` — the exact placement USWDS's own docs recommend. `base/_content-rules.scss`'s bare `a:not(:has(> img, > svg))` rule is always active inside `.usa-prose` via the `@scope` block in `base/_elements.scss`, and compiles into the `hds-base` layer, which outranks `uswds` regardless of specificity. It repaints the link from `var(--hds-palette-link-text)` — the surrounding palette's link color, not one chosen for the fixed cyan-5 surface. On the dark, black, and blue palettes that token is spacesuit white: **white link text on a pale-cyan box.** This is the same shape as the "Table blue palette" known bug in `AGENTS.md`.
- The surface is pinned. `$theme-summary-box-background-color` / `-border-color` are left at USWDS defaults (`info-lighter` / `info-light`), which `_hds-uswds-theme.scss` maps to bare USWDS swatches (`cyan-5` / `cyan-20`), not a `--hds-palette-*` token. Same non-adapting-surface problem as Card.
- `$theme-summary-box-font-family: 'ui'` resolves through `$theme-font-role-ui: 'serif'` → Inter, so text renders in HDS's heading face but at USWDS's `typeset('ui','lg',2)` scale rather than the HDS type ramp.
- `.usa-summary-box__link` is a bare `<a>`, not `.usa-link`, so the themed dashed focus ring never applies. `base/_focus.scss`'s always-active list covers `button` / `input` / `select` / `textarea` / `[tabindex]` but not bare anchors — outside `.usa-prose` this link keeps browser/USWDS default focus indication.

**Palette behaviour:** The box itself is identical pale cyan on all six palettes; the link inside it moves with the palette. That mismatch is the defect.

**Accessibility risk today:** Real, reproducible, and measured. Rendering the "Within .usa-prose" story against the compiled CSS and reading computed styles gives:

| Palette                 | Link color         | Box background     | Contrast   |
| ----------------------- | ------------------ | ------------------ | ---------- |
| white / light / midtone | `rgb(23,23,27)`    | `rgb(231,246,248)` | 16.12:1    |
| dark / blue / black     | `rgb(255,255,255)` | `rgb(231,246,248)` | **1.11:1** |

1.11:1 is effectively invisible text — far below the 4.5:1 AA threshold. Plus a missing focus indicator on the summary-box link outside prose.

**What theming would need to do:**

- Decide the surface's palette contract first — this is the same decision Card needs, and the two should be settled together.
- Either move the background onto a palette token, or bridge the component in `base/_palettes.scss` the way `.usa-banner` is bridged, so the link color and the background move together.
- Apply `hds-focus-ring-inline` to `.usa-summary-box__link`.
- `src/scss/components/_site-alert.scss` and `_alert.scss` are the closest existing precedent for what this override should look like.

## Card

- **File:** `stories/lab/Card.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/card/>
- **USWDS JS:** none
- **Severity:** Unusable
- **Variants covered:** 8 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Typography resolves through `$theme-card-font-family` and the HDS type scale, and footer buttons pick up the full HDS button theme (`src/scss/components/_button.scss`).

**Breaks or reads as foreign:**

- `.usa-card__container` applies `set-text-and-bg("white")` (`node_modules/@uswds/uswds/packages/usa-card/src/styles/_usa-card.scss`), hardcoding a white surface with ink text regardless of the surrounding palette.
- The container keeps `u-radius($theme-card-border-radius)`, so cards are rounded while themed HDS components are square.
- An HDS-themed button sits inside an unthemed container — the most visible mismatch.

**Palette behaviour:** Does not adapt. The card stays white on all six palettes; on dark, blue, and black it reads as a bright cutout. `--hds-palette-*` values used inside the card resolve against the ancestor palette, not the white card surface.

**Accessibility risk today:** Any palette-aware link or text placed inside a card resolves its colour against the outer palette while sitting on white — the same class of contrast failure as the Table blue-palette bug in `AGENTS.md` → Known bugs.

**What theming would need to do:**

- Give `.usa-card__container` a palette-aware surface instead of a hardcoded white one, or bridge it the way `base/_palettes.scss` bridges `.usa-banner`.
- Set `$theme-card-border-radius` to `0` in both theme files, or override the radius in a new `components/_card.scss`.
- Decide the card surface's palette contract before styling anything inside it.

## Tag

- **File:** `stories/lab/Tag.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/tag/>
- **USWDS JS:** none
- **Severity:** Off-brand
- **Variants covered:** 5 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Essentially nothing, and there is no hook to inherit through — `.usa-tag` has no `_usa-tag-settings.scss` and consumes no `$theme-tag-*` setting at all.

**Breaks or reads as foreign:**

- `_usa-tag.scss` hardcodes `background-color: color("base-dark")`, resolving through `$theme-color-base-dark: 'gray-80'` to `#2e2e2e` — the neutral base family, not NASA Red or NASA Blue.
- Text is `@include u-text("white", "uppercase")`, a literal system color rather than `$theme-text-reverse-color`, so the tag bypasses HDS's reverse-text token entirely.
- `border-radius: radius('sm')` resolves to the never-overridden `$theme-border-radius-sm` default of `2px`. That coincidentally equals `$hds-border-radius-control` (the token `_hds-tokens.scss` earmarks for "tag/chip"), but it is a coincidence, not theming — there is no `$theme-tag-border-radius` hook.
- `u-font("ui", "2xs")` resolves through `$theme-font-role-ui: 'serif'` → Inter, so tag text renders in HDS's heading typeface rather than Public Sans.

**Palette behaviour:** The tag never reads `--hds-palette-*`, so the dark-gray box is identical on all six palettes. White-on-`#2e2e2e` is ~13.6:1, comfortably AA on every palette. But the tag's own box-to-page contrast drops to roughly 1.3:1–1.5:1 on the dark (`#1b1b1b`) and black (`#000000`) palettes — the tag nearly disappears as a distinct shape even though its text stays legible.

**Accessibility risk today:** Text contrast passes everywhere. The open question is WCAG 1.4.11 non-text contrast for the tag's boundary on dark and black — worth a design call rather than an assumption, since a tag is not an interactive control.

**What theming would need to do:**

- There is no theme setting to change; this needs a real `components/_tag.scss` override.
- Move the background onto a palette-aware token so the tag stays a distinct shape on dark and black.
- Switch the text color to `$theme-text-reverse-color` and the font to the HDS body role.
- **Naming collision to flag:** HDS's own `hds-tag-*` icon family (`stories/helpers/icons.js` → `hdsTagIcons`: `tag-data`, `tag-document`, `tag-topic`) is an unrelated content-category sprite. `.usa-tag` markup has no icon slot. If an icon-plus-label chip variant is designed later, someone will assume those icons were built for this component.

## Collection

- **File:** `stories/lab/Collection.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/collection/>
- **USWDS JS:** none
- **Severity:** Off-brand
- **Variants covered:** 7 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Heading links are the one fully on-brand part — `.usa-link` is themed globally in `src/scss/components/_link.scss` regardless of container, so dashed underline, hover, and `hds-focus-ring-inline` all apply. The calendar-date block's month/day colors resolve through `color("primary")` to NASA Red, on-brand by coincidence.

**Breaks or reads as foreign:**

- Wrong typeface for body and heading text. `$theme-collection-font-family: "ui"` and `$theme-collection-header-typeset: "ui", ...` go unmodified by HDS, and `_hds-uswds-theme.scss` remaps `$theme-font-role-ui: 'serif'` → `inter`. Collection text renders in Inter, not the Public Sans the rest of HDS body copy uses.
- Metadata tags hardcode `background-color: color("base-dark")` (`gray-80`) with reverse text, with no `$theme-tag-*` setting to intercept. Dark unbranded gray badges.
- `.usa-tag--new` hardcodes `u-bg("accent-warm-dark")` (`orange-50v`) — an orange accent outside HDS's NASA Red/Blue role colors.
- The calendar-date block uses `radius("sm")` directly, with no `$theme-collection-*` radius setting to catch it — against HDS's `$hds-border-radius: 0px` convention.

**Palette behaviour:** Nothing in `_usa-collection.scss` or `_usa-tag.scss` references `--hds-palette-*`. Meta text, tag backgrounds, and calendar-date colors are identical on all six palettes; only the heading link recolors.

**Accessibility risk today:** None identified beyond USWDS defaults — the tag and meta contrast ratios hold on all six palettes.

**What theming would need to do:**

- Set `$theme-collection-font-family` and the header typeset to the HDS body role so collection copy matches surrounding text.
- Theme `.usa-tag` first (see the Tag row) — collection inherits whatever that decides.
- Zero the calendar-date radius and move its colors onto palette tokens.

## Button Group

- **File:** `stories/lab/ButtonGroup.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/button-group/>
- **USWDS JS:** none
- **Severity:** Off-brand
- **Variants covered:** 5 variant stories (Default; Segmented current/non-current; Segmented all-outline; Segmented secondary/blue; Segmented disabled item) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The buttons placed inside the group are fully themed — `src/scss/components/_button.scss` overrides `.usa-button`, `.usa-button--secondary`, and `.usa-button--outline` with NASA Red/Blue, HDS focus ring, and Carbon-20 disabled styling — so the _contents_ of a button group look correct. `$theme-button-border-radius: hds.$hds-border-radius` (`0px`, `_hds-uswds-theme.scss:439`) also means the segmented rules that zero corner radii at the group's edges are simply redundant, not wrong, under HDS.

**Breaks or reads as foreign:**

- The segmented separator (`.usa-button::before`) is a color compiled once from USWDS's own `$theme-color-primary-dark: 'red-60v'` / `$theme-color-secondary-dark: 'blue-70v'` (`_hds-uswds-theme.scss:103,118`), not HDS's `$hds-color-nasa-red-shade: #b60109` (`_hds-tokens.scss:6`) used for the same button's hover state — two different "dark" shades on one button.
- `.usa-button-group--segmented .usa-button--outline::before { display: none }` keys off the literal class name, not appearance. On the blue palette, HDS repaints `.usa-button--secondary:not(.hds-btn-icon)` to look exactly like an outline button (`_button.scss`, "Blue Palette — Secondary Filled → Outline") but it never gains the `usa-button--outline` class, so the static `secondary-dark` separator still renders over what is now a transparent, outline-styled button. Visible in `SegmentedSecondary` under the blue-palette copy of `PaletteA11y`.
- Disabled segments: `[class*="usa-button"]:disabled::before { border-right-color: color($theme-body-background-color) }` resolves to `'white'` (`_hds-uswds-theme.scss:200`) and is never revisited by HDS's disabled override, so a Carbon-20 disabled button in a segmented group sits next to a hardcoded white seam on every non-white palette.

**Palette behaviour:** The buttons themselves adapt (via `--hds-palette-*`), but the wrapper (`usa-button-group`, `usa-button-group--segmented`) contains zero `--hds-palette-*` references — confirmed absent from `node_modules/@uswds/uswds/packages/usa-button-group/src/styles/_usa-button-group.scss` — and the segmented separator colors are static compiled values, so they do not adapt across the six palettes at all, unlike the buttons they sit between.

**Accessibility risk today:** None identified beyond USWDS defaults. USWDS's own accessibility-tests page reports 10/13 passed, 3 conditional, 0 failed for this component. The one HDS-specific note is cosmetic (mismatched separator color/hidden-on-palette-change), not a contrast or keyboard-operability failure — outline and filled buttons in the group keep their individually-verified HDS contrast and focus ring.

**What theming would need to do:**

- Add a `src/scss/components/_button-group.scss` (or extend `_button.scss`) that repaints the segmented separator from an HDS palette-aware custom property instead of the compiled `primary-dark`/`secondary-dark` colors.
- Decide whether the separator should also disappear for `.usa-button--secondary` when the blue palette turns it into an outline look, or give it its own selector so the suppression tracks appearance, not just the `--outline` class.
- Route the disabled separator color through `--hds-palette-*` (or hide it entirely) so it does not stay hardcoded white on dark/blue/black palettes.
- No radius work needed — `$theme-button-border-radius: 0` already matches HDS square corners.

## Tooltip

- **File:** `stories/lab/Tooltip.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/tooltip/>
- **USWDS JS:** required (`parameters.uswds: ['tooltip']`)
- **Severity:** Off-brand
- **Variants covered:** 4 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Font family and size resolve through `$theme-tooltip-font-family` / `$theme-tooltip-font-size` and the HDS type scale.

**Breaks or reads as foreign:**

- The tooltip body is pinned to `$theme-tooltip-background-color` (`ink`) with reverse text, so it is the same black box on every palette.
- It keeps `$theme-tooltip-border-radius`, so it is rounded against otherwise square HDS surfaces.
- `init()` sets `tabindex="0"` on the trigger (`node_modules/@uswds/uswds/packages/usa-tooltip/src/index.js`), so a keyboard user sees the USWDS focus ring, not the HDS dashed ring from `base/_focus.scss`.

**Palette behaviour:** Intentionally fixed by USWDS, and mostly survives it — the black body reads acceptably on white, light, midtone, dark and blue. On the black palette it has no separation from its own background.

**Accessibility risk today:** Focus ring is USWDS default rather than HDS. Black-on-black boundary loss on the black palette.

**What theming would need to do:**

- Set the tooltip surface from the palette, or invert it explicitly on the black palette.
- Zero the radius in the theme files.
- Apply `hds-focus-ring` to `.usa-tooltip__trigger`.

## Memorable Date

- **File:** `stories/lab/MemorableDate.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/memorable-date/>
- **USWDS JS:** none
- **Severity:** Close
- **Variants covered:** 4 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Almost everything, by composition rather than by any rule of its own. `.usa-input`, `.usa-select`, `.usa-label`, `.usa-legend`, and `.usa-hint` all resolve through `src/scss/components/_form.scss` — themed color, border, `$hds-border-radius-control`, HDS type sizes, the solid blue focus ring, hover. The error state is fully themed too: `.usa-input--error`, `.usa-form-group--error`, and `.usa-error-message` make an invalid month field read exactly like any other HDS error field. This is the only lab component whose typography, color, and focus treatment already read as HDS on all six palettes.

**Breaks or reads as foreign:**

- Field geometry is entirely USWDS's own, hardcoded through `units()` in `_usa-memorable-date.scss` — month/day `width: units(6)`, month select `units(card-lg)`, year `units(9)`. HDS's spacing scale is never consulted.
- The same file sets the flex row, `margin-right: units(2)` per field wrapper, and `margin-top: units(2)` on wrapped `.usa-form-group` — unthemed layout, though visually unobtrusive.

**Palette behaviour:** Adapts correctly on all six, because every visible surface belongs to a themed form control.

**Accessibility risk today:** None identified. The 3.14 per-field `usa-hint usa-sr-only` spans inherit the same themed `.usa-hint` treatment as the visible group hint, so the upstream accessibility fix and the HDS visual theme do not conflict.

**What theming would need to do:**

- Very little. Replace the `units()` field widths with HDS spacing tokens if exact widths matter; otherwise this component could be promoted to documented status almost as-is.
- Worth treating as the low-cost win in this set: it needs an MDX guidance page more than it needs CSS.
