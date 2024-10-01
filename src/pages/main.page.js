import { BasePage } from './base.page';
import { allure } from "allure-playwright";

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.signupButton = this.page.getByRole('link', { name: 'Sign up' });
        this.loginButton = this.page.getByRole('link', { name: 'Login' });
        this.newArticleButton = this.page.getByRole('link', { name: 'New Article' });
        this.homeButton = this.page.getByRole('link', { name: 'Home' }); 
        this.authorButton = this.page.locator('//a[@class="author"]');    
    }

    async goToRegister() {
        await allure.step("Преходим на страницу регистрации", async () => {  
        await this.signupButton.click();
        });
    }

    async goToAuthorization() {
        await allure.step("Преходим на страницу авторзации", async () => { 
        await this.loginButton.click();
    });
    }

    async goToNewArticle() {
        await allure.step("Преходим на страницу создания новой статьи", async () => { 
        await this.newArticleButton.click();
    });
    }

    async goToHome() {
        await allure.step("Преходим на главную страницу", async () => { 
        await this.homeButton.click();
    });
    }

    async getTagByName(tag) {
        await allure.step("Выбираем Тэг", async () => { 
        await this.page.getByRole('button', { name: tag }).click();
    });
      }
    
    async clickOnAuthorButton() {
        await allure.step("Кликаем и переходим в профиль автора ", async () => { 
        await this.authorButton.click();
    });
    }

}
