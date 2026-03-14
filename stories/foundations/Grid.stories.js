export default {
  title: 'Foundations/Grid',
  parameters: {
    layout: 'fullscreen',
  },
};

const colDemo = (count) => {
  let cols = '';
  for (let i = 0; i < count; i++) {
    cols += `<div class="grid-col" style="
      background: var(--hds-color-nasa-blue, #1C67E3);
      opacity: 0.15;
      min-height: 3rem;
      border-left: 1px solid rgba(0,0,0,0.08);
      border-right: 1px solid rgba(0,0,0,0.08);
    "></div>`;
  }
  return cols;
};

// ============================================================
// Story 1: Breakpoints
// ============================================================

export const Breakpoints = {
  name: 'Breakpoints',
  render: () => `
    <div style="padding: 2rem; max-width: 72em; margin: 0 auto;">

      <h1>Grid &amp; Breakpoints</h1>
      <p class="usa-intro">
        The basis of the NASA.gov website is a strong foundation for positioning
        elements on screen. Designing to the grid helps create seamless, easy to
        follow experiences, as well as visual consistency across different screen sizes.
      </p>

      <hr />

      <h2>HDS Core Breakpoints</h2>
      <p>All breakpoints use 12 columns. Gutters increase at wider breakpoints
        to create more whitespace between columns.</p>

      <table style="width: 100%; border-collapse: collapse; margin-block: 2rem;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Breakpoint</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Range</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Cols</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Gutter</th>
            <th style="text-align: left; padding: 0.75rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">HDS Origin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>mobile</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">≥320px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">12</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">4px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Small (Mobile)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>mobile-lg</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">≥480px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">12</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">4px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Small (Mobile)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>tablet</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">≥640px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">12</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">16px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Medium (Tablet)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>tablet-lg</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">≥880px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">12</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">16px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Medium (Tablet)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>desktop</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">≥1024px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">12</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">16px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Large (Desktop)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>desktop-lg</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">≥1200px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">12</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">16px</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Large (Desktop)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem;"><code>widescreen</code></td>
            <td style="padding: 0.5rem;">≥1400px</td>
            <td style="padding: 0.5rem;">12</td>
            <td style="padding: 0.5rem;">24px</td>
            <td style="padding: 0.5rem;">XL (Display)</td>
          </tr>
        </tbody>
      </table>

      <div style="background: var(--hds-color-carbon-05, #F6F6F6); border-left: 4px solid var(--hds-color-nasa-blue, #1C67E3); padding: 1.5rem; margin-block: 2rem;">
        <strong>TV Breakpoint (Deferred)</strong>
        <p style="margin-block: 0.5rem 0;">
          The original HDS spec defines a TV breakpoint at 1920px. This is deferred in HDS Core
          because USWDS does not have a built-in TV breakpoint. It will be revisited when
          TV-scale layouts are needed.
        </p>
      </div>

      <hr />

      <h2>Live 12-Column Grid</h2>
      <p>Resize your browser to see the grid respond. Uses USWDS
        <code>.grid-container</code>, <code>.grid-row</code>, and
        <code>.grid-col</code> classes.</p>

      <div class="grid-container" style="margin-block: 2rem;">
        <div class="grid-row grid-gap">
          ${colDemo(12)}
        </div>
      </div>

      <h3>Common Layouts</h3>

      <p style="font-size: 0.8rem; opacity: 0.7; margin-block-end: 0.5rem;">2 + 10 (sidebar + content)</p>
      <div class="grid-container" style="margin-block-end: 1.5rem;">
        <div class="grid-row grid-gap">
          <div class="grid-col-2" style="background: var(--hds-color-nasa-red, #F64137); opacity: 0.2; min-height: 3rem;"></div>
          <div class="grid-col-10" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        </div>
      </div>

      <p style="font-size: 0.8rem; opacity: 0.7; margin-block-end: 0.5rem;">3 + 3 + 3 + 3 (card grid)</p>
      <div class="grid-container" style="margin-block-end: 1.5rem;">
        <div class="grid-row grid-gap">
          <div class="grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
          <div class="grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
          <div class="grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
          <div class="grid-col-3" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
        </div>
      </div>

      <p style="font-size: 0.8rem; opacity: 0.7; margin-block-end: 0.5rem;">8 + 4 (content + aside)</p>
      <div class="grid-container" style="margin-block-end: 1.5rem;">
        <div class="grid-row grid-gap">
          <div class="grid-col-8" style="background: var(--hds-color-nasa-blue, #1C67E3); opacity: 0.15; min-height: 3rem;"></div>
          <div class="grid-col-4" style="background: var(--hds-color-nasa-red, #F64137); opacity: 0.2; min-height: 3rem;"></div>
        </div>
      </div>

    </div>
  `,
};

// ============================================================
// Story 2: Grid Settings & Glossary
// ============================================================

export const GridSettings = {
  name: 'Settings & Glossary',
  render: () => `
    <div style="padding: 2rem; max-width: 72em; margin: 0 auto;">

      <h1>Grid Settings &amp; Glossary</h1>
      <p class="usa-intro">
        Definitions of grid terminology and the USWDS settings that control
        grid behavior in HDS Core.
      </p>

      <hr />

      <h2>Glossary</h2>

      <dl style="margin-block: 2rem;">
        <dt><strong>Margin</strong></dt>
        <dd style="margin-inline-start: 0; margin-block-end: 1.5rem;">
          The outer whitespace around the grid container. Wider margins are more
          appropriate for larger screens. HDS Core uses <code>units(2)</code> (16px) margins
          on mobile and <code>units(4)</code> (32px) on desktop+.
        </dd>

        <dt><strong>Gutter</strong></dt>
        <dd style="margin-inline-start: 0; margin-block-end: 1.5rem;">
          The space between columns. Gutter widths are fixed values at each
          breakpoint range. Wider gutters create more whitespace between columns
          on larger screens.
        </dd>

        <dt><strong>Column</strong></dt>
        <dd style="margin-inline-start: 0; margin-block-end: 1.5rem;">
          Columns make up the content width of your design. All designs sit within
          the width of the columns. Columns change width depending on screen size.
          HDS Core uses 12 columns at all breakpoints.
        </dd>

        <dt><strong>Layout Region</strong></dt>
        <dd style="margin-inline-start: 0; margin-block-end: 1.5rem;">
          Areas of the layout that contain content. Layout regions can span over any
          number of columns and resize with the grid.
        </dd>

        <dt><strong>Fixed Grid</strong></dt>
        <dd style="margin-inline-start: 0; margin-block-end: 1.5rem;">
          Has a maximum width and is designed for simple screens and content-specific
          pages. The width allows for maximum readability in large and high-definition screens.
        </dd>

        <dt><strong>Fluid Grid</strong></dt>
        <dd style="margin-inline-start: 0; margin-block-end: 1.5rem;">
          Uses 100% of the screen's width. Designed for complex screens and web
          applications. Best used for application workflows and UI.
        </dd>
      </dl>

      <hr />

      <h2>USWDS Grid Settings</h2>
      <p>These settings are configured in <code>_hds-uswds-theme.scss</code>:</p>

      <table style="width: 100%; border-collapse: collapse; margin-block: 2rem;">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Setting</th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Value</th>
            <th style="text-align: left; padding: 0.5rem; border-bottom: 2px solid var(--hds-palette-border, #D1D1D1);">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$theme-grid-container-max-width</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>"widescreen"</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Container max-width (1400px)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$theme-site-margins-breakpoint</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>"desktop"</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Breakpoint where margins switch from mobile to desktop</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$theme-site-margins-mobile-width</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>2</code> (16px)</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Site margins below desktop</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$theme-site-margins-width</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>4</code> (32px)</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Site margins at desktop+</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$theme-column-gap-sm</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>2px</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Small gutter</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$theme-column-gap-md</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>2</code> (16px)</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Medium gutter</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$theme-column-gap-lg</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>3</code> (24px)</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Large gutter</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>$theme-column-gap-mobile</code></td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);"><code>2</code> (16px)</td>
            <td style="padding: 0.5rem; border-bottom: 1px solid var(--hds-palette-border, #E3E3E3);">Responsive gutter (mobile)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem;"><code>$theme-column-gap-desktop</code></td>
            <td style="padding: 0.5rem;"><code>4</code> (32px)</td>
            <td style="padding: 0.5rem;">Responsive gutter (desktop+)</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <h2>Using the Grid in Markup</h2>

      <pre><code>&lt;!-- Basic 12-column container --&gt;
&lt;div class="grid-container"&gt;
  &lt;div class="grid-row grid-gap"&gt;
    &lt;div class="grid-col-8"&gt;Main content&lt;/div&gt;
    &lt;div class="grid-col-4"&gt;Sidebar&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- Responsive columns --&gt;
&lt;div class="grid-container"&gt;
  &lt;div class="grid-row grid-gap"&gt;
    &lt;div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"&gt;
      Card
    &lt;/div&gt;
    &lt;div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"&gt;
      Card
    &lt;/div&gt;
    &lt;div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"&gt;
      Card
    &lt;/div&gt;
    &lt;div class="grid-col-12 tablet:grid-col-6 desktop:grid-col-3"&gt;
      Card
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- Reverse column order on mobile (HDS utility) --&gt;
&lt;div class="grid-container"&gt;
  &lt;div class="grid-row grid-gap grid-reverse-mobile"&gt;
    &lt;div class="grid-col-8"&gt;Appears second on mobile&lt;/div&gt;
    &lt;div class="grid-col-4"&gt;Appears first on mobile&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

      <p>
        For full USWDS grid documentation, see the
        <a class="usa-link usa-link--external" href="https://designsystem.digital.gov/utilities/layout-grid/">
          USWDS Layout Grid<span class="usa-sr-only">(external)</span></a>.
      </p>

    </div>
  `,
};