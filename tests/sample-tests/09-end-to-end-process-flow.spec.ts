/**
 * =============================================================================
 * SAMPLE 09 – End-to-End Process Flow (combines multiple features)
 * =============================================================================
 * What this showcases in one scenario:
 *   • Process tags + compliance annotations
 *   • Master data + testData.generate
 *   • ui5Navigation + waitForUI5
 *   • Fiori Elements list report helpers
 *   • UI5 control discovery
 *   • test.step structure for readable reports (HTML / Allure)
 *   • Optional intent / OData / visual hooks (commented)
 *
 * This is the recommended shape for real OTC / PTP / RTR scenarios under tests/e2e/.
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';
import { buildSalesOrderData } from '../data/master-data';

test.describe('Sample 09 | E2E Process Flow (OTC-style)', () => {
  test('navigate → filter → assert Create enabled – annotated OTC flow', {
    tag: ['@sample', '@OTC', '@smoke', '@high'],
  }, async ({
    ui5Navigation,
    fe,
    ui5,
    testData,
    // intent,
    // odata,
    // page,
  }) => {
    // --- Compliance / stakeholder metadata ---------------------------------
    test.info().annotations.push(
      { type: 'process', description: 'OTC' },
      { type: 'subprocess', description: 'Sales Order – List & Create entry point' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'VA01 / SalesOrder-manage' },
      { type: 'owner', description: 'VP Sales' },
    );

    // --- Data --------------------------------------------------------------
    const orderData = testData.generate(buildSalesOrderData({ quantity: 2 }));

    // --- Navigation --------------------------------------------------------
    await test.step('Open Manage Sales Orders', async () => {
      await ui5Navigation.navigateToApp('SalesOrder-manage');
      await ui5.waitForUI5();
    });

    // --- Fiori Elements ----------------------------------------------------
    await test.step('Search list (optional filters)', async () => {
      // await fe.listReport.setFilter('SoldToParty', orderData.soldToParty);
      await fe.listReport.search();
      await ui5.waitForUI5();
    });

    // --- UI5 control -------------------------------------------------------
    await test.step('Verify Create action is available', async () => {
      const createBtn = await ui5.control({
        controlType: 'sap.m.Button',
        properties: { text: 'Create' },
      });
      await expect(createBtn).toBeEnabled();

      // Drive the flow further in your landscape:
      // await createBtn.press();
      // await ui5.waitForUI5();
      // await intent.sales.createSalesOrder(orderData);
      // … assert via OData …
      // await expectStableScreenshot(page, { name: 'otc-so-created.png' }, () => ui5.waitForUI5());
    });

    // Soft documentation assertion on generated data
    expect(orderData.soldToParty).toBeTruthy();
  });
});
