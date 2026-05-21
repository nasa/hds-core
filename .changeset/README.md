# Changesets

This directory tracks unreleased changes to `@nasa/hds-core`. You can find the full documentation for the Changesets tool [in their repository](https://github.com/changesets/changesets).

## Adding a changeset

When your PR changes something adopters will notice -- a new token, a CSS change, a bug fix, a removed symbol -- add a changeset:

    npx changeset

You will be prompted to choose a bump type and write a summary. The summary goes directly into the changelog, so write it for adopters, not for maintainers.

| Change type                             | Bump                                     |
| --------------------------------------- | ---------------------------------------- |
| New token, new component, new CSS class | `minor`                                  |
| Bug fix, internal improvement           | `patch`                                  |
| Removal or rename of a public symbol    | `minor` (pre-v1.0) / `major` (post-v1.0) |

## What does not need a changeset

- Docs and Storybook-only changes (`*.md`, `*.mdx`, `*.stories.js`)
- Linter config, CI config, tooling

## Releases

A maintainer runs `npx changeset version` when ready to cut a release. This consumes all pending changesets, bumps the version, and updates CHANGELOG.md. Then `npm publish` cuts the release.

From v0.8.0 onward this is automated via the CI release pipeline.
