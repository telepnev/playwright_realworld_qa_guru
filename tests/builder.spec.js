import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserBuilder } from '../src/helpers/index';
import { MainPage, RegisterPage, LoginPage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/#/';
let newUser;

test.describe('Builder', () => {
    test.beforeEach('Create User', async ({ page }) => {
        newUser = new UserBuilder().addName().addEmail().addUserPassword()
        .addEmailSuperUser().addPasswordSuperUser().addNameSuperUser().generate();
       
      });
  
   
      test('Регистрация нового пользователя', async ({ page }) => {
       const mainPage = new MainPage(page);
       const registerPage = new RegisterPage(page);

      // newUser = new UserBuilder().addName().addEmail().addUserPassword().addEmailSuperUser().generate();

       await mainPage.open(URL);
       await mainPage.goToRegister();
       await registerPage.registerNewUser(newUser.userName, newUser.userEmail ,newUser.userPassword);

       await expect(page.locator('.dropdown')).toContainText(newUser.userName);
      });


      test('Super user', async ({ page }) => {
        console.log(newUser.emailSuperUser);
        console.log(newUser.passwordSuperUser);
        console.log(newUser.nameSuperUser);
        
       });
    });