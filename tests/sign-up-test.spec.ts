import { test } from "../fixtures/BankFixtures";


test.describe("Sign Up Suite", () => {

  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.open(String(process.env.WEB_URL + "signup")); 
  });

  test.afterEach(async ({ signUpPage }) => {
    await signUpPage.close();
  });

  test("should allow a user to sign up successfully", async ({ signUpPage }) => {
    await signUpPage.fillUpRequiredFields();
    await signUpPage.containsLinkValue('3000');
    await signUpPage.waitForPageReady();
  });

  test("should show error message when required fields are skipped", async ({ signUpPage }) => {
    const errorMessage = "First Name is required";
    await signUpPage.skipAllRequiredFields(errorMessage);
    await signUpPage.containsLinkValue('signup');
  });
});
