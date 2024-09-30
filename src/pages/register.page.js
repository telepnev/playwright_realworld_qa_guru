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
        await this.usernameField.click();
        await this.usernameField.fill(userName);
        await this.emailField.click();
        await this.emailField.fill(userEmail);
        await this.passwordField.click();
        await this.passwordField.fill(userPassword);
        await this.signupButton.click();
        });
    }

    // С разбиением на компоненты 

    async userNameClickAndFill (userName) {
        await this.usernameField.click();
        await this.usernameField.fill(userName);  
    }
    async userEmailClickAndFill (userEmail) {
        await this.emailField.click();
        await this.emailField.fill(userEmail);  
    }
    async userPasswordClickAndFill (userPassword) {
        await this.passwordField.click();
        await this.passwordField.fill(userPassword);  
    }
    async signupButtonClick (userPassword) {
        await this.signupButton.click();;  
    }
}
