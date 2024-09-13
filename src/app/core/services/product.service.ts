import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { baseurl } from './enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly _HttpClient:HttpClient) { }
  getallproduct():Observable<any>{
   return this._HttpClient.get(`${baseurl}/api/v1/products`)
  }
  getSpcificProduct(pid:string|null):Observable<any>{
    return this._HttpClient.get(`${baseurl}/api/v1/products/${pid}`)
     }
}
