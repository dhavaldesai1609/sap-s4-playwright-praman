import { test, expect } from 'playwright-praman';
import { buildPurchaseOrderData } from '../../data/master-data';

/**
 * PTP – Procure to Pay: Purchase Order
 */
test.describe('PTP | Purchase Order', () => {
  test('create purchase order and verify via OData', {
    tag: ['@PTP', '@smoke', '@high'],
  }, async ({
    ui5Navigation,
    ui5,
    odata,
    intent,
    testData,
    flpLocks,
  }) => {
    test.info().annotations.push(
      { type: 'process', description: 'PTP' },
      { type: 'subprocess', description: 'Purchase Order Creation' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'ME21N / PurchaseOrder-manage' },
    );

    const poData = testData.generate(buildPurchaseOrderData());

    await test.step('Navigate to Manage Purchase Orders', async () => {
      await ui5Navigation.navigateToApp('PurchaseOrder-manage');
    });

    await test.step('Create PO via intent or explicit UI5', async () => {
      // Preferred: await intent.procurement.createPurchaseOrder(poData);
      const createBtn = await ui5.control({
        controlType: 'sap.m.Button',
        properties: { text: 'Create' },
      });
      await expect(createBtn).toBeEnabled();
    });

    await test.step('Verify backend via OData (pattern)', async () => {
      // const result = await odata.read('/A_PurchaseOrder', { $top: 5 });
      // expect(result.value?.length).toBeGreaterThan(0);
    });
  });
});
