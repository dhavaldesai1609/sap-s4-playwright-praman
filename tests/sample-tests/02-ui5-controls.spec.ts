/**
 * =============================================================================
 * SAMPLE 02 – Typed UI5 Control Proxies
 * =============================================================================
 * What this showcases:
 *   • ui5.control({ controlType, properties }) – discover controls without brittle IDs
 *   • Typed methods: setValue, fireChange, press, getText, …
 *   • Prefer Praman APIs over page.click / page.fill (Compliance reporter tracks this)
 *
 * Praman ships 199 typed UI5 control interfaces across sap.m, sap.ui.table, etc.
 *
 * API preference order in this framework:
 *   1. intent.*          (business language)
 *   2. fe.*              (Fiori Elements)
 *   3. ui5.control / ui5.fill  (explicit control work)
 * =============================================================================
 */
import { test, expect } from 'playwright-praman';

test.describe('Sample 02 | UI5 Controls', () => {
  test('locate a button by control type + text and assert state', {
    tag: ['@sample'],
  }, async ({ ui5Navigation, ui5 }) => {
    await ui5Navigation.navigateToApp('SalesOrder-manage');
    await ui5.waitForUI5();

    await test.step('Find Create button via UI5 metadata (not CSS id)', async () => {
      // Dynamic __button12 IDs change every transport – controlType + properties is stable
      const createBtn = await ui5.control({
        controlType: 'sap.m.Button',
        properties: { text: 'Create' },
      });

      // Custom matchers / proxy state – enabled is a common first assertion
      await expect(createBtn).toBeEnabled();

      // Interactive step (uncomment when you want to drive the UI):
      // await createBtn.press();
      // await ui5.waitForUI5();
    });
  });

  test('fill a field using setValue + fireChange pattern', {
    tag: ['@sample'],
  }, async ({ ui5Navigation, ui5 }) => {
    await ui5Navigation.navigateToApp('SalesOrder-manage');
    await ui5.waitForUI5();

    await test.step('Illustrative fill pattern (adapt field id/label to your app)', async () => {
      // CORRECT Praman pattern for bound inputs:
      //   await field.setValue('1000');
      //   await field.fireChange();   // triggers UI5 data binding
      //   await ui5.waitForUI5();
      //
      // NEVER use page.fill('#__input23') – breaks bindings and fails ComplianceReporter

      // Example discovery by label / placeholder when id is unknown:
      // const soldTo = await ui5.control({
      //   controlType: 'sap.m.Input',
      //   properties: { placeholder: 'Sold-to Party' },
      // });
      // await soldTo.setValue('1000');
      // await soldTo.fireChange();
      // await ui5.waitForUI5();

      expect(true).toBeTruthy(); // pattern placeholder – replace with real control work
    });
  });
});
