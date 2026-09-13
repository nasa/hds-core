# Lab stories — unstyled USWDS baseline

Every USWDS component that HDS Core has **not** themed yet, rendered under the compiled HDS CSS exactly as it ships today.

These are a triage instrument, not documentation. They exist so that:

1. Before any theming work starts, there is a complete, reviewable baseline of how each unthemed USWDS component actually looks and behaves under the HDS theme — rather than a guess about it.
2. Theming issues can be prioritised by evidence. `docs/UNSTYLED-USWDS-INVENTORY.md` records what each component inherits correctly, what it inherits wrongly, and how unusable it is today.
3. When HDS styling lands for a component, its stories are already written to the conventions in `docs/DOCUMENTATION.md` — promoting one is a move, a tag deletion, and a new MDX page.

## What is here

One `{Name}.stories.js` per unthemed component, plus `labHelpers.js`. No MDX: guidance pages are written when the theming lands, against the real design.

Selection rule: a component is here if it appears on the [USWDS components list](https://designsystem.digital.gov/components/overview/), has markup of its own, and no rule in `src/scss/components/` targets its classes. Components that only appear in `base/_palettes.scss` — banner, header, footer, identifier — are in scope: those entries are contrast bridges, not theming. See "USWDS surface bridges" in `AGENTS.md`.

## Why they are hidden

Every story is tagged `tags: ['!dev', '!test']`:

| Tag | Effect |
| --- | --- |
| `!dev` | Hidden from the Storybook sidebar, so unthemed components are never mistaken for documented HDS components. Still reachable by direct URL and by `<Canvas of={} />`. |
| `!test` | Excluded from the Vitest axe run, so a known-unthemed component cannot fail CI on a violation nobody has scheduled work for. |

Chromatic snapshots are off as well — `labParams` repeats the global `disableSnapshot: true` from `preview.js`. Baselining 27 components nobody is reviewing yet would spend snapshot budget for no signal.

Tags are literal arrays on every export. Storybook's static indexer cannot resolve tags through an import or a spread, so they cannot be hoisted into `labHelpers.js` — see "Storybook / MDX rules" in `AGENTS.md`.

### Viewing a lab story

Either open it by URL — `?path=/story/components-card--all-variants` — or drop the `'!dev'` tag from the exports you want in the sidebar. To unhide everything at once, temporarily:

```sh
sed -i "s/tags: \['!dev', '!test'\]/tags: ['!test']/" stories/lab/*.stories.js
```

## USWDS JavaScript

`uswds.min.js` runs each component's `init()` once, on `DOMContentLoaded` — before Storybook has rendered anything. Delegated event listeners still reach story markup, because they live on `document.body`, but the DOM enhancement pass does not: a combo box stays a bare `<select>`, a file input stays a bare `<input type="file">`, a tooltip has no tooltip.

Stories that need that pass declare it:

```js
export default {
  title: 'Components/Combo Box',
  parameters: { ...labParams, uswds: ['comboBox'] },
};
```

The decorator in `.storybook/preview.js` runs `init()` — and only `init()` — against that story's canvas. See `.storybook/utils/uswds-components.js` for why it is scoped per story and why it never calls `behavior.on()`.

This is opt-in rather than global because the three older decorators in `preview.js` (accordion initial state, table sort, in-page navigation) already hand-roll the same work for the themed components, and running both would be redundant.

## Promoting a component

When HDS styling lands:

1. `git mv stories/lab/{Name}.stories.js stories/components/`
2. Delete `'!dev', '!test'` from every export, keeping `'!dev'` on the palette tests and guidance embeds as `docs/DOCUMENTATION.md` specifies.
3. Swap `labParams` / `labPaletteParams` for `paletteA11yParams` and `pseudoParams` from `stories/helpers/paletteTests.js`, which turn Chromatic snapshots on and `a11y.test` back to blocking.
4. Add focus tests. Lab stories have none: there is no HDS `:focus-visible` treatment to capture until the component is themed, and USWDS's default ring is not a thing HDS wants a baseline of.
5. Write `{Name}.mdx` to the Component Guidance page structure in `docs/DOCUMENTATION.md`, embedding the existing stories with `<Canvas of={} />`.
6. Remove the component's row from `docs/UNSTYLED-USWDS-INVENTORY.md`.

Story titles are already the final `Components/{Name}`, so story IDs do not change when a file moves and existing MDX imports keep resolving.
