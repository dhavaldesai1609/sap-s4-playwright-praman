import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Playwright + Praman configuration optimized for SAP S/4HANA / Fiori testing.
 * Includes auth setup project, compliance reporter, and sensible timeouts for UI5.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // SAP sessions often share state; enable carefully
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 1, // Keep low for SAP to avoid lock contention
  timeout: 120_000, // UI5 apps can be slow
  expect: {
    timeout: 15_000,
  },

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    // Praman compliance / business-aware reporter (when available)
    // ['playwright-praman/reporters', { type: 'compliance', outputDir: 'reports' }],
  ],

  use: {
    baseURL: process.env.SAP_CLOUD_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
    // Extra HTTP headers if needed for your landscape
    // extraHTTPHeaders: { ... },
  },

  projects: [
    // Auth setup – runs once, saves storage state
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/,
    },
    // Main Chromium project – depends on setup
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
