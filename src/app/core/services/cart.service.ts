import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseurl } from './enviroments';
import { Iproduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)
  

  constructor(private readonly _HttpClient:HttpClient) { }

addProductToCart(id:string):Observable<any>{
 return this._HttpClient.post(`${baseurl}/api/v1/cart`,{ "productId":id})
  }

getproducttodisplay():Observable<any>{
  return this._HttpClient.get(`${baseurl}/api/v1/cart`,)



}
deletespecproduct(id:string):Observable<any>{
return this._HttpClient.delete(`${baseurl}/api/v1/cart/${id}`)
}
clearcart():Observable<any>{
 return this._HttpClient.delete(`${baseurl}/api/v1/cart`)
}
updateProductQuantity(id:string,count:number):Observable<any>{
  return this._HttpClient.put(`${baseurl}/api/v1/cart/${id}`,{
    "count":count 
})
}

}
