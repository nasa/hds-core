# Contributing to HDS Core

HDS Core is NASA's design system for public-facing websites on `*.nasa.gov` domains. It's maintained by a small team and we welcome contributions from everyone: NASA employees, other federal staff, and members of the public.

Whether you're fixing a typo, reporting a browser bug, proposing a new component pattern, or improving accessibility, your contribution helps make NASA's web presence better for the public. We want to make the contribution process as clear and low-friction as possible.

All contributions are released into the public domain under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/); see [Licensing of contributions](#licensing-of-contributions) for details.

## Scope

HDS Core covers the CSS/Sass implementation of NASA's Horizon Design System on USWDS. Some things fall outside this repo's scope:

- **Flagship CMS features** (`www.nasa.gov` or `science.nasa.gov` functionality). See the [Web Toolkit](https://website.nasa.gov) (internal NASA link) for CMS support.
- **Content or editorial questions.** See the [NASA Stylebook](https://website.nasa.gov/style-guide/) (internal NASA link).
- **USWDS-originated bugs.** If you find a bug that originates in upstream USWDS, report it here. We triage and fix it for HDS Core users, then contribute the fix back. See [Handling USWDS Bugs](#handling-uswds-bugs) for the full process.

## How to contribute

### Report a bug or suggest an improvement

Open an [Issue](https://github.com/nasa/hds-core/issues). Include what you expected, what happened instead, and (if relevant) the browser and viewport size where you saw the problem.

### Ask a question or propose an idea

Start a [Discussion](https://github.com/nasa/hds-core/discussions). This is the right place for open-ended questions, design proposals, integration challenges, and "has anyone tried..." conversations.

### Edit documentation

The Storybook documentation site has an **Edit this page on GitHub ↗** link at the bottom of every page. Clicking it opens the file in GitHub's browser editor — no local development environment needed.

**Safe to edit:** paragraph text, headings, list items, and table cell content.

**Leave alone:** any line starting with `import`, the `<Meta title="..." />` line near the top of each file, and anything inside `< >` angle brackets. These are code, not prose — editing them can break the page silently.

To submit your changes:

1. Make your edits in the GitHub browser editor.
2. Click **Commit changes…**, write a short description, and choose **Create a new branch** using the `docs/` prefix (e.g. `docs/fix-button-copy`).
3. Open a pull request to `main`. A formatting bot runs automatically and may commit small whitespace fixes on your behalf. A maintainer will review and merge.

### Submit a code change

Open a pull request. See the sections below for setup instructions, conventions, and what we look for in review.

## Development setup

_(If you are using GitHub Codespaces, the environment is fully automated and you can skip these steps.)_

Clone the repository and install dependencies:

```bash
git clone https://github.com/nasa/hds-core.git
cd hds-core
npm install
```

Start the local dev server (Storybook + Sass watcher):

```bash
npm run dev
```

_(Note: `npm run storybook` runs Storybook without compiling Sass. Use `npm run dev` for day-to-day work.)_

## Branch naming

Create a new branch from `main`. Use a prefix to signal context:

- `feature/` for new components or enhancements
- `fix/` for bug fixes
- `docs/` for documentation updates
- `chore/` for tooling or dependency updates

Example: `feature/button-variants` or `fix/header-contrast`.

## Linting and build checks

Before pushing, run the following to catch issues before CI does:

```bash
npm run format      # Prettier formatting
npm run lint:scss   # Stylelint (CSS/Sass)
npm run lint:js     # ESLint (JS and MDX)
npm run lint:md     # remark-lint (Markdown)
npm run lint:mdx    # remark-lint (MDX)
```

Use `npm run format:fix`, `npm run lint:scss:fix`, or `npm run lint:js:fix` to auto-fix where possible.

## Pull request guidelines

When you open a Pull Request, a template will populate automatically. Fill it out completely. It helps us understand your goals and speeds up review.

### Match the design standards

HDS Core implements NASA's [Design Standards](?path=/docs/overview-design-standards--docs). Contributions that change how components look should align with these standards. See [DESIGN.md](DESIGN.md) for how we map to USWDS, color precision, and link logic. If you're unsure whether a visual change fits, open a Discussion first and we'll work through it together before you write code.

### Test across palettes

HDS Core supports six color palettes. Component styles must work correctly on all of them. Use the palette switcher in Storybook to verify.

### Test across viewports

Components must be fully responsive. Test your work across mobile, tablet, and desktop breakpoints.

### Keep accessibility in scope

Interactive elements need visible focus indicators. Color alone cannot convey meaning. Contrast ratios must meet WCAG 2.1 AA. See [Accessibility](?path=/docs/foundations-accessibility--docs) for detailed guidance.

### Automated checks

Ensure your code passes the automated accessibility and linting checks in the PR workflow before requesting review.

## Public API and versioning

HDS Core maintains a committed file called `public-api.snapshot.txt` that lists every public symbol the package promises to keep stable: custom properties, selectors, Sass variables, Sass mixins, entry points, and the adopter layer position. CI regenerates this snapshot on every PR that touches `src/scss/**` and fails if the committed file is stale.

### When CI fails the snapshot check

```
Public API surface changed. Review the diff below.
If intentional, run `npm run update:api-snapshot` and add a changeset.
```

To resolve:

1. Run `npm run update:api-snapshot` to regenerate the snapshot.
2. Review the diff. Confirm the changes are intentional.
3. Use the semver rubric below to determine the correct bump level.
4. Write a changeset: `npx changeset` and follow the prompts.
5. Commit both the updated snapshot and the changeset file.

### Semver rubric

Use this table to decide the bump level for your changeset when the snapshot changes.

| What changed in the snapshot                                      | Bump (post-v1.0) | Bump (pre-v1.0) |
| ----------------------------------------------------------------- | ---------------- | --------------- |
| Line removed (custom property, Sass variable, mixin, or selector) | major            | minor           |
| Entry point removed                                               | major            | minor           |
| `@layer site` no longer last or missing                           | major            | minor           |
| `.usa-*` selector removed (HDS dropped its override)              | major            | minor           |
| Line added (new custom property, variable, mixin, or selector)    | minor            | minor           |
| New `.usa-*` selector appears (HDS adopted a USWDS component)     | minor            | minor           |
| Only change is sort-order fix from a stale snapshot               | none             | none            |

### Pre-v1.0 semantics

While the major version is 0, SemVer permits breaking changes in minor releases. Removals are minor bumps, not major. Deprecation grace periods still apply: keep deprecated symbols for at least one minor release cycle before removal.

### Additional guidance

- If your PR is a visual restyling that does not change the snapshot but will meaningfully affect adopter layouts, apply the `visual-breaking-change` label and bump one notch above what the rubric otherwise suggests.
- When in doubt, bump more severely. A minor that could have been a patch is fine; a patch that should have been a minor can break someone.
- Removals that lack a prior deprecation: still allowed pre-v1.0 (minor bump), but flag in your changeset summary so adopters scanning the changelog can prepare.

## Adding new components

If you are adding a new component to the system:

1. Create `src/scss/components/_component-name.scss`
2. Add `@use` statements for dependencies (`uswds-core`, `hds-tokens`, `hds-mixins`)
3. Add `@forward` to `components/_index.scss` in the appropriate category
4. Document palette behavior and USWDS override rationale in the file header comment
5. If the component requires a new USWDS package, add its `meta.load-css()` call to the `@layer uswds` block in `hds.scss` and remove it from `hds-uswds.scss`
6. Run `npm run check:uswds` to regenerate the hash baseline if the USWDS package list changed
7. Run `npm run update:api-snapshot` if new selectors or custom properties appear in the build

See `components/_button.scss` as a reference for comment style and organization.

## Upgrading USWDS

When bumping the `@uswds/uswds` dependency in `package.json`, CI runs two blocking checks:

1. **`npm run check:uswds-core` (Architectural Gate):** Our CSS layer cascade relies on the assumption that `@use 'uswds-core'` emits zero CSS selectors. If this test fails, USWDS introduced CSS into their core package, breaking our layer specificity strategy. Do not merge the upgrade until architecture is updated.
2. **`npm run check:uswds` (Component Tracker):** Monitors the USWDS components that HDS themes. Fails if upstream Sass source for those components changed, serving as a reminder to check for visual regressions. To resolve: review the USWDS release notes, verify overrides in Storybook, and regenerate the baseline with `rm scripts/uswds-package-hashes.txt && npm run check:uswds`.

## Handling USWDS bugs

HDS Core themes and distributes a selective subset of USWDS components. When a bug originates upstream:

1. **Report it here.** File an issue in this repository so we can triage and fix it for HDS Core users.
2. **Upstream visibility.** During triage, maintainers file a companion issue with the USWDS repository and link it to the HDS Core issue.
3. **Fix it here first.** NASA sites cannot wait on upstream release cycles, so we patch bugs in our own Sass source.
4. **Contribute back.** When the fix is stable, maintainers open a PR upstream so the broader USWDS community benefits.

When filing, note in the issue title or description that the root cause is upstream (e.g., "\[USWDS] Button focus ring clipped in Safari"). This helps maintainers triage and track companion issues.

## Code style conventions

- **Sass and PostCSS:** Write styles using Sass, processed with PostCSS. Keep code clean, modular, and lean.
- **Naming conventions:** Follow BEM (Block Element Modifier) for custom CSS classes (`.hds-block`, `.hds-block__element`, `.hds-block--modifier`). For Sass variables and DTCG tokens, use lowercase kebab-case.
- **File organization:** Place component styles in `src/scss/components/`. Foundational updates or tokens belong in `src/scss/base/` or root `src/scss/` files. See [ARCHITECTURE.md](ARCHITECTURE.md) for full details.

## Storybook documentation

Storybook is the primary reference for adopters. Review [DOCUMENTATION.md](DOCUMENTATION.md) for guidelines on writing documentation (plain language, palette awareness, avoiding internal architecture terms).

For prose-only edits — rewording guidance, fixing typos, updating copy — see [Edit documentation](#edit-documentation) above. No development setup needed.

When changing or adding a component:

- Update or create the `.mdx` file for documentation and the `.stories.js` file for interactive examples in `stories/components/`.
- A complete component requires a **Guidance** page (how and when to use, accessibility notes), key variants as standalone interactive stories (with exposed controls for users to change their content and settings), and an "All Variants" story (if more than one variant).

## Design proposals

Want to propose a new component or a change to an existing component's visual design?

**Start with a Discussion, not a PR.** Design changes affect NASA's visual identity across potentially hundreds of sites. We review design proposals separately from code implementation so that PR reviews can focus on code quality rather than design debates.

In your Discussion, include:

- What problem the change solves
- Which audience it serves (standalone apps, data tools, microapps, etc.)
- Visual examples (screenshots, Figma mockups, or a description of the intended result)
- Whether you've seen this pattern on an existing NASA site

Once a design direction is agreed on, the code PR follows. This keeps things moving and avoids wasted effort on both sides.

## Review process

All pull requests are reviewed by HDS Core maintainers. We aim to respond within **1 to 2 weeks**. Because the project is currently supported by a single core maintainer, review times can occasionally fluctuate, but we value your contribution and will get to it as soon as we can.

Maintainers may:

- Approve and merge
- Request changes with specific guidance
- Suggest an alternative approach
- Ask for additional context or testing

Design changes that affect NASA's visual identity may involve additional review to ensure alignment with agency brand standards.

## Licensing of contributions

HDS Core is released into the worldwide public domain under the [CC0 1.0 Universal Public Domain Dedication](https://creativecommons.org/publicdomain/zero/1.0/).

By submitting a contribution — code, documentation, or any other material — you agree that your contribution is released under CC0 1.0 alongside the rest of the project. You are dedicating it to the public domain and waiving all copyright and related rights, worldwide, to the fullest extent permitted by law.

Only contribute work you have the right to dedicate this way. Don't submit code, fonts, images, or other assets that are owned by someone else or licensed under terms incompatible with CC0. Bundled third-party assets (such as the Inter and DM Mono fonts under the SIL Open Font License) are the exception and are tracked separately in [LICENSE.md](LICENSE.md).

## Code of Conduct

{/_ TODO: NASA's standard open-source code of conduct. Confirm with OGC/open-source approval process what language to use here. Placeholder until then. _/}

## Questions?

- [GitHub Discussions](https://github.com/nasa/hds-core/discussions) for public questions
- [Web Toolkit](https://website.nasa.gov) (internal NASA link) for NASA-internal guidance and team contacts
