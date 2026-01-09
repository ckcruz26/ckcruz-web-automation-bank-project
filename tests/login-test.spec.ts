import { test } from "../fixtures/BankFixtures";

test.describe("Login Suite", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open(String(process.env.WEB_URL));
  });

  test.afterEach(async ({ loginPage }) => {
    await loginPage.close();
  });


  test("Invalid Login Credentials", async ({ loginPage }) => {
    await loginPage.loginCredentials(
      String(process.env.BANK_UN),
      String(process.env.GENERAL_INVALID_PW)
    );

    await loginPage.verifyErrorMessage("Username or password is invaxlid");
  });

  test.skip("Navigate to Sign Up Page", async ({ loginPage }) => {
    await loginPage.directToSignUpPage();
  });

  test("Valid Login Credentials", async ({ loginPage }) => {
    await loginPage.loginCredentials(
      String(process.env.BANK_UN),
      String(process.env.BANK_PW)
    );
    await loginPage.verifyRedirectToHomePage();
    await loginPage.logoutAccount();

  })
});
