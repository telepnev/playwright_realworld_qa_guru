import { allure } from "allure-playwright";
export class BasePage {
    constructor(page) {
        this.page = page;
    }
    async open(url) {
        await allure.step("Открываем Realworld", async () => {
        await this.page.goto(url);
        });
    }
}