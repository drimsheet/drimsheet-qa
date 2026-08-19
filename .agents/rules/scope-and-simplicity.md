# Scope And Simplicity

Implement present QA requirements with the smallest coherent change.

## Present-Need Gate

- Every new test behavior, file, abstraction, fixture, setting, compatibility
  path, hook, or test utility must name a current acceptance criterion, test
  scenario, or QA operational need.
- A possible future test, environment, browser, integration, migration, or
  workflow is not sufficient.
- Keep future-only work out of the QA codebase, configuration, fixtures, test
  utilities, and execution instructions.

## Smallest-Coherent-Change Gate

- Prefer deletion, reuse, an internal constant, an existing fixture, or a
  concrete test implementation over a new layer or extension point.
- Do not solve unrequested follow-up testing work or add optional flexibility
  while implementing the current QA requirement.
- Do not create shared helpers solely because similar tests may exist later.

## Configuration Gate

Add an environment variable only for one of these present needs:

- a secret or credential;
- an environment-specific endpoint or identity;
- a demonstrated per-environment difference; or
- a currently owned QA operational control.

Document its consumer, operational owner, default, validation, and failure
semantics.

If all current QA environments use one value, keep that value as an internal
constant unless the value is a secret or otherwise must not be committed.

## Abstraction Gate

Do not introduce a generic service, factory, interface, fixture hierarchy,
provider abstraction, browser abstraction, feature flag, fallback,
compatibility path, re-export layer, or similar seam for a hypothetical second
test, environment, integration, or caller.

Introduce an abstraction only when current test scenarios or QA operational
needs require the boundary now.

Prefer a concrete Playwright flow or local helper until repeated current usage
demonstrates a reusable capability.

## Test Data And Fixture Gate

Do not introduce generic fixtures, seeders, factories, account pools, or test
data frameworks for hypothetical future scenarios.

Create or reuse only the data setup required by current test scenarios.

Shared fixtures should represent repeated current behavior rather than
anticipated reuse.

## Forward-Looking Work

Record future possibilities as non-goals or follow-up decisions.

Put them under `Out of Scope` in a QA plan instead of encoding them in test
architecture, fixtures, configuration, or automation.

## Deviations

A deliberate exception must follow
[Precedent And Deviation](precedent-and-deviation.md).

Before approval, state:

- the immediate QA benefit;
- the current acceptance criterion, scenario, or operational consumer;
- the added test code;
- the added maintenance surface;
- the added configuration or environment surface;
- the impact on execution time and reliability; and
- any new CI, deployment, credential, or operational dependency.