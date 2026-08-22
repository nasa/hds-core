# USWDS 3.14.0 — Impact Analysis for HDS Core

Analysis of [USWDS v3.14.0](https://github.com/uswds/uswds/releases/tag/v3.14.0) (published 2026-08-18) against HDS Core at `@uswds/uswds` 3.13.0.

Status: **upgrade applied.** `package.json` declares `"@uswds/uswds": "^3.14.0"` and the lockfile resolves 3.14.0. The analysis below is kept as the record of what was checked and why each decision was made; see [Outcome](#outcome) for what actually shipped.

## Outcome

Every predicted breaking change was confirmed and handled. The measured result:

| Check | Result |
| --- | --- |
| Visual regression (220 stories, 1024px) | 219 unchanged, **1 changed** |
| axe suite (`npm test`) | 242 passed |
| Docs render (39 MDX pages) | all rendered |
| `check:uswds` / `check:uswds-core` / `check:tokens` / `check:css-hash` | pass (USWDS and CSS baselines regenerated) |
| `check:api-snapshot` | one line changed: `.usa-breadcrumb--wrap` → `.usa-breadcrumb--truncate` |

The single changed story is the Multi-Step Form guide, from two causes: the range slider border (1px `#757575` → 2px `#1b1b1b`) and the updated memorable-date hint markup. Accordion, breadcrumb, table, and every form control render pixel-identically after the fixes in section 1.

Changes made:

- `$theme-accordion-icon-position: 'end'` in both theme files (section 1.1), with the deviation recorded in `docs/DESIGN.md`.
- Breadcrumb override retargeted to `:not(.usa-breadcrumb--truncate)` (section 1.3).
- Memorable-date markup in `stories/guides/USWDSForm.stories.js` updated to per-field hints.
- `docs/508.md` remarks updated, including the two pre-existing inconsistencies in section 5.3.
- Accordion and Breadcrumb MDX guidance note the unsupported USWDS modifier classes.
- Version references updated across `README.md`, `AGENTS.md`, `docs/ARCHITECTURE.md`, `stories/overview/Installation.mdx`, `stories/guides/ReactSetup.mdx`, and both Sass entry-point headers.

**One finding the analysis did not predict.** The file input is never enhanced in Storybook: USWDS builds `.usa-file-input__target` in JavaScript on page load, and unlike accordion, table sort, and in-page navigation there is no preview decorator that re-initialises it after Storybook renders. Every file input story therefore renders as a bare `<input type="file">`, and neither axe nor Chromatic can see the file input's error border, focus ring, or drag instructions — including the blue-to-red fix that is the most consequential accessibility change in this release for HDS. That fix was verified by rendering the component outside Storybook against both USWDS versions (`#0b4778` → `#b50909`). The gap is recorded in `docs/508.md` under Testing Methodology → Known coverage gaps. Closing it needs a file input init decorator in `.storybook/preview.js`, which is out of scope for a version bump and should be its own change.

## How this was verified

Claims below are derived from a source-level diff of the two published npm tarballs plus a real compile of HDS's own Sass against each version, not from the release notes alone:

- Both tarballs downloaded from the npm registry; the 3.14.0 tarball's SHA-512 was checked against the registry's `dist.integrity` value.
- `src/scss/hds.scss` compiled with Dart Sass 1.101.0 against `packages/` from each version, then diffed. Every "compiled CSS delta" in this document is a line from that diff.
- Sass version floor established by bisecting Dart Sass releases against `@use "uswds-core"`.

Two release-note items did not survive verification and are corrected in this document: the range slider focus ring, and the `ink` token reassignment. See section 4, "Release-note claims that do not apply to us".

## Executive summary

| Area | Impact |
| --- | --- |
| Accordion icon position | **Breaking.** Upstream default flipped to left-aligned. Our chevron and padding both land wrong. Requires a theme setting in two files. |
| Breadcrumb wrap/truncate | **Breaking.** `usa-breadcrumb--wrap` is now a no-op; truncation moved to `usa-breadcrumb--truncate`. Our override in `_breadcrumb.scss` targets the old class. |
| Dart Sass floor | **Breaking for adopters.** 3.14.0 requires Dart Sass >= 1.99.0. Our devDependency is fine; our published Sass entry points need a documented floor. |
| File input error color | **Accessibility fix that matters more to us than to USWDS.** Under our theme the error border was rendering blue. It is now red. |
| Range slider border | Accessibility fix, passthrough. 1px `#757575` to 2px `#1b1b1b`. |
| Table caption / borderless row headers | Two fixes; both effectively masked by our own table overrides. |
| Form input `box-sizing` | No-op for us — we already emit a global `border-box` reset. |
| Modal, character count, memorable date, date picker, file input, language selector, banner | Accessibility fixes delivered through markup and `dist/js`. Affects `stories/guides/USWDSForm.stories.js` and our 508 record. |
| Footer `data-tag` | Security hardening (XSS). No HDS styling involved. |

Total compiled CSS delta for `hds.min.css`: 105 lines added, 33 removed, across 29 hunks. Six of those hunks are upstream typo fixes inside comments.

## 1. Breaking — needs a source change in HDS

### 1.1 Accordion icon position

USWDS added `$theme-accordion-icon-position`, defaulting to `"start"`. The button's horizontal padding moved from a physical shorthand to logical longhands and swapped sides:

```css
/* 3.13.0 */
.usa-accordion__button {
  padding: 1rem 3.5rem 1rem 1.25rem;
}

/* 3.14.0 (default "start") */
.usa-accordion__button {
  padding-block: 1rem;
  padding-inline-start: 3.5rem;
  padding-inline-end: 1.25rem;
}
```

`src/scss/components/_accordion.scss` overrides only `padding-top` and `padding-bottom`. The horizontal padding is inherited from USWDS. Because our button is `display: flex; justify-content: space-between` with the chevron as an `::after` flex item, two things break at once:

- The heading label indents 56px from the left, for an icon we do not render there.
- The chevron circle moves 36px closer to the right edge (56px inset becomes 20px), breaking the Figma alignment.

The forced-colors `::before` that we deliberately keep visible also relocates to `inset-inline-start: 1.25rem`, so High Contrast Mode gets a left `+`/`-` glyph while our chevron sits on the right.

**Fix:** set `$theme-accordion-icon-position: 'end'` in **both** `src/scss/_hds-uswds-theme.scss` and `src/scss/_hds-uswds-theme-utils.scss` (per AGENTS.md, theme settings must be changed in both). That restores 3.13.0 geometry exactly in LTR and improves RTL, since the padding is now logical.

**Open decision — to be clear about what is and is not being proposed.** Nothing here requires redesigning our accordion. The question is only which of two things we do about a default that changed underneath us:

- **Option A (recommended): keep our design.** Set `$theme-accordion-icon-position: 'end'` in both theme files. Our chevron stays a circled caret on the right, exactly as it is in Figma today. Cost: two lines. This is a configuration change, not a design change.
- **Option B: follow upstream.** Adopt `"start"` and move our chevron to the left of the label. That _is_ a redesign, needs Figma and creative director sign-off, and is not something to do as a side effect of a version bump.

The only reason Option A is a decision rather than a formality is that upstream framed `"start"` as an accessibility improvement — their rationale is that at high zoom a trailing icon can end up visually far from the label it belongs to. That rationale is about USWDS's own full-width text-plus-background-icon button. Our button is a flex row with the chevron as a sized, circled element, so the label and the control read as one unit at any width. Option A is defensible; it just needs to be recorded in `docs/DESIGN.md` as an intentional deviation rather than left as an undocumented pin, because a 508 reviewer comparing us to upstream may reasonably ask why we opted out.

### 1.2 Accordion icon modifier classes are unstyled by HDS

3.14.0 also ships `.usa-accordion--icon-start` and `.usa-accordion--icon-end`, which set `padding-inline-*` on `.usa-accordion__button:not(.usa-banner__button):not(.usa-nav__link)`. We never set `padding-inline-*`, so cascade layers do not protect us: an adopter who applies `usa-accordion--icon-start` gets a 56px left indent with our chevron still on the right.

Note that the upstream guard (`:not(.usa-banner__button):not(.usa-nav__link)`) is narrower than ours (`:not(.usa-banner *):not(.usa-nav *)`, added for Issue #86). They do not conflict, but they are not equivalent either.

**Decision needed:** either style `--icon-start` in HDS (move the chevron to the leading edge) or document both modifiers as unsupported.

### 1.3 Breadcrumb wrap is now the default

Upstream inverted the variant. Wrapping is the default; `usa-breadcrumb--wrap` is retained as a documented no-op; the old single-line ellipsis bar is now opt-in via `usa-breadcrumb--truncate`.

`src/scss/components/_breadcrumb.scss` line 38 still keys off the old class:

```scss
.usa-breadcrumb:not(.usa-breadcrumb--wrap) .usa-breadcrumb__list {
  overflow: visible;
}
```

This is the only reference to `usa-breadcrumb--wrap` anywhere in the repo — no story or doc uses it. Two consequences after the bump:

- On default breadcrumbs the selector still matches, but USWDS no longer sets `overflow: hidden` there, so the rule becomes inert.
- On `usa-breadcrumb--truncate` the selector **also** matches, and our `overflow: visible` cancels the ellipsis clipping the adopter asked for.

**Fix:** retarget to `:not(.usa-breadcrumb--truncate)`.

**Residual conflict, worth a call:** that override exists so focus-ring gradients can paint outside the list bounds. On the `--truncate` variant, USWDS's `overflow: hidden` will clip our focus ring. Either we do not support `--truncate`, or we accept a clipped focus ring on it. This is a 2.4.7 Focus Visible question, not a cosmetic one.

### 1.4 Breadcrumb line-height — our override now suppresses an accessibility default

3.14.0 raises the default breadcrumb line-height to scale 4 (`1.5`) at `$theme-breadcrumb-min-width`, explicitly so wrapped rows have room. `_breadcrumb.scss` sets `line-height: 1.35` on `.usa-breadcrumb` in the `hds-components` layer, which wins.

Wrapped breadcrumb rows will therefore be tighter in HDS than upstream intends. Not a defect, but it is a deliberate choice we should make rather than inherit by accident.

### 1.5 Breadcrumb list items are now `inline-block` by default

`.usa-breadcrumb__list-item { display: inline-block; }` moved from the `--wrap` variant into the default at `>= 30em`. Our `/` separator is an `::after` on `:not(:last-child)` with `width: fit-content`. Its behaviour at a wrap boundary — specifically whether a separator can end up alone at the start of a wrapped row — is untested and needs a visual check.

### 1.6 Dart Sass floor moves to 1.99.0

3.14.0 migrated to the newer Sass conditional syntax (`if(sass($cond): $a; else: $b)`) and to `sass:map` / `sass:list` module functions throughout `uswds-core`. Verified by bisection against `@use "uswds-core"`:

| Dart Sass | Result                                         |
| --------- | ---------------------------------------------- |
| 1.89.2    | fails — `Error: expected ")"`                  |
| 1.92.1    | fails — `Error: expected ")"`                  |
| 1.93.0    | fails — `Error: expected ")"`                  |
| 1.95.0    | fails — `Error: $string: 2px is not a string.` |
| 1.97.0    | fails — `Error: $string: 2px is not a string.` |
| 1.99.0    | compiles                                       |
| 1.101.0   | compiles                                       |

The two failure modes are different, and the second is the one that sets the floor. Dart Sass below 1.95.0 cannot parse the new `if()` at all. 1.95.0 and 1.97.0 parse it but evaluate **both** branches eagerly, so a branch that is never taken still runs and throws:

```text
Error: $string: 2px is not a string.
19 │     sass(meta.type-of($value) == "string"): string.quote($value);
   │                                             ^^^^^^^^^^^^^^^^^^^^
```

Lazy branch evaluation lands by 1.99.0, which is why that is the floor.

Our own build is safe: `devDependencies.sass` is `^1.101.0`. The exposure is on the **Sass consumption path** — `./scss`, `./scss/uswds`, `./scss/dataviz` in `package.json` `exports`. An adopter on Dart Sass < 1.99.0 who consumes HDS via Sass will get an error out of `uswds-core`, with nothing in our docs explaining why.

**Action:** document a `sass >= 1.99.0` floor for the Sass consumption path when the bump lands. The compiled-CSS path (`./css`) is unaffected.

One upside: the same migration clears the `map-has-key` / `map-keys` / `map-merge` global-function deprecation warnings that `--quiet-deps` is currently suppressing.

**Do not read this as a strategic move by USWDS.** Dart Sass deprecated the three-argument `if()` in 1.95.0 to clear the way for native CSS `if()`, so every Sass-based design system is making the same edit — Bootstrap and GOV.UK Frontend among them. See section 8, "Direction signals", for what in this release does and does not indicate where USWDS is going.

## 2. Compiled CSS deltas that land in `hds.min.css`

Everything in this section is verified from the compile-and-diff described above.

### 2.1 File input error color — blue to red

```css
.usa-form-group--error .usa-file-input__target {
  border-color: #0b4778; /* 3.13.0 — secondary-dark */
  border-color: #b50909; /* 3.14.0 — error-dark */
}
```

USWDS lists this as a plain bug fix. **For HDS it is an accessibility fix**, because our theme sets `$theme-color-secondary-dark: 'blue-70v'` (`src/scss/_hds-uswds-theme.scss` line 118). The file input error border was therefore rendering **blue** — visually indistinguishable from an ordinary accent border, and carrying no error affordance at all. After the bump it renders red.

### 2.2 Range slider border

```css
/* track, ms-fill-lower, ms-fill-upper */
border: 1px solid #757575; /* 3.13.0 — base */
border: 2px solid #1b1b1b; /* 3.14.0 — base-darker */

/* thumb */
box-shadow: 0 0 0 1px #757575;
box-shadow: 0 0 0 2px #1b1b1b;

/* webkit thumb centering, recalculated for the thicker border */
margin-top: -0.19rem;
margin-top: -0.25rem;
```

Non-text contrast against the white track goes from roughly 4.6:1 to roughly 16:1. HDS does not style the range slider, so this is pure passthrough.

### 2.3 Table — screen-reader-only caption

```css
.usa-table caption.usa-sr-only,
.usa-prose > table caption.usa-sr-only {
  position: static;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
}
```

`position: absolute` on a `<caption>` was collapsing the heading-row border. This lands in HDS unchanged; our `caption` override only sets typography.

### 2.4 Table — borderless row-header border

```css
.usa-table--borderless tbody th[scope='row'],
.usa-prose > .usa-table--borderless tbody th[scope='row'] {
  border-top: 1px solid #e6e6e6;
}
```

Present in the output but **not visible in HDS**: `src/scss/components/_table.scss` sets `th, td { border: 0; border-top: 1px solid $table-border-light; }` inside `.usa-table` in the `hds-components` layer, which wins over the `uswds` layer regardless of specificity. Same for the dark/black palette variants. Worth one visual confirmation rather than an assumption.

### 2.5 Form inputs — `box-sizing: border-box`

Added to the `%block-input-styles` placeholder, so it reaches `usa-input`, `usa-textarea`, `usa-range`, `usa-combo-box`, `usa-input-prefix-suffix`, and `usa-select`.

**No-op for HDS.** We do not override `$theme-global-border-box-sizing`, which defaults to `true`, so a global `border-box` reset is already emitted. Upstream's guidance applies only to projects that set it to `false`.

### 2.6 Comment typo fixes

Six hunks are upstream fixing "namesspace", "pseucoclass", and "utiliy" inside comment blocks that USWDS emits into compiled CSS. Harmless, but they will move `scripts/css-output-hash.txt`, so do not read a `check:css-hash` failure as a real regression without diffing.

## 3. Changes that reach adopters without touching our CSS

### 3.1 JavaScript — shipped verbatim as `dist/js/uswds.min.js`

`npm run copy:uswds-js` copies USWDS's `dist/js` into ours, and `package.json` exports it as `./js/uswds`. These behaviour changes reach every adopter who uses our bundle:

- **Modal open focus.** `FocusTrap` is now constructed with `autoFocus: false`, and focus lands on the first enabled `.usa-modal__footer button`, falling back to the first button. Previously the focus trap's own first tab stop took focus, which caused modal content to be announced twice.
- **Modal close.** `aria-hidden="true"` is now explicitly removed from the modal on close, so screen-reader access to the page is restored even when the element that opened the modal has since been removed from the DOM.
- **Modal custom focus target.** The `INITIAL_FOCUS` selector broadened from `.usa-modal-wrapper *[data-focus]` to `[data-focus]`. Any `[data-focus]` element inside the modal now claims initial focus. This is a subtle behaviour change for anyone already using `data-focus`.
- **Character count.** `aria-live` is now deferred, so iOS VoiceOver no longer announces the counter on page load.
- **Character count.** The associated-label selector was fixed.
- **Language selector.** The Escape key handler was fixed.
- **Banner.** The toggle now resolves `aria-controls` from the component's root node, so it works inside a shadow root.
- **Datalist.** The keymap is guarded against non-keyboard events raised by datalist selection.
- **In-page navigation.** The enhancement guard was standardised on `data-enhanced`. Our `_in-page-nav.scss` contains no attribute selectors, so nothing on our side keys off the old guard.
- **File input.** On coarse-pointer devices the drag instruction is suppressed and both the visible label and the ARIA label become "Choose from folder".

Dependency surface also changes: `receptor` is removed entirely (its `keymap` is reimplemented first-party in `uswds-core/src/js/utils/keymap.js`) and `lit` is pinned to exactly `3.3.3`. `engines.node` moves from `>= 4` to `>= 20`, which we already satisfy.

### 3.2 Markup changes adopters must make

Neither is a CSS change, so neither shows up in our bundle — but both change what correct markup looks like:

- **Range slider** now expects a visible hint and an association:

  ```html
  <span class="usa-hint" id="range-hint">Move the slider to change the value</span>
  <input class="usa-range" ... aria-describedby="range-hint" />
  ```

- **Memorable date** moves from one shared hint to per-field hints. The group hint becomes `aria-hidden="true"` and each of the three fields gets its own `usa-hint usa-sr-only` element referenced by its own `aria-describedby`. Teams supporting other languages need to translate three new strings.

`stories/guides/USWDSForm.stories.js` uses the **old** memorable-date pattern (one `form-dob-hint` shared by month, day, and year at lines 225-262). It needs updating with the bump.

### 3.3 Footer `data-tag` (security)

`data-tag` is now restricted to heading elements; anything else falls back to `h4`. This hardens the footer against XSS through unsanitised `data-tag` values. We ship the footer unthemed, so there is nothing to change on our side — but it is worth noting in release notes for adopters who set `data-tag`.

### 3.4 Assets

No fonts and no icons were added or removed. One material icon (`img/material-icons/cases.svg`) changed. `npm run copy:uswds-img` and `copy:uswds-fonts` need no adjustment.

## 4. Release-note claims that do not apply to us

Both of these are in the upstream notes but do not change HDS output. Recording them so nobody re-derives them later:

- **"Focus ring added to slider input."** The `range-focus` mixin and its `:focus` bindings are byte-identical between 3.13.0 and 3.14.0, and no focus-related rule appears in the compiled diff. Only the track, thumb, and fill borders changed.
- **`ink` token now references `$theme-color-base-ink` instead of `$theme-color-base-darkest`.** Our theme sets both to `'black'` (`_hds-uswds-theme.scss` lines 86 and 88), so the assignment resolves identically. Confirmed by the absence of any `color: ink` change in the compiled diff. Adopters who fork our theme and set a distinct `$theme-color-base-ink` **will** see a change.

## 5. What this changes in `docs/508.md`

`docs/508.md` records conformance against USWDS v3.13.0 and cites the USWDS ACR v3.11.0. None of the edits below should be made until the bump actually lands — the document is a dated conformance record, not a forward-looking plan.

### 5.1 Upstream issues our 508 record cites that 3.14.0 does **not** fix

Leave these as they are:

- File input focus (#5616), cited under 2.4.7 Focus Visible and 502.3.12 Focus Cursor.
- Step indicator (#5294), cited under 1.3.1 and 1.3.2.
- Input mask (#5481), cited under 3.3.1 and 3.3.3.
- Combo box / time picker / search labelling, cited under 3.3.2 and 502.3.6.
- Tooltip and button group, cited under 4.1.2, 502.3.1, and 502.3.14.
- Range slider label relationships (#6116), cited under 1.3.1 and 502.3.6. The range _hint_ (#6673) is a different issue and is markup-only.

### 5.2 Criteria whose remarks should be updated

| Criterion | Change |
| --- | --- |
| 1.4.1 Use of Color | Add the file input error border. Under our theme it was blue before 3.14.0 and red after. This is the single most consequential 508 change in the release for HDS. |
| 3.3.1 Error Identification | Same fix, stated as error identification rather than colour. |
| 1.4.11 Non-text Contrast | Add the range slider border (1px `#757575` to 2px `#1b1b1b`) and the file input error border. Both are pseudo-element-adjacent, non-text UI. |
| 1.3.1 Info and Relationships | Add the memorable date per-field hints, the date picker `aria-current="date"`, and the screen-reader-only table caption fix. |
| 3.3.2 Labels or Instructions | Add memorable date per-field hints and the range slider hint. Note the file input's changed accessible name on coarse-pointer devices. |
| 1.3.3 Sensory Characteristics | Note that the file input no longer instructs users to drag on devices where dragging is not available. |
| 2.4.3 Focus Order | Add the modal open-focus change. |
| 4.1.2 Name, Role, Value | Add the banner shadow-root `aria-controls` fix and the modal `aria-hidden` restoration. |
| 2.1.1 Keyboard | Add the language selector Escape fix. |
| 502.3.3 Row, Column, and Headers | Add the borderless row-header border restoration, noting it is masked by our own table border rule. |
| 502.3.12 / 502.3.14 | Add the modal `aria-hidden` restoration on close. |
| 1.4.10 Reflow — currently "Not yet evaluated" | Breadcrumb wrapping is now the default specifically because truncation lost content at high zoom and narrow widths (upstream issue #6689). If we keep `line-height: 1.35`, a reflow audit of the breadcrumb should be part of the bump rather than deferred again. |
| Approach + Testing Methodology | Version references move from USWDS v3.13.0 to v3.14.0, and the "Last updated" and evaluation dates move. |

### 5.3 Pre-existing inconsistencies that 3.14.0 makes harder to leave alone

These are not caused by the release, but the release touches exactly the components involved:

- **2.1.2 No Keyboard Trap** says "No modal or focus-trapping components are shipped in v1.0." The Approach section says we now ship all USWDS components as-is, and `stories/guides/USWDSForm.stories.js` renders a `usa-modal` with a focus trap. The modal focus change in 3.14.0 lands directly on this claim.
- **4.1.3 Status Messages** says "HDS Core v1.0 components do not generate status messages." `usa-character-count` does generate status messages, ships in our bundle, appears in the same form story, and is the subject of the `aria-live` fix in this release.

Both should be reconciled with the "we ship everything, we mirror the USWDS ACR for unstyled components" position already stated in the Approach section.

## 6. Testing checklist

Ordered by risk. Items 1-3 are where this release is most likely to produce a visible regression.

### 6.1 Accordion — highest risk

- Chevron position and label indent on every Accordion story, before and after setting `$theme-accordion-icon-position: 'end'`. Confirm the compiled `padding-inline-start` is `1.25rem` and `padding-inline-end` is `3.5rem`.
- All six palettes (white, light, midtone, dark, blue, black).
- **Forced-colors / High Contrast Mode.** Our `::after` chevron is `mask-image` and does not render there; we intentionally rely on the USWDS `::before`. Verify it is back on the trailing edge and not overlapping the label.
- **Banner and nav must not regress.** Our scope guard exists because of Issue #86. Verify `.usa-banner__button` and `.usa-nav__link` toggle icons are untouched, and that the new upstream modifier rules do not reach them.
- RTL, if we intend to claim support — the padding is logical now, so `[dir="rtl"]` behaviour changed.
- 200% and 400% zoom, which is the scenario driving the upstream default.
- Chromatic will flag every accordion snapshot. Expect it; review rather than bulk-accept.

### 6.2 Breadcrumb

- Wrapping at 320px width and at 200% zoom — this is the behaviour upstream changed the default for.
- Where the `/` separator lands at a wrap boundary, with `.usa-breadcrumb__list-item` now `inline-block`.
- Focus ring on a wrapped row: our `hds-focus-ring-inline` gradient paints outside the inline box, and the wrap changes the box.
- The `usa-breadcrumb--truncate` variant after retargeting the override — confirm the ellipsis works and decide what we do about the clipped focus ring.
- The `line-height: 1.35` versus upstream `1.5` decision, at wrap.
- `stories/components/Breadcrumb.stories.js` uses its own manual `…` crumb rather than USWDS truncation, so it is not directly affected — but it should still be checked at wrap.

### 6.3 Form and `stories/guides/USWDSForm.stories.js`

This one story exercises most of the release: memorable date, modal, character count, date picker, time picker, and combo box.

- Update the memorable-date markup to per-field hints, then re-run axe. The old shared-hint pattern is what the release replaces.
- Modal: confirm focus lands on the first enabled footer button on open, that content is not announced twice, and that page access is restored on close. Test closing after removing the opener from the DOM.
- Character count on **iOS VoiceOver** specifically — the fix is iOS-specific and Chromium axe cannot see it.
- Text input, textarea, select, and combo box widths after the `box-sizing` addition. Expected to be a no-op; confirm rather than assume.
- File input error state across all six palettes — this is the blue-to-red fix and it is worth an explicit screenshot for the 508 record.
- File input on a touch device or with pointer emulation: confirm the drag instruction is gone and the accessible name is "Choose from folder". **Any test asserting the old instruction string will fail.**

### 6.4 Table

- Stories using a `usa-sr-only` caption — confirm the heading-row border no longer collapses.
- Borderless tables, light and dark palettes, plus `.usa-prose > table`: confirm our border rule still masks the new `tbody th[scope=row]` border and we have not introduced a doubled line.
- Table sort focus ring, which is already a known bug (clipped by `mask-image`) — make sure the bump does not make it worse.

### 6.5 Range slider

- Non-text contrast of the new 2px `#1b1b1b` border on **all six palettes**, not just white. The track fill is `base-lightest`, which our theme maps to white, so the border should be safe everywhere — but this is exactly the kind of assumption our palette system breaks.
- Thumb centering at the new `margin-top: -0.25rem` in Chromium, Firefox, and Safari, since each engine uses a different pseudo-element.

### 6.6 Build and gate regressions

- `npm run check:uswds` **will fail.** The baseline in `scripts/uswds-package-hashes.txt` covers `uswds-core`, `usa-accordion`, `usa-breadcrumb`, `usa-table`, `usa-pagination`, and `uswds-form-controls` — all of which changed. Review the diff, then regenerate the baseline as the script instructs.
- `npm run check:css-hash` will fail, partly on real changes and partly on upstream comment typo fixes. Diff before regenerating.
- `npm run check:uswds-core` — confirm `uswds-core` still emits no CSS after the Sass module migration.
- `npm run check:api-snapshot` and `npm run check:tokens` — expected clean, since no HDS token or public symbol changes. Confirm.
- `npm test` — the full axe suite. Pay attention to any story whose accessible names changed (file input especially).
- `npm run test:visual` — Chromatic. Accordion and breadcrumb will dominate the diff.
- `test-uswds-js.html` — smoke-test the re-copied `dist/js/uswds.min.js`. It exercises date picker, time picker, and combo box, all of which have JS changes in this release.
- Verify the build on Dart Sass 1.99.0 as well as our pinned version, to confirm the floor.

## 7. Suggested sequencing

1. Bump `@uswds/uswds` to `^3.14.0` in `peerDependencies` and refresh the lockfile.
2. Add `$theme-accordion-icon-position: 'end'` to both theme files, or take the design call to adopt `"start"`.
3. Retarget the breadcrumb override to `:not(.usa-breadcrumb--truncate)`.
4. Decide on `--icon-start` / `--icon-end` support and on the breadcrumb line-height.
5. Update `stories/guides/USWDSForm.stories.js` memorable-date markup.
6. Regenerate `scripts/uswds-package-hashes.txt` and `scripts/css-output-hash.txt` after reviewing both diffs.
7. Run the checklist in section 6; capture the file input error-state screenshots for the 508 record.
8. Update `docs/508.md` per section 5, including the two pre-existing inconsistencies.
9. Document the Dart Sass >= 1.99.0 floor for the Sass consumption path.
10. Changeset: this is a minor bump at minimum. The accordion and breadcrumb behaviour changes are visible to adopters even though no public Sass symbol changes, so the changeset description matters more than the bump level here. Check the semver rubric in CONTRIBUTING.md.

## 8. Direction signals — where USWDS appears to be heading

The 3.14.0 release notes contain **no** roadmap, "what's next", deprecation, or component-retirement section. Everything below is inferred from the shipped code, cross-checked against maintainer statements on the USWDS repo. Kept separate from the rest of this document because it is read-the-tea-leaves work, not verified impact.

### 8.1 What maintainers have actually said about Sass

The clearest public statement is from a USWDS maintainer in the [April 2024 monthly call Q&A](https://github.com/uswds/uswds/discussions/5922) (finekatie, 2024-05-10):

> "Yes, in the short term we will continue to use Sass to style our traditional HTML components."

> "Long-term, we'll be looking at ways to use more native CSS to reduce dependence on custom processors."

> "We see Web Components existing at the same time as the current Version 3 of USWDS."

> "JSON design tokens are an important part of the shift to Web Components."

Earlier, in [Modern CSS and standards compliance](https://github.com/uswds/uswds/discussions/4312) (mejiaj, 2021-09-29):

> "The re-work of dropping SCSS in favor of PostCSS or plain CSS isn't justifiable right now."

So the direction is real but explicitly long-term, parallel rather than replacing, and no version number has ever been attached to it. Nothing in 3.14.0 changes that posture.

### 8.2 Signals that are real in 3.14.0

- **Logical properties.** Occurrences of `padding-inline-*` / `inset-inline-*` / equivalents across all package Sass go from **1 in 3.13.0 to 25 in 3.14.0**, concentrated in the accordion rewrite, along with `text-align: start` and explicit `[dir="rtl"]` handling. This is the most substantive modern-CSS movement in the release and it points at internationalisation as much as at CSS modernisation. Relevant to us: our own components are still written in physical properties.
- **Dependency reduction.** `receptor` is dropped entirely and its `keymap` reimplemented first-party in `uswds-core/src/js/utils/keymap.js`; `lit` moves from `^3.2.1` to a pinned `3.3.3`. Fewer, tighter runtime dependencies.
- **Toolchain modernisation.** Storybook 6.5 to 9, gulp 4 to 5, ESLint 8 to 10, `engines.node` from `>= 4` to `>= 20`, and `_functionsOLD.scss` deleted. A maintenance-debt sweep, which usually precedes larger work.

### 8.3 Signals that look like direction but are not

- **The `if(sass(...))` migration is forced, not chosen.** Dart Sass deprecated three-argument `if()` in 1.95.0. This is compliance work, not a step toward native CSS.
- **`map-merge` to `map.merge` is also forced** — Sass global functions have been deprecated for years.
- **Web components did not advance.** `dist/components/` still contains `usa-banner` and nothing else, and `vite.config.components.js` is byte-identical between 3.13.0 and 3.14.0. The banner bundle changed only because the underlying banner JS changed. Whatever the web component plan is, 3.14.0 does not move it.
- **USWDS still does not use cascade layers.** No `@layer` anywhere in the package Sass. Our layer architecture remains entirely ours, which is good news for override stability but means we get no help from upstream on it.
- **They are still investing in the Sass settings API.** 3.14.0 _adds_ a setting (`$theme-accordion-icon-position`). Systems preparing to abandon a configuration surface do not keep extending it.

### 8.4 Components with known accessibility issues are being repaired, not retired

This is the most directly useful finding for us, and it runs opposite to the concern. Of the ten components `docs/508.md` currently flags as "Partially Supports" on the strength of USWDS ACR issues, **seven were modified in 3.14.0**:

| Component         | Touched in 3.14.0            |
| ----------------- | ---------------------------- |
| Range slider      | yes — styles, JS, and markup |
| Combo box         | yes — styles and JS          |
| Time picker       | yes — styles and JS          |
| File input        | yes — styles and JS          |
| Character count   | yes — JS                     |
| Language selector | yes — JS                     |
| Tooltip           | yes — JS                     |
| Step indicator    | no                           |
| Input mask        | no                           |
| Button group      | no                           |

No package was added or removed in this release, and no component was marked deprecated. The one deprecation that did happen — `usa-breadcrumb--wrap` — was handled by keeping the class as an inert no-op with a source comment.

That deprecation is worth noting for a different reason: **it was not announced through the `_notifications.scss` channel**, which is the mechanism that prints upgrade guidance during our Sass build. The 3.14.0 notification block describes the breadcrumb change as breaking and tells teams to add `--truncate`, but never says the word "deprecated" about `--wrap`. We cannot treat that build-time channel as a complete deprecation feed; source diffing stays necessary at each bump.

One older signal, unchanged in this release and therefore not a 3.14.0 finding: `packages/_usa-password/` ships in the tarball but is referenced by no index and emits zero bytes into the compiled CSS. That appears to be how USWDS shelves a component — leave it in the tree, unwired.

### 8.5 What this means for us

- No action from this section. Nothing here needs to change in HDS today.
- The thing to watch is **JSON design tokens**, not Sass removal. If USWDS ships a token layer, our `tokens.json` and Style Dictionary pipeline is the part of HDS most likely to want to interoperate with it, and we would want to be in that conversation early rather than reconciling two token contracts later.
- Our exposure to any eventual Sass exit is bounded by which consumption path adopters use. The compiled-CSS path (`./css`) is insulated; the Sass path (`./scss`) is not. Knowing the split across our adopters would make that future decision much cheaper, and we do not currently track it.
- Practically, revisit this section at each USWDS minor. The signal in 3.14.0 is "steady maintenance and accessibility repair", not "imminent architectural change".

## References

- [USWDS v3.14.0 release notes](https://github.com/uswds/uswds/releases/tag/v3.14.0)
- [USWDS accessibility documentation and ACR](https://designsystem.digital.gov/documentation/accessibility/)
- `docs/508.md` — HDS Core Section 508 conformance record
- `docs/DESIGN.md` — intentional deviations from USWDS and Figma
- `docs/ARCHITECTURE.md` — cascade layer architecture and build pipeline
