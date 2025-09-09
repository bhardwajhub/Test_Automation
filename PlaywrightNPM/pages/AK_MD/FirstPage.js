const Base = require("../base/Baseclass");
const UserLogin = require("../commonfuntion/UserLogin");
const ConfigReader = require("../base/configreader");
const Locator = require("../commonfuntion/locator");
const { expect } = require('@playwright/test');

class FirstPage extends Base {
  constructor(page) {
    super(page);
    this.userLogin = new UserLogin(page);
    this.locator = new Locator(page);
  }

  async InitialSetup() {
    await this.goto();
    await this.userLogin.DOlogin();
  }

async StateLicenseCreation() {
    expect(this.locator.statelicensebar.isVisible);
    console.log("✅ State License bar is visible");
    await this.locator.statelicensebar.click();
    console.log("✅ State Licenses opened");

    expect(this.locator.addLicenseButton.isVisible);
    console.log("✅ Add License button is visible");
    await this.locator.addLicenseButton.click();
    console.log("✅ Add License clicked");

    expect(this.locator.stateDropdown.isVisible);
    console.log("✅ State dropdown is visible");
    await this.locator.stateDropdown.click();
    expect(this.locator.statename.isVisible);
    console.log("✅ State name is visible");
    await this.locator.statename.click();
    console.log("✅ Alaska State selected");

    expect(this.locator.licenseNumberInput.isVisible);
    console.log("✅ License number input is visible");
    await this.locator.licenseNumberInput.fill('AK0825');
    await expect(this.locator.licenseNumberInput).toHaveValue("AK0825");
    console.log("✅ License number entered & verified");

    expect(this.locator.expiryDateInput.isVisible);
    await this.locator.expiryDateInput.fill('12/31/2026');
    console.log("✅ Expiry Date entered");

    expect(this.locator.noradiooption.isVisible);
    await this.locator.noradiooption.check();
    await expect(this.locator.noradiooption).toBeChecked();
    console.log("✅ Radio button selected");

    expect(this.locator.licenseTypeInput.isVisible);
    await this.locator.licenseTypeInput.fill('test');
    await expect(this.locator.licenseTypeInput).toHaveValue("test");
    console.log("✅ License type entered & verified");

    expect(this.locator.initialDateInput.isVisible);
    await this.locator.initialDateInput.fill('08/01/2025');
    console.log("✅ Initial Date entered");

    expect(this.locator.saveButton.isVisible);
    await this.locator.saveButton.click();
    console.log("✅ License saved!");
}

async TaskVerify(){
    expect(this.locator.dashboardButton.isVisible);
    await this.locator.dashboardButton.click();
    console.log("✅ Dashboard button clicked!");
    expect(this.locator.viewDetailsButton.isVisible);
    await this.locator.viewDetailsButton.click();
    console.log("✅ View Details clicked");

    console.log("✅ Task verification started");
    await this.locator.tasktitle.first().waitFor({ state: 'visible', timeout: 10000 });
    const actualTasks = (await this.locator.tasktitle.allTextContents())
      .map(text => text.replace(/\s+/g, ' ').trim());
    expect(actualTasks.length).toBeGreaterThan(0);
    this.expectedTasks = [
      'Renew state license',
      'Complete 50 category 1 credits, 25 of the 50 credits are due by December 31st every odd year.',
      'Complete 50 category 1 credits, 25 of the 50 credits are due every 2 years at license renewal.',
      'Complete a minimum of 2 hours of education in pain management and opioid use and addiction every 2 years.'
    ];
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

async RemoveLicense() {
    expect(this.locator.statelicensebar.isVisible);
    await this.locator.statelicensebar.click();
    console.log("✅ State License bar clicked!");
    expect(this.locator.stateLicenseEntry.isVisible);
    await this.locator.stateLicenseEntry.click();
    console.log("✅ State License entry selected");

    await this.page.waitForTimeout(5000);
    expect(this.locator.deleteButton.isVisible);
    await this.locator.deleteButton.click();
    console.log("✅ Delete button clicked");

    expect(this.locator.confirmDeleteButton.isVisible);
    await this.locator.confirmDeleteButton.click();
    console.log("✅ Confirmed delete");

    await this.page.waitForTimeout(5000);
    console.log("✅ License removed!");
} 

}
module.exports = FirstPage;