# Changesets

This directory tracks unreleased changes to `@nasa-hds/core`. You can find the full documentation for the Changesets tool [in their repository](https://github.com/changesets/changesets).

## Adding a changeset

When your PR changes something adopters will notice -- a new token, a CSS change, a bug fix, a removed symbol -- add a changeset:

    npx changeset

You will be prompted to choose a bump type and write a summary. The summary goes directly into the changelog, so write it for adopters, not for maintainers.

| Change type | Bump |
| --- | --- |
| New token, new component, new CSS class | `minor` |
| Bug fix, internal improvement | `patch` |
| Removal or rename of a public symbol | `minor` (pre-v1.0) / `major` (post-v1.0) |
| Docs, Storybook, linter config, CI config, tooling, re-run of stale snapshot | none |

See [CONTRIBUTING.md](../CONTRIBUTING.md#semver-rubric) for the full rubric, including the `visual-breaking-change` label and deprecation grace period requirements.

## Releases

Releases are automated via the CI release pipeline. When changeset files are present on `main`, CI opens (or updates) a "Version Packages" pull request. That PR shows the version bump and the generated CHANGELOG entry.

**To cut a release:** merge the Version Packages PR when you are ready. CI will then build the dist, generate an SBOM, create a GitHub Release, and attach the artifacts. Do not merge it early; you can let changesets accumulate automatically until the release is intentional.

`npm publish` is not yet wired (pending repo going public).
