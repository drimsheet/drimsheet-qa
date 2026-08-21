# Drimsheet QA

Playwright smoke and end-to-end tests for exact-host-allowlisted Drimsheet environments, including localhost and deployed QA hosts. Playwright does not start the target application, and this repository must never target production.

## Current status

The npm/Playwright foundation and environment guard are ready. Live product tests remain conditional on confirmed scenarios, credentials, and disposable test data. CI wiring is deferred until its provider and execution policy are selected.

## Setup

Use Node.js 22 LTS and npm only; commit `package-lock.json` and do not introduce Yarn commands or artifacts.

```bash
npm ci
npx playwright install chromium
cp .env.example .env
```

Set `APP_URL` in `.env` to an HTTP(S) URL on one of the committed hostnames: `localhost`, `dev.app.drimsheet.com`, or `staging.app.drimsheet.com`. The guard requires exact hostname equality; it does not accept subdomains or allow runtime input to expand the list. When targeting localhost, start the application separately before running Playwright.

Credentials belong only in local `.env` files or protected CI secrets. Add credential variables to `.env.example` only when a confirmed scenario consumes them, and never print their values.

## Zoho QA mailbox helper

`utils/zoho-mail.ts` reads messages from the dedicated QA mailbox. The QA team
owns its mailbox identity and OAuth configuration. The seven `ZOHO_MAIL_*`
variables are documented in `.env.example`; none has a default.
`ZOHO_MAIL_CLIENT_SECRET` and `ZOHO_MAIL_REFRESH_TOKEN` are secrets.

`getEmailContent` scans the newest 200 messages in the selected folder, applies
the requested filters, and returns the newest matching message's HTML content
and identifiers. `deleteEmail` moves that positively identified message to
Trash without permanently expunging it.

```ts
import { EZohoMailboxFolderName } from './types/zoho-mail.types.ts';
import { deleteEmail, getEmailContent } from './utils/zoho-mail.ts';

const message = await getEmailContent({
  folderName: EZohoMailboxFolderName.Inbox,
  subject: 'Action Required: Verify Your Email Address',
  toAddress: 'qa.automation@drimsheet.com',
  dateCutoff: testStartedAt,
});

await deleteEmail(message);
```

`subject` is a case-insensitive substring match. `fromAddress` is an exact,
case-insensitive match; `toAddress` is a case-insensitive substring match.
`dateCutoff` accepts a `Date` and compares it with the received timestamp. The
optional `isUnread` filter selects unread or read messages.

## Commands

```bash
npm run test:config      # verify the URL guard without launching a browser
npm run typecheck
npm run test:smoke       # tests/smoke/*.spec.ts
npm run test:e2e         # tests/e2e/<namespace>/*.spec.ts
npm run test:a11y        # @a11y tests
npm run test:e2e:headed
npm run test:e2e:ui
npm run test:e2e:report
```

CI should use `npm ci`; local dependency changes use `npm install`. The browser commands fail before launch when `APP_URL` is missing, malformed, uses a non-HTTP(S) protocol, or is outside the committed allowlist.

## Test organization and tags

Place short, critical, safe-to-repeat checks directly under `tests/smoke` and broader confirmed journeys under `tests/e2e/<namespace>`, grouped by product area. Use Playwright's standard `.spec.ts` suffix for both suites. The `smoke` and `e2e` Playwright projects select these non-overlapping directories.

Tags describe overlapping coverage and allow cross-suite filtering; they do not determine whether a file belongs to the smoke or E2E command. Import tag values from `config/tags.ts` and use Playwright's structured `tag` option. Smoke tests use both `TAGS.E2E` and `TAGS.SMOKE`.

| Tag | Meaning |
| --- | --- |
| `@e2e` | Every browser-level product journey against deployed Drimsheet. |
| `@smoke` | A fast, critical, repeatable check; also tag it `@e2e`. |
| `@a11y` | A journey with explicit accessibility assertions; normally also `@e2e`. |

Do not add a product assertion until its expected user-visible outcome is confirmed. Keep setup local to a scenario until current repetition justifies a fixture. Mutating tests must use uniquely identifiable, owned data and may clean up only records created by that test.

See `AGENTS.md` for the repository rules and authoring workflow.
