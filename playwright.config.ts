import 'dotenv/config';

import { defineConfig, devices } from '@playwright/test';

import { requireAppUrl } from './config/environment.js';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: true,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: requireAppUrl(),
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'e2e',
      testDir: './tests/e2e',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke',
      testDir: './tests/smoke',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
