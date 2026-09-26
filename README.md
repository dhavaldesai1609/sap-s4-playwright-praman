# SAP S/4HANA Playwright + Praman Test Framework

Production-ready end-to-end test automation framework for **SAP S/4HANA**, **Fiori**, and **UI5** applications built on [Playwright](https://playwright.dev/) + the open-source [Praman](https://praman.dev/) plugin.

## What’s included (latest Praman capabilities)

| Capability | Description |
|---|---|
| **199 typed UI5 control proxies** | `sap.m`, `sap.ui.table`, `sap.ui.comp`, `sap.uxap`, `sap.f`, … – interact via control APIs, not brittle DOM |
| **UI5 stability synchronization** | Automatic waits for UI5 core settle – drastically reduces flakiness |
| **FLP / transaction navigation** | `ui5Navigation.navigateToApp()`, `toTransaction('ME21N')` |
| **OData V2 & V4** | Read, create, batch, mock, intercept |
| **Fiori Elements helpers** | List Report, Object Page, Analytical List Page patterns |
| **6 auth strategies** | `basic`, `btp-saml`, `office365`, custom, etc. |
| **AI plan → generate → heal** | Agents explore your live system, write typed tests, self-heal |
| **Compliance / business reporting** | Role-based readiness, process heatmaps (via Praman reporters) |
| **OpenTelemetry** | Optional distributed tracing & metrics |
| **Playwright native** | Parallel workers, trace viewer, UI mode, screenshots, video |

## Prerequisites

- **Node.js ≥ 22** (Active LTS)
- Access to an SAP S/4HANA (cloud or on-premise) / Fiori Launchpad system
- SAP credentials

## Quick start

```bash
# 1. Clone
git clone https://github.com/dhavaldesai1609/sap-s4-playwright-praman.git
cd sap-s4-playwright-praman

# 2. Install
npm install

# 3. Install browsers
npx playwright install chromium

# 4. Configure credentials
cp .env.example .env
# Edit .env → set SAP_CLOUD_BASE_URL, SAP_CLOUD_USERNAME, SAP_CLOUD_PASSWORD, SAP_AUTH_STRATEGY

# 5. (Recommended) Run official Praman init for full agent scaffolding
npx playwright-praman init

# 6. Run the example suite
npm test
```

## Project structure

```
├── playwright.config.ts      # Playwright projects (setup + chromium)
├── praman.config.ts          # Praman timeouts, auth, AI, telemetry
├── .env.example              # All supported environment variables
├── tests/
│   ├── auth.setup.ts         # One-time SAP login → .auth/user.json
│   ├── e2e/
│   │   ├── example-purchase-order.spec.ts
│   │   ├── flp-navigation.spec.ts
│   │   ├── fiori-elements-list-report.spec.ts
│   │   ├── ui5-controls-demo.spec.ts
│   │   └── business-intent.spec.ts
│   └── seeds/
│       └── sap-seed.spec.ts  # Entry point for AI agents
├── specs/                    # AI-generated test plans (*.plan.md)
└── package.json
```

## Examples included

| File | What it demonstrates |
|------|----------------------|
| `example-purchase-order.spec.ts` | `ui5` + `ui5Navigation` + `odata` – navigate, discover button, OData read |
| `flp-navigation.spec.ts` | Launchpad tiles, semantic object navigation, home, back (`ui5Navigation`, `ui5Shell`) |
| `fiori-elements-list-report.spec.ts` | Fiori Elements List Report filter/search + Object Page edit/save (`fe` fixture) |
| `ui5-controls-demo.spec.ts` | Button / Input / Table / Dialog / DatePicker patterns (gold control API usage) |
| `business-intent.spec.ts` | High-level `intent.procurement` / `intent.finance` business language APIs |

All examples are intentionally conservative (many steps commented) so they compile and illustrate the API without requiring a specific master-data set. Uncomment and adapt IDs / values to your landscape.

## Writing tests

```ts
import { test, expect } from 'playwright-praman';

test('create purchase order', async ({ ui5, ui5Navigation, odata }) => {
  await ui5Navigation.navigateToApp('PurchaseOrder-manage');

  const createBtn = await ui5.control({
    controlType: 'sap.m.Button',
    properties: { text: 'Create' },
  });
  await createBtn.press();

  // … fill SmartFields, Value Helps, etc. via typed proxies

  const result = await odata.read('/PurchaseOrderService/PurchaseOrders');
  expect(result.value.length).toBeGreaterThan(0);
});
```

## AI-powered test generation

After `npx playwright-praman init` (or when using Claude Code / Cursor / Copilot with the installed agents):

```
/praman-sap-coverage
# or paste a business process description
```

The **Planner** explores the live system, the **Generator** writes typed Praman code, and the **Healer** runs & fixes until green.

## Useful commands

| Command | Purpose |
|---|---|
| `npm test` | Run all tests |
| `npm run test:headed` | Headed browser |
| `npm run test:ui` | Playwright UI mode |
| `npm run test:debug` | Step-through debug |
| `npm run report` | Open HTML report |
| `npx playwright-praman init` | Full scaffold + AI agents |

## Configuration reference

- [Praman Configuration](https://praman.dev/docs/guides/configuration)
- [Authentication Guide](https://praman.dev/docs/guides/authentication)
- [Fixture Reference](https://praman.dev/docs/guides/fixtures)
- [Getting Started](https://praman.dev/docs/guides/getting-started)

## License

MIT

---

Built for SAP S/4HANA implementation programs that need reliable, maintainable, AI-augmented test automation.
