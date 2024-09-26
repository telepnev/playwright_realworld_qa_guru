import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';


test.only('Создание новой статьи', async ({ }) => {

    let dog = {
        dogNaem : 'Stesha',
        weight: 2.5,
        color : 'mixed',
        breed : 'chihuahua',
        age : 3,
        childrens : {
            menName : 'Djek',
            ageMen : 1,
            womanName : 'Lena',
            ageWoman : 0.7
        }  
    }
       
    console.log(dog);
    dog.weight = 3.0;
    dog.age = 4;
    dog.childrens.ageWoman = 777;
    console.log(dog);
  });

