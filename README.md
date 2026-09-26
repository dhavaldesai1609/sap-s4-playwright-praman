# SAP S/4HANA Playwright + Praman Test Framework

Production-ready end-to-end test automation framework for **SAP S/4HANA**, **Fiori**, and **UI5** built on [Playwright](https://playwright.dev/) + [Praman](https://praman.dev/).

Organized around the core S/4HANA process areas:

| Process | Full Name | Typical Scope |
|---------|-----------|---------------|
| **OTC** | Order-to-Cash | Sales order → Delivery → Billing → Collections |
| **PTP** | Procure-to-Pay | PR → PO → Goods Receipt → Invoice → Payment |
| **RTR** | Record-to-Report | Journal entries, period-end close, reporting |
| **ATR** | Acquire-to-Retire | Fixed asset acquisition → depreciation → retirement |
| **HTR** | Hire-to-Retire | Employee hire → org assignment → offboarding |

## Key Features (v1.1)

| Feature | Description |
|---------|-------------|
| **Process structure** | Dedicated folders + tags for OTC / PTP / RTR / ATR / HTR |
| **CI/CD** | GitHub Actions workflow with selective process runs & artifact upload |
| **Compliance reporter** | Praman business-aware reports (process readiness, risk heatmaps) |
| **Tags** | `@OTC`, `@smoke`, `@high` … for selective execution |
| **Multi-environment** | `ENV=dev\|qas\|preprod` + per-env `.env.*` files |
| **Strong data layer** | Shared master data + process-specific builders |
| **Global teardown** | Automatic SM12 lock cleanup after every suite |
| **199 UI5 control proxies** | Typed, self-healing control APIs |
| **Intent APIs** | `intent.procurement`, `intent.sales`, `intent.finance` |
| **Fiori Elements helpers** | `fe.listReport`, `fe.objectPage` |
| **AI plan → generate → heal** | Agents produce production-ready tests from business language |
| **Pinned dependencies** | Stable versions of Playwright + Praman |

## Prerequisites

- Node.js ≥ 22
- Access to an S/4HANA (cloud or on-premise) / Fiori Launchpad
- SAP credentials (store as GitHub Secrets for CI)

## Quick start

```bash
git clone https://github.com/dhavaldesai1609/sap-s4-playwright-praman.git
cd sap-s4-playwright-praman
npm install
npx playwright install chromium
cp .env.example .env
# Edit .env with your SAP_CLOUD_* values
npx playwright-praman init   # installs AI agents (recommended)
npm test
```

## Project structure

```
├── .github/workflows/sap-e2e.yml   # CI pipeline
├── playwright.config.ts            # compliance reporter + multi-env
├── praman.config.ts
├── .env.example
├── CONTRIBUTING.md
├── tests/
│   ├── auth.setup.ts
│   ├── global.teardown.ts          # SM12 lock cleanup
│   ├── data/master-data.ts         # shared + process builders
│   ├── seeds/sap-seed.spec.ts
│   └── e2e/
│       ├── README.md
│       ├── otc/  ptp/  rtr/  atr/  htr/
│       └── _demos/                 # pattern examples (reference)
└── package.json
```

## Running tests

```bash
# Full suite
npm test

# Process areas
npm run test:otc
npm run test:ptp
npm run test:rtr
npm run test:atr
npm run test:htr

# Tags
npm run test:smoke          # @smoke
npm run test:high           # @high criticality

# Multi-environment
ENV=qas npm run test:ptp
ENV=preprod npm test

# Headed / debug
npm run test:headed
npm run test:debug
```

## CI/CD

The workflow `.github/workflows/sap-e2e.yml` supports:

- Push / PR triggers
- Manual dispatch with process (`otc|ptp|rtr|atr|htr|smoke|all`) and environment selection
- Upload of Playwright HTML report, Praman compliance reports, and failure traces

Configure these **GitHub Secrets**:

- `SAP_CLOUD_BASE_URL`
- `SAP_CLOUD_USERNAME`
- `SAP_CLOUD_PASSWORD`
- `SAP_AUTH_STRATEGY` (optional)
- `SAP_CLIENT` (optional)

> For real landscapes prefer a **self-hosted runner** that can reach the SAP system (VPN / Cloud Connector).

## Writing a new scenario

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

Minimal template:

```ts
import { test, expect } from 'playwright-praman';
import { buildSalesOrderData } from '../../data/master-data';

test.describe('OTC | Sales Order', () => {
  test('create sales order', {
    tag: ['@OTC', '@smoke', '@high'],
  }, async ({ ui5Navigation, intent, testData }) => {
    test.info().annotations.push(
      { type: 'process', description: 'OTC' },
      { type: 'subprocess', description: 'Sales Order Creation' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'VA01 / SalesOrder-manage' },
    );

    const data = testData.generate(buildSalesOrderData());
    await ui5Navigation.navigateToApp('SalesOrder-manage');
    // await intent.sales.createSalesOrder(data);
  });
});
```

**API preference order**
1. `intent.*` (business language)
2. `fe.*` (Fiori Elements)
3. Explicit `ui5.control` / `ui5.fill` / `ui5.table`

## AI-powered generation

```
/praman-sap-coverage
```

Describe any OTC / PTP / RTR process. The Planner → Generator → Healer pipeline produces typed, self-healing tests against your live system.

## Useful commands

| Command | Purpose |
|---------|---------|
| `npm test` | Full suite |
| `npm run test:otc` (etc.) | Single process |
| `npm run test:smoke` | Smoke tests |
| `npm run test:high` | High-criticality tests |
| `npm run report` | Open HTML report |
| `npx playwright-praman init` | Scaffold AI agents |

## Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) – how to add scenarios
- [tests/e2e/README.md](tests/e2e/README.md) – process conventions & tags
- [Praman Docs](https://praman.dev/docs) – fixtures, auth, configuration

## License

MIT

---

Built for SAP S/4HANA implementation programs that need reliable, maintainable, AI-augmented test automation with clear process ownership and compliance-ready evidence.
