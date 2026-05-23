## What this PR does

<!-- Describe the change in 1-3 sentences. Link to related issues or discussions. -->

Closes #

## Type of change

<!-- Check one. -->

- [ ] Bug fix (patch)
- [ ] New feature or component (minor)
- [ ] Breaking change (see Public API section below)
- [ ] Documentation only
- [ ] Tooling or CI (no effect on published output)

## Checklist

<!-- Check all that apply before requesting review. -->

- [ ] `npm run format:fix` and `npm run lint:scss:fix` pass
- [ ] `npm run lint:js` and `npm run lint:md` pass
- [ ] Tested across all 6 palettes in Storybook
- [ ] Tested across mobile, tablet, and desktop viewports
- [ ] Automated a11y checks pass (`npm test`)
- [ ] Storybook documentation updated (if component changed)

## Public API and changesets

<!-- If CI fails the snapshot check, complete these steps. If your PR does not touch `src/scss/**`, skip this section. -->

- [ ] Ran `npm run update:api-snapshot` and reviewed the diff
- [ ] Changeset added (`npx changeset`) with appropriate bump level
- [ ] Bump level matches the [semver rubric](CONTRIBUTING.md#semver-rubric)

## Visual review

<!-- Paste before/after screenshots or note which Storybook stories to check. For documentation-only PRs, write "N/A". -->

## Notes for reviewers

<!-- Anything unusual, known limitations, or follow-up work planned. -->
