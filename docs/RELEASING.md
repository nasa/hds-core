# Releasing HDS Core

Maintainer runbook for cutting a release of `@nasa-hds/core`. Contributors do not need this; they just add a changeset (see [CONTRIBUTING.md](../CONTRIBUTING.md#public-api-and-versioning)) and a maintainer takes it from here.

## How releases work

Releases are [Changesets](https://github.com/changesets/changesets)-driven and published to npm as [`@nasa-hds/core`](https://www.npmjs.com/package/@nasa-hds/core) by the [`release.yml`](../.github/workflows/release.yml) workflow. There are no stored npm tokens: publishing uses **OIDC trusted publishing**, and npm attaches [provenance](https://docs.npmjs.com/generating-provenance-statements) automatically.

The workflow runs on every push to `main` as two jobs:

- **`version`** — while unreleased changesets exist, opens/updates a **Version Packages** PR that bumps the version and rewrites `CHANGELOG.md`. It also detects when a bump has just landed (the committed version has no matching `vX.Y.Z` tag yet).
- **`publish`** — runs **only** when a bump just landed. It builds, publishes to npm over OIDC, tags `vX.Y.Z`, and creates a GitHub Release with the dist zip and SBOM attached. This job runs in the **`npm-publish`** environment.

## Who can cut a release

The `publish` job is gated by the **`npm-publish`** GitHub Environment, which has **required reviewers**. Merging PRs and cutting a release are separate privileges: anyone with merge rights can merge the Version Packages PR, but the release then **pauses for approval** from a `npm-publish` reviewer before it runs. npm additionally only accepts an OIDC token minted inside that environment, so the gate cannot be bypassed by another workflow.

## Cutting a release

1. **Land the changesets.** Merge the PRs whose changes you want in the release. Each should carry a changeset (`npx changeset`).
2. **Review the Version Packages PR.** After changesets land on `main`, the `version` job opens (or updates) a PR titled **Version Packages**. Confirm the version bump and the generated `CHANGELOG.md` entry read correctly.
3. **Merge the Version Packages PR.** This is what triggers a release.
4. **Approve the deployment.** The `publish` job appears in the Actions run and waits on the `npm-publish` environment. A required reviewer approves it.
5. **Done.** On approval the job publishes `@nasa-hds/core@X.Y.Z` to npm (with provenance), pushes the `vX.Y.Z` tag, and creates the GitHub Release. Verify the version appears on npm and the release notes look right.

To ship several changesets in one version, let them accumulate on `main` — the Version Packages PR keeps updating — then merge it once when you're ready.

## Standing configuration (must remain in place)

These are set once and should stay in sync:

- **Repository is public.** OIDC provenance is rejected on private repos.
- **npm trusted publisher** for `@nasa-hds/core` (`https://www.npmjs.com/package/@nasa-hds/core/access`): publisher **GitHub Actions**, org/repo **`nasa/hds-core`**, workflow **`release.yml`**, environment **`npm-publish`**, with **Allow npm `publish`** enabled.
- **GitHub Environment `npm-publish`** (Settings → Environments): required reviewers = the release owners; deployment branches restricted to **`main`**. The environment name must match the npm trusted-publisher setting exactly.
- **npm org `nasa-hds`**: release owners are members with publish rights.
- **npm CLI ≥ 11.5.1** is required for trusted publishing; the workflow upgrades npm in-job, so the pinned Node runtime's older bundled npm is fine.

## Troubleshooting

- **Publish fails with a 404 / "not permitted" from npm.** The OIDC claim didn't match the trusted publisher. Check that org/repo, workflow filename, and environment name in the npm settings exactly match the workflow, and that the repo is public.
- **Nothing published after merging the Version Packages PR.** The `publish` job only runs when the committed version has no matching tag. If a `vX.Y.Z` tag already exists for that version, the release is skipped — bump again or remove the stray tag.
- **Provenance error.** Confirm the repo is public and the workflow has `permissions: id-token: write`.
- **The release is stuck "waiting."** It needs environment approval — a `npm-publish` required reviewer must approve the run in the Actions tab.

## Versioning

Bump levels are decided per changeset using the semver rubric in [CONTRIBUTING.md](../CONTRIBUTING.md#semver-rubric). While the major version is 0, breaking changes ship as minor bumps.
