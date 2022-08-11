import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';
import { Service } from '../models/service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  .set('Access-Control-Allow-Headers', 'Content-Type');
  
  constructor(public http: HttpClient) {}

  addOrUpdateClient(client: any): Observable<Client> {
    return this.http.post<any>(environment.url + environment.Client, client);
  }

  addOrUpdateUser(user: any): Observable<User> {
    return this.http.post<any>(environment.url + environment.User, user);
  }

  addOrUpdateService(service: any): Observable<Service> {
    return this.http.post<any>(environment.url + environment.Service, service);
  }

  addOrUpdateServer(server: any): Observable<Service> {
    return this.http.post<any>(environment.url + environment.Servers, server);
  }

  getUsers() {
    return this.http.get<User>(environment.url + environment.User, {
      headers: this.headers,
    });
  }

  getServices() {
    return this.http.get<Service>(environment.url + environment.Service, {
      headers: this.headers,
    });
  }

  getClients() {
    return this.http.get<Client>(environment.url + environment.Client, {
      headers: this.headers,
    });
  }

  getServers() {
    return this.http.get<any>(environment.url + environment.Servers, {
      headers: this.headers,
    });
  }
}
