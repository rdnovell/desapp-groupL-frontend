import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

    private idToken: string;
    private accessToken: string;
    private expiresAt: number;
    public userProfile: any;

    auth0 = new auth0.WebAuth({
        clientID: 'a7djieuPai3FOAURUz5QDbbeCCIUFdCz',
        domain: 'dev-4av88gbm.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'https://eventeando-grupol.herokuapp.com/',
        // redirectUri: 'http://localhost:4200/',
        scope: 'openid profile email'
    });

    // private apiURL = 'http://localhost:8080/api/';
    private apiURL = 'https://desapp-groupl-backend-testing.herokuapp.com/api/';

    constructor(public router: Router, private http: HttpClient) {
        this.idToken = '';
        this.accessToken = '';
        this.expiresAt = 0;
        this.handleAuthentication();
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken) {
                window.location.hash = '';
                this.idToken = authResult.idToken;
                this.accessToken = authResult.accessToken;
                this.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
                this.router.navigate(['/profile']);
            } else if (err) {
                this.router.navigate(['/']);
                console.log(err);
            }
        });
    }

    public logout(): void {
        this.accessToken = '';
        this.idToken = '';
        this.expiresAt = 0;
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        return this.accessToken && Date.now() < this.expiresAt;
    }

    public getProfile(cb) {
        if (!this.accessToken) {
            throw new Error('Access Token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    getUserBalance(email: string) {
            return this.http.get<number>(this.apiURL + 'user/balance/' + email);
    }

}
