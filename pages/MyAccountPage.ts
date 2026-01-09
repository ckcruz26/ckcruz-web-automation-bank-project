import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../base/Base";
import { th } from "@faker-js/faker";

export class MyAccountPage extends BasePage {
  readonly accountFirstNameField =
    '[data-test="user-settings-firstName-input"]';
  readonly accountLastNameField = '[data-test="user-settings-lastName-input"]';
  readonly accountEmailField = '[data-test="user-settings-email-input"]';
  readonly accountPhoneField = '[data-test="user-settings-phoneNumber-input"]';
  readonly accountButtonSave = '[data-test="user-settings-submit"]';

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
    const headingSettingsLabel = await this.getElementByRole(
      "heading",
      "User Settings"
    );

    await this.expectVisible(headingSettingsLabel);
    
    await this.expectVisible(this.accountFirstNameField);
    await this.type(this.accountFirstNameField, firstName);
    
    await this.expectVisible(this.accountLastNameField);
    await this.type(this.accountLastNameField, lastName);
    
    await this.expectVisible(this.accountEmailField);
    await this.type(this.accountEmailField, email);

    await this.expectVisible(this.accountPhoneField);
    await this.type(this.accountPhoneField, phone);

    await this.expectVisible(this.accountButtonSave);
    await this.click(this.accountButtonSave);

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
    const headingSettingsLabel = await this.getElementByRole(
      "heading",
      "User Settings"
    );
    await this.expectVisible(headingSettingsLabel);

    await this.expectVisible(this.accountFirstNameField);
    await this.type(this.accountFirstNameField, firstName);
    
    await this.expectVisible(this.accountLastNameField);
    await this.type(this.accountLastNameField, lastName);
    
    await this.expectVisible(this.accountEmailField);
    await this.type(this.accountEmailField, email);

    await this.expectVisible(this.accountPhoneField);
    await this.type(this.accountPhoneField, phone);

    await this.isElementDisabled(this.accountButtonSave);
    
  }
}
