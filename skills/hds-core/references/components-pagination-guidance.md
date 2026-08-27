<!-- Source: ./stories/components/Pagination.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-pagination-guidance--docs -->
# Pagination

Pagination allows users to move between pages of content. HDS pagination uses standard USWDS [`.usa-pagination`](https://designsystem.digital.gov/components/pagination/) markup for numbered variants, with no need for additional classes. The simplified variant (Previous/Next only) uses HDS-specific markup.

Pagination state logic (active page, ellipsis placement, disabled arrows) is your application's responsibility. See the USWDS pagination guidance for slot behaviors and implementation details.

## Variants

### Bounded (known page count)

Use bounded pagination when the total number of pages is known. The last page is always visible as the final slot. When there are more than 7 pages, ellipsis slots collapse intermediate pages. Previous and next arrows disable at the boundaries.

```html
    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page" disabled="">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Page 1" aria-current="page">1</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 2">2</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 3">3</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 4">4</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 5">5</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Last page, page 20">20</a>
        </li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
```

Ellipsis position, boundary behavior, and edge cases:

```html
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <span class="hds-overline">Middle page (6 of 20) — ellipsis on both sides</span>

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 1">1</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 5">5</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Page 6" aria-current="page">6</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 7">7</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Last page, page 20">20</a>
        </li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
      </div>
      <div>
        <span class="hds-overline">Near end (17 of 20) — ellipsis shifts left</span>

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 1">1</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 16">16</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Page 17" aria-current="page">17</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 18">18</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 19">19</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Last page, page 20">20</a>
        </li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
      </div>
      <div>
        <span class="hds-overline">Last page (20 of 20) — next arrow disabled</span>

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 1">1</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 16">16</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 17">17</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 18">18</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 19">19</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Last page, page 20" aria-current="page">20</a>
        </li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page" disabled="">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
      </div>
      <div>
        <span class="hds-overline">All pages visible (7 pages) — no ellipsis</span>

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page" disabled="">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Page 1" aria-current="page">1</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 2">2</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 3">3</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 4">4</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 5">5</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 6">6</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Last page, page 7">7</a>
        </li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
      </div>
      <div>
        <span class="hds-overline">Minimal (2 pages)</span>

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page" disabled="">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Page 1" aria-current="page">1</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Last page, page 2">2</a>
        </li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
      </div>
    </div>
```

### Unbounded (unknown page count)

Use unbounded pagination when the total number of pages is unknown — for example, search results sorted by relevance where deeper pages have diminishing relevance. No last page is shown. The sequence ends with a trailing ellipsis.

```html
    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 1">1</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 2">2</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Page 3" aria-current="page">3</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 4">4</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 5">5</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
```

### Simplified (small screens)

For mobile viewports or touch-heavy contexts, a simplified Previous/Next pattern replaces numbered pages. Each direction is a single interactive element — the icon circle and text label share one focus box and one click target.

```html
    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">
        <li class="usa-pagination__item usa-pagination__arrow">
          <button class="hds-pagination__simplified-btn" aria-label="Previous page">

<svg class="hds-icon" aria-hidden="true" role="img">
  <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
</svg>
            <span class="hds-pagination__simplified-text">Previous</span>
          </button>
        </li>
        <li class="usa-pagination__item usa-pagination__arrow">
          <button class="hds-pagination__simplified-btn" aria-label="Next page">
            <span class="hds-pagination__simplified-text">Next</span>

<svg class="hds-icon" aria-hidden="true" role="img">
  <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
          </button>
        </li>
      </ul>
    </nav>
```

Boundary states — disabled previous on first page, disabled next on last:

```html
  <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    <div>
      <span class="hds-overline">First page — previous disabled</span>

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">
        <li class="usa-pagination__item usa-pagination__arrow">
          <button class="hds-pagination__simplified-btn" disabled="" aria-label="Previous page">

<svg class="hds-icon" aria-hidden="true" role="img">
  <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
</svg>
            <span class="hds-pagination__simplified-text">Previous</span>
          </button>
        </li>
        <li class="usa-pagination__item usa-pagination__arrow">
          <button class="hds-pagination__simplified-btn" aria-label="Next page">
            <span class="hds-pagination__simplified-text">Next</span>

<svg class="hds-icon" aria-hidden="true" role="img">
  <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
          </button>
        </li>
      </ul>
    </nav>
    </div>
    <div>
      <span class="hds-overline">Last page — next disabled</span>

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">
        <li class="usa-pagination__item usa-pagination__arrow">
          <button class="hds-pagination__simplified-btn" aria-label="Previous page">

<svg class="hds-icon" aria-hidden="true" role="img">
  <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
</svg>
            <span class="hds-pagination__simplified-text">Previous</span>
          </button>
        </li>
        <li class="usa-pagination__item usa-pagination__arrow">
          <button class="hds-pagination__simplified-btn" disabled="" aria-label="Next page">
            <span class="hds-pagination__simplified-text">Next</span>

<svg class="hds-icon" aria-hidden="true" role="img">
  <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
</svg>
          </button>
        </li>
      </ul>
    </nav>
    </div>
  </div>
```

> **Differs from Figma:** The HDS Figma spec suggests simplified pagination for 5 or fewer pages on mobile. HDS Core treats this as a screen-size and context decision rather than a strict page-count rule — simplified can be used at any page count on small screens.

### All variants

All three pagination types at a glance.

```html
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <span class="hds-overline">Bounded (page 6 of 20)</span>
        <div style="margin-top: 0.5rem;">

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 1">1</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 5">5</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Page 6" aria-current="page">6</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 7">7</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Last page, page 20">20</a>
        </li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
        </div>
      </div>
      <div>
        <span class="hds-overline">Unbounded (page 10)</span>
        <div style="margin-top: 0.5rem;">

    <nav class="usa-pagination" aria-label="Pagination">
      <ul class="usa-pagination__list">

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Previous page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg></button>
    </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 1">1</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 9">9</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button usa-current" href="#" aria-label="Page 10" aria-current="page">10</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 11">11</a>
        </li>

        <li class="usa-pagination__item usa-pagination__page-no">
          <a class="usa-pagination__button" href="#" aria-label="Page 12">12</a>
        </li>
<li class="usa-pagination__item usa-pagination__overflow" aria-label="ellipsis indicating non-visible pages"><span>…</span></li>

    <li class="usa-pagination__item usa-pagination__arrow">
      <button class="hds-btn-icon hds-btn-icon--utility hds-btn-icon--xl" aria-label="Next page">
  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg></button>
    </li>
      </ul>
    </nav>
        </div>
      </div>
      <div>
        <span class="hds-overline">Simplified (page 2 of 5)</span>
        <div style="margin-top: 0.5rem;">

      <nav class="usa-pagination" aria-label="Pagination">
        <ul class="usa-pagination__list">
          <li class="usa-pagination__item usa-pagination__arrow">
            <button class="hds-pagination__simplified-btn" aria-label="Previous page">

  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-left"></use>
  </svg>
              <span class="hds-pagination__simplified-text">Previous</span>
            </button>
          </li>
          <li class="usa-pagination__item usa-pagination__arrow">
            <button class="hds-pagination__simplified-btn" aria-label="Next page">
              <span class="hds-pagination__simplified-text">Next</span>

  <svg class="hds-icon" aria-hidden="true" role="img">
    <use href="assets/img/hds-sprite.svg#arrow-chevron-right"></use>
  </svg>
            </button>
          </li>
        </ul>
      </nav>
        </div>
      </div>
    </div>
```

## When to use the pagination component

- **Large content sets** — search results, data tables, article lists, image galleries split across multiple pages.
- **Known page count** — use bounded pagination. Users can see how many pages exist and jump to specific pages.
- **Unknown page count** — use unbounded pagination. Common for search results where the total is uncalculated or changes frequently.

## When to consider something else

- **Infinite scroll** — for continuous-feed content where explicit page boundaries add friction.
- **"Load more" button** — when users prefer appending content to the current view.
- **Few items** — if everything fits on one screen, pagination adds unnecessary interaction.
- **Step-by-step processes** — use a step indicator. Pagination shows position in a data set, not progress through a workflow.
- **Meaningful groupings** — if content is grouped by subject or theme, use side navigation instead.

## Usability guidance

- **Always disable the boundary arrow.** When on page 1, the previous arrow is disabled. For bounded pagination, disable the next arrow on the last page. Never hide the arrows — the layout should stay stable.
- **Keep the current page visible.** The bottom-bar indicator and heading-weight text make the active page immediately scannable.
- **Don't combine with infinite scroll.** Pick one pattern. Mixing creates conflicting mental models.

> **Differs from Figma:** The HDS Figma spec includes a rows-per-page filter alongside pagination. This composed pattern requires a dropdown menu component and is deferred to a future phase.

## Legacy USWDS support

The recommended markup shown above uses HDS [icon buttons](./components-icon-button-guidance.md) for the previous/next arrows. If your site already uses standard USWDS pagination markup, HDS Core CSS restyling is applied automatically — no markup changes are required to get the HDS look.

The tradeoff: legacy USWDS markup retains the USWDS chevron icons inside the HDS circle container rather than the HDS chevrons, and some state behaviors may be less precise. For new implementations, use the recommended markup above.

```html
<!-- Legacy USWDS markup — supported but not recommended for new sites -->
<li class="usa-pagination__item usa-pagination__arrow">
  <a class="usa-pagination__link usa-pagination__previous-page" href="#" aria-label="Previous page">
    <svg class="usa-icon" aria-hidden="true" role="img">
      <use href="/assets/img/sprite.svg#navigate_before"></use>
    </svg>
    <span class="usa-pagination__link-text">Previous</span>
  </a>
</li>
```

> **Differs from USWDS:** USWDS pagination uses anchor tags with visible "Previous"/"Next" text labels and inline SVG arrows. HDS Core CSS hides the text labels visually and applies the circle container. The simplified variant (Previous/Next with text) has no USWDS equivalent — it uses HDS-specific markup. Update to the recommended markup when practical for full fidelity.

## Accessibility

- **Keyboard navigation:** Users navigate between pagination controls with **Tab** and **Shift+Tab**, and activate them with **Enter** or **Space**.
- **Navigation landmark:** Wrap pagination in a `<nav>` element with `aria-label="Pagination"`. If you have multiple pagination components on one page, give each a unique `aria-label`.
- **Current page:** The active page link must include `aria-current="page"`.
- **Page link labels:** Add `aria-label="Page [number]"` to each page link. For the last page in a bounded set, use `aria-label="Last page, page [number]"`.
- **Ellipsis labels:** Each overflow indicator should have `aria-label="ellipsis indicating non-visible pages"`.
- **Disabled arrows:** The recommended markup uses `<button disabled>`, which automatically removes the element from the tab order. If using legacy USWDS anchor markup, add `aria-disabled="true"` and remove the `href`.
- **Arrow labels:** Previous and next buttons have no visible text in numbered variants — each must have `aria-label="Previous page"` or `aria-label="Next page"`.
- **Icon attributes:** Chevron SVGs inside buttons are decorative — use `aria-hidden="true"`.

The recommended markup shown in the variant examples above includes all necessary ARIA attributes. See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS pagination accessibility tests](https://designsystem.digital.gov/components/pagination/accessibility-tests/) for component-specific manual testing guidance.

Previous/next arrows follow the same accessibility patterns as [Icon Button](./components-icon-button-guidance.md); see that page's Accessibility section for additional guidance on icon-only interactive elements.
