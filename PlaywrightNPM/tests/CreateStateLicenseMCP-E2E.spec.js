const { test, expect } = require('@playwright/test');

test.describe('Create State License E2E Flow', () => {
  test('Test Case 1: Create State License', async ({ page }) => {
    // Step 1: Navigate to sign in page
    await page.goto('https://s-app.mocingbird.com/users/sign_in');
    await expect(page).toHaveTitle(/MOCINGBIRD/);

    // Step 2: Login
    await page.fill('input[name="user[email]"]', 'hunt');
    await page.fill('input[name="user[password]"]', 'mind@123');
    await page.click('input[type="submit"]');
    await page.waitForURL(/dashboard/);
    await expect(page.locator('.user-name')).toContainText('hunt');

    // Step 3: Go to State Licenses
    await page.click('text=State Licenses');
    await expect(page.locator('h1')).toContainText('State Licenses');

    // Step 4: Add License
    await page.click('text=Add License');
    await expect(page.locator('.state-license-modal')).toBeVisible();

    // Step 5: Select Alaska
    await page.selectOption('select[name="state"]', { label: 'Alaska' });
    await expect(page.locator('select[name="state"]')).toHaveValue('AK');

    // Step 6: Fill random License Number
    const licenseNumber = faker.datatype.number({ min: 100000, max: 999999 }).toString();
    await page.fill('input[name="license_number"]', licenseNumber);
    await expect(page.locator('input[name="license_number"]')).toHaveValue(licenseNumber);

    // Step 7: Select expiry date
    await page.fill('input[name="expiry_date"]', '12/31/2026');
    await expect(page.locator('input[name="expiry_date"]')).toHaveValue('12/31/2026');

    // Step 8: Select No radio option
    await page.check('input[type="radio"][value="no"]');
    await expect(page.locator('input[type="radio"][value="no"]')).toBeChecked();

    // Step 9: Select initial date
    await page.fill('input[name="initial_date"]', '08/01/2026');
    await expect(page.locator('input[name="initial_date"]')).toHaveValue('08/01/2026');

    // Step 10: Save
    await page.click('button:has-text("Save")');
    await page.waitForURL(/dashboard/);
    await expect(page.locator('h1')).toContainText('Dashboard');

    // Step 11: View details
    await page.click('text=View details');

    // Step 12: Go to State Licenses again
    await page.click('text=State Licenses');
    await page.check('input[type="checkbox"][name="select_all"]');
    await page.click('button:has-text("Delete")');
    await page.click('button:has-text("Yes")');
    await expect(page.locator('text=No State Licenses found')).toBeVisible();

    // Step 13: Close browser
    await page.close();
  });
});
