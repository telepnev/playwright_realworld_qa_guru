import { test, expect } from '@playwright/test';
import { ArticleBuilder, UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/index';


const URL = 'https://realworld.qa.guru/#/';
let articleHelper;
let app;
let newUser;
let oldUser;
let newArticle;

test.describe('Article tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
      
      app = new App(page);
      newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();
      oldUser = new UserBuilder().addEmailSuperUser().addPasswordSuperUser().addNameSuperUser().generate();

      newArticle = new ArticleBuilder().addTitle().addArticleAbout().addArticleBody().addTag().generate();
        
      await app.mainPage.open(URL);
      await app.mainPage.goToAuthorization();
      await app.loginPage.authorizationUser(oldUser.emailSuperUser, oldUser.passwordSuperUser);

      });
    

      test('Создание новой статьи', async ({ page }) => {
  
        await app.mainPage.goToNewArticle();
        await app.articlePage.createArticle(newArticle.articleTitle, newArticle.articleAbout, newArticle.writeArticle, newArticle.tags);

        await expect(page.getByRole('heading')).toContainText(newArticle.articleTitle);
        await expect(page.locator(".article-content")).toContainText(newArticle.writeArticle);
        await expect(page.locator(".tag-list")).toContainText(newArticle.tags);

      });

      test('Редактирование статьи после ее создания', async ({ page }) => {
       
        const title = articleHelper.articleTitle;
        const articleAbout = articleHelper.articleAbout;
        const writeArticle = articleHelper.writeArticle;
        const tags = articleHelper.getTag();

        const newTitle = articleHelper.newArticleTitle;
        const newArticleAbout = articleHelper.newArticleAbout;
        const newWriteArticle = articleHelper.newArticleWRite;

        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.goToNewArticle();
        await articlePage.createArticle(title, articleAbout, writeArticle, tags);

        await articlePage.toEditArticleButton();
        await articlePage.editArticle(newTitle, newArticleAbout, newWriteArticle);
        await expect(page.getByRole('heading')).toContainText(newTitle);
      
      });

      test('Удаление статьи после ее создания', async ({ page }) => {
       
        const title = articleHelper.articleTitle;
        const articleAbout = articleHelper.articleAbout;
        const writeArticle = articleHelper.writeArticle;
        const tags = articleHelper.getTag();

        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.goToNewArticle();
        await articlePage.createArticle(title, articleAbout, writeArticle, tags);

        page.on('dialog', dialog => dialog.accept());
        await articlePage.toDeleteArticleButton();
      
        await expect(page.getByRole('button', { name: 'Your Feed' })).toBeVisible();
     
      });

      test('Переход по тегу', async ({ page }) => {
        const tag = 'реклама';
        const articleTitleText = 'Здесь могла бы быть ваша реклама';
        const mainPage = new MainPage(page);

        await mainPage.goToHome();
        await mainPage.getTagByName(tag);

        await expect(page.getByRole('button', { name: tag }).first()).toBeVisible();
        await expect(page.getByText(articleTitleText)).toBeVisible();   
   
      });

      test('Добавление пользователя в избранное', async ({ page }) => {
        const tag = 'реклама';
        const mainPage = new MainPage(page);
        const profilePage = new ProfilePage(page);

        await mainPage.goToHome();
        await mainPage.getTagByName(tag);
        await mainPage.clickOnAuthorButton();
        await profilePage.toFollow();

        await expect(page.getByText(' Unfollow ')).toBeVisible();   
   
      });

      test('Пользователь может оставить коментарий к статье', async ({ page }) => {
        const tag = 'реклама';
        const commitMesege = articleHelper.writeArticle;
        const mainPage = new MainPage(page);
        const profilePage = new ProfilePage(page)

        await mainPage.goToHome();
        await mainPage.getTagByName(tag);
        await mainPage.clickOnAuthorButton();

        //await page.locator('//a[@class="author"]').click();
        await page.locator('.preview-link').click();
        
        await page.getByPlaceholder('Write a comment...').click();
        await page.getByPlaceholder('Write a comment...').fill(commitMesege);
        await page.getByRole('button', { name : 'Post Comment'}).click()

        await expect(page.locator('.row').nth(1)).toContainText(commitMesege);
   
      });


      test('удалить после слияния', async ({ page }) => {
        const tag = 'реклама';
        const commitMesege = articleHelper.writeArticle;
        const mainPage = new MainPage(page);
        const profilePage = new ProfilePage(page)

        await mainPage.goToHome();
        await mainPage.getTagByName(tag);
        await mainPage.clickOnAuthorButton();

        //await page.locator('//a[@class="author"]').click();
        await page.locator('.preview-link').click();
        
        await page.getByPlaceholder('Write a comment...').click();
        await page.getByPlaceholder('Write a comment...').fill(commitMesege);
        await page.getByRole('button', { name : 'Post Comment'}).click()

        await expect(page.locator('.row').nth(1)).toContainText(commitMesege);
   
      });
      

    });