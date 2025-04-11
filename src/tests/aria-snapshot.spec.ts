import { test, expect, BrowserContext, Page } from '@playwright/test';

let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
   context = await browser.newContext();
   page = await context.newPage();
});

test.afterAll(async () => {
  await context?.close();
});

test('aria snapshot example', async () => {
  
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

test('partial aria snapshot matching', async () => {
  await page.goto('https://practice.expandtesting.com/notes/app');
  
  // Example of partial matching - only checking structure without specific text
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - heading
  `);
});

test('save snapshot to file', async () => {
  await page.goto('https://practice.expandtesting.com/test-cases');
  
  // Save snapshot to a separate file
  await expect(page.locator('div >#core')).toMatchAriaSnapshot({ 
    name: 'test-case.aria.yml'
  });
});