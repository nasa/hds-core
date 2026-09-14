// ============================================================
// Component Status — @nasa-hds/core
// ============================================================
// Component lifecycle statuses from COMPONENTS.md. The manager
// (sidebar markers) and the preview (Guidance page badges) are
// separate bundles, so the map lives here instead of in both.
//
// A component declares its status with a literal tag:
//
//   export default {
//     title: 'Components/My Component',
//     tags: ['status:experimental'],
//   };
//
// Keep the array literal. The Storybook indexer can't read tags
// from variables or spreads.
//
// Two surfaces, two treatments:
//   - Sidebar: a compact `sidebar` marker (emoji), shown only when
//     set. `stable` has none — it's the default, and a marker on
//     every component would be noise.
//   - Guidance page: the full `label` + `description` badge, shown
//     for every status including stable.
//
// Colors are HDS tokens hardcoded here, because neither the manager
// nor the preview bundle loads hds.css: International Orange,
// Active Green, NASA Red.
// ============================================================

export const COMPONENT_STATUSES = {
  'status:experimental': {
    label: 'Experimental',
    sidebar: '🚧',
    description: 'Shipped and usable, but design or API may change without a deprecation cycle.',
    bg: '#FFF2E8',
    fg: '#8A4B0F',
    border: '#EA6F24',
  },
  'status:stable': {
    label: 'Stable',
    sidebar: null, // no sidebar marker — stable is the default
    description: 'Design and markup are settled, documented, and tested.',
    bg: '#E8F5EC',
    fg: '#1B5E33',
    border: '#47DA84',
  },
  'status:deprecated': {
    label: 'Deprecated',
    sidebar: '⌛',
    description: 'Scheduled for removal, with a named replacement.',
    bg: '#FDEAE9',
    fg: '#8C1912',
    border: '#F64137',
  },
};

export const STATUS_TAGS = Object.keys(COMPONENT_STATUSES);

/** First recognised status tag in a list, or null. */
export const findStatusTag = (tags = []) => tags.find((tag) => COMPONENT_STATUSES[tag]) || null;
