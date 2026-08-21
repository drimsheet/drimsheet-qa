import assert from 'node:assert/strict';
import test from 'node:test';

import { APPROVED_QA_HOSTNAMES, validateAppUrl } from './environment.ts';

test('rejects a missing APP_URL', () => {
  assert.throws(
    () => validateAppUrl(undefined),
    /APP_URL is required/,
  );
});

test('rejects a malformed APP_URL', () => {
  assert.throws(
    () => validateAppUrl('not-a-url'),
    /valid absolute URL/,
  );
});

test('rejects an unsupported APP_URL protocol', () => {
  assert.throws(
    () => validateAppUrl('ftp://localhost'),
    /must use HTTP or HTTPS/,
  );
});

test('rejects credentials embedded in APP_URL', () => {
  assert.throws(
    () =>
      validateAppUrl('https://user:secret@dev.app.drimsheet.com'),
    /must not contain credentials/,
  );
});

test('rejects an unapproved hostname', () => {
  assert.throws(
    () => validateAppUrl('https://app.drimsheet.com'),
    /hostname is not approved/,
  );
});

for (const approvedHostname of APPROVED_QA_HOSTNAMES) {
  test(`accepts the approved HTTPS hostname ${approvedHostname}`, () => {
    assert.equal(
      validateAppUrl(`https://${approvedHostname}/app`),
      `https://${approvedHostname}/app`,
    );
  });
}

test('accepts allowlisted localhost over HTTP', () => {
  assert.equal(
    validateAppUrl('http://localhost:5173/auth/signup'),
    'http://localhost:5173/auth/signup',
  );
});
