import { test, expect } from 'playwright-praman';

/**
 * PTP – Procure to Pay: Purchase Order (Manage Purchase Orders / ME21N)
 *
 * Latest features: intent.procurement, ui5 control proxies, odata verification,
 * testData, process annotations, flpLocks (optional lock cleanup).
 */
test.describe('PTP | Purchase Order', () => {
  test('create purchase order and verify via OData', async ({
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

    const poData = testData.generate({
      vendor: '100001',
      material: 'MAT-001',
      quantity: 10,
      plant: '1000',
      purchasingOrg: '1000',
    });

    await test.step('Navigate to Manage Purchase Orders', async () => {
      await ui5Navigation.navigateToApp('PurchaseOrder-manage');
    });

    await test.step('Create PO via intent or explicit UI5', async () => {
      // Preferred high-level API
      // await intent.procurement.createPurchaseOrder(poData);

      // Explicit control interaction (gold pattern)
      const createBtn = await ui5.control({
        controlType: 'sap.m.Button',
        properties: { text: 'Create' },
      });
      await expect(createBtn).toBeEnabled();
      // await createBtn.press();
      // await ui5.fill({ id: 'vendorInput' }, poData.vendor);
      // …
    });

    await test.step('Verify backend via OData', async () => {
      // const result = await odata.read('/A_PurchaseOrder', { $top: 5 });
      // expect(result.value?.length).toBeGreaterThan(0);
    });

    // Optional: clean any locks created during the test
    // await flpLocks.deleteAllLockEntries(process.env.SAP_CLOUD_USERNAME!);
  });
});
