import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { HomePage } from "../pages/HomePage";
import { MyAccountPage } from "../pages/MyAccountPage";
import { BankAccountsPage } from "../pages/BankAccountsPage";

type Fixtures = {
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  homePage: HomePage;
  myAccountPage: MyAccountPage;
  bankAccountsPage: BankAccountsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  myAccountPage: async ({ page }, use) => {
    const myAccountPage = new MyAccountPage(page);
    await use(myAccountPage);
  },
  bankAccountsPage: async ({ page }, use) => {
    const bankAccountsPage = new BankAccountsPage(page);
    await use(bankAccountsPage);
  },
  
});

export { expect } from "@playwright/test";
