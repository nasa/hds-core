<!-- Source: ./stories/components/Prose.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-prose-guidance--docs -->
# Prose

Prose applies HDS styling to a block of bare HTML elements using the `.usa-prose` wrapper class. Use it for content where individual component classes can't be applied — blog posts, CMS output, markdown-rendered pages, or any long-form content.

Inside `.usa-prose`, headings, paragraphs, lists, tables, blockquotes, links, code blocks, and horizontal rules all receive HDS typography, spacing, and color. Reading line length is constrained to 68ch automatically.

```html
<div class="usa-prose">
  <h1>The Apollo Program</h1>

  <p class="usa-intro">
    NASA's Apollo program was one of the greatest achievements in human
    history. Between 1969 and 1972, twelve astronauts walked on the surface
    of the Moon — the first time human beings set foot on another world.
  </p>

  <h2>Road to the Moon</h2>

  <h3>The Mercury and Gemini foundations</h3>

  <p>
    Before Apollo could reach the Moon, NASA needed to prove that humans
    could survive and work in space. The
    <a href="#">Mercury program</a> accomplished this in the early 1960s,
    beginning with Alan Shepard's suborbital flight on May 5, 1961.
  </p>

  <h4>Gemini: learning to walk before you run</h4>

  <p>
    The <a href="#">Gemini program</a> flew ten crewed missions between 1965
    and 1966, developing the techniques Apollo would need: rendezvous and
    docking in orbit, extravehicular activity, and long-duration spaceflight.
  </p>

  <h5>Kennedy's challenge</h5>

  <p>
    On May 25, 1961, President John F. Kennedy committed the nation to
    "landing a man on the Moon and returning him safely to the Earth"
    before the end of the decade.
  </p>

  <h6>The cost of exploration</h6>

  <p>
    The Apollo program cost approximately $25.4 billion in 1970s dollars.
    At its peak, NASA's budget consumed roughly 4 percent of the federal
    budget.
  </p>

  <hr>

  <h2>Key missions</h2>

  <ol>
    <li>Apollo 7 (1968) — First crewed Apollo flight</li>
    <li>
      Apollo 8 (1968) — First crewed mission to orbit the Moon
      <ol>
        <li>First humans to see the far side of the Moon</li>
        <li>First "Earthrise" photograph</li>
      </ol>
    </li>
    <li>Apollo 11 (1969) — First Moon landing</li>
    <li>Apollo 13 (1970) — Crew returned safely after oxygen tank explosion</li>
    <li>Apollo 17 (1972) — Final Moon landing; longest lunar surface stay</li>
  </ol>

  <blockquote>
    <p>
      That's one small step for man, one giant leap for mankind.
    </p>
    <cite>Neil Armstrong, July 20, 1969</cite>
  </blockquote>

  <h2>The Saturn V rocket</h2>

  <p>
    The <a href="#">Saturn V</a> remains the most powerful rocket ever
    successfully flown. Standing 363 feet tall, it generated roughly
    7.5 million pounds of thrust at liftoff.
  </p>

  <ul>
    <li>
      First stage (S-IC) — Five F-1 engines burning kerosene and liquid oxygen
      <ul>
        <li>Produced 7.5 million pounds of thrust</li>
        <li>Burned for approximately 2 minutes 30 seconds</li>
      </ul>
    </li>
    <li>Second stage (S-II) — Five J-2 engines burning liquid hydrogen and liquid oxygen</li>
    <li>Third stage (S-IVB) — Single J-2 engine; reignited for translunar injection</li>
  </ul>

  <h2>Mission data</h2>

  <p>
    Ground Elapsed Time (<code>GET</code>) was measured from the moment of
    liftoff. All Apollo missions used GET as the primary timing reference.
  </p>

  <pre><code>APOLLO 11 — LUNAR SURFACE TIMELINE
===================================
Event                   GET (hhh:mm:ss)
-----------------------------------
Lunar contact           102:45:40
"The Eagle has landed"  102:45:43
First step on Moon      109:24:15
EVA termination         111:39:13</code></pre>

  <h2>Apollo by the numbers</h2>

  <table>
    <caption>Crewed Apollo lunar landing missions</caption>
    <thead>
      <tr>
        <th scope="col">Mission</th>
        <th scope="col">Date</th>
        <th scope="col">Landing site</th>
        <th scope="col">Time on surface</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Apollo 11</th>
        <td>July 1969</td>
        <td>Sea of Tranquility</td>
        <td>21 hours 36 minutes</td>
      </tr>
      <tr>
        <th scope="row">Apollo 12</th>
        <td>November 1969</td>
        <td>Ocean of Storms</td>
        <td>31 hours 31 minutes</td>
      </tr>
      <tr>
        <th scope="row">Apollo 15</th>
        <td>July 1971</td>
        <td>Hadley–Apennine</td>
        <td>66 hours 55 minutes</td>
      </tr>
      <tr>
        <th scope="row">Apollo 17</th>
        <td>December 1972</td>
        <td>Taurus–Littrow</td>
        <td>74 hours 59 minutes</td>
      </tr>
    </tbody>
  </table>

</div>
```

## When to use

- **CMS or markdown content.** When a content management system or static site generator produces HTML and you can't add classes to individual elements.
- **Long-form articles.** Blog posts, news stories, documentation pages, and other narrative content where hand-classing every element is impractical.
- **Quick prototyping.** When you want HDS-styled content without wiring up individual component classes.

## When to consider something else

- **Individual components.** If you control the markup, use component classes directly — [List](./components-list-guidance.md) (`.usa-list`), [Table](./components-table-guidance.md) (`.usa-table`), [Link](./components-link-guidance.md) (`.usa-link`). Component classes give more precise control and don't require a wrapper.
- **Application UI.** Forms, navigation, cards, and other interactive patterns should use their dedicated component markup, not prose.

## Usability guidance

- **Apply `.usa-prose` to the content container**, not to `<body>` or a site-wide wrapper. Keep the scope tight to avoid unintended styling on UI elements.
- **Prose styles apply to all descendant elements.** Nested components that use their own USWDS or HDS classes (`.usa-table`, `.usa-list`) will still use their component styles — component layer specificity wins over the prose bare-element rules.
- **Lists inside prose use native browser markers with HDS color.** Bullet and number markers use `--hds-palette-marker`. For the full HDS ordered-list treatment (DM Mono numerals, precise alignment), use `<ol class="usa-list" role="list">` instead. See [List](./components-list-guidance.md) for details.
- **Opt out of prose styling on a subtree.** Add `class="hds-global-styles-reset"` to any descendant inside `.usa-prose` to peel that subtree back to the cascade layer below, leaving its contents unstyled by prose. This is the same reset class used by [`.hds-global-styles`](./foundations-typography.md), so a single mechanism works across both opt-in scopes.

> **Differs from USWDS:** **Differs from USWDS:** HDS prose includes smaller list item text (14px vs body 16px), palette-aware blue list markers, a 68ch reading width constraint, and HDS-specific heading and blockquote typography. For DM Mono numerals in ordered lists, use `.usa-list`. Vanilla USWDS prose uses default browser markers and body-sized list text with no max-width.

## Accessibility

- Prose content uses semantic HTML elements (`<h1>`–`<h6>`, `<p>`, `<ul>`, `<ol>`, `<table>`, `<blockquote>`). Screen readers interpret these natively — no ARIA attributes needed for basic prose.
- Maintain a logical heading hierarchy. Don't skip heading levels (e.g., `<h2>` to `<h4>`).
- Ordered and unordered lists use native browser markers (not overridden with custom content), which preserves screen reader announcement. If you need `role="list"` for accessibility (recommended by the HDS accessibility spec for styled lists), use `.usa-list` markup instead.
- Links inside prose receive HDS dotted underline styling, which preserves link discoverability for users who don't perceive color.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS prose accessibility tests](https://designsystem.digital.gov/components/prose/accessibility-tests) for component-specific manual testing guidance.
