<!-- Source: ./stories/components/InPageNavigation.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-in-page-navigation-guidance--docs -->
# In-Page Navigation

A fixed sidebar for navigating long-form content. USWDS JavaScript automatically generates the link list from headings in a specified content area and highlights the current section as the user scrolls.

> **Differs from Figma:** HDS Figma calls this "Tertiary / Local Navigation." HDS Core uses the USWDS component name "In-Page Navigation" to match the markup.

```html
    <div class="usa-in-page-nav-container">
      <aside class="usa-in-page-nav" data-title-text="Contents" data-title-heading-level="h4" data-heading-elements="h2 h3" data-main-content-selector="#default-content" data-minimum-heading-count="3"><nav aria-label="Contents" class="usa-in-page-nav__nav"><h4 class="usa-in-page-nav__heading" tabindex="0">Contents</h4><ul class="usa-in-page-nav__list"><li class="usa-in-page-nav__item usa-in-page-nav__item--primary"><a href="#overview" class="usa-in-page-nav__link">Overview</a></li><li class="usa-in-page-nav__item usa-in-page-nav__item--primary"><a href="#artemis-missions" class="usa-in-page-nav__link">Artemis Missions</a></li><li class="usa-in-page-nav__item"><a href="#artemis-i" class="usa-in-page-nav__link">Artemis I</a></li><li class="usa-in-page-nav__item"><a href="#artemis-ii" class="usa-in-page-nav__link">Artemis II</a></li><li class="usa-in-page-nav__item"><a href="#artemis-iii" class="usa-in-page-nav__link usa-current">Artemis III</a></li><li class="usa-in-page-nav__item usa-in-page-nav__item--primary"><a href="#lunar-gateway" class="usa-in-page-nav__link">Lunar Gateway</a></li><li class="usa-in-page-nav__item usa-in-page-nav__item--primary"><a href="#science-at-the-south-pole" class="usa-in-page-nav__link">Science at the South Pole</a></li><li class="usa-in-page-nav__item"><a href="#viper-rover" class="usa-in-page-nav__link">VIPER Rover</a></li><li class="usa-in-page-nav__item"><a href="#surface-experiments" class="usa-in-page-nav__link">Surface Experiments</a></li><li class="usa-in-page-nav__item usa-in-page-nav__item--primary"><a href="#international-partners" class="usa-in-page-nav__link">International Partners</a></li></ul></nav></aside>
      <main id="default-content" class="main-content usa-prose">
        <h2><a id="overview" class="usa-anchor"></a>Overview</h2>
<p>The Artemis program aims to land the first woman and first person
      of color on the Moon, establish a sustainable presence, and prepare for
      future human missions to Mars.</p>
<h2><a id="artemis-missions" class="usa-anchor"></a>Artemis Missions</h2>
<p>The Artemis campaign includes a series of increasingly complex
      missions, each building on the last to expand human exploration of the
      lunar surface.</p><h3><a id="artemis-i" class="usa-anchor"></a>Artemis I</h3>
<p>An uncrewed flight test that sent the Orion spacecraft around
          the Moon and back, validating systems for future crewed missions.</p>
<h3><a id="artemis-ii" class="usa-anchor"></a>Artemis II</h3>
<p>The first crewed Artemis flight, sending four astronauts on a
          lunar flyby to test Orion's life support and navigation systems.</p>
<h3><a id="artemis-iii" class="usa-anchor"></a>Artemis III</h3>
<p>The first crewed lunar landing since Apollo 17, targeting the
          lunar south pole where water ice may be accessible.</p>
<h2><a id="lunar-gateway" class="usa-anchor"></a>Lunar Gateway</h2>
<p>A small space station in lunar orbit that will serve as a staging
      point for missions to the Moon's surface and eventually deeper into the
      solar system.</p>
<h2><a id="science-at-the-south-pole" class="usa-anchor"></a>Science at the South Pole</h2>
<p>The lunar south pole features permanently shadowed craters that may
      contain water ice — a resource that could support long-duration exploration
      and serve as rocket propellant.</p><h3><a id="viper-rover" class="usa-anchor"></a>VIPER Rover</h3>
<p>The Volatiles Investigating Polar Exploration Rover will map
          and drill for water ice near the lunar south pole.</p>
<h3><a id="surface-experiments" class="usa-anchor"></a>Surface Experiments</h3>
<p>Artemis astronauts will deploy instruments to study the lunar
          environment, including seismometers, heat probes, and sample
          collection tools.</p>
<h2><a id="international-partners" class="usa-anchor"></a>International Partners</h2>
<p>Artemis includes contributions from ESA, JAXA, CSA, and other
      international partners, reflecting a shared commitment to peaceful
      exploration.</p>
      </main>
    </div>
```

## When to use

- **Long pages with clear sections.** In-page navigation works best for pages with three or more distinct content sections, or content that exceeds three or more viewport heights.
- **Encyclopedic reference pages.** Pages with a defined hierarchical structure benefit from the fixed sidebar and optional second-level links for subsections.
- **Long-form articles.** Articles with a linear narrative or list structure where readers may want to jump between sections.

## When to consider something else

- **Short pages.** If the page requires little or no scrolling, in-page navigation adds unnecessary complexity.
- **Unstructured content.** Pages that lack heading-based hierarchy cannot use this component — USWDS JavaScript builds the nav from heading elements.
- **Infinite scrolling.** In-page navigation is not practical for pages with dynamically loaded content.

## Usability guidance

- **Place the `aside` before your content area in source order.** USWDS positions it as a sticky sidebar at tablet breakpoints and above. Below tablet, the nav is hidden.
- **Use clear, concise headings.** USWDS JavaScript copies heading text directly into the nav links — verbose headings make the sidebar harder to scan.
- **Don't include the page `h1`.** By default, the component scans for `h2` and `h3` headings. The page title is already visible above the navigation.
- **Limit top-level sections.** More than about 10 `h2` headings makes the nav difficult to scan. Consider consolidating or using `h3` subsections for deeper structure.
- **Keyboard users reach the navigation first.** The `aside` precedes `main` in source order, so keyboard users encounter the nav links before the page content. This is intentional — tabbing through the entire page before reaching navigation links would diminish the user experience.

### Initialization properties

USWDS JavaScript reads data attributes from the `aside` element to configure behavior. These must be set before the component initializes. All properties are optional — defaults are shown below.

| Property                     | Description                                                                | Default           |
| ---------------------------- | -------------------------------------------------------------------------- | ----------------- |
| `data-title-text`            | Text of the navigation heading.                                            | `"Contents"` \*   |
| `data-title-heading-level`   | Heading level of the navigation title.                                     | `h4`              |
| `data-heading-elements`      | Which heading levels to include in the link list.                          | `h2 h3`           |
| `data-main-content-selector` | Element to scan for headings (class or ID selector).                       | `<main>`          |
| `data-scroll-offset`         | Pixels to offset scroll position from the top.                             | `0`               |
| `data-root-margin`           | Observable margin for calculating the current section (CSS margin syntax). | `0px 0px 0px 0px` |
| `data-threshold`             | How much of a section must be visible before it becomes current (0–1).     | `1`               |
| `data-minimum-heading-count` | Minimum headings required for the component to initialize.                 | `3` \*            |

\* HDS defaults differ from USWDS. USWDS defaults `data-title-text` to `"On this page"` and `data-minimum-heading-count` to `2`. HDS recommends `"Contents"` to match the Figma spec and `3` because fewer sections typically indicate a short page that does not need in-page navigation.

### Customizing initialization

Sites can override any property to match their content structure. Set all properties on the `aside` element before USWDS JavaScript runs:

```html
<aside class="usa-in-page-nav" data-title-text="In this article" data-title-heading-level="h3" data-heading-elements="h2" data-main-content-selector="#article-body" data-scroll-offset="80" data-root-margin="0px 0px -30% 0px" data-threshold="0.8" data-minimum-heading-count="5"></aside>
```

> **How this works:** USWDS JavaScript is required for scroll spy and nav link generation. If you render this component dynamically (e.g., in a React or Vue app without [react-uswds](https://github.com/trussworks/react-uswds)), reinitialize after mount — see the [React Setup](/?path=/docs/guides-react-guidance--docs) guide.

## Accessibility

- USWDS JavaScript generates a `nav` element inside the `aside` with an `aria-label` derived from the title text (e.g., "Contents"). Confirm this label is present in your rendered output.
- **Keyboard:** Tab moves between nav links. Enter activates a link, scrolling to the target section.
- **Tab order:** Keyboard users reach the navigation before the main content because the `aside` precedes `main` in source order.
- **Focus on activation:** When a keyboard user activates a nav link, focus moves to the target section. When a mouse user clicks, focus stays on the clicked link.
- Do not skip heading levels in your content (e.g., `h2` to `h4`). The generated nav and screen readers both depend on a logical heading hierarchy.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS in-page navigation accessibility tests](https://designsystem.digital.gov/components/in-page-navigation/) for component-specific manual testing guidance.
