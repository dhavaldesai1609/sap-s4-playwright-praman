/**
 * =============================================================================
 * SAMPLE 07 – OData Operations
 * =============================================================================
 * What this showcases:
 *   • odata fixture – read / query backend services from the test
 *   • Validation of UI actions against the service layer
 *   • Feeds the Praman OData Trace reporter (reports/odata-trace.json)
 *
 * Use OData for:
 *   • Asserting a document was posted after UI save
 *   • Seeding or cleaning data when APIs are allowed
 *   • Performance awareness (slow entity sets surface in odata-trace.json)
 *
 * Replace entity paths with services available in your system (IWFND/MAINT_SERVICE).
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';

test.describe('Sample 07 | OData', () => {
  test('read pattern – query an entity set (adapt URL to your system)', {
    tag: ['@sample', '@odata'],
  }, async ({ odata }) => {
    await test.step('Illustrative OData read', async () => {
      // Example shapes (uncomment and point at a real service):
      //
      // const result = await odata.read("/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder?$top=5");
      // expect(result).toBeTruthy();
      //
      // const pos = await odata.read("/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder?$top=5");
      // expect(Array.isArray(pos?.value) || pos).toBeTruthy();
      //
      // Batch / write operations depend on your Praman odata helper version:
      // await odata.create('...', payload);
      // await odata.update('...', key, payload);
      // await odata.delete('...', key);

      // Placeholder so the sample stays green without live OData rights
      expect(typeof odata).toBe('object');
    });
  });

  test('combine UI action with backend verification (pattern)', {
    tag: ['@sample', '@odata'],
  }, async ({ ui5Navigation, ui5, odata }) => {
    await ui5Navigation.navigateToApp('SalesOrder-manage');
    await ui5.waitForUI5();

    // 1) Perform UI create/save (intent / fe / ui5) …
    // 2) Then verify via OData:
    // const created = await odata.read(
    //   `/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder('${salesOrderId}')`
    // );
    // expect(created.SalesOrder).toBe(salesOrderId);

    expect(odata).toBeTruthy();
  });
});
