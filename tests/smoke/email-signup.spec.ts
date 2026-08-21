import { expect, test } from "@playwright/test";

import { getEmail } from "../../config/email.ts";
import { TAGS } from "../../config/tags.ts";
import { EZohoMailboxFolderName } from "../../types/zoho-mail.types.ts";
import {
  deleteEmail,
  getEmailContentIfAvailable,
} from "../../utils/zoho-mail.ts";
import { extractVerificationUrl } from "../../utils/html-parser.ts";
import { waitForContent } from "../../utils/wait-for-content.ts";

const TEST_TIMEOUT_MS = 60_000;
const VERIFICATION_EMAIL_SUBJECT = "Action Required: Verify Your Email Address";

const userEmail = getEmail(["smoke", "auth", "signup"]);

// TODO: Delete the signup smoke test user when a safe QA cleanup endpoint becomes available.
test.describe("email signup", () => {
  test.describe.configure({ mode: "serial" });

  let signupDateCutoff: Date;

  test(
    "user can enter their details",
    { tag: [TAGS.E2E, TAGS.SMOKE] },
    async ({ page }) => {
      const password = `P@ssw0rd`;
      const firstNameInput = page.getByLabel("First name");
      const lastNameInput = page.getByLabel("Last name");
      const emailInput = page.getByLabel("Email");
      const passwordInput = page.getByLabel("Password", { exact: true });

      await page.goto("/auth/signup");
      await firstNameInput.fill("QA");
      await lastNameInput.fill("Automation");
      await emailInput.fill(userEmail);
      await passwordInput.fill(password);

      await expect(firstNameInput).toHaveValue("QA");
      await expect(lastNameInput).toHaveValue("Automation");
      await expect(emailInput).toHaveValue(userEmail);
      await expect(passwordInput).toHaveValue(password);

      signupDateCutoff = new Date();

      await page.getByRole("button", { name: "Create account" }).click();

      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Account created successfully!",
        }),
      ).toBeVisible();
      await expect(page.getByRole("status")).toHaveText(
        "Please check your email for a verification link",
      );
    },
  );

  test(
    "user can find the verification link and follow it to the dashboard",
    { tag: [TAGS.E2E, TAGS.SMOKE] },
    async ({ page }) => {
      test.setTimeout(TEST_TIMEOUT_MS);

      const emailContentGetter = () =>
        getEmailContentIfAvailable({
          folderName: EZohoMailboxFolderName.Inbox,
          toAddress: userEmail,
          subject: VERIFICATION_EMAIL_SUBJECT,
          dateCutoff: signupDateCutoff,
        });
      const email = await waitForContent(emailContentGetter);
      let verificationUrl: URL;

      try {
        verificationUrl = extractVerificationUrl(email.content);
      } finally {
        await deleteEmail(email);
      }

      await page.goto(verificationUrl.href);

      await expect(page).toHaveURL("/dashboard");
      await expect(
        page.getByRole("dialog", { name: "Account setup" }),
      ).toBeVisible();
    },
  );
});
