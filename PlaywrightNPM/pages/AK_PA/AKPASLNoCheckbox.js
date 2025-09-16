const Base = require("../base/Baseclass");
const UserLogin = require("../commonfuntion/UserLogin");
const Locator = require("../commonfuntion/locator");
const { expect } = require('@playwright/test');

class AKPASLNoCheckbox extends Base {
    constructor(page) {
        super(page);
        this.userLogin = new UserLogin(page);
        this.locator = new Locator(page);
    }

    async InitialSetup() {
        await this.goto();
        await this.userLogin.PAlogin();
    }

    async AKPASLNoCheckboxCreation() {
        expect.soft(this.locator.statelicensebar.isvisible);
        console.log("✅ State License bar is visible");
        await this.locator.statelicensebar.click();
        console.log("✅ State Licenses opened");
        expect.soft(this.locator.addLicenseButton.isvisible);
        console.log("✅ Add License button is visible");
        await this.locator.addLicenseButton.click();
        console.log("✅ Add License clicked");
        expect.soft(this.locator.stateselect.isvisible);
        console.log("✅ State dropdown is visible");
        await this.locator.stateselect.click();
        console.log("✅ State name List is visible");
        await this.locator.stateselect.fill('Alaska');
        await this.locator.stateselect.press('Enter');
        console.log("✅ Alaska State selected");
        expect.soft(this.locator.licenseNumberInput.isvisible);
        console.log("✅ License number input is visible");
        await this.locator.licenseNumberInput.fill('AKPA0825');
        await expect.soft(this.locator.licenseNumberInput).toHaveValue("AKPA0825");
        console.log("✅ License number entered & verified");
        expect.soft(this.locator.expiryDateInput.isvisible);
        await this.locator.expiryDateInput.fill('12/31/2026');
        console.log("✅ Expiry Date entered!");
        expect.soft(this.locator.licenseTypeInput.isvisible);
        await this.locator.licenseTypeInput.fill('Playwright Automation test');
        await expect.soft(this.locator.licenseTypeInput).toHaveValue("Playwright Automation test");
        console.log("✅ License type entered & verified!");
        expect.soft(this.locator.initialDateInput.isvisible);
        await this.locator.initialDateInput.fill('08/01/2025');
        console.log("✅ Initial Date entered!");
        await this.locator.Nooption.click();
        await expect.soft(this.locator.Nooption).toBeChecked();
        console.log("✅ No checkbox is checked!");
        expect.soft(this.locator.saveButton.isvisible);
        await this.locator.saveButton.click();
        console.log("✅ License saved!");
    }

    async AKAPATaskVerify(){
    expect.soft(this.locator.dashboardButton.isVisible);
    await this.locator.dashboardButton.click();
    console.log("✅ Dashboard button clicked!");
    expect.soft(this.locator.viewDetailsButton.isVisible);
    await this.locator.viewDetailsButton.click();
    console.log("✅ View Details clicked");
    console.log("✅ Task verification started");
    await this.locator.tasktitle.first().waitFor({ state: 'visible', timeout: 10000 });
    const actualTasks = (await this.locator.tasktitle.allTextContents()).map(text => text.replace(/\s+/g, ' ').trim());
    expect(actualTasks.length).toBeGreaterThan(0);
    this.expectedTasks = [
      'Renew State License'
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

async AKPAC2CFlowCheck() {
    console.log("✅ C2C flow check started!");
    await this.locator.Leadtaskstatus.click();
    console.log("✅ Lead task status clicked!");
    expect.soft(this.locator.AcceptContinueButton.isVisible);
    console.log("✅ Accept & Continue button is visible!");
    await this.locator.AcceptContinueButton.click();
    console.log("✅ Accept & Continue button clicked!");
    await expect(this.locator.Nooption).toBeChecked();
    console.log("✅ No checkbox is checked!");
    expect.soft(this.locator.SaveContinueButton.isVisible);
    console.log("✅ Save & Continue button is visible!");
    await this.locator.SaveContinueButton.click();
    console.log("✅ Save & Continue button clicked!");
    await expect.soft(this.locator.Expiredatevalue).toHaveText('12/31/2026');
    console.log("✅ Expiry date verified!");

    await this.userLogin.RemoveLicense();
}
}

module.exports = AKPASLNoCheckbox;