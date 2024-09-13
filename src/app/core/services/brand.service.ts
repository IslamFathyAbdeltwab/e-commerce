import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { baseurl } from './enviroments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService  {

  constructor(private readonly _HttpClient:HttpClient) { }
  getbrands():Observable<any> {
   return this._HttpClient.get(`${baseurl}/api/v1/brands`)
  }
  getspecficbrands(id:string):Observable<any>{
   return this._HttpClient.get(`${baseurl}/api/v1/brands/${id}`)
  }
}
