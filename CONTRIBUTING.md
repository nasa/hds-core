# Contributing to HDS Core

HDS Core is NASA's design system for public-facing websites on `*.nasa.gov` domains. It's maintained by a small team and we welcome contributions from everyone: NASA employees, other federal staff, and members of the public.

Whether you're fixing a typo, reporting a browser bug, proposing a new component pattern, or improving accessibility, your contribution helps make NASA's web presence better for the public. We want to make the contribution process as clear and low-friction as possible.

## How to contribute

There are several ways to get involved, depending on what you'd like to do.

### Report a bug or suggest an improvement

Open an [Issue](https://github.com/nasa/hds-core/issues). Include what you expected, what happened instead, and (if relevant) the browser and viewport size where you saw the problem.

#### Handling USWDS Bugs

HDS Core themes and distributes a selective subset of USWDS components. When a bug originates upstream, our process is:

1. **Report it here** — file an issue in this repository so we can triage and fix it for HDS Core users.
2. **Upstream visibility** — during triage, maintainers will file a companion issue with the USWDS repository and link it to the HDS Core issue.
3. **Fix it here first** — NASA sites cannot wait on upstream release cycles, so we patch bugs in our own Sass source.
4. **Contribute back** — when our fix is stable, maintainers will open a PR upstream so the broader USWDS community benefits.

When filing, note in the issue title or description that the root cause is upstream (e.g., "[USWDS] Button focus ring clipped in Safari"). This helps maintainers triage and track companion issues.

### Ask a question or propose an idea

Start a [Discussion](https://github.com/nasa/hds-core/discussions). This is the right place for open-ended questions, design proposals, integration challenges, and "has anyone tried..." conversations.

### Submit a code change

Open a pull request. See the development workflow section below for setup instructions and conventions.

### Development workflow

**1. Local dev setup** _(Note: If you are using GitHub Codespaces, this environment is fully automated and you can skip these steps.)_

Clone the repository and install dependencies using npm:

```bash
git clone https://github.com/nasa/hds-core.git
cd hds-core
npm install
```

**2. Run local development** We use Storybook for interactive development and documentation. Start the local dev server (which runs both Storybook and the Sass watcher) with:

```bash
npm run dev
```

_(Note: `npm run storybook` runs Storybook without compiling Sass. Use `npm run dev` for day-to-day work.)_

**3. Branch naming** Create a new branch from `main`. Use a simple prefix to help us understand the context:

- `feature/` for new components or enhancements
- `fix/` for bug fixes
- `docs/` for documentation updates
- `chore/` for tooling or dependency updates Example: `feature/button-variants` or `fix/header-contrast`.

**4. Linting and build checks** Before committing, ensure your code passes our formatting rules. We use standard linting for CSS/Sass and JavaScript. Running `npm run build` or the corresponding test scripts locally will catch issues early.

**5. PR template** When you open a Pull Request, a template will populate automatically. Fill it out completely—it helps us understand your goals and speeds up the review process.

## What makes a good contribution

We want your PR to succeed. These guidelines help us review and merge contributions quickly.

**Match the design standards.** HDS Core implements NASA's [Design Standards](?path=/docs/overview-design-standards--docs). Contributions that change how components look should align with these standards. See [DESIGN.md](DESIGN.md) for how we map to USWDS, color precision, and link logic. If you're unsure whether a visual change fits, open a Discussion first and we'll work through it together before you write code.

**Test across palettes.** HDS Core supports six color palettes. Component styles must work correctly on all of them. Use the palette switcher in Storybook to verify.

**Keep accessibility in scope.** Interactive elements need visible focus indicators. Color alone can't convey meaning. Contrast ratios must meet WCAG 2.1 AA. See [Accessibility](?path=/docs/foundations-accessibility--docs) for detailed guidance.

### Code style conventions

- **Sass and PostCSS:** We write styles using Sass and process them with PostCSS. Keep your code clean, modular, and lean.
- **Naming conventions:** Follow BEM (Block Element Modifier) conventions for custom CSS classes (`.hds-block`, `.hds-block__element`, `.hds-block--modifier`). For Sass variables and Design Token Community Group (DTCG) tokens, use lowercase with hyphens (kebab-case).
- **File organization:** Place new component styles in the appropriate `src/scss/components/` folder. Foundational updates or tokens belong in `src/scss/base/` or root `src/scss/` files. For full architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md).

### Storybook stories

Storybook is the primary source of truth for our adopters. Please review our [DOCUMENTATION.md](DOCUMENTATION.md) for strict guidelines on writing documentation (e.g., plain language, palette awareness, avoiding internal architecture terms). When changing a component or adding a new one:

- **Files:** Update or create the `.mdx` file for documentation and the `.stories.js` file for interactive examples in `stories/components/`.
- **Structure:** A complete component requires both a **Guidance** tab (how and when to use it, accessibility notes) and a **Playground** tab (the interactive `.stories.js` embed).

### Testing requirements

To make your PR easy to merge, verify these three things before submitting:

1. **The Palette Switcher:** HDS Core is built for 6 distinct thematic palettes. You must test your component across all 6 using the Storybook toolbar switcher to guarantee visual harmony.
2. **Viewport testing:** Components must be fully responsive. Test your work across mobile, tablet, and desktop breakpoints.
3. **Automated checks:** Ensure your code passes any automated accessibility (a11y) and linting checks in the PR workflow.

## Design proposals

Want to propose a new component or a change to an existing component's visual design?

**Start with a Discussion, not a PR.** Design changes affect NASA's visual identity across potentially hundreds of sites. We review design proposals separately from code implementation so that PR reviews can focus on code quality rather than design debates.

In your Discussion, include:

- What problem the change solves
- Which audience it serves (standalone apps, data tools, microapps, etc.)
- Visual examples (screenshots, Figma mockups, or a description of the intended result)
- Whether you've seen this pattern on an existing NASA site

Once a design direction is agreed on, the code PR follows. This process keeps things moving and avoids wasted effort on both sides.

## Review process

All pull requests are reviewed by the HDS Core maintainers. We aim to respond within **1 to 2 weeks**. Because the project is currently supported by a single core maintainer, review times can occasionally fluctuate, but we deeply value your contribution and will get to it as soon as we can.

Maintainers may:

- Approve and merge
- Request changes with specific guidance
- Suggest an alternative approach
- Ask for additional context or testing

Design changes that affect NASA's visual identity may involve additional review to ensure alignment with agency brand standards.

## Scope

HDS Core covers the CSS/Sass implementation of NASA's Horizon Design System on USWDS. Some things fall outside this repo's scope:

- **Flagship CMS features** (www.nasa.gov or science.nasa.gov functionality). See the [Web Toolkit](https://website.nasa.gov) for CMS support.
- **Content or editorial questions.** See the [NASA Stylebook](https://website.nasa.gov/style-guide/) (NASA internal).
- **USWDS-originated bugs.** If you find a bug that originates in upstream USWDS, report it here — we'll triage and fix it for HDS Core users. We also file companion issues with the USWDS repository to support the broader community. See [Handling USWDS Bugs](#handling-uswds-bugs) below.

## Code of Conduct

{/_ TODO: NASA's standard open-source code of conduct. Confirm with OGC/open-source approval process what language to use here. Placeholder until then. _/}

## Questions?

- [GitHub Discussions](https://github.com/nasa/hds-core/discussions) for public questions
- [Web Toolkit](https://website.nasa.gov) for NASA-internal guidance and team contacts
