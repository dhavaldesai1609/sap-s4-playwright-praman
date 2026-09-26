/**
 * =============================================================================
 * SAMPLE 05 – Test Data Layer & Master Data
 * =============================================================================
 * What this showcases:
 *   • tests/data/master-data.ts – shared org / BP / material defaults
 *   • buildSalesOrderData / buildPurchaseOrderData / buildJournalEntryData
 *   • testData.generate() – unique payloads per run (reduces collisions)
 *   • Environment overrides via TEST_COMPANY_CODE, TEST_VENDOR, etc. (.env)
 *
 * Design goal: tests never hard-code client-specific IDs; CI can point at
 * different landscapes with only .env changes.
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';
import {
  MASTER_DATA,
  buildSalesOrderData,
  buildPurchaseOrderData,
  buildJournalEntryData,
} from '../data/master-data';

test.describe('Sample 05 | Test Data & Master Data', () => {
  test('master data is loaded from env with safe defaults', {
    tag: ['@sample'],
  }, async () => {
    // Values come from process.env.TEST_* or the defaults in master-data.ts
    expect(MASTER_DATA.companyCode).toBeTruthy();
    expect(MASTER_DATA.customer).toBeTruthy();
    expect(MASTER_DATA.vendor).toBeTruthy();
    expect(MASTER_DATA.material).toBeTruthy();
  });

  test('builders produce process-specific payloads', {
    tag: ['@sample'],
  }, async ({ testData }) => {
    await test.step('OTC sales order data', async () => {
      const so = testData.generate(buildSalesOrderData({ quantity: 7 }));
      expect(so.soldToParty).toBe(MASTER_DATA.customer);
      expect(so.quantity).toBe(7);
      expect(so.salesOrg).toBe(MASTER_DATA.salesOrg);
    });

    await test.step('PTP purchase order data', async () => {
      const po = testData.generate(buildPurchaseOrderData());
      expect(po.vendor).toBe(MASTER_DATA.vendor);
      expect(po.plant).toBe(MASTER_DATA.plant);
    });

    await test.step('RTR journal entry data', async () => {
      const je = testData.generate(buildJournalEntryData({ amount: 2500 }));
      expect(je.companyCode).toBe(MASTER_DATA.companyCode);
      expect(je.amount).toBe(2500);
      expect(je.debitAccount).toBeTruthy();
    });
  });
});
