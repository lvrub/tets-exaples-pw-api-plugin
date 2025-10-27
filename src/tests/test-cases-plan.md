# Test Cases Page — E2E Test Plan (Category Tiles Focus)

Page: https://practice.expandtesting.com/test-cases

Scope: web end-to-end (E2E) testing only — this document focuses on automated E2E scenarios and acceptance criteria for the Category tiles/sections (for example: "Login Test Cases", "Register Test Cases").

Assumption: every scenario starts from a fresh browser session (cleared storage, fresh profile) and navigates to `/test-cases` as the initial step unless stated otherwise.

## Executive summary

This is a focused E2E test plan for the "Practice Test Cases" page. Primary objective: validate the Category tiles/sections surface correctly, are interactive, and navigate to their target pages reliably across desktop and mobile viewports. All scenarios are written with automation in mind (clear selectors, expected URLs, and verifiable outcomes).

Primary E2E goals
- Verify each category tile/section is present, reachable, and labelled correctly.
- Validate navigation from tile to category page and the presence of expected content on the target page.
- Verify keyboard accessibility and focus management for tiles.
- Validate behavior on mobile viewport (tap interactions and layout).
- Detect broken links or wrong targets for category tiles.

## E2E scenarios — Category tiles / sections

Notes on selectors: prefer semantic selectors in automation:
- `page.getByRole('link', { name: 'Login Test Cases' })` or `page.getByText('Login Test Cases').locator('..')` if tile is not a link.
- If devs provide `data-test` attributes, use those (e.g. `[data-test=category-login]`).

Each scenario below includes numbered steps, expected results, assumptions, and success/failure criteria.

### Scenario 1 — Tile presence and attributes (smoke)
Assumption: fresh session, `/test-cases` loaded.
Steps:
1. Navigate to `/test-cases`.
2. Wait for the main heading `Practice Test Cases` to be visible.
3. For each expected category (e.g., `Login Test Cases`, `Register Test Cases`):
   a. Verify a tile or element with that visible name exists.
   b. Verify the tile has a semantic role (link or button) or contains an anchor element.
   c. Capture the `href` attribute if the tile is an anchor.

Expected results:
- Each named category tile is visible and has a discoverable interactive element (link or button).
- Every tile that is supposed to navigate exposes a non-empty `href`.

Success criteria: presence and basic attributes validated for all expected categories.

Failure conditions: missing tile, tile not interactive, or empty href where a link is expected.

### Scenario 2 — Click navigation (desktop)
Assumption: `/test-cases` is open.
Steps:
1. Click the `Login Test Cases` tile (use a stable selector).
2. Wait for navigation.
3. Verify URL contains `/test-cases/login`.
4. Verify the category page heading `Login Test Cases` is visible.
5. Verify a specific piece of content exists on the category page (for example: a test-case heading or ordered list).

Expected results:
- Click leads to the category URL and expected content is present.

Success criteria: navigation and content verified.

Failure conditions: click does not navigate, navigates to wrong URL, or expected content missing.

### Scenario 3 — Keyboard navigation and activation
Assumption: `/test-cases` is open; test runs in full keyboard-capable environment.
Steps:
1. Focus the page body and press `Tab` repeatedly to reach the first category tile.
2. Verify the tile receives focus (outline or aria-focused state detectable).
3. Press `Enter` or `Space` to activate the tile.
4. Wait for navigation and verify the category URL and heading as in Scenario 2.

Expected results:
- Tiles are reachable by keyboard and activation via `Enter`/`Space` navigates correctly.

Success criteria: keyboard-only users can access and activate tiles.

Failure conditions: tile not in tab order, focus not visible, or activation does not navigate.

### Scenario 4 — Mobile tap and responsive layout
Assumption: run with mobile viewport (e.g., 375x812) or device emulation.
Steps:
1. Set viewport to a mobile size (375x812).
2. Navigate to `/test-cases`.
3. Verify category tiles are visible without layout overlap.
4. Tap the `Register Test Cases` tile.
5. Verify navigation to `/test-cases/register` and presence of the category heading.

Expected results:
- Tiles are tappable on mobile and navigation works; layout remains usable.

Success criteria: mobile users can reach and tap tiles; no visual overlap blocking taps.

Failure conditions: tiles off-screen, overlapping elements, or tap does not navigate.

### Scenario 5 — Link target validation (broken link detection)
Assumption: `/test-cases` loaded.
Steps:
1. Collect `href` for all category tiles that are anchors.
2. For each `href` that is internal (same origin): send an HTTP `HEAD` or `GET` request and verify response is 200 or a valid 3xx redirect.
3. Optionally, open each `href` in the browser and verify content (heading) after navigation.

Expected results:
- No unexpected 4xx/5xx responses for internal category targets.

Success criteria: all category links resolve successfully.

Failure conditions: broken links, 404/500 responses, or redirects to unrelated pages.

### Scenario 6 — Stability under repeated navigation (flakiness guard)
Assumption: `/test-cases` loaded.
Steps:
1. For each category tile, perform 3 sequential navigation cycles:
   a. Click tile -> wait for category page -> verify heading -> navigate back -> verify `/test-cases`.
2. Observe whether any cycle fails or navigation is inconsistent.

Expected results:
- Repeated navigation cycles succeed consistently.

Success criteria: no intermittent failures across cycles.

Failure conditions: intermittent navigation failures, stale DOM errors, or memory leaks causing crashes.

### Scenario 7 — Deep link / direct access verification
Assumption: fresh session.
Steps:
1. Directly navigate to known category URL `/test-cases/login`.
2. Verify the page loads and shows `Login Test Cases` heading and expected content.
3. Repeat for `/test-cases/register`.

Expected results:
- Category pages are accessible directly (no client-side-only gating).

Success criteria: direct links open and show correct content.

Failure conditions: direct access shows blank content or errors because the page expects client-side navigation only.

### Scenario 8 — Accessibility attributes for tiles
Assumption: `/test-cases` loaded.
Steps:
1. For each category tile, evaluate accessibility properties (use Playwright `accessibility.snapshot()` or axe-core):
   - Name (accessible name matches visible text)
   - Role (link/button)
   - Focusable
2. Report any missing accessible names or incorrect roles.

Expected results:
- Tiles have correct accessible names and roles.

Success criteria: low-to-no high-severity accessibility violations for tiles.

Failure conditions: tiles missing accessible names, not in tab order, or incorrect ARIA roles.

## Test data, selectors, and automation tips
- Prefer `page.getByRole('link', { name: 'Login Test Cases' })` or data-test attributes.
- If tiles are not anchors but clickable containers, find the inner anchor or use `locator('text=Login Test Cases').first()` and ensure stable scoping.
- Add `await page.waitForURL(/\/test-cases\/(login|register)/)` after activation to make tests resilient to timing.

## Minimal Playwright test snippets (examples)

Example: verify tile navigates (Playwright)

```ts
import { test, expect } from '@playwright/test';

test('category tile navigates to login', async ({ page }) => {
  await page.goto('/test-cases');
  await page.getByRole('link', { name: 'Login Test Cases' }).click();
  await page.waitForURL(/\/test-cases\/login/);
  await expect(page.getByRole('heading', { name: 'Login Test Cases' })).toBeVisible();
});
```

Example: keyboard activation

```ts
test('category tile reachable and activatable by keyboard', async ({ page }) => {
  await page.goto('/test-cases');
  await page.keyboard.press('Tab'); // repeat as needed until the tile is focused or implement a robust focus loop
  await expect(page.getByRole('link', { name: 'Login Test Cases' })).toBeFocused();
  await page.keyboard.press('Enter');
  await page.waitForURL(/\/test-cases\/login/);
});
```

## Success criteria and exit conditions for an automated E2E job
- All category tiles exist and navigate to expected pages.
- Keyboard navigation passes for tiles.
- Mobile tap flows pass for at least the two main categories.
- No internal broken links discovered.

## Completion checklist (category tiles focus)
- [x] Tile presence and attributes (Scenario 1)
- [x] Click navigation (Scenario 2)
- [x] Keyboard navigation (Scenario 3)
- [x] Mobile tap (Scenario 4)
- [x] Link target validation (Scenario 5)
- [x] Repeated navigation stability (Scenario 6)
- [x] Direct access (Scenario 7)
- [x] Accessibility checks for tiles (Scenario 8)

---

Saved file: `src/tests/test-cases-plan.md` — updated to focus on E2E testing and to include detailed scenarios for Category tiles/sections.
