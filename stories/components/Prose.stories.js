// ============================================================
// Prose — Storybook Stories
// @nasa/hds-core
// ============================================================
// Sidebar stories: Default
// Guidance embeds: !dev tagged for MDX Canvas references
// Palette tests: !dev tagged for automated a11y contrast
//
// Prose wraps CMS/markdown content where individual component
// classes can't be applied. Tests bare-element HDS styling
// (headings, paragraphs, lists, tables, blockquotes, code, hr).
// ============================================================

import { paletteA11yParams, paletteRender } from '../helpers/paletteTests';

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
    beginning with Alan Shepard's suborbital flight on May 5, 1961, and
    reaching a milestone when John Glenn became the first American to orbit
    Earth on February 20, 1962.
  </p>

  <h4>Gemini: learning to walk before you run</h4>

  <p>
    The <a href="#">Gemini program</a> flew ten crewed missions between 1965
    and 1966, developing the techniques Apollo would need: rendezvous and
    docking in orbit, extravehicular activity, and long-duration spaceflight.
    Without Gemini, the Moon landings would not have been possible on
    President Kennedy's timeline.
  </p>

  <h5>Kennedy's challenge</h5>

  <p>
    On May 25, 1961, President John F. Kennedy addressed a joint session of
    Congress and committed the nation to "landing a man on the Moon and
    returning him safely to the Earth" before the end of the decade. At the
    time, the United States had accumulated just fifteen minutes of human
    spaceflight experience.
  </p>

  <h6>The cost of exploration</h6>

  <p>
    The Apollo program cost approximately $25.4 billion in 1970s dollars.
    At its peak, NASA's budget consumed roughly 4 percent of the federal
    budget — compared to less than half a percent today.
  </p>

  <hr />

  <h2>Apollo missions</h2>

  <p>
    The Apollo program flew a total of eleven crewed missions between 1968
    and 1972. The first crewed flight,
    <a href="#">Apollo 7</a>, tested the Command Module in Earth orbit in
    October 1968. Just two months later,
    <a href="#">Apollo 8</a> carried Frank Borman, Jim Lovell, and William
    Anders on the first crewed voyage to orbit the Moon — capturing the
    iconic <a href="#">"Earthrise"</a> photograph on Christmas Eve, 1968.
  </p>

  <h3>The first Moon landing</h3>

  <p>
    Apollo 11 launched on July 16, 1969, carrying Commander Neil Armstrong,
    Lunar Module Pilot Buzz Aldrin, and Command Module Pilot Michael Collins.
    Four days later, on July 20, Armstrong and Aldrin landed the lunar module
    Eagle in the Sea of Tranquility while Collins orbited overhead in the
    command module Columbia.
  </p>

  <blockquote>
    <p>
      That's one small step for man, one giant leap for mankind.
    </p>
    <cite>Neil Armstrong, July 20, 1969</cite>
  </blockquote>

  <h3>Key milestones by mission</h3>

  <ol>
    <li>
      Apollo 7 (1968) — First crewed Apollo flight; tested the Command
      Module in Earth orbit
    </li>
    <li>
      Apollo 8 (1968) — First crewed mission to orbit the Moon
      <ol>
        <li>First humans to see the far side of the Moon</li>
        <li>First "Earthrise" photograph</li>
        <li>Christmas Eve broadcast watched by an estimated one billion people</li>
      </ol>
    </li>
    <li>Apollo 9 (1969) — First crewed flight of the Lunar Module in Earth orbit</li>
    <li>Apollo 10 (1969) — Full dress rehearsal in lunar orbit</li>
    <li>Apollo 11 (1969) — First Moon landing</li>
    <li>Apollo 12 (1969) — Precision landing near the Surveyor 3 probe</li>
    <li>Apollo 13 (1970) — Mission aborted after oxygen tank explosion; crew returned safely</li>
    <li>Apollo 14 (1971) — Alan Shepard becomes the oldest person to walk on the Moon</li>
    <li>Apollo 15 (1971) — First use of the Lunar Roving Vehicle</li>
    <li>Apollo 16 (1972) — First landing in the lunar highlands</li>
    <li>Apollo 17 (1972) — Final Moon landing; longest lunar surface stay</li>
  </ol>

  <h2>The Saturn V rocket</h2>

  <p>
    The <a href="#">Saturn V</a> remains the most powerful rocket ever
    successfully flown. Standing 363 feet tall — taller than the Statue of
    Liberty — it generated roughly 7.5 million pounds of thrust at liftoff.
    Its three stages burned in sequence to deliver the Apollo spacecraft from
    the launch pad at Kennedy Space Center to lunar trajectory.
  </p>

  <ul>
    <li>
      First stage (S-IC) — Five F-1 engines burning kerosene and liquid oxygen
      <ul>
        <li>Produced 7.5 million pounds of thrust</li>
        <li>Burned for approximately 2 minutes 30 seconds</li>
        <li>Built by The Boeing Company at the Michoud Assembly Facility in New Orleans</li>
      </ul>
    </li>
    <li>
      Second stage (S-II) — Five J-2 engines burning liquid hydrogen and liquid oxygen
      <ul>
        <li>Carried the vehicle to near-orbital velocity</li>
        <li>
          Burned for approximately 6 minutes
          <ul>
            <li>Interstage ring jettisoned after separation from first stage</li>
            <li>Launch escape tower jettisoned during S-II burn</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>Third stage (S-IVB) — Single J-2 engine; reignited for translunar injection</li>
  </ul>

  <h2>Mission data</h2>

  <p>
    Each Apollo mission produced thousands of hours of telemetry. Ground
    controllers at the <a href="#">Manned Spacecraft Center</a> in Houston
    monitored streams of data formatted in fixed-width fields:
  </p>

  <pre><code>APOLLO 11 — LUNAR SURFACE TIMELINE
===================================
Event                   GET (hhh:mm:ss)
-----------------------------------
Lunar contact           102:45:40
Engine shutdown         102:45:42
"The Eagle has landed"  102:45:43
Cabin depressurization  109:07:00
First step on Moon      109:24:15
EVA termination         111:39:13</code></pre>

  <p>
    Ground Elapsed Time (<code>GET</code>) was measured from the moment of
    liftoff. All Apollo missions used GET as the primary timing reference
    rather than clock time, since the spacecraft crossed multiple time zones
    and the Moon has no local time convention.
  </p>

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
        <th scope="row">Apollo 14</th>
        <td>February 1971</td>
        <td>Fra Mauro</td>
        <td>33 hours 31 minutes</td>
      </tr>
      <tr>
        <th scope="row">Apollo 15</th>
        <td>July 1971</td>
        <td>Hadley–Apennine</td>
        <td>66 hours 55 minutes</td>
      </tr>
      <tr>
        <th scope="row">Apollo 16</th>
        <td>April 1972</td>
        <td>Descartes Highlands</td>
        <td>71 hours 2 minutes</td>
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
// ============================================================

export const PaletteA11y = {
  name: 'Palette a11y',
  tags: ['!dev'],
  parameters: {
    ...paletteA11yParams,
    a11y: { ...paletteA11yParams.a11y, test: 'todo' },
  },
  render: paletteRender(Default.render),
};
