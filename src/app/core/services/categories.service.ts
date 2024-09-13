import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { baseurl } from './enviroments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }
getAllCategories():Observable<any>{
    return this._HttpClient.get(`${baseurl}/api/v1/categories`)
  }
 getspecCategories(cid:any):Observable<any>{
  return this._HttpClient.get(`${baseurl}/api/v1/categories/${cid}`)
 }
}
