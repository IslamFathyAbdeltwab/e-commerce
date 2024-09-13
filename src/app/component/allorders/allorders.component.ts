import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { baseurl } from '../../core/services/enviroments';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  private readonly _AuthService=inject(AuthService)

  orderdata!:Array<any>
  private readonly _HttpClient=inject(HttpClient)
ngOnInit(): void {
  this._AuthService.userOrders().subscribe({
    next:(res)=>{
      this.orderdata=res[res.length - 1].cartItems
      console.log("allorders",res)
      console.log(this.orderdata)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

}
