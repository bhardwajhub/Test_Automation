const { test, expect } = require("@playwright/test");
const FirstPage = require("../../pages/AK_MD/FirstPage");

test("AK DO state License Flow Check", async ({ page }) => {
  const firstPage = new FirstPage(page);

  await firstPage.InitialSetup();

  await firstPage.StateLicenseCreation();
  
  await firstPage.TaskVerify();
  
  await firstPage.RemoveLicense();
 
});