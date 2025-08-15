import { Page, Locator, expect } from "@playwright/test";

export class BankAccountsPage {
  readonly page: Page;
  readonly accountUL: Locator;
  readonly accountLI: Locator;

  readonly bankAccNewButton: Locator;
  readonly accountNameInput: Locator;
  readonly routingNumberInput: Locator;
  readonly accountNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountUL = page.locator('ul[data-test="bankaccount-list"]');
    this.accountLI = this.accountUL.locator("li");

    //bank account form locators
    this.bankAccNewButton = page.locator('[data-test="bankaccount-new"]');
    this.accountNameInput = page.getByRole("textbox", { name: "Bank Name" });
    this.routingNumberInput = page.getByRole("textbox", {
      name: "Routing Number",
    });
    this.accountNumberInput = page.getByRole("textbox", {
      name: "Account Number",
    });

    this.createAccountButton = page.locator('[data-test="bankaccount-submit"]');
  }

  async displayAccountNamesInList() {
    const accountCount = await this.accountLI.count();

    for (let i = 0; i < accountCount; i++) {
      const accountName = await this.accountLI
        .nth(i)
        .locator("p")
        .textContent();
      await expect(accountName).not.toBeNull();
    }
  }

  async createAccount(
    accountName: string,
    routingNumber: string,
    accountNumber: string
  ) {
    await expect(this.bankAccNewButton).toBeVisible();
    await this.bankAccNewButton.click();

    await expect(this.accountNameInput).toBeVisible();
    await this.accountNameInput.fill(accountName);

    await expect(this.routingNumberInput).toBeVisible();
    await this.routingNumberInput.fill(routingNumber);

    await expect(this.accountNumberInput).toBeVisible();
    await this.accountNumberInput.fill(accountNumber);

    await expect(this.createAccountButton).toBeVisible();
    await this.createAccountButton.click();
  }

  async deleteSpecificBankAccount() {
    const accountCount = await this.accountLI.count();

    for (let i = 0; i < accountCount; i++) {
      const item = this.accountLI.nth(i);
      const accountName = (await item.locator("p").textContent())?.trim();

      if (accountName?.includes("Dummy Bank")) {
        const deleteButton = item.locator('[data-test="bankaccount-delete"]');
        if ((await deleteButton.count()) > 0) {
          await deleteButton.click();
          await this.page.waitForTimeout(500);
          break; // stop after first deletion
        }
      }
    }
  }
}
