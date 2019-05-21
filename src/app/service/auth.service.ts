import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

    private idToken: string;
    private accessToken: string;
    private expiresAt: number;
    userProfile: any;

    auth0 = new auth0.WebAuth({
        clientID: 'a7djieuPai3FOAURUz5QDbbeCCIUFdCz',
        domain: 'dev-4av88gbm.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/',
        scope: 'openid'
    });

    constructor(public router: Router) {
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

                console.log(authResult);
                this.getProfile();
            } else if (err) {
                this.router.navigate(['/']);
                console.log(err);
            }
        });
    }

    public logout(): void {
        // Remove tokens and expiry time
        this.accessToken = '';
        this.idToken = '';
        this.expiresAt = 0;

        this.auth0.logout({
            returnTo: window.location.origin
        });
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        return this.accessToken && Date.now() < this.expiresAt;
    }

    public getProfile(): void {
        if (!this.accessToken) {
            throw new Error('Access Token must exist to fetch profile');
        }

        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
            this.userProfile = profile;
            console.log(profile);
        }, (err) => {
            console.log(err);
        });

    }
}
