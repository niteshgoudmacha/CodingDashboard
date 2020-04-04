import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  url = 'http://localhost:8080'
  constructor(private http: HttpClient) { 
    if(!isDevMode()) {
      this.url = ''
    }
  }
  getdata() {
    return this.http.get('https://zodapi.herokuapp.com/api/players');
  }

  addContest(body: any) {
    return this.http.post(this.url + '/api/user/add/contest', body, {
      observe: 'body',
      headers: new HttpHeaders().set('token', localStorage.getItem('token'))
    });
  }

  getContests() {
    return this.http.get(this.url + '/api/user/contests');
  }
}
