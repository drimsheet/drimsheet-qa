# Precedent And Deviation

Never silently turn a test-plan gap, assumption, missing product behavior, or
missing QA precedent into test implementation.

## Implementation Basis

Before making a structural decision in the QA codebase, identify its basis as
one of:

- an explicit acceptance criterion or user-resolved product decision;
- a durable QA repository rule;
- a concrete local QA precedent, cited by path and symbol; or
- an approved deviation.

Inspect the relevant tests, fixtures, helpers, configuration, CI wiring, test
data setup, and environment integration before concluding that no suitable
precedent exists.

Match precedents by responsibility, ownership, and semantics rather than by
superficial file similarity.

Before introducing new coordination, retry behavior, shared state, test-user
pools, environment hooks, polling, cleanup workers, or similar mechanisms,
inventory the guarantees already provided by the application, test environment,
Playwright, CI pipeline, and existing fixtures.

Do not compensate for application or environment uncertainty by silently adding
stronger guarantees to the test framework.

## Assumptions And Decisions

- Validate each material test-plan assumption before relying on it.
- Use the owning story's and product's established vocabulary. A generic QA or
  architecture term is not a substitute for an existing product term.
- Treat choices affecting expected behavior, shared fixtures, test data,
  environment configuration, credentials, external integrations, retries,
  timing, failure semantics, CI behavior, or repository-wide conventions as
  material.
- Do not convert unresolved expected behavior into a test assertion.
- Do not convert an unresolved material QA design decision into shared test
  infrastructure.
- Small, reversible implementation details may follow the nearest established
  QA pattern when they do not change product expectations, coverage scope, or
  test architecture.

## Product-Behavior Gap

If the acceptance criteria or owning requirement do not define an expected
result that the test needs to assert:

- identify the missing behavior;
- explain which test scenario depends on it;
- do not choose an expected result on behalf of the product; and
- record the issue under `Open Decisions` until the owning product decision is
  resolved.

Tests must verify product requirements; they must not create them.

## No-Precedent Gate

Before implementing a material QA pattern without suitable local precedent,
state:

- the testing responsibility the pattern addresses;
- the QA repository areas searched and closest candidate precedents;
- why those candidates do not satisfy the current requirement;
- the smallest proposed deviation and its owner; and
- the affected tests, fixtures, configuration, CI wiring, test data,
  environment dependencies, and maintenance surface.

Use the heading `New-pattern decision required` and confirm that the deviation
has not been implemented when approval is required.

Do not implement a material deviation until it is explicitly approved after
disclosure or a prior instruction specifically authorizes the same deviation.

A generic request to add E2E coverage or implement a QA plan does not grant
approval for new repository-wide test architecture.

For repository-wide architectural novelty, follow the team's architecture
decision process after approval rather than introducing the pattern implicitly
through a feature test.

## Test Reliability

Do not hide product or environment problems with test-only behavior.

In particular:

- Do not add arbitrary sleeps to make an unstable flow pass.
- Do not add broad retries to conceal deterministic failures.
- Do not silently weaken assertions because an environment is unreliable.
- Do not mock a dependency in E2E when the current test requirement is to
  exercise that deployed integration.
- Do not introduce shared mutable test state unless the current scenarios
  require it.
- Do not make tests order-dependent unless the requirement genuinely describes
  an ordered workflow.

If reliability requires a workaround, identify whether the problem belongs to
the product, environment, external dependency, or QA framework before choosing
a solution.

## Plan Drift

- Revalidate the QA plan against the current acceptance criteria, deployed
  behavior, durable QA rules, and current repository before editing.
- Disclose a stale or conflicting plan step before deviating from it.
- Pause for material changes to expected behavior, coverage scope, environment
  assumptions, or test architecture.
- State non-material corrections before proceeding while preserving the plan's
  intended verification outcome.
- Exclude optional coverage and infrastructure improvements that are not
  required by the current plan.
- At completion, state either `Implemented without deviation` or list each
  approved deviation and its verification evidence.