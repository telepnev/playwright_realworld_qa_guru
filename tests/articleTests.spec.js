import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';


const URL = 'https://realworld.qa.guru/#/';
let articleHelper;

test.describe.skip('Article tests', () => {
    test.beforeEach('Create User', async ({ page }) => {

        const DEFAULT_USER = {
            userName : "telep",
            userEmail : "mail23@mk.ri",
            userPassword : "1234567"
         };
         
        await page.goto(URL);
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(DEFAULT_USER.userEmail);
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill(DEFAULT_USER.userPassword);
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.getByRole('navigation')).toContainText("telep");


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

        await page.getByRole('link', { name: 'New Article' }).click();
        await page.getByPlaceholder('Article Title').click();
        await page.getByPlaceholder('Article Title').fill(title);
        await page.getByPlaceholder('What\'s this article about?').click();
        await page.getByPlaceholder('What\'s this article about?').fill(articleAbout);
        await page.getByPlaceholder('Write your article (in').click();
        await page.getByPlaceholder('Write your article (in').fill(writeArticle);
        await page.getByPlaceholder('Enter tags').click();
        await page.getByPlaceholder('Enter tags').fill(tags);
        await page.getByRole('button', { name: 'Publish Article' }).click();
    
        await expect(page.getByRole('heading')).toContainText(title);
        await expect(page.locator(".article-content")).toContainText(writeArticle);
        await expect(page.locator(".tag-list")).toContainText(tags);
      });


    });