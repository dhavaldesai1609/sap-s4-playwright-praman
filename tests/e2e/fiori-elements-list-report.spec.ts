import { test, expect } from 'playwright-praman';

/**
 * Fiori Elements List Report + Object Page patterns.
 * Uses the dedicated `fe` fixture for filter bar, table, and object page actions.
 *
 * Replace app navigation and filter field names with those from your system.
 */
test.describe('Fiori Elements – List Report', () => {
  test('filter, search and open first item', async ({ ui5Navigation, fe }) => {
    await test.step('Navigate to a List Report app', async () => {
      // Example: Manage Sales Orders or any FE List Report
      await ui5Navigation.navigateToApp('SalesOrder-manage');
    });

    await test.step('Set filters and search', async () => {
      // Field name must match the SmartFilterBar property
      await fe.listReport.setFilter('SalesOrderType', 'OR');
      // await fe.listReport.setFilter('SoldToParty', '1000');
      await fe.listReport.search();
    });

    await test.step('Open first row → Object Page', async () => {
      await fe.listReport.navigateToItem(0);
    });

    await test.step('Verify Object Page header', async () => {
      const title = await fe.objectPage.getHeaderTitle();
      expect(title).toBeTruthy();
    });
  });

  test('edit and save on Object Page (pattern)', async ({ ui5Navigation, fe, ui5Footer }) => {
    await test.step('Navigate and open an item', async () => {
      await ui5Navigation.navigateToApp('SalesOrder-manage');
      await fe.listReport.search(); // no filter = all
      await fe.listReport.navigateToItem(0);
    });

    await test.step('Enter edit mode', async () => {
      await fe.objectPage.clickEdit();
      // or: await ui5Footer.clickEdit();
    });

    // … fill fields with ui5.fill / ui5.control …

    await test.step('Save', async () => {
      await fe.objectPage.clickSave();
      // or: await ui5Footer.clickSave();
    });
  });
});
