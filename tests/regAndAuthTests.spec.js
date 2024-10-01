import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/index';
import { allure } from "allure-playwright";

const URL = 'https://realworld.qa.guru/#/';
let app;
let newUser;
let oldUser;

test.describe('Login Users tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
      app = new App(page);
      newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();
      oldUser = new UserBuilder().addEmailSuperUser().addPasswordSuperUser().addNameSuperUser().generate();
      });
    
      test('Регистрация нового пользователя', async ({ page }) => {
           await allure.owner("Evgeny Telepnev");
           await allure.tags("UI", "smoke", "Authentication", "regres");
           await allure.feature("Authentication new User");
           await allure.story("Authentication");

                await app.mainPage.open(URL);
                await app.mainPage.goToRegister();
                await app.registerPage.registerNewUser(newUser.userName, newUser.userEmail ,newUser.userPassword);
   
       await expect(page.locator('.dropdown')).toContainText(newUser.userName);
      });

      test('Авторизация существующего пользователя', async ({ page }) => {
        await allure.owner("Evgeny Telepnev");
           await allure.tags("UI", "smoke", "Authentication", "regres");
           await allure.feature("Authentication new User");
           await allure.story("Authentication");

        await allure.owner("Evgeny Telepnev");
           await allure.tags("UI", "smoke", "Authentication", "regres");
           await allure.feature("Authentication");
           await allure.story("Authentication");

        let userName = oldUser.nameSuperUser;
        let userEmail = oldUser.emailSuperUser; 
        let userPassword = oldUser.passwordSuperUser;

        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);
          
        await expect(page.getByRole('navigation')).toContainText(userName);
      });

      test('Проверка сообщения "Wrong email/password combination" ', async ({ page }) => {
        await allure.owner("Evgeny Telepnev");
           await allure.tags("UI", "smoke", "Authentication", "regres");
           await allure.feature("Authentication new User");
           await allure.story("Authentication");

        await allure.owner("Evgeny Telepnev");
           await allure.tags("UI", "smoke", "Authentication", "regres");
           await allure.feature("Message - Wrong email/password combination");
           await allure.story("Authentication");

        let wrongMessage = "Wrong email/password combination";
        let userEmail = oldUser.emailSuperUser; 
        let userPassword = newUser.userEmail;

        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText(wrongMessage);
      });

      test('Проверка сообщения "Email not found sign in first" ', async ({ page }) => {
   
        await allure.owner("Evgeny Telepnev");
           await allure.tags("UI", "smoke", "Authentication", "regres");
           await allure.feature("Message - Email not found sign in first");
           await allure.story("Authentication");

        let wrongMessage = "Email not found sign in first";
        let userEmail = newUser.userEmail;
        let userPassword = newUser.userPassword;

        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText(wrongMessage);
      });
    });