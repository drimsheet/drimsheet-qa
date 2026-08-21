import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";

import { getEmail } from "../../config/email.ts";
import { TAGS } from "../../config/tags.ts";
import { drimsheetApi } from "../../utils/api/index.ts";

const userEmail = getEmail([
  "smoke",
  "auth",
  "login",
  randomUUID().replaceAll("-", "").slice(0, 16),
]);
const password = "P@ssw0rd";

// TODO: Delete login smoke test users when a safe QA cleanup endpoint becomes available.
test.describe("email login", () => {
  test.beforeAll(async () => {
    await drimsheetApi.auth.signupWithEmail({
      email: userEmail,
      password,
      firstName: "QA",
      lastName: "Automation",
    });
  });

  test(
    "user can log in with email and password",
    { tag: [TAGS.E2E, TAGS.SMOKE] },
    async ({ page }) => {
      await page.goto("/auth/signin");
      await page.getByLabel("Email").fill(userEmail);
      await page.getByLabel("Password", { exact: true }).fill(password);
      await page.getByRole("button", { name: "Sign In" }).click();

      await expect(page).toHaveURL("/dashboard");
      await expect(
        page.getByRole("dialog", { name: "Account setup" }),
      ).toBeVisible();
    },
  );
});
