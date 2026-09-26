# End-to-End Process Tests

Organized by **SAP S/4HANA end-to-end process areas**:

| Folder | Process | Tags |
|--------|---------|------|
| **otc/** | Order-to-Cash | `@OTC` |
| **ptp/** | Procure-to-Pay | `@PTP` |
| **rtr/** | Record-to-Report | `@RTR` |
| **atr/** | Acquire-to-Retire | `@ATR` |
| **htr/** | Hire-to-Retire | `@HTR` |
| **_demos/** | Pattern & onboarding examples | (reference only) |

## Naming convention

```
<process>/<NN>-<subprocess>.spec.ts
```

## Tags (selective execution)

| Tag | Meaning |
|-----|---------|
| `@OTC` `@PTP` `@RTR` `@ATR` `@HTR` | Process area |
| `@smoke` | Fast critical path |
| `@high` / `@medium` / `@low` | Business criticality |

```bash
npm run test:otc
npm run test:smoke
npm run test:high
npx playwright test --grep "@PTP|@RTR"
ENV=qas npm run test:ptp
```

## Latest Praman features used

- `intent.*` – business-language APIs
- `fe` – Fiori Elements helpers
- `testData` – generation + auto-cleanup
- `ui5` typed control proxies
- `odata` – V2/V4 verification
- `flpLocks` – SM12 lock management (cleaned in global.teardown)
- Process annotations → Praman compliance reporter
- Multi-environment via `ENV=dev|qas|preprod`

## Adding a new scenario

See [CONTRIBUTING.md](../../CONTRIBUTING.md).
