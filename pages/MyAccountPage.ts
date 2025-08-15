import { Page, Locator, expect } from "@playwright/test";

export class MyAccountPage {
  readonly Page;

  readonly headingSettingsLabel: Locator;
  readonly accountFirstNameField: Locator;
  readonly accountLastNameField: Locator;
  readonly accountEmailField: Locator;
  readonly accountPhoneField: Locator;
  readonly accountButtonSave: Locator;

  constructor(page: Page) {
    this.Page = page;
    // Locators for the account details fields
    this.headingSettingsLabel = page.getByRole("heading", {
      name: "User Settings",
    });
    this.accountFirstNameField = page.locator(
      '[data-test="user-settings-firstName-input"]'
    );
    this.accountLastNameField = page.locator(
      '[data-test="user-settings-lastName-input"]'
    );
    this.accountEmailField = page.locator(
      '[data-test="user-settings-email-input"]'
    );
    this.accountPhoneField = page.locator(
      '[data-test="user-settings-phoneNumber-input"]'
    );
    this.accountButtonSave = page.locator('[data-test="user-settings-submit"]');
  }

  /*
   * Updates the account details with the provided first name, last name, email, and phone.
   * Expects the settings heading to be visible before filling in the details.
   *
   *  @param firstName: The first name to be filled in.
   *  @param lastName: The last name to be filled in.
   *  @param email: The email to be filled in.
   *  @param phone: The phone number to be filled in.
   */

  async updateAccountDetails(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    await expect(this.headingSettingsLabel).toBeVisible();
    await this.headingSettingsLabel.isVisible();

    await expect(this.accountFirstNameField).toBeVisible();
    await this.accountFirstNameField.fill(firstName);

    await expect(this.accountLastNameField).toBeVisible();
    await this.accountLastNameField.fill(lastName);

    await expect(this.accountEmailField).toBeVisible();
    await this.accountEmailField.fill(email);

    await expect(this.accountPhoneField).toBeVisible();
    await this.accountPhoneField.fill(phone);

    await expect(this.accountButtonSave).toBeVisible();
    await this.accountButtonSave.click();
  }

  /*
   * Clears the account details fields with the provided first name, last name, email, and phone.
   * Expects the settings heading to be visible before clearing the details.
   *
   *  @param firstName: The first name to be cleared.
   *  @param lastName: The last name to be cleared.
   *  @param email: The email to be cleared.
   *  @param phone: The phone number to be cleared.
   */
  async clearAccountDetails(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {
    await expect(this.headingSettingsLabel).toBeVisible();
    await this.headingSettingsLabel.isVisible();

    await expect(this.accountFirstNameField).toBeVisible();
    await this.accountFirstNameField.fill(firstName);

    await expect(this.accountLastNameField).toBeVisible();
    await this.accountLastNameField.fill(lastName);

    await expect(this.accountEmailField).toBeVisible();
    await this.accountEmailField.fill(email);

    await expect(this.accountPhoneField).toBeVisible();
    await this.accountPhoneField.fill(phone);

    await expect(this.accountButtonSave).toBeDisabled();
  }
}
