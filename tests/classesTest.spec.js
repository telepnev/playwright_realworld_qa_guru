import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';


test.describe.only('Article tests', () => {
    test('Create User', async ({ page }) => {

        class Animal {
            constructor(snakeName, catAge = 4) {
                this.dogName = 'Doogee';
                this.catName = 'Catyeess';
                this.snakeName = snakeName;
                this.catAge = catAge;
            }

            sayDog() {
                const voice = 'Wow';
                return voice;
            }
        }

        let animal = new Animal();
        let foo = new Animal('snayk', 10);
        console.log(animal);
        animal.sayDog();
        console.log(foo);
        

      });

      

});

    