import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<any> = new ReplaySubject<any>();

  set user(value: any) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<any> {
    return this._user.asObservable();
  }

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    .set('Access-Control-Allow-Headers', 'Content-Type');
  constructor(public http: HttpClient) {}

  addOrUpdate(user: any): Observable<any> {
    return this.http.post<any>(environment.url + environment.User, user);
  }

  getUsers() {
    return this.http.get<any>(environment.url + environment.User, {
      headers: this.headers,
    });
  }
}
