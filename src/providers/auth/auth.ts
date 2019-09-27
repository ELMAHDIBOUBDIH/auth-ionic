import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Storage} from '@ionic/storage';
import {JwtHelperService} from "@auth0/angular-jwt";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  url: 'http://localhost:3000';
  authenticationState = new BehaviorSubject(false);
  TOKEN_KEY = 'auth_token';
  token;
  user:any[]=[];

  constructor(private http: HttpClient,
              public storage: Storage,
              private helper: JwtHelperService) {
    this.storage.get(this.TOKEN_KEY).then((res) => {
      this.token = res;
    })
  }

  login(user): Observable<any> {
    return this.http.post(`http://localhost:3000/api/login`, user).pipe(
      tap(res => {
        if (res.done) {
          this.token = res['token']
          this.storage.set(this.TOKEN_KEY, res['token']);
          this.authenticationState.next(true);
        }
      }));
  }

  getData() {
    console.log(this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer '+this.token
      })
    }
    return this.http.get(`http://localhost:3000/api/getUser`, httpOptions).pipe(
      catchError(e => {
        let status = e.status;
        if (status === 401) {
          console.log('You are not authorized for this!');
        }
        throw new Error(e);
      })
    )
  }

  getToken() {
    this.storage.get(this.TOKEN_KEY).then((token) => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.authenticationState.next(true);
        } else {
          this.storage.remove(this.TOKEN_KEY);
        }
      }
    });
  }

  logout() {
    this.storage.remove(this.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  register(user): Observable<any> {
    return this.http.post(`http://localhost:3000/api/register`, user)
  }
}
