# SAP S/4HANA Playwright + Praman Test Framework

Production-ready end-to-end test automation for **SAP S/4HANA**, **Fiori**, and **UI5** — Playwright + [Praman](https://praman.dev/).

| Process | Full Name |
|---------|-----------|
| **OTC** | Order-to-Cash |
| **PTP** | Procure-to-Pay |
| **RTR** | Record-to-Report |
| **ATR** | Acquire-to-Retire |
| **HTR** | Hire-to-Retire |

## Key Features (v1.3)

| Feature | Description |
|---------|-------------|
| **Visual regression** | `toHaveScreenshot` + Fiori-stable helpers, `@visual` suite |
| **Historical trends** | Allure history script + TestOps-ready categories |
| **ReportPortal** | Optional agent (env-gated) for central flaky/history analytics |
| **Full report suite** | Compliance, OData Trace, JUnit, JSON, Allure, Playwright HTML |
| **Process structure** | OTC / PTP / RTR / ATR / HTR folders + tags |
| **CI/CD** | GitHub Actions, selective process runs |
| **Multi-environment** | `ENV=dev\|qas\|preprod` |
| **AI plan → generate → heal** | Praman agents |

## Quick start

```bash
git clone https://github.com/dhavaldesai1609/sap-s4-playwright-praman.git
cd sap-s4-playwright-praman
npm install
npx playwright install chromium
cp .env.example .env   # set SAP_CLOUD_* credentials
npx playwright-praman init
npm test
```

## Visual regression

```bash
npm run test:visual              # run @visual tests
npm run test:visual:update       # update baselines after intentional UI change
```

Helpers: `tests/helpers/visual.ts` (`expectStableScreenshot`, `expectElementScreenshot`).  
Baselines live under `__snapshots__/` (commit them). Use the same OS for baseline + CI.

## Reports & historical trends

```bash
npm run report                   # Playwright HTML
npm run report:allure            # Allure with trend history
```

- **Allure TestOps**: upload `allure-results/` via TestOps uploader / `allurectl`.
- **ReportPortal** (optional): set `RP_ENDPOINT` + `RP_API_KEY` in `.env` — agent activates automatically.

See [docs/REPORTING-AND-VISUAL.md](docs/REPORTING-AND-VISUAL.md) for the full matrix.

## Process tests

```bash
npm run test:otc | test:ptp | test:rtr | test:atr | test:htr
npm run test:smoke
npm run test:high
ENV=qas npm run test:ptp
```

## Documentation

- [docs/REPORTING-AND-VISUAL.md](docs/REPORTING-AND-VISUAL.md) – visual + Allure + ReportPortal
- [CONTRIBUTING.md](CONTRIBUTING.md) – adding scenarios
- [tests/e2e/README.md](tests/e2e/README.md) – process conventions
- [Praman Docs](https://praman.dev/docs)

## License

MIT
