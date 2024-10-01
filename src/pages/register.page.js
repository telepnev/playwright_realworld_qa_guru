import { BasePage } from "./base.page";
import { allure } from "allure-playwright";

export class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailField = this.page.getByPlaceholder('Email');
        this.passwordField = this.page.getByPlaceholder('Password');
        this.usernameField = this.page.getByPlaceholder('Your Name');
        this.signupButton = this.page.getByRole('button', { name: 'Sign up' });
    }

    async registerNewUser (userName, userEmail, userPassword) {
        await allure.step("Вводим Имя пользователя, Email, Password", async () => {
            await allure.step("Заполняем Имя пользователя", async () => {  
        await this.usernameField.click();
        await this.usernameField.fill(userName);
    });
    await allure.step("Заполняем Email", async () => {
        await this.emailField.click();
        await this.emailField.fill(userEmail);
    });
    await allure.step("Заполняем Password", async () => {
        await this.passwordField.click();
        await this.passwordField.fill(userPassword);
    });  
    await allure.step("Кликаем по кнопке Sign up", async () => {
        await this.signupButton.click();
       });
    }); 
    }

    // С разбиением на компоненты 

    async userNameClickAndFill (userName) {
        await allure.step("Вводим Имя пользователя", async () => {
        await this.usernameField.click();
        await this.usernameField.fill(userName); 
        }); 
    }
    async userEmailClickAndFill (userEmail) {
        await allure.step("Вводим  Email", async () => {
        await this.emailField.click();
        await this.emailField.fill(userEmail);
    });   
    }
    async userPasswordClickAndFill (userPassword) {
        await allure.step("Вводим рандомный Password", async () => {
        await this.passwordField.click();
        await this.passwordField.fill(userPassword);  
    }); 
    }
    async signupButtonClick (userPassword) {
        await allure.step("Вводим  Password", async () => {
        await this.signupButton.click();;  
    }); 
    }
}
