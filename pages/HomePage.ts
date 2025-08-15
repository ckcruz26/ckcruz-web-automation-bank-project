import { faker } from "@faker-js/faker";
import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  readonly Page;
  // Locators for the transaction amount list filter elements
  readonly transactionListFilterAmountRangeButton: Locator;
  readonly transactionListFilterAmountSlider: Locator;
  readonly transactionListFilterAmountClearButton: Locator;
  //locators for the transaction date list filter elements
  readonly transactionListFilterDateRangeButton: Locator;
  readonly transactionListFilterDateRangeSlider: Locator;
  readonly transactionListFilterDateClearButton: Locator;
  //new transaction
  readonly transactionNewTransactionButton: Locator;
  readonly transcationSearchField: Locator;
  readonly transactionSelectUser: Locator;

  readonly transactionAmountField: Locator;
  readonly transactionAmountNote: Locator;
  readonly transactionPaymentButton: Locator;

  constructor(page: Page) {
    this.Page = page;

    // Locators for the transaction amount list filter elements
    this.transactionListFilterAmountRangeButton = page.locator(
      '[data-test="transaction-list-filter-amount-range-button"]'
    );
    this.transactionListFilterAmountSlider = page.locator(
      '[data-test="transaction-list-filter-amount-range-slider"]'
    );
    this.transactionListFilterAmountClearButton = page.locator(
      '[data-test="transaction-list-filter-amount-clear-button"]'
    );

    //locators for the transaction date list filter elements
    this.transactionListFilterDateRangeButton = page.locator(
      '[data-test="transaction-list-filter-date-range-button"]'
    );
    this.transactionListFilterDateRangeSlider = page.locator(
      "div:nth-child(3) > .Cal__Month__rows > ul:nth-child(3) > li:nth-child(3)"
    );
    this.transactionListFilterDateClearButton = page.locator(
      'svg path[d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"]'
    );

    //transaction new
    this.transactionNewTransactionButton = page.locator(
      '[data-test="nav-top-new-transaction"]'
    );
    this.transcationSearchField = page.locator(
      '[data-test="user-list-search-input"]'
    );
    this.transactionSelectUser = page.locator(
      '[data-test="user-list-item-uBmeaz5pX"]'
    );

    this.transactionAmountField = page.getByRole("textbox", { name: "Amount" });
    this.transactionAmountNote = page.getByRole("textbox", {
      name: "Add a note",
    });
    this.transactionPaymentButton = page.locator(
      '[data-test="transaction-create-submit-payment"]'
    );
  }

  /*
    @description: Moves the slider thumb to a specified offset.
    @param locator: The locator for the slider thumb
  */
  async dragThumb(locator: Locator, offsetX: number) {
    const box = await locator.boundingBox();
    if (!box) return;

    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    await this.Page.mouse.move(centerX, centerY);
    await this.Page.mouse.down();
    await this.Page.mouse.move(centerX + offsetX, centerY, { steps: 5 });
    await this.Page.mouse.up();
  }

  /*
   * Filters transactions by amount.
   * Moves the slider thumbs to filter transactions between 1000 and 3000.
   * Clears the filter after applying it.
   *
   */
  async transactionFilteringByAmount() {
    await expect(this.transactionListFilterAmountRangeButton).toBeVisible();
    await this.transactionListFilterAmountRangeButton.click();
    await expect(this.transactionListFilterAmountSlider).toBeVisible();

    await this.dragThumb(this.Page.locator('span[data-index="0"]'), 150); // Move min thumb right
    await this.dragThumb(this.Page.locator('span[data-index="1"]'), -150); // Move max thumb left

    await this.Page.waitForTimeout(2000); // wait for the slider to apply the filter
    await this.transactionListFilterAmountClearButton.click();
  }

  /*
   * Filters transactions by date.
   * Clears the filter after applying it.
   */
  async dateFilteringByDate() {
    await expect(this.transactionListFilterDateRangeButton).toBeVisible();
    await this.transactionListFilterDateRangeButton.click();

    for (let i = 0; i < 2; i++) {
      await this.transactionListFilterDateRangeSlider.click();
    }
    await this.transactionListFilterDateClearButton.isVisible();
    await this.transactionListFilterDateClearButton.click();
    await expect(this.transactionListFilterDateClearButton).toBeHidden();

    await this.Page.waitForTimeout(2000);
  }

  /*
   * Creates a new transaction.
   * Fills in the transaction details and submits the form.
   */
  async createNewTransaction() {
    await expect(this.transactionNewTransactionButton).toBeVisible();
    await this.transactionNewTransactionButton.click();

    await expect(this.transcationSearchField).toBeVisible();
    await this.transcationSearchField.fill("Ted");

    await expect(this.transactionSelectUser).toBeVisible();
    await this.transactionSelectUser.click();

    await expect(this.transactionAmountField).toBeVisible();
    await this.transactionAmountField.fill(
      faker.number.int({ min: 1000, max: 5000 }).toString()
    );

    await expect(this.transactionAmountNote).toBeVisible();
    await this.transactionAmountNote.fill(faker.lorem.sentence());

    await expect(this.transactionPaymentButton).toBeVisible();
    await this.transactionPaymentButton.click();

    await this.Page.waitForTimeout(2000);
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
      await expect(this.Page.locator(item)).toBeVisible();
      await this.Page.locator(item).click();
      await this.Page.waitForTimeout(1000);
    }
  }
}
