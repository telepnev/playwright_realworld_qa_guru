import { MainPage, LoginPage, ArticlePage, ProfilePage, RegisterPage, HomePage } from './index';

export class App {
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.articlePage = new ArticlePage(page);
        this.profilePage = new ProfilePage(page);
        this.loginPage = new LoginPage(page);
        this.registerPage = new RegisterPage(page);
        this.homePage = new HomePage(page);
    }
}

