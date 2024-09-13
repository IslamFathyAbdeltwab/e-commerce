import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseurl } from './enviroments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData:any
private readonly  _HttpClient=inject(HttpClient)
  constructor() { }
  sendRegisterData(data:any):Observable<any>{
      return this._HttpClient.post(`${baseurl}/api/v1/auth/signup`,data)
  }
  login(data:any):Observable<any>{
    return this._HttpClient.post(`${baseurl}/api/v1/auth/signin`,data)
  }
 

  sendEmail(data:any):Observable<any>{
    
     return this._HttpClient.post(`${baseurl}/api/v1/auth/forgotPasswords`,data)
    

  }
  sendcode(data:any):Observable<any>{
    
     return this._HttpClient.post(`${baseurl}/api/v1/auth/verifyResetCode`,data)
    

  }
  resetPassword(data:any):Observable<any>{
    
     return this._HttpClient.put(`${baseurl}/api/v1/auth/resetPassword`,data)
    

  }
  saveUserData():void{
   
      this.userData=jwtDecode(localStorage.getItem("userToken") !)
      localStorage.setItem("userId",this.userData.id)
      console.log("userData",this.userData)

    
  }
  userOrders():Observable<any>{
   return this._HttpClient.get(`${baseurl}/api/v1/orders/user/${localStorage.getItem("userId")}`)
  }

}
