import { faker } from "@faker-js/faker";
import { Page, Locator, expect } from "@playwright/test";
import BasePage from "../base/Base";

export class HomePage extends BasePage {
  // Locators for the transaction amount list filter elements
  readonly transactionListFilterAmountRangeButton =
    '[data-test="transaction-list-filter-amount-range-button"]';
  readonly transactionListFilterAmountSlider =
    '[data-test="transaction-list-filter-amount-range-slider"]';
  readonly transactionListFilterAmountClearButton =
    '[data-test="transaction-list-filter-amount-clear-button"]';
  //locators for the transaction date list filter elements
  readonly transactionListFilterDateRangeButton =
    '[data-test="transaction-list-filter-date-range-button"]';
  readonly transactionListFilterDateRangeSlider =
    "div:nth-child(4) > .Cal__Month__rows > ul:nth-child(2) > li:nth-child(2)";
  readonly transactionListFilterDateClearButton =
    '[data-test="transaction-list-filter-date-clear-button"]';
  readonly transactionNewTransactionButton =
    '[data-test="nav-top-new-transaction"]';
  readonly transcationSearchField = '[data-test="user-list-search-input"]';
  readonly transactionSelectUser = '[data-test="user-list-item-uBmeaz5pX"]';
  readonly transactionPaymentButton =
    '[data-test="transaction-create-submit-payment"]';

  /*
   * Filters transactions by amount.
   * Moves the slider thumbs to filter transactions between 1000 and 3000.
   * Clears the filter after applying it.
   *
   */
  async transactionFilteringByAmount() {
    await this.expectVisible(this.transactionListFilterAmountRangeButton);
    await this.click(this.transactionListFilterAmountRangeButton);

    await this.expectVisible(this.transactionListFilterAmountSlider);

    await this.dragThumb(this.page.locator('span[data-index="0"]'), 150); // Move min thumb right
    await this.dragThumb(this.page.locator('span[data-index="1"]'), -150); // Move max thumb left
    await this.waitForTimeoutElement(2000);

    await this.click(this.transactionListFilterAmountClearButton);
  }

  /*
   * Filters transactions by date.
   * Clears the filter after applying it.
   */
  async dateFilteringByDate() {
    await this.expectVisible(this.transactionListFilterDateRangeButton);
    await this.click(this.transactionListFilterDateRangeButton);

    await this.selectDateRange('2026-01-01', '2026-01-05');
    
    await this.expectVisible(this.transactionListFilterDateClearButton);
    await this.click(this.transactionListFilterDateClearButton);
    await this.expectHidden(this.transactionListFilterDateClearButton);
  }

  /*
   * Creates a new transaction.
   * Fills in the transaction details and submits the form.
   */
  async createNewTransaction() {
    const transactionAmountField = await this.getElementByRole(
      "textbox",
      "Amount"
    );

    const transactionAmountNote = await this.getElementByRole(
      "textbox",
      "Add a note"
    );

    await this.expectVisible(this.transactionNewTransactionButton);
    await this.click(this.transactionNewTransactionButton);

    await this.expectVisible(this.transcationSearchField);
    await this.type(this.transcationSearchField, "Ted");

    await this.expectVisible(this.transactionSelectUser);
    await this.click(this.transactionSelectUser);

    await expect(transactionAmountField).toBeVisible();
    await this.type(
      transactionAmountField,
      faker.number.int({ min: 1000, max: 5000 }).toString()
    );

    await expect(transactionAmountNote).toBeVisible();
    await this.type(transactionAmountNote, faker.lorem.sentence());

    await this.expectVisible(this.transactionPaymentButton);
    await this.click(this.transactionPaymentButton);

    await this.waitForTimeoutElement(2000);
  }

  /*
   * Selects different menus and verifies their visibility.
   */
  async selectingMenus() {
    const locatorMenus = [
      '[data-test="nav-contacts-tab"]',
      '[data-test="nav-personal-tab"]',
      '[data-test="nav-public-tab"]',
    ];

    for (const item of locatorMenus) {
      await this.expectVisible(item);
      await this.click(item);
      await this.waitForTimeoutElement(1000);
    }
  }
}
