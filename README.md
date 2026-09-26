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

## Key Features (v1.2)

| Feature | Description |
|---------|-------------|
| **Full reporting suite** | Compliance + OData Trace + JUnit + JSON + Allure |
| **Process structure** | Dedicated folders + tags for OTC / PTP / RTR / ATR / HTR |
| **CI/CD** | GitHub Actions with selective process runs & multi-artifact upload |
| **Tags** | `@OTC`, `@smoke`, `@high` … for selective execution |
| **Multi-environment** | `ENV=dev\|qas\|preprod` + per-env `.env.*` files |
| **Strong data layer** | Shared master data + process-specific builders |
| **Global teardown** | Automatic SM12 lock cleanup after every suite |
| **199 UI5 control proxies** | Typed, self-healing control APIs |
| **Intent APIs** | `intent.procurement`, `intent.sales`, `intent.finance` |
| **AI plan → generate → heal** | Agents produce production-ready tests from business language |

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

## Reporting Suite

Every test run produces **five complementary reports**:

| Report | Location | Purpose |
|--------|----------|---------|
| **Playwright HTML** | `playwright-report/` | Interactive step-by-step results, screenshots, traces |
| **Praman Compliance** | `reports/compliance-report.json` | % of steps using Praman abstractions vs raw Playwright |
| **OData Trace** | `reports/odata-trace.json` | Per-entity-set call counts, durations, error rates |
| **JUnit XML** | `reports/junit-results.xml` | CI integration (GitHub, Azure DevOps, Jenkins) |
| **JSON** | `reports/results.json` | Machine-readable full results for custom dashboards |
| **Allure** | `allure-results/` → `allure-report/` | Beautiful interactive reports with history & trends |

### Viewing the reports

```bash
# Standard Playwright HTML report
npm run report

# Allure interactive report (generate + open)
npm run report:allure

# Just generate Allure (no open)
npm run report:allure:generate

# Praman compliance + OData trace
# → open the JSON files in reports/
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
npm run test:smoke
npm run test:high

# Multi-environment
ENV=qas npm run test:ptp
```

## CI/CD

The workflow uploads:
- Playwright HTML report
- Praman reports folder (compliance + OData trace + JUnit + JSON)
- Allure results
- Failure traces

Configure these **GitHub Secrets**: `SAP_CLOUD_BASE_URL`, `SAP_CLOUD_USERNAME`, `SAP_CLOUD_PASSWORD`, etc.

## Writing a new scenario

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Useful commands

| Command | Purpose |
|---------|---------|
| `npm test` | Full suite |
| `npm run test:otc` (etc.) | Single process |
| `npm run test:smoke` | Smoke tests |
| `npm run report` | Playwright HTML report |
| `npm run report:allure` | Generate & open Allure report |
| `npx playwright-praman init` | Scaffold AI agents |

## Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [tests/e2e/README.md](tests/e2e/README.md)
- [Praman Docs](https://praman.dev/docs)

## License

MIT
