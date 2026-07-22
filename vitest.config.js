import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          server: {
            watch: {
              ignored: [
                '**/*.md',
                '**/node_modules/**',
                '**/package.json',
                '**/package-lock.json',
                '**/.devcontainer/**',
                '**/.github/**',
                '**/.vscode/**',
                '**/.config/**',
                '**/test.html',
                '**/src/**',
              ],
            },
          },
        },
      },
      {
        test: {
          name: 'unit',
          include: ['scripts/**/__tests__/**/*.test.js'],
          environment: 'node',
        },
      },
    ],
  },
});
