/**
 * =============================================================================
 * SAMPLE 06 – Process Tags & Compliance Annotations
 * =============================================================================
 * What this showcases:
 *   • Playwright tags: @OTC @PTP @RTR @ATR @HTR @smoke @high @sample
 *   • test.info().annotations – process, subprocess, criticality, tcode
 *   • How tags drive selective execution (npm run test:smoke, test:otc, …)
 *   • How annotations feed Praman compliance / stakeholder-oriented reporting
 *
 * Selective runs:
 *   npm run test:smoke
 *   npm run test:otc
 *   npx playwright test --grep @high
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';

test.describe('Sample 06 | Tags & Annotations', () => {
  test('OTC high-criticality scenario with full annotations', {
    tag: ['@sample', '@OTC', '@smoke', '@high'],
  }, async ({ ui5Navigation, ui5 }) => {
    // Annotations appear in HTML / Allure / compliance-oriented views
    test.info().annotations.push(
      { type: 'process', description: 'OTC' },
      { type: 'subprocess', description: 'Sales Order Creation' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'VA01 / SalesOrder-manage' },
      { type: 'owner', description: 'VP Sales' },
    );

    await ui5Navigation.navigateToApp('SalesOrder-manage');
    await ui5.waitForUI5();
    expect(true).toBeTruthy();
  });

  test('PTP medium scenario', {
    tag: ['@sample', '@PTP'],
  }, async () => {
    test.info().annotations.push(
      { type: 'process', description: 'PTP' },
      { type: 'subprocess', description: 'Purchase Order Creation' },
      { type: 'criticality', description: 'Medium' },
      { type: 'tcode', description: 'ME21N / PurchaseOrder-manage' },
    );
    expect(true).toBeTruthy();
  });

  test('RTR period-close related annotation example', {
    tag: ['@sample', '@RTR'],
  }, async () => {
    test.info().annotations.push(
      { type: 'process', description: 'RTR' },
      { type: 'subprocess', description: 'Journal Entry' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'FB01 / JournalEntry-create' },
    );
    expect(true).toBeTruthy();
  });
});
