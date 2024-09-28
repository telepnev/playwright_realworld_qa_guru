import { BasePage } from './base.page';

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.signupButton = this.page.getByRole('link', { name: 'Sign up' });
        this.loginButton = this.page.getByRole('link', { name: 'Login' });
        this.newArticleButton = this.page.getByRole('link', { name: 'New Article' });
        this.homeButton = this.page.getByRole('link', { name: 'Home' });     
    }

    async goToRegister() {
        await this.signupButton.click();
    }

    async goToAuthorization() {
        await this.loginButton.click();

    }

    async goToNewArticle() {
        await this.newArticleButton.click();
    }

    async goToHome() {
        await this.homeButton.click();
    }

    async getTagByName(tag) {
        await this.page.getByRole('button', { name: tag }).click();
      }
    

}
