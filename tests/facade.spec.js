import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/index';
//import { MainPage, RegisterPage, LoginPage } from '../src/pages/index';
//todo  url вынести в конфиг или в окружение
const URL = 'https://realworld.qa.guru/#/';
let newUser;
let app;


test.describe.skip('Login Users tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
    /*
      app = new App(page);
      newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();

      await app.mainPage.open(URL);
      await app.mainPage.goToRegister();
      await app.registerPage.registerNewUser(newUser.userName, newUser.userEmail ,newUser.userPassword);
      */
    });
    
      test('Регистрация нового пользователя', async ({ page }) => {
        app = new App(page);
        newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();

       await app.mainPage.open(URL);
       await app.mainPage.goToRegister();
       await app.registerPage.registerNewUser(newUser.userName, newUser.userEmail ,newUser.userPassword);

       await expect(page.locator('.dropdown')).toContainText(newUser.userName);
      });

      test('Авторизация существующего пользователя', async ({ page }) => {
        app = new App(page);
        // todo спрятать данные 
        let userName = "telep";
        let userEmail = "mail23@mk.ri";
        let userPassword = "1234567";
        
        
        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);
          
        await expect(page.getByRole('navigation')).toContainText(userName);
      });

      test('Проверка сообщения "Wrong email/password combination" ', async ({ page }) => {
        app = new App(page);
        let wrongMessage = "Wrong email/password combination";
        let userEmail = "mail23@mk.ri";
        let userPassword = "123456798797979";
        

        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText(wrongMessage);
      });

      test('Проверка сообщения "Email not found sign in first" ', async ({ page }) => {
        app = new App(page);
        let wrongMessage = "Email not found sign in first";
        let userEmail = "mail23@mk1123123213123213131312.ri";
        let userPassword = "123456798797979";
        

        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText(wrongMessage);
      });

    });