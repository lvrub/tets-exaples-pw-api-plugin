import { test, expect } from '@playwright/test';

test.describe('Click Navigation (Desktop)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to test cases page before each test
    await page.goto('https://practice.expandtesting.com/test-cases');
  });

  test('should navigate to login test cases page', async ({ page }) => {
    // Click Login Test Cases tile
    const loginLink = page.getByRole('link', { name: 'Login Test Cases' });
    await loginLink.click();
    await page.waitForURL(/\/test-cases\/login/);

    // Verify login page
    await expect(page).toHaveURL(/\/test-cases\/login/);
    await expect(page.getByRole('heading', { name: 'Login Test Cases', exact: true })).toBeVisible();
  });

  test('should navigate to register test cases page', async ({ page }) => {
    // Click Register Test Cases tile
    const registerLink = page.getByRole('link', { name: 'Register Test Cases' });
    await registerLink.click();
    await page.waitForURL(/\/test-cases\/register/);

    // Verify register page
    await expect(page).toHaveURL(/\/test-cases\/register/);
    await expect(page.getByRole('heading', { name: 'Register Test Cases', exact: true })).toBeVisible();
  });
});