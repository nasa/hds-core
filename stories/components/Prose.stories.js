// ============================================================
// Prose — Storybook Stories
// @nasa/hds-core
// ============================================================
// Sidebar stories: Default
// Guidance embeds: !dev tagged for MDX Canvas references
// Palette tests: !dev tagged — one per palette to stay within
//   Chromatic's 25,000,000px snapshot limit. Does not use
//   paletteRender helper (stacking 6 full articles exceeds it).
// ============================================================

import { paletteA11yParams } from '../helpers/paletteTests';

// ============================================================
// Meta
// ============================================================

export default {
  title: 'Components/Prose',
  parameters: {
    docs: { page: null },
  },
};

// ============================================================
// 1. Helpers
// ============================================================

const prose = () => `
<div class="usa-prose">

  <h1>The Apollo Program</h1>

  <p class="usa-intro">
    NASA's Apollo program was one of the greatest achievements in human
    history. Between 1969 and 1972, twelve astronauts walked on the surface
    of the Moon — the first time human beings set foot on another world.
  </p>

  <h2>Road to the Moon</h2>

  <h3>The Mercury and Gemini foundations</h3>

  <p>
    Before Apollo could reach the Moon, NASA needed to prove that humans
    could survive and work in space. The
    <a href="#">Mercury program</a> accomplished this in the early 1960s,
    beginning with Alan Shepard's suborbital flight on May 5, 1961.
  </p>

  <h4>Gemini: learning to walk before you run</h4>

  <p>
    The <a href="#">Gemini program</a> flew ten crewed missions between 1965
    and 1966, developing the techniques Apollo would need: rendezvous and
    docking in orbit, extravehicular activity, and long-duration spaceflight.
  </p>

  <h5>Kennedy's challenge</h5>

  <p>
    On May 25, 1961, President John F. Kennedy committed the nation to
    "landing a man on the Moon and returning him safely to the Earth"
    before the end of the decade.
  </p>

  <h6>The cost of exploration</h6>

  <p>
    The Apollo program cost approximately $25.4 billion in 1970s dollars.
    At its peak, NASA's budget consumed roughly 4 percent of the federal
    budget.
  </p>

  <hr />

  <h2>Key missions</h2>

  <ol>
    <li>Apollo 7 (1968) — First crewed Apollo flight</li>
    <li>
      Apollo 8 (1968) — First crewed mission to orbit the Moon
      <ol>
        <li>First humans to see the far side of the Moon</li>
        <li>First "Earthrise" photograph</li>
      </ol>
    </li>
    <li>Apollo 11 (1969) — First Moon landing</li>
    <li>Apollo 13 (1970) — Crew returned safely after oxygen tank explosion</li>
    <li>Apollo 17 (1972) — Final Moon landing; longest lunar surface stay</li>
  </ol>

  <blockquote>
    <p>
      That's one small step for man, one giant leap for mankind.
    </p>
    <cite>Neil Armstrong, July 20, 1969</cite>
  </blockquote>

  <h2>The Saturn V rocket</h2>

  <p>
    The <a href="#">Saturn V</a> remains the most powerful rocket ever
    successfully flown. Standing 363 feet tall, it generated roughly
    7.5 million pounds of thrust at liftoff.
  </p>

  <ul>
    <li>
      First stage (S-IC) — Five F-1 engines burning kerosene and liquid oxygen
      <ul>
        <li>Produced 7.5 million pounds of thrust</li>
        <li>Burned for approximately 2 minutes 30 seconds</li>
      </ul>
    </li>
    <li>Second stage (S-II) — Five J-2 engines burning liquid hydrogen and liquid oxygen</li>
    <li>Third stage (S-IVB) — Single J-2 engine; reignited for translunar injection</li>
  </ul>

  <h2>Mission data</h2>

  <p>
    Ground Elapsed Time (<code>GET</code>) was measured from the moment of
    liftoff. All Apollo missions used GET as the primary timing reference.
  </p>

  <pre><code>APOLLO 11 — LUNAR SURFACE TIMELINE
===================================
Event                   GET (hhh:mm:ss)
-----------------------------------
Lunar contact           102:45:40
"The Eagle has landed"  102:45:43
First step on Moon      109:24:15
EVA termination         111:39:13</code></pre>

  <h2>Apollo by the numbers</h2>

  <table>
    <caption>Crewed Apollo lunar landing missions</caption>
    <thead>
      <tr>
        <th scope="col">Mission</th>
        <th scope="col">Date</th>
        <th scope="col">Landing site</th>
        <th scope="col">Time on surface</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Apollo 11</th>
        <td>July 1969</td>
        <td>Sea of Tranquility</td>
        <td>21 hours 36 minutes</td>
      </tr>
      <tr>
        <th scope="row">Apollo 12</th>
        <td>November 1969</td>
        <td>Ocean of Storms</td>
        <td>31 hours 31 minutes</td>
      </tr>
      <tr>
        <th scope="row">Apollo 15</th>
        <td>July 1971</td>
        <td>Hadley–Apennine</td>
        <td>66 hours 55 minutes</td>
      </tr>
      <tr>
        <th scope="row">Apollo 17</th>
        <td>December 1972</td>
        <td>Taurus–Littrow</td>
        <td>74 hours 59 minutes</td>
      </tr>
    </tbody>
  </table>

</div>
`;

const paletteProse = (palette) => `
<div class="hds-palette-${palette}">
  ${prose()}
</div>
`;

// ============================================================
// 2. Sidebar stories
// ============================================================

export const Default = {
  render: () => prose(),
};

// ============================================================
// 3. Guidance embeds (!dev)
// ============================================================

export const DefaultEmbed = {
  tags: ['!dev'],
  render: () => prose(),
};

// ============================================================
// 4. Palette tests (!dev)
//
// One story per palette instead of using paletteRender, because
// stacking 6 full articles in one story exceeds Chromatic's
// 25,000,000px snapshot limit.
// ============================================================

const prosePaletteParams = {
  ...paletteA11yParams,
  a11y: { ...paletteA11yParams.a11y, test: 'todo' },
};

export const PaletteA11yWhite = {
  name: 'Palette a11y [white]',
  tags: ['!dev'],
  parameters: prosePaletteParams,
  render: () => paletteProse('white'),
};

export const PaletteA11yLight = {
  name: 'Palette a11y [light]',
  tags: ['!dev'],
  parameters: prosePaletteParams,
  render: () => paletteProse('light'),
};

export const PaletteA11yMidtone = {
  name: 'Palette a11y [midtone]',
  tags: ['!dev'],
  parameters: prosePaletteParams,
  render: () => paletteProse('midtone'),
};

export const PaletteA11yDark = {
  name: 'Palette a11y [dark]',
  tags: ['!dev'],
  parameters: prosePaletteParams,
  render: () => paletteProse('dark'),
};

export const PaletteA11yBlue = {
  name: 'Palette a11y [blue]',
  tags: ['!dev'],
  parameters: prosePaletteParams,
  render: () => paletteProse('blue'),
};

export const PaletteA11yBlack = {
  name: 'Palette a11y [black]',
  tags: ['!dev'],
  parameters: prosePaletteParams,
  render: () => paletteProse('black'),
};
