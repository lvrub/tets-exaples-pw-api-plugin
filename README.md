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
npm install -D playwright-ajv-schema-validator
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

## Schema Validation Example

The `schema-validation-examples.spec.ts` file demonstrates how to validate API responses against a schema using the [playwright-ajv-schema-validator](https://github.com/sclavijosuero/playwright-ajv-schema-validator/tree/main) library.

### Key Features
- Validates the response schema for the `/users/register` endpoint.
- Uses the Swagger documentation available at `https://practice.expandtesting.com/notes/api/swagger.json`.

### Example Test
The test ensures that the API response for user registration matches the expected schema:

```typescript
const responsePost = await pwApi.post({request, page},'https://practice.expandtesting.com/notes/api/users/register', {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    name: 'testUser'+ date.substring(10,15),
    email: 'test_a'+ date.substring(10,15)+'@i.ua',
    password: '0444000'
  }
});
expect(responsePost.status()).toBe(201);
const responseBodyPost = await responsePost.json();

const schemaAll = await (await pwApi.get({request, page}, schemaDocUrl)).json();

await validateSchema({ page }, responseBodyPost, schemaAll.paths, { endpoint: '/users/register', method: 'post', status: 201 });
```

For more details, visit the [playwright-ajv-schema-validator documentation](https://github.com/sclavijosuero/playwright-ajv-schema-validator/tree/main).

## Running Tests

To execute the tests, use the following command:

```bash
npx playwright test
```

For more details, visit the [pw-api-plugin documentation on npm](https://www.npmjs.com/package/pw-api-plugin#installation).