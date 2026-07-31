// ============================================================
// HDS Core → Salesforce Experience Cloud Branding Set (SPIKE)
// @nasa-hds/core
// ============================================================
// DISCOVERY SPIKE — not part of the shipping build. This config
// is standalone and is NOT referenced by `npm run build:tokens`.
// It does not read, write, or affect any file that
// .config/sd.config.js touches.
//
// Run:
//   npx style-dictionary build --config .config/sd.config.salesforce.js
//
// Outputs (separate tree, nothing under dist/ or src/):
//   tokens/salesforce/branding-set-values.json
//   tokens/salesforce/hds-salesforce-supplement.css
//
// ------------------------------------------------------------
// WHY TWO OUTPUTS
// ------------------------------------------------------------
// Salesforce Experience Cloud (Aura, Build Your Own) cannot load
// hds.min.css. It themes through a Branding Set — a no-code panel
// that emits --dxp-* custom properties at runtime.
//
//   branding-set-values.json    what a human types into the panel
//   hds-salesforce-supplement.css   a static resource for everything
//                                   the panel has no slot for
//
// ------------------------------------------------------------
// OPEN QUESTIONS ARE NOT GUESSED
// ------------------------------------------------------------
// Where more than one HDS token could plausibly fill a Branding Set
// slot, or where the panel has a slot HDS has no concept for, the
// JSON emits `"value": null` with `"status": "open-question"`, the
// question id, and the candidate values. It never invents one.
// See the mapping analysis for the full write-up of Q1–Q15.
//
// ------------------------------------------------------------
// STYLE DICTIONARY v5 NOTE
// ------------------------------------------------------------
// v5 DTCG stores transformed output on `token.$value`. `token.value`
// is undefined and a format function reading it emits `undefined`
// silently. Every read in this file goes through `tokenValue()`,
// which reads `$value` and throws on undefined rather than emitting
// a broken file.
// ============================================================

import StyleDictionary from 'style-dictionary';
import { fileHeader } from 'style-dictionary/utils';

const BUILD_PATH = 'tokens/salesforce/';

// ============================================================
// § Transforms
// ============================================================
// Mirrors .config/sd.config.js so values match the shipped
// pipeline exactly. Names are salesforce-scoped so this config
// can never collide with the main one if both are ever loaded
// into the same process.

StyleDictionary.registerTransform({
  name: 'name/salesforce/drop-default',
  type: 'name',
  filter: (token) => token.path[token.path.length - 1] === 'default',
  transform: (token) => token.name.replace(/-default$/, ''),
});

// Normalize '0em' → '0'. Same rule as the shipped pipeline, so the
// letter-spacing values handed to Salesforce read identically to the
// ones in src/scss/base/_custom-properties.scss.
StyleDictionary.registerTransform({
  name: 'value/salesforce/ls-normalize-zero',
  type: 'value',
  filter: (token) => token.path[0] === 'letter-spacing',
  transform: (token) => {
    const v = token.$value ?? token.value;
    return v === '0em' ? '0' : v;
  },
});

const salesforceTransforms = [
  'attribute/cti',
  'name/kebab',
  'name/salesforce/drop-default',
  'color/css',
  'value/salesforce/ls-normalize-zero',
];

StyleDictionary.registerTransformGroup({
  name: 'salesforce',
  transforms: salesforceTransforms,
});

// ============================================================
// § Token access helpers
// ============================================================

const indexByPath = (dictionary) => {
  const byPath = new Map();
  for (const token of dictionary.allTokens) {
    byPath.set(token.path.join('.'), token);
  }
  return byPath;
};

// Read a transformed value off a v5 DTCG token. Throws rather than
// letting `undefined` reach an output file.
const tokenValue = (byPath, path) => {
  const token = byPath.get(path);
  if (!token) {
    throw new Error(`[salesforce] token not found in tokens.json: ${path}`);
  }
  const value = token.$value;
  if (value === undefined) {
    throw new Error(
      `[salesforce] token.$value is undefined for ${path}. ` +
        `Style Dictionary v5 stores transformed output on $value, not value.`,
    );
  }
  return value;
};

// ============================================================
// § Typography composites
// ============================================================
// The Branding Set exposes eight typography axes per text role.
// tokens.json carries five of them inside each typography.styles.*
// composite. The other three have no HDS token: HDS does not set
// them, so the CSS initial value is what hds.min.css produces.
// Derived by absence — correct, but not token-sourced.

const COMPOSITE_AXIS = {
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'line-height': 'lineHeight',
  'letter-spacing': 'letterSpacing',
};

const INITIAL_AXIS = {
  'font-style': 'normal',
  'text-decoration': 'none',
  'text-transform': 'none',
};

const AXES = [
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'line-height',
  'letter-spacing',
  'text-decoration',
  'text-transform',
];

// Composite values are objects; Style Dictionary resolves the inner
// {references} before this runs. Zero letter-spacing is normalized to
// '0' to match the shipped pipeline (the value transform above only
// fires on top-level letter-spacing.* tokens, not on composite keys).
const compositeAxis = (byPath, stylePath, axis) => {
  const composite = tokenValue(byPath, stylePath);
  const key = COMPOSITE_AXIS[axis];
  if (!key) return INITIAL_AXIS[axis];
  const v = composite[key];
  if (v === undefined) {
    throw new Error(`[salesforce] ${stylePath} has no '${key}' — cannot fill ${axis}.`);
  }
  return axis === 'letter-spacing' && v === '0em' ? '0' : v;
};

// ============================================================
// § DERIVED — no maintainer decision required
// ============================================================

// Scalar slots that come straight off a single token.
const DERIVED_SCALARS = [
  {
    field: '--dxp-g-root-font-family',
    token: 'font-family.body',
    why: "body { font-family: family('body') } — src/scss/base/_elements.scss:46",
  },
  {
    field: '--dxp-g-heading-font-family',
    token: 'font-family.heading',
    why: "every h* entry in the $_type ramp uses family: 'heading' — src/scss/_hds-typography.scss:67-147",
  },
  // Spacing ladder. The six HDS *primary* values at or below the
  // observed 48px ceiling map one-for-one with no gaps. The three
  // intermediate values (4/12/20px) are excluded on purpose: their
  // $descriptions and AGENTS.md restrict them to component-internal
  // use, and this ladder is a layout ladder.
  { field: '--dxp-g-spacing-none', token: 'spacing.0', why: 'HDS primary spacing scale, step 0' },
  { field: '--dxp-g-spacing-xsmall', token: 'spacing.1', why: 'HDS primary spacing scale, step 1' },
  { field: '--dxp-g-spacing-small', token: 'spacing.2', why: 'HDS primary spacing scale, step 2' },
  { field: '--dxp-g-spacing-medium', token: 'spacing.3', why: 'HDS primary spacing scale, step 3' },
  { field: '--dxp-g-spacing-large', token: 'spacing.4', why: 'HDS primary spacing scale, step 4' },
  { field: '--dxp-g-spacing-xlarge', token: 'spacing.6', why: 'HDS primary spacing scale, step 6' },
];

// Slots derived from an implementation file rather than a token.
const DERIVED_LITERALS = [
  {
    field: '--dxp-s-html-font-size',
    value: '100%',
    source: 'src/scss/_hds-uswds-theme.scss:58',
    why:
      'HDS sets $theme-respect-user-font-size: true, so it deliberately does not pin the root font size. ' +
      'Enter 100% if the panel accepts a percentage. See Q13 before entering 16px — a hard px root ' +
      "defeats the browser's font-size preference and is an accessibility regression vs. hds.min.css.",
  },
];

// Text roles whose eight axes come wholly from one HDS composite.
const DERIVED_TYPE_ROLES = [
  {
    field: '--dxp-s-body',
    style: 'typography.styles.p',
    why: 'HDS paragraph style',
  },
  {
    field: '--dxp-s-button',
    style: 'typography.styles.h5',
    // components/_button.scss:51-55 —
    //   @mixin button-typography { @include hds-type('h5'); text-decoration-line: none; }
    overrides: {
      'text-decoration': { value: 'none', source: 'src/scss/components/_button.scss:54' },
    },
    why: "HDS button typography is hds-type('h5') — src/scss/components/_button.scss:51-55",
  },
];

// ============================================================
// § OPEN — maintainer decision required
// ============================================================
// Candidate values are resolved from tokens.json at build time, so
// the hexes and sizes in the JSON are real, never transcribed.

const COLOR_FAMILIES = ['root', 'neutral', 'brand', 'success', 'destructive', 'warning', 'info', 'offline'];

const COLOR_VARIANTS = ['', '-1', '-2', '-3', '-contrast', '-contrast-1', '-contrast-2', '-contrast-3'];

// Base-slot candidates. `token: null` means HDS has no token for the
// role at all — see Q7 / Q8.
const COLOR_BASE_QUESTIONS = {
  root: {
    question: 'Q5',
    summary: 'Is --dxp-g-root the page background, or the root of the neutral ramp?',
    candidates: [
      {
        token: 'color.spacesuit-white',
        note: 'default light background; :root palette bg (base/_palettes.scss:163-170)',
      },
      { token: 'color.carbon-05', note: 'alternate background for light mode' },
      { token: 'color.carbon-90', note: 'default background for dark mode' },
    ],
  },
  neutral: {
    question: 'Q6',
    summary:
      'Nothing in tokens.json designates one carbon step as THE neutral. base/_palettes.scss uses different steps per role.',
    candidates: [
      { token: 'color.carbon-50', note: 'numeric midpoint of the carbon ramp' },
      { token: 'color.carbon-60', note: 'the muted-text / link-underline role' },
      { token: 'color.carbon-90', note: 'the body-text role' },
    ],
  },
  brand: {
    question: 'Q1',
    summary:
      'HDS has two brand colors separated by meaning (red = go somewhere, blue = do something here). The panel has one slot. Either choice violates the other token’s $description prohibition.',
    candidates: [
      {
        token: 'color.nasa-red',
        note: "'go somewhere' — navigation CTAs. Never for on-page actions. Collides with --dxp-g-destructive.",
      },
      {
        token: 'color.nasa-blue',
        note: "'do something here' — on-page interactions. Never for navigation CTAs. Collides with --dxp-g-info.",
      },
    ],
  },
  success: {
    question: 'Q7',
    summary:
      'HDS does not theme the USWDS state colors — _hds-uswds-theme.scss:169-173 leaves success at green-cool-*, which is not an HDS token. Match shipped output, or match design intent?',
    candidates: [
      {
        token: 'color.active-green',
        note: "design intent — $description: 'active mission status and confirmation states'. See Q3: #47da84 is light; verify the -contrast pair.",
      },
      {
        token: null,
        note: 'shipped output — USWDS green-cool-30v (src/scss/_hds-uswds-theme.scss:171). Not an HDS token.',
      },
    ],
  },
  destructive: {
    question: 'Q7',
    summary: 'Same shipped-vs-intent choice as success. Also collides with brand if Q1 picks NASA Red.',
    candidates: [
      { token: 'color.nasa-red', note: "design intent — $description: 'and error/emergency alerts'" },
      {
        token: 'color.nasa-red-shade',
        note: 'darker variant; base/_palettes.scss uses it for --hds-palette-error-text on light schemes',
      },
      {
        token: null,
        note: 'shipped output — USWDS red-warm-50v (src/scss/_hds-uswds-theme.scss:153). Not an HDS token.',
      },
    ],
  },
  warning: {
    question: 'Q7',
    summary:
      'HDS has NO token that means warning. international-orange is a brand accent — its $description says "status emphasis or decorative markers" and never says warning.',
    candidates: [
      {
        token: 'color.international-orange',
        note: 'weakest evidence of the four state slots. Pressing a brand accent into a state role is a design decision.',
      },
      { token: null, note: 'shipped output — USWDS gold-20v (src/scss/_hds-uswds-theme.scss:162). Not an HDS token.' },
    ],
  },
  info: {
    question: 'Q7',
    summary: 'Same shipped-vs-intent choice. Also collides with brand if Q1 picks NASA Blue.',
    candidates: [
      { token: 'color.nasa-blue', note: "design intent — $description names 'info alerts' explicitly" },
      { token: null, note: 'shipped output — USWDS cyan-30v (src/scss/_hds-uswds-theme.scss:144). Not an HDS token.' },
    ],
  },
  offline: {
    question: 'Q8',
    summary:
      'HDS has no offline / inactive concept. grep for "offline" across src/scss returns nothing. Nearest analogues are palette disabled roles, which AGENTS.md forbids flattening into static values.',
    candidates: [
      { token: 'color.carbon-40', note: '--hds-palette-disabled on light schemes (base/_palettes.scss:95)' },
      { token: 'color.carbon-50', note: 'one step darker' },
      { token: null, note: 'leave at the Salesforce default' },
    ],
  },
};

// Non-color open slots.
const OPEN_SLOTS = [
  {
    field: '--dxp-g-spacing-xxlarge',
    question: 'Q9',
    summary:
      'Observed panel ceiling is 3rem/48px, already taken by -xlarge. Four HDS primary values sit above it (64/72/120/240px) with nowhere to go.',
    candidates: [
      {
        token: 'spacing.8',
        note: 'continues the HDS scale but exceeds the observed ceiling — unknown whether the panel validates a max',
      },
      { token: 'spacing.6', note: 'safe, but duplicates -xlarge; the ladder loses a step' },
      { token: null, note: 'leave at the Salesforce default' },
    ],
  },
  {
    field: '--dxp-s-link-text-decoration',
    question: 'Q12',
    summary:
      'HDS links set text-decoration: none and draw a dashed 2,3 underline with a repeating-linear-gradient background-image (_hds-mixins.scss:310-331). The panel has no way to express that.',
    candidates: [
      {
        literal: 'none',
        note: 'property-faithful. Drops the underline entirely. Likely WCAG 1.4.1 (Use of Color) failure: HDS link text and body text are the SAME color (base/_palettes.scss:56-57, both carbon-90) — the underline is the only cue.',
      },
      { literal: 'underline', note: 'affordance-faithful. Solid, not dashed — wrong HDS look, but accessible.' },
    ],
  },
  {
    field: '--dxp-s-link-text-decoration-hover',
    question: 'Q12',
    summary:
      'hds-link-hover (_hds-mixins.scss:333-344) swaps the dashed underline for a solid one, also via background-image.',
    candidates: [
      {
        literal: 'underline',
        note: 'close match to the HDS solid hover underline — but produces no state change if the default is also underline',
      },
      { literal: 'none', note: 'matches the CSS property HDS actually sets; no visible hover feedback' },
    ],
  },
  {
    field: '--dxp-s-link-text-decoration-focus',
    question: 'Q12',
    summary:
      'HDS focus is a four-sided dashed ring drawn with background gradients and outline: none (hds-focus-ring-inline, _hds-mixins.scss:154-180). It is not a text-decoration. Neither panel value reproduces it.',
    candidates: [
      { literal: 'none', note: 'faithful to the property; leaves focus with no affordance from this slot' },
      { literal: 'underline', note: 'gives focus a visible cue but is not the HDS treatment' },
    ],
    noHdsSource: true,
  },
];

// Heading roles — Q4. Which four of the ten heading-family styles
// fill the four panel slots is a creative-director call.
const HEADING_SLOTS = ['extra-large', 'large', 'medium', 'small'];
const HEADING_OPTIONS = {
  'A — semantic h1-h4': [
    'typography.styles.h1',
    'typography.styles.h2',
    'typography.styles.h3',
    'typography.styles.h4',
  ],
  'B — mid ramp h2-h5': [
    'typography.styles.h2',
    'typography.styles.h3',
    'typography.styles.h4',
    'typography.styles.h5',
  ],
  'C — display-led': [
    'typography.styles.h1-xl',
    'typography.styles.h1',
    'typography.styles.h2',
    'typography.styles.h3',
  ],
};

// Body-small — Q11. HDS has no style named "body small".
const BODY_SMALL_OPTIONS = [
  {
    style: 'typography.styles.caption',
    note: "strongest evidence — _hds-uswds-theme.scss:336 sets $theme-small-font-size: '3xs', HDS's own answer to 'what is small text'. But caption is scoped to figcaptions in HDS and also carries a palette-muted color.",
  },
  {
    style: null,
    note: 'a 0.875rem (font-size.2xs) body variant. No such composite exists — line-height and letter-spacing would have to be invented. font-size.2xs $description says "H6 and Label (form)", a label, not body copy.',
  },
  { style: 'typography.styles.intro', note: 'wrong direction — intro (1.125rem) is larger than body' },
];

// Font-size ramp — Q10. Ten HDS sizes, eleven slots, and the ramp
// direction is unverifiable from source.
const FONT_SIZE_ASCENDING = [
  'font-size.3xs',
  'font-size.2xs',
  'font-size.xs',
  'font-size.sm',
  'font-size.md',
  'font-size.lg',
  'font-size.xl',
  'font-size.2xl',
  'font-size.3xl',
  'font-size.4xl',
];

// ============================================================
// § Format — branding-set-values.json
// ============================================================

const candidateList = (byPath, candidates) =>
  candidates.map((c) => {
    if (c.literal !== undefined) return { value: c.literal, source: null, note: c.note };
    if (c.token === null || c.token === undefined) return { value: null, source: null, note: c.note };
    return { value: tokenValue(byPath, c.token), source: `tokens.json → ${c.token}`, note: c.note };
  });

StyleDictionary.registerFormat({
  name: 'salesforce/branding-set-json',
  format: ({ dictionary }) => {
    const byPath = indexByPath(dictionary);
    const fields = {};

    const derive = (field, value, source, why) => {
      fields[field] = { status: 'derived', value, source, note: why };
    };
    const open = (field, spec) => {
      fields[field] = {
        status: 'open-question',
        value: null,
        question: spec.question,
        summary: spec.summary,
        candidates: candidateList(byPath, spec.candidates ?? []),
        ...(spec.noHdsSource ? { hdsSource: 'none' } : {}),
      };
    };

    // ---- Globals: colors (64 slots) ----
    for (const family of COLOR_FAMILIES) {
      const base = COLOR_BASE_QUESTIONS[family];
      for (const variant of COLOR_VARIANTS) {
        const field = `--dxp-g-${family}${variant}`;
        if (variant === '') {
          open(field, base);
        } else if (variant.startsWith('-contrast')) {
          open(field, {
            question: 'Q3',
            summary:
              'HDS has no contrast-pair concept in tokens.json. Unresolved: whether -contrast means foreground-on-base or a contrasting surface, and whether each pair must be verified for WCAG 1.4.3 / 1.4.11. base/_palettes.scss:194-208 shows HDS treating this as mandatory by hand; base/_palettes.scss:47-50 shows HDS also shipping a known accepted failure (Issue #40).',
            candidates: [
              { token: 'color.spacesuit-white', note: 'HDS foreground on dark schemes (base/_palettes.scss:103-105)' },
              { token: 'color.carbon-90', note: 'HDS body-text foreground on light schemes (base/_palettes.scss:56)' },
              { token: 'color.carbon-black', note: 'HDS heading foreground on light schemes (base/_palettes.scss:55)' },
            ],
          });
        } else {
          open(field, {
            question: 'Q2',
            summary:
              'Salesforce appears to expect progressively darker variants. HDS ships tint/base/shade (one darker step), not a three-step darker ramp — except the carbon neutrals, which have ten steps. Generating intermediate darks is forbidden by AGENTS.md ("NEVER introduce colors outside the color group").',
            candidates: [
              { token: 'color.carbon-70', note: 'available only if the family is mapped onto the carbon ramp' },
              { token: null, note: 'leave at the Salesforce default — no HDS token exists for this step' },
            ],
          });
        }
      }
    }

    // ---- Globals: spacing (7 slots) ----
    for (const s of DERIVED_SCALARS.filter((d) => d.field.startsWith('--dxp-g-spacing'))) {
      derive(s.field, tokenValue(byPath, s.token), `tokens.json → ${s.token}`, s.why);
    }
    for (const slot of OPEN_SLOTS.filter((o) => o.field.startsWith('--dxp-g-spacing'))) {
      open(slot.field, slot);
    }

    // ---- Globals: font sizes (11 slots) ----
    for (let i = 1; i <= 11; i += 1) {
      const token = FONT_SIZE_ASCENDING[i - 1];
      fields[`--dxp-g-font-size-${i}`] = {
        status: 'open-question',
        value: null,
        question: 'Q10',
        summary:
          'Two unknowns: (a) whether --dxp-g-font-size-1 is the smallest or the largest — unverifiable from source, and it flips the whole mapping; (b) what fills the 11th slot, since HDS has only ten font-size tokens and none exist below 0.75rem or above 7.5rem.',
        candidates: token
          ? [
              {
                value: tokenValue(byPath, token),
                source: `tokens.json → ${token}`,
                note: 'position under an ASCENDING reading of the ramp (slot 1 = smallest)',
              },
            ]
          : [{ value: null, source: null, note: 'no HDS token — eleventh slot has no source under either reading' }],
      };
    }

    // ---- Globals: font families (2 slots) ----
    for (const s of DERIVED_SCALARS.filter((d) => d.field.endsWith('font-family'))) {
      derive(s.field, tokenValue(byPath, s.token), `tokens.json → ${s.token}`, s.why);
    }

    // ---- Semantic: html font size (1 slot) ----
    for (const l of DERIVED_LITERALS) {
      derive(l.field, l.value, l.source, l.why);
    }

    // ---- Semantic: headings (32 slots) ----
    for (const [i, slot] of HEADING_SLOTS.entries()) {
      for (const axis of AXES) {
        const candidates = Object.entries(HEADING_OPTIONS).map(([label, styles]) => ({
          value: compositeAxis(byPath, styles[i], axis),
          source: `tokens.json → ${styles[i]}`,
          note: `option ${label}`,
        }));
        fields[`--dxp-s-text-heading-${slot}-${axis}`] = {
          status: 'open-question',
          value: null,
          question: 'Q4',
          summary:
            'The HDS ramp has ten heading-family styles (h1-2xl, h1-xl, h1-h6, intro) for four panel slots. The ramp is not evenly spaced, so the perceived rhythm changes with whichever four are picked.',
          candidates,
        };
      }
    }

    // ---- Semantic: body + button (16 slots) ----
    for (const role of DERIVED_TYPE_ROLES) {
      for (const axis of AXES) {
        const override = role.overrides?.[axis];
        if (override) {
          derive(`${role.field}-${axis}`, override.value, override.source, role.why);
        } else if (COMPOSITE_AXIS[axis]) {
          derive(
            `${role.field}-${axis}`,
            compositeAxis(byPath, role.style, axis),
            `tokens.json → ${role.style}.${COMPOSITE_AXIS[axis]}`,
            role.why,
          );
        } else {
          derive(
            `${role.field}-${axis}`,
            INITIAL_AXIS[axis],
            null,
            'Derived by absence: tokens.json has no token for this axis and HDS does not set it, so the CSS initial value is what hds.min.css produces.',
          );
        }
      }
    }

    // ---- Semantic: body-small (8 slots) ----
    for (const axis of AXES) {
      fields[`--dxp-s-body-small-${axis}`] = {
        status: 'open-question',
        value: null,
        question: 'Q11',
        summary: 'HDS has no style named "body small".',
        candidates: BODY_SMALL_OPTIONS.map((o) => ({
          value: o.style ? compositeAxis(byPath, o.style, axis) : null,
          source: o.style ? `tokens.json → ${o.style}` : null,
          note: o.note,
        })),
      };
    }

    // ---- Semantic: links (3 slots) ----
    for (const slot of OPEN_SLOTS.filter((o) => o.field.startsWith('--dxp-s-link'))) {
      open(slot.field, slot);
    }

    const all = Object.values(fields);
    const derived = all.filter((f) => f.status === 'derived').length;

    return `${JSON.stringify(
      {
        $generated: {
          warning:
            'GENERATED FILE — DO NOT EDIT. Regenerate with: npx style-dictionary build --config .config/sd.config.salesforce.js',
          generator: '.config/sd.config.salesforce.js',
          source: 'tokens.json',
          status: 'DISCOVERY SPIKE — not a shipping artifact, not consumed by any HDS build',
        },
        $legend: {
          derived:
            'Traceable to tokens.json (or a cited src/scss line) with no judgment call. Safe to enter in the panel.',
          'open-question':
            'value is null on purpose. More than one HDS token could fill this slot, or HDS has no concept for it. A maintainer must choose from `candidates`. See the mapping analysis for Q1-Q15.',
        },
        $coverage: {
          totalSlots: all.length,
          derived,
          openQuestions: all.length - derived,
          derivedPercent: `${((derived / all.length) * 100).toFixed(1)}%`,
        },
        fields,
      },
      null,
      2,
    )}\n`;
  },
});

// ============================================================
// § Format — hds-salesforce-supplement.css
// ============================================================
// A static resource the Salesforce team uploads. It is deliberately
// NOT a bundle and NOT a copy of _custom-properties.scss.
//
// EMISSION RULE — everything here has NO --dxp-* slot at all:
//   color (full ramp)   panel exposes 8 semantic families, not the
//                       20 HDS primitives, and never under --hds-* names
//   border, focus       no --dxp-* radius, width, or focus token exists
//   layout, spacing     no --dxp-* layout slots; the panel ladder is 7
//                       slots under different names and caps at 48px
//   font-family.code    panel has root + heading only, no mono slot
//
// Groups the panel DOES carry (font-size ramp, root/heading family,
// and weight / line-height / letter-spacing via the semantic type
// slots) are omitted to keep this small.
//
// NO @layer. hds.min.css declares a cascade layer order, but a
// Salesforce org declares none — and unlayered rules beat layered
// ones. Wrapping this in @layer would make it LOSE to every
// Salesforce default.

const SUPPLEMENT_GROUPS = [
  {
    label: 'Color — full HDS ramp (panel exposes 8 semantic families, not these 20 primitives)',
    match: (t) => t.path[0] === 'color',
  },
  { label: 'Border — no --dxp-* radius or width token exists', match: (t) => t.path[0] === 'border' },
  { label: 'Focus — no --dxp-* focus token exists', match: (t) => t.path[0] === 'focus' },
  { label: 'Layout — no --dxp-* layout slots exist', match: (t) => t.path[0] === 'layout' },
  {
    label: 'Spacing — full HDS scale, incl. intermediates and the four values above the panel ceiling',
    match: (t) => t.path[0] === 'spacing',
  },
  {
    label: 'Font family — mono only; root and heading are set in the panel',
    match: (t) => t.path[0] === 'font-family' && t.path[1] === 'code',
  },
];

// HDS's own class names, so markup written against hds.min.css
// ports to the Salesforce surface unchanged.
// Source: src/scss/_hds-typography.scss:285-360
const TYPE_CLASS = {
  'h1-2xl': 'hds-display-2xl',
  'h1-xl': 'hds-display-xl',
  h1: 'hds-h1',
  h2: 'hds-h2',
  h3: 'hds-h3',
  h4: 'hds-h4',
  h5: 'hds-h5',
  h6: 'hds-h6',
  intro: 'hds-intro',
  p: 'hds-p',
  caption: 'hds-caption',
  metadata: 'hds-metadata',
  'number-lg': 'hds-stat-lg',
  'number-md': 'hds-stat-md',
  'number-sm': 'hds-stat-sm',
  'number-xs': 'hds-stat-xs',
};

StyleDictionary.registerFormat({
  name: 'salesforce/supplement-css',
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });
    const byPath = indexByPath(dictionary);
    const out = [];

    out.push('/* ------------------------------------------------------------');
    out.push(' * HDS Core — Salesforce Experience Cloud supplement (SPIKE)');
    out.push(' *');
    out.push(' * Upload as a static resource. Covers only what the Branding');
    out.push(' * Set panel has no slot for. Everything the panel CAN set lives');
    out.push(' * in branding-set-values.json instead.');
    out.push(' *');
    out.push(' * Intentionally unlayered: a Salesforce org declares no cascade');
    out.push(' * layers, and unlayered rules beat layered ones.');
    out.push(' *');
    out.push(' * KNOWN DIVERGENCE FROM hds.min.css:');
    out.push(' *   - The type classes below emit STATIC font sizes (the token');
    out.push(' *     target). hds.min.css wraps 9 of these in clamp() for fluid');
    out.push(' *     sizing (src/scss/_hds-typography.scss:46-56, and the nine');
    out.push(' *     `clamp: (min, max)` entries in the $_type ramp). tokens.json');
    out.push(' *     carries only the clamp maximum, so mobile renders LARGER');
    out.push(' *     here than on an HDS site.');
    out.push(' *   - .hds-overline is absent. The Sass $_type ramp has 17 styles;');
    out.push(' *     tokens.json carries 16 — `overline` exists only in');
    out.push(' *     src/scss/_hds-typography.scss:172-183 and cannot be reached');
    out.push(' *     from a tokens.json-sourced generator.');
    out.push(' *   - No palette system. AGENTS.md forbids flattening the six');
    out.push(' *     --hds-palette-* scopes into static values, so palette-aware');
    out.push(' *     colors (.hds-caption muted text, link/focus colors) are');
    out.push(' *     absent rather than wrong.');
    out.push(' *   - No dashed link underline and no dashed focus ring: both are');
    out.push(' *     drawn with background-image gradients on the element itself');
    out.push(' *     and cannot be reached from an external stylesheet.');
    out.push(' *');
    out.push(' * !important is used on the single-property utilities only,');
    out.push(' * following the USWDS convention noted at');
    out.push(' * src/scss/base/_palettes.scss:9. Multi-property type classes are');
    out.push(' * left unflagged. Whether either wins against SLDS specificity is');
    out.push(' * NOT verified.');
    out.push(' * ------------------------------------------------------------ */');
    out.push('');

    // ---- :root custom properties ----
    out.push(':root {');
    for (const group of SUPPLEMENT_GROUPS) {
      const tokens = dictionary.allTokens.filter(group.match);
      if (!tokens.length) continue;
      out.push(`  /* ${group.label} */`);
      for (const token of tokens) {
        out.push(`  --${token.name}: ${tokenValue(byPath, token.path.join('.'))};`);
      }
      out.push('');
    }
    if (out[out.length - 1] === '') out.pop();
    out.push('}');
    out.push('');

    // ---- Color utilities ----
    // The panel emits no utility classes at all. These replace the
    // ad-hoc hand-written ones observed in production.
    // Rules are emitted expanded rather than single-line so the output
    // passes `npm run format` unchanged. The repo's other generated
    // files opt out via .config/prettierignore instead; this spike does
    // not touch that file.
    const rule = (selector, decls) => {
      out.push(`${selector} {`);
      for (const decl of decls) out.push(`  ${decl}`);
      out.push('}');
    };

    out.push('/* Color utilities — the panel emits no classes, only custom properties. */');
    const colors = dictionary.allTokens.filter((t) => t.path[0] === 'color');
    for (const token of colors) {
      const suffix = token.path.slice(1).join('-');
      rule(`.hds-bg-${suffix}`, [`background-color: var(--${token.name}) !important;`]);
    }
    out.push('');
    for (const token of colors) {
      const suffix = token.path.slice(1).join('-');
      rule(`.hds-text-${suffix}`, [`color: var(--${token.name}) !important;`]);
    }
    out.push('');

    // ---- Radius utilities ----
    out.push('/* Radius — no --dxp-* radius token exists at any level of the panel. */');
    rule('.hds-radius-none', ['border-radius: var(--hds-border-radius) !important;']);
    rule('.hds-radius-control', ['border-radius: var(--hds-border-radius-control) !important;']);
    out.push('');

    // ---- Type classes ----
    // All 16 tokens.json composites are emitted. Four of the eight heading styles
    // are guaranteed homeless (10 styles, 4 panel slots) but WHICH four
    // depends on Q4, so emitting all of them costs ~8 rules and removes
    // the dependency.
    out.push('/* Type styles with no Branding Set slot. Class names match');
    out.push(' * src/scss/_hds-typography.scss:285-360 so markup ports back to');
    out.push(' * hds.min.css unchanged. All 16 tokens.json composites are emitted');
    out.push(' * because Q4 (which four heading styles the panel takes) is');
    out.push(' * unresolved. */');
    for (const [key, className] of Object.entries(TYPE_CLASS)) {
      const style = `typography.styles.${key}`;
      out.push(`.${className} {`);
      out.push(`  font-family: ${compositeAxis(byPath, style, 'font-family')};`);
      out.push(`  font-size: ${compositeAxis(byPath, style, 'font-size')};`);
      out.push(`  font-weight: ${compositeAxis(byPath, style, 'font-weight')};`);
      out.push(`  line-height: ${compositeAxis(byPath, style, 'line-height')};`);
      out.push(`  letter-spacing: ${compositeAxis(byPath, style, 'letter-spacing')};`);
      // src/scss/_hds-typography.scss:271-275 — the only text-transform
      // in the HDS type system, and it has no Branding Set slot.
      if (key === 'metadata') out.push('  text-transform: uppercase;');
      out.push('}');
    }

    return `${header}${out.join('\n')}\n`;
  },
});

// ============================================================
// § Platforms
// ============================================================

export default {
  source: ['tokens.json'],
  platforms: {
    'salesforce-json': {
      transformGroup: 'salesforce',
      prefix: 'hds',
      buildPath: BUILD_PATH,
      files: [
        {
          destination: 'branding-set-values.json',
          format: 'salesforce/branding-set-json',
          // Dataviz is a parallel contract for charts only (AGENTS.md:
          // "NEVER use for UI components") and has no Branding Set slot.
          filter: (token) => token.path[0] !== 'dataviz',
        },
      ],
    },
    'salesforce-css': {
      transformGroup: 'salesforce',
      prefix: 'hds',
      buildPath: BUILD_PATH,
      files: [
        {
          destination: 'hds-salesforce-supplement.css',
          format: 'salesforce/supplement-css',
          filter: (token) => token.path[0] !== 'dataviz' && token.path[0] !== 'breakpoint',
        },
      ],
    },
  },
};
