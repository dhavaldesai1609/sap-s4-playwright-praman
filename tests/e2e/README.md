# End-to-End Process Tests

This folder is organized by **SAP S/4HANA end-to-end process areas**:

| Folder | Process | Description |
|--------|---------|-------------|
| **otc/** | Order-to-Cash | Sales order → delivery → billing → collections |
| **ptp/** | Procure-to-Pay | Purchase requisition → PO → goods receipt → invoice → payment |
| **rtr/** | Record-to-Report | Journal entries, period-end close, financial reporting |
| **atr/** | Acquire-to-Retire | Fixed asset acquisition, depreciation, retirement |
| **htr/** | Hire-to-Retire | Employee hire, organizational assignment, offboarding |

## Naming convention

```
<process>/<NN>-<subprocess>.spec.ts
```

Examples:
- `otc/01-sales-order.spec.ts`
- `ptp/02-purchase-order.spec.ts`
- `rtr/01-journal-entry.spec.ts`

## Latest Praman features used across suites

- **`intent`** – business-language APIs (`intent.procurement`, `intent.sales`, `intent.finance`)
- **`fe`** – Fiori Elements List Report / Object Page helpers
- **`ui5` + typed control proxies** – 199 UI5 controls
- **`testData`** – template-based data generation with auto-cleanup
- **`odata`** – V2/V4 read/create/verify
- **`flpLocks`** – SM12 lock management
- **`ui5Shell` / `ui5Footer`** – Launchpad shell & page footer actions
- **Process annotations** – `test.info().annotations` for compliance / business reporting

## Running a single process area

```bash
npx playwright test tests/e2e/otc
npx playwright test tests/e2e/ptp --headed
npx playwright test --grep @OTC          # if you add tags
```

## Adding a new scenario

1. Choose the correct process folder.
2. Use the next sequential number (`03-...`).
3. Always add process annotations:
   ```ts
   test.info().annotations.push(
     { type: 'process', description: 'OTC' },
     { type: 'subprocess', description: '...' },
     { type: 'criticality', description: 'High|Medium|Low' },
     { type: 'tcode', description: 'VA01 / App-id' },
   );
   ```
4. Prefer `intent.*` → `fe.*` → explicit `ui5.control` in that order.
5. Use `testData.generate()` for any created business objects.
