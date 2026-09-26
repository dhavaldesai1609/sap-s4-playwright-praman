import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Multi-environment support: load .env.<ENV> if present, otherwise .env
const envName = process.env.ENV || process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${envName}`) });
dotenv.config(); // fallback to .env

/**
 * Playwright + Praman configuration for SAP S/4HANA process testing.
 *
 * Reporters enabled:
 * 1. list          – terminal progress
 * 2. html          – standard Playwright interactive report
 * 3. junit         – CI-friendly XML (GitHub, Azure DevOps, Jenkins)
 * 4. json          – machine-readable full results
 * 5. compliance    – Praman adoption / abstraction compliance
 * 6. odata-trace   – OData performance & error analytics
 * 7. allure        – rich interactive historical reports
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
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
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['json', { outputFile: 'reports/results.json' }],
    // Praman Compliance Reporter – Praman vs raw Playwright usage
    ['playwright-praman/reporters', { type: 'compliance', outputDir: 'reports' }],
    // Praman OData Trace Reporter – entity-set performance & errors
    ['playwright-praman/reporters', { type: 'odata-trace', outputDir: 'reports' }],
    // Allure – beautiful interactive reports with history & trends
    ['allure-playwright', {
      detail: true,
      suiteTitle: true,
      outputFolder: 'allure-results',
      environmentInfo: {
        framework: 'Playwright + Praman',
        'SAP Process Areas': 'OTC | PTP | RTR | ATR | HTR',
        ENV: process.env.ENV || 'dev',
      },
    }],
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
