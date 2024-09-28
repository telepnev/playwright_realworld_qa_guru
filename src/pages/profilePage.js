import { BasePage } from "./base.page";


export class ProfilePage extends BasePage{
    constructor(page) {
        super(page);
        this.followButton = this.page.getByRole('button', { name : ' Follow '});
        this.articleSelection = this.page.locator('.preview-link');

    }

    async toFollow() {
        await this.followButton.click();
    }

    async selectAnArticle() {
        await this.articleSelection.click();
    }
}