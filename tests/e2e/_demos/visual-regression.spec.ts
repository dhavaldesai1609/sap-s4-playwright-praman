import { test, expect } from 'playwright-praman';
import { expectStableScreenshot, expectElementScreenshot } from '../../helpers/visual';

/**
 * Visual regression examples for Fiori / UI5 screens.
 *
 * First run creates baselines under __snapshots__/.
 * Subsequent runs fail if the UI drifts beyond the configured threshold.
 *
 * Update baselines intentionally:
 *   npx playwright test tests/e2e/_demos/visual-regression.spec.ts --update-snapshots
 */
test.describe('Visual regression (demos)', () => {
  test('FLP home – stable full-page snapshot', {
    tag: ['@visual', '@smoke'],
  }, async ({ page, ui5Navigation, ui5 }) => {
    await ui5Navigation.navigateToHome();
    await ui5.waitForUI5();

    await expectStableScreenshot(
      page,
      { name: 'flp-home.png', fullPage: false },
      () => ui5.waitForUI5(),
    );
  });

  test('Purchase Order app – header region', {
    tag: ['@visual', '@PTP'],
  }, async ({ page, ui5Navigation, ui5 }) => {
    await ui5Navigation.navigateToApp('PurchaseOrder-manage');
    await ui5.waitForUI5();

    // Prefer region/control screenshots over full page when possible
    const header = page.locator('.sapFDynamicPageTitle, .sapUxAPObjectPageHeaderContent').first();
    if (await header.count()) {
      await expectElementScreenshot(header, 'po-app-header.png');
    } else {
      await expectStableScreenshot(
        page,
        { name: 'po-app-viewport.png' },
        () => ui5.waitForUI5(),
      );
    }
  });
});
