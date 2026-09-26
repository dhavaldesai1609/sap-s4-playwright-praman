import { test, expect } from 'playwright-praman';

/**
 * Core UI5 control interaction patterns.
 * Shows discovery by ID / type+properties, fill/click/select helpers,
 * dialogs, tables and date pickers.
 *
 * These patterns work across freestyle UI5 and Fiori Elements apps.
 * Replace control IDs / property values with ones from your live system
 * (use the Praman planner agent or browser inspector).
 */
test.describe('UI5 Controls – Common Patterns', () => {
  test.beforeEach(async ({ ui5Navigation }) => {
    // Land on a representative app that has inputs, buttons, tables
    await ui5Navigation.navigateToApp('PurchaseOrder-manage');
  });

  test('discover and interact with Button + Input', async ({ ui5 }) => {
    await test.step('Locate Create button by type + text', async () => {
      const createBtn = await ui5.control({
        controlType: 'sap.m.Button',
        properties: { text: 'Create' },
      });
      await expect(createBtn).toBeEnabled();
      // await createBtn.press();  // or ui5.click({ ... })
    });

    await test.step('Fill an input (gold pattern)', async () => {
      // Prefer the high-level helper when possible
      // await ui5.fill({ id: 'vendorInput' }, '1000');

      // Or full control API for maximum control:
      const vendor = await ui5.control({
        controlType: 'sap.m.Input',
        properties: { placeholder: /vendor/i }, // adjust to real placeholder
      });
      await vendor.setValue('1000');
      await vendor.fireChange({ value: '1000' });
      await ui5.waitForUI5();
    });
  });

  test('table row count and selection', async ({ ui5 }) => {
    await test.step('Read table state', async () => {
      // Pass the SmartTable / table control ID from your app
      const rowCount = await ui5.table.getRowCount('purchaseOrderTable');
      expect(rowCount).toBeGreaterThanOrEqual(0);

      // const rows = await ui5.table.getRows('purchaseOrderTable');
    });
  });

  test('dialog open / confirm pattern', async ({ ui5 }) => {
    // Trigger a dialog first (e.g. click Delete or a Value Help)
    // await ui5.click({ controlType: 'sap.m.Button', properties: { text: 'Delete' } });

    await test.step('Wait for and confirm dialog', async () => {
      // await ui5.dialog.waitFor();
      // await ui5.dialog.confirm();

      // Or find a button inside the open dialog:
      // const okBtn = await ui5.control({
      //   controlType: 'sap.m.Button',
      //   properties: { text: 'OK' },
      //   searchOpenDialogs: true,
      // });
      // await okBtn.press();
    });
  });

  test('date picker', async ({ ui5 }) => {
    await test.step('Set a date', async () => {
      // await ui5.date.setDatePicker('validFrom', new Date('2026-01-15'));
    });
  });
});
