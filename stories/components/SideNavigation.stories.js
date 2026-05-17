import { expect } from 'storybook/test';
import { paletteA11yParams, paletteRender, pseudoParams } from '../helpers/paletteTests';
import { paletteModes } from '../../.storybook/modes';

const label = (text) => `<span class="hds-overline">${text}</span>`;

const sidenav = ({ content, ariaLabel = 'Secondary navigation' }) => `
  <nav aria-label="${ariaLabel}" style="max-width: 300px;">
    <ul class="usa-sidenav">
      ${content}
    </ul>
  </nav>
`;

const singleLevelContent = `
  <li class="usa-sidenav__item">
    <a href="#" class="usa-current" aria-current="page">Parent link (active)</a>
  </li>
  <li class="usa-sidenav__item">
    <a href="#">Parent link</a>
  </li>
  <li class="usa-sidenav__item">
    <a href="#">Parent link</a>
  </li>
`;

const multiLevelContent = `
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
`;

export default {
  title: 'Components/Side Navigation',
  parameters: {
    layout: 'padded',
  },
};

// ------------------------------------------------------------
// Sidebar stories
// ------------------------------------------------------------

export const AllVariants = {
  name: 'All variants',
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <div>
        ${label('Single level')}
        <div style="margin-top: 1rem;">
          ${sidenav({ content: singleLevelContent })}
        </div>
      </div>
      <div>
        ${label('Multi-level')}
        <div style="margin-top: 1rem;">
          ${sidenav({ content: multiLevelContent, ariaLabel: 'Tertiary navigation' })}
        </div>
      </div>
    </div>
  `,
};

export const SingleLevel = {
  name: 'Single level',
  render: () => sidenav({ content: singleLevelContent }),
};

export const MultiLevel = {
  name: 'Multi-level',
  render: () => sidenav({ content: multiLevelContent, ariaLabel: 'Tertiary navigation' }),
};

// ------------------------------------------------------------
// Palette accessibility tests
// ------------------------------------------------------------

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(AllVariants.render),
};

export const PaletteA11yHover = {
  name: 'Palette a11y [hover]',
  tags: ['!dev'],
  parameters: { ...paletteA11yParams, ...pseudoParams.hover },
  render: paletteRender(AllVariants.render),
};

// ------------------------------------------------------------
// Focus tests
// ------------------------------------------------------------

const focusParams = {
  chromatic: {
    disableSnapshot: false,
    modes: paletteModes,
    delay: 300,
  },
};

export const FocusSidenav = {
  name: 'Focus [sidenav]',
  tags: ['!dev'],
  parameters: focusParams,
  render: SingleLevel.render,
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const link = canvas.getByRole('link', { name: 'Parent link (active)' });
    await expect(link).toHaveFocus();
  },
};
