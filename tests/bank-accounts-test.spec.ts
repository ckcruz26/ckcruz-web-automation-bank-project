import path from "path";
import { test } from "../fixtures/BankFixtures";
import { faker } from "@faker-js/faker";

test.describe("Home Page Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/authentication.json"),
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.WEB_URL + "bankaccounts"));
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("bank accounts display", async ({ bankAccountsPage }) => {
    await bankAccountsPage.displayAccountNamesInList();
  });

  test("create bank account", async ({ bankAccountsPage }) => {
    for (let i = 0; i < 3; i++) {
      await bankAccountsPage.createAccount(
        faker.company.name() + "- Dummy Bank",
        faker.finance.routingNumber(),
        faker.string.numeric(10)
      );
    }
  });

  test("delete bank accounts", async ({ bankAccountsPage }) => {
    await bankAccountsPage.deleteSpecificBankAccount();
  });
});
