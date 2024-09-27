import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';
import { MainPage, LoginPage, ArticlePage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/#/';
let articleHelper;

test.describe.only('Article tests', () => {
    test.beforeEach('Create User', async ({ page }) => {
      // todo перенести в отдельный класс
        let userName = "telep";
        let userEmail = "mail23@mk.ri";
        let userPassword = "1234567";
        const mainPage = new MainPage(page);
        const loginPage = new LoginPage(page);
        
        await mainPage.open(URL);
        await mainPage.goToAuthorization();
        await loginPage.authorizationUser(userEmail, userPassword);

        await expect(page.getByRole('navigation')).toContainText(userName);

      // todo перенести в отдельный класс
        articleHelper = {
            articleTitle : faker.food.dish(),
            articleAbout : faker.food.ethnicCategory(),
            writeArticle : faker.food.description(),
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
       
        let title = articleHelper.articleTitle;
        let articleAbout = articleHelper.articleAbout;
        let writeArticle = articleHelper.writeArticle;
        let tags = articleHelper.getTag();

        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.goToNewArticle();
        await articlePage.createNewArticle(title, articleAbout, writeArticle, tags);

        await expect(page.getByRole('heading')).toContainText(title);
        await expect(page.locator(".article-content")).toContainText(writeArticle);
        await expect(page.locator(".tag-list")).toContainText(tags);

      });


    });