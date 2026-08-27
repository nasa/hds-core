<!-- Source: ./stories/components/SiteAlert.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-site-alert-guidance--docs -->

# Site Alert

HDS site alerts use standard USWDS `.usa-site-alert` markup with HDS theming applied automatically.

> **Differs from Figma:** The HDS Figma spec calls this component "Banner." HDS Core uses "Site Alert" to match the USWDS component it maps to and to avoid confusion with the USWDS Banner (the government compliance bar).

## Emergency

Use the emergency variant for critical, time-sensitive alerts: government shutdowns, service outages, safety notices.

```html
<section class="usa-site-alert usa-site-alert--emergency" aria-label="Site alert">
  <div class="usa-alert">
    <div class="usa-alert__body">
      <h4 class="usa-alert__heading">Scheduled site maintenance</h4>
      <p class="usa-alert__text">
        NASA.gov will be undergoing maintenance on Saturday, March 22 from 10 p.m. to 2 a.m. ET. Some services may be
        temporarily unavailable.
      </p>
    </div>
  </div>
</section>
```

### Slim emergency

For brief, single-statement emergencies where a heading and icon aren't needed.

```html
<section
  class="usa-site-alert usa-site-alert--emergency usa-site-alert--slim usa-site-alert--no-icon"
  aria-label="Site alert"
>
  <div class="usa-alert">
    <div class="usa-alert__body">
      <p class="usa-alert__text">Due to the lapse in federal government funding, NASA is not updating this website.</p>
    </div>
  </div>
</section>
```

### Emergency without icon

```html
<section class="usa-site-alert usa-site-alert--emergency usa-site-alert--no-icon" aria-label="Site alert">
  <div class="usa-alert">
    <div class="usa-alert__body">
      <h4 class="usa-alert__heading">Notice</h4>
      <p class="usa-alert__text">Due to the lapse in federal government funding, NASA is not updating this website.</p>
    </div>
  </div>
</section>
```

## Informational

Use the informational variant for non-urgent announcements: live events, language redirects, content advisories.

```html
<section class="usa-site-alert usa-site-alert--info" aria-label="Site alert">
  <div class="usa-alert">
    <div class="usa-alert__body">
      <h4 class="usa-alert__heading">NASA TV live event</h4>
      <p class="usa-alert__text">
        The NASA Administrator will hold a media briefing on the Artemis II mission today at 2 p.m. ET.
        <a class="usa-link" href="#">Watch live on NASA TV</a>.
      </p>
    </div>
  </div>
</section>
```

### Slim informational

```html
<section class="usa-site-alert usa-site-alert--info usa-site-alert--slim" aria-label="Site alert">
  <div class="usa-alert">
    <div class="usa-alert__body">
      <p class="usa-alert__text">
        Esta página solo está disponible en inglés. <a class="usa-link" href="#">Ir a NASA en español</a>.
      </p>
    </div>
  </div>
</section>
```

### Informational without icon

```html
<section class="usa-site-alert usa-site-alert--info usa-site-alert--no-icon" aria-label="Site alert">
  <div class="usa-alert">
    <div class="usa-alert__body">
      <h4 class="usa-alert__heading">Informational statement</h4>
      <p class="usa-alert__text">
        Additional context and followup information including <a class="usa-link" href="#">a link</a>.
      </p>
    </div>
  </div>
</section>
```

## When to use the site alert component

- **Critical announcements** that apply to the entire site, not just one page.
- **Time-sensitive information** that users need before interacting with any page content.
- **Lapse in appropriations** or other government-wide notices.

## When to consider something else

- **Page-specific notices** — use an [Alert](https://designsystem.digital.gov/components/alert/) within the page body instead.
- **Announcements with a call-to-action, dismiss button, or "Live!" badge** — these HDS Figma patterns are not yet supported in HDS Core.
- **The government compliance bar** ("An official website of the United States government") — that's the [USWDS Banner](https://designsystem.digital.gov/components/banner/), a separate component.

## Usability guidance

- Place site alerts above the global nav, before all other page content.
- Keep text short. If your message needs more than a sentence or two, link to a full page with details.
- Use emergency sparingly — reserve it for situations that genuinely require immediate attention.
- Use one site alert at a time. Multiple stacked alerts dilute urgency.
- Once a situation resolves, remove the alert. Stale alerts erode trust.

## Accessibility

- Wrap the site alert in a `<section>` element with `aria-label="Site alert"`.
- Use a heading element (`<h4>`) for the `.usa-alert__heading` when present. The heading level should be appropriate for your page's outline.
- Tab order proceeds left-to-right through any interactive elements (links, buttons) inside the alert.
- The recommended markup shown above includes all necessary ARIA attributes.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS site alert accessibility tests](https://designsystem.digital.gov/components/site-alert/accessibility-tests/) for component-specific manual testing guidance.
