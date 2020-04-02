import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  
  constructor(private http: HttpClient) { }
  getdata() {
    return this.http.get('https://zodapi.herokuapp.com/api/players');
  }
}
