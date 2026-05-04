# HDS Core — Style Dictionary Example

## What this is
A working Style Dictionary v4 configuration that consumes HDS Core's `tokens.json`. Use this as a starting point for integrating HDS design tokens into your own build pipeline.

## Prerequisites
- Node.js 18+
- npm

## Setup
```bash
npm install
```

## Usage
```bash
npx style-dictionary build -c sd.config.js
```

## What it generates
- `hds-tokens.scss`: Base design tokens (colors, spacing, breakpoints, borders, layout)
- `hds-dataviz-tokens.scss`: Data visualization color tokens

## Configuration notes
- **Prefix:** Set to 'hds' to match HDS Core CSS output
- **Source:** Reads `tokens.json` from the repository root
- **Filtering:** Base and dataviz tokens are separated using path-based filters
- **DTCG format:** SD v4 parses `$value`, `$type`, and `$description` natively. The `$extensions` block is safely ignored.
- **Fractional spacing keys:** Keys like `1.5` are converted to hyphens in the output (e.g., `$hds-spacing-1-5`)

## What this does NOT do
- This is not part of HDS Core's production build
- HDS Core's own SCSS is hand-authored, not generated
- The palette system (6 contextual themes) cannot be generated from tokens — see Color Palettes docs

## Customizing
To modify this for your own project, edit `sd.config.js`. You can change the `prefix` to match your namespace, adjust the output `format` (e.g., to CSS custom properties, JS objects, or JSON), or add new platforms and transforms tailored to your specific application requirements.
