---
name: playwright-test-authoring
description: Create or change Playwright smoke, end-to-end, or accessibility coverage in the Drimsheet QA repository against an exact-host-allowlisted environment.
---

# Playwright Test Authoring

## Workflow

1. Read the owning story, acceptance criteria, or confirmed QA scenario. Stop rather than inventing an expected product result.
2. Read [Scope And Simplicity](../../rules/scope-and-simplicity.md), [Precedent And Deviation](../../rules/precedent-and-deviation.md), [Live Environment Safety](../../rules/live-environment-safety.md), and [Playwright Test Reliability](../../rules/playwright-test-reliability.md).
3. Inspect nearby tests, configuration, fixtures, environment integration, and test-data setup before choosing structure.
4. Identify required account/data state, ownership, isolation, and safe cleanup. Keep a scenario read-only when those guarantees are unavailable.
5. Choose overlapping suite tags from [`config/tags.ts`](../../../config/tags.ts). Every deployed browser journey uses `TAGS.E2E`; add `TAGS.SMOKE` only for a fast, critical, safe-to-repeat check, and `TAGS.A11Y` only when accessibility behavior is asserted.
6. Implement the smallest flow that proves the confirmed user-visible outcome. Keep setup local until current repetition justifies a shared fixture or helper.
7. Run the focused Playwright command and `npm run typecheck`. Run `npm run test:config` when changing the environment boundary.
8. Report which checks ran and which live checks remain blocked by URL, credentials, data, deployment, or browser availability.

Use npm only. Playwright does not start the target application; an allowlisted localhost target must already be running. Do not introduce production overrides, arbitrary sleeps, broad retries, speculative frameworks, or raw tag literals in test code.
