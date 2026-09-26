# Reporting, Visual Regression & Historical Trends

## Visual regression

Playwright `toHaveScreenshot` is configured with Fiori/UI5-friendly defaults:

- Animations disabled, caret hidden
- `maxDiffPixelRatio: 0.02` (2% pixel tolerance)
- Snapshots under `__snapshots__/` (platform + project in the path)

### Helpers

```ts
import { expectStableScreenshot, expectElementScreenshot } from '../../helpers/visual';

await expectStableScreenshot(page, { name: 'flp-home.png' }, () => ui5.waitForUI5());
await expectElementScreenshot(headerLocator, 'po-header.png');
```

### Commands

```bash
npm run test:visual              # run @visual tests
npm run test:visual:update       # refresh baselines after intentional UI changes
```

Commit baseline PNGs under `__snapshots__/` so CI can detect regressions. Prefer the **same OS** for baseline generation and CI (e.g. Linux self-hosted runner).

---

## Allure (local trends + TestOps)

### Local historical trends

```bash
npm test
npm run report:allure            # copies previous history, generates, opens
```

The `prepare-allure-history.mjs` script copies `allure-report/history` → `allure-results/history` before generation so pass-rate and duration trends appear after the second run.

### Allure TestOps

1. Generate results: `npm test` (writes `allure-results/`).
2. Upload to TestOps using one of:
   - [Allure TestOps uploader](https://docs.qameta.io/allure-testops/) / CI plugin
   - `allurectl upload allure-results` (if you use allurectl)
3. Categories defined in `playwright.config.ts` (UI5, OData, Visual, Timeouts) map to TestOps failure categories.

Environment variables are already embedded in Allure `environmentInfo` (ENV, Node, OS, CI).

---

## ReportPortal (optional)

ReportPortal is **opt-in**. When both variables are set, the agent is added automatically:

```bash
# .env or CI secrets
RP_ENDPOINT=https://your.reportportal.server/api/v2
RP_API_KEY=your-api-key
RP_PROJECT=sap-s4-praman          # optional
RP_LAUNCH=SAP S/4 E2E – qas       # optional
```

Then:

```bash
npm test   # results stream to ReportPortal
```

Without these variables, the agent is not registered (no impact on local runs).

---

## Full report matrix

| Report | Path | Purpose |
|--------|------|---------|
| Playwright HTML | `playwright-report/` | Steps, screenshots, traces |
| Compliance | `reports/compliance-report.json` | Praman adoption % |
| OData Trace | `reports/odata-trace.json` | Backend performance |
| JUnit | `reports/junit-results.xml` | CI systems |
| JSON | `reports/results.json` | Custom tooling |
| Allure | `allure-results/` → `allure-report/` | Trends, categories, TestOps |
| ReportPortal | Cloud/server | Central history, flaky detection (optional) |
| Visual baselines | `__snapshots__/` | UI regression detection |
