/**
 * Copies previous allure-report/history into allure-results/history
 * so the next `allure generate` produces trend charts (pass rate over time).
 *
 * Used by: npm run report:allure / report:allure:generate
 * For Allure TestOps: upload the allure-results folder (or use the TestOps uploader).
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const historySrc = join(root, 'allure-report', 'history');
const historyDest = join(root, 'allure-results', 'history');

if (existsSync(historySrc)) {
  mkdirSync(join(root, 'allure-results'), { recursive: true });
  cpSync(historySrc, historyDest, { recursive: true });
  console.log('[allure] Copied previous history → allure-results/history (trends enabled)');
} else {
  console.log('[allure] No previous allure-report/history found – first run (no trends yet)');
}
