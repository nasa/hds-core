<!-- Source: ./stories/components/SideNavigation.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-side-navigation-guidance--docs -->
# Side Navigation

The side navigation component is a vertical list of links used for navigating between pages within a section or topic.

```html
  <div style="display: flex; flex-direction: column; gap: 3rem;">
    <div>
      <span class="hds-overline">Single level</span>
      <div style="margin-top: 1rem;">

<nav aria-label="Secondary navigation" style="max-width: 300px;">
  <ul class="usa-sidenav">

<li class="usa-sidenav__item">
  <a href="#" class="usa-current" aria-current="page">Parent link (active)</a>
</li>
<li class="usa-sidenav__item">
  <a href="#">Parent link</a>
</li>
<li class="usa-sidenav__item">
  <a href="#">Parent link</a>
</li>

  </ul>
</nav>

      </div>
    </div>
    <div>
      <span class="hds-overline">Multi-level</span>
      <div style="margin-top: 1rem;">

<nav aria-label="Tertiary navigation" style="max-width: 300px;">
  <ul class="usa-sidenav">

<li class="usa-sidenav__item">
  <a href="#">Parent link</a>
</li>
<li class="usa-sidenav__item">
  <a href="#" class="usa-current">Parent link (active)</a>
  <ul class="usa-sidenav__sublist">
    <li class="usa-sidenav__item">
      <a href="#">Child link</a>
    </li>
    <li class="usa-sidenav__item">
      <a href="#" class="usa-current">Child link (active)</a>
      <ul class="usa-sidenav__sublist">
        <li class="usa-sidenav__item">
          <a href="#">Grandchild link</a>
        </li>
        <li class="usa-sidenav__item">
          <a href="#" class="usa-current" aria-current="page">Grandchild link (active)</a>
        </li>
      </ul>
    </li>
    <li class="usa-sidenav__item">
      <a href="#">Child link</a>
    </li>
  </ul>
</li>
<li class="usa-sidenav__item">
  <a href="#">Parent link</a>
</li>

  </ul>
</nav>

      </div>
    </div>
  </div>
```

## Variants

### Single Level

The default implementation uses a flat, single-level hierarchy.

```html
<nav aria-label="Secondary navigation" style="max-width: 300px;">
  <ul class="usa-sidenav">

<li class="usa-sidenav__item">
  <a href="#" class="usa-current" aria-current="page">Parent link (active)</a>
</li>
<li class="usa-sidenav__item">
  <a href="#">Parent link</a>
</li>
<li class="usa-sidenav__item">
  <a href="#">Parent link</a>
</li>

  </ul>
</nav>
```

### Multi-Level

The component supports nested hierarchies up to three levels deep (parent, child, grandchild) using the `usa-sidenav__sublist` markup. Minor spacing refinements for deep nesting are in progress, but the component is functionally complete.

```html
<nav aria-label="Tertiary navigation" style="max-width: 300px;">
  <ul class="usa-sidenav">

<li class="usa-sidenav__item">
  <a href="#">Parent link</a>
</li>
<li class="usa-sidenav__item">
  <a href="#" class="usa-current">Parent link (active)</a>
  <ul class="usa-sidenav__sublist">
    <li class="usa-sidenav__item">
      <a href="#">Child link</a>
    </li>
    <li class="usa-sidenav__item">
      <a href="#" class="usa-current">Child link (active)</a>
      <ul class="usa-sidenav__sublist">
        <li class="usa-sidenav__item">
          <a href="#">Grandchild link</a>
        </li>
        <li class="usa-sidenav__item">
          <a href="#" class="usa-current" aria-current="page">Grandchild link (active)</a>
        </li>
      </ul>
    </li>
    <li class="usa-sidenav__item">
      <a href="#">Child link</a>
    </li>
  </ul>
</li>
<li class="usa-sidenav__item">
  <a href="#">Parent link</a>
</li>

  </ul>
</nav>
```

## When to use

- To display a list of pages within the current section or topic.
- In conjunction with a documentation or multi-column layout where the left rail is reserved for section wayfinding.

## When to consider something else

- For navigating to anchor links within the current page, use [In-Page Navigation](./components-in-page-navigation-guidance.md).
- For global navigation across major site sections, a header navigation pattern is more appropriate than side navigation.
- For small sites with fewer than five pages, side navigation may be unnecessary — a simpler navigation pattern or direct links may be more appropriate.
- If a page already has both horizontal and vertical navigation, consider simplifying the existing navigation before adding a side navigation component.

## Usability guidance

- **Link labels:** Keep labels short and scannable. Use shorter derivatives of page titles when possible.
- **Testing:** Test deep hierarchies with real content. Three levels of nesting can create cognitive overload if labels are long or sections are large.
- **Markup structure:** Use `usa-sidenav` for the root list, `usa-sidenav__item` for list items, and `usa-sidenav__sublist` for nested lists.
- **Active state tracking:** For nested lists, apply the `usa-current` class to the active link and all of its active ancestors (the parent and child trail). This maintains the visual highlight tree. Apply `aria-current="page"` **only** to the specific terminal link the user is viewing.

## Legacy USWDS support

Side navigation is fully supported in HDS Core. Existing USWDS sites using `.usa-sidenav` will work with the HDS theme. A future Secondary Navigation component may offer additional patterns for section wayfinding, but side navigation is not being replaced or deprecated.

## Accessibility

- **Component behavior:** Side navigation is a CSS-only component. It does not depend on JavaScript for expand/collapse behavior. The visible hierarchy is determined entirely by where `usa-current` is applied in the HTML markup.
- **Keyboard navigation:** Tabbing moves sequentially through all visible links. Nested sublists displayed via `usa-current` on a parent are part of the tab order. All levels must be reachable without skipping.
- **Screen reader expectations:** Users expect standard HTML list navigation (`<ul>`, `<li>`) to announce the number of items in the current level.
- **Contrast:** Active state contrast across all six HDS palettes has been verified via automated Chromatic palette accessibility tests.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS side navigation accessibility tests](https://designsystem.digital.gov/components/side-navigation/accessibility-tests/) for component-specific manual testing guidance.
