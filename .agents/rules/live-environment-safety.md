# Live Environment Safety

- Never run automated tests against production.
- Require an absolute HTTPS `APP_URL` whose hostname exactly matches the committed, environment-owner-approved QA hostname. Do not add a routine bypass or let runtime input approve its own destination.
- Keep credentials out of source, command output, logs, and committed files. Use local `.env` files or protected CI secrets.
- Use dedicated QA accounts and owned, disposable or resettable data. Stop when environment ownership, traffic approval, or cleanup safety is unclear.
- Avoid destructive bulk operations. A test may clean up only records it created and can positively identify.
- Do not make recurring smoke coverage mutate shared state when deterministic isolation and cleanup are unavailable.
- Preserve useful failure artifacts, but design tests so screenshots, video, and traces do not expose sensitive account data unnecessarily.
