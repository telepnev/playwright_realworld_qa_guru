import { faker } from '@faker-js/faker';

export class UserBuilder {
    addName() {
        this.userName = faker.person.firstName('male');
        return this;
    }
    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }
    addUserPassword() {
        this.userPassword = faker.internet.password(8);
        return this;
    }
    addPasswordFail() {
        this.userPasswordFail = faker.internet.password(3)
        return this;
    }
    addUserBio() {
        this.UserBio = faker.animal.bear();
        return this;
    }

    addEmailSuperUser() {
        this.emailSuperUser = 'evgen@telepnev.mail';
        return this;
    }

    addPasswordSuperUser() {
        this.passwordSuperUser = 'qwerty123';
        return this;
    }
    addNameSuperUser() {
        this.nameSuperUser = 'EvgenTe';
        return this;
    }

    generate() {
        const copied = structuredClone ({
            userName : this.userName,
            userEmail : this.userEmail,
            userPassword : this.userPassword,
            userPasswordFail : this.userPasswordFail,
            UserBio : this.UserBio,
            emailSuperUser : this.emailSuperUser,
            passwordSuperUser : this.passwordSuperUser,
            nameSuperUser : this.nameSuperUser

        });
         return copied;
    }
    
}
