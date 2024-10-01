import { BasePage } from "./base.page";
import { allure } from "allure-playwright";


export class ProfilePage extends BasePage{
    constructor(page) {
        super(page);
        this.followButton = this.page.getByRole('button', { name : ' Follow '});

    }

    async toFollow() {
        await allure.step("Подписаться на автора статьи", async () => { 
        await this.followButton.click();
    });
    }
}