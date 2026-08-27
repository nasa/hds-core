<!-- Source: ./stories/components/List.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-list-guidance--docs -->
# List

Lists group related text items. HDS Core uses standard USWDS `.usa-list` markup with NASA-themed styling — blue markers, DM Mono numerals on ordered lists, and slightly smaller text than body paragraphs.

## Unordered list

Use an unordered list when items have no specific sequence or priority. Markers are blue filled discs that adapt to the current palette.

```html
<ul class="usa-list" role="list" aria-label="Key findings">
  <li role="listitem">SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
</ul>
```

## Ordered list

Use an ordered list when items convey a ranking, hierarchy, or sequence. Numerals are styled in DM Mono with wide letterspacing and no trailing period.

```html
<ol class="usa-list" role="list" aria-label="Key findings">
  <li role="listitem">SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
</ol>
```

### Long ordered list

Double-digit numerals maintain alignment and DM Mono styling at 20+ items.

```html
<ol class="usa-list" role="list" aria-label="Extended findings">
  <li role="listitem">Item 1: SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">Item 2: NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Item 3: Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
  <li role="listitem">Item 4: SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">Item 5: NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Item 6: Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
  <li role="listitem">Item 7: SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">Item 8: NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Item 9: Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
  <li role="listitem">Item 10: SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">Item 11: NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Item 12: Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
  <li role="listitem">Item 13: SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">Item 14: NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Item 15: Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
  <li role="listitem">Item 16: SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">Item 17: NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Item 18: Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
  <li role="listitem">Item 19: SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">Item 20: NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
</ol>
```

## Unstyled list

Use the unstyled variant to remove markers and indentation. Useful for navigation menus, link groups, or any list where bullets are not appropriate.

```html
<ul class="usa-list usa-list--unstyled" role="list" aria-label="Related links">
  <li role="listitem">SOFIA has detected water molecules (H₂O) in Clavius Crater, one of the largest craters visible from Earth, located in the Moon’s southern hemisphere.</li>
  <li role="listitem">NASA has previously confirmed ice in permanently shadowed craters around the Moon’s poles.</li>
  <li role="listitem">Water is a precious resource in deep space. Whether the water SOFIA found is easily accessible for use as a resource remains to be determined.</li>
</ul>
```

> **Differs from USWDS:** **Differs from USWDS:** HDS list item text is one step smaller than body text (14px vs 16px). In vanilla USWDS, list items inherit the body font size. This is an intentional HDS design choice — lists appear more compact and subordinate to surrounding paragraph text.

## When to use

- **Unordered list:** Group related items that have no inherent order — feature highlights, requirements, supporting facts.
- **Ordered list:** Show steps, rankings, or any sequence where item position matters.
- **Unstyled list:** Remove visual markers when the list structure is semantic but bullets are not needed — navigation menus, footer link groups, card grids.

## When to consider something else

- **Long narrative content.** If each item is multiple sentences or paragraphs, consider using headings and body text instead.
- **Key–value pairs.** Use a [table](./components-table-guidance.md) or definition list rather than a bulleted list.
- **Single item.** A one-item list is just a sentence — don't wrap it in a list.

## Usability guidance

- **Use sentence case** and begin each item with a capital letter.
- **Use punctuation appropriate to the text.** Complete sentences should end with a period. Sentence fragments in short lists may omit periods, but be consistent within a single list.
- **Keep items parallel.** Start each item with the same part of speech (e.g., all verbs or all nouns) for scannability.
- **Don't mix ordered and unordered** intent in a single list. If some items have priority and others don't, split into separate lists.

## Accessibility

- Add `role="list"` and a descriptive `aria-label` to every `<ul>` and `<ol>`. This is required by the HDS accessibility spec and ensures Safari VoiceOver correctly announces list semantics.
- Write `aria-label` values that describe the list's content — `"Key findings"` or `"Mission timeline"`, not `"list"` or `"bulleted list"` (screen readers already announce the list type).
- Add `role="listitem"` to each `<li>`.
- Do not strip semantic `<ul>`, `<ol>`, or `<li>` elements. Do not use lists purely for visual indentation — if items are not a logical group, use paragraphs.
- If list items contain interactive elements (links, buttons), they are included in the tab order automatically. If there are no interactive elements, there are no focus points for keyboard navigation.
- The unstyled variant (`.usa-list--unstyled`) preserves list semantics when `role="list"` is present.

> **Differs from USWDS:** **Differs from USWDS:** HDS ordered lists use CSS counters instead of native markers for numeral styling. Safari VoiceOver won't announce these as lists without `role="list"` — always include it on both `` and ``.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS list accessibility tests](https://designsystem.digital.gov/components/list/accessibility-tests) for component-specific manual testing guidance.
