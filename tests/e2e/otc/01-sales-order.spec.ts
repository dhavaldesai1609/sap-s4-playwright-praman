import { test, expect } from 'playwright-praman';

/**
 * OTC – Order to Cash: Sales Order creation (Manage Sales Orders / VA01 Fiori)
 *
 * Latest Praman features used:
 * - intent.sales (high-level business language)
 * - fe.listReport / objectPage (Fiori Elements)
 * - ui5Navigation + ui5 control proxies
 * - testData generation + auto-cleanup
 * - Business annotations for compliance reporting
 */
test.describe('OTC | Sales Order', () => {
  test('create sales order – happy path', async ({
    ui5Navigation,
    fe,
    ui5,
    intent,
    testData,
  }) => {
    // Annotate for Praman compliance / business-aware reporting
    test.info().annotations.push(
      { type: 'process', description: 'OTC' },
      { type: 'subprocess', description: 'Sales Order Creation' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'VA01 / SalesOrder-manage' },
    );

    const orderData = testData.generate({
      soldToParty: '1000',
      material: 'MAT-001',
      quantity: 5,
      plant: '1000',
      salesOrg: '1000',
    });

    await test.step('Navigate to Manage Sales Orders', async () => {
      await ui5Navigation.navigateToApp('SalesOrder-manage');
    });

    await test.step('Create new sales order', async () => {
      // High-level intent (preferred when available)
      // await intent.sales.createSalesOrder(orderData);

      // Or explicit FE + UI5 flow:
      const createBtn = await ui5.control({
        controlType: 'sap.m.Button',
        properties: { text: 'Create' },
      });
      await createBtn.press();
      await ui5.waitForUI5();

      // Fill header / items using ui5.fill or control proxies
      // await ui5.fill({ id: 'soldToParty' }, orderData.soldToParty);
      // …
    });

    await test.step('Verify order created', async () => {
      // const title = await fe.objectPage.getHeaderTitle();
      // expect(title).toMatch(/Sales Order/);
    });
  });
});
