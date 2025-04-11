import { expect, test } from '@playwright/test';
import { pwApi } from 'pw-api-plugin';
import { validateSchema } from 'playwright-ajv-schema-validator';

test('create user', async ({ request, page }) => {

  const schemaDoc = 'https://practice.expandtesting.com/notes/api/api-docs/'

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
  
  await validateSchema({ page }, responsePost, schemaDoc, { endpoint: '/users/register', method: 'post', status: 200 });


});
