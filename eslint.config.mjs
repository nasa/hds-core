import storybook from 'eslint-plugin-storybook';
import * as mdx from 'eslint-plugin-mdx';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
const config = [
  // ── Global ignores ──────────────────────────────────────────────────────────
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'storybook-static/**',
      // Sass/CSS: handled by Stylelint
      '**/*.scss',
      '**/*.css',
    ],
  },

  // ── Base JS config (all .js files) ──────────────────────────────────────────
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_|^args$' }],
      'no-console': 'warn',
    },
  },

  // ── Storybook config/utility scripts — relax console ────────────────────────
  {
    files: ['.storybook/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },

  // ── Storybook — .stories.js ONLY ────────────────────────────────────────────
  {
    files: ['**/*.stories.js'],
    plugins: { storybook },
    rules: {
      // Only apply the rules that make sense for a CSS-only, no-React project.
      // Not spreading storybook.configs.recommended.rules; it pulls in
      // @typescript-eslint, react-hooks, jsx-a11y which are not installed here.
      'storybook/await-interactions': 'warn',
      'storybook/context-in-play-function': 'error',
      'storybook/default-exports': 'error',
      'storybook/story-exports': 'error',
      'storybook/use-storybook-expect': 'warn',
      'storybook/use-storybook-testing-library': 'warn',
    },
  },

  // ── MDX ─────────────────────────────────────────────────────────────────────
  // Spread mdx.flat for parser + processor setup only.
  // Rules are reset to {} — mdx.flat's recommended rules pull in @typescript-eslint,
  // react-hooks, jsx-a11y etc. which are not installed in this repo.
  {
    ...mdx.flat,
    files: ['**/*.mdx'],
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
    rules: {},
  },
];

export default config;
