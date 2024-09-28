import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserBuilder } from '../src/helpers/index';
import { MainPage, RegisterPage, LoginPage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/#/';
let newUser;

test.describe.only('Builder', () => {
    test.beforeEach('Create User', async ({ page }) => {
        /*
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);
        newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();

        await mainPage.open(URL);
        await mainPage.goToRegister();
        await registerPage.registerNewUser(newUser.userName, newUser.userEmail ,newUser.userPassword);
        */
       
      });
  
   
      test('Регистрация нового пользователя', async ({ page }) => {
       const mainPage = new MainPage(page);
       const registerPage = new RegisterPage(page);

       newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();

       await mainPage.open(URL);
       await mainPage.goToRegister();
       await registerPage.registerNewUser(newUser.userName, newUser.userEmail ,newUser.userPassword);

       await expect(page.locator('.dropdown')).toContainText(newUser.userName);
      });
    });