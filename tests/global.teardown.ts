import { test as teardown } from 'playwright-praman';

/**
 * Global teardown – runs once after the entire suite.
 * Cleans up SM12 locks for the test user and performs any final housekeeping.
 */
teardown('cleanup locks and session', async ({ flpLocks, page }) => {
  const username = process.env.SAP_CLOUD_USERNAME;

  if (username) {
    try {
      const lockCount = await flpLocks.getNumberOfLockEntries(username);
      if (lockCount > 0) {
        console.log(`[teardown] Cleaning ${lockCount} lock(s) for user ${username}`);
        await flpLocks.deleteAllLockEntries(username);
      } else {
        console.log('[teardown] No locks to clean');
      }
    } catch (err) {
      console.warn('[teardown] Lock cleanup failed (non-fatal):', err);
    }
  }

  // Optional: close any lingering pages / contexts
  await page.context().close().catch(() => {});
});
