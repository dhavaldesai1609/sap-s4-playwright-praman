# SAP S/4HANA Playwright + Praman Test Framework

Production-ready end-to-end test automation framework for **SAP S/4HANA**, **Fiori**, and **UI5** applications built on [Playwright](https://playwright.dev/) + the open-source [Praman](https://praman.dev/) plugin.

Organized around the core **S/4HANA end-to-end process areas**:

| Process | Full Name | Typical Scope |
|---------|-----------|---------------|
| **OTC** | Order-to-Cash | Sales order → Delivery → Billing → Collections |
| **PTP** | Procure-to-Pay | PR → PO → Goods Receipt → Invoice → Payment |
| **RTR** | Record-to-Report | Journal entries, period-end close, financial reporting |
| **ATR** | Acquire-to-Retire | Fixed asset acquisition, depreciation, retirement |
| **HTR** | Hire-to-Retire | Employee hire, org assignment, offboarding |

## What’s included (latest Praman capabilities)

| Capability | Description |
|---|---|
| **199 typed UI5 control proxies** | `sap.m`, `sap.ui.table`, `sap.ui.comp`, `sap.uxap`, `sap.f` … – control APIs, not brittle DOM |
| **UI5 stability synchronization** | Automatic waits for UI5 core settle |
| **FLP / transaction navigation** | `ui5Navigation.navigateToApp()`, `toTransaction()` |
| **OData V2 & V4** | Read, create, batch, mock, intercept |
| **Fiori Elements helpers (`fe`)** | List Report, Object Page, filter bar |
| **Business Intent APIs (`intent`)** | `intent.procurement`, `intent.sales`, `intent.finance` … |
| **Test data generation (`testData`)** | Template-based data + automatic cleanup |
| **Lock management (`flpLocks`)** | SM12 lock handling |
| **6 auth strategies** | basic, btp-saml, office365, custom |
| **AI plan → generate → heal** | Agents explore live system and produce production-ready tests |
| **Process annotations** | Feed Praman compliance / business-aware reporting |
| **OpenTelemetry** | Optional distributed tracing & metrics |

## Prerequisites

- **Node.js ≥ 22**
- Access to an SAP S/4HANA (cloud or on-premise) / Fiori Launchpad
- SAP credentials

## Quick start

```bash
git clone https://github.com/dhavaldesai1609/sap-s4-playwright-praman.git
cd sap-s4-playwright-praman
npm install
npx playwright install chromium
cp .env.example .env
# → set SAP_CLOUD_BASE_URL, SAP_CLOUD_USERNAME, SAP_CLOUD_PASSWORD, SAP_AUTH_STRATEGY
npx playwright-praman init   # recommended – installs AI agents
npm test
```

## Project structure

```
├── playwright.config.ts
├── praman.config.ts
├── .env.example
├── tests/
│   ├── auth.setup.ts
│   ├── data/
│   │   └── master-data.ts          # shared org / BP / material templates
│   ├── seeds/
│   │   └── sap-seed.spec.ts
│   └── e2e/
│       ├── README.md               # process-area guide
│       ├── otc/                    # Order-to-Cash
│       │   └── 01-sales-order.spec.ts
│       ├── ptp/                    # Procure-to-Pay
│       │   └── 02-purchase-order.spec.ts
│       ├── rtr/                    # Record-to-Report
│       │   └── 01-journal-entry.spec.ts
│       ├── atr/                    # Acquire-to-Retire
│       │   └── 01-asset-acquisition.spec.ts
│       ├── htr/                    # Hire-to-Retire
│       │   └── 01-employee-hire.spec.ts
│       ├── flp-navigation.spec.ts  # common FLP patterns
│       ├── fiori-elements-list-report.spec.ts
│       ├── ui5-controls-demo.spec.ts
│       └── business-intent.spec.ts
└── package.json
```

## Running process suites

```bash
# Single process area
npx playwright test tests/e2e/otc
npx playwright test tests/e2e/ptp --headed

# All process tests
npm test

# Specific file
npx playwright test tests/e2e/ptp/02-purchase-order.spec.ts
```

## Writing a new process test

```ts
import { test, expect } from 'playwright-praman';
import { MASTER_DATA } from '../../data/master-data';

test.describe('OTC | Sales Order', () => {
  test('create sales order', async ({ ui5Navigation, intent, testData, fe }) => {
    // Always annotate for compliance reporting
    test.info().annotations.push(
      { type: 'process', description: 'OTC' },
      { type: 'subprocess', description: 'Sales Order Creation' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'VA01 / SalesOrder-manage' },
    );

    const data = testData.generate({ ...MASTER_DATA, quantity: 5 });

    await ui5Navigation.navigateToApp('SalesOrder-manage');
    // Prefer: await intent.sales.createSalesOrder(data);
    // Fallback: fe.listReport + ui5.control proxies
  });
});
```

**Recommended order of APIs**
1. `intent.*` (business language)
2. `fe.*` (Fiori Elements)
3. Explicit `ui5.control` / `ui5.fill` / `ui5.table` (full control)

## AI-powered test generation

```
/praman-sap-coverage
# or describe any OTC / PTP / RTR process in natural language
```

Planner → Generator → Healer pipeline produces typed, self-healing tests against your live system.

## Useful commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run full suite |
| `npm run test:headed` | Headed browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:debug` | Step-through debug |
| `npx playwright-praman init` | Scaffold AI agents + gold-standard extras |

## Configuration reference

- [Praman Configuration](https://praman.dev/docs/guides/configuration)
- [Authentication Guide](https://praman.dev/docs/guides/authentication)
- [Fixture Reference](https://praman.dev/docs/guides/fixtures)
- [Getting Started](https://praman.dev/docs/guides/getting-started)

## License

MIT

---

Built for SAP S/4HANA implementation programs that need reliable, maintainable, AI-augmented test automation across OTC, PTP, RTR, ATR and HTR.
