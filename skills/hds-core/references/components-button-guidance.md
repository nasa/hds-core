<!-- Source: ./stories/components/Button.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-button-guidance--docs -->
# Button

A button draws attention to important actions with a large selectable surface. HDS buttons use USWDS [`.usa-button`](https://designsystem.digital.gov/components/button/) classes with NASA brand colors — no markup changes needed for existing USWDS sites.

## Variants

### Primary Arrow

Text + animated arrow circle for editorial CTA links in hero sections and content cards. The arrow direction auto-swaps for external links. No SVG markup needed — the arrow is rendered via CSS.

```html
<a class="hds-btn--primary" href="#">Explore the Mission</a>
```

Six sizes are available, aligned with the icon button size scale for the circle container.

```html
<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: center;">
  <div>
    <span class="hds-overline">XS (14px)</span>
    <div style="margin-top: 0.5rem;">
      <a class="hds-btn--primary hds-btn--primary--xs" href="#">Explore</a>
    </div>
  </div>
  <div>
    <span class="hds-overline">SM (16px)</span>
    <div style="margin-top: 0.5rem;">
      <a class="hds-btn--primary hds-btn--primary--sm" href="#">Explore</a>
    </div>
  </div>
  <div>
    <span class="hds-overline">Default (18px)</span>
    <div style="margin-top: 0.5rem;">
      <a class="hds-btn--primary" href="#">Explore</a>
    </div>
  </div>
  <div>
    <span class="hds-overline">LG (22px)</span>
    <div style="margin-top: 0.5rem;">
      <a class="hds-btn--primary hds-btn--primary--lg" href="#">Explore</a>
    </div>
  </div>
  <div>
    <span class="hds-overline">XL (29px)</span>
    <div style="margin-top: 0.5rem;">
      <a class="hds-btn--primary hds-btn--primary--xl" href="#">Explore</a>
    </div>
  </div>
  <div>
    <span class="hds-overline">2XL (36px)</span>
    <div style="margin-top: 0.5rem;">
      <a class="hds-btn--primary hds-btn--primary--2xl" href="#">Explore</a>
    </div>
  </div>
</div>
```

| Size    | Class                    | Text | Circle | Use                      |
| ------- | ------------------------ | ---- | ------ | ------------------------ |
| XS      | `.hds-btn--primary--xs`  | 14px | 16px   | Compact UI, card footers |
| Small   | `.hds-btn--primary--sm`  | 16px | 20px   | Inline, secondary CTAs   |
| Default | _(no modifier)_          | 18px | 24px   | General purpose          |
| Large   | `.hds-btn--primary--lg`  | 22px | 28px   | Section headers          |
| XL      | `.hds-btn--primary--xl`  | 29px | 32px   | Hero sections            |
| 2XL     | `.hds-btn--primary--2xl` | 36px | 36px   | Landing page hero        |

> **Differs from Figma:** The HDS Figma spec labels these sizes 14–36 by font size. HDS Core uses USWDS-style t-shirt naming (xs through 2xl) for consistency with the icon button size scale. Circle containers match the icon button sizes at each step.

### Call to Action (CTA)

The default `.usa-button` — NASA Red filled. Use when the action **navigates the user away** from the current page (downloads, applications, key tasks).

```html
<button class="usa-button" type="button">Download Report</button>
```

> **Differs from USWDS:** USWDS defaults to primary = blue, secondary = red. HDS Core flips this at the theme level. `.usa-button` renders red and `.usa-button--secondary` renders blue — no class changes needed.

### Secondary Filled

NASA Blue filled (`.usa-button--secondary`). Use when the action **stays on** the current page (submit, filter, search).

```html
<button class="usa-button usa-button--secondary" type="button">Apply Filters</button>
```

Use one Call to Action (red) button per visible section. Pair with Secondary or Outline for additional actions.

#### Blue palette limitation

On the blue palette, the secondary filled button automatically renders as an outline button. The filled variant's NASA Blue fill is too close to the palette's NASA Blue Shade background to provide sufficient contrast. This conversion is automatic — no class changes needed.

If your design requires a filled secondary action on a blue background, use an [Icon Button](./components-icon-button-guidance.md) (secondary role) instead, or reconsider the background color.

> **Differs from USWDS:** This is an HDS-specific override. USWDS secondary buttons do not adapt to background color.

### Outline

A lower-emphasis on-page action with a NASA Blue border (`.usa-button--outline`).

Inside an HDS palette wrapper, outline buttons adapt to dark backgrounds automatically. Without a palette wrapper, add `.usa-button--inverse` for dark-background styling.

```html
<button class="usa-button usa-button--outline" type="button">View Details</button>
```

> **Differs from USWDS:** USWDS `--inverse` turns the entire outline button white (border + text). In HDS Core, only the text flips to white — the border stays NASA Blue.

### Unstyled

A button that looks like a link (`.usa-button--unstyled`). Use for cancel or dismiss actions where a full button would be too heavy.

```html
<button class="usa-button usa-button--unstyled" type="button">Cancel</button>
```

### All variants and disabled states

All button types in one view, including disabled states. Disabled buttons use distinct colors rather than opacity, so they remain readable on all palette backgrounds.

```html
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <span class="hds-overline">Primary Arrow</span>
      <div style="margin-top: 0.5rem;">

<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">

<div style="min-width: 10rem;">
  <span class="hds-overline">Internal</span>
  <div style="margin-top: 0.5rem;"><a class="hds-btn--primary" href="#">Explore the Mission</a></div>
</div>

<div style="min-width: 10rem;">
  <span class="hds-overline">External</span>
  <div style="margin-top: 0.5rem;"><a class="hds-btn--primary usa-link--external" href="https://flickr.com">View on Flickr</a></div>
</div>

</div>
      </div>
    </div>
    <div>
      <span class="hds-overline">Filled</span>
      <div style="margin-top: 0.5rem;">

<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">

<div style="min-width: 10rem;">
  <span class="hds-overline">CTA</span>
  <div style="margin-top: 0.5rem;"><button class="usa-button" type="button">Download Report</button></div>
</div>

<div style="min-width: 10rem;">
  <span class="hds-overline">Secondary</span>
  <div style="margin-top: 0.5rem;"><button class="usa-button usa-button--secondary" type="button">Apply Filters</button></div>
</div>

<div style="min-width: 10rem;">
  <span class="hds-overline">Unstyled</span>
  <div style="margin-top: 0.5rem;"><button class="usa-button usa-button--unstyled" type="button">Cancel</button></div>
</div>

</div>
      </div>
    </div>
    <div>
      <span class="hds-overline">Outline</span>
      <div style="margin-top: 0.5rem;">

<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">

<div style="min-width: 10rem;">
  <span class="hds-overline">Outline</span>
  <div style="margin-top: 0.5rem;"><button class="usa-button usa-button--outline" type="button">View Details</button></div>
</div>

</div>
      </div>
    </div>
    <div>
      <span class="hds-overline">Disabled</span>
      <div style="margin-top: 0.5rem;">

<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">

<div style="min-width: 10rem;">
  <span class="hds-overline">CTA</span>
  <div style="margin-top: 0.5rem;"><button class="usa-button" type="button" disabled="disabled">Download Report</button></div>
</div>

<div style="min-width: 10rem;">
  <span class="hds-overline">Secondary</span>
  <div style="margin-top: 0.5rem;"><button class="usa-button usa-button--secondary" type="button" disabled="disabled">Apply Filters</button></div>
</div>

<div style="min-width: 10rem;">
  <span class="hds-overline">Outline</span>
  <div style="margin-top: 0.5rem;"><button class="usa-button usa-button--outline" type="button" disabled="disabled">View Details</button></div>
</div>

</div>
      </div>
    </div>
  </div>
```

> **Differs from USWDS:** USWDS uses `opacity` for disabled buttons. HDS Core uses explicit color changes so disabled states are consistent across all six palettes.

> **Differs from Figma:** The HDS Figma spec does not define a button active state. HDS Core uses the same visual treatment for hover and active, consistent with Apple HIG.

## Other button types

The HDS Figma spec also defines several specialized button types. In HDS Core, these are implemented as [Icon Button](./components-icon-button-guidance.md) variants:

- **Utility buttons** — carousel controls, accordion toggles, subtle actions
- **Social buttons** — sharing and linking to social media accounts
- **Interactive buttons** — trigger tooltips on interactive modules

For overlay buttons (semi-transparent on imagery), play buttons (audio/video), and NASA TV badges, see the HDS Figma spec. These are planned for future releases.

## When to use the button component

- Use **Primary Arrow** (`.hds-btn--primary`) for editorial CTA links in hero sections and content cards.
- Use **Call to Action** (red, `.usa-button`) when the action **navigates the user away** — downloads, applications, key tasks.
- Use **Secondary Filled** (blue, `.usa-button--secondary`) when the action **stays on the current page** — submit, filter, search.
- Use **Outline** (`.usa-button--outline`) for lower-emphasis on-page actions.

## When to consider something else

- If the action is **less important**, consider a text [Link](./components-link-guidance.md) instead.
- For **icon-only actions** (play, download, share), use [Icon Button](./components-icon-button-guidance.md).
- For **inline text navigation** within body content, use [Link](./components-link-guidance.md).
- If a **navigation link looks like a button**, use an `<a>` tag with button classes — not a `<button>`. Correct semantics matter for assistive technology.
- Avoid more than **one red button per visible section**. Pair a CTA with secondary or outline buttons to establish hierarchy.
- **Don't use** `.usa-button--accent-cool`, `.usa-button--accent-warm`, or `.usa-button--base` — these are not part of the HDS color system. HDS uses a two-color wayfinding rule (red = away, blue = on-page) and a third button color would break that pattern.

For more on how HDS uses color for wayfinding, see [Color](./foundations-color.md).

## Usability guidance

- **Be concise.** Use action verbs: "Download", "Submit", "Apply Now." Avoid vague labels like "Click here" or "Go."
- **Labels should make sense out of context.** Screen reader users may encounter buttons without surrounding text.
- **Use sentence case** for button labels.

## Accessibility

- Use **semantic elements:** `<button>` for actions, `<a>` for navigation. If a link looks like a button, apply button classes to the `<a>`.
- Use **`disabled`** for truly inactive buttons — removed from tab order and announced as disabled by screen readers.
- Use **`aria-disabled="true"`** when the button should remain **focusable** — for example, to explain via tooltip why the action is unavailable. Both receive identical visual styling.
- **Don't remove focus styles.** HDS Core applies a visible focus ring on all interactive elements.
- **Write descriptive labels.** "Download fiscal year 2025 report" is better than "Download." Supplement short labels with `aria-label` or `aria-describedby` when needed.

The recommended markup shown above includes all necessary ARIA attributes. See [Accessibility](./foundations-accessibility.md) for HDS-wide guidance and the [USWDS button accessibility tests](https://designsystem.digital.gov/components/button/accessibility-tests/) for component-specific manual testing guidance.
