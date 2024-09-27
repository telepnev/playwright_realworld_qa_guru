import { BasePage } from "./base.page";


export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailField = this.page.getByPlaceholder('Email');
        this.passwordField = this.page.getByPlaceholder('Password');
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    async authorizationUser (userEmail, userPassword) {
        await this.emailField.click();
        await this.emailField.fill(userEmail);
        await this.emailField.click();
        await this.passwordField.fill(userPassword);
        await this.loginButton.click();
    }
}


