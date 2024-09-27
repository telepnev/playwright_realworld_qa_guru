import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { LoginPage } from '../src/pages/login.page';


let newUser;
const URL = 'https://realworld.qa.guru/#/';



test.describe('Login Users tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
         newUser = {
            userName : faker.person.firstName('male'),
            userEmail : faker.internet.email(),
            userPassword : faker.internet.password(8)
         };

         const superUser = {
          
         };
      });
    
      test('Регистрация нового пользователя', async ({ page }) => {
       const mainPage = new MainPage(page);
       const registerPage = new RegisterPage(page);

       await mainPage.open(URL);
       await mainPage.goToRegister();
       await registerPage.registerNewUser(newUser.userName, newUser.userEmail ,newUser.userPassword);

       await expect(page.locator('.dropdown')).toContainText(newUser.userName);
      });

      test('Авторизация существующего пользователя', async ({ page }) => {
        let userName = "telep";
        let userEmail = "mail23@mk.ri";
        let userPassword = "1234567";
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);
        

        await mainPage.open(URL);
        await mainPage.goToAuthorization();
        await loginPage.authorizationUser(userEmail, userPassword);
          
        await expect(page.getByRole('navigation')).toContainText(userName);
      });

      test('Проверка сообщения "Wrong email/password combination" ', async ({ page }) => {
        let wrongMessage = "Wrong email/password combination";
        let userEmail = "mail23@mk.ri";
        let userPassword = "123456798797979";
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await mainPage.open(URL);
        await mainPage.goToAuthorization();
        await loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText("Wrong email/password combination");
      });

      test('Проверка сообщения "Email not found sign in first" ', async ({ page }) => {
        let wrongMessage = "Wrong email/password combination";
        let userEmail = "mail23@mk1123123213123213131312.ri";
        let userPassword = "123456798797979";
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);

        await mainPage.open(URL);
        await mainPage.goToAuthorization();
        await loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.locator('.error-messages')).toContainText("Email not found sign in first");
      });

    });