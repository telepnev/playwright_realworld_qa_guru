import { BasePage } from "./base.page";


export class ArticlePage extends BasePage{
    constructor(page) {
        super(page);
        this.articleTitle = this.page.getByPlaceholder('Article Title');
        this.articleAbout = this.page.getByPlaceholder('What\'s this article about?');
        this.writeYourArticle = this.page.getByPlaceholder('Write your article (in markdown)');
        this.articleTags = this.page.getByPlaceholder('Enter tags');
        this.publishArticleButton = this.page.getByRole('button', { name: 'Publish Article' });
        this.deleteArticleButton = this.page.getByRole('button', { name: 'Delete Article' }).first();
        this.editArticleButton = this.page.getByRole('button', { name: ' Edit Article' }).first();
        this.updateArticleButton = this.page.getByRole('button', { name: ' Update Article' });
        this.commentField = this.page.getByPlaceholder('Write a comment...');
        this.postComment = this.page.getByRole('button', { name : 'Post Comment'});

    }

    async createArticle(articleTitle, articleAbout, writeYourArticle, articleTags) {
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

    async editArticle(articleTitle, articleAbout, writeYourArticle) {
        await this.articleTitle.click();
        await this.articleTitle.clear();
        await this.articleTitle.fill(articleTitle);
        await this.articleAbout.click();
        await this.articleAbout.clear();
        await this.articleAbout.fill(articleAbout);
        await this.writeYourArticle.click();
        await this.writeYourArticle.clear();
        await this.writeYourArticle.fill(writeYourArticle);
        await this.articleTags.click();
        await this.updateArticleButton.click();

    }

    async toDeleteArticleButton() {
        await this.deleteArticleButton.click();
    }

    async toEditArticleButton() {
        await this.editArticleButton.click();
    }

    async toUpdateArticleButton() {
        await this.updateArticleButton.click();
    }

    async confirmDeletionArticle() {
            this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
          });
    }

    async leaveComment(textComment) {
        await this.commentField.click();
        await this.commentField.fill(textComment);
        await this.postComment.click();
    }
    
}
