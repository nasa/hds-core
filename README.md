# @nasa/hds-core

[![Status: Pre-1.0](https://img.shields.io/badge/Status-Pre--1.0-orange.svg)](#) [![Release: v0.7.1](https://img.shields.io/badge/Release-v0.7.1-blue.svg)](https://github.com/nasa/hds-core/releases) [![USWDS: 3.13+](https://img.shields.io/badge/USWDS-3.13+-005ea2.svg)](https://github.com/uswds/uswds)

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

HDS Core is not yet published to the npm registry (publishing is planned for the 1.0 release). You can install it directly from this public GitHub repository alongside its required peer dependency, the U.S. Web Design System (v3.13+):

```bash
npm install github:nasa/hds-core @uswds/uswds
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
