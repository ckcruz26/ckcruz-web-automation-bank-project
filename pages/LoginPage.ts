import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly Page;
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly errorMsgLocator: Locator;

  readonly signUpLink: Locator;
  readonly svgLogo: Locator;

  readonly logoutMenu: Locator;

  constructor(page: Page) {
    this.Page = page;
    this.userNameField = page.getByRole("textbox", { name: "Username" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.signInButton = page.locator('[data-test="signin-submit"]');
    this.errorMsgLocator = page.locator('[data-test="signin-error"]');

    this.signUpLink = page.locator('div.MuiGrid-root a[data-test="signup"]');

    this.svgLogo = page.locator(".SignUpForm-logo");

    this.logoutMenu = page.locator('[data-test="sidenav-signout"]');
  }

  /* @param username: The username to be filled in the login form.
   * @param password: The password to be filled in the login form.
   * Logs in with the provided username and password.
   * Waits for the page to load after login.
   */
  async loginCredentials(username: string, password: string) {
    await this.userNameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
    await this.Page.waitForTimeout(2000); // wait for the page to load after login
  }

  /*
   * Verifies that the login was successful by checking the URL.
   */
  async verifySuccessfulLogin() {
    await expect(this.Page).toHaveURL(/.*3000/);
  }

  /* @param : expectedError: The expected error message to be displayed.
   * Verifies that the error message is visible and matches the expected error.
   */
  async verifyErrorMessage(expectedError: string) {
    try {
      await expect(this.errorMsgLocator).toBeVisible();
      await expect(this.errorMsgLocator).toHaveText(expectedError);
    } catch (error) {
      throw new Error(`Error verifying error message: ${error}`);
    }
  }

  /*
   * Directs the user to the Sign Up page.
   * Waits for the Sign Up link to be visible and clicks it.
   */
  async directToSignUpPage() {
    await expect(this.signUpLink).toBeVisible();
    await this.signUpLink.evaluate((el: HTMLElement) => el.click());
    await this.Page.waitForTimeout(2000);
    await this.Page.waitForURL(/.*signup/);
    await expect(this.Page).toHaveURL(/.*signup/);
    await expect(this.svgLogo).toBeVisible();
  }

  /**
   * Logs out the user account.
   */

  async logoutAccount() {
    await expect(this.logoutMenu).toBeVisible();
    await this.logoutMenu.click();
    await this.Page.waitForTimeout(2000); // wait for the page to load after logout
    await expect(this.Page).toHaveURL(/.*signin/);
  }
}
