import path from "path";
import { test } from "../fixtures/BankFixtures";
import { faker } from "@faker-js/faker";

test.describe("My Account Page Suite", () => {
  test.use({
    storageState: path.resolve(__dirname, "../auth/authentication.json"),
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.WEB_URL + "user/settings"));
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("should update account details", async ({ myAccountPage }) => {
    await myAccountPage.updateAccountDetails(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.internet.email(),
      faker.string.numeric(11)
    );
  });

  test("clear the values in the account details fields", async ({ myAccountPage }) => {
    await myAccountPage.clearAccountDetails("", "", "", "");
  });
});
