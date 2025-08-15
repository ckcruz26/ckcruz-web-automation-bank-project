import { test } from "../fixtures/BankFixtures";

test.describe("Login Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.WEB_URL));
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Valid Login Credentials", async ({ loginPage }) => {
    await loginPage.loginCredentials(
      String(process.env.BANK_UN),
      String(process.env.BANK_PW)
    );
    await loginPage.verifySuccessfulLogin();
  });

  test("Invalid Login Credentials", async ({ loginPage }) => {
    await loginPage.loginCredentials(
      String(process.env.BANK_UN),
      String(process.env.GENERAL_INVALID_PW)
    );

    await loginPage.verifyErrorMessage("Username or password is invaxlid");
  });

  test("Navigate to Sign Up Page", async ({ loginPage }) => {
    await loginPage.directToSignUpPage();
  });

  test("Logout the Account", async ({ loginPage }) => {
    await loginPage.loginCredentials(
      String(process.env.BANK_UN),
      String(process.env.BANK_PW)
    );
    await loginPage.verifySuccessfulLogin();
    await loginPage.logoutAccount();

  })
});
