import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from './enviroments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly _HttpClient:HttpClient) { }
  token:any={"token":localStorage.getItem("userToken")}

sendrequest(cid:string |null,data:object):Observable<any>{
  return this._HttpClient.post(`${baseurl}/api/v1/orders/checkout-session/${cid}?url=http://localhost:4200/`,{
    "shippingAddress":data
  },
{
  headers:this.token
})
}
}
