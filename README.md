# @nasa/hds-core

NASA Horizon Design System (HDS) Core — design tokens, base styles, and USWDS theme configuration.

> **Status:** Pre-1.0. API and class names may change between minor versions. Not yet published to npm.

## What is HDS Core?

`@nasa/hds-core` is a CMS-agnostic CSS design system built as a theme layer on top of the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/). It provides the canonical NASA brand visual language (typography, color palettes, spacing, and component styling) required by NASA's web modernization policy (NID 2800.147).

It is designed for use by **standalone applications, platforms, and microapps** that are approved to operate outside of NASA's core flagship content management systems (like `www.nasa.gov`).

**Before adopting HDS Core**, please read our [Getting Started](https://nasa.github.io/hds-core/?path=/docs/overview-getting-started--docs) guide to ensure your project aligns with NASA's consolidation strategy.

## Documentation

Full documentation, component examples, and integration guides are available in our Storybook:

👉 **[HDS Core Storybook Documentation](https://nasa.github.io/hds-core/)**

### Quick Links

- [Getting Started Guide](https://nasa.github.io/hds-core/?path=/docs/overview-getting-started--docs)
- [Adopting HDS for existing USWDS sites](https://nasa.github.io/hds-core/?path=/docs/guides-existing-uswds-site-guidance--docs)
- [Using HDS Design Tokens](https://nasa.github.io/hds-core/?path=/docs/foundations-design-tokens--docs)

## Installation (Pre-1.0)

HDS Core is currently distributed as a GitHub repository. You can install it directly via npm:

```bash
npm install @nasa/hds-core
```

For detailed instructions on consuming the pre-compiled CSS bundles (`hds.css` and `hds-uswds.css`) or integrating the Sass source into your build pipeline, see the [Getting Started Guide](https://nasa.github.io/hds-core/?path=/docs/overview-getting-started--docs).

## Developing HDS Core

If you are contributing to the HDS Core repository itself:

```bash
npm install
npm run dev
```

This starts the Sass compiler in watch mode and launches the local Storybook dev server.

For deep technical details on the architecture, testing strategy, and pre-1.0 roadmap, see [ARCHITECTURE.md](ARCHITECTURE.md) and [AGENTS.md](AGENTS.md).
