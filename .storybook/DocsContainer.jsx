/**
 * DocsContainer.jsx
 *
 * Custom Storybook docs page wrapper. Extends the default DocsContainer
 * with a compliance footer on every docs page.
 *
 * See Footer.jsx for compliance field references and static data.
 */

import React from 'react';
import { DocsContainer as BaseDocsContainer } from '@storybook/addon-docs/blocks';
import { Footer } from './Footer.jsx';

const REPO = 'https://github.com/nasa/hds-core';

// Full footer rehaul can derive this from git context at build time.
const EDIT_BRANCH = 'main';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the GitHub edit URL for the current docs page.
 * Reads the story ID from the Storybook iframe URL (?id=...) and looks it
 * up in the story index to get the source file path.
 */
function getEditUrl(context) {
  const storyId = new URLSearchParams(window.location.search).get('id');
  if (storyId) {
    const entry = context?.store?.storyIndex?.entries?.[storyId];
    if (entry?.importPath) {
      return `${REPO}/edit/${EDIT_BRANCH}/${entry.importPath.replace(/^\.\//, '')}`;
    }
  }
  return `${REPO}/tree/${EDIT_BRANCH}/stories`;
}

/**
 * Returns the normalized import path for the current page
 * (e.g. "stories/components/Button.mdx"), used to look up the git manifest.
 * Strips the leading "./" that Storybook adds to all importPath values.
 */
function getImportPath(context) {
  const storyId = new URLSearchParams(window.location.search).get('id');
  if (storyId) {
    const entry = context?.store?.storyIndex?.entries?.[storyId];
    if (entry?.importPath) {
      return entry.importPath.replace(/^\.\//, '');
    }
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DocsContainer({ children, context, ...props }) {
  const editUrl = getEditUrl(context);
  const importPath = getImportPath(context);

  return (
    <BaseDocsContainer context={context} {...props}>
      {children}
      <Footer editUrl={editUrl} importPath={importPath} />
    </BaseDocsContainer>
  );
}
