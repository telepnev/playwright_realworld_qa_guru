import { BasePage } from "./base.page";


export class ProfilePage extends BasePage{
    constructor(page) {
        super(page);
        this.followButton = this.page.getByRole('button', { name : ' Follow '});

    }

    async toFollow() {
        await this.followButton.click();
    }
}