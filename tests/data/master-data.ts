/**
 * Shared master data templates for OTC / PTP / RTR / ATR / HTR tests.
 * Values can be overridden via environment variables (see .env.example).
 * Use together with the testData fixture for generation + automatic cleanup.
 */

export const MASTER_DATA = {
  // Organizational data
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

  // GL Accounts (RTR)
  glAccountExpense: process.env.TEST_GL_EXPENSE || '400000',
  glAccountBank: process.env.TEST_GL_BANK || '100000',
  glAccountRevenue: process.env.TEST_GL_REVENUE || '800000',

  // Asset (ATR)
  assetClass: process.env.TEST_ASSET_CLASS || '1000',
} as const;

export type MasterData = typeof MASTER_DATA;

/** Helper to build process-specific payloads */
export function buildSalesOrderData(overrides: Record<string, unknown> = {}) {
  return {
    soldToParty: MASTER_DATA.customer,
    material: MASTER_DATA.material,
    quantity: 5,
    plant: MASTER_DATA.plant,
    salesOrg: MASTER_DATA.salesOrg,
    ...overrides,
  };
}

export function buildPurchaseOrderData(overrides: Record<string, unknown> = {}) {
  return {
    vendor: MASTER_DATA.vendor,
    material: MASTER_DATA.material,
    quantity: 10,
    plant: MASTER_DATA.plant,
    purchasingOrg: MASTER_DATA.purchasingOrg,
    ...overrides,
  };
}

export function buildJournalEntryData(overrides: Record<string, unknown> = {}) {
  return {
    companyCode: MASTER_DATA.companyCode,
    currency: 'USD',
    amount: 1000,
    debitAccount: MASTER_DATA.glAccountExpense,
    creditAccount: MASTER_DATA.glAccountBank,
    ...overrides,
  };
}
