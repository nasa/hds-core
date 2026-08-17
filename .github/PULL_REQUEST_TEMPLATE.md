## What this PR does

<!-- 1–3 sentences: what changed and why. -->

Closes #

## Type of change

<!-- Check one. Must match the changeset bump below. -->

- [ ] Bug fix (patch)
- [ ] New feature or component (minor)
- [ ] Breaking change (see Public API note below)
- [ ] Documentation only
- [ ] Tooling or CI (no effect on published CSS)

## How to review

<!-- Point reviewers at what to look at: screenshots, or the Storybook
stories to open and the palettes / viewports that actually matter here.
Flag anything that needs a design or accessibility eye. For docs-only or
tooling PRs, write "N/A". -->

## Before requesting review

<!-- Running the automated checks locally saves a failed-check round-trip:
CI hard-fails on them. The rest need a human; CI can't verify them.
Full command list: CONTRIBUTING.md. -->

- [ ] `npm run lint`, `npm run format`, and `npm test` pass locally

**If your change affects how anything renders (styles, tokens, story markup, icons, or fonts):**

- [ ] Checked across all 6 palettes in Storybook
- [ ] Checked across mobile, tablet, and desktop viewports
- [ ] Did a manual a11y pass (keyboard, focus, screen-reader labels)

**If your change ships in the package (styles, tokens, or `src/assets/**`):**

- [ ] Added a changeset (`npx changeset`) at the [semver rubric](../CONTRIBUTING.md#semver-rubric) level
- [ ] Ran `npm run check:api-snapshot` and `npm run check:css-hash`; if either flags drift, ran the matching `update:*` and committed the result

## Notes for reviewers

<!-- Anything unusual, known limitations, or planned follow-ups. Optional. -->
