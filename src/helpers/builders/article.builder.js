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
        this.getTag = () => {
            const tags = ["AngelWings","Baklava","Bánh","BánhBao",
                "BánhCăn","Sbiten","Okroshka","Semolinaporridge",
                "Kalitki","Kalach","FishRasstegai"]
            let result = tags[randomInt(10)]
            return result;
        }
        return this;
    }

    generate() {
        const copied = structuredClone({
            articleTitle : this.articleTitle,
            articleAbout : this.articleAbout,
            writeArticle : this.writeArticle,
            getTag : this.getTag
        });
        return copied;
    }

}
