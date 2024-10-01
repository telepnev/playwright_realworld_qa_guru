import { BasePage } from "./base.page";
import { allure } from "allure-playwright";

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailField = this.page.getByPlaceholder('Email');
        this.passwordField = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    async authorizationUser (userEmail, userPassword) {
        await allure.step("Авторизуемся пользователем", async () => {
            await allure.step("Вводим userEmail", async () => {
        await this.emailField.click();
        await this.emailField.fill(userEmail);
    });
    await allure.step("Вводим userPassword", async () => {
        await this.emailField.click();
        await this.passwordField.fill(userPassword);
    });
    await allure.step("Кликаем по кнопке Login", async () => {
        await this.loginButton.click();
        });
    });
    }
}


