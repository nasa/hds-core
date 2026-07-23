// ============================================================
// Intro Text Stories — @nasa-hds/core
// CSS: components/_intro-text.scss
//
// Sidebar structure:
//   Guidance   — IntroText.mdx (design rationale, Canvas embeds, usage rules)
//   Stories    — Default (visible in sidebar)
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

export default {
  title: 'Components/Intro Text',
};

// --- Stories (visible in sidebar) ---

export const Default = {
  args: {
    text: "NASA's Artemis campaign is the next chapter in human space exploration. Working with commercial and international partners, NASA will establish a long-term presence at and around the Moon.",
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Intro paragraph text',
    },
  },
  render: (args = {}) => {
    const {
      text = "NASA's Artemis campaign is the next chapter in human space exploration. Working with commercial and international partners, NASA will establish a long-term presence at and around the Moon.",
    } = args;
    return `<p class="usa-intro">${text}</p>`;
  },
};

// --- Guidance embeds (MDX only) ---

export const InPageContext = {
  name: 'In page context',
  tags: ['!dev'],
  render: () => `
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
  `,
};

// --- Palette accessibility tests ---

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: paletteA11yParams,
  render: paletteRender(Default.render),
};
