import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../base/Base";

export class LoginPage extends BasePage {

  readonly userNameField = '#username'
  readonly passwordField = '#password'
  readonly signInButton ='[data-test="signin-submit"]';
  readonly signUpLink = '[data-test="signup"]'
  readonly svgLogo = '.SignUpForm-logo'
  readonly logoutMenu = '[data-test="sidenav-signout"]'
  readonly errorMsgAlert = '[data-test="signin-error"]'

  /* @param username: The username to be filled in the login form.
   * @param password: The password to be filled in the login form.
   * Logs in with the provided username and password.
   * Waits for the page to load after login.
   */
  async loginCredentials(username: string, password: string) {

    await this.type(this.userNameField, username)
    await this.type(this.passwordField, password)
    await this.click(this.signInButton)
    await this.waitForPageReady();
  }

  /*
   * Verifies that the login was successful by checking the URL.
   */
  async verifyRedirectToHomePage() {
    await this.containsTitle('Cypress Real World App')
    await this.containsLinkValue('3000')
  }

  /* @param : expectedError: The expected error message to be displayed.
   * Verifies that the error message is visible and matches the expected error.
   */
  async verifyErrorMessage(expectedError: string) {
    try {
         await this.expectVisible(expectedError)
         await this.expectText(this.errorMsgAlert,expectedError)
    } catch (error) {
      throw new Error(`Error verifying error message: ${error}`);
    }
  }

  /*
   * Directs the user to the Sign Up page.
   * Waits for the Sign Up link to be visible and clicks it.
   */
  async directToSignUpPage() {
    await this.expectVisible(this.signUpLink);
    await this.click(this.signUpLink);
    await this.waitForTimeoutElement(2000);
    await this.containsLinkValue('signup');
    await this.expectVisible(this.svgLogo);
  }

  /**
   * Logs out the user account.
   */

  async logoutAccount() {
   
    await this.expectVisible(this.logoutMenu);
    await this.click(this.logoutMenu);
    await this.waitForTimeoutElement(2000);
    await this.waitForPageReady();
    await this.containsLinkValue('signin');
  }
}
