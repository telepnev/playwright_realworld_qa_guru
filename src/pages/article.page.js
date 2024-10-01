import { BasePage } from "./base.page";
import { allure } from "allure-playwright";


export class ArticlePage extends BasePage{
    constructor(page) {
        super(page);
        this.articleTitle = this.page.getByPlaceholder('Article Title');
        this.articleAbout = this.page.getByPlaceholder('What\'s this article about?');
        this.writeYourArticle = this.page.getByPlaceholder('Write your article (in markdown)');
        this.articleTags = this.page.getByPlaceholder('Enter tags');
        this.publishArticleButton = this.page.getByRole('button', { name: 'Publish Article' });
        this.deleteArticleButton = this.page.getByRole('button', { name: 'Delete Article' }).first();
        this.editArticleButton = this.page.getByRole('link', { name: 'Edit Article' }).nth(1);
        this.updateArticleButton = this.page.getByRole('button', { name: ' Update Article' });
      

    }

    async createArticle(articleTitle, articleAbout, writeYourArticle, articleTags) {
        await allure.step("Создаем статью", async () => {

        await allure.step("Вводим articleTitle", async () => {

        await this.articleTitle.click();
        await this.articleTitle.fill(articleTitle);
    });
        await allure.step("Вводим articleAbout", async () => {

        await this.articleAbout.click();
        await this.articleAbout.fill(articleAbout);
    });
        await allure.step("Вводим body article", async () => {

        await this.writeYourArticle.click();
        await this.writeYourArticle.fill(writeYourArticle);
    });
        await allure.step("Добавлеяем tag", async () => {

        await this.articleTags.click();
        await this.articleTags.fill(articleTags);
    });
        await allure.step("Публикуем статью от редактированную статью", async () => {

        await this.publishArticleButton.click();
    });
        });

    }

    async editArticle(articleTitle, articleAbout, writeYourArticle) {
            await allure.step("Вводим articleTitle", async () => {

            await this.articleTitle.click();
            await this.articleTitle.fill(articleTitle);
        });
            await allure.step("Вводим articleAbout", async () => {

            await this.articleAbout.click();
            await this.articleAbout.fill(articleAbout);
        });
            await allure.step("Вводим body article", async () => {

            await this.writeYourArticle.click();
            await this.writeYourArticle.fill(writeYourArticle);
        });
            await allure.step("Жмем кнопку обновить статью", async () => {

            await this.updateArticleButton.click();
    });
    }

    async toDeleteArticleButton() {
        await allure.step("Жмем кнопку deleteArticle", async () => {

        await this.deleteArticleButton.click();
    });
    }

    async toEditArticleButton() {
        await allure.step("Жмем кнопку editArticle", async () => {

        await this.editArticleButton.click();
    });
    }

    async toUpdateArticleButton() {
        await allure.step("Жмем кнопку updateArticle", async () => {

        await this.updateArticleButton.click();
    });
    }

    async confirmDeletionArticle() {
         await allure.step("Подверждаем удаление статьи в Alert окне", async () => {

         await this.page.on('dialog', dialog => dialog.accept());
        });
    }  
    
}
