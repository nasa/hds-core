<!-- Source: ./stories/components/IntroText.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-intro-text-guidance--docs -->
# Intro Text

Intro text is a larger, lighter lead paragraph that introduces a page or section. It uses the USWDS [`.usa-intro`](https://designsystem.digital.gov/components/prose/) class.

```html
<p class="usa-intro">NASA's Artemis campaign is the next chapter in human space exploration. Working with commercial and international partners, NASA will establish a long-term presence at and around the Moon.</p>
```

## In page context

Intro text works alongside headings and body text to create a clear content hierarchy.

```html
<h1>Mission Overview</h1>
<p class="usa-intro">
  The International Space Station serves as a national laboratory for
  scientific research and technology development.
</p>
<p>
  More than 3,600 research investigations have been conducted aboard
  the station since the first expedition crew arrived in November 2000.
  These experiments span biology, Earth science, physical sciences,
  and technology demonstrations that benefit life on Earth and prepare
  us for future missions to the Moon and Mars.
</p>
```

## When to use intro text

- **Lead paragraph** at the top of a page or major section.
- **Setting context** before detailed body content.
- **One per page or section** — multiple intro paragraphs dilute the hierarchy.

## When to consider something else

- For **regular body text**, use a standard `<p>` tag.
- For **pull quotes or callouts**, use a blockquote or alert instead.
- For **subheadings**, use heading elements (`<h2>`–`<h6>`), not oversized paragraph text.
- For details on the full type scale, see [Typography](./foundations-typography.md).

## Usability guidance

- **Keep it short.** One to two sentences. If it's longer, the size difference becomes fatiguing.
- **One per visible section.** Multiple intro paragraphs compete for attention.
- **Don't use it for emphasis.** If you need to highlight a specific phrase, use `<strong>` within regular text.

## Accessibility

- Intro text is a `<p>` element — no special ARIA roles needed.
- Screen readers announce it as a normal paragraph. The visual size difference is purely presentational.
- Color contrast is handled automatically across all palettes.

For general accessibility guidance, see [Accessibility](./foundations-accessibility.md).
