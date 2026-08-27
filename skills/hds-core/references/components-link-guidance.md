<!-- Source: ./stories/components/Link.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-link-guidance--docs -->

# Link

Links direct visitors to other pages on and off the NASA website. HDS links use USWDS [`.usa-link`](https://designsystem.digital.gov/components/link/) markup.

HDS links use **body-text color** for the link text itself — not a brand color. The dashed underline and (for external links) the diagonal arrow provide the visual affordance. See [Color](./foundations-color.md) for more on how HDS uses color for wayfinding.

## Variants

### Internal link

The default link. Apply `.usa-link` to any `<a>` tag. The link renders in the current text color with a dashed underline.

```html
<p>Learn more about the <a class="usa-link" href="#">Artemis Program</a> and upcoming lunar missions.</p>
```

### External link

Add `.usa-link--external` to display a diagonal arrow icon after the link text. Use this for any URL that takes the visitor **outside of NASA.gov**.

```html
<p>
  View the gallery on
  <a class="usa-link usa-link--external" href="https://flickr.com/nasa" rel="noreferrer"
    >NASA's Flickr<span class="usa-sr-only"> (external)</span></a
  >.
</p>
```

Toggle the "Internal escape" control above to see `.hds-link--internal` — an HDS-only escape hatch that suppresses the arrow for NASA subdomains (e.g., `science.nasa.gov`) while keeping any CMS-driven external class intact.

> **Differs from USWDS:** USWDS applies the external arrow automatically when `.usa-link--external` is present. The HDS external arrow CSS replaces USWDS's built-in external link screen reader labels. Developers must add SR text manually: `&lt;span class="usa-sr-only"&gt; (external)&lt;/span&gt;`

## Links in context

Links work in headings, body text, and across line breaks. The external arrow scales proportionally with the parent font size.

```html
<div style="display: flex; flex-direction: column; gap: 2rem;">
  <div>
    <span class="hds-overline">In headings</span>
    <h2 style="margin-top: 0.5rem;">
      <a class="usa-link usa-link--external" href="https://www.spacex.com" rel="noreferrer"
        >Heading with external link<span class="usa-sr-only"> (external)</span></a
      >
    </h2>
    <h3>
      <a class="usa-link" href="#">Heading with internal link</a>
    </h3>
  </div>
  <div>
    <span class="hds-overline">In body text</span>
    <p style="margin-top: 0.5rem;">
      As NASA advances its plans to explore the Moon under its
      <a class="usa-link" href="#">Artemis program</a>, the two will discuss areas of collaboration that include support
      for <a class="usa-link" href="#">human spaceflight</a>, emerging space transportation, and
      <a class="usa-link usa-link--external" href="https://science.nasa.gov/" rel="noreferrer"
        >scientific research<span class="usa-sr-only"> (external)</span></a
      >.
    </p>
  </div>
  <div>
    <span class="hds-overline">Multi-line wrap</span>
    <p style="max-width: 320px; margin-top: 0.5rem;">
      On narrow viewports, this longer link wraps to multiple lines:
      <a class="usa-link usa-link--external" href="https://example.com" rel="noreferrer"
        >a multi-line external link that demonstrates the underline following across line breaks<span
          class="usa-sr-only"
        >
          (external)</span
        ></a
      >.
    </p>
  </div>
</div>
```

## When to use

- **Navigating to another page** — internal or external
- **Inline within body text** — links embed in any paragraph or heading
- **Standalone navigation** — a subtle alternative to a button when the action is purely navigational

## When to consider something else

- **Triggering an on-page action** (toggle, submit, open modal) — use a [Button](./components-button-guidance.md)
- **Primary call-to-action** — use a [Button](./components-button-guidance.md) (CTA or secondary) for high-emphasis actions
- **Icon-only actions** — use an [Icon Button](./components-icon-button-guidance.md)

## Usability guidance

- **Don't rely on color alone.** HDS links use body-text color intentionally — the dashed underline is the affordance. This meets WCAG 1.4.1 (Use of Color).
- **Write meaningful link text.** Avoid "click here" or "read more." The link text should make sense out of context (e.g., in a screen reader's links list).
- **Mark external links consistently.** Any URL that leaves NASA.gov should get `.usa-link--external` unless the destination is a NASA subdomain using `.hds-link--internal`.
- **Links inherit font size.** No link-specific size classes. Links scale with their parent text.
- **Never remove the underline in the default state.** Because HDS links use body-text color, the dashed underline is the **sole** visual differentiator. On focus, the underline is replaced by the full dashed focus ring; the bottom edge of the ring serves the same purpose.

## Bare link styling (opt-in)

By default, bare `<a>` tags are unstyled. HDS link treatment only applies via `.usa-link` or inside a `.usa-prose` container. To enable global bare link styling, set either of these USWDS flags to `true`:

- `$theme-global-link-styles`
- `$theme-global-content-styles`

## Accessibility

- **External links require screen reader text.** The HDS external arrow is CSS-only and invisible to screen readers. Add SR text manually:
  ```html
  <a class="usa-link usa-link--external" href="https://example.com" rel="noreferrer">
    Example<span class="usa-sr-only"> (external)</span>
  </a>
  ```
- **Visited links** look the same as unvisited links — intentional to prevent contrast issues across palettes.
- **Don't remove focus styles.** HDS Core applies a visible focus ring on all interactive elements.
- **Underline is the affordance.** Removing it breaks accessibility.

The recommended markup shown above includes all necessary attributes. See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS link accessibility tests](https://designsystem.digital.gov/components/link/accessibility-tests/) for component-specific manual testing guidance.
