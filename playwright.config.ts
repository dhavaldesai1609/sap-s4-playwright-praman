import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import os from 'node:os';

// Multi-environment support: load .env.<ENV> if present, otherwise .env
const envName = process.env.ENV || process.env.NODE_ENV || 'dev';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${envName}`) });
dotenv.config(); // fallback to .env

/** Optional ReportPortal – only active when RP_ENDPOINT + RP_API_KEY are set */
const reportPortalEnabled = !!(process.env.RP_ENDPOINT && process.env.RP_API_KEY);
const reportPortalReporter = reportPortalEnabled
  ? [[
      '@reportportal/agent-js-playwright',
      {
        endpoint: process.env.RP_ENDPOINT,
        apiKey: process.env.RP_API_KEY,
        project: process.env.RP_PROJECT || 'sap-s4-praman',
        launch: process.env.RP_LAUNCH || `SAP S/4 E2E – ${envName}`,
        description: 'Playwright + Praman SAP S/4HANA process tests',
        attributes: [
          { key: 'framework', value: 'playwright-praman' },
          { key: 'env', value: envName },
          { key: 'process', value: 'OTC|PTP|RTR|ATR|HTR' },
        ],
        includeTestSteps: true,
        uploadTrace: true,
        uploadVideo: true,
        uploadScreenshot: true,
      },
    ] as const]
  : [];

/**
 * Playwright + Praman configuration for SAP S/4HANA process testing.
 *
 * Visual regression: expect.toHaveScreenshot with stable defaults for Fiori/UI5.
 * Historical trends: Allure (local + TestOps-ready) and optional ReportPortal.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 1,
  timeout: 120_000,

  // Visual regression baselines
  snapshotDir: './__snapshots__',
  snapshotPathTemplate:
    '{snapshotDir}/{testFileDir}/{testFileName}/{arg}-{projectName}-{platform}{ext}',

  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      // Stable defaults for Fiori / UI5 screens
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      // Tolerate minor anti-aliasing / font differences across OS
      maxDiffPixelRatio: 0.02,
      threshold: 0.2,
    },
  },

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['playwright-praman/reporters', { type: 'compliance', outputDir: 'reports' }],
    ['playwright-praman/reporters', { type: 'odata-trace', outputDir: 'reports' }],
    [
      'allure-playwright',
      {
        detail: true,
        suiteTitle: true,
        resultsDir: 'allure-results',
        environmentInfo: {
          framework: 'Playwright + Praman',
          'SAP Process Areas': 'OTC | PTP | RTR | ATR | HTR',
          ENV: envName,
          node_version: process.version,
          os: `${os.platform()} ${os.release()}`,
          ci: process.env.CI ? 'true' : 'false',
        },
        // Categories help Allure TestOps / local Allure group failures
        categories: [
          {
            name: 'UI5 / Control failures',
            messageRegex: '.*(ui5|control|UI5|sap\.m).*',
            matchedStatuses: ['failed', 'broken'],
          },
          {
            name: 'OData / Backend',
            messageRegex: '.*(odata|OData|HTTP|401|403|500).*',
            matchedStatuses: ['failed', 'broken'],
          },
          {
            name: 'Visual regression',
            messageRegex: '.*(screenshot|Snapshot|toHaveScreenshot).*',
            matchedStatuses: ['failed'],
          },
          {
            name: 'Timeouts',
            messageRegex: '.*(Timeout|timeout|exceeded).*',
            matchedStatuses: ['failed', 'timedOut'],
          },
        ],
      },
    ],
    ...reportPortalReporter,
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
