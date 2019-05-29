import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const TOKEN_ID = 'AuthTokenID';
const TOKEN_EXPIRES = 'AuthTokenExpires';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  public saveToken(idToken: string, accessToken: string, expiresAt: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(TOKEN_ID);
    window.sessionStorage.removeItem(TOKEN_EXPIRES);
    window.sessionStorage.setItem(TOKEN_KEY, accessToken);
    window.sessionStorage.setItem(TOKEN_ID, idToken);
    window.sessionStorage.setItem(TOKEN_EXPIRES, expiresAt);
  }

  public getAccessToken() {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getIdToken() {
    return window.sessionStorage.getItem(TOKEN_ID);
  }

  public getExpiresAt() {
    return window.sessionStorage.getItem(TOKEN_EXPIRES);
  }

  public clear() {
    window.sessionStorage.clear();
  }
}
