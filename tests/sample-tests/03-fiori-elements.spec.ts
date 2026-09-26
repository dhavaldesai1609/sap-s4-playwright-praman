/**
 * =============================================================================
 * SAMPLE 03 – Fiori Elements Helpers
 * =============================================================================
 * What this showcases:
 *   • fe.listReport – filter bar, search, navigate to row
 *   • fe.objectPage – header title, edit / save actions
 *   • Optional ui5Footer for standard FE footer buttons
 *
 * Fiori Elements apps share a consistent shell (List Report → Object Page).
 * Using `fe.*` keeps tests short and resilient to minor UI5 version upgrades.
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';

test.describe('Sample 03 | Fiori Elements', () => {
  test('List Report – set filter, search, open first row', {
    tag: ['@sample', '@OTC'],
  }, async ({ ui5Navigation, fe, ui5 }) => {
    await test.step('Open a List Report app', async () => {
      await ui5Navigation.navigateToApp('SalesOrder-manage');
      await ui5.waitForUI5();
    });

    await test.step('Apply filter + search', async () => {
      // Field technical names must match the SmartFilterBar in your app
      // await fe.listReport.setFilter('SalesOrderType', 'OR');
      // await fe.listReport.setFilter('SoldToParty', '1000');
      await fe.listReport.search();
      await ui5.waitForUI5();
    });

    await test.step('Navigate into first result (Object Page)', async () => {
      // Index is 0-based relative to the visible table
      // await fe.listReport.navigateToItem(0);
      // await ui5.waitForUI5();
    });
  });

  test('Object Page – read header and edit/save pattern', {
    tag: ['@sample'],
  }, async ({ ui5Navigation, fe, ui5 }) => {
    await ui5Navigation.navigateToApp('SalesOrder-manage');
    await fe.listReport.search();
    // await fe.listReport.navigateToItem(0);
    await ui5.waitForUI5();

    await test.step('Read Object Page header title (when on OP)', async () => {
      // Only meaningful after navigateToItem – shown here as the API surface
      // const title = await fe.objectPage.getHeaderTitle();
      // expect(title).toBeTruthy();
    });

    await test.step('Edit → change → Save pattern', async () => {
      // await fe.objectPage.clickEdit();
      // … fill fields with ui5.control / ui5.fill …
      // await fe.objectPage.clickSave();
      // await ui5.waitForUI5();
    });
  });
});
