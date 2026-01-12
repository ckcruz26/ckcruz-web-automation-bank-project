import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../base/Base";

export class BankAccountsPage extends BasePage{
 
  readonly accountUL = 'ul[data-test="bankaccount-list"]'
  readonly accountLI = 'li';

  readonly bankAccNewButton = '[data-test="bankaccount-new"]';
  readonly accountNameInput = '#bankaccount-bankName-input';
  readonly routingNumberInput = '#bankaccount-routingNumber-input';
  readonly accountNumberInput = '#bankaccount-accountNumber-input';
  readonly createAccountButton = '[data-test="bankaccount-submit"]';


  async displayAccountNamesInList() {
    // UL locator
    const accountUL = await this.getByLocator(this.accountUL);

    // LI locators inside UL
    const accountItems = accountUL.locator(this.accountLI);
    const accountCount = await accountItems.count();

    for (let i = 0; i < accountCount; i++) {
      const accountName = await accountItems
        .nth(i)
        .locator('p')
        .textContent();

      await this.notToBeNull(String(accountName));
      console.log(`Account ${i + 1}:`, accountName);
    }
  }

  async createAccount(
    accountName: string,
    routingNumber: string,
    accountNumber: string
  ) {


    await this.expectVisible(this.bankAccNewButton)
    await this.click(this.bankAccNewButton);

    await this.expectVisible(this.accountNameInput);
    await this.type(this.accountNameInput, accountName);

    await this.expectVisible(this.routingNumberInput);
    await this.type(this.routingNumberInput, routingNumber);
    
    await this.expectVisible(this.accountNumberInput);
    await this.type(this.accountNumberInput, accountNumber);

    await this.expectVisible(this.createAccountButton);
    await this.click(this.createAccountButton);

  }

  async deleteSpecificBankAccount() {
    // UL locator
    const accountUL = await this.getByLocator(this.accountUL);

    // LI locators inside UL
    const accountItems = accountUL.locator(this.accountLI);
    const accountCount = await accountItems.count();

    for (let i = 0; i < accountCount; i++) {
      const item = accountItems.nth(i);
      const accountName = (await item.locator("p").textContent())?.trim();

      if (accountName?.includes("Dummy Bank")) {
        const deleteButton = item.locator('[data-test="bankaccount-delete"]');
        if ((await deleteButton.count()) > 0) {
          console.log(`Deleting account: ${accountName}`);
          await this.expectVisible(deleteButton);
          await this.click(deleteButton);
          await this.page.waitForTimeout(500);
          break; // stop after first deletion
        }
      }
    }
  }
}
