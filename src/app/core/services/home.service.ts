import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from './enviroments';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
private readonly _HttpClient=inject(HttpClient)
  constructor() { }
  homeProducts():Observable<any>{
    return this._HttpClient.get(`${baseurl}/api/v1/products`)
  }
}
