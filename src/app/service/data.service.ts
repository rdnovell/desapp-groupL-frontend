import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ItemModel } from '../model/item';
import { HttpService } from './http.service';
import { determine } from 'jstz';

@Injectable()
export class DataService extends HttpService {

    //private apiURL = 'http://localhost:8080/api/';
    private apiURL = 'https://desapp-groupl-backend.herokuapp.com/api/';

    constructor(protected http: HttpClient, private authService: AuthService) {
        super(http);
    }

    getConfirmations(email) {
        return this.getWithParams('event/party/transactions', { field: 'zone', value: determine().name() }, { field: 'owner', value: email });
    }

    validateUser({ email, given_name: name, family_name: lastName }) {
        return this.post('user', { name, lastName, email });
    }

    createParty({ title, items, invs: guests, date, expirationDate }) {
        const body = { title, owner: this.authService.userProfile.email, items, guests, date, expirationDate };
        return this.post('event/party', body);
    }

    getItems() {
        return this.get('items');
    }

    getGuestedEvents(email: string) {
        return this.getWithParams('user/guest-events', { field: 'email', value: email });
    }

    getOwnerEvents(email: string) {
        return this.getWithParams('user/owner-events', { field: 'email', value: email });
    }

    assistToAnEvent(data: { userEmail, eventId }) {
        return this.put('event/guest-confirmated', data);
    }

    crearItem(item: ItemModel) {
        return this.post('items', item);
    }

    delEvent(id: any) {
        return this.delete('event/party/', id);
    }

    getAssistedEvents(email: string) {
        return this.getWithParams('user/assisted-events', { field: 'email', value: email });
    }

    updateItemsToEvent(data: { eventId, itemsTitle }) {
        return this.put('event/party/items', data);
    }

    updateGuestToEvent(data: { eventId, userEmails }) {
        return this.put('event/party/guests', data);
    }
    getTopEvents() {
        return this.get('event/top-events');
    }

    getAvailableLoan(email: string) {
        return this.getWithParams('loan/valid', { field: 'email', value: email });
    }

    createLoan(email: string) {
        return this.postWithParams('loan/create', { field: 'email', value: email });
    }

    getUserLoans(email: string) {
        return this.getWithParams('loan/loans', { field: 'email', value: email });
    }

    getUserFinantialData(email: string) {
        return this.getWithParams('user/owner-account-transaction', { field: 'email', value: email });
    }
}
