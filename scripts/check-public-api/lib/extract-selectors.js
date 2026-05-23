import postcss from 'postcss';

const EXCLUDED_LAYERS = new Set(['uswds', 'uswds-utils']);
const HDS_LAYERS = new Set(['hds-base', 'hds-components', 'hds-dataviz']);

const CLASS_PATTERN = /\.(hds-[\w-]+|usa-[\w-]+)/g;

/**
 * Walk parent chain to find the nearest enclosing @layer at-rule.
 * Returns the outermost layer name if nested (e.g. uswds.theme → uswds).
 */
function getEnclosingLayer(node) {
  let current = node.parent;
  let outermostLayer = null;

  while (current) {
    if (current.type === 'atrule' && current.name === 'layer') {
      outermostLayer = current.params.trim();
    }
    current = current.parent;
  }

  return outermostLayer;
}

/**
 * Extract deduplicated .hds-* and .usa-* class selectors from HDS layers.
 * Returns { selectors: string[], warnings: string[] }.
 */
export function extractSelectors(css) {
  const root = postcss.parse(css);
  const selectors = new Set();
  const warnings = [];

  root.walkRules((rule) => {
    // Skip rules inside @keyframes or other non-layer at-rules
    if (rule.parent?.type === 'atrule' && rule.parent.name === 'keyframes') {
      return;
    }

    const layer = getEnclosingLayer(rule);

    if (layer === null) {
      // Rule outside any @layer
      const classes = rule.selector.match(CLASS_PATTERN);
      if (classes) {
        warnings.push(`Rule outside any @layer: ${rule.selector.slice(0, 80)}`);
      }
      return;
    }

    if (EXCLUDED_LAYERS.has(layer)) {
      return;
    }

    if (!HDS_LAYERS.has(layer)) {
      // Unknown layer — warn but don't include
      warnings.push(`Rule in unknown layer "${layer}": ${rule.selector.slice(0, 80)}`);
      return;
    }

    // Extract class names from selector string
    const matches = rule.selector.match(CLASS_PATTERN);
    if (matches) {
      for (const match of matches) {
        selectors.add(match);
      }
    }
  });

  return {
    selectors: [...selectors].sort(),
    warnings,
  };
}
