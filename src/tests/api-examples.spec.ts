import { expect } from '@playwright/test';
import { pwApi, test, axiosApi } from 'pw-api-plugin';
import { APIRequestContext, Page } from '@playwright/test';

const date = new Date().getTime().toString()
let email =  'test_a'+ date.substring(10,15)+'@i.ua'
const password = '0807067050';

test('check healthcheck', async ({ request, page }: { request: APIRequestContext, page: Page }) => {

  const responseGet = await pwApi.get({request, page},'https://practice.expandtesting.com/notes/api/health-check')
  expect(responseGet.status()).toBe(200)
  const respBody = await responseGet.json();
  console.log(respBody)

});

test('check healthcheck axios', async ({page }: { page: Page }) => {
  
  const respGet = await axiosApi.get({page},'https://practice.expandtesting.com/notes/api/health-check')
  expect(respGet.status).toBe(200)
  const respBody = await respGet.data;
  console.log(respBody)

});


test('create user', async ({ request, page }: { request: APIRequestContext, page: Page }) => {

  const responsePost = await pwApi.post({request, page},'https://practice.expandtesting.com/notes/api/users/register', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      name: 'testUser'+ date.substring(10,15),
      email: email,
      password: password
    }
  });
  
  expect(responsePost.status()).toBe(201);
  const respBody = await responsePost.json();
  expect(respBody).toHaveProperty('data.id');
  console.log(respBody);

});

// depend on previous test
test('login user', async ({ request, page }: { request: APIRequestContext, page: Page }) => {

  const responsePost = await pwApi.post({request, page},'https://practice.expandtesting.com/notes/api/users/login', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      email: email,
      password: password
    }
  });
  
  expect(responsePost.status()).toBe(200);
  const respBody = await responsePost.json();
  expect(respBody.message).toContain('Login successful');
  expect(respBody.data.token).not.toBeNull();

});

test('create user axios', async ({ page }: {page: Page }) => {
 const date = new Date().getTime().toString()

  const params = new URLSearchParams();
  params.append('name', 'testUser'+ date.substring(10,13));
  params.append('email', 'test_a'+ date.substring(10,13)+'@i.ua');
  params.append('password', '0444009');

  const responsePost = await axiosApi.post({page},'https://practice.expandtesting.com/notes/api/users/register', params, 
    {
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  }
  });
  
  expect(responsePost.status).toBe(201);
  const respBody = await responsePost.data;
  expect(respBody).toHaveProperty('data.id');
  console.log(respBody);

});


