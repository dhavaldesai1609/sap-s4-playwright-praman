import { test, expect } from 'playwright-praman';

/**
 * High-level business intent examples.
 * The `intent` fixture maps common SAP processes to reusable actions
 * (procurement, sales, finance, manufacturing, masterData).
 *
 * Ideal for smoke / regression suites written in business language.
 * Under the hood Praman still uses typed UI5 controls + OData.
 *
 * Note: These methods require a matching app and master data in your system.
 * Adjust vendor / material / plant codes to valid values from your landscape.
 */
test.describe('Business Intents (high-level)', () => {
  test('procurement – create purchase order (pattern)', async ({ intent }) => {
    // Uncomment and supply real master data when ready:
    //
    // await intent.procurement.createPurchaseOrder({
    //   vendor: '100001',
    //   material: 'MAT-001',
    //   quantity: 10,
    //   plant: '1000',
    // });
    //
    // expect(...).toBeTruthy();

    test.info().annotations.push({
      type: 'note',
      description:
        'intent.procurement.createPurchaseOrder is ready – supply valid master data and uncomment',
    });
  });

  test('finance – post vendor invoice (pattern)', async ({ intent }) => {
    // await intent.finance.postVendorInvoice({
    //   vendor: '100001',
    //   amount: 5000,
    //   currency: 'EUR',
    // });

    test.info().annotations.push({
      type: 'note',
      description:
        'intent.finance.postVendorInvoice is ready – supply valid master data and uncomment',
    });
  });
});
