import assert from 'node:assert/strict';
import test from 'node:test';

import { validateAppUrl } from './environment.ts';

const APPROVED_HOSTNAME = 'qa.drimsheet.test';

test('rejects a missing APP_URL', () => {
  assert.throws(
    () => validateAppUrl(undefined, APPROVED_HOSTNAME),
    /APP_URL is required/,
  );
});

test('rejects a malformed APP_URL', () => {
  assert.throws(
    () => validateAppUrl('not-a-url', APPROVED_HOSTNAME),
    /valid absolute HTTPS URL/,
  );
});

test('rejects a non-HTTPS APP_URL', () => {
  assert.throws(
    () => validateAppUrl(`http://${APPROVED_HOSTNAME}`, APPROVED_HOSTNAME),
    /must use HTTPS/,
  );
});

test('rejects credentials embedded in APP_URL', () => {
  assert.throws(
    () =>
      validateAppUrl(
        `https://user:secret@${APPROVED_HOSTNAME}`,
        APPROVED_HOSTNAME,
      ),
    /must not contain credentials/,
  );
});

test('rejects an unapproved hostname', () => {
  assert.throws(
    () => validateAppUrl('https://production.drimsheet.test', APPROVED_HOSTNAME),
    /hostname is not approved/,
  );
});

test('accepts the exact approved HTTPS hostname', () => {
  assert.equal(
    validateAppUrl(`https://${APPROVED_HOSTNAME}/app`, APPROVED_HOSTNAME),
    `https://${APPROVED_HOSTNAME}/app`,
  );
});
