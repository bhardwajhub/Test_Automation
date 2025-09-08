const { test, expect } = require('@playwright/test');  

const { StateLicense } = require('../pages/AK_MD/StateLicense.js');

test('E2E State License flow of Alaska', async ({ page }) => {
  const stateLicense = new StateLicense(page);

  await stateLicense.E2ELicenseCreation();
  await stateLicense.Taskverification();
  await stateLicense.RemoveLicense();
});