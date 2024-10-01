import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    addTitle(){
        this.articleTitle = faker.food.dish();
        return this;
    }

    addArticleAbout() {
        this.articleAbout = faker.food.ethnicCategory();
        return this;
    }

    addArticleBody() {
       this.writeArticle = faker.food.description();
       return this;
    }

    addTag() {
        this.tags = faker.person.firstName();
        return this;
    }

    generate() {
        const copied = structuredClone({
            articleTitle : this.articleTitle,
            articleAbout : this.articleAbout,
            writeArticle : this.writeArticle,
            tags : this.tags
        });
        return copied;
    }

}
