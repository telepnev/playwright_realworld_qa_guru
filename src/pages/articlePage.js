import { BasePage } from "./base.page";


export class ArticlePage extends BasePage{
    constructor(page) {
        super(page);
        this.articleTitle = this.page.getByPlaceholder('Article Title');
        this.articleAbout = this.page.getByPlaceholder('What\'s this article about?');
        this.writeYourArticle = this.page.getByPlaceholder('Write your article (in markdown)');
        this.articleTags = this.page.getByPlaceholder('Enter tags');
        this.publishArticleButton = this.page.getByRole('button', { name: 'Publish Article' });

    }

    async createNewArticle(articleTitle, articleAbout, writeYourArticle, articleTags) {
        await this.articleTitle.click();
        await this.articleTitle.fill(articleTitle);
        await this.articleAbout.click();
        await this.articleAbout.fill(articleAbout);
        await this.writeYourArticle.click();
        await this.writeYourArticle.fill(writeYourArticle);
        await this.articleTags.click();
        await this.articleTags.fill(articleTags);
        await this.publishArticleButton.click();

    }
}
