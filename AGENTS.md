# Drimsheet QA contributor guidance

This is an npm-only Playwright repository. Run browser tests only against the separately deployed, exact-host-allowlisted Drimsheet QA environment; never target production and never add a routine guard bypass.

Before changing coverage:

- Follow `.agents/rules/scope-and-simplicity.md` and `.agents/rules/precedent-and-deviation.md`.
- Follow `.agents/rules/live-environment-safety.md` and `.agents/rules/playwright-test-reliability.md`.
- Use `.agents/skills/playwright-test-authoring/SKILL.md` when creating or changing Playwright tests.
- Tie every test to a current scenario or acceptance criterion. Do not invent product expectations, credentials, test data, browser matrices, or CI policy.

Use `npm install`/`npm ci` and commit `package-lock.json`. Do not add Yarn artifacts or commands.
