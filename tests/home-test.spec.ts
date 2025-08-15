import path from "path";
import { test } from "../fixtures/BankFixtures";

test.describe("Home Page Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/authentication.json"),
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.WEB_URL));
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("should filter transactions by date", async ({ homePage }) => {
    await homePage.dateFilteringByDate();
  });

  test("should filter transactions by amount", async ({ homePage }) => {
    await homePage.transactionFilteringByAmount();
  });

  test("should create a new transaction", async ({ homePage }) => {
    await homePage.createNewTransaction();
  });

  test("should select different menus", async ({ homePage }) => {
    await homePage.selectingMenus();
  });

});
