import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { AuthService } from './auth.service';
import {ItemModel} from '../model/item';

@Injectable()
export class DataService {

    // private apiURL = 'http://localhost:8080/api/';
    private apiURL = 'https://desapp-groupl-backend.herokuapp.com/api/';

    constructor(private http: HttpClient, private authService: AuthService) {}

    validateUser({email, given_name, family_name}) {
        return this.http.post<any>(this.apiURL + 'user', {name: given_name, lastName: family_name, email});
    }

    createParty({title, items, invs, date, expirationDate}) {
        const body = {title, owner: this.authService.userProfile.email, items, guests: invs, date, expirationDate};
        return this.http.post<any>(this.apiURL + 'event/party', body);
    }

    getItems() {
        return this.http.get<ItemModel[]>(this.apiURL + 'items');
    }

    getGuestedEvents(email: string) {
        let params = new HttpParams();
        params = params.set('email', email);
        return this.http.get<any>(this.apiURL + 'user/guest-events', {params});
    }

    getOwnerEvents(email: string) {
        let params = new HttpParams();
        params = params.set('email', email);
        return this.http.get<any>(this.apiURL + 'user/owner-events', {params});
    }

    assistToAnEvent(data: {userEmail, eventId}) {
        return this.http.put(this.apiURL + 'event/guest-confirmated', data);
    }

    crearItem(item: ItemModel) {
        return this.http.post(this.apiURL + 'items', item);
    }

    delEvent(id: any) {
        return this.http.delete(this.apiURL + 'event/party/' + id);
    }

    getAssistedEvents(email: string) {
        let params = new HttpParams();
        params = params.set('email', email);
        return this.http.get<any>(this.apiURL + 'user/assisted-events', {params});
    }

    updateItemsToEvent(data: {eventId, itemsTitle}) {
        return this.http.put(this.apiURL + 'event/party/items', data);
    }

    updateGuestToEvent(data: {eventId, userEmails}) {
        return this.http.put(this.apiURL + 'event/party/guests', data);
    }
    getTopEvents() {
        return this.http.get<any>(this.apiURL + 'event/top-events');
    }

    getAvailableLoan(email: string) {
        let params = new HttpParams();
        params = params.set('email', email);
        return this.http.get<any>(this.apiURL + 'loan/valid', {params});
    }

    createLoan(email: string) {
        console.log('en el create loan service ' + email);
        let params = new HttpParams();
        params = params.set('email', email);
        return this.http.post<any>(this.apiURL + 'loan/create', {}, {params});
    }

    getUserLoans(email: string) {
        let params = new HttpParams();
        params = params.set('email', email);
        return this.http.get<any>(this.apiURL + 'loan/loans', {params});
    }
}
