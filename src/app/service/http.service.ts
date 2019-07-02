import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import * as flatten from 'array-flatten';

//const URL = 'http://localhost:8080/api/';
const URL = 'https://desapp-groupl-backend.herokuapp.com/api/';

const getHttpOptions = () => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${window.sessionStorage.getItem('AuthTokenID')}`
  })
});

const getHttpParams = (...parameters) => {
  return {
    params: flatten(parameters).reduce((httpParams, parameter) => {
      const { field, value } = parameter;
      return httpParams.set(field, value);
    }, new HttpParams())
  };
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(protected http: HttpClient) { }

  get(endpoint) {
    return this.http.get(URL + endpoint, getHttpOptions());
  }

  getWithParams(endpoint, ...parameters) {
    const options = Object.assign(getHttpParams(parameters), getHttpOptions());
    return this.http.get(URL + endpoint, options);
  }

  post(endpoint, body) {
    return this.http.post(URL + endpoint, body, getHttpOptions());
  }

  put(endpoint, body) {
    return this.http.put(URL + endpoint, body, getHttpOptions());
  }

  delete(endpoint, id) {
    return this.http.delete(URL + endpoint + '/' + id);
  }

}
