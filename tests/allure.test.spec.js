import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/index';
import { allure } from "allure-playwright";


//todo  url вынести в конфиг или в окружение
const URL = 'https://realworld.qa.guru/#/';
let newUser;
let app;


test.describe.only('Login Users tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
    
      app = new App(page);
      newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();
     
    });
    
      test('Регистрация нового пользователя', async ({ page }) => {
        await allure.owner("Evgeny Telepnev");
            await allure.tags("UI", "smoke", "Authentication", "regres");
           // await allure.severity(Severity.CRITICAL);
            await allure.link("https://example.com/docs", "Related Documentation");
            await allure.issue("AUTH-123", "https://example.com/issues/AUTH-123");
            await allure.tms("TMS-456", "https://example.com/tms/TMS-456");
            await allure.epic("Web interface");
            await allure.feature("Essential features");
            await allure.story("Authentication");
            await allure.parentSuite("Web interface");
            await allure.suite("Essential features");
            await allure.subSuite("Authentication");
            
        app = new App(page);
        newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();
  
      await app.mainPage.open(URL);
      await app.mainPage.goToRegister();
     
      await allure.step("Ввод Имени, почты, пароля", async () => {
      await app.registerPage.registerNewUser(newUser.userName, newUser.userEmail ,newUser.userPassword);
    });
       
      await expect(page.locator('.dropdown')).toContainText(newUser.userName);
     
    });

      test('Авторизация существующего пользователя', async ({ page }) => {
        app = new App(page);
        // todo спрятать данные 
        const userName = "telep";
        const userEmail = "mail23@mk.ri";
        const userPassword = "1234567";
        
        
        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);
          
        await expect(page.getByRole('navigation')).toContainText(userName);
      });

      test('Проверка сообщения "Wrong email/password combination" ', async ({ page }) => {
        app = new App(page);
        const wrongMessage = "Wrong email/password combination";
        const userEmail = "mail23@mk.ri";
        const userPassword = "123456798797979";
        

        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText(wrongMessage);
      });

      test('Проверка сообщения "Email not found sign in first" ', async ({ page }) => {
        app = new App(page);
        const wrongMessage = "Email not found sign in first";
        const userEmail = "mail23@mk1123123213123213131312.ri";
        const userPassword = "123456798797979";
        

        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText(wrongMessage);
      });

      test('гиттт', async ({ page }) => {
        app = new App(page);
        const wrongMessage = "Email not found sign in first";
        const userEmail = "mail23@mk1123123213123213131312.ri";
        const userPassword = "123456798797979";
        

        await app.mainPage.open(URL);
        await app.mainPage.goToAuthorization();
        await app.loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText(wrongMessage);
      });



    });