import { test, expect } from 'playwright-praman';

/**
 * Fiori Launchpad navigation examples.
 * Demonstrates ui5Navigation + ui5Shell fixtures for common FLP flows.
 *
 * Adapt tile names / semantic objects to your S/4 landscape.
 */
test.describe('Fiori Launchpad Navigation', () => {
  test('navigate to app by semantic object and return home', async ({
    ui5Navigation,
    ui5Shell,
  }) => {
    await test.step('Open Manage Purchase Orders app', async () => {
      await ui5Navigation.navigateToApp('PurchaseOrder-manage');
      // Alternative:
      // await ui5Navigation.navigateToIntent({ semanticObject: 'PurchaseOrder', action: 'manage' });
    });

    await test.step('Verify we left the FLP home', async () => {
      const hash = await ui5Navigation.getCurrentHash();
      expect(hash).toContain('PurchaseOrder');
    });

    await test.step('Return to FLP home via shell', async () => {
      await ui5Shell.clickHome();
      // or: await ui5Navigation.navigateToHome();
    });
  });

  test('navigate via tile title', async ({ ui5Navigation }) => {
    await test.step('Click a tile by visible title', async () => {
      // Replace with a real tile title from your Launchpad
      await ui5Navigation.navigateToTile('Manage Purchase Orders');
    });

    await test.step('Go back', async () => {
      await ui5Navigation.navigateBack();
    });
  });
});
