import postcss from 'postcss';

/**
 * Check whether `site` is the last entry in the first @layer declaration.
 * Returns a status string: "@layer site (last)", "(NOT LAST)", or "(MISSING)".
 */
export function validateAdopterLayer(css) {
  const root = postcss.parse(css);
  let result = '@layer site (MISSING)';

  root.walkAtRules('layer', (atRule) => {
    // We want the first @layer statement declaration (no block/child nodes).
    // A declaration looks like: @layer a, b, c;
    // A block looks like: @layer a { ... }
    if (atRule.nodes && atRule.nodes.length > 0) {
      return; // Skip block @layer rules
    }

    const layers = atRule.params.split(',').map((l) => l.trim());
    const lastLayer = layers[layers.length - 1];

    if (lastLayer === 'site') {
      result = '@layer site (last)';
    } else if (layers.includes('site')) {
      result = '@layer site (NOT LAST)';
    } else {
      result = '@layer site (MISSING)';
    }

    // Only check the first declaration
    return false;
  });

  return result;
}
