# SAP S/4HANA Playwright + Praman Test Framework

**Version 1.3** · Production-oriented end-to-end automation for **SAP S/4HANA**, **SAP Fiori**, and **UI5**

Built on [Playwright](https://playwright.dev/) and [Praman](https://praman.dev/) — an open-source, AI-first Playwright plugin with typed UI5 control proxies, Fiori Elements helpers, OData tooling, and compliance-oriented reporting.

---

## Introduction

SAP S/4HANA implementation and regression programmes need more than “tests that click buttons.” Stakeholders ask process-level questions:

- Is **Order-to-Cash** ready for go-live?
- Can procurement clerks complete **Procure-to-Pay** on Day 1?
- What is the **revenue or compliance risk** if critical scenarios still fail?

This repository is a **ready-to-extend framework** that organises automation around the core S/4 process areas, uses Praman’s SAP-aware APIs instead of brittle DOM selectors, and produces evidence that developers, process owners, and steering committees can use.

### Who it is for

| Role | How they use this repo |
|------|------------------------|
| **Test automation engineers** | Write maintainable UI5/Fiori tests with `ui5`, `fe`, `intent`, `odata` |
| **Process / functional leads** | Own scenarios under `tests/e2e/otc`, `ptp`, `rtr`, … with clear tags |
| **QA / programme managers** | Run selective suites, read Allure / compliance / JUnit outputs |
| **CI/CD engineers** | Wire GitHub Actions (or self-hosted runners) to QAS / pre-prod |
| **AI-assisted teams** | Use Praman plan → generate → heal agents against the live system |

### Design principles

1. **Process-first layout** — OTC, PTP, RTR, ATR, HTR as first-class folders and tags  
2. **SAP-native APIs** — Prefer Praman fixtures over raw `page.click` / dynamic `__button` IDs  
3. **Auth once, reuse everywhere** — Setup project + `storageState`; no login inside tests  
4. **Evidence by default** — HTML, JUnit, JSON, Praman compliance, OData trace, Allure  
5. **Landscape-friendly** — Multi-env via `ENV` + `.env.*`; master data overridable per system  
6. **Show, don’t hide** — `tests/sample-tests/` documents every major capability with comments  

---

## Process coverage

| Code | Process | Typical scope |
|------|---------|----------------|
| **OTC** | Order-to-Cash | Sales order → delivery → billing → collections |
| **PTP** | Procure-to-Pay | PR → PO → goods receipt → invoice → payment |
| **RTR** | Record-to-Report | Journal entries, period-end, reporting |
| **ATR** | Acquire-to-Retire | Asset acquisition → depreciation → retirement |
| **HTR** | Hire-to-Retire | Hire → org assignment → offboarding |

Scenarios live under `tests/e2e/<process>/` and should carry matching tags (`@OTC`, `@PTP`, …) plus `test.info().annotations` for process, criticality, and T-code.

---

## Key capabilities

| Area | What you get |
|------|----------------|
| **UI5 automation** | ~199 typed control proxies; `setValue` + `fireChange` + `waitForUI5` |
| **Fiori Elements** | `fe.listReport`, `fe.objectPage` (filter, search, edit, save) |
| **Intent APIs** | Business-level helpers (e.g. sales / procurement / finance domains) |
| **Navigation** | `ui5Navigation` — FLP home and semantic-object apps |
| **OData** | Read/query helpers; results feed the OData Trace reporter |
| **Test data** | `tests/data/master-data.ts` builders + `testData` fixture |
| **Visual regression** | Playwright screenshots + Fiori-stable helpers (`tests/helpers/visual.ts`) |
| **Reporting** | Compliance, OData trace, JUnit, JSON, Allure (+ optional ReportPortal) |
| **CI** | GitHub Actions workflow with process/env dispatch and artifact upload |
| **Teardown** | Global teardown for lock cleanup patterns (SM12-oriented) |
| **AI** | `npx playwright-praman init` — plan / generate / heal agents |

---

## Repository structure

```
├── .github/workflows/sap-e2e.yml   # CI: selective process runs + artifacts
├── docs/
│   └── REPORTING-AND-VISUAL.md     # Reports, Allure history, ReportPortal, visuals
├── scripts/
│   └── prepare-allure-history.mjs  # Enables Allure trend charts across runs
├── playwright.config.ts            # Projects, reporters, visual defaults
├── praman.config.ts                # Auth, UI5 waits, optional AI / telemetry
├── .env.example                    # SAP + optional ReportPortal / AI vars
├── CONTRIBUTING.md
└── tests/
    ├── auth.setup.ts               # Authenticate once → .auth/user.json
    ├── global.teardown.ts          # Post-suite cleanup
    ├── data/master-data.ts         # Shared org / BP / material templates
    ├── helpers/visual.ts           # Stable screenshot helpers
    ├── sample-tests/               # ★ Feature showcase (start here to learn)
    ├── e2e/
    │   ├── otc/  ptp/  rtr/  atr/  htr/
    │   ├── _demos/                 # Extra pattern demos
    │   └── README.md
    └── seeds/
```

---

## Prerequisites

- **Node.js ≥ 22**
- Network access to your S/4HANA or Fiori Launchpad (browser + optional OData)
- SAP user credentials with rights for the processes under test
- (CI) Prefer a **self-hosted runner** if the system is not reachable from public GitHub-hosted runners

---

## Quick start

```bash
git clone https://github.com/dhavaldesai1609/sap-s4-playwright-praman.git
cd sap-s4-playwright-praman

npm install
npx playwright install chromium

cp .env.example .env
# Edit .env — at minimum:
#   SAP_CLOUD_BASE_URL
#   SAP_CLOUD_USERNAME
#   SAP_CLOUD_PASSWORD
#   SAP_AUTH_STRATEGY (e.g. basic)
#   SAP_CLIENT / SAP_LANGUAGE as needed

npx playwright-praman init    # optional: AI agents & local Praman tooling
npm test
```

Authentication runs in the **setup** project and stores a session in `.auth/user.json`. Test projects reuse that session (do not call login inside individual tests).

---

## Configuration overview

### Environment variables

| Variable | Purpose |
|----------|---------|
| `ENV` | Selects `.env.dev` / `.env.qas` / `.env.preprod` (default `dev`) |
| `SAP_CLOUD_BASE_URL` | Fiori / S/4 entry URL |
| `SAP_CLOUD_USERNAME` / `PASSWORD` | Logon |
| `SAP_AUTH_STRATEGY` | e.g. `basic`, `btp-saml`, `office365` |
| `SAP_CLIENT` / `SAP_LANGUAGE` | Logon parameters |
| `TEST_*` | Master data overrides (company code, vendor, material, …) |
| `RP_ENDPOINT` / `RP_API_KEY` | Optional ReportPortal (agent enables only when both set) |

See `.env.example` for the full list (including optional AI and telemetry).

### Important config files

- **`playwright.config.ts`** — timeouts, projects (setup / teardown / chromium), all reporters, screenshot defaults  
- **`praman.config.ts`** — UI5 wait timeouts, discovery strategy, auth block, optional AI/telemetry  

---

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
npm run test:high           # @high
npm run test:visual         # @visual
npm run test:visual:update  # refresh screenshot baselines

# Feature showcase samples
npm run test:samples

# Multi-environment
ENV=qas npm run test:ptp
ENV=preprod npm test

# Debug
npm run test:headed
npm run test:debug
npm run test:ui
```

---

## Sample tests (learn the framework)

The folder **`tests/sample-tests/`** is the guided tour of every major feature:

| # | File | Topic |
|---|------|--------|
| 01 | Navigation & auth | Session reuse, FLP, `navigateToApp` |
| 02 | UI5 controls | Typed proxies, fill/press patterns |
| 03 | Fiori Elements | List Report / Object Page |
| 04 | Intent APIs | Business-level sales / procurement patterns |
| 05 | Test data | Master data + `testData.generate` |
| 06 | Tags & annotations | `@OTC`, criticality, T-code metadata |
| 07 | OData | Backend read / verify patterns |
| 08 | Visual regression | Stable screenshots |
| 09 | E2E process flow | Combines the above in one OTC-style scenario |

```bash
npm run test:samples
npx playwright test tests/sample-tests/02-ui5-controls.spec.ts
```

Each file starts with a short description and includes inline comments. Prefer adapting these patterns when adding real process tests under `tests/e2e/`.

---

## Writing a process scenario

**API preference order**

1. `intent.*` — business language when available  
2. `fe.*` — Fiori Elements List Report / Object Page  
3. `ui5.control` / `ui5.fill` — explicit control work  

**Minimal template**

```ts
import { test, expect } from 'playwright-praman';
import { buildSalesOrderData } from '../../data/master-data';

test.describe('OTC | Sales Order', () => {
  test('create sales order', {
    tag: ['@OTC', '@smoke', '@high'],
  }, async ({ ui5Navigation, intent, testData, ui5 }) => {
    test.info().annotations.push(
      { type: 'process', description: 'OTC' },
      { type: 'subprocess', description: 'Sales Order Creation' },
      { type: 'criticality', description: 'High' },
      { type: 'tcode', description: 'VA01 / SalesOrder-manage' },
    );

    const data = testData.generate(buildSalesOrderData());
    await ui5Navigation.navigateToApp('SalesOrder-manage');
    await ui5.waitForUI5();
    // await intent.sales.createSalesOrder(data);
  });
});
```

More detail: [CONTRIBUTING.md](CONTRIBUTING.md) and [tests/e2e/README.md](tests/e2e/README.md).

---

## Reporting suite

Every run can produce:

| Report | Location | Purpose |
|--------|----------|---------|
| Playwright HTML | `playwright-report/` | Steps, screenshots, traces |
| Praman Compliance | `reports/compliance-report.json` | Praman API adoption vs raw Playwright |
| OData Trace | `reports/odata-trace.json` | Entity-set counts, durations, errors |
| JUnit XML | `reports/junit-results.xml` | CI systems (GitHub, Azure DevOps, Jenkins) |
| JSON | `reports/results.json` | Custom dashboards / tooling |
| Allure | `allure-results/` → `allure-report/` | Trends, categories, TestOps upload |
| ReportPortal | (server) | Optional central history / flaky analytics |
| Visual baselines | `__snapshots__/` | UI regression detection |

```bash
npm run report                 # Playwright HTML
npm run report:allure          # Allure with history copy + open
npm run report:allure:generate # Generate only
```

Allure failure **categories** (UI5, OData, Visual, Timeouts) are defined in `playwright.config.ts` for local Allure and Allure TestOps.  
Full guide: [docs/REPORTING-AND-VISUAL.md](docs/REPORTING-AND-VISUAL.md).

---

## Visual regression

Configured for Fiori stability: animations disabled, caret hidden, ~2% pixel tolerance, snapshots under `__snapshots__/`.

```bash
npm run test:visual
npm run test:visual:update    # after intentional UI changes
```

Helpers: `expectStableScreenshot`, `expectElementScreenshot` in `tests/helpers/visual.ts` (mask dynamic shell text / toasts). **Commit baselines** and generate them on the same OS you use in CI when possible.

---

## CI/CD

Workflow: [`.github/workflows/sap-e2e.yml`](.github/workflows/sap-e2e.yml)

- Triggers: push/PR to `main`/`develop`, and manual `workflow_dispatch`
- Inputs: process (`otc` | `ptp` | `rtr` | `atr` | `htr` | `smoke` | `all`) and environment
- Uploads: Playwright HTML, `reports/`, Allure results, failure traces

**Required GitHub Secrets (typical):**

- `SAP_CLOUD_BASE_URL`
- `SAP_CLOUD_USERNAME`
- `SAP_CLOUD_PASSWORD`
- Optional: `SAP_AUTH_STRATEGY`, `SAP_CLIENT`, ReportPortal secrets

For most corporate landscapes, attach a **self-hosted runner** that can reach the SAP system (VPN / Cloud Connector).

---

## AI-assisted authoring

```bash
npx playwright-praman init
```

Praman’s planner / generator / healer agents can propose and refine tests against your live system. Generated tests should still follow this repo’s conventions: process folder, tags, annotations, and no raw Playwright selectors for UI5 controls.

Configure optional AI keys in `.env` (see `.env.example`).

---

## Useful commands (cheat sheet)

| Command | Purpose |
|---------|---------|
| `npm test` | Full suite |
| `npm run test:samples` | Feature showcase |
| `npm run test:otc` (etc.) | Single process |
| `npm run test:smoke` / `test:high` | Tag filters |
| `npm run test:visual` / `test:visual:update` | Screenshots |
| `npm run report` / `report:allure` | Open reports |
| `npm run auth:setup` | Refresh stored session only |
| `npx playwright-praman init` | AI / Praman tooling |

---

## Documentation map

| Doc | Contents |
|-----|----------|
| [tests/sample-tests/README.md](tests/sample-tests/README.md) | Showcase index |
| [docs/REPORTING-AND-VISUAL.md](docs/REPORTING-AND-VISUAL.md) | Allure, TestOps, ReportPortal, visuals |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to add scenarios |
| [tests/e2e/README.md](tests/e2e/README.md) | Process folder conventions |
| [Praman documentation](https://praman.dev/docs) | Fixtures, auth, configuration reference |

---

## License

MIT

---

Built for S/4HANA implementation and sustainment programmes that need **maintainable UI automation**, **clear process ownership**, and **audit-friendly evidence** — not only pass/fail counts.
