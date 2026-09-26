/**
 * =============================================================================
 * SAMPLE 01 – Navigation & Authentication
 * =============================================================================
 * What this showcases:
 *   • Auth is handled once by the `setup` project (tests/auth.setup.ts)
 *   • Tests reuse the saved session via storageState (no login in the test body)
 *   • ui5Navigation – FLP home, semantic object apps, optional T-code style nav
 *   • ui5.waitForUI5() – wait until the UI5 framework is idle
 *
 * Multi-environment:
 *   Run with ENV=qas npm test  → loads .env.qas automatically
 *
 * Related config:
 *   playwright.config.ts → projects.setup / chromium.storageState
 *   praman.config.ts     → auth.strategy, baseUrl, client, language
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';

test.describe('Sample 01 | Navigation & Auth', () => {
  test('reuse authenticated session and open FLP home', {
    tag: ['@sample', '@smoke'],
  }, async ({ page, ui5Navigation, ui5 }) => {
    // Session already established by auth.setup.ts – no sapAuth.login() here

    await test.step('Navigate to Fiori Launchpad home', async () => {
      // Opens the FLP shell (Tiles / Spaces depending on your FLP layout)
      await ui5Navigation.navigateToHome();
      await ui5.waitForUI5(); // Prefer this over page.waitForTimeout()
    });

    await test.step('Sanity-check that shell is present', async () => {
      // Generic check – works across classic and spaces-based FLP
      const shell = page.locator('#shell-header, .sapUshellShell').first();
      await expect(shell).toBeVisible({ timeout: 30_000 });
    });
  });

  test('navigate to a Fiori app by semantic object', {
    tag: ['@sample'],
  }, async ({ ui5Navigation, ui5, page }) => {
    await test.step('Open Manage Sales Orders (semantic object)', async () => {
      // Pattern: <SemanticObject>-<Action>
      // Replace with an app that exists in your catalog if needed
      await ui5Navigation.navigateToApp('SalesOrder-manage');
      await ui5.waitForUI5();
    });

    await test.step('Confirm app chrome loaded', async () => {
      // FE apps typically render a Dynamic Page or Object Page shell
      const appRoot = page.locator('.sapFDynamicPage, .sapMPage, .sapUiBody').first();
      await expect(appRoot).toBeVisible({ timeout: 45_000 });
    });
  });
});
