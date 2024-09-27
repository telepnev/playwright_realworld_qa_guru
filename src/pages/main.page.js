import { BasePage } from './base.page';

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.signupButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = this.page.getByRole('link', { name: 'Login' });
    }

    async goToRegister() {
        await this.signupButton.click();
    }

    async goToAuthorization() {
        await this.loginButton.click();

    }
}
