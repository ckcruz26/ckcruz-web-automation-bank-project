import { test as setup } from "@playwright/test";
import path from "path";
import { LoginPage } from "../pages/LoginPage";

const authFile = path.join(__dirname, "../auth/authentication.json");

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open(String(process.env.WEB_URL));

  await loginPage.type(loginPage.userNameField, String(process.env.BANK_UN));
  await loginPage.type(loginPage.passwordField, String(process.env.BANK_PW));
  await loginPage.click(loginPage.signInButton);

  await page.waitForURL("http://localhost:3000/");

  // Save storage state first
  await page.context().storageState({ path: authFile });
});
