import { test } from 'playwright-praman';

/**
 * Seed file used by Praman AI agents (planner / generator / healer).
 * Agents start from this file when generating new business-process tests.
 * Keep it minimal – it is the entry point for live system exploration.
 */
test('SAP seed – ready for agent exploration', async ({ page, sapAuth, ui5 }) => {
  // Login is usually already done via storageState from auth.setup.ts
  // Agents will navigate, discover controls, and expand this into full specs.
  await page.goto('/'); // relative to baseURL
});
