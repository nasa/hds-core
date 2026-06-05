/**
 * Footer.jsx
 *
 * Compliance footer rendered at the bottom of every Storybook docs page
 * via DocsContainer.jsx.
 *
 * Satisfies NAII 2800.2 requirements for public-facing NASA websites:
 *   §14.1  Required NASA footer links (requirements 14a–14f)
 *   §14.2  Responsible Official and Page Editor identification (14g–14h)
 *   §14.3  Last Updated date per page (14i)
 *
 * Layout (top to bottom):
 *   1. Version label + Edit this page link
 *   2. Compliance metadata (Last Updated, Page Editor, RNO) — muted, gray bg
 *   3. Required NASA footer links
 *
 * Dynamic fields (Page Editor, Last Updated, GitHub profile link) come from
 * stories/docs-meta.json, generated at build time by scripts/generate-docs-meta.mjs.
 * If the manifest is absent those fields degrade gracefully — no build failure.
 *
 * Static fields:
 *   RNO      Abby Bowman → https://github.com/abbybowman
 *   Version  Read from package.json at build time via Vite
 */

import React from 'react';
import pkg from '../package.json';

// Vite resolves import.meta.glob at build time.
// Returns {} if the file is absent — no build failure, fields degrade gracefully.
const modules = import.meta.glob('../stories/docs-meta.json', { eager: true });
const docsMeta = (modules['../stories/docs-meta.json'] ?? {}).default ?? {};
const REPO = 'https://github.com/nasa/hds-core';

// ─── Static data ──────────────────────────────────────────────────────────────

/** Responsible NASA Official — NAII 2800.2 §14.2, requirement 14(g). */
const RNO = {
  name: 'Abby Bowman',
  url: 'https://github.com/abbybowman',
};

/** Required NASA footer links — NAII 2800.2 §14.1, requirements 14(a)–14(f). */
const REQUIRED_LINKS = [
  { label: 'About NASA', url: 'https://www.nasa.gov/about/' },
  { label: 'Accessibility', url: 'https://www.nasa.gov/accessibility/' },
  { label: 'FOIA', url: 'https://www.nasa.gov/foia/' },
  { label: 'No FEAR Act', url: 'https://www.nasa.gov/no-fear-act/' },
  { label: 'Privacy Policy', url: 'https://www.nasa.gov/privacy/' },
  { label: 'Vulnerability Disclosure Policy', url: 'https://www.nasa.gov/vulnerability-disclosure-policy/' },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * @param {string|null} editUrl     GitHub edit URL for the current docs page.
 * @param {string|null} importPath  Normalized file path used to look up the
 *                                  docs-meta manifest, e.g.
 *                                  "stories/components/Button.mdx".
 */
export function Footer({ editUrl, importPath }) {
  const entry = importPath ? docsMeta[importPath] : null;

  const editorName = entry?.authorName ?? null;
  const editorUsername = entry?.githubUsername ?? null;
  const lastUpdated = entry?.date ?? null;
  const lastUpdatedISO = entry?.dateISO ?? null;

  // Shared link style — inherits color from context so it reads correctly
  // in both the normal links section and the muted metadata section.
  const inheritLink = { color: 'inherit' };

  return (
    <footer
      style={{
        marginTop: '4rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        fontSize: '13px',
      }}
    >
      {/* ── 1. Version + edit link ──────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          opacity: 0.65,
          marginBottom: '1rem',
        }}
      >
        <span>HDS Core v{pkg.version}</span>
        {editUrl && (
          <a href={editUrl} target="_blank" rel="noopener noreferrer" style={inheritLink}>
            Edit this page on GitHub ↗
          </a>
        )}
      </div>

      {/* ── 2. Compliance metadata — §14.2 (14g–14h) and §14.3 (14i) ──── */}
      {/* Muted color and gray background distinguish this from page content. */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          borderRadius: '3px',
          padding: '0.75rem 1rem',
          fontSize: '12px',
          color: 'rgba(0, 0, 0, 0.5)',
          lineHeight: '1.7',
        }}
      >
        {/* §14.3 — Last Updated date (requirement 14i)
            Format: "Month D, YYYY" per NAII 2800.2 §14.3 example.
            Sourced from docs-meta manifest. Omitted if manifest absent. */}
        {lastUpdated && (
          <div>
            <span>Last Updated: </span>
            <a
              href={`${REPO}/commits/main/${importPath}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(0, 0, 0, 0.65)' }}
            >
              <time dateTime={lastUpdatedISO ?? undefined}>{lastUpdated}</time>
            </a>
          </div>
        )}

        {/* §14.2 — Page Editor (requirement 14h)
            Sourced from docs-meta manifest. Omitted if manifest absent.
            Links to GitHub profile when githubUsername is available.
            Username resolved in generate-docs-meta.mjs — either from the
            GitHub noreply email pattern or the GITHUB_USERNAMES fallback map. */}
        {editorName && (
          <div>
            <span>Page Editor: </span>
            {editorUsername ? (
              <a
                href={`https://github.com/${editorUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(0, 0, 0, 0.65)' }}
              >
                {editorName}
              </a>
            ) : (
              <span>{editorName}</span>
            )}
          </div>
        )}

        {/* §14.2 — Responsible Official (requirement 14g) */}
        <div>
          <span>Responsible NASA Official: </span>
          <a href={RNO.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
            {RNO.name}
          </a>
        </div>

        {/* ── 3. Required NASA footer links — §14.1, requirements 14a–14f ── */}
        <nav
          aria-label="Required NASA footer links"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 1.25rem',
            marginTop: '1.25rem',
            lineHeight: '1.75',
          }}
        >
          {REQUIRED_LINKS.map(({ label, url }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer" style={inheritLink}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
