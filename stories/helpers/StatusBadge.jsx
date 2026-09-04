import React from 'react';

import { COMPONENT_STATUSES, findStatusTag } from '../../.storybook/componentStatus.js';

/**
 * Renders a component's lifecycle status under its Guidance page
 * heading. Reads the status:* tag off the stories module, so the
 * tag stays the only place a status is declared.
 *
 *   import * as ButtonStories from './Button.stories';
 *   <StatusBadge of={ButtonStories} />
 *
 * Renders nothing without a status tag, so it's safe anywhere.
 * Shows the full label for every status, including stable (unlike
 * the sidebar, which marks only non-default statuses).
 */
export function StatusBadge({ of }) {
  const tag = findStatusTag(of?.default?.tags);
  if (!tag) return null;

  const status = COMPONENT_STATUSES[tag];

  return (
    <p style={{ alignItems: 'baseline', display: 'flex', gap: '0.5rem', margin: '0 0 1rem' }}>
      <span
        style={{
          backgroundColor: status.bg,
          border: `1px solid ${status.border}`,
          borderRadius: '2px',
          color: status.fg,
          flexShrink: 0,
          fontFamily: '"DM Mono", monospace',
          fontSize: '11px',
          letterSpacing: '0.5px',
          lineHeight: 1.2,
          padding: '3px 6px',
          textTransform: 'uppercase',
        }}
      >
        {status.label}
      </span>
      <span style={{ color: '#58585B', fontSize: '14px', lineHeight: 1.4 }}>{status.description}</span>
    </p>
  );
}
