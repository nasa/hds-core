<!-- Source: ./stories/components/Table.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-table-guidance--docs -->
# Table

A table shows information in columns and rows. Uses standard USWDS [table markup](https://designsystem.digital.gov/components/table/) with `.usa-table`.

```html
<table class="usa-table" aria-describedby="basic-desc">
  <caption>Moon missions by decade</caption>
  <thead>
    <tr>
      <th scope="col">Mission</th>
      <th scope="col">Year</th>
      <th scope="col">Agency</th>
      <th scope="col">Outcome</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Apollo 11</th>
      <td>1969</td>
      <td>NASA</td>
      <td>Success</td>
    </tr>
    <tr>
      <th scope="row">Apollo 13</th>
      <td>1970</td>
      <td>NASA</td>
      <td>Aborted</td>
    </tr>
    <tr>
      <th scope="row">Luna 24</th>
      <td>1976</td>
      <td>Soviet Union</td>
      <td>Success</td>
    </tr>
    <tr>
      <th scope="row">Chandrayaan-3</th>
      <td>2023</td>
      <td>ISRO</td>
      <td>Success</td>
    </tr>
    <tr>
      <th scope="row">Artemis II</th>
      <td>2025</td>
      <td>NASA</td>
      <td>Planned</td>
    </tr>
  </tbody>
</table>
<p class="hds-caption" id="basic-desc">Source: NASA History Division. Last updated March 2026.</p>
```

Tables support inline text links and icon buttons. Use `.usa-link` for text links and `.hds-btn-icon` for action buttons like downloads. External links automatically show the diagonal arrow.

```html
<table class="usa-table">
  <caption>Mission documents</caption>
  <thead>
    <tr>
      <th scope="col">Document</th>
      <th scope="col">Mission</th>
      <th scope="col">Type</th>
      <th scope="col">Size</th>
      <th scope="col">Source</th>
      <th scope="col">Download</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
        <a class="usa-link" href="#">Artemis I Press Kit</a>
      </th>
      <td>Artemis I</td>
      <td>PDF</td>
      <td>4.2 MB</td>
      <td>
        <a class="usa-link" href="#">NASA Technical Reports</a>
      </td>
      <td>
        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download Artemis I Press Kit" type="button">
          <svg class="hds-icon" aria-hidden="true" focusable="false">
            <use xlink:href="assets/img/hds-sprite.svg#download"></use>
          </svg>
        </button>
      </td>
    </tr>
    <tr>
      <th scope="row">
        <a class="usa-link" href="#">Orion Heat Shield Analysis</a>
      </th>
      <td>Artemis I</td>
      <td>PDF</td>
      <td>12.8 MB</td>
      <td>
        <a class="usa-link usa-link--external" href="https://arc.aiaa.org">AIAA Digital Library</a>
      </td>
      <td>
        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download Orion Heat Shield Analysis" type="button">
          <svg class="hds-icon" aria-hidden="true" focusable="false">
            <use xlink:href="assets/img/hds-sprite.svg#download"></use>
          </svg>
        </button>
      </td>
    </tr>
    <tr>
      <th scope="row">
        <a class="usa-link" href="#">SLS Block 1 Fact Sheet</a>
      </th>
      <td>Artemis II</td>
      <td>PDF</td>
      <td>1.1 MB</td>
      <td>
        <a class="usa-link" href="#">NASA Facts Online</a>
      </td>
      <td>
        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download SLS Block 1 Fact Sheet" type="button">
          <svg class="hds-icon" aria-hidden="true" focusable="false">
            <use xlink:href="assets/img/hds-sprite.svg#download"></use>
          </svg>
        </button>
      </td>
    </tr>
    <tr>
      <th scope="row">
        <a class="usa-link" href="#">Crew Biographical Data</a>
      </th>
      <td>Artemis II</td>
      <td>HTML</td>
      <td>—</td>
      <td>
        <a class="usa-link usa-link--external" href="https://en.wikipedia.org">Wikipedia</a>
      </td>
      <td>—</td>
    </tr>
    <tr>
      <th scope="row">
        <a class="usa-link" href="#">Lunar Surface Science Plan</a>
      </th>
      <td>Artemis III</td>
      <td>PDF</td>
      <td>8.5 MB</td>
      <td>
        <a class="usa-link usa-link--external" href="https://scholar.google.com">Google Scholar</a>
      </td>
      <td>
        <button class="hds-btn-icon hds-btn-icon--secondary" aria-label="Download Lunar Surface Science Plan" type="button">
          <svg class="hds-icon" aria-hidden="true" focusable="false">
            <use xlink:href="assets/img/hds-sprite.svg#download"></use>
          </svg>
        </button>
      </td>
    </tr>
  </tbody>
</table>
```

## Variants

### Caption with subtitle

The `<caption>` element serves as the table's title and accessible name. Wrap the title in `<strong>` and add a `<span>` for an optional subtitle. Both are visible to all users.

Attribution or source text goes below the table using the `.hds-caption` class, linked via `aria-describedby`.

```html
<table class="usa-table" aria-describedby="capsub-desc">
  <caption><strong>Close approach data</strong><span>Close approaches to the Earth by near-Earth objects (NEOs)</span></caption>
  <thead>
    <tr>
      <th scope="col">Object</th>
      <th scope="col">Close-approach date</th>
      <th scope="col" class="text-right">Distance (AU)</th>
      <th scope="col" class="text-right">Velocity (km/s)</th>
      <th scope="col">Diameter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">2021 TX1</th>
      <td>2021-Oct-07</td>
      <td class="text-right">1.27</td>
      <td class="text-right">17.82</td>
      <td>9.3 m – 21 m</td>
    </tr>
    <tr>
      <th scope="row">2015 TQ21</th>
      <td>2021-Oct-07</td>
      <td class="text-right">10.70</td>
      <td class="text-right">20.73</td>
      <td>8.8 m – 20 m</td>
    </tr>
    <tr>
      <th scope="row">2021 TZ1</th>
      <td>2021-Oct-09</td>
      <td class="text-right">3.74</td>
      <td class="text-right">4.17</td>
      <td>5.7 m – 13 m</td>
    </tr>
    <tr>
      <th scope="row">2021 TS3</th>
      <td>2021-Oct-14</td>
      <td class="text-right">10.85</td>
      <td class="text-right">4.15</td>
      <td>9.7 m – 22 m</td>
    </tr>
    <tr>
      <th scope="row">2020 KA</th>
      <td>2021-Nov-06</td>
      <td class="text-right">14.89</td>
      <td class="text-right">4.85</td>
      <td>8.4 m – 19 m</td>
    </tr>
  </tbody>
</table>
<p class="hds-caption" id="capsub-desc">This table shows close approaches to the Earth by near-Earth objects (NEOs). Data are not available prior to 1900 A.D. nor after 2200 A.D.</p>
```

> **Differs from USWDS:** USWDS styles `` as a small bold label. HDS styles it as a heading with an optional subtitle line. The markup is the same — only the visual treatment differs.

### Sortable

Add `data-sortable` to any sortable `<th>`. USWDS JavaScript handles sorting automatically. Set a default sort column with `aria-sort="ascending"` or `aria-sort="descending"`. Columns without `data-sortable` are not interactive.

Include an `aria-live` region immediately after the table so screen readers announce sort changes.

```html
<table class="usa-table" aria-describedby="sortable-desc">
  <caption>Planetary fact sheet</caption>
  <thead>
    <tr>
      <th scope="col" data-sortable="" aria-label="Planet, sortable column, currently unsorted">Planet<button tabindex="0" class="usa-table__header__button" title="Click to sort by Planet in ascending order.">
          <svg class="usa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g class="descending" fill="transparent">
              <path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
            </g>
            <g class="ascending" fill="transparent">
              <path transform="rotate(180, 12, 12)" d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
            </g>
            <g class="unsorted" fill="transparent">
              <polygon points="15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15"></polygon>
            </g>
          </svg></button></th>
      <th scope="col" data-sortable="" class="text-right" aria-label="Mass (10²⁴ kg), sortable column, currently unsorted">Mass (10²⁴ kg)<button tabindex="0" class="usa-table__header__button" title="Click to sort by Mass (10²⁴ kg) in ascending order.">
          <svg class="usa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g class="descending" fill="transparent">
              <path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
            </g>
            <g class="ascending" fill="transparent">
              <path transform="rotate(180, 12, 12)" d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
            </g>
            <g class="unsorted" fill="transparent">
              <polygon points="15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15"></polygon>
            </g>
          </svg></button></th>
      <th scope="col" data-sortable="" class="text-right" aria-label="Diameter (km), sortable column, currently unsorted">Diameter (km)<button tabindex="0" class="usa-table__header__button" title="Click to sort by Diameter (km) in ascending order.">
          <svg class="usa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g class="descending" fill="transparent">
              <path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
            </g>
            <g class="ascending" fill="transparent">
              <path transform="rotate(180, 12, 12)" d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
            </g>
            <g class="unsorted" fill="transparent">
              <polygon points="15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15"></polygon>
            </g>
          </svg></button></th>
      <th scope="col" data-sortable="" aria-sort="descending" class="text-right" aria-label="Gravity (m/s²), sortable column, currently sorted descending">Gravity (m/s²)<button tabindex="0" class="usa-table__header__button" title="Click to sort by Gravity (m/s²) in ascending order.">
          <svg class="usa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g class="descending" fill="transparent">
              <path d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
            </g>
            <g class="ascending" fill="transparent">
              <path transform="rotate(180, 12, 12)" d="M17 17L15.59 15.59L12.9999 18.17V2H10.9999V18.17L8.41 15.58L7 17L11.9999 22L17 17Z"></path>
            </g>
            <g class="unsorted" fill="transparent">
              <polygon points="15.17 15 13 17.17 13 6.83 15.17 9 16.58 7.59 12 3 7.41 7.59 8.83 9 11 6.83 11 17.17 8.83 15 7.42 16.41 12 21 16.59 16.41 15.17 15"></polygon>
            </g>
          </svg></button></th>
      <th scope="col">Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Mercury</th>
      <td data-sort-value="0.330" class="text-right">0.330</td>
      <td data-sort-value="4879" class="text-right">4,879</td>
      <td data-sort-value="3.7" class="text-right" data-sort-active="true">3.7</td>
      <td>Terrestrial</td>
    </tr>
    <tr>
      <th scope="row">Venus</th>
      <td data-sort-value="4.87" class="text-right">4.87</td>
      <td data-sort-value="12104" class="text-right">12,104</td>
      <td data-sort-value="8.9" class="text-right" data-sort-active="true">8.9</td>
      <td>Terrestrial</td>
    </tr>
    <tr>
      <th scope="row">Earth</th>
      <td data-sort-value="5.97" class="text-right">5.97</td>
      <td data-sort-value="12756" class="text-right">12,756</td>
      <td data-sort-value="9.8" class="text-right" data-sort-active="true">9.8</td>
      <td>Terrestrial</td>
    </tr>
    <tr>
      <th scope="row">Mars</th>
      <td data-sort-value="0.642" class="text-right">0.642</td>
      <td data-sort-value="6792" class="text-right">6,792</td>
      <td data-sort-value="3.7" class="text-right" data-sort-active="true">3.7</td>
      <td>Terrestrial</td>
    </tr>
    <tr>
      <th scope="row">Jupiter</th>
      <td data-sort-value="1898" class="text-right">1,898</td>
      <td data-sort-value="142984" class="text-right">142,984</td>
      <td data-sort-value="23.1" class="text-right" data-sort-active="true">23.1</td>
      <td>Gas giant</td>
    </tr>
    <tr>
      <th scope="row">Saturn</th>
      <td data-sort-value="568" class="text-right">568</td>
      <td data-sort-value="120536" class="text-right">120,536</td>
      <td data-sort-value="9.0" class="text-right" data-sort-active="true">9.0</td>
      <td>Gas giant</td>
    </tr>
  </tbody>
</table>
<div class="usa-sr-only usa-table__announcement-region" aria-live="polite"></div>
<p class="hds-caption" id="sortable-desc">Source: NASA Planetary Fact Sheet. Values are approximate.</p>
```

### Borderless

Removes row borders and header background. Best for tables with more text than numbers.

```html
<table class="usa-table usa-table--borderless">
  <caption>Orbital parameters</caption>
  <thead>
    <tr>
      <th scope="col">Parameter</th>
      <th scope="col">Value</th>
      <th scope="col">Unit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Distance to Moon</th>
      <td>384,400</td>
      <td>km</td>
    </tr>
    <tr>
      <th scope="row">Orbital period</th>
      <td>27.3</td>
      <td>days</td>
    </tr>
    <tr>
      <th scope="row">Surface gravity</th>
      <td>1.62</td>
      <td>m/s²</td>
    </tr>
  </tbody>
</table>
```

### Compact

Reduced padding for dense numerical data. Not recommended for text-heavy content.

```html
<table class="usa-table usa-table--compact">
  <caption>Element abundance</caption>
  <thead>
    <tr>
      <th scope="col">Element</th>
      <th scope="col">Symbol</th>
      <th scope="col">Atomic number</th>
      <th scope="col" class="text-right">Solar abundance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Hydrogen</th>
      <td>H</td>
      <td>1</td>
      <td class="text-right">73.46%</td>
    </tr>
    <tr>
      <th scope="row">Helium</th>
      <td>He</td>
      <td>2</td>
      <td class="text-right">24.85%</td>
    </tr>
    <tr>
      <th scope="row">Oxygen</th>
      <td>O</td>
      <td>8</td>
      <td class="text-right">0.77%</td>
    </tr>
    <tr>
      <th scope="row">Carbon</th>
      <td>C</td>
      <td>6</td>
      <td class="text-right">0.29%</td>
    </tr>
    <tr>
      <th scope="row">Neon</th>
      <td>Ne</td>
      <td>10</td>
      <td class="text-right">0.13%</td>
    </tr>
    <tr>
      <th scope="row">Iron</th>
      <td>Fe</td>
      <td>26</td>
      <td class="text-right">0.10%</td>
    </tr>
  </tbody>
</table>
```

### Scrollable

Horizontal scroll for tables with many columns.

```html
<div class="usa-table-container--scrollable" tabindex="0">

<table class="usa-table">
  <caption>Mission timeline</caption>
  <thead>
    <tr>
      <th scope="col">Mission</th>
      <th scope="col">Launch date</th>
      <th scope="col">Vehicle</th>
      <th scope="col">Launch site</th>
      <th scope="col">Duration</th>
      <th scope="col">Orbit type</th>
      <th scope="col">Crew size</th>
      <th scope="col">Primary objective</th>
      <th scope="col">Secondary objective</th>
      <th scope="col">Landing site</th>
      <th scope="col">Recovery</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Artemis I</th>
      <td>Nov 16, 2022</td>
      <td>SLS Block 1</td>
      <td>KSC LC-39B</td>
      <td>25d 10h</td>
      <td>Lunar DRO</td>
      <td>0 (uncrewed)</td>
      <td>Orion flight test</td>
      <td>Heat shield reentry test</td>
      <td>Pacific Ocean</td>
      <td>USS Portland</td>
      <td>Complete</td>
    </tr>
    <tr>
      <th scope="row">Artemis II</th>
      <td>Apr 2026</td>
      <td>SLS Block 1</td>
      <td>KSC LC-39B</td>
      <td>~10 days</td>
      <td>Lunar flyby</td>
      <td>4</td>
      <td>Crewed lunar flyby</td>
      <td>Life support validation</td>
      <td>Pacific Ocean</td>
      <td>TBD</td>
      <td>Planned</td>
    </tr>
    <tr>
      <th scope="row">Artemis III</th>
      <td>2027</td>
      <td>SLS Block 1</td>
      <td>KSC LC-39B</td>
      <td>~30 days</td>
      <td>Lunar orbit + landing</td>
      <td>4</td>
      <td>Crewed lunar landing</td>
      <td>South pole exploration</td>
      <td>Lunar south pole</td>
      <td>TBD</td>
      <td>Planned</td>
    </tr>
  </tbody>
</table>

</div>
```

> **Differs from USWDS:** USWDS stacked table variants (`.usa-table--stacked` and `.usa-table--stacked-header`) for mobile layouts are not yet tested with HDS styling. Use the scrollable variant for mobile-friendly tables.

## When to use a table

- **Displaying tabular data** such as statistics, directories, or structured lists.
- **Comparing values** across multiple items with the same attributes.
- **Sortable datasets** where users need to reorder by different columns.

## When to consider something else

- For **non-tabular content**, consider [lists](https://designsystem.digital.gov/components/list) or cards.
- For **complex data relationships**, consider charts or infographics. See [Data Visualization](./foundations-data-visualization.md).
- For **long-form content**, use headings and paragraphs or an [Accordion](./components-accordion-guidance.md).
- Don't use tables for **page layout** — use the [grid](./foundations-grid.md).
- For very large datasets, consider providing a **file download** instead of rendering the full table on the page.

## Usability guidance

- **Name every table** with a `<caption>` — it serves as both the visual title and the accessible name. Include source and date attribution below the table using `.hds-caption`.
- **Always include a header row** with short, clear labels.
- **Minimize columns.** Signs of too many: simple content breaking to multiple lines, or header text being truncated. Use the scrollable variant as a fallback.
- **Keep cell content brief.** If cells need multiple sentences, consider a different format.
- **Right-align summable numbers** with the USWDS `text-right` utility class on both header and body cells. Don't center-align text or numbers.
- **Keep decimal places consistent** within each numerical column.
- **Tabular numerals are built in.** All table body cells use equal-width digits for clean column alignment — no extra classes needed.
- **Add `data-sort-value`** to cells with formatted numbers (commas, currency, percentages) so sorting works correctly.

> **Differs from Figma:** The HDS Figma spec includes advanced table features (filter panel, search, download, print actions, mobile accordion layout) and does not define a striped variant. The USWDS `.usa-table--striped` class works but is not HDS-specified. Advanced features and striped styling are planned for future review.

## Accessibility

- Use `<caption>` to name every table — screen readers announce it when entering the table.
- Use `scope="col"` on column headers and `scope="row"` on row headers.
- Link attribution text to the table via `aria-describedby`.
- Sortable tables must include an `aria-live="polite"` region immediately after the `<table>` element.
- Scrollable containers must have `tabindex="0"` for keyboard access.

See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS table accessibility tests](https://designsystem.digital.gov/components/table/accessibility-tests/) for component-specific manual testing guidance.
