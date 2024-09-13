import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
private readonly _CartService=inject(CartService)
private readonly _ToastrService=inject(ToastrService)

cartdata:any
totalCartPrice:number=0
imgshow:boolean=false
cartid!:string

ngOnInit(): void {
  this._CartService.getproducttodisplay().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.totalCartPrice=res.data.totalCartPrice
      
      this.cartdata=res.data
      this.cartid=this.cartdata._id
      console.log(this.cartid)
    },
    error:(err)=>{console.log(err)
    }
  })
}

removeproduct(id:string){
  this._CartService.deletespecproduct(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartdata=res.data
      this.totalCartPrice=res.data.totalCartPrice
      this._ToastrService.error("deleted success")
      this._CartService.cartNumber.next(res.numOfCartItems)
      
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
if(){
  this.imgshow=true
}
clearcart():void{
 this._CartService.clearcart().subscribe({
  next:(res)=>{
    console.log(res)
    this.imgshow=true
    this.totalCartPrice=0
    this.cartdata={}
    this._ToastrService.error("deleted all cart success")
    this._CartService.cartNumber.next(res.numOfCartItems)
  },
  error:(err)=>{
    console.log(err)
  }
 })
}
updateProductQuantity(id:string,count:number){
  this._CartService.updateProductQuantity(id,count).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartdata=res.data
      this.totalCartPrice=res.data.totalCartPrice
      this._ToastrService.success("update quantitiy success")
    },
    error:(err)=>{
      console.log(err)
    }
  })
}


}

// click on button called api and sent to it token and id for product to add to cart
// 
