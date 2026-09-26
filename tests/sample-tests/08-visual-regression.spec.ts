/**
 * =============================================================================
 * SAMPLE 08 – Visual Regression
 * =============================================================================
 * What this showcases:
 *   • Playwright expect(page).toHaveScreenshot (configured in playwright.config.ts)
 *   • helpers/visual.ts – expectStableScreenshot / expectElementScreenshot
 *   • Masking dynamic FLP chrome (user name, toasts, notifications)
 *   • @visual tag + npm run test:visual / test:visual:update
 *
 * Config defaults:
 *   animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0.02
 *   snapshots → __snapshots__/…
 *
 * First run creates baselines; commit them. Update with:
 *   npm run test:visual:update
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';
import { expectStableScreenshot, expectElementScreenshot } from '../helpers/visual';

test.describe('Sample 08 | Visual Regression', () => {
  test('stable viewport snapshot after navigation', {
    tag: ['@sample', '@visual'],
  }, async ({ page, ui5Navigation, ui5 }) => {
    await ui5Navigation.navigateToHome();
    await ui5.waitForUI5();

    await test.step('Capture FLP home with dynamic regions masked', async () => {
      await expectStableScreenshot(
        page,
        {
          name: 'sample-flp-home.png',
          fullPage: false,
          // Optional extra masks:
          // mask: [page.locator('.my-dynamic-clock')],
        },
        () => ui5.waitForUI5(),
      );
    });
  });

  test('element-level screenshot (more stable than full page)', {
    tag: ['@sample', '@visual'],
  }, async ({ page, ui5Navigation, ui5 }) => {
    await ui5Navigation.navigateToApp('SalesOrder-manage');
    await ui5.waitForUI5();

    await test.step('Screenshot header region when present', async () => {
      const header = page
        .locator('.sapFDynamicPageTitle, .sapUxAPObjectPageHeaderContent, .sapMBar')
        .first();

      if (await header.count()) {
        await expectElementScreenshot(header, 'sample-app-header.png');
      } else {
        // Fallback: full viewport if header selector not found in this landscape
        await expect(page).toHaveScreenshot('sample-app-viewport-fallback.png', {
          animations: 'disabled',
          caret: 'hide',
        });
      }
    });
  });
});
