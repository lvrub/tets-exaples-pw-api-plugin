# Login Page — Test Plan

Page: https://practice.expandtesting.com/login

Assumption: each scenario starts from a fresh browser state and navigates to `/login`.

## Executive summary

This plan covers positive and negative login flows for the practice.expandtesting.com demo login page. The page exposes static demo credentials on the page: `Username: practice` and `Password: SuperSecretPassword!`.

Success criteria: successful login redirects to `/secure` and shows "You logged into a secure area!" and a visible Logout control.

Failure conditions: incorrect credentials must keep the user on `/login` and show an error.

## Scenarios

### 1. Successful login (happy path)
1. Open browser and navigate to `/login`.
2. Enter Username: `practice`.
3. Enter Password: `SuperSecretPassword!`.
4. Click `Login`.

Expected result: redirected to `/secure`; success message "You logged into a secure area!" visible; `Logout` visible.

### 2. Invalid username
1. Navigate to `/login`.
2. Enter Username: `wrongUser`.
3. Enter Password: `SuperSecretPassword!`.
4. Click `Login`.

Expected result: remain on `/login`; error message visible (page-specific text depends on implementation).

### 3. Invalid password
1. Navigate to `/login`.
2. Enter Username: `practice`.
3. Enter Password: `WrongPassword`.
4. Click `Login`.

Expected result: remain on `/login`; error message visible.

### 4. Empty fields
1. Navigate to `/login`.
2. Click `Login` without entering username or password.

Expected result: remain on `/login`; page may show inline validation or an error message.

### 5. Boundary / long input
1. Navigate to `/login`.
2. Enter a very long username (1024 characters) and the correct password.
3. Click `Login`.

Expected result: remain on `/login`; no crash or server error.

## Notes
- The test code (`login-tests.spec.ts`) includes locators that match common attributes; if the page uses other selectors update them accordingly.
- Run these tests with the Playwright `chromium` project for fastest feedback.
