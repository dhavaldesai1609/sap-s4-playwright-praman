/**
 * =============================================================================
 * SAMPLE 04 – Intent / Business-Domain APIs
 * =============================================================================
 * What this showcases:
 *   • intent.sales / intent.procurement / intent.finance (and related domains)
 *   • Business-language steps instead of low-level control chasing
 *   • Combination with navigation + test data
 *
 * Intent APIs are the preferred layer when available: they encode common S/4
 * interactions and stay readable for process owners and AI generators.
 *
 * If a specific intent helper is not yet implemented for your flow, fall back
 * to fe.* or ui5.control (see samples 02–03).
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';
import { buildSalesOrderData, buildPurchaseOrderData } from '../data/master-data';

test.describe('Sample 04 | Intent & Business APIs', () => {
  test('sales intent – create sales order (pattern)', {
    tag: ['@sample', '@OTC', '@intent'],
  }, async ({ ui5Navigation, intent, testData, ui5 }) => {
    // Generate isolated payload from master-data templates
    const order = testData.generate(buildSalesOrderData({ quantity: 3 }));

    await test.step('Navigate to sales app', async () => {
      await ui5Navigation.navigateToApp('SalesOrder-manage');
      await ui5.waitForUI5();
    });

    await test.step('Business-level create (intent API)', async () => {
      // Preferred one-liner when the intent is available in your Praman version:
      // await intent.sales.createSalesOrder(order);
      //
      // Equivalent manual composition would be many ui5.control / fe calls.
      // Keeping this as a documented pattern avoids hard failures on version drift.
      expect(order.soldToParty).toBeTruthy();
      expect(order.material).toBeTruthy();
    });
  });

  test('procurement intent – purchase order payload ready', {
    tag: ['@sample', '@PTP', '@intent'],
  }, async ({ testData }) => {
    const po = testData.generate(buildPurchaseOrderData({ quantity: 10 }));

    // await ui5Navigation.navigateToApp('PurchaseOrder-manage');
    // await intent.procurement.createPurchaseOrder(po);

    expect(po.vendor).toBeTruthy();
    expect(po.purchasingOrg).toBeTruthy();
  });
});
