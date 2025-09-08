const { expect } = require('@playwright/test');

class StateLicense {
  constructor(page) {
    this.page = page;

    // Login
    this.usernameInput = page.getByRole('textbox', { name: 'Username/Email *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.loginButton = page.getByRole('button', { name: 'Log in ' });

    // Navigation
    this.statelicensebar = page.locator('#sidebar-container').getByText('State Licenses');
    this.dashboardButton = page.locator('#sidebar-container').getByText('Dashboard');

    // License creation
    this.addLicenseButton = page.getByRole('button', { name: '+ Add License' });
    this.stateDropdown = page.locator('#state div').first();
    this.statename = page.getByRole('option', { name: 'Alaska' });
    this.licenseNumberInput = page.getByRole('textbox', { name: 'Enter the license number' });
    this.expiryDateInput = page.locator('#expiry_date');
    this.noradiooption = page.locator('#radio1');
    this.licenseTypeInput = page.getByRole('textbox', { name: 'Enter the license type' });
    this.initialDateInput = page.locator('#initial_date');
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Dashboard tasks
    this.viewDetailsButton = page.getByRole('button', { name: 'search View Details' });
    this.tasktitle = page.locator('div.task-title.pb-1');

    // Delete license
    this.stateLicenseEntry = page.getByRole('row', { name: 'State License License Number' }).locator('span');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes' });

    // Expected tasks
    this.expectedTasks = [
      'Renew state license',
      'Complete 50 category 1 credits, 25 of the 50 credits are due by December 31st every odd year.',
      'Complete 50 category 1 credits, 25 of the 50 credits are due every 2 years at license renewal.',
      'Complete a minimum of 2 hours of education in pain management and opioid use and addiction every 2 years.'
    ];
  }

  // --------------------
  // End-to-end: Create license
  // --------------------
  async E2ELicenseCreation() {
    await this.page.goto('https://s-app.mocingbird.com/', { waitUntil: 'domcontentloaded', timeout: 100000 });

    await this.usernameInput.fill("hunt");
    console.log("✅ Username filled");

    await this.passwordInput.fill("mind@123");
    console.log("✅ Password filled");

    await this.loginButton.click();
    console.log("✅ Login submitted");

    await this.statelicensebar.click();
    console.log("✅ State Licenses opened");

    await this.addLicenseButton.click();
    console.log("✅ Add License clicked");

    await this.stateDropdown.click();
    await this.statename.click();
    console.log("✅ Alaska State selected");

    await this.licenseNumberInput.fill('AK0825');
    await expect(this.licenseNumberInput).toHaveValue("AK0825");
    console.log("✅ License number entered & verified");

    await this.expiryDateInput.fill('12/31/2026');
    console.log("✅ Expiry Date entered");

    await this.noradiooption.check();
    await expect(this.noradiooption).toBeChecked();
    console.log("✅ Radio button selected");

    await this.licenseTypeInput.fill('test');
    await expect(this.licenseTypeInput).toHaveValue("test");
    console.log("✅ License type entered & verified");

    await this.initialDateInput.fill('08/01/2025');
    console.log("✅ Initial Date entered");

    await this.saveButton.click();
    console.log("✅ License saved");
  }

  // --------------------
  // Task verification
  // --------------------
  async Taskverification() {
    await this.dashboardButton.click();
    await this.viewDetailsButton.click();
    console.log("✅ View Details clicked");
    console.log("✅ Task verification started");

    await this.tasktitle.first().waitFor({ state: 'visible', timeout: 10000 });

    const actualTasks = (await this.tasktitle.allTextContents())
      .map(text => text.replace(/\s+/g, ' ').trim());

    expect(actualTasks.length).toBeGreaterThan(0);

    const actualTextSet = new Set(actualTasks);
    const expectedTextSet = new Set(this.expectedTasks);

    console.log("📋 Actual UI Tasks:");
    [...actualTextSet].forEach(t => console.log(" -", t));

    // Find differences
    const missingTexts = [...expectedTextSet].filter(t => !actualTextSet.has(t));
    const extraTexts = [...actualTextSet].filter(t => !expectedTextSet.has(t));

    if (missingTexts.length > 0 || extraTexts.length > 0) {
      console.log('❌ Text verification failed!');
      if (missingTexts.length > 0) console.log('Missing:', missingTexts);
      if (extraTexts.length > 0) console.log('Unexpected:', extraTexts);
    }

    expect(actualTextSet).toEqual(expectedTextSet);
    console.log("✅ Task verification completed");
  }

  // --------------------
  // Remove license
  // --------------------
  async RemoveLicense() {
    await this.statelicensebar.click();
    await this.stateLicenseEntry.click();
    console.log("✅ State License entry selected");

    await this.deleteButton.click();
    console.log("✅ Delete button clicked");

    await this.confirmDeleteButton.click();
    console.log("✅ Confirmed delete");

    await this.page.waitForTimeout(3000);
    console.log("✅ License removed");
  }
}

module.exports = { StateLicense };