# <Outcome> QA Plan

## Goal

Describe the user-visible behavior or product outcome this QA plan should verify.

State whether the feature is ready for QA or whether a blocking dependency, environment issue, or unresolved product decision must be addressed first.

The QA plan should validate the behavior defined by the owning story and its acceptance criteria against a deployed environment. It should not redefine product requirements.

## Context

Summarize the relevant feature, expected user journey, deployed environment, and any implementation details that materially affect testing.

Keep this section concise. Link to the owning story, Epic, backend implementation plan, frontend implementation plan, or relevant contracts where useful.

Include only context that helps QA understand what must be verified.

## Acceptance Basis

* **Owning story:** Identify the story or ticket that defines the expected behavior.
* **Acceptance criteria:** Reference the acceptance criteria that this plan must cover.
* **Related implementation:** Link relevant backend, frontend, infrastructure, or integration work where useful.
* **Out of scope:** Identify behavior explicitly excluded from the owning story or current delivery.

Do not create new product requirements in this section. If expected behavior is unclear or missing from the owning story, record it under `Open Decisions`.

## Test Preconditions

Describe the state required before testing can begin.

Include, where applicable:

* Required deployed version or environment.
* Test accounts or user states.
* Required fixtures or seeded data.
* Email inboxes or test email services.
* External services or integrations.
* Feature flags or configuration.
* Required credentials or access.
* Browser or device requirements.
* Known environment limitations.

Only include prerequisites that materially affect execution.

## Confirmed Findings

1. **<Priority, when relevant> — <Finding>.** Describe confirmed behavior, evidence, and testing impact.
2. **<Finding>.** Describe confirmed behavior, evidence, and testing impact.

Include only findings confirmed through requirements, repository inspection, deployed-system inspection, or reproduction.

Do not put assumptions or unresolved behavior here.

## Test Scope

### In Scope

* Describe the user journeys, system behaviors, state transitions, and failure paths that must be verified.
* Include each acceptance criterion either directly or through a test scenario that clearly covers it.

### Regression Scope

* Identify existing journeys or behaviors that could reasonably be affected by this change.
* Keep regression focused on realistic impact rather than broad application-wide retesting.

### Out of Scope

* Identify adjacent flows, future work, unsupported environments, or behavior intentionally excluded from this QA cycle.

Omit any subsection that does not add useful information.

## Test Scenarios

Define the scenarios required to verify the acceptance criteria.

Use the level of detail necessary for another QA engineer to understand the intent and expected outcome without making the plan unnecessarily procedural.

### TC-01 — <Scenario name>

**Purpose**

Describe what behavior or acceptance criterion this scenario verifies.

**Preconditions**

* `<required state>`

**Steps**

1. `<action>`
2. `<action>`
3. `<action>`

**Expected Result**

* `<observable result>`
* `<observable state change>`
* `<absence of incorrect behavior, where relevant>`

### TC-02 — <Scenario name>

Repeat as needed.

Do not create one test case per acceptance criterion when several criteria are naturally verified by the same user journey.

Prefer scenarios that reflect meaningful user outcomes over mechanically matching ticket bullets.

## E2E Automation Plan

Identify which scenarios should be automated in the QA repository.

For each automated area, describe:

* The user journey being automated.
* Required fixtures or test-data strategy.
* Any external dependency the test must interact with.
* How test isolation will be maintained.
* Any cleanup required after execution.
* Any condition that makes automation impractical or unreliable.

Prefer reusable helpers, fixtures, and test utilities where they represent repeated QA behavior.

Do not duplicate coverage purely to mirror the number of acceptance criteria.

Where several input combinations test the same rule, prefer parameterized or data-driven tests where appropriate.

## Exploratory Testing

Describe areas where scripted E2E coverage alone may not be sufficient.

Examples include:

* Unexpected navigation paths.
* Error recovery.
* Accessibility behavior.
* Browser-specific behavior.
* Race conditions or timing-sensitive behavior.
* Unusual but valid user inputs.
* Visual or interaction issues.
* Integration behavior that is difficult to assert reliably through automation.

Omit this section when exploratory testing does not add meaningful value.

## Test Data Strategy

Describe the data required to execute the plan reliably.

Include, where applicable:

* Unique users or email addresses.
* Existing-user fixtures.
* Generated data.
* Seeded records.
* Disposable test accounts.
* Known IDs or reference records.
* Cleanup requirements.
* Data that must remain stable across environments.

Prefer deterministic or generated data over manually maintained shared records when possible.

## Environment And Integration Requirements

Describe any infrastructure QA depends on to execute the plan.

Examples:

* QA or staging deployment.
* Email-capture service.
* Payment sandbox.
* Queue consumers.
* Scheduled workers.
* Third-party test accounts.
* API mocks provided by the environment.
* Browser binaries.
* Feature configuration.

Call out dependencies that could block QA even when the implementation itself is complete.

## Failure And Recovery Coverage

Describe important failure conditions that QA must verify.

Include only failures relevant to the feature, such as:

* Invalid input.
* Duplicate or conflicting state.
* Network or server failure.
* Expired or invalid tokens.
* External integration failure.
* Retry behavior.
* Partial completion.
* Unexpected refresh or navigation.

For each relevant failure, verify both the error presented to the user and the resulting system state.

## Accessibility Coverage

Describe accessibility behavior that should be verified when applicable.

Consider:

* Keyboard-only navigation.
* Logical focus order.
* Focus behavior after errors or navigation.
* Accessible names and labels.
* Validation errors associated with the relevant control.
* Screen-reader announcement of important status or error messages.

Do not require full accessibility auditing for every ticket unless that is part of the team's QA process.

## Cross-Browser Coverage

State the browsers or browser engines required for this change.

Identify whether:

* Full coverage is required across all supported browsers.
* The primary flow can run on one browser with targeted regression elsewhere.
* A browser-specific risk justifies additional coverage.

Avoid running every scenario across every browser without a clear reason.

## Verification

List the focused QA checks first, followed by broader automated checks justified by the change.

```bash
<focused Playwright test command>
<related test suite command>
<broader regression command>
```

Also record any manual checks that cannot be represented reliably in automation.

Call out checks that depend on unavailable infrastructure, credentials, browser binaries, external services, or environment configuration.

## Traceability

Map the owning acceptance criteria to the scenarios that verify them.

| Acceptance Criterion | Covered By       |
| -------------------- | ---------------- |
| `<AC>`               | `TC-01`          |
| `<AC>`               | `TC-02`, `TC-03` |

The purpose of this section is coverage visibility, not enforcing one test per acceptance criterion.

Every acceptance criterion should have a clear verification path before QA is considered complete.

## Assumptions

* Record an assumption that QA may proceed with and explain how it can be validated.

Do not treat assumptions as accepted product behavior.

Omit this section when no material assumptions exist.

## Open Decisions

* State any unresolved product, implementation, environment, or testability decision.
* List the available options when known.
* Describe how each option changes the test plan or expected result.

Do not invent expected behavior to unblock test writing.

If an unresolved decision materially changes what QA should assert, the plan is not QA-ready until that decision is resolved.

## Risks

* Describe testing, environment, integration, accessibility, security, reliability, or regression risks.
* State how each risk will be mitigated or where additional coverage is required.

Omit this section when there are no material risks beyond normal QA execution.

## Completion Criteria

QA is complete when:

* Every acceptance criterion has a documented verification path.
* Required E2E scenarios pass against the target deployed environment.
* Required manual or exploratory checks are complete.
* Relevant regression coverage passes.
* Expected user-visible outcomes and state transitions are confirmed.
* Failure paths do not leave the system in an invalid or misleading state.
* No unresolved defect blocks the acceptance criteria.
* Any non-blocking defects or limitations are recorded and linked.
* Required environment-dependent checks have been completed or explicitly documented as blocked.
* The QA result is recorded on the owning story or release workflow.
