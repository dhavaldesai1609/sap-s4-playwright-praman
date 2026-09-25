import { defineConfig } from 'playwright-praman';

/**
 * Praman configuration for SAP S/4HANA testing.
 * All fields have defaults — customize as needed for your landscape.
 * See: https://praman.dev/docs/guides/configuration
 */
export default defineConfig({
  // Logging
  logLevel: 'info', // 'debug' | 'info' | 'warn' | 'error'

  // UI5 / control interaction
  ui5WaitTimeout: 30_000,
  controlDiscoveryTimeout: 10_000,
  interactionStrategy: 'ui5-native', // Preferred: use UI5 control APIs
  discoveryStrategies: ['direct-id', 'recordreplay'], // Fallback strategies
  preferVisibleControls: true,

  // Authentication (override via .env)
  auth: {
    strategy: 'basic', // 'basic' | 'btp-saml' | 'office365' | 'custom'
    baseUrl: process.env.SAP_CLOUD_BASE_URL || '',
    username: process.env.SAP_CLOUD_USERNAME || '',
    password: process.env.SAP_CLOUD_PASSWORD || '',
    client: process.env.SAP_CLIENT || '100',
    language: process.env.SAP_LANGUAGE || 'EN',
  },

  // Optional AI providers for plan-generate-heal agents
  ai: {
    // provider: 'anthropic' | 'openai' | 'azure-openai',
    // apiKey: process.env.PRAMAN_AI_API_KEY,
    // model: process.env.PRAMAN_AI_MODEL || 'gpt-4o',
    // endpoint: process.env.PRAMAN_AI_ENDPOINT,
    // deployment: process.env.PRAMAN_AI_DEPLOYMENT,
  },

  // Optional OpenTelemetry
  telemetry: {
    // enabled: process.env.PRAMAN_TELEMETRY_ENABLED === 'true',
    // endpoint: process.env.PRAMAN_TELEMETRY_ENDPOINT,
    // serviceName: process.env.PRAMAN_TELEMETRY_SERVICE_NAME || 'sap-s4-praman',
  },

  // Block common analytics / WalkMe noise
  ignoreAutoWaitUrls: [
    '**/walkme.com/**',
    '**/google-analytics.com/**',
    '**/googletagmanager.com/**',
  ],
});
