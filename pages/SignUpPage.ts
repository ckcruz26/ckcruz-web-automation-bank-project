import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class SignUpPage {
  readonly Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly userNameField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly signUpButton: Locator;

  readonly errorMsgLocator: Locator;

  constructor(page: Page) {
    this.Page = page;
    this.firstNameField = page.getByRole("textbox", { name: "First Name" });
    this.lastNameField = page.getByRole("textbox", { name: "Last Name" });
    this.userNameField = page.getByRole("textbox", { name: "Username" });
    this.passwordField = page.locator("#password");
    this.confirmPasswordField = page.locator("#confirmPassword");
    this.signUpButton = page.locator('[data-test="signup-submit"]');

    this.errorMsgLocator = page.locator("#firstName-helper-text");
  }

  /*
   * Fills up the required fields with random data and submits the form.
   * Uses faker to generate random first name, last name, username, and password.
   */
  async fillUpRequiredFields() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const userName = faker.internet.username();
    const password = faker.internet.password();

    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.userNameField.fill(userName);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    await this.signUpButton.click();
  }

  /* @param errorMessage: The expected error message to be displayed.
   *  Skipping all required fields and clicking the sign-up button.
   *  Expects an error message to be visible.
   */
  async skipAllRequiredFields(errorMessage: string) {
    await this.signUpButton.click();
    await expect(this.errorMsgLocator).toBeVisible();
    await expect(this.errorMsgLocator).toHaveText(errorMessage);
  }
}
