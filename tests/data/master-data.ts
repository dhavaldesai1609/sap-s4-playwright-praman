/**
 * Shared master data templates for OTC / PTP / RTR / ATR / HTR tests.
 * Use with the testData fixture for generation + automatic cleanup.
 *
 * Override values via environment variables or CI secrets when needed.
 */

export const MASTER_DATA = {
  // Common organizational data
  companyCode: process.env.TEST_COMPANY_CODE || '1000',
  plant: process.env.TEST_PLANT || '1000',
  salesOrg: process.env.TEST_SALES_ORG || '1000',
  purchasingOrg: process.env.TEST_PURCH_ORG || '1000',
  costCenter: process.env.TEST_COST_CENTER || '1000',

  // Business partners
  customer: process.env.TEST_CUSTOMER || '1000',
  vendor: process.env.TEST_VENDOR || '100001',

  // Materials
  material: process.env.TEST_MATERIAL || 'MAT-001',
  materialService: process.env.TEST_MATERIAL_SERVICE || 'SERV-001',

  // Accounts (RTR)
  glAccountExpense: '400000',
  glAccountBank: '100000',
  glAccountRevenue: '800000',

  // Asset (ATR)
  assetClass: '1000',
} as const;

export type MasterData = typeof MASTER_DATA;
