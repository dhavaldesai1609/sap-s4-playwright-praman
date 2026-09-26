import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Multi-environment support: load .env.<ENV> if present, otherwise .env
const envName = process.env.ENV || process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${envName}`) });
dotenv.config(); // fallback to .env

/**
 * Playwright + Praman configuration for SAP S/4HANA process testing.
 * - Auth setup + global teardown (lock cleanup)
 * - Praman compliance reporter
 * - Multi-environment via ENV=dev|qas|preprod
 * - Sensible timeouts for UI5 / Fiori
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // SAP sessions / locks – keep sequential by default
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 1,
  timeout: 120_000,
  expect: {
    timeout: 15_000,
  },

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    // Praman business-aware / compliance reporter
    ['playwright-praman/reporters', { type: 'compliance', outputDir: 'reports' }],
  ],

  use: {
    baseURL: process.env.SAP_CLOUD_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
      testIgnore: [/auth\.setup\.ts/, /global\.teardown\.ts/],
    },
  ],
});
