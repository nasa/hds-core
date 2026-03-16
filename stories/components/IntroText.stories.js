// ============================================================
// Intro Text Stories — @nasa/hds-core
// Covers §14 (USWDS .usa-intro override, Tier 1)
//
// Sidebar structure:
//   Guidance   — IntroText.mdx
//   Playground — interactive story with controls
// ============================================================

export default {
  title: 'Components/Intro Text',
};

// ---------------------------------------------------------------------------
// Reference stories (hidden from sidebar, embedded in Guidance via Canvas)
// ---------------------------------------------------------------------------

export const Default = {
  name: 'Default',
  tags: ['!dev'],
  render: () => `
    <p class="usa-intro">
      NASA's Artemis campaign is the next chapter in human space exploration.
      Working with commercial and international partners, NASA will establish
      a long-term presence at and around the Moon.
    </p>
  `,
};

export const WithBodyText = {
  name: 'With body text',
  tags: ['!dev'],
  render: () => `
    <p class="usa-intro">
      NASA's Artemis campaign is the next chapter in human space exploration.
    </p>
    <p>
      Working with commercial and international partners, NASA will establish
      a long-term presence at and around the Moon to prepare for future
      missions to Mars and beyond. The agency is building the Space Launch
      System rocket and Orion spacecraft for deep space exploration.
    </p>
  `,
};

export const InPaletteContext = {
  name: 'In palette context',
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
    </p>
  `,
};

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground = {
  args: {
    text: 'NASA\'s Artemis campaign is the next chapter in human space exploration.',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Intro paragraph text',
    },
  },
  render: (args) => `<p class="usa-intro">${args.text}</p>`,
};