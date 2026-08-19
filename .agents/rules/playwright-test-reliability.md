# Playwright Test Reliability

- Prefer locators by role, then label, then stable test ID, choosing the closest expression of user semantics.
- Use Playwright web-first assertions and synchronize on observable UI or navigation state. Do not use arbitrary sleeps or `waitForTimeout`.
- Keep tests isolated, order-independent, and parallel-safe unless a confirmed scenario and data contract require otherwise.
- Import suite tags from `config/tags.ts`; do not write raw tag literals in test files.
- Keep setup and cleanup scenario-local until repeated current behavior establishes a stable shared boundary.
- Retain traces, screenshots, video, and the HTML report for failures. Do not catch failures merely to let a run pass.
- Do not weaken assertions, add broad retries, mock live dependencies, or add test-only product behavior to conceal product or environment defects.
- Assert confirmed user-visible outcomes rather than implementation details or status codes alone.
