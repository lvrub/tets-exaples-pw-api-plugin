# pw-api-plugin Examples

This repository demonstrates the usage of [pw-api-plugin](https://www.npmjs.com/package/pw-api-plugin#installation) with Playwright for API testing.

## Examples

The repository contains example tests using the Practice API:

- Health check endpoint testing using both Playwright and Axios approaches.
- User registration with form data.
- Response validation patterns.

## Installation

To install the required dependencies, run the following commands:

```bash
npm install -D @playwright/test
npm install -D pw-api-plugin
```

## Test Examples

### 1. Health Check (Playwright)
```typescript
const responseGet = await pwApi.get({ request, page }, 'https://practice.expandtesting.com/notes/api/health-check');
```

### 2. Health Check (Axios)
```typescript
const respGet = await axiosApi.get({ page }, 'https://practice.expandtesting.com/notes/api/health-check');
```

### 3. User Registration
```typescript
const responsePost = await pwApi.post({ request, page }, 'https://practice.expandtesting.com/notes/api/users/register', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    name: 'testUser',
    email: 'test@example.com',
    password: '123456'
  }
});
```

## Running Tests

To execute the tests, use the following command:

```bash
npx playwright test
```

For more details, visit the [pw-api-plugin documentation on npm](https://www.npmjs.com/package/pw-api-plugin#installation).