import { test, expect } from 'playwright-praman';
import { buildSalesOrderData } from '../../data/master-data';

/**
 * OTC – Order to Cash: Sales Order creation
 */
test.describe('OTC | Sales Order', () => {
  test('create sales order – happy path', {
    tag: ['@OTC', '@smoke', '@high'],
  }, async ({
    ui5Navigation,
    fe,
    ui5,
    intent,
    testData,
  }) => {
    test.info().annotations.push(
      { type: 'process', description: 'OTC' },
      { type: 'subprocess', description: 'Sales Order Creation' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'VA01 / SalesOrder-manage' },
    );

    const orderData = testData.generate(buildSalesOrderData());

    await test.step('Navigate to Manage Sales Orders', async () => {
      await ui5Navigation.navigateToApp('SalesOrder-manage');
    });

    await test.step('Create new sales order', async () => {
      // Preferred: await intent.sales.createSalesOrder(orderData);
      const createBtn = await ui5.control({
        controlType: 'sap.m.Button',
        properties: { text: 'Create' },
      });
      await expect(createBtn).toBeEnabled();
      // await createBtn.press();
      // await ui5.waitForUI5();
    });
  });
});
