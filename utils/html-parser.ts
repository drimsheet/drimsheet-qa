import { load } from "cheerio";
import { APP_URL } from "../config/vars.ts";

export function extractVerificationUrl(content: string): URL {
  if (!APP_URL) {
    throw new Error("APP_URL is required to validate the verification link.");
  }

  const $ = load(content);
  const verificationLinks = $("a").filter((_, element) => {
    const normalizedText = $(element).text().replace(/\s+/g, " ").trim();

    return normalizedText === "Verify email";
  });

  if (verificationLinks.length !== 1) {
    throw new Error(
      `Expected exactly one Verify email link, found ${verificationLinks.length}.`,
    );
  }

  const href = verificationLinks.first().attr("href")?.trim();

  if (!href) {
    throw new Error("The Verify email link does not have an href.");
  }

  const appUrl = new URL(APP_URL);
  const verificationUrl = new URL(href, appUrl);

  if (
    verificationUrl.origin !== appUrl.origin ||
    verificationUrl.username ||
    verificationUrl.password
  ) {
    throw new Error(
      "The verification link does not use the approved QA origin.",
    );
  }

  if (verificationUrl.pathname !== "/auth/signup/complete") {
    throw new Error("The verification link has an unexpected path.");
  }

  if (!verificationUrl.searchParams.get("token")?.trim()) {
    throw new Error("The verification link does not include a token.");
  }

  return verificationUrl;
}
