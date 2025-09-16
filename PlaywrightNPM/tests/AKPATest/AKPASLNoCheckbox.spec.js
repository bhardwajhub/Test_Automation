const { test, expect } = require('@playwright/test');
const AKPASLNoCheckbox = require('../../pages/AK_PA/AKPASLNoCheckbox');

test('AK PA State License No Checkbox Flow test', async ({ page }) => {

    const akpaSLNoCheckbox = new AKPASLNoCheckbox(page);

    await akpaSLNoCheckbox.InitialSetup();

    await akpaSLNoCheckbox.AKPASLNoCheckboxCreation();

    await akpaSLNoCheckbox.AKAPATaskVerify();

    await akpaSLNoCheckbox.AKPAC2CFlowCheck();

});