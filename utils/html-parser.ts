import { load } from "cheerio";
import { APP_URL } from "../config/vars.ts";

export function extractVerificationUrl(content: string): URL {
  return extractAuthActionUrl(content, {
    linkText: "Verify email",
    linkDescription: "verification",
    expectedPathname: "/auth/signup/complete",
  });
}

export function extractPasswordResetUrl(content: string): URL {
  return extractAuthActionUrl(content, {
    linkText: "Reset password",
    linkDescription: "password reset",
    expectedPathname: "/auth/reset-password",
  });
}

function extractAuthActionUrl(
  content: string,
  options: {
    linkText: string;
    linkDescription: string;
    expectedPathname: string;
  },
): URL {
  const { linkText, linkDescription, expectedPathname } = options;

  if (!APP_URL) {
    throw new Error(
      `APP_URL is required to validate the ${linkDescription} link.`,
    );
  }

  const $ = load(content);
  const actionLinks = $("a").filter((_, element) => {
    const normalizedText = $(element).text().replace(/\s+/g, " ").trim();

    return normalizedText === linkText;
  });

  if (actionLinks.length !== 1) {
    throw new Error(
      `Expected exactly one ${linkText} link, found ${actionLinks.length}.`,
    );
  }

  const href = actionLinks.first().attr("href")?.trim();

  if (!href) {
    throw new Error(`The ${linkText} link does not have an href.`);
  }

  const appUrl = new URL(APP_URL);
  const actionUrl = new URL(href, appUrl);

  if (
    actionUrl.origin !== appUrl.origin ||
    actionUrl.username ||
    actionUrl.password
  ) {
    throw new Error(
      `The ${linkDescription} link does not use the approved QA origin.`,
    );
  }

  if (actionUrl.pathname !== expectedPathname) {
    throw new Error(`The ${linkDescription} link has an unexpected path.`);
  }

  if (!actionUrl.searchParams.get("token")?.trim()) {
    throw new Error(`The ${linkDescription} link does not include a token.`);
  }

  return actionUrl;
}
