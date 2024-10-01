import { test, expect } from '@playwright/test';
import { ArticleBuilder, UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/index';


const URL = 'https://realworld.qa.guru/#/';
let articleHelper;
let app;
let newUser;
let oldUser;
let newArticle;
let upDateArticle;

test.describe('Article tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
      
      app = new App(page);
      newUser = new UserBuilder().addName().addEmail().addUserPassword().generate();
      oldUser = new UserBuilder().addEmailSuperUser().addPasswordSuperUser().addNameSuperUser().generate();

      newArticle = new ArticleBuilder().addTitle().addArticleAbout().addArticleBody().addTag().generate();
      upDateArticle = new ArticleBuilder().addTitle().addArticleAbout().addArticleBody().addTag().generate();
        
      await app.mainPage.open(URL);
      await app.mainPage.goToAuthorization();
      await app.loginPage.authorizationUser(oldUser.emailSuperUser, oldUser.passwordSuperUser);

      });
    

      test('Создание новой статьи', async ({ page }) => {
  
        await app.mainPage.goToNewArticle();
        await app.articlePage.createArticle(newArticle.articleTitle, newArticle.articleAbout,
           newArticle.writeArticle, newArticle.tags);

        await expect(page.getByRole('heading')).toContainText(newArticle.articleTitle);
        await expect(page.locator(".article-content")).toContainText(newArticle.writeArticle);
        await expect(page.locator(".tag-list")).toContainText(newArticle.tags);

      });

      test('Редактирование статьи после ее создания', async ({ page }) => {
       
        await app.mainPage.goToNewArticle();
        await app.articlePage.createArticle(newArticle.articleTitle, newArticle.articleAbout,
           newArticle.writeArticle, newArticle.tags);

        await app.articlePage.toEditArticleButton();
        await app.articlePage.editArticle(upDateArticle.articleTitle, upDateArticle.articleAbout,
          upDateArticle.writeArticle, upDateArticle.tags);
          await expect(page.getByRole('heading')).toContainText(upDateArticle.articleTitle);
          await expect(page.locator(".article-page")).toContainText(upDateArticle.writeArticle);
       
      
      });

      test('Удаление статьи после ее создания', async ({ page }) => {
       
        await app.mainPage.goToNewArticle();
        await app.articlePage.createArticle(newArticle.articleTitle, newArticle.articleAbout,
           newArticle.writeArticle, newArticle.tags);

        await app.articlePage.confirmDeletionArticle()
        await app.articlePage.toDeleteArticleButton();
      
        await expect(page.getByRole('button', { name: 'Your Feed' })).toBeVisible();
     
      });

      test('Переход по тегу', async ({ page }) => {
        const tag = 'реклама';
        const articleTitleText = 'Здесь могла бы быть ваша реклама';

        await app.mainPage.goToHome();
        await app.mainPage.getTagByName(tag);

        await expect(page.getByRole('button', { name: tag }).first()).toBeVisible();
        await expect(page.getByText(articleTitleText)).toBeVisible();   
   
      });

      test('Добавление пользователя в избранное', async ({ page }) => {
        const tag = 'реклама';

        await app.mainPage.goToHome();
        await app.mainPage.getTagByName(tag);
        await app.mainPage.clickOnAuthorButton();
        await app.profilePage.toFollow();

        await expect(page.getByText(' Unfollow ')).toBeVisible();   
   
      });

      test('Пользователь может оставить коментарий к статье', async ({ page }) => {
        const tag = 'реклама';
        const commitMesege = newArticle.articleAbout;
    
        await app.mainPage.goToHome();
        await app.mainPage.getTagByName(tag);
        await app.mainPage.clickOnAuthorButton();
      
        await page.locator('.preview-link').click();
        
        await page.getByPlaceholder('Write a comment...').click();
        await page.getByPlaceholder('Write a comment...').fill(commitMesege);
        await page.getByRole('button', { name : 'Post Comment'}).click()

        await expect(page.locator('.row').nth(1)).toContainText(commitMesege);
   
      });

    });