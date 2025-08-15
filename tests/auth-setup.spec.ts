import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import { LoginPage } from "../pages/LoginPage";

const authFile = path.join(__dirname, "../auth/authentication.json");

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await page.goto(String(process.env.WEB_URL));

  await loginPage.userNameField.fill(String(process.env.BANK_UN));
  await loginPage.passwordField.fill(String(process.env.BANK_PW));
  await loginPage.signInButton.click();

  await page.waitForURL("http://localhost:3000/");

  // Save storage state first
  await page.context().storageState({ path: authFile });

});