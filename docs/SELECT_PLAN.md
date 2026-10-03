# Select — discovery findings and plan

Working document, written to be carried out in one thread or split into issues (§7). It replaces the earlier `SELECT_SPEC_ANALYSIS.md` draft and supersedes its sequencing. Once the issues are filed, the durable conclusions belong in `components/_form.scss` headers and `stories/components/Select.mdx`, and this file can be deleted.

- **Analysed:** 2026-10-03, against `main` at `9ccf235` (USWDS 3.14.0)
- **Method:** all nine Figma nodes viewed (screenshots plus `get_design_context`); compiled `dist/css/hds.min.css` measured and prototyped in Chromium 141 via Playwright; USWDS 3.14.0 source and USWDS `develop` (2026-10-01) read directly; browser support checked against WebKit release notes, MDN, caniuse and Mozilla Bugzilla.

## 1. What changed from the earlier draft

| Earlier claim | Status | Notes |
| --- | --- | --- |
| Chevron invisible on dark, blue, black (G1) | ✅ Confirmed | Rendered: black glyph on black field. |
| Chevron is `unfold_more`, 8px inset (G2, G3) | ✅ Confirmed | Computed `background-position: right 8px`. |
| Hover is a no-op on midtone, dark, black (G4) | ✅ Confirmed | Border and hover border resolve to the same colour. |
| Label gap 8px, value line-height 16.9px, hint 14.4px (G5, G6) | ✅ Measured, but reframed | Per `AGENTS.md` → When sources conflict, Figma is _not_ authoritative for components HDS already ships. These are design questions, not defects. See §6. |
| Forced colors keeps 48px right padding (G10) | ✅ Confirmed |  |
| Baseline was `docs/pre-v1-cleanup`, with `docs/DESIGN.md` | ❌ Stale | Neither exists on `main`. The `DESIGN.md` corrections are moot; the `Select.mdx` ones still apply. |
| `base-select` ships in Chrome 135+ and Safari 27; Firefox is behind a flag | ✅ Confirmed | Safari 27 shipped 2026-09-17. See §3. |
| `<select multiple>` has no base appearance | ❌ Outdated | Chromium 145 ships `appearance: base-select` for listbox and multiple selects. |
| Panels wait for the navigation epic (tier 4) | ❌ Reversed | For single select and the utility trigger, the panel _is_ the browser's picker; nothing is shared with nav except visual tokens. See §5. |
| The utility button is a trigger with nothing to trigger | ❌ Reframed | In every Figma use it chooses one value (a time zone), so it is a `<select>`. See §4.3. |
| Figma `role=button` conflicts with the APG | Moot for select | A native `<select>` keeps its own semantics under `base-select`. This only matters for the popover multiselect (§4.4). |
| USWDS JS is involved in select | ❌ No | USWDS ships **no** JavaScript for `.usa-select`. See §2. |

## 2. What USWDS does, and is doing, with selects

- `packages/usa-select` is CSS only: `appearance: none`, an `unfold_more` background image at `right units(1)`, and `padding-right: units(4)`. Nothing in `uswds.min.js` touches a plain `.usa-select`.
- The only USWDS script that touches a `<select>` is `usa-combo-box` (and `usa-time-picker`, which is a combo box). It hides the select (`aria-hidden`, `tabindex=-1`, `usa-sr-only`) and builds an `<input>` plus a `<ul role="listbox">` in its place.
- USWDS `develop` as of 2026-10-01 has **no** use of `base-select`, `::picker`, popover or anchor positioning anywhere. `.usa-select` is byte-identical to 3.14.0. HDS would be ahead of upstream here, and the enhancement must not depend on USWDS following.
- Relevant open or recent USWDS issues:
  - [#6245](https://github.com/uswds/uswds/issues/6245): option panel renders differently on Windows and macOS. Closed with no styling fix. This is exactly what `base-select` removes.
  - [#6605](https://github.com/uswds/uswds/issues/6605): select `padding-right` overlaps containers. Closed, but the padding is still on `develop`.
  - [#5595](https://github.com/uswds/uswds/issues/5595): CC accessibility audit of Select. Closed.
  - [#3978](https://github.com/uswds/uswds/issues/3978): combo box has no error styling.
  - [#6424](https://github.com/uswds/uswds/issues/6424): combo box clear-button focus outline is wrong.
  - [#5905](https://github.com/uswds/uswds/issues/5905): combo box and time picker screen-reader announcements are verbose.
  - [#5787](https://github.com/uswds/uswds/issues/5787): iOS keyboard not dismissed after choosing a combo box option.
  - [#6193](https://github.com/uswds/uswds/issues/6193): combo box rebuilds its list on every open.
  - [#151](https://github.com/uswds/uswds/issues/151): multi-select dropdown, requested since 2015 and never built.

The combo box issues are why §4.5 stays deferred: restyling it inherits these behaviour bugs.

## 3. Platform status, October 2026

| Feature | Chrome / Edge | Safari | Firefox | Use in this plan |
| --- | --- | --- | --- | --- |
| `appearance: base-select`, `::picker(select)`, `::picker-icon`, `::checkmark`, `:open` | 135+ | 27+ (macOS and iOS, 2026-09-17) | Behind `dom.select.customizable_select.enabled`; meta bug [1944403](https://bugzilla.mozilla.org/show_bug.cgi?id=1944403) about 19/27 done | Single-select panel, utility select |
| `base-select` on listbox / `multiple` | 145+ | Not confirmed | No | Optional multiselect route |
| CSS anchor positioning | 125+ | 26+ | 147+ (Baseline, Jan 2026) | Popover panel placement |
| Popover attribute | Baseline 2024 |  |  | Multiselect panel |
| Invoker commands (`commandfor`) | 135+ | 26.2+ | 144+ (Baseline) | Optional; `popovertarget` is enough |
| `field-sizing: content` | 123+ | 26.2+ | 152+ (Baseline, Jun 2026) | Utility select sizing in the fallback |
| `:has()` | Baseline 2023 |  |  | Placeholder colour |

caniuse puts `base-select` at about 72% global usage. A browser that does not recognise the value ignores the declaration and renders the existing styled native select, so the fallback is today's control, not a broken one.

**Not yet verified, must be done on devices before shipping §4.2:**

- Whether iOS 27 Safari and Chrome Android render the custom picker or keep their native sheets under `base-select`.
- VoiceOver, NVDA and JAWS announcements.
- Firefox with the pref turned on.

## 4. Findings by surface, with prototypes

All prototypes are CSS only, loaded after `hds.min.css` in the same `hds-components` layer, with the **existing story markup unchanged** (no `<button>` or `<selectedcontent>` children). Keeping the markup unchanged also sidesteps MDN's SSR and hydration warning, which applies to the new child markup, not to the CSS.

### 4.1 Select field: every browser (fixes a WCAG 1.4.11 failure)

Prototyped and verified on all six palettes with `base-select` disabled:

- A single chevron (`arrow-chevron-down`, 10px glyph in a 20px box) at Figma's 16px inset. Because the fallback is a `background-image`, the glyph colour must be baked into a data URI per palette (C80 on light, C20 on dark). The palettes do not set `color-scheme`, so `light-dark()` cannot drive it.
- `padding-right` is 46px (16 + 20 + 10 gap) instead of 48px. Restore `padding-right` to 16px under `forced-colors` (G10).
- `.usa-select:has(option[value='']:checked)` colours the "- Select -" prompt `--hds-palette-disabled`. This delivers the visual half of Figma's Placeholder state without moving the label inside the field, which Select.mdx forbids.

### 4.2 Select field: progressive enhancement with `base-select`

Wrapped in `@supports (appearance: base-select)`. Verified in Chromium 141:

- **Closed field:** `::picker-icon` is a masked `arrow-chevron-down` in `currentColor`, so it follows palettes with no per-palette asset, and rotates 180° on `:open`.
- **Panel (`::picker(select)`):** palette background, no border or radius, `padding: 16px 0`, Figma shadow `0 0 20px rgb(0 0 0 / 10%)`, opening 4px below, `inline-size: anchor-size(inline)`, capped at `min(334px, 50dvh)` and scrolling. The UA's built-in `position-try` flips the panel above the field when there's no room below; this was observed in testing.
- **Options:** Inter 14/19, −0.25px, `min-block-size: 32px`, `padding: 0 24px` vertically centred. They **wrap** rather than clip, which settles the old 32px-versus-wrapping question in favour of a minimum height.
- **Selected option:** NASA Blue text on light, Blue Tint on dark (Blue on black is only 4.1:1 for text), plus `::checkmark` as the non-colour indicator WCAG 1.4.1 needs. Figma has no checkmark; this is an addition.
- **Hover and keyboard focus:** not drawn in Figma. The proposal is a C05 or C90 row fill, with an HDS dashed inset ring on `option:focus-visible`. Final version should use the `hds-focus-ring` mixin, not the prototype's outline. The `::before` and `::after` pseudo-elements the mixin renders through are allowed on options.
- **Keyboard:** Enter, arrows and Esc worked natively. Focus moves into the options while the picker is open.
- **Dark palettes:** the picker inherits `--hds-palette-*` from the select, so it themes for free. On dark, the shadow is invisible, so the prototype adds a 1px C60 ring.
- **Forced colors (new finding):** masked icons paint with `background-color`, which forced colors overrides, so the chevron and checkmark **vanish** without `background-color: CanvasText; forced-color-adjust: none`. The panel also loses its edge because box-shadow is dropped, so it needs a `CanvasText` border.
- **Motion:** a 120ms opacity fade on open, using `@starting-style` and `allow-discrete`, gated on `prefers-reduced-motion: no-preference`.

### 4.3 Utility select (Figma `11866:10756`, NASA TV `6713:188568` and `6736:193435`)

The NASA TV time-zone control picks one value from a list, and the Figma layer for its panel is literally named "Select". Built as `<select class="usa-select--utility">` with a visually hidden label:

- **Closed, every browser:** Inter Bold 11px uppercase, C60 text, circle-down icon, C90 on hover, and a 1px dashed `--hds-palette-focus` border on focus. This matches Figma pixel-for-pixel. The fallback select sizes to its widest option, so the icon drifts right; `field-sizing: content` (Baseline since June 2026) fixes this and needs verifying in the real build.
- **Open, with `base-select`:** a 260px panel, items `padding: 8px 24px` with wrapping, the selected item blue, and the icon swapping to circle-up on `:open`. Keyboard choice was verified.
- **Without `base-select`:** the OS list, exactly like today's selects.

This needs no JavaScript, no nav work, and no `role=button` trigger.

### 4.4 Multiselect panel (Figma `2339:122290`)

Prototyped as a trigger `<button popovertarget>` and an `[popover]` panel holding a `fieldset` of existing `.usa-checkbox` items. The panel is anchor-positioned under the trigger with `flip-block`. It needs zero JS: light dismiss, Esc and focus return to the trigger all worked. Browsers expose the expanded state on `popovertarget` invokers, so no `aria-expanded` attribute is needed; confirm this with a screen reader.

Caveats:

- This is the disclosure pattern, not a listbox, so it needs its own Guidance page and an a11y review.
- A filter panel usually needs an "Apply" or live-update story, and that behaviour belongs to the adopter.
- The alternative is `<select multiple>` with `base-select` (Chromium 145+, Safari unconfirmed). It is a listbox with no panel, and its fallback is the native multi-select that Select.mdx tells authors to avoid. Not recommended yet.

Net-new, so `hds-` prefix (working name `.hds-menu-panel`).

### 4.5 Inline search panel (Figma `2339:125646`)

Filtering is behaviour, so this is the USWDS combo box, which HDS already ships unthemed: dividers, 1px border, separator and clear button, all visible in the test screenshot. Restyling is in scope, but it inherits the USWDS bugs in §2. **Defer until a consuming site needs it**, then reuse the panel surface from §5.

## 5. The shared "panel surface"

What nav, date picker, combo box and the multiselect share with Select is the **visual surface**, not the mechanism:

- background
- shadow
- padding
- item metrics
- selected and hover treatment

Define it once now, while building §4.2, as an internal Sass mixin (for example `hds-panel-surface`) plus a shadow token. Nav later _consumes_ it. This reverses the earlier draft's dependency.

Shadow values to reconcile in that token decision:

| Value                        | Where                                                         |
| ---------------------------- | ------------------------------------------------------------- |
| `0 0 20px rgb(0 0 0 / 10%)`  | Select and search panels                                      |
| `0 0 10px`                   | Multiselect panel; almost certainly Figma drift               |
| `0 2px 8px rgb(0 0 0 / 10%)` | `.hds-btn-icon--interactive`, already shipped and untokenised |

## 6. Form-system questions (not Select work)

G4, G5, G6 and G9 come from `_form.scss` rules shared by `.usa-input`, `.usa-textarea` and every unthemed USWDS form control.

- **G4 (hover no-op):** the one that is arguably a bug, because the SCSS comment states an intent the tokens do not deliver.
- **G5, G6, G9:** places where shipped HDS differs from the old Figma. Per `AGENTS.md`, the implementation is the source of truth, so these need a design decision before anyone "fixes" them.

Comparing against the Text Field and Textarea Figma frames would still help. The design-system search finds them, but returns no node IDs, so links are needed.

## 7. Plan: issues to file, in dependency order

| # | Issue | Size | Depends on | Needs a decision? |
| --- | --- | --- | --- | --- |
| 1 | **Select chevron: palette-aware single chevron, 16px inset, forced-colors padding; placeholder colour via `:has()`** | S | — | Name of the palette property for the icon (public API) |
| 2 | **Select: customizable-select enhancement (`base-select`)**, with forced-colors and reduced-motion handling, Storybook open-state stories, and a manual Safari 27 / iOS / Android / screen-reader pass | M | 1 | Option hover and focus, checkmark, dark-palette panel edge (propose in Storybook; non-blocking) |
| 3 | **Panel surface mixin and elevation/shadow token** (land inside #2, promote later) | S | — | Shadow value(s) |
| 4 | **`.usa-select--utility` variant** (NASA TV trigger) | S | 1, 2, 3 | 11px size token versus 12px |
| 5 | **Select.mdx and `_form.scss` doc corrections**: the Figma note (square corners, blue text, not a highlight), "requires JavaScript" (now false), combo box "deferred" wording, and recording the chevron defect | XS | ships with 1 or 2 | — |
| 6 | **Remove `select` from the `base/_focus.scss` baseline ring or annotate it** (G11); re-check under `base-select` | XS | 2 | — |
| 7 | **Form-system pass**: hover no-op (G4), then the design calls on gap, line-height and dark border (G5, G6, G9) | M | design input; Text Field and Textarea Figma links | Yes, form-wide |
| 8 | **Multiselect filter panel** (`hds-` popover + anchor) | M | 3 | Pattern and a11y review; whether HDS wants it at all |
| 9 | **Combo box restyle** (inline search) | M–L | 3 | Defer until a site needs it |

Issues 1, 5 and 6 can ship together immediately. Issue 2 can start in parallel and ship as soon as the decisions it surfaces are settled in Storybook. Select can stay `status:experimental` through #2; nothing here blocks on navigation.

## 8. Testing notes for issues 1 to 4

- **Chromatic:** add dark-palette snapshots of the closed select, so a missing chevron diffs. Axe does not check background-image contrast.
- **Open state:** a play function that opens the picker gives a snapshot of the panel in Chromium. Safari 27 and Firefox fallback need a manual pass.
- **Forced colors:** Playwright `emulateMedia({ forcedColors: 'active' })` covers both the icon and the panel edge.
- **Regression:** unthemed form controls sharing `%block-input-styles` are untouched by issues 1 to 4; only issue 7 moves them.

## Sources

- [WebKit — Safari 27.0 features](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)
- [MDN — Customizable select elements](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select)
- [MDN — Customizable select listboxes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select_listboxes)
- [caniuse — appearance: base-select](https://caniuse.com/mdn-css_properties_appearance_base-select)
- [Mozilla Bugzilla 1944403 — customizable select](https://bugzilla.mozilla.org/show_bug.cgi?id=1944403)
- [web.dev — New to the web platform in January 2026](https://web.dev/blog/web-platform-01-2026) (anchor positioning Baseline)
- [web.dev — Interop 2026](https://web.dev/blog/interop-2026)
- [InfoQ — HTML invoker commands Baseline](https://www.infoq.com/news/2026/01/html-invoker-commands)
- [web.dev — New to the web platform in June 2026](https://web.dev/blog/web-platform-06-2026) (`field-sizing` Baseline)
- USWDS issues linked in §2

Figma nodes (file `OgBf9j69tvB1GMFvaqdON1`):

| Node           | Contents                 |
| -------------- | ------------------------ |
| `2295-182682`  | Select Field             |
| `12402-179757` | Expanded field and panel |
| `2339-124514`  | Menu: select             |
| `2339-122290`  | Menu: multiselect        |
| `2339-125646`  | Menu: search             |
| `11866-10756`  | Utility button           |
| `6736-193435`  | NASA TV, open            |
| `6713-188568`  | NASA TV, closed          |
| `1142-0`       | Accessibility            |
