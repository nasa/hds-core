<!-- Source: ./stories/components/Accordion.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-accordion-guidance--docs -->
# Accordion

Expandable sections that let users show and hide content, reducing vertical scrolling on long pages. Uses standard [USWDS Accordion](https://designsystem.digital.gov/components/accordion/) markup with HDS theming.

## Variants

### Default

One section open at a time. Clicking a new heading closes the previously open section. Set `aria-expanded="true"` on one button to have that section open on page load. Toggle "First item expanded" in the controls to see the all-collapsed state.

```html
  <div class="usa-accordion">

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="true" aria-controls="default-1">
    What is the Horizon Design System?
  </button>
</h4>
<div id="default-1" class="usa-accordion__content usa-prose">
  <p>The Horizon Design System (HDS) is NASA's unified visual language for
    digital products. It provides colors, typography, spacing, icons, and component
    patterns that ensure a consistent experience across NASA websites.</p>
</div>

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="default-2">
    How does HDS Core relate to USWDS?
  </button>
</h4>
<div id="default-2" class="usa-accordion__content usa-prose" hidden="">
  <p>HDS Core is a Sass/CSS theme layer on top of the U.S. Web Design System
    (USWDS). All standard USWDS components and utility classes continue to work — HDS
    Core configures them with NASA's brand values.</p>
</div>

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="default-3">
    Do I need JavaScript for accordions?
  </button>
</h4>
<div id="default-3" class="usa-accordion__content usa-prose" hidden="">
  <p>Yes. Accordions require the standard
    <a class="usa-link usa-link--external" href="https://designsystem.digital.gov/documentation/getting-started/developers/phase-two-compile/#step-4-add-the-uswds-javascript">USWDS JavaScript
    <span class="usa-sr-only">(external)</span></a>
    for expand/collapse toggling. HDS Core does not add any additional JavaScript.</p>
</div>

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="default-4">
    Can accordion content include more than text?
  </button>
</h4>
<div id="default-4" class="usa-accordion__content usa-prose" hidden="">
  <p>Yes. Accordion content panels are flexible — they can include paragraphs,
    lists, links, images, and other components. Wrap content in
    <code>.usa-prose</code> for full typography styling.</p>
    <ul>
      <li>Paragraphs and formatted text</li>
      <li>Bulleted and numbered lists</li>
      <li>Links and inline elements</li>
    </ul>
</div>

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="default-5">
    How do accordions adapt to color palettes?
  </button>
</h4>
<div id="default-5" class="usa-accordion__content usa-prose" hidden="">
  <p>HDS accordions are fully palette-aware. Heading text, separator lines,
    chevron circles, and content text all adapt automatically when placed inside a
    palette wrapper.</p>
</div>

  </div>
```

### Multiselectable

Multiple sections can be open at the same time. Add `data-allow-multiple` and the `usa-accordion--multiselectable` class.

```html
  <div class="usa-accordion usa-accordion--multiselectable" data-allow-multiple="">

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="true" aria-controls="multi-1">
    What is the Horizon Design System?
  </button>
</h4>
<div id="multi-1" class="usa-accordion__content usa-prose">
  <p>The Horizon Design System (HDS) is NASA's unified visual language for
    digital products. It provides colors, typography, spacing, icons, and component
    patterns that ensure a consistent experience across NASA websites.</p>
</div>

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="multi-2">
    How does HDS Core relate to USWDS?
  </button>
</h4>
<div id="multi-2" class="usa-accordion__content usa-prose" hidden="">
  <p>HDS Core is a Sass/CSS theme layer on top of the U.S. Web Design System
    (USWDS). All standard USWDS components and utility classes continue to work — HDS
    Core configures them with NASA's brand values.</p>
</div>

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="multi-3">
    Do I need JavaScript for accordions?
  </button>
</h4>
<div id="multi-3" class="usa-accordion__content usa-prose" hidden="">
  <p>Yes. Accordions require the standard
    <a class="usa-link usa-link--external" href="https://designsystem.digital.gov/documentation/getting-started/developers/phase-two-compile/#step-4-add-the-uswds-javascript">USWDS JavaScript
    <span class="usa-sr-only">(external)</span></a>
    for expand/collapse toggling. HDS Core does not add any additional JavaScript.</p>
</div>

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="multi-4">
    Can accordion content include more than text?
  </button>
</h4>
<div id="multi-4" class="usa-accordion__content usa-prose" hidden="">
  <p>Yes. Accordion content panels are flexible — they can include paragraphs,
    lists, links, images, and other components. Wrap content in
    <code>.usa-prose</code> for full typography styling.</p>
    <ul>
      <li>Paragraphs and formatted text</li>
      <li>Bulleted and numbered lists</li>
      <li>Links and inline elements</li>
    </ul>
</div>

<h4 class="usa-accordion__heading">
  <button type="button" class="usa-accordion__button" aria-expanded="false" aria-controls="multi-5">
    How do accordions adapt to color palettes?
  </button>
</h4>
<div id="multi-5" class="usa-accordion__content usa-prose" hidden="">
  <p>HDS accordions are fully palette-aware. Heading text, separator lines,
    chevron circles, and content text all adapt automatically when placed inside a
    palette wrapper.</p>
</div>

  </div>
```

> **Differs from USWDS:** USWDS accordions display +/− icons with a filled background on the heading row. HDS replaces these with a circled chevron that adapts to palettes — no markup changes needed.

## When to use

- Users only need a few specific pieces of content on a page — like an FAQ where each question is its own section.
- You have limited vertical space and the content can be logically grouped under clear headings.
- Content is self-contained within each section — users don't need to compare across sections.

## When to consider something else

- Users need to see most or all of the information at once. Use well-formatted text instead.
- There are only one or two sections. Accordions add interaction cost — if there isn't enough content to justify it, keep the content visible.
- Users need to compare content across sections. Tabs or a single page layout may work better.

## Usability guidance

- **Make the entire header row selectable.** The full row is a single click target — a larger target is easier to interact with. The USWDS markup handles this automatically.
- **Use clear, descriptive headings.** Each heading should tell users what they'll find inside. Avoid vague labels like "More info" or "Click here."
- **Keep content focused.** Each section should cover one topic. If a section grows too long, consider breaking it into its own page.
- **Accordion content is flexible.** Panels can include paragraphs, lists, links, and other components — wrap content in `.usa-prose` for full typography styling.
- **If titles cause line breaks, reduce the type size.** Long accordion titles are acceptable, but adjust styling if they wrap excessively.

## Accessibility

- The entire accordion header area is a single `<button>`. Users can click anywhere in the row to expand or collapse.
- Each button uses `aria-expanded` to communicate its state and `aria-controls` to associate it with its content panel.
- Use unique `id` values on each content panel to match the `aria-controls` reference.
- Do not manually set the `hidden` attribute on content panels in production — USWDS JavaScript manages visibility based on `aria-expanded`.
- **Keyboard:** Enter or Space toggles the focused section. Tab / Shift+Tab moves between headings. Down Arrow / Up Arrow navigates directly between accordion headings.
- **Screen readers:** VoiceOver uses Control+Option+Space or Space. JAWS and NVDA use Enter or Space. Collapsed and expanded states are announced automatically — no additional text alternatives are needed.
- Accordions require the standard [USWDS JavaScript](https://designsystem.digital.gov/documentation/getting-started/developers/phase-two-compile/#step-4-add-the-uswds-javascript) for toggle behavior. HDS Core does not add any additional JavaScript.

> **How this works:** USWDS JavaScript initializes accordions on page load. If you render accordions dynamically (e.g., in a React or Vue app without [react-uswds](https://github.com/trussworks/react-uswds)), you need to reinitialize after mount — see the [React Setup](/?path=/docs/guides-react-guidance--docs) guide for details.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS accordion accessibility tests](https://designsystem.digital.gov/components/accordion/accessibility-tests/) for component-specific manual testing guidance.
