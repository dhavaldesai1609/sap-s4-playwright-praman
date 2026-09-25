import { test, expect } from 'playwright-praman';

/**
 * Example end-to-end test for SAP S/4HANA Purchase Order creation / verification.
 * Demonstrates core Praman fixtures:
 * - ui5 / ui5Navigation  → typed UI5 control proxies + FLP navigation
 * - odata               → OData V2/V4 read/create/mock
 * - sapAuth             → authentication (already handled by setup project)
 *
 * Replace selectors / app IDs / OData entities with those from your landscape.
 * Prefer AI agents (plan → generate → heal) for production suites.
 */
test.describe('Purchase Order – S/4HANA', () => {
  test('navigate to Manage Purchase Orders and discover Create button', async ({
    ui5,
    ui5Navigation,
  }) => {
    await test.step('Navigate to Purchase Order app via FLP', async () => {
      // Common semantic object / action for PO management
      await ui5Navigation.navigateToApp('PurchaseOrder-manage');
      // Alternative for classic transactions:
      // await ui5.navigation.toTransaction('ME21N');
    });

    await test.step('Locate Create button via UI5 control API', async () => {
      const createBtn = await ui5.control({
        controlType: 'sap.m.Button',
        properties: { text: 'Create' },
      });

      const text = await createBtn.getText();
      expect(text).toBe('Create');
      await expect(createBtn).toBeEnabled();
    });
  });

  test('OData smoke – list Purchase Orders', async ({ odata }) => {
    await test.step('Read PurchaseOrders entity set', async () => {
      // Adjust path to your OData service (V2 or V4)
      const result = await odata.read('/PurchaseOrderService/PurchaseOrders', {
        // $top: 5,
        // $select: 'PurchaseOrder,Supplier,CompanyCode',
      });

      // Basic structural assertion – adapt to real response shape
      expect(result).toBeDefined();
      // For V4: expect(Array.isArray(result.value)).toBe(true);
    });
  });
});
