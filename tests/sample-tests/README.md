# Sample Tests – Feature Showcase

This folder demonstrates **every major capability** of the SAP S/4 Playwright + Praman framework.

Each file focuses on one main feature, with a description at the top and rich inline comments.

| File | Showcases |
|------|-----------|
| `01-navigation-and-auth.spec.ts` | Session reuse, FLP navigation, `ui5Navigation` |
| `02-ui5-controls.spec.ts` | Typed UI5 control proxies, fill, press, waitForUI5 |
| `03-fiori-elements.spec.ts` | `fe.listReport` / `fe.objectPage` helpers |
| `04-intent-and-business-apis.spec.ts` | Domain intent APIs (`intent.sales`, `intent.procurement`, …) |
| `05-test-data-and-master-data.spec.ts` | Master data builders + `testData` fixture |
| `06-process-tags-and-annotations.spec.ts` | Process tags (`@OTC`, `@smoke`) + compliance annotations |
| `07-odata.spec.ts` | OData read/query patterns (feeds OData Trace reporter) |
| `08-visual-regression.spec.ts` | Screenshot baselines + visual helpers |
| `09-end-to-end-process-flow.spec.ts` | Multi-step OTC-style flow combining several features |

## How to run

```bash
# Entire showcase folder
npx playwright test tests/sample-tests

# Single feature
npx playwright test tests/sample-tests/02-ui5-controls.spec.ts

# Visual samples only
npx playwright test tests/sample-tests --grep @visual
```

> **Note:** Many steps are deliberately conservative (assertions on enablement / visibility) so the samples run even when app IDs or field names differ. Uncomment and adapt the interactive steps for your landscape.
