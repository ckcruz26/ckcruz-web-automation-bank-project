import { Page, Locator, expect } from "@playwright/test";
import { faker, th } from "@faker-js/faker";
import BasePage from "../base/Base";

export class SignUpPage extends BasePage {
  readonly firstNameField = "#firstName";
  readonly lastNameField = "#lastName";
  readonly userNameField = "#username";
  readonly passwordField = "#password";
  readonly confirmPasswordField = "#confirmPassword";
  readonly signUpButton = '[data-test="signup-submit"]';

  readonly errorMsgLocator = "#firstName-helper-text";

  /*
   * Fills up the required fields with random data and submits the form.
   * Uses faker to generate random first name, last name, username, and password.
   */
  async fillUpRequiredFields() {
    const formData = [
      { locator: this.firstNameField, value: faker.person.firstName() },
      { locator: this.lastNameField, value: faker.person.lastName() },
      { locator: this.userNameField, value: faker.internet.username() },
      { locator: this.passwordField, value: '1231313131' },
      { locator: this.confirmPasswordField, value: '1231313131' },
    ];

    for (const { locator, value } of formData) {
      await this.expectVisible(locator);
      await this.type(locator, value);
    }

    await this.isElementEnabled(this.signUpButton);
    await this.expectVisible(this.signUpButton);
    await this.click(this.signUpButton);
  }

  /* @param errorMessage: The expected error message to be displayed.
   *  Skipping all required fields and clicking the sign-up button.
   *  Expects an error message to be visible.
   */
  async skipAllRequiredFields(errorMessage: string) {
    await this.isElementEnabled(this.signUpButton);
    await this.expectVisible(this.signUpButton);
    await this.click(this.signUpButton);
    await this.expectVisible(this.errorMsgLocator);
    await this.expectText(this.errorMsgLocator, errorMessage);
  }
}
