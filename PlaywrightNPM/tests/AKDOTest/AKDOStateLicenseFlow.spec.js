const { test, expect } = require("@playwright/test");
// Ensure the path is correct and the file exists
const FirstPage = require("../../pages/AK_MD/FirstPage");

test("License Flow test with design pattern", async ({ page }) => {
  const firstPage = new FirstPage(page);

  await firstPage.InitialSetup();

  await firstPage.StateLicenseCreation();
  
  await firstPage.TaskVerify();
  
  await firstPage.RemoveLicense();
 
});