import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';
import { MainPage, LoginPage, ArticlePage, ProfilePage} from '../src/pages/index';


const URL = 'https://realworld.qa.guru/#/';
let articleHelper;

test.describe('Article tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
      // todo перенести в отдельный класс
      const userName = "telep";
      const userEmail = "mail23@mk.ri";
      const userPassword = "1234567";
      const mainPage = new MainPage(page);
      const loginPage = new LoginPage(page);
        
      await mainPage.open(URL);
      await mainPage.goToAuthorization();
      await loginPage.authorizationUser(userEmail, userPassword);

       // await expect(page.getByRole('navigation')).toContainText(userName);

      // todo перенести в отдельный класс
        articleHelper = {
            articleTitle : faker.food.dish(),
            articleAbout : faker.food.ethnicCategory(),
            writeArticle : faker.food.description(),
            newArticleTitle : faker.food.dish(),
            newArticleAbout : faker.food.ethnicCategory(),
            newArticleWRite : faker.food.description(),

            getTag : () => {
                const tags = ["AngelWings","Baklava","Bánh","BánhBao",
                    "BánhCăn","Sbiten","Okroshka","Semolinaporridge",
                    "Kalitki","Kalach","FishRasstegai"]
                let ruslt = tags[randomInt(10)]
                return ruslt;
            }
        };

      });
    

      test('Создание новой статьи', async ({ page }) => {
       
        const createTitle = articleHelper.articleTitle;
        const createArticleAbout = articleHelper.articleAbout;
        const createWriteArticle = articleHelper.writeArticle;
        const createTags = articleHelper.getTag();

        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.goToNewArticle();
        await articlePage.createArticle(createTitle, createArticleAbout, createWriteArticle, createTags);

        await expect(page.getByRole('heading')).toContainText(createTitle);
        await expect(page.locator(".article-content")).toContainText(createWriteArticle);
        await expect(page.locator(".tag-list")).toContainText(createTags);

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
        const profilePage = new ProfilePage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.goToHome();
        await mainPage.getTagByName(tag);
        await mainPage.clickOnAuthorButton();
        await profilePage.selectAnArticle();
        await articlePage.leaveComment(commitMesege);

        await expect(page.locator('.row').nth(1)).toContainText(commitMesege);
  
      });
      

    });