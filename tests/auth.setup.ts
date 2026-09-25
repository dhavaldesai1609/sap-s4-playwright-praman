import { test as setup, expect } from 'playwright-praman';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, '../.auth/user.json');

/**
 * Global authentication setup for SAP S/4HANA / Fiori Launchpad.
 * Runs once before the test suite and persists the browser storage state.
 *
 * Supports strategies configured in praman.config.ts / .env:
 * - basic
 * - btp-saml
 * - office365
 */
setup('authenticate', async ({ page, sapAuth }) => {
  // sapAuth fixture handles login according to configured strategy
  await sapAuth.login();

  // Optional: wait for FLP shell / home page indicators
  // await expect(page.locator('[id*="shell-header"]')).toBeVisible({ timeout: 30_000 });

  // Persist authenticated state for downstream projects
  await page.context().storageState({ path: authFile });
});
