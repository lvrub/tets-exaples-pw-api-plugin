import { test as base, expect } from '@playwright/test';

const test = base.extend({});

test('aria snapshot example', async ({ page }) => {
  
  await page.goto('https://practice.expandtesting.com/notes/app');
  
  // Test the main navigation area
  await expect(page.locator(".container > nav")).toMatchAriaSnapshot(`
    - navigation "breadcrumb mb-2":
        - list:
          - listitem:
              - link "Practice"
          - listitem:
              - text: /
              - link "Home - My Notes - The App for Automation Testing Practice"
  `);

  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
       - insertion
       - paragraph
       - heading "Welcome to Notes App"
  `);
});

  test('partial aria snapshot matching', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/notes/app');
    
    // Example of partial matching - only checking structure without specific text
    await expect(page.getByRole('main')).toMatchAriaSnapshot(`
      - main:
        - heading
    `);
  });

  test('save snapshot to file', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/test-cases');
    
    // Save snapshot to a separate file - using main content area to match actual page structure
    await expect(page.locator('#core')).toMatchAriaSnapshot({ 
      name: 'test-case.aria.yml'
    });
  });