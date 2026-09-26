# Contributing to the SAP S/4HANA Praman Framework

Thank you for helping improve the framework.

## Adding a new process scenario

1. Choose the correct process folder under `tests/e2e/`:
   - `otc/` Order-to-Cash
   - `ptp/` Procure-to-Pay
   - `rtr/` Record-to-Report
   - `atr/` Acquire-to-Retire
   - `htr/` Hire-to-Retire

2. Use the naming convention:
   ```
   <NN>-<subprocess>.spec.ts
   ```
   Example: `otc/03-billing.spec.ts`

3. Always include:
   - **Tags**: `@OTC` / `@PTP` / … + `@smoke` or `@high` / `@medium`
   - **Annotations** for compliance reporting:
     ```ts
     test.info().annotations.push(
       { type: 'process', description: 'OTC' },
       { type: 'subprocess', description: 'Billing' },
       { type: 'criticality', description: 'High' },
       { type: 'tcode', description: 'VF01 / BillingDocument-manage' },
     );
     ```
   - Prefer `intent.*` → `fe.*` → explicit `ui5.control`
   - Use helpers from `tests/data/master-data.ts`

4. Keep interactive steps conservative (commented) until validated against a live system.

## Running tests locally

```bash
npm test                  # full suite
npm run test:otc          # one process
npm run test:smoke        # @smoke tagged tests
npm run test:high         # @high criticality
ENV=qas npm run test:ptp  # multi-env
```

## AI-assisted authoring

After `npx playwright-praman init`:

```
/praman-sap-coverage
```

Describe the business process in natural language. The Planner → Generator → Healer pipeline will produce a typed test.

## Pull requests

- Keep changes focused on one process area when possible.
- Ensure `npm test` (or the relevant process script) still passes.
- Update `tests/e2e/README.md` if you introduce a new convention.
