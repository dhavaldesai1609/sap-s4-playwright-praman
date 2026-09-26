import { test, expect } from 'playwright-praman';
import { MASTER_DATA } from '../../data/master-data';

/**
 * ATR – Acquire to Retire: Asset Acquisition
 */
test.describe('ATR | Asset Acquisition', () => {
  test('acquire asset (happy path)', {
    tag: ['@ATR', '@medium'],
  }, async ({
    ui5Navigation,
    ui5,
    intent,
    testData,
  }) => {
    test.info().annotations.push(
      { type: 'process', description: 'ATR' },
      { type: 'subprocess', description: 'Asset Acquisition' },
      { type: 'criticality', description: 'Medium' },
      { type: 'tcode', description: 'AS01 / Asset-manage' },
    );

    const assetData = testData.generate({
      companyCode: MASTER_DATA.companyCode,
      assetClass: MASTER_DATA.assetClass,
      description: 'Test Laptop {{timestamp}}',
      costCenter: MASTER_DATA.costCenter,
      amount: 2500,
    });

    await test.step('Navigate to Manage Fixed Assets', async () => {
      await ui5Navigation.navigateToApp('Asset-manage');
    });

    await test.step('Create asset master + acquisition', async () => {
      // await intent.finance.acquireAsset(assetData);
    });
  });
});
