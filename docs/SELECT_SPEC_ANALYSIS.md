# Select — HDS spec gap analysis

Point-in-time analysis of the Select component as shipped in `@nasa-hds/core` today, measured against the HDS Figma library. This is a working document for planning, not a standing reference like [DESIGN.md](DESIGN.md) or [ARCHITECTURE.md](ARCHITECTURE.md). Once the gaps below are triaged into issues, the durable conclusions belong in `DESIGN.md` and the component's Guidance page, and this file can go.

- **Analysed:** 2026-09-04, against `docs/pre-v1-cleanup` (`2560f7c`)
- **Component status:** `status:experimental` (`stories/components/Select.stories.js`)
- **Verification method:** Figma MCP (`get_design_context` / `get_variable_defs`) for the spec; compiled `dist/css/hds.min.css` plus computed styles in headless Chromium for the implementation. Claims marked ⚠️ are unverified or need a design decision.

## 1. Scope: "Select" is four surfaces, not one

The Figma links group four distinct things under the Select story. HDS Core ships **one** of them.

| Surface | Figma node | Shipped today |
| --- | --- | --- |
| Select field, closed (6 states × 2 backgrounds) | `2295:182682` | Yes — `.usa-select` in `src/scss/components/_form.scss` |
| Dropdown menu panel (single-select) | `2339:124514`, `12402:179757` | No |
| Dropdown menu panel (multiselect) | `2339:122290` | No |
| Dropdown menu panel (inline search) | `2339:125646` | No |
| Utility button (text + chevron trigger) | `11866:10756`, `6713:188568`, `6736:193435` | No |
| Keyboard / ARIA contract | `1142:0` | Partially — inherited from native `<select>` |

The gap is therefore not "polish the select field." Three of the four surfaces do not exist in the codebase at all, and the one that does has defects independent of them. Sections 5–8 separate those concerns so they can be scheduled independently.

## 2. What ships today

| Concern | Location |
| --- | --- |
| Field box, focus, hover, disabled, error | `src/scss/components/_form.scss` (lines 106–170, 400–475) |
| Baseline focus ring on `select` | `src/scss/base/_focus.scss` |
| Palette tokens the field consumes | `src/scss/base/_palettes.scss` |
| USWDS theme settings | `src/scss/_hds-uswds-theme.scss` |
| Stories | `stories/components/Select.stories.js` (Default, All Variants, 6 doc-only, 2 palette a11y, 1 focus) |
| Guidance | `stories/components/Select.mdx` |
| Public API entries | `public-api.snapshot.txt` — `.usa-select`, `.usa-hint`, `.usa-error-message`, `.usa-form-group--error`, `.usa-form-group--disabled` |

There is no `_select.scss`; Select is styled inside `_form.scss` alongside the other form controls. Everything except the chevron is an HDS override in `@layer hds-components` over the USWDS `.usa-select` defaults in `@layer uswds`.

## 3. The Figma spec, extracted

### 3.1 Select field (`2295:182682`)

Frame layout: 295px wide, vertical stack, **4px gap** between label, field, and help text.

Field box: `padding: 14px 16px`, `border-radius: 2px`, 10px gap between the value text and the icon, icon is a 10×10 chevron-down centred in a 20×20 box.

Type:

| Element           | Figma                                  |
| ----------------- | -------------------------------------- |
| Label             | Inter SemiBold 14 / 19, `-0.25px`      |
| Field value       | Public Sans Regular 14 / 20, `0`       |
| Placeholder value | Inter SemiBold 14 / 19, `-0.25px`      |
| Help text         | Public Sans Regular 12 / 16, `+0.25px` |
| Error message     | Public Sans Regular 12 / 16, `+0.25px` |

Colors, by state and background:

| State | Border (light) | Border (dark) | Fill (light) | Fill (dark) | Value (light) | Value (dark) |
| --- | --- | --- | --- | --- | --- | --- |
| Default | C20 `#D1D1D1` | C80 `#2E2E32` | White | Black | C80 | C20 |
| Placeholder | C20 | C80 | White | Black | C40 `#959599` | C40 |
| Hover | C40 `#959599` | C60 `#58585B` | White | Black | Black `#000000` | White `#FFFFFF` |
| Focus | Blue `#1C67E3`, 2px | Blue Tint `#288BFF`, 2px | White | Black | C80 | C20 |
| Disabled | C20 | C80 | C05 `#F6F6F6` | C90 `#17171B` | C40 | C60 |
| Error | Red `#F64137` | Red Tint `#FF5C52` | White | Black | C80 | C20 |

Label: C80 light / C20 dark; C40 / C60 when disabled. Help text: C60 light / C40 dark; C40 / C60 when disabled. Error row: 20px icon + text, `gap: 8px`, **vertically centred**; text Red Shade `#B60109` light / Red Tint `#FF5C52` dark.

Two structural notes that are easy to miss:

- The **Placeholder** variant has **no label above the field** (frame height 68px versus 91px for the others). The label text moves inside the field as the placeholder. This is a distinct layout, not just a text color.
- **Hover shifts the value text**, not only the border — to pure black on light and pure white on dark.

### 3.2 Dropdown menu panel (`2339:124514`, in context `12402:179757`)

- Panel: white fill, `padding: 16px 0`, `overflow: clip`, **no border, no border radius**, `box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)`
- Panel width matches the field (295px in the expanded example); anchored to the field's left edge, opening ~4px below it and painting over the help text
- Items: fixed **32px** height, `padding: 0 24px`, vertically centred
- Item type: Inter Regular 14 / 19, `-0.25px`
- Item color: C90 `#17171B`; **selected item is NASA Blue `#1C67E3` text** — there is no fill highlight and no rounded corner on the item
- **No hover state and no keyboard-focus state are drawn for menu items anywhere in the file**

### 3.3 Multiselect panel (`2339:122290`)

- Panel: white fill, `padding: 24px`, `box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)` — note **10px blur, not 20px**, unlike every other panel in the set
- Rows: 182px wide, `padding: 8px 8px 8px 0`, 8px gap, top-aligned
- Checkbox: 18×18, white fill, 1px C40 `#959599` border, `border-radius: 2px`
- Row label: Inter Regular 14 / 19, `-0.25px`, C80 `#2E2E32`

The checkbox itself matches what `_form.scss` already ships for `.usa-checkbox` (18px, 2px radius, `--hds-palette-control-border` = C40 on light). Only the panel is new.

### 3.4 Inline search panel (`2339:125646`)

- Panel: white fill, 300px × 88px, `box-shadow: 0 0 20px rgba(0, 0, 0, 0.1)`
- Search row inset 24px from the left, 251px wide, with a 1px C20 `#D1D1D1` bottom rule
- 16px search icon at the left, text offset 28px
- Placeholder: Inter Regular 14 / 19, `-0.25px`, C40 `#959599`

This is a filter field that sits inside a menu panel; it is not the site search component.

### 3.5 Utility button (`11866:10756`)

The trigger used for menus that are not form fields — the NASA TV timezone picker (`6736:193435`) is the worked example.

- Layout: inline flex, `gap: 4px`, centred; 14px `arrow-circle-down` icon
- Type: Inter **Bold 11** / 19, `+0.25px`, uppercase
- Text: C60 `#58585B` light / C30 `#B9B9BB` dark; hover C90 `#17171B` light / C05 `#F6F6F6` dark
- Focus: **1px dashed border**, C60 light / C30 dark, no offset and no padding shown
- When the menu is open the icon flips to `arrow-circle-up` (`6736:193556` uses the up glyph)

In context (`6736:193557`) the attached panel is 260px wide with `padding: 16px 0` and items at `padding: 8px 24px` — items wrap to two lines rather than being clipped to a fixed 32px row. That contradicts the fixed-height rows in §3.2; see §10.

### 3.6 Accessibility frame (`1142:0`)

Stated contract, verbatim:

> **Keyboard Navigation.** Users can open the dropdown menu by pressing SPACE, ENTER/RETURN, or the DOWN ARROW key when focus is on the dropdown menu field. Users can cycle through the options within the dropdown menu using the DOWN ARROW and UP ARROW keys. Users can make a selection within the dropdown menu and close the menu by pressing SPACE or ENTER/RETURN. Users can close the dropdown menu without making or changing the menu selection by pressing ESC.
>
> **ARIA Roles.** The element that opens the menu has `role=button`. Menu items should be reported to the screen reader.

## 4. How the shipped field measures up

Computed styles from headless Chromium against `dist/css/hds.min.css`, palette `white` unless noted:

| Property | Figma | Measured | Verdict |
| --- | --- | --- | --- |
| Field padding | `14px 16px` | `14px 48px 14px 16px` | Right padding intentionally widened for the icon |
| Border radius | 2px | 2px | Match |
| Border width / color (default) | 1px C20 | 1px `#D1D1D1` | Match |
| Value font | Public Sans 14 / 20, ls 0 | Public Sans Web 14.08 / **16.9**, ls 0 | Line-height off by 3.1px |
| Value color | C80 | `#2E2E32` | Match |
| Field height | ~48px | **46.9px** | Follows from the line-height |
| Label → field gap | **4px** | **8px** | Mismatch |
| Field → help gap | 4px | 4px | Match |
| Label type | Inter 600 14 / 19, `-0.25px` | 14 / 18.9, 600, `-0.14px` | Letter-spacing off by 0.11px |
| Help type | Public Sans 12 / 16, `+0.25px` | 12 / **14.4**, `+0.3px` | Line-height off by 1.6px |
| Help color | C60 | `#58585B` | Match |
| Focus border | 2px, Blue light / Blue Tint dark | 2px, Blue light / **Blue** dark | Dark palettes deviate (see G8) |
| Chevron glyph | single chevron-down, 10×10 in 20×20 | USWDS `unfold_more` double arrow, 20×20 | Mismatch |
| Chevron inset from right edge | 16px | **8px** | Mismatch |
| Placeholder state | distinct type + no label | not implemented | Missing |
| Error icon | 20px, row vertically centred | 18px, row top-aligned | Deviation, partly deliberate |

Hover border, measured on all six palettes:

| Palette | Field fill | Default border | Hover border  | Hover visible?                            |
| ------- | ---------- | -------------- | ------------- | ----------------------------------------- |
| white   | `#FFFFFF`  | C20 `#D1D1D1`  | C40 `#959599` | Yes                                       |
| light   | `#FFFFFF`  | C20 `#D1D1D1`  | C40 `#959599` | Yes                                       |
| midtone | `#FFFFFF`  | C40 `#959599`  | C40 `#959599` | **No**                                    |
| dark    | `#000000`  | C60 `#58585B`  | C60 `#58585B` | **No**                                    |
| blue    | `#000000`  | C40 `#959599`  | C60 `#58585B` | Yes, but contrast **drops** 7.0:1 → 3.0:1 |
| black   | `#000000`  | C60 `#58585B`  | C60 `#58585B` | **No**                                    |

## 5. Gap analysis A — the select field

### G1. The dropdown chevron is invisible on three of six palettes — blocker

`.usa-select` inherits its icon from USWDS as a `background-image`:

```css
.usa-select {
  background-image: url(../assets/img/usa-icons/unfold_more.svg), linear-gradient(transparent, transparent);
  background-position: right 0.5rem center;
  background-size: 1.25rem;
}
```

`dist/assets/img/usa-icons/unfold_more.svg` has no `fill` attribute, so it paints black and, being a raster-positioned background image rather than a mask, cannot follow `--hds-palette-*`. `_form.scss` overrides `background-color` to `var(--hds-palette-input-bg)`, which resolves to `#000000` on the dark, black, and blue palettes. The result is a black glyph on a black field.

Verified by rendering: on dark, black, and blue the select has **no visible dropdown affordance at all** and is indistinguishable from a text input. Contrast is 1:1, failing WCAG 1.4.11 for a meaningful graphic, and arguably 1.3.1 as well since the control's type is conveyed only by that icon.

`_form.scss` line 128 describes this as "Currently uses USWDS default arrow," and `DESIGN.md` files it under "Deferred to Phase 2+." Neither records that the icon disappears entirely on half the palettes. This should be reclassified from deferred polish to a bug.

The fix does not need JavaScript or a custom dropdown. `<select>` cannot carry pseudo-elements, so a CSS mask is out, but a per-palette `background-image` with an inline data-URI chevron (the same technique `_form.scss` already uses for `$hds-checkbox-icon`) works: one declaration in each `.hds-palette-*` block, or a single rule keyed off a `--hds-palette-select-chevron` custom property. ⚠️ Adding such a property is a permanent public-API commitment; see `docs/COMPONENTS.md` → Palette custom properties.

### G2. The chevron is the wrong glyph

Figma specs a single chevron-down; HDS ships USWDS `unfold_more`, a stacked up-and-down pair that reads as "sortable," not "opens a menu." `src/assets/img/hds-icons/arrow-chevron-down.svg` already exists and uses `fill="currentColor"`. Fixing G1 and G2 is one change.

### G3. The chevron sits 8px from the right edge, not 16px

`background-position: right 0.5rem center` is USWDS's, and `_form.scss` overrides only `padding-right`. Figma puts the icon inside the field's own 16px padding. The current 48px right padding also leaves a ~20px dead gap between the end of the value text and the icon, where Figma specs 10px.

### G4. Hover is a no-op on three palettes and a contrast regression on a fourth

`.usa-select:hover` moves the border from `--hds-palette-border` to `--hds-palette-control-border`. Those two properties hold the **same value** on midtone (both C40), dark (both C60), and black (both C60) — see `base/_palettes.scss` lines 62/74, 110/130, 192. On the blue palette they are inverted relative to the surface: the border goes from C40 to C60, which on the black field fill drops contrast from 7.0:1 to 3.0:1.

Only white and light behave as Figma intends. This affects `.usa-input` and `.usa-textarea` identically, since they share the rule — it is a form-wide defect surfaced by Select, not a Select-only one.

The `_form.scss` comment at line 155 says the dark path should be "C80 → inferred C60," which matches Figma. The tokens do not implement it, because `--hds-palette-border` is already C60 on dark. Resolving this means either a new hover-specific property or changing the dark default border to C80 (see G9), which are not independent decisions.

### G5. Label-to-field gap is 8px, spec is 4px

`%block-input-styles` gives every block input `margin-top: units(1)` and `_form.scss` never overrides it. Measured 8px against Figma's 4px. Applies to all form controls.

### G6. Line-heights on the value and help text

`.usa-select` sets `font-size` but not `line-height`, so both inherit `$theme-input-line-height: 2` → `1.2`. That yields 16.9px on the 14px value (Figma 20px) and 14.4px on the 12px help text (Figma 16px), and makes the field 46.9px tall instead of ~48px. ⚠️ USWDS's `units()` scale cannot express these directly, so this needs a direct `line-height` override rather than a theme setting — check whether changing it shifts the other form controls' rendered heights before committing.

### G7. The Placeholder state is not implemented

Figma's Placeholder variant is a different layout: no label above the field, the label text rendered inside the field in Inter SemiBold 14 C40. The stories render a `- Select -` first option in the ordinary value color and keep the label. There is no styling hook for it today.

`<select>` has no `::placeholder`, but `.usa-select:has(option[value=""]:checked)` or an explicit class on the select would reach it. ⚠️ Whether HDS wants to ship this at all is a design call — `Select.mdx` currently instructs authors to always keep a visible label, which directly contradicts the Placeholder variant. See §10.

### G8. Focus border color on dark palettes

Figma specs NASA Blue Tint `#288BFF` for focus on dark; dark and black ship NASA Blue `#1C67E3` (4.1:1 on black, versus 6.2:1 for Tint). This is the documented `--hds-palette-btn-secondary-bg` decision from Discussion #24, applied consistently across components — it passes 3:1, so it is not a defect. Listed here only so the reconciliation is on the record rather than rediscovered. The blue palette already resolves to Tint and matches Figma.

### G9. Default border on dark palettes is C60, spec is C80

Figma's dark default border is C80 `#2E2E32`; HDS ships C60 `#58585B`. HDS is the more accessible of the two (3.0:1 versus 1.6:1 against the black fill), and it is the reason G4's hover collapses. **Both values fail WCAG 1.4.11's 3:1 threshold for the control boundary** — as does the light default, C20 on white at 1.5:1. This is a pre-existing, form-wide condition inherited straight from the Figma spec, not a regression; flagging for reconciliation per `AGENTS.md` → When sources conflict rather than proposing a unilateral change.

### G10. Forced-colors mode keeps 48px of padding with no icon

USWDS zeroes `padding-right` and drops the background image under `@media (forced-colors: active)`, but `_form.scss`'s `padding-right: 48px` lives in a higher cascade layer and wins. Cosmetic only, but it leaves a visible dead gap in Windows High Contrast Mode.

### G11. The baseline focus ring is dead code for `select`

`base/_focus.scss` applies `hds-focus-ring` to `select:not([disabled]):focus-visible`. The mixin renders through a `::before` pseudo-element, which browsers do not render on `<select>`, so the ring never appears and the mixin's `position: relative` is applied for nothing. The visible focus treatment is the solid blue border from `_form.scss`, which is correct per Figma. ⚠️ Harmless today, but the rule reads as if selects get a dashed ring; worth either removing `select` from that selector list or annotating it.

## 6. Gap analysis B — the dropdown menu panel

Nothing in the codebase implements §3.2–§3.4. This is the largest single gap and the one that decides the shape of the rest.

**The blocking constraint is architectural, not visual.** HDS Core "ships compiled CSS, not JavaScript" (`AGENTS.md` → Scope). A native `<select>` renders its option list through the operating system; `option` accepts almost no styling, panel geometry and shadow are unreachable, and the selected-item blue text is not addressable. The Figma panel therefore cannot be built on `.usa-select` at all. `Select.mdx` and `DESIGN.md` both already say so.

That leaves three routes, and picking one is a prerequisite to any work here:

1. **Do not build it.** Keep native `<select>` for form fields, document the panel as out of scope for a CSS-only system, and delete the "deferred to a future phase" language that implies it is coming. Cheapest, and honest about the constraint.
2. **Ship CSS only, markup and behavior are the adopter's.** Provide `.usa-combo-box`-style classes for a panel an adopter wires up themselves — plausible, since USWDS already ships `.usa-combo-box` markup and JS that HDS could theme. `dist/css/hds.min.css` already contains unthemed `.usa-combo-box` rules from the USWDS bundle. This gets the visual spec into HDS without HDS shipping JS.
3. **Change the scope constraint** and ship a JS-backed component. A significant departure from the stated architecture; needs a decision well above this analysis.

⚠️ Route 2 is the one worth costing out first: it satisfies the Figma spec, reuses an upstream component HDS already distributes, and does not require HDS to own any JavaScript. It should be raised as a Discussion under `CONTRIBUTING.md` → Design proposals rather than started as a PR.

Whichever route is taken, these spec details are the ones most likely to be lost:

- The selected item is **blue text, not a blue fill** — both `DESIGN.md` line 404 and the Figma callout in `Select.mdx` describe "rounded corners and a blue active highlight." Neither is in the Figma: the panel has square corners and the selection is a text-color change. See §11.
- There is **no hover or focus state drawn for menu items**. A keyboard-operable menu needs both, so they will have to be invented, which makes this a design proposal rather than a build-to-spec.
- Menu item blue on white is 5.1:1, so the selected item passes AA for text — but color is then the **only** signal distinguishing it, which fails WCAG 1.4.1. A check glyph or equivalent non-color indicator is needed regardless of route.

## 7. Gap analysis C — the utility button

Not implemented. `.hds-btn-icon--utility` in `src/scss/components/_icon-button.scss` is a **circular icon button** and is a different component despite the shared word.

What exists that could be reused:

- `hds-type('metadata')` (`_hds-typography.scss` line 184) is Inter Bold, `$hds-font-size-3xs`, `line-height: 1.75`, `+0.025em` — structurally identical to the Figma type except for size.
- `src/assets/img/hds-icons/arrow-circle-down.svg` and `arrow-circle-up.svg` both exist.
- `--hds-palette-focus` is C60 light / C30 dark, exactly the dashed focus colors Figma specs for this component.

What is missing:

- **There is no 11px size token.** `$hds-font-size-3xs` is 12px (`_hds-tokens.scss` line 88) and the scale has nothing below it. Figma specs 11px. ⚠️ Either accept 12px, or add a token — and `AGENTS.md` forbids hardcoding a value that ought to live in the scale, so this is a token decision, not a component one. The same 11px turns up in the NASA TV date nav and the `+2 more` link, so it is unlikely to be a one-off typo.
- The Figma focus treatment is a plain 1px dashed **border**, whereas HDS's dashed ring is drawn via `hds-focus-ring`'s masked pseudo-element with a `2,3` dasharray and 2px inset. ⚠️ Per `AGENTS.md` → Focus rings, if the spec cannot be met with the existing mixins this is a strategic call, not a component-level override. It looks reachable with `hds-focus-ring-inline`, but that needs checking against the real thing.

The utility button is the smallest, most self-contained piece of this whole set and the only one with no JavaScript dependency for its default state. It is a reasonable standalone component to build even if the panel work stalls — but note that its entire purpose is to open a menu, so shipping it alone leaves a trigger with nothing to trigger.

## 8. Gap analysis D — multiselect and inline search

Both are panel _contents_ and are blocked behind the §6 decision. Two things are worth recording now:

- The multiselect rows are ordinary HDS checkboxes at the sizes `_form.scss` already produces. If the panel gets built, the rows need no new checkbox work.
- The multiselect panel's shadow is `0 0 10px rgba(0, 0, 0, 0.1)` where every other panel in the set uses `0 0 20px`. ⚠️ Almost certainly a Figma inconsistency rather than intent — confirm before encoding either value.
- HDS has no elevation or shadow token. `tokens.json` has no shadow group, and no shipped component casts one. Any panel work introduces the design system's first shadow, which is a token decision that should be settled independently of Select.

## 9. Accessibility

### Against the Figma a11y frame

The native `<select>` HDS ships already satisfies the entire keyboard contract in §3.6 — open on Space/Enter/Down, cycle with arrows, commit with Space/Enter, dismiss with Esc — for free, in every browser, including the parts a custom panel would have to reimplement. That is a strong argument for route 1 or 2 in §6 over route 3.

The stated ARIA contract does not hold up, however. **`role=button` on the element that opens the menu is wrong for a single-select field.** A button announces no value and no expanded state; the ARIA APG pattern for this is `role="combobox"` with `aria-expanded` and `aria-controls`, and for a form field a native `<select>` is better still. `role=button` is defensible only for the §3.5 utility-button trigger, where the control is genuinely a menu opener and not a form value. ⚠️ Flagging for reconciliation rather than treating the Figma note as authoritative — per `docs/COMPONENTS.md`, a spec that conflicts with an accessibility requirement gets flagged, not silently corrected, and the conflict gets noted in the Guidance page.

The frame is also silent on: the accessible name of the trigger, focus management on open and close, whether focus moves into the panel, `aria-activedescendant` versus roving tabindex, and the multiselect's announcement of selected count. All of those are required to build §6 and none are specified.

### Contrast audit

Computed with the WCAG 2.x relative-luminance formula from the token hex values.

| Pair | Ratio | Threshold | Result |
| --- | --- | --- | --- |
| Field border C20 on white | 1.5:1 | 3:1 (1.4.11) | **Fail** — spec-inherited, all light palettes |
| Field border C20 on C05 (light palette) | 1.4:1 | 3:1 | **Fail** — spec-inherited |
| Field border C40 on white (midtone default, and hover elsewhere) | 3.0:1 | 3:1 | Borderline pass |
| Field border C60 on black (dark/black default and hover) | 3.0:1 | 3:1 | Borderline pass |
| Field border C80 on black (Figma dark default) | 1.6:1 | 3:1 | **Fail** — as specced |
| Field border C60 on black (blue palette, hover) | 3.0:1 | 3:1 | Borderline; regresses from 7.0:1 at rest |
| Focus border Blue on white | 5.1:1 | 3:1 | Pass |
| Focus border Blue on black (shipped, dark) | 4.1:1 | 3:1 | Pass |
| Focus border Blue Tint on black (Figma, dark) | 6.2:1 | 3:1 | Pass |
| Chevron black on black field (dark/black/blue) | **1:1** | 3:1 | **Fail** — see G1 |
| Value text C80 on white | 13.5:1 | 4.5:1 | Pass |
| Value text C20 on black | 13.8:1 | 4.5:1 | Pass |
| Help text C60 on white | 7.1:1 | 4.5:1 | Pass |
| Help text C30 on C90 (shipped, dark) | 9.1:1 | 4.5:1 | Pass |
| Help text C40 on black (Figma, dark) | 7.0:1 | 4.5:1 | Pass |
| Error text Red Shade on white | 7.0:1 | 4.5:1 | Pass |
| Error icon Red on white | 3.7:1 | 3:1 | Pass |
| Disabled value C40 on C05 | 2.8:1 | exempt | Exempt (1.4.3 disabled carve-out) |
| Menu selected item Blue on white | 5.1:1 | 4.5:1 | Passes contrast; **fails 1.4.1** (color is the only signal) |

The two genuine failures are G1 (a defect) and the default field border (inherited from the spec, form-wide, and needing a design call). Everything else passes or is exempt.

### Test coverage

`stories/components/Select.stories.js` ships `PaletteA11y`, `PaletteA11yHover`, and one focus test. None of them would have caught G1: axe does not evaluate background-image contrast, and Chromatic would only flag it if a dark-palette snapshot were diffed against a baseline that had a visible chevron — which it never had. ⚠️ Worth a targeted regression test on the chevron once it is fixed.

## 10. Conflicts needing a design decision

These are not implementation questions. Each needs an answer before the corresponding work can start.

1. **Does HDS Core ship a dropdown panel at all, and if so how?** §6. Blocks the multiselect, inline search, and the utility button's reason to exist.
2. **Menu item hover and keyboard-focus states.** Not drawn in Figma. Must be designed, not derived.
3. **A non-color indicator for the selected menu item.** Required by 1.4.1 regardless of route.
4. **11px type.** Add a token below `$hds-font-size-3xs`, or render the utility button at 12px? Recurs across several components.
5. **Shadow tokens.** Panels are HDS's first elevation. `0 0 20px rgba(0,0,0,0.1)` versus the multiselect's `0 0 10px` also needs settling.
6. **The Placeholder state versus the always-visible-label rule.** `Select.mdx` says "Always include a visible label. Labels go above the field, never inside it." Figma's Placeholder variant does exactly the opposite. One of the two is wrong.
7. **Menu item row height.** Fixed 32px (§3.2) versus `8px 24px` padding with wrapping (§3.5). Long options — NASA center names, timezone names — wrap in real use, so the fixed height likely cannot hold.
8. **The default field border's 1.4.11 failure.** Form-wide, spec-inherited, affects every input. Out of Select's scope to fix unilaterally.
9. **Error row alignment and icon size.** Figma's Select frame shows a 20px icon, vertically centred; `_form.scss` ships 18px, top-aligned, and its header comment cites 18px as the Figma spec. ⚠️ Probably a difference between the Select and Text Input frames; confirm which governs.
10. **`role=button` on the trigger.** §9. The Figma note conflicts with the ARIA APG.

## 11. Corrections to existing HDS documentation

Three statements in the current docs do not match what is in the Figma file:

- `docs/DESIGN.md` line 404 — "Figma shows styled dropdown with rounded corners and blue active highlight." The panel has **square corners** (`overflow: clip`, no radius) and the active item is **blue text**, not a highlight.
- `stories/components/Select.mdx`, Figma callout — repeats the same "rounded corners and a blue highlight for the selected item."
- `docs/DESIGN.md` line 405 — "Floating Label: Figma shows label-inside-field pattern." The Placeholder variant does put the label inside the field, but nothing in the file specifies a _floating_ label; there is no transition or raised-label state drawn.

`_form.scss` line 128's "Chevron icon: deferred to custom dropdown component phase. Currently uses USWDS default arrow" is accurate but incomplete — it should record that the icon is invisible on three palettes.

## 12. Suggested sequencing

Ordered by whether the work is blocked on a decision.

**Unblocked, fixes shipped defects:**

1. G1 + G2 + G3 — palette-aware HDS chevron-down at the correct inset. One change, closes the only hard accessibility failure in the component.
2. G11 — remove or annotate `select` in the `base/_focus.scss` baseline.
3. §11 — correct the three documentation statements.

**Unblocked, but form-wide rather than Select-only — coordinate with Text Input and Textarea:**

1. G5 — label-to-field gap.
2. G6 — value and help text line-heights.
3. G10 — forced-colors padding.

**Blocked on a decision from §10:**

1. G4 + G9 — hover and dark default border, together (item 8).
2. G7 — Placeholder state (item 6).
3. Utility button (items 4 and 1).
4. Dropdown panel, multiselect, inline search (items 1, 2, 3, 5, 7, 10).

Select is tagged `status:experimental`. Per `docs/COMPONENTS.md`, promotion to `status:stable` requires no open design questions — so it stays experimental until at least items 6 and 8 in §10 are settled, independently of whether the panel is ever built.
