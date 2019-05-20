import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    isUserLoggedIn = false;

    isAuthenticated() {
        return this.isUserLoggedIn;
    }

    login() {
        this.isUserLoggedIn = true;
    }

    logout() {
        this.isUserLoggedIn = false;
    }
}
