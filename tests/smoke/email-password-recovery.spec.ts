import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";

import { getEmail } from "../../config/email.ts";
import { TAGS } from "../../config/tags.ts";
import { EZohoMailboxFolderName } from "../../types/zoho-mail.types.ts";
import { drimsheetApi } from "../../utils/api/index.ts";
import { extractPasswordResetUrl } from "../../utils/html-parser.ts";
import { waitForContent } from "../../utils/wait-for-content.ts";
import {
  deleteEmail,
  getEmailContentIfAvailable,
} from "../../utils/zoho-mail.ts";

const TEST_TIMEOUT_MS = 60_000;
const PASSWORD_RESET_EMAIL_SUBJECT = "Reset your password";
const originalPassword = "P@ssw0rd";
const newPassword = "N3wP@ssw0rd";
const userEmail = getEmail([
  "smoke",
  "auth",
  "password-recovery",
  randomUUID().replaceAll("-", "").slice(0, 16),
]);

// TODO: Delete password recovery smoke test users when a safe QA cleanup endpoint becomes available.
test.describe("email password recovery", () => {
  test(
    "user can recover their password through email",
    { tag: [TAGS.E2E, TAGS.SMOKE] },
    async ({ page }) => {
      test.setTimeout(TEST_TIMEOUT_MS);

      await drimsheetApi.auth.signupWithEmail({
        email: userEmail,
        password: originalPassword,
        firstName: "QA",
        lastName: "Automation",
      });

      await page.goto("/auth/signin");
      await page.getByRole("link", { name: "Forgot password?" }).click();
      await expect(page).toHaveURL("/auth/forgot-password");

      await page.getByLabel("Email").fill(userEmail);
      const passwordResetDateCutoff = new Date();

      await page
        .getByRole("button", { name: "Get password reset link" })
        .click();

      await expect(
        page.getByRole("heading", { level: 1, name: "Email Sent" }),
      ).toBeVisible();
      await expect(page.getByRole("status")).toHaveText(
        "A password reset link was sent to your email.",
      );

      const emailContentGetter = () =>
        getEmailContentIfAvailable({
          folderName: EZohoMailboxFolderName.Inbox,
          toAddress: userEmail,
          subject: PASSWORD_RESET_EMAIL_SUBJECT,
          dateCutoff: passwordResetDateCutoff,
        });
      const email = await waitForContent(emailContentGetter);
      let passwordResetUrl: URL;

      try {
        passwordResetUrl = extractPasswordResetUrl(email.content);
      } finally {
        await deleteEmail(email);
      }

      await page.goto(passwordResetUrl.href);
      await page.getByLabel("New Password").fill(newPassword);
      await page.getByLabel("Confirm Password").fill(newPassword);
      await page.getByRole("button", { name: "Reset password" }).click();

      await expect(page).toHaveURL("/dashboard");
      await expect(
        page.getByRole("dialog", { name: "Account setup" }),
      ).toBeVisible();
    },
  );
});
