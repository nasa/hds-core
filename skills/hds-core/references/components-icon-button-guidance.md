<!-- Source: ./stories/components/IconButton.mdx -->
<!-- Storybook: https://nasa.github.io/hds-core/?path=/docs/components-icon-button-guidance--docs -->
# Icon Button

Circle-shaped buttons containing a single icon and no visible text. Use them for compact actions where space is limited and the icon's meaning is universally understood. USWDS has no equivalent component — icon buttons use HDS-specific `.hds-btn-icon` classes.

All icon buttons follow the HDS wayfinding convention: **red navigates away**, **blue stays on the page**, **neutral colors are for UI controls**. See [Color](./foundations-color.md) for more on color roles.

## Variants

### Action roles

Three emphasis levels for actions. Choose based on how much attention the button should draw.

**CTA** (`.hds-btn-icon--cta`) — NASA Red. The action **navigates away** from the current page. Highest emphasis.

**Secondary** (`.hds-btn-icon--secondary`) — NASA Blue filled. The action **stays on the page** — download, share, apply. Primary on-page emphasis.

**Outline** (`.hds-btn-icon--outline`) — NASA Blue border. Same on-page intent as secondary, but **lower emphasis**. Use when secondary feels too heavy alongside other elements.

```html
<button class="hds-btn-icon hds-btn-icon--cta" type="button" aria-label="Navigate to page">
    <svg class="hds-icon" aria-hidden="true" focusable="false">
      <use xlink:href="assets/img/hds-sprite.svg#arrow-line-right"></use>
    </svg></button>
```

### Utility

Neutral, adaptive circles for **UI controls** — carousel arrows, accordion toggles, media controls, settings, close. Utility buttons blend into the interface rather than drawing attention. Their color adapts to the surrounding palette automatically.

Use utility icons only with universally recognized icons in predictable locations. The circle outline is a subtle decorative treatment, not a strong interactive affordance — users identify these as buttons through icon meaning and contextual placement.

```html
<button class="hds-btn-icon hds-btn-icon--utility" type="button" aria-label="Settings">
    <svg class="hds-icon" aria-hidden="true" focusable="false">
      <use xlink:href="assets/img/hds-sprite.svg#settings"></use>
    </svg></button>
```

### Social

Social media sharing and follow links. Use `<a>` tags since these navigate to external platforms.

```html
<button class="hds-btn-icon hds-btn-icon--social" type="button" aria-label="RSS feed">
    <svg class="hds-icon" aria-hidden="true" focusable="false">
      <use xlink:href="assets/img/hds-sprite.svg#rss"></use>
    </svg></button>
```

### Interactive

Disclosure triggers designed for use **over images, video, and 3D content** — not on plain palette backgrounds. Interactive buttons use fixed colors (not palette-aware) for high contrast on dynamic backgrounds.

The visual state inverts on hover and when expanded — NASA Blue Shade + white flips to white + black. Toggle `aria-expanded` to control the active/open state. The consuming application manages the popover show/hide.

```html
<button class="hds-btn-icon hds-btn-icon--interactive" type="button" aria-label="More info" aria-expanded="false">
    <svg class="hds-icon" aria-hidden="true" focusable="false">
      <use xlink:href="assets/img/hds-sprite.svg#plus"></use>
    </svg></button>
```

Per HDS Figma accessibility guidance, popovers should **automatically display when the button receives focus** and hide when the user tabs away. When the popover is open, users should be able to tab to the link inside the popover.

```html
<button class="hds-btn-icon hds-btn-icon--interactive" type="button" aria-label="Sample Handling" aria-expanded="false" aria-controls="popover-sample">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#plus"></use>
  </svg>
</button>

<div id="popover-sample" role="region" hidden>
  <h3>Sample Handling</h3>
  <p>The Sample Handling System is used to collect and store samples.</p>
  <a href="/missions/mars/sample-handling">Learn More</a>
</div>
```

> **Differs from Figma:** Interactive icons in HDS Figma use standalone SVGs with baked-in colors. HDS Core uses the standard sprite system with `currentColor` instead — CSS handles the color inversion on hover and `aria-expanded`. The visual result is identical.

## Sizes

Eight sizes are available. Size and role classes are independent — combine any size with any role.

| Size    | Class                | Container | Use                                   |
| ------- | -------------------- | --------- | ------------------------------------- |
| 2XS     | `.hds-btn-icon--2xs` | 12px      | Filter dropdowns (desktop only)       |
| XS      | `.hds-btn-icon--xs`  | 16px      | Header, footer, compact UI            |
| Small   | `.hds-btn-icon--sm`  | 20px      | Inline with text, cards               |
| Default | _(no modifier)_      | 24px      | General purpose, primary arrow button |
| Large   | `.hds-btn-icon--lg`  | 28px      | Cards, navigation controls            |
| XL      | `.hds-btn-icon--xl`  | 32px      | Social buttons, standalone actions    |
| 2XL     | `.hds-btn-icon--2xl` | 36px      | Hero sections, prominent controls     |
| 3XL     | `.hds-btn-icon--3xl` | 40px      | Pagination arrows, carousel controls  |

```html
<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">

<div style="min-width: 5rem; text-align: center;">
  <span class="hds-overline">2XS (12px)</span>
  <div style="margin-top: 0.5rem;"><button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--2xs" type="button" aria-label="Play">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#play"></use>
  </svg></button></div>
</div>

<div style="min-width: 5rem; text-align: center;">
  <span class="hds-overline">XS (16px)</span>
  <div style="margin-top: 0.5rem;"><button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--xs" type="button" aria-label="Play">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#play"></use>
  </svg></button></div>
</div>

<div style="min-width: 5rem; text-align: center;">
  <span class="hds-overline">SM (20px)</span>
  <div style="margin-top: 0.5rem;"><button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--sm" type="button" aria-label="Play">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#play"></use>
  </svg></button></div>
</div>

<div style="min-width: 5rem; text-align: center;">
  <span class="hds-overline">Default (24px)</span>
  <div style="margin-top: 0.5rem;"><button class="hds-btn-icon hds-btn-icon--secondary" type="button" aria-label="Play">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#play"></use>
  </svg></button></div>
</div>

<div style="min-width: 5rem; text-align: center;">
  <span class="hds-overline">LG (28px)</span>
  <div style="margin-top: 0.5rem;"><button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--lg" type="button" aria-label="Play">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#play"></use>
  </svg></button></div>
</div>

<div style="min-width: 5rem; text-align: center;">
  <span class="hds-overline">XL (32px)</span>
  <div style="margin-top: 0.5rem;"><button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--xl" type="button" aria-label="Play">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#play"></use>
  </svg></button></div>
</div>

<div style="min-width: 5rem; text-align: center;">
  <span class="hds-overline">2XL (36px)</span>
  <div style="margin-top: 0.5rem;"><button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--2xl" type="button" aria-label="Play">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#play"></use>
  </svg></button></div>
</div>

<div style="min-width: 5rem; text-align: center;">
  <span class="hds-overline">3XL (40px)</span>
  <div style="margin-top: 0.5rem;"><button class="hds-btn-icon hds-btn-icon--secondary hds-btn-icon--3xl" type="button" aria-label="Play">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#play"></use>
  </svg></button></div>
</div>

</div>
```

> **Differs from Figma:** The HDS Figma icon button spec defines 6 sizes labeled XS through XXL (16–36px). HDS Core uses USWDS-style t-shirt naming (2xs through 3xl) so that modifier names always indicate size relative to the default. The pixel values for those 6 sizes are identical to Figma. Two additional sizes (2xs at 12px and 3xl at 40px) are not in the Figma icon button spec but are commonly observed in Figma modules and templates — flagged for creative director confirmation.

## When to use

- **Compact actions** where the icon's meaning is universally clear — play, download, share, close, expand
- **Social media rows** — a group of social/sharing icons
- **Carousel and accordion controls** — utility role arrows for previous/next and expand/collapse
- **Action bars** — a horizontal row of secondary actions below content
- **CTA accent** — a small CTA icon paired with adjacent text
- **Disclosure triggers over images** — interactive role for tooltips, popovers, and contextual info

## When to consider something else

- If the action needs a **text label** for clarity, use a [Button](./components-button-guidance.md) instead
- For **inline text navigation**, use a [Link](./components-link-guidance.md)
- If the icon's meaning is **not universally obvious** (e.g., a domain-specific glyph), use a text button — don't rely on `aria-label` alone to convey meaning to sighted users
- For **decorative icons** that aren't interactive, use `.hds-glyph` instead. See [Icons](./foundations-icons.md) for all available glyphs.

## Usability guidance

- **Always provide `aria-label`.** Icon buttons have no visible text — the label is the only way screen readers and voice control users can identify the action.
- **Write action-oriented labels.** "Download report" is better than "Download." "Go to mission page" is better than "Arrow."
- **Use `<button>` for actions, `<a>` for navigation.** If the icon button navigates to a new page, use an `<a>` tag. If it triggers an on-page action, use `<button>`.
- **One icon per button.** Don't combine multiple icons in a single icon button.

> **Differs from USWDS:** The 2xs size (12px) is below the WCAG 2.5.8 minimum touch target size (24×24px). Use only on desktop viewports with a mouse-driven interface. On touch devices, use the default (24px) or larger.

## Usage patterns

```html
  <div style="display: flex; flex-direction: column; gap: 2rem;">
    <div>
      <span class="hds-overline">Social row</span>
      <div style="margin-top: 0.5rem;">

<div style="display: flex; flex-wrap: wrap; gap: 2rem; align-items: flex-start;">

          <a class="hds-btn-icon hds-btn-icon--social hds-btn-icon--xl" href="#" aria-label="Notifications">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#notification"></use>
  </svg></a>
          <a class="hds-btn-icon hds-btn-icon--social hds-btn-icon--xl" href="#" aria-label="RSS feed">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#rss"></use>
  </svg></a>
          <a class="hds-btn-icon hds-btn-icon--social hds-btn-icon--xl" href="#" aria-label="Share">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#share"></use>
  </svg></a>

</div>
      </div>
    </div>
    <div>
      <span class="hds-overline">Action bar</span>
      <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
        <button class="hds-btn-icon hds-btn-icon--secondary" type="button" aria-label="Download">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#download"></use>
  </svg></button>
        <button class="hds-btn-icon hds-btn-icon--outline" type="button" aria-label="Print">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#print"></use>
  </svg></button>
        <button class="hds-btn-icon hds-btn-icon--utility" type="button" aria-label="Expand">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#expand"></use>
  </svg></button>
      </div>
    </div>
    <div>
      <span class="hds-overline">CTA with adjacent text</span>
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
        <span style="font-weight: 600;">Explore the mission</span>
        <a class="hds-btn-icon hds-btn-icon--cta hds-btn-icon--sm" href="#" aria-label="Go to mission page">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="assets/img/hds-sprite.svg#arrow-line-right"></use>
  </svg></a>
      </div>
    </div>
  </div>
```

## Accessibility

- **`aria-label` is required** on every icon button. Without it, the button is announced as empty by screen readers.
- **`aria-hidden="true"` on the SVG.** The icon is decorative — the `aria-label` on the button provides the accessible name.
- **`focusable="false"` on the SVG** prevents a double-focus issue in older browsers.
- **Don't remove focus styles.** HDS Core applies a visible focus ring on all interactive elements.
- **Touch target size.** The default size and above all meet the 24×24px minimum recommended by WCAG 2.5.8. The 2xs and xs sizes are below this threshold — use them only in desktop/mouse contexts.
- **Interactive disclosure buttons** require `aria-expanded` and `aria-controls` linking the button to its popover. The icon glyph must have at least 3:1 contrast against its background. The circle stroke is decorative framing — accessibility does not depend on it being visible.

```html
<!-- ✅ Correct -->
<button class="hds-btn-icon hds-btn-icon--secondary" type="button" aria-label="Download report">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
  </svg>
</button>

<!-- ❌ Missing aria-label -->
<button class="hds-btn-icon hds-btn-icon--secondary" type="button">
  <svg class="hds-icon" aria-hidden="true" focusable="false">
    <use xlink:href="/assets/img/hds-sprite.svg#download"></use>
  </svg>
</button>
```

For the full icon inventory, see [Icons](./foundations-icons.md). For general accessibility guidance, see [Accessibility](./foundations-accessibility.md).
