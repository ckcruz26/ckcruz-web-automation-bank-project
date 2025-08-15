import { test } from "../fixtures/BankFixtures";


test.describe("Sign Up Suite", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(String(process.env.WEB_URL + "signup")); ;
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("should allow a user to sign up successfully", async ({ signUpPage }) => {
    await signUpPage.fillUpRequiredFields();
    await signUpPage.Page.waitForURL(/.*3000/);
  });

  test("should show error message when required fields are skipped", async ({ signUpPage }) => {
    const errorMessage = "First Name is required";
    await signUpPage.skipAllRequiredFields(errorMessage);
    await signUpPage.errorMsgLocator.waitFor();
    await signUpPage.Page.waitForURL(/.*signup/);
  });
});
