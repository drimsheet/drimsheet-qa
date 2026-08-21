export const APPROVED_QA_HOSTNAMES: string[] = [
  "localhost",
  "dev.app.drimsheet.com",
  "staging.app.drimsheet.com",
] as const;

export function validateAppUrl(rawAppUrl: string | undefined): string {
  if (!rawAppUrl) {
    throw new Error(
      "APP_URL is required. Copy .env.example to .env and set the approved Drimsheet QA URL.",
    );
  }

  let appUrl: URL;

  try {
    appUrl = new URL(rawAppUrl);
  } catch {
    throw new Error("APP_URL must be a valid absolute URL.");
  }

  if (appUrl.protocol !== "http:" && appUrl.protocol !== "https:") {
    throw new Error("APP_URL must use HTTP or HTTPS.");
  }

  if (appUrl.username || appUrl.password) {
    throw new Error("APP_URL must not contain credentials.");
  }

  if (!APPROVED_QA_HOSTNAMES.includes(appUrl.hostname)) {
    throw new Error("APP_URL hostname is not approved for automated testing.");
  }

  return appUrl.toString();
}

export function requireAppUrl(): string {
  return validateAppUrl(process.env.APP_URL);
}
