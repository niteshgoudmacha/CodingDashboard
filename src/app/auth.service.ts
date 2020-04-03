import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = ''
  helper: any;
  constructor(private _http: HttpClient) { 
    this.helper = new JwtHelperService();
    if(!isDevMode()) {
      this.url = ''
    }
  }
  
  submitRegister(body: any) {
    return this._http.post(this.url + '/api/user/register', body, {
      observe: 'body'
    });
  }

  updateProfile(body: any) {
    return this._http.post(this.url + '/api/user/update/profile', body, {
      observe: 'body',
      headers: new HttpHeaders().set('token', localStorage.getItem('token'))
    });
  }

  login(body: any) {
    return this._http.post(this.url + '/api/user/login', body, {
      observe: 'body'
    });
  }

  logout() {
    localStorage.clear();
  }

  getProfile() {
    return this._http.get(this.url + '/api/user/profile', {
      observe: 'body',
      headers: new HttpHeaders().set('token', localStorage.getItem('token'))
    });
  }

  isAuth() {
    let token = localStorage.getItem('token');
    if(token) {
      if(this.helper.isTokenExpired(token)) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    }
    return false;
  }
}
