import { expect, type Page, type Locator } from '@playwright/test';

/**
 * Visual regression helpers tuned for SAP Fiori / UI5 screens.
 *
 * Always wait for UI5 stability before capturing. Mask dynamic regions
 * (timestamps, user names, notifications) so baselines stay stable.
 */

export type VisualOptions = {
  /** Snapshot name (stored under __snapshots__) */
  name: string;
  /** Extra locators to black-out (e.g. clocks, badges) */
  mask?: Locator[];
  /** Capture full scrollable page */
  fullPage?: boolean;
  /** Override maxDiffPixelRatio for this assertion */
  maxDiffPixelRatio?: number;
};

/**
 * Capture a stable screenshot of the current page after UI5 has settled.
 * Prefer calling this after navigation + key content is visible.
 */
export async function expectStableScreenshot(
  page: Page,
  options: VisualOptions,
  /** Optional: inject ui5.waitForUI5 from the test fixture */
  waitForUI5?: () => Promise<void>,
) {
  if (waitForUI5) {
    await waitForUI5();
  } else {
    // Fallback: brief network + DOM settle for non-Praman contexts
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(300);
  }

  // Common dynamic FLP / Fiori chrome to mask when present
  const defaultMasks: Locator[] = [
    page.locator('[id*="shell-header"]').locator('.sapMText'), // user / shell text
    page.locator('.sapMMessageToast'),
    page.locator('[class*="notification"]'),
  ].filter(Boolean);

  const mask = [...defaultMasks, ...(options.mask ?? [])];

  await expect(page).toHaveScreenshot(options.name, {
    fullPage: options.fullPage ?? false,
    mask,
    maxDiffPixelRatio: options.maxDiffPixelRatio,
    animations: 'disabled',
    caret: 'hide',
  });
}

/**
 * Screenshot a specific control / region (more stable than full page).
 */
export async function expectElementScreenshot(
  locator: Locator,
  name: string,
  opts?: { maxDiffPixelRatio?: number },
) {
  await expect(locator).toHaveScreenshot(name, {
    animations: 'disabled',
    caret: 'hide',
    maxDiffPixelRatio: opts?.maxDiffPixelRatio ?? 0.02,
  });
}
