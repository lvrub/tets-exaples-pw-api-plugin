import { test, expect } from '@playwright/test';

const BASE_URL = 'https://practice.expandtesting.com';

test.describe('practice.expandtesting.com — Login flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
  });

  test('Successful login with demo credentials', async ({ page }) => {
    // demo credentials discovered on the page
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    // site redirects to /secure on success
    await expect(page).toHaveURL(/\/secure/);
    await expect(page.locator('text=You logged into a secure area!')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });

  test('Invalid username keeps user on login page', async ({ page }) => {
    await page.getByLabel('Username').fill('wrongUser');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('alert')).toContainText('Your password is invalid!');
  });

  test('Invalid password keeps user on login page', async ({ page }) => {
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('WrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('alert')).toContainText('Your password is invalid!');
  });

  test('Empty fields validation', async ({ page }) => {
    // submit with empty fields
    const responsePromise = page.waitForResponse(response => 
      response.url().includes('/login') && response.status() === 200
    );
    await page.getByRole('button', { name: 'Login' }).click();
    await responsePromise;
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('alert')).toContainText('Your username is invalid!');
  });

  test('Long username boundary', async ({ page }) => {
    const longUsername = 'a'.repeat(1024);
    await page.getByLabel('Username').fill(longUsername);
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByRole('alert')).toContainText('Your username is invalid!');
  });
});
