import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class DataService {

    // private apiURL = 'http://localhost:8080/api/';
    private apiURL = 'https://desapp-groupl-backend-testing.herokuapp.com/api/';

    constructor(private http: HttpClient, private authService: AuthService) {}

    validateUser({email, given_name, family_name}) {
        console.log('desaerealizcin');
        console.log(email);
        console.log(given_name);
        console.log(family_name);
        console.log('lanzo el validar prfile');
        return this.http.post<any>(this.apiURL + 'user', {name: given_name, lastName: family_name, email});
    }

    createParty({title, items, invs, date, expirationDate}) {
        console.log('entre al create partty');
        console.log('Los datos ');
        console.log(title);
        console.log(items);
        console.log(invs);
        console.log(date);
        console.log(expirationDate);
        console.log(this.authService.userProfile.email);
        return this.http.post<any>(this.apiURL + 'event/party', {title, owner: this.authService.userProfile.email, items, guests: invs, date, expirationDate});
    }
}
