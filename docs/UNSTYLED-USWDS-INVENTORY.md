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
| [Input Mask](#input-mask) | `Unusable` | Mask invisible — HDS paints an opaque background over the transparent overlay USWDS relies on. |
| [Summary Box](#summary-box) | `Unusable` | White link text at 1.11:1 on the pinned cyan surface across dark, blue and black. |
| [Combo Box](#combo-box) | `Unusable` | The themed control is the one USWDS hides; the visible field matches no HDS selector. |
| [Character Count](#character-count) | `Unusable` | HDS `.usa-hint` in a later layer erases the over-limit state — both states measure identical. |
| [Input Prefix and Suffix](#input-prefix-and-suffix) | `Unusable` | HDS input border reappears nested inside the group border; focus outline stripped from error states. |
| [Card](#card) | `Unusable` | Container hardcodes a white surface, so palette-aware content resolves against the wrong background. |
| [Step Indicator](#step-indicator) | `Unusable` | Upstream USWDS: `--no-labels` hides the sr-only state text from the a11y tree. |
| [File Input](#file-input) | `Unusable` | Rejected file types announce in blue on an orange border — the bug 3.14 fixed, one code path over. |
| [Modal](#modal) | `Unusable` | No HDS theming at all; `init()` relocates the dialog out of the canvas. |
| [Search](#search) | `Off-brand` | A 2px content box where every other HDS field has 10px — crowded, though it does not clip. |
| [Date Picker](#date-picker) | `Off-brand` | Calendar wholly unthemed; hardcoded selected-date fills cannot follow a palette. |
| [Time Picker](#time-picker) | `Off-brand` | Same defect as Combo Box, measured identical — one fix covers both. |
| [Date Range Picker](#date-range-picker) | `Off-brand` | Ships no styles of its own; inherits Date Picker entirely. |
| [Banner](#banner) | `Off-brand` | Compliance bar is pure white with no border — invisible on the white palette. |
| [Header](#header) | `Off-brand` | Bridged to white; nav links and site title sit outside the HDS type and colour systems. |
| [Footer](#footer) | `Off-brand` | Bridge flattens three USWDS bands into one white panel separated by a 1px rule. |
| [Identifier](#identifier) | `Off-brand` | Pinned to the black palette; links get a 1px dashed outline, not the 2px HDS ring. |
| [Language Selector](#language-selector) | `Off-brand` | Dropdown panel hardcodes NASA Red on all six palettes; submenu links match no HDS focus rule. |
| [Icon List](#icon-list) | `Off-brand` | Static icon colour ignores the palette; red on blue measures 2.18:1, under the 3:1 threshold. |
| [Range Slider](#range-slider) | `Off-brand` | Two focus indicators fire at once — HDS dashed rectangle plus USWDS grey thumb ring. |
| [Tag](#tag) | `Off-brand` | No theme hook at all; hardcoded gray-80 box that nearly vanishes on dark and black. |
| [Collection](#collection) | `Off-brand` | Body copy renders in Inter instead of Public Sans; tags and date block ignore the palette. |
| [Process List](#process-list) | `Off-brand` | Counter circles are literal white/ink, sitting as cutouts on dark, blue and black. |
| [Button Group](#button-group) | `Off-brand` | Segmented separators are static compiled colours; blue palette leaves a seam. |
| [Tooltip](#tooltip) | `Off-brand` | Fixed black body on every palette; USWDS focus ring on the trigger. |
| [Validation](#validation) | `Off-brand` | Checkmark is a hardcoded blue background SVG no theme setting can reach. No cascade collision. |
| [Memorable Date](#memorable-date) | `Close` | Themed almost entirely by composition — only field geometry is raw USWDS. |

All 27 unthemed components triaged: 9 Unusable, 17 Off-brand, 1 Close.

## Components

## Input Mask

- **File:** `stories/lab/InputMask.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/input-mask/>
- **USWDS JS:** required (`parameters.uswds: ['inputMask']`)
- **Severity:** Unusable
- **Variants covered:** 4 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The real control, `.usa-input`, picks up HDS's palette-aware background, border, and focus-visible treatment from `src/scss/components/_form.scss` (e.g. `background-color: var(--hds-palette-input-bg)`, `border-color: var(--hds-palette-border)`), so the underlying field itself looks like an HDS input on every palette. The overlay's border width (`1px solid transparent`, `packages/usa-input-mask/src/styles/_usa-input-mask.scss`) happens to match `$hds-border-width-thin: 1px` (`src/scss/_hds-tokens.scss:24`), so that one dimension does not drift.

**Breaks or reads as foreign:**

- Cascade-layer trap (again): `.usa-input-mask--content` and `.usa-masked` both get `padding: units(1)` (8px) in `packages/usa-input-mask/src/styles/_usa-input-mask.scss`, matching the _default_ USWDS `.usa-input` padding (`packages/uswds-core/src/styles/placeholders/_forms.scss`, `%block-input-styles`). HDS repads the live input to `padding: 14px 16px` in `src/scss/components/_form.scss:117`, inside `@layer hds-components`, which outranks `@layer uswds` regardless of specificity (AGENTS.md → cascade layer order). The `.usa-masked` padding rule loses that contest, so the real input gets 14px/16px while the untouched overlay (still built assuming 8px + a `left: 2px` offset) does not move — the placeholder glyphs sit roughly 6px too high and 5px too far left of where typed characters actually land.
- The overlay's placeholder text is hardcoded `color("gray-50")` (USWDS gray), not any `--hds-palette-*` token, so it does not adapt across the six HDS palettes the way the real input's background/text tokens do.
- `.usa-input` gets `font-size: size('body', '2xs')` from an HDS override (`src/scss/components/_form.scss:114`); `.usa-input-mask--content` sets no font of its own and just inherits ambient context, so glyph size parity with the real input is coincidental, not guaranteed.

**Palette behaviour:** The real `.usa-input` box adapts across all six palettes via `--hds-palette-*` custom properties. The mask overlay does not participate in the palette system at all (no HDS rule targets it), so its gray placeholder text and misaligned position are identical on all six — not a palette-specific failure, but a constant defect layered on top of an otherwise-adapting control.

**Accessibility risk today:** No contrast failure identified from source (gray-50 placeholder text is non-essential decorative overlay, `aria-hidden="true"`, and the real input still carries the authored `aria-describedby` hint). The visual misalignment is a usability defect, not a WCAG contrast/focus violation, so `none identified beyond USWDS defaults`.

**Verified in a browser — and the defect is worse than the source reading suggested.** The misalignment is real but moot, because the overlay is not visible at all.

`_usa-input-mask.scss:32-36` sets `background-color: transparent` on **both** `.usa-masked` and `.usa-input-mask--content`. That transparency is the whole mechanism: the overlay sits behind the input, and the input is see-through so the remaining mask glyphs show. HDS's `.usa-input` rule (`components/_form.scss:111`, `@layer hds-components`) sets `background-color: var(--hds-palette-input-bg)`, which outranks the USWDS declaration in `@layer uswds` regardless of specificity. The measured input background is `rgb(255, 255, 255)` — opaque.

Typing `202` into the phone mask gives an overlay whose `textContent` is exactly `"202-___-____"` — built correctly, `visibility: visible`, `opacity: 1` — and a rendered control showing only `202`. **The mask is completely invisible under the HDS theme on every palette.**

The alignment offsets, measured, for whenever the occlusion is fixed:

| Element                    | Padding                  | Text origin  |
| -------------------------- | ------------------------ | ------------ |
| `.usa-input-mask--content` | `8px 8px` at `left: 2px` | x 26, y 89.3 |
| `.usa-input.usa-masked`    | `14px 16px`              | x 32, y 95.3 |

Typed characters land 6px right and 6px below the mask glyphs. USWDS gives both elements the same `units(1)` padding so they align by construction; HDS's repad is what separates them.

**What theming would need to do:**

- Add an `@layer hds-components` rule for `.usa-input-mask--content` that repads it to `14px 16px` (or otherwise repositions it) whenever `src/scss/components/_form.scss` changes `.usa-input` padding, so the two stay in lockstep.
- Recolor the overlay text to an HDS palette token (e.g. a muted `--hds-palette-*` text variable) instead of the hardcoded USWDS gray.
- Confirm font-size/line-height parity explicitly rather than relying on inherited ambient context.
- Re-verify alignment any time `_form.scss`'s `.usa-input` box model changes — this is exactly the class of bug the cascade-layer trap keeps producing for shared `.usa-input`/`.usa-select`/`.usa-textarea` consumers.
- Restore `background-color: transparent` on `.usa-masked`, or scope the HDS `.usa-input` background so it does not paint over an intentional overlay. This is the fix that matters; the 6px offset is cosmetic until the mask is visible at all.

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

## Combo Box

- **File:** `stories/lab/ComboBox.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/combo-box/>
- **USWDS JS:** required (`parameters.uswds: ['comboBox']`)
- **Severity:** Unusable
- **Variants covered:** 7 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Only the label and the focus ring. `.usa-label` in `src/scss/components/_form.scss` (`@include hds-type('h6')`, `color: var(--hds-palette-control-text)`) reaches the authored label and survives enhancement, and the element-keyed rules in `src/scss/base/_focus.scss` (`input:not([disabled]):focus-visible`, `button:not([disabled]):focus-visible`, `[tabindex]:focus-visible`) give the generated input, the toggle/clear buttons and the focused `<li>` the HDS dashed `--hds-palette-focus` ring. Typography is Public Sans via `$theme-form-font-family: 'body'`. Nothing else transfers.

**Breaks or reads as foreign:**

- **The themed control is the one nobody sees.** HDS keys every form rule to `.usa-input` / `.usa-textarea` / `.usa-select` (`src/scss/components/_form.scss`). `enhanceComboBox()` (`node_modules/@uswds/uswds/packages/usa-combo-box/src/index.js`) hides the authored `<select class="usa-select">` with `usa-sr-only` + `aria-hidden` and builds a `.usa-combo-box__input` in its place — a class no HDS selector matches. The visible field therefore takes `%block-input-styles` (`uswds-core/src/styles/placeholders/_forms.scss`), compiled in `dist/css/hds.min.css` as `border-color:#2e2e2e`, `border-radius:0`, `color:#000`, `height:2.5rem`, `padding:.5rem`, `font-size:1rem` — against HDS's `var(--hds-palette-border)`, `$hds-border-radius-control`, `var(--hds-palette-control-text)`, `height:auto`, `14px 16px`, `size('body','2xs')` (14px). The HDS `--hds-palette-input-bg` background and the `.usa-input::placeholder` colour never arrive either.
- **The listbox is a hardcoded white sheet.** `.usa-combo-box__list` sets `background-color: color("white")` and `u-border(1px, "base-dark")`; `.usa-combo-box__list-option` sets `border-bottom: 1px solid color("base-lighter")` (`#f0f0f0`). No palette custom property anywhere in `_usa-combo-box.scss`.
- **`--selected` uses the wrong red.** `.usa-combo-box__list-option--selected` compiles to `background-color:#d83933` from `color("primary")` (`$theme-color-primary: 'red-50'` in `src/scss/_hds-uswds-theme.scss`) — USWDS system red, not even NASA Red `#f64137`. `_hds-tokens.scss` states the wayfinding rule on `$hds-color-nasa-red`: red means "go somewhere", "never for on-page actions". HDS paints on-page selection with `--hds-palette-control-fill` (NASA Blue), as `.usa-checkbox` / `.usa-radio` do.
- **⚠️ Cascade-layer collision on the focused option.** `.usa-combo-box__list-option--focused` sets `outline: 2px dashed #162e51` (hardcoded `blue-warm-80v`, ignoring `$theme-focus-color: 'gray-60'`) in `@layer uswds`. The generated `<li>`s carry `tabindex`, so `[tabindex]:focus-visible` in `src/scss/base/_focus.scss` matches and applies `hds-focus-ring`, whose first declarations are `position: relative; outline: none` — `@layer hds-base` beats `@layer uswds` regardless of specificity. `displayList()` marks the first (or selected) option `--focused` with `skipFocus: true`, so at list-open the navy USWDS outline shows; the instant `highlightOption()` calls `.focus()` it is erased and replaced by the HDS ring. The "current option" indicator changes style mid-keyboard-interaction. Unlike character count's `.usa-hint` case the USWDS state is not permanently erased, but it is unreliable.
- **The field gets half the HDS focus treatment.** The dashed ring arrives from `base/_focus.scss` (element-keyed), but the solid 2px `var(--hds-palette-btn-secondary-bg)` border highlight in `_form.scss` is class-keyed to `.usa-input/.usa-textarea/.usa-select` and never fires. AGENTS.md records that solid-blue border as the deliberate treatment for form text inputs (Issue #20); combo box is the only text field in the system without it.
- **Disabled state ignores the disabled tokens.** `u-disabled` compiles to `color:#454545` on `background-color:#c9c9c9`, while `.usa-select:disabled` two elements away uses `--hds-palette-disabled` / `--hds-palette-disabled-bg`. The separator is `color("gray-cool-20")` (`#c6cace`) and the chevron/close glyphs sit at `opacity: .6`.

**Palette behaviour:** It does not adapt. Nothing in `_usa-combo-box.scss` reads a `--hds-palette-*` property, and `grep -rn "combo-box" src/scss/` returns nothing — no theme file, no surface bridge in `base/_palettes.scss`, no print rule. White, light and midtone are survivable because the hardcoded values assume a light surface. Dark (Carbon 90), blue (NASA Blue Shade) and black (Carbon Black) all fail: a `#fff` listbox with a `#2e2e2e` border and a `#d83933` selected row is dropped onto a dark surface, and the input's `color:#000` text sits on no declared background at all — it resolves to the browser's `field` colour, which follows the OS light/dark setting rather than the palette wrapper. Midtone additionally loses the `--selected` row's distinctness against the surrounding red-adjacent chrome.

**Accessibility risk today:** Real, on three palettes. The input's hardcoded `color:#000` with no declared background is the concrete 1.4.3 risk on dark/blue/black; the `#2e2e2e` border and `#c6cace` separator are the 1.4.11 risk on the same three. The `--focused` outline is 1.4.11-relevant too — `#162e51` on the `#d83933` selected fill is roughly 1.5:1, and on a white row it is fine, so the indicator's contrast depends on which row is current. Beyond that, USWDS's own ACR marks combo box "Partially Supports" for 3.3.2 and 502.3.6, which `docs/508.md` already mirrors. Note also that `docs/508.md` line 82 asserts "HDS Core v1.0 does not ship combo box" while line 19 says all USWDS components ship as-is — worth reconciling once this component is triaged.

**Verified in a browser.** `init()` does enhance under the decorator — `.usa-combo-box__input`, `__toggle-list`, `__list` and `__status` are all built and the authored `<select>` is `aria-hidden`. Measuring the visible field against a themed HDS text field confirms the core finding:

| Element                                      | Border               | Border radius |
| -------------------------------------------- | -------------------- | ------------- |
| `.usa-combo-box__input` (what the user sees) | `rgb(46, 46, 46)`    | `0px`         |
| `.usa-input` (themed HDS text field)         | `rgb(209, 209, 209)` | `2px`         |

The combo box's visible field is a different control from every other text field in the system — darker border, square corners — because no HDS selector matches `.usa-combo-box__input`.

**What theming would need to do:**

- Add `src/scss/components/_combo-box.scss` and retarget the existing form rules at `.usa-combo-box__input` as well — border, radius, background, text colour, padding, font size, placeholder, hover and the solid blue focus border — so the enhanced field matches `.usa-input` instead of USWDS defaults.
- Repaint `.usa-combo-box__list`, `__list-option` and `__list-option--no-results` on `--hds-palette-input-bg` / `--hds-palette-border` / `--hds-palette-control-text` so the dropdown is a palette surface rather than a white sheet.
- Move `--selected` off `color("primary")` onto `--hds-palette-control-fill` (NASA Blue) per the `$hds-color-nasa-red` wayfinding rule, and resolve the `--focused` indicator to one treatment: either suppress the USWDS outline deliberately and let the HDS ring own the state, or exclude `.usa-combo-box__list-option` from the `[tabindex]:focus-visible` baseline. Today it is whichever of the two happens to match.
- Replace `u-disabled` and the separator/chevron chrome with `--hds-palette-disabled`, `--hds-palette-disabled-bg` and `--hds-palette-utility-stroke`, and decide whether the chevron follows the select-chevron work already deferred in `_form.scss` ("deferred to custom dropdown component phase").

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

## Input Prefix and Suffix

- **File:** `stories/lab/InputPrefixSuffix.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/input-prefix-suffix/>
- **USWDS JS:** none
- **Severity:** Unusable
- **Variants covered:** 6 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The `.usa-input-group` wrapper itself is unstyled by HDS (no rule in `src/scss/` targets it), but the `<input>` it wraps carries the shared `.usa-input` class, which `src/scss/components/_form.scss` themes fully — background, border color, border radius, and focus color all come from `--hds-palette-*` tokens, so color/typography read as HDS wherever the layer collision below doesn't erase them.

**Breaks or reads as foreign:**

- `src/scss/components/_form.scss`'s `.usa-input` rule (`@layer hds-components`) sets its own `border` and flat `padding: 14px 16px`, which outranks `.usa-input-group input { border: 0; @include u-padding-right($icon-offset); }` (`packages/usa-input-prefix-suffix/src/styles/_usa-input-prefix-suffix.scss`, `@layer uswds`) regardless of specificity. Result: a double-border box (input border nested inside the group's own USWDS border), and lost padding clearance so input text can run under the prefix icon or into the suffix text.
- `.usa-input:focus { outline: none !important }` (`_form.scss`) unconditionally defeats `.usa-input-group--error, &--success { input:focus { outline-offset } }` (`_usa-input-prefix-suffix.scss`), which depends on that outline existing. The focus indicator becomes a blue border on the inner input, not a highlight on the group.
- Error state: `.usa-input-group--error` draws a red `error-dark` border on the outer group, but the USWDS markup never adds `.usa-input--error` to the inner `<input>`, so the input keeps plain (non-error) HDS border/focus styling — two disagreeing borders on one control.
- `.usa-input-prefix` / `.usa-input-suffix` stay a static USWDS grey (`color("base")`), never reading `--hds-palette-*`.

**Palette behaviour:** Untested visually in this pass (no rendered browser check was run), but by source: the icon/text prefix-suffix color is palette-invariant (static grey), so on the dark/black palettes its contrast against the HDS-themed input background is unverified. The double-border and clipped-padding defects apply identically on every palette since they come from layer order, not palette tokens.

**Accessibility risk today:** The `!important` outline removal breaks the error/success state's intended focus indicator per USWDS's own design — a real WCAG focus-visibility risk, not just a cosmetic mismatch. Icon/text decoration contrast on dark/black palettes is unverified.

**What theming would need to do:**

- Either theme `.usa-input-group` explicitly (border, radius, focus) and neutralize `.usa-input`'s own border/padding when nested inside it, or restructure `.usa-input`'s focus/border rules so they don't reach inside `.usa-input-group` at all.
- Restore an accessible focus indicator for `.usa-input-group--error`/`--success` — the `!important` outline:none must not blanket-apply inside these groups.
- Add HDS error styling to the inner input when its group carries `--error`, or move all error signaling to the group only and suppress the input's own border there.
- Route `.usa-input-prefix`/`.usa-input-suffix` color through `--hds-palette-*` so decoration contrast holds across all six palettes.

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

## Step Indicator

- **File:** `stories/lab/StepIndicator.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/step-indicator/>
- **USWDS JS:** none
- **Severity:** Unusable
- **Variants covered:** 6 variant stories (Default with labels, Counters, Counters small, No labels, Centered, Progress positions) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The segment colors do resolve through the HDS theme rather than shipping raw USWDS blue: `$theme-step-indicator-segment-color-current: 'primary'` and `$theme-step-indicator-segment-color-complete: 'primary-darker'` (`node_modules/@uswds/uswds/packages/uswds-core/src/styles/settings/_settings-components.scss`) both pick up the HDS primary-family swap to NASA Red in `src/scss/_hds-uswds-theme.scss`, so current = `red-50` and complete = `red-70v`. No `src/scss/components/_step-indicator.scss` exists and no HDS rule touches `.usa-step-indicator*` anywhere in `src/scss/` — confirmed by grep, no match at all, not even a `_palettes.scss`/`_print.scss` mention.

**Breaks or reads as foreign:**

- Because both "current" and "complete" inherit from the same NASA Red family (`red-50` vs `red-70v`), the component loses the hue separation upstream's blue-vs-red default gave it for free — the two states now differ only by shade, which is harder to tell apart at a glance and at small size (`_usa-step-indicator.scss`, segment `::after` / counter `::before` rules).
- `$theme-step-indicator-text-pending-color: 'base-dark'` and `$theme-step-indicator-heading-color: 'ink'` are fixed values (Carbon 80 / Carbon Black, per the approximation table in `_hds-uswds-theme.scss`), not `--hds-palette-*` custom properties — text does not adapt to the surrounding palette.
- No focus-ring gap to report: the markup is `<ol>`/`<li>`/`<span>` only, no links or buttons, so there is nothing for `base/_focus.scss`'s `:focus-visible` baseline to attach to.

**Palette behaviour:** Segment bars carry their own background color (`red-50`/`red-70v`/`gray-40`) so they stay visible regardless of the palette wrapper. But the pending-label text (`base-dark`/Carbon 80, a dark near-black gray) and the heading text (`ink`/Carbon Black) are hardcoded dark values with no palette wiring — on the dark and black palettes, where the surrounding background is itself near-black, that text is likely to have insufficient contrast. ⚠️ Not measured directly (no rendered/computed contrast check was run in this session); flagged from the fixed-value pattern only, the same pattern already documented for Card and Tooltip in this repo's other lab baselines.

**Accessibility risk today:** The core finding, verified directly from `_usa-step-indicator.scss`: `.usa-step-indicator--no-labels` sets `.usa-step-indicator__segment-label { display: none; }`. That label element is also where the authored markup nests each segment's `.usa-sr-only` "completed"/"not completed" text — `display: none` removes that text from the accessibility tree, not just the screen. In the `--no-labels` variant, whether a step is complete or still pending is conveyed by segment-bar color alone, for both sighted and assistive-tech users — a direct WCAG 1.4.1 (Use of Color) failure, and unusable as shipped on a NASA site. The `aria-current="true"` attribute on the `<li>` survives (it isn't inside the hidden span), so the _current_ step is still identifiable to AT; only complete-vs-pending is lost. The default (labeled) variant does not have this problem — the visible label, its nested `.usa-sr-only` status text, and the current segment's bold font-weight together give a non-color cue, matching what the USWDS ACR reports for that configuration. Separately, `docs/508.md` already carries an open citation for this component: USWDS ACR issue #5294, under WCAG 1.3.1 (Info and Relationships) and 1.3.2 (Meaningful Sequence), noted there as shipping as-is because HDS does not style step indicator.

**Verified in a browser.** Walking each segment's `.usa-sr-only` node and checking every ancestor for `display: none`:

| Story         | Segment state text                                     |
| ------------- | ------------------------------------------------------ |
| Default       | exposed / exposed / (current, none) / exposed          |
| `--no-labels` | **hidden** / **hidden** / (current, none) / **hidden** |

So in `--no-labels` the "completed" / "not completed" text is not merely visually hidden, it is out of the accessibility tree entirely. Complete-versus-pending is carried by colour alone for sighted and assistive-technology users alike.

**What theming would need to do:**

- Give complete/current/pending distinct hues again (not three shades of one family) once HDS assigns real theme settings, or add a non-color cue (icon/checkmark, pattern) to the segment bar itself so state does not depend on hue discrimination.
- Fix the `--no-labels` variant specifically: either don't ship it, or replace `display: none` on the label with a visually-hidden-but-AT-visible technique so segment status text still reaches screen readers.
- Route `$theme-step-indicator-text-pending-color` and `$theme-step-indicator-heading-color` through `--hds-palette-*` (or an equivalent override) so text keeps contrast on the dark/blue/black palettes.
- Decide whether HDS wants square vs. round counters and whatever HDS's focus-ring/typography scale should say about `usa-step-indicator__heading`, since it currently sits outside both.
- Note in the issue that this component is a step-by-step process indicator by definition: `stories/components/Breadcrumb.mdx` and `stories/components/Pagination.mdx` both explicitly point authors at step indicator instead ("Step-by-step processes — use a step indicator"), so once themed it is likely to see real adoption soon.

## File Input

- **File:** `stories/lab/FileInput.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/file-input/>
- **USWDS JS:** required (`parameters.uswds: ['fileInput']`)
- **Severity:** Unusable
- **Variants covered:** 6 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The USWDS 3.14.0 blue-to-red error fix lands, and it survives the cascade layers. `.usa-form-group--error .usa-file-input__target` takes `border-color: color("error-dark")` at 2px (`node_modules/@uswds/uswds/packages/usa-file-input/src/styles/_usa-file-input.scss`), and `$theme-color-error-dark: 'red-60v'` (`src/scss/_hds-uswds-theme.scss` line 154) resolves to `#b50909` — matching the value already recorded in `docs/508.md` §1.4.1. The one HDS rule that touches `.usa-form-group--error` (`src/scss/components/_form.scss` line 442, `@layer hds-components`) only zeroes `border-left` / `padding-left` / `margin-left`, so the `hds-components` > `uswds` layer ordering does **not** erase the fix. Label, hint, and error message pick up the full HDS form theme (`_form.scss` lines 169, 187, 451), so the text around the control is on-brand. Font size on the target is `size("body", "2xs")`, the same step HDS gives `.usa-input`.

**Breaks or reads as foreign:**

- **The blue-error bug 3.14.0 fixed is still live on the runtime state.** `preventInvalidFiles()` (`packages/usa-file-input/src/index.js`) adds `.has-invalid-file` and inserts `.usa-file-input__accepted-files-message`. The SCSS colours that message `color("secondary-dark")` → `$theme-color-secondary-dark: 'blue-70v'` (`_hds-uswds-theme.scss` line 118) and the border `color("accent-warm")` → `$theme-color-accent-warm: 'orange-40v'` (line 135). A rejected file type therefore reports itself as **blue text on an orange border** — the exact 1.4.1 failure `docs/USWDS-3.14.0-IMPACT.md` §2.1 calls the most consequential a11y change in the release, untouched on this code path.
- **The drop zone's only boundary is invisible.** `.usa-file-input__target { border: 1px dashed color("base-light"); }` → `$theme-color-base-light: 'gray-10'` (`_hds-uswds-theme.scss` line 78, `#e6e6e6`) drawn against `.usa-file-input__box { background: white; }`, which is hardcoded. That is roughly 1.3:1, against the 3:1 WCAG 1.4.11 asks of non-text UI. `:hover` only steps it to `color("base")`.
- **The white box is hardcoded**, so the control is a white cutout on the dark, blue, and black palettes — the same behaviour `stories/lab/Card.stories.js` records for `.usa-card__container`.
- **Wrong red, wrong weight, no palette response.** HDS themed inputs use `--hds-palette-error-indicator` (NASA Red `#f64137`) at `$hds-border-width-thin` (`_form.scss` line 432) and swap to NASA Red Tint on dark/black (`src/scss/base/_palettes.scss` lines 153, 283). The file input keeps USWDS `#b50909` at 2px on every palette — one hex off `$hds-color-nasa-red-shade` (`#b60109`, `_hds-tokens.scss` line 6) and never moving.
- **The call to action is not styled as one.** `.usa-file-input__choose` is `@include typeset-link` with `$theme-link-color: 'ink'` (line 203), so it is ink with a plain underline. It is a `<span>`, so the HDS gradient link treatment in `base/` never reaches it.
- **Square corners, no radius token.** USWDS sets no radius on `.usa-file-input__target`, while HDS controls use `$hds-border-radius-control` (2px).

**Palette behaviour:** It does not adapt at all. `.usa-file-input__box` is hardcoded `white` and every other colour resolves through `$theme-*` settings at build time, not through `--hds-palette-*`. All six palettes render the identical white panel with a `#e6e6e6` dashed edge, ink instructions, and a `#b50909` error border. It reads as a foreign white cutout on dark, blue, and black; on white/light the near-invisible border is the worst of it. No palette is correct, and none is worse than the others.

**Accessibility risk today:** Three, on every palette. (1) 1.4.1 Use of Color — the invalid-file-type message renders blue on an orange border, so the rejection carries no error affordance. (2) 1.4.11 Non-text Contrast — the drop zone boundary is ~1.3:1. (3) ⚠️ 2.4.7 / 502.3.12 Focus — `src/scss/base/_focus.scss` (`@layer hds-base`) applies `hds-focus-ring` to `input:not([disabled]):focus-visible`, which sets `outline: none` and paints the ring in a `::before`; after enhancement that input is `.usa-file-input__input`, absolutely positioned at `z-index: 1` beneath `.usa-file-input__box` at `z-index: 2`. The suppression of the USWDS outline is certain from source; whether any HDS ring paints was not verified in a browser. Upstream USWDS #5616 is already cited in `docs/508.md` under 2.4.7 and 502.3.12.

**Verified in a browser** (this is the first time any of it has been observable in Storybook): with `parameters.uswds: ['fileInput']` the decorator builds `.usa-file-input__target` and `.usa-file-input__instructions`, and the error state's target border computes to `rgb(181, 9, 9)` — `#b50909`, `red-60v`. The 3.14 blue-to-red fix is real and now visible.

One mismatch the source reading does not surface: in the same error story the adjacent `.usa-error-message` computes to `rgb(182, 1, 9)` — `#b60109`, HDS's `$hds-color-nasa-red-shade`. So the USWDS file-input border red and the HDS error-message red sit side by side one unit apart per channel. Not a contrast problem; a "two nearly-identical reds in one control" problem that whoever themes this should collapse to a single token.

**What theming would need to do:**

- Repaint `.usa-file-input__target.has-invalid-file` and `.has-invalid-file .usa-file-input__accepted-files-message` onto `--hds-palette-error-indicator` / `--hds-palette-error-text`, and align `.usa-form-group--error .usa-file-input__target` to the same token at `$hds-border-width-thin`, so all three error paths match the themed `.usa-input--error`.
- Replace the hardcoded `.usa-file-input__box { background: white }` with `--hds-palette-input-bg`, and the `base-light` dashed edge with `--hds-palette-border` / `--hds-palette-control-border` on hover, so the control is palette-aware and clears 3:1.
- Give focus a treatment that survives the overlay — move the ring onto `.usa-file-input__target` (which is a `<div>` and can carry a pseudo-element) driven by `.usa-file-input__input:focus-visible`, rather than leaving it on the occluded input.
- Style `.usa-file-input__choose` with the HDS link treatment and apply `$hds-border-radius-control` to `.usa-file-input__target`.

## Modal

- **File:** `stories/lab/Modal.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/modal/>
- **USWDS JS:** required (`parameters.uswds: ['modal']`)
- **Severity:** Unusable
- **Variants covered:** 3 variant stories (Default, Large, Forced action) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The buttons inside the modal (trigger, footer confirm/cancel, close icon button) are `.usa-button`, which `src/scss/components/_button.scss` themes fully in `@layer hds-components` — NASA Red fills, HDS hover/active states, and the HDS dashed focus ring (`base/_focus.scss` line 25, `button:not([disabled]):focus-visible`). That is the only part of this component HDS actually touches.

**Breaks or reads as foreign:**

- `.usa-modal` hardcodes `background: white` and `set-text-from-bg('white')` (`packages/usa-modal/src/styles/_usa-modal.scss`) — a fixed white panel regardless of `--hds-palette-*`.
- `$theme-modal-border-radius: 'lg'`, `$theme-modal-default-max-width: 'mobile-lg'`, `$theme-modal-lg-max-width: 'tablet-lg'`, `$theme-modal-lg-content-max-width: 'tablet'` are all untouched upstream defaults (`packages/uswds-core/src/styles/settings/_settings-components.scss`) — `_hds-uswds-theme.scss` sets none of them, so the panel keeps rounded corners against square HDS surfaces.
- `.usa-modal__heading`/`.usa-modal__main` use USWDS's `u-font('heading','lg')`/`typeset` — USWDS type scale, not HDS typography.
- **Cascade-layer trap (6th confirmed instance):** `base/_focus.scss`'s bare `button:not([disabled]):focus-visible` selector (`@layer hds-base`) outranks `.usa-modal__close:focus { outline-offset: 0; }` (`@layer uswds`, `_usa-modal.scss`) regardless of specificity — HDS's dashed ring replaces USWDS's modal-tuned focus treatment on the close button and both footer buttons.

**Palette behaviour:** Not testable as an "open modal" at all. `init()` (`packages/usa-modal/src/index.js`, `setUpModal`/`rebuildModal`) relocates each `.usa-modal` into a new `.usa-modal-wrapper` appended to `document.body`, outside the Storybook canvas — confirmed by reading `init()`/`teardown()` in full and by `.storybook/utils/uswds-components.js`'s `cleanUpStaleModals()`, written specifically to sweep these orphaned wrappers. So even where a wrapping `.hds-palette-*` div would apply, the real panel never renders inside it once open — it sits outside every palette ancestor in the live DOM. Since the panel also hardcodes white, this would be moot even if reachable.

**Accessibility risk today:** Unlike Combo Box and Character Count, `usa-modal`'s `init()` has no `data-enhanced`-style idempotency or opt-out guard — confirmed by reading `setUpModal`/`rebuildModal`/`cleanUpModal` in full. The only guard is a hard `id` requirement (it throws without one). There is no way to reach the true open state (fixed overlay, centered panel, `aria-modal="true"`, focus trap) from authored markup alone — it exists only after a real `toggleModal()` click. No accessibility claim beyond USWDS defaults could be verified for the open state in this file; USWDS 3.14's modal a11y fixes (`docs/USWDS-3.14.0-IMPACT.md`: open-focus lands on the first enabled footer button, `aria-hidden` is restored on close even if the opener is gone, `[data-focus]` selector broadened) are load-bearing but likewise unverifiable statically.

**What theming would need to do:**

- Add `src/scss/components/_modal.scss`: set `.usa-modal__container`/panel to an HDS surface (square corners to match `$hds-*` radius scale, HDS surface color instead of hardcoded white) and route heading/body copy through HDS typography.
- Decide whether the panel should read `--hds-palette-*` at all given it always renders outside any palette ancestor in the DOM — likely needs its own fixed light/dark surface treatment rather than palette inheritance, similar to the USWDS dark-context question in `AGENTS.md`.
- A themed Modal story will need a **play function** to open the modal and capture the true dialog state (overlay, focus trap, `aria-modal`) — this lab story cannot, and per this task's own constraints should not, fake that DOM.
- Confirm the close-button/footer-button focus ring is the intended HDS treatment for a floating dialog (no palette ancestor) rather than an oversight of the layer order.

## Search

- **File:** `stories/lab/Search.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/search/>
- **USWDS JS:** required (`parameters.uswds: ['search']`) — but a no-op against this markup; see file header for why.
- **Severity:** Off-brand
- **Variants covered:** 3 variant stories (Default, Big, Small) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The submit `<button class="usa-button">` is fully themed — square corners via `$theme-button-border-radius: hds.$hds-border-radius` (`src/scss/_hds-uswds-theme.scss:439`) and the standard HDS button focus ring (`button-interactive-states`, `src/scss/_hds-mixins.scss`). `.usa-input` also picks up HDS's palette-aware border color and background (`src/scss/components/_form.scss`).

**Breaks or reads as foreign:**

- Padding/height collision: HDS's `.usa-input` sets `padding: 14px 16px` (`src/scss/components/_form.scss`) with no explicit height, while `.usa-search`'s unthemed `[type="search"]` (`node_modules/@uswds/uswds/packages/usa-search/src/styles/_usa-search.scss`) pins `height: units(4)` = 32px, `box-sizing: border-box`. 28px of vertical padding plus a 1–2px border leaves ~2px of content box — input text clips in the Default and Small variants. `usa-search--big` raises the fixed height to `units(6)` = 48px at `mobile-lg`+, which has room; the smaller ones do not.
- Cascade-layer trap (sixth confirmed instance on this branch, after Character Count, Combo Box, Summary Box, Card, and Step Indicator): unthemed `[type="search"]` zeroes `border-right` and the two right corners so the input reads as one shape with the button. HDS's `.usa-input` rule sets an unconditional `border: ... ; border-radius: 2px;` shorthand in `@layer hds-components`, which outranks `@layer uswds` regardless of specificity — so the right border and right-side radius come back, breaking the seam against the button's square left edge.
- `:focus` compounds the seam: `.usa-input:focus` thickens the border to 2px solid blue on all sides (the non-dashed input focus system, AGENTS.md → Focus rings), so the leaked right border grows again against the button.
- `.usa-search` itself never sets `$theme-search-font-family`, so it resolves to USWDS's own default (`"ui"`, `uswds-core/.../settings-components.scss:170`), not the HDS/Public Sans type used elsewhere.

**Palette behaviour:** `.usa-input` and `.usa-button` are both palette-aware (`var(--hds-palette-*)`), so text/border/fill colors adapt across all six palettes. The height-clipping and seam defects above are geometry problems, not color problems, so they reproduce identically on every palette.

**Accessibility risk today:** The clipped input text (see above) is a real usability failure, not just a color one — at the default/small heights, typed or placeholder text does not fully fit the 32px control. USWDS's own accessibility-tests page for Search (14 pass / 1 pass-with-exceptions / 7 conditional / 0 fail) assumes USWDS's own box model; that result does not hold once HDS's larger input padding is layered in without a matching height.

**Correction after browser verification — the box-model measurement is right, the consequence is not.**

Measured against a plain themed HDS text input:

| Element                             | Height | Vertical padding | Content box |
| ----------------------------------- | ------ | ---------------- | ----------- |
| `.usa-search [type="search"]`       | 32px   | 14px             | **2px**     |
| `.usa-input` (plain HDS text field) | 40px   | 14px             | 10px        |

The 2px content box is confirmed exactly as described, and it is a genuine anomaly — this is the only text field in the system at 32px where the rest are 40px. But it does **not** clip text. Screenshotting the field with `05/12/2026` typed in shows the value rendering legibly: an `<input>` centres its value vertically instead of clipping on content-box overflow. The visible result is a shorter, more crowded control, not an unreadable one.

**Severity lowered from `Unusable` to `Off-brand` on that basis.** The seam defects (HDS's border shorthand restoring the right border and radius that USWDS zeroes, and `:focus` thickening it to 2px solid blue) stand as described and are cosmetic. The claim that USWDS's own accessibility-test result "does not hold" under HDS is withdrawn — nothing measured here breaks it.

**What theming would need to do:**

- Give `.usa-search [type="search"]`/`.usa-search__input` an explicit height (or unset the fixed `height` and switch to `min-height`) that accounts for HDS's 14px vertical padding, at every `usa-search` size variant.
- Add a component-scoped override for `.usa-search [type="search"]`/`.usa-search__input` that re-zeroes `border-right` and the two right corners so `.usa-input`'s shorthand border/radius doesn't leak through the cascade-layer priority.
- Re-check the focus state once the seam is fixed, since the 2px focus border currently makes the leak worse.
- Decide whether `.usa-search` should consume the HDS input/body type scale via `$theme-search-font-family` instead of the USWDS default.

## Date Picker

- **File:** `stories/lab/DatePicker.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/date-picker/>
- **USWDS JS:** required (`parameters.uswds: ['datePicker']`)
- **Severity:** Off-brand
- **Variants covered:** 4 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The dashed HDS `:focus-visible` ring in `src/scss/base/_focus.scss:22-28` targets bare `input:not([disabled])`, so the external input `enhanceDatePicker()` builds (`usa-date-picker/src/index.js:929-930`, keeps `.usa-date-picker__external-input` + `.usa-input`) gets the HDS ring, not USWDS's own. Selected-date colors (`primary-vivid`, `blue-10v` in `_usa-date-picker.scss:295-341`) also pick up the HDS theme's NASA-Blue remap of those tokens.

**Breaks or reads as foreign:**

- `.usa-input` (`src/scss/components/_form.scss:108-118`) sits in `@layer hds-components`, which outranks `@layer uswds` by layer order alone regardless of specificity (`AGENTS.md` → Cascade layer order). Its `padding: 14px 16px` (`_form.scss:117`) overrides USWDS's `padding: units(1)` (8px, `uswds-core/.../tokens/units/spacing.scss`) but does not touch `height`. USWDS's `%block-input-styles` (`uswds-core/.../placeholders/_forms.scss:18-29`) still sets a fixed `height: units(5)` = 40px. At `$theme-input-line-height: 2` (`_hds-uswds-theme.scss:349`), 40px minus 28px of vertical padding leaves ~12px for a line box sized for ~32px of text — clipped/overflowing input text, the same fixed-height-vs-enlarged-padding mismatch already confirmed for Search.
- `background-color: var(--hds-palette-input-bg)` (`_form.scss:111`) also reaches the external input via the same layer mechanism, replacing USWDS's white/`base-dark`-bordered box with an opaque, palette-driven fill.
- No selector anywhere in `src/scss/` matches `.usa-date-picker*` (`grep -rn "usa-date-picker" src/scss/` returns nothing) — not even a print or palette-bridge entry — so the calendar-toggle button and calendar itself are unaffected but also fully unthemed: USWDS's own `add-background-svg` icon and `base-lightest`/`primary-vivid` fills ship as-is.

**Palette behaviour:** Not fully testable. `.usa-input`'s `background-color: var(--hds-palette-input-bg)` and `border-color: var(--hds-palette-border)` do adapt the external input across all six `.hds-palette-*` wrappers, since those are custom properties resolved per ancestor (`base/_palettes.scss`). But the calendar itself never renders in this story set (see coverage limit below), so the selected-date `primary-vivid`/`blue-10v` fills — which are hardcoded USWDS colors, not palette variables — are untested against the black and blue palettes where contrast is most likely to fail.

**Accessibility risk today:** The clipped input-text risk above is the most consequential — an accessibility failure (illegible/truncated field value), not just an off-brand look, which is why this is `Unusable` rather than `Off-brand`. Beyond that: none identified in the closed-picker state beyond USWDS defaults; the open calendar's `--focused`/`--selected` contrast against the six palettes is an unverified coverage gap (see below), not a confirmed pass.

**Correction after browser verification — the headline claim above does not hold.**

The external input was measured against a plain themed HDS text input, rendering the compiled CSS:

| Element                             | Height | Vertical padding | Content box | Line-height |
| ----------------------------------- | ------ | ---------------- | ----------- | ----------- |
| `.usa-date-picker__external-input`  | 40px   | 14px             | 10px        | 16.9px      |
| `.usa-input` (plain HDS text field) | 40px   | 14px             | 10px        | 16.9px      |

They are identical. USWDS's fixed `height: units(5)` is 40px, which is also what HDS text fields are, so the padding override changes nothing here. If this box model clipped text, every HDS text input would clip. It does not: screenshotting the field with `05/12/2026` typed in shows the value rendering normally, because an `<input>` centres its value vertically rather than clipping on content-box overflow the way a block element does.

`$theme-input-line-height: 2` does not produce a "~32px line box" inside the input either — the measured used line-height is 16.9px.

**Severity lowered from `Unusable` to `Off-brand` on that basis.** What remains is real but cosmetic: the calendar is entirely unthemed, and its hardcoded `primary-vivid` / `blue-10v` selected-date fills are untested against the black and blue palettes because the open calendar is unreachable without a play function.

**What theming would need to do:**

- Give `.usa-date-picker__external-input` (or `.usa-date-picker .usa-input`) its own padding/height pairing instead of inheriting the generic `.usa-input` rule verbatim, so the fixed-height clipping is fixed the same way Search's was.
- Decide whether the external input should keep the opaque `--hds-palette-input-bg` fill or read as an inline calendar trigger.
- Theme `.usa-date-picker__button`, `.usa-date-picker__calendar`, and the selected/range date states (`_usa-date-picker.scss:169-341`) against the HDS palette variables rather than USWDS's hardcoded `base-lightest`/`primary-vivid`/`blue-10v`.
- Add a play-function-driven open-calendar story once theming lands, to actually exercise and snapshot the calendar grid, month/year pickers, and range-selection classes this lab file cannot reach.

**Coverage limit:** `enhanceDatePicker()` guards re-initialization on `datePickerEl.dataset.enhanced` (`usa-date-picker/src/index.js:898`, set at `:967`) the same way combo box and character count do, so the re-init decorator is safe to run per Storybook render. But the calendar node is built `hidden` (`index.js:938`) and only shown by a click handler inside the component's delegated event map — there is no markup-only way to reach the open state. Per the lab story rules (no play functions, no hand-faked calendar markup), every story here snapshots as input + toggle button only.

## Time Picker

- **File:** `stories/lab/TimePicker.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/time-picker/>
- **USWDS JS:** required (`parameters.uswds: ['timePicker', 'comboBox']`)
- **Severity:** Off-brand
- **Variants covered:** 4 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Nothing distinctive — it inherits exactly what any unthemed USWDS component inherits: NASA-theme colors via `$theme-*` settings in `_hds-uswds-theme.scss` (confirmed no time-picker- or combo-box-specific settings exist there) and the base HDS type/color primitives that reach all USWDS defaults inside `@layer uswds`.

**Breaks or reads as foreign:**

- Identical defect to the Combo Box lab finding, not a distinct one: `enhanceComboBox()` (`node_modules/@uswds/uswds/packages/usa-combo-box/src/index.js:221-230`) builds `.usa-combo-box__input` and hides the generated `<select>`. `.usa-combo-box__input` is absent from the `.usa-input, .usa-textarea, .usa-select` selector list in `src/scss/components/_form.scss:108-118`, so the visible field never gets `var(--hds-palette-border)` / `$hds-border-radius-control`. Time picker's own `init()` (`packages/usa-time-picker/src/index.js:141-149`) calls that same `enhanceComboBox()` directly, so it inherits this exactly.
- Focus/hover: `_form.scss:141-161` styles `.usa-input:focus`/`:hover`, never `.usa-combo-box__input:focus`/`:hover` — the field keeps USWDS's own combo-box focus/hover treatment, not the HDS solid-blue highlight.
- Disabled state styling comes from USWDS's own `u-disabled` / `u-disabled-high-contrast-border` mixins in `_usa-combo-box.scss`, not `_form.scss:400`'s `.usa-input:disabled` rule.
- `.usa-time-picker { width: 10em; }` (`usa-time-picker/src/styles/_usa-time-picker.scss`) is a hardcoded width on top of `.usa-combo-box`'s own `max-width: units($theme-input-max-width)` — a setting `_hds-uswds-theme.scss` never overrides, so this is a pure USWDS default no themed HDS input carries.

**Palette behaviour:** Not measured directly in this session, but nothing in `_form.scss` or `base/_palettes.scss` targets `.usa-combo-box*`/`.usa-time-picker*`, so there is no HDS palette-aware rule to fail — the field renders identically (USWDS defaults) on all six palettes, same as the Combo Box finding.

**Accessibility risk today:** None identified beyond the USWDS defaults already tracked in `docs/508.md` (time picker is named there, under 3.3.2 and 502.3.6, as a component "not styled by HDS" shipped as-is; USWDS 3.14.0 is recorded as having repaired most of its ACR-flagged issues per `docs/USWDS-3.14.0-IMPACT.md`). Without the re-init decorator this story uses, the component would not exist at all in Storybook — it would render as a bare, non-functional `<input type="text">`, the same native-input-fallback gap `docs/508.md:165` records for file input.

**Measured in a browser**, closing the gap the analysis flagged. Rendering the default story under the decorator, the enhanced field computes to:

| Property                 | Time Picker       | Combo Box (measured separately) |
| ------------------------ | ----------------- | ------------------------------- |
| `border-top-color`       | `rgb(46, 46, 46)` | `rgb(46, 46, 46)`               |
| `border-top-left-radius` | `0px`             | `0px`                           |

Identical, which confirms the claim that this is the same defect rather than a related one — `usa-time-picker/src/index.js` calls `enhanceComboBox()` directly, so the two components share one visible control and one fix. The enhancement itself works: the input, toggle button and listbox are all built.

Both should be resolved by a single change — teaching HDS's form rules about `.usa-combo-box__input` — and the theming issue should cover them together rather than separately.

**What theming would need to do:**

- Extend the `.usa-input, .usa-textarea, .usa-select` rule in `_form.scss:108-118` (and its `:focus`/`:hover`/`:disabled` companions) to include `.usa-combo-box__input`, or add a parallel combo-box-specific ruleset — this single gap is the whole defect, shared with Combo Box.
- Decide whether `.usa-time-picker`'s hardcoded `width: 10em` should stay a fixed width or move to the token spacing/sizing scale.
- Theme `.usa-combo-box__list` / `.usa-combo-box__list-option` (the dropdown) once the field itself is themed — untouched by this triage.
- Any combo-box theming issue should explicitly note it also fixes time picker, so the two aren't tracked (or fixed) independently.

## Date Range Picker

- **File:** `stories/lab/DateRangePicker.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/date-range-picker/>
- **USWDS JS:** required (`parameters.uswds: ['dateRangePicker', 'datePicker']`)
- **Severity:** Off-brand
- **Variants covered:** 4 variant stories (Default range, Min/max bounds, Pre-filled range, Disabled) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Both visible `<input>` elements keep the plain `.usa-input` class after USWDS clones them (`node_modules/@uswds/uswds/packages/usa-date-picker/src/index.js` `enhanceDatePicker`), so they get the full HDS text-field treatment — palette-aware background/border, hover, and the solid-blue focus highlight — from `src/scss/components/_form.scss:108-150`. `grep -rn "usa-date-range-picker\|usa-date-picker" src/scss/` returns nothing, confirming no dedicated HDS rule exists; this input theming is inherited only because the picker reuses the generic `.usa-input` selector.

**Breaks or reads as foreign:**

- The calendar popup's selected/range-date fills are hardcoded literal colors — `color("primary-vivid")` and `color("blue-10v")` — in `node_modules/@uswds/uswds/packages/usa-date-picker/src/styles/_usa-date-picker.scss:262-311`, not `$theme-*` settings, so they cannot adapt to any HDS palette.
- The calendar's focused-date ring is a hardcoded `focus-outline(... $color: "blue-warm-80v")` (`_usa-date-picker.scss:230,343,404,462`) — the USWDS ring, never HDS's `hds-focus-ring` mixin (`src/scss/_hds-mixins.scss`, `src/scss/base/_focus.scss`).
- Each `.usa-date-picker__wrapper` is capped by `max-width: units($theme-input-max-width)` (`_usa-date-picker.scss:57`), and `$theme-input-max-width` is unset in `src/scss/_hds-uswds-theme.scss`, so picker width falls back to a USWDS default rather than an HDS one.
- The calendar toggle button and popup container are unstyled USWDS chrome (`.usa-date-picker__button`, `.usa-date-picker__calendar`) sitting directly beside the fully-themed `.usa-input` field, so the seam between "HDS" and "USWDS" is visible on every palette.

**Palette behaviour:** The closed-picker chrome (both input fields, labels, hints) adapts correctly across all six palettes via `--hds-palette-*` custom properties in `_form.scss`. The calendar popup itself — reachable only once opened — cannot be measured statically; per the hardcoded literal colors above it is expected to clash on the blue palette (saturated blue-on-blue) and to be untested against the black palette.

**Accessibility risk today:** None identified in the static (closed) markup beyond USWDS defaults — the two inputs carry `aria-labelledby`/`aria-describedby` and USWDS's own accessibility-tests page (`https://designsystem.digital.gov/components/date-range-picker/accessibility-tests/`) reports 13/16 passed, 1 passed-with-exception (no visible instructions for the calendar button), 0 failures. ⚠️ The open calendar's contrast against the six HDS palettes is unverified — it could not be reached without a play function, which this lab file intentionally omits.

**What theming would need to do:**

- Route the calendar's selected/range/within-range fills through `--hds-palette-*` custom properties instead of literal `primary-vivid`/`blue-10v`.
- Replace the calendar's hardcoded `blue-warm-80v` focus outline with the `hds-focus-ring` mixin infrastructure.
- Set `$theme-input-max-width` (or an equivalent override) so both pickers take an intentional HDS width instead of the USWDS default.
- Verify the reachable-only-when-open calendar against all six palettes once a themed build exists — this triage could not measure it statically.

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

## Header

- **File:** `stories/lab/Header.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/header/>
- **USWDS JS:** required (`parameters.uswds: ['navigation']`)
- **Severity:** Off-brand
- **Variants covered:** 4 variant stories (Basic, Basic + megamenu, Extended, Extended + megamenu) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** Type sizing along `$theme-header-min-width`/`$theme-header-max-width` (`_hds-uswds-theme.scss:386-387`) and the font-role mapping (`$theme-header-font-family`) flow through the shared HDS type scale, and the whole surface is pinned to a readable white-on-white presentation by the surface bridge (`base/_palettes.scss:326`, `_scheme-light`), so text/link contrast holds on every palette even though the palette itself is ignored.

**Breaks or reads as foreign:**

- The accordion initial-state decorator (`.storybook/preview.js`) does set `hidden` on `.usa-nav:not(.is-visible)`, but it does **not** hide the nav. Measured at 1200px: `.usa-nav` computes `display: flex` — USWDS's own rule out-cascades `[hidden]`'s UA `display: none` — and renders 53.9px tall, with `.usa-nav__primary` at 45.9px and all three top-level items visible. Screenshotting the story shows the complete header: site title, Missions / News & Events / About NASA with dropdown chevrons, search field and submit button. The only zero-height links are those inside `.usa-nav__submenu`, which the decorator correctly collapses because their trigger carries `aria-expanded="false"`. These stories are visually reviewable as they stand.
- Search input/`​.usa-input` picks up the global HDS text-field override (`components/_form.scss:111-117`) — different padding/background/radius than USWDS's own compact search field.
- Search submit `.usa-button` gets the full NASA-Red CTA button treatment (`components/_button.scss:68-92`) — a wide red button where USWDS ships a small icon-only affordance.
- Primary nav link color is hardcoded to `color($nav-link-color)` (`base-dark`, `usa-nav/src/styles/_usa-nav.scss`), not a `--hds-palette-*` custom property.
- Site title (`.usa-logo__text`) uses USWDS's own font-size/line-height mapping off `$theme-header-font-family`, independent of HDS's heading scale.

**Palette behaviour:** Pinned to the white palette by the surface bridge (`base/_palettes.scss:326`, shared with `.usa-banner`/`.usa-footer`); all six `PaletteA11y` copies render near-identically — expected, not a bug, per the same pattern documented in `Footer.stories.js`/`Banner.stories.js`.

**Accessibility risk today:** Beyond the Storybook-only nav-visibility artifact above, none identified from source: `base/_focus.scss:25`'s bare `button:not([disabled]):focus-visible` reaches `.usa-menu-btn`, `.usa-nav__close`, and the submenu-trigger buttons (none carry `.usa-button`), giving them the HDS ring; the search submit button is `.usa-button`-classed, so it gets `components/_button.scss`'s own `:focus-visible` in the later `hds-components` layer instead — both paths resolve to a visible ring, just two different ones. USWDS's own accessibility-tests page (fetched) reports 19/26 passed, 1 passed-with-exceptions (mobile search tab order, standard variant only — resolved in extended), 6 conditional/implementation-dependent, 0 failed.

**Correction after browser verification.** An earlier reading of this component claimed the decorator made the entire nav invisible at every width, and rated it `Unusable` on that basis. Measurement disproves it (see the first bullet above); severity lowered to `Off-brand`. A real defect did turn up in the same pass, though — the search submit icon pointed at `assets/img/usa-icons/search--white.svg`, which 404s. That file lives in `usa-icons-bg/`, not `usa-icons/`. Fixed in the story, and the story now loads with no 404s.

**What theming would need to do:**

- Decide whether the header/nav get a real HDS surface (removing the white-palette bridge) or stay pinned per `docs/DESIGN.md` → "Header, Footer, and Banner: untouched until Phase 2".
- Route nav link color and the search input/button through `--hds-palette-*` custom properties instead of USWDS's hardcoded `base-dark`/CTA-red.
- Reconcile the site title's type scale with HDS headings.
- Give the mobile "Menu"/close/submenu-trigger buttons the same focus treatment intentionally, rather than as a byproduct of the bare `button:focus-visible` rule.

## Footer

- **File:** `stories/lab/Footer.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/footer/>
- **USWDS JS:** required (`parameters.uswds: ['footer']`)
- **Severity:** Off-brand
- **Variants covered:** 3 variant stories (Slim, Medium, Big) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The surface bridge in `base/_palettes.scss:326-333` pins `.usa-footer` to the full `_scheme-light` custom-property set (not just a background), so the big footer's sign-up `.usa-input` (`components/_form.scss:111-117`) always gets a defined `--hds-palette-input-bg`/`-border`/`-control-text`, regardless of what palette (if any) wraps the page — contrast holds. `.usa-label` and `.usa-button` inside that same form are also global HDS overrides (`_form.scss:169-174`, `components/_button.scss:68-73`), so the sign-up form is the one part of this component that is substantially HDS-styled already, not stock USWDS.

**Breaks or reads as foreign:**

- Three visual bands (return-to-top, primary, secondary) collapse into one flat white panel: `_usa-footer.scss:61,186` hardcode `base-lightest`/`base-lighter`, both remapped to white-ish values by `_hds-uswds-theme.scss`, then the bridge repaints the whole thing `$hds-color-spacesuit-white` again — only a 1px `base-light` rule separates the bands.
- Footer nav links (`.usa-footer__primary-link`, `.usa-footer__secondary-link a`) carry no `.usa-link` class in the authored USWDS 3.14 twig markup, and `components/_link.scss` only targets `.usa-link`/`.usa-link--external` — so none of HDS's dashed-underline or diagonal-arrow link treatment reaches them; they render as bold USWDS-default `ink` text.
- The HDS-themed sign-up label/input/button sit inside an otherwise-unstyled `.usa-sign-up`/`.usa-form` wrapper — a themed control in an unthemed container, the same mismatch already flagged for Card's footer button, compounded three ways here.
- Big-footer section headings (`@include h4`, `_usa-footer.scss:337`) and the sign-up heading (`@include h3`) resolve through HDS's type scale independently, so the two headings in the same row are not guaranteed to look like an HDS heading pair.

**Palette behaviour:** Pinned to white by the surface bridge (`base/_palettes.scss:326`), so all six `PaletteA11y` copies are expected to render near-identically — sameness is the pass condition, matching the peer bridged component in `stories/lab/Banner.stories.js`. ⚠️ One gap the palette stories cannot surface: the sign-up `<h3>` heading's color rule is scoped to `[class*="hds-palette-"]` descendants (`base/_elements.scss:25,102-114`); the bridge sets custom properties on `.usa-footer` but does not itself add a `hds-palette-*` class, so on a real page with no ancestor palette wrapper, that heading may not receive `--hds-palette-heading` at all. Every story here wraps the footer in a `.hds-palette-*` div, so this can't be verified visually from the lab stories — flagged, not confirmed broken.

**Accessibility risk today:** None identified beyond USWDS defaults — USWDS's own accessibility-tests page reports 13/15 passed, 0 failed, 2 conditional (link-text specificity and image alt text, both content-dependent, not a theming defect). The big footer's disclosure buttons only exist below a 480px viewport (`usa-footer/src/index.js`); above that, `.usa-footer__primary-link` stays a plain, non-interactive `<h4>` by design — not a missing enhancement.

**What theming would need to do:**

- Give the three footer bands distinct tonal surfaces (or a deliberate flat-white decision) instead of inheriting USWDS's `base-lightest`/`base-lighter` remap only to have the bridge flatten it back to white.
- Decide whether footer nav links should carry `.usa-link` (HDS dashed underline) or stay a footer-specific link treatment — right now they get neither deliberately.
- Reconcile the sign-up form's already-HDS-themed controls with an unthemed `.usa-sign-up`/`.usa-form` shell (spacing, heading style, label/legend rhythm).
- Confirm (design call, not implementation) whether the big-footer `h4` and sign-up `h3` should share one HDS heading treatment, and verify the `$_p`-scoped heading-color gap noted above against a real, unwrapped page.

## Identifier

- **File:** `stories/lab/Identifier.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/identifier/>
- **USWDS JS:** none
- **Severity:** Off-brand
- **Variants covered:** 4 variant stories (Default, No logos, Multiple parents and logos, Taxpayer disclaimer) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The black background (`#000`) and its white/gray text (`#fff`, `#e6e6e6`) all resolve through HDS's remapped `base-darkest`/`base-light`/`base-ink` tokens (`src/scss/_hds-uswds-theme.scss:78,86,88`) rather than raw USWDS defaults, and every color combination passes contrast comfortably — verified against the compiled selectors in `dist/css/hds.min.css`.

**Breaks or reads as foreign:**

- Typesets in Inter (`$theme-font-role-ui: 'serif'` → `$theme-font-type-serif: 'inter'`, `_hds-uswds-theme.scss:232,235`) while HDS body copy is Public Sans — same mismatch already flagged for Banner.
- The masthead and USA.gov links carry no distinct link color: `set-link-from-bg`'s WCAG token search can't reach HDS's `$theme-link-color: 'ink'` (→ black) on this black surface, so it substitutes white — compiled `color:#fff`, identical to the surrounding body text (`dist/css/hds.min.css`). Links read only via underline.
- No focus ring on any interactive element. Every clickable element is a plain `<a>` with no `tabindex`; `base/_focus.scss`'s `:focus-visible` selector list (`[contenteditable]`, `[tabindex]`, `iframe`, `button`, `input`, `select`, `textarea`) never matches it, and USWDS's own `typeset-link` mixin (the one place a `:focus { outline }` is defined, `uswds-core/.../typeset.scss:92-94`) is never invoked by `.usa-identifier` — it only calls the plain `typeset()` mixin. Keyboard users get the bare browser default outline.

**Palette behaviour:** Pinned to the BLACK palette (`--hds-palette-bg: $hds-color-carbon-black`) by the surface bridge in `base/_palettes.scss:335-342` — the one bridge pinned dark rather than white (banner/header/footer are pinned white, `_palettes.scss:326-333`). All six wrapping palettes render near-identically by design; a visible difference between them would indicate the bridge broke, not a passing result.

**Accessibility risk today:** No color-contrast failures found (verified compiled hex values). The real risk is the missing focus indicator described above — every identifier link falls back to the browser's native outline rather than HDS's dashed ring, so its visibility is inconsistent across browsers/OSes and never matches the rest of the site.

**Verified in a browser** — with one correction to the characterisation above. Focusing a required link computes `outline: 1px dashed rgb(92, 92, 92)` and `::before { content: none }`. So:

- HDS's `hds-focus-ring` is definitively **not** applied — that mixin paints through a `::before` pseudo-element at 2px, and there is no such pseudo-element here.
- But this is not the _bare browser_ default either. `_hds-uswds-theme.scss:221-225` sets `$theme-focus-width: 1px`, `$theme-focus-style: dashed`, `$theme-focus-color: 'gray-60'`, so what renders is the USWDS focus treatment as HDS configured it.

The practical gap is thickness and consistency: identifier links get a 1px dashed outline where every themed HDS control gets the 2px ring. ⚠️ The exact source of the measured `rgb(92, 92, 92)` was not traced to a specific token in this pass.

**What theming would need to do:**

- Set `$theme-identifier-font-family` (or remap `$theme-font-role-ui`) so the bar matches HDS's Public Sans body type.
- Decide a deliberate primary-link treatment for the identifier instead of relying on the WCAG auto-substitution landing on plain white.
- Extend focus-ring coverage to unadorned in-content links (or add `tabindex`-independent selectors) so identifier links get `hds-focus-ring` like every other interactive HDS element.
- Once themed, remove the `:where(.usa-identifier)` bridge in `base/_palettes.scss` per its own comment ("Remove these once the components get real HDS theming").

## Language Selector

- **File:** `stories/lab/LanguageSelector.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/language-selector/>
- **USWDS JS:** required (`parameters.uswds: ['languageSelector']`)
- **Severity:** Off-brand
- **Variants covered:** 5 variant stories (Two languages, Three or more, Small, Unstyled, Open) + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The trigger button (`.usa-language__link.usa-button`) is a real `.usa-button` and gets the full HDS button theme from `src/scss/components/_button.scss` — square corners, Inter type, NASA Red fill, and the HDS focus-ring override in `button-interactive-states`.

**Breaks or reads as foreign:**

- `.usa-language__submenu` hardcodes `background-color: color("primary-darker")` (NASA Red 70v) instead of a `--hds-palette-*` property (`node_modules/@uswds/uswds/packages/usa-language-selector/src/styles/_usa-language-selector.scss`, lines 61-67) — the dropdown panel is a fixed red box on every palette.
- The same rule hardcodes link/hover text to `color("white")` rather than `--hds-palette-link-text` (same file, lines 74-89) — legible only by accident of the fixed red background.
- No `$theme-navigation-font-family` override exists in `src/scss/_hds-uswds-theme.scss`, so submenu list type resolves against USWDS's un-overridden `"ui"` default rather than an HDS type slot.
- `.usa-language--small .usa-button` keys off `$theme-header-font-family` / `$theme-button-small-width`, neither set by HDS, so the header-sized trigger's type and min-width are USWDS defaults.

**Palette behaviour:** The trigger adapts (themed `.usa-button`). The dropdown panel does not — same NASA-Red-Shade box with white text on all six palettes, most jarring on blue, dark, and black.

**Accessibility risk today:** Confirmed cascade-layer check, selector by selector: `base/_focus.scss`'s bare `button:not([disabled]):focus-visible` (in `@layer hds-base`) never actually reaches the trigger — the more specific `.usa-button` override in `@layer hds-components` wins regardless, since later layers beat earlier ones at any specificity, so the trigger's ring is themed as designed. But the dropdown's plain `<a>` submenu items match **no** HDS selector at all — `_focus.scss` has no bare `a:focus-visible` rule, and `hds-link-appearance` (`components/_link.scss`) is scoped to `.usa-link`. Keyboard focus on a submenu item falls through to the unstyled browser default outline (USWDS's own rule only sets `outline-offset`), while `_focus.scss`'s `a:focus:not(:focus-visible){outline:none}` _does_ reach those same links and suppresses even that on mouse click. Net effect: a keyboard user gets an inconsistent, unthemed ring on dropdown items right below a fully-themed trigger button.

**What theming would need to do:**

- Wire `.usa-language__submenu` background/text to `--hds-palette-*` (surface + link-text) so the panel matches its ancestor palette instead of always painting NASA Red.
- Give submenu links a real focus treatment — likely `hds-focus-ring-inline` via a `.usa-language__submenu-item a` rule, since the bare-selector/base-layer approach doesn't cover plain anchors.
- Decide whether `$theme-navigation-font-family` should be set explicitly (to `'body'` or a dedicated slot) rather than left at USWDS's `"ui"` default.
- Confirm the small/header variant's type and min-width against the real header component once header theming is scoped (currently out of theming scope per AGENTS.md "Components without HDS theming").

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

## Range Slider

- **File:** `stories/lab/RangeSlider.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/range-slider/>
- **USWDS JS:** required (`parameters.uswds: ['range']`)
- **Severity:** Off-brand
- **Variants covered:** 4 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The value readout span (`.usa-range__value`, built by `init()`) extends `%block-input-general`, so its typography follows the HDS input font stack. Track/thumb colors (`base-lightest` fill, `base-darker` border) run through the USWDS neutral-gray settings that `_hds-uswds-theme.scss` leaves mapped to the standard gray scale, so the component reads as a neutral gray control rather than clashing with NASA blue/red.

**Breaks or reads as foreign:**

- Track/thumb border is hardcoded in the `range-track`/`range-thumb` mixins (`node_modules/@uswds/uswds/packages/usa-range/src/styles/_usa-range.scss`) — `border: units(2px) solid color('base-darker')` — not a `$theme-*` setting, so it cannot be retargeted without a component override.
- **Cascade-layer trap:** `src/scss/base/_focus.scss` puts `input:not([disabled]):focus-visible { @include hds-focus-ring; }` in `@layer hds-base`, which outranks `@layer uswds` regardless of specificity. Because `.usa-range` is an `<input>`, on keyboard focus it gets an HDS dashed `::before` ring (`inset: -2px` around the input's own thin track box, per `src/scss/_hds-mixins.scss`) **in addition to** USWDS's own solid gray-60 `box-shadow` ring on `::-webkit-slider-thumb`/`::-moz-range-thumb` (`range-focus` mixin, `$theme-focus-color: 'gray-60'` in `_hds-uswds-theme.scss` line 221) — two unrelated focus indicators at once, and HDS's ring cannot reach the thumb at all since it's a vendor pseudo-element.
- ⚠️ Corrects a release-note claim rather than repeating it: `docs/USWDS-3.14.0-IMPACT.md` §4 records that "focus ring added to slider input" did not survive verification — the `range-focus` mixin is byte-identical 3.13→3.14; only the border width/color changed.

**Palette behaviour:** Adapts adequately — track/thumb are neutral grays with no palette-scoped colors, so contrast stays roughly consistent across all six `hds-palette-*` wrappers. Non-text contrast (track/thumb border vs. surrounding surface) is a passthrough of the 3.14 border bump noted above, which per `docs/USWDS-3.14.0-IMPACT.md` improved contrast against the white track from ~4.6:1 to ~16:1.

**Accessibility risk today:** The doubled focus indicator described above is the main risk — not illegible or broken, but confusing keyboard-focus feedback (HDS dashed line across the track, unrelated solid ring around the thumb). No color-contrast failure identified in any palette. Upstream's own accessibility-tests page reports all 12 WCAG 2.1 AA checks passing for USWDS 3.13.0's baseline; nothing in the 3.14 diff regresses those.

**Verified in a browser**, and the "two indicators" claim holds — though the first measurement disagreed and was wrong.

`getComputedStyle(el, '::-webkit-slider-thumb')` reports `box-shadow: none` on a focused slider, which appears to disprove the USWDS thumb ring. It does not: computed styles for vendor slider pseudo-elements are not reliably exposed in Chromium. Screenshotting the focused control settles it — blurred, the thumb has a dark border; focused, a lighter grey ring appears around it, which is USWDS's `range-focus` mixin (`box-shadow: 0 0 0 2px color($theme-focus-color)`).

What is measurable on the host element confirms the HDS half: `::before` has `content: ""` at `inset: -2px` with `position: relative` on the host, and `outline: none`.

So on keyboard focus the control shows **a dashed HDS rectangle around the whole input and a grey circular ring around the thumb simultaneously** — two unrelated indicators from two different layers. Screenshot evidence captured during verification.

**What theming would need to do:**

- Decide whether `.usa-range:focus-visible` should be excluded from the global `input:focus-visible` selector in `base/_focus.scss` (or otherwise suppressed for range specifically) so it stops layering a track-shaped ring behind the thumb's own ring.
- Add a component override (new `src/scss/components/_range.scss`) that restyles the thumb ring color via the `range-focus` mixin's `$theme-focus-color` consumer, since pseudo-elements can't be reached by `hds-focus-ring`.
- Decide on track/thumb border color and radius intent (currently hardcoded USWDS `base-darker`/`pill`) against HDS's square-corner, palette-aware surface language.
- Confirm `$theme-input-select-size` (thumb diameter, currently unset/default) against the Figma spec before it's pulled out of lab.

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

## Validation

- **File:** `stories/lab/Validation.stories.js`
- **USWDS docs:** <https://designsystem.digital.gov/components/validation/>
- **USWDS JS:** required (`parameters.uswds: ['validator']`)
- **Severity:** Off-brand
- **Variants covered:** 3 variant stories + All Variants + 2 palette tests

**Inherits correctly from the HDS theme:** The surrounding `.usa-alert--validation` wrapper is fully HDS-themed (`src/scss/components/_alert.scss`), so the info-alert surface, icon, and heading read as HDS. The `usa-input` and `usa-button` inside the form are themed too (`_form.scss`, `_button.scss`), including the HDS solid-blue focus treatment on the input.

**Breaks or reads as foreign:**

- `.usa-checklist__item--checked::before` (`add-success-mark`, `node_modules/@uswds/uswds/packages/uswds-core/src/styles/mixins/general/add-success-mark.scss`) is a hardcoded background-image reference to `check--blue-60v.svg` (`packages/usa-icon/src/img/usa-icons-bg/check--blue-60v.svg`, fill `#005ea2`). It never reads `$theme-color-success` — the checkmark is USWDS system blue regardless of the HDS theme's green-cool success family in `src/scss/_hds-uswds-theme.scss`.
- `.usa-checklist` runs through `@include typeset` (`packages/usa-checklist/src/styles/_usa-checklist.scss`), so requirement text uses the ambient USWDS type scale rather than the `hds-mixins` typography used by themed components.
- Unmet requirements have no color/icon at all (`add-checkbox-placeholder` draws only a blank `::before` box) — the incomplete state is visually silent, which is a USWDS baseline behavior, not an HDS gap, but worth flagging as a usability weak point that theming could choose to address.

**Palette behaviour:** No palette failure identified. The checkmark is a static blue PNG-equivalent SVG that doesn't reference any `--hds-palette-*` custom property, so it renders identically (and legibly, `#005ea2` on white/light/midtone) across all six palettes — it never adapts, but it also never breaks. The alert wrapper and input around it already adapt correctly since they're themed elsewhere.

**Accessibility risk today:** None identified beyond USWDS defaults. ⚠️ One correctness quirk worth carrying into any future issue, not a contrast/focus problem: `createInitialStatus()` (`packages/usa-validation/src/index.js`) unconditionally sets every checklist item's `aria-label` to "status incomplete" on `init()`, even for an item pre-marked `usa-checklist__item--checked` in markup — so a screen reader can report "incomplete" for a visually-checked item until the user next triggers the input's `change` event. Verified by reading `createInitialStatus` in full; it never inspects `classList` before writing the label. The "Form error hover" known bug does not apply — the component never applies `usa-input--error` to anything.

**Two points resolved during review:**

- The hardcoded checkmark is confirmed at source. `uswds-core/src/styles/mixins/general/add-success-mark.scss:6` is `@include add-background-svg("usa-icons-bg/check--blue-60v")` — a background image, not a colour property, so `$theme-color-success` cannot reach it by any theme setting. Theming it means replacing the asset or overriding `background-image`.
- The open question about `.usa-sr-only` clears. `grep -rn "sr-only" src/scss/` returns exactly one match, a comment in `components/_link.scss:58`. No HDS rule targets that class, so the JS-generated status span is genuinely untouched and Validation does not repeat the Character Count collision.

Worth stating plainly because it is the useful negative result in this set: **Validation is the one JS-enhanced component checked so far where no HDS rule reaches into the generated DOM.**

**What theming would need to do:**

- Decide whether the checked-item icon should recolor to `$theme-color-success`/`--hds-palette-*` or intentionally stay USWDS blue as a "system" affordance — currently it is hardcoded, not a theme gap in the CSS-variable sense.
- Apply HDS typography (`hds-mixins`) to `.usa-checklist` and `.usa-checklist__item` to match surrounding HDS body text.
- Consider giving the "unmet" state a visible marker (icon or color) instead of an empty box, if HDS wants a clearer default-state affordance than USWDS ships.
- No cascade-layer or focus-ring work needed here — this component doesn't touch either.

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
