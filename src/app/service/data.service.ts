import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ItemModel } from '../model/item';
import { HttpService } from './http.service';

@Injectable()
export class DataService extends HttpService {

    //private apiURL = 'http://localhost:8080/api/';
    private apiURL = 'https://desapp-groupl-backend.herokuapp.com/api/';

    constructor(protected http: HttpClient, private authService: AuthService) {
        super(http);
    }

    validateUser({ email, given_name: name, family_name: lastName }) {
        return this.post('user', { name, lastName, email });
        //return this.http.post<any>(this.apiURL + 'user', {name, lastName, email});
    }

    createParty({ title, items, invs: guests, date, expirationDate }) {
        const body = { title, owner: this.authService.userProfile.email, items, guests, date, expirationDate };
        return this.post('event/party', body);
        //return this.http.post<any>(this.apiURL + 'event/party', body);
    }

    getItems() {
        return this.get('items');
        //return this.http.get<ItemModel[]>(this.apiURL + 'items');
    }

    getGuestedEvents(email: string) {
        return this.getWithParams('user/guest-events', { field: 'email', value: email });
        // let params = new HttpParams();
        // params = params.set('email', email);
        // return this.http.get<any>(this.apiURL + 'user/guest-events', {params});
    }

    getOwnerEvents(email: string) {
        return this.getWithParams('user/owner-events', { field: 'email', value: email });
        // let params = new HttpParams();
        // params = params.set('email', email);
        // return this.http.get<any>(this.apiURL + 'user/owner-events', { params });
    }

    assistToAnEvent(data: { userEmail, eventId }) {
        return this.put('event/guest-confirmated', data);
        //return this.http.put(this.apiURL + 'event/guest-confirmated', data);
    }

    crearItem(item: ItemModel) {
        return this.post('items', item);
        //return this.http.post(this.apiURL + 'items', item);
    }

    delEvent(id: any) {
        return this.delete('event/party/', id);
        //return this.http.delete(this.apiURL + 'event/party/' + id);
    }

    getAssistedEvents(email: string) {
        return this.getWithParams('user/assisted-events', { field: 'email', value: email });
        // let params = new HttpParams();
        // params = params.set('email', email);
        // return this.http.get<any>(this.apiURL + 'user/assisted-events', { params });
    }

    updateItemsToEvent(data: { eventId, itemsTitle }) {
        return this.put('event/party/items', data);
        //return this.http.put(this.apiURL + 'event/party/items', data);
    }

    updateGuestToEvent(data: { eventId, userEmails }) {
        return this.put('event/party/guests', data);
        //return this.http.put(this.apiURL + 'event/party/guests', data);
    }
    getTopEvents() {
        return this.get('event/top-events');
        //return this.http.get<any>(this.apiURL + 'event/top-events');
    }

    getAvailableLoan(email: string) {
        return this.getWithParams('loan/valid', { field: 'email', value: email });
        // let params = new HttpParams();
        // params = params.set('email', email);
        // return this.http.get<any>(this.apiURL + 'loan/valid', { params });
    }

    createLoan(email: string) {
        console.log('en el create loan service ' + email);
        let params = new HttpParams();
        params = params.set('email', email);
        return this.http.post<any>(this.apiURL + 'loan/create', {}, { params });
    }

    getUserLoans(email: string) {
        return this.getWithParams('loan/loans', { field: 'email', value: email });
        // let params = new HttpParams();
        // params = params.set('email', email);
        // return this.http.get<any>(this.apiURL + 'loan/loans', { params });
    }
}
