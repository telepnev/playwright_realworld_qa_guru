import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let newUser;
const URL = 'https://realworld.qa.guru/#/';

/*
telep
mail23@mk.ri
1234567
*/


test.describe.only('Login Users tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
         newUser = {
            userName : faker.person.firstName('male'),
            userEmail : faker.internet.email(),
            userPassword : faker.internet.password(8)
         };

         const USER = {
            userName : "telep",
            userEmail : "mail23@mk.ri",
            userPassword : "1234567"
         };


      });
    
      test('Регистрация нового пользователя', async ({ page }) => {
        await page.goto(URL);
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByPlaceholder('Your Name').click();
        await page.getByPlaceholder('Your Name').fill(newUser.userName);
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(newUser.userEmail);
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill(newUser.userPassword);
        await page.getByRole('button', { name: 'Sign up' }).click();
        await expect(page.getByRole('navigation')).toContainText(newUser.userName);
      });

      test('Авторизация существующего пользователя', async ({ page }) => {
        await page.goto(URL);
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill("mail23@mk.ri");
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill("1234567");
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByRole('navigation')).toContainText("telep");
      });

      test('Проверка сообщения "Wrong email/password combination" ', async ({ page }) => {
        await page.goto(URL);
        let wrongMessage = "Wrong email/password combination";
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill("mail23@mk.ri");
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill(newUser.userPassword);
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('.error-messages')).toContainText("Wrong email/password combination");
      });

      test('Проверка сообщения "Email not found sign in first" ', async ({ page }) => {
        await page.goto(URL);
        let wrongMessage = "Wrong email/password combination";
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(newUser.userEmail);
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill(newUser.userPassword);
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('.error-messages')).toContainText("Email not found sign in first");
      });

    });