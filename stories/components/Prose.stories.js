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

  <h1>Great Smoky Mountains National Park</h1>

  <p class="usa-intro">
    Great Smoky Mountains National Park straddles the border of North Carolina
    and Tennessee. World renowned for its diversity of plant and animal life,
    the beauty of its ancient mountains, and the quality of its remnants of
    Southern Appalachian mountain culture, this is America's most visited
    national park.
  </p>

  <h2>About the park</h2>

  <h3>Landscape and wildlife</h3>

  <p>
    The sprawling landscape encompasses lush forests and an abundance of
    wildflowers that bloom year-round. Streams, rivers and waterfalls appear
    along hiking routes that include a segment of the
    <a href="#">Appalachian Trail</a>.
  </p>

  <h4>Biodiversity</h4>

  <p>
    Right now scientists think that we only know about 17 percent of the plants
    and animals that live in the park, or about 17,000 species of a probable
    100,000 different organisms.
  </p>

  <p>
    The park is home to the largest collection of
    <a href="#">old-growth hardwood forest</a> remaining in the eastern United
    States. It protects the most diverse ecosystem of salamanders in the world
    — earning it the nickname "Salamander Capital of the World."
  </p>

  <h5>Visiting the park</h5>

  <p>
    Entrance to Great Smoky Mountains National Park is free. The park is one of
    the few national parks where no entrance fees are charged.
  </p>

  <h6>Seasonal notes</h6>

  <p>
    Peak wildflower season runs from mid-March through mid-May. Fall color
    typically peaks in mid-October at the highest elevations.
  </p>

  <hr />

  <h2>Unordered list</h2>

  <ul>
    <li>Unordered list item</li>
    <li>Unordered list item</li>
    <li>
      Unordered list item with nested children
      <ul>
        <li>Nested unordered list item</li>
        <li>
          Nested unordered list item
          <ul>
            <li>Third-level nesting</li>
            <li>Third-level nesting</li>
            <li>Third-level nesting</li>
          </ul>
        </li>
        <li>Nested unordered list item</li>
        <li>Nested unordered list item</li>
      </ul>
    </li>
  </ul>

  <h2>Ordered list</h2>

  <p>
    Right now scientists think that we only know about 17 percent of the plants
    and animals that live in the park.
  </p>

  <ol>
    <li>Ordered list item</li>
    <li>
      Ordered list item with nested children
      <ol>
        <li>Nested ordered list item</li>
        <li>Nested ordered list item</li>
        <li>Nested ordered list item</li>
        <li>Nested ordered list item</li>
      </ol>
    </li>
    <li>Ordered list item</li>
  </ol>

  <h2>Blockquote</h2>

  <blockquote>
    <p>
      The mountains are calling and I must go.
    </p>
    <cite>John Muir</cite>
  </blockquote>

  <h2>Code</h2>

  <p>
    The park's elevation ranges from 875 feet at the mouth of Abrams Creek
    to 6,643 feet at the summit of
    <code>Clingmans Dome</code> — the highest point in Tennessee.
  </p>

  <pre><code>// Elevation data
const clingmansDome = {
  elevation: 6643,
  unit: 'feet',
  state: 'Tennessee'
};</code></pre>

  <h2>Table</h2>

  <table>
    <caption>Notable park documents</caption>
    <thead>
      <tr>
        <th scope="col">Document title</th>
        <th scope="col">Description</th>
        <th scope="col">Year</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Park Establishment Act</th>
        <td>
          Authorized the creation of Great Smoky Mountains National Park
          from purchased and donated land.
        </td>
        <td>1934</td>
      </tr>
      <tr>
        <th scope="row">UNESCO Designation</th>
        <td>
          Recognized as a World Heritage Site for its outstanding natural
          values and biodiversity.
        </td>
        <td>1983</td>
      </tr>
      <tr>
        <th scope="row">International Biosphere Reserve</th>
        <td>
          Designated as part of the UNESCO Man and the Biosphere Programme
          for conservation and research.
        </td>
        <td>1976</td>
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
  parameters: paletteA11yParams,
  render: paletteRender(Default.render),
};
