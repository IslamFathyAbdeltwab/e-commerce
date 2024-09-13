import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseurl } from './enviroments';
import { Iproduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
 
 
  wishListItems:Array<string>=[]
  // wishListItems:BehaviorSubject<[]>=new BehaviorSubject([])
 
  constructor(private readonly _HttpClient:HttpClient) { }
  putInWishList(pid:string):Observable<any>{
    return this._HttpClient.post(`${baseurl}/api/v1/wishlist`,{
      
        "productId": pid
    
    },
  {
    headers:{token:localStorage.getItem("userToken") !}
  })
  }

  getWishList():Observable<any>{
    return this._HttpClient.get(`${baseurl}/api/v1/wishlist`,{
      headers:{token:localStorage.getItem("userToken") !}
    })
  }
  removeProduct(id:string):Observable<any>{
  return this._HttpClient.delete(`${baseurl}/api/v1/wishlist/${id}`,
  {
    headers:{token:localStorage.getItem("userToken") !}
  }
)
  }
  isInWishList(id:string):boolean{
   return this.wishListItems.some((item)=>item===id)

  

    } 
}
