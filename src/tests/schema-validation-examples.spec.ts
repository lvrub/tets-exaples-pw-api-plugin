import { expect } from '@playwright/test';
import { pwApi, test } from 'pw-api-plugin';
import { validateSchema } from 'playwright-ajv-schema-validator';
import { before } from 'node:test';

let schemaAll: any;

test.beforeAll(async ({ playwright }) => {
  const requestContext = await playwright.request.newContext();
  const schemaDocUrl = 'https://practice.expandtesting.com/notes/api/swagger.json';

  schemaAll = await(await requestContext.get(schemaDocUrl)).json();

  await requestContext.dispose();
});

test('schema validation for create user', async ({ request, page }: { request: any; page: any }) => {

  const date = new Date().getTime().toString()

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

  //third parameter can be either schema url or json object if a response from the url doesn't provide json object with
  await validateSchema({ page }, responseBodyPost, schemaAll.paths, { endpoint: '/users/register', method: 'post', status: 201 });
});
