import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import config from '../../../config/config';

const API_ENDPOINT = config.API_ENDPOINT;

//const API_ENDPOINT = 'http://localhost:3000';
//const API_ENDPOINT = 'http://192.168.1.13:3000';


@Injectable()
export class PrincipalService {

  result: any;

  constructor(
    private http: Http,
    private router: Router
  ) {}
  

  add = (credential: any) => {
    credential.role = "PRINCIPAL";
  	const header = this.createAuthorizationHeader();
    return this.http.post(`${API_ENDPOINT}/api/user`, credential, { headers: header })
      .map(res => this.result = res.json());        
  }


  getPrincipal = () => {
    const header = this.createAuthorizationHeader();
    return this.http.get(`${API_ENDPOINT}/api/principal`, { headers: header })
      .map(res => this.result = res.json());        
  }

  getById = (id) => {
    const header = this.createAuthorizationHeader();
    return this.http.get(`${API_ENDPOINT}/api/principal/id`, { headers: header })
      .map(res => this.result = res.json());        
  }

  getToken () {
  	console.log( '[PrincipalService] token '+localStorage.getItem('userToken'));
    return localStorage.getItem('userToken') || '';
  }

  private handleError (error: Response | any) {
    console.error('[PrincipalService] :: handleError', error);
    return Observable.throw(error);
  }

  createAuthorizationHeader () {
        const headers = new Headers();
        const token = this.getToken();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', token);
        return headers;
  }

 
  
}//PrincipalService
