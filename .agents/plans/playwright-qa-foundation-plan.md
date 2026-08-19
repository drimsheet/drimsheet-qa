# Playwright QA Foundation QA Plan

## Goal

Create a small, reliable npm-based Playwright project for Drimsheet smoke and end-to-end testing against a separately deployed live QA environment. The foundation must fail safely when environment configuration is missing, keep secrets and generated artifacts out of Git, and give future contributors concise local guidance for adding tests without hiding product or environment defects.

The repository-foundation work is implementation-ready because the user explicitly selected Playwright, npm, live-environment execution, and project-local skills and rules. The first product smoke suite and CI schedule are not implementation-ready until the target URL, allowed host, authentication/test-data contract, critical user journeys, and CI provider are confirmed.

## Context

The repository currently has no commits and no application or test code. Its only QA conventions are the planning skill and two durable rules under `.agents/`: scope changes to present needs and disclose novel patterns rather than silently inventing them. There is no package manager metadata, Playwright configuration, test precedent, CI configuration, remote repository, application contract, or environment documentation.

The test runner will exercise a real, separately deployed Drimsheet environment. It should use browser-level behavior and live integrations unless a future owning requirement explicitly authorizes a mock. npm is the only package manager for this project; `yarn.lock`, Yarn commands, and Yarn-specific configuration are out of scope.

### Proposed Repository Shape

```text
.
├── AGENTS.md
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── .env.example
├── .gitignore
├── README.md
├── config/
│   └── tags.ts
├── .agents/
│   ├── rules/
│   │   ├── live-environment-safety.md
│   │   ├── playwright-test-reliability.md
│   │   ├── precedent-and-deviation.md
│   │   └── scope-and-simplicity.md
│   └── skills/
│       └── playwright-test-authoring/SKILL.md
├── tests/
│   ├── smoke/
│   └── e2e/
└── test-results/                 # generated and ignored
```

Do not add page objects, a generic fixture framework, test factories, global authentication setup, or a `utils` directory until at least one confirmed scenario requires them and repeated behavior establishes a concrete boundary.

## Acceptance Basis

* **Owning request:** Set up this repository for Drimsheet QA end-to-end and smoke testing with Playwright, executing against a separate live environment.
* **Tooling constraint:** Use npm, not Yarn.
* **Repository guidance:** Define small common-sense skills and rules for the project, including a consistent Playwright tag taxonomy.
* **Existing durable rules:** `.agents/rules/scope-and-simplicity.md` and `.agents/rules/precedent-and-deviation.md`.
* **Out of scope:** Product requirements for individual Drimsheet features, production monitoring, load/performance testing, visual-regression infrastructure, mobile-device coverage, API-contract testing, automatic data seeding, and speculative browser or environment matrices.

## Test Preconditions

* A stable, separately deployed Drimsheet QA/staging URL and its exact allowed hostname.
* Confirmation that the URL is not production and may safely receive automated traffic.
* A documented test account/access mechanism if the chosen critical journeys require authentication.
* Disposable or resettable test data for any scenario that mutates state.
* An agreed initial list of critical user journeys and their observable expected outcomes.
* Node.js 22 LTS (or another explicitly agreed version) and npm available locally and in CI.
* Chromium installed through Playwright for the initial smoke project.
* CI secret storage for credentials; secrets must never be committed or printed.

## Confirmed Findings

1. **Repository foundation — No npm or Playwright project exists.** The root contains only `.gitignore` and staged `.agents` planning/rule files; there is no `package.json`, lockfile, test directory, or runner configuration.
2. **No local automation precedent exists.** There are no tests, fixtures, helpers, CI workflows, environment loaders, remotes, or prior commits to reuse.
3. **Structural authorization is explicit.** The owning request selects Playwright, npm, a live separate target, and local skills/rules, so the smallest foundation for those responsibilities does not require a separate deviation approval.
4. **Product assertions are undefined.** No Drimsheet story, acceptance criteria, supported-browser policy, authentication contract, or smoke-journey list is present. Product tests must not invent these behaviors.
5. **Current ignore coverage is incomplete.** `.gitignore` excludes `node_modules` and `.env`, but not Playwright reports, blobs, traces, screenshots, videos, or test results.

## Test Scope

### In Scope

* Bootstrap an npm-owned TypeScript Playwright project and commit `package-lock.json`.
* Add explicit scripts for the default E2E suite, smoke subset, headed/UI debugging, and report viewing.
* Require and validate a live environment base URL before execution; refuse an unapproved or production target.
* Configure deterministic defaults: Chromium first, Playwright web-first timeouts, trace/screenshot/video retained on failure, HTML reporting, no implicit local web server, no arbitrary sleeps, and conservative CI worker/retry settings.
* Separate `tests/smoke` from `tests/e2e` for discoverability, while using Playwright tags as the execution and reporting taxonomy for `@smoke`, `@e2e`, and `@a11y` suites.
* Keep test tag values in a single `config/tags.ts` registry so test files do not repeat string literals or introduce accidental variants.
* Add one minimal environment-connectivity smoke test only after its expected public behavior is confirmed.
* Add concise contributor documentation, live-environment safety/reliability rules, and one focused Playwright authoring skill.
* Define local and CI verification gates.

### Regression Scope

This is a new QA repository, so there is no existing automated regression suite. After initial journeys are agreed, smoke coverage should protect environment reachability and the smallest critical user outcome; broader E2E tests should cover only confirmed high-value workflows.

### Out of Scope

* Running every test on Chromium, Firefox, and WebKit without a supported-browser requirement.
* Automatic retries locally or broad retries that mask deterministic defects.
* Starting Drimsheet locally from Playwright.
* Testing production or accepting a runtime flag that casually bypasses the environment guard.
* Shared mutable accounts, order-dependent tests, arbitrary `waitForTimeout`, or test-only UI behavior.
* A page-object model or custom framework before repeated current scenarios justify it.
* Provider-specific CI workflow files until the hosting/CI provider and execution policy are confirmed.

## Implementation Sequence

### Phase 1 — npm and Playwright foundation

1. Initialize `package.json` as a private package and use npm to install exact compatible dev dependencies: `@playwright/test`, `typescript`, `@types/node`, and `dotenv` only if local `.env` loading is retained.
2. Commit the npm-generated `package-lock.json`; add a repository rule and README statement that `npm install`/`npm ci` are supported and Yarn artifacts must not be introduced.
3. Add `tsconfig.json` scoped to Playwright configuration, `config/**/*.ts`, and tests, with strict type checking and no emitted build output.
4. Add `playwright.config.ts` with `testDir: ./tests`, an explicit required base URL, Chromium as the initial project, failure artifacts, an HTML report, local `forbidOnly`, CI-safe `forbidOnly`, and narrow CI retry/worker defaults. Do not configure `webServer` because the target is live and separate.
5. Add npm scripts with stable responsibilities and Playwright `--grep` tag filtering:
   * `test:e2e` — every test tagged `@e2e`, including smoke and accessibility tests that are also E2E journeys.
   * `test:smoke` — tests tagged `@smoke`.
   * `test:a11y` — tests tagged `@a11y`.
   * `test:e2e:ui` — Playwright UI mode.
   * `test:e2e:headed` — headed debugging.
   * `test:e2e:report` — open the last HTML report.
   * `typecheck` — TypeScript no-emit validation.
6. Add `config/tags.ts` as the single source for tag values used by TypeScript test code:

   ```ts
   export const TAGS = {
     E2E: '@e2e',
     SMOKE: '@smoke',
     A11Y: '@a11y',
   } as const;
   ```

   Keep this as a plain constant object: no registry class, helper functions, runtime mutation, barrel export, or separate tag type until a current consumer requires one. npm scripts must use the same literal values because shell commands cannot import the TypeScript constant directly.
7. Expand `.gitignore` for `.env*` with an exception for `.env.example`, Playwright reports/results/blob reports, and transient OS/editor artifacts actually encountered.

### Phase 2 — live-environment boundary

1. Define a minimal environment contract in `.env.example` and README. `APP_URL` is required; credential variables are added only for the selected authenticated scenarios. Smoke and broader E2E tests use the same `APP_URL`; add another URL only if a confirmed scenario targets a genuinely different deployed service.
2. Validate the URL once during configuration: it must be an absolute HTTPS URL and its hostname must equal the approved QA hostname. Missing, malformed, or unapproved values must stop the run with a clear message before a browser starts.
3. Keep the approved hostname as a committed constant once supplied. Do not use a user-provided second variable as a self-approving allowlist, and do not provide a production-override flag in the normal test command.
4. Document environment ownership, secret placement, local setup, failure semantics, and the fact that Playwright does not launch the application.
5. Add a minimal connectivity smoke test only after the expected public landing behavior (URL/title/visible landmark) is confirmed. Assert user-visible behavior, not just an HTTP 200 response.

### Phase 3 — common-sense project guidance

1. Add a short root `AGENTS.md` that routes contributors to the existing scope/precedent rules, the two new testing rules, and the Playwright authoring skill. It should state npm-only operation, live-QA-only execution, and the requirement to tie each test to a current scenario or acceptance criterion.
2. Add `.agents/rules/live-environment-safety.md`: never target production; validate the approved hostname; keep credentials out of source/logs; use owned disposable data; avoid destructive bulk operations; clean up only records created by the current test; stop when environment ownership or cleanup safety is unclear.
3. Add `.agents/rules/playwright-test-reliability.md`: prefer role/label/test-id locators in that order of user semantics; use web-first assertions; synchronize on observable state; prohibit arbitrary sleeps; keep tests isolated and parallel-safe; retain useful failure artifacts; import tags from `config/tags.ts` instead of writing tag literals in tests; do not weaken assertions or add broad retries to hide defects.
4. Add `.agents/skills/playwright-test-authoring/SKILL.md`, triggered when creating or changing Playwright coverage. Its workflow should require reading the relevant acceptance basis and local rules, inspecting nearby precedent, identifying test data and cleanup, selecting tags from the documented taxonomy, implementing the smallest user-outcome scenario, running focused/type checks, and reporting environment-dependent verification honestly.
5. Keep each document focused. Do not duplicate the full rules inside the skill; link to them and make the skill operational.

### Phase 4 — initial smoke and E2E coverage

1. Confirm and document 1–3 critical Drimsheet journeys with the product owner, including expected outcomes and required data state.
2. Implement the public connectivity/landing scenario first, if Drimsheet has a stable public entry state, and tag it with `TAGS.E2E` plus `TAGS.SMOKE`.
3. Add an authenticated smoke journey only after the login mechanism and dedicated account policy are known. Use UI login initially; introduce stored authentication state only when multiple current tests demonstrably need it and account isolation is resolved.
4. Add broader E2E scenarios one user outcome at a time. Tag every deployed browser journey with `TAGS.E2E`, add `TAGS.SMOKE` only when it meets the smoke criteria, and add `TAGS.A11Y` when accessibility behavior is an explicit assertion. Keep scenario-local setup local until repeated behavior justifies a fixture or helper.
5. For every mutating scenario, generate a unique record identifier, track ownership, and clean up only that record through a supported UI or approved test API. If deterministic cleanup is unavailable, do not make that test part of a recurring smoke run.

### Phase 5 — CI integration

1. After the provider is selected, add the smallest provider-native workflow using `npm ci`, `npx playwright install --with-deps chromium`, type checking, and the appropriate Playwright script.
2. Run smoke tests on the agreed pull-request/deployment gate and broader E2E tests on the agreed schedule or manual trigger. Do not choose cadence without environment capacity/ownership confirmation.
3. Inject `APP_URL` and credentials through protected CI variables, use concurrency controls if the account/data model is not parallel-safe, and upload the HTML report plus failure artifacts with finite retention.
4. Ensure a failing environment guard, smoke assertion, or E2E assertion fails the job visibly; do not silently continue.

## Structural Decision Basis

| Decision | Basis | Classification |
| --- | --- | --- |
| Playwright test runner | Explicit owning request | Requirement |
| npm and committed `package-lock.json`; no Yarn | Explicit owning request | Requirement |
| Tests target a separate live deployment; no local `webServer` | Explicit owning request | Requirement |
| `@smoke`, `@e2e`, and `@a11y` tags drive suite selection | Explicit user-resolved decision | Requirement |
| Central tag values at `config/tags.ts` | Explicit user-resolved decision; consumed by all tagged tests | Requirement |
| `.agents/rules` and `.agents/skills` placement | Existing repository structure at `.agents/rules/*` and `.agents/skills/planner/SKILL.md` | Concrete local precedent |
| Present-need-only helpers/fixtures | `.agents/rules/scope-and-simplicity.md` | Durable rule |
| Product assertions remain unresolved until specified | `.agents/rules/precedent-and-deviation.md` | Durable rule |
| TypeScript, Chromium-first, `tests/smoke` and `tests/e2e` | Smallest proposed implementation for requested test types; no conflicting precedent exists | Authorized foundation detail |
| Exact host allowlist and provider-native CI | Cannot be selected from repository evidence | Open decision |

## Test Scenarios

### TC-01 — Reject a missing or unsafe target

**Purpose**

Verify the runner cannot accidentally execute against an unspecified, malformed, or unapproved environment.

**Preconditions**

* The approved QA hostname has been supplied and committed in the environment validator.

**Steps**

1. Run the smoke command without `APP_URL`.
2. Run it with a malformed URL.
3. Run it with the known production or another unapproved hostname.

**Expected Result**

* Each run exits non-zero before launching a browser.
* The error identifies the invalid configuration without exposing secrets.

### TC-02 — Reach the approved live Drimsheet entry point

**Purpose**

Verify that the approved environment is reachable and presents the confirmed public entry behavior.

**Preconditions**

* The deployed QA URL and public landing expectation are confirmed.

**Steps**

1. Run `npm run test:smoke` with the approved base URL.
2. Navigate using Playwright's configured base URL.
3. Assert the confirmed user-visible landmark and canonical navigation state.

**Expected Result**

* Drimsheet loads without a browser-level navigation error.
* The agreed landing state is visible.
* A failure produces a trace/screenshot/report suitable for diagnosis.

### TC-03 — Complete a critical authenticated journey

**Purpose**

Verify the smallest agreed business-critical Drimsheet outcome through the deployed UI.

**Preconditions**

* The journey, expected result, credentials, test-data ownership, and cleanup contract are confirmed.

**Steps**

1. Authenticate through the approved mechanism.
2. Complete the selected critical user journey.
3. Assert its observable result and resulting state.
4. Remove only data created by this test when cleanup is supported.

**Expected Result**

* The confirmed critical outcome succeeds in the live QA environment.
* The test is repeatable and leaves no unsafe shared state.

## E2E Automation Plan

Automate TC-01 as configuration-level verification and TC-02 as the initial smoke test after the hostname and landing expectation are known. Automate TC-03 only after its product and data contracts are supplied. Smoke tests must remain short, critical, and safe to repeat; broader paths belong under `tests/e2e`.

Use Playwright-native locators, auto-waiting, isolated browser contexts, and failure traces. Start with scenario-local setup. A shared fixture is warranted only when at least two current scenarios repeat the same semantically stable setup. Tests must interact with live deployed dependencies when the journey requires them; a mock requires an explicit scenario-specific decision.

### Tag Taxonomy

Use Playwright's structured `tag` field on `test` or `test.describe`, rather than embedding tags in prose-only titles. Import tag values from `config/tags.ts`; test files must not contain raw `@smoke`, `@e2e`, or `@a11y` strings. Tests may have multiple tags because the categories intentionally overlap.

| Tag | Meaning | Selection |
| --- | --- | --- |
| `@e2e` | A browser-level product journey against the deployed Drimsheet environment. Every product journey receives this tag. | `npm run test:e2e` |
| `@smoke` | A fast, critical, safe-to-repeat release confidence check. Every smoke test also receives `@e2e`. | `npm run test:smoke` |
| `@a11y` | A test with explicit accessibility assertions, such as keyboard focus or accessible names. It normally also receives `@e2e` and may also be smoke-critical. | `npm run test:a11y` |

Example:

```ts
import { TAGS } from '../../config/tags';

test('shows the Drimsheet entry point', {
  tag: [TAGS.E2E, TAGS.SMOKE],
}, async ({ page }) => {
  // Confirmed user-visible assertions belong here.
});
```

Do not create tags for feature names, owners, priority, or speculative suites unless there is a current command, CI gate, or reporting consumer. A new tag requires updating `config/tags.ts`, its npm/CI selection command when applicable, and the README taxonomy in the same change. Directory placement aids browsing; tags determine suite membership, so moving a file must not silently change which npm suite runs it.

## Exploratory Testing

After the first critical journeys are selected, manually inspect responsive layout, keyboard navigation, focus after validation errors, session expiry/recovery, refresh/back navigation, slow network behavior, and error messages. Record stable high-value findings as candidate automated scenarios only when their expected behavior is confirmed.

## Test Data Strategy

Use dedicated QA accounts and unique per-run identifiers for created records. Prefer environment-provided resettable fixtures or an approved test-data API over shared hand-maintained records. Tests may delete only records they created and positively identify. Credentials stay in local `.env` or protected CI secrets, never in fixtures, reports, screenshots by design, or source control.

Account pooling, seed frameworks, and global cleanup are deferred until current parallel scenarios require them. If the environment cannot provide isolated, disposable data, begin with read-only smoke coverage and treat mutating automation as blocked.

## Environment And Integration Requirements

* Exact QA base URL and committed hostname allowlist.
* Confirmation of the production hostname so the guard can explicitly reject it where useful.
* Deployment health and test windows owned by the Drimsheet environment team.
* Dedicated credentials and any MFA/SSO test bypass approved for QA, if authentication is in scope.
* Chromium browser binaries locally and in CI.
* CI provider, secrets, trigger policy, artifact retention, and concurrency policy.

## Failure And Recovery Coverage

Verify missing/invalid configuration, unreachable deployment, browser navigation failure, invalid/expired authentication, and failed cleanup where relevant. The runner must fail clearly and preserve diagnostic artifacts. Tests must not convert environment outages into passes, retry arbitrary steps, or leave partially created data without reporting it.

## Accessibility Coverage

For each selected critical journey, verify keyboard reachability, logical focus, accessible names for the controls used, and visible/announced errors for relevant validation. A full accessibility audit is outside this foundation unless separately requested.

## Cross-Browser Coverage

Use Chromium for the initial foundation and smoke gate. Add Firefox/WebKit projects only when Drimsheet's supported-browser policy or a browser-specific risk is confirmed; then target the affected journeys rather than multiplying every test automatically.

## Verification

Foundation checks:

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm run test:smoke -- --list
npm run test:e2e -- --list
npm run test:a11y -- --list
```

Live checks after environment decisions are resolved:

```bash
npm run test:smoke
npm run test:e2e
npm run test:a11y
```

These commands assume `APP_URL` has been supplied through the documented local environment or CI secret configuration.

Also manually confirm that missing and unapproved URLs fail before browser launch, the HTML report opens, failure artifacts are ignored by Git, `package-lock.json` is committed, no Yarn artifact exists, tagged tests import `TAGS` instead of repeating tag strings, npm grep values match `config/tags.ts`, and `git status` contains no credentials or generated reports.

## Traceability

| Requirement | Covered By |
| --- | --- |
| Playwright-based QA foundation | Phases 1–2; TC-01 and TC-02 |
| npm rather than Yarn | Phase 1; foundation verification |
| Smoke testing | TC-02 and the selected critical subset of TC-03 |
| Broader E2E testing | TC-03 after product scope is confirmed |
| Tag-based suite selection and centralized tag values | Phase 1 scripts, `config/tags.ts`, and E2E Automation Plan tag taxonomy |
| Separate live environment | Phase 2; TC-01 and TC-02 |
| Small project skills and rules | Phase 3; documentation review |

## Assumptions

* Node.js 22 LTS is proposed as a stable baseline; validate it against the chosen CI environment before pinning `.nvmrc` or `engines`.
* The separate environment exposes an HTTPS hostname that can be committed as an allowlisted non-secret value.
* At least one stable user-visible landing state exists for a minimal connectivity smoke test.

## Open Decisions

1. **Target environment:** What are the exact QA/staging and production hostnames, and who owns approval for automated traffic? This blocks the safety guard and all live execution.
2. **Initial smoke contract:** Which 1–3 Drimsheet journeys are critical, and what observable results define success? This blocks product assertions and TC-03.
3. **Authentication:** Is login local, SSO, magic-link, or MFA-protected, and can QA receive dedicated automation credentials? This changes setup, secrets, and possibly email/identity dependencies.
4. **Test data:** Which records may tests create/update/delete, and is a supported seed/cleanup API available? Until resolved, recurring automation should remain read-only.
5. **CI ownership:** Which CI provider, triggers, schedule, secret store, concurrency, and artifact retention are required? No provider-specific workflow should be added before this is answered.
6. **Browser support:** Is Chromium-only acceptable for the first gate, and what browser matrix does Drimsheet officially support?

These decisions prevent the product suite and CI portion from being QA-ready, but do not prevent implementation of the npm/Playwright skeleton, guidance, or configuration tests.

## Risks

* **Production impact:** A misconfigured base URL could send automation to production. Mitigate with a committed exact-host allowlist and no routine bypass.
* **Flaky live dependencies:** Deployment instability, SSO, email, or shared data can make UI checks nondeterministic. Attribute failures to the correct owner; do not hide them with sleeps or broad retries.
* **State collision:** Parallel tests may corrupt shared accounts or records. Start read-only or serial for affected scenarios, then add isolation only when the data contract supports it.
* **Overbuilt test framework:** An empty repository invites speculative abstractions. Enforce the present-need and precedent gates and add helpers only after concrete repetition.
* **Secret leakage:** Traces/screenshots can capture sensitive UI. Use non-sensitive QA accounts, redact by test design, restrict artifact access/retention, and never log credential values.

## Completion Criteria

The foundation is complete when:

* `npm ci`, type checking, and Playwright test discovery pass from a clean checkout.
* The repository contains a committed npm lockfile and no Yarn artifacts.
* Missing or unapproved target URLs fail before browser startup.
* The approved live QA environment passes the confirmed landing smoke test.
* Failure traces, screenshots, and reports are produced and ignored by Git.
* README, `AGENTS.md`, the two focused testing rules, and the authoring skill agree on npm-only operation, live-environment safety, reliability, data ownership, and verification.
* Every implemented test maps to a confirmed scenario or acceptance criterion.
* Every deployed browser journey uses `TAGS.E2E`; smoke and accessibility coverage uses the documented overlapping constants and is discoverable through the matching npm scripts.
* Tagged test code contains no raw tag literals outside `config/tags.ts`; npm suite filters match the centralized values.
* Product smoke/E2E and CI work remains explicitly blocked until its applicable Open Decisions are resolved.
