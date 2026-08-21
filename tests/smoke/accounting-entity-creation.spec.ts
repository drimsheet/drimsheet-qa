import { expect, test, type Page } from "@playwright/test";
import { randomUUID } from "node:crypto";

import { getEmail } from "../../config/email.ts";
import { TAGS } from "../../config/tags.ts";
import { drimsheetApi } from "../../utils/api/index.ts";

const password = "P@ssw0rd";
const accountingEntityCases = [
  {
    testName: "user can create an individual accounting entity",
    emailAlias: "ind",
    accountOption: "An Individual",
    entityNamePrefix: null,
    expectedEntityType: "Individual",
  },
  {
    testName: "user can create a sole trader accounting entity",
    emailAlias: "sole",
    accountOption: "A Sole Proprietorship",
    entityNamePrefix: "QA Sole Trader",
    expectedEntityType: "Sole trader",
  },
  {
    testName: "user can create a private company accounting entity",
    emailAlias: "company",
    accountOption: "A Company",
    entityNamePrefix: "QA Private Company",
    expectedEntityType: "Private company",
  },
] as const;

async function completeAccountingEntityForm({
  page,
  accountOption,
  entityName,
  isProfileDerivedName,
}: {
  page: Page;
  accountOption: string;
  entityName: string;
  isProfileDerivedName: boolean;
}) {
  const dialog = page.getByRole("dialog", { name: "Account setup" });
  const nameInput = dialog.getByRole("textbox", { name: "Name" });

  await dialog
    .getByRole("combobox", { name: "Who is this account for?" })
    .click();
  await page.getByRole("option", { name: accountOption, exact: true }).click();

  if (isProfileDerivedName) {
    await expect(nameInput).toHaveValue(entityName);
  } else {
    await nameInput.fill(entityName);
  }

  await dialog.getByRole("button", { name: "Next" }).click();
  await expect(
    dialog.getByText("What currency should your reports use?"),
  ).toBeVisible();
  await dialog.getByRole("button", { name: "Next" }).click();
  await dialog.getByRole("button", { name: "Complete setup" }).click();
}

// TODO: Delete accounting entity smoke test users and their entities when a safe QA cleanup endpoint becomes available.
test.describe("accounting entity creation", () => {
  for (const accountingEntityCase of accountingEntityCases) {
    test(
      accountingEntityCase.testName,
      { tag: [TAGS.E2E, TAGS.SMOKE] },
      async ({ page }) => {
        const runId = randomUUID().replaceAll("-", "").slice(0, 16);
        const userEmail = getEmail([
          "smoke",
          "acct",
          accountingEntityCase.emailAlias,
          runId,
        ]);
        const isProfileDerivedName =
          accountingEntityCase.entityNamePrefix === null;
        const entityName = isProfileDerivedName
          ? "QA Automation"
          : `${accountingEntityCase.entityNamePrefix} ${runId}`;

        await drimsheetApi.auth.signupWithEmail({
          email: userEmail,
          password,
          firstName: "QA",
          lastName: "Automation",
        });

        await page.goto("/auth/signin");
        await page.getByLabel("Email").fill(userEmail);
        await page.getByLabel("Password", { exact: true }).fill(password);
        await page.getByRole("button", { name: "Sign In" }).click();

        await expect(page).toHaveURL("/dashboard");
        const onboardingDialog = page.getByRole("dialog", {
          name: "Account setup",
        });
        await expect(onboardingDialog).toBeVisible();

        await completeAccountingEntityForm({
          page,
          accountOption: accountingEntityCase.accountOption,
          entityName,
          isProfileDerivedName,
        });

        await expect(onboardingDialog).not.toBeVisible();
        const accountManagementTrigger = page.getByRole("button", {
          name: `Open account management for ${entityName}`,
        });
        await expect(accountManagementTrigger).toBeVisible();
        await accountManagementTrigger.click();

        const accountManagementDialog = page.getByRole("dialog", {
          name: "Account management",
        });
        await expect(accountManagementDialog).toBeVisible();
        await expect(accountManagementDialog).toContainText(entityName);
        await expect(accountManagementDialog).toContainText(
          accountingEntityCase.expectedEntityType,
        );
      },
    );
  }
});
