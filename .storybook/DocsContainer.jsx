// DocsContainer.jsx
// Custom docs page wrapper for Storybook.
//
// Currently adds an "Edit this page on GitHub" link at the bottom of every
// docs page (MDX guidance pages and foundation pages alike).
//
// This is the foundation for the full Storybook footer planned once the repo
// is public and the Pages deploy infrastructure is in place. The full footer
// will also include the page's last-edited date and editor username, HDS Core
// responsible official, required links, and docs version label.
//
// USAGE: Referenced from preview.js via parameters.docs.container.
// See preview.js for the one-line wire-up.

import React from 'react';
import { DocsContainer as BaseDocsContainer } from '@storybook/addon-docs/blocks';

const REPO = 'https://github.com/nasa/hds-core';

// Temporary: points to docs/ocomm-review for OCOMM pre-v1.0 review.
// Restore to 'main' when branch protection is in place.
// Full footer rehaul can derive this from git context at build time.
const EDIT_BRANCH = 'docs/ocomm-review';

function getEditUrl(context) {
  const storyId = new URLSearchParams(window.location.search).get('id');

  if (storyId) {
    const entry = context?.store?.storyIndex?.entries?.[storyId];
    if (entry?.importPath) {
      return `${REPO}/edit/${EDIT_BRANCH}/${entry.importPath.replace(/^\.\//, '')}`;
    }
  }

  // Fallback: link to the stories directory.
  return `${REPO}/tree/${EDIT_BRANCH}/stories`;
}

export function DocsContainer({ children, context, ...props }) {
  const editUrl = getEditUrl(context);

  return (
    <BaseDocsContainer context={context} {...props}>
      {children}
      <div
        style={{
          marginTop: '3rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          fontSize: '13px',
        }}
      >
        <a href={editUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          Edit this page on GitHub ↗
        </a>
      </div>
    </BaseDocsContainer>
  );
}
