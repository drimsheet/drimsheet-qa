/**
 * Set this only after the exact, non-production Drimsheet QA hostname is
 * approved for automated traffic. It is intentionally not environment-driven:
 * APP_URL must not be able to approve its own destination.
 */
export const APPROVED_QA_HOSTNAME: string | undefined = undefined;

export function validateAppUrl(
  rawAppUrl: string | undefined,
  approvedHostname: string | undefined = APPROVED_QA_HOSTNAME,
): string {
  if (!rawAppUrl) {
    throw new Error(
      'APP_URL is required. Copy .env.example to .env and set the approved Drimsheet QA URL.',
    );
  }

  let appUrl: URL;

  try {
    appUrl = new URL(rawAppUrl);
  } catch {
    throw new Error('APP_URL must be a valid absolute HTTPS URL.');
  }

  if (appUrl.protocol !== 'https:') {
    throw new Error('APP_URL must use HTTPS.');
  }

  if (appUrl.username || appUrl.password) {
    throw new Error('APP_URL must not contain credentials.');
  }

  if (!approvedHostname) {
    throw new Error(
      'The approved Drimsheet QA hostname is not configured in config/environment.ts.',
    );
  }

  if (appUrl.hostname !== approvedHostname) {
    throw new Error('APP_URL hostname is not approved for automated testing.');
  }

  return appUrl.toString();
}

export function requireAppUrl(): string {
  return validateAppUrl(process.env.APP_URL);
}
