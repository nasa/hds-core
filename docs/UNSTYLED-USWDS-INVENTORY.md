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
| [Character Count](#character-count) | `Unusable` | HDS `.usa-hint` in a later layer erases the over-limit state entirely — both states measure identical. |
| [Banner](#banner) | `Off-brand` | Compliance bar is pure white with no border — invisible on the white palette, a hard slab on dark/blue/black. |
| [Icon List](#icon-list) | `Off-brand` | Static icon colour ignores the palette; red on blue measures 2.18:1, under the 3:1 non-text threshold. |
| [Tag](#tag) | `Off-brand` | No theme hook at all; hardcoded gray-80 box that nearly vanishes on dark and black. |
| [Collection](#collection) | `Off-brand` | Body copy renders in Inter instead of Public Sans; tags and date block ignore the palette. |
| [Process List](#process-list) | `Off-brand` | Counter circles are literal white/ink, sitting as cutouts on dark, blue and black. |
| [Button Group](#button-group) | `Off-brand` | Segmented separators are static compiled colours; the blue palette leaves a seam on outline-styled buttons. |
| [Tooltip](#tooltip) | `Off-brand` | Fixed black body on every palette; USWDS focus ring on the trigger. |
| [Memorable Date](#memorable-date) | `Close` | Themed almost entirely by composition — only field geometry is raw USWDS. |

11 of 27 components triaged so far.

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

## Character Count

- **File:** `stories/lab/CharacterCount.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/character-count/>
- **USWDS JS:** required (`parameters.uswds: ['characterCount']`)
- **Severity:** Unusable
- **Variants covered:** 3 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The field itself is fully HDS — `.usa-input` / `.usa-textarea` in `src/scss/components/_form.scss` give it `--hds-palette-input-bg`, `$hds-border-radius-control`, `size('body', '2xs')`, 14px/16px padding, the NASA Blue solid focus border and the one-step-darker hover border. The resting counter also reads correctly on all six palettes, but only by accident: `createStatusMessages()` in `node_modules/@uswds/uswds/packages/usa-character-count/src/index.js` adds the `usa-hint` class to the generated status element, and HDS themes `.usa-hint` to `var(--hds-palette-muted)` at `size('body', '3xs')`.

**Breaks or reads as foreign:**

- The over-limit status message has no visual change at all. `.usa-character-count__status--invalid` sets `color: color("error-dark")` (`$theme-color-error-dark: 'red-60v'`, `src/scss/_hds-uswds-theme.scss:154`) and `font-weight('bold')` in `node_modules/@uswds/uswds/packages/usa-character-count/src/styles/_usa-character-count.scss`, which compiles into `@layer uswds`. The HDS `.usa-hint` rule sets both `color` and `font-weight` in `@layer hds-components` (`src/scss/components/_form.scss:187`), and `src/scss/hds.scss:48` declares `hds-components` after `uswds`, so the layer wins regardless of specificity. The counter is the same muted grey, normal weight, under limit and over.
- Same mechanism defeats the label. `.usa-label--error` in 3.14 only adds `font-weight('bold')` (`packages/usa-label/src/styles/_usa-label.scss`); HDS `.usa-label` re-declares weight as semibold via `@include hds-type('h6')` in `hds-components`. The label's error emphasis never renders.
- Net effect: the only surviving over-limit signal is the red border from `.usa-input--error` → `var(--hds-palette-error-indicator)`. That is colour alone, with no text, weight or icon change.
- `.usa-character-count__status` hardcodes `display: inline-block` and `padding-top: units(0.5)` (4px), and `createStatusMessages()` appends it to the `.usa-character-count` root, outside `.usa-form-group` — so no HDS form spacing reaches the counter and it sits tighter to the field than `.usa-error-message` does.
- The counter has no icon, while every other HDS error message in the same form draws the `error.svg` mask from `.usa-error-message::before`. Two different error languages inside one form.

**Palette behaviour:** The resting counter adapts on all six palettes via `--hds-palette-muted` (`base/_palettes.scss`: carbon-60 on white/light, carbon-80 on midtone, carbon-30 on dark/black, carbon-10 on blue). The over-limit state does not — but not because `red-60v` fails on dark surfaces; it is that `red-60v` never paints at all, so every palette shows the identical grey counter. The field beneath it is palette-correct everywhere.

**Accessibility risk today:** The USWDS accessibility-tests page requires "visible and audible feedback about character count errors" (WCAG 3.3.3) and that "readers announce when character limits are exceeded" (3.3.1). The audible half survives — the `__sr-status` live region is generated and switches to `aria-live="assertive"` with "Character limit exceeded." The visible half does not: under HDS CSS the over-limit message is indistinguishable from the resting message, leaving a red border as the sole indicator, which is a colour-only cue (WCAG 1.4.1). **Measured in a browser** against the compiled CSS (not just read off the cascade): the resting status (`usa-character-count__status usa-hint`) computes to `rgb(88, 88, 91)` at `font-weight: 400`, and the over-limit status (`usa-character-count__status usa-hint usa-character-count__status--invalid`) computes to **exactly the same** `rgb(88, 88, 91)` at `font-weight: 400`. USWDS intends `error-dark` plus bold; both are lost, so the two states are pixel-identical. Also note `docs/USWDS-3.14.0-IMPACT.md:324`: our 508 record says HDS Core v1.0 components generate no status messages, and this one does.

**What theming would need to do:**

- Add `src/scss/components/_character-count.scss` and re-assert the invalid state inside `@layer hds-components` so it outranks the HDS `.usa-hint` rule: `.usa-character-count__status--invalid { color: var(--hds-palette-error-text); font-weight: font-weight('bold'); }`.
- Give the invalid counter the same `error.svg` mask treatment as `.usa-error-message::before`, so the two error messages in a form read as one system and the over-limit state is not colour-only.
- Decide whether `.usa-label--error` should keep bold under HDS type — if yes, re-declare it in `hds-components` alongside `.usa-label`; if no, record the deviation in `docs/DESIGN.md`.
- Give the status element HDS spacing (`units(1)` gap consistent with `.usa-error-message`) rather than the hardcoded `padding-top: units(0.5)`, and check that it is not visually orphaned from the field group it describes.

## Banner

- **File:** `stories/lab/Banner.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/banner/>
- **USWDS JS:** required (`parameters.uswds: ['banner', 'accordion']`)
- **Severity:** Off-brand
- **Variants covered:** 7 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Layout, grid, and the media-block guidance columns come through unchanged from `node_modules/@uswds/uswds/packages/usa-banner/src/styles/_usa-banner.scss`, and the text/link colours resolve cleanly to HDS ink because `$theme-banner-link-color` is left at `default` and `_hds-uswds-theme.scss:203` sets `$theme-link-color: 'ink'`. The surface bridge at `src/scss/base/_palettes.scss:326` keeps that ink readable on every palette, so there is no contrast failure to report.

**Breaks or reads as foreign:**

- **The bar disappears into the page.** `$theme-banner-background-color` stays at the USWDS default `"base-lightest"` (`node_modules/@uswds/uswds/packages/uswds-core/src/styles/settings/_settings-components.scss:40`), but `src/scss/_hds-uswds-theme.scss:74` remaps `$theme-color-base-lightest: 'white'` where stock USWDS ships `gray-5`. The bridge in `src/scss/base/_palettes.scss:326` then repaints it `$hds-color-spacesuit-white` (`#ffffff`, `src/scss/_hds-tokens.scss:23`) from the higher `hds-base` layer. USWDS gives `.usa-banner` no border, so the compliance bar is a borderless white strip on a white page.
- **Wrong type family.** `$theme-banner-font-family` is the USWDS default `"ui"`; `src/scss/_hds-uswds-theme.scss:233–235` maps `$theme-font-role-ui: 'serif'` → `$theme-font-type-serif: 'inter'`. The banner and its nested `.usa-accordion` typeset in Inter while HDS body copy is Public Sans (`$theme-font-role-body: 'sans'`).
- **The HDS accordion is explicitly excluded.** `src/scss/components/_accordion.scss:39` defines `$_accordion-guard: ':not(.usa-banner *):not(.usa-nav *)'`, so the banner's toggle keeps the raw USWDS `place-icon` chevron rather than the HDS circled chevron used by every themed accordion on the same page.
- **⚠️ Focus-ring / positioning collision below `tablet` (source-derived, not rendered).** `src/scss/base/_focus.scss` applies `hds-focus-ring` to `button:not([disabled]):focus-visible`; the mixin (`src/scss/_hds-mixins.scss:96–135`) sets `position: relative` and a masked `::before` on the host. At mobile widths `.usa-banner__button` is `u-pin("left")` + `u-pin("y")` (i.e. `position: absolute`, `_usa-banner.scss`) and, when `aria-expanded="true"`, paints its own `base-lighter` close swatch in `::before`. `hds-base` outranks `uswds`, so keyboard focus there should both reposition the trigger and erase the close swatch.
- **⚠️ Upstream `init()` bug worth knowing about.** `node_modules/@uswds/uswds/packages/usa-banner/src/index.js` reads `button.getAttribute(EXPANDED_CLASS)` where `EXPANDED_CLASS = "usa-banner__header--expanded"` — a class name used as an attribute name, always `null`. `banner.init()` therefore forces every banner closed regardless of authored `aria-expanded`. The expanded stories declare `uswds: ['accordion']` alone (accordion's `init()` reads the real attribute) so there is a baseline of the open state at all.

**Palette behaviour:** It deliberately does not adapt. `src/scss/base/_palettes.scss:326` pins `:where(.usa-banner, .usa-header, .usa-footer)` to `_scheme-universal` + `_scheme-light` with `--hds-palette-bg: $hds-color-spacesuit-white`. That is a surface bridge, not theming (AGENTS.md → "USWDS surface bridges"; docs/DESIGN.md:30–36), so all six palette copies render near-identically and none of them fails. A visible difference between the six would be the defect, not the sameness.

**Accessibility risk today:** None identified beyond USWDS defaults on contrast — ink on white passes on every palette because of the bridge. Two caveats: the ⚠️ mobile focus-ring collision above, and the fact that a borderless white-on-white bar has no non-text boundary, which weakens the "recognise this as an official government banner" affordance the component exists for. `lang="es"` is added to the Spanish stories (WCAG 3.1.2); the published USWDS markup omits it.

**What theming would need to do:**

- Set `$theme-banner-background-color` in both `src/scss/_hds-uswds-theme.scss` and `src/scss/_hds-uswds-theme-utils.scss` to a token that separates the bar from a white page, or give `.usa-banner` an explicit bottom border in a new `src/scss/components/_banner.scss` — and retire the `--hds-palette-bg` half of the bridge at `src/scss/base/_palettes.scss:326` at the same time, since it currently re-forces `#ffffff` from a higher layer.
- Decide the banner's type role: either set `$theme-banner-font-family` to `'body'` so it matches HDS body copy, or accept Inter as the deliberate "system chrome" voice and record it in docs/DESIGN.md.
- Decide whether the HDS accordion chevron should reach the banner toggle, and either narrow `$_accordion-guard` in `src/scss/components/_accordion.scss:39` or style `.usa-banner__button` directly.
- Verify the mobile (`< tablet`) focus state on a real device width before shipping any banner theming, and if the collision is real, give `.usa-banner__button` an explicit `hds-focus-ring` call that does not fight `u-pin` or the expanded-state `::before`.

## Icon List

- **File:** `stories/lab/IconList.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/icon-list/>
- **USWDS JS:** none
- **Severity:** Off-brand
- **Variants covered:** 5 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The list's typography is not stranded. `base/_elements.scss`'s "always active" palette wiring (`color: var(--hds-palette-text)` on every element inside a `.hds-palette-*` container, `color: var(--hds-palette-heading)` on `h1`–`h6`) reaches `.usa-icon-list__content` and `.usa-icon-list__title` because neither sets its own `color` in `packages/usa-icon-list/src/styles/_usa-icon-list.scss`. An _uncolored_ icon also inherits `--hds-palette-text` correctly, since `.usa-icon` is only `fill: currentColor` (`packages/usa-icon/src/styles/_usa-icon.scss`). `$theme-icon-list-font-family: 'body'` / `$theme-icon-list-title-font-family: 'heading'` (unset, default) both resolve through HDS's own role mapping to Public Sans and Inter — the same faces HDS uses everywhere else.

**Breaks or reads as foreign:**

- The instant a color is applied — which is how the USWDS docs page shows the component in every example but one — `_usa-icon-list.scss`'s `@each $color, $grades in $all-project-colors` loop sets `color: color($prefix)`, a static USWDS system color (verified in theme: `$theme-color-primary: 'red-50'`, `$theme-color-success: 'green-cool-30v'`, etc., `src/scss/_hds-uswds-theme.scss`). That color is fixed on every palette; it never reads `--hds-palette-*`, unlike the surrounding text.
- Icon size is untouched by any HDS token: `$icon-size: px-to-rem($theme-body-font-size) * 1.5` (hardcoded factor) and each `.usa-icon-list--size-{token}` variant reads raw `$all-type-scale` values — the stock USWDS scale, not the `-1 step` HDS applies to `.usa-list` items in `src/scss/components/_list.scss`.
- `.usa-icon-list` never carries the `.usa-list` class, so none of HDS's `.usa-list` rules (smaller item type, NASA Blue `::marker`, DM Mono ordered numerals) reach it — confirmed by reading `src/scss/components/_list.scss` against the USWDS icon-list markup (`usa-icon-list.twig`): no overlap exists, this is not a specificity loss.
- No focus ring is themed (expected — this component has no interactive elements at all, so this is not a deviation, just noted for completeness).

**Palette behaviour:** Body/heading text adapts correctly across all six palettes. Icon color does not adapt on any palette _once a color modifier or `text-{color}` utility is applied_ — that is the default, uncolored state adapts fine, but every USWDS docs example (and the common real-world usage) applies a color. **Measured in a browser** against the compiled CSS. Taking the worst of the three demo icon colors (the red, `rgb(216, 57, 51)`) against each palette background:

| Palette  | Background         | Contrast   | WCAG 1.4.11 (3:1) |
| -------- | ------------------ | ---------- | ----------------- |
| white    | `rgb(255,255,255)` | 4.61:1     | pass              |
| light    | `rgb(246,246,246)` | 4.27:1     | pass              |
| midtone  | `rgb(209,209,209)` | 3.02:1     | marginal pass     |
| dark     | `rgb(23,23,27)`    | 3.88:1     | pass              |
| **blue** | `rgb(11,61,145)`   | **2.18:1** | **fail**          |
| black    | `rgb(0,0,0)`       | 4.55:1     | pass              |

So the static icon color is not merely off-brand: on the blue palette it drops below the 3:1 non-text contrast threshold, and midtone clears it only by 0.02.

**Accessibility risk today:** None identified beyond USWDS defaults. USWDS's own accessibility-tests page (fetched: `/components/icon-list/accessibility-tests/`) lists 7 WCAG 2.1 AA checks, 1 Passed (resize/reflow) and 6 Conditional (contrast, redundant color use, screen-reader icon exposure, plain language, consistent icon use) — all implementation-dependent, none Failed.

**What theming would need to do:**

- Decide whether icon color should read `--hds-palette-icon` (or reuse `--hds-palette-text`) instead of hardcoded system colors, so `.usa-icon-list--{color}` and `text-{color}` stay legible/on-brand across all six palettes.
- Decide whether `.usa-icon-list--size-*` should route through the same `-1 step` HDS list sizing convention, or intentionally stay on the raw USWDS type scale (it's a distinct component from `.usa-list`, so divergence may be fine — a design call, not a bug).
- Route `.usa-icon-list__icon` color through `--hds-palette-*` rather than a static system color — the blue-palette measurement above is the concrete reason, not just consistency.
- No JS or ID-wiring concerns to design around — the component is fully static markup.

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

## Process List

- **File:** `stories/lab/ProcessList.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/process-list/>
- **USWDS JS:** none
- **Severity:** Off-brand
- **Variants covered:** 5 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Links placed inside a step's body content pick up the always-on HDS `:focus-visible` ring (`src/scss/base/_focus.scss` matches bare `a:focus-visible` globally, independent of component theming) — this is the one part of the component that already reads as HDS rather than USWDS.

**Breaks or reads as foreign:**

- `$theme-process-list-counter-background-color` and `-gap-color` are the literal system color `"white"` (`node_modules/@uswds/uswds/packages/uswds-core/src/styles/settings/_settings-components.scss:148,153`), not a `--hds-palette-*` custom property, so every numbered circle is a fixed white disc with a white halo on all six palettes — the same hardcoded-white-surface pattern already flagged for Card.
- `$theme-process-list-connector-color` is left at its USWDS default, `"primary-lighter"`. Because HDS repoints the whole `primary` family to NASA Red (`$theme-color-primary-lighter: 'red-10'`, `src/scss/_hds-uswds-theme.scss:99`), the vertical connector line resolves to `#f8e1de` (`uswds-core/src/styles/tokens/color/_red.scss:4`) — the only NASA color the component carries, and it arrives by coincidence of an unrelated global remap, not by process-list theming.
- The counter's border and numeral color (`-border-color` / `-text-color`, both `"ink"` by default) render as true Carbon Black only because HDS's global `$theme-color-base-ink: 'black'` (`src/scss/_hds-uswds-theme.scss:88`) overrides USWDS's own `"gray-90"` — again an incidental effect, not component theming.
- HDS's own DM Mono, NASA-Blue ordered-list numeral treatment (`ol.usa-list > li::before` in `src/scss/components/_list.scss`) never reaches this component — every selector there is scoped to the `.usa-list` class, and `usa-process-list` markup carries no `usa-list` class (confirmed in `usa-process-list/src/usa-process-list.twig`), so no collision, but also no shared numeral styling.

**Palette behaviour:** Does not adapt. `src/scss/base/_palettes.scss` has no bridge or dark-context entry for `.usa-process-list`, so nothing in the component reads `--hds-palette-*`. On the dark, blue, and black palettes the white/black counter circles sit as bright cutouts against the surface; the pale connector line, barely visible on white/light, becomes comparatively bright and prominent on the dark and black palettes — an inversion of visual weight the component was never designed to survive.

**Accessibility risk today:** None identified beyond USWDS defaults. Counter contrast (white background, black border/text) is high on every palette; the connector line is decorative only (the numerals still carry the sequence), so its low contrast on light palettes is not a WCAG failure. USWDS's own accessibility-tests page marks "headings structured logically" and "screen reader announces location and step order" as conditional — implementation-dependent, not a defect in the markup itself.

**What theming would need to do:**

- Give the counter circle a palette-aware background/border via `--hds-palette-*` (or bridge the component, if HDS decides process-list surfaces should stay fixed like Card) instead of the literal `"white"` / `"ink"` system tokens.
- Decide whether the connector line should keep NASA Red or move to a neutral/palette-driven color — `red-10` was never a deliberate choice for this component, it is inherited from the `primary` family remap.
- Consider unifying the numeral treatment with `ol.usa-list`'s DM Mono/NASA-Blue styling, or explicitly document why process-list numerals should look different from HDS's own ordered lists.
- Add a `.usa-process-list` entry to `src/scss/base/_palettes.scss` if the component is meant to adapt like other themed components, once the above decisions are made.

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
