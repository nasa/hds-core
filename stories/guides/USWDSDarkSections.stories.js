// ============================================================
// USWDS Dark Sections — Surface Mapping Check
// ============================================================
// The two USWDS layout contexts that paint their own dark
// surface: the hero callout and .usa-section--dark, which the
// graphic list sits on in the USWDS landing page template.
//
// USWDS fills both with color("primary-darker") and colors the
// headings inside them with color("accent-cool"). Under the HDS
// theme that reads as a NASA-red block with cyan headings, so
// base/_palettes.scss maps both surfaces onto the HDS dark
// palette instead (Issue #148).
//
// The palette story is the regression guard. It renders the same
// markup inside all six palette wrappers — the surfaces are
// expected to stay dark in every one — and axe-core checks the
// contrast of every heading, paragraph, link, and button that
// sits on them.
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Guides/Existing USWDS Site/Dark Sections',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
};

const hero = `
  <section class="usa-hero" aria-label="Introduction">
    <div class="grid-container">
      <div class="usa-hero__callout">
        <h1 class="usa-hero__heading">
          <span class="usa-hero__heading--alt">Hero callout:</span>Bring
          attention to a project priority
        </h1>
        <p>
          Support the callout with some short explanatory text. You don't need
          more than a couple of sentences.
        </p>
        <a class="usa-button" href="#">Call to action</a>
      </div>
    </div>
  </section>
`;

const graphicList = `
  <section class="usa-graphic-list usa-section usa-section--dark">
    <div class="grid-container">
      <div class="usa-graphic-list__row grid-row grid-gap">
        <div class="usa-media-block tablet:grid-col">
          <img class="usa-media-block__img" src="assets/img/circle-124.png" alt="" />
          <div class="usa-media-block__body">
            <h2 class="usa-graphic-list__heading">Graphic headings can vary.</h2>
            <p>
              Graphic headings can be used a few different ways, depending on
              what your landing page is for.
            </p>
            <a class="usa-link" href="#">Read the mission overview</a>
          </div>
        </div>
        <div class="usa-media-block tablet:grid-col">
          <img class="usa-media-block__img" src="assets/img/circle-124.png" alt="" />
          <div class="usa-media-block__body">
            <h2 class="usa-graphic-list__heading">Stick to 6 or fewer words.</h2>
            <p>
              Buttons and links inside the section pick up the same dark
              treatment as the surface they sit on.
            </p>
            <a class="usa-button" href="#">Call to action</a>
            <a class="usa-button usa-button--outline" href="#">On-page action</a>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

export const DarkSections = {
  name: 'Hero and dark section',
  tags: ['!dev'],
  render: () => `${hero}${graphicList}`,
};

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(DarkSections.render),
};
