import postcss from 'postcss';

/**
 * Extract deduplicated --hds-* custom property names from CSS text.
 * Returns a sorted array of property names (strings including the -- prefix).
 */
export function extractCustomProperties(css) {
  const root = postcss.parse(css);
  const properties = new Set();

  root.walk((node) => {
    if (node.type === 'decl' && node.prop.startsWith('--hds-')) {
      properties.add(node.prop);
    }
  });

  return [...properties].sort();
}
