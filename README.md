# Drimsheet QA

Playwright smoke and end-to-end tests for a separately deployed Drimsheet QA environment. Playwright never starts the application locally, and this repository must never target production.

## Current status

The npm/Playwright foundation and environment guard are ready. Live product tests remain blocked until the exact QA hostname, public landing expectation, critical journeys, authentication contract, and disposable test-data policy are confirmed. CI wiring is also deferred until its provider and execution policy are selected.

## Setup

Use Node.js 22 LTS and npm only; commit `package-lock.json` and do not introduce Yarn commands or artifacts.

```bash
npm ci
npx playwright install chromium
cp .env.example .env
```

Set `APP_URL` in `.env` to the separately deployed QA URL. Before any browser run can start, an environment owner must approve its exact hostname and that hostname must replace the intentionally unset `APPROVED_QA_HOSTNAME` in `config/environment.ts`. The guard requires HTTPS and exact hostname equality. There is no runtime bypass or environment-provided allowlist.

Credentials belong only in local `.env` files or protected CI secrets. Add credential variables to `.env.example` only when a confirmed scenario consumes them, and never print their values.

## Commands

```bash
npm run test:config      # verify the URL guard without launching a browser
npm run typecheck
npm run test:smoke       # @smoke tests
npm run test:e2e         # @e2e tests
npm run test:a11y        # @a11y tests
npm run test:e2e:headed
npm run test:e2e:ui
npm run test:e2e:report
```

CI should use `npm ci`; local dependency changes use `npm install`. The live commands fail before browser launch when `APP_URL` is missing, malformed, non-HTTPS, or outside the committed allowlist.

## Test organization and tags

Place short, critical, safe-to-repeat checks under `tests/smoke` and broader confirmed journeys under `tests/e2e`. Directory placement is for navigation; tags select suites. Import tag values from `config/tags.ts` and use Playwright's structured `tag` option.

| Tag | Meaning |
| --- | --- |
| `@e2e` | Every browser-level product journey against deployed Drimsheet. |
| `@smoke` | A fast, critical, repeatable check; also tag it `@e2e`. |
| `@a11y` | A journey with explicit accessibility assertions; normally also `@e2e`. |

Do not add a product assertion until its expected user-visible outcome is confirmed. Keep setup local to a scenario until current repetition justifies a fixture. Mutating tests must use uniquely identifiable, owned data and may clean up only records created by that test.

See `AGENTS.md` for the repository rules and authoring workflow.
